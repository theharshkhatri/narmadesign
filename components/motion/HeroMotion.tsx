"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef, type ReactNode } from "react";

type HeroMotionProps = {
  children: ReactNode;
};

export function HeroMotion({ children }: HeroMotionProps) {
  const scope = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const titleLines = root.querySelectorAll<HTMLElement>("[data-hero-line]");

        gsap.fromTo(
          titleLines,
          { yPercent: 105, rotate: 2, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            duration: 1.1,
            delay: 0.1,
            ease: "expo.out",
            stagger: 0.08,
          },
        );
        gsap.fromTo(
          root.querySelectorAll("[data-hero-fade]"),
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, delay: 0.45, ease: "power3.out", stagger: 0.08 },
        );
      });

      return () => media.revert();
    }, scope);

    return () => context.revert();
  }, []);

  return <div ref={scope}>{children}</div>;
}
