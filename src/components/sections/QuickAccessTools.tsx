"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  MessageSquare,
  Activity,
  Pill,
  Heart,
  Brain,
  Scan,
  AlertTriangle,
  Flame,
  Droplets,
  Wind,
  Zap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface ToolCard {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  modalDescription: string;
  ctaLabel: string;
  extras: React.ReactNode;
}

const sampleQuestions = [
  "What causes frequent headaches?",
  "How to lower cholesterol naturally?",
  "Is intermittent fasting safe?",
  "What are early signs of diabetes?",
];

const bodyRegions = [
  { icon: Brain, label: "Head & Brain" },
  { icon: Scan, label: "Chest & Lungs" },
  { icon: Activity, label: "Heart" },
  { icon: Droplets, label: "Digestive" },
];

const criticalProcedures = [
  "CPR (Cardiopulmonary Resuscitation)",
  "Choking / Heimlich Maneuver",
  "Severe Bleeding Control",
  "Burns Treatment",
  "Allergic Reaction (Anaphylaxis)",
];

const tools: ToolCard[] = [
  {
    title: "AI Health Chat",
    description: "Get instant answers to your health questions.",
    href: "/ai-chat",
    icon: MessageSquare,
    modalDescription:
      "Ask our AI-powered health assistant anything about symptoms, medications, lifestyle changes, or general wellness. Get evidence-based answers in seconds with citations from trusted medical sources.",
    ctaLabel: "Open AI Chat",
    extras: (
      <div>
        <p
          className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Try asking:
        </p>
        <div className="flex flex-wrap gap-2">
          {sampleQuestions.map((q) => (
            <span
              key={q}
              className="inline-block rounded-full px-3 py-1.5 text-xs font-medium"
              style={{
                backgroundColor: "var(--hw-surface-secondary)",
                color: "var(--hw-text-secondary)",
                border: "1px solid var(--hw-border)",
              }}
            >
              {q}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Symptom Checker",
    description: "Identify possible conditions from your symptoms.",
    href: "/symptom-checker",
    icon: Activity,
    modalDescription:
      "Select your symptoms from an interactive body map and receive a list of possible conditions ranked by likelihood. Our algorithm cross-references thousands of medical records to provide accurate suggestions.",
    ctaLabel: "Start Symptom Check",
    extras: (
      <div>
        <p
          className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Select a body region to begin:
        </p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {bodyRegions.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.label}
                className="flex flex-col items-center gap-2 rounded-xl p-3"
                style={{
                  backgroundColor: "var(--hw-surface-secondary)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                <Icon size={24} style={{ color: "var(--hw-accent)" }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  {r.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    ),
  },
  {
    title: "Drug Interactions",
    description: "Check if your medications interact safely.",
    href: "/drug-interactions",
    icon: Pill,
    modalDescription:
      "Enter two or more medications to instantly check for potentially dangerous interactions. See severity levels, alternative suggestions, and consult notes to bring to your doctor.",
    ctaLabel: "Check Drug Interactions",
    extras: (
      <div className="flex items-center gap-3 rounded-xl p-4" style={{ backgroundColor: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)" }}>
        <AlertTriangle size={20} style={{ color: "#D97706" }} />
        <p className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
          Always verify interactions with your pharmacist or physician before making changes.
        </p>
      </div>
    ),
  },
  {
    title: "First Aid Guide",
    description: "Step-by-step emergency care instructions.",
    href: "/first-aid",
    icon: Heart,
    modalDescription:
      "Access quick, clear step-by-step guides for common emergencies. Each procedure includes illustrations, timing guidance, and when to call emergency services.",
    ctaLabel: "View All Procedures",
    extras: (
      <div>
        <p
          className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Most critical procedures:
        </p>
        <ul className="space-y-2">
          {criticalProcedures.map((proc, i) => (
            <li key={proc} className="flex items-center gap-2.5">
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "var(--hw-accent)" }}
              >
                {i + 1}
              </span>
              <span
                className="text-sm"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {proc}
              </span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function QuickAccessTools() {
  const [activeTool, setActiveTool] = useState<ToolCard | null>(null);

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Quick Access Tools
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.title} variants={cardVariants}>
                <button
                  onClick={() => setActiveTool(tool)}
                  className="group flex h-full w-full flex-col rounded-xl p-6 text-left transition-shadow duration-200"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    border: "1px solid var(--hw-border)",
                    borderLeft: "4px solid var(--hw-accent)",
                  }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex h-full flex-col"
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: "rgba(13,148,136,0.1)",
                      }}
                    >
                      <Icon
                        size={28}
                        style={{ color: "var(--hw-accent)" }}
                      />
                    </div>
                    <h3
                      className="mb-1.5 font-[family-name:var(--font-display)] text-lg font-semibold"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className="text-sm font-[family-name:var(--font-body)] leading-relaxed"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {tool.description}
                    </p>
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Tool detail modal */}
      <Modal
        isOpen={!!activeTool}
        onClose={() => setActiveTool(null)}
        title={activeTool?.title ?? ""}
      >
        {activeTool && (
          <div className="space-y-6">
            {/* Icon + description */}
            <div className="flex items-start gap-4">
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                style={{ backgroundColor: "rgba(13,148,136,0.12)" }}
              >
                <activeTool.icon size={30} style={{ color: "var(--hw-accent)" }} />
              </div>
              <p
                className="text-sm leading-relaxed font-[family-name:var(--font-body)]"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {activeTool.modalDescription}
              </p>
            </div>

            {/* Extra content */}
            {activeTool.extras}

            {/* CTA */}
            <Link
              href={activeTool.href}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity duration-150 font-[family-name:var(--font-display)] hover:opacity-90"
              style={{ backgroundColor: "var(--hw-accent)" }}
            >
              {activeTool.ctaLabel}
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Modal>
    </section>
  );
}
