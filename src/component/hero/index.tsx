import { motion, type MotionValue } from "framer-motion";
import type { RefObject } from "react";
import PixelGrid from "../pixelGrid";

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>;
  scrollTo: (id: string) => void;
  gridY: number | MotionValue<number>;
  contentY: number | MotionValue<number>;
  springTiltX: number | MotionValue<number>;
  springTiltY: number | MotionValue<number>;
  tapSpring: {
    type: "spring";
    stiffness: number;
    damping: number;
  };
}

export default function Hero({
  heroRef,
  scrollTo,
  gridY,
  contentY,
  springTiltX,
  springTiltY,
  tapSpring,
}: HeroProps) {
  return (
    <motion.section
      id="topo"
      ref={heroRef}
      className="pxl-hero relative overflow-hidden scroll-mt-24"
      style={{
        rotateX: springTiltY,
        rotateY: springTiltX,
        transformPerspective: 1200,
      }}
    >
      <motion.div
        className="pxl-canvas-wrap absolute inset-0"
        style={{ y: gridY }}
      >
        <PixelGrid />
      </motion.div>
      <div className="pxl-hero-glow" />
      <div className="pxl-scanlines" />
      <div className="pxl-hero-fade pointer-events-none absolute inset-0" />

      <motion.div
        className="relative mx-auto max-w-6xl px-5 py-28 text-center md:py-36"
        style={{ y: contentY }}
      >
        <span className="pxl-eyebrow-pill">
          SITES SOB MEDIDA · FRONT + BACK-END
        </span>

        <h1 className="pxl-title mx-auto mt-6 max-w-3xl">
          Seu site, <span className="pxl-cyan">pixel</span> por{" "}
          <span className="pxl-pink">pixel</span>.
        </h1>

        <p className="pxl-lede mx-auto mt-7 max-w-2xl">
          Estratégia, design e tecnologia trabalhando juntos para transformar
          sua presença digital em uma experiência profissional e objetiva.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <motion.button
            onClick={() => scrollTo("contato")}
            className="pxl-btn-primary px-7 py-3 text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96, y: -1 }}
            transition={tapSpring}
          >
            Pedir orçamento
          </motion.button>
          <motion.button
            onClick={() => scrollTo("projetos")}
            className="pxl-btn-ghost px-7 py-3 text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96, y: -1 }}
            transition={tapSpring}
          >
            Ver projetos
          </motion.button>
        </div>

        <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3 text-sm">
          <span className="pxl-chip">Performance</span>
          <span className="pxl-chip">Design claro</span>
          <span className="pxl-chip">Integrações reais</span>
        </div>
      </motion.div>
    </motion.section>
  );
}
