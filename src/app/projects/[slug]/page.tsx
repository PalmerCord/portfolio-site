import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/site";
import type { Project } from "@/types/project";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

function toDescription(content: string): string {
  const normalized = content.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157)}...`;
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * Up to six sibling projects that share an industry tag.
 *
 * Detail pages were previously crawl dead-ends — the only outbound internal
 * link was the breadcrumb back to /projects. Cross-linking siblings gives
 * Googlebot real paths between them instead of relying on the sitemap alone.
 */
function getRelatedProjects(all: Project[], current: Project): Project[] {
  const industries = new Set(current.industry);
  return all
    .filter(
      (candidate) =>
        candidate.slug !== current.slug &&
        candidate.industry.some((tag) => industries.has(tag))
    )
    .slice(0, 6);
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Cord Palmer",
      description: "The requested project could not be found.",
    };
  }

  const description = toDescription(project.content);
  const projectPath = `/projects/${project.slug}`;

  return createPageMetadata({
    title: `${project.title} | Cord Palmer`,
    description,
    path: projectPath,
    image: project.screenshot,
  });
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const related = getRelatedProjects(await getProjects(), project);

  return (
    <section className="mx-auto w-full max-w-6xl space-y-8 px-6 py-12">
      <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm">
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/projects" className="hover:text-foreground underline-offset-4 hover:underline">
              Projects
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-foreground font-medium" aria-current="page">
            {project.title}
          </li>
        </ol>
      </nav>

      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="text-muted-foreground max-w-3xl text-sm leading-relaxed">{project.content}</p>

        <div className="flex flex-wrap items-center gap-2">
          {project.industry.map((item) => (
            <span
              key={item}
              className="border-border bg-secondary text-secondary-foreground rounded-md border px-2 py-1 text-xs font-medium capitalize"
            >
              {item}
            </span>
          ))}
          <span className="bg-muted text-muted-foreground rounded-md px-2 py-1 text-xs font-medium">
            {project.year}
          </span>
        </div>
      </header>

      <section className="space-y-3">
        <div className="border-border bg-card relative overflow-hidden rounded-2xl border">
          <div className="relative h-[420px] w-full md:h-[500px]">
            <Image
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button asChild>
            <Link href={project.url} target="_blank" rel="noopener noreferrer">
              Open in new tab
            </Link>
          </Button>
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Technology</h2>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="border-border bg-secondary text-secondary-foreground rounded-md border px-2 py-1 text-xs font-medium"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Live site</h2>
        <p className="text-muted-foreground text-sm">
          <Link
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline underline-offset-4"
          >
            {hostnameOf(project.url)}
          </Link>
        </p>
      </section>

      {related.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Related work</h2>
          <p className="text-muted-foreground text-sm">
            Other {project.industry[0]} builds from the same portfolio.
          </p>
          <ul className="flex flex-wrap gap-2" role="list">
            {related.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/projects/${item.slug}`}
                  className="border-border bg-card hover:border-primary/40 hover:text-foreground text-muted-foreground inline-block rounded-md border px-3 py-1.5 text-sm font-medium transition-colors"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}
