"use client";

import { useState, useMemo, useRef } from "react";
import Link from "next/link";
import { Search, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { conditions } from "@/data/conditions";
import type { ConditionCategory } from "@/types";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

type FilterKey = "all" | "common" | "chronic" | "mental_health" | "womens_health";

const FILTER_CHIPS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "common", label: "Common" },
  { key: "chronic", label: "Chronic" },
  { key: "mental_health", label: "Mental Health" },
  { key: "womens_health", label: "Women's Health" },
];

const COMMON_CATEGORIES: ConditionCategory[] = [
  "cardiovascular",
  "respiratory",
  "digestive",
  "neurological",
  "endocrine",
];

const CHRONIC_CATEGORIES: ConditionCategory[] = [
  "cardiovascular",
  "endocrine",
  "respiratory",
  "musculoskeletal",
];

const WOMENS_HEALTH_CATEGORIES: ConditionCategory[] = ["reproductive"];

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

const SEVERITY_COLORS: Record<string, string> = {
  mild: "bg-green-400",
  moderate: "bg-yellow-400",
  severe: "bg-red-400",
  critical: "bg-red-600",
};

function formatCategory(cat: string): string {
  return cat
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default function HealthAZPage() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    let list = [...conditions];

    if (activeFilter === "common") {
      list = list.filter((c) => COMMON_CATEGORIES.includes(c.category));
    } else if (activeFilter === "chronic") {
      list = list.filter((c) => CHRONIC_CATEGORIES.includes(c.category));
    } else if (activeFilter === "mental_health") {
      list = list.filter((c) => c.category === "mental_health");
    } else if (activeFilter === "womens_health") {
      list = list.filter((c) => WOMENS_HEALTH_CATEGORIES.includes(c.category));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.overview.toLowerCase().includes(q)
      );
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [search, activeFilter]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof filtered> = {};
    for (const c of filtered) {
      const letter = c.name.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(c);
    }
    return map;
  }, [filtered]);

  const activeLetters = useMemo(() => new Set(Object.keys(grouped)), [grouped]);

  const scrollToLetter = (letter: string) => {
    const el = sectionRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--hw-bg)", color: "var(--hw-text-primary)" }}
    >
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="mb-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Health A-Z Encyclopedia
          </h1>
          <p
            className="mx-auto max-w-xl text-lg"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            200+ conditions explained with expert videos
          </p>
        </motion.div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mx-auto mb-6 max-w-2xl"
        >
          <div
            className="flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors focus-within:border-[var(--hw-accent)]"
            style={{
              backgroundColor: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
          >
            <Search
              className="h-5 w-5 shrink-0"
              style={{ color: "var(--hw-text-secondary)" }}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conditions, symptoms, categories..."
              className="w-full bg-transparent outline-none placeholder:opacity-50"
              style={{ color: "var(--hw-text-primary)" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="rounded-full p-1 transition-opacity hover:opacity-80"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Filter chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {FILTER_CHIPS.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setActiveFilter(chip.key)}
              className="rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor:
                  activeFilter === chip.key ? "var(--hw-accent)" : "var(--hw-surface)",
                color:
                  activeFilter === chip.key ? "#fff" : "var(--hw-text-secondary)",
                borderColor:
                  activeFilter === chip.key ? "var(--hw-accent)" : "var(--hw-border)",
              }}
            >
              {chip.label}
            </button>
          ))}
        </motion.div>

        {/* Sticky alphabet bar */}
        <div
          className="sticky top-0 z-20 mb-8 rounded-xl border py-3 backdrop-blur-md"
          style={{
            backgroundColor: "color-mix(in srgb, var(--hw-surface) 85%, transparent)",
            borderColor: "var(--hw-border)",
          }}
        >
          <div className="flex flex-wrap items-center justify-center gap-1 px-2">
            {ALPHABET.map((letter) => {
              const isActive = activeLetters.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => isActive && scrollToLetter(letter)}
                  disabled={!isActive}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-semibold transition-all duration-150"
                  style={{
                    color: isActive ? "var(--hw-accent)" : "var(--hw-text-secondary)",
                    opacity: isActive ? 1 : 0.3,
                    cursor: isActive ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      e.currentTarget.style.backgroundColor = "var(--hw-surface-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Condition groups */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
              No conditions found matching your search.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            <AnimatePresence mode="popLayout">
              {ALPHABET.filter((l) => grouped[l]).map((letter) => (
                <motion.div
                  key={letter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  ref={(el) => {
                    sectionRefs.current[letter] = el;
                  }}
                  className="scroll-mt-20"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold"
                      style={{
                        backgroundColor: "var(--hw-accent)",
                        color: "#fff",
                      }}
                    >
                      {letter}
                    </span>
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: "var(--hw-border)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {grouped[letter].length} condition
                      {grouped[letter].length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {grouped[letter].map((condition, idx) => {
                      const catColor = CATEGORY_COLORS[condition.category] ?? {
                        bg: "bg-gray-500/15",
                        text: "text-gray-400",
                      };
                      return (
                        <motion.div
                          key={condition.id}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.35,
                            delay: idx * 0.06,
                          }}
                        >
                          <Link
                            href={`/health-a-z/${condition.slug}`}
                            className="group flex h-full flex-col rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                            style={{
                              backgroundColor: "var(--hw-surface)",
                              borderColor: "var(--hw-border)",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.borderColor = "var(--hw-accent)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.borderColor = "var(--hw-border)";
                            }}
                          >
                            <div className="mb-3 flex items-start justify-between gap-2">
                              <h3 className="text-lg font-semibold leading-tight">
                                {condition.name}
                              </h3>
                              <ArrowRight
                                className="mt-0.5 h-5 w-5 shrink-0 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                style={{ color: "var(--hw-accent)" }}
                              />
                            </div>

                            <div className="mb-3 flex items-center gap-2">
                              <span
                                className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${catColor.bg} ${catColor.text}`}
                              >
                                {formatCategory(condition.category)}
                              </span>
                              <span
                                className="flex items-center gap-1.5 text-xs"
                                style={{ color: "var(--hw-text-secondary)" }}
                              >
                                <span
                                  className={`inline-block h-2 w-2 rounded-full ${SEVERITY_COLORS[condition.severity]}`}
                                />
                                {condition.severity.charAt(0).toUpperCase() +
                                  condition.severity.slice(1)}
                              </span>
                            </div>

                            <p
                              className="line-clamp-1 text-sm leading-relaxed"
                              style={{ color: "var(--hw-text-secondary)" }}
                            >
                              {condition.overview}
                            </p>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
