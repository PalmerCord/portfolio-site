import { ContactFormWithRecaptcha } from "@/components/contact/ContactFormWithRecaptcha";
import { Reveal } from "@/components/animation/Reveal";
import { createPageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import { Clock, Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Cord Palmer | Full Stack Engineer for Hire",
  description:
    "Start a conversation about full-stack engineering roles, WordPress & Elementor builds, Next.js products, or cannabis ecommerce work. Quick response, no fluff.",
  path: "/contact",
});

const trustItems = [
  {
    Icon: Clock,
    label: "Responds within 1 business day",
  },
  {
    Icon: MessageSquare,
    label: "Direct line — no agency middlemen",
  },
  {
    Icon: Mail,
    label: "hello@cordpalmer.com",
    href: "mailto:hello@cordpalmer.com",
  },
];

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12 space-y-12">

      {/* ── Header ───────────────────────────────────── */}
      <header className="space-y-4">
        <Reveal>
          <p className="text-[0.72rem] font-semibold tracking-[0.34em] text-[color:var(--hero-kicker)] uppercase">
            Contact
          </p>
        </Reveal>
        <Reveal delay={0.08} y={32}>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Let&apos;s build something worth shipping.
          </h1>
        </Reveal>
        <Reveal delay={0.14} y={24}>
          <p className="text-muted-foreground max-w-xl text-base leading-7">
            Tell me what you&apos;re working on and I&apos;ll come to the call already up to speed.
            The more detail you share here, the more useful our first conversation will be.
          </p>
        </Reveal>
        <Reveal delay={0.2} y={18}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2" role="list">
            {trustItems.map(({ Icon, label, href }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <Icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                {href ? (
                  <a href={href} className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
                    {label}
                  </a>
                ) : (
                  <span>{label}</span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </header>

      {/* ── Form ─────────────────────────────────────── */}
      <Reveal delay={0.1} y={20}>
        <ContactFormWithRecaptcha />
      </Reveal>

    </div>
  );
}

