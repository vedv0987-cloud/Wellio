"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Brain,
  Eye,
  Ear,
  CircleDot,
  HeartPulse,
  Circle,
  Grab,
  ArrowUpDown,
  Footprints,
  Scan,
  ChevronRight,
  ChevronLeft,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ShieldAlert,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { DNAIllustration, ShieldIllustration } from "@/components/ui/MedicalIllustrations";
import {
  type BodyRegion,
  type SelectedSymptom,
  type ConditionResult,
  symptomsByRegion,
  regionLabels,
  durationOptions,
  existingConditions,
  matchConditions,
  hasEmergencyCondition,
} from "@/lib/symptom-data";

// ---------------------------------------------------------------------------
// Body region icon map
// ---------------------------------------------------------------------------

const regionIcons: Record<BodyRegion, React.ReactNode> = {
  head: <Brain size={24} />,
  eyes: <Eye size={24} />,
  ears: <Ear size={24} />,
  throat: <CircleDot size={24} />,
  chest: <HeartPulse size={24} />,
  abdomen: <Circle size={24} />,
  arms: <Grab size={24} />,
  back: <ArrowUpDown size={24} />,
  legs: <Footprints size={24} />,
  skin: <Scan size={24} />,
};

const allRegions: BodyRegion[] = [
  "head",
  "eyes",
  "ears",
  "throat",
  "chest",
  "abdomen",
  "arms",
  "back",
  "legs",
  "skin",
];

// ---------------------------------------------------------------------------
// Severity color helpers
// ---------------------------------------------------------------------------

function severityColor(severity: "low" | "moderate" | "high" | "emergency") {
  switch (severity) {
    case "low":
      return "var(--hw-success)";
    case "moderate":
      return "var(--hw-accent-secondary, #F59E0B)";
    case "high":
      return "var(--hw-danger)";
    case "emergency":
      return "var(--hw-danger)";
  }
}

function severityLabel(severity: "low" | "moderate" | "high" | "emergency") {
  switch (severity) {
    case "low":
      return "Low";
    case "moderate":
      return "Moderate";
    case "high":
      return "High";
    case "emergency":
      return "Emergency";
  }
}

// ---------------------------------------------------------------------------
// Progress Bar
// ---------------------------------------------------------------------------

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="mb-8">
      <div className="mb-2 flex items-center justify-between text-sm">
        <span
          className="font-[family-name:var(--font-display)] font-medium"
          style={{ color: "var(--hw-text-secondary)" }}
        >
          Step {step} of 4
        </span>
        <span
          className="font-medium"
          style={{ color: "var(--hw-accent)" }}
        >
          {Math.round((step / 4) * 100)}%
        </span>
      </div>
      <div
        className="h-2 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: "var(--hw-surface-secondary)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: "var(--hw-accent)" }}
          initial={{ width: "0%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Step animations
// ---------------------------------------------------------------------------

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function SymptomCheckerPage() {
  const [step, setStep] = useState(1);
  const [sex, setSex] = useState<"male" | "female">("male");
  const [selectedRegion, setSelectedRegion] = useState<BodyRegion | null>(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SelectedSymptom[]>(
    []
  );
  const [age, setAge] = useState<string>("");
  const [existingConds, setExistingConds] = useState<string[]>([]);
  const [medications, setMedications] = useState("");
  const [results, setResults] = useState<ConditionResult[]>([]);

  // --------------- Handlers ---------------

  const handleRegionSelect = (region: BodyRegion) => {
    setSelectedRegion(region);
    setSelectedSymptoms([]);
    setStep(2);
  };

  const toggleSymptom = (symptomId: string, symptomLabel: string) => {
    setSelectedSymptoms((prev) => {
      const exists = prev.find((s) => s.id === symptomId);
      if (exists) {
        return prev.filter((s) => s.id !== symptomId);
      }
      return [
        ...prev,
        { id: symptomId, label: symptomLabel, severity: "mild", duration: "1-3 days" },
      ];
    });
  };

  const updateSymptomSeverity = (
    symptomId: string,
    severity: "mild" | "moderate" | "severe"
  ) => {
    setSelectedSymptoms((prev) =>
      prev.map((s) => (s.id === symptomId ? { ...s, severity } : s))
    );
  };

  const updateSymptomDuration = (symptomId: string, duration: string) => {
    setSelectedSymptoms((prev) =>
      prev.map((s) => (s.id === symptomId ? { ...s, duration } : s))
    );
  };

  const toggleExistingCondition = (condition: string) => {
    if (condition === "None") {
      setExistingConds(["None"]);
      return;
    }
    setExistingConds((prev) => {
      const without = prev.filter((c) => c !== "None");
      if (without.includes(condition)) {
        return without.filter((c) => c !== condition);
      }
      return [...without, condition];
    });
  };

  const handleGetResults = () => {
    const matched = matchConditions(
      selectedSymptoms,
      age ? parseInt(age) : undefined,
      sex,
      existingConds
    );
    setResults(matched);
    setStep(4);
  };

  const handleStartOver = () => {
    setStep(1);
    setSelectedRegion(null);
    setSelectedSymptoms([]);
    setAge("");
    setExistingConds([]);
    setMedications("");
    setResults([]);
  };

  // --------------- Render ---------------

  return (
    <div
      className="min-h-[calc(100vh-4rem)] py-8 sm:py-12"
      style={{ backgroundColor: "var(--hw-bg)" }}
    >
      <div className="mx-auto max-w-3xl px-4">
        {/* Page header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: "color-mix(in srgb, var(--hw-accent) 12%, transparent)", color: "var(--hw-accent)" }}>
            <Activity size={24} />
          </div>
          <h1
            className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Symptom Checker
          </h1>
          <p
            className="mt-1 text-sm"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            Answer a few questions to explore possible conditions
          </p>
        </div>

        <ProgressBar step={step} />

        <AnimatePresence mode="wait">
          {/* ============================================================= */}
          {/* STEP 1 — Body Map                                             */}
          {/* ============================================================= */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Subtle DNA background decoration */}
              <div className="pointer-events-none absolute -right-8 -top-4 opacity-[0.07]">
                <DNAIllustration size={180} />
              </div>

              {/* Sex toggle */}
              <div className="mb-6 flex items-center justify-center gap-2">
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  Biological sex:
                </span>
                <div
                  className="flex overflow-hidden rounded-lg border"
                  style={{ borderColor: "var(--hw-border)" }}
                >
                  {(["male", "female"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSex(s)}
                      className="px-4 py-2 text-sm font-medium capitalize transition-colors"
                      style={{
                        backgroundColor:
                          sex === s ? "var(--hw-accent)" : "var(--hw-surface)",
                        color: sex === s ? "white" : "var(--hw-text-secondary)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <h2
                className="mb-4 text-center font-[family-name:var(--font-display)] text-lg font-semibold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                Select the affected area
              </h2>

              {/* Body region grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
                {allRegions.map((region) => (
                  <motion.button
                    key={region}
                    onClick={() => handleRegionSelect(region)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex flex-col items-center gap-2 rounded-xl border p-4 transition-all"
                    style={{
                      borderColor:
                        selectedRegion === region
                          ? "var(--hw-accent)"
                          : "var(--hw-border)",
                      backgroundColor:
                        selectedRegion === region
                          ? "color-mix(in srgb, var(--hw-accent) 8%, transparent)"
                          : "var(--hw-surface)",
                      color:
                        selectedRegion === region
                          ? "var(--hw-accent)"
                          : "var(--hw-text-secondary)",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedRegion !== region) {
                        e.currentTarget.style.borderColor = "var(--hw-accent)";
                        e.currentTarget.style.color = "var(--hw-accent)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedRegion !== region) {
                        e.currentTarget.style.borderColor = "var(--hw-border)";
                        e.currentTarget.style.color = "var(--hw-text-secondary)";
                      }
                    }}
                  >
                    {regionIcons[region]}
                    <span className="text-sm font-medium">
                      {regionLabels[region]}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STEP 2 — Symptom Selection                                    */}
          {/* ============================================================= */}
          {step === 2 && selectedRegion && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep(1)}
                className="mb-4 flex items-center gap-1 text-sm font-medium transition-colors"
                style={{ color: "var(--hw-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--hw-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--hw-text-secondary)")
                }
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <div className="mb-4 flex items-center gap-2">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--hw-accent) 12%, transparent)",
                    color: "var(--hw-accent)",
                  }}
                >
                  {regionIcons[selectedRegion]}
                </span>
                <h2
                  className="font-[family-name:var(--font-display)] text-lg font-semibold"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  Select your symptoms &mdash;{" "}
                  <span style={{ color: "var(--hw-accent)" }}>
                    {regionLabels[selectedRegion]}
                  </span>
                </h2>
              </div>

              <div className="space-y-3">
                {symptomsByRegion[selectedRegion].map((symptom) => {
                  const isSelected = selectedSymptoms.some(
                    (s) => s.id === symptom.id
                  );
                  const selected = selectedSymptoms.find(
                    (s) => s.id === symptom.id
                  );

                  return (
                    <div
                      key={symptom.id}
                      className="overflow-hidden rounded-xl border transition-all"
                      style={{
                        borderColor: isSelected
                          ? "var(--hw-accent)"
                          : "var(--hw-border)",
                        backgroundColor: isSelected
                          ? "color-mix(in srgb, var(--hw-accent) 4%, var(--hw-surface))"
                          : "var(--hw-surface)",
                      }}
                    >
                      {/* Checkbox row */}
                      <label className="flex cursor-pointer items-center gap-3 px-4 py-3">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() =>
                            toggleSymptom(symptom.id, symptom.label)
                          }
                          className="h-4 w-4 rounded accent-[var(--hw-accent)]"
                        />
                        <span
                          className="text-sm font-medium"
                          style={{
                            color: isSelected
                              ? "var(--hw-text-primary)"
                              : "var(--hw-text-secondary)",
                          }}
                        >
                          {symptom.label}
                        </span>
                      </label>

                      {/* Severity & duration (expanded) */}
                      <AnimatePresence>
                        {isSelected && selected && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="border-t px-4 py-3"
                              style={{ borderColor: "var(--hw-border)" }}
                            >
                              {/* Severity */}
                              <div className="mb-3">
                                <p
                                  className="mb-1.5 text-xs font-medium uppercase tracking-wider"
                                  style={{ color: "var(--hw-text-muted)" }}
                                >
                                  Severity
                                </p>
                                <div className="flex gap-2">
                                  {(
                                    ["mild", "moderate", "severe"] as const
                                  ).map((sev) => (
                                    <button
                                      key={sev}
                                      onClick={() =>
                                        updateSymptomSeverity(symptom.id, sev)
                                      }
                                      className="rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-all"
                                      style={{
                                        backgroundColor:
                                          selected.severity === sev
                                            ? sev === "mild"
                                              ? "var(--hw-success)"
                                              : sev === "moderate"
                                                ? "var(--hw-accent-secondary, #F59E0B)"
                                                : "var(--hw-danger)"
                                            : "var(--hw-surface-secondary)",
                                        color:
                                          selected.severity === sev
                                            ? "white"
                                            : "var(--hw-text-secondary)",
                                      }}
                                    >
                                      {sev}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {/* Duration */}
                              <div>
                                <p
                                  className="mb-1.5 text-xs font-medium uppercase tracking-wider"
                                  style={{ color: "var(--hw-text-muted)" }}
                                >
                                  Duration
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  {durationOptions.map((dur) => (
                                    <button
                                      key={dur}
                                      onClick={() =>
                                        updateSymptomDuration(symptom.id, dur)
                                      }
                                      className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all"
                                      style={{
                                        backgroundColor:
                                          selected.duration === dur
                                            ? "var(--hw-accent)"
                                            : "var(--hw-surface-secondary)",
                                        color:
                                          selected.duration === dur
                                            ? "white"
                                            : "var(--hw-text-secondary)",
                                      }}
                                    >
                                      {dur}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Next button */}
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setStep(3)}
                  disabled={selectedSymptoms.length === 0}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-40"
                  style={{
                    backgroundColor: "var(--hw-accent)",
                    color: "white",
                  }}
                  onMouseEnter={(e) => {
                    if (!e.currentTarget.disabled)
                      e.currentTarget.style.backgroundColor =
                        "var(--hw-accent-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--hw-accent)";
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STEP 3 — Additional Info                                      */}
          {/* ============================================================= */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setStep(2)}
                className="mb-4 flex items-center gap-1 text-sm font-medium transition-colors"
                style={{ color: "var(--hw-text-secondary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--hw-accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--hw-text-secondary)")
                }
              >
                <ChevronLeft size={16} />
                Back
              </button>

              <h2
                className="mb-6 font-[family-name:var(--font-display)] text-lg font-semibold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                Additional Information
              </h2>

              <div className="space-y-6">
                {/* Age */}
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={120}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter your age"
                    className="w-full max-w-[200px] rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--hw-accent)]"
                    style={{
                      borderColor: "var(--hw-border)",
                      backgroundColor: "var(--hw-surface)",
                      color: "var(--hw-text-primary)",
                    }}
                  />
                </div>

                {/* Sex display */}
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    Biological Sex
                  </label>
                  <div
                    className="w-fit rounded-xl border px-4 py-2.5 text-sm font-medium capitalize"
                    style={{
                      borderColor: "var(--hw-border)",
                      backgroundColor: "var(--hw-surface-secondary)",
                      color: "var(--hw-text-primary)",
                    }}
                  >
                    {sex}
                  </div>
                </div>

                {/* Existing conditions */}
                <div>
                  <label
                    className="mb-2 block text-sm font-medium"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    Existing Conditions
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {existingConditions.map((condition) => {
                      const isChecked = existingConds.includes(condition);
                      return (
                        <label
                          key={condition}
                          className="flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all"
                          style={{
                            borderColor: isChecked
                              ? "var(--hw-accent)"
                              : "var(--hw-border)",
                            backgroundColor: isChecked
                              ? "color-mix(in srgb, var(--hw-accent) 8%, transparent)"
                              : "var(--hw-surface)",
                            color: isChecked
                              ? "var(--hw-accent)"
                              : "var(--hw-text-secondary)",
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleExistingCondition(condition)}
                            className="h-3.5 w-3.5 rounded accent-[var(--hw-accent)]"
                          />
                          {condition}
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Medications */}
                <div>
                  <label
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    Current Medications{" "}
                    <span style={{ color: "var(--hw-text-muted)" }}>
                      (optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    placeholder="e.g., Aspirin, Metformin"
                    className="w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors focus:border-[var(--hw-accent)]"
                    style={{
                      borderColor: "var(--hw-border)",
                      backgroundColor: "var(--hw-surface)",
                      color: "var(--hw-text-primary)",
                    }}
                  />
                </div>
              </div>

              {/* Get Results */}
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleGetResults}
                  className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-all"
                  style={{
                    backgroundColor: "var(--hw-accent)",
                    color: "white",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "var(--hw-accent-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--hw-accent)")
                  }
                >
                  Get Results
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ============================================================= */}
          {/* STEP 4 — Results                                              */}
          {/* ============================================================= */}
          {step === 4 && (
            <motion.div
              key="step4"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Emergency banner */}
              {hasEmergencyCondition(results) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 flex items-start gap-3 rounded-xl border-2 px-4 py-4"
                  style={{
                    borderColor: "var(--hw-danger)",
                    backgroundColor:
                      "color-mix(in srgb, var(--hw-danger) 6%, var(--hw-surface))",
                  }}
                >
                  <ShieldAlert
                    size={24}
                    className="mt-0.5 flex-shrink-0"
                    style={{ color: "var(--hw-danger)" }}
                  />
                  <div>
                    <p
                      className="font-[family-name:var(--font-display)] text-sm font-bold"
                      style={{ color: "var(--hw-danger)" }}
                    >
                      Seek Immediate Medical Attention
                    </p>
                    <p
                      className="mt-1 text-sm"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      Based on your symptoms, one or more results suggest a
                      condition that may require urgent care. If you are
                      experiencing severe symptoms, please call emergency
                      services or visit the nearest emergency room immediately.
                    </p>
                  </div>
                </motion.div>
              )}

              <h2
                className="mb-1 font-[family-name:var(--font-display)] text-lg font-semibold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                Possible Conditions
              </h2>
              <p
                className="mb-6 text-sm"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                Based on your reported symptoms in the{" "}
                <span className="font-medium" style={{ color: "var(--hw-accent)" }}>
                  {selectedRegion ? regionLabels[selectedRegion] : ""}
                </span>{" "}
                area
              </p>

              {results.length === 0 ? (
                <div
                  className="rounded-xl border p-8 text-center"
                  style={{
                    borderColor: "var(--hw-border)",
                    backgroundColor: "var(--hw-surface)",
                  }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    No matching conditions found. Please try selecting different
                    symptoms.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="overflow-hidden rounded-xl border"
                      style={{
                        borderColor: "var(--hw-border)",
                        backgroundColor: "var(--hw-surface)",
                      }}
                    >
                      <div className="p-4 sm:p-5">
                        <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                          <div className="flex items-center gap-3">
                            <span
                              className="font-[family-name:var(--font-display)] text-base font-semibold"
                              style={{ color: "var(--hw-text-primary)" }}
                            >
                              {result.name}
                            </span>
                            <span
                              className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
                              style={{
                                backgroundColor: `color-mix(in srgb, ${severityColor(result.severity)} 15%, transparent)`,
                                color: severityColor(result.severity),
                              }}
                            >
                              {severityLabel(result.severity)}
                            </span>
                          </div>
                          <span
                            className="font-[family-name:var(--font-display)] text-lg font-bold"
                            style={{ color: "var(--hw-accent)" }}
                          >
                            {result.matchPercent}%
                          </span>
                        </div>

                        {/* Match bar */}
                        <div
                          className="mb-3 h-2 w-full overflow-hidden rounded-full"
                          style={{
                            backgroundColor: "var(--hw-surface-secondary)",
                          }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: severityColor(result.severity),
                            }}
                            initial={{ width: 0 }}
                            animate={{
                              width: `${result.matchPercent}%`,
                            }}
                            transition={{
                              duration: 0.6,
                              delay: index * 0.1 + 0.2,
                              ease: "easeOut",
                            }}
                          />
                        </div>

                        <p
                          className="mb-3 text-sm leading-relaxed"
                          style={{ color: "var(--hw-text-secondary)" }}
                        >
                          {result.description}
                        </p>

                        <Link
                          href={`/health-a-z/${result.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
                          style={{ color: "var(--hw-accent)" }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.color =
                              "var(--hw-accent-hover)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.color = "var(--hw-accent)")
                          }
                        >
                          Learn More
                          <ExternalLink size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {/* Disclaimer */}
              <div
                className="mt-6 flex items-start gap-3 rounded-xl border px-4 py-3 relative overflow-hidden"
                style={{
                  borderColor: "var(--hw-border)",
                  backgroundColor: "var(--hw-surface-secondary)",
                }}
              >
                <div className="pointer-events-none absolute -right-2 -top-2 opacity-[0.08]">
                  <ShieldIllustration size={80} />
                </div>
                <AlertTriangle
                  size={16}
                  className="mt-0.5 flex-shrink-0"
                  style={{ color: "var(--hw-accent-secondary, #F59E0B)" }}
                />
                <p
                  className="text-xs leading-relaxed relative z-[1]"
                  style={{ color: "var(--hw-text-muted)" }}
                >
                  This is not a diagnosis. The results are based on common
                  symptom patterns and should not replace professional medical
                  evaluation. Please consult a healthcare professional for proper
                  diagnosis and treatment.
                </p>
              </div>

              {/* Start Over */}
              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleStartOver}
                  className="flex items-center gap-2 rounded-xl border px-6 py-3 text-sm font-medium transition-all"
                  style={{
                    borderColor: "var(--hw-border)",
                    backgroundColor: "var(--hw-surface)",
                    color: "var(--hw-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--hw-accent)";
                    e.currentTarget.style.color = "var(--hw-accent)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--hw-border)";
                    e.currentTarget.style.color = "var(--hw-text-secondary)";
                  }}
                >
                  <RotateCcw size={16} />
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
