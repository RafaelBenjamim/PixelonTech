import { motion } from "framer-motion";
import Reveal from "../reveal";

interface ContatoProps {
  tapSpring: {
    type: "spring";
    stiffness: number;
    damping: number;
  };
}

export default function Contato({ tapSpring }: ContatoProps) {
  return (
    <section id="contato" className="pxl-section-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 text-center md:py-24">
        <Reveal tag="p" className="pxl-eyebrow pxl-pink-text mx-auto">
          VAMOS COMEÇAR
        </Reveal>
        <Reveal delay={80} tag="h2" className="pxl-h2 mx-auto mt-3 max-w-xl">
          Conte-me o que você precisa e eu te devolvo uma proposta objetiva.
        </Reveal>

        <Reveal
          delay={160}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <motion.a
            href="https://wa.me/5534998659520"
            target="_blank"
            rel="noopener noreferrer"
            className="pxl-btn-primary px-7 py-3 text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96, y: -1 }}
            transition={tapSpring}
          >
            Chamar no WhatsApp
          </motion.a>
          <motion.a
            href="mailto:contato@pixelontech.com"
            className="pxl-btn-ghost px-7 py-3 text-sm"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.96, y: -1 }}
            transition={tapSpring}
          >
            tpixelon@gmail.com
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
}
