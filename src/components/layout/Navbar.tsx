"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Search, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

const primaryLinks = [
  { label: "Health A-Z", href: "/health-a-z" },
  { label: "AI Chat", href: "/ai-chat" },
  { label: "First Aid", href: "/first-aid" },
];

const allLinks = [
  { label: "Health A-Z", href: "/health-a-z" },
  { label: "AI Chat", href: "/ai-chat" },
  { label: "First Aid", href: "/first-aid" },
  { label: "Symptom Checker", href: "/symptom-checker" },
  { label: "Drug Interactions", href: "/drug-interactions" },
  { label: "Lab Tests", href: "/lab-tests" },
  { label: "Glossary", href: "/glossary" },
  { label: "Learning Paths", href: "/learning-paths" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--hw-border)] bg-[var(--hw-surface)]/80 backdrop-blur-xl">
      <nav
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-[var(--hw-text-primary)] transition-opacity hover:opacity-80"
        >
          <Heart className="h-6 w-6 fill-[var(--hw-accent)] text-[var(--hw-accent)]" />
          <span>HealthWise</span>
        </Link>

        {/* Desktop center links - only 3 key pages */}
        <div className="hidden items-center gap-1 md:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors hover:text-[var(--hw-accent)] ${
                pathname === link.href
                  ? "text-[var(--hw-accent)]"
                  : "text-[var(--hw-text-secondary)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-[var(--hw-surface-secondary)]"
            aria-label="Search"
          >
            <Search className="h-[18px] w-[18px] text-[var(--hw-text-secondary)]" />
          </Link>

          <DarkModeToggle />

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-[var(--hw-surface-secondary)] md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-[var(--hw-text-primary)]" />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col bg-[var(--hw-surface)] shadow-[var(--shadow-xl)] md:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[var(--hw-border)] px-4 py-4">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 font-display text-lg font-bold text-[var(--hw-text-primary)]"
                >
                  <Heart className="h-5 w-5 fill-[var(--hw-accent)] text-[var(--hw-accent)]" />
                  HealthWise
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-[var(--hw-surface-secondary)]"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5 text-[var(--hw-text-primary)]" />
                </button>
              </div>

              {/* Simple flat link list */}
              <div className="flex-1 overflow-y-auto px-3 py-4">
                <div className="space-y-0.5">
                  {allLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-[var(--radius-md)] px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--hw-surface-secondary)] ${
                        pathname === link.href
                          ? "text-[var(--hw-accent)]"
                          : "text-[var(--hw-text-primary)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-[var(--hw-border)] p-4">
                <Link
                  href="/search"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--hw-surface-secondary)] px-4 py-3 text-sm font-medium text-[var(--hw-text-primary)] transition-colors hover:bg-[var(--hw-border)]"
                >
                  <Search className="h-4 w-4" />
                  Search HealthWise
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
