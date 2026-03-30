"use client";

import { Suspense, useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  X,
  Pill,
  Stethoscope,
  ArrowRight,
  SearchX,
} from "lucide-react";
import Fuse from "fuse.js";
import { conditions } from "@/data/conditions";
import { drugs } from "@/data/drugs";

type TabFilter = "all" | "conditions" | "drugs";

interface SearchResultItem {
  type: "condition" | "drug";
  id: string;
  title: string;
  description: string;
  href: string;
  category?: string;
}

const allItems: SearchResultItem[] = [
  ...conditions.map((c) => ({
    type: "condition" as const,
    id: c.id,
    title: c.name,
    description: c.overview,
    href: `/health-a-z/${c.slug}`,
    category: c.category,
  })),
  ...drugs.map((d) => ({
    type: "drug" as const,
    id: d.id,
    title: d.genericName,
    description: `${d.drugClass}. Used for: ${d.commonUses.join(", ")}. Brands: ${d.brandNames.join(", ")}.`,
    href: `/drugs/${d.id}`,
    category: d.drugClass,
  })),
];

const fuse = new Fuse(allItems, {
  keys: [
    { name: "title", weight: 0.4 },
    { name: "description", weight: 0.3 },
    { name: "category", weight: 0.2 },
    { name: "id", weight: 0.1 },
  ],
  threshold: 0.4,
  includeScore: true,
});

const TAB_FILTERS: { key: TabFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "conditions", label: "Conditions" },
  { key: "drugs", label: "Drugs" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [activeTab, setActiveTab] = useState<TabFilter>("all");

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const fuseResults = fuse.search(query);
    const items = fuseResults.map((r) => r.item);

    if (activeTab === "conditions") {
      return items.filter((item) => item.type === "condition");
    }
    if (activeTab === "drugs") {
      return items.filter((item) => item.type === "drug");
    }
    return items;
  }, [query, activeTab]);

  const conditionCount = useMemo(() => {
    if (!query.trim()) return 0;
    return fuse.search(query).filter((r) => r.item.type === "condition").length;
  }, [query]);

  const drugCount = useMemo(() => {
    if (!query.trim()) return 0;
    return fuse.search(query).filter((r) => r.item.type === "drug").length;
  }, [query]);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      const params = new URLSearchParams();
      if (value.trim()) {
        params.set("q", value);
      }
      router.replace(`/search?${params.toString()}`, { scroll: false });
    },
    [router]
  );

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--hw-bg)", color: "var(--hw-text-primary)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            Search
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Find conditions, drugs, and health information
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div
            className="relative flex items-center rounded-xl px-4 py-3 border"
            style={{
              backgroundColor: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: "var(--hw-text-secondary)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search conditions, drugs, symptoms..."
              className="w-full ml-3 bg-transparent outline-none placeholder:opacity-50"
              style={{ color: "var(--hw-text-primary)" }}
              autoFocus
            />
            {query && (
              <button
                onClick={() => handleSearch("")}
                className="ml-2 p-1 rounded-full hover:opacity-80 transition-opacity"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Tab Filters */}
        {query.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {TAB_FILTERS.map((tab) => {
              let count = results.length;
              if (tab.key === "conditions") count = conditionCount;
              if (tab.key === "drugs") count = drugCount;
              if (tab.key === "all") count = conditionCount + drugCount;

              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
                  style={{
                    backgroundColor:
                      activeTab === tab.key ? "var(--hw-accent)" : "var(--hw-surface)",
                    color: activeTab === tab.key ? "#fff" : "var(--hw-text-secondary)",
                    borderWidth: "1px",
                    borderColor:
                      activeTab === tab.key ? "var(--hw-accent)" : "var(--hw-border)",
                  }}
                >
                  {tab.label} ({count})
                </button>
              );
            })}
          </motion.div>
        )}

        {/* Results */}
        {!query.trim() ? (
          <div className="text-center py-20">
            <Search
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "var(--hw-text-secondary)", opacity: 0.3 }}
            />
            <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
              Start typing to search across conditions and drugs
            </p>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-20">
            <SearchX
              className="w-16 h-16 mx-auto mb-4"
              style={{ color: "var(--hw-text-secondary)", opacity: 0.3 }}
            />
            <p className="text-lg mb-2" style={{ color: "var(--hw-text-secondary)" }}>
              No results found for &quot;{query}&quot;
            </p>
            <p className="text-sm" style={{ color: "var(--hw-text-secondary)", opacity: 0.7 }}>
              Try different keywords or check the spelling
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm mb-4" style={{ color: "var(--hw-text-secondary)" }}>
              {results.length} result{results.length !== 1 ? "s" : ""} for &quot;{query}&quot;
            </p>
            {results.map((result, idx) => (
              <motion.div
                key={`${result.type}-${result.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.04 }}
              >
                <Link
                  href={result.href}
                  className="group block rounded-xl p-5 border transition-all duration-200 hover:shadow-lg"
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
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor:
                          result.type === "condition"
                            ? "rgba(59, 130, 246, 0.1)"
                            : "rgba(16, 185, 129, 0.1)",
                        color:
                          result.type === "condition" ? "#3b82f6" : "#10b981",
                      }}
                    >
                      {result.type === "condition" ? (
                        <Stethoscope className="w-5 h-5" />
                      ) : (
                        <Pill className="w-5 h-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className="px-2 py-0.5 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor:
                              result.type === "condition"
                                ? "rgba(59, 130, 246, 0.15)"
                                : "rgba(16, 185, 129, 0.15)",
                            color:
                              result.type === "condition" ? "#60a5fa" : "#34d399",
                          }}
                        >
                          {result.type === "condition" ? "Condition" : "Drug"}
                        </span>
                        {result.category && (
                          <span
                            className="text-xs"
                            style={{ color: "var(--hw-text-secondary)" }}
                          >
                            {result.category
                              .split("_")
                              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                              .join(" ")}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold group-hover:underline">
                        {result.title}
                      </h3>
                      <p
                        className="text-sm mt-1 line-clamp-2 leading-relaxed"
                        style={{ color: "var(--hw-text-secondary)" }}
                      >
                        {result.description}
                      </p>
                    </div>
                    <ArrowRight
                      className="w-5 h-5 shrink-0 mt-2 transition-transform group-hover:translate-x-1"
                      style={{ color: "var(--hw-accent)" }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: "var(--hw-bg)", color: "var(--hw-text-secondary)" }}
        >
          <p className="text-lg">Loading search...</p>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
