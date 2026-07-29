"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SWRV_URL } from "@/lib/site";

const socialLinks = [
  { label: "GitHub", href: "https://github.com/PalmerCord" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/cordpalmer/" },
  { label: "Instagram", href: "https://www.instagram.com/cordian23/" },
];

export function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  return (
    <motion.footer
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-border/50 bg-background/70 border-t backdrop-blur"
    >
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} Cord Palmer. Founder of{" "}
          {/* Sitewide followed link — rel="noopener" only, so link equity and
              referrer both reach SWRV Tech. */}
          <a
            href={SWRV_URL}
            target="_blank"
            rel="noopener"
            className="hover:text-foreground underline decoration-current/30 underline-offset-4 transition-colors"
          >
            SWRV Tech
          </a>
          .
        </p>
        <nav aria-label="Social links" className="flex items-center gap-4">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.footer>
  );
}
