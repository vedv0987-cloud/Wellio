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
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

/* ── gradient configs per tool ── */
const gradients: Record<string, { bg: string; glow: string; accent: string; soft: string }> = {
  "AI Health Chat": {
    bg: "linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%)",
    glow: "rgba(124,58,237,0.4)",
    accent: "#7c3aed",
    soft: "rgba(124,58,237,0.08)",
  },
  "Symptom Checker": {
    bg: "linear-gradient(135deg, #10b981 0%, #0d9488 100%)",
    glow: "rgba(16,185,129,0.4)",
    accent: "#10b981",
    soft: "rgba(16,185,129,0.08)",
  },
  "Drug Interactions": {
    bg: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
    glow: "rgba(245,158,11,0.4)",
    accent: "#f59e0b",
    soft: "rgba(245,158,11,0.08)",
  },
  "First Aid Guide": {
    bg: "linear-gradient(135deg, #ef4444 0%, #ec4899 100%)",
    glow: "rgba(239,68,68,0.4)",
    accent: "#ef4444",
    soft: "rgba(239,68,68,0.08)",
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
    description: "Get instant answers to your health questions powered by AI.",
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
              className="inline-block rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:scale-105"
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
    description: "Identify possible conditions from your symptoms interactively.",
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
                className="flex flex-col items-center gap-2 rounded-xl p-3 transition-all duration-200 hover:scale-105"
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
    description: "Check if your medications interact safely with each other.",
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
    description: "Step-by-step emergency care instructions when it matters most.",
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
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

/* ── 3D tilt card wrapper ── */
function TiltCard({
  children,
  glowColor,
  accentColor,
  onClick,
}: {
  children: React.ReactNode;
  glowColor: string;
  accentColor: string;
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
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    el.style.boxShadow = `0 0 24px ${glowColor}, 0 20px 40px rgba(0,0,0,0.08)`;
    el.style.borderColor = accentColor;
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
    el.style.borderColor = "var(--hw-border)";
  };

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="cursor-pointer rounded-2xl p-6 text-left transition-all duration-300 ease-out"
      style={{
        backgroundColor: "var(--hw-surface)",
        border: "1.5px solid var(--hw-border)",
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
    <section className="py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex items-center gap-3"
        >
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(139,92,246,0.1) 100%)",
            }}
          >
            <Zap size={18} style={{ color: "var(--hw-accent)" }} />
          </div>
          <div>
            <h2
              className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
              style={{ color: "var(--hw-text-primary)" }}
            >
              Quick Access Tools
            </h2>
            <p className="text-sm mt-0.5" style={{ color: "var(--hw-text-secondary)" }}>
              Powerful health tools at your fingertips
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            const g = gradients[tool.title];
            return (
              <motion.div key={tool.title} variants={cardVariants}>
                <TiltCard
                  glowColor={g.glow}
                  accentColor={g.accent}
                  onClick={() => setActiveTool(tool)}
                >
                  <div className="flex h-full flex-col">
                    {/* Gradient icon container */}
                    <div className="relative mb-5">
                      <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-transform duration-300"
                        style={{ background: g.bg }}
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                      {/* Soft glow behind icon */}
                      <div
                        className="absolute inset-0 h-14 w-14 rounded-2xl blur-xl opacity-40"
                        style={{ background: g.bg }}
                      />
                    </div>
                    <h3
                      className="mb-2 font-[family-name:var(--font-display)] text-lg font-semibold"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className="flex-1 text-sm font-[family-name:var(--font-body)] leading-relaxed"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {tool.description}
                    </p>
                    {/* Subtle action hint */}
                    <div
                      className="mt-4 flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: g.accent }}
                    >
                      <span>Explore</span>
                      <ArrowRight size={12} />
                    </div>
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
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg"
                  style={{ background: g.bg }}
                >
                  <activeTool.icon size={32} className="text-white" />
                </div>
                <p
                  className="text-sm leading-relaxed font-[family-name:var(--font-body)]"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  {activeTool.modalDescription}
                </p>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{ background: `linear-gradient(90deg, transparent 0%, ${g.accent}30 50%, transparent 100%)` }}
              />

              {/* Extra content */}
              {activeTool.extras}

              {/* CTA */}
              <Link
                href={activeTool.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 font-[family-name:var(--font-display)] hover:opacity-90 hover:shadow-lg"
                style={{
                  background: g.bg,
                  boxShadow: `0 4px 20px ${g.glow}`,
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
