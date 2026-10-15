import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageIntro } from "@/components/layout/PageIntro";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Contact",
  description: "Start a project with NARMA.DESIGN.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageIntro
          title="Project enquiries."
          description="Use the form to outline your project. This prototype does not send messages."
        />
        <section className="site-container py-16 sm:py-24">
          <div className="site-grid">
            <div className="col-span-4 md:col-span-3">
              <p className="text-sm uppercase tracking-[0.14em] text-muted">Start a project</p>
            </div>
            <div className="col-span-4 md:col-span-8 md:col-start-5">
              <ProjectInquiryForm />
              <p className="mt-12 border-t border-ink/15 pt-6 text-sm leading-6 text-muted">
                Direct email is not configured yet. A real studio address must be supplied before
                a live contact flow is released.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
