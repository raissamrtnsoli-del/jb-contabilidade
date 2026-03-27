type Env = {
  AI_PROVIDER: string; // "openai" | "openrouter"
  AI_MODEL: string;
  ALLOWED_ORIGIN: string;
  OPENAI_API_KEY?: string;
  OPENROUTER_API_KEY?: string;
};

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...(init.headers || {}),
    },
  });
}

function corsHeaders(env: Env, origin: string | null) {
  const allowed = env.ALLOWED_ORIGIN?.trim() || "*";
  const allowOrigin = allowed === "*" ? (origin || "*") : allowed;
  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
  };
}

async function handleOptions(req: Request, env: Env) {
  const origin = req.headers.get("origin");
  return new Response(null, { status: 204, headers: corsHeaders(env, origin) });
}

async function handleChat(req: Request, env: Env) {
  const origin = req.headers.get("origin");

  let payload: any;
  try {
    payload = await req.json();
  } catch {
    return json({ error: "invalid_json" }, { status: 400, headers: corsHeaders(env, origin) });
  }

  const messages = payload?.messages;
  if (!Array.isArray(messages) || messages.length < 1) {
    return json({ error: "missing_messages" }, { status: 400, headers: corsHeaders(env, origin) });
  }

  const provider = (env.AI_PROVIDER || "openai").toLowerCase();
  const model = env.AI_MODEL || "gpt-4o-mini";

  let url = "";
  let apiKey = "";
  let headers: Record<string, string> = { "content-type": "application/json" };

  if (provider === "openrouter") {
    url = "https://openrouter.ai/api/v1/chat/completions";
    apiKey = env.OPENROUTER_API_KEY || "";
    headers["authorization"] = `Bearer ${apiKey}`;
  } else {
    url = "https://api.openai.com/v1/chat/completions";
    apiKey = env.OPENAI_API_KEY || "";
    headers["authorization"] = `Bearer ${apiKey}`;
  }

  if (!apiKey) {
    return json(
      { error: "missing_api_key", hint: "Configure OPENAI_API_KEY (ou OPENROUTER_API_KEY) no Worker." },
      { status: 500, headers: corsHeaders(env, origin) },
    );
  }

  // Sanitização simples (evita payload gigante)
  const safeMessages = messages
    .slice(-20)
    .map((m: any) => ({ role: String(m.role || "user"), content: String(m.content || "").slice(0, 4000) }));

  const upstream = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model,
      messages: safeMessages,
      temperature: 0.2,
    }),
  });

  if (!upstream.ok) {
    const errText = await upstream.text().catch(() => "");
    return json({ error: "upstream_error", status: upstream.status, detail: errText.slice(0, 500) }, { status: 502, headers: corsHeaders(env, origin) });
  }

  const data: any = await upstream.json();
  const reply = data?.choices?.[0]?.message?.content || "";
  return json({ reply }, { status: 200, headers: corsHeaders(env, origin) });
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);
    if (req.method === "OPTIONS") return handleOptions(req, env);
    if (req.method !== "POST") return json({ error: "method_not_allowed" }, { status: 405 });

    if (url.pathname === "/api/chat") return handleChat(req, env);
    return json({ error: "not_found" }, { status: 404 });
  },
};

