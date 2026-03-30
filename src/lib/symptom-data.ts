// ---------------------------------------------------------------------------
// Symptom Data & Matching Logic for HealthWise Symptom Checker
// ---------------------------------------------------------------------------

export type BodyRegion =
  | "head"
  | "eyes"
  | "ears"
  | "throat"
  | "chest"
  | "abdomen"
  | "arms"
  | "back"
  | "legs"
  | "skin";

export interface Symptom {
  id: string;
  label: string;
}

export interface SelectedSymptom {
  id: string;
  label: string;
  severity: "mild" | "moderate" | "severe";
  duration: string;
}

export interface ConditionResult {
  name: string;
  slug: string;
  matchPercent: number;
  description: string;
  severity: "low" | "moderate" | "high" | "emergency";
}

// ---------------------------------------------------------------------------
// Symptom lists per body region
// ---------------------------------------------------------------------------

export const symptomsByRegion: Record<BodyRegion, Symptom[]> = {
  head: [
    { id: "head-headache", label: "Headache" },
    { id: "head-migraine", label: "Migraine with aura" },
    { id: "head-dizziness", label: "Dizziness" },
    { id: "head-lightheaded", label: "Lightheadedness" },
    { id: "head-pressure", label: "Pressure or tightness" },
    { id: "head-nausea", label: "Nausea" },
    { id: "head-confusion", label: "Confusion or brain fog" },
    { id: "head-sensitivity", label: "Sensitivity to light or sound" },
  ],
  eyes: [
    { id: "eyes-redness", label: "Redness" },
    { id: "eyes-itching", label: "Itching" },
    { id: "eyes-pain", label: "Eye pain" },
    { id: "eyes-blurry", label: "Blurry vision" },
    { id: "eyes-dryness", label: "Dryness" },
    { id: "eyes-discharge", label: "Discharge" },
    { id: "eyes-floaters", label: "Floaters or flashes" },
    { id: "eyes-swelling", label: "Swelling around eye" },
  ],
  ears: [
    { id: "ears-pain", label: "Ear pain" },
    { id: "ears-ringing", label: "Ringing (tinnitus)" },
    { id: "ears-hearing-loss", label: "Hearing loss" },
    { id: "ears-discharge", label: "Ear discharge" },
    { id: "ears-fullness", label: "Feeling of fullness" },
    { id: "ears-itching", label: "Itching inside ear" },
    { id: "ears-vertigo", label: "Vertigo" },
  ],
  throat: [
    { id: "throat-sore", label: "Sore throat" },
    { id: "throat-difficulty-swallowing", label: "Difficulty swallowing" },
    { id: "throat-hoarseness", label: "Hoarseness" },
    { id: "throat-dry", label: "Dry or scratchy throat" },
    { id: "throat-swollen-glands", label: "Swollen glands" },
    { id: "throat-cough", label: "Cough" },
    { id: "throat-mucus", label: "Post-nasal drip" },
    { id: "throat-lump", label: "Feeling of lump in throat" },
  ],
  chest: [
    { id: "chest-pain", label: "Chest pain" },
    { id: "chest-tightness", label: "Tightness" },
    { id: "chest-shortness-breath", label: "Shortness of breath" },
    { id: "chest-palpitations", label: "Heart palpitations" },
    { id: "chest-cough", label: "Persistent cough" },
    { id: "chest-wheezing", label: "Wheezing" },
    { id: "chest-heartburn", label: "Heartburn" },
    { id: "chest-pressure", label: "Pressure or squeezing" },
    { id: "chest-rapid-heart", label: "Rapid heartbeat" },
  ],
  abdomen: [
    { id: "abdomen-pain", label: "Abdominal pain" },
    { id: "abdomen-bloating", label: "Bloating" },
    { id: "abdomen-nausea", label: "Nausea" },
    { id: "abdomen-vomiting", label: "Vomiting" },
    { id: "abdomen-diarrhea", label: "Diarrhea" },
    { id: "abdomen-constipation", label: "Constipation" },
    { id: "abdomen-cramps", label: "Cramps" },
    { id: "abdomen-loss-appetite", label: "Loss of appetite" },
    { id: "abdomen-acid-reflux", label: "Acid reflux" },
  ],
  arms: [
    { id: "arms-pain", label: "Arm pain" },
    { id: "arms-numbness", label: "Numbness or tingling" },
    { id: "arms-weakness", label: "Weakness" },
    { id: "arms-swelling", label: "Swelling" },
    { id: "arms-joint-pain", label: "Joint pain" },
    { id: "arms-stiffness", label: "Stiffness" },
    { id: "arms-bruising", label: "Bruising" },
    { id: "arms-tremor", label: "Tremor" },
  ],
  back: [
    { id: "back-lower-pain", label: "Lower back pain" },
    { id: "back-upper-pain", label: "Upper back pain" },
    { id: "back-stiffness", label: "Stiffness" },
    { id: "back-muscle-spasm", label: "Muscle spasm" },
    { id: "back-radiating-pain", label: "Pain radiating to legs" },
    { id: "back-numbness", label: "Numbness" },
    { id: "back-sharp-pain", label: "Sharp, shooting pain" },
    { id: "back-chronic", label: "Chronic ache" },
  ],
  legs: [
    { id: "legs-pain", label: "Leg pain" },
    { id: "legs-swelling", label: "Swelling" },
    { id: "legs-cramps", label: "Cramps" },
    { id: "legs-numbness", label: "Numbness or tingling" },
    { id: "legs-weakness", label: "Weakness" },
    { id: "legs-joint-pain", label: "Joint pain" },
    { id: "legs-varicose", label: "Visible varicose veins" },
    { id: "legs-restless", label: "Restless legs" },
  ],
  skin: [
    { id: "skin-rash", label: "Rash" },
    { id: "skin-itching", label: "Itching" },
    { id: "skin-redness", label: "Redness" },
    { id: "skin-dry", label: "Dry or flaky skin" },
    { id: "skin-bumps", label: "Bumps or blisters" },
    { id: "skin-bruising", label: "Unexplained bruising" },
    { id: "skin-mole-change", label: "Mole changes" },
    { id: "skin-swelling", label: "Swelling" },
    { id: "skin-discoloration", label: "Discoloration" },
  ],
};

// ---------------------------------------------------------------------------
// Region labels for UI
// ---------------------------------------------------------------------------

export const regionLabels: Record<BodyRegion, string> = {
  head: "Head",
  eyes: "Eyes",
  ears: "Ears",
  throat: "Throat",
  chest: "Chest",
  abdomen: "Abdomen",
  arms: "Arms",
  back: "Back",
  legs: "Legs",
  skin: "Skin",
};

// ---------------------------------------------------------------------------
// Conditions database with matching symptom ids
// ---------------------------------------------------------------------------

interface ConditionEntry {
  name: string;
  slug: string;
  description: string;
  severity: "low" | "moderate" | "high" | "emergency";
  symptoms: string[]; // symptom ids that map to this condition
  isEmergency?: boolean;
}

const conditions: ConditionEntry[] = [
  // Head
  {
    name: "Tension Headache",
    slug: "tension-headache",
    description:
      "A common type of headache causing mild to moderate pain, often described as a tight band around the head.",
    severity: "low",
    symptoms: ["head-headache", "head-pressure", "head-sensitivity"],
  },
  {
    name: "Migraine",
    slug: "migraine",
    description:
      "A neurological condition causing intense, throbbing headaches often accompanied by nausea and light sensitivity.",
    severity: "moderate",
    symptoms: [
      "head-headache",
      "head-migraine",
      "head-nausea",
      "head-sensitivity",
      "head-dizziness",
    ],
  },
  {
    name: "Concussion",
    slug: "concussion",
    description:
      "A traumatic brain injury caused by a blow to the head, leading to confusion, dizziness, and headache.",
    severity: "high",
    symptoms: [
      "head-headache",
      "head-dizziness",
      "head-nausea",
      "head-confusion",
      "head-lightheaded",
    ],
    isEmergency: true,
  },
  // Eyes
  {
    name: "Conjunctivitis",
    slug: "conjunctivitis",
    description:
      "Inflammation of the conjunctiva causing redness, itching, and discharge from the eye.",
    severity: "low",
    symptoms: ["eyes-redness", "eyes-itching", "eyes-discharge"],
  },
  {
    name: "Dry Eye Syndrome",
    slug: "dry-eye-syndrome",
    description:
      "A condition where the eyes do not produce enough tears or the tears evaporate too quickly.",
    severity: "low",
    symptoms: ["eyes-dryness", "eyes-redness", "eyes-itching", "eyes-blurry"],
  },
  {
    name: "Glaucoma",
    slug: "glaucoma",
    description:
      "A group of eye conditions that damage the optic nerve, often due to abnormally high pressure in the eye.",
    severity: "high",
    symptoms: ["eyes-pain", "eyes-blurry", "eyes-redness", "eyes-floaters"],
    isEmergency: true,
  },
  // Ears
  {
    name: "Ear Infection (Otitis Media)",
    slug: "ear-infection",
    description:
      "An infection of the middle ear causing pain, fever, and sometimes fluid discharge.",
    severity: "moderate",
    symptoms: ["ears-pain", "ears-fullness", "ears-discharge", "ears-hearing-loss"],
  },
  {
    name: "Tinnitus",
    slug: "tinnitus",
    description:
      "A perception of ringing, buzzing, or other sounds in the ears without an external source.",
    severity: "low",
    symptoms: ["ears-ringing", "ears-fullness", "ears-hearing-loss"],
  },
  {
    name: "Meniere's Disease",
    slug: "menieres-disease",
    description:
      "An inner ear disorder causing vertigo, hearing loss, tinnitus, and a feeling of fullness.",
    severity: "moderate",
    symptoms: ["ears-vertigo", "ears-ringing", "ears-hearing-loss", "ears-fullness"],
  },
  // Throat
  {
    name: "Pharyngitis (Sore Throat)",
    slug: "pharyngitis",
    description:
      "Inflammation of the throat causing pain, scratchiness, and difficulty swallowing.",
    severity: "low",
    symptoms: [
      "throat-sore",
      "throat-dry",
      "throat-difficulty-swallowing",
      "throat-swollen-glands",
    ],
  },
  {
    name: "Strep Throat",
    slug: "strep-throat",
    description:
      "A bacterial infection causing severe sore throat, fever, and swollen lymph nodes.",
    severity: "moderate",
    symptoms: [
      "throat-sore",
      "throat-difficulty-swallowing",
      "throat-swollen-glands",
      "throat-hoarseness",
    ],
  },
  {
    name: "Laryngitis",
    slug: "laryngitis",
    description:
      "Inflammation of the voice box causing hoarseness, sore throat, and dry cough.",
    severity: "low",
    symptoms: ["throat-hoarseness", "throat-sore", "throat-dry", "throat-cough"],
  },
  // Chest
  {
    name: "Asthma",
    slug: "asthma",
    description:
      "A chronic condition causing airway inflammation, leading to wheezing, coughing, and shortness of breath.",
    severity: "moderate",
    symptoms: [
      "chest-wheezing",
      "chest-shortness-breath",
      "chest-tightness",
      "chest-cough",
    ],
  },
  {
    name: "Gastroesophageal Reflux (GERD)",
    slug: "gerd",
    description:
      "A digestive disorder where stomach acid flows back into the esophagus, causing heartburn and chest discomfort.",
    severity: "low",
    symptoms: ["chest-heartburn", "chest-pain", "chest-cough"],
  },
  {
    name: "Heart Attack",
    slug: "heart-attack",
    description:
      "A medical emergency where blood flow to the heart is blocked, causing chest pain, pressure, and shortness of breath.",
    severity: "emergency",
    symptoms: [
      "chest-pain",
      "chest-pressure",
      "chest-shortness-breath",
      "chest-rapid-heart",
      "chest-tightness",
    ],
    isEmergency: true,
  },
  {
    name: "Anxiety / Panic Attack",
    slug: "anxiety",
    description:
      "Episodes of intense fear or discomfort that may cause chest tightness, rapid heart rate, and breathing difficulties.",
    severity: "moderate",
    symptoms: [
      "chest-palpitations",
      "chest-tightness",
      "chest-shortness-breath",
      "chest-rapid-heart",
    ],
  },
  // Abdomen
  {
    name: "Irritable Bowel Syndrome (IBS)",
    slug: "irritable-bowel-syndrome",
    description:
      "A common disorder affecting the large intestine causing cramping, bloating, and changes in bowel habits.",
    severity: "low",
    symptoms: [
      "abdomen-pain",
      "abdomen-bloating",
      "abdomen-cramps",
      "abdomen-diarrhea",
      "abdomen-constipation",
    ],
  },
  {
    name: "Gastroenteritis",
    slug: "gastroenteritis",
    description:
      "An intestinal infection causing nausea, vomiting, diarrhea, and abdominal cramps.",
    severity: "moderate",
    symptoms: [
      "abdomen-nausea",
      "abdomen-vomiting",
      "abdomen-diarrhea",
      "abdomen-cramps",
      "abdomen-pain",
    ],
  },
  {
    name: "Appendicitis",
    slug: "appendicitis",
    description:
      "Inflammation of the appendix causing severe abdominal pain, nausea, and fever. Requires immediate medical attention.",
    severity: "emergency",
    symptoms: [
      "abdomen-pain",
      "abdomen-nausea",
      "abdomen-vomiting",
      "abdomen-loss-appetite",
    ],
    isEmergency: true,
  },
  {
    name: "Acid Reflux",
    slug: "acid-reflux",
    description:
      "A condition where stomach acid frequently flows back into the esophagus, causing burning and discomfort.",
    severity: "low",
    symptoms: [
      "abdomen-acid-reflux",
      "abdomen-bloating",
      "abdomen-nausea",
      "abdomen-pain",
    ],
  },
  // Arms
  {
    name: "Carpal Tunnel Syndrome",
    slug: "carpal-tunnel-syndrome",
    description:
      "Compression of the median nerve in the wrist causing numbness, tingling, and weakness in the hand.",
    severity: "moderate",
    symptoms: ["arms-numbness", "arms-weakness", "arms-pain", "arms-stiffness"],
  },
  {
    name: "Tennis Elbow",
    slug: "tennis-elbow",
    description:
      "Inflammation of the tendons on the outside of the elbow from overuse, causing pain and tenderness.",
    severity: "low",
    symptoms: ["arms-pain", "arms-weakness", "arms-stiffness", "arms-joint-pain"],
  },
  {
    name: "Rheumatoid Arthritis",
    slug: "rheumatoid-arthritis",
    description:
      "An autoimmune disorder causing inflammation, pain, and swelling in the joints.",
    severity: "moderate",
    symptoms: [
      "arms-joint-pain",
      "arms-swelling",
      "arms-stiffness",
      "arms-weakness",
    ],
  },
  // Back
  {
    name: "Muscle Strain",
    slug: "back-muscle-strain",
    description:
      "An injury to the muscles or tendons in the back caused by overuse, improper lifting, or sudden movement.",
    severity: "low",
    symptoms: [
      "back-lower-pain",
      "back-upper-pain",
      "back-stiffness",
      "back-muscle-spasm",
    ],
  },
  {
    name: "Herniated Disc",
    slug: "herniated-disc",
    description:
      "A condition where the soft center of a spinal disc pushes through a crack, irritating nearby nerves.",
    severity: "moderate",
    symptoms: [
      "back-lower-pain",
      "back-radiating-pain",
      "back-sharp-pain",
      "back-numbness",
    ],
  },
  {
    name: "Sciatica",
    slug: "sciatica",
    description:
      "Pain radiating along the sciatic nerve from the lower back through the hips and down each leg.",
    severity: "moderate",
    symptoms: [
      "back-lower-pain",
      "back-radiating-pain",
      "back-numbness",
      "back-sharp-pain",
    ],
  },
  // Legs
  {
    name: "Deep Vein Thrombosis (DVT)",
    slug: "deep-vein-thrombosis",
    description:
      "A blood clot forming in a deep vein, usually in the legs, causing swelling, pain, and redness.",
    severity: "emergency",
    symptoms: ["legs-pain", "legs-swelling", "legs-numbness", "legs-weakness"],
    isEmergency: true,
  },
  {
    name: "Restless Leg Syndrome",
    slug: "restless-leg-syndrome",
    description:
      "A neurological condition causing an irresistible urge to move the legs, especially at rest.",
    severity: "low",
    symptoms: ["legs-restless", "legs-cramps", "legs-numbness"],
  },
  {
    name: "Osteoarthritis",
    slug: "osteoarthritis",
    description:
      "A degenerative joint disease causing pain, stiffness, and reduced range of motion.",
    severity: "moderate",
    symptoms: ["legs-joint-pain", "legs-swelling", "legs-weakness", "legs-cramps"],
  },
  {
    name: "Varicose Veins",
    slug: "varicose-veins",
    description:
      "Enlarged, twisted veins that are visible under the skin, often causing aching and swelling.",
    severity: "low",
    symptoms: ["legs-varicose", "legs-pain", "legs-swelling", "legs-cramps"],
  },
  // Skin
  {
    name: "Eczema (Dermatitis)",
    slug: "eczema",
    description:
      "A condition causing the skin to become inflamed, itchy, red, and cracked.",
    severity: "low",
    symptoms: ["skin-rash", "skin-itching", "skin-dry", "skin-redness"],
  },
  {
    name: "Psoriasis",
    slug: "psoriasis",
    description:
      "An autoimmune condition causing rapid skin cell buildup, leading to scaling on the skin surface.",
    severity: "moderate",
    symptoms: [
      "skin-rash",
      "skin-dry",
      "skin-redness",
      "skin-bumps",
      "skin-discoloration",
    ],
  },
  {
    name: "Contact Dermatitis",
    slug: "contact-dermatitis",
    description:
      "A skin reaction from contact with an allergen or irritant, causing redness, itching, and blisters.",
    severity: "low",
    symptoms: ["skin-rash", "skin-itching", "skin-redness", "skin-bumps", "skin-swelling"],
  },
  {
    name: "Melanoma",
    slug: "melanoma",
    description:
      "The most serious type of skin cancer, often signaled by changes in an existing mole or a new unusual growth.",
    severity: "high",
    symptoms: ["skin-mole-change", "skin-discoloration", "skin-bumps"],
    isEmergency: true,
  },
];

// ---------------------------------------------------------------------------
// Duration options
// ---------------------------------------------------------------------------

export const durationOptions = [
  "Less than a day",
  "1-3 days",
  "1-2 weeks",
  "2+ weeks",
];

// ---------------------------------------------------------------------------
// Existing conditions for step 3
// ---------------------------------------------------------------------------

export const existingConditions = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Asthma",
  "None",
];

// ---------------------------------------------------------------------------
// Matching function
// ---------------------------------------------------------------------------

export function matchConditions(
  selectedSymptoms: SelectedSymptom[],
  _age?: number,
  _sex?: "male" | "female",
  _existingConditions?: string[]
): ConditionResult[] {
  const symptomIds = selectedSymptoms.map((s) => s.id);
  const severityWeight: Record<string, number> = {
    mild: 1,
    moderate: 1.3,
    severe: 1.6,
  };

  // Score each condition
  const scored = conditions
    .map((condition) => {
      const matchingSymptoms = condition.symptoms.filter((s) =>
        symptomIds.includes(s)
      );
      if (matchingSymptoms.length === 0) return null;

      // Base match is ratio of condition symptoms that the user has
      const baseMatch = matchingSymptoms.length / condition.symptoms.length;

      // Weight by severity of selected symptoms
      const avgSeverity =
        matchingSymptoms.reduce((sum, sId) => {
          const sel = selectedSymptoms.find((s) => s.id === sId);
          return sum + (sel ? severityWeight[sel.severity] : 1);
        }, 0) / matchingSymptoms.length;

      const rawPercent = Math.min(baseMatch * avgSeverity * 100, 97);

      return {
        name: condition.name,
        slug: condition.slug,
        matchPercent: Math.round(rawPercent),
        description: condition.description,
        severity: condition.severity,
        isEmergency: condition.isEmergency || false,
      } as ConditionResult & { isEmergency: boolean };
    })
    .filter(Boolean) as (ConditionResult & { isEmergency: boolean })[];

  // Sort by matchPercent descending
  scored.sort((a, b) => b.matchPercent - a.matchPercent);

  return scored.slice(0, 5);
}

// ---------------------------------------------------------------------------
// Check if results suggest an emergency
// ---------------------------------------------------------------------------

export function hasEmergencyCondition(results: ConditionResult[]): boolean {
  return results.some((r) => r.severity === "emergency");
}
