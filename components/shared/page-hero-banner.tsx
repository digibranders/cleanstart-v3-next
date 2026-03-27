'use client';

import { motion } from 'motion/react';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

interface PageHeroBannerProps {
  title: string;
  subtitle: string;
  cta?: { label: string; href?: string };
  gradient?: 'blue' | 'cyan' | 'dark';
}

const gradients = {
  blue: 'linear-gradient(180deg, #0f1924 0%, #056bf1 60%, #06c7f2 100%)',
  cyan: 'linear-gradient(180deg, #0f1924 0%, #06c7f2 60%, #cdf5fe 100%)',
  dark: 'linear-gradient(180deg, #0f1924 0%, #1a2b3d 60%, #056bf1 100%)',
};

export function PageHeroBanner({ title, subtitle, cta, gradient = 'blue' }: PageHeroBannerProps) {
  return (
    <section
      className="relative pt-[120px] md:pt-[160px] pb-12 md:pb-[80px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
      style={{ backgroundImage: gradients[gradient] }}
    >
      <div className="max-w-[1340px] mx-auto flex flex-col gap-6 relative z-10">
        <motion.h1
          className="font-['Google_Sans',sans-serif] font-normal text-[40px] md:text-[48px] lg:text-[56px] text-white tracking-[-0.95px] leading-[1.1] max-w-[800px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="font-['Google_Sans',sans-serif] font-normal text-[18px] text-white/80 leading-relaxed max-w-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {subtitle}
        </motion.p>
        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <CallToActionButton label={cta.label} variant="light" size="md" />
          </motion.div>
        )}
      </div>
    </section>
  );
}
