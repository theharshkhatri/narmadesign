"use client";

import Link from "next/link";
import { ImageLoupe } from "@/components/ui/ImageLoupe";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
} from "react";
import type { Project } from "@/lib/project-schema";

gsap.registerPlugin(ScrollTrigger);

type ProjectGridProps = {
  projects: readonly Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  const scope = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const imageViewportRef = useRef<HTMLDivElement>(null);
  const panRef = useRef<{ pointerId: number; x: number; y: number; left: number; top: number } | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [zoom, setZoom] = useState(1);
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });

  function setZoomFocus(element: HTMLElement, clientX: number, clientY: number) {
    const image = element.querySelector("img");
    if (!image) return;

    const bounds = image.getBoundingClientRect();
    const visualX = ((clientX - bounds.left) / bounds.width) * 100;
    const visualY = ((clientY - bounds.top) / bounds.height) * 100;
    const x = Math.max(0, Math.min(100, zoomOrigin.x + (visualX - zoomOrigin.x) / zoom));
    const y = Math.max(0, Math.min(100, zoomOrigin.y + (visualY - zoomOrigin.y) / zoom));
    setZoomOrigin({ x, y });
  }

  function handleImageDoubleClick(event: ReactMouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof HTMLImageElement)) return;
    setZoomFocus(event.currentTarget, event.clientX, event.clientY);
    setZoom((value) => (value === 1 ? 2 : 1));
  }

  function handleViewerKeyDown(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (event.key === "+" || event.key === "=") {
      event.preventDefault();
      setZoom((value) => Math.min(4, value + 0.25));
    } else if (event.key === "-") {
      event.preventDefault();
      setZoom((value) => Math.max(1, value - 0.25));
    } else if (event.key === "0") {
      event.preventDefault();
      setZoom(1);
      setZoomOrigin({ x: 50, y: 50 });
    }
  }

  function startPan(event: ReactPointerEvent<HTMLDivElement>) {
    if (zoom <= 1 || event.button !== 0) return;
    const viewport = event.currentTarget;
    panRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      left: viewport.scrollLeft,
      top: viewport.scrollTop,
    };
    viewport.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function movePan(event: ReactPointerEvent<HTMLDivElement>) {
    const pan = panRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    event.currentTarget.scrollLeft = pan.left - (event.clientX - pan.x);
    event.currentTarget.scrollTop = pan.top - (event.clientY - pan.y);
  }

  function endPan(event: ReactPointerEvent<HTMLDivElement>) {
    if (panRef.current?.pointerId !== event.pointerId) return;
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (activeProject && !dialog.open) dialog.showModal();
    if (!activeProject && dialog.open) dialog.close();
  }, [activeProject]);

  useEffect(() => {
    const viewport = imageViewportRef.current;
    if (!activeProject || !viewport) return;
    const activeViewport = viewport;

    function handleWheel(event: WheelEvent) {
      if (!(event.target instanceof HTMLImageElement)) return;
      event.preventDefault();
      setZoomFocus(activeViewport, event.clientX, event.clientY);
      setZoom((value) => Math.min(4, Math.max(1, value + (event.deltaY < 0 ? 0.25 : -0.25))));
    }

    activeViewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => activeViewport.removeEventListener("wheel", handleWheel);
  }, [activeProject, zoom, zoomOrigin]);

  useLayoutEffect(() => {
    const root = scope.current;
    if (!root) {
      return;
    }

    const context = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = root.querySelectorAll<HTMLElement>("[data-project-card]");

        if (cards.length === 0) {
          return;
        }

        const batch = ScrollTrigger.batch(cards, {
          start: "top 88%",
          onEnter: (elements) => {
            gsap.fromTo(
              elements,
              { y: 28, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.7, stagger: 0.08, ease: "power3.out", overwrite: true },
            );
          },
          once: true,
        });

        return () => batch.forEach((trigger) => trigger.kill());
      });

      return () => media.revert();
    }, scope);

    return () => context.revert();
  }, [projects.length]);

  if (projects.length === 0) {
    return (
      <div className="border-y border-ink/15 py-10 text-muted">
        <p className="max-w-md text-lg leading-7">
          Project examples will appear here when approved project records and imagery are
          available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div ref={scope} className="columns-1 gap-x-6 md:columns-2 xl:columns-3">
        {projects.map((project) => (
          <article
            key={project.slug}
            data-project-card
            className="mb-10 break-inside-avoid-column pb-2 opacity-100"
          >
            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setZoomOrigin({ x: 50, y: 50 });
                setActiveProject(project);
              }}
              aria-label={`Open ${project.title} image for a closer look`}
              className="group/image relative mb-4 block w-full cursor-zoom-in text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
            >
              <ImageLoupe
                src={project.coverImage}
                alt={project.coverAlt}
                fill
                sizes="(min-width: 1280px) 31vw, (min-width: 768px) 47vw, 92vw"
                showLoadingState
                enableLoupe={false}
                className="aspect-[1131/1600] overflow-hidden"
                imageClassName="object-contain transition-opacity duration-300"
              />
              <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-4 grid size-11 translate-y-1 place-items-center rounded-full border border-white/70 bg-ink/80 text-paper opacity-0 transition duration-300 group-hover/image:translate-y-0 group-hover/image:opacity-100 group-focus-visible/image:translate-y-0 group-focus-visible/image:opacity-100">
                <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="10.8" cy="10.8" r="6.3" />
                  <path d="m15.5 15.5 4.1 4.1M10.8 7.8v6m-3-3h6" />
                </svg>
              </span>
            </button>
            <div className="flex items-start justify-between gap-4 border-b border-ink/15 pb-5">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.12em] text-muted">Experimental study</p>
                <Link href={`/work/${project.slug}`} className="text-lg hover:underline focus-visible:underline">
                  {project.title}
                </Link>
                <p className="mt-1 text-sm capitalize text-muted">{project.category.replaceAll("-", " ")}</p>
              </div>
              <span className="shrink-0 text-right text-sm text-muted">{project.year}</span>
            </div>
          </article>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={activeProject ? `${activeProject.title} image viewer` : "Portfolio image viewer"}
        aria-describedby="image-viewer-instructions"
        onClose={() => setActiveProject(null)}
        onKeyDown={handleViewerKeyDown}
        onClick={(event) => {
          if (event.target === dialogRef.current) setActiveProject(null);
        }}
        className="fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none overflow-hidden border-0 bg-[#e9e4dc] p-0 text-paper backdrop:bg-ink/90"
      >
        {activeProject ? (
          <div className="relative h-dvh w-screen">
            <p id="image-viewer-instructions" className="sr-only">
              Scroll over the image to zoom around the pointer. Double-click the image to toggle zoom. Use plus or minus to adjust zoom, zero to reset, and drag to pan when zoomed. Press Escape to close.
            </p>
            <p className="sr-only" aria-live="polite">{Math.round(zoom * 100)} percent zoom</p>
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute right-4 top-4 z-10 grid size-12 place-items-center rounded-full border border-white/20 bg-ink/80 text-paper shadow-lg backdrop-blur-sm transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              aria-label="Close image viewer"
            >
              <svg viewBox="0 0 24 24" fill="none" className="size-5" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>
            <div
              ref={imageViewportRef}
              className={`image-viewer-viewport absolute inset-0 overflow-auto ${zoom > 1 ? "cursor-grab touch-none active:cursor-grabbing" : "cursor-zoom-in"}`}
              onDoubleClick={handleImageDoubleClick}
              onPointerDown={startPan}
              onPointerMove={movePan}
              onPointerUp={endPan}
              onPointerCancel={endPan}
            >
              <div className="flex min-h-full min-w-full items-center justify-center">
                <ImageLoupe
                  src={activeProject.coverImage}
                  alt={activeProject.coverAlt}
                  width={1131}
                  height={1600}
                  sizes="(min-width: 1280px) 72vw, 92vw"
                  enableLoupe={false}
                  className="flex max-h-dvh justify-center"
                  imageStyle={{ transform: `scale(${zoom})`, transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%` }}
                  imageClassName="image-viewer-artwork h-auto max-h-dvh w-auto max-w-full object-contain transition-transform duration-200"
                />
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
