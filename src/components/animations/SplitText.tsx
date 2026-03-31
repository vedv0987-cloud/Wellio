"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  splitBy?: "chars" | "words";
  animation?: "fadeUp" | "fadeIn" | "blur" | "scale";
}

const animations = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  blur: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
  },
};

export function SplitText({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  splitBy = "words",
  animation = "fadeUp",
}: SplitTextProps) {
  const parts = useMemo(() => {
    if (splitBy === "chars") return text.split("");
    return text.split(" ");
  }, [text, splitBy]);

  const anim = animations[animation];

  return (
    <span className={className} aria-label={text}>
      {parts.map((part, i) => (
        <motion.span
          key={`${part}-${i}`}
          initial={anim.initial}
          whileInView={anim.animate}
          viewport={{ once: true }}
          transition={{
            duration: 0.4,
            delay: delay + i * staggerDelay,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="inline-block"
          style={{ marginRight: splitBy === "words" ? "0.25em" : undefined }}
          aria-hidden="true"
        >
          {part}
          {splitBy === "chars" && part === " " && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
}
