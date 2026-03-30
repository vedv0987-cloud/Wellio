"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  SendHorizontal,
  Bot,
  User,
  AlertTriangle,
} from "lucide-react";

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
  "What causes headaches?",
  "Best foods for heart health",
  "Diabetes prevention tips",
  "How to reduce stress",
];

// ---------------------------------------------------------------------------
// Markdown-like renderer
// ---------------------------------------------------------------------------

function renderMessageContent(content: string) {
  const lines = content.split("\n");

  return lines.map((line, i) => {
    // Empty line → spacer
    if (line.trim() === "") {
      return <div key={i} className="h-2" />;
    }

    // Bullet points
    if (line.trim().startsWith("- ")) {
      const text = line.trim().slice(2);
      return (
        <div key={i} className="flex gap-2 pl-2 py-0.5">
          <span
            className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
            style={{ backgroundColor: "var(--hw-accent)" }}
          />
          <span>{renderInlineFormatting(text)}</span>
        </div>
      );
    }

    // Return as paragraph
    return (
      <p key={i} className="py-0.5">
        {renderInlineFormatting(line)}
      </p>
    );
  });
}

function renderInlineFormatting(text: string) {
  // Bold with **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold" style={{ color: "var(--hw-text-primary)" }}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

// ---------------------------------------------------------------------------
// Typing indicator
// ---------------------------------------------------------------------------

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "var(--hw-accent)" }}
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
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

    // Reset textarea height
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
        content: data.response || "I'm sorry, I couldn't process that request.",
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

  return (
    <div
      className="flex flex-col min-h-[calc(100vh-4rem)]"
      style={{ backgroundColor: "var(--hw-bg)" }}
    >
      {/* Header */}
      <div
        className="sticky top-0 z-10 border-b px-4 py-3 backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in srgb, var(--hw-surface) 85%, transparent)",
          borderColor: "var(--hw-border)",
        }}
      >
        <div className="mx-auto flex max-w-3xl items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: "var(--hw-accent)", color: "white" }}
          >
            <Bot size={20} />
          </div>
          <div>
            <h1
              className="font-[family-name:var(--font-display)] text-base font-semibold"
              style={{ color: "var(--hw-text-primary)" }}
            >
              HealthWise AI
            </h1>
            <p className="text-xs" style={{ color: "var(--hw-text-muted)" }}>
              Your health information assistant
            </p>
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
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--hw-accent) 12%, transparent)",
                    color: "var(--hw-accent)",
                  }}
                >
                  <MessageSquare size={32} />
                </div>
                <h2
                  className="font-[family-name:var(--font-display)] text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--hw-text-primary)" }}
                >
                  Ask me anything about health
                </h2>
                <p
                  className="mt-2 max-w-md text-base"
                  style={{ color: "var(--hw-text-secondary)" }}
                >
                  Get evidence-based health information, wellness tips, and
                  answers to your medical questions.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="rounded-full border px-4 py-2 text-sm font-medium transition-all hover:scale-[1.03] active:scale-[0.98]"
                      style={{
                        borderColor: "var(--hw-border)",
                        backgroundColor: "var(--hw-surface)",
                        color: "var(--hw-text-primary)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--hw-accent)";
                        e.currentTarget.style.color = "var(--hw-accent)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--hw-border)";
                        e.currentTarget.style.color = "var(--hw-text-primary)";
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* --------------- Chat Thread --------------- */
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-4 py-6"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor:
                          message.role === "user"
                            ? "var(--hw-accent)"
                            : "var(--hw-surface-secondary)",
                        color:
                          message.role === "user"
                            ? "white"
                            : "var(--hw-accent)",
                      }}
                    >
                      {message.role === "user" ? (
                        <User size={16} />
                      ) : (
                        <Bot size={16} />
                      )}
                    </div>

                    {/* Bubble */}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 text-[0.938rem] leading-relaxed ${
                        message.role === "user" ? "rounded-tr-md" : "rounded-tl-md"
                      }`}
                      style={{
                        backgroundColor:
                          message.role === "user"
                            ? "var(--hw-accent)"
                            : "var(--hw-surface)",
                        color:
                          message.role === "user"
                            ? "white"
                            : "var(--hw-text-primary)",
                        border:
                          message.role === "assistant"
                            ? "1px solid var(--hw-border)"
                            : "none",
                      }}
                    >
                      {message.role === "user" ? (
                        <p>{message.content}</p>
                      ) : (
                        <>
                          <div>{renderMessageContent(message.content)}</div>
                          {/* Medical disclaimer */}
                          <div
                            className="mt-4 flex items-start gap-2 rounded-lg border px-3 py-2 text-xs"
                            style={{
                              borderColor: "var(--hw-border)",
                              backgroundColor: "var(--hw-surface-secondary)",
                              color: "var(--hw-text-muted)",
                            }}
                          >
                            <AlertTriangle
                              size={14}
                              className="mt-0.5 flex-shrink-0"
                              style={{ color: "var(--hw-accent-secondary, #F59E0B)" }}
                            />
                            <span>
                              This is for informational purposes only. Please
                              consult a healthcare professional.
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Typing indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3"
                  >
                    <div
                      className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "var(--hw-surface-secondary)",
                        color: "var(--hw-accent)",
                      }}
                    >
                      <Bot size={16} />
                    </div>
                    <div
                      className="rounded-2xl rounded-tl-md"
                      style={{
                        backgroundColor: "var(--hw-surface)",
                        border: "1px solid var(--hw-border)",
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

      {/* Input Bar */}
      <div
        className="sticky bottom-0 border-t px-4 py-3"
        style={{
          backgroundColor: "var(--hw-surface)",
          borderColor: "var(--hw-border)",
        }}
      >
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-3xl items-end gap-3"
        >
          <div
            className="flex flex-1 items-end rounded-xl border px-3 py-2 transition-colors focus-within:border-[var(--hw-accent)]"
            style={{
              backgroundColor: "var(--hw-surface-secondary)",
              borderColor: "var(--hw-border)",
            }}
          >
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a health question..."
              rows={1}
              disabled={isLoading}
              className="flex-1 resize-none bg-transparent text-[0.938rem] leading-relaxed outline-none placeholder:text-[var(--hw-text-muted)] disabled:opacity-50"
              style={{ color: "var(--hw-text-primary)", maxHeight: "160px" }}
            />
          </div>

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all disabled:opacity-40"
            style={{
              backgroundColor: "var(--hw-accent)",
              color: "white",
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) {
                e.currentTarget.style.backgroundColor = "var(--hw-accent-hover)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "var(--hw-accent)";
            }}
          >
            <SendHorizontal size={18} />
          </button>
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
