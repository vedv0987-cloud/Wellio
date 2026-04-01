"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  SendHorizontal,
  Bot,
  User,
  AlertTriangle,
  Heart,
  Brain,
  Pill,
  Stethoscope,
  Sparkles,
  CheckCircle2,
  Hash,
} from "lucide-react";
import { BrainIllustration, FloatingIllustration } from "@/components/ui/MedicalIllustrations";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// ---------------------------------------------------------------------------
// Suggested prompts
// ---------------------------------------------------------------------------

const SUGGESTED_PROMPTS = [
  { text: "What causes headaches?", icon: Brain },
  { text: "Best foods for heart health", icon: Heart },
  { text: "Diabetes prevention tips", icon: Pill },
  { text: "How to reduce stress", icon: Stethoscope },
];

// ---------------------------------------------------------------------------
// Related topics for AI messages
// ---------------------------------------------------------------------------

const RELATED_TOPICS = [
  ["Prevention", "Treatment Options", "When to See a Doctor"],
  ["Lifestyle Changes", "Diet Tips", "Exercise"],
  ["Symptoms", "Diagnosis", "Home Remedies"],
];

function getRelatedTopics(index: number) {
  return RELATED_TOPICS[index % RELATED_TOPICS.length];
}

// ---------------------------------------------------------------------------
// Floating health icon component
// ---------------------------------------------------------------------------

function FloatingIcon({
  icon: Icon,
  delay,
  x,
  y,
  size,
  color,
}: {
  icon: React.ElementType;
  delay: number;
  x: number;
  y: number;
  size: number;
  color: string;
}) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.25, 0.15, 0.25, 0],
        scale: [0.8, 1, 1.1, 1, 0.8],
        y: [0, -15, 0, 15, 0],
        rotate: [0, 5, -5, 3, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    >
      <Icon size={size} style={{ color }} />
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Markdown-like renderer (enhanced)
// ---------------------------------------------------------------------------

function renderMessageContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, i) => {
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }

    // Bullet points - detect tips vs warnings
    if (line.trim().startsWith("- ")) {
      const text = line.trim().slice(2);
      const isWarning =
        /warning|caution|avoid|danger|risk|emergency|serious|severe/i.test(
          text
        );

      return (
        <div key={i} className="flex gap-2.5 pl-1 py-1 items-start">
          {isWarning ? (
            <AlertTriangle
              size={16}
              className="mt-0.5 flex-shrink-0"
              style={{ color: "#F59E0B" }}
            />
          ) : (
            <CheckCircle2
              size={16}
              className="mt-0.5 flex-shrink-0"
              style={{ color: "var(--hw-success, #10B981)" }}
            />
          )}
          <span className="text-[0.925rem] leading-relaxed">
            {renderInlineFormatting(text)}
          </span>
        </div>
      );
    }

    return (
      <p key={i} className="py-0.5 text-[0.925rem] leading-relaxed">
        {renderInlineFormatting(line)}
      </p>
    );
  });
}

function renderInlineFormatting(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={i}
          className="font-semibold"
          style={{ color: "var(--hw-accent)" }}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ---------------------------------------------------------------------------
// Typing indicator (colorful bouncing dots)
// ---------------------------------------------------------------------------

function TypingIndicator() {
  const dotColors = ["var(--hw-accent)", "#8B5CF6", "#EC4899"];
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: dotColors[i] }}
          animate={{ y: [0, -8, 0], scale: [1, 1.2, 1] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.18,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom on new message
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`;
    }
  }, [input]);

  // Send message
  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    try {
      const history = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content.trim(), history }),
      });

      const data = await res.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content:
          data.response || "I'm sorry, I couldn't process that request.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "assistant",
        content:
          "I'm sorry, something went wrong. Please try again in a moment.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const hasMessages = messages.length > 0;
  const assistantCount = messages.filter((m) => m.role === "assistant").length;

  return (
    <div
      className="flex flex-col min-h-[calc(100vh-4rem)]"
      style={{
        background:
          "linear-gradient(180deg, var(--hw-bg) 0%, color-mix(in srgb, var(--hw-accent) 3%, var(--hw-bg)) 50%, var(--hw-bg) 100%)",
      }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b px-4 py-3"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--hw-surface) 90%, transparent), color-mix(in srgb, var(--hw-accent) 3%, var(--hw-surface)) 90%)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderColor: "color-mix(in srgb, var(--hw-border) 60%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <motion.div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{
              background:
                "linear-gradient(135deg, var(--hw-accent), #8B5CF6)",
              color: "white",
              boxShadow: "0 4px 15px color-mix(in srgb, var(--hw-accent) 30%, transparent)",
            }}
            animate={{ rotate: [0, 0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles size={20} />
          </motion.div>
          <div>
            <h1
              className="font-[family-name:var(--font-display)] text-base font-bold"
              style={{ color: "var(--hw-text-primary)" }}
            >
              HealthWise AI
            </h1>
            <div className="flex items-center gap-1.5">
              <motion.div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--hw-success, #10B981)" }}
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <p
                className="text-xs font-medium"
                style={{ color: "var(--hw-text-muted)" }}
              >
                Online - Ready to help
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages / Welcome */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4">
          <AnimatePresence mode="wait">
            {!hasMessages ? (
              /* --------------- Welcome State --------------- */
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="relative flex flex-col items-center justify-center py-20 sm:py-24 text-center overflow-hidden"
              >
                {/* Floating health icons background */}
                <FloatingIcon
                  icon={Heart}
                  delay={0}
                  x={10}
                  y={15}
                  size={36}
                  color="#EC4899"
                />
                <FloatingIcon
                  icon={Brain}
                  delay={1.5}
                  x={80}
                  y={10}
                  size={40}
                  color="#8B5CF6"
                />
                <FloatingIcon
                  icon={Pill}
                  delay={3}
                  x={15}
                  y={70}
                  size={32}
                  color="#10B981"
                />
                <FloatingIcon
                  icon={Stethoscope}
                  delay={4.5}
                  x={85}
                  y={65}
                  size={38}
                  color="#3B82F6"
                />
                <FloatingIcon
                  icon={Heart}
                  delay={2}
                  x={70}
                  y={80}
                  size={28}
                  color="#F43F5E"
                />
                <FloatingIcon
                  icon={Sparkles}
                  delay={3.5}
                  x={50}
                  y={5}
                  size={30}
                  color="var(--hw-accent)"
                />

                {/* Decorative brain illustration */}
                <FloatingIllustration className="mb-4 opacity-60">
                  <BrainIllustration size={80} />
                </FloatingIllustration>

                {/* Central icon */}
                <motion.div
                  className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--hw-accent), #8B5CF6, #EC4899)",
                    boxShadow:
                      "0 20px 50px color-mix(in srgb, var(--hw-accent) 25%, transparent), 0 0 80px color-mix(in srgb, #8B5CF6 15%, transparent)",
                  }}
                  animate={{
                    boxShadow: [
                      "0 20px 50px color-mix(in srgb, var(--hw-accent) 25%, transparent), 0 0 80px color-mix(in srgb, #8B5CF6 15%, transparent)",
                      "0 20px 60px color-mix(in srgb, var(--hw-accent) 35%, transparent), 0 0 100px color-mix(in srgb, #8B5CF6 25%, transparent)",
                      "0 20px 50px color-mix(in srgb, var(--hw-accent) 25%, transparent), 0 0 80px color-mix(in srgb, #8B5CF6 15%, transparent)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MessageSquare size={44} color="white" />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--hw-text-primary), var(--hw-accent))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Ask me anything about health
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="mt-3 max-w-lg text-base sm:text-lg"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  Get evidence-based health information, wellness tips, and
                  answers to your medical questions.
                </motion.p>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  {SUGGESTED_PROMPTS.map((prompt, i) => {
                    const Icon = prompt.icon;
                    return (
                      <motion.button
                        key={prompt.text}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + i * 0.1 }}
                        onClick={() => sendMessage(prompt.text)}
                        className="group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300"
                        style={{
                          border: "1px solid var(--hw-border)",
                          backgroundColor: "var(--hw-surface)",
                          color: "var(--hw-text-primary)",
                        }}
                        whileHover={{ scale: 1.04, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "var(--hw-accent)";
                          e.currentTarget.style.boxShadow =
                            "0 4px 20px color-mix(in srgb, var(--hw-accent) 20%, transparent)";
                          e.currentTarget.style.background =
                            "linear-gradient(135deg, var(--hw-surface), color-mix(in srgb, var(--hw-accent) 6%, var(--hw-surface)))";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "var(--hw-border)";
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.background = "var(--hw-surface)";
                        }}
                      >
                        <Icon
                          size={16}
                          style={{ color: "var(--hw-accent)" }}
                        />
                        {prompt.text}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              /* --------------- Chat Thread --------------- */
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-5 py-6"
              >
                {messages.map((message, msgIndex) => {
                  const isUser = message.role === "user";
                  const aiIndex = !isUser
                    ? messages
                        .slice(0, msgIndex + 1)
                        .filter((m) => m.role === "assistant").length - 1
                    : 0;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 16, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className={`flex gap-3 ${
                        isUser ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar */}
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 15,
                          delay: 0.1,
                        }}
                        className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                        style={
                          isUser
                            ? {
                                background:
                                  "linear-gradient(135deg, var(--hw-accent), #0D9488)",
                                color: "white",
                                boxShadow:
                                  "0 3px 12px color-mix(in srgb, var(--hw-accent) 30%, transparent)",
                              }
                            : {
                                background:
                                  "linear-gradient(135deg, color-mix(in srgb, var(--hw-accent) 15%, var(--hw-surface-secondary)), color-mix(in srgb, #8B5CF6 10%, var(--hw-surface-secondary)))",
                                color: "var(--hw-accent)",
                                border: "1px solid color-mix(in srgb, var(--hw-accent) 20%, transparent)",
                              }
                        }
                      >
                        {isUser ? (
                          <User size={16} />
                        ) : (
                          <Sparkles size={16} />
                        )}
                      </motion.div>

                      {/* Bubble */}
                      {isUser ? (
                        <div
                          className="max-w-[80%] rounded-2xl rounded-tr-md px-4 py-3 text-[0.938rem] leading-relaxed"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--hw-accent), #0D9488)",
                            color: "white",
                            boxShadow:
                              "0 4px 15px color-mix(in srgb, var(--hw-accent) 20%, transparent)",
                          }}
                        >
                          <p>{message.content}</p>
                        </div>
                      ) : (
                        <div
                          className="max-w-[85%] overflow-hidden rounded-2xl rounded-tl-md"
                          style={{
                            background:
                              "linear-gradient(135deg, var(--hw-surface), var(--hw-surface-secondary))",
                            border:
                              "1px solid color-mix(in srgb, var(--hw-accent) 12%, var(--hw-border))",
                            boxShadow:
                              "0 2px 12px color-mix(in srgb, var(--hw-accent) 5%, transparent)",
                          }}
                        >
                          {/* AI message content */}
                          <div
                            className="px-4 py-3"
                            style={{ color: "var(--hw-text-primary)" }}
                          >
                            {renderMessageContent(message.content)}
                          </div>

                          {/* Related topics chips */}
                          <div
                            className="flex flex-wrap gap-2 px-4 pb-3"
                          >
                            {getRelatedTopics(aiIndex).map((topic) => (
                              <button
                                key={topic}
                                onClick={() => sendMessage(`Tell me about ${topic.toLowerCase()}`)}
                                className="flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition-all"
                                style={{
                                  backgroundColor:
                                    "color-mix(in srgb, var(--hw-accent) 10%, transparent)",
                                  color: "var(--hw-accent)",
                                  border:
                                    "1px solid color-mix(in srgb, var(--hw-accent) 20%, transparent)",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "color-mix(in srgb, var(--hw-accent) 18%, transparent)";
                                  e.currentTarget.style.boxShadow =
                                    "0 2px 8px color-mix(in srgb, var(--hw-accent) 15%, transparent)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor =
                                    "color-mix(in srgb, var(--hw-accent) 10%, transparent)";
                                  e.currentTarget.style.boxShadow = "none";
                                }}
                              >
                                <Hash size={10} />
                                {topic}
                              </button>
                            ))}
                          </div>

                          {/* Medical disclaimer */}
                          <div
                            className="mx-3 mb-3 flex items-start gap-2.5 rounded-lg px-3 py-2.5"
                            style={{
                              background:
                                "linear-gradient(135deg, color-mix(in srgb, #F59E0B 8%, transparent), color-mix(in srgb, #F59E0B 4%, transparent))",
                              border:
                                "1px solid color-mix(in srgb, #F59E0B 20%, transparent)",
                            }}
                          >
                            <AlertTriangle
                              size={14}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "#F59E0B" }}
                            />
                            <span
                              className="text-xs leading-relaxed"
                              style={{ color: "var(--hw-text-muted)" }}
                            >
                              This is for informational purposes only. Please
                              consult a healthcare professional.
                            </span>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        background:
                          "linear-gradient(135deg, color-mix(in srgb, var(--hw-accent) 15%, var(--hw-surface-secondary)), color-mix(in srgb, #8B5CF6 10%, var(--hw-surface-secondary)))",
                        color: "var(--hw-accent)",
                        border:
                          "1px solid color-mix(in srgb, var(--hw-accent) 20%, transparent)",
                      }}
                    >
                      <Sparkles size={16} />
                    </motion.div>
                    <div
                      className="rounded-2xl rounded-tl-md"
                      style={{
                        background:
                          "linear-gradient(135deg, var(--hw-surface), var(--hw-surface-secondary))",
                        border:
                          "1px solid color-mix(in srgb, var(--hw-accent) 12%, var(--hw-border))",
                      }}
                    >
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Input Bar - Glass morphism */}
      <div
        className="sticky bottom-0 border-t px-4 py-3"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--hw-surface) 85%, transparent), color-mix(in srgb, var(--hw-accent) 2%, var(--hw-surface)) 85%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderColor: "color-mix(in srgb, var(--hw-border) 50%, transparent)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-3"
        >
          <div
            className="flex flex-1 items-end rounded-xl px-3 py-2 transition-all duration-300"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--hw-surface-secondary) 80%, transparent)",
              border: inputFocused
                ? "1.5px solid var(--hw-accent)"
                : "1.5px solid var(--hw-border)",
              boxShadow: inputFocused
                ? "0 0 0 3px color-mix(in srgb, var(--hw-accent) 12%, transparent), 0 4px 15px color-mix(in srgb, var(--hw-accent) 8%, transparent)"
                : "none",
              backdropFilter: "blur(10px)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setInputFocused(true)}
              onBlur={() => setInputFocused(false)}
              placeholder="Ask a health question..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-[0.938rem] leading-relaxed outline-none placeholder:text-[var(--hw-text-muted)] disabled:opacity-50"
              style={{
                color: "var(--hw-text-primary)",
                maxHeight: "160px",
              }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background:
                input.trim() && !isLoading
                  ? "linear-gradient(135deg, var(--hw-accent), #0D9488)"
                  : "var(--hw-surface-secondary)",
              color: input.trim() && !isLoading ? "white" : "var(--hw-text-muted)",
              boxShadow:
                input.trim() && !isLoading
                  ? "0 4px 15px color-mix(in srgb, var(--hw-accent) 30%, transparent)"
                  : "none",
            }}
            whileHover={
              input.trim() && !isLoading ? { scale: 1.05, y: -1 } : {}
            }
            whileTap={input.trim() && !isLoading ? { scale: 0.95 } : {}}
          >
            <SendHorizontal size={18} />
          </motion.button>
        </form>

        <p
          className="mx-auto mt-2 max-w-3xl text-center text-xs"
          style={{ color: "var(--hw-text-muted)" }}
        >
          HealthWise AI provides general health information, not medical advice.
        </p>
      </div>
    </div>
  );
}
