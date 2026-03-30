import { NextRequest, NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// AI Health Chat API Route
// ---------------------------------------------------------------------------

// TODO: Replace mock logic with real Anthropic API integration
//
// System prompt for when Anthropic API is connected:
//
// const SYSTEM_PROMPT = `You are HealthWise AI, a helpful health information assistant.
// You provide evidence-based health information to help users understand common
// health topics, symptoms, and wellness practices.
//
// Important guidelines:
// - Always recommend consulting a healthcare professional for medical advice
// - Never diagnose conditions or prescribe treatments
// - Cite general medical consensus when possible
// - Be empathetic and clear in your responses
// - Use bullet points and bold text for readability
// - If the user describes an emergency, advise them to call emergency services immediately
// - Keep responses concise but informative (2-4 paragraphs max)
// `;
//
// Example Anthropic integration:
//
// import Anthropic from "@anthropic-ai/sdk";
//
// const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
//
// const response = await anthropic.messages.create({
//   model: "claude-sonnet-4-20250514",
//   max_tokens: 1024,
//   system: SYSTEM_PROMPT,
//   messages: history.concat([{ role: "user", content: message }]),
// });

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequest {
  message: string;
  history: ChatMessage[];
}

// ---------------------------------------------------------------------------
// Mock response generator based on keywords
// ---------------------------------------------------------------------------

function generateMockResponse(message: string): string {
  const lower = message.toLowerCase();

  if (
    lower.includes("emergency") ||
    lower.includes("heart attack") ||
    lower.includes("stroke") ||
    lower.includes("can't breathe")
  ) {
    return `**If you are experiencing a medical emergency, please call 911 (or your local emergency number) immediately.**

This is not a situation where you should wait for online advice. Signs of a medical emergency include:

- Chest pain or pressure
- Sudden difficulty breathing
- Sudden numbness or weakness on one side of the body
- Severe allergic reactions
- Uncontrolled bleeding

Please seek immediate medical attention.`;
  }

  if (lower.includes("headache") || lower.includes("head pain")) {
    return `**Common Causes of Headaches**

Headaches can be caused by a variety of factors, including:

- **Tension headaches**: The most common type, often caused by stress, poor posture, or muscle tension in the neck and shoulders.
- **Migraines**: Intense, throbbing headaches often accompanied by nausea, light sensitivity, and visual disturbances.
- **Dehydration**: Not drinking enough water is a frequent and often overlooked cause.
- **Eye strain**: Prolonged screen time without breaks can trigger headaches.
- **Sinus issues**: Congestion and inflammation in the sinuses can cause pressure and pain.

**What you can do:**
- Stay well-hydrated throughout the day
- Take regular breaks from screens (follow the 20-20-20 rule)
- Practice good posture
- Manage stress through relaxation techniques
- Over-the-counter pain relievers can help, but avoid overuse`;
  }

  if (lower.includes("heart") || lower.includes("cardiovascular") || lower.includes("cholesterol")) {
    return `**Heart Health & Nutrition**

A heart-healthy diet can significantly reduce your risk of cardiovascular disease. Here are some of the best foods for your heart:

- **Fatty fish** (salmon, mackerel, sardines) — rich in omega-3 fatty acids that reduce inflammation
- **Berries** — packed with antioxidants and fiber
- **Leafy greens** (spinach, kale) — high in vitamins, minerals, and nitrates that help lower blood pressure
- **Whole grains** (oats, brown rice, quinoa) — help reduce LDL cholesterol
- **Nuts and seeds** — provide healthy fats, fiber, and plant sterols
- **Olive oil** — a staple of the Mediterranean diet, linked to lower heart disease risk

**Key lifestyle factors:**
- Aim for at least 150 minutes of moderate exercise per week
- Maintain a healthy weight
- Limit sodium, added sugars, and processed foods
- Avoid smoking and limit alcohol consumption
- Manage stress and get adequate sleep (7-9 hours)`;
  }

  if (lower.includes("diabetes") || lower.includes("blood sugar") || lower.includes("insulin")) {
    return `**Diabetes Prevention & Management**

Type 2 diabetes is largely preventable through lifestyle changes. Here are evidence-based strategies:

**Prevention tips:**
- **Maintain a healthy weight** — Losing even 5-7% of body weight can reduce risk by up to 58%
- **Stay active** — Regular physical activity helps your cells use insulin more effectively
- **Choose whole foods** — Focus on vegetables, lean proteins, whole grains, and healthy fats
- **Limit refined carbs and sugary drinks** — These cause rapid blood sugar spikes
- **Get enough fiber** — Aim for 25-35 grams daily to help regulate blood sugar

**Warning signs to watch for:**
- Increased thirst and frequent urination
- Unexplained weight loss
- Fatigue and blurred vision
- Slow-healing wounds
- Tingling in hands or feet

**Regular screening** is recommended if you are over 45, overweight, or have a family history of diabetes. Early detection makes a significant difference in outcomes.`;
  }

  if (lower.includes("stress") || lower.includes("anxiety") || lower.includes("mental health") || lower.includes("relax")) {
    return `**Effective Strategies for Reducing Stress**

Chronic stress can affect both your mental and physical health. Here are evidence-based approaches to managing stress:

**Immediate relief techniques:**
- **Deep breathing** — Try the 4-7-8 method: inhale for 4 seconds, hold for 7, exhale for 8
- **Progressive muscle relaxation** — Tense and release muscle groups from toes to head
- **Grounding exercises** — Use the 5-4-3-2-1 technique (5 things you see, 4 you touch, etc.)

**Long-term strategies:**
- **Regular exercise** — Even a 20-minute walk can reduce cortisol levels
- **Mindfulness meditation** — As little as 10 minutes daily has proven benefits
- **Quality sleep** — Maintain a consistent sleep schedule and wind-down routine
- **Social connection** — Spending time with supportive people buffers stress
- **Time management** — Prioritize tasks and learn to set boundaries
- **Limit caffeine and alcohol** — Both can worsen anxiety symptoms

**When to seek help:**
If stress is interfering with your daily life, relationships, or work, consider speaking with a mental health professional. Cognitive Behavioral Therapy (CBT) is particularly effective for stress and anxiety management.`;
  }

  if (lower.includes("sleep") || lower.includes("insomnia") || lower.includes("tired")) {
    return `**Improving Your Sleep Quality**

Good sleep is essential for both physical and mental health. Here are evidence-based tips for better rest:

- **Stick to a schedule** — Go to bed and wake up at the same time every day, even on weekends
- **Create a restful environment** — Keep your room cool (65-68°F / 18-20°C), dark, and quiet
- **Limit screen time** — Avoid blue light from devices at least 1 hour before bed
- **Watch your diet** — Avoid large meals, caffeine, and alcohol close to bedtime
- **Stay active** — Regular exercise promotes deeper sleep, but avoid vigorous activity within 3 hours of bedtime
- **Manage worries** — Try journaling or a brief meditation before bed

Most adults need **7-9 hours** of sleep per night. If you consistently struggle with sleep despite good habits, consider speaking with your doctor about possible sleep disorders.`;
  }

  // Default response for unmatched topics
  return `**Thank you for your question!**

That's a great topic to explore. While I can provide general health information, here are some key points to keep in mind:

- **Evidence-based sources** are always the best place to start — look for information from organizations like the WHO, CDC, or NIH
- **Individual health needs vary** — what works for one person may not be right for another
- **Prevention is key** — regular check-ups, a balanced diet, exercise, and good sleep form the foundation of good health
- **Stay informed** — health literacy helps you make better decisions and have more productive conversations with your healthcare providers

Feel free to ask me about specific topics like nutrition, exercise, mental health, common conditions, or preventive care — I'm here to help!`;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simulate a slight delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const response = generateMockResponse(message);

    return NextResponse.json({ response });
  } catch {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
