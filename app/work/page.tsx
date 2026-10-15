import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageIntro } from "@/components/layout/PageIntro";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";

export const metadata = {
  title: "Work",
  description: "Self-initiated NARMA.design studies in editorial design, packaging, and campaigns.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageIntro
          eyebrow="Work / Self-initiated studies"
          title="Ideas explored in form."
          description="A collection of undated design studies across editorial, packaging, and campaigns. Each is presented as a self-initiated concept."
        />
        <section className="site-container py-16 sm:py-24">
          <ProjectGrid projects={projects} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
