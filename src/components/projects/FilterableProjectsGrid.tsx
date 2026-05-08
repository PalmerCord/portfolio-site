"use client";

import { ProjectDetailPanel } from "@/components/projects/ProjectDetailPanel";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";
import type { Project } from "@/types/project";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

type FilterableProjectsGridProps = {
  projects: Project[];
  limit?: number;
  desktopLimit?: number;
};

const FILTER_KEYS = {
  project: "project",
} as const;

export function FilterableProjectsGrid({
  projects,
  limit = 12,
  desktopLimit,
}: FilterableProjectsGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const selectedProjectSlug = searchParams.get(FILTER_KEYS.project);

  const selectedProjectIndex = selectedProjectSlug
    ? projects.findIndex((project) => project.slug === selectedProjectSlug)
    : -1;

  const selectedProject = selectedProjectIndex >= 0 ? projects[selectedProjectIndex] : null;

  function updateProjectParam(nextSlug: string | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (nextSlug) {
      params.set(FILTER_KEYS.project, nextSlug);
    } else {
      params.delete(FILTER_KEYS.project);
    }

    const nextQuery = params.toString();
    router.replace(nextQuery ? `${pathname}?${nextQuery}` : pathname, { scroll: false });
  }

  function handleProjectSelect(slug: string, trigger: HTMLButtonElement) {
    returnFocusRef.current = trigger;
    updateProjectParam(slug);
  }

  function handleClosePanel() {
    updateProjectParam(null);
  }

  function handleNextProject() {
    if (projects.length === 0 || selectedProjectIndex < 0) return;
    const nextIndex = (selectedProjectIndex + 1) % projects.length;
    const nextProject = projects[nextIndex];
    updateProjectParam(nextProject.slug);
  }

  function handlePrevProject() {
    if (projects.length === 0 || selectedProjectIndex < 0) return;
    const prevIndex = (selectedProjectIndex - 1 + projects.length) % projects.length;
    const prevProject = projects[prevIndex];
    updateProjectParam(prevProject.slug);
  }

  return (
    <div className="space-y-6">
      <p className="text-muted-foreground text-sm">{projects.length} projects</p>

      <ProjectsGrid
        projects={projects}
        limit={limit}
        desktopLimit={desktopLimit}
        onProjectSelect={handleProjectSelect}
      />

      <ProjectDetailPanel
          project={selectedProject}
          isOpen={!!selectedProject}
          onClose={handleClosePanel}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
          returnFocusRef={returnFocusRef}
        />
    </div>
  );
}
