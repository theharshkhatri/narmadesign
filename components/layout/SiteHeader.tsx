"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { DiscoverLink } from "@/components/ui/DiscoverLink";

const navigation = [
  { href: "/work", label: "Work" },
  { href: "/studio", label: "Studio" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header border-b border-ink/15">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="site-header-inner site-container flex min-h-20 items-center justify-between gap-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label="NARMA.DESIGN home"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            src="/brand/narma-wordmark.svg"
            alt="NARMA.DESIGN"
            width={162}
            height={54}
            priority
            className="h-auto w-32 sm:w-40"
          />
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.16em] text-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <DiscoverLink href="/contact">Start a project</DiscoverLink>
        </nav>

        <button
          type="button"
          className="border-b border-ink py-2 text-sm uppercase tracking-[0.12em] lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((isOpen) => !isOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {menuOpen ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="site-container flex flex-col gap-4 border-t border-ink/15 py-6 lg:hidden"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="editorial-title text-3xl tracking-tight"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="editorial-title text-3xl tracking-tight"
            onClick={() => setMenuOpen(false)}
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
