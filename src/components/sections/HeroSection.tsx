"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Search } from "lucide-react";

export function HeroSection() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, rgba(13,148,136,0.08) 0%, transparent 100%)",
      }}
    >
      {/* Decorative blurred circles */}
      <div
        className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[480px] w-[480px] rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--hw-accent)" }}
      />

      <div className="relative mx-auto max-w-7xl px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Your health questions,
          <br />
          <span style={{ color: "var(--hw-accent)" }}>answered by science.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg font-[family-name:var(--font-body)] md:text-xl"
          style={{ color: "var(--hw-text-secondary)" }}
        >
          AI-powered health insights from 500+ expert YouTube videos.
        </motion.p>

        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div
            className="flex items-center gap-3 rounded-2xl px-5 py-4 shadow-lg transition-shadow duration-200 focus-within:shadow-xl"
            style={{
              backgroundColor: "var(--hw-surface)",
              border: "1px solid var(--hw-border)",
            }}
          >
            <Search
              size={22}
              className="shrink-0"
              style={{ color: "var(--hw-text-muted)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search conditions, symptoms, drugs..."
              className="w-full bg-transparent text-base outline-none placeholder:opacity-60 font-[family-name:var(--font-body)] md:text-lg"
              style={{
                color: "var(--hw-text-primary)",
              }}
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-150 font-[family-name:var(--font-display)]"
              style={{
                backgroundColor: "var(--hw-accent)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--hw-accent-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "var(--hw-accent)")
              }
            >
              Search
            </button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-[family-name:var(--font-body)]"
          style={{ color: "var(--hw-text-muted)" }}
        >
          <span>Popular:</span>
          {["Diabetes", "Anxiety", "Vitamin D", "PCOS", "Migraine"].map(
            (term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  router.push(`/search?q=${encodeURIComponent(term)}`);
                }}
                className="rounded-full px-3 py-1 text-sm transition-colors duration-150"
                style={{
                  backgroundColor: "var(--hw-surface-secondary)",
                  color: "var(--hw-text-secondary)",
                }}
              >
                {term}
              </button>
            )
          )}
        </motion.div>
      </div>
    </section>
  );
}
