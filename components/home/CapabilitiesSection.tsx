"use client";

import { ImageLoupe } from "@/components/ui/ImageLoupe";
import { capabilities } from "@/content/capabilities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function CapabilitiesSection() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.querySelector<HTMLElement>("[data-capabilities-stage]");
        const cards = Array.from(root.querySelectorAll<HTMLElement>("[data-capability-card]"));
        const details = Array.from(root.querySelectorAll<HTMLElement>("[data-capability-detail]"));
        if (!stage || cards.length < 2 || details.length !== cards.length) return;

        root.classList.add("capabilities-motion-ready");
        gsap.set(cards, { xPercent: -50, yPercent: -50 });
        gsap.set(details, { autoAlpha: 0 });
        gsap.set(details[details.length - 1], { autoAlpha: 1 });

        const cardStep = () => Math.max(...cards.map((card) => card.offsetWidth)) + 32;
        const middle = (cards.length - 1) / 2;
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: () => `+=${Math.max(1800, cards.length * 320)}`,
            pin: stage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(cards, {
          x: (index) => (index - middle) * 10,
          y: (index) => Math.abs(index - middle) * 8,
          rotate: (index) => (index - middle) * 3,
          scale: 0.94,
        }, {
          x: (index) => (index - middle) * 34,
          y: (index) => Math.abs(index - middle) * 3,
          rotate: (index) => (index - middle) * 2,
          scale: 1,
          duration: 1.1,
          stagger: 0.06,
          ease: "power3.out",
        });
        timeline.to(cards, {
          x: (index) => index * cardStep(),
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power2.inOut",
        });
        timeline.to(details[details.length - 1], { autoAlpha: 0, duration: 0.16 }, "<");
        timeline.to(details[0], { autoAlpha: 1, duration: 0.16 }, "<");

        for (let active = 1; active < cards.length; active += 1) {
          timeline.to(cards, {
            x: (index) => (index - active) * cardStep(),
            rotate: (index) => Math.max(-2, Math.min(2, (index - active) * 0.5)),
            duration: 0.82,
            ease: "power2.inOut",
          });
          timeline.to(details[active - 1], { autoAlpha: 0, duration: 0.16 }, "<");
          timeline.to(details[active], { autoAlpha: 1, duration: 0.16 }, "<");
        }

        return () => {
          timeline.scrollTrigger?.kill();
          root.classList.remove("capabilities-motion-ready");
        };
      });
      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section id="capabilities" ref={scope} className="border-y border-ink/15 bg-paper py-16 sm:py-20" aria-label="Capabilities">
      <div className="site-container">
        <div data-capabilities-stage className="capabilities-stage">
          <div className="capabilities-track">
            {capabilities.map((capability, index) => (
              <article key={capability.title} data-capability-card className="capability-card">
                <ImageLoupe
                  src={capability.image}
                  alt={`${capability.title} design example`}
                  sizes="(min-width: 1024px) 48rem, 92vw"
                  width={1131}
                  height={1600}
                  className="capability-image-frame"
                  imageClassName="capability-artwork"
                >
                  <span className="absolute bottom-3 right-3 z-10 bg-paper/90 px-2 py-1 text-xs tabular-nums text-muted">
                    {String(index + 1).padStart(2, "0")} / {String(capabilities.length).padStart(2, "0")}
                  </span>
                </ImageLoupe>
                <div data-capability-detail className="border-b border-ink/15 py-4">
                  <h3 className="editorial-title text-2xl tracking-[-0.025em] sm:text-3xl">{capability.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted">{capability.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
