import { Drug } from "@/types";

export const drugs: Drug[] = [
  {
    id: "metformin",
    genericName: "Metformin",
    brandNames: ["Glucophage", "Glycomet", "Obimet"],
    drugClass: "Biguanide (Antidiabetic)",
    commonUses: [
      "Type 2 diabetes mellitus",
      "Polycystic ovary syndrome (PCOS)",
      "Insulin resistance",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Stomach pain",
      "Metallic taste",
      "Vitamin B12 deficiency (long-term)",
    ],
    warnings: [
      "Risk of lactic acidosis in kidney impairment",
      "Stop before contrast dye procedures",
      "Avoid excessive alcohol use",
    ],
    interactions: [
      {
        drugId: "ibuprofen",
        severity: "moderate",
        description:
          "Ibuprofen may reduce kidney function, increasing metformin accumulation and the risk of lactic acidosis.",
        action:
          "Monitor kidney function regularly. Stay well hydrated and use the lowest effective dose of ibuprofen for the shortest time.",
      },
      {
        drugId: "diclofenac",
        severity: "moderate",
        description:
          "Diclofenac impairs renal blood flow, potentially raising metformin levels and lactic acidosis risk.",
        action:
          "Avoid long-term concurrent use. Monitor renal function and metformin levels.",
      },
      {
        drugId: "ciprofloxacin",
        severity: "moderate",
        description:
          "Ciprofloxacin can alter blood glucose levels unpredictably when combined with metformin, causing hypoglycemia or hyperglycemia.",
        action:
          "Monitor blood sugar closely during antibiotic therapy. Adjust metformin dose if needed.",
      },
    ],
  },
  {
    id: "amlodipine",
    genericName: "Amlodipine",
    brandNames: ["Norvasc", "Amlong", "Amlip"],
    drugClass: "Calcium Channel Blocker",
    commonUses: [
      "Hypertension",
      "Chronic stable angina",
      "Coronary artery disease",
    ],
    sideEffects: [
      "Peripheral edema",
      "Dizziness",
      "Flushing",
      "Headache",
      "Fatigue",
    ],
    warnings: [
      "Avoid in severe aortic stenosis",
      "May worsen heart failure in some patients",
      "Use caution in liver disease",
    ],
    interactions: [
      {
        drugId: "metoprolol",
        severity: "moderate",
        description:
          "Both drugs lower heart rate and blood pressure. Combined use may cause excessive hypotension and bradycardia.",
        action:
          "Monitor blood pressure and heart rate regularly. Dose adjustments may be needed.",
      },
    ],
  },
  {
    id: "atorvastatin",
    genericName: "Atorvastatin",
    brandNames: ["Lipitor", "Atorva", "Tonact"],
    drugClass: "HMG-CoA Reductase Inhibitor (Statin)",
    commonUses: [
      "High cholesterol",
      "Cardiovascular disease prevention",
      "Dyslipidemia",
    ],
    sideEffects: [
      "Muscle pain",
      "Joint pain",
      "Elevated liver enzymes",
      "Digestive problems",
      "Headache",
    ],
    warnings: [
      "Risk of rhabdomyolysis (severe muscle breakdown)",
      "Monitor liver function",
      "Avoid in pregnancy",
    ],
    interactions: [
      {
        drugId: "azithromycin",
        severity: "moderate",
        description:
          "Azithromycin may increase atorvastatin levels by inhibiting its metabolism, raising the risk of muscle-related side effects.",
        action:
          "Watch for unexplained muscle pain, tenderness, or weakness. Consider temporary dose reduction during antibiotic course.",
      },
      {
        drugId: "ciprofloxacin",
        severity: "moderate",
        description:
          "Ciprofloxacin inhibits CYP3A4 and may increase atorvastatin plasma levels, increasing the risk of myopathy.",
        action:
          "Monitor for muscle symptoms. Consider using an alternative antibiotic if possible.",
      },
    ],
  },
  {
    id: "omeprazole",
    genericName: "Omeprazole",
    brandNames: ["Prilosec", "Omez", "Ocid"],
    drugClass: "Proton Pump Inhibitor (PPI)",
    commonUses: [
      "Gastroesophageal reflux disease (GERD)",
      "Peptic ulcers",
      "Zollinger-Ellison syndrome",
    ],
    sideEffects: [
      "Headache",
      "Nausea",
      "Diarrhea",
      "Abdominal pain",
      "Vitamin B12 deficiency (long-term)",
    ],
    warnings: [
      "Long-term use linked to fracture risk",
      "May cause magnesium deficiency",
      "Possible increased risk of C. difficile infection",
    ],
    interactions: [
      {
        drugId: "levothyroxine",
        severity: "moderate",
        description:
          "Omeprazole reduces stomach acid needed for levothyroxine absorption, potentially reducing thyroid hormone levels.",
        action:
          "Take levothyroxine at least 4 hours before omeprazole. Monitor TSH levels more frequently.",
      },
    ],
  },
  {
    id: "paracetamol",
    genericName: "Paracetamol (Acetaminophen)",
    brandNames: ["Tylenol", "Crocin", "Dolo"],
    drugClass: "Analgesic / Antipyretic",
    commonUses: ["Pain relief", "Fever reduction", "Headache"],
    sideEffects: [
      "Rarely causes side effects at recommended doses",
      "Liver damage in overdose",
      "Allergic reactions (rare)",
    ],
    warnings: [
      "Do not exceed 4g per day in adults",
      "Severe liver toxicity in overdose",
      "Caution in chronic alcohol use",
    ],
    interactions: [],
  },
  {
    id: "ibuprofen",
    genericName: "Ibuprofen",
    brandNames: ["Advil", "Brufen", "Combiflam"],
    drugClass: "NSAID (Non-Steroidal Anti-Inflammatory Drug)",
    commonUses: ["Pain relief", "Inflammation", "Fever", "Arthritis"],
    sideEffects: [
      "Stomach upset",
      "Nausea",
      "Dizziness",
      "GI bleeding (prolonged use)",
      "Kidney damage (prolonged use)",
    ],
    warnings: [
      "Avoid in patients with active GI bleeding",
      "Increased cardiovascular risk with long-term use",
      "Avoid in third trimester of pregnancy",
    ],
    interactions: [
      {
        drugId: "aspirin",
        severity: "severe",
        description:
          "Ibuprofen blocks the cardioprotective antiplatelet effect of aspirin when taken before aspirin. Also greatly increases risk of GI bleeding.",
        action:
          "Take aspirin at least 30 minutes before ibuprofen or 8 hours after. Consult your doctor about alternatives.",
      },
      {
        drugId: "lisinopril",
        severity: "moderate",
        description:
          "Ibuprofen reduces the antihypertensive effect of lisinopril and may worsen kidney function.",
        action:
          "Monitor blood pressure and kidney function. Use the lowest NSAID dose for the shortest duration.",
      },
      {
        drugId: "losartan",
        severity: "moderate",
        description:
          "NSAIDs like ibuprofen reduce the blood pressure-lowering effect of losartan and increase risk of kidney injury.",
        action:
          "Avoid prolonged use. Monitor blood pressure and renal function.",
      },
      {
        drugId: "prednisone",
        severity: "severe",
        description:
          "Combining ibuprofen with prednisone significantly increases the risk of gastrointestinal ulceration and bleeding.",
        action:
          "Avoid concurrent use if possible. If necessary, add a proton pump inhibitor for gastric protection.",
      },
      {
        drugId: "diclofenac",
        severity: "severe",
        description:
          "Using two NSAIDs simultaneously greatly increases the risk of GI bleeding, ulcers, and kidney damage without additional therapeutic benefit.",
        action:
          "Never use two NSAIDs at the same time. Choose one NSAID at the lowest effective dose.",
      },
    ],
  },
  {
    id: "amoxicillin",
    genericName: "Amoxicillin",
    brandNames: ["Amoxil", "Mox", "Novamox"],
    drugClass: "Penicillin Antibiotic",
    commonUses: [
      "Bacterial infections",
      "Ear infections",
      "Strep throat",
      "H. pylori eradication",
    ],
    sideEffects: [
      "Diarrhea",
      "Nausea",
      "Skin rash",
      "Vomiting",
      "Allergic reactions",
    ],
    warnings: [
      "Check for penicillin allergy before use",
      "May reduce effectiveness of oral contraceptives",
      "Mononucleosis patients may develop rash",
    ],
    interactions: [],
  },
  {
    id: "azithromycin",
    genericName: "Azithromycin",
    brandNames: ["Zithromax", "Azithral", "Azee"],
    drugClass: "Macrolide Antibiotic",
    commonUses: [
      "Respiratory tract infections",
      "Skin infections",
      "Sexually transmitted infections",
      "Ear infections",
    ],
    sideEffects: [
      "Diarrhea",
      "Nausea",
      "Abdominal pain",
      "Headache",
      "QT prolongation (rare)",
    ],
    warnings: [
      "Risk of QT prolongation and cardiac arrhythmias",
      "Use caution in liver disease",
      "May worsen myasthenia gravis",
    ],
    interactions: [],
  },
  {
    id: "cetirizine",
    genericName: "Cetirizine",
    brandNames: ["Zyrtec", "Cetzine", "Alerid"],
    drugClass: "Second-Generation Antihistamine",
    commonUses: [
      "Allergic rhinitis",
      "Urticaria (hives)",
      "Seasonal allergies",
    ],
    sideEffects: [
      "Drowsiness",
      "Dry mouth",
      "Fatigue",
      "Headache",
      "Dizziness",
    ],
    warnings: [
      "May impair alertness even as a second-gen antihistamine",
      "Dose adjustment needed in kidney disease",
      "Avoid alcohol",
    ],
    interactions: [
      {
        drugId: "gabapentin",
        severity: "moderate",
        description:
          "Both cetirizine and gabapentin cause CNS depression. Combined use may increase drowsiness and impair coordination.",
        action:
          "Avoid driving or operating heavy machinery. Monitor for excessive sedation.",
      },
    ],
  },
  {
    id: "montelukast",
    genericName: "Montelukast",
    brandNames: ["Singulair", "Montair", "Montek"],
    drugClass: "Leukotriene Receptor Antagonist",
    commonUses: [
      "Asthma prevention",
      "Exercise-induced bronchoconstriction",
      "Allergic rhinitis",
    ],
    sideEffects: [
      "Headache",
      "Abdominal pain",
      "Fatigue",
      "Neuropsychiatric events (rare but serious)",
    ],
    warnings: [
      "FDA black box warning for neuropsychiatric events including suicidal thoughts",
      "Not for acute asthma attacks",
      "Monitor mood and behavior changes",
    ],
    interactions: [],
  },
  {
    id: "levothyroxine",
    genericName: "Levothyroxine",
    brandNames: ["Synthroid", "Thyronorm", "Eltroxin"],
    drugClass: "Thyroid Hormone",
    commonUses: [
      "Hypothyroidism",
      "Thyroid hormone replacement",
      "TSH suppression in thyroid cancer",
    ],
    sideEffects: [
      "Weight loss",
      "Tremor",
      "Headache",
      "Insomnia",
      "Palpitations (if overdosed)",
    ],
    warnings: [
      "Take on empty stomach, 30-60 minutes before food",
      "Many drug and food interactions",
      "Dose adjustments take 4-6 weeks to show effect",
    ],
    interactions: [
      {
        drugId: "omeprazole",
        severity: "moderate",
        description:
          "Omeprazole reduces gastric acid, impairing levothyroxine absorption and potentially causing hypothyroid symptoms.",
        action:
          "Separate dosing by at least 4 hours. Monitor TSH levels and adjust levothyroxine dose as needed.",
      },
      {
        drugId: "pantoprazole",
        severity: "moderate",
        description:
          "Like other PPIs, pantoprazole reduces stomach acidity needed for levothyroxine absorption.",
        action:
          "Separate dosing by at least 4 hours. Check TSH levels periodically.",
      },
    ],
  },
  {
    id: "losartan",
    genericName: "Losartan",
    brandNames: ["Cozaar", "Losacar", "Repace"],
    drugClass: "Angiotensin II Receptor Blocker (ARB)",
    commonUses: [
      "Hypertension",
      "Diabetic nephropathy",
      "Heart failure",
    ],
    sideEffects: [
      "Dizziness",
      "Hyperkalemia",
      "Fatigue",
      "Nasal congestion",
      "Back pain",
    ],
    warnings: [
      "Contraindicated in pregnancy",
      "Monitor potassium levels",
      "Caution in renal artery stenosis",
    ],
    interactions: [
      {
        drugId: "lisinopril",
        severity: "severe",
        description:
          "Combining an ARB with an ACE inhibitor provides no added benefit and significantly increases the risk of hyperkalemia, hypotension, and kidney failure.",
        action:
          "Do not use losartan and lisinopril together. Choose one agent.",
      },
    ],
  },
  {
    id: "metoprolol",
    genericName: "Metoprolol",
    brandNames: ["Lopressor", "Betaloc", "Metolar"],
    drugClass: "Beta-Blocker",
    commonUses: [
      "Hypertension",
      "Angina pectoris",
      "Heart failure",
      "Atrial fibrillation rate control",
    ],
    sideEffects: [
      "Fatigue",
      "Dizziness",
      "Bradycardia",
      "Cold extremities",
      "Depression",
    ],
    warnings: [
      "Do not stop abruptly — risk of rebound hypertension",
      "May mask hypoglycemia symptoms in diabetics",
      "Caution in asthma and COPD",
    ],
    interactions: [
      {
        drugId: "amlodipine",
        severity: "moderate",
        description:
          "Both agents lower heart rate and blood pressure. The combination can cause excessive bradycardia and hypotension.",
        action:
          "Monitor heart rate and blood pressure closely. This combination is often used intentionally but requires careful dose titration.",
      },
    ],
  },
  {
    id: "aspirin",
    genericName: "Aspirin",
    brandNames: ["Disprin", "Ecosprin", "Bayer Aspirin"],
    drugClass: "NSAID / Antiplatelet",
    commonUses: [
      "Pain relief",
      "Fever reduction",
      "Cardiovascular protection (low-dose)",
      "Anti-inflammatory",
    ],
    sideEffects: [
      "GI irritation",
      "Bleeding risk",
      "Tinnitus (high doses)",
      "Nausea",
    ],
    warnings: [
      "Avoid in children (risk of Reye syndrome)",
      "Risk of GI bleeding especially with alcohol",
      "Use low-dose for cardiac protection only under medical advice",
    ],
    interactions: [
      {
        drugId: "ibuprofen",
        severity: "severe",
        description:
          "Ibuprofen interferes with aspirin's antiplatelet activity. If aspirin is used for cardiac protection, ibuprofen may negate this benefit. Also increases GI bleeding risk.",
        action:
          "Take aspirin at least 30 minutes before ibuprofen. Discuss alternative pain relievers with your doctor.",
      },
      {
        drugId: "prednisone",
        severity: "moderate",
        description:
          "Corticosteroids increase the risk of GI bleeding when combined with aspirin. Prednisone may also reduce aspirin levels.",
        action:
          "Use gastroprotective therapy (PPI). Monitor for signs of GI bleeding.",
      },
    ],
  },
  {
    id: "pantoprazole",
    genericName: "Pantoprazole",
    brandNames: ["Protonix", "Pantocid", "Pan"],
    drugClass: "Proton Pump Inhibitor (PPI)",
    commonUses: [
      "GERD",
      "Peptic ulcer disease",
      "Erosive esophagitis",
      "H. pylori eradication (adjunct)",
    ],
    sideEffects: [
      "Headache",
      "Diarrhea",
      "Nausea",
      "Abdominal pain",
      "Flatulence",
    ],
    warnings: [
      "Long-term use may cause bone fractures",
      "Risk of hypomagnesemia",
      "May increase susceptibility to infections",
    ],
    interactions: [],
  },
  {
    id: "lisinopril",
    genericName: "Lisinopril",
    brandNames: ["Zestril", "Listril", "Lipril"],
    drugClass: "ACE Inhibitor",
    commonUses: [
      "Hypertension",
      "Heart failure",
      "Post-myocardial infarction",
      "Diabetic nephropathy",
    ],
    sideEffects: [
      "Dry cough",
      "Dizziness",
      "Hyperkalemia",
      "Headache",
      "Fatigue",
    ],
    warnings: [
      "Contraindicated in pregnancy",
      "Risk of angioedema",
      "Monitor potassium and renal function",
    ],
    interactions: [
      {
        drugId: "losartan",
        severity: "severe",
        description:
          "Dual RAAS blockade with an ACE inhibitor and ARB increases the risk of dangerous hyperkalemia, hypotension, and acute kidney injury.",
        action:
          "Do not combine these medications. Use one or the other, not both.",
      },
      {
        drugId: "ibuprofen",
        severity: "moderate",
        description:
          "NSAIDs reduce the antihypertensive effect of ACE inhibitors and may cause kidney function deterioration.",
        action:
          "Monitor blood pressure and renal function. Use the lowest NSAID dose for the shortest time.",
      },
    ],
  },
  {
    id: "diclofenac",
    genericName: "Diclofenac",
    brandNames: ["Voltaren", "Voveran", "Dicloran"],
    drugClass: "NSAID",
    commonUses: [
      "Pain relief",
      "Osteoarthritis",
      "Rheumatoid arthritis",
      "Musculoskeletal injuries",
    ],
    sideEffects: [
      "Stomach pain",
      "Nausea",
      "Diarrhea",
      "Elevated liver enzymes",
      "Headache",
    ],
    warnings: [
      "Higher cardiovascular risk than some NSAIDs",
      "Monitor liver function",
      "Avoid in heart failure",
    ],
    interactions: [
      {
        drugId: "ibuprofen",
        severity: "severe",
        description:
          "Combining two NSAIDs greatly increases the risk of GI bleeding, ulceration, and renal toxicity without added benefit.",
        action:
          "Never use two NSAIDs simultaneously. Choose one at the lowest effective dose.",
      },
      {
        drugId: "metformin",
        severity: "moderate",
        description:
          "Diclofenac may impair renal function, causing metformin accumulation and increasing lactic acidosis risk.",
        action:
          "Avoid prolonged concurrent use. Monitor kidney function.",
      },
    ],
  },
  {
    id: "ciprofloxacin",
    genericName: "Ciprofloxacin",
    brandNames: ["Cipro", "Ciplox", "Cifran"],
    drugClass: "Fluoroquinolone Antibiotic",
    commonUses: [
      "Urinary tract infections",
      "Respiratory infections",
      "GI infections",
      "Bone and joint infections",
    ],
    sideEffects: [
      "Nausea",
      "Diarrhea",
      "Dizziness",
      "Tendon rupture (rare but serious)",
      "Photosensitivity",
    ],
    warnings: [
      "FDA black box warning for tendon rupture and neuropathy",
      "Avoid in children and pregnant women",
      "May prolong QT interval",
    ],
    interactions: [
      {
        drugId: "metformin",
        severity: "moderate",
        description:
          "Ciprofloxacin can unpredictably alter blood glucose levels, causing dangerous hypoglycemia or hyperglycemia in diabetic patients on metformin.",
        action:
          "Monitor blood glucose closely. Consider alternative antibiotics.",
      },
      {
        drugId: "levothyroxine",
        severity: "moderate",
        description:
          "Ciprofloxacin can form chelation complexes with levothyroxine, reducing its absorption significantly.",
        action:
          "Separate dosing by at least 4 hours. Take levothyroxine first.",
      },
    ],
  },
  {
    id: "prednisone",
    genericName: "Prednisone",
    brandNames: ["Deltasone", "Omnacortil", "Wysolone"],
    drugClass: "Corticosteroid",
    commonUses: [
      "Inflammatory conditions",
      "Autoimmune diseases",
      "Allergic reactions",
      "Asthma exacerbations",
    ],
    sideEffects: [
      "Weight gain",
      "Mood changes",
      "Increased blood sugar",
      "Insomnia",
      "Osteoporosis (long-term)",
    ],
    warnings: [
      "Do not stop abruptly after prolonged use",
      "Increases infection risk",
      "May worsen diabetes and hypertension",
    ],
    interactions: [
      {
        drugId: "ibuprofen",
        severity: "severe",
        description:
          "Prednisone combined with ibuprofen markedly increases the risk of GI ulceration and bleeding.",
        action:
          "Avoid combination if possible. Add a PPI for gastric protection if both are needed.",
      },
      {
        drugId: "aspirin",
        severity: "moderate",
        description:
          "Corticosteroids increase aspirin clearance and greatly increase GI bleeding risk.",
        action:
          "Use a proton pump inhibitor for stomach protection. Monitor for bleeding signs.",
      },
    ],
  },
  {
    id: "gabapentin",
    genericName: "Gabapentin",
    brandNames: ["Neurontin", "Gabapin", "Gabatin"],
    drugClass: "Gabapentinoid / Anticonvulsant",
    commonUses: [
      "Neuropathic pain",
      "Epilepsy (adjunct)",
      "Postherpetic neuralgia",
      "Restless leg syndrome",
    ],
    sideEffects: [
      "Drowsiness",
      "Dizziness",
      "Fatigue",
      "Peripheral edema",
      "Weight gain",
    ],
    warnings: [
      "Risk of respiratory depression, especially with opioids",
      "May cause suicidal thoughts",
      "Taper gradually to discontinue",
    ],
    interactions: [
      {
        drugId: "cetirizine",
        severity: "moderate",
        description:
          "Both gabapentin and cetirizine cause central nervous system depression. Their combination may lead to excessive drowsiness and impaired motor function.",
        action:
          "Avoid activities requiring alertness. Reduce doses if excessive sedation occurs.",
      },
    ],
  },
];
