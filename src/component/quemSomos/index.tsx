import { motion } from "framer-motion";

const DESTAQUES = [
  { valor: "+3 anos", label: "de experiência" },
  { valor: "100%", label: "projetos responsivos" },
  { valor: "SEO", label: "otimização inclusa" },
  { valor: "Suporte", label: "após a entrega" },
];

export default function QuemSomos() {
  return (
    <motion.section
      id="quem-somos"
      className="pxl-section relative overflow-hidden scroll-mt-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="relative mx-auto max-w-6xl px-5 py-24 text-center">
        <span className="pxl-eyebrow-pill">QUEM SOMOS</span>

        <h2 className="pxl-title mx-auto mt-6 max-w-3xl">
          Programadores <span className="pxl-cyan">apaixonados</span> por{" "}
          <span className="pxl-pink">resultado</span>.
        </h2>

        <p className="pxl-lede mx-auto mt-7 max-w-2xl">
          Somos a PixelonTech: unimos front-end e back-end para criar sites que
          não são só bonitos, mas funcionam de verdade — rápidos, seguros e
          pensados pra converter.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {DESTAQUES.map((item) => (
            <div key={item.label} className="pxl-card px-4 py-6">
              <p className="pxl-cyan text-xl font-bold md:text-2xl">
                {item.valor}
              </p>
              <p className="pxl-card-desc mt-2">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
