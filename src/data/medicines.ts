export interface Medicine {
  name: string;
  brands: string[];
  type: string;
  usage: string;
  prescriptionRequired: boolean;
}

export interface MedicineCategory {
  id: string;
  title: string;
  icon: string;
  medicines: Medicine[];
}

export const medicineCategories: MedicineCategory[] = [
  {
    id: "fever-cold",
    title: "Fever, Cold & Flu",
    icon: "Thermometer",
    medicines: [
      { name: "Paracetamol", brands: ["Crocin", "Dolo 650"], type: "Antipyretic", usage: "Fever, mild pain", prescriptionRequired: false },
      { name: "Ibuprofen", brands: ["Brufen"], type: "NSAID", usage: "Fever, inflammation, pain", prescriptionRequired: false },
      { name: "Cetirizine", brands: ["Cetzine"], type: "Antihistamine", usage: "Runny nose, sneezing, allergies", prescriptionRequired: false },
      { name: "Levocetirizine", brands: ["Xyzal"], type: "Antihistamine", usage: "Stronger allergy relief", prescriptionRequired: false },
      { name: "Dextromethorphan", brands: ["Benylin DM"], type: "Antitussive", usage: "Dry cough suppressant", prescriptionRequired: false },
      { name: "Guaifenesin", brands: ["Mucinex"], type: "Expectorant", usage: "Wet/productive cough", prescriptionRequired: false },
      { name: "Ambroxol", brands: ["Mucolite"], type: "Mucolytic", usage: "Mucus thinner", prescriptionRequired: false },
      { name: "Oseltamivir", brands: ["Tamiflu"], type: "Antiviral", usage: "Influenza treatment", prescriptionRequired: true },
    ],
  },
  {
    id: "antibiotics",
    title: "Infections & Antibiotics",
    icon: "Bug",
    medicines: [
      { name: "Amoxicillin", brands: ["Mox"], type: "Penicillin", usage: "Throat, ear, urinary, respiratory infections", prescriptionRequired: true },
      { name: "Amoxicillin + Clavulanic Acid", brands: ["Augmentin"], type: "Penicillin combo", usage: "Resistant bacterial infections", prescriptionRequired: true },
      { name: "Azithromycin", brands: ["Zithromax", "Azee"], type: "Macrolide", usage: "Respiratory, skin, STIs", prescriptionRequired: true },
      { name: "Ciprofloxacin", brands: ["Ciplox"], type: "Fluoroquinolone", usage: "Urinary, GI, bone infections", prescriptionRequired: true },
      { name: "Cefixime", brands: ["Taxim-O"], type: "Cephalosporin", usage: "Typhoid, UTI, respiratory", prescriptionRequired: true },
      { name: "Doxycycline", brands: ["Doxt-SL"], type: "Tetracycline", usage: "Acne, malaria, respiratory", prescriptionRequired: true },
      { name: "Metronidazole", brands: ["Flagyl"], type: "Nitroimidazole", usage: "Anaerobic, dental, GI infections", prescriptionRequired: true },
      { name: "Fluconazole", brands: ["Forcan"], type: "Antifungal", usage: "Candidiasis, ringworm", prescriptionRequired: true },
      { name: "Acyclovir", brands: ["Zovirax"], type: "Antiviral", usage: "Herpes, chickenpox, shingles", prescriptionRequired: true },
      { name: "Albendazole", brands: ["Zentel"], type: "Antiparasitic", usage: "Deworming", prescriptionRequired: false },
    ],
  },
  {
    id: "diabetes",
    title: "Diabetes",
    icon: "Droplets",
    medicines: [
      { name: "Metformin", brands: ["Glycomet", "Glumet"], type: "Biguanide", usage: "First-line Type 2, insulin sensitizer", prescriptionRequired: true },
      { name: "Glimepiride", brands: ["Amaryl"], type: "Sulfonylurea", usage: "Stimulates insulin secretion", prescriptionRequired: true },
      { name: "Sitagliptin", brands: ["Januvia"], type: "DPP-4 Inhibitor", usage: "Blood sugar control", prescriptionRequired: true },
      { name: "Empagliflozin", brands: ["Jardiance"], type: "SGLT2 Inhibitor", usage: "Blood sugar + heart/kidney protective", prescriptionRequired: true },
      { name: "Insulin Glargine", brands: ["Lantus"], type: "Long-acting Insulin", usage: "Basal insulin coverage", prescriptionRequired: true },
      { name: "Semaglutide", brands: ["Ozempic"], type: "GLP-1 Agonist", usage: "Blood sugar + significant weight loss", prescriptionRequired: true },
      { name: "Pregabalin", brands: ["Lyrica"], type: "Anticonvulsant", usage: "Diabetic nerve pain", prescriptionRequired: true },
      { name: "Methylcobalamin", brands: ["Mecobalamin"], type: "Vitamin B12", usage: "Nerve health support", prescriptionRequired: false },
    ],
  },
  {
    id: "heart-bp",
    title: "Blood Pressure & Heart",
    icon: "Heart",
    medicines: [
      { name: "Amlodipine", brands: ["Amlong", "Stamlo"], type: "Calcium Channel Blocker", usage: "Hypertension", prescriptionRequired: true },
      { name: "Telmisartan", brands: ["Telma"], type: "ARB", usage: "BP control, kidney protective", prescriptionRequired: true },
      { name: "Ramipril", brands: ["Cardace"], type: "ACE Inhibitor", usage: "Hypertension, heart failure", prescriptionRequired: true },
      { name: "Metoprolol", brands: ["Betaloc"], type: "Beta Blocker", usage: "BP, heart rate control", prescriptionRequired: true },
      { name: "Atorvastatin", brands: ["Lipitor", "Atorva"], type: "Statin", usage: "Cholesterol reduction", prescriptionRequired: true },
      { name: "Clopidogrel", brands: ["Plavix", "Clopilet"], type: "Antiplatelet", usage: "Blood thinner, prevent clots", prescriptionRequired: true },
      { name: "Aspirin 75mg", brands: ["Ecosprin"], type: "Antiplatelet", usage: "Cardioprotective low-dose", prescriptionRequired: false },
      { name: "Rivaroxaban", brands: ["Xarelto"], type: "Anticoagulant", usage: "Blood thinner (newer)", prescriptionRequired: true },
    ],
  },
  {
    id: "respiratory",
    title: "Respiratory & Allergies",
    icon: "Wind",
    medicines: [
      { name: "Salbutamol Inhaler", brands: ["Asthalin"], type: "SABA", usage: "Rescue/quick relief for asthma", prescriptionRequired: true },
      { name: "Budesonide Inhaler", brands: ["Budecort"], type: "ICS", usage: "Preventive asthma steroid", prescriptionRequired: true },
      { name: "Formoterol + Budesonide", brands: ["Symbicort"], type: "LABA + ICS", usage: "Combination maintenance", prescriptionRequired: true },
      { name: "Montelukast", brands: ["Singulair", "Montair"], type: "LTRA", usage: "Allergic rhinitis, asthma prevention", prescriptionRequired: true },
      { name: "Fexofenadine", brands: ["Allegra"], type: "Antihistamine", usage: "Non-sedating allergy relief", prescriptionRequired: false },
      { name: "Fluticasone Nasal Spray", brands: ["Flonase"], type: "Nasal Corticosteroid", usage: "Nasal allergy relief", prescriptionRequired: false },
    ],
  },
  {
    id: "digestive",
    title: "Digestive & Liver",
    icon: "Utensils",
    medicines: [
      { name: "Pantoprazole", brands: ["Pan 40"], type: "PPI", usage: "Acidity, GERD, ulcers", prescriptionRequired: true },
      { name: "Omeprazole", brands: ["Omez"], type: "PPI", usage: "Acid reduction", prescriptionRequired: false },
      { name: "Domperidone", brands: ["Domstal"], type: "Prokinetic", usage: "Nausea, bloating, motility", prescriptionRequired: false },
      { name: "Ondansetron", brands: ["Emeset", "Zofran"], type: "Antiemetic", usage: "Strong anti-nausea", prescriptionRequired: true },
      { name: "ORS", brands: ["Electral"], type: "Rehydration", usage: "Diarrhea rehydration (critical)", prescriptionRequired: false },
      { name: "Lactulose", brands: ["Duphalac"], type: "Osmotic Laxative", usage: "Constipation relief", prescriptionRequired: false },
      { name: "Ursodeoxycholic Acid", brands: ["Udiliv"], type: "Hepatoprotective", usage: "Fatty liver, gallstones", prescriptionRequired: true },
      { name: "Mebeverine", brands: ["Mebex"], type: "Antispasmodic", usage: "IBS cramp relief", prescriptionRequired: true },
    ],
  },
  {
    id: "bones-joints",
    title: "Bones, Joints & Pain",
    icon: "Bone",
    medicines: [
      { name: "Diclofenac", brands: ["Voveran"], type: "NSAID", usage: "Pain, inflammation, arthritis", prescriptionRequired: false },
      { name: "Etoricoxib", brands: ["Nucoxia"], type: "COX-2 Inhibitor", usage: "Joint pain, fewer GI effects", prescriptionRequired: true },
      { name: "Colchicine", brands: ["Colchisol"], type: "Anti-gout", usage: "Acute gout attacks", prescriptionRequired: true },
      { name: "Allopurinol", brands: ["Zyloric"], type: "Xanthine Oxidase Inhibitor", usage: "Chronic gout, uric acid control", prescriptionRequired: true },
      { name: "Calcium + Vitamin D3", brands: ["Shelcal", "Calcimax"], type: "Supplement", usage: "Bone health, osteoporosis prevention", prescriptionRequired: false },
      { name: "Alendronate", brands: ["Osteofos"], type: "Bisphosphonate", usage: "Osteoporosis treatment", prescriptionRequired: true },
      { name: "Pregabalin", brands: ["Lyrica", "Pregalin"], type: "Anticonvulsant", usage: "Nerve pain, neuropathy", prescriptionRequired: true },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health",
    icon: "Brain",
    medicines: [
      { name: "Escitalopram", brands: ["Nexito"], type: "SSRI", usage: "Depression, first-line", prescriptionRequired: true },
      { name: "Sertraline", brands: ["Daxid"], type: "SSRI", usage: "Depression + anxiety", prescriptionRequired: true },
      { name: "Duloxetine", brands: ["Duzela"], type: "SNRI", usage: "Depression + nerve pain", prescriptionRequired: true },
      { name: "Buspirone", brands: ["Buspin"], type: "Anxiolytic", usage: "Non-addictive anxiety", prescriptionRequired: true },
      { name: "Melatonin", brands: ["Meloset"], type: "Hormone", usage: "Sleep cycle regulation", prescriptionRequired: false },
      { name: "Zolpidem", brands: ["Zolfresh"], type: "Sedative-Hypnotic", usage: "Short-term insomnia", prescriptionRequired: true },
    ],
  },
  {
    id: "skin-hair",
    title: "Skin & Hair",
    icon: "Sparkles",
    medicines: [
      { name: "Benzoyl Peroxide", brands: ["Benzac"], type: "Topical", usage: "Kills acne bacteria", prescriptionRequired: false },
      { name: "Adapalene", brands: ["Differin", "Adaferin"], type: "Retinoid", usage: "Acne treatment", prescriptionRequired: false },
      { name: "Mometasone Cream", brands: ["Elocon"], type: "Corticosteroid", usage: "Eczema, dermatitis", prescriptionRequired: true },
      { name: "Minoxidil 5%", brands: ["Tugain", "Rogaine"], type: "Vasodilator", usage: "Hair regrowth", prescriptionRequired: false },
      { name: "Finasteride 1mg", brands: ["Finpecia"], type: "5-ARI", usage: "Male pattern hair loss", prescriptionRequired: true },
      { name: "Clotrimazole Cream", brands: ["Candid"], type: "Antifungal", usage: "Ringworm, candida", prescriptionRequired: false },
    ],
  },
  {
    id: "womens-health",
    title: "Women's Health",
    icon: "Heart",
    medicines: [
      { name: "Mefenamic Acid", brands: ["Meftal Spas"], type: "NSAID", usage: "Period cramps, menstrual pain", prescriptionRequired: false },
      { name: "Tranexamic Acid", brands: ["Pause"], type: "Antifibrinolytic", usage: "Heavy menstrual bleeding", prescriptionRequired: true },
      { name: "Metformin", brands: ["Glycomet"], type: "Biguanide", usage: "PCOS insulin resistance", prescriptionRequired: true },
      { name: "Letrozole", brands: ["Femara"], type: "Aromatase Inhibitor", usage: "PCOS ovulation induction", prescriptionRequired: true },
      { name: "Nitrofurantoin", brands: ["Furadantin"], type: "Antibiotic", usage: "UTI first-line treatment", prescriptionRequired: true },
      { name: "Fosfomycin", brands: ["Monurol"], type: "Antibiotic", usage: "Single-dose UTI treatment", prescriptionRequired: true },
    ],
  },
  {
    id: "vitamins",
    title: "Vitamins & Supplements",
    icon: "Pill",
    medicines: [
      { name: "Vitamin D3", brands: ["D-Rise", "Calcirol"], type: "Vitamin", usage: "Bone health, immunity (1000-2000 IU daily)", prescriptionRequired: false },
      { name: "Vitamin B12", brands: ["Methylcobalamin"], type: "Vitamin", usage: "Energy, nerve health", prescriptionRequired: false },
      { name: "Iron (Ferrous Sulphate)", brands: ["Autrin", "Livogen"], type: "Mineral", usage: "Iron-deficiency anemia", prescriptionRequired: false },
      { name: "Omega-3 Fish Oil", brands: ["EPA + DHA"], type: "Fatty Acid", usage: "Heart, brain, joint health", prescriptionRequired: false },
      { name: "Calcium 500-1000mg", brands: ["Shelcal", "Calcimax"], type: "Mineral", usage: "Bone health", prescriptionRequired: false },
      { name: "Magnesium", brands: ["Various"], type: "Mineral", usage: "Muscle, sleep, cramp relief", prescriptionRequired: false },
      { name: "Zinc", brands: ["Zincovit"], type: "Mineral", usage: "Immunity, skin, hair health", prescriptionRequired: false },
      { name: "Folic Acid", brands: ["Folvite"], type: "Vitamin B9", usage: "Pregnancy, anemia prevention", prescriptionRequired: false },
      { name: "Ashwagandha (KSM-66)", brands: ["Various"], type: "Adaptogen", usage: "Stress, energy, vitality", prescriptionRequired: false },
      { name: "Curcumin/Turmeric", brands: ["Various"], type: "Anti-inflammatory", usage: "Joint pain, inflammation", prescriptionRequired: false },
    ],
  },
  {
    id: "emergency",
    title: "Emergency & First-Aid",
    icon: "AlertTriangle",
    medicines: [
      { name: "Epinephrine Auto-Injector", brands: ["EpiPen"], type: "Sympathomimetic", usage: "Anaphylaxis - life-saving", prescriptionRequired: true },
      { name: "Aspirin 325mg Chewable", brands: ["Disprin"], type: "Antiplatelet", usage: "Suspected heart attack", prescriptionRequired: false },
      { name: "Activated Charcoal", brands: ["Various"], type: "Adsorbent", usage: "Oral poison absorption", prescriptionRequired: false },
      { name: "Povidone-Iodine", brands: ["Betadine"], type: "Antiseptic", usage: "Wound cleaning", prescriptionRequired: false },
      { name: "Silver Sulfadiazine", brands: ["Silverex"], type: "Topical", usage: "Burns treatment", prescriptionRequired: false },
      { name: "Glucose Tablets", brands: ["Various"], type: "Sugar", usage: "Diabetic hypoglycemia", prescriptionRequired: false },
    ],
  },
];

export const MEDICINE_DISCLAIMER = "This information is for general educational reference only. It does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting, stopping, or changing any medication. Self-medication can be dangerous. Dosages, interactions, and suitability vary by individual.";
