"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  Stethoscope,
  Pill,
  HeartPulse,
  FlaskConical,
  BookOpen,
} from "lucide-react";

function useCountUp(target: number, duration = 1800, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
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
  }, [target, duration, active]);
  return count;
}

const stats = [
  {
    value: 139,
    suffix: "+",
    label: "Conditions",
    icon: Stethoscope,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    value: 400,
    suffix: "+",
    label: "Medicines",
    icon: Pill,
    gradient: "from-violet-500 to-purple-500",
  },
  {
    value: 15,
    suffix: "",
    label: "First Aid Guides",
    icon: HeartPulse,
    gradient: "from-red-500 to-pink-500",
  },
  {
    value: 15,
    suffix: "",
    label: "Lab Tests",
    icon: FlaskConical,
    gradient: "from-teal-500 to-emerald-500",
  },
  {
    value: 30,
    suffix: "+",
    label: "Medical Terms",
    icon: BookOpen,
    gradient: "from-amber-500 to-orange-500",
  },
];

function StatCard({
  stat,
  index,
  inView,
}: {
  stat: (typeof stats)[0];
  index: number;
  inView: boolean;
}) {
  const count = useCountUp(stat.value, 1800, inView);
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center gap-3 rounded-2xl px-6 py-8"
      style={{
        background: "var(--hw-surface)",
        border: "1px solid var(--hw-border)",
      }}
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${stat.gradient}`}
      >
        <Icon className="h-5 w-5 text-white" />
      </div>
      <p
        className="text-3xl font-extrabold tabular-nums tracking-tight"
        style={{ color: "var(--hw-text-primary)" }}
      >
        {count}
        {stat.suffix}
      </p>
      <p
        className="text-sm font-medium"
        style={{ color: "var(--hw-text-secondary)" }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-20 sm:py-28"
      style={{ background: "var(--hw-bg)" }}
    >
      {/* Subtle gradient mesh background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(13,148,136,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(139,92,246,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Decorative cross pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 4v4H4v4h4v4h4v-4h4V8h-4V4H8z' fill='%23666' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-[1] mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Health Knowledge at Scale
          </h2>
          <p
            className="mx-auto mt-3 max-w-xl text-lg"
            style={{ color: "var(--hw-text-secondary)" }}
          >
            A comprehensive, growing medical reference you can trust.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
