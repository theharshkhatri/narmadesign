"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { capabilities } from "@/content/capabilities";

const ArtGallery = dynamic(
  () => import("@/components/vendor/obsidianui/art-gallery").then((module) => module.ArtGallery),
  { ssr: false, loading: () => <StaticCategoryGallery /> },
);

const categories = capabilities.map(({ title, image }) => ({
  title,
  alt: `${title} visual reference`,
  image,
}));

function StaticCategoryGallery() {
  return (
    <div className="grid h-[25rem] grid-cols-2 gap-px overflow-hidden border border-paper/20 bg-paper/20 sm:h-[32rem] sm:grid-cols-4" role="group" aria-label="Design category image gallery">
      {categories.map((category) => (
        <a key={category.image} href="#capabilities" className="group relative min-h-0 overflow-hidden bg-ink focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-paper">
          <img src={category.image} alt={category.alt} width="800" height="800" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100" />
          <span className="absolute inset-x-0 bottom-0 bg-ink/80 px-3 py-2 text-xs text-paper">{category.title}</span>
        </a>
      ))}
    </div>
  );
}

export function DraggableProjectGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [loadGallery, setLoadGallery] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (reducedMotion || coarsePointer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setLoadGallery(true);
        observer.disconnect();
      },
      { rootMargin: "300px 0px" },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="border-y border-ink/15 bg-ink py-8 text-paper sm:py-12">
      <div className="site-container">
        {loadGallery ? (
          <ArtGallery
            images={categories.map(({ image }) => image)}
            items={categories.map(({ title, alt }) => ({ title, year: "Illustrative", alt, href: "#capabilities", label: "Visual reference" }))}
            cellSize={0.9}
            zoomLevel={1.18}
            collectionLabel="Design category image gallery"
            className="h-[25rem] border border-paper/20 bg-ink sm:h-[32rem]"
          />
        ) : (
          <StaticCategoryGallery />
        )}
      </div>
    </div>
  );
}
