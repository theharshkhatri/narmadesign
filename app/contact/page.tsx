import { ProjectInquiryForm } from "@/components/contact/ProjectInquiryForm";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { PageIntro } from "@/components/layout/PageIntro";
import { SiteHeader } from "@/components/layout/SiteHeader";

export const metadata = {
  title: "Contact",
  description: "Contact NARMA.design about a project brief.",
};

export default function ContactPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <PageIntro
          eyebrow="Contact / Project enquiries"
          title="Tell us about the project."
          description="Email NARMA.design about a project. The form below is a preview and does not send messages."
        />
        <section className="site-container py-16 sm:py-24">
          <div className="site-grid">
            <div className="col-span-4 md:col-span-3">
              <p className="text-sm uppercase tracking-[0.14em] text-muted">Enquiry details</p>
            </div>
            <div className="col-span-4 md:col-span-8 md:col-start-5">
              <ProjectInquiryForm />
              <p className="mt-12 border-t border-ink/15 pt-6 text-sm leading-6 text-muted">
                For project enquiries, email{" "}
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
