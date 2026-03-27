# JB Contabilidade — Site

Landing page (React + Vite + Tailwind) com:
- **Botão central moderno** “Fale Conosco” (abre formulário)
- **Formulário** com envio direto para o e-mail via **Web3Forms** (sem abrir cliente de e-mail)
- **Chat com IA de verdade** (via backend seguro, pronto para Cloudflare Worker)
- **Logo dinâmica por URL** (ex.: `raw.githubusercontent.com` do seu GitHub)
- **Reviews clean estilo Google** no hero

## Rodar localmente

```bash
npm install
npm run dev
```

## Configuração (variáveis `VITE_*`)

Copie `/.env.example` para `/.env.local` e preencha:
- **`VITE_WEB3FORMS_ACCESS_KEY`**: chave do Web3Forms (envio do formulário)
- **`VITE_AI_API_BASE`**: URL do backend do chat (ex.: Worker)
- **`VITE_GITHUB_LOGO_LIGHT_URL` / `VITE_GITHUB_LOGO_DARK_URL`**: URLs do logo (pode ser RAW do GitHub)

## Deploy do site (GitHub Pages)

Este projeto já está com `base: '/jb-contabilidade/'` em `vite.config.ts`.

Passos comuns:
- Build: `npm run build`
- Publicar a pasta `dist/` no GitHub Pages

## Backend do chat IA (Cloudflare Worker)

Pasta: `/worker`

Resumo:
- Você publica o Worker (com a chave da IA **no servidor**, nunca no frontend).
- Depois define `VITE_AI_API_BASE` apontando para a URL do Worker.
