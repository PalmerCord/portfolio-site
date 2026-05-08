"use client";

import { Button } from "@/components/ui/button";
import type { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef } from "react";

type ProjectDetailPanelProps = {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  returnFocusRef?: React.RefObject<HTMLElement | null>;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function ProjectDetailPanel({
  project,
  isOpen,
  onClose,
  onNext,
  onPrev,
  returnFocusRef,
}: ProjectDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const announceId = useId();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();
    const returnFocusElement = returnFocusRef?.current ?? null;

    function onKeyDown(event: KeyboardEvent) {
      if (!panelRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowRight" && panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        onNext();
        return;
      }

      if (event.key === "ArrowLeft" && panelRef.current.contains(document.activeElement)) {
        event.preventDefault();
        onPrev();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

      if (focusableElements.length === 0) { event.preventDefault(); return; }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      returnFocusElement?.focus();
    };
  }, [isOpen, onClose, onNext, onPrev, returnFocusRef]);

  const slideVariants = {
    hidden: { x: "100%", opacity: prefersReducedMotion ? 1 : 0.6 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring" as const, stiffness: 340, damping: 38, mass: 0.9 },
    },
    exit: {
      x: "100%",
      opacity: prefersReducedMotion ? 1 : 0.6,
      transition: { type: "spring" as const, stiffness: 400, damping: 40 },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.22 } },
    exit: { opacity: 0, transition: { duration: 0.18, delay: 0.05 } },
  };

  return (
    <AnimatePresence>
      {isOpen && project && (
        <div className="fixed inset-0 z-50" aria-hidden={!isOpen}>
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="bg-background border-border absolute top-0 right-0 flex h-full w-full flex-col border-l shadow-xl md:w-[60vw]"
            variants={prefersReducedMotion ? undefined : slideVariants}
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            exit={prefersReducedMotion ? undefined : "exit"}
          >
            <p id={announceId} className="sr-only" aria-live="polite" aria-atomic="true">
              Viewing project: {project.title}
            </p>

            <div className="border-border flex items-center justify-between border-b p-4">
              <h2 id={titleId} className="text-xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <Button ref={closeButtonRef} type="button" variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 md:p-6">
              <section className="space-y-3">
                <div className="border-border bg-card relative overflow-hidden rounded-2xl border">
                  <div className="relative h-[420px] w-full md:h-[500px]">
                    <Image
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      fill
                      sizes="(max-width: 768px) 100vw, 60vw"
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

              <section className="space-y-4">
                <p className="text-muted-foreground text-sm leading-relaxed">{project.content}</p>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Industry</p>
                  <div className="flex flex-wrap gap-2">
                    {project.industry.map((item) => (
                      <span
                        key={item}
                        className="border-border bg-secondary text-secondary-foreground rounded-md border px-2 py-1 text-xs font-medium capitalize"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Technology</p>
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
                </div>
              </section>
            </div>

            <div className="border-border flex items-center justify-between gap-3 border-t p-4">
              <Button type="button" variant="outline" onClick={onPrev}>
                Previous
              </Button>
              <Button type="button" variant="outline" onClick={onNext}>
                Next
              </Button>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

