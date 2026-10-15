import Link from "next/link";
import type { ReactNode } from "react";

type DiscoverLinkProps = {
  href: string;
  children: ReactNode;
  direction?: "right" | "down";
  tone?: "light" | "dark";
  className?: string;
};

type DiscoverButtonProps = {
  children: ReactNode;
  direction?: "right" | "down";
  tone?: "light" | "dark";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
};

function DirectionIcon({ direction }: { direction: "right" | "down" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" focusable="false">
      {direction === "down" ? (
        <path d="M12 4v15m-7-7 7 7 7-7" />
      ) : (
        <path d="M4 12h15m-7-7 7 7-7 7" />
      )}
    </svg>
  );
}

function DiscoverControl({
  children,
  direction = "right",
  tone = "light",
  className = "",
  as: Control,
  type,
  href,
  disabled,
}: DiscoverButtonProps & {
  as: "a" | "button";
  href?: string;
}) {
  return (
    <Control
      {...(Control === "a" ? { href } : { type, disabled })}
      className={`discover-link discover-link--${tone} ${className}`}
    >
      <span className="discover-link__fill" aria-hidden="true" />
      <span className="discover-link__icon" aria-hidden="true">
        <DirectionIcon direction={direction} />
      </span>
      <span className="discover-link__text">{children}</span>
    </Control>
  );
}

export function DiscoverLink({
  href,
  children,
  direction = "right",
  tone = "light",
  className = "",
}: DiscoverLinkProps) {
  return (
    <DiscoverControl as="a" href={href} direction={direction} tone={tone} className={className}>
      {children}
    </DiscoverControl>
  );
}

export function DiscoverButton({
  children,
  direction = "right",
  tone = "light",
  className = "",
  type = "button",
  disabled = false,
}: DiscoverButtonProps) {
  return (
    <DiscoverControl as="button" type={type} disabled={disabled} direction={direction} tone={tone} className={className}>
      {children}
    </DiscoverControl>
  );
}
