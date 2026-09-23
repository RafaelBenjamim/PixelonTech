import Reveal from "../reveal";

interface ProjetoItem {
  nome: string;
  tipo: string;
  desc: string;
  link?: string;
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
          {items.map((item, idx) => {
            const content = (
              <>
                <div className="flex-1">
                  <h3 className="pxl-card-title flex items-center gap-2">
                    {item.nome}
                    {item.link && (
                      <span className="text-[14px] text-[#00fff0] opacity-80 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                        ↗
                      </span>
                    )}
                  </h3>
                  <p className="pxl-card-desc mt-1">{item.desc}</p>
                </div>
                <span className="pxl-tag pxl-tag--pink whitespace-nowrap mt-4 sm:mt-0">
                  {item.tipo.toUpperCase()}
                </span>
              </>
            );

            return (
              <Reveal
                key={item.nome}
                delay={idx * 90}
                interactive
                tag={item.link ? "a" : "div"}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                // A MÁGICA ACONTECE AQUI: Forçamos o redirecionamento via JS
                onClick={item.link ? () => window.open(item.link, "_blank") : undefined}
                className={`pxl-card pxl-project flex flex-col justify-between gap-2 p-6 sm:flex-row sm:items-center ${
                  item.link ? "cursor-pointer group" : ""
                }`}
              >
                {content}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}