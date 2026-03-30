"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Clock, BookOpen, ArrowRight, Sparkles } from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  lessonCount: number;
  difficulty: "Beginner" | "Intermediate";
  color: string;
  progress: number;
}

const learningPaths: LearningPath[] = [
  {
    id: "diabetes-management",
    title: "30-Day Diabetes Management",
    description: "Master blood sugar control through diet, exercise, medication management, and lifestyle changes. Learn to read lab results, plan meals, and build sustainable habits for long-term diabetes management.",
    durationDays: 30,
    lessonCount: 24,
    difficulty: "Beginner",
    color: "#3b82f6",
    progress: 0,
  },
  {
    id: "heart-health",
    title: "14-Day Heart Health",
    description: "Understand cardiovascular health from cholesterol and blood pressure to heart-healthy diets and exercise. Learn warning signs of heart attacks and strokes, and actionable steps to reduce your risk.",
    durationDays: 14,
    lessonCount: 12,
    difficulty: "Beginner",
    color: "#ef4444",
    progress: 0,
  },
  {
    id: "stress-relief",
    title: "21-Day Stress Relief",
    description: "Build a comprehensive stress management toolkit with breathing techniques, meditation, progressive muscle relaxation, journaling, and cognitive reframing. Backed by neuroscience research.",
    durationDays: 21,
    lessonCount: 18,
    difficulty: "Beginner",
    color: "#8b5cf6",
    progress: 0,
  },
  {
    id: "weight-management",
    title: "30-Day Weight Management",
    description: "Evidence-based approach to sustainable weight management. Covers nutrition science, calorie awareness, exercise programming, sleep optimization, and building a healthy relationship with food.",
    durationDays: 30,
    lessonCount: 26,
    difficulty: "Intermediate",
    color: "#10b981",
    progress: 0,
  },
  {
    id: "better-sleep",
    title: "14-Day Better Sleep",
    description: "Transform your sleep quality through sleep hygiene practices, circadian rhythm optimization, bedroom environment setup, and techniques to fall asleep faster and stay asleep longer.",
    durationDays: 14,
    lessonCount: 10,
    difficulty: "Beginner",
    color: "#6366f1",
    progress: 0,
  },
  {
    id: "gut-health",
    title: "21-Day Gut Health",
    description: "Explore the gut microbiome and its impact on overall health. Learn about prebiotics, probiotics, fermented foods, elimination diets, and how gut health affects immunity, mood, and energy levels.",
    durationDays: 21,
    lessonCount: 16,
    difficulty: "Intermediate",
    color: "#f59e0b",
    progress: 0,
  },
];

function ProgressRing({
  progress,
  size = 64,
  strokeWidth = 5,
  color,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className="shrink-0">
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
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all duration-700"
      />
      <text
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--hw-text-primary)"
        fontSize="14"
        fontWeight="700"
      >
        {progress}%
      </text>
    </svg>
  );
}

export default function LearningPathsPage() {
  const [paths] = useState(learningPaths);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--hw-bg)", color: "var(--hw-text-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            Learning Paths
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Guided Health Journeys
          </p>
        </motion.div>

        {/* Path Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, idx) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-xl border p-6 flex flex-col transition-all duration-200 hover:shadow-lg group"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = path.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--hw-border)";
              }}
            >
              {/* Top: Title & Progress Ring */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold mb-2 leading-tight">
                    {path.title}
                  </h3>
                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${path.color}15`,
                        color: path.color,
                      }}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {path.durationDays} Days
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: "var(--hw-surface-secondary)",
                        color: "var(--hw-text-secondary)",
                      }}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {path.lessonCount} Lessons
                    </span>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor:
                          path.difficulty === "Beginner"
                            ? "rgba(16, 185, 129, 0.12)"
                            : "rgba(245, 158, 11, 0.12)",
                        color:
                          path.difficulty === "Beginner" ? "#10b981" : "#f59e0b",
                      }}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      {path.difficulty}
                    </span>
                  </div>
                </div>
                <ProgressRing progress={path.progress} color={path.color} />
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {path.description}
              </p>

              {/* Start Button */}
              <button
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all duration-200 group-hover:shadow-md"
                style={{
                  backgroundColor: path.color,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Start Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
