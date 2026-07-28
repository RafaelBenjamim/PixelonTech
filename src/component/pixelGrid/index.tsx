import { useEffect, useRef } from "react";

interface PixelCell {
  phase: number;
  speed: number;
  colorPhase: number;
  colorSpeed: number;
}

interface Pulse {
  start: number;
  kind: "scroll" | "tap";
  x: number;
  y: number;
}

export default function PixelGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const pulsesRef = useRef<Pulse[]>([]);
  const lastScrollPulseRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const GAP = 3;
    const MAX_CELLS = 2400;
    const COLOR_STOPS: [number, number, number][] = [
      [0, 255, 240],
      [255, 46, 154],
      [122, 92, 255],
    ];

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    let cellSize = 14;
    let cells: PixelCell[] = [];
    let raf = 0;
    let t = 0;

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    const blend = (phase: number): [number, number, number] => {
      const n = COLOR_STOPS.length;
      const p = ((phase % n) + n) % n;
      const i0 = Math.floor(p);
      const i1 = (i0 + 1) % n;
      const k = p - i0;
      const c0 = COLOR_STOPS[i0];
      const c1 = COLOR_STOPS[i1];
      return [
        Math.round(lerp(c0[0], c1[0], k)),
        Math.round(lerp(c0[1], c1[1], k)),
        Math.round(lerp(c0[2], c1[2], k)),
      ];
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = canvas.width = rect.width;
      height = canvas.height = rect.height;

      cellSize = 14;
      cols = Math.floor(width / (cellSize + GAP));
      rows = Math.floor(height / (cellSize + GAP));
      while (cols * rows > MAX_CELLS && cellSize < 40) {
        cellSize += 2;
        cols = Math.floor(width / (cellSize + GAP));
        rows = Math.floor(height / (cellSize + GAP));
      }

      cells = new Array(Math.max(cols * rows, 0)).fill(0).map(() => ({
        phase: Math.random() * Math.PI * 2,
        speed: 0.004 + Math.random() * 0.01,
        colorPhase: Math.random() * 3,
        colorSpeed: 0.05 + Math.random() * 0.09,
      }));
    };

    const draw = () => {
      if (!visibleRef.current) {
        raf = requestAnimationFrame(draw);
        return;
      }

      const now = performance.now();
      pulsesRef.current = pulsesRef.current.filter(
        (p) => now - p.start < (p.kind === "scroll" ? 1000 : 650),
      );

      ctx.clearRect(0, 0, width, height);
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c;
          const cell = cells[i];
          if (!cell) continue;
          const x = c * (cellSize + GAP);
          const y = r * (cellSize + GAP);

          const dx = mouseRef.current.x - (x + cellSize / 2);
          const dy = mouseRef.current.y - (y + cellSize / 2);
          const dist = Math.sqrt(dx * dx + dy * dy);
          const proximity = Math.max(0, 1 - dist / 140);

          const ambient = (Math.sin(t * cell.speed * 40 + cell.phase) + 1) / 2;

          let wave = 0;
          for (let pi = 0; pi < pulsesRef.current.length; pi++) {
            const p = pulsesRef.current[pi];
            const elapsed = now - p.start;
            if (p.kind === "scroll") {
              const waveY = (elapsed / 1000) * (height + 220) - 110;
              const d = Math.abs(y - waveY);
              const band = Math.max(0, 1 - d / 85) * (1 - elapsed / 1000);
              if (band * 0.55 > wave) wave = band * 0.55;
            } else {
              const radius = (elapsed / 650) * 260;
              const ddx = x + cellSize / 2 - p.x;
              const ddy = y + cellSize / 2 - p.y;
              const dist2 = Math.sqrt(ddx * ddx + ddy * ddy);
              const ring =
                Math.max(0, 1 - Math.abs(dist2 - radius) / 46) *
                Math.max(0, 1 - elapsed / 650);
              if (ring * 0.8 > wave) wave = ring * 0.8;
            }
          }

          const alpha = Math.min(1, ambient * 0.14 + proximity * 0.9 + wave);

          if (alpha > 0.03) {
            const [rr, gg, bb] = blend(
              t * cell.colorSpeed * 0.01 + cell.colorPhase,
            );
            ctx.fillStyle = `rgb(${rr},${gg},${bb})`;
            ctx.globalAlpha = alpha;
            ctx.fillRect(x, y, cellSize, cellSize);
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
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onPointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current = { x, y };
      pulsesRef.current.push({ start: performance.now(), kind: "tap", x, y });
    };
    const onPointerUp = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") {
        mouseRef.current = { x: -9999, y: -9999 };
      }
    };
    const onPointerLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };
    const onScroll = () => {
      const now = performance.now();
      if (now - lastScrollPulseRef.current > 380) {
        pulsesRef.current.push({ start: now, kind: "scroll", x: 0, y: 0 });
        lastScrollPulseRef.current = now;
      }
    };

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    visibilityObserver.observe(canvas);

    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown, { passive: true });
    canvas.addEventListener("pointerup", onPointerUp, { passive: true });
    canvas.addEventListener("pointercancel", onPointerUp, { passive: true });
    canvas.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      visibilityObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="pxl-canvas" aria-hidden="true" />;
}
