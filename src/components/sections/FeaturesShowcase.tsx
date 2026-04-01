"use client";

import Link from "next/link";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  MessageSquare,
  Activity,
  Pill,
  HeartPulse,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Search,
} from "lucide-react";

const features = [
  {
    title: "AI Health Chat",
    description: "Get instant answers to your health questions with AI",
    href: "/ai-chat",
    icon: MessageSquare,
    gradient: "from-purple-500 to-blue-500",
  },
  {
    title: "Symptom Checker",
    description: "Identify possible conditions from your symptoms",
    href: "/symptom-checker",
    icon: Activity,
    gradient: "from-green-500 to-teal-500",
  },
  {
    title: "Drug Interactions",
    description: "Check for dangerous medication combinations",
    href: "/drug-interactions",
    icon: Pill,
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "First Aid Guide",
    description: "Step-by-step emergency response instructions",
    href: "/first-aid",
    icon: HeartPulse,
    gradient: "from-red-500 to-pink-500",
  },
  {
    title: "Lab Test Explainer",
    description: "Understand your lab results in plain language",
    href: "/lab-tests",
    icon: FlaskConical,
    gradient: "from-cyan-500 to-sky-500",
  },
  {
    title: "Health Glossary",
    description: "Decode complex medical terminology easily",
    href: "/glossary",
    icon: BookOpen,
    gradient: "from-indigo-500 to-blue-600",
  },
  {
    title: "Learning Paths",
    description: "Structured courses to boost your health literacy",
    href: "/learning-paths",
    icon: GraduationCap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Health A-Z",
    description: "Browse conditions, treatments, and health topics",
    href: "/health-a-z",
    icon: Search,
    gradient: "from-teal-500 to-emerald-500",
  },
];

export function FeaturesShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "var(--hw-bg)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Everything You Need for Better Health
          </h2>
          <p
            className="mx-auto mt-4 max-w-2xl text-lg"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            Powerful tools and resources, all in one place.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.href}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={feature.href}
                  className="group relative flex flex-col items-start gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                  style={{
                    background: "var(--hw-surface)",
                    border: "1px solid var(--hw-border)",
                  }}
                >
                  {/* Icon circle */}
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div>
                    <h3
                      className="text-base font-semibold"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="mt-1 text-sm leading-relaxed"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {feature.description}
                    </p>
                  </div>

                  {/* Hover glow */}
                  <div
                    className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]`}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
