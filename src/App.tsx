import { useState, useEffect } from "react";
import {
  Building2,
  Receipt,
  MessageCircle,
  Check,
  ArrowRight,
  Menu,
  X,
  Send,
  Sparkles,
  User,
  Phone,
  Mail,
  FileText,
  ChevronRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "5534988374643";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const INSTAGRAM_URL = "https://instagram.com/jbassessoria_contabil";
const EMAIL = "jbcontabilidade23@gmail.com";
const PHONE = "(34) 98837-4643";
const ACCENT = "#2a9d8f";

/* ─── Contact Modal ─────────────────────────────────────────── */
function ContactModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ nome: "", telefone: "", email: "", mensagem: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Nome: ${form.nome}%0ATelefone: ${form.telefone}%0AE-mail: ${form.email}%0A%0AMensagem:%0A${encodeURIComponent(form.mensagem)}`;
    window.location.href = `mailto:${EMAIL}?subject=Contato via site – ${encodeURIComponent(form.nome)}&body=${body}`;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: "rgba(3,18,22,0.75)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative w-full max-w-lg rounded-[32px] overflow-hidden"
        style={{ background: "#fffef7", boxShadow: "0 32px 80px rgba(0,0,0,0.3)" }}
      >
        <div className="bg-[#043a49] px-8 pt-8 pb-10 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20" style={{ background: ACCENT }} />
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          <p className="text-white/60 text-xs uppercase tracking-widest mb-2">Fale Conosco</p>
          <h2 className="text-white font-bold text-2xl leading-tight" style={{ letterSpacing: "-0.02em" }}>
            Envie sua dúvida para a JB
          </h2>
          <p className="text-white/60 text-sm mt-2">Responderemos pelo e-mail ou WhatsApp em até 24h.</p>
        </div>

        {sent ? (
          <div className="px-8 py-12 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5" style={{ background: `${ACCENT}20` }}>
              <Check className="w-8 h-8" style={{ color: ACCENT }} />
            </div>
            <h3 className="text-[#043a49] font-bold text-xl mb-2">Mensagem preparada!</h3>
            <p className="text-[#4b5563] text-sm leading-relaxed mb-6">
              Seu cliente de e-mail foi aberto com as informações preenchidas. Confirme o envio lá.
            </p>
            <button
              onClick={onClose}
              className="text-white rounded-full px-8 py-3 font-semibold text-sm hover:opacity-90 transition-all"
              style={{ background: ACCENT }}
            >
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-8 space-y-4">
            {[
              { field: "nome", label: "Nome completo", placeholder: "Seu nome", icon: <User className="w-4 h-4" />, type: "text" },
              { field: "telefone", label: "Telefone / WhatsApp", placeholder: "(00) 00000-0000", icon: <Phone className="w-4 h-4" />, type: "tel" },
              { field: "email", label: "E-mail", placeholder: "seu@email.com", icon: <Mail className="w-4 h-4" />, type: "email" },
            ].map(({ field, label, placeholder, icon, type }) => (
              <div key={field}>
                <label className="text-[#043a49] text-xs font-semibold uppercase tracking-wider block mb-1.5">{label}</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
                  <input
                    type={type}
                    required={field !== "telefone"}
                    placeholder={placeholder}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#2a9d8f] focus:ring-2 transition-all"
                    style={{ "--tw-ring-color": `${ACCENT}30` } as React.CSSProperties}
                  />
                </div>
              </div>
            ))}

            <div>
              <label className="text-[#043a49] text-xs font-semibold uppercase tracking-wider block mb-1.5">Sua dúvida</label>
              <div className="relative">
                <FileText className="w-4 h-4 absolute left-4 top-4 text-gray-400" />
                <textarea
                  required
                  rows={4}
                  placeholder="Descreva sua dúvida ou situação..."
                  value={form.mensagem}
                  onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3.5 text-sm text-[#1a1a1a] placeholder-gray-400 outline-none focus:border-[#2a9d8f] resize-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full text-white rounded-xl py-4 font-bold text-sm hover:opacity-90 transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
              style={{ background: ACCENT }}
            >
              Enviar mensagem
              <ChevronRight className="w-4 h-4" />
            </button>
            <p className="text-gray-400 text-xs text-center">
              Seu e-mail será enviado para {EMAIL}
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* ─── NavBar ─────────────────────────────────────────────────── */
function NavBar({ onContactClick }: { onContactClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Início", href: "#inicio" },
    { label: "Por que JB?", href: "#porque" },
    { label: "Serviços", href: "#servicos" },
    { label: "Contato", href: "#cta" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#043a49] ${scrolled ? "shadow-lg" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <img
          src="/__mockup/images/logo-jb-dark.png"
          alt="JB Contabilidade"
          className="h-16 object-contain"
          style={{ mixBlendMode: "screen" }}
        />
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-white/70 font-medium hover:text-white transition-colors text-sm tracking-wide">
              {l.label}
            </a>
          ))}
          <button
            onClick={onContactClick}
            className="border border-white/30 text-white rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-white/10 transition-all hover:scale-105"
          >
            Fale Conosco
          </button>
        </div>
        <button className="md:hidden text-white/80" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#032f3b] border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-white/70 font-medium py-1 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onContactClick(); }}
            className="border border-white/30 text-white rounded-full px-6 py-2.5 text-sm font-semibold text-center"
          >
            Fale Conosco
          </button>
        </div>
      )}
    </nav>
  );
}

/* ─── Hero Illustration ──────────────────────────────────────── */
function HeroIllustration() {
  const testimonials = [
    { name: "Mariana S.", role: "Empresária · Araxá-MG", text: "Excelente atendimento! A JB resolveu minha situação fiscal rapidamente e com muita atenção.", avatar: "M", color: "#2a9d8f" },
    { name: "João P.", role: "MEI · Triângulo Mineiro", text: "Profissionais sérios e comprometidos. Finalmente entendo como pagar menos imposto legalmente.", avatar: "J", color: "#043a49" },
    { name: "Cássia R.", role: "Produtora Rural · MG", text: "Me sinto segura sabendo que minha contabilidade está nas mãos certas. Super recomendo!", avatar: "C", color: "#065a6e" },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto select-none">
      <div className="absolute -inset-4 rounded-[48px] blur-3xl opacity-25" style={{ background: `radial-gradient(circle, ${ACCENT} 0%, transparent 70%)` }} />
      <div className="relative flex flex-col gap-4">
        <div className="bg-[#043a49] rounded-[32px] p-7 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10" style={{ background: ACCENT, transform: "translate(35%, -35%)" }} />
          <div className="relative z-10 flex items-start gap-5">
            <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-2xl flex-shrink-0">🤝</div>
            <div>
              <p className="text-white/50 text-xs uppercase tracking-wider mb-1">Nossa missão</p>
              <p className="text-white font-bold text-lg leading-snug" style={{ letterSpacing: "-0.01em" }}>
                Contabilidade simples para quem tem uma empresa para crescer.
              </p>
            </div>
          </div>
          <div className="relative z-10 mt-5 flex items-center gap-2">
            <div className="flex -space-x-2">
              {["M", "J", "C", "R"].map((l, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-[#043a49] flex items-center justify-center text-xs font-bold text-white" style={{ background: ["#2a9d8f", "#065a6e", "#2a9d8f", "#043a49"][i] }}>
                  {l}
                </div>
              ))}
            </div>
            <p className="text-white/60 text-xs ml-1">+200 clientes satisfeitos</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-1">
          <div className="flex-1 h-px bg-gray-200" />
          <p className="text-gray-400 text-xs font-medium px-2">O que dizem nossos clientes</p>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <div className="grid grid-cols-1 gap-3">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white border border-gray-100 rounded-2xl p-5 flex items-start gap-4" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ background: t.color }}>
                {t.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-[#043a49] font-semibold text-sm">{t.name}</span>
                  <span className="text-gray-400 text-xs">{t.role}</span>
                </div>
                <p className="text-[#4b5563] text-xs leading-relaxed">"{t.text}"</p>
                <div className="flex gap-0.5 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3 h-3" viewBox="0 0 24 24" fill={ACCENT}>
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────── */
function HeroSection() {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-24 pb-16" style={{ background: "#fffef7" }}>
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8 text-sm font-medium" style={{ background: `${ACCENT}18`, color: ACCENT }}>
            <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
            Contabilidade Digital · Araxá-MG para todo o Brasil
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-[#043a49] mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Assessoria contábil completa e{" "}
            <span style={{ color: ACCENT }}>100% online</span>
          </h1>
          <p className="text-[#4b5563] text-lg leading-relaxed mb-10">
            A JB é uma empresa de contabilidade voltada ao atendimento virtual de forma simples e descomplicada. Uma empresa de Araxá-MG para todo o Brasil, oferecendo soluções contábeis completas e eficientes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#porque" className="inline-flex items-center justify-center gap-2 text-white rounded-full px-8 py-4 font-bold text-sm transition-all hover:scale-105 shadow-lg" style={{ background: ACCENT }}>
              Saber mais <ArrowRight className="w-4 h-4" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-[#043a49] rounded-full px-8 py-4 font-semibold text-sm hover:bg-gray-50 transition-all">
              Falar pelo WhatsApp
            </a>
          </div>
          <div className="mt-14 flex items-center gap-10">
            {[{ number: "2023", label: "Fundada em" }, { number: "200+", label: "Clientes atendidos" }, { number: "100%", label: "Online" }].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-bold" style={{ color: ACCENT }}>{stat.number}</div>
                <div className="text-[#4b5563] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <HeroIllustration />
      </div>
    </section>
  );
}

/* ─── Why Section ────────────────────────────────────────────── */
function WhySection() {
  const cards = [
    { icon: <Building2 className="w-7 h-7" />, title: "Abertura de empresa", description: "Profissionais experientes, que te orientam a melhor forma de começar um negócio." },
    { icon: <Receipt className="w-7 h-7" />, title: "Problemas com impostos", description: "Responde suas dúvidas sobre impostos, e sugere ações para a sua situação real." },
    { icon: <MessageCircle className="w-7 h-7" />, title: "Assessoria completa", description: "Não precisa ter medo da nova tributação! Aqui você tem uma assessoria completa para te orientar." },
  ];

  return (
    <section id="porque" className="py-28" style={{ background: "#fffef7" }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium" style={{ background: "rgba(4,58,73,0.08)", color: "#043a49" }}>
            <div className="w-2 h-2 rounded-full bg-[#043a49]" />
            Nossos diferenciais
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#043a49]" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>Por que JB?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div key={card.title} className="bg-white border border-gray-100 p-8 rounded-[32px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: i === 1 ? "rgba(4,58,73,0.08)" : `${ACCENT}18`, color: i === 1 ? "#043a49" : ACCENT }}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-[#043a49] mb-3" style={{ letterSpacing: "-0.01em" }}>{card.title}</h3>
              <p className="text-[#4b5563] text-sm leading-relaxed">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Chat Section ───────────────────────────────────────────── */
const suggestions = [
  "Qual o melhor regime para a minha empresa?",
  "Por que pago tantos impostos?",
  "Como consigo mudar para o Simples Nacional?",
  "O que é necessário declarar?",
  "Quem precisa fazer imposto de renda?",
];

function ChatSection() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");

  return (
    <section id="chat" className="py-28 relative overflow-hidden" style={{ background: "#043a49" }}>
      <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(42,157,143,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 10% 80%, rgba(6,90,110,0.4) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-full px-4 py-2 mb-8">
            <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
            <span className="text-white/80 text-sm font-medium">Respostas da JB</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Você tem perguntas,{" "}
            <span style={{ color: ACCENT }}>a JB tem as respostas</span>
          </h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            Conte com nossos especialistas para esclarecer todas as suas dúvidas contábeis. Atendimento rápido e personalizado.
          </p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white font-semibold text-sm rounded-full px-7 py-3.5 hover:opacity-90 transition-all hover:scale-105" style={{ background: "#25D366" }}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.93 9.93 0 01-4.756-1.215L3 18.75l1.124-4.143A9.924 9.924 0 012.07 9.93C2.07 4.458 6.528 0 12 0s9.93 4.458 9.93 9.93c0 5.471-4.458 9.93-9.901 9.95z" fillRule="evenodd" clipRule="evenodd" />
            </svg>
            Perguntar agora
          </a>
        </div>
        <div>
          <div className="rounded-[28px] overflow-hidden" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(20px)" }}>
            <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `${ACCENT}30` }}>
                <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
              </div>
              <div>
                <p className="text-white text-sm font-semibold leading-none">JB Assistente Contábil</p>
                <p className="text-white/40 text-xs mt-0.5">Especialista em contabilidade</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-green-400/80 text-xs">Online</span>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <p className="text-white/40 text-xs text-center mb-4">Pergunte-me qualquer coisa sobre a sua contabilidade</p>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="w-full text-left px-4 py-3.5 rounded-2xl text-sm flex items-center gap-3 transition-all duration-200"
                  style={{
                    background: hovered === i ? `${ACCENT}20` : "rgba(255,255,255,0.05)",
                    border: `1px solid ${hovered === i ? `${ACCENT}50` : "rgba(255,255,255,0.08)"}`,
                    color: hovered === i ? "#a7f3ec" : "rgba(255,255,255,0.65)",
                    transform: hovered === i ? "translateX(4px)" : "none",
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => setInputValue(s)}
                >
                  <ChevronRight className="w-4 h-4 flex-shrink-0" style={{ color: hovered === i ? ACCENT : "rgba(255,255,255,0.3)" }} />
                  {s}
                </button>
              ))}
            </div>
            <div className="px-6 pb-6">
              <div className="flex items-center gap-3 rounded-2xl px-4 py-3" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <input
                  type="text"
                  placeholder="Digite sua pergunta contábil..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-white/30 text-sm outline-none"
                />
                <a
                  href={inputValue ? `${WHATSAPP_URL}?text=${encodeURIComponent(inputValue)}` : WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all hover:scale-110"
                  style={{ background: ACCENT }}
                >
                  <Send className="w-4 h-4 text-white" />
                </a>
              </div>
              <p className="text-white/25 text-[11px] text-center mt-3">
                Ao enviar, você será redirecionado para o WhatsApp da JB Contabilidade
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Security Section ───────────────────────────────────────── */
function SecuritySection() {
  const items = ["Microempreendedor Individual", "Simples Nacional", "Lucro Presumido", "Produtores Rurais"];

  return (
    <section id="servicos" className="py-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #032f3b 0%, #043a49 30%, #065a6e 60%, #043a49 80%, #032f3b 100%)" }}>
      <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-6 text-sm font-medium bg-white/10 border border-white/20">
              <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
              <span className="text-white/80">Para todos os perfis</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              Nós resolvemos os seus{" "}
              <span style={{ color: ACCENT }}>problemas:</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mt-6">
              Atendemos diferentes perfis de negócios com soluções sob medida para cada realidade tributária.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-8 text-white rounded-full px-8 py-4 font-semibold text-sm hover:opacity-90 transition-all hover:scale-105" style={{ background: ACCENT }}>
              Falar com um especialista <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 gap-4">
            {items.map((item, i) => (
              <div key={item} className="flex items-center gap-5 rounded-2xl p-6 hover:translate-x-1 transition-all duration-200" style={{ animationDelay: `${i * 100}ms`, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}30` }}>
                  <Check className="w-5 h-5" style={{ color: ACCENT }} />
                </div>
                <span className="text-white font-semibold text-lg">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA Section ────────────────────────────────────────────── */
function CTASection() {
  return (
    <section id="cta" className="py-28 bg-[#043a49] relative overflow-hidden">
      <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(ellipse at center, ${ACCENT}25 0%, transparent 70%)` }} />
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
          <span className="text-white/80 text-sm font-medium">Comece agora</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8" style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Retome o controle da{" "}
          <span style={{ color: ACCENT }}>sua contabilidade</span>
        </h2>
        <div className="flex flex-col items-center gap-3 mb-12">
          {["Contador Especializado", "Contábil Responsável", "Departamento Pessoal Alinhado"].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: `${ACCENT}30` }}>
                <Check className="w-3 h-3" style={{ color: ACCENT }} />
              </div>
              <span className="text-white/80 text-base">{item}</span>
            </div>
          ))}
        </div>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-white rounded-full px-10 py-5 font-bold text-base hover:opacity-90 transition-all hover:scale-105 shadow-2xl" style={{ background: ACCENT }}>
          Quero falar sobre a minha empresa
          <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const sections = [
    { title: "Serviços", links: ["Abertura de Empresa", "Simples Nacional", "MEI", "Lucro Presumido", "Folha de Pagamento"] },
    { title: "Empresa", links: ["Por que JB?", "Contato", "Instagram", "WhatsApp"] },
    { title: "Contato", links: [PHONE, EMAIL, "@jbassessoria_contabil"] },
  ];

  return (
    <footer className="bg-[#043a49] pt-16 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <img
              src="/__mockup/images/logo-jb-dark.png"
              alt="JB Contabilidade"
              className="h-20 object-contain mb-4"
              style={{ mixBlendMode: "screen" }}
            />
            <p className="text-white/40 text-sm leading-relaxed">Assessoria e Consultoria Contábil. Araxá-MG para todo o Brasil.</p>
          </div>
          {sections.map((sec) => (
            <div key={sec.title}>
              <h4 className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-4">{sec.title}</h4>
              <ul className="space-y-2">
                {sec.links.map((link) => (
                  <li key={link}><span className="text-white/50 hover:text-white text-sm transition-colors cursor-pointer">{link}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} JB Assessoria e Consultoria Contábil. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Floating Buttons ───────────────────────────────────────── */
function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200" style={{ background: "linear-gradient(135deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" }}>
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-200">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88a9.93 9.93 0 01-4.756-1.215L3 18.75l1.124-4.143A9.924 9.924 0 012.07 9.93C2.07 4.458 6.528 0 12 0s9.93 4.458 9.93 9.93c0 5.471-4.458 9.93-9.901 9.95z" fillRule="evenodd" clipRule="evenodd" />
        </svg>
      </a>
    </div>
  );
}

/* ─── Root ───────────────────────────────────────────────────── */
export default function App() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="font-sans antialiased" style={{ fontFamily: "Inter, sans-serif" }}>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      <NavBar onContactClick={() => setContactOpen(true)} />
      <HeroSection />
      <WhySection />
      <ChatSection />
      <SecuritySection />
      <CTASection />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
