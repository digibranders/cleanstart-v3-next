'use client';

import { motion, AnimatePresence } from 'motion/react';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1], // Smooth, natural easing
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
