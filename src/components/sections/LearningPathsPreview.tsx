"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Clock, BookOpen, BarChart3, ArrowRight, CheckCircle2, Calendar } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface LearningPath {
  title: string;
  slug: string;
  duration: string;
  lessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  progress: number;
  description: string;
  learningPoints: string[];
  sampleSchedule: { day: string; topic: string }[];
}

const learningPaths: LearningPath[] = [
  {
    title: "30-Day Diabetes Management",
    slug: "diabetes-management",
    duration: "30 days",
    lessons: 24,
    difficulty: "Beginner",
    color: "#0D9488",
    progress: 0,
    description:
      "A comprehensive program designed to help you understand and manage diabetes through daily lessons on blood sugar monitoring, nutrition, exercise, and medication adherence.",
    learningPoints: [
      "Understand how blood sugar works and what affects it",
      "Build a personalized meal plan with glycemic index awareness",
      "Develop a sustainable exercise routine for glucose control",
      "Master medication schedules and insulin management",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Understanding Your Diagnosis" },
      { day: "Day 2", topic: "Blood Sugar Basics & Monitoring" },
      { day: "Day 3", topic: "Nutrition Fundamentals for Diabetes" },
    ],
  },
  {
    title: "14-Day Heart Health",
    slug: "heart-health",
    duration: "14 days",
    lessons: 12,
    difficulty: "Intermediate",
    color: "#EF4444",
    progress: 0,
    description:
      "Strengthen your cardiovascular health with evidence-based lessons on diet, exercise, stress management, and understanding key heart health markers.",
    learningPoints: [
      "Decode cholesterol, blood pressure, and heart rate readings",
      "Create heart-healthy meals using the DASH diet principles",
      "Learn cardio exercises safe for all fitness levels",
      "Recognize warning signs and when to seek help",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Your Heart Health Baseline" },
      { day: "Day 2", topic: "Understanding Cholesterol & Blood Pressure" },
      { day: "Day 3", topic: "Heart-Healthy Eating Habits" },
    ],
  },
  {
    title: "21-Day Stress Relief",
    slug: "stress-relief",
    duration: "21 days",
    lessons: 18,
    difficulty: "Beginner",
    color: "#8B5CF6",
    progress: 0,
    description:
      "Transform your relationship with stress through guided mindfulness, breathing techniques, cognitive reframing, and lifestyle adjustments proven to reduce cortisol levels.",
    learningPoints: [
      "Identify your personal stress triggers and patterns",
      "Practice 5 different breathing and relaxation techniques",
      "Build a daily mindfulness habit in just 10 minutes",
      "Improve sleep quality with evidence-based strategies",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Mapping Your Stress Landscape" },
      { day: "Day 2", topic: "Introduction to Diaphragmatic Breathing" },
      { day: "Day 3", topic: "Progressive Muscle Relaxation" },
    ],
  },
];

function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Beginner":
      return "#22C55E";
    case "Intermediate":
      return "#F59E0B";
    case "Advanced":
      return "#EF4444";
    default:
      return "#94A3B8";
  }
}

function ProgressRing({
  progress,
  color,
  size = 64,
  strokeWidth = 5,
}: {
  progress: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--hw-border)"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset 0.5s ease" }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="13"
        fontWeight="600"
        fontFamily="var(--font-display)"
        fill="var(--hw-text-primary)"
      >
        {progress}%
      </text>
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function LearningPathsPreview() {
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);

  return (
    <section
      className="py-16 md:py-20"
      style={{ backgroundColor: "var(--hw-surface-secondary)" }}
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-10 font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Start a Learning Path
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {learningPaths.map((path) => (
            <motion.div
              key={path.slug}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <button
                onClick={() => setSelectedPath(path)}
                className="flex h-full w-full flex-col rounded-xl p-6 text-left transition-shadow duration-200 hover:shadow-lg"
                style={{
                  backgroundColor: "var(--hw-surface)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                {/* Header row: title + progress ring */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3
                      className="mb-3 font-[family-name:var(--font-display)] text-lg font-bold leading-snug"
                      style={{ color: "var(--hw-text-primary)" }}
                    >
                      {path.title}
                    </h3>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                        style={{
                          backgroundColor: "var(--hw-surface-secondary)",
                          color: "var(--hw-text-secondary)",
                          border: "1px solid var(--hw-border)",
                        }}
                      >
                        <Clock size={12} />
                        {path.duration}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                        style={{
                          backgroundColor: "var(--hw-surface-secondary)",
                          color: "var(--hw-text-secondary)",
                          border: "1px solid var(--hw-border)",
                        }}
                      >
                        <BookOpen size={12} />
                        {path.lessons} lessons
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                        style={{
                          backgroundColor: `${getDifficultyColor(path.difficulty)}15`,
                          color: getDifficultyColor(path.difficulty),
                        }}
                      >
                        <BarChart3 size={12} />
                        {path.difficulty}
                      </span>
                    </div>
                  </div>

                  <ProgressRing progress={path.progress} color={path.color} />
                </div>

                {/* Teaser text */}
                <p
                  className="mt-auto text-sm"
                  style={{ color: "var(--hw-text-muted)" }}
                >
                  Click to preview this path
                </p>
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Learning path detail modal */}
      <Modal
        isOpen={!!selectedPath}
        onClose={() => setSelectedPath(null)}
        title={selectedPath?.title ?? ""}
        size="xl"
      >
        {selectedPath && (
          <div className="space-y-6">
            {/* Title + meta badges */}
            <div>
              <h3
                className="mb-3 font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                {selectedPath.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                  style={{
                    backgroundColor: "var(--hw-surface-secondary)",
                    color: "var(--hw-text-secondary)",
                    border: "1px solid var(--hw-border)",
                  }}
                >
                  <Clock size={12} />
                  {selectedPath.duration}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                  style={{
                    backgroundColor: "var(--hw-surface-secondary)",
                    color: "var(--hw-text-secondary)",
                    border: "1px solid var(--hw-border)",
                  }}
                >
                  <BookOpen size={12} />
                  {selectedPath.lessons} lessons
                </span>
                <span
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                  style={{
                    backgroundColor: `${getDifficultyColor(selectedPath.difficulty)}15`,
                    color: getDifficultyColor(selectedPath.difficulty),
                  }}
                >
                  <BarChart3 size={12} />
                  {selectedPath.difficulty}
                </span>
              </div>
            </div>

            {/* Full description */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--hw-text-secondary)" }}
            >
              {selectedPath.description}
            </p>

            {/* What you'll learn */}
            <div>
              <p
                className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
                style={{ color: "var(--hw-text-primary)" }}
              >
                What You&apos;ll Learn
              </p>
              <ul className="space-y-2.5">
                {selectedPath.learningPoints.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <CheckCircle2
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--hw-accent)" }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sample schedule */}
            <div>
              <p
                className="mb-3 text-sm font-semibold font-[family-name:var(--font-display)]"
                style={{ color: "var(--hw-text-primary)" }}
              >
                Sample Schedule
              </p>
              <div className="space-y-2">
                {selectedPath.sampleSchedule.map((item) => (
                  <div
                    key={item.day}
                    className="flex items-center gap-3 rounded-xl p-3"
                    style={{
                      backgroundColor: "var(--hw-surface-secondary)",
                      border: "1px solid var(--hw-border)",
                    }}
                  >
                    <Calendar size={16} style={{ color: selectedPath.color }} className="shrink-0" />
                    <span
                      className="text-xs font-bold font-[family-name:var(--font-display)]"
                      style={{ color: selectedPath.color }}
                    >
                      {item.day}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      {item.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/learning-paths"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity duration-150 font-[family-name:var(--font-display)] hover:opacity-90"
              style={{ backgroundColor: selectedPath.color }}
            >
              Start Learning
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Modal>
    </section>
  );
}
