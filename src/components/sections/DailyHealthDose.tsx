"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Lightbulb, Share2, Bookmark, ChevronRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface HealthTip {
  title: string;
  tip: string;
  source: string;
  extendedInfo: string;
  relatedLink: { label: string; href: string };
}

const healthTips: HealthTip[] = [
  {
    title: "Hydration Matters",
    tip: "Drinking water first thing in the morning kickstarts your metabolism and helps flush out toxins. Aim for at least 8 glasses throughout the day, and consider adding a squeeze of lemon for extra vitamin C.",
    source: "World Health Organization",
    extendedInfo:
      "Proper hydration supports every system in your body. Water aids digestion, nutrient absorption, circulation, and temperature regulation. Dehydration can cause headaches, fatigue, dry skin, and difficulty concentrating. Carry a reusable bottle and sip consistently rather than drinking large amounts at once.",
    relatedLink: { label: "Learn more about dehydration symptoms", href: "/health-a-z/dehydration" },
  },
  {
    title: "The Power of Walking",
    tip: "A brisk 30-minute walk daily can reduce your risk of heart disease by up to 35%. Walking after meals also helps regulate blood sugar levels, making it one of the simplest yet most effective exercises.",
    source: "American Heart Association",
    extendedInfo:
      "Walking is a low-impact exercise accessible to almost everyone. It strengthens bones, improves cardiovascular fitness, and boosts mood through endorphin release. Studies show that even splitting your walk into 10-minute segments provides significant benefits. Consider tracking your steps to stay motivated.",
    relatedLink: { label: "Learn more about heart disease prevention", href: "/health-a-z/heart-disease" },
  },
  {
    title: "Sleep Is Non-Negotiable",
    tip: "Adults need 7-9 hours of quality sleep. Poor sleep is linked to weight gain, weakened immunity, and increased anxiety. Create a consistent bedtime routine and keep screens away an hour before bed.",
    source: "National Sleep Foundation",
    extendedInfo:
      "During sleep, your body repairs tissues, consolidates memories, and releases hormones that regulate growth and appetite. Chronic sleep deprivation increases your risk of obesity, diabetes, cardiovascular disease, and depression. Keep your bedroom cool, dark, and quiet for optimal sleep quality.",
    relatedLink: { label: "Learn more about sleep disorders", href: "/health-a-z/insomnia" },
  },
  {
    title: "Eat the Rainbow",
    tip: "Different colored fruits and vegetables contain different antioxidants and phytonutrients. Aim for at least 5 servings of varied, colorful produce daily to ensure a broad spectrum of nutrients.",
    source: "Harvard School of Public Health",
    extendedInfo:
      "Red produce (tomatoes, berries) contains lycopene and anthocyanins. Orange/yellow (carrots, citrus) offers beta-carotene and vitamin C. Green (spinach, broccoli) provides folate and vitamin K. Blue/purple (blueberries, eggplant) delivers powerful antioxidants. Each color group fights different types of cellular damage.",
    relatedLink: { label: "Learn more about nutrition basics", href: "/health-a-z/nutrition" },
  },
  {
    title: "Mindful Breathing",
    tip: "Just 5 minutes of deep, diaphragmatic breathing can lower cortisol levels and reduce stress. Try the 4-7-8 technique: inhale for 4 seconds, hold for 7, and exhale slowly for 8.",
    source: "Cleveland Clinic",
    extendedInfo:
      "Deep breathing activates the parasympathetic nervous system, lowering heart rate and blood pressure. Regular practice can reduce chronic stress, improve focus, and help manage anxiety. Try incorporating breathing exercises into your morning routine or before important meetings for immediate calming effects.",
    relatedLink: { label: "Learn more about stress management", href: "/health-a-z/anxiety-disorders" },
  },
];

export function DailyHealthDose() {
  const dayIndex = new Date().getDay() % healthTips.length;
  const tip = healthTips[dayIndex];
  const [modalOpen, setModalOpen] = useState(false);

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
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-150 font-[family-name:var(--font-display)]"
                style={{
                  backgroundColor: "rgba(245,158,11,0.12)",
                  color: "#D97706",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                Read More
                <ChevronRight size={14} />
              </button>
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

      {/* Read More modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Daily Health Dose"
      >
        <div className="space-y-6">
          {/* Today's tip highlighted */}
          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "rgba(245,158,11,0.06)",
              border: "1px solid rgba(245,158,11,0.15)",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Lightbulb size={18} style={{ color: "#D97706" }} />
              <p
                className="text-xs font-medium uppercase tracking-wider font-[family-name:var(--font-display)]"
                style={{ color: "#D97706" }}
              >
                Today&apos;s Tip
              </p>
            </div>
            <h3
              className="mb-2 font-[family-name:var(--font-display)] text-lg font-bold"
              style={{ color: "var(--hw-text-primary)" }}
            >
              {tip.title}
            </h3>
            <p
              className="mb-4 text-sm leading-relaxed"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              {tip.tip}
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              {tip.extendedInfo}
            </p>
            <div className="mt-4">
              <a
                href={tip.relatedLink.href}
                className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
                style={{ color: "var(--hw-accent)" }}
              >
                {tip.relatedLink.label}
                <ChevronRight size={14} />
              </a>
            </div>
          </div>

          {/* All tips */}
          <div>
            <p
              className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
              style={{ color: "var(--hw-text-primary)" }}
            >
              All Health Tips
            </p>
            <div className="space-y-2">
              {healthTips.map((t, i) => {
                const isToday = i === dayIndex;
                return (
                  <div
                    key={t.title}
                    className="flex items-start gap-3 rounded-xl p-4"
                    style={{
                      backgroundColor: isToday
                        ? "rgba(13,148,136,0.06)"
                        : "var(--hw-surface-secondary)",
                      border: isToday
                        ? "1px solid rgba(13,148,136,0.2)"
                        : "1px solid var(--hw-border)",
                    }}
                  >
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{
                        backgroundColor: isToday
                          ? "var(--hw-accent)"
                          : "var(--hw-text-muted)",
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className="text-sm font-semibold font-[family-name:var(--font-display)]"
                        style={{ color: "var(--hw-text-primary)" }}
                      >
                        {t.title}
                        {isToday && (
                          <span
                            className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              backgroundColor: "rgba(13,148,136,0.1)",
                              color: "var(--hw-accent)",
                            }}
                          >
                            Today
                          </span>
                        )}
                      </p>
                      <p
                        className="mt-1 text-xs leading-relaxed"
                        style={{ color: "var(--hw-text-muted)" }}
                      >
                        {t.source}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </section>
  );
}
