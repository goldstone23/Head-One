import React, { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "../lib/utils";

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn("py-24 md:py-32 px-6", className)}>
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  key?: React.Key;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
