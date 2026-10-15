export const projectTypes = [
  "commissioned",
  "self-initiated",
  "speculative-concept",
] as const;

export type ProjectType = (typeof projectTypes)[number];

export const projectCategories = [
  "brand-identity",
  "graphic-design",
  "campaign",
  "packaging",
  "other",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectSection = {
  heading: string;
  body: string;
};

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: number | "Undated";
  projectType: ProjectType;
  summary: string;
  brief: string;
  concept: string;
  services: string[];
  coverImage: string;
  coverAlt: string;
  featured: boolean;
  order: number;
  sections?: ProjectSection[];
};

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateProjects(projects: readonly Project[]): void {
  const slugs = new Set<string>();

  for (const project of projects) {
    if (!slugPattern.test(project.slug)) {
      throw new Error(`Invalid project slug: ${project.slug}`);
    }

    if (slugs.has(project.slug)) {
      throw new Error(`Duplicate project slug: ${project.slug}`);
    }

    slugs.add(project.slug);
  }
}
