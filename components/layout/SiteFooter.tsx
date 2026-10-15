import Image from "next/image";
import Link from "next/link";
import { DiscoverLink } from "@/components/ui/DiscoverLink";

export function SiteFooter() {
  const instagramUrl = "https://www.instagram.com/narma.design/";
  const dribbbleUrl = "https://dribbble.com/narma.design";

  return (
    <footer className="site-footer overflow-hidden border-t border-paper/20 bg-ink text-paper">
      <div className="site-container">
        <div className="site-footer__top grid gap-12 border-b border-paper/25 py-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          <div className="sm:col-span-2 lg:col-span-4">
            <Link href="/" aria-label="NARMA.DESIGN home" className="inline-flex">
              <Image
                src="/brand/narma-wordmark.svg"
                alt="NARMA.DESIGN"
                width={162}
                height={54}
                className="site-footer__logo h-auto w-36"
              />
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <DiscoverLink href="/contact" tone="dark">Start a project</DiscoverLink>
            </div>
          </div>

          <div className="flex flex-col gap-8 sm:col-span-2 lg:col-span-8 lg:col-start-5 lg:items-end">
            <nav
              aria-label="Footer navigation"
              className="flex flex-wrap items-start gap-x-8 gap-y-4 text-sm lg:gap-x-10"
            >
              <Link className="site-footer__link" href="/work">Work</Link>
              <Link className="site-footer__link" href="/#capabilities">Capabilities</Link>
              <Link className="site-footer__link" href="/studio">Studio</Link>
              <Link className="site-footer__link" href="/contact">Contact</Link>
            </nav>

            <nav aria-label="Social media" className="flex items-center gap-3">
              <a
                className="site-footer__social-link"
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="NARMA on Instagram"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <rect x="3.25" y="3.25" width="17.5" height="17.5" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle className="site-footer__social-dot" cx="17.7" cy="6.6" r="1" />
                </svg>
              </a>
              <a
                className="site-footer__social-link"
                href={dribbbleUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="NARMA on Dribbble"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M7 4.8c4.1 3.7 7.8 8.6 9.7 14.2M3.3 9.2c5 .1 10.5-1 15.3-3.7M7.5 20.2c1.5-4.2 5.7-7.7 12-8.6M4.1 16.8c4.6-2.2 10.4-2.5 16.3-.5" />
                </svg>
              </a>
            </nav>
          </div>
        </div>

        <div className="site-footer__brand-signoff" aria-hidden="true">
          <Image
            src="/brand/narma-wordmark.svg"
            alt=""
            width={972}
            height={325}
            className="site-footer__large-logo"
          />
        </div>

      </div>
    </footer>
  );
}
