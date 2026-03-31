"use client";

import { useState, useRef } from "react";
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
  Droplets,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

/* ── gradient configs per tool ── */
const gradients: Record<string, { bg: string; glow: string; accent: string }> = {
  "AI Health Chat": {
    bg: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
    glow: "rgba(124,58,237,0.35)",
    accent: "#7c3aed",
  },
  "Symptom Checker": {
    bg: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
    glow: "rgba(16,185,129,0.35)",
    accent: "#10b981",
  },
  "Drug Interactions": {
    bg: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    glow: "rgba(245,158,11,0.35)",
    accent: "#f59e0b",
  },
  "First Aid Guide": {
    bg: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
    glow: "rgba(239,68,68,0.35)",
    accent: "#ef4444",
  },
};

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
                backgroundColor: "rgba(124,58,237,0.08)",
                color: "#7c3aed",
                border: "1px solid rgba(124,58,237,0.2)",
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
                  backgroundColor: "rgba(16,185,129,0.06)",
                  border: "1px solid rgba(16,185,129,0.2)",
                }}
              >
                <Icon size={24} style={{ color: "#10b981" }} />
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
      <div
        className="flex items-center gap-3 rounded-xl p-4"
        style={{
          backgroundColor: "rgba(245,158,11,0.08)",
          border: "1px solid rgba(245,158,11,0.2)",
        }}
      >
        <AlertTriangle size={20} style={{ color: "#D97706" }} />
        <p className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
          Always verify interactions with your pharmacist or physician before
          making changes.
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
                style={{
                  background:
                    "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
                }}
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
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

/* ── 3D tilt card wrapper ── */
function TiltCard({
  children,
  glowColor,
  onClick,
}: {
  children: React.ReactNode;
  glowColor: string;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -4;
    const rotateY = ((x - centerX) / centerX) * 4;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    el.style.boxShadow = `0 0 20px ${glowColor}, 0 8px 32px rgba(0,0,0,0.08)`;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer rounded-xl p-6 text-left transition-all duration-200"
      style={{
        backgroundColor: "var(--hw-surface)",
        border: "1px solid var(--hw-border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </div>
  );
}

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
            const g = gradients[tool.title];
            return (
              <motion.div key={tool.title} variants={cardVariants}>
                <TiltCard
                  glowColor={g.glow}
                  onClick={() => setActiveTool(tool)}
                >
                  <div className="flex h-full flex-col">
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-sm"
                      style={{ background: g.bg }}
                    >
                      <Icon size={26} className="text-white" />
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
                  </div>
                </TiltCard>
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
        {activeTool && (() => {
          const g = gradients[activeTool.title];
          return (
            <div className="space-y-6">
              {/* Icon + description */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl shadow-md"
                  style={{ background: g.bg }}
                >
                  <activeTool.icon size={30} className="text-white" />
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
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-200 font-[family-name:var(--font-display)] hover:opacity-90"
                style={{
                  background: g.bg,
                  boxShadow: `0 4px 16px ${g.glow}`,
                }}
              >
                {activeTool.ctaLabel}
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })()}
      </Modal>
    </section>
  );
}
