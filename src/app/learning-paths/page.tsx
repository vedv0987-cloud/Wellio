'use client';

import { motion } from 'motion/react';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface LearningPath {
  title: string;
  description: string;
  duration: string;
  lessons: number;
  difficulty: 'Beginner' | 'Intermediate';
  progress: number;
}

const learningPaths: LearningPath[] = [
  {
    title: '30-Day Diabetes Management',
    description:
      'Learn to manage blood sugar levels through diet, exercise, and monitoring. Build lasting habits for a healthier life with diabetes.',
    duration: '30 days',
    lessons: 30,
    difficulty: 'Beginner',
    progress: 0,
  },
  {
    title: '14-Day Heart Health',
    description:
      'Build heart-healthy habits with daily exercises and nutrition tips. Strengthen your cardiovascular system with evidence-based routines.',
    duration: '14 days',
    lessons: 14,
    difficulty: 'Beginner',
    progress: 0,
  },
  {
    title: '21-Day Stress Relief',
    description:
      'Master stress management through mindfulness, breathing, and lifestyle changes. Develop a personalized toolkit for daily calm and resilience.',
    duration: '21 days',
    lessons: 21,
    difficulty: 'Beginner',
    progress: 0,
  },
  {
    title: '30-Day Weight Management',
    description:
      'Sustainable weight management through balanced nutrition and activity. Learn the science behind metabolism and create your ideal routine.',
    duration: '30 days',
    lessons: 30,
    difficulty: 'Intermediate',
    progress: 0,
  },
  {
    title: '14-Day Better Sleep',
    description:
      'Transform your sleep quality with evidence-based sleep hygiene practices. Wake up refreshed and energized every morning.',
    duration: '14 days',
    lessons: 14,
    difficulty: 'Beginner',
    progress: 0,
  },
  {
    title: '21-Day Gut Health',
    description:
      'Restore gut health through probiotics, fiber, and anti-inflammatory foods. Understand the microbiome and its impact on overall wellness.',
    duration: '21 days',
    lessons: 21,
    difficulty: 'Intermediate',
    progress: 0,
  },
];

function ProgressRing({
  progress,
  size = 80,
}: {
  progress: number;
  size?: number;
}) {
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const center = size / 2;

  return (
    <svg width={size} height={size} className="shrink-0">
      {/* Track */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--hw-border)"
        strokeWidth={strokeWidth}
      />
      {/* Fill */}
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="var(--hw-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${center} ${center})`}
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
      {/* Text */}
      <text
        x={center}
        y={center}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="14"
        fontWeight="700"
        fill="var(--hw-text-primary)"
      >
        {progress}%
      </text>
    </svg>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: 'Beginner' | 'Intermediate' }) {
  const isGreen = difficulty === 'Beginner';
  return (
    <span
      className="inline-block rounded-full px-3 py-0.5 text-xs font-semibold"
      style={{
        backgroundColor: isGreen
          ? 'rgba(34, 197, 94, 0.15)'
          : 'rgba(245, 158, 11, 0.15)',
        color: isGreen ? '#16a34a' : '#d97706',
      }}
    >
      {difficulty}
    </span>
  );
}

export default function LearningPathsPage() {
  return (
    <div
      className="min-h-screen px-4 py-12 sm:px-6 lg:px-8"
      style={{ backgroundColor: 'var(--hw-surface)', color: 'var(--hw-text-primary)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Learning Paths
          </h1>
          <p
            className="mt-3 text-lg"
            style={{ color: 'var(--hw-text-secondary)' }}
          >
            Guided Health Journeys
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learningPaths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--hw-surface-secondary)',
                borderTop: '1px solid var(--hw-border)',
                borderRight: '1px solid var(--hw-border)',
                borderBottom: '1px solid var(--hw-border)',
                borderLeft: '4px solid var(--hw-accent)',
              }}
            >
              <div className="p-6">
                {/* Top: title + difficulty */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-snug">
                    {path.title}
                  </h3>
                  <DifficultyBadge difficulty={path.difficulty} />
                </div>

                {/* Description */}
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: 'var(--hw-text-secondary)' }}
                >
                  {path.description}
                </p>

                {/* Meta badges */}
                <div className="mt-4 flex items-center gap-4">
                  <div
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: 'var(--hw-text-muted)' }}
                  >
                    <Clock className="h-4 w-4" />
                    <span>{path.duration}</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-sm"
                    style={{ color: 'var(--hw-text-muted)' }}
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{path.lessons} lessons</span>
                  </div>
                </div>

                {/* Progress ring + button */}
                <div className="mt-5 flex items-center justify-between">
                  <ProgressRing progress={path.progress} />

                  <button
                    className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    style={{ backgroundColor: 'var(--hw-accent)' }}
                  >
                    Start Now
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
