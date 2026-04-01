"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck } from "lucide-react";

const organizations = [
  "WHO",
  "NIH",
  "CDC",
  "Mayo Clinic",
  "Cleveland Clinic",
  "FDA",
];

export function TrustBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="py-14 sm:py-20"
      style={{ background: "var(--hw-surface)" }}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Label */}
          <div className="flex items-center gap-2">
            <ShieldCheck
              className="h-5 w-5"
              style={{ color: "var(--hw-accent)" }}
            />
            <p
              className="text-sm font-medium tracking-wide uppercase"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              Sourced from trusted medical organizations
            </p>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {organizations.map((org, i) => (
              <motion.span
                key={org}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide"
                style={{
                  background: "var(--hw-surface-secondary)",
                  color: "var(--hw-text-primary)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                {org}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
