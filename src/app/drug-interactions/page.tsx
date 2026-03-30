"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Info,
  Trash2,
  ArrowRight,
  Pill,
} from "lucide-react";
import { drugs } from "@/data/drugs";
import type { Drug, DrugInteraction } from "@/types";

interface FoundInteraction {
  drugA: Drug;
  drugB: Drug;
  severity: DrugInteraction["severity"];
  description: string;
  action: string;
}

const severityOrder: Record<string, number> = {
  severe: 0,
  moderate: 1,
  minor: 2,
  none: 3,
};

const severityConfig = {
  severe: {
    color: "var(--hw-danger)",
    bg: "rgba(239,68,68,0.1)",
    border: "rgba(239,68,68,0.3)",
    label: "Severe",
    icon: ShieldX,
  },
  moderate: {
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.3)",
    label: "Moderate",
    icon: ShieldAlert,
  },
  minor: {
    color: "var(--hw-success)",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.3)",
    label: "Minor",
    icon: ShieldCheck,
  },
  none: {
    color: "var(--hw-text-muted)",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.3)",
    label: "None",
    icon: ShieldCheck,
  },
};

export default function DrugInteractionsPage() {
  const [selectedDrugs, setSelectedDrugs] = useState<Drug[]>([]);
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [interactions, setInteractions] = useState<FoundInteraction[] | null>(
    null
  );
  const [hasChecked, setHasChecked] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDrugs = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return drugs.filter(
      (d) =>
        !selectedDrugs.find((s) => s.id === d.id) &&
        (d.genericName.toLowerCase().includes(q) ||
          d.brandNames.some((b) => b.toLowerCase().includes(q)))
    );
  }, [query, selectedDrugs]);

  const addDrug = useCallback(
    (drug: Drug) => {
      if (!selectedDrugs.find((d) => d.id === drug.id)) {
        setSelectedDrugs((prev) => [...prev, drug]);
      }
      setQuery("");
      setShowDropdown(false);
      setHasChecked(false);
      setInteractions(null);
      inputRef.current?.focus();
    },
    [selectedDrugs]
  );

  const removeDrug = useCallback((drugId: string) => {
    setSelectedDrugs((prev) => prev.filter((d) => d.id !== drugId));
    setHasChecked(false);
    setInteractions(null);
  }, []);

  const clearAll = useCallback(() => {
    setSelectedDrugs([]);
    setQuery("");
    setHasChecked(false);
    setInteractions(null);
  }, []);

  const checkInteractions = useCallback(() => {
    const found: FoundInteraction[] = [];
    for (let i = 0; i < selectedDrugs.length; i++) {
      for (let j = i + 1; j < selectedDrugs.length; j++) {
        const drugA = selectedDrugs[i];
        const drugB = selectedDrugs[j];

        const interactionAB = drugA.interactions.find(
          (ix) => ix.drugId === drugB.id
        );
        const interactionBA = drugB.interactions.find(
          (ix) => ix.drugId === drugA.id
        );
        const interaction = interactionAB || interactionBA;

        if (interaction) {
          found.push({
            drugA,
            drugB,
            severity: interaction.severity,
            description: interaction.description,
            action: interaction.action,
          });
        }
      }
    }

    found.sort(
      (a, b) =>
        (severityOrder[a.severity] ?? 3) - (severityOrder[b.severity] ?? 3)
    );

    setInteractions(found);
    setHasChecked(true);
  }, [selectedDrugs]);

  const worstSeverity = useMemo(() => {
    if (!interactions || interactions.length === 0) return "none";
    return interactions[0].severity;
  }, [interactions]);

  const gaugeWidth = useMemo(() => {
    if (!hasChecked) return 0;
    if (!interactions || interactions.length === 0) return 100;
    switch (worstSeverity) {
      case "severe":
        return 100;
      case "moderate":
        return 60;
      case "minor":
        return 30;
      default:
        return 100;
    }
  }, [hasChecked, interactions, worstSeverity]);

  const gaugeColor = useMemo(() => {
    if (!interactions || interactions.length === 0) return "var(--hw-success)";
    switch (worstSeverity) {
      case "severe":
        return "var(--hw-danger)";
      case "moderate":
        return "#F59E0B";
      case "minor":
        return "var(--hw-success)";
      default:
        return "var(--hw-success)";
    }
  }, [interactions, worstSeverity]);

  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: "var(--hw-bg)" }}
    >
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <div
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "rgba(13,148,136,0.1)" }}
          >
            <Pill
              className="h-8 w-8"
              style={{ color: "var(--hw-accent)" }}
            />
          </div>
          <h1
            className="font-display text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Drug Interaction Checker
          </h1>
          <p
            className="mt-2 text-lg"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            Check if your medications interact
          </p>
        </motion.div>

        {/* Input Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl p-6 shadow-md"
          style={{
            backgroundColor: "var(--hw-surface)",
            border: "1px solid var(--hw-border)",
          }}
        >
          {/* Selected Drug Tags */}
          <div className="mb-4 flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {selectedDrugs.map((drug) => (
                <motion.span
                  key={drug.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium"
                  style={{
                    backgroundColor: "rgba(13,148,136,0.1)",
                    color: "var(--hw-accent)",
                    border: "1px solid rgba(13,148,136,0.2)",
                  }}
                >
                  <Pill className="h-3.5 w-3.5" />
                  {drug.genericName}
                  <button
                    onClick={() => removeDrug(drug.id)}
                    className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-black/10"
                    aria-label={`Remove ${drug.genericName}`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
              style={{ color: "var(--hw-text-muted)" }}
            />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
              placeholder="Type a drug name to add..."
              className="w-full rounded-xl py-3 pl-10 pr-4 text-base outline-none transition-all focus:ring-2"
              style={{
                backgroundColor: "var(--hw-surface-secondary)",
                color: "var(--hw-text-primary)",
                border: "1px solid var(--hw-border)",
                outlineColor: "var(--hw-accent)",
              }}
            />

            {/* Autocomplete Dropdown */}
            <AnimatePresence>
              {showDropdown && filteredDrugs.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-20 mt-2 max-h-60 overflow-y-auto rounded-xl shadow-lg"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    border: "1px solid var(--hw-border)",
                  }}
                >
                  {filteredDrugs.map((drug) => (
                    <button
                      key={drug.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        addDrug(drug);
                      }}
                      className="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors first:rounded-t-xl last:rounded-b-xl"
                      style={{
                        color: "var(--hw-text-primary)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          "var(--hw-surface-secondary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <Pill
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: "var(--hw-accent)" }}
                      />
                      <div>
                        <div className="font-medium">{drug.genericName}</div>
                        <div
                          className="text-sm"
                          style={{ color: "var(--hw-text-secondary)" }}
                        >
                          {drug.brandNames.join(", ")} &middot;{" "}
                          {drug.drugClass}
                        </div>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="mt-4 flex items-center justify-between">
            {selectedDrugs.length > 0 && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                <Trash2 className="h-4 w-4" />
                Clear all
              </button>
            )}
            <div className="ml-auto">
              <button
                onClick={checkInteractions}
                disabled={selectedDrugs.length < 2}
                className="flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
                style={{
                  backgroundColor:
                    selectedDrugs.length >= 2
                      ? "var(--hw-accent)"
                      : "var(--hw-text-muted)",
                }}
                onMouseEnter={(e) => {
                  if (selectedDrugs.length >= 2)
                    e.currentTarget.style.backgroundColor =
                      "var(--hw-accent-hover)";
                }}
                onMouseLeave={(e) => {
                  if (selectedDrugs.length >= 2)
                    e.currentTarget.style.backgroundColor =
                      "var(--hw-accent)";
                }}
              >
                <Search className="h-5 w-5" />
                Check Interactions
              </button>
            </div>
          </div>

          {selectedDrugs.length < 2 && selectedDrugs.length > 0 && (
            <p
              className="mt-3 flex items-center gap-1.5 text-sm"
              style={{ color: "var(--hw-text-muted)" }}
            >
              <Info className="h-4 w-4" />
              Add at least {2 - selectedDrugs.length} more drug
              {2 - selectedDrugs.length > 1 ? "s" : ""} to check interactions
            </p>
          )}
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasChecked && interactions !== null && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              {/* Safety Gauge */}
              <div
                className="rounded-2xl p-6 shadow-md"
                style={{
                  backgroundColor: "var(--hw-surface)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                <h2
                  className="font-display mb-4 text-lg font-semibold"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  Overall Safety Assessment
                </h2>
                <div
                  className="h-4 w-full overflow-hidden rounded-full"
                  style={{ backgroundColor: "var(--hw-surface-secondary)" }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${gaugeWidth}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: gaugeColor }}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span style={{ color: "var(--hw-text-secondary)" }}>
                    {interactions.length === 0
                      ? "No interactions detected"
                      : `${interactions.length} interaction${interactions.length > 1 ? "s" : ""} found`}
                  </span>
                  <span
                    className="font-semibold"
                    style={{
                      color:
                        interactions.length === 0
                          ? "var(--hw-success)"
                          : gaugeColor,
                    }}
                  >
                    {interactions.length === 0
                      ? "Safe"
                      : `Highest: ${severityConfig[worstSeverity].label}`}
                  </span>
                </div>
              </div>

              {/* No Interactions */}
              {interactions.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="rounded-2xl p-8 text-center"
                  style={{
                    backgroundColor: "rgba(34,197,94,0.08)",
                    border: "1px solid rgba(34,197,94,0.2)",
                  }}
                >
                  <ShieldCheck
                    className="mx-auto mb-3 h-12 w-12"
                    style={{ color: "var(--hw-success)" }}
                  />
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: "var(--hw-success)" }}
                  >
                    No Known Interactions Found
                  </h3>
                  <p
                    className="mt-2 text-sm"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    Based on our database, no interactions were detected between
                    your selected medications. Always consult your doctor or
                    pharmacist for complete safety information.
                  </p>
                </motion.div>
              )}

              {/* Interaction Cards */}
              {interactions.map((ix, index) => {
                const config = severityConfig[ix.severity];
                const Icon = config.icon;
                return (
                  <motion.div
                    key={`${ix.drugA.id}-${ix.drugB.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 * (index + 1) }}
                    className="overflow-hidden rounded-2xl shadow-md"
                    style={{
                      backgroundColor: "var(--hw-surface)",
                      border: `1px solid ${config.border}`,
                    }}
                  >
                    {/* Severity Bar */}
                    <div
                      className="h-1.5"
                      style={{ backgroundColor: config.color }}
                    />
                    <div className="p-6">
                      {/* Header */}
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                        <div className="flex items-center gap-2 text-lg font-semibold">
                          <span style={{ color: "var(--hw-text-primary)" }}>
                            {ix.drugA.genericName}
                          </span>
                          <ArrowRight
                            className="h-4 w-4 shrink-0"
                            style={{ color: "var(--hw-text-muted)" }}
                          />
                          <span
                            className="h-4 w-4 shrink-0 rotate-180"
                            aria-hidden
                          />
                          <span style={{ color: "var(--hw-text-primary)" }}>
                            {ix.drugB.genericName}
                          </span>
                        </div>
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold"
                          style={{
                            backgroundColor: config.bg,
                            color: config.color,
                            border: `1px solid ${config.border}`,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                          {config.label}
                        </span>
                      </div>

                      {/* Description */}
                      <p
                        className="mb-4 leading-relaxed"
                        style={{ color: "var(--hw-text-secondary)" }}
                      >
                        {ix.description}
                      </p>

                      {/* What to do */}
                      <div
                        className="rounded-xl p-4"
                        style={{
                          backgroundColor: config.bg,
                          border: `1px solid ${config.border}`,
                        }}
                      >
                        <div
                          className="mb-1.5 flex items-center gap-2 text-sm font-semibold"
                          style={{ color: config.color }}
                        >
                          <AlertTriangle className="h-4 w-4" />
                          What to do
                        </div>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: "var(--hw-text-primary)" }}
                        >
                          {ix.action}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Disclaimer */}
              <div
                className="rounded-xl p-4 text-center text-sm"
                style={{
                  backgroundColor: "var(--hw-surface-secondary)",
                  color: "var(--hw-text-muted)",
                }}
              >
                <Info className="mx-auto mb-2 h-5 w-5" />
                This tool is for informational purposes only and does not
                replace professional medical advice. Always consult your doctor
                or pharmacist before making changes to your medications.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
