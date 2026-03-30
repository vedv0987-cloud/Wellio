"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, ChevronDown, BookOpen } from "lucide-react";

interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation: string;
  definition: string;
  detailedExplanation: string;
}

const glossaryTerms: GlossaryTerm[] = [
  {
    id: "anemia",
    term: "Anemia",
    pronunciation: "uh-NEE-mee-uh",
    definition: "A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues, often causing fatigue and weakness.",
    detailedExplanation: "Anemia occurs when the number of red blood cells or hemoglobin concentration is lower than normal, meaning less oxygen reaches your organs and tissues. Common causes include iron deficiency, vitamin B12 deficiency, chronic diseases, and blood loss. It is diagnosed through a Complete Blood Count (CBC) test and treatment depends on the underlying cause.",
  },
  {
    id: "antibiotic",
    term: "Antibiotic",
    pronunciation: "an-tee-bye-OT-ik",
    definition: "A type of medicine that kills or stops the growth of bacteria to treat bacterial infections. Antibiotics do not work against viruses like the common cold or flu.",
    detailedExplanation: "Antibiotics work by either killing bacteria (bactericidal) or preventing them from reproducing (bacteriostatic). Common examples include amoxicillin, azithromycin, and ciprofloxacin. Overuse and misuse has led to antibiotic resistance, where bacteria evolve to survive these medications. Always complete the full prescribed course even if you feel better.",
  },
  {
    id: "artery",
    term: "Artery",
    pronunciation: "AR-tuh-ree",
    definition: "A blood vessel that carries oxygen-rich blood away from the heart to all parts of the body. Arteries have thick, muscular walls to handle high-pressure blood flow.",
    detailedExplanation: "The largest artery is the aorta, which connects directly to the heart. Over time, arteries can become narrowed or blocked by plaque buildup, a condition called atherosclerosis, which increases the risk of heart attack and stroke. Keeping cholesterol and blood pressure in check helps protect artery health.",
  },
  {
    id: "biopsy",
    term: "Biopsy",
    pronunciation: "BYE-op-see",
    definition: "A medical procedure where a small sample of tissue is removed from the body and examined under a microscope to check for disease, especially cancer.",
    detailedExplanation: "Biopsies can be performed as needle biopsy, incisional biopsy (removing part of tissue), excisional biopsy (removing the entire lump), or endoscopic biopsy. The tissue sample is sent to a pathologist who examines it under a microscope. Results typically take 3-7 days and are often critical for guiding treatment decisions.",
  },
  {
    id: "bmi",
    term: "BMI",
    pronunciation: "bee-em-EYE",
    definition: "Body Mass Index -- a number calculated from your weight and height used to screen for weight categories: underweight, normal weight, overweight, or obese.",
    detailedExplanation: "BMI is calculated by dividing weight in kilograms by height in meters squared. While widely used, it has limitations because it does not distinguish between muscle mass and fat mass, nor does it account for fat distribution. For Asian populations, health risks may begin at lower BMI values than for Western populations.",
  },
  {
    id: "carcinogen",
    term: "Carcinogen",
    pronunciation: "kar-SIN-oh-jen",
    definition: "Any substance or exposure that can cause cancer by damaging DNA or disrupting normal cellular processes. Examples include tobacco smoke, asbestos, and UV radiation.",
    detailedExplanation: "Carcinogens do not always cause cancer -- the risk depends on the amount and duration of exposure, genetic factors, and other variables. They are classified by agencies like the WHO's IARC into groups based on strength of evidence. Reducing exposure to known carcinogens is one of the most effective ways to lower cancer risk.",
  },
  {
    id: "cholesterol",
    term: "Cholesterol",
    pronunciation: "koh-LES-tuh-rawl",
    definition: "A waxy, fat-like substance found in your blood. Your body needs some cholesterol to build cells, but too much can build up in arteries and increase heart disease risk.",
    detailedExplanation: "Cholesterol travels through blood in lipoproteins. LDL (low-density lipoprotein) is 'bad' cholesterol that builds up in artery walls. HDL (high-density lipoprotein) is 'good' cholesterol that helps remove LDL. High LDL levels lead to atherosclerosis, increasing heart attack and stroke risk. Managed through diet, exercise, and medications like statins.",
  },
  {
    id: "chronic",
    term: "Chronic",
    pronunciation: "KRON-ik",
    definition: "Describes a health condition that persists for a long time, typically lasting 3 months or more, and often cannot be cured completely but can be managed.",
    detailedExplanation: "Chronic conditions develop gradually and persist over time, often for the rest of a person's life. Examples include diabetes, hypertension, asthma, and arthritis. Chronic diseases are the leading cause of death and disability worldwide. Management typically involves ongoing medication, lifestyle changes, and regular monitoring.",
  },
  {
    id: "ct-scan",
    term: "CT Scan",
    pronunciation: "see-tee skan",
    definition: "Computed Tomography -- an imaging test that uses X-rays from many angles and computer processing to create detailed cross-sectional images of the body.",
    detailedExplanation: "CT scans are more detailed than regular X-rays and can show bones, soft tissues, and blood vessels clearly. They are commonly used to diagnose injuries, cancers, infections, and internal bleeding. Some CT scans require a contrast dye to be injected or swallowed to enhance image clarity. The scan itself takes only a few minutes.",
  },
  {
    id: "diagnosis",
    term: "Diagnosis",
    pronunciation: "dye-ig-NOH-sis",
    definition: "The identification of a disease or condition based on a patient's symptoms, medical history, physical examination, and test results.",
    detailedExplanation: "A differential diagnosis is a list of possible conditions that could explain the symptoms, which is narrowed down through further testing. Accurate diagnosis is critical because it guides the treatment plan. Sometimes multiple tests and specialist consultations are needed before a definitive diagnosis can be made.",
  },
  {
    id: "ecg",
    term: "ECG",
    pronunciation: "ee-see-jee",
    definition: "Electrocardiogram -- a quick, painless test that records the electrical activity of your heart to detect rhythm problems, heart attacks, and other cardiac conditions.",
    detailedExplanation: "Small electrode patches placed on the chest, arms, and legs detect electrical signals that make the heart beat. The test takes only 5-10 minutes and produces a graph of waves that doctors interpret. ECG is often the first test done when heart disease is suspected and is routinely performed before surgeries.",
  },
  {
    id: "edema",
    term: "Edema",
    pronunciation: "ih-DEE-muh",
    definition: "Swelling caused by excess fluid trapped in your body's tissues, most commonly occurring in the feet, ankles, and legs.",
    detailedExplanation: "Edema can be caused by prolonged sitting or standing, high salt intake, heart failure, kidney disease, liver cirrhosis, and certain medications. Pitting edema is when pressing on the swollen area leaves a dimple. Treatment depends on the cause and may include reducing salt intake, elevating the affected limb, and diuretic medications.",
  },
  {
    id: "glucose",
    term: "Glucose",
    pronunciation: "GLOO-kohs",
    definition: "A type of sugar that is the body's primary source of energy, produced from the food you eat and carried through the bloodstream to cells.",
    detailedExplanation: "After eating, blood glucose levels rise, triggering the pancreas to release insulin, which helps cells absorb glucose for energy. Normal fasting blood glucose is 70-99 mg/dL. Consistently high glucose levels indicate diabetes, while very low levels (hypoglycemia) can cause shakiness, confusion, and loss of consciousness.",
  },
  {
    id: "hemoglobin",
    term: "Hemoglobin",
    pronunciation: "HEE-muh-gloh-bin",
    definition: "A protein in red blood cells that carries oxygen from the lungs to the rest of the body and returns carbon dioxide back to the lungs.",
    detailedExplanation: "Hemoglobin is an iron-containing protein that gives blood its red color. Normal levels are 13.5-17.5 g/dL for men and 12-16 g/dL for women. Low hemoglobin indicates anemia. HbA1c (glycated hemoglobin) measures how much glucose is attached to hemoglobin over 2-3 months and is used to monitor diabetes control.",
  },
  {
    id: "hypertension",
    term: "Hypertension",
    pronunciation: "hy-per-TEN-shun",
    definition: "High blood pressure -- a chronic condition where the force of blood against your artery walls is consistently too high, increasing the risk of heart disease and stroke.",
    detailedExplanation: "Blood pressure is recorded as systolic over diastolic; normal is below 120/80 mmHg. Hypertension is called the 'silent killer' because it usually has no symptoms. About 30% of adults worldwide have hypertension. It is managed through lifestyle changes like reducing salt and regular exercise, along with medications such as ACE inhibitors.",
  },
  {
    id: "immunity",
    term: "Immunity",
    pronunciation: "ih-MYOO-nuh-tee",
    definition: "The body's ability to resist or fight off infections and diseases through its immune system, which includes white blood cells, antibodies, and other defenses.",
    detailedExplanation: "Immunity can be innate (defenses you are born with) or adaptive (developed after exposure to pathogens or through vaccination). Vaccines train the immune system to recognize and fight specific pathogens without causing the disease. A weakened immune system, whether from illness or medication, makes a person more susceptible to infections.",
  },
  {
    id: "inflammation",
    term: "Inflammation",
    pronunciation: "in-fluh-MAY-shun",
    definition: "The body's natural immune response to injury, infection, or irritation, marked by redness, heat, swelling, and pain at the affected area.",
    detailedExplanation: "Acute inflammation is short-term and beneficial, helping fight infections and heal wounds. Chronic inflammation persists for months or years and is linked to heart disease, cancer, diabetes, and autoimmune diseases. Blood tests like CRP (C-reactive protein) and ESR measure inflammation levels. Anti-inflammatory treatments include NSAIDs and corticosteroids.",
  },
  {
    id: "insulin",
    term: "Insulin",
    pronunciation: "IN-suh-lin",
    definition: "A hormone produced by the pancreas that regulates blood sugar by helping cells absorb glucose from the bloodstream for energy.",
    detailedExplanation: "In Type 1 diabetes, the immune system destroys insulin-producing cells, requiring daily insulin injections. In Type 2 diabetes, cells become resistant to insulin's effects. Insulin resistance is also linked to obesity, PCOS, and metabolic syndrome. Insulin therapy is available as rapid-acting, short-acting, intermediate, and long-acting formulations.",
  },
  {
    id: "jaundice",
    term: "Jaundice",
    pronunciation: "JAWN-dis",
    definition: "A condition causing yellowing of the skin and whites of the eyes, due to a buildup of bilirubin, a yellow pigment from normal red blood cell breakdown.",
    detailedExplanation: "Jaundice is a sign of an underlying condition affecting the liver, bile ducts, or red blood cells. Common causes include hepatitis, gallstones, and liver cirrhosis. In newborns, jaundice is very common and usually resolves on its own, but severe cases may need phototherapy. Adults with jaundice should be evaluated promptly.",
  },
  {
    id: "lipids",
    term: "Lipids",
    pronunciation: "LIP-idz",
    definition: "A group of fats and fat-like substances in your blood, including cholesterol and triglycerides, essential for cell structure and energy but harmful in excess.",
    detailedExplanation: "A lipid profile blood test measures total cholesterol, LDL, HDL, and triglycerides. High lipid levels (hyperlipidemia) significantly increase the risk of atherosclerosis, heart attack, and stroke. Managing lipid levels through diet, exercise, and medications like statins is a cornerstone of cardiovascular disease prevention.",
  },
  {
    id: "mri",
    term: "MRI",
    pronunciation: "em-ar-eye",
    definition: "Magnetic Resonance Imaging -- a test that uses powerful magnets and radio waves to create detailed images of organs and structures inside the body without radiation.",
    detailedExplanation: "MRI is particularly useful for imaging soft tissues like the brain, spinal cord, muscles, and joints. The test requires lying inside a large tube-shaped machine for 15-90 minutes. Some patients receive a contrast agent (gadolinium) for enhanced imaging. MRI is not suitable for patients with certain metal implants or pacemakers.",
  },
  {
    id: "metabolism",
    term: "Metabolism",
    pronunciation: "meh-TAB-uh-liz-um",
    definition: "The chemical processes in your body that convert food into energy, build and repair tissues, and eliminate waste products.",
    detailedExplanation: "Basal Metabolic Rate (BMR) is the energy your body needs at rest for basic functions like breathing and circulation. Metabolic rate is influenced by age, sex, muscle mass, thyroid function, and genetics. Metabolic disorders include diabetes, thyroid diseases, and metabolic syndrome, all of which disrupt these normal processes.",
  },
  {
    id: "neuropathy",
    term: "Neuropathy",
    pronunciation: "noo-ROP-uh-thee",
    definition: "Damage or dysfunction of one or more nerves, typically causing numbness, tingling, muscle weakness, and pain, usually in the hands and feet.",
    detailedExplanation: "The most common cause is diabetes (diabetic neuropathy), affecting up to 50% of diabetic patients. Other causes include vitamin B12 deficiency, alcohol abuse, autoimmune diseases, and certain medications. Symptoms typically start in the feet and hands. Treatment focuses on managing the underlying cause and relieving symptoms with medications.",
  },
  {
    id: "obesity",
    term: "Obesity",
    pronunciation: "oh-BEE-sih-tee",
    definition: "A medical condition characterized by excessive body fat accumulation that poses a risk to health, generally defined as having a BMI of 30 or higher.",
    detailedExplanation: "Obesity significantly increases the risk of type 2 diabetes, heart disease, stroke, certain cancers, and joint problems. It results from a complex interplay of genetic, environmental, behavioral, and metabolic factors. Treatment approaches include dietary changes, increased physical activity, behavioral therapy, medications, and in severe cases, bariatric surgery.",
  },
  {
    id: "platelets",
    term: "Platelets",
    pronunciation: "PLAYT-lets",
    definition: "Tiny blood cells that help your body form clots to stop bleeding when a blood vessel is damaged. They rush to the site and stick together to seal the wound.",
    detailedExplanation: "Normal platelet count is 150,000-400,000 per microliter. Low platelets (thrombocytopenia) cause easy bruising and excessive bleeding, while high platelets (thrombocytosis) increase clotting risk. Conditions affecting platelets include dengue fever, ITP, and leukemia. Antiplatelet drugs like aspirin are used to prevent clots in heart disease.",
  },
  {
    id: "prognosis",
    term: "Prognosis",
    pronunciation: "prog-NOH-sis",
    definition: "A medical prediction about the likely course and expected outcome of a disease or condition, including the chances of recovery.",
    detailedExplanation: "Factors affecting prognosis include the type and stage of disease, patient's age and overall health, available treatments, and how the body responds to treatment. Survival rates and remission rates are statistical tools used to describe prognosis. It is important to understand that a prognosis is a statistical estimate, not a guarantee for any individual.",
  },
  {
    id: "renal",
    term: "Renal",
    pronunciation: "REE-nul",
    definition: "Relating to the kidneys. Used in medical contexts such as 'renal function' (how well kidneys work) or 'renal failure' (when kidneys stop working properly).",
    detailedExplanation: "The kidneys filter about 200 liters of blood daily, removing waste and excess fluid as urine. Renal function is assessed through blood tests (creatinine, BUN, eGFR) and urine tests. Chronic renal disease is a progressive loss of kidney function that may eventually require dialysis or a kidney transplant if it reaches end-stage.",
  },
  {
    id: "stroke",
    term: "Stroke",
    pronunciation: "strohk",
    definition: "A medical emergency where blood supply to part of the brain is interrupted or reduced, depriving brain tissue of oxygen and nutrients. Brain cells begin dying within minutes.",
    detailedExplanation: "There are two main types: ischemic stroke (blood clot blocking a brain artery, about 85% of cases) and hemorrhagic stroke (blood vessel bursting in the brain). The FAST acronym helps recognize symptoms: Face drooping, Arm weakness, Speech difficulty, Time to call emergency services. Early treatment is critical for survival and recovery.",
  },
  {
    id: "thyroid",
    term: "Thyroid",
    pronunciation: "THY-royd",
    definition: "A butterfly-shaped gland in the front of the neck that produces hormones (T3 and T4) controlling metabolism, energy levels, heart rate, and body temperature.",
    detailedExplanation: "Hypothyroidism (underactive thyroid) causes fatigue, weight gain, and cold sensitivity, treated with synthetic thyroid hormone. Hyperthyroidism (overactive thyroid) causes weight loss, rapid heartbeat, and anxiety. Thyroid disorders are very common, especially in women, and are diagnosed through TSH and thyroid hormone blood tests.",
  },
  {
    id: "ultrasound",
    term: "Ultrasound",
    pronunciation: "UL-truh-sownd",
    definition: "An imaging technique that uses high-frequency sound waves to create real-time pictures of structures inside the body. It is safe, painless, and radiation-free.",
    detailedExplanation: "Ultrasound is commonly used to monitor pregnancy, examine abdominal organs, check the heart (echocardiogram), and guide needle biopsies. A transducer sends sound waves into the body and records the echoes to form images on a monitor. It is one of the most widely used diagnostic tools because of its safety and versatility.",
  },
];

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossaryPage() {
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const filtered = useMemo(() => {
    if (!search.trim()) return glossaryTerms;
    const q = search.toLowerCase();
    return glossaryTerms.filter(
      (t) =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        t.detailedExplanation.toLowerCase().includes(q)
    );
  }, [search]);

  const grouped = useMemo(() => {
    const map: Record<string, GlossaryTerm[]> = {};
    for (const term of filtered) {
      const letter = term.term.charAt(0).toUpperCase();
      if (!map[letter]) map[letter] = [];
      map[letter].push(term);
    }
    return map;
  }, [filtered]);

  const activeLetters = useMemo(() => new Set(Object.keys(grouped)), [grouped]);

  const scrollToLetter = (letter: string) => {
    const el = sectionRefs.current[letter];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--hw-bg)", color: "var(--hw-text-primary)" }}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            Health Glossary
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Medical terms in plain English
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-8"
        >
          <div
            className="relative flex items-center rounded-xl px-4 py-3 border"
            style={{
              backgroundColor: "var(--hw-surface)",
              borderColor: "var(--hw-border)",
            }}
          >
            <Search className="w-5 h-5 shrink-0" style={{ color: "var(--hw-text-secondary)" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search medical terms..."
              className="w-full ml-3 bg-transparent outline-none placeholder:opacity-50"
              style={{ color: "var(--hw-text-primary)" }}
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="ml-2 p-1 rounded-full hover:opacity-80 transition-opacity"
                style={{ color: "var(--hw-text-secondary)" }}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Sticky Alphabet Nav */}
        <div
          className="sticky top-0 z-20 py-3 mb-8 border-b backdrop-blur-sm"
          style={{
            backgroundColor: "color-mix(in srgb, var(--hw-bg) 85%, transparent)",
            borderColor: "var(--hw-border)",
          }}
        >
          <div className="flex overflow-x-auto scrollbar-none gap-1 justify-center">
            {ALPHABET.map((letter) => {
              const isActive = activeLetters.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => isActive && scrollToLetter(letter)}
                  disabled={!isActive}
                  className="w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 flex items-center justify-center shrink-0"
                  style={{
                    color: isActive ? "var(--hw-accent)" : "var(--hw-text-secondary)",
                    opacity: isActive ? 1 : 0.3,
                    cursor: isActive ? "pointer" : "default",
                  }}
                  onMouseEnter={(e) => {
                    if (isActive) {
                      e.currentTarget.style.backgroundColor = "var(--hw-surface-secondary)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Term Count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
            {filtered.length} term{filtered.length !== 1 ? "s" : ""} found
          </p>
        </div>

        {/* Glossary Terms */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--hw-text-secondary)", opacity: 0.5 }} />
            <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
              No terms found matching your search.
            </p>
          </div>
        ) : (
          ALPHABET.filter((l) => grouped[l]).map((letter) => (
            <div
              key={letter}
              ref={(el) => {
                sectionRefs.current[letter] = el;
              }}
              className="mb-8 scroll-mt-20"
            >
              <h2
                className="text-2xl font-bold mb-4 pb-2 border-b"
                style={{
                  color: "var(--hw-accent)",
                  borderColor: "var(--hw-border)",
                }}
              >
                {letter}
              </h2>
              <div className="space-y-2">
                {grouped[letter].map((term, idx) => {
                  const isExpanded = expandedId === term.id;

                  return (
                    <motion.div
                      key={term.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="rounded-xl border transition-all duration-200"
                      style={{
                        backgroundColor: "var(--hw-surface)",
                        borderColor: isExpanded ? "var(--hw-accent)" : "var(--hw-border)",
                      }}
                    >
                      <button
                        onClick={() => toggleExpand(term.id)}
                        className="w-full flex items-start gap-4 p-4 text-left cursor-pointer"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <h3 className="text-base font-bold">{term.term}</h3>
                            <span
                              className="text-sm italic"
                              style={{ color: "var(--hw-text-secondary)" }}
                            >
                              ({term.pronunciation})
                            </span>
                          </div>
                          <p
                            className="text-sm mt-1 leading-relaxed"
                            style={{ color: "var(--hw-text-secondary)" }}
                          >
                            {term.definition}
                          </p>
                        </div>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 mt-1 transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                          style={{ color: "var(--hw-text-secondary)" }}
                        />
                      </button>

                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div
                              className="px-4 pb-4 pt-0 border-t"
                              style={{ borderColor: "var(--hw-border)" }}
                            >
                              <div
                                className="mt-4 p-4 rounded-lg text-sm leading-relaxed"
                                style={{
                                  backgroundColor: "var(--hw-surface-secondary)",
                                  color: "var(--hw-text-secondary)",
                                }}
                              >
                                <h4
                                  className="text-xs font-semibold uppercase tracking-wide mb-2"
                                  style={{ color: "var(--hw-accent)" }}
                                >
                                  Detailed Explanation
                                </h4>
                                {term.detailedExplanation}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
