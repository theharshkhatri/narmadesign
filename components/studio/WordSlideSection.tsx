"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const words = ["Identity,", "campaigns,", "print", "and", "digital."];

export function WordSlideSection() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const stage = root.querySelector<HTMLElement>("[data-word-slide-stage]");
        const wordElements = root.querySelectorAll<HTMLElement>("[data-word-slide-word]");

        if (!stage || wordElements.length === 0) {
          return;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: "+=900",
            pin: stage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(
          wordElements,
          { yPercent: 110, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            stagger: 0.18,
          },
        );

        return () => timeline.scrollTrigger?.kill();
      });

      return () => media.revert();
    }, scope);

    return () => context.revert();
  }, []);

  return (
    <section
      ref={scope}
      className="border-y border-ink/15 bg-stone"
      aria-labelledby="word-slide-heading"
    >
      <div
        data-word-slide-stage
        className="site-container flex min-h-[min(72vh,46rem)] flex-col justify-between py-16 sm:py-24"
      >
        <div className="flex items-start justify-between gap-8">
          <p className="text-sm uppercase tracking-[0.14em] text-muted">Studio / Practice</p>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-muted sm:block">
            Working across identity, graphic design and visual exploration.
          </p>
        </div>

        <div className="max-w-5xl">
          <h2
            id="word-slide-heading"
            className="flex flex-wrap gap-x-[0.24em] gap-y-1 text-5xl leading-[0.9] tracking-[-0.06em] sm:text-8xl"
          >
            {words.map((word, index) => (
              <span key={`${word}-${index}`} data-word-slide-word className="inline-block">
                {word}
              </span>
            ))}
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-muted">NARMA.DESIGN · Independent studio</p>
      </div>
    </section>
  );
}
