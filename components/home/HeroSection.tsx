import { HeroMotion } from "@/components/motion/HeroMotion";
import { DiscoverLink } from "@/components/ui/DiscoverLink";
import { SignatureArtwork } from "./SignatureArtwork";

export function HeroSection() {
  return (
    <HeroMotion>
      <section
        className="relative isolate overflow-hidden border-b border-ink/15"
      >
      <div className="site-container relative flex min-h-[min(720px,calc(100svh-5rem))] flex-col justify-end py-12 sm:py-16 lg:py-20">
        <SignatureArtwork />
        <div className="relative z-10 max-w-4xl pb-5 pt-24 sm:pt-32">
          <p className="mb-6 text-xs uppercase tracking-[0.16em] text-muted sm:mb-8">NARMA.design</p>
          <h1 className="hero-title max-w-[8ch] text-[clamp(4rem,8.5vw,8rem)] font-normal leading-[0.84] tracking-[-0.075em]">
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                Design for
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                growing
              </span>
            </span>
            <span className="block overflow-hidden">
              <span data-hero-line className="block">
                brands.
              </span>
            </span>
          </h1>
          <div className="mt-8 flex flex-col items-start gap-5">
            <p data-hero-fade className="max-w-xs text-base leading-6 text-muted">
              Identity systems, graphic and campaign design, and art direction.
            </p>
            <div data-hero-fade className="flex flex-wrap gap-x-6 gap-y-0">
              <DiscoverLink href="#work" direction="down">
                Explore selected work
              </DiscoverLink>
              <DiscoverLink href="/contact">Start a project</DiscoverLink>
            </div>
          </div>
        </div>
      </div>
      </section>
    </HeroMotion>
  );
}
