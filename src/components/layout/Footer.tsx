"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Send } from "lucide-react";

const footerColumns = [
  {
    title: "Platform",
    links: [
      { label: "About", href: "/about" },
      { label: "Mission", href: "/mission" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Tools",
    links: [
      { label: "AI Chat", href: "/ai-chat" },
      { label: "Symptom Checker", href: "/symptom-checker" },
      { label: "Drug Checker", href: "/drug-interactions" },
      { label: "First Aid", href: "/first-aid" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Health A-Z", href: "/health-a-z" },
      { label: "Lab Tests", href: "/lab-tests" },
      { label: "Glossary", href: "/glossary" },
      { label: "Creators", href: "/creators" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Medical Disclaimer", href: "/disclaimer" },
    ],
  },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-[var(--hw-border)] bg-[var(--hw-surface)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Top section: columns + newsletter */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Link columns */}
          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--hw-text-primary)]">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--hw-text-secondary)] transition-colors hover:text-[var(--hw-accent)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-[var(--hw-text-primary)]">
              Stay Updated
            </h3>
            <p className="mt-4 text-sm text-[var(--hw-text-secondary)]">
              Get the latest health insights delivered to your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="mt-3 flex gap-2">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="min-w-0 flex-1 rounded-[var(--radius-md)] border border-[var(--hw-border)] bg-[var(--hw-bg)] px-3 py-2 text-sm text-[var(--hw-text-primary)] placeholder:text-[var(--hw-text-muted)] transition-colors focus:border-[var(--hw-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--hw-accent)]/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--hw-accent)] px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--hw-accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--hw-accent)]/20"
                aria-label="Subscribe"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-[var(--hw-success)]">
                Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-[var(--hw-border)]" />

        {/* Medical disclaimer */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--hw-border)] bg-[var(--hw-surface-secondary)] p-4">
          <p className="text-xs leading-relaxed text-[var(--hw-text-muted)]">
            <span className="font-display font-semibold text-[var(--hw-text-secondary)]">
              Medical Disclaimer:
            </span>{" "}
            HealthWise provides general health information for educational
            purposes only. It is not a substitute for professional medical
            advice, diagnosis, or treatment. Always seek the advice of your
            physician or other qualified health provider with any questions you
            may have regarding a medical condition. Never disregard professional
            medical advice or delay in seeking it because of something you have
            read on this platform.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-[var(--hw-text-muted)]">
            <Heart className="h-4 w-4 fill-[var(--hw-accent)] text-[var(--hw-accent)]" />
            <span>
              &copy; {new Date().getFullYear()} HealthWise. All rights reserved.
            </span>
          </div>
          <p className="text-xs text-[var(--hw-text-muted)]">
            Built with care for your well-being.
          </p>
        </div>
      </div>
    </footer>
  );
}
