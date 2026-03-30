'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Users, Globe } from 'lucide-react';

const SPECIALTIES = [
  'All',
  'Nutrition',
  'Fitness',
  'Neuroscience',
  'Yoga & Wellness',
  'Functional Medicine',
  'General Health',
] as const;

type Specialty = (typeof SPECIALTIES)[number];

interface Creator {
  name: string;
  displayName?: string;
  specialty: string;
  credentials: string[];
  subscribers: string;
  language: 'EN' | 'HI' | 'Both';
  bio: string;
  category: Specialty;
}

const creators: Creator[] = [
  {
    name: 'Dr. Eric Berg',
    specialty: 'Keto & Nutrition',
    credentials: ['DC'],
    subscribers: '11.5M',
    language: 'EN',
    bio: 'Leading expert in ketogenic diets and intermittent fasting with decades of clinical experience in nutritional science.',
    category: 'Nutrition',
  },
  {
    name: 'Fit Tuber',
    displayName: 'Vivek Mittal',
    specialty: 'Indian Fitness & Health',
    credentials: ['Certified Nutritionist'],
    subscribers: '8.2M',
    language: 'Both',
    bio: 'Bridging traditional Indian wellness with modern fitness science, offering practical health advice for everyday life.',
    category: 'Fitness',
  },
  {
    name: 'Andrew Huberman',
    specialty: 'Neuroscience & Health',
    credentials: ['PhD', 'Stanford'],
    subscribers: '5.8M',
    language: 'EN',
    bio: 'Stanford neuroscience professor exploring science-based tools for everyday life, sleep, focus, and performance.',
    category: 'Neuroscience',
  },
  {
    name: 'Satvic Movement',
    specialty: 'Ayurveda & Natural Healing',
    credentials: ['Certified Yoga'],
    subscribers: '4.2M',
    language: 'Both',
    bio: 'Promoting natural healing through Ayurvedic practices, satvic diet, yoga, and holistic lifestyle transformation.',
    category: 'Yoga & Wellness',
  },
  {
    name: 'Dr. Sten Ekberg',
    specialty: 'Holistic Health',
    credentials: ['DC', 'DIBAK'],
    subscribers: '3.8M',
    language: 'EN',
    bio: 'Olympic decathlete turned holistic health practitioner, explaining complex health topics with clarity and depth.',
    category: 'General Health',
  },
  {
    name: 'Dr. Mark Hyman',
    specialty: 'Functional Medicine',
    credentials: ['MD'],
    subscribers: '4.5M',
    language: 'EN',
    bio: 'Pioneer of functional medicine advocating for food as medicine and root-cause approaches to chronic disease.',
    category: 'Functional Medicine',
  },
  {
    name: 'Ankur Warikoo',
    specialty: 'Health & Productivity',
    credentials: ['MBA'],
    subscribers: '3.2M',
    language: 'Both',
    bio: 'Entrepreneur and educator sharing actionable insights on health optimization, productivity, and mindful living.',
    category: 'General Health',
  },
  {
    name: 'Dr. Mandell',
    displayName: 'Motivationaldoc',
    specialty: 'Chiropractic & Pain',
    credentials: ['DC'],
    subscribers: '6.1M',
    language: 'EN',
    bio: 'Chiropractic physician specializing in pain relief techniques, posture correction, and musculoskeletal health.',
    category: 'General Health',
  },
  {
    name: 'Yoga With Adriene',
    specialty: 'Yoga & Wellness',
    credentials: ['RYT-200'],
    subscribers: '12.8M',
    language: 'EN',
    bio: 'Making yoga accessible to everyone with free practices that nurture body, mind, and spirit for all skill levels.',
    category: 'Yoga & Wellness',
  },
  {
    name: 'Dr. Mike',
    specialty: 'General Medicine',
    credentials: ['DO'],
    subscribers: '11.2M',
    language: 'EN',
    bio: 'Board-certified family medicine physician making medical education entertaining, relatable, and easy to understand.',
    category: 'General Health',
  },
];

const AVATAR_COLORS = [
  '#2563eb',
  '#7c3aed',
  '#db2777',
  '#ea580c',
  '#0891b2',
  '#059669',
  '#d97706',
  '#dc2626',
  '#4f46e5',
  '#0d9488',
];

function getInitials(name: string): string {
  const words = name.replace(/^(Dr\.\s*|Yoga With\s*)/i, '').split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return words[0].substring(0, 2).toUpperCase();
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function LanguageBadge({ language }: { language: 'EN' | 'HI' | 'Both' }) {
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{
        backgroundColor: 'var(--hw-surface-secondary)',
        color: 'var(--hw-text-secondary)',
        border: '1px solid var(--hw-border)',
      }}
    >
      <Globe className="h-3 w-3" />
      {language}
    </span>
  );
}

export default function CreatorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty>('All');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered =
    selectedSpecialty === 'All'
      ? creators
      : creators.filter((c) => c.category === selectedSpecialty);

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
            Health Creator Directory
          </h1>
          <p
            className="mt-3 text-lg"
            style={{ color: 'var(--hw-text-secondary)' }}
          >
            Expert health content creators
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors"
              style={{
                backgroundColor: 'var(--hw-surface-secondary)',
                color: 'var(--hw-text-primary)',
                border: '1px solid var(--hw-border)',
              }}
            >
              <span style={{ color: 'var(--hw-text-muted)' }}>Specialty:</span>
              {selectedSpecialty}
              <ChevronDown
                className="h-4 w-4 transition-transform"
                style={{
                  color: 'var(--hw-text-muted)',
                  transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 z-20 mt-2 w-56 rounded-xl py-1 shadow-lg"
                style={{
                  backgroundColor: 'var(--hw-surface-secondary)',
                  border: '1px solid var(--hw-border)',
                }}
              >
                {SPECIALTIES.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSpecialty(s);
                      setDropdownOpen(false);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm transition-colors hover:brightness-90"
                    style={{
                      color:
                        selectedSpecialty === s
                          ? 'var(--hw-accent)'
                          : 'var(--hw-text-primary)',
                      backgroundColor:
                        selectedSpecialty === s
                          ? 'var(--hw-surface)'
                          : 'transparent',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((creator, index) => (
            <motion.div
              key={creator.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                type: 'spring',
                stiffness: 120,
                damping: 18,
              }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="cursor-pointer rounded-2xl p-6 shadow-sm transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--hw-surface-secondary)',
                border: '1px solid var(--hw-border)',
              }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
                  style={{ backgroundColor: getAvatarColor(creator.name) }}
                >
                  {getInitials(creator.name)}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold leading-tight">
                    {creator.name}
                  </h3>
                  {creator.displayName && (
                    <p
                      className="mt-0.5 text-xs"
                      style={{ color: 'var(--hw-text-muted)' }}
                    >
                      {creator.displayName}
                    </p>
                  )}
                  <p
                    className="mt-1 text-sm"
                    style={{ color: 'var(--hw-accent)' }}
                  >
                    {creator.specialty}
                  </p>
                </div>
              </div>

              {/* Credentials */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {creator.credentials.map((cred) => (
                  <span
                    key={cred}
                    className="rounded-md px-2 py-0.5 text-xs font-semibold"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--hw-accent) 15%, transparent)',
                      color: 'var(--hw-accent)',
                    }}
                  >
                    {cred}
                  </span>
                ))}
              </div>

              {/* Stats row */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Users
                    className="h-4 w-4"
                    style={{ color: 'var(--hw-text-muted)' }}
                  />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--hw-text-primary)' }}
                  >
                    {creator.subscribers}
                  </span>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--hw-text-muted)' }}
                  >
                    subscribers
                  </span>
                </div>
                <LanguageBadge language={creator.language} />
              </div>

              {/* Bio */}
              <p
                className="mt-3 text-sm leading-relaxed"
                style={{ color: 'var(--hw-text-secondary)' }}
              >
                {creator.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p
            className="mt-16 text-center text-lg"
            style={{ color: 'var(--hw-text-muted)' }}
          >
            No creators found for this specialty.
          </p>
        )}
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
}
