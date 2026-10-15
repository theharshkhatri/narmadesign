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
          description="The enquiry form is being prepared. You can reach the studio directly by email."
        />
        <section className="site-container py-16 sm:py-24">
          <div className="site-grid">
            <div className="col-span-4 md:col-span-3">
              <p className="text-sm uppercase tracking-[0.14em] text-muted">Start a project</p>
            </div>
            <div className="col-span-4 md:col-span-8 md:col-start-5">
              <ProjectInquiryForm />
              <p className="mt-12 border-t border-ink/15 pt-6 text-sm leading-6 text-muted">
                Prefer email? Write to{" "}
                <a className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink" href="mailto:narma.design@gmail.com">
                  narma.design@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
