import { DiscoverLink } from "@/components/ui/DiscoverLink";
import { DraggableProjectGallery } from "@/components/home/DraggableProjectGallery";
import { HeroSection } from "@/components/home/HeroSection";
import { ScrollExperiment } from "@/components/home/ScrollExperiment";
import { HomeServicePillars } from "@/components/home/HomeServicePillars";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <HeroSection />
        <DraggableProjectGallery />
        <section className="site-container py-20 sm:py-28" id="work" aria-labelledby="work-heading">
          <div className="mb-10 flex items-end justify-between gap-6">
            <h2 id="work-heading" className="editorial-title text-5xl tracking-[-0.05em] sm:text-7xl">Selected work</h2>
            <DiscoverLink href="/work" className="shrink-0">
              View all
            </DiscoverLink>
          </div>
          <ProjectGrid projects={projects} />
        </section>
        <ScrollExperiment />
        <HomeServicePillars />
        <CapabilitiesSection />
      </main>
      <SiteFooter />
    </>
  );
}
