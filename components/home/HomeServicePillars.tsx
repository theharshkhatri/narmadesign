import Image from "next/image";

const servicePillars = [
  {
    number: "01",
    title: "Identity & visual systems",
    detail: "A coherent identity system across marks, typography, color, and use.",
    artwork: "/artwork/narma-identity-study.webp",
    alt: "A folded ivory paper form between black, cobalt, and gold geometric shapes.",
  },
  {
    number: "02",
    title: "Graphic & campaign design",
    detail: "Clear visual communication for campaigns, publications, and digital use.",
    artwork: "/artwork/narma-campaign-study.webp",
    alt: "A tactile screen-printed poster with a vermilion circle and black curved form.",
  },
  {
    number: "03",
    title: "Art direction & exploration",
    detail: "A visual point of view developed around the subject and the brief.",
    artwork: "/artwork/narma-direction-study.webp",
    alt: "A cobalt glass form, terracotta vessel, gold sheet, and ivory linen in directional light.",
  },
];

export function HomeServicePillars() {
  return (
    <section className="border-y border-ink/15 bg-paper" aria-labelledby="services-heading">
      <div className="site-container py-20 sm:py-28">
        <header className="mb-12 grid gap-6 md:grid-cols-12 md:items-end sm:mb-16">
          <div className="md:col-span-8">
            <p className="mb-5 text-sm uppercase tracking-[0.14em] text-muted">Selected service areas</p>
            <h2 id="services-heading" className="editorial-title max-w-3xl text-5xl leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Identity, campaigns, and art direction.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted md:col-span-4 md:justify-self-end">
            The deliverables and scope are agreed around each project brief.
          </p>
        </header>
        <ol className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {servicePillars.map((pillar) => (
            <li key={pillar.number} className="border-t border-ink/20 py-6 sm:py-8">
              <figure className="mb-7">
                <Image
                  src={pillar.artwork}
                  alt={pillar.alt}
                  width={1200}
                  height={800}
                  sizes="(min-width: 1280px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="aspect-[3/2] w-full object-cover"
                />
                <figcaption className="mt-2 text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                  Self-initiated visual study
                </figcaption>
              </figure>
              <p className="mb-8 text-xs tracking-[0.12em] text-muted">{pillar.number}</p>
              <h3 className="editorial-title max-w-sm text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">{pillar.title}</h3>
              <p className="mt-4 max-w-sm text-sm leading-6 text-muted">{pillar.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
