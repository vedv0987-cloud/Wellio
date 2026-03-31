"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Modal } from "@/components/ui/Modal";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface Condition {
  name: string;
  slug: string;
  category?: string;
  overview?: string;
}

const sampleConditions: Record<string, Condition[]> = {
  A: [
    { name: "Asthma", slug: "asthma", category: "Respiratory", overview: "A chronic condition that affects the airways in the lungs, causing wheezing, breathlessness, chest tightness, and coughing." },
    { name: "Anxiety Disorders", slug: "anxiety-disorders", category: "Mental Health", overview: "A group of mental health conditions characterized by excessive worry, fear, and related behavioral disturbances." },
    { name: "Arthritis", slug: "arthritis", category: "Musculoskeletal", overview: "Inflammation of one or more joints, causing pain and stiffness that can worsen with age." },
    { name: "Anemia", slug: "anemia", category: "Blood", overview: "A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues." },
    { name: "Allergies", slug: "allergies", category: "Immunology", overview: "An immune system response to a foreign substance that is not typically harmful to your body." },
  ],
  B: [
    { name: "Back Pain", slug: "back-pain", category: "Musculoskeletal", overview: "One of the most common reasons for missed work and doctor visits, ranging from a dull ache to sharp, debilitating pain." },
    { name: "Bronchitis", slug: "bronchitis", category: "Respiratory", overview: "Inflammation of the lining of the bronchial tubes, which carry air to and from the lungs." },
    { name: "Bipolar Disorder", slug: "bipolar-disorder", category: "Mental Health", overview: "A mental health condition marked by extreme mood swings including emotional highs (mania) and lows (depression)." },
    { name: "Blood Pressure", slug: "blood-pressure", category: "Cardiovascular", overview: "The force of blood pushing against artery walls. High blood pressure can lead to serious health problems over time." },
  ],
  C: [
    { name: "COVID-19", slug: "covid-19", category: "Infectious Disease", overview: "A respiratory illness caused by the SARS-CoV-2 virus, ranging from mild symptoms to severe pneumonia." },
    { name: "COPD", slug: "copd", category: "Respiratory", overview: "Chronic obstructive pulmonary disease is a group of lung diseases that block airflow and make it difficult to breathe." },
    { name: "Celiac Disease", slug: "celiac-disease", category: "Digestive", overview: "An immune reaction to eating gluten that damages the lining of the small intestine over time." },
    { name: "Chronic Fatigue Syndrome", slug: "chronic-fatigue-syndrome", category: "General", overview: "A complex disorder characterized by extreme fatigue that cannot be explained by any underlying medical condition." },
  ],
  D: [
    { name: "Diabetes", slug: "diabetes", category: "Endocrine", overview: "A group of metabolic diseases characterized by high blood sugar levels over a prolonged period." },
    { name: "Depression", slug: "depression", category: "Mental Health", overview: "A mood disorder that causes a persistent feeling of sadness and loss of interest in daily activities." },
    { name: "Dermatitis", slug: "dermatitis", category: "Dermatology", overview: "A general term for conditions that cause inflammation of the skin, including redness, swelling, and itching." },
    { name: "Dementia", slug: "dementia", category: "Neurology", overview: "A decline in mental ability severe enough to interfere with daily life, affecting memory, thinking, and social skills." },
  ],
  H: [
    { name: "Hypertension", slug: "hypertension", category: "Cardiovascular", overview: "A common condition where the long-term force of blood against artery walls is high enough to cause health problems." },
    { name: "Heart Disease", slug: "heart-disease", category: "Cardiovascular", overview: "A range of conditions that affect the heart, including coronary artery disease, arrhythmias, and heart defects." },
    { name: "Hepatitis", slug: "hepatitis", category: "Gastroenterology", overview: "Inflammation of the liver, most commonly caused by a viral infection but also by toxins, medications, and autoimmune conditions." },
    { name: "Hypothyroidism", slug: "hypothyroidism", category: "Endocrine", overview: "A condition in which the thyroid gland does not produce enough thyroid hormones, slowing metabolism." },
  ],
  T: [
    { name: "Thyroid Disorders", slug: "thyroid-disorders", category: "Endocrine", overview: "Conditions that affect the thyroid gland, a butterfly-shaped gland in the neck that controls metabolism." },
    { name: "Tinnitus", slug: "tinnitus", category: "ENT", overview: "The perception of noise or ringing in the ears, affecting roughly 15-20% of people." },
    { name: "Tuberculosis", slug: "tuberculosis", category: "Infectious Disease", overview: "A potentially serious infectious disease that mainly affects the lungs, caused by Mycobacterium tuberculosis." },
    { name: "Type 2 Diabetes", slug: "type-2-diabetes", category: "Endocrine", overview: "A chronic condition that affects the way the body processes blood sugar (glucose), often related to lifestyle factors." },
  ],
};

export function HealthAZPreview() {
  const [activeLetter, setActiveLetter] = useState("A");
  const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);
  const conditions = sampleConditions[activeLetter] ?? [];

  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold md:text-3xl"
          style={{ color: "var(--hw-text-primary)" }}
        >
          Health A-Z Quick Browse
        </motion.h2>

        {/* Alphabet strip */}
        <div className="mb-8 flex flex-wrap gap-1.5">
          {alphabet.map((letter) => {
            const isActive = activeLetter === letter;
            const hasData = letter in sampleConditions;
            return (
              <button
                key={letter}
                onClick={() => setActiveLetter(letter)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-150 font-[family-name:var(--font-display)]"
                style={{
                  backgroundColor: isActive
                    ? "var(--hw-accent)"
                    : "var(--hw-surface-secondary)",
                  color: isActive ? "#fff" : hasData ? "var(--hw-text-primary)" : "var(--hw-text-muted)",
                  border: isActive ? "none" : "1px solid var(--hw-border)",
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Conditions list */}
        <div
          className="min-h-[120px] rounded-xl p-6"
          style={{
            backgroundColor: "var(--hw-surface)",
            border: "1px solid var(--hw-border)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLetter}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.25 }}
            >
              {conditions.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {conditions.map((condition) => (
                    <button
                      key={condition.slug}
                      onClick={() => setSelectedCondition(condition)}
                      className="group flex items-center gap-2 rounded-lg px-4 py-3 text-left transition-colors duration-150 hover:ring-2 hover:ring-[var(--hw-accent)]/30"
                      style={{
                        backgroundColor: "var(--hw-surface-secondary)",
                      }}
                    >
                      <span
                        className="h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: "var(--hw-accent)" }}
                      />
                      <span
                        className="text-sm font-medium font-[family-name:var(--font-body)] transition-colors duration-150 group-hover:text-[var(--hw-accent)]"
                        style={{ color: "var(--hw-text-primary)" }}
                      >
                        {condition.name}
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <p
                  className="py-4 text-center text-sm font-[family-name:var(--font-body)]"
                  style={{ color: "var(--hw-text-muted)" }}
                >
                  No conditions available for &ldquo;{activeLetter}&rdquo; yet.{" "}
                  <Link
                    href="/health-a-z"
                    className="underline"
                    style={{ color: "var(--hw-accent)" }}
                  >
                    Browse all conditions
                  </Link>
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 text-right">
          <Link
            href="/health-a-z"
            className="text-sm font-medium font-[family-name:var(--font-display)] transition-colors duration-150"
            style={{ color: "var(--hw-accent)" }}
          >
            View all conditions &rarr;
          </Link>
        </div>
      </div>

      {/* Condition detail modal */}
      <Modal
        isOpen={!!selectedCondition}
        onClose={() => setSelectedCondition(null)}
        title={selectedCondition?.name ?? ""}
      >
        {selectedCondition && (
          <div className="space-y-6">
            {/* Name + category badge */}
            <div className="flex items-center gap-3">
              <h3
                className="font-[family-name:var(--font-display)] text-xl font-bold"
                style={{ color: "var(--hw-text-primary)" }}
              >
                {selectedCondition.name}
              </h3>
              {selectedCondition.category && (
                <span
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: "rgba(13,148,136,0.1)",
                    color: "var(--hw-accent)",
                  }}
                >
                  {selectedCondition.category}
                </span>
              )}
            </div>

            {/* Overview */}
            {selectedCondition.overview && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                {selectedCondition.overview}
              </p>
            )}

            {/* CTA */}
            <Link
              href={`/health-a-z/${selectedCondition.slug}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-opacity duration-150 font-[family-name:var(--font-display)] hover:opacity-90"
              style={{ backgroundColor: "var(--hw-accent)" }}
            >
              View Full Details
              <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </Modal>
    </section>
  );
}
