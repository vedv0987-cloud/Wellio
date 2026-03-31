"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useInView } from "motion/react";
import {
  Search,
  Heart,
  Brain,
  Pill,
  Shield,
  Activity,
  Video,
  Stethoscope,
  Users,
  Sparkles,
} from "lucide-react";

/* ── animated count-up hook ── */
function useCountUp(target: number, duration = 2000, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(id);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(id);
  }, [target, duration, inView]);
  return count;
}

/* ── floating icon data ── */
const floatingIcons = [
  { Icon: Heart, x: "8%", y: "18%", delay: 0, size: 30, color: "#ef4444" },
  { Icon: Brain, x: "85%", y: "12%", delay: 0.5, size: 34, color: "#8b5cf6" },
  { Icon: Pill, x: "92%", y: "62%", delay: 1.2, size: 26, color: "#f59e0b" },
  { Icon: Shield, x: "4%", y: "68%", delay: 0.8, size: 28, color: "#3b82f6" },
  { Icon: Activity, x: "78%", y: "82%", delay: 1.6, size: 24, color: "#10b981" },
  { Icon: Stethoscope, x: "14%", y: "86%", delay: 2.0, size: 22, color: "#0d9488" },
  { Icon: Sparkles, x: "50%", y: "8%", delay: 0.3, size: 20, color: "#ec4899" },
];

const stats = [
  { label: "Videos", value: 500, suffix: "+", Icon: Video },
  { label: "Conditions", value: 200, suffix: "+", Icon: Stethoscope },
  { label: "Doctors", value: 20, suffix: "+", Icon: Users },
];

const popularTerms = ["Diabetes", "Anxiety", "Vitamin D", "PCOS", "Migraine"];

const headlineWords = ["Your", "health", "questions,", "answered", "by", "science."];

export function HeroSection() {
  const [query, setQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const router = useRouter();
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-40px" });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <section className="relative overflow-hidden py-32 md:py-44">
      {/* ── Animated gradient mesh background ── */}
      <div className="hero-gradient-mesh pointer-events-none absolute inset-0" />

      {/* Orb 1 - teal */}
      <div
        className="hero-orb-1 pointer-events-none absolute -top-40 left-1/4 h-[600px] w-[600px] rounded-full opacity-20 blur-[100px]"
        style={{ backgroundColor: "#0d9488" }}
      />
      {/* Orb 2 - purple */}
      <div
        className="hero-orb-2 pointer-events-none absolute -bottom-32 right-1/4 h-[500px] w-[500px] rounded-full opacity-18 blur-[100px]"
        style={{ backgroundColor: "#8b5cf6" }}
      />
      {/* Orb 3 - blue accent */}
      <div
        className="hero-orb-3 pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[120px]"
        style={{ backgroundColor: "#3b82f6" }}
      />

      {/* Grid pattern overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--hw-text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--hw-text-primary) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── Floating health icons ── */}
      {floatingIcons.map(({ Icon, x, y, delay, size, color }, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute"
          style={{ left: x, top: y }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -22, 0],
            x: [0, i % 2 === 0 ? 8 : -8, 0],
            scale: [0.85, 1.1, 0.85],
            rotate: [0, i % 2 === 0 ? 8 : -8, 0],
          }}
          transition={{
            duration: 6 + i * 0.5,
            delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div
            className="flex items-center justify-center rounded-xl p-2"
            style={{
              background: `${color}15`,
              backdropFilter: "blur(8px)",
            }}
          >
            <Icon size={size} style={{ color }} strokeWidth={1.4} />
          </div>
        </motion.div>
      ))}

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 text-center">
        {/* Pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium"
          style={{
            background: "linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(139,92,246,0.1) 100%)",
            border: "1px solid rgba(13,148,136,0.2)",
            color: "var(--hw-accent)",
          }}
        >
          <Sparkles size={14} />
          AI-Powered Health Intelligence
        </motion.div>

        {/* Headline with word-by-word stagger */}
        <h1
          className="font-[family-name:var(--font-display)] text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="inline-block mr-[0.3em]"
              style={
                word === "answered" || word === "by" || word === "science."
                  ? {
                      background: "linear-gradient(135deg, #0d9488 0%, #8b5cf6 50%, #3b82f6 100%)",
                      backgroundSize: "200% 200%",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      animation: "heroTextGradient 4s ease infinite",
                    }
                  : undefined
              }
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg font-[family-name:var(--font-body)] md:text-xl"
          style={{ color: "var(--hw-text-secondary)" }}
        >
          AI-powered health insights from 500+ expert YouTube videos.
          <br className="hidden sm:block" />
          Understand your body. Make smarter decisions.
        </motion.p>

        {/* ── Search bar with glass-morphism ── */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="mx-auto mt-10 max-w-2xl"
        >
          <div
            className="hero-search-bar relative flex items-center gap-3 rounded-2xl px-5 py-4 transition-all duration-500"
            style={{
              backgroundColor: "rgba(var(--hw-surface-rgb, 255,255,255), 0.55)",
              backdropFilter: "blur(20px) saturate(1.6)",
              WebkitBackdropFilter: "blur(20px) saturate(1.6)",
              border: searchFocused
                ? "1.5px solid transparent"
                : "1px solid var(--hw-border)",
              backgroundClip: "padding-box",
              boxShadow: searchFocused
                ? "0 0 0 2px rgba(13,148,136,0.3), 0 0 40px rgba(13,148,136,0.15), 0 8px 32px rgba(0,0,0,0.1)"
                : "0 4px 24px rgba(0,0,0,0.06)",
              outline: searchFocused
                ? "2px solid var(--hw-accent)"
                : "none",
            }}
          >
            <Search
              size={22}
              className="shrink-0 transition-colors duration-300"
              style={{ color: searchFocused ? "var(--hw-accent)" : "var(--hw-text-muted)" }}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              placeholder="Search conditions, symptoms, drugs..."
              className="w-full bg-transparent text-base outline-none placeholder:opacity-60 font-[family-name:var(--font-body)] md:text-lg"
              style={{ color: "var(--hw-text-primary)" }}
            />
            <button
              type="submit"
              className="shrink-0 rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 font-[family-name:var(--font-display)]"
              style={{
                background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
                boxShadow: "0 2px 12px rgba(13,148,136,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(13,148,136,0.5)";
                e.currentTarget.style.transform = "translateY(-2px) scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 12px rgba(13,148,136,0.3)";
                e.currentTarget.style.transform = "translateY(0) scale(1)";
              }}
            >
              Search
            </button>
          </div>
        </motion.form>

        {/* ── Popular chips with gradient borders ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm font-[family-name:var(--font-body)]"
          style={{ color: "var(--hw-text-muted)" }}
        >
          <span className="mr-1">Popular:</span>
          {popularTerms.map((term, i) => (
            <motion.button
              key={term}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.85 + i * 0.05 }}
              onClick={() => {
                setQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="hero-chip relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300"
              style={{
                background: "var(--hw-surface)",
                color: "var(--hw-text-secondary)",
                border: "1px solid var(--hw-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--hw-accent)";
                e.currentTarget.style.boxShadow = "0 0 16px rgba(13,148,136,0.25), 0 0 0 1px rgba(13,148,136,0.15)";
                e.currentTarget.style.color = "var(--hw-accent)";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--hw-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.color = "var(--hw-text-secondary)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {term}
            </motion.button>
          ))}
        </motion.div>

        {/* ── Stat counters ── */}
        <motion.div
          ref={statsRef}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.95 }}
          className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-6 md:gap-12"
        >
          {stats.map(({ label, value, suffix, Icon }, i) => {
            const animatedVal = useCountUp(value, 2200, statsInView);
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="group flex flex-col items-center gap-2"
              >
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(135deg, rgba(13,148,136,0.15) 0%, rgba(13,148,136,0.05) 100%)"
                        : i === 1
                        ? "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0.05) 100%)"
                        : "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(59,130,246,0.05) 100%)",
                    border: `1px solid ${i === 0 ? "rgba(13,148,136,0.2)" : i === 1 ? "rgba(139,92,246,0.2)" : "rgba(59,130,246,0.2)"}`,
                  }}
                >
                  <Icon
                    size={22}
                    style={{
                      color: i === 0 ? "#0d9488" : i === 1 ? "#8b5cf6" : "#3b82f6",
                    }}
                  />
                </div>
                <span
                  className="text-3xl font-bold font-[family-name:var(--font-display)] tabular-nums"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  {animatedVal}
                  {suffix}
                </span>
                <span
                  className="text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  {label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* CSS keyframes for gradient animations */}
      <style jsx>{`
        @keyframes heroGradientShift {
          0% {
            background-position: 0% 50%;
          }
          25% {
            background-position: 50% 100%;
          }
          50% {
            background-position: 100% 50%;
          }
          75% {
            background-position: 50% 0%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes heroTextGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .hero-gradient-mesh {
          background: linear-gradient(
              125deg,
              rgba(13, 148, 136, 0.18) 0%,
              rgba(139, 92, 246, 0.14) 25%,
              rgba(59, 130, 246, 0.12) 50%,
              rgba(236, 72, 153, 0.08) 75%,
              rgba(13, 148, 136, 0.1) 100%
            );
          background-size: 400% 400%;
          animation: heroGradientShift 16s ease infinite;
        }
        .hero-orb-1 {
          animation: heroGradientShift 12s ease infinite reverse;
        }
        .hero-orb-2 {
          animation: heroGradientShift 18s ease infinite;
        }
        .hero-orb-3 {
          animation: heroGradientShift 14s ease infinite reverse;
        }
      `}</style>
    </section>
  );
}
