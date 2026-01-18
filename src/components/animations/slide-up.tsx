import type { PropsWithChildren } from "react";
import { motion, type Variants } from "framer-motion";

type SlideUpProps = PropsWithChildren<{
  y?: number; // deslocamento vertical inicial
  duration?: number; // duração em s
  delay?: number; // atraso em s
  once?: boolean; // anima só na primeira vez
  amount?: number; // quanto precisa estar visível (0..1)
  staggerChildren?: number;
  className?: string;
}>;

export function SlideUp({
  children,
  y = 24,
  duration = 0.6,
  delay = 0,
  once = true,
  amount = 0.15,
  staggerChildren = 0,
  className,
}: SlideUpProps) {
  const variants: Variants = {
    initial: { opacity: 0, y },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
        when: staggerChildren > 0 ? "beforeChildren" : "afterChildren",
        staggerChildren: staggerChildren || undefined,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      whileInView="animate"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
