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
    definition: "A condition where you lack enough healthy red blood cells to carry adequate oxygen to your body's tissues.",
    detailedExplanation: "Anemia occurs when the number of red blood cells or the hemoglobin concentration within them is lower than normal. This means less oxygen reaches your organs and tissues, causing fatigue, weakness, pale skin, and shortness of breath. Common causes include iron deficiency, vitamin B12 deficiency, chronic diseases, and blood loss. It is diagnosed through a Complete Blood Count (CBC) test and treatment depends on the underlying cause.",
  },
  {
    id: "antibiotic",
    term: "Antibiotic",
    pronunciation: "an-tee-bye-OT-ik",
    definition: "A type of medicine that kills or stops the growth of bacteria to treat bacterial infections.",
    detailedExplanation: "Antibiotics work by either killing bacteria (bactericidal) or preventing them from reproducing (bacteriostatic). They are effective only against bacterial infections, not viral ones like colds or flu. Common examples include amoxicillin, azithromycin, and ciprofloxacin. Overuse and misuse of antibiotics has led to antibiotic resistance, where bacteria evolve to survive these medications. Always complete the full prescribed course even if you feel better.",
  },
  {
    id: "benign",
    term: "Benign",
    pronunciation: "bih-NINE",
    definition: "Not cancerous. A benign tumor does not spread to other parts of the body.",
    detailedExplanation: "In medicine, benign describes a condition or growth that is not harmful in effect. A benign tumor grows slowly, does not invade nearby tissues, and does not metastasize (spread) to other parts of the body. While benign tumors are not cancer, they can sometimes cause problems by pressing on nearby organs or nerves. They may need to be removed if they cause symptoms. The opposite of benign is malignant.",
  },
  {
    id: "biopsy",
    term: "Biopsy",
    pronunciation: "BYE-op-see",
    definition: "A medical procedure where a small sample of tissue is removed from the body for examination under a microscope.",
    detailedExplanation: "Biopsies are performed to determine whether a lump, growth, or area of concern is cancerous or due to another condition. Types include needle biopsy, incisional biopsy (removing part of the tissue), excisional biopsy (removing the entire lump), and endoscopic biopsy. The tissue sample is sent to a pathologist who examines it under a microscope to make a diagnosis. Results typically take 3-7 days.",
  },
  {
    id: "chronic",
    term: "Chronic",
    pronunciation: "KRON-ik",
    definition: "A health condition that persists for a long time, typically lasting 3 months or more.",
    detailedExplanation: "Chronic conditions develop gradually and persist over time, often for the rest of a person's life. They differ from acute conditions, which come on suddenly and are short-lived. Examples include diabetes, hypertension, asthma, arthritis, and heart disease. Chronic diseases are the leading cause of death and disability worldwide. Management typically involves ongoing medication, lifestyle changes, and regular monitoring rather than a cure.",
  },
  {
    id: "cholesterol",
    term: "Cholesterol",
    pronunciation: "koh-LES-tuh-rawl",
    definition: "A waxy, fat-like substance found in your blood. Your body needs it, but too much can build up in arteries.",
    detailedExplanation: "Cholesterol is essential for building cell membranes, making hormones, and producing vitamin D. It travels through blood in particles called lipoproteins. LDL (low-density lipoprotein) is 'bad' cholesterol that builds up in artery walls. HDL (high-density lipoprotein) is 'good' cholesterol that helps remove LDL. High LDL levels lead to atherosclerosis (plaque buildup), increasing heart attack and stroke risk. Managed through diet, exercise, and medications like statins.",
  },
  {
    id: "diagnosis",
    term: "Diagnosis",
    pronunciation: "dye-ig-NOH-sis",
    definition: "The identification of a disease or condition based on a patient's symptoms, medical history, and test results.",
    detailedExplanation: "Diagnosis is the process doctors use to determine what is causing a patient's symptoms. It involves taking a medical history, performing a physical examination, and ordering diagnostic tests (blood tests, imaging, biopsies). A differential diagnosis is a list of possible conditions that could explain the symptoms. Accurate diagnosis is critical because it guides the treatment plan. Sometimes multiple tests are needed before a definitive diagnosis can be made.",
  },
  {
    id: "edema",
    term: "Edema",
    pronunciation: "ih-DEE-muh",
    definition: "Swelling caused by excess fluid trapped in your body's tissues, commonly in the feet, ankles, and legs.",
    detailedExplanation: "Edema occurs when small blood vessels leak fluid into surrounding tissues. Causes include sitting or standing for long periods, consuming too much salt, heart failure, kidney disease, liver cirrhosis, and certain medications. Pitting edema is when pressing on the swollen area leaves a dimple. Treatment depends on the cause and may include reducing salt intake, elevating the affected limb, compression stockings, and diuretic medications.",
  },
  {
    id: "embolism",
    term: "Embolism",
    pronunciation: "EM-buh-liz-um",
    definition: "A blockage in a blood vessel caused by a blood clot, air bubble, or other material that has traveled through the bloodstream.",
    detailedExplanation: "An embolism occurs when a substance (usually a blood clot) breaks loose from where it formed and travels through the bloodstream until it gets stuck in a smaller vessel, blocking blood flow. A pulmonary embolism (PE) is a blockage in the lung arteries and can be life-threatening. Risk factors include surgery, prolonged immobility, cancer, and certain genetic conditions. Symptoms include sudden shortness of breath, chest pain, and rapid heart rate. Treatment typically involves blood thinners.",
  },
  {
    id: "glucose",
    term: "Glucose",
    pronunciation: "GLOO-kohs",
    definition: "A type of sugar that is the body's primary source of energy, carried through the bloodstream to cells.",
    detailedExplanation: "Glucose comes from the foods you eat, primarily carbohydrates. After eating, blood glucose levels rise, triggering the pancreas to release insulin, which helps cells absorb glucose for energy. Normal fasting blood glucose is 70-99 mg/dL. Consistently high glucose levels (hyperglycemia) indicate diabetes. Very low levels (hypoglycemia) can cause shakiness, confusion, and even loss of consciousness. Monitoring glucose is essential for diabetes management.",
  },
  {
    id: "hemoglobin",
    term: "Hemoglobin",
    pronunciation: "HEE-muh-gloh-bin",
    definition: "A protein in red blood cells that carries oxygen from the lungs to the rest of the body and returns carbon dioxide.",
    detailedExplanation: "Hemoglobin is an iron-containing protein that gives blood its red color. Each red blood cell contains about 270 million hemoglobin molecules. Normal levels are 13.5-17.5 g/dL for men and 12-16 g/dL for women. Low hemoglobin indicates anemia. HbA1c (glycated hemoglobin) measures how much glucose is attached to hemoglobin over 2-3 months, used to monitor diabetes. Abnormal hemoglobin variants can cause conditions like sickle cell disease.",
  },
  {
    id: "hypertension",
    term: "Hypertension",
    pronunciation: "hy-per-TEN-shun",
    definition: "Abnormally high blood pressure, where the force of blood against artery walls is consistently too high.",
    detailedExplanation: "Hypertension is diagnosed when blood pressure consistently reads 130/80 mmHg or higher. It is called the 'silent killer' because it usually has no symptoms but significantly increases the risk of heart attack, stroke, kidney disease, and vision loss. About 30% of adults worldwide have hypertension. It is managed through lifestyle changes (reducing salt, regular exercise, maintaining healthy weight) and medications like ACE inhibitors, ARBs, and calcium channel blockers.",
  },
  {
    id: "inflammation",
    term: "Inflammation",
    pronunciation: "in-fluh-MAY-shun",
    definition: "The body's natural immune response to injury, infection, or irritation, marked by redness, heat, swelling, and pain.",
    detailedExplanation: "Inflammation is a protective mechanism where white blood cells and chemicals in the body fight off infections and repair damaged tissue. Acute inflammation is short-term and beneficial (like swelling after a sprain). Chronic inflammation persists for months or years and is linked to conditions like heart disease, cancer, diabetes, and autoimmune diseases. Anti-inflammatory treatments include NSAIDs (ibuprofen), corticosteroids, and lifestyle changes like anti-inflammatory diets.",
  },
  {
    id: "insulin",
    term: "Insulin",
    pronunciation: "IN-suh-lin",
    definition: "A hormone produced by the pancreas that regulates blood sugar by helping cells absorb glucose for energy.",
    detailedExplanation: "Insulin acts like a key that unlocks cells so glucose can enter. In Type 1 diabetes, the immune system destroys insulin-producing cells, requiring insulin injections. In Type 2 diabetes, cells become resistant to insulin. The pancreas tries to compensate by producing more insulin but eventually cannot keep up. Insulin resistance is also linked to obesity, PCOS, and metabolic syndrome. Insulin therapy is available as rapid-acting, short-acting, intermediate, and long-acting formulations.",
  },
  {
    id: "malignant",
    term: "Malignant",
    pronunciation: "muh-LIG-nunt",
    definition: "Cancerous. A malignant tumor can invade nearby tissues and spread to other parts of the body.",
    detailedExplanation: "Malignant tumors are composed of cancer cells that grow uncontrollably, invade surrounding tissues, and can spread (metastasize) to distant parts of the body through the blood or lymphatic system. They differ from benign tumors in their ability to invade and spread. Malignant tumors are graded by how abnormal the cells look and staged by how far the cancer has spread. Treatment may include surgery, chemotherapy, radiation, immunotherapy, or targeted therapy.",
  },
  {
    id: "metabolism",
    term: "Metabolism",
    pronunciation: "meh-TAB-uh-liz-um",
    definition: "The chemical processes in your body that convert food into energy and building materials for cells.",
    detailedExplanation: "Metabolism includes all chemical reactions in the body that maintain life. Catabolism breaks down molecules for energy (like digesting food). Anabolism uses energy to build complex molecules (like proteins and DNA). Basal Metabolic Rate (BMR) is the energy your body needs at rest. Metabolic rate is influenced by age, sex, muscle mass, thyroid function, and genetics. Metabolic disorders include diabetes, thyroid diseases, and metabolic syndrome.",
  },
  {
    id: "neuropathy",
    term: "Neuropathy",
    pronunciation: "noo-ROP-uh-thee",
    definition: "Damage or dysfunction of one or more nerves, causing numbness, tingling, muscle weakness, and pain.",
    detailedExplanation: "Peripheral neuropathy affects nerves outside the brain and spinal cord. The most common cause is diabetes (diabetic neuropathy), affecting up to 50% of diabetic patients. Other causes include vitamin B12 deficiency, alcohol abuse, autoimmune diseases, and certain medications. Symptoms typically start in the feet and hands (stocking-glove pattern). Treatment focuses on managing the underlying cause, pain relief, and preventing further nerve damage. Early detection and blood sugar control are key for diabetic neuropathy.",
  },
  {
    id: "oncology",
    term: "Oncology",
    pronunciation: "on-KOL-uh-jee",
    definition: "The branch of medicine that specializes in the diagnosis, treatment, and prevention of cancer.",
    detailedExplanation: "Oncologists are doctors who specialize in treating cancer. Medical oncologists use chemotherapy, immunotherapy, and targeted therapy. Surgical oncologists remove tumors through surgery. Radiation oncologists use radiation to treat cancer. Oncology encompasses understanding cancer biology, developing new treatments, managing side effects, and providing palliative care. Major advances include immunotherapy, precision medicine, and early detection methods.",
  },
  {
    id: "pathology",
    term: "Pathology",
    pronunciation: "puh-THOL-uh-jee",
    definition: "The branch of medicine that studies the causes and effects of diseases, especially through examination of body tissues and fluids.",
    detailedExplanation: "Pathologists are doctors who examine tissue samples, blood, and other body fluids to diagnose diseases. They play a critical role in cancer diagnosis by examining biopsy specimens. Clinical pathology covers laboratory tests on blood and body fluids. Anatomical pathology involves examining tissues and organs. A pathology report provides crucial information about the nature and extent of disease, guiding treatment decisions. Most diagnoses require pathological confirmation.",
  },
  {
    id: "platelets",
    term: "Platelets",
    pronunciation: "PLAYT-lets",
    definition: "Tiny blood cells that help your body form clots to stop bleeding when you get a cut or wound.",
    detailedExplanation: "Platelets (thrombocytes) are made in the bone marrow and circulate in the blood. Normal count is 150,000-400,000 per microliter. Low platelets (thrombocytopenia) can cause easy bruising and excessive bleeding. High platelets (thrombocytosis) can increase clotting risk. Conditions affecting platelets include dengue fever, ITP (immune thrombocytopenia), and leukemia. Antiplatelet drugs like aspirin and clopidogrel are used to prevent blood clots in heart disease.",
  },
  {
    id: "prognosis",
    term: "Prognosis",
    pronunciation: "prog-NOH-sis",
    definition: "The likely course and expected outcome of a disease or condition, including the chance of recovery.",
    detailedExplanation: "Prognosis is a medical prediction about how a disease will progress and the likelihood of recovery. Factors affecting prognosis include the type and stage of disease, patient's age and overall health, available treatments, and how the body responds to treatment. A 'good prognosis' means high chance of recovery. A 'poor prognosis' suggests the disease may worsen. Survival rates and remission rates are statistical tools used to describe prognosis for groups of patients.",
  },
  {
    id: "remission",
    term: "Remission",
    pronunciation: "rih-MISH-un",
    definition: "A period when the signs and symptoms of a disease are reduced or disappear, either partially or completely.",
    detailedExplanation: "In cancer, complete remission means no detectable signs of cancer on tests and scans. Partial remission means the cancer has shrunk but has not completely disappeared. Remission does not always mean cure - the disease may return (relapse). In autoimmune diseases, remission means reduced inflammation and symptoms. Achieving and maintaining remission is often the primary goal of treatment in chronic conditions.",
  },
  {
    id: "sepsis",
    term: "Sepsis",
    pronunciation: "SEP-sis",
    definition: "A life-threatening condition where the body's response to an infection injures its own tissues and organs.",
    detailedExplanation: "Sepsis occurs when chemicals released by the immune system to fight infection trigger widespread inflammation throughout the body. This can lead to organ damage, organ failure, and death. Septic shock is the most severe stage, with dangerously low blood pressure. Symptoms include high fever or low temperature, rapid heart rate, rapid breathing, and confusion. Sepsis is a medical emergency requiring immediate hospital treatment with IV antibiotics and fluids. Early detection saves lives.",
  },
  {
    id: "steroid",
    term: "Steroid",
    pronunciation: "STAIR-oyd",
    definition: "A class of hormones or medications that reduce inflammation and suppress the immune system.",
    detailedExplanation: "Corticosteroids (like prednisone and dexamethasone) are anti-inflammatory medications used to treat asthma, allergies, autoimmune diseases, and many other conditions. They differ from anabolic steroids used for muscle building. Side effects of long-term corticosteroid use include weight gain, high blood sugar, osteoporosis, weakened immune system, and mood changes. They should not be stopped abruptly after prolonged use as the body needs time to resume natural cortisol production.",
  },
  {
    id: "thyroid",
    term: "Thyroid",
    pronunciation: "THY-royd",
    definition: "A butterfly-shaped gland in the neck that produces hormones controlling metabolism, growth, and body temperature.",
    detailedExplanation: "The thyroid gland produces T3 and T4 hormones, regulated by TSH from the pituitary gland. Hypothyroidism (underactive thyroid) causes fatigue, weight gain, cold sensitivity, and depression. Hyperthyroidism (overactive thyroid) causes weight loss, rapid heartbeat, anxiety, and tremors. Thyroid disorders are diagnosed with blood tests (TSH, T3, T4). Treatment includes synthetic thyroid hormone (levothyroxine) for hypothyroidism and anti-thyroid drugs or radioactive iodine for hyperthyroidism.",
  },
  {
    id: "ultrasound",
    term: "Ultrasound",
    pronunciation: "UL-truh-sownd",
    definition: "A medical imaging technique that uses sound waves to create pictures of the inside of your body.",
    detailedExplanation: "Ultrasound (sonography) uses high-frequency sound waves that bounce off body structures to create real-time images. It is non-invasive, painless, and does not use radiation, making it safe even during pregnancy. Common uses include monitoring pregnancy, examining abdominal organs, checking the heart (echocardiogram), and guiding biopsies. A transducer (probe) sends sound waves through a gel applied to the skin. The reflected waves create images on a monitor.",
  },
  {
    id: "vaccine",
    term: "Vaccine",
    pronunciation: "vak-SEEN",
    definition: "A substance that stimulates the immune system to produce antibodies and protect against a specific disease.",
    detailedExplanation: "Vaccines contain weakened or inactive parts of a pathogen (virus or bacteria) that trigger an immune response without causing the disease. This trains the immune system to recognize and fight the actual pathogen if encountered later. Types include live attenuated (MMR), inactivated (flu shot), subunit (hepatitis B), toxoid (tetanus), and mRNA (COVID-19). Vaccines have eradicated smallpox and nearly eliminated polio. Herd immunity occurs when enough people are vaccinated to protect the community.",
  },
  {
    id: "vertigo",
    term: "Vertigo",
    pronunciation: "VUR-tih-go",
    definition: "A sensation of spinning or dizziness where you feel the world is moving around you even when you are still.",
    detailedExplanation: "Vertigo is not a disease but a symptom of various conditions. Peripheral vertigo is caused by inner ear problems like BPPV (benign paroxysmal positional vertigo), Meniere's disease, or vestibular neuritis. Central vertigo is caused by brain conditions like stroke or multiple sclerosis. BPPV, the most common type, occurs when tiny calcium crystals in the ear become dislodged. Treatment includes repositioning maneuvers (Epley maneuver), medications, and vestibular rehabilitation exercises.",
  },
  {
    id: "wheezing",
    term: "Wheezing",
    pronunciation: "WEEZ-ing",
    definition: "A high-pitched whistling sound made while breathing, usually indicating narrowed or obstructed airways.",
    detailedExplanation: "Wheezing is caused by narrowing of the airways due to inflammation, mucus buildup, or muscle tightening around the bronchial tubes. It is most commonly associated with asthma and COPD but can also occur with allergic reactions, respiratory infections, and heart failure. Wheezing is usually heard during exhalation but can occur during inhalation in severe cases. Treatment depends on the cause and may include bronchodilators (inhalers), corticosteroids, and addressing the underlying condition.",
  },
  {
    id: "zoonotic",
    term: "Zoonotic",
    pronunciation: "zoo-uh-NOT-ik",
    definition: "Describes diseases or infections that can be transmitted from animals to humans.",
    detailedExplanation: "Zoonotic diseases (zoonoses) account for about 60% of all infectious diseases in humans. They can spread through direct contact with animals, bites, contaminated food or water, or vectors like mosquitoes and ticks. Examples include rabies (dog bites), malaria (mosquitoes), Lyme disease (ticks), bird flu, swine flu, and COVID-19 (likely bat origin). Prevention includes proper food handling, vaccinating pets, using insect repellent, and avoiding contact with wild animals.",
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
          <div className="flex flex-wrap justify-center gap-1">
            {ALPHABET.map((letter) => {
              const isActive = activeLetters.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => isActive && scrollToLetter(letter)}
                  disabled={!isActive}
                  className="w-8 h-8 rounded-md text-sm font-semibold transition-all duration-150 flex items-center justify-center"
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
                              /{term.pronunciation}/
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
