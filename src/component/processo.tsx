import { motion } from "framer-motion";

export default function Processo({ items }: { items: any[] }) {
  return (
    <section id="processo" className="pxl-section-alt py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <span className="pxl-eyebrow-pill mb-4">METODOLOGIA</span>
        <h2 className="pxl-h2 mb-4">Como funciona o projeto?</h2>
        <p className="pxl-lede max-w-2xl mb-12">
          Sem surpresas ou dores de cabeça. Nosso processo é transparente do início ao fim para garantir que o resultado final supere suas expectativas.
        </p>

        <div className="pxl-timeline">
          {items.map((item, idx) => (
            <motion.div
              key={idx}
              className="pxl-timeline-step"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
            >
              <span className="pxl-timeline-num">{item.step}</span>
              <h3 className="text-lg font-bold text-white mb-2">{item.titulo}</h3>
              <p className="pxl-card-desc">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}