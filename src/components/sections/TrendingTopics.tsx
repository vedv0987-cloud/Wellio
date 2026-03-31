"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, TrendingUp, ArrowRight, Stethoscope } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface TrendingCondition {
  name: string;
  slug: string;
  category: string;
  description: string;
  symptoms: string[];
  affectedPercent?: string;
  ageGroup?: string;
}

const trendingConditions: TrendingCondition[] = [
  {
    name: "Diabetes",
    slug: "diabetes",
    category: "Endocrine",
    description:
      "Managing blood sugar levels through diet, exercise, and medication.",
    symptoms: ["Increased thirst", "Frequent urination", "Unexplained weight loss", "Fatigue"],
    affectedPercent: "~11%",
    ageGroup: "Adults 45+",
  },
  {
    name: "Hypertension",
    slug: "hypertension",
    category: "Cardiovascular",
    description:
      "Understanding high blood pressure and heart-healthy lifestyle changes.",
    symptoms: ["Often asymptomatic", "Headaches", "Shortness of breath", "Nosebleeds"],
    affectedPercent: "~47%",
    ageGroup: "Adults 30+",
  },
  {
    name: "Anxiety",
    slug: "anxiety-disorders",
    category: "Mental Health",
    description:
      "Coping strategies and treatments for generalized anxiety disorder.",
    symptoms: ["Excessive worry", "Restlessness", "Difficulty concentrating", "Sleep problems"],
    affectedPercent: "~19%",
    ageGroup: "All ages",
  },
  {
    name: "PCOS",
    slug: "pcos",
    category: "Reproductive",
    description:
      "Hormonal imbalance affecting menstrual cycles and overall health.",
    symptoms: ["Irregular periods", "Excess androgen", "Polycystic ovaries", "Weight gain"],
    affectedPercent: "~10%",
    ageGroup: "Women 15-44",
  },
  {
    name: "Thyroid Disorders",
    slug: "thyroid-disorders",
    category: "Endocrine",
    description:
      "Hypo- and hyperthyroidism symptoms, diagnosis, and management.",
    symptoms: ["Fatigue", "Weight changes", "Temperature sensitivity", "Mood changes"],
    affectedPercent: "~5%",
    ageGroup: "Adults 30+",
  },
  {
    name: "Vitamin D Deficiency",
    slug: "vitamin-d-deficiency",
    category: "Nutrition",
    description:
      "The sunshine vitamin — why deficiency is so common and how to fix it.",
    symptoms: ["Bone pain", "Muscle weakness", "Fatigue", "Mood changes"],
    affectedPercent: "~42%",
    ageGroup: "All ages",
  },
  {
    name: "Migraine",
    slug: "migraine",
    category: "Neurology",
    description:
      "Triggers, prevention, and treatment of chronic migraine headaches.",
    symptoms: ["Intense headache", "Nausea", "Light sensitivity", "Aura"],
    affectedPercent: "~12%",
    ageGroup: "Adults 18-55",
  },
  {
    name: "Back Pain",
    slug: "back-pain",
    category: "Musculoskeletal",
    description:
      "Common causes and evidence-based approaches to lasting relief.",
    symptoms: ["Persistent ache", "Stiffness", "Reduced mobility", "Radiating pain"],
    affectedPercent: "~80% lifetime",
    ageGroup: "Adults 30-60",
  },
];

export function TrendingTopics() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<TrendingCondition | null>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: "var(--hw-surface-secondary)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Trending Health Topics
          </motion.h2>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
                color: "var(--hw-text-secondary)",
              }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
                color: "var(--hw-text-secondary)",
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {trendingConditions.map((condition, i) => (
            <motion.button
              key={condition.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelected(condition)}
              className="w-[280px] shrink-0 cursor-pointer rounded-xl p-5 text-left"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
              }}
            >
              <div className="mb-3 flex items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-medium font-[family-name:var(--font-display)]"
                  style={{
                    backgroundColor: "var(--hw-surface-secondary)",
                    color: "var(--hw-text-secondary)",
                    border: "1px solid var(--hw-border)",
                  }}
                >
                  {condition.category}
                </span>
                <span
                  className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium font-[family-name:var(--font-display)]"
                  style={{
                    backgroundColor: "rgba(245,158,11,0.1)",
                    color: "#D97706",
                  }}
                >
                  <TrendingUp size={12} />
                  Trending
                </span>
              </div>
              <h3
                className="mb-2 font-[family-name:var(--font-display)] text-base font-semibold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                {condition.name}
              </h3>
              <p
                className="text-sm leading-relaxed font-[family-name:var(--font-body)]"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {condition.description}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Condition detail modal */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ""}
      >
        {selected && (
          <div className="space-y-6">
            {/* Name + category */}
            <div className="flex items-center gap-3">
              <h3
                className="font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                {selected.name}
              </h3>
              <span
                className="rounded-full px-3 py-1 text-xs font-medium"
                style={{
                  backgroundColor: "rgba(13,148,136,0.1)",
                  color: "var(--hw-accent)",
                }}
              >
                {selected.category}
              </span>
            </div>

            {/* Description */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              {selected.description}
            </p>

            {/* Key symptoms */}
            <div>
              <p
                className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
                style={{ color: "var(--hw-text-primary)" }}
              >
                Key Symptoms
              </p>
              <ul className="space-y-2">
                {selected.symptoms.map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: "var(--hw-accent)" }}
                    />
                    <span className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick stats */}
            {(selected.affectedPercent || selected.ageGroup) && (
              <div className="grid grid-cols-2 gap-3">
                {selected.affectedPercent && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "var(--hw-surface-secondary)",
                      border: "1px solid var(--hw-border)",
                    }}
                  >
                    <p className="text-xs font-medium" style={{ color: "var(--hw-text-muted)" }}>
                      Affected Population
                    </p>
                    <p
                      className="mt-1 text-lg font-bold font-[family-name:var(--font-display)]"
                      style={{ color: "var(--hw-accent)" }}
                    >
                      {selected.affectedPercent}
                    </p>
                  </div>
                )}
                {selected.ageGroup && (
                  <div
                    className="rounded-xl p-4"
                    style={{
                      backgroundColor: "var(--hw-surface-secondary)",
                      border: "1px solid var(--hw-border)",
                    }}
                  >
                    <p className="text-xs font-medium" style={{ color: "var(--hw-text-muted)" }}>
                      Primary Age Group
                    </p>
                    <p
                      className="mt-1 text-lg font-bold font-[family-name:var(--font-display)]"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {selected.ageGroup}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/health-a-z/${selected.slug}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity duration-150 font-[family-name:var(--font-display)] hover:opacity-90"
                style={{ backgroundColor: "var(--hw-accent)" }}
              >
                Learn More
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/symptom-checker"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-colors duration-150 font-[family-name:var(--font-display)]"
                style={{
                  backgroundColor: "var(--hw-surface-secondary)",
                  color: "var(--hw-text-primary)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                <Stethoscope size={16} />
                Check Symptoms
              </Link>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
