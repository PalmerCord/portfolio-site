import { Reveal } from "@/components/animation/Reveal";
import { HeroCursorAura } from "@/components/home/HeroCursorAura";
import { BenchmarkGauges } from "@/components/home/BenchmarkGauges";
import { FilterableProjectsGrid } from "@/components/projects/FilterableProjectsGrid";
import { StatsCounter } from "@/components/projects/StatsCounter";
import { Button } from "@/components/ui/button";
import { getProjects } from "@/lib/projects";
import { createPageMetadata } from "@/lib/site";
import Link from "next/link";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = createPageMetadata({
  title: "Cord Palmer | Full Stack Engineer",
  description:
    "Explore Cord Palmer's portfolio of high-performance web builds, shipped client work, and premium full-stack product experiences.",
  path: "/",
});

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl items-center px-6 py-5 sm:py-6">
        <HeroCursorAura>
          <div className="hero-surface w-full border border-white/15 px-6 py-8 shadow-[0_30px_80px_rgba(34,44,34,0.12)] sm:px-10 sm:py-10 md:px-14 md:py-12">
            <div className="mx-auto flex min-h-[clamp(24rem,58svh,34rem)] max-w-4xl flex-col items-center justify-center gap-4 text-center">
              <Reveal delay={0.02} priority>
                <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-[color:var(--hero-kicker)] uppercase">
                  Full Stack Engineer • Product Builder • Cannabis Ecommerce
                </p>
              </Reveal>
              <Reveal delay={0.1} y={36} priority>
                <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.05em] text-balance sm:text-6xl md:text-7xl">
                  Cord Palmer
                </h1>
              </Reveal>
              <Reveal delay={0.18} y={34} priority>
                <p className="text-muted-foreground max-w-2xl text-lg leading-7">
                  Building high-performance products and premium digital experiences with a focus
                  on motion, conversion, and real-world production work.
                </p>
              </Reveal>
              <Reveal delay={0.26} y={32} priority>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="shadow-[0_12px_35px_rgba(24,53,42,0.22)]">
                    <Link href="#projects">View Projects</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="bg-background/70 backdrop-blur transition-all duration-300 hover:border-primary/50 hover:bg-primary/8 hover:text-primary hover:shadow-[0_8px_28px_rgba(0,200,180,0.18)] dark:hover:bg-primary/12 dark:hover:shadow-[0_8px_28px_rgba(0,200,180,0.22)]"
                  >
                    <Link href="/animation-test">Component Playground</Link>
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.34} y={28} priority>
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-sm text-[color:var(--hero-meta)]">
                  <span className="hero-pill">150+ sites shipped</span>
                  <span className="hero-pill">Live portfolio archive</span>
                  <span className="hero-pill">Ecommerce and regulated industries</span>
                </div>
              </Reveal>
            </div>
          </div>
        </HeroCursorAura>
      </section>

      <section id="projects" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <Reveal className="space-y-2" y={24}>
            <h2 className="text-2xl font-semibold tracking-tight">Project Grid</h2>
            <p className="text-muted-foreground text-sm">Browse recent work from the portfolio.</p>
          </Reveal>
          <Reveal delay={0.08} y={18}>
            <StatsCounter value={150} suffix="+" label="Sites Built" durationMs={2000} />
          </Reveal>
        </div>

        <Suspense fallback={<p className="text-muted-foreground text-sm">Loading projects…</p>}>
          <FilterableProjectsGrid projects={projects} limit={24} desktopLimit={25} />
        </Suspense>

        <Reveal className="mt-8 flex justify-center" y={18}>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">Browse Full Project Archive</Link>
          </Button>
        </Reveal>
      </section>

      <BenchmarkGauges />
    </>
  );
}
