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
