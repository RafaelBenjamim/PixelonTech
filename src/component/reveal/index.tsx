import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealTag = "div" | "p" | "h2";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  tag?: RevealTag;
  interactive?: boolean;
}

const REVEAL_EASE = [0.16, 0.8, 0.24, 1] as const;

export default function Reveal({
  children,
  className = "",
  delay = 0,
  tag = "div",
  interactive = false,
}: RevealProps) {
  const MotionTag =
    tag === "h2" ? motion.h2 : tag === "p" ? motion.p : motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: REVEAL_EASE, delay: delay / 1000 }}
      whileHover={interactive ? { y: -5, scale: 1.015 } : undefined}
      whileTap={interactive ? { scale: 0.97, y: -2 } : undefined}
    >
      {children}
    </MotionTag>
  );
}
