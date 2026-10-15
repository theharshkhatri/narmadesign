import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageIntro } from "@/components/layout/PageIntro";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessFlow } from "@/components/studio/ProcessFlow";

export const metadata = {
  title: "Studio",
  description: "The NARMA.DESIGN studio approach.",
};

export default function StudioPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageIntro
          title="An independent graphic design studio."
          description="NARMA.DESIGN is an independent creative studio working across identity, graphic design, campaigns, and visual exploration."
        />
        <section className="border-y border-ink/15 bg-paper" aria-labelledby="studio-point-of-view-heading">
          <div className="site-container py-20 sm:py-28">
            <div className="site-grid">
              <p className="col-span-4 mb-6 text-sm uppercase tracking-[0.14em] text-muted md:col-span-3">
                Point of view
              </p>
              <div className="col-span-4 md:col-span-8 md:col-start-5">
                <h2 id="studio-point-of-view-heading" className="editorial-title max-w-3xl text-5xl leading-[0.96] tracking-[-0.05em] sm:text-7xl">
                  Clarity before form.
                </h2>
                <p className="mt-8 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  We begin by understanding the brief, audience, constraints, and goals. From there,
                  we explore a visual direction, refine it through feedback, and prepare the agreed
                  designs for use across the chosen platforms.
                </p>
              </div>
            </div>
          </div>
        </section>
        <ServicesSection />
        <section className="border-t border-ink/15 py-16 sm:py-24" aria-label="Design process">
          <div className="site-container">
            <div className="mx-auto max-w-6xl">
              <ProcessFlow />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
