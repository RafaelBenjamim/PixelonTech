import { motion } from "framer-motion";

export default function Planos({ entregas, manutencao, tapSpring }: any) {
  return (
    <section id="planos" className="pxl-section py-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        <span className="pxl-eyebrow-pill mb-4">O QUE VOCÊ RECEBE</span>
        <h2 className="pxl-h2 mb-4">Entrega completa e sem dor de cabeça</h2>
        <p className="pxl-lede max-w-2xl mb-8">
          Sua Landing Page não é apenas um design bonito, é uma estrutura completa pronta para captação e performance.
        </p>

        <div className="pxl-plan-grid">
          {/* COLUNA ESQUERDA: ENTREGAS DO PROJETO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {entregas.map((grupo: any, idx: number) => (
              <motion.div key={idx} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}>
                <h3 className="pxl-card-title mb-4 font-bold border-b border-[#1f1f2e] pb-2 inline-block">
                  {grupo.grupo}
                </h3>
                <ul className="pxl-list">
                  {grupo.itens.map((item: string, i: number) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* COLUNA DIREITA: PLANO DE MANUTENÇÃO */}
          <motion.div 
            className="pxl-pricing-card"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="pxl-tag pxl-tag--pink mb-2 block">CUIDADO CONTÍNUO</span>
            <h3 className="text-2xl font-bold text-white">Plano Sustentação</h3>
            <p className="pxl-card-desc mt-2">Deixe a tecnologia com a gente e foque no seu negócio.</p>
            
            <div className="pxl-price">
              R$ {manutencao.preco}<span>/mês</span>
            </div>

            <ul className="pxl-list mt-6 mb-8">
              {manutencao.itens.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <motion.a
              href="#contato"
              className="pxl-btn-primary w-full text-center py-3"
              whileTap={tapSpring}
            >
              Garantir meu projeto
            </motion.a>
            <p className="text-[10px] text-[#5a5a72] mt-4 text-center">
              *Domínio incluso válido para extensões padrão (.com.br).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}