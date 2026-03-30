"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  X,
  ChevronDown,
  Droplets,
  Heart,
  Activity,
  FlaskConical,
  Scan,
  Gauge,
  TestTubes,
} from "lucide-react";

type TestCategory = "All" | "Blood" | "Urine" | "Imaging" | "Heart" | "Diabetes" | "Thyroid" | "Liver" | "Kidney";

interface NormalRange {
  component: string;
  range: string;
  unit: string;
}

interface LabTest {
  id: string;
  name: string;
  category: TestCategory[];
  icon: React.ReactNode;
  whatItChecks: string;
  whyOrdered: string;
  preparation: string;
  whatToExpect: string;
  normalRanges: NormalRange[];
  abnormalMeaning: string;
}

const CATEGORIES: TestCategory[] = ["All", "Blood", "Urine", "Imaging", "Heart", "Diabetes", "Thyroid", "Liver", "Kidney"];

const labTests: LabTest[] = [
  {
    id: "cbc",
    name: "CBC (Complete Blood Count)",
    category: ["Blood"],
    icon: <Droplets className="w-5 h-5" />,
    whatItChecks: "Measures different components of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
    whyOrdered: "Ordered as part of a routine health checkup, to diagnose anemia, infections, clotting disorders, blood cancers, and immune system conditions.",
    preparation: "No special preparation needed. Fasting is generally not required unless combined with other tests.",
    whatToExpect: "A quick blood draw from a vein in your arm. Takes about 5 minutes. Results usually available within 24 hours.",
    normalRanges: [
      { component: "RBC (Male)", range: "4.7 - 6.1", unit: "million/mcL" },
      { component: "RBC (Female)", range: "4.2 - 5.4", unit: "million/mcL" },
      { component: "WBC", range: "4,500 - 11,000", unit: "/mcL" },
      { component: "Hemoglobin (Male)", range: "13.5 - 17.5", unit: "g/dL" },
      { component: "Hemoglobin (Female)", range: "12.0 - 16.0", unit: "g/dL" },
      { component: "Platelets", range: "150,000 - 400,000", unit: "/mcL" },
    ],
    abnormalMeaning: "Low RBC/hemoglobin suggests anemia. High WBC may indicate infection or leukemia. Low platelets can cause bleeding issues. Abnormal values warrant further investigation.",
  },
  {
    id: "fbs",
    name: "Fasting Blood Sugar",
    category: ["Blood", "Diabetes"],
    icon: <Activity className="w-5 h-5" />,
    whatItChecks: "Measures the level of glucose (sugar) in your blood after an overnight fast, reflecting how your body regulates blood sugar.",
    whyOrdered: "To screen for or monitor diabetes and prediabetes. Often part of routine health checkups, especially for at-risk individuals.",
    preparation: "Fast for 8-12 hours before the test. Only water is allowed. Avoid alcohol the night before. Take medications as usual unless told otherwise.",
    whatToExpect: "A simple blood draw from a vein. Quick procedure with minimal discomfort. Results typically available same day.",
    normalRanges: [
      { component: "Normal", range: "70 - 99", unit: "mg/dL" },
      { component: "Prediabetes", range: "100 - 125", unit: "mg/dL" },
      { component: "Diabetes", range: "126+", unit: "mg/dL" },
    ],
    abnormalMeaning: "Levels of 100-125 mg/dL indicate prediabetes. Levels at or above 126 mg/dL on two separate tests indicate diabetes. Very low levels (below 70) may indicate hypoglycemia.",
  },
  {
    id: "hba1c",
    name: "HbA1c (Glycated Hemoglobin)",
    category: ["Blood", "Diabetes"],
    icon: <Activity className="w-5 h-5" />,
    whatItChecks: "Measures the percentage of hemoglobin coated with sugar, reflecting your average blood sugar level over the past 2-3 months.",
    whyOrdered: "To diagnose type 2 diabetes and prediabetes, and to monitor how well diabetes is being managed over time.",
    preparation: "No fasting required. Can be done at any time of day. No special preparation needed.",
    whatToExpect: "A standard blood draw. Quick and simple. Results usually available within 1-2 days.",
    normalRanges: [
      { component: "Normal", range: "Below 5.7", unit: "%" },
      { component: "Prediabetes", range: "5.7 - 6.4", unit: "%" },
      { component: "Diabetes", range: "6.5+", unit: "%" },
      { component: "Diabetes Target", range: "Below 7.0", unit: "%" },
    ],
    abnormalMeaning: "HbA1c of 5.7-6.4% indicates prediabetes. 6.5% or higher indicates diabetes. For those with diabetes, levels above 7% suggest the need for treatment adjustment.",
  },
  {
    id: "lipid-profile",
    name: "Lipid Profile",
    category: ["Blood", "Heart"],
    icon: <Heart className="w-5 h-5" />,
    whatItChecks: "Measures cholesterol and triglyceride levels in your blood, including total cholesterol, LDL (bad), HDL (good), and triglycerides.",
    whyOrdered: "To assess cardiovascular risk and guide treatment decisions for heart disease prevention. Recommended every 4-6 years for adults.",
    preparation: "Fast for 9-12 hours before the test. Only water is allowed. Avoid fatty foods and alcohol for 24 hours before.",
    whatToExpect: "A blood draw from a vein. Takes about 5 minutes. Results usually available within 24-48 hours.",
    normalRanges: [
      { component: "Total Cholesterol", range: "Below 200", unit: "mg/dL" },
      { component: "LDL (Bad)", range: "Below 100", unit: "mg/dL" },
      { component: "HDL (Good)", range: "60+", unit: "mg/dL" },
      { component: "Triglycerides", range: "Below 150", unit: "mg/dL" },
    ],
    abnormalMeaning: "High LDL and triglycerides increase heart disease risk. Low HDL is a risk factor. Very high triglycerides (above 500) can cause pancreatitis.",
  },
  {
    id: "tsh",
    name: "TSH (Thyroid Stimulating Hormone)",
    category: ["Blood", "Thyroid"],
    icon: <Gauge className="w-5 h-5" />,
    whatItChecks: "Measures the level of thyroid-stimulating hormone produced by the pituitary gland, which controls thyroid function.",
    whyOrdered: "To screen for and monitor thyroid disorders (hypothyroidism and hyperthyroidism). First test ordered when thyroid disease is suspected.",
    preparation: "No fasting required. Best done in the morning as TSH levels fluctuate throughout the day. Inform your doctor about any medications.",
    whatToExpect: "A simple blood draw. Quick procedure with results available in 1-2 days.",
    normalRanges: [
      { component: "Normal Adult", range: "0.4 - 4.0", unit: "mIU/L" },
      { component: "Pregnancy (1st trimester)", range: "0.1 - 2.5", unit: "mIU/L" },
    ],
    abnormalMeaning: "High TSH suggests hypothyroidism (underactive thyroid). Low TSH suggests hyperthyroidism (overactive thyroid). Abnormal values require further testing with T3 and T4.",
  },
  {
    id: "lft",
    name: "Liver Function Test (LFT)",
    category: ["Blood", "Liver"],
    icon: <FlaskConical className="w-5 h-5" />,
    whatItChecks: "Measures enzymes, proteins, and substances produced or processed by the liver to assess liver health and function.",
    whyOrdered: "To detect liver damage, monitor chronic liver conditions, check medication side effects, and evaluate symptoms like jaundice or abdominal pain.",
    preparation: "Fasting for 8-12 hours may be required. Avoid alcohol for 24 hours before. Inform your doctor about all medications.",
    whatToExpect: "A standard blood draw. Results usually available within 24-48 hours.",
    normalRanges: [
      { component: "ALT (SGPT)", range: "7 - 56", unit: "U/L" },
      { component: "AST (SGOT)", range: "10 - 40", unit: "U/L" },
      { component: "ALP", range: "44 - 147", unit: "U/L" },
      { component: "Bilirubin (Total)", range: "0.1 - 1.2", unit: "mg/dL" },
      { component: "Albumin", range: "3.5 - 5.0", unit: "g/dL" },
    ],
    abnormalMeaning: "Elevated ALT/AST indicate liver cell damage. High ALP may suggest bile duct problems. High bilirubin causes jaundice. Low albumin may indicate chronic liver disease.",
  },
  {
    id: "kft",
    name: "Kidney Function Test (KFT)",
    category: ["Blood", "Kidney"],
    icon: <FlaskConical className="w-5 h-5" />,
    whatItChecks: "Measures creatinine, BUN (blood urea nitrogen), and eGFR to evaluate how well your kidneys are filtering waste from the blood.",
    whyOrdered: "To detect kidney disease, monitor kidney function in diabetes/hypertension patients, and check medication effects on kidneys.",
    preparation: "No special preparation usually required. Stay well hydrated. Fasting may be needed if combined with other tests.",
    whatToExpect: "A blood draw and sometimes a urine sample. Blood draw takes about 5 minutes. Results available in 24-48 hours.",
    normalRanges: [
      { component: "Creatinine (Male)", range: "0.7 - 1.3", unit: "mg/dL" },
      { component: "Creatinine (Female)", range: "0.6 - 1.1", unit: "mg/dL" },
      { component: "BUN", range: "7 - 20", unit: "mg/dL" },
      { component: "eGFR", range: "Above 90", unit: "mL/min/1.73m2" },
    ],
    abnormalMeaning: "High creatinine and BUN suggest kidneys are not filtering properly. Low eGFR indicates reduced kidney function. eGFR below 60 for 3+ months indicates chronic kidney disease.",
  },
  {
    id: "vitamin-d",
    name: "Vitamin D (25-Hydroxy)",
    category: ["Blood"],
    icon: <TestTubes className="w-5 h-5" />,
    whatItChecks: "Measures the level of 25-hydroxyvitamin D in your blood, the best indicator of your overall vitamin D status.",
    whyOrdered: "To check for vitamin D deficiency, which is extremely common. Ordered for bone pain, fatigue, muscle weakness, or osteoporosis risk.",
    preparation: "No fasting required. No special preparation needed.",
    whatToExpect: "A simple blood draw. Results available in 2-3 days.",
    normalRanges: [
      { component: "Deficient", range: "Below 20", unit: "ng/mL" },
      { component: "Insufficient", range: "20 - 29", unit: "ng/mL" },
      { component: "Sufficient", range: "30 - 100", unit: "ng/mL" },
      { component: "Toxic", range: "Above 100", unit: "ng/mL" },
    ],
    abnormalMeaning: "Deficiency causes bone pain, fatigue, muscle weakness, and increases osteoporosis risk. Very common in India (70-90% of population). Supplementation is usually needed.",
  },
  {
    id: "vitamin-b12",
    name: "Vitamin B12",
    category: ["Blood"],
    icon: <TestTubes className="w-5 h-5" />,
    whatItChecks: "Measures the level of vitamin B12 (cobalamin) in your blood, essential for nerve function, red blood cell production, and DNA synthesis.",
    whyOrdered: "To diagnose B12 deficiency, investigate anemia, nerve symptoms (tingling, numbness), fatigue, or memory problems. Common in vegetarians.",
    preparation: "Fasting for 6-8 hours may be required. Avoid B12 supplements for 48 hours before the test unless told otherwise.",
    whatToExpect: "A standard blood draw. Results available in 1-3 days.",
    normalRanges: [
      { component: "Deficient", range: "Below 200", unit: "pg/mL" },
      { component: "Borderline", range: "200 - 300", unit: "pg/mL" },
      { component: "Normal", range: "300 - 900", unit: "pg/mL" },
    ],
    abnormalMeaning: "Low B12 can cause megaloblastic anemia, neuropathy, fatigue, and cognitive changes. Very common in vegetarians and those on metformin. Usually treated with supplements or injections.",
  },
  {
    id: "urine-routine",
    name: "Urine Routine & Microscopy",
    category: ["Urine"],
    icon: <FlaskConical className="w-5 h-5" />,
    whatItChecks: "Analyzes the physical, chemical, and microscopic properties of urine including color, pH, specific gravity, protein, glucose, blood, and cells.",
    whyOrdered: "To screen for urinary tract infections, kidney disease, diabetes, and other metabolic conditions. Part of routine health checkups.",
    preparation: "Collect a midstream clean-catch urine sample. Clean the genital area first. Best to use the first morning sample for most accurate results.",
    whatToExpect: "You will provide a urine sample in a sterile container. Non-invasive and painless. Results usually available within a few hours.",
    normalRanges: [
      { component: "pH", range: "4.5 - 8.0", unit: "" },
      { component: "Specific Gravity", range: "1.005 - 1.030", unit: "" },
      { component: "Protein", range: "Negative", unit: "" },
      { component: "Glucose", range: "Negative", unit: "" },
      { component: "RBC", range: "0 - 2", unit: "/HPF" },
      { component: "WBC", range: "0 - 5", unit: "/HPF" },
    ],
    abnormalMeaning: "Protein in urine may indicate kidney disease. Glucose suggests diabetes. WBC and bacteria indicate infection. Blood may suggest kidney stones, infection, or other conditions.",
  },
  {
    id: "ecg",
    name: "ECG (Electrocardiogram)",
    category: ["Heart"],
    icon: <Heart className="w-5 h-5" />,
    whatItChecks: "Records the electrical activity of your heart, showing heart rhythm, rate, and detecting abnormalities in the heart's electrical system.",
    whyOrdered: "To evaluate chest pain, palpitations, shortness of breath, dizziness. To check for heart attacks, arrhythmias, and heart enlargement.",
    preparation: "No fasting required. Avoid oily lotions on the chest area. Wear comfortable, loose-fitting clothing. Inform the technician about all medications.",
    whatToExpect: "Small electrode patches are placed on your chest, arms, and legs. Completely painless. Takes about 5-10 minutes. Results available immediately.",
    normalRanges: [
      { component: "Heart Rate", range: "60 - 100", unit: "bpm" },
      { component: "PR Interval", range: "0.12 - 0.20", unit: "seconds" },
      { component: "QRS Duration", range: "0.06 - 0.10", unit: "seconds" },
      { component: "QT Interval", range: "0.36 - 0.44", unit: "seconds" },
    ],
    abnormalMeaning: "Irregular rhythms may indicate arrhythmias. ST-segment changes can suggest heart attack or ischemia. Prolonged QT increases risk of dangerous arrhythmias.",
  },
  {
    id: "chest-xray",
    name: "Chest X-Ray",
    category: ["Imaging"],
    icon: <Scan className="w-5 h-5" />,
    whatItChecks: "Creates images of the heart, lungs, blood vessels, airways, and bones of the chest to detect abnormalities.",
    whyOrdered: "To evaluate persistent cough, chest pain, shortness of breath, fever. To check for pneumonia, tuberculosis, heart enlargement, and lung cancer.",
    preparation: "Remove jewelry and metal objects from the chest area. You may need to wear a hospital gown. Inform the technician if you might be pregnant.",
    whatToExpect: "You will stand against an X-ray plate and hold your breath briefly. Painless and takes about 5 minutes. Results read by a radiologist within hours.",
    normalRanges: [
      { component: "Heart Size", range: "Less than 50% of chest width", unit: "(cardiothoracic ratio)" },
      { component: "Lungs", range: "Clear, no infiltrates", unit: "" },
      { component: "Costophrenic Angles", range: "Sharp", unit: "" },
    ],
    abnormalMeaning: "Opacities may indicate pneumonia or tumors. Enlarged heart suggests heart failure. Fluid in pleural space indicates effusion. Calcified nodes may suggest old TB.",
  },
  {
    id: "ultrasound",
    name: "Ultrasound (Abdominal)",
    category: ["Imaging"],
    icon: <Scan className="w-5 h-5" />,
    whatItChecks: "Uses sound waves to create images of organs in the abdomen including liver, gallbladder, kidneys, pancreas, spleen, and abdominal aorta.",
    whyOrdered: "To evaluate abdominal pain, check for gallstones, kidney stones, liver disease, tumors, and monitor pregnancy. Non-invasive and radiation-free.",
    preparation: "For abdominal ultrasound: fast for 8-12 hours. Drink 4-6 glasses of water 1 hour before (for pelvic/bladder views). Do not urinate before the test.",
    whatToExpect: "A technician applies warm gel on your abdomen and moves a transducer (probe) over the area. Painless. Takes 15-30 minutes. Results interpreted by a radiologist.",
    normalRanges: [
      { component: "Liver Size", range: "Below 15.5 cm", unit: "(midclavicular line)" },
      { component: "Kidney Size", range: "9 - 12 cm", unit: "(length)" },
      { component: "Gallbladder Wall", range: "Below 3 mm", unit: "(thickness)" },
      { component: "CBD", range: "Below 6 mm", unit: "(diameter)" },
    ],
    abnormalMeaning: "Enlarged liver may indicate fatty liver or hepatitis. Kidney stones appear as bright spots with shadows. Gallstones are visible as mobile echogenic foci. Fluid collections may suggest infection.",
  },
  {
    id: "bmi",
    name: "BMI (Body Mass Index)",
    category: ["Diabetes", "Heart"],
    icon: <Gauge className="w-5 h-5" />,
    whatItChecks: "Calculates a ratio of your weight to height to estimate body fat and categorize weight status (underweight, normal, overweight, obese).",
    whyOrdered: "Routinely measured at health checkups to screen for weight-related health risks including diabetes, heart disease, and joint problems.",
    preparation: "No special preparation. Wear light clothing. Remove shoes. Measurements are most consistent in the morning.",
    whatToExpect: "Your height and weight are measured. BMI is calculated using the formula: weight (kg) / height (m) squared. Instant result.",
    normalRanges: [
      { component: "Underweight", range: "Below 18.5", unit: "kg/m2" },
      { component: "Normal", range: "18.5 - 24.9", unit: "kg/m2" },
      { component: "Overweight", range: "25.0 - 29.9", unit: "kg/m2" },
      { component: "Obese", range: "30.0+", unit: "kg/m2" },
      { component: "Asian Normal", range: "18.5 - 22.9", unit: "kg/m2" },
    ],
    abnormalMeaning: "BMI above 25 increases risk of diabetes, heart disease, and hypertension. Asian populations have higher risk at lower BMI values. BMI does not distinguish between muscle and fat mass.",
  },
  {
    id: "blood-pressure",
    name: "Blood Pressure",
    category: ["Heart"],
    icon: <Activity className="w-5 h-5" />,
    whatItChecks: "Measures the force of blood pushing against artery walls. Systolic (top number) is pressure during heartbeats, diastolic (bottom) is pressure between beats.",
    whyOrdered: "Routinely measured at every medical visit. Essential for diagnosing and monitoring hypertension, assessing cardiovascular risk.",
    preparation: "Avoid caffeine, exercise, and smoking for 30 minutes before. Rest for 5 minutes before measurement. Empty your bladder. Sit with feet flat on the floor.",
    whatToExpect: "A cuff is wrapped around your upper arm and inflated. You may feel brief tightness. Takes about 1 minute. Painless with instant results.",
    normalRanges: [
      { component: "Normal", range: "Below 120/80", unit: "mmHg" },
      { component: "Elevated", range: "120-129 / Below 80", unit: "mmHg" },
      { component: "Stage 1 Hypertension", range: "130-139 / 80-89", unit: "mmHg" },
      { component: "Stage 2 Hypertension", range: "140+ / 90+", unit: "mmHg" },
      { component: "Hypertensive Crisis", range: "180+ / 120+", unit: "mmHg" },
    ],
    abnormalMeaning: "Consistently elevated readings indicate hypertension, a major risk factor for heart attack, stroke, and kidney disease. A single high reading should be confirmed with repeated measurements.",
  },
];

export default function LabTestsPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<TestCategory>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = [...labTests];

    if (activeCategory !== "All") {
      list = list.filter((t) => t.category.includes(activeCategory));
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.whatItChecks.toLowerCase().includes(q) ||
          t.whyOrdered.toLowerCase().includes(q)
      );
    }

    return list;
  }, [search, activeCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

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
            Lab Test Explainer
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Understanding your medical tests
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-6"
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
              placeholder="Search lab tests..."
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

        {/* Category Filter Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                backgroundColor: activeCategory === cat ? "var(--hw-accent)" : "var(--hw-surface)",
                color: activeCategory === cat ? "#fff" : "var(--hw-text-secondary)",
                borderWidth: "1px",
                borderColor: activeCategory === cat ? "var(--hw-accent)" : "var(--hw-border)",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: "var(--hw-text-secondary)" }}>
            Showing {filtered.length} test{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Test Cards Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
              No tests found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((test, idx) => {
              const isExpanded = expandedId === test.id;

              return (
                <motion.div
                  key={test.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 }}
                  layout
                  className={`rounded-xl border transition-all duration-200 ${
                    isExpanded ? "md:col-span-2 lg:col-span-3" : ""
                  }`}
                  style={{
                    backgroundColor: "var(--hw-surface)",
                    borderColor: isExpanded ? "var(--hw-accent)" : "var(--hw-border)",
                  }}
                >
                  {/* Card Header */}
                  <button
                    onClick={() => toggleExpand(test.id)}
                    className="w-full flex items-center gap-4 p-5 text-left cursor-pointer"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "color-mix(in srgb, var(--hw-accent) 15%, transparent)",
                        color: "var(--hw-accent)",
                      }}
                    >
                      {test.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold truncate">{test.name}</h3>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {test.category.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: "var(--hw-surface-secondary)",
                              color: "var(--hw-text-secondary)",
                            }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      {!isExpanded && (
                        <p
                          className="text-sm mt-2 line-clamp-1 leading-relaxed"
                          style={{ color: "var(--hw-text-muted)" }}
                        >
                          {test.whatItChecks}
                        </p>
                      )}
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                      style={{ color: "var(--hw-text-secondary)" }}
                    />
                  </button>

                  {/* Expanded Content */}
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
                          className="px-5 pb-5 pt-0 border-t"
                          style={{ borderColor: "var(--hw-border)" }}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                            {/* What It Checks */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--hw-accent)" }}>
                                What It Checks
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--hw-text-secondary)" }}>
                                {test.whatItChecks}
                              </p>
                            </div>

                            {/* Why Ordered */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--hw-accent)" }}>
                                Why It Is Ordered
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--hw-text-secondary)" }}>
                                {test.whyOrdered}
                              </p>
                            </div>

                            {/* Preparation */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--hw-accent)" }}>
                                Preparation
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--hw-text-secondary)" }}>
                                {test.preparation}
                              </p>
                            </div>

                            {/* What to Expect */}
                            <div>
                              <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--hw-accent)" }}>
                                What to Expect
                              </h4>
                              <p className="text-sm leading-relaxed" style={{ color: "var(--hw-text-secondary)" }}>
                                {test.whatToExpect}
                              </p>
                            </div>
                          </div>

                          {/* Normal Ranges Table */}
                          <div className="mt-6">
                            <h4 className="text-sm font-semibold mb-3" style={{ color: "var(--hw-accent)" }}>
                              Normal Ranges
                            </h4>
                            <div
                              className="rounded-lg border overflow-hidden"
                              style={{ borderColor: "var(--hw-border)" }}
                            >
                              <table className="w-full text-sm">
                                <thead>
                                  <tr style={{ backgroundColor: "var(--hw-surface-secondary)" }}>
                                    <th className="text-left px-4 py-2.5 font-semibold">Component</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Range</th>
                                    <th className="text-left px-4 py-2.5 font-semibold">Unit</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {test.normalRanges.map((range, i) => (
                                    <tr
                                      key={i}
                                      className="border-t"
                                      style={{ borderColor: "var(--hw-border)" }}
                                    >
                                      <td className="px-4 py-2.5">{range.component}</td>
                                      <td className="px-4 py-2.5 font-medium" style={{ color: "var(--hw-accent)" }}>
                                        {range.range}
                                      </td>
                                      <td className="px-4 py-2.5" style={{ color: "var(--hw-text-secondary)" }}>
                                        {range.unit}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* Abnormal Meaning */}
                          <div className="mt-5">
                            <h4 className="text-sm font-semibold mb-2" style={{ color: "var(--hw-accent)" }}>
                              What Abnormal Results May Mean
                            </h4>
                            <div
                              className="p-4 rounded-lg border text-sm leading-relaxed"
                              style={{
                                backgroundColor: "var(--hw-surface-secondary)",
                                borderColor: "var(--hw-border)",
                                color: "var(--hw-text-secondary)",
                              }}
                            >
                              {test.abnormalMeaning}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
