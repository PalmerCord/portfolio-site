"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

// ─── Types ────────────────────────────────────────────────────────────────────

type EngagementType = "full-time" | "contract" | "project" | "retainer" | "";
type Budget = "under-5k" | "5k-15k" | "15k-50k" | "50k-plus" | "salary" | "";
type Timeline = "asap" | "1-month" | "1-3-months" | "flexible" | "";
type Platform = "nextjs" | "wordpress" | "shopify" | "other" | "";

type FormState = {
  name: string;
  email: string;
  company: string;
  engagementType: EngagementType;
  platform: Platform[];
  projectDescription: string;
  budget: Budget;
  timeline: Timeline;
  currentStack: string;
  biggestChallenge: string;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

// ─── Field components ─────────────────────────────────────────────────────────

function Label({ htmlFor, children }: { htmlFor?: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-semibold tracking-tight text-foreground"
    >
      {children}
    </label>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return <p className="mt-1.5 text-xs text-muted-foreground">{children}</p>;
}

function TextInput({
  id,
  placeholder,
  value,
  onChange,
  type = "text",
  required,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className="w-full rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20 dark:bg-card/40"
    />
  );
}

function Textarea({
  id,
  placeholder,
  value,
  onChange,
  rows = 4,
  required,
}: {
  id: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  required?: boolean;
}) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      required={required}
      className="w-full resize-none rounded-xl border border-border bg-card/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none backdrop-blur transition-all focus:border-primary/60 focus:ring-2 focus:ring-primary/20 dark:bg-card/40"
    />
  );
}

function ChoiceChip<T extends string>({
  value,
  label,
  sublabel,
  selected,
  onSelect,
}: {
  value: T;
  label: string;
  sublabel?: string;
  selected: boolean;
  onSelect: (v: T) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      className={cn(
        "flex flex-col gap-0.5 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        selected
          ? "border-primary/60 bg-primary/10 text-primary shadow-[0_0_0_1px_var(--color-primary,theme(colors.cyan.500))/0.3] dark:border-primary/40 dark:bg-primary/12"
          : "border-border bg-card/50 text-foreground/80 hover:border-primary/30 hover:bg-card/80"
      )}
    >
      <span>{label}</span>
      {sublabel && <span className="text-xs font-normal text-muted-foreground">{sublabel}</span>}
    </button>
  );
}

function MultiChip({
  value,
  label,
  selected,
  onToggle,
}: {
  value: string;
  label: string;
  selected: boolean;
  onToggle: (v: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(value)}
      aria-pressed={selected}
      className={cn(
        "rounded-xl border px-4 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        selected
          ? "border-primary/60 bg-primary/10 text-primary dark:border-primary/40 dark:bg-primary/12"
          : "border-border bg-card/50 text-foreground/80 hover:border-primary/30 hover:bg-card/80"
      )}
    >
      {label}
    </button>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function FormSection({
  step,
  title,
  children,
}: {
  step: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur dark:border-white/8 dark:bg-white/[0.03]">
      <div className="flex items-center gap-3">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 font-mono text-xs font-bold text-primary">
          {step}
        </span>
        <h2 className="text-base font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function ContactForm() {
  const prefersReducedMotion = useReducedMotion();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    engagementType: "",
    platform: [],
    projectDescription: "",
    budget: "",
    timeline: "",
    currentStack: "",
    biggestChallenge: "",
  });

  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePlatform(val: string) {
    setForm((prev) => ({
      ...prev,
      platform: prev.platform.includes(val as Platform)
        ? prev.platform.filter((p) => p !== val)
        : [...prev.platform, val as Platform],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitState("submitting");

    try {
      if (!executeRecaptcha) throw new Error("reCAPTCHA not ready");
      const recaptchaToken = await executeRecaptcha("contact_form");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, recaptchaToken, _hp: "" }),
      });

      if (!res.ok) throw new Error("Request failed");
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center gap-5 rounded-2xl border border-primary/25 bg-primary/8 px-8 py-16 text-center backdrop-blur dark:bg-primary/10"
      >
        <CheckCircle2 className="size-12 text-primary" aria-hidden="true" />
        <div className="space-y-2">
          <h2 className="text-xl font-semibold tracking-tight">Message sent!</h2>
          <p className="text-muted-foreground max-w-sm text-sm leading-6">
            I&apos;ll be in touch within one business day. If you need a faster reply,
            email{" "}
            <a
              href="mailto:hello@cordpalmer.com"
              className="text-primary underline underline-offset-4"
            >
              hello@cordpalmer.com
            </a>{" "}
            directly.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Honeypot — hidden from real users, bots fill it in */}
      <input
        type="text"
        name="_hp"
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden opacity-0"
        defaultValue=""
      />

      {/* ── 01 Who are you? ─────────────────────────── */}
      <FormSection step="01" title="Who are you?">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="name">Your name *</Label>
            <TextInput
              id="name"
              placeholder="Jane Smith"
              value={form.name}
              onChange={(v) => set("name", v)}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email address *</Label>
            <TextInput
              id="email"
              type="email"
              placeholder="jane@company.com"
              value={form.email}
              onChange={(v) => set("email", v)}
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="company">Company or project name</Label>
          <TextInput
            id="company"
            placeholder="Acme Inc. or Personal project"
            value={form.company}
            onChange={(v) => set("company", v)}
          />
        </div>
      </FormSection>

      {/* ── 02 What kind of engagement? ─────────────── */}
      <FormSection step="02" title="What kind of engagement?">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <ChoiceChip
            value="full-time"
            label="Full-time role"
            sublabel="W-2 / salaried"
            selected={form.engagementType === "full-time"}
            onSelect={(v) => set("engagementType", v)}
          />
          <ChoiceChip
            value="contract"
            label="Contract"
            sublabel="1099 / hourly"
            selected={form.engagementType === "contract"}
            onSelect={(v) => set("engagementType", v)}
          />
          <ChoiceChip
            value="project"
            label="Fixed-scope project"
            sublabel="Defined deliverable"
            selected={form.engagementType === "project"}
            onSelect={(v) => set("engagementType", v)}
          />
          <ChoiceChip
            value="retainer"
            label="Retainer"
            sublabel="Ongoing support"
            selected={form.engagementType === "retainer"}
            onSelect={(v) => set("engagementType", v)}
          />
        </div>
      </FormSection>

      {/* ── 03 Platform & tech ───────────────────────── */}
      <FormSection step="03" title="Platform & technology">
        <div>
          <Label>What platform(s) are involved? <span className="font-normal text-muted-foreground">(select all that apply)</span></Label>
          <div className="flex flex-wrap gap-2.5">
            {[
              { value: "nextjs", label: "Next.js / React" },
              { value: "wordpress", label: "WordPress" },
              { value: "elementor", label: "Elementor" },
              { value: "woocommerce", label: "WooCommerce" },
              { value: "shopify", label: "Shopify" },
              { value: "headless", label: "Headless CMS" },
              { value: "custom", label: "Custom / API" },
              { value: "unsure", label: "Not sure yet" },
            ].map((p) => (
              <MultiChip
                key={p.value}
                value={p.value}
                label={p.label}
                selected={form.platform.includes(p.value as Platform)}
                onToggle={togglePlatform}
              />
            ))}
          </div>
        </div>
        <div>
          <Label htmlFor="currentStack">Describe your current tech stack (if any)</Label>
          <TextInput
            id="currentStack"
            placeholder="e.g. WordPress 6 on WP Engine, ACF Pro, Gravity Forms…"
            value={form.currentStack}
            onChange={(v) => set("currentStack", v)}
          />
          <FieldHint>Even a rough description helps — hosting provider, CMS, any plugins you&apos;re tied to.</FieldHint>
        </div>
      </FormSection>

      {/* ── 04 Project details ───────────────────────── */}
      <FormSection step="04" title="Tell me about the project">
        <div>
          <Label htmlFor="projectDescription">What are you building or trying to fix? *</Label>
          <Textarea
            id="projectDescription"
            placeholder="e.g. We need a new ecommerce storefront for our cannabis dispensary. Currently on a slow WordPress install, losing mobile conversions, need age verification, fast product pages, and a custom checkout…"
            value={form.projectDescription}
            onChange={(v) => set("projectDescription", v)}
            rows={5}
            required
          />
          <FieldHint>The more detail the better — business goal, current problem, target audience.</FieldHint>
        </div>
        <div>
          <Label htmlFor="biggestChallenge">What&apos;s the biggest challenge or blocker right now?</Label>
          <Textarea
            id="biggestChallenge"
            placeholder="e.g. Our developer left, the site is slow, we can't integrate our POS, we need compliance features before re-launch…"
            value={form.biggestChallenge}
            onChange={(v) => set("biggestChallenge", v)}
            rows={3}
          />
        </div>
      </FormSection>

      {/* ── 05 Budget & timeline ─────────────────────── */}
      <FormSection step="05" title="Budget & timeline">
        <div>
          <Label>Budget range</Label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            <ChoiceChip
              value="salary"
              label="Open to discuss salary"
              sublabel="Full-time role"
              selected={form.budget === "salary"}
              onSelect={(v) => set("budget", v)}
            />
            <ChoiceChip
              value="under-5k"
              label="Under $5k"
              sublabel="Small project"
              selected={form.budget === "under-5k"}
              onSelect={(v) => set("budget", v)}
            />
            <ChoiceChip
              value="5k-15k"
              label="$5k – $15k"
              sublabel="Mid-size project"
              selected={form.budget === "5k-15k"}
              onSelect={(v) => set("budget", v)}
            />
            <ChoiceChip
              value="15k-50k"
              label="$15k – $50k"
              sublabel="Larger build"
              selected={form.budget === "15k-50k"}
              onSelect={(v) => set("budget", v)}
            />
            <ChoiceChip
              value="50k-plus"
              label="$50k+"
              sublabel="Enterprise / long-term"
              selected={form.budget === "50k-plus"}
              onSelect={(v) => set("budget", v)}
            />
          </div>
        </div>

        <div>
          <Label>When do you need this started?</Label>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            <ChoiceChip
              value="asap"
              label="ASAP"
              sublabel="Within a week"
              selected={form.timeline === "asap"}
              onSelect={(v) => set("timeline", v)}
            />
            <ChoiceChip
              value="1-month"
              label="Within a month"
              sublabel="Near-term"
              selected={form.timeline === "1-month"}
              onSelect={(v) => set("timeline", v)}
            />
            <ChoiceChip
              value="1-3-months"
              label="1–3 months"
              sublabel="Planning phase"
              selected={form.timeline === "1-3-months"}
              onSelect={(v) => set("timeline", v)}
            />
            <ChoiceChip
              value="flexible"
              label="Flexible"
              sublabel="No hard deadline"
              selected={form.timeline === "flexible"}
              onSelect={(v) => set("timeline", v)}
            />
          </div>
        </div>
      </FormSection>

      {/* ── Submit ───────────────────────────────────── */}
      <AnimatePresence>
        {submitState === "error" && (
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive"
          >
            Something went wrong. Please email{" "}
            <a href="mailto:hello@cordpalmer.com" className="underline underline-offset-4">
              hello@cordpalmer.com
            </a>{" "}
            directly.
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="submit"
        disabled={submitState === "submitting" || !form.name || !form.email || !form.projectDescription}
        className={cn(
          "group flex w-full items-center justify-center gap-2.5 rounded-xl border border-transparent bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-[0_12px_35px_rgba(24,53,42,0.22)] transition-all",
          "hover:brightness-110 hover:shadow-[0_16px_42px_rgba(0,200,180,0.28)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50"
        )}
      >
        {submitState === "submitting" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Send introduction
            <Send className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
          </>
        )}
      </button>

      <p className="text-center text-xs text-muted-foreground">
        No spam, no CRM. Your answers go straight to my inbox and I reply within one business day.
      </p>
    </form>
  );
}
