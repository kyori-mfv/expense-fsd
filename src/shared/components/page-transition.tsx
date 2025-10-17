import { type Transition, type Variants, motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  animate: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -10,
  },
};

// Check if user prefers reduced motion
const shouldReduceMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const pageTransition: Transition = shouldReduceMotion
  ? { duration: 0 }
  : {
      duration: 0.2,
      ease: [0.4, 0.0, 0.2, 1] as const, // easeInOut cubic-bezier
    };

/**
 * PageTransition Component
 *
 * Provides smooth fade and slide animations for page transitions.
 * - Fades in new pages with a subtle slide-up effect
 * - Fades out old pages with a subtle slide-up effect
 * - Respects user's prefers-reduced-motion setting
 * - Uses GPU-accelerated transforms for smooth performance
 *
 * @example
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={pageTransition}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
