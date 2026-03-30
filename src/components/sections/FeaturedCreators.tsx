"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";

interface Creator {
  name: string;
  specialty: string;
  credential: string;
  initials: string;
  color: string;
}

const creators: Creator[] = [
  {
    name: "Dr. Eric Berg",
    specialty: "Keto & Nutrition",
    credential: "DC",
    initials: "EB",
    color: "#0D9488",
  },
  {
    name: "Fit Tuber",
    specialty: "Indian Fitness",
    credential: "Certified Trainer",
    initials: "FT",
    color: "#3B82F6",
  },
  {
    name: "Andrew Huberman",
    specialty: "Neuroscience",
    credential: "PhD",
    initials: "AH",
    color: "#8B5CF6",
  },
  {
    name: "Satvic Movement",
    specialty: "Ayurveda",
    credential: "Wellness Expert",
    initials: "SM",
    color: "#F59E0B",
  },
  {
    name: "Dr. Mark Hyman",
    specialty: "Functional Medicine",
    credential: "MD",
    initials: "MH",
    color: "#EF4444",
  },
  {
    name: "Yoga With Adriene",
    specialty: "Yoga & Wellness",
    credential: "RYT-200",
    initials: "YA",
    color: "#EC4899",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export function FeaturedCreators() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 280;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-8 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
            style={{ color: "var(--hw-text-primary)" }}
          >
            Featured Health Creators
          </motion.h2>

          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
                color: "var(--hw-text-secondary)",
              }}
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-150"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
                color: "var(--hw-text-secondary)",
              }}
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="-mx-4 flex gap-5 overflow-x-auto px-4 pb-4"
          style={{ scrollbarWidth: "none" }}
        >
          {creators.map((creator) => (
            <motion.div
              key={creator.name}
              variants={cardVariants}
              whileHover={{ scale: 1.04 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-[220px] shrink-0 cursor-pointer rounded-xl p-6 text-center"
              style={{
                backgroundColor: "var(--hw-surface)",
                border: "1px solid var(--hw-border)",
              }}
            >
              {/* Avatar placeholder */}
              <div
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-xl font-bold text-white font-[family-name:var(--font-display)]"
                style={{ backgroundColor: creator.color }}
              >
                {creator.initials}
              </div>

              {/* Name with badge */}
              <div className="mb-1 flex items-center justify-center gap-1.5">
                <h3
                  className="font-[family-name:var(--font-display)] text-sm font-semibold"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  {creator.name}
                </h3>
                <BadgeCheck
                  size={16}
                  style={{ color: "var(--hw-accent)" }}
                  className="shrink-0"
                />
              </div>

              {/* Specialty */}
              <p
                className="mb-3 text-xs font-[family-name:var(--font-body)]"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {creator.specialty}
              </p>

              {/* Credential badge */}
              <span
                className="inline-block rounded-full px-3 py-1 text-xs font-medium font-[family-name:var(--font-display)]"
                style={{
                  backgroundColor: "var(--hw-surface-secondary)",
                  color: "var(--hw-text-secondary)",
                  border: "1px solid var(--hw-border)",
                }}
              >
                {creator.credential}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
