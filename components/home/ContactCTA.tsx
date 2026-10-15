import { DiscoverLink } from "@/components/ui/DiscoverLink";

export function ContactCTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="site-container py-20 sm:py-28">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.16em] text-paper/70">Have a brief in mind?</p>
            <h2 className="editorial-title max-w-3xl text-5xl leading-[0.9] tracking-[-0.06em] sm:text-7xl">
              Let’s talk about the work.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-5">
            <DiscoverLink href="/contact" tone="dark" className="w-fit">
              Start a project
            </DiscoverLink>
            <a className="text-sm text-paper/80 underline decoration-paper/40 underline-offset-4 hover:decoration-paper" href="mailto:narma.design@gmail.com">narma.design@gmail.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
