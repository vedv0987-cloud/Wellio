"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const sampleConditions: Record<string, { name: string; slug: string }[]> = {
  A: [
    { name: "Asthma", slug: "asthma" },
    { name: "Anxiety Disorders", slug: "anxiety-disorders" },
    { name: "Arthritis", slug: "arthritis" },
    { name: "Anemia", slug: "anemia" },
    { name: "Allergies", slug: "allergies" },
  ],
  B: [
    { name: "Back Pain", slug: "back-pain" },
    { name: "Bronchitis", slug: "bronchitis" },
    { name: "Bipolar Disorder", slug: "bipolar-disorder" },
    { name: "Blood Pressure", slug: "blood-pressure" },
  ],
  C: [
    { name: "COVID-19", slug: "covid-19" },
    { name: "COPD", slug: "copd" },
    { name: "Celiac Disease", slug: "celiac-disease" },
    { name: "Chronic Fatigue Syndrome", slug: "chronic-fatigue-syndrome" },
  ],
  D: [
    { name: "Diabetes", slug: "diabetes" },
    { name: "Depression", slug: "depression" },
    { name: "Dermatitis", slug: "dermatitis" },
    { name: "Dementia", slug: "dementia" },
  ],
  H: [
    { name: "Hypertension", slug: "hypertension" },
    { name: "Heart Disease", slug: "heart-disease" },
    { name: "Hepatitis", slug: "hepatitis" },
    { name: "Hypothyroidism", slug: "hypothyroidism" },
  ],
  T: [
    { name: "Thyroid Disorders", slug: "thyroid-disorders" },
    { name: "Tinnitus", slug: "tinnitus" },
    { name: "Tuberculosis", slug: "tuberculosis" },
    { name: "Type 2 Diabetes", slug: "type-2-diabetes" },
  ],
};

export function HealthAZPreview() {
  const [activeLetter, setActiveLetter] = useState("A");
  const conditions = sampleConditions[activeLetter] ?? [];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Health A-Z Quick Browse
        </motion.h2>

        {/* Alphabet strip */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {alphabet.map((letter) => {
            const isActive = activeLetter === letter;
            const hasData = letter in sampleConditions;
            return (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-150 font-[family-name:var(--font-display)]"
                style={{
                  backgroundColor: isActive
                    ? "var(--hw-accent)"
                    : "var(--hw-surface-secondary)",
                  color: isActive ? "#fff" : hasData ? "var(--hw-text-primary)" : "var(--hw-text-muted)",
                  border: isActive ? "none" : "1px solid var(--hw-border)",
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Conditions list */}
        <div
          className="min-h-[120px] rounded-xl p-6"
          style={{
            backgroundColor: "var(--hw-surface)",
            border: "1px solid var(--hw-border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLetter}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
            >
              {conditions.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {conditions.map((condition) => (
                    <Link
                      key={condition.slug}
                      href={`/health-a-z/${condition.slug}`}
                      className="group flex items-center gap-2 rounded-lg px-4 py-3 transition-colors duration-150"
                      style={{
                        backgroundColor: "var(--hw-surface-secondary)",
                      }}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--hw-accent)" }}
                      />
                      <span
                        className="text-sm font-medium font-[family-name:var(--font-body)] transition-colors duration-150 group-hover:underline"
                        style={{ color: "var(--hw-text-primary)" }}
                      >
                        {condition.name}
                      </span>
                    </Link>
                  ))}
                </div>
              ) : (
                <p
                  className="py-4 text-center text-sm font-[family-name:var(--font-body)]"
                  style={{ color: "var(--hw-text-muted)" }}
                >
                  No conditions available for &ldquo;{activeLetter}&rdquo; yet.{" "}
                  <Link
                    href="/health-a-z"
                    className="underline"
                    style={{ color: "var(--hw-accent)" }}
                  >
                    Browse all conditions
                  </Link>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 text-right">
          <Link
            href="/health-a-z"
            className="text-sm font-medium font-[family-name:var(--font-display)] transition-colors duration-150"
            style={{ color: "var(--hw-accent)" }}
          >
            View all conditions &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
