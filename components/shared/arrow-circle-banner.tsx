'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

/** Arrow SVG path (diagonal arrow) */
const ARROW_DIAGONAL_PATH = 'M0.71 0V2H26.07L0 28.07L1.41 29.49L27.49 3.41V28.78H29.49V0H0.71Z';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function ArrowCircleBanner({
  title = 'Ready to Get Started?',
  subtitle = 'Start with zero-CVE hardened images. Deploy faster with confidence.',
}: {
  title?: string;
  subtitle?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <section className="bg-[#056bf1] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <motion.div
        className="max-w-[1340px] mx-auto rounded-[15px] bg-[#056bf1] p-[32px] md:p-[48px] relative overflow-hidden group cursor-pointer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...anim(0)}
      >
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div className="flex flex-col gap-4 max-w-[700px]">
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[42px] text-white tracking-[-0.95px] leading-[1.15]">
              {title}
            </h2>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white/80 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Arrow circle button */}
          <div
            className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 shrink-0"
            style={{
              transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 29.49 29.49"
              fill="none"
            >
              <path
                d={ARROW_DIAGONAL_PATH}
                fill="#181818"
              />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
