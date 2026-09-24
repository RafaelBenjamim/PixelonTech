import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Header from "../component/header";
import Hero from "../component/hero";
import Diferenciais from "../component/diferenciais";
import Servicos from "../component/servicos";
import Projetos from "../component/projetos";
import Contato from "../component/contato";
import Footer from "../component/footer";
import QuemSomos from "../component/quemSomos";
import Processo from "../component/processo";
import Planos from "../component/planos";

const SECTION_IDS = [
  "topo",
  "quem-somos",
  "servicos",
  "processo",
  "projetos",
  "planos",
  "contato",
] as const;

function useActiveSection(): string {
  const [active, setActive] = useState<string>("topo");

  useEffect(() => {
    const elements = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

/* ---------------------------------------------------------------
   CONTENT
--------------------------------------------------------------- */
const NAV_ITEMS = [
  { label: "Quem somos", id: "quem-somos" },
  { label: "Serviços", id: "servicos" },
  { label: "Projetos", id: "projetos" },
  { label: "Planos", id: "planos" },
  { label: "Contato", id: "contato" },
];

const SERVICOS = [
  {
    tag: "LANDING PAGE",
    titulo: "Página de conversão",
    desc: "Uma página única, direta e feita pra transformar quem visita em cliente — seja pra vender, marcar um horário ou receber uma mensagem.",
  },
  {
    tag: "SITE INSTITUCIONAL",
    titulo: "Presença completa",
    desc: "Um site com várias páginas, organizado e fácil de navegar, pra apresentar sua empresa e tudo que ela oferece.",
  },
  {
    tag: "SISTEMAS & API",
    titulo: "Seu site faz mais",
    desc: "Login de usuários, formulários inteligentes, painéis administrativos e integrações com outras ferramentas.",
  },
];

const DIFERENCIAIS = [
  {
    titulo: "Performance",
    desc: "Sites rápidos, com navegação fluida e estrutura pensada para retenção e conversão.",
  },
  {
    titulo: "Design consistente",
    desc: "Identidade visual clara, com foco em experiência, hierarquia e comunicação objetiva.",
  },
  {
    titulo: "Foco em resultado",
    desc: "Cada decisão é pensada para apoiar objetivos reais: vender, captar, informar ou fortalecer a marca.",
  },
];

const PROJETOS = [
  { nome: "Allp Fit", tipo: "Landing page — academia", desc: "Página de captação de alunos com identidade visual voltada a performance." },
  { nome: "Fiorella", tipo: "Landing page + API", desc: "Site com integração de back-end para um negócio local, unindo apresentação e funcionalidade.", link: "https://fiorellaclub.com.br" },
  { nome: "Ajiê Espelhos", tipo: "Proposta de landing page", desc: "Vitrine digital para loja de espelhos decorativos, pensada para redes sociais." },
  { nome: "Jp Barbearia", tipo: "Sistema de fila para clientes", desc: "Sistema virtual que permite aos clientes acompanhar a ordem de atendimento em tempo real." },
];

// NOVOS DADOS ESTRUTURADOS
const PROCESSO = [
  { step: "01", titulo: "Briefing", desc: "Entendemos seu negócio e o que você precisa." },
  { step: "02", titulo: "Design", desc: "Criamos a interface com foco no seu usuário." },
  { step: "03", titulo: "Código", desc: "Desenvolvemos com alta performance e SEO." },
  { step: "04", titulo: "Lançamento", desc: "Seu site no ar, pronto para converter." },
];

const ENTREGAS_LP = [
  { grupo: "Design & Estrutura", itens: ["Design personalizado (até 6 seções)", "Totalmente responsivo (Mobile/Desktop)", "Seção de serviços e Galeria de fotos"] },
  { grupo: "Conversão", itens: ["Botão de WhatsApp flutuante", "Formulário de contato", "Integração com Instagram e Maps"] },
  { grupo: "Técnico", itens: ["SEO Básico para o Google", "Certificado de Segurança HTTPS/SSL", "Hospedagem, publicação e 1 refação"] },
];

const MANUTENCAO = {
  preco: "59,90",
  itens: [
    "Hospedagem inclusa",
    "Domínio e SSL*",
    "Monitoramento e Backup",
    "Pequenas alterações de conteúdo",
    "Correção de problemas e Suporte"
  ]
};

const TAP_SPRING = { type: "spring", stiffness: 400, damping: 22 } as const;

/* ---------------------------------------------------------------
   PAGE
--------------------------------------------------------------- */
export default function PixelonTech() {
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleSection = useActiveSection();
  const heroRef = useRef<HTMLElement | null>(null);

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, { stiffness: 150, damping: 20, mass: 0.4 });
  const springTiltY = useSpring(tiltY, { stiffness: 150, damping: 20, mass: 0.4 });

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 900], [0, 110]);
  const contentY = useTransform(scrollY, [0, 900], [0, 40]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = hero.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      tiltX.set(nx * 1.2);
      tiltY.set(ny * -1.2);
    };
    const onPointerLeave = () => {
      tiltX.set(0);
      tiltY.set(0);
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [tiltX, tiltY]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="pxl-root min-h-screen w-full antialiased">
        <PixelStyles />

        <div className="pxl-ambient" aria-hidden="true">
          <span className="pxl-ambient-blob pxl-ambient-blob--violet" />
          <span className="pxl-ambient-blob pxl-ambient-blob--pink" />
        </div>

        <Header
          navItems={NAV_ITEMS}
          visibleSection={visibleSection}
          scrollTo={scrollTo}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          tapSpring={TAP_SPRING}
        />

        <Hero
          heroRef={heroRef}
          scrollTo={scrollTo}
          gridY={gridY}
          contentY={contentY}
          springTiltX={springTiltX}
          springTiltY={springTiltY}
          tapSpring={TAP_SPRING}
        />
        
        <QuemSomos />
        <Diferenciais items={DIFERENCIAIS} />
        <Servicos items={SERVICOS} />
        
        {/* NOVA SEÇÃO: PROCESSO */}
        <Processo items={PROCESSO} />
        
        <Projetos items={PROJETOS} />

        {/* NOVA SEÇÃO: PACOTES / ENTREGAS */}
        <Planos entregas={ENTREGAS_LP} manutencao={MANUTENCAO} tapSpring={TAP_SPRING} />

        <Contato tapSpring={TAP_SPRING} />
        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------------
   STYLES (Atualizado com as novas classes para timeline e pacotes)
--------------------------------------------------------------- */
function PixelStyles() {
  return (
    <style>{`
      .pxl-root {
        --bg: #0a0a0f;
        --bg-alt: #0d0d14;
        --card: #12121c;
        --card-hover: #15151f;
        --border: #1f1f2e;
        --text: #c8c8d4;
        --text-bright: #d4d4de;
        --text-muted: #8888a0;
        --text-dim: #5a5a72;
        --cyan: #00fff0;
        --pink: #ff2e9a;
        --violet: #7a5cff;
        background: var(--bg);
        color: var(--text);
        font-family: 'Space Grotesk', sans-serif;
        position: relative;
        overflow-x: hidden;
      }

      .pxl-ambient { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
      .pxl-ambient-blob { position: absolute; border-radius: 9999px; filter: blur(90px); opacity: .16; }
      .pxl-ambient-blob--violet { width: 520px; height: 520px; top: -120px; right: -140px; background: var(--violet); }
      .pxl-ambient-blob--pink { width: 460px; height: 460px; bottom: 10%; left: -160px; background: var(--pink); }

      .pxl-header, .pxl-hero, .pxl-section, .pxl-section-alt, .pxl-footer { position: relative; z-index: 1; }

      .pxl-header { border-bottom: 1px solid var(--border); background: rgba(10,10,15,.85); backdrop-filter: blur(10px); }

      .pxl-mark { display: grid; height: 24px; width: 24px; grid-template-columns: 1fr 1fr; grid-template-rows: 1fr 1fr; gap: 2px; }
      .pxl-mark span:nth-child(1) { background: var(--cyan); }
      .pxl-mark span:nth-child(2) { background: var(--pink); }
      .pxl-mark span:nth-child(3) { background: var(--pink); }
      .pxl-mark span:nth-child(4) { background: var(--cyan); }

      .pxl-logo-text { font-family: 'Press Start 2P', monospace; font-size: 13px; letter-spacing: .02em; color: #cccdd8; }
      .pxl-cyan, .pxl-cyan-text { color: var(--cyan); }
      .pxl-pink, .pxl-pink-text { color: var(--pink); }

      .pxl-nav-link { position: relative; color: var(--text-muted); background: none; border: none; cursor: pointer; padding-bottom: 5px; transition: color .3s ease; }
      .pxl-nav-link:hover { color: var(--cyan); }
      .pxl-nav-link.active { color: var(--text-bright); }
      .pxl-underline { position: absolute; left: 0; bottom: 0; height: 2px; width: 0; background: linear-gradient(90deg, var(--cyan), var(--pink)); transition: width .35s cubic-bezier(.16,.8,.24,1); }
      .pxl-nav-link:hover .pxl-underline, .pxl-nav-link.active .pxl-underline { width: 100%; }

      .pxl-btn-ghost, .pxl-btn-primary { border-radius: 6px; font-weight: 600; cursor: pointer; display: inline-block; transition: box-shadow .3s ease, background .3s ease, border-color .3s ease, color .3s ease; }
      .pxl-btn-primary { background: var(--cyan); color: var(--bg); border: 1px solid var(--cyan); }
      .pxl-btn-primary:hover { background: #5dfff5; box-shadow: 0 14px 32px -10px rgba(0,255,240,.55); }
      .pxl-btn-ghost { border: 1px solid var(--border); color: var(--text); background: transparent; }
      .pxl-btn-ghost:hover { border-color: rgba(255,46,154,.6); color: var(--pink); box-shadow: 0 14px 28px -12px rgba(255,46,154,.35); }

      .pxl-burger { background: none; border: none; cursor: pointer; padding: 4px; display: flex; flex-direction: column; gap: 6px; }
      .pxl-burger-line { display: block; height: 2px; width: 24px; background: var(--text); border-radius: 2px; }

      .pxl-mobile-menu { border-top: 1px solid var(--border); background: var(--bg); }
      .pxl-mobile-link { color: var(--text-muted); background: none; border: none; cursor: pointer; }
      .pxl-mobile-link:hover { color: var(--cyan); }

      .pxl-hero { border-bottom: 1px solid var(--border); transform-style: preserve-3d; will-change: transform; }
      .pxl-canvas-wrap { opacity: .75; }
      .pxl-canvas { position: absolute; inset: 0; height: 100%; width: 100%; touch-action: pan-y; }

      .pxl-hero-glow {
        position: absolute; left: 50%; top: 36%; width: 620px; height: 620px; max-width: 90vw;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(0,255,240,.18), rgba(255,46,154,.10) 42%, transparent 72%);
        filter: blur(60px);
        animation: pxlGlowPulse 8s ease-in-out infinite;
        pointer-events: none;
      }
      @keyframes pxlGlowPulse {
        0%, 100% { opacity: .55; transform: translate(-50%, -50%) scale(1); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
      }

      .pxl-scanlines {
        position: absolute; inset: 0; pointer-events: none; opacity: .35; mix-blend-mode: overlay;
        background-image: repeating-linear-gradient(to bottom, rgba(255,255,255,.05) 0px, rgba(255,255,255,.05) 1px, transparent 1px, transparent 3px);
        animation: pxlScan 10s linear infinite;
      }
      @keyframes pxlScan { 0% { background-position: 0 0; } 100% { background-position: 0 140px; } }

      .pxl-hero-fade { background: linear-gradient(to bottom, rgba(10,10,15,.1), rgba(10,10,15,.6) 60%, var(--bg)); }

      .pxl-eyebrow-pill { display: inline-block; border-radius: 999px; border: 1px solid var(--border); background: rgba(18,18,28,.8); padding: 5px 13px; font-size: 10px; letter-spacing: .16em; color: var(--text-muted); font-family: 'JetBrains Mono', monospace; }

      .pxl-title {
        margin: 0 auto; font-family: 'Press Start 2P', monospace; color: var(--text-bright);
        font-size: 28px; line-height: 1.55; position: relative;
        animation: pxlFlicker 7s infinite;
      }
      @media (min-width: 640px) { .pxl-title { font-size: 34px; } }
      @media (min-width: 768px) { .pxl-title { font-size: 44px; } }
      @keyframes pxlFlicker {
        0%, 92%, 100% { text-shadow: none; transform: translateX(0); }
        92.4% { text-shadow: -2px 0 var(--cyan), 2px 0 var(--pink); transform: translateX(-1px); }
        92.8% { text-shadow: 2px 0 var(--cyan), -2px 0 var(--pink); transform: translateX(1px); }
        93.2% { text-shadow: none; transform: translateX(0); }
        96.5% { text-shadow: -1px 0 var(--pink), 1px 0 var(--cyan); }
        96.9% { text-shadow: none; }
      }

      .pxl-lede { color: var(--text-muted); font-size: 16px; line-height: 1.7; }
      @media (min-width: 768px) { .pxl-lede { font-size: 18px; } }

      .pxl-chip { border-radius: 999px; border: 1px solid var(--border); background: rgba(18,18,28,.8); padding: 5px 13px; color: var(--text-muted); }

      .pxl-section-alt { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
      .pxl-section { border-bottom: 1px solid var(--border); }

      .pxl-eyebrow { font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: .18em; }
      .pxl-h2 { font-size: 24px; color: var(--text-bright); line-height: 1.35; }
      @media (min-width: 768px) { .pxl-h2 { font-size: 30px; } }

      .pxl-card {
        position: relative; overflow: hidden; border-radius: 12px;
        background: var(--card); border: 1px solid var(--border);
        transition: border-color .35s ease, box-shadow .35s ease, background .35s ease;
      }
      .pxl-card:hover { border-color: rgba(0,255,240,.4); background: var(--card-hover); box-shadow: 0 20px 44px -22px rgba(0,255,240,.28); }
      .pxl-card::before {
        content: ""; position: absolute; inset: 0; pointer-events: none;
        background: linear-gradient(115deg, transparent 42%, rgba(255,255,255,.07) 50%, transparent 58%);
        transform: translateX(-120%);
        transition: transform .8s ease;
      }
      .pxl-card:hover::before { transform: translateX(120%); }
      .pxl-project:hover { border-color: rgba(255,46,154,.4); box-shadow: 0 20px 40px -22px rgba(255,46,154,.28); }

      .pxl-card-title { font-size: 18px; color: #cccdd8; }
      .pxl-card-desc { font-size: 14px; line-height: 1.65; color: var(--text-muted); }

      .pxl-tag { display: inline-block; font-family: 'JetBrains Mono', monospace; font-size: 10px; letter-spacing: .16em; color: var(--cyan); }
      .pxl-tag--pink { color: var(--pink); }

      .pxl-footer { border-top: 1px solid var(--border); color: var(--text-dim); font-family: 'JetBrains Mono', monospace; font-size: 12px; }

      @media (prefers-reduced-motion: reduce) {
        .pxl-title, .pxl-hero-glow, .pxl-scanlines { animation: none !important; }
        .pxl-hero { transform: none !important; }
      }

      /* ---- NOVOS ESTILOS ADICIONADOS PARA AS NOVAS SEÇÕES ---- */
      .pxl-timeline { display: flex; flex-direction: column; gap: 2rem; position: relative; margin-top: 3rem; }
      @media (min-width: 768px) { .pxl-timeline { flex-direction: row; } }
      .pxl-timeline-step { flex: 1; padding: 1.5rem; border-left: 2px solid var(--border); position: relative; transition: border-color .3s; }
      .pxl-timeline-step:hover { border-color: var(--cyan); }
      @media (min-width: 768px) {
        .pxl-timeline-step { border-left: none; border-top: 2px solid var(--border); padding: 2rem 1rem 1rem 0; }
      }
      .pxl-timeline-num { font-family: 'Press Start 2P', monospace; font-size: 1.5rem; color: var(--bg-alt); text-shadow: -1px -1px 0 var(--cyan), 1px -1px 0 var(--cyan), -1px 1px 0 var(--cyan), 1px 1px 0 var(--cyan); margin-bottom: 1rem; display: block; opacity: 0.5; }
      .pxl-timeline-step:hover .pxl-timeline-num { opacity: 1; text-shadow: -1px -1px 0 var(--pink), 1px -1px 0 var(--pink), -1px 1px 0 var(--pink), 1px 1px 0 var(--pink); }
      
      .pxl-plan-grid { display: grid; gap: 2rem; margin-top: 3rem; }
      @media (min-width: 992px) { .pxl-plan-grid { grid-template-columns: 3fr 2fr; gap: 4rem; } }
      
      .pxl-list { list-style: none; padding: 0; margin: 0; }
      .pxl-list li { display: flex; align-items: flex-start; gap: 0.75rem; margin-bottom: 0.75rem; color: var(--text); font-size: 14px; }
      .pxl-list li::before { content: '>'; color: var(--cyan); font-family: 'JetBrains Mono', monospace; font-weight: bold; }
      
      .pxl-pricing-card { background: linear-gradient(180deg, var(--card), var(--bg-alt)); border: 1px solid var(--border); border-radius: 12px; padding: 2rem; position: relative; overflow: hidden; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5); }
      .pxl-pricing-card::after { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--cyan), var(--pink)); }
      .pxl-price { font-size: 2.5rem; font-family: 'Space Grotesk', sans-serif; font-weight: bold; color: var(--text-bright); margin: 1rem 0; display: flex; align-items: baseline; gap: 0.25rem; }
      .pxl-price span { font-size: 1rem; color: var(--text-muted); font-weight: normal; }
    `}</style>
  );
}