"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { ChevronDown, Users, Globe, BadgeCheck } from "lucide-react";

interface Creator {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  credentials: string;
  subscriberCount: string;
  language: string;
  bio: string;
  color: string;
}

const creators: Creator[] = [
  {
    id: "eric-berg",
    name: "Dr. Eric Berg",
    initials: "EB",
    specialty: "Nutrition & Keto",
    credentials: "Doctor of Chiropractic",
    subscriberCount: "12.8M",
    language: "English",
    bio: "Specializes in healthy ketosis and intermittent fasting. Known for detailed explanations of how vitamins, minerals, and nutrition affect health conditions. Covers topics from weight loss to hormonal health with easy-to-understand visual aids.",
    color: "#3b82f6",
  },
  {
    id: "fit-tuber",
    name: "Fit Tuber",
    initials: "FT",
    specialty: "Fitness & Ayurveda",
    credentials: "Certified Fitness Trainer",
    subscriberCount: "8.5M",
    language: "Hindi / English",
    bio: "India's popular health and fitness creator covering Ayurvedic remedies, exercise routines, diet plans, and product reviews. Known for practical health tips rooted in Indian lifestyle and traditional medicine combined with modern science.",
    color: "#10b981",
  },
  {
    id: "andrew-huberman",
    name: "Andrew Huberman",
    initials: "AH",
    specialty: "Neuroscience",
    credentials: "PhD, Stanford Professor",
    subscriberCount: "6.2M",
    language: "English",
    bio: "Stanford neuroscience professor sharing science-based tools for everyday life. Covers sleep optimization, focus, stress management, exercise science, and mental health through the Huberman Lab podcast. Known for deep-dive, evidence-based episodes.",
    color: "#8b5cf6",
  },
  {
    id: "satvic-movement",
    name: "Satvic Movement",
    initials: "SM",
    specialty: "Natural Healing",
    credentials: "Naturopathy Practitioners",
    subscriberCount: "5.1M",
    language: "Hindi / English",
    bio: "Promotes natural healing through Satvic lifestyle including plant-based diet, sunbathing, enema, wet pack therapy, and fasting. Popular for their 21-day health challenge and practical home remedies based on naturopathy principles.",
    color: "#f59e0b",
  },
  {
    id: "sten-ekberg",
    name: "Dr. Sten Ekberg",
    initials: "SE",
    specialty: "Holistic Health",
    credentials: "Doctor of Chiropractic, Olympian",
    subscriberCount: "4.8M",
    language: "English",
    bio: "Former Olympic decathlete and chiropractor who explains complex health topics in simple terms. Focuses on insulin resistance, diabetes reversal, intermittent fasting, and how the body truly works. Known for calm, thorough presentations.",
    color: "#06b6d4",
  },
  {
    id: "mark-hyman",
    name: "Dr. Mark Hyman",
    initials: "MH",
    specialty: "Functional Medicine",
    credentials: "MD, Board Certified",
    subscriberCount: "4.2M",
    language: "English",
    bio: "Pioneer of functional medicine and bestselling author. Advocates for food as medicine approach to chronic disease. Covers gut health, inflammation, diabetes reversal, and longevity. Known for The Doctor's Farmacy podcast featuring expert interviews.",
    color: "#ec4899",
  },
  {
    id: "ankur-warikoo",
    name: "Ankur Warikoo",
    initials: "AW",
    specialty: "Mental Wellness",
    credentials: "Entrepreneur & Author",
    subscriberCount: "3.9M",
    language: "Hindi / English",
    bio: "While primarily a business creator, covers mental health, work-life balance, stress management, and self-improvement extensively. Known for relatable content on burnout, anxiety, and building healthy habits for young professionals in India.",
    color: "#f97316",
  },
  {
    id: "dr-mandell",
    name: "Dr. Mandell",
    initials: "DM",
    specialty: "Pain Relief & Posture",
    credentials: "Doctor of Chiropractic",
    subscriberCount: "3.6M",
    language: "English",
    bio: "Known as 'motivationaldoc', specializes in pain relief techniques, posture correction, and natural remedies for common ailments. Videos are short, practical, and immediately actionable for back pain, neck pain, headaches, and joint issues.",
    color: "#14b8a6",
  },
  {
    id: "yoga-adriene",
    name: "Yoga With Adriene",
    initials: "YA",
    specialty: "Yoga & Mindfulness",
    credentials: "Certified Yoga Instructor",
    subscriberCount: "12.5M",
    language: "English",
    bio: "The most subscribed yoga channel on YouTube. Offers free yoga practices for all levels, from beginners to advanced. Known for 30-day yoga journeys, stress relief sessions, and making yoga accessible and fun for everyone.",
    color: "#a855f7",
  },
  {
    id: "dr-mike",
    name: "Dr. Mike",
    initials: "DM",
    specialty: "General Medicine",
    credentials: "DO, Board Certified",
    subscriberCount: "11.2M",
    language: "English",
    bio: "Board-certified family medicine physician who makes medicine entertaining and accessible. Known for reacting to medical TV shows, debunking health myths, and explaining medical conditions in engaging, easy-to-understand formats.",
    color: "#ef4444",
  },
];

const specialties = [
  "All",
  ...Array.from(new Set(creators.map((c) => c.specialty))),
];

export default function CreatorsPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered = useMemo(() => {
    if (selectedSpecialty === "All") return creators;
    return creators.filter((c) => c.specialty === selectedSpecialty);
  }, [selectedSpecialty]);

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
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            Health Creator Directory
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Trusted health educators and content creators
          </p>
        </motion.div>

        {/* Specialty Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-xs mx-auto mb-10 relative"
        >
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between rounded-xl px-4 py-3 border transition-all duration-200"
            style={{
              backgroundColor: "var(--hw-surface)",
              borderColor: dropdownOpen ? "var(--hw-accent)" : "var(--hw-border)",
            }}
          >
            <span className="text-sm font-medium">
              {selectedSpecialty === "All" ? "Filter by Specialty" : selectedSpecialty}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
              style={{ color: "var(--hw-text-secondary)" }}
            />
          </button>
          {dropdownOpen && (
            <div
              className="absolute top-full left-0 right-0 mt-2 rounded-xl border shadow-xl z-30 overflow-hidden"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
            >
              {specialties.map((specialty) => (
                <button
                  key={specialty}
                  onClick={() => {
                    setSelectedSpecialty(specialty);
                    setDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2.5 text-sm transition-colors duration-150 hover:opacity-80"
                  style={{
                    backgroundColor:
                      selectedSpecialty === specialty
                        ? "var(--hw-surface-secondary)"
                        : "transparent",
                    color:
                      selectedSpecialty === specialty
                        ? "var(--hw-accent)"
                        : "var(--hw-text-primary)",
                  }}
                >
                  {specialty}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Creator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((creator, idx) => (
            <motion.div
              key={creator.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.06 }}
              className="rounded-xl border p-6 transition-all duration-200 hover:shadow-lg"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = creator.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--hw-border)";
              }}
            >
              {/* Avatar & Name */}
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold text-white shrink-0"
                  style={{ backgroundColor: creator.color }}
                >
                  {creator.initials}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold truncate">{creator.name}</h3>
                  <p
                    className="text-sm truncate"
                    style={{ color: "var(--hw-text-secondary)" }}
                  >
                    {creator.specialty}
                  </p>
                </div>
              </div>

              {/* Badges Row */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: `${creator.color}20`,
                    color: creator.color,
                  }}
                >
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {creator.credentials}
                </span>
                <span
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: "var(--hw-surface-secondary)",
                    color: "var(--hw-text-secondary)",
                  }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  {creator.language}
                </span>
              </div>

              {/* Subscriber Count */}
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-4 h-4" style={{ color: "var(--hw-text-secondary)" }} />
                <span className="text-sm font-semibold" style={{ color: creator.color }}>
                  {creator.subscriberCount}
                </span>
                <span className="text-xs" style={{ color: "var(--hw-text-secondary)" }}>
                  subscribers
                </span>
              </div>

              {/* Bio */}
              <p
                className="text-sm leading-relaxed line-clamp-3"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {creator.bio}
              </p>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
              No creators found for this specialty.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
