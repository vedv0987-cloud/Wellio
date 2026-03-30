"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MessageSquare, Activity, Pill, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface ToolCard {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const tools: ToolCard[] = [
  {
    title: "AI Health Chat",
    description: "Get instant answers to your health questions.",
    href: "/ai-chat",
    icon: MessageSquare,
  },
  {
    title: "Symptom Checker",
    description: "Identify possible conditions from your symptoms.",
    href: "/symptom-checker",
    icon: Activity,
  },
  {
    title: "Drug Interactions",
    description: "Check if your medications interact safely.",
    href: "/drug-interactions",
    icon: Pill,
  },
  {
    title: "First Aid Guide",
    description: "Step-by-step emergency care instructions.",
    href: "/first-aid",
    icon: Heart,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function QuickAccessTools() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Quick Access Tools
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div key={tool.title} variants={cardVariants}>
                <Link
                  href={tool.href}
                  className="group flex h-full flex-col rounded-xl p-6 transition-shadow duration-200"
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    border: "1px solid var(--hw-border)",
                    borderLeft: "4px solid var(--hw-accent)",
                  }}
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex h-full flex-col"
                  >
                    <div
                      className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg"
                      style={{
                        backgroundColor: "rgba(13,148,136,0.1)",
                      }}
                    >
                      <Icon
                        size={28}
                        style={{ color: "var(--hw-accent)" }}
                      />
                    </div>
                    <h3
                      className="mb-1.5 font-[family-name:var(--font-display)] text-lg font-semibold"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {tool.title}
                    </h3>
                    <p
                      className="text-sm font-[family-name:var(--font-body)] leading-relaxed"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {tool.description}
                    </p>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
