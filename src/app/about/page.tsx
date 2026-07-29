import type { Metadata } from "next";
import { createPageMetadata, SWRV_URL } from "@/lib/site";
import { aboutPageGraph, serializeJsonLd } from "@/lib/structured-data";
import { Reveal } from "@/components/animation/Reveal";
import { StatsCounter } from "@/components/projects/StatsCounter";
import { TechStack } from "@/components/about/TechStack";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Globe,
  ShoppingCart,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "About Cord Palmer | Full Stack Engineer & Founder of SWRV Tech",
  description:
    "Cord Palmer is a full-stack engineer with 5+ years and 150+ shipped sites, and the founder of SWRV Tech. Specializing in Next.js, React, TypeScript, WordPress, Elementor, and cannabis ecommerce. Available for full-time roles and contract engagements.",
  path: "/about",
});

const swrvCapabilities = [
  "Websites & ecommerce",
  "Mobile apps (iOS · Android)",
  "Admin dashboards",
  "Business automation",
  "Systems integration",
];

const services = [
  {
    Icon: Code2,
    title: "Full-Stack Web Applications",
    description:
      "End-to-end Next.js applications with TypeScript, server components, API routes, and Prisma-backed databases. Architected for performance, scalability, and long-term maintainability.",
    tags: ["Next.js App Router", "TypeScript", "PostgreSQL", "Auth + Payments"],
  },
  {
    Icon: ShoppingCart,
    title: "Ecommerce & Cannabis Retail",
    description:
      "Conversion-optimized storefronts on WordPress, WooCommerce, and headless platforms. Expert Elementor builder with deep experience in regulated markets including cannabis retail.",
    tags: ["WordPress & WooCommerce", "Elementor Expert", "Cannabis Compliance", "Checkout Optimization"],
  },
  {
    Icon: Globe,
    title: "Agency & Marketing Sites",
    description:
      "Fast, structured marketing sites that score 90+ on Lighthouse out of the box. Built accessible, SEO-structured, and CMS-ready so your team owns the content after launch.",
    tags: ["Core Web Vitals", "Structured Data", "Accessibility", "CMS Integration"],
  },
  {
    Icon: Sparkles,
    title: "Product UI & Motion Engineering",
    description:
      "Polished component libraries and motion systems with GSAP and Framer Motion. The kind of UI that makes a product feel alive and justify the premium price point.",
    tags: ["GSAP", "Framer Motion", "Design Systems", "Accessible Interactions"],
  },
];

const process = [
  {
    step: "01",
    title: "Discovery & Scope",
    body: "I ask the right questions first. Business goals, user flows, edge cases, and technical constraints get mapped before a single line is written. Ambiguity is expensive — clarity is free.",
  },
  {
    step: "02",
    title: "Architecture & Planning",
    body: "Tech stack decisions, data models, component structure, and delivery milestones — documented before build starts. Clear architecture prevents the expensive pivots that kill timelines.",
  },
  {
    step: "03",
    title: "Build & Communicate",
    body: "Sprint-paced delivery with async progress updates and working demos at every milestone. You always know what's done, what's next, and which decisions need your input.",
  },
  {
    step: "04",
    title: "QA & Performance Audit",
    body: "Every launch goes through cross-browser QA, Core Web Vitals audits, accessibility checks, and load-time optimization. Production-grade means more than just working.",
  },
  {
    step: "05",
    title: "Launch & Iterate",
    body: "Zero-downtime deployments with rollback safety nets. Post-launch retainer support available for teams that want a trusted developer on call.",
  },
];

const differentiators = [
  "150+ real-world sites shipped — not portfolio pieces, not tutorials",
  "Deep specialization in regulated industries: cannabis, age-gated retail, high-stakes ecommerce",
  "Full-stack ownership: I write the API, the database schema, and the pixel-perfect UI",
  "I understand conversion, SEO, and business outcomes — not just the code that produces them",
  "Direct communication, one point of contact, no offshore relay or agency markup",
  "Every codebase is typed, documented, and ready for the next developer to maintain",
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-24 px-6 py-12">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(aboutPageGraph) }}
      />

      {/* ── Hero ─────────────────────────────────────── */}
      <section className="space-y-6">
        <Reveal>
          <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-[color:var(--hero-kicker)] uppercase">
            Full Stack Engineer
          </p>
        </Reveal>
        <Reveal delay={0.08} y={32}>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl md:text-6xl">
            I ship products people actually use.
          </h1>
        </Reveal>
        <Reveal delay={0.16} y={28}>
          <p className="text-muted-foreground max-w-2xl text-lg leading-7">
            I&apos;m Cord Palmer — a full-stack engineer with 5+ years and 150+ shipped sites across
            agency, ecommerce, and product work, and the founder of{" "}
            <a
              href={SWRV_URL}
              target="_blank"
              rel="noopener"
              className="text-foreground underline decoration-primary/40 underline-offset-4 transition-colors hover:decoration-primary"
            >
              SWRV Tech
            </a>
            . I specialize in Next.js, React, TypeScript, WordPress, and Elementor, with deep
            experience building in regulated industries like cannabis retail.
          </p>
        </Reveal>
        <Reveal delay={0.22} y={22}>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* ── Stats ────────────────────────────────────── */}
      <Reveal y={20}>
        <section
          aria-label="Career highlights"
          className="flex flex-wrap justify-center gap-4 sm:justify-start"
        >
          <StatsCounter value={150} suffix="+" label="Sites Shipped" durationMs={1600} />
          <StatsCounter value={5} suffix="+" label="Years Building" durationMs={1200} />
          <StatsCounter value={3} suffix="" label="Industries Deep" durationMs={900} />
          <StatsCounter value={0} suffix="" label="Missed Deadlines" durationMs={600} />
        </section>
      </Reveal>

      {/* ── Founder / SWRV Tech ──────────────────────── */}
      <Reveal y={20}>
        <section
          aria-labelledby="swrv-heading"
          className="space-y-5 rounded-2xl border border-border/70 bg-card/70 p-8 backdrop-blur"
        >
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
              Founder
            </p>
            <h2 id="swrv-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              I founded{" "}
              {/* Deliberately followed (no rel="nofollow") and referrer-preserving
                  (rel="noopener" without "noreferrer") so SWRV Tech gets both the
                  link equity and the referral attribution from this page. */}
              <a
                href={SWRV_URL}
                target="_blank"
                rel="noopener"
                className="text-primary underline decoration-primary/35 underline-offset-4 transition-colors hover:decoration-primary"
              >
                SWRV Tech
              </a>
            </h2>
          </div>

          <div className="text-muted-foreground max-w-2xl space-y-4 text-sm leading-6">
            <p>
              SWRV Tech is the studio I founded and run, built around one idea: your website
              shouldn&apos;t sit outside your business, it should run on the same rails. We build
              websites, ecommerce, mobile apps, dashboards, and automation as one connected system
              — so the site your customers see and the operations you run stop being two separate
              jobs.
            </p>
            <p>
              Based in Puerto Rico and serving clients across the US, SWRV Tech is where the bulk
              of the 150+ production sites in this portfolio were delivered. If you&apos;re looking
              for a team rather than a single engineer, that&apos;s the front door.
            </p>
          </div>

          <ul className="flex flex-wrap gap-1.5" role="list">
            {swrvCapabilities.map((capability) => (
              <li
                key={capability}
                className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[0.71rem] font-medium text-muted-foreground"
              >
                {capability}
              </li>
            ))}
          </ul>

          <div className="pt-1">
            <Button asChild variant="outline">
              <a href={SWRV_URL} target="_blank" rel="noopener">
                Visit swrv.tech
                <ArrowUpRight />
              </a>
            </Button>
          </div>
        </section>
      </Reveal>

      {/* ── Services ─────────────────────────────────── */}
      <section aria-labelledby="services-heading" className="space-y-8">
        <Reveal>
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
              Services
            </p>
            <h2
              id="services-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              What I build
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">
              Available for full-time roles, contract engagements, and ongoing retainer work.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2">
          {services.map((svc, i) => (
            <Reveal key={svc.title} delay={i * 0.07} y={22}>
              <article className="flex h-full flex-col gap-4 rounded-2xl border border-border/70 bg-card/70 p-6 backdrop-blur transition-colors hover:border-primary/30 hover:bg-card">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/8 text-primary">
                  <svc.Icon className="size-5" aria-hidden="true" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold tracking-tight">{svc.title}</h3>
                  <p className="text-muted-foreground text-sm leading-6">{svc.description}</p>
                </div>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {svc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border/60 bg-muted/50 px-2 py-0.5 text-[0.71rem] font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Tech Stack ───────────────────────────────── */}
      <section aria-labelledby="tech-heading" className="space-y-6">
        <Reveal>
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
              Technical
            </p>
            <h2 id="tech-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              The stack I work in
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">
              Production-tested tools across the full delivery pipeline — from frontend through deploy.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1} y={18}>
          <TechStack />
        </Reveal>
      </section>

      {/* ── Process ──────────────────────────────────── */}
      <section aria-labelledby="process-heading" className="space-y-8">
        <Reveal>
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
              Process
            </p>
            <h2
              id="process-heading"
              className="text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              How I work
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm leading-6">
              A structured approach that keeps projects on track and clients informed at every stage.
            </p>
          </div>
        </Reveal>
        <div className="space-y-3">
          {process.map((item, i) => (
            <Reveal key={item.step} delay={i * 0.06} y={18}>
              <article className="group flex gap-5 rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur transition-colors hover:border-primary/25 hover:bg-card/80">
                <span
                  aria-hidden="true"
                  className="shrink-0 font-mono text-2xl font-bold text-primary/25 transition-colors group-hover:text-primary/60 select-none"
                >
                  {item.step}
                </span>
                <div className="space-y-1.5">
                  <h3 className="font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-6">{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Differentiators ──────────────────────────── */}
      <section aria-labelledby="why-heading" className="space-y-6">
        <Reveal>
          <div className="space-y-2">
            <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
              Why Cord?
            </p>
            <h2 id="why-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What makes this different
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.08} y={18}>
          <ul className="space-y-3" role="list">
            {differentiators.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-6">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span className="text-muted-foreground">{point}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <Reveal y={20}>
        <section
          aria-labelledby="cta-heading"
          className="space-y-4 rounded-2xl border border-primary/20 bg-primary/6 p-8 text-center backdrop-blur dark:bg-primary/8"
        >
          <p className="text-[0.72rem] font-semibold tracking-[0.28em] text-[color:var(--hero-kicker)] uppercase">
            Available Now
          </p>
          <h2
            id="cta-heading"
            className="text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Ready to build something?
          </h2>
          <p className="text-muted-foreground mx-auto max-w-md text-sm leading-6">
            Open to senior full-stack engineering roles and contract engagements. Let&apos;s talk
            about what you&apos;re building.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a conversation <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">See the work</Link>
            </Button>
          </div>
        </section>
      </Reveal>

    </div>
  );
}

