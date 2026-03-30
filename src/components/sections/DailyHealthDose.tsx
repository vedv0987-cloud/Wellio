"use client";

import { motion } from "motion/react";
import { Lightbulb, Share2, Bookmark } from "lucide-react";

const healthTips = [
  {
    title: "Hydration Matters",
    tip: "Drinking water first thing in the morning kickstarts your metabolism and helps flush out toxins. Aim for at least 8 glasses throughout the day, and consider adding a squeeze of lemon for extra vitamin C.",
    source: "World Health Organization",
  },
  {
    title: "The Power of Walking",
    tip: "A brisk 30-minute walk daily can reduce your risk of heart disease by up to 35%. Walking after meals also helps regulate blood sugar levels, making it one of the simplest yet most effective exercises.",
    source: "American Heart Association",
  },
  {
    title: "Sleep Is Non-Negotiable",
    tip: "Adults need 7-9 hours of quality sleep. Poor sleep is linked to weight gain, weakened immunity, and increased anxiety. Create a consistent bedtime routine and keep screens away an hour before bed.",
    source: "National Sleep Foundation",
  },
  {
    title: "Eat the Rainbow",
    tip: "Different colored fruits and vegetables contain different antioxidants and phytonutrients. Aim for at least 5 servings of varied, colorful produce daily to ensure a broad spectrum of nutrients.",
    source: "Harvard School of Public Health",
  },
  {
    title: "Mindful Breathing",
    tip: "Just 5 minutes of deep, diaphragmatic breathing can lower cortisol levels and reduce stress. Try the 4-7-8 technique: inhale for 4 seconds, hold for 7, and exhale slowly for 8.",
    source: "Cleveland Clinic",
  },
];

export function DailyHealthDose() {
  const dayIndex = new Date().getDay() % healthTips.length;
  const tip = healthTips[dayIndex];

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
          Daily Health Dose
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto max-w-3xl rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: "rgba(245,158,11,0.05)",
            border: "1px solid rgba(245,158,11,0.15)",
          }}
        >
          {/* Header */}
          <div className="mb-6 flex items-center gap-3">
            <div
              className="flex h-11 w-11 items-center justify-center rounded-xl"
              style={{ backgroundColor: "rgba(245,158,11,0.15)" }}
            >
              <Lightbulb size={22} style={{ color: "#D97706" }} />
            </div>
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider font-[family-name:var(--font-display)]"
                style={{ color: "#D97706" }}
              >
                Today&apos;s Health Tip
              </p>
              <h3
                className="font-[family-name:var(--font-display)] text-lg font-bold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                {tip.title}
              </h3>
            </div>
          </div>

          {/* Tip content */}
          <p
            className="mb-6 text-base leading-relaxed font-[family-name:var(--font-body)]"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            {tip.tip}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-[family-name:var(--font-body)]"
              style={{ color: "var(--hw-text-muted)" }}
            >
              Source: {tip.source}
            </p>
            <div className="flex items-center gap-2">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150"
                style={{
                  backgroundColor: "var(--hw-surface)",
                  border: "1px solid var(--hw-border)",
                  color: "var(--hw-text-secondary)",
                }}
                aria-label="Share tip"
              >
                <Share2 size={16} />
              </button>
              <button
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-150"
                style={{
                  backgroundColor: "var(--hw-surface)",
                  border: "1px solid var(--hw-border)",
                  color: "var(--hw-text-secondary)",
                }}
                aria-label="Bookmark tip"
              >
                <Bookmark size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
