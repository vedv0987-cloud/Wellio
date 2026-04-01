"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  HeartPulse,
  AlertTriangle,
  Flame,
  Droplets,
  Bone,
  Brain,
  Phone,
  ShieldAlert,
  Snowflake,
  Bug,
  Wind,
  Thermometer,
  Zap,
  Baby,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { HeartIllustration, FloatingIllustration } from "@/components/ui/MedicalIllustrations";

interface ProcedureStep {
  step: number;
  instruction: string;
  important?: string;
}

interface Procedure {
  id: string;
  title: string;
  icon: React.ReactNode;
  timeCritical: boolean;
  steps: ProcedureStep[];
}

const procedures: Procedure[] = [
  {
    id: "cpr",
    title: "CPR",
    icon: <HeartPulse className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Check the scene for safety and tap the person to check responsiveness. Shout 'Are you okay?'" },
      { step: 2, instruction: "Call emergency services (112/911) immediately or ask someone nearby to call.", important: "Do not leave the person alone unless absolutely necessary to call for help." },
      { step: 3, instruction: "Place the person on their back on a firm, flat surface. Tilt the head back slightly and lift the chin to open the airway." },
      { step: 4, instruction: "Check for breathing for no more than 10 seconds. Look for chest rise, listen for breath sounds, and feel for air on your cheek." },
      { step: 5, instruction: "If not breathing normally, begin chest compressions. Place the heel of one hand on the center of the chest, interlock fingers, and push hard and fast at least 2 inches deep.", important: "Compress at a rate of 100-120 compressions per minute. Let the chest fully recoil between compressions." },
      { step: 6, instruction: "After 30 compressions, give 2 rescue breaths. Tilt the head, lift the chin, pinch the nose, and blow into the mouth for about 1 second each." },
      { step: 7, instruction: "Continue cycles of 30 compressions and 2 breaths until emergency services arrive or the person starts breathing." },
    ],
  },
  {
    id: "choking-adult",
    title: "Choking (Adult)",
    icon: <Wind className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Ask the person 'Are you choking?' If they cannot speak, cough, or breathe, act immediately." },
      { step: 2, instruction: "Stand behind the person and wrap your arms around their waist. Lean them slightly forward." },
      { step: 3, instruction: "Make a fist with one hand and place it just above the navel, below the ribcage." },
      { step: 4, instruction: "Grasp your fist with the other hand and press hard into the abdomen with a quick, upward thrust.", important: "Each thrust should be a separate, distinct movement. Do not squeeze the ribcage." },
      { step: 5, instruction: "Repeat abdominal thrusts until the object is expelled or the person can breathe/cough." },
      { step: 6, instruction: "If the person becomes unconscious, lower them to the ground and begin CPR. Check the mouth for visible objects before giving breaths." },
      { step: 7, instruction: "Call 112/911 if the object does not come out after several attempts or if the person loses consciousness." },
    ],
  },
  {
    id: "choking-child",
    title: "Choking (Child)",
    icon: <Baby className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "For infants under 1 year: Place face-down on your forearm, supporting the head. Give 5 firm back blows between the shoulder blades." },
      { step: 2, instruction: "Turn the infant face-up on your forearm. Give 5 chest thrusts using two fingers on the center of the breastbone.", important: "Do NOT use abdominal thrusts on infants under 1 year old." },
      { step: 3, instruction: "For children over 1 year: Stand or kneel behind the child and perform abdominal thrusts similar to the adult technique but with less force." },
      { step: 4, instruction: "Alternate between 5 back blows and 5 abdominal thrusts (or chest thrusts for infants) until the object is dislodged." },
      { step: 5, instruction: "If the child becomes unconscious, place on a firm surface and begin child CPR (30 compressions to 2 breaths)." },
      { step: 6, instruction: "Look in the mouth before giving breaths. Only remove visible objects; do not do blind finger sweeps.", important: "Blind finger sweeps can push the object deeper into the airway." },
      { step: 7, instruction: "Call emergency services immediately if the child does not recover quickly. Seek medical evaluation even after successful removal." },
    ],
  },
  {
    id: "burns",
    title: "Burns",
    icon: <Flame className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Remove the person from the source of the burn. Remove clothing and jewelry near the burned area unless stuck to the skin." },
      { step: 2, instruction: "Cool the burn under cool (not cold) running water for at least 20 minutes.", important: "Do NOT use ice, butter, toothpaste, or any home remedies on the burn. These can worsen damage." },
      { step: 3, instruction: "After cooling, cover the burn loosely with a clean, non-stick sterile bandage or clean cloth." },
      { step: 4, instruction: "For pain relief, give over-the-counter pain medication like ibuprofen or paracetamol if available." },
      { step: 5, instruction: "Do not pop blisters. They protect the underlying skin from infection." },
      { step: 6, instruction: "Watch for signs of shock: pale skin, weakness, rapid pulse. Keep the person warm with a blanket over unburned areas.", important: "Chemical burns require continuous flushing with water for at least 20 minutes. Remove contaminated clothing carefully." },
      { step: 7, instruction: "Seek emergency medical care for burns larger than 3 inches, burns on the face/hands/feet/joints, deep burns, or chemical/electrical burns." },
    ],
  },
  {
    id: "severe-bleeding",
    title: "Severe Bleeding",
    icon: <Droplets className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Call emergency services (112/911) immediately for severe or uncontrollable bleeding." },
      { step: 2, instruction: "Put on gloves if available. Apply firm, direct pressure to the wound using a clean cloth, bandage, or clothing.", important: "Do NOT remove the cloth if it soaks through. Add more layers on top and continue pressing." },
      { step: 3, instruction: "If possible, elevate the injured limb above the level of the heart to slow bleeding." },
      { step: 4, instruction: "Maintain continuous pressure for at least 15 minutes without checking. Use body weight if hand pressure is not enough." },
      { step: 5, instruction: "If bleeding does not stop with direct pressure on a limb, apply a tourniquet 2-3 inches above the wound (not on a joint).", important: "Note the time the tourniquet was applied. Do NOT remove it once applied - only medical professionals should remove it." },
      { step: 6, instruction: "Keep the person calm, warm, and lying down. Monitor for signs of shock: pale skin, rapid breathing, confusion." },
      { step: 7, instruction: "Do not remove embedded objects from the wound. Stabilize them in place and apply pressure around the object." },
    ],
  },
  {
    id: "fractures",
    title: "Fractures",
    icon: <Bone className="w-6 h-6" />,
    timeCritical: false,
    steps: [
      { step: 1, instruction: "Keep the injured person still. Do not attempt to realign the bone or push a bone that is sticking out back in." },
      { step: 2, instruction: "Call emergency services if the fracture is severe, involves the spine/head/pelvis, or if the person cannot move.", important: "If you suspect a spinal injury, do NOT move the person. Keep them completely still until help arrives." },
      { step: 3, instruction: "Immobilize the injured area. Use a splint (stiff material like a board, rolled magazine, or pillow) to prevent movement." },
      { step: 4, instruction: "Apply the splint above and below the fracture site. Secure with bandages, cloth strips, or tape, but not too tightly." },
      { step: 5, instruction: "Apply ice wrapped in cloth to the injured area for 20 minutes to reduce swelling. Do not apply ice directly to skin." },
      { step: 6, instruction: "Treat for shock if needed: lay the person flat, elevate legs if no spinal injury is suspected, and keep warm." },
      { step: 7, instruction: "Give over-the-counter pain relief if available. Do not give food or drink in case surgery is needed." },
    ],
  },
  {
    id: "heart-attack",
    title: "Heart Attack Signs",
    icon: <HeartPulse className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Recognize the signs: chest pain or pressure, pain spreading to arm/jaw/back, shortness of breath, cold sweat, nausea, lightheadedness.", important: "Women may experience atypical symptoms: unusual fatigue, back/jaw pain, nausea without chest pain." },
      { step: 2, instruction: "Call emergency services (112/911) immediately. Do not drive yourself to the hospital." },
      { step: 3, instruction: "Have the person sit down in a comfortable position, typically semi-upright (leaning back slightly)." },
      { step: 4, instruction: "If the person is not allergic and has no bleeding disorder, give one regular aspirin (325mg) to chew slowly.", important: "Chewing aspirin allows faster absorption. Do NOT give aspirin if allergic or if there is a history of bleeding disorders." },
      { step: 5, instruction: "If the person has prescribed nitroglycerin, help them take it as directed." },
      { step: 6, instruction: "Loosen any tight clothing. Keep the person calm and reassured. Monitor their breathing." },
      { step: 7, instruction: "If the person becomes unconscious and stops breathing, begin CPR immediately (30 compressions to 2 breaths)." },
    ],
  },
  {
    id: "stroke-fast",
    title: "Stroke (FAST)",
    icon: <Brain className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "F - FACE: Ask the person to smile. Does one side of the face droop?", important: "Time is critical in stroke. Every minute without treatment, about 1.9 million neurons are lost." },
      { step: 2, instruction: "A - ARMS: Ask the person to raise both arms. Does one arm drift downward?" },
      { step: 3, instruction: "S - SPEECH: Ask the person to repeat a simple phrase. Is their speech slurred or strange?" },
      { step: 4, instruction: "T - TIME: If you observe any of these signs, call 112/911 immediately. Note the time symptoms started." },
      { step: 5, instruction: "Lay the person down with head and shoulders slightly elevated. Turn them on their side if vomiting." },
      { step: 6, instruction: "Do NOT give the person food, drink, or medication. Do not let them go to sleep.", important: "Do NOT give aspirin during a stroke - it could worsen a hemorrhagic stroke (bleeding in the brain)." },
      { step: 7, instruction: "Stay with the person, keep them calm, and monitor consciousness until emergency services arrive." },
    ],
  },
  {
    id: "allergic-reaction",
    title: "Allergic Reaction",
    icon: <ShieldAlert className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Identify signs of severe allergic reaction (anaphylaxis): difficulty breathing, swelling of face/throat, hives, rapid pulse, dizziness, nausea.", important: "Anaphylaxis can be fatal within minutes. Act immediately if breathing is affected." },
      { step: 2, instruction: "Call emergency services (112/911) immediately if severe symptoms are present." },
      { step: 3, instruction: "If the person has an epinephrine auto-injector (EpiPen), help them use it immediately. Inject into the outer thigh." },
      { step: 4, instruction: "Have the person lie down with legs elevated unless they are having trouble breathing. If breathing is difficult, let them sit upright." },
      { step: 5, instruction: "Remove the allergen source if possible (e.g., remove a bee stinger by scraping, not squeezing)." },
      { step: 6, instruction: "If symptoms do not improve in 5-15 minutes, a second dose of epinephrine may be given.", important: "Even if epinephrine provides relief, the person must still go to the hospital - symptoms can return (biphasic reaction)." },
      { step: 7, instruction: "Monitor breathing and pulse. If the person becomes unconscious and stops breathing, begin CPR." },
    ],
  },
  {
    id: "poisoning",
    title: "Poisoning",
    icon: <AlertTriangle className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Call Poison Control or emergency services immediately. Try to identify the substance, amount, and time of ingestion.", important: "Do NOT induce vomiting unless specifically told to by Poison Control or a medical professional." },
      { step: 2, instruction: "If the person is conscious and alert, gather information: what was swallowed, when, and how much." },
      { step: 3, instruction: "For skin contact with poison: remove contaminated clothing and rinse skin with running water for 15-20 minutes." },
      { step: 4, instruction: "For inhaled poison: move the person to fresh air immediately. Open doors and windows." },
      { step: 5, instruction: "For poison in the eyes: flush the eyes with clean, lukewarm water for at least 15-20 minutes." },
      { step: 6, instruction: "If the person is unconscious, place them in the recovery position (on their side). Check airway and breathing.", important: "Save any containers, pills, or vomit samples to help medical professionals identify the poison." },
      { step: 7, instruction: "Do not give the person anything to eat or drink unless instructed by Poison Control. Monitor vital signs until help arrives." },
    ],
  },
  {
    id: "drowning",
    title: "Drowning",
    icon: <Droplets className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Get the person out of the water safely. Use a reaching or throwing rescue if possible - do not jump in unless trained.", important: "Do NOT put yourself in danger. A drowning person can pull rescuers underwater." },
      { step: 2, instruction: "Call emergency services (112/911) immediately." },
      { step: 3, instruction: "Lay the person flat on their back on a firm surface. Check for responsiveness by tapping and shouting." },
      { step: 4, instruction: "Open the airway by tilting the head back and lifting the chin. Check for breathing for no more than 10 seconds." },
      { step: 5, instruction: "If not breathing, give 5 initial rescue breaths. Then start CPR: 30 chest compressions followed by 2 rescue breaths.", important: "Do NOT attempt to drain water from the lungs. Focus on CPR and rescue breathing." },
      { step: 6, instruction: "Continue CPR until the person starts breathing or emergency services arrive. Do not give up." },
      { step: 7, instruction: "Once breathing resumes, place in recovery position (on side). Keep warm by covering with dry blankets. Monitor continuously." },
    ],
  },
  {
    id: "heat-stroke",
    title: "Heat Stroke",
    icon: <Thermometer className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Recognize heat stroke signs: body temperature above 104°F (40°C), hot/red/dry skin (no sweating), rapid pulse, confusion, loss of consciousness.", important: "Heat stroke is a life-threatening emergency. It is different from heat exhaustion - the body has lost its ability to cool itself." },
      { step: 2, instruction: "Call emergency services (112/911) immediately." },
      { step: 3, instruction: "Move the person to a cool, shaded area or air-conditioned room immediately." },
      { step: 4, instruction: "Begin rapid cooling: remove excess clothing and apply ice packs to neck, armpits, and groin area." },
      { step: 5, instruction: "If possible, immerse the person in cold water or spray with cool water while fanning aggressively." },
      { step: 6, instruction: "Do NOT give the person fluids if they are confused or unconscious. If alert, give small sips of cool water.", important: "Stop cooling efforts if the person starts to shiver, as shivering generates more heat." },
      { step: 7, instruction: "Monitor body temperature and consciousness. Continue cooling until temperature drops below 102°F (38.9°C) or help arrives." },
    ],
  },
  {
    id: "hypothermia",
    title: "Hypothermia",
    icon: <Snowflake className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Recognize hypothermia signs: shivering (may stop in severe cases), confusion, slurred speech, slow breathing, drowsiness, loss of coordination.", important: "Severe hypothermia is a medical emergency. The person may appear dead but may still be resuscitable." },
      { step: 2, instruction: "Call emergency services (112/911) for moderate to severe hypothermia." },
      { step: 3, instruction: "Move the person gently to a warm, dry shelter. Handle very gently - rough movement can trigger cardiac arrest.", important: "Do NOT rub or massage the limbs. Do NOT use direct heat like hot water bottles directly on skin." },
      { step: 4, instruction: "Remove wet clothing carefully and replace with dry layers and blankets. Cover the head." },
      { step: 5, instruction: "Warm the person gradually, focusing on the core (chest, neck, head, groin). Use skin-to-skin contact under blankets if needed." },
      { step: 6, instruction: "If the person is conscious and can swallow, give warm (not hot) sweet drinks. Avoid alcohol and caffeine." },
      { step: 7, instruction: "Monitor breathing and pulse. If no pulse or breathing, begin CPR gently. Continue until help arrives." },
    ],
  },
  {
    id: "seizures",
    title: "Seizures",
    icon: <Zap className="w-6 h-6" />,
    timeCritical: false,
    steps: [
      { step: 1, instruction: "Stay calm and note the time the seizure starts. Most seizures end on their own within 1-3 minutes.", important: "Call 112/911 if the seizure lasts more than 5 minutes, the person does not regain consciousness, or it is their first seizure." },
      { step: 2, instruction: "Clear the area around the person of any hard or sharp objects that could cause injury." },
      { step: 3, instruction: "Gently guide the person to the floor if they are standing. Place something soft under their head." },
      { step: 4, instruction: "Turn the person on their side (recovery position) to prevent choking on saliva or vomit.", important: "NEVER put anything in the person's mouth during a seizure. They cannot swallow their tongue." },
      { step: 5, instruction: "Do NOT restrain the person or try to hold them down. Do not attempt to stop the movements." },
      { step: 6, instruction: "After the seizure ends, stay with the person. They may be confused or sleepy. Speak calmly and reassuringly." },
      { step: 7, instruction: "Check for injuries after the seizure. Place in recovery position if drowsy. Do not offer food or water until fully alert." },
    ],
  },
  {
    id: "snake-bite",
    title: "Snake Bite",
    icon: <Bug className="w-6 h-6" />,
    timeCritical: true,
    steps: [
      { step: 1, instruction: "Move away from the snake to a safe distance. Try to remember the snake's color and shape but do NOT try to catch it.", important: "Even a dead or decapitated snake can bite reflexively for up to an hour." },
      { step: 2, instruction: "Call emergency services (112/911) immediately. All snake bites should be treated as a medical emergency." },
      { step: 3, instruction: "Keep the person calm and still. Restrict movement as much as possible to slow the spread of venom." },
      { step: 4, instruction: "Remove jewelry, watches, and tight clothing near the bite before swelling starts." },
      { step: 5, instruction: "Keep the bitten limb at or below heart level. Do NOT elevate it.", important: "Do NOT apply a tourniquet, cut the wound, try to suck out venom, or apply ice. These are harmful myths." },
      { step: 6, instruction: "Clean the wound gently with soap and water. Cover with a clean, dry bandage." },
      { step: 7, instruction: "Mark the edge of swelling with a pen and note the time. This helps doctors track venom spread. Get to a hospital with antivenom as quickly as possible." },
    ],
  },
];

export default function FirstAidPage() {
  const [selectedProcedure, setSelectedProcedure] = useState<Procedure | null>(null);

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
          className="text-center mb-10 relative"
        >
          {/* Floating heart illustration */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <FloatingIllustration className="opacity-50">
              <HeartIllustration size={90} />
            </FloatingIllustration>
          </div>
          <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:block">
            <FloatingIllustration className="opacity-50">
              <HeartIllustration size={70} />
            </FloatingIllustration>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold font-display mb-3">
            First Aid Guide
          </h1>
          <p className="text-lg" style={{ color: "var(--hw-text-secondary)" }}>
            Emergency Procedures
          </p>
        </motion.div>

        {/* Emergency Numbers Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="max-w-2xl mx-auto mb-10 rounded-xl border p-5 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
          style={{
            backgroundColor: "rgba(239, 68, 68, 0.08)",
            borderColor: "rgba(239, 68, 68, 0.3)",
          }}
        >
          <Phone className="w-6 h-6 text-red-500 shrink-0" />
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 text-center">
            <div>
              <span className="text-sm font-medium" style={{ color: "var(--hw-text-secondary)" }}>
                India Emergency
              </span>
              <a
                href="tel:112"
                className="block text-2xl font-bold text-red-500 hover:text-red-400 transition-colors"
              >
                112
              </a>
            </div>
            <div
              className="hidden sm:block w-px h-10"
              style={{ backgroundColor: "var(--hw-border)" }}
            />
            <div>
              <span className="text-sm font-medium" style={{ color: "var(--hw-text-secondary)" }}>
                US Emergency
              </span>
              <a
                href="tel:911"
                className="block text-2xl font-bold text-red-500 hover:text-red-400 transition-colors"
              >
                911
              </a>
            </div>
          </div>
        </motion.div>

        {/* Procedure Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {procedures.map((procedure, idx) => (
            <motion.button
              key={procedure.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(239,68,68,0.15)" }}
              onClick={() => setSelectedProcedure(procedure)}
              className="rounded-xl border p-5 text-left transition-all duration-200 hover:border-red-400/50 group"
              style={{
                backgroundColor: "var(--hw-surface)",
                borderColor: "var(--hw-border)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110"
                  style={{
                    background: procedure.timeCritical
                      ? "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))"
                      : "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(245,158,11,0.05))",
                    color: procedure.timeCritical ? "#ef4444" : "#f59e0b",
                  }}
                >
                  {procedure.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-semibold font-[family-name:var(--font-display)]" style={{ color: "var(--hw-text-primary)" }}>
                      {procedure.title}
                    </h3>
                  </div>
                  {procedure.timeCritical && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-red-500/15 text-red-400">
                      <AlertTriangle className="w-3 h-3" />
                      Time Critical
                    </span>
                  )}
                  <p className="text-xs mt-1" style={{ color: "var(--hw-text-muted)" }}>
                    {procedure.steps.length} steps — Click to view
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Procedure Detail Modal */}
        <Modal
          isOpen={!!selectedProcedure}
          onClose={() => setSelectedProcedure(null)}
          title={selectedProcedure?.title ?? ""}
          size="lg"
        >
          {selectedProcedure && (
            <div className="space-y-5">
              {/* Header with icon */}
              <div className="flex items-center gap-4 pb-4" style={{ borderBottom: "1px solid var(--hw-border)" }}>
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(239,68,68,0.05))",
                    color: "#ef4444",
                  }}
                >
                  {selectedProcedure.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold font-[family-name:var(--font-display)]" style={{ color: "var(--hw-text-primary)" }}>
                    {selectedProcedure.title}
                  </h3>
                  {selectedProcedure.timeCritical && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500/15 text-red-400 mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      Time Critical — Act Immediately
                    </span>
                  )}
                </div>
              </div>

              {/* Emergency banner */}
              <div
                className="p-4 rounded-xl flex items-center gap-3"
                style={{
                  background: "linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))",
                  border: "1px solid rgba(239,68,68,0.2)",
                }}
              >
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <p className="text-sm font-medium" style={{ color: "var(--hw-text-primary)" }}>
                  Emergency: <span className="text-red-500 font-bold">112</span> (India) | <span className="text-red-500 font-bold">911</span> (US) | <span className="text-red-500 font-bold">999</span> (UK)
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--hw-text-muted)" }}>
                  Step-by-Step Instructions
                </h4>
                {selectedProcedure.steps.map((s, i) => (
                  <motion.div
                    key={s.step}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex gap-3"
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #ef4444, #dc2626)" }}
                    >
                      {s.step}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <p className="text-sm leading-relaxed" style={{ color: "var(--hw-text-secondary)" }}>
                        {s.instruction}
                      </p>
                      {s.important && (
                        <div
                          className="mt-2 p-3 rounded-lg text-sm"
                          style={{
                            backgroundColor: "rgba(239,68,68,0.06)",
                            border: "1px solid rgba(239,68,68,0.15)",
                          }}
                        >
                          <div className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                            <span className="text-red-400 font-medium">{s.important}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
