"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square,
  Clock,
  Users,
  Calendar,
  Activity,
  Heart,
  AlertCircle,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { conditions } from "@/data/conditions";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  cardiovascular: { bg: "bg-red-500/15", text: "text-red-400" },
  respiratory: { bg: "bg-sky-500/15", text: "text-sky-400" },
  digestive: { bg: "bg-amber-500/15", text: "text-amber-400" },
  neurological: { bg: "bg-purple-500/15", text: "text-purple-400" },
  endocrine: { bg: "bg-teal-500/15", text: "text-teal-400" },
  musculoskeletal: { bg: "bg-orange-500/15", text: "text-orange-400" },
  mental_health: { bg: "bg-indigo-500/15", text: "text-indigo-400" },
  skin: { bg: "bg-pink-500/15", text: "text-pink-400" },
  eye: { bg: "bg-cyan-500/15", text: "text-cyan-400" },
  ear: { bg: "bg-yellow-500/15", text: "text-yellow-400" },
  reproductive: { bg: "bg-rose-500/15", text: "text-rose-400" },
  immune: { bg: "bg-emerald-500/15", text: "text-emerald-400" },
  cancer: { bg: "bg-red-600/15", text: "text-red-500" },
  infectious: { bg: "bg-lime-500/15", text: "text-lime-400" },
};

const SEVERITY_DOT: Record<string, string> = {
  mild: "bg-green-400",
  moderate: "bg-yellow-400",
  severe: "bg-red-400",
  critical: "bg-red-600",
};

const SEVERITY_TEXT: Record<string, string> = {
  mild: "text-green-400",
  moderate: "text-yellow-400",
  severe: "text-red-400",
  critical: "text-red-600",
};

const SEVERITY_BADGE: Record<string, string> = {
  mild: "bg-green-500/15 text-green-400",
  moderate: "bg-yellow-500/15 text-yellow-400",
  severe: "bg-red-500/15 text-red-400",
  critical: "bg-red-600/15 text-red-500",
};

const RISK_LEVEL_WIDTH: Record<string, string> = {
  low: "w-1/4",
  medium: "w-1/2",
  high: "w-3/4",
};

const RISK_LEVEL_COLOR: Record<string, string> = {
  low: "bg-green-400",
  medium: "bg-yellow-400",
  high: "bg-red-400",
};

const RISK_LEVEL_TEXT: Record<string, string> = {
  low: "#4ade80",
  medium: "#facc15",
  high: "#f87171",
};

type TreatmentTab = "medications" | "lifestyle" | "alternative";

const TREATMENT_TABS: { key: TreatmentTab; label: string }[] = [
  { key: "medications", label: "Medications" },
  { key: "lifestyle", label: "Lifestyle" },
  { key: "alternative", label: "Alternative" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatCategory(cat: string): string {
  return cat
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                    */
/* ------------------------------------------------------------------ */

function Section({
  title,
  children,
  delay = 0,
}: {
  title?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay }}
      className="mb-12"
    >
      {title && (
        <h2
          className="mb-6 text-2xl font-bold"
          style={{ color: "var(--hw-text-primary)" }}
        >
          {title}
        </h2>
      )}
      {children}
    </motion.section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function ConditionDetailPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;
  const condition = conditions.find((c) => c.slug === slug);

  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<TreatmentTab>("medications");
  const [expandedQuestions, setExpandedQuestions] = useState<Set<number>>(
    new Set()
  );
  const [sourcesOpen, setSourcesOpen] = useState(false);

  /* ---- not found state ---- */
  if (!condition) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-6 px-4"
        style={{
          backgroundColor: "var(--hw-bg)",
          color: "var(--hw-text-primary)",
        }}
      >
        <AlertCircle
          className="h-16 w-16"
          style={{ color: "var(--hw-text-secondary)" }}
        />
        <h1 className="font-display text-3xl font-bold">
          Condition not found
        </h1>
        <p style={{ color: "var(--hw-text-secondary)" }}>
          The condition you are looking for does not exist or may have been
          removed.
        </p>
        <Link
          href="/health-a-z"
          className="mt-2 inline-flex items-center gap-2 rounded-xl px-6 py-3 font-medium text-white transition-colors"
          style={{ backgroundColor: "var(--hw-accent)" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--hw-accent-hover)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--hw-accent)";
          }}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Health A-Z
        </Link>
      </div>
    );
  }

  /* ---- derived data ---- */
  const catColor = CATEGORY_COLORS[condition.category] ?? {
    bg: "bg-gray-500/15",
    text: "text-gray-400",
  };
  const currentTreatments = condition.treatments[activeTab] ?? [];

  const toggleChecked = (idx: number) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleQuestion = (idx: number) => {
    setExpandedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  /* ================================================================ */

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--hw-bg)",
        color: "var(--hw-text-primary)",
      }}
    >
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <Link
            href="/health-a-z"
            className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: "var(--hw-accent)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--hw-accent-hover)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--hw-accent)";
            }}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Health A-Z
          </Link>
        </motion.div>

        {/* ===================== HEADER ===================== */}
        <Section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="mb-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {condition.name}
            </h1>

            {condition.pronunciation && (
              <p
                className="mb-4 text-lg italic"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                /{condition.pronunciation}/
              </p>
            )}

            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-sm font-medium ${catColor.bg} ${catColor.text}`}
              >
                {formatCategory(condition.category)}
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`inline-block h-2.5 w-2.5 rounded-full ${SEVERITY_DOT[condition.severity]}`}
                />
                <span
                  className={`text-sm font-medium ${SEVERITY_TEXT[condition.severity]}`}
                >
                  {capitalize(condition.severity)}
                </span>
              </span>
            </div>

            <p className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
              Last reviewed by{" "}
              <span style={{ color: "var(--hw-text-primary)" }}>
                {condition.lastReviewedBy}
              </span>{" "}
              on{" "}
              <span style={{ color: "var(--hw-text-primary)" }}>
                {formatDate(condition.lastReviewedDate)}
              </span>
            </p>
          </motion.div>
        </Section>

        {/* ===================== QUICK FACTS ===================== */}
        <Section delay={0.05}>
          <h2
            className="mb-6 text-2xl font-bold"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Quick Facts
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              {
                icon: Users,
                label: "Affected",
                value: `${condition.affectedPercentage}%`,
                sub: "of population",
              },
              {
                icon: Calendar,
                label: "Age Group",
                value: condition.commonAgeGroup,
                sub: "years",
              },
              {
                icon: Activity,
                label: "Severity",
                value: capitalize(condition.severity),
                sub: "level",
              },
              {
                icon: Heart,
                label: "Outlook",
                value: condition.isCurable ? "Curable" : "Manageable",
                sub: condition.isCurable
                  ? "can be fully treated"
                  : "requires ongoing care",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border p-4"
                style={{
                  backgroundColor: "var(--hw-surface)",
                  borderColor: "var(--hw-border)",
                }}
              >
                <stat.icon
                  className="mb-2 h-5 w-5"
                  style={{ color: "var(--hw-accent)" }}
                />
                <p
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  {stat.label}
                </p>
                <p className="mt-1 text-xl font-bold">{stat.value}</p>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  {stat.sub}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ===================== OVERVIEW ===================== */}
        <Section title="Overview" delay={0.05}>
          <p
            className="mb-6 text-base leading-relaxed"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            {condition.overview}
          </p>
          <div
            className="rounded-xl border-l-4 p-5"
            style={{
              borderLeftColor: "#14b8a6",
              backgroundColor: "var(--hw-surface)",
            }}
          >
            <p className="mb-1 text-sm font-semibold" style={{ color: "#14b8a6" }}>
              Key Takeaway
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              {condition.isCurable
                ? `${condition.name} is curable with proper medical treatment and lifestyle changes.`
                : `While ${condition.name.toLowerCase()} is not curable, it can be effectively managed with the right treatment plan and lifestyle modifications.`}
            </p>
          </div>
        </Section>

        {/* ===================== SYMPTOMS ===================== */}
        {condition.symptoms.length > 0 && (
          <Section title="Symptoms" delay={0.05}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {condition.symptoms.map((symptom, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: idx * 0.08 }}
                  className="rounded-xl border p-4"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    borderColor: "var(--hw-border)",
                  }}
                >
                  <div className="mb-2 flex items-start justify-between gap-2">
                    <h4 className="font-semibold">{symptom.name}</h4>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${SEVERITY_BADGE[symptom.severity]}`}
                    >
                      {capitalize(symptom.severity)}
                    </span>
                  </div>
                  <p
                    className="mb-1.5 text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--hw-accent)" }}
                  >
                    {symptom.bodyPart}
                  </p>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    {symptom.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* =============== CAUSES & RISK FACTORS =============== */}
        {(condition.causes.length > 0 || condition.riskFactors.length > 0) && (
          <Section title="Causes &amp; Risk Factors" delay={0.05}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Causes */}
              {condition.causes.length > 0 && (
                <div
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    borderColor: "var(--hw-border)",
                  }}
                >
                  <h3 className="mb-4 text-lg font-semibold">Causes</h3>
                  <ul className="space-y-3">
                    {condition.causes.map((c, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: "var(--hw-accent)" }}
                        />
                        <div>
                          <p className="font-medium">{c.cause}</p>
                          <p
                            className="text-sm"
                            style={{ color: "var(--hw-text-secondary)" }}
                          >
                            {c.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Risk Factors */}
              {condition.riskFactors.length > 0 && (
                <div
                  className="rounded-xl border p-5"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    borderColor: "var(--hw-border)",
                  }}
                >
                  <h3 className="mb-4 text-lg font-semibold">Risk Factors</h3>
                  <ul className="space-y-4">
                    {condition.riskFactors.map((rf, idx) => (
                      <li key={idx}>
                        <div className="mb-1 flex items-center justify-between">
                          <p className="font-medium">{rf.factor}</p>
                          <span
                            className="text-xs font-semibold uppercase"
                            style={{ color: RISK_LEVEL_TEXT[rf.level] }}
                          >
                            {rf.level}
                          </span>
                        </div>
                        <div
                          className="mb-1.5 h-2 w-full overflow-hidden rounded-full"
                          style={{
                            backgroundColor: "var(--hw-surface-secondary)",
                          }}
                        >
                          <div
                            className={`h-full rounded-full transition-all ${RISK_LEVEL_WIDTH[rf.level]} ${RISK_LEVEL_COLOR[rf.level]}`}
                          />
                        </div>
                        <p
                          className="text-sm"
                          style={{ color: "var(--hw-text-secondary)" }}
                        >
                          {rf.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Section>
        )}

        {/* ===================== DIAGNOSIS ===================== */}
        {condition.diagnosisSteps.length > 0 && (
          <Section title="Diagnosis" delay={0.05}>
            <div
              className="relative ml-4 border-l-2"
              style={{ borderColor: "var(--hw-border)" }}
            >
              {condition.diagnosisSteps.map((ds, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.1 }}
                  className="relative mb-8 ml-8 last:mb-0"
                >
                  {/* Numbered circle */}
                  <div
                    className="absolute -left-[2.5625rem] flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold text-white"
                    style={{ backgroundColor: "var(--hw-accent)" }}
                  >
                    {ds.step}
                  </div>

                  <div
                    className="rounded-xl border p-4"
                    style={{
                      backgroundColor: "var(--hw-surface)",
                      borderColor: "var(--hw-border)",
                    }}
                  >
                    <h4 className="mb-1 font-semibold">{ds.test}</h4>
                    <p
                      className="mb-2 text-sm leading-relaxed"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {ds.description}
                    </p>
                    <div
                      className="flex items-center gap-1.5 text-xs"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {ds.duration}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* =============== TREATMENT OPTIONS =============== */}
        <Section title="Treatment Options" delay={0.05}>
          {/* Tab bar */}
          <div
            className="mb-6 flex gap-1 rounded-xl border p-1"
            style={{
              backgroundColor: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
          >
            {TREATMENT_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200"
                style={{
                  backgroundColor:
                    activeTab === tab.key ? "var(--hw-accent)" : "transparent",
                  color:
                    activeTab === tab.key ? "#fff" : "var(--hw-text-secondary)",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Treatment cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {currentTreatments.length === 0 ? (
                <p
                  className="py-8 text-center text-sm"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  No {activeTab} treatments listed for this condition.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {currentTreatments.map((treatment, idx) => (
                    <div
                      key={`${activeTab}-${idx}`}
                      className="rounded-xl border p-4"
                      style={{
                        backgroundColor: "var(--hw-surface)",
                        borderColor: "var(--hw-border)",
                      }}
                    >
                      <h4 className="mb-1 font-semibold">{treatment.name}</h4>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--hw-text-secondary)" }}
                      >
                        {treatment.description}
                      </p>
                      {treatment.duration && (
                        <p
                          className="mt-2 flex items-center gap-1.5 text-xs"
                          style={{ color: "var(--hw-text-secondary)" }}
                        >
                          <Clock className="h-3.5 w-3.5" />
                          {treatment.duration}
                        </p>
                      )}
                      {treatment.sideEffects &&
                        treatment.sideEffects.length > 0 && (
                          <div className="mt-2">
                            <p
                              className="text-xs font-medium"
                              style={{ color: "#f87171" }}
                            >
                              Side effects:
                            </p>
                            <p
                              className="text-xs"
                              style={{ color: "var(--hw-text-secondary)" }}
                            >
                              {treatment.sideEffects.join(", ")}
                            </p>
                          </div>
                        )}
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Section>

        {/* ===================== PREVENTION ===================== */}
        {condition.preventionChecklist.length > 0 && (
          <Section title="Prevention" delay={0.05}>
            <div
              className="rounded-xl border p-5"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
            >
              <ul className="space-y-2">
                {condition.preventionChecklist.map((item, idx) => {
                  const checked = checkedItems.has(idx);
                  return (
                    <li
                      key={idx}
                      className="flex cursor-pointer items-start gap-3 rounded-lg p-2.5 transition-colors"
                      onClick={() => toggleChecked(idx)}
                      style={{
                        backgroundColor: checked
                          ? "var(--hw-surface-secondary)"
                          : "transparent",
                      }}
                    >
                      {checked ? (
                        <CheckSquare
                          className="mt-0.5 h-5 w-5 shrink-0"
                          style={{ color: "var(--hw-accent)" }}
                        />
                      ) : (
                        <Square
                          className="mt-0.5 h-5 w-5 shrink-0"
                          style={{ color: "var(--hw-text-secondary)" }}
                        />
                      )}
                      <div>
                        <p
                          className="font-medium"
                          style={{
                            textDecoration: checked ? "line-through" : "none",
                            opacity: checked ? 0.6 : 1,
                          }}
                        >
                          {item.item}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--hw-text-secondary)" }}
                        >
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Progress bar */}
              <div
                className="mt-4 h-2 overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--hw-surface-secondary)" }}
              >
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: "var(--hw-accent)",
                    width: `${(checkedItems.size / condition.preventionChecklist.length) * 100}%`,
                  }}
                />
              </div>
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {checkedItems.size} of {condition.preventionChecklist.length}{" "}
                completed
              </p>
            </div>
          </Section>
        )}

        {/* ============= QUESTIONS FOR DOCTOR ============= */}
        {condition.doctorQuestions.length > 0 && (
          <Section title="Questions for Your Doctor" delay={0.05}>
            <div className="space-y-3">
              {condition.doctorQuestions.map((dq, idx) => {
                const isOpen = expandedQuestions.has(idx);
                return (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-xl border transition-colors"
                    style={{
                      backgroundColor: "var(--hw-surface)",
                      borderColor: isOpen
                        ? "var(--hw-accent)"
                        : "var(--hw-border)",
                    }}
                  >
                    <button
                      onClick={() => toggleQuestion(idx)}
                      className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors"
                    >
                      <span
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                        style={{ backgroundColor: "var(--hw-accent)" }}
                      >
                        {idx + 1}
                      </span>
                      <span className="flex-1 font-medium">{dq.question}</span>
                      {isOpen ? (
                        <ChevronUp
                          className="h-5 w-5 shrink-0"
                          style={{ color: "var(--hw-text-secondary)" }}
                        />
                      ) : (
                        <ChevronDown
                          className="h-5 w-5 shrink-0"
                          style={{ color: "var(--hw-text-secondary)" }}
                        />
                      )}
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div
                            className="border-t px-5 py-4"
                            style={{ borderColor: "var(--hw-border)" }}
                          >
                            <p
                              className="text-xs font-semibold uppercase tracking-wider"
                              style={{ color: "var(--hw-accent)" }}
                            >
                              Why this matters
                            </p>
                            <p
                              className="mt-1 text-sm leading-relaxed"
                              style={{ color: "var(--hw-text-secondary)" }}
                            >
                              {dq.whyItMatters}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* ===================== SOURCES ===================== */}
        {condition.sourceVideos.length > 0 && (
          <Section delay={0.05}>
            <div
              className="overflow-hidden rounded-xl border"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
            >
              <button
                onClick={() => setSourcesOpen(!sourcesOpen)}
                className="flex w-full items-center justify-between px-5 py-4 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <BookOpen
                    className="h-5 w-5"
                    style={{ color: "var(--hw-accent)" }}
                  />
                  <span className="font-semibold">
                    Sources ({condition.sourceVideos.length})
                  </span>
                </div>
                {sourcesOpen ? (
                  <ChevronUp
                    className="h-5 w-5"
                    style={{ color: "var(--hw-text-secondary)" }}
                  />
                ) : (
                  <ChevronDown
                    className="h-5 w-5"
                    style={{ color: "var(--hw-text-secondary)" }}
                  />
                )}
              </button>
              <AnimatePresence>
                {sourcesOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div
                      className="border-t px-5 py-4"
                      style={{ borderColor: "var(--hw-border)" }}
                    >
                      <ul className="space-y-3">
                        {condition.sourceVideos.map((sv, idx) => (
                          <li
                            key={idx}
                            className="flex items-start justify-between gap-3"
                          >
                            <div>
                              <p className="font-medium">{sv.title}</p>
                              <p
                                className="text-sm"
                                style={{ color: "var(--hw-text-secondary)" }}
                              >
                                {sv.creator} &middot; {formatDate(sv.date)}
                              </p>
                            </div>
                            <a
                              href={sv.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="shrink-0 transition-colors"
                              style={{ color: "var(--hw-accent)" }}
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Section>
        )}
      </div>
    </div>
  );
}
