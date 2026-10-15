"use client";

import { ImageLoupe } from "@/components/ui/ImageLoupe";
import { capabilities } from "@/content/capabilities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const entries = root.querySelectorAll<HTMLElement>("[data-service-entry]");
        const activeTimelines: gsap.core.Timeline[] = [];
        const triggers = ScrollTrigger.batch(entries, {
          start: "top 86%",
          once: true,
          onEnter: (elements) => {
            const images = elements
              .map((element) => element.querySelector<HTMLElement>("[data-service-image]"))
              .filter((element): element is HTMLElement => Boolean(element));
            const copy = elements
              .map((element) => element.querySelector<HTMLElement>("[data-service-copy]"))
              .filter((element): element is HTMLElement => Boolean(element));
            const timeline = gsap.timeline();
            activeTimelines.push(timeline);
            timeline.eventCallback("onComplete", () => {
              const index = activeTimelines.indexOf(timeline);
              if (index !== -1) activeTimelines.splice(index, 1);
            });
            timeline.fromTo(
              images,
              { clipPath: "inset(12% 0 0)", scale: 1.04 },
              { clipPath: "inset(0% 0 0)", scale: 1, duration: 0.8, stagger: 0.12, ease: "power3.out" },
            );
            timeline.fromTo(
              copy,
              { y: 18, autoAlpha: 0 },
              { y: 0, autoAlpha: 1, duration: 0.5, stagger: 0.08, ease: "power2.out" },
              "<0.16",
            );
          },
        });
        return () => {
          triggers.forEach((trigger) => trigger.kill());
          activeTimelines.forEach((timeline) => timeline.kill());
        };
      });
      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={scope} className="border-y border-ink/15 bg-paper" aria-labelledby="services-heading">
      <div className="site-container py-20 sm:py-28">
        <header className="mb-12 grid gap-6 md:grid-cols-12 md:items-end sm:mb-16">
          <div className="md:col-span-8">
            <p className="mb-5 text-sm uppercase tracking-[0.14em] text-muted">Scope, by brief</p>
          <h2 id="services-heading" className="editorial-title max-w-3xl text-5xl leading-[0.94] tracking-[-0.055em] sm:text-7xl">
              Possible outputs, clearly defined.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted md:col-span-4 md:justify-self-end">
            This list is illustrative. Deliverables are agreed for each project.
          </p>
        </header>

        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-4 lg:gap-x-8">
          {capabilities.map((service, index) => {
            return (
            <article key={service.title} data-service-entry className="group service-entry">
              <ImageLoupe
                dataServiceImage
                src={service.image}
                alt={`${service.title} category image`}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                className="service-image relative aspect-[4/3] bg-stone"
                imageClassName="object-contain p-4"
              >
              </ImageLoupe>
              <div data-service-copy>
                <div className="mt-5 flex items-baseline gap-4 border-b border-ink/15 pb-4">
                  <span className="text-xs text-muted">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="editorial-title text-2xl tracking-[-0.025em] sm:text-3xl">{service.title}</h3>
                </div>
                <p className="max-w-sm pt-4 text-sm leading-6 text-muted">{service.detail}</p>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
