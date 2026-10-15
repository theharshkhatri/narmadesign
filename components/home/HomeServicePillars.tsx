const servicePillars = [
  {
    number: "01",
    title: "Brand identity & visual systems",
    detail: "Identity design, typography, and visual systems built to work together.",
  },
  {
    number: "02",
    title: "Graphic & campaign design",
    detail: "Graphic design for campaigns, communications, and digital platforms.",
  },
  {
    number: "03",
    title: "Art direction & visual exploration",
    detail: "Art direction and visual exploration shaped around each project brief.",
  },
];

export function HomeServicePillars() {
  return (
    <section className="border-y border-ink/15 bg-paper" aria-labelledby="services-heading">
      <div className="site-container py-20 sm:py-28">
        <header className="mb-12 grid gap-6 md:grid-cols-12 md:items-end sm:mb-16">
          <div className="md:col-span-8">
            <p className="mb-5 text-sm uppercase tracking-[0.14em] text-muted">Services</p>
            <h2 id="services-heading" className="editorial-title max-w-3xl text-5xl leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Design that works across platforms.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted md:col-span-4 md:justify-self-end">
            Three connected ways the studio approaches design.
          </p>
        </header>
        <ol className="grid gap-x-8 sm:grid-cols-2 xl:grid-cols-3">
          {servicePillars.map((pillar) => (
            <li key={pillar.number} className="border-t border-ink/20 py-6 sm:py-8">
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
