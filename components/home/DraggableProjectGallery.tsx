"use client";

import { ArtGallery } from "@/components/vendor/obsidianui/art-gallery";
const categories = [
  { title: "Brand Identity Design", alt: "Brand identity design category image", image: "/category/optimized/1.webp" },
  { title: "Social Media Design", alt: "Social media design category image", image: "/category/optimized/2.webp" },
  { title: "Advertising & Marketing Design", alt: "Advertising and marketing design category image", image: "/category/optimized/7.webp" },
  { title: "UI/UX & Web Design", alt: "UI/UX and web design category image", image: "/category/optimized/4.webp" },
  { title: "Packaging & Label Design", alt: "Packaging and label design category image", image: "/category/optimized/5.webp" },
  { title: "Editorial & Print Design", alt: "Editorial and print design category image", image: "/category/optimized/6.webp" },
  { title: "Illustration & Vector Art", alt: "Illustration and vector art category image", image: "/category/optimized/9.webp" },
  { title: "Event & Environmental Design", alt: "Event and environmental design category image", image: "/category/optimized/8.webp" },
];

export function DraggableProjectGallery() {
  return (
    <section className="border-y border-ink/15 bg-ink py-8 text-paper sm:py-12" aria-label="Design categories image gallery">
      <div className="site-container">
        <ArtGallery
          images={categories.map(({ image }) => image)}
          items={categories.map(({ title, alt }) => ({ title, year: "Design", alt, href: "#capabilities", label: "Category image" }))}
          cellSize={0.9}
          zoomLevel={1.18}
          collectionLabel="Design category image gallery"
          className="h-[25rem] border border-paper/20 bg-ink sm:h-[32rem]"
        />
      </div>
    </section>
  );
}
