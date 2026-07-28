import Reveal from "../reveal";

interface ServicoItem {
  tag: string;
  titulo: string;
  desc: string;
}

interface ServicosProps {
  items: ServicoItem[];
}

export default function Servicos({ items }: ServicosProps) {
  return (
    <section id="servicos" className="pxl-section-alt scroll-mt-24">
      <div className="mx-auto max-w-6xl px-5 py-20 md:py-24">
        <Reveal tag="p" className="pxl-eyebrow pxl-pink-text">
          O QUE FAZEMOS
        </Reveal>
        <Reveal delay={80} tag="h2" className="pxl-h2 mt-3">
          Da tela ao servidor
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {items.map((item, idx) => (
            <Reveal
              key={item.titulo}
              delay={idx * 90}
              interactive
              className="pxl-card p-6"
            >
              <span className="pxl-tag">{item.tag}</span>
              <h3 className="pxl-card-title mt-3">{item.titulo}</h3>
              <p className="pxl-card-desc mt-2">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
