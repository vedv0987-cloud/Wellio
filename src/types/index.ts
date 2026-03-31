export interface Condition {
  id: string;
  slug: string;
  name: string;
  nameHindi: string | null;
  pronunciation: string | null;
  category: ConditionCategory;
  severity: Severity;
  overview: string;
  overviewHindi: string | null;
  symptoms: Symptom[];
  causes: Cause[];
  riskFactors: RiskFactor[];
  diagnosisSteps: DiagnosisStep[];
  treatments: Treatments;
  preventionChecklist: ChecklistItem[];
  doctorQuestions: DoctorQuestion[];
  ayurvedaRemedies: AyurvedaRemedy[] | null;
  visualSlides: VisualSlide[];
  affectedPercentage: number;
  commonAgeGroup: string;
  isCurable: boolean;
  relatedConditionIds: string[];
  sourceVideos: SourceVideo[];
  trustedSources: TrustedSource[];
  lastReviewedDate: string;
  lastReviewedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type ConditionCategory =
  | "cardiovascular"
  | "respiratory"
  | "digestive"
  | "neurological"
  | "endocrine"
  | "musculoskeletal"
  | "mental_health"
  | "skin"
  | "eye"
  | "ear"
  | "reproductive"
  | "immune"
  | "cancer"
  | "infectious";

export type Severity = "mild" | "moderate" | "severe" | "critical";

export interface Symptom {
  name: string;
  severity: Severity;
  bodyPart: string;
  description: string;
}

export interface Cause {
  cause: string;
  description: string;
}

export interface RiskFactor {
  factor: string;
  level: "low" | "medium" | "high";
  description: string;
}

export interface DiagnosisStep {
  step: number;
  test: string;
  description: string;
  duration: string;
}

export interface Treatments {
  medications: Treatment[];
  procedures: Treatment[];
  lifestyle: Treatment[];
  alternative: Treatment[];
}

export interface Treatment {
  name: string;
  description: string;
  duration?: string;
  sideEffects?: string[];
}

export interface ChecklistItem {
  item: string;
  description: string;
}

export interface DoctorQuestion {
  question: string;
  whyItMatters: string;
}

export interface AyurvedaRemedy {
  remedy: string;
  sourceCreator: string;
  evidenceLevel: "anecdotal" | "preliminary" | "moderate" | "strong";
}

export interface VisualSlide {
  title: string;
  description: string;
  imageUrl: string;
}

export interface TrustedSource {
  name: string;
  organization: string;
  url: string;
  description: string;
  badge: "WHO" | "FDA" | "NIH" | "CDC" | "Mayo Clinic" | "Cleveland Clinic" | "MedlinePlus" | "NHS" | "WebMD";
}

export interface SourceVideo {
  creator: string;
  title: string;
  url: string;
  date: string;
}

export interface Creator {
  id: string;
  slug: string;
  name: string;
  youtubeChannelId: string;
  avatarUrl: string;
  specialty: string;
  credentials: string[];
  subscriberCount: number;
  language: "en" | "hi" | "both";
  bio: string;
  videoCount: number;
}

export interface Drug {
  id: string;
  genericName: string;
  brandNames: string[];
  drugClass: string;
  commonUses: string[];
  sideEffects: string[];
  warnings: string[];
  interactions: DrugInteraction[];
}

export interface DrugInteraction {
  drugId: string;
  severity: "severe" | "moderate" | "minor" | "none";
  description: string;
  action: string;
}

export interface LabTest {
  id: string;
  slug: string;
  name: string;
  category: string;
  whatItChecks: string;
  whyOrdered: string;
  preparation: string;
  whatToExpect: string;
  normalRanges: NormalRange[];
  abnormalMeaning: string;
  relatedConditionIds: string[];
}

export interface NormalRange {
  component: string;
  range: string;
  unit: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  pronunciation: string | null;
  definition: string;
  definitionHindi: string | null;
  detailedExplanation: string | null;
  usedInConditionIds: string[];
}

export interface FirstAidProcedure {
  id: string;
  slug: string;
  name: string;
  isTimeCritical: boolean;
  steps: FirstAidStep[];
  emergencyNumbers: { india: string; us: string; uk: string };
  relatedVideoIds: string[];
}

export interface FirstAidStep {
  stepNumber: number;
  instruction: string;
  importantNote: string | null;
  imageUrl: string | null;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationDays: number;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessons: Lesson[];
  enrollmentCount: number;
}

export interface Lesson {
  day: number;
  topic: string;
  description: string;
  videoId: string | null;
  reading: string;
  actionItems: string[];
}

export interface Video {
  id: string;
  youtubeId: string;
  title: string;
  creatorId: string;
  conditionIds: string[];
  durationSeconds: number;
  viewCount: number;
  thumbnailUrl: string;
  publishedAt: string;
  language: "en" | "hi";
  tags: string[];
}

export interface SearchResult {
  type: "condition" | "drug" | "test" | "creator" | "glossary" | "video";
  id: string;
  title: string;
  description: string;
  slug: string;
  category?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
