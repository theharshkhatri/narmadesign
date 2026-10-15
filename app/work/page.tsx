import { ProjectGrid } from "@/components/home/ProjectGrid";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageIntro } from "@/components/layout/PageIntro";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";

export const metadata = {
  title: "Work",
  description: "The NARMA.DESIGN work archive.",
};

export default function WorkPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageIntro
          title="Selected work."
          description="A selection of NARMA portfolio work across editorial, packaging, and campaign design."
        />
        <section className="site-container py-16 sm:py-24">
          <ProjectGrid projects={projects} />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
