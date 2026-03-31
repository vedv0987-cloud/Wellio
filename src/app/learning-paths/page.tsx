"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Clock,
  BookOpen,
  ArrowRight,
  Sparkles,
  Check,
  Users,
  Calendar,
  GraduationCap,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  lessonCount: number;
  difficulty: "Beginner" | "Intermediate";
  color: string;
  gradient: string;
  glowColor: string;
  progress: number;
  enrolled: number;
  whatYouLearn: string[];
  sampleSchedule: { day: string; topic: string }[];
}

const learningPaths: LearningPath[] = [
  {
    id: "diabetes-management",
    title: "30-Day Diabetes Management",
    description:
      "Master blood sugar control through diet, exercise, medication management, and lifestyle changes. Learn to read lab results, plan meals, and build sustainable habits for long-term diabetes management.",
    durationDays: 30,
    lessonCount: 24,
    difficulty: "Beginner",
    color: "#0d9488",
    gradient: "linear-gradient(135deg, #0d9488 0%, #14b8a6 100%)",
    glowColor: "rgba(13,148,136,0.35)",
    progress: 0,
    enrolled: 1240,
    whatYouLearn: [
      "Read and interpret blood glucose lab results",
      "Create balanced meal plans for stable blood sugar",
      "Exercise safely and effectively with diabetes",
      "Manage medication schedules and dosage tracking",
      "Recognize and respond to hypo/hyperglycemia",
      "Build long-term sustainable lifestyle habits",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Understanding Your Diagnosis: Blood Sugar Basics" },
      { day: "Day 2", topic: "Reading Lab Results: HbA1c, Fasting Glucose & More" },
      { day: "Day 3", topic: "Meal Planning 101: Carb Counting & Glycemic Index" },
    ],
  },
  {
    id: "heart-health",
    title: "14-Day Heart Health",
    description:
      "Understand cardiovascular health from cholesterol and blood pressure to heart-healthy diets and exercise. Learn warning signs of heart attacks and strokes, and actionable steps to reduce your risk.",
    durationDays: 14,
    lessonCount: 12,
    difficulty: "Beginner",
    color: "#ef4444",
    gradient: "linear-gradient(135deg, #ef4444 0%, #f87171 100%)",
    glowColor: "rgba(239,68,68,0.35)",
    progress: 0,
    enrolled: 980,
    whatYouLearn: [
      "Understand cholesterol types: LDL, HDL, triglycerides",
      "Monitor and manage blood pressure effectively",
      "Identify heart attack and stroke warning signs",
      "Follow a heart-healthy Mediterranean-style diet",
      "Build a cardio exercise routine safely",
      "Reduce cardiovascular risk with lifestyle changes",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Heart Anatomy & How Your Cardiovascular System Works" },
      { day: "Day 2", topic: "Understanding Your Cholesterol Numbers" },
      { day: "Day 3", topic: "Blood Pressure: Silent Killer Explained" },
    ],
  },
  {
    id: "stress-relief",
    title: "21-Day Stress Relief",
    description:
      "Build a comprehensive stress management toolkit with breathing techniques, meditation, progressive muscle relaxation, journaling, and cognitive reframing. Backed by neuroscience research.",
    durationDays: 21,
    lessonCount: 18,
    difficulty: "Beginner",
    color: "#8b5cf6",
    gradient: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    glowColor: "rgba(139,92,246,0.35)",
    progress: 0,
    enrolled: 2150,
    whatYouLearn: [
      "Master 4-7-8 breathing and box breathing techniques",
      "Practice guided mindfulness meditation daily",
      "Use progressive muscle relaxation for sleep",
      "Apply cognitive reframing to reduce anxiety",
      "Build a personal journaling practice",
      "Understand the neuroscience behind stress responses",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "The Science of Stress: What Happens in Your Brain" },
      { day: "Day 2", topic: "Breathing Techniques: Your Instant Calm Toolkit" },
      { day: "Day 3", topic: "Introduction to Mindfulness Meditation" },
    ],
  },
  {
    id: "weight-management",
    title: "30-Day Weight Management",
    description:
      "Evidence-based approach to sustainable weight management. Covers nutrition science, calorie awareness, exercise programming, sleep optimization, and building a healthy relationship with food.",
    durationDays: 30,
    lessonCount: 26,
    difficulty: "Intermediate",
    color: "#10b981",
    gradient: "linear-gradient(135deg, #10b981 0%, #34d399 100%)",
    glowColor: "rgba(16,185,129,0.35)",
    progress: 0,
    enrolled: 1870,
    whatYouLearn: [
      "Calculate and track your TDEE and calorie needs",
      "Understand macronutrients and portion sizing",
      "Design a progressive exercise program",
      "Optimize sleep for better metabolism",
      "Overcome emotional eating patterns",
      "Set realistic goals and track progress",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Metabolism Basics: How Your Body Burns Calories" },
      { day: "Day 2", topic: "Understanding Macros: Proteins, Carbs & Fats" },
      { day: "Day 3", topic: "Setting Realistic Goals & Your Personal Plan" },
    ],
  },
  {
    id: "better-sleep",
    title: "14-Day Better Sleep",
    description:
      "Transform your sleep quality through sleep hygiene practices, circadian rhythm optimization, bedroom environment setup, and techniques to fall asleep faster and stay asleep longer.",
    durationDays: 14,
    lessonCount: 10,
    difficulty: "Beginner",
    color: "#6366f1",
    gradient: "linear-gradient(135deg, #6366f1 0%, #818cf8 100%)",
    glowColor: "rgba(99,102,241,0.35)",
    progress: 0,
    enrolled: 1560,
    whatYouLearn: [
      "Understand your circadian rhythm and sleep cycles",
      "Create the optimal bedroom environment",
      "Build a consistent wind-down routine",
      "Eliminate screen time and blue light impact",
      "Use relaxation techniques for faster sleep onset",
      "Track and improve your sleep quality metrics",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Sleep Science: Cycles, Stages & Circadian Rhythms" },
      { day: "Day 2", topic: "Your Bedroom Audit: Light, Temperature & Sound" },
      { day: "Day 3", topic: "Building Your Perfect Wind-Down Routine" },
    ],
  },
  {
    id: "gut-health",
    title: "21-Day Gut Health",
    description:
      "Explore the gut microbiome and its impact on overall health. Learn about prebiotics, probiotics, fermented foods, elimination diets, and how gut health affects immunity, mood, and energy levels.",
    durationDays: 21,
    lessonCount: 16,
    difficulty: "Intermediate",
    color: "#f59e0b",
    gradient: "linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)",
    glowColor: "rgba(245,158,11,0.35)",
    progress: 0,
    enrolled: 890,
    whatYouLearn: [
      "Understand the gut microbiome ecosystem",
      "Identify prebiotic and probiotic food sources",
      "Incorporate fermented foods into your diet",
      "Follow a structured elimination diet safely",
      "Recognize gut-brain connection symptoms",
      "Build a gut-friendly daily nutrition plan",
    ],
    sampleSchedule: [
      { day: "Day 1", topic: "Your Gut Microbiome: Trillions of Tiny Allies" },
      { day: "Day 2", topic: "Prebiotics vs Probiotics: What Your Gut Needs" },
      { day: "Day 3", topic: "Fermented Foods: Yogurt, Kimchi, Kombucha & More" },
    ],
  },
];

function ProgressRing({
  progress,
  size = 72,
  strokeWidth = 5,
  color,
  gradient,
}: {
  progress: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  gradient: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const gradientId = `ring-${color.replace("#", "")}`;

  return (
    <svg width={size} height={size} className="shrink-0">
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color} />
          <stop offset="100%" stopColor={`${color}88`} />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--hw-border)"
        strokeWidth={strokeWidth}
        opacity={0.5}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={strokeWidth + 1}
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
        fontSize="15"
        fontWeight="700"
      >
        {progress}%
      </text>
    </svg>
  );
}

export default function LearningPathsPage() {
  const [paths] = useState(learningPaths);
  const [activePath, setActivePath] = useState<LearningPath | null>(null);

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
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-5"
            style={{
              background: "linear-gradient(135deg, rgba(13,148,136,0.1) 0%, rgba(139,92,246,0.1) 100%)",
              border: "1px solid rgba(13,148,136,0.2)",
              color: "var(--hw-accent)",
            }}
          >
            <GraduationCap size={14} />
            Guided Health Education
          </motion.div>
          <h1 className="text-4xl sm:text-5xl font-bold font-[family-name:var(--font-display)] mb-3">
            Learning Paths
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: "var(--hw-text-secondary)" }}>
            Structured health journeys designed by experts. Pick a path and transform your well-being one day at a time.
          </p>
        </motion.div>

        {/* Path Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paths.map((path, idx) => (
            <motion.div
              key={path.id}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: idx * 0.08,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-2xl border p-6 flex flex-col transition-all duration-300 group"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = path.color;
                e.currentTarget.style.boxShadow = `0 0 24px ${path.glowColor}, 0 12px 32px rgba(0,0,0,0.06)`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--hw-border)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Top gradient accent bar */}
              <div
                className="h-1 w-full rounded-full mb-5 -mt-1"
                style={{ background: path.gradient }}
              />

              {/* Title & Progress Ring */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-xl font-bold mb-2.5 leading-tight font-[family-name:var(--font-display)]"
                    style={{ color: "var(--hw-text-primary)" }}
                  >
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
                <ProgressRing
                  progress={path.progress}
                  color={path.color}
                  gradient={path.gradient}
                  size={72}
                  strokeWidth={5}
                />
              </div>

              {/* Enrollment badge */}
              <div
                className="flex items-center gap-1.5 mb-3 text-xs font-medium"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                <Users className="w-3.5 h-3.5" />
                {path.enrolled.toLocaleString()} enrolled
              </div>

              {/* Description */}
              <p
                className="text-sm leading-relaxed flex-1 mb-5"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {path.description}
              </p>

              {/* Start Button - opens modal */}
              <button
                onClick={() => setActivePath(path)}
                className="w-full flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all duration-300 group-hover:shadow-lg"
                style={{
                  background: path.gradient,
                  boxShadow: `0 2px 12px ${path.glowColor}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 4px 20px ${path.glowColor}`;
                  e.currentTarget.style.transform = "scale(1.02)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 2px 12px ${path.glowColor}`;
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                Start Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Path Detail Modal */}
      <Modal
        isOpen={!!activePath}
        onClose={() => setActivePath(null)}
        title={activePath?.title ?? ""}
        size="lg"
      >
        {activePath && (() => {
          const p = activePath;
          return (
            <div className="space-y-6">
              {/* Header info */}
              <div className="flex items-start gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-white text-xl font-bold shadow-lg"
                  style={{ background: p.gradient }}
                >
                  {p.durationDays}d
                </div>
                <div>
                  <p
                    className="text-sm leading-relaxed font-[family-name:var(--font-body)]"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium"
                      style={{ color: p.color }}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {p.durationDays} Days
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      {p.lessonCount} Lessons
                    </span>
                    <span
                      className="inline-flex items-center gap-1 text-xs font-medium"
                      style={{ color: "var(--hw-text-secondary)" }}
                    >
                      <Users className="w-3.5 h-3.5" />
                      {p.enrolled.toLocaleString()} enrolled
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px w-full"
                style={{
                  background: `linear-gradient(90deg, transparent 0%, ${p.color}40 50%, transparent 100%)`,
                }}
              />

              {/* What You'll Learn */}
              <div>
                <h4
                  className="text-sm font-bold font-[family-name:var(--font-display)] mb-3 flex items-center gap-2"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  <GraduationCap size={16} style={{ color: p.color }} />
                  What You&apos;ll Learn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {p.whatYouLearn.map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div
                        className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full mt-0.5"
                        style={{ backgroundColor: `${p.color}15` }}
                      >
                        <Check size={12} style={{ color: p.color }} />
                      </div>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--hw-text-secondary)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Schedule */}
              <div>
                <h4
                  className="text-sm font-bold font-[family-name:var(--font-display)] mb-3 flex items-center gap-2"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  <Calendar size={16} style={{ color: p.color }} />
                  Sample Schedule
                </h4>
                <div className="space-y-2.5">
                  {p.sampleSchedule.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 rounded-xl p-3"
                      style={{
                        backgroundColor: `${p.color}08`,
                        border: `1px solid ${p.color}20`,
                      }}
                    >
                      <span
                        className="shrink-0 text-xs font-bold px-2.5 py-1 rounded-lg text-white"
                        style={{ background: p.gradient }}
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

              {/* Begin Journey CTA */}
              <Link
                href="/learning-paths"
                onClick={() => setActivePath(null)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 font-[family-name:var(--font-display)] hover:opacity-90 hover:shadow-lg"
                style={{
                  background: p.gradient,
                  boxShadow: `0 4px 20px ${p.glowColor}`,
                }}
              >
                Begin Journey
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })()}
      </Modal>
    </div>
  );
}
