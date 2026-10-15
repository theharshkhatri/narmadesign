"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const process = [
  { title: "Discover", detail: "Clarify the context, audience, constraints, and goals." },
  { title: "Define", detail: "Agree the brief, deliverables, timing, and direction." },
  { title: "Develop", detail: "Explore and refine a visual route against the brief." },
  { title: "Deliver", detail: "Prepare the final files and agreed applications." },
];

export function ProcessFlow() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = root.current;
    if (!element) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const line = element.querySelector<HTMLElement>("[data-process-line]");
        const signal = element.querySelector<HTMLElement>("[data-process-signal]");
        const nodes = element.querySelectorAll<HTMLElement>("[data-process-node]");
        const copy = element.querySelectorAll<HTMLElement>("[data-process-copy]");
        if (!line || !signal || nodes.length !== process.length || copy.length !== process.length) return;

        gsap.set([line, signal, ...nodes, ...copy], { willChange: "transform, opacity" });
        gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
        gsap.set(signal, { autoAlpha: 0 });
        gsap.set(nodes, { autoAlpha: 0.55, scale: 0.82, transformOrigin: "center" });
        gsap.set(copy, { y: 10, autoAlpha: 0 });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top 82%",
            once: true,
          },
          onComplete: () => gsap.set([line, signal, ...nodes, ...copy], { clearProps: "willChange" }),
        });

        timeline.to(line, { scaleX: 1, duration: 1.2, ease: "power2.inOut" }, 0);
        timeline.fromTo(
          signal,
          { x: 0, autoAlpha: 0 },
          {
            x: () => Math.max(0, element.clientWidth - 64),
            autoAlpha: 1,
            duration: 1.25,
            ease: "power2.inOut",
          },
          0,
        );
        timeline.to(signal, { autoAlpha: 0, duration: 0.18 }, 1.08);
        timeline.to(nodes, { autoAlpha: 1, scale: 1, duration: 0.36, stagger: 0.25, ease: "back.out(1.7)" }, 0.12);
        timeline.to(copy, { y: 0, autoAlpha: 1, duration: 0.32, stagger: 0.25, ease: "power2.out" }, 0.22);

        return () => timeline.scrollTrigger?.kill();
      });
      return () => media.revert();
    }, element);

    return () => context.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <span aria-hidden="true" className="absolute left-8 right-8 top-5 hidden h-px bg-gold/35 md:block" />
      <span data-process-line aria-hidden="true" className="absolute left-8 right-8 top-5 hidden h-px origin-left bg-gold md:block" />
      <span data-process-signal aria-hidden="true" className="absolute left-8 top-4 hidden h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_var(--narma-gold)] md:block" />
      <ol aria-label="Four steps in the design process" className="relative grid list-none grid-cols-2 gap-x-4 gap-y-8 p-0 md:grid-cols-4 md:gap-5">
        {process.map((stage, index) => (
          <li key={stage.title} className="min-w-0">
            <span
              data-process-node
              aria-hidden="true"
              className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gold bg-paper text-xs"
            >
              0{index + 1}
            </span>
            <div data-process-copy className="mt-6 border-t border-ink/15 pt-4">
              <h2 className="editorial-title text-2xl tracking-[-0.025em] sm:text-3xl">{stage.title}</h2>
              <p className="mt-2 max-w-sm text-sm leading-6 text-muted">{stage.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
