'use client';

import { motion } from 'motion/react';

interface SplitContentHeaderProps {
  title: string;
  description: string;
  titleColor?: string;
  descriptionColor?: string;
  className?: string;
  animated?: boolean;
}

/**
 * Split Content Header Component
 *
 * Layout: 30:70 split ratio
 * - Title on left (30%)
 * - Description on right (70%)
 * - Both left-aligned
 * - 24px gap between columns
 *
 * Typography:
 * - Title: Display 48px (Google Sans)
 * - Description: Body 14px (Google Sans)
 */
export function SplitContentHeader({
  title,
  description,
  titleColor = '#181818',
  descriptionColor = '#64748B',
  className = '',
  animated = true,
}: SplitContentHeaderProps) {
  const Wrapper = animated ? motion.div : 'div';
  const animProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      }
    : {};

  return (
    <Wrapper
      className={`grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px] ${className}`}
      {...animProps}
    >
      {/* Title - 30% (3 out of 10 columns) */}
      <h2
        className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.2] tracking-[-0.02em] lg:col-span-3"
        style={{ color: titleColor }}
      >
        {title}
      </h2>

      {/* Description - 70% (7 out of 10 columns) */}
      <p
        className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] leading-[1.6] lg:col-span-7"
        style={{ color: descriptionColor }}
      >
        {description}
      </p>
    </Wrapper>
  );
}
