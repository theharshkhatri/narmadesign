import { HeroSection } from "@/components/home/HeroSection";
import { ScrollExperiment } from "@/components/home/ScrollExperiment";
import { HomeServicePillars } from "@/components/home/HomeServicePillars";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <section className="site-container py-20 sm:py-28" id="work" aria-labelledby="work-heading">
          <div className="mb-10 grid gap-6 sm:grid-cols-12 sm:items-end">
            <div className="sm:col-span-8">
              <p className="mb-4 text-xs uppercase tracking-[0.16em] text-muted">Self-initiated studies · Undated</p>
              <h2 id="work-heading" className="editorial-title text-5xl tracking-[-0.05em] sm:text-7xl">Selected studies</h2>
              <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
                Explorations in editorial design, packaging, and campaigns. These studies are self-initiated, not commissioned projects.
              </p>
            </div>
            <div className="sm:col-span-4 sm:justify-self-end">
              <Link href="/work" className="text-sm uppercase tracking-[0.14em] underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink">View all studies</Link>
            </div>
          </div>
          <ProjectGrid projects={projects} />
        </section>
        <ScrollExperiment />
        <HomeServicePillars />
        <CapabilitiesSection />
        <ContactCTA />
      </main>
      <SiteFooter />
    </>
  );
}
