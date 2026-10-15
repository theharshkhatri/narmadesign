import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { projects } from "@/content/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const instant = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project ? { title: project.title, description: project.summary } : { title: "Work" };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <>
      <SiteHeader />
      <main id="main-content">
        <article className="site-container pb-20 pt-12 sm:pb-32 sm:pt-20">
          <Link href="/work" className="mb-10 inline-block text-sm uppercase tracking-[0.14em] text-muted hover:text-ink">
            ← Back to work
          </Link>
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-8">
            <div className="bg-stone lg:col-span-7">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image src={project.coverImage} alt={project.coverAlt} fill priority sizes="(min-width: 1024px) 58vw, 92vw" className="object-contain p-6 sm:p-10" />
              </div>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 lg:pt-6">
              <p className="text-sm uppercase tracking-[0.14em] text-muted">Experimental study / {project.year}</p>
              <h1 className="editorial-title mt-6 text-5xl leading-[0.92] tracking-[-0.06em] sm:text-7xl">{project.title}</h1>
              <p className="mt-8 text-lg leading-7 text-muted">{project.summary}</p>
              <dl className="mt-12 space-y-5 border-t border-ink/20 pt-5 text-sm">
                <div className="flex justify-between gap-6"><dt className="text-muted">Study</dt><dd>{project.title}</dd></div>
                <div className="flex justify-between gap-6"><dt className="text-muted">Focus</dt><dd className="text-right">{project.services.join(", ")}</dd></div>
              </dl>
            </div>
          </div>
          <div className="mt-20 grid gap-10 border-t border-ink/20 pt-8 sm:mt-28 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.14em] text-muted">Composition note</p>
              <h2 className="editorial-title mt-4 text-2xl tracking-[-0.03em]">{project.brief}</h2>
            </div>
            <div className="space-y-5 leading-7 text-muted">
              <p>{project.concept}</p>
              <p>Approved NARMA portfolio artwork, shown as supplied. Client details and project dates have not been provided.</p>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
