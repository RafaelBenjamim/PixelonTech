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

/* ---------------------------------------------------------------
   HOOKS
--------------------------------------------------------------- */

const SECTION_IDS = ["topo", "servicos", "projetos", "contato"] as const;

/**
 * Scroll-spy via IntersectionObserver instead of a scroll listener that
 * recalculates offsets on every pixel. Fires only when a section actually
 * crosses the detection band, which is what was mainly responsible for the
 * stutter while scrolling.
 */
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
  { label: "Serviços", id: "servicos" },
  { label: "Projetos", id: "projetos" },
  { label: "Contato", id: "contato" },
];

const SERVICOS = [
  {
    tag: "LANDING PAGE",
    titulo: "Página de conversão",
    desc: "Estrutura enxuta, visual forte e foco em transformar visitas em contatos, vendas ou agendamentos.",
  },
  {
    tag: "SITE INSTITUCIONAL",
    titulo: "Presença completa",
    desc: "Uma presença digital sólida, com conteúdos bem organizados e navegação que guia o visitante com clareza.",
  },
  {
    tag: "BACK-END & INTEGRAÇÕES",
    titulo: "Funcionalidade real",
    desc: "APIs, automações, painéis e integrações para o site fazer mais do que impressionar: entregar valor.",
  },
  {
    tag: "MANUTENÇÃO",
    titulo: "Acompanhamento contínuo",
    desc: "Atualizações, ajustes e evolução do projeto depois do lançamento, sem perder o controle do que já funciona.",
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
  {
    nome: "Allp Fit",
    tipo: "Landing page — academia",
    desc: "Página de captação de alunos com identidade visual voltada a performance.",
  },
  {
    nome: "Fiorella",
    tipo: "Landing page + API",
    desc: "Site com integração de back-end para um negócio local, unindo apresentação e funcionalidade.",
  },
  {
    nome: "Ajiê Espelhos",
    tipo: "Proposta de landing page",
    desc: "Vitrine digital para loja de espelhos decorativos, pensada para redes sociais.",
  },
  {
    nome: "Jp Barbearia",
    tipo: "Sistema de fila para clientes",
    desc: "Sistema de fila virtual que permite aos clientes acompanhar, em tempo real, a ordem de atendimento da barbearia de forma online, evitando esperas desnecessárias",
  },
];

const TAP_SPRING = { type: "spring", stiffness: 400, damping: 22 } as const;

/* ---------------------------------------------------------------
   PAGE
--------------------------------------------------------------- */

export default function PixelonTech() {
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleSection = useActiveSection();
  const heroRef = useRef<HTMLElement | null>(null);

  // Tilt + parallax as MotionValues: they update the DOM directly through
  // Framer Motion's own scheduler and never trigger a React re-render.
  // This — not the canvas — was the main source of the stutter, since the
  // previous version called setState on every scroll/mousemove event.
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const springTiltX = useSpring(tiltX, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });
  const springTiltY = useSpring(tiltY, {
    stiffness: 150,
    damping: 20,
    mass: 0.4,
  });

  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 900], [0, 110]);
  const contentY = useTransform(scrollY, [0, 900], [0, 40]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const onPointerMove = (e: PointerEvent) => {
      // Only a real mouse tilts the card — on touch this would fight the
      // scroll gesture and just feel janky, so touch is left alone here
      // and gets its own feedback (ripple + tap) inside the pixel grid.
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

        <Diferenciais items={DIFERENCIAIS} />
        <Servicos items={SERVICOS} />
        <Projetos items={PROJETOS} />
        <Contato tapSpring={TAP_SPRING} />
        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ---------------------------------------------------------------
   STYLES — real CSS classes (no JIT / arbitrary-value dependency)
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
    `}</style>
  );
}
