"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  /**
   * priority: above-the-fold LCP content. Stays visible (opacity: 1) at all
   * times — only the Y offset animates. Prevents Framer Motion from hiding
   * the element during hydration, which kills Lighthouse LCP.
   */
  priority?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 1,
  priority = false,
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  if (priority) {
    return (
      <motion.div
        initial={{ opacity: 1, y }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
