"use client";

import { motion } from "motion/react";

export function HeartIllustration({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      {/* Heart shape */}
      <path
        d="M60 100C60 100 20 72 20 45C20 30 32 20 45 20C52 20 57 24 60 28C63 24 68 20 75 20C88 20 100 30 100 45C100 72 60 100 60 100Z"
        fill="url(#heart-grad)"
        opacity="0.15"
      />
      <path
        d="M60 100C60 100 20 72 20 45C20 30 32 20 45 20C52 20 57 24 60 28C63 24 68 20 75 20C88 20 100 30 100 45C100 72 60 100 60 100Z"
        stroke="url(#heart-grad)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Pulse line */}
      <path
        d="M10 60 L35 60 L42 45 L50 75 L58 35 L65 65 L72 55 L78 60 L110 60"
        stroke="#0d9488"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function DNAIllustration({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="dna-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      {/* Left helix strand */}
      <path
        d="M35 10 C35 30, 85 30, 85 50 C85 70, 35 70, 35 90 C35 100, 50 110, 60 110"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Right helix strand */}
      <path
        d="M85 10 C85 30, 35 30, 35 50 C35 70, 85 70, 85 90 C85 100, 70 110, 60 110"
        stroke="#3b82f6"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Cross bars */}
      <line x1="45" y1="20" x2="75" y2="20" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="38" y1="35" x2="82" y2="35" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="55" y1="50" x2="65" y2="50" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="38" y1="65" x2="82" y2="65" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="45" y1="80" x2="75" y2="80" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      <line x1="50" y1="95" x2="70" y2="95" stroke="url(#dna-grad)" strokeWidth="1.5" opacity="0.6" />
      {/* Dots at intersections */}
      <circle cx="45" cy="20" r="3" fill="#8b5cf6" opacity="0.5" />
      <circle cx="75" cy="20" r="3" fill="#3b82f6" opacity="0.5" />
      <circle cx="60" cy="50" r="3" fill="#8b5cf6" opacity="0.5" />
      <circle cx="60" cy="95" r="3" fill="#3b82f6" opacity="0.5" />
    </svg>
  );
}

export function StethoscopeIllustration({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="steth-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      {/* Ear pieces */}
      <circle cx="35" cy="15" r="5" fill="#0d9488" opacity="0.6" />
      <circle cx="65" cy="15" r="5" fill="#0d9488" opacity="0.6" />
      {/* Tubes */}
      <path
        d="M35 20 C35 45, 35 50, 50 55"
        stroke="url(#steth-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M65 20 C65 45, 65 50, 50 55"
        stroke="url(#steth-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Main tube down */}
      <path
        d="M50 55 L50 75 C50 90, 70 90, 70 75 L70 70"
        stroke="url(#steth-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Chest piece */}
      <circle cx="70" cy="65" r="12" fill="none" stroke="#0d9488" strokeWidth="2.5" />
      <circle cx="70" cy="65" r="12" fill="#0d9488" opacity="0.1" />
      <circle cx="70" cy="65" r="6" fill="#0d9488" opacity="0.25" />
      {/* Decorative ring */}
      <circle cx="50" cy="55" r="4" fill="#6366f1" opacity="0.3" />
    </svg>
  );
}

export function BrainIllustration({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="brain-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      {/* Brain outline - left hemisphere */}
      <path
        d="M60 95 L60 30 C60 15, 25 15, 25 35 C15 35, 15 50, 25 55 C18 60, 20 75, 30 78 C28 85, 35 95, 50 95 Z"
        fill="#8b5cf6"
        opacity="0.1"
        stroke="#8b5cf6"
        strokeWidth="2"
      />
      {/* Brain outline - right hemisphere */}
      <path
        d="M60 95 L60 30 C60 15, 95 15, 95 35 C105 35, 105 50, 95 55 C102 60, 100 75, 90 78 C92 85, 85 95, 70 95 Z"
        fill="#a78bfa"
        opacity="0.1"
        stroke="#a78bfa"
        strokeWidth="2"
      />
      {/* Sulci / folds - left */}
      <path d="M40 40 C45 38, 50 42, 55 38" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M30 55 C38 52, 45 58, 55 53" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M35 70 C42 67, 48 72, 55 68" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Sulci / folds - right */}
      <path d="M65 38 C70 42, 75 38, 80 40" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M65 53 C72 58, 80 52, 90 55" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M65 68 C72 72, 78 67, 85 70" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      {/* Neural sparkles */}
      <circle cx="40" cy="48" r="2" fill="#8b5cf6" opacity="0.4" />
      <circle cx="80" cy="48" r="2" fill="#a78bfa" opacity="0.4" />
      <circle cx="50" cy="82" r="2" fill="#8b5cf6" opacity="0.3" />
      <circle cx="70" cy="82" r="2" fill="#a78bfa" opacity="0.3" />
    </svg>
  );
}

export function ShieldIllustration({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="shield-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>
      </defs>
      {/* Shield shape */}
      <path
        d="M60 10 L95 28 C95 28, 98 65, 60 105 C22 65, 25 28, 25 28 Z"
        fill="url(#shield-grad)"
        opacity="0.12"
      />
      <path
        d="M60 10 L95 28 C95 28, 98 65, 60 105 C22 65, 25 28, 25 28 Z"
        stroke="url(#shield-grad)"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Medical cross */}
      <rect x="52" y="38" width="16" height="40" rx="3" fill="#10b981" opacity="0.5" />
      <rect x="40" y="50" width="40" height="16" rx="3" fill="#10b981" opacity="0.5" />
      {/* Inner glow circle */}
      <circle cx="60" cy="58" r="22" fill="#10b981" opacity="0.06" />
    </svg>
  );
}

export function FloatingIllustration({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
