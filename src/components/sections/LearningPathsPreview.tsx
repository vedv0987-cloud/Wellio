"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Clock, BookOpen, BarChart3, ArrowRight } from "lucide-react";

interface LearningPath {
  title: string;
  slug: string;
  duration: string;
  lessons: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  color: string;
  progress: number;
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
  },
  {
    title: "14-Day Heart Health",
    slug: "heart-health",
    duration: "14 days",
    lessons: 12,
    difficulty: "Intermediate",
    color: "#EF4444",
    progress: 0,
  },
  {
    title: "21-Day Stress Relief",
    slug: "stress-relief",
    duration: "21 days",
    lessons: 18,
    difficulty: "Beginner",
    color: "#8B5CF6",
    progress: 0,
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
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--hw-border)"
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
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
      {/* Center text */}
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
              className="flex flex-col rounded-xl p-6"
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

              {/* Start Now button */}
              <Link
                href={`/learning-paths/${path.slug}`}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 font-[family-name:var(--font-display)]"
                style={{ backgroundColor: path.color }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Start Now
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
