"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Heart,
  Search,
  Menu,
  X,
  ChevronDown,
  Bot,
  Stethoscope,
  Pill,
  ShieldPlus,
  FlaskConical,
  BookOpen,
  GraduationCap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { DarkModeToggle } from "@/components/ui/DarkModeToggle";

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; icon: React.ReactNode }[];
}

const navItems: NavItem[] = [
  { label: "Health A-Z", href: "/health-a-z" },
  {
    label: "Tools",
    children: [
      { label: "AI Chat", href: "/ai-chat", icon: <Bot className="h-4 w-4" /> },
      { label: "Symptom Checker", href: "/symptom-checker", icon: <Stethoscope className="h-4 w-4" /> },
      { label: "Drug Interactions", href: "/drug-interactions", icon: <Pill className="h-4 w-4" /> },
      { label: "First Aid", href: "/first-aid", icon: <ShieldPlus className="h-4 w-4" /> },
    ],
  },
  {
    label: "Learn",
    children: [
      { label: "Lab Tests", href: "/lab-tests", icon: <FlaskConical className="h-4 w-4" /> },
      { label: "Glossary", href: "/glossary", icon: <BookOpen className="h-4 w-4" /> },
      { label: "Learning Paths", href: "/learning-paths", icon: <GraduationCap className="h-4 w-4" /> },
    ],
  },
];

function DesktopDropdown({
  item,
  pathname,
}: {
  item: NavItem;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const isChildActive = item.children?.some((c) => pathname === c.href);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={`flex items-center gap-1 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--hw-surface-secondary)] hover:text-[var(--hw-accent)] ${
          isChildActive
            ? "text-[var(--hw-accent)]"
            : "text-[var(--hw-text-secondary)]"
        }`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 top-full z-50 mt-1 min-w-[200px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--hw-border)] bg-[var(--hw-surface)] p-1.5 shadow-[var(--shadow-lg)]"
          >
            {item.children!.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2.5 text-sm transition-colors hover:bg-[var(--hw-surface-secondary)] ${
                  pathname === child.href
                    ? "text-[var(--hw-accent)] font-medium"
                    : "text-[var(--hw-text-secondary)]"
                }`}
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--hw-surface-secondary)] text-[var(--hw-accent)]">
                  {child.icon}
                </span>
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileDropdown({
  item,
  pathname,
  onNavigate,
}: {
  item: NavItem;
  pathname: string;
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        className={`flex w-full items-center justify-between rounded-[var(--radius-md)] px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--hw-surface-secondary)] ${
          item.children?.some((c) => pathname === c.href)
            ? "text-[var(--hw-accent)]"
            : "text-[var(--hw-text-primary)]"
        }`}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="ml-4 space-y-0.5 border-l-2 border-[var(--hw-border)] pl-4 py-1">
              {item.children!.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  onClick={onNavigate}
                  className={`flex items-center gap-2.5 rounded-[var(--radius-md)] px-3 py-2.5 text-sm transition-colors hover:bg-[var(--hw-surface-secondary)] ${
                    pathname === child.href
                      ? "text-[var(--hw-accent)] font-medium"
                      : "text-[var(--hw-text-secondary)]"
                  }`}
                >
                  <span className="text-[var(--hw-accent)]">{child.icon}</span>
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

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
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
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

        {/* Desktop nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) =>
            item.children ? (
              <DesktopDropdown
                key={item.label}
                item={item}
                pathname={pathname}
              />
            ) : (
              <Link
                key={item.label}
                href={item.href!}
                className={`rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--hw-surface-secondary)] hover:text-[var(--hw-accent)] ${
                  pathname === item.href
                    ? "text-[var(--hw-accent)]"
                    : "text-[var(--hw-text-secondary)]"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-1">
          <Link
            href="/search"
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-[var(--hw-surface-secondary)]"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-[var(--hw-text-primary)]" />
          </Link>

          <DarkModeToggle />

          {/* Mobile hamburger */}
          <button
            className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-colors hover:bg-[var(--hw-surface-secondary)] lg:hidden"
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-[var(--hw-surface)] shadow-[var(--shadow-xl)] lg:hidden"
            >
              {/* Drawer header */}
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

              {/* Drawer links */}
              <div className="flex-1 overflow-y-auto px-2 py-4">
                <div className="space-y-0.5">
                  {navItems.map((item) =>
                    item.children ? (
                      <MobileDropdown
                        key={item.label}
                        item={item}
                        pathname={pathname}
                        onNavigate={() => setMobileOpen(false)}
                      />
                    ) : (
                      <Link
                        key={item.label}
                        href={item.href!}
                        onClick={() => setMobileOpen(false)}
                        className={`block rounded-[var(--radius-md)] px-4 py-3 text-base font-medium transition-colors hover:bg-[var(--hw-surface-secondary)] ${
                          pathname === item.href
                            ? "text-[var(--hw-accent)]"
                            : "text-[var(--hw-text-primary)]"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )
                  )}
                </div>
              </div>

              {/* Drawer footer */}
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
