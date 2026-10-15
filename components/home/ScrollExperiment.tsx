"use client";

import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const stages = ["Form", "Shift", "Resolve"];

export function ScrollExperiment() {
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;

    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        const stage = root.querySelector<HTMLElement>("[data-study-stage]");
        const artwork = root.querySelector<HTMLElement>("[data-study-artwork]");
        const markers = root.querySelectorAll<HTMLElement>("[data-study-marker]");
        if (!stage || !artwork || markers.length !== stages.length) return;

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 1.8)}`,
            pin: stage,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .fromTo(artwork, { scale: 0.78, rotation: -12, xPercent: 4 }, { scale: 1, rotation: 0, xPercent: 0, duration: 1.1, ease: "power2.out" })
          .to(markers[0], { autoAlpha: 1, scale: 1.04, duration: 0.2 }, 0)
          .to(artwork, { scale: 1.08, rotation: 9, xPercent: -3, duration: 1.1, ease: "none" })
          .to(markers[0], { autoAlpha: 0.55, scale: 1, duration: 0.2 }, "<")
          .to(markers[1], { autoAlpha: 1, scale: 1.04, duration: 0.2 }, "<")
          .to(artwork, { scale: 0.96, rotation: 18, xPercent: 2, duration: 1.1, ease: "power1.inOut" })
          .to(markers[1], { autoAlpha: 0.55, scale: 1, duration: 0.2 }, "<")
          .to(markers[2], { autoAlpha: 1, scale: 1.04, duration: 0.2 }, "<");

        return () => timeline.scrollTrigger?.kill();
      });
      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section ref={scope} className="relative overflow-hidden border-y border-ink/15 bg-stone" aria-labelledby="experiment-heading">
      <div data-study-stage className="site-container relative grid min-h-[min(720px,100svh)] items-center py-16 sm:py-20 lg:min-h-[min(760px,100svh)] lg:grid-cols-12">
        <div className="relative z-10 lg:col-span-6">
          <p className="mb-7 text-sm uppercase tracking-[0.14em] text-muted">NARMA.DESIGN / Artwork</p>
          <h2 id="experiment-heading" className="editorial-title max-w-[7ch] text-6xl leading-[0.88] tracking-[-0.055em] sm:text-8xl">
            A study<br />
            in form.
          </h2>
          <p className="mt-7 max-w-sm text-base leading-7 text-muted">
            An original geometric composition, shifted through three states.
          </p>
          <ol className="mt-10 flex flex-wrap gap-2" aria-label="Artwork timeline stages">
            {stages.map((stage, index) => (
              <li
                key={stage}
                data-study-marker
                className="rounded-full border border-ink/20 px-3 py-2 text-[0.68rem] uppercase tracking-[0.1em] text-muted opacity-60"
              >
                <span className="mr-2 tabular-nums">0{index + 1}</span>{stage}
              </li>
            ))}
          </ol>
        </div>
        <div className="pointer-events-none absolute right-[-20%] top-1/2 w-[min(92vw,68rem)] -translate-y-1/2 opacity-90 sm:right-[-16%] lg:right-[-12%] lg:w-[min(70vw,68rem)]">
          <Image
            data-study-artwork
            src="/artwork/artwork-05.svg"
            alt=""
            width={1080}
            height={1080}
            className="h-auto w-full"
          />
        </div>
      </div>
    </section>
  );
}
