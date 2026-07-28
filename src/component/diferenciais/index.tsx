import Reveal from "../reveal";

interface DiferencialItem {
  titulo: string;
  desc: string;
}

interface DiferenciaisProps {
  items: DiferencialItem[];
}

export default function Diferenciais({ items }: DiferenciaisProps) {
  return (
    <section className="pxl-section-alt">
      <div className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {items.map((item, idx) => (
            <Reveal
              key={item.titulo}
              delay={idx * 90}
              interactive
              className="pxl-card p-6"
            >
              <h3 className="pxl-card-title">{item.titulo}</h3>
              <p className="pxl-card-desc mt-2">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
