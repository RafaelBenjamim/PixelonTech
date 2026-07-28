import Reveal from "../reveal";

interface ProjetoItem {
  nome: string;
  tipo: string;
  desc: string;
}

interface ProjetosProps {
  items: ProjetoItem[];
}

export default function Projetos({ items }: ProjetosProps) {
  return (
    <section id="projetos" className="pxl-section scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <Reveal tag="p" className="pxl-eyebrow pxl-cyan-text">
          PROJETOS RECENTES
        </Reveal>
        <Reveal delay={80} tag="h2" className="pxl-h2 mt-3">
          Alguns pixels que já acendemos
        </Reveal>

        <div className="mt-10 flex flex-col gap-3">
          {items.map((item, idx) => (
            <Reveal
              key={item.nome}
              delay={idx * 90}
              interactive
              className="pxl-card pxl-project flex flex-col justify-between gap-2 p-6 sm:flex-row sm:items-center"
            >
              <div>
                <h3 className="pxl-card-title">{item.nome}</h3>
                <p className="pxl-card-desc mt-1">{item.desc}</p>
              </div>
              <span className="pxl-tag pxl-tag--pink whitespace-nowrap">
                {item.tipo.toUpperCase()}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
