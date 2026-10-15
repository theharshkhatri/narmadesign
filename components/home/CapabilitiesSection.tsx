import { capabilities } from "@/content/capabilities";

export function CapabilitiesSection() {
  return (
    <section id="capabilities" className="border-y border-ink/15 bg-paper py-16 sm:py-20" aria-labelledby="capability-list-heading">
      <div className="site-container">
        <header className="mb-10 grid gap-5 border-b border-ink/20 pb-6 sm:mb-12 sm:grid-cols-12 sm:items-end">
          <div className="sm:col-span-7">
            <p className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">Illustrative scope</p>
            <h2 id="capability-list-heading" className="editorial-title text-4xl tracking-[-0.05em] sm:text-6xl">Possible applications</h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-muted sm:col-span-5 sm:justify-self-end">
            Examples to set direction. The agreed brief defines the scope.
          </p>
        </header>
        <ol className="grid gap-x-10 sm:grid-cols-2">
          {capabilities.map((capability, index) => (
            <li key={capability.title} className="grid grid-cols-[2rem_1fr] gap-x-4 border-b border-ink/15 py-6 sm:py-7">
              <span className="pt-1 text-xs tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="editorial-title text-2xl tracking-[-0.03em] sm:text-3xl">{capability.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-6 text-muted">{capability.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
