import { useEffect, useRef, useState } from "react";

function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const CELL = 14;
    const GAP = 3;
    const COLORS = ["#00fff0", "#ff2e9a", "#7a5cff"];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cells: { phase: number; speed: number; colorIdx: number }[] = [];
    let raf = 0;
    let t = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;
      cols = Math.floor(width / (CELL + GAP));
      rows = Math.floor(height / (CELL + GAP));
      cells = new Array(cols * rows).fill(0).map(() => ({
        phase: Math.random() * Math.PI * 2,
        speed: 0.005 + Math.random() * 0.012,
        colorIdx: Math.floor(Math.random() * COLORS.length),
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cell = cells[i];
          const x = c * (CELL + GAP);
          const y = r * (CELL + GAP);

          const dx = mouseRef.current.x - (x + CELL / 2);
          const dy = mouseRef.current.y - (y + CELL / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 140);

          const ambient = (Math.sin(t * cell.speed * 40 + cell.phase) + 1) / 2;
          const alpha = Math.min(1, ambient * 0.16 + proximity * 0.9);

          if (alpha > 0.03) {
            ctx.fillStyle = COLORS[cell.colorIdx];
            ctx.globalAlpha = alpha;
            ctx.fillRect(x, y, CELL, CELL);
          }
        }
      }
      ctx.globalAlpha = 1;
      t += 1;
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onResize = () => resize();
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("resize", onResize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

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

const DIFERENCIALS = [
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
];

export default function PixelonTech() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visibleSection, setVisibleSection] = useState("topo");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const sections = ["topo", "servicos", "projetos", "contato"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const bottom = top + element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < bottom) {
            setVisibleSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ x: event.clientX, y: event.clientY });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="min-h-screen w-full bg-[#0a0a0f] text-[#c8c8d4] antialiased"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <header className="sticky top-0 z-50 border-b border-[#1f1f2e]/80 bg-[#0a0a0f]/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <button
            onClick={() => scrollTo("topo")}
            className="flex items-center gap-2"
          >
            <span className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-[2px]">
              <span className="bg-[#00fff0]" />
              <span className="bg-[#ff2e9a]" />
              <span className="bg-[#ff2e9a]" />
              <span className="bg-[#00fff0]" />
            </span>
            <span
              className="text-[13px] tracking-wide text-[#cccdd8]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              pixelon<span className="text-[#00fff0]">Tech</span>
            </span>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-[#a8a8c0] md:flex">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="transition hover:text-[#00fff0]"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => scrollTo("contato")}
            className="hidden rounded border border-[#00fff0]/40 px-4 py-1.5 text-sm text-[#00fff0] transition hover:bg-[#00fff0]/10 md:block"
          >
            Falar agora
          </button>

          <button
            className="text-[#c8c8d4] md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Abrir menu"
          >
            <span className="block h-[2px] w-6 bg-current" />
            <span className="mt-1.5 block h-[2px] w-6 bg-current" />
            <span className="mt-1.5 block h-[2px] w-4 bg-current" />
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col gap-4 border-t border-[#1f1f2e] px-5 py-4 text-sm text-[#a8a8c0] md:hidden">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <section
        id="topo"
        className={`relative overflow-hidden border-b border-[#1f1f2e] scroll-mt-24 transition-all duration-700 ${
          visibleSection === "topo" ? "opacity-100" : "opacity-80"
        }`}
        style={{
          transform: `perspective(1200px) rotateX(${mousePosition.y > 0 ? (mousePosition.y / 1000) * 0.4 : 0}deg) rotateY(${mousePosition.x > 0 ? (mousePosition.x / 1200) * 0.4 : 0}deg)`,
        }}
      >
        <div className="absolute inset-0 opacity-70">
          <PixelGrid />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/10 via-[#0a0a0f]/60 to-[#0a0a0f]" />

        <div className="relative mx-auto max-w-6xl px-5 py-28 text-center md:py-36">
          <span
            className="inline-block rounded-full border border-[#2a2a3a] bg-[#12121c]/80 px-3 py-1 text-[10px] tracking-widest text-[#8888a0]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            SITES SOB MEDIDA · FRONT + BACK-END
          </span>

          <h1
            className="mx-auto mt-6 max-w-3xl text-3xl leading-tight text-[#d4d4de] sm:text-4xl md:text-5xl"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              lineHeight: 1.5,
            }}
          >
            Seu site, <span className="text-[#00fff0]">pixel</span> por{" "}
            <span className="text-[#ff2e9a]">pixel</span>.
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-base text-[#a8a8c0] md:text-lg">
            Estratégia, design e tecnologia trabalhando juntos para transformar
            sua presença digital em uma experiência profissional e objetiva.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              onClick={() => scrollTo("contato")}
              className="rounded bg-[#00fff0] px-7 py-3 text-sm font-semibold text-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:bg-[#5dfff5]"
            >
              Pedir orçamento
            </button>
            <button
              onClick={() => scrollTo("projetos")}
              className="rounded border border-[#2a2a3a] px-7 py-3 text-sm text-[#c8c8d4] transition duration-300 hover:-translate-y-1 hover:border-[#ff2e9a]/60 hover:text-[#ff2e9a]"
            >
              Ver projetos
            </button>
          </div>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-[#a8a8c0]">
            <span className="rounded-full border border-[#1f1f2e] bg-[#12121c]/80 px-3 py-1">
              Performance
            </span>
            <span className="rounded-full border border-[#1f1f2e] bg-[#12121c]/80 px-3 py-1">
              Design claro
            </span>
            <span className="rounded-full border border-[#1f1f2e] bg-[#12121c]/80 px-3 py-1">
              Integrações reais
            </span>
          </div>
        </div>
      </section>

      <section className="border-b border-[#1f1f2e] bg-[#0d0d14]">
        <div className="mx-auto max-w-6xl px-5 py-16">
          <div className="grid gap-4 md:grid-cols-3">
            {DIFERENCIALS.map((item) => (
              <div
                key={item.titulo}
                className="rounded-xl border border-[#1f1f2e] bg-[#12121c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00fff0]/40"
              >
                <h3 className="text-lg text-[#cccdd8]">{item.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8888a0]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="servicos"
        className="border-b border-[#1f1f2e] bg-[#0d0d14] scroll-mt-24"
      >
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p
            className="text-[11px] tracking-widest text-[#ff2e9a]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            O QUE EU FAÇO
          </p>
          <h2 className="mt-3 text-2xl text-[#d4d4de] md:text-3xl">
            Da tela ao servidor
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {SERVICOS.map((s) => (
              <div
                key={s.titulo}
                className={`group rounded-lg border border-[#1f1f2e] bg-[#12121c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00fff0]/40 ${
                  visibleSection === "servicos"
                    ? "shadow-[0_0_25px_rgba(0,255,240,0.12)]"
                    : ""
                }`}
              >
                <span
                  className="text-[10px] tracking-widest text-[#00fff0]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {s.tag}
                </span>
                <h3 className="mt-3 text-lg text-[#cccdd8]">{s.titulo}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8888a0]">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projetos" className="border-b border-[#1f1f2e] scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p
            className="text-[11px] tracking-widest text-[#00fff0]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            PROJETOS RECENTES
          </p>
          <h2 className="mt-3 text-2xl text-[#d4d4de] md:text-3xl">
            Alguns pixels que já acendi
          </h2>

          <div className="mt-10 flex flex-col gap-3">
            {PROJETOS.map((p) => (
              <div
                key={p.nome}
                className={`flex flex-col justify-between gap-2 rounded-lg border border-[#1f1f2e] bg-[#12121c] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#ff2e9a]/40 sm:flex-row sm:items-center ${
                  visibleSection === "projetos"
                    ? "shadow-[0_0_20px_rgba(255,46,154,0.12)]"
                    : ""
                }`}
              >
                <div>
                  <h3 className="text-lg text-[#cccdd8]">{p.nome}</h3>
                  <p className="mt-1 text-sm text-[#8888a0]">{p.desc}</p>
                </div>
                <span
                  className="whitespace-nowrap text-[10px] tracking-widest text-[#ff2e9a]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {p.tipo.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contato" className="bg-[#0d0d14] scroll-mt-24">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          <p
            className="text-[11px] tracking-widest text-[#ff2e9a]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            VAMOS COMEÇAR
          </p>
          <h2 className="mx-auto mt-3 max-w-xl text-2xl text-[#d4d4de] md:text-3xl">
            Conte-me o que você precisa e eu te devolvo uma proposta objetiva.
          </h2>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="https://wa.me/5534998659520"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded bg-[#00fff0] px-7 py-3 text-sm font-semibold text-[#0a0a0f] transition duration-300 hover:-translate-y-1 hover:bg-[#5dfff5]"
            >
              Chamar no WhatsApp
            </a>
            <a
              href="mailto:contato@pixelontech.com"
              className="rounded border border-[#2a2a3a] px-7 py-3 text-sm text-[#c8c8d4] transition duration-300 hover:-translate-y-1 hover:border-[#00fff0]/60 hover:text-[#00fff0]"
            >
              contato@pixelontech.com
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#1f1f2e] px-5 py-8 text-center text-xs text-[#5a5a72]">
        <p style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          © {new Date().getFullYear()} pixelonTech — todos os pixels reservados.
        </p>
      </footer>
    </div>
  );
}
