import { DiscoverLink } from "@/components/ui/DiscoverLink";

export function ContactCTA() {
  return (
    <section className="bg-ink text-paper">
      <div className="site-container py-20 sm:py-28">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="editorial-title max-w-3xl text-5xl leading-[0.9] tracking-[-0.06em] sm:text-7xl">
            Have a project in mind?
          </h2>
          <DiscoverLink href="/contact" tone="dark" className="w-fit">
            Start a project
          </DiscoverLink>
        </div>
      </div>
    </section>
  );
}
