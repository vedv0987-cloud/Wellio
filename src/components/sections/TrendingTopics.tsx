"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

interface TrendingCondition {
  name: string;
  category: string;
  description: string;
}

const trendingConditions: TrendingCondition[] = [
  {
    name: "Diabetes",
    category: "Endocrine",
    description:
      "Managing blood sugar levels through diet, exercise, and medication.",
  },
  {
    name: "Hypertension",
    category: "Cardiovascular",
    description:
      "Understanding high blood pressure and heart-healthy lifestyle changes.",
  },
  {
    name: "Anxiety",
    category: "Mental Health",
    description:
      "Coping strategies and treatments for generalized anxiety disorder.",
  },
  {
    name: "PCOS",
    category: "Reproductive",
    description:
      "Hormonal imbalance affecting menstrual cycles and overall health.",
  },
  {
    name: "Thyroid Disorders",
    category: "Endocrine",
    description:
      "Hypo- and hyperthyroidism symptoms, diagnosis, and management.",
  },
  {
    name: "Vitamin D Deficiency",
    category: "Nutrition",
    description:
      "The sunshine vitamin — why deficiency is so common and how to fix it.",
  },
  {
    name: "Migraine",
    category: "Neurology",
    description:
      "Triggers, prevention, and treatment of chronic migraine headaches.",
  },
  {
    name: "Back Pain",
    category: "Musculoskeletal",
    description:
      "Common causes and evidence-based approaches to lasting relief.",
  },
];

export function TrendingTopics() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
            <motion.div
              key={condition.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="w-[280px] shrink-0 cursor-pointer rounded-xl p-5"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
