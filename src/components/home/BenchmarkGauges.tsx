"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// Arc parameters
const RADIUS = 54;
const STROKE = 8;
const CENTER = 68;
const SVG_SIZE = CENTER * 2;
// Full arc: 220° sweep starting from 200° (bottom-left to bottom-right)
const ARC_DEG = 220;
const START_DEG = 200;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ARC_LENGTH = (ARC_DEG / 360) * CIRCUMFERENCE;

function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

function arcPath(startDeg: number, sweepDeg: number) {
  const startRad = degToRad(startDeg);
  const endRad = degToRad(startDeg + sweepDeg);
  const x1 = CENTER + RADIUS * Math.cos(startRad);
  const y1 = CENTER + RADIUS * Math.sin(startRad);
  const x2 = CENTER + RADIUS * Math.cos(endRad);
  const y2 = CENTER + RADIUS * Math.sin(endRad);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2} ${y2}`;
}

const trackPath = arcPath(START_DEG, ARC_DEG);

type GaugeColor = "emerald" | "cyan" | "violet" | "amber";

const colorMap: Record<GaugeColor, { stroke: string; glow: string; text: string }> = {
  emerald: {
    stroke: "oklch(0.72 0.19 162)",
    glow: "rgba(52,211,153,0.35)",
    text: "text-emerald-500 dark:text-emerald-400",
  },
  cyan: {
    stroke: "oklch(0.72 0.17 206)",
    glow: "rgba(34,211,238,0.35)",
    text: "text-cyan-500 dark:text-cyan-400",
  },
  violet: {
    stroke: "oklch(0.68 0.22 285)",
    glow: "rgba(167,139,250,0.35)",
    text: "text-violet-500 dark:text-violet-400",
  },
  amber: {
    stroke: "oklch(0.79 0.18 83)",
    glow: "rgba(251,191,36,0.35)",
    text: "text-amber-500 dark:text-amber-400",
  },
};

type SingleGaugeProps = {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
  color: GaugeColor;
  animate: boolean;
  delay?: number;
};

function SingleGauge({
  label,
  value,
  max = 100,
  suffix = "",
  color,
  animate,
  delay = 0,
}: SingleGaugeProps) {
  const prefersReducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState(0);
  const colors = colorMap[color];

  const fraction = value / max;
  // strokeDashoffset controls how much of the arc is filled
  const filledLength = fraction * ARC_LENGTH;
  const targetOffset = ARC_LENGTH - filledLength;

  // Animate the number counter
  useEffect(() => {
    if (!animate) return;
    const duration = prefersReducedMotion ? 0 : 1200 + delay * 600;
    const start = performance.now();
    let raf: number;
    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(eased * value));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    const timeout = setTimeout(() => { raf = requestAnimationFrame(tick); }, delay * 180);
    return () => { clearTimeout(timeout); cancelAnimationFrame(raf); };
  }, [animate, value, delay, prefersReducedMotion]);

  const springTransition = {
    type: "spring" as const,
    stiffness: 60,
    damping: 18,
    delay: delay * 0.18,
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={animate ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: delay * 0.14 }}
    >
      {/* SVG gauge */}
      <div className="relative">
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE * 0.78}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          style={{ overflow: "visible" }}
          aria-hidden="true"
        >
          {/* Drop shadow filter */}
          <defs>
            <filter id={`glow-${label}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Track */}
          <path
            d={trackPath}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Filled arc */}
          <motion.path
            d={trackPath}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={`${ARC_LENGTH} ${CIRCUMFERENCE}`}
            initial={{ strokeDashoffset: ARC_LENGTH }}
            animate={animate ? { strokeDashoffset: prefersReducedMotion ? targetOffset : targetOffset } : {}}
            transition={springTransition}
            style={{
              filter: `drop-shadow(0 0 6px ${colors.glow})`,
            }}
          />
        </svg>

        {/* Center value */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-4">
          <span className={`text-3xl font-bold tabular-nums tracking-tight ${colors.text}`}>
            {displayed}{suffix}
          </span>
        </div>
      </div>

      {/* Label */}
      <p className="text-center text-[0.8rem] font-medium tracking-wide text-slate-600 dark:text-slate-400 uppercase">
        {label}
      </p>
    </motion.div>
  );
}

const gauges: Array<Omit<SingleGaugeProps, "animate" | "delay">> = [
  { label: "Performance", value: 100, max: 100, suffix: "", color: "emerald" },
  { label: "Accessibility", value: 100, max: 100, suffix: "", color: "cyan" },
  { label: "SEO", value: 100, max: 100, suffix: "", color: "violet" },
  { label: "Best Practices", value: 100, max: 100, suffix: "", color: "amber" },
];

export function BenchmarkGauges() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="mx-auto w-full max-w-6xl px-6 pb-20">
      <div className="rounded-[1.6rem] border border-slate-200/80 bg-white/70 px-6 py-10 shadow-[0_18px_48px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/8 dark:bg-slate-950/60">
        {/* Heading */}
        <motion.div
          className="mb-10 text-center space-y-1.5"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[0.7rem] font-semibold tracking-[0.34em] uppercase text-[color:var(--hero-kicker)]">
            Lighthouse · Every Page
          </p>
          <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Production benchmarks
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Scores measured on production build. Fast by default, not by accident.
          </p>
        </motion.div>

        {/* Gauges row */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {gauges.map((gauge, i) => (
            <SingleGauge key={gauge.label} {...gauge} animate={isInView} delay={i} />
          ))}
        </div>

        {/* Footer note */}
        <motion.p
          className="mt-8 text-center text-[0.72rem] text-slate-400 dark:text-slate-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          Tested with Google Lighthouse (desktop) · Next.js 16 · Turbopack · Verified locally
        </motion.p>
      </div>
    </section>
  );
}
