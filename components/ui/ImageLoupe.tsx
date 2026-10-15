"use client";

import Image from "next/image";
import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useState } from "react";

type ImageLoupeProps = {
  src: string;
  alt: string;
  sizes: string;
  className?: string;
  imageClassName?: string;
  imageStyle?: CSSProperties;
  fill?: boolean;
  dataServiceImage?: boolean;
  showLoadingState?: boolean;
  enableLoupe?: boolean;
  width?: number;
  height?: number;
  children?: ReactNode;
};

export function ImageLoupe({
  src,
  alt,
  sizes,
  className = "",
  imageClassName = "",
  imageStyle,
  fill = false,
  dataServiceImage = false,
  showLoadingState = false,
  enableLoupe = true,
  width,
  height,
  children,
}: ImageLoupeProps) {
  const [loaded, setLoaded] = useState(false);
  function updateLoupe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;

    const frame = event.currentTarget;
    const bounds = frame.getBoundingClientRect();
    const lensRadius = Math.min(
      Math.max(72, Math.min(112, window.innerWidth * 0.08)),
      bounds.width * 0.42,
      bounds.height * 0.42,
    );
    const x = Math.max(0, Math.min(bounds.width, event.clientX - bounds.left));
    const y = Math.max(0, Math.min(bounds.height, event.clientY - bounds.top));

    frame.style.setProperty("--loupe-x", `${(x / bounds.width) * 100}%`);
    frame.style.setProperty("--loupe-y", `${(y / bounds.height) * 100}%`);
    frame.style.setProperty("--loupe-radius", `${lensRadius}px`);
    frame.dataset.loupeActive = "true";
  }

  function hideLoupe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") delete event.currentTarget.dataset.loupeActive;
  }

  return (
    <div
      className={`image-loupe ${className}`}
      data-image-loaded={loaded ? "true" : "false"}
      data-show-loading={showLoadingState ? "true" : undefined}
      data-service-image={dataServiceImage ? "" : undefined}
      onPointerEnter={enableLoupe ? updateLoupe : undefined}
      onPointerMove={enableLoupe ? updateLoupe : undefined}
      onPointerLeave={enableLoupe ? hideLoupe : undefined}
    >
      {fill ? (
        <Image src={src} alt={alt} fill sizes={sizes} onLoad={() => setLoaded(true)} className={imageClassName} style={imageStyle} />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 1131}
          height={height ?? 1600}
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          className={imageClassName}
          style={imageStyle}
        />
      )}
      {dataServiceImage && !loaded ? (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] animate-pulse bg-stone motion-reduce:animate-none" />
      ) : null}
      {showLoadingState && !loaded ? (
        <span aria-hidden="true" className="image-loupe__loading pointer-events-none absolute inset-0 z-[1] animate-pulse bg-stone motion-reduce:animate-none" />
      ) : null}
      {enableLoupe ? (
        <span className="image-loupe__layer" aria-hidden="true" style={{ overflow: "visible" }}>
          <Image
            src={src}
            alt=""
            fill
            sizes="(min-width: 1024px) 16rem, 0px"
            className="image-loupe__artwork"
          />
        </span>
      ) : null}
      {children}
    </div>
  );
}
