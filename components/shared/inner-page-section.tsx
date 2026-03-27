'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

/* -- Feature card -- */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({ icon, title, description, index }: FeatureCardProps) {
  return (
    <motion.div
      className="bg-white rounded-[15px] p-[25px] flex flex-col gap-4"
      {...anim(index * 0.08)}
    >
      <div className="w-12 h-12 rounded-xl bg-[#056bf1]/10 flex items-center justify-center text-[#056bf1]">
        {icon}
      </div>
      <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] text-[#181818]">
        {title}
      </h3>
      <p className="font-['Google_Sans',sans-serif] font-normal text-[18px] text-gray-600 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

/* -- Feature grid section -- */
export function FeatureGrid({
  features,
  columns = 3,
}: {
  features: { icon: React.ReactNode; title: string; description: string }[];
  columns?: 2 | 3 | 4;
}) {
  const colClass =
    columns === 2
      ? 'sm:grid-cols-2'
      : columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'sm:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <div className={`max-w-[1340px] mx-auto grid grid-cols-1 ${colClass} gap-[25px]`}>
        {features.map((f, i) => (
          <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
        ))}
      </div>
    </section>
  );
}

/* -- Split content section (image + text) -- */
export function SplitContent({
  image,
  title,
  description,
  bullets,
  ctaLabel,
  reverse = false,
  bg = 'white',
}: {
  image: string;
  title: string;
  description: string;
  bullets?: string[];
  ctaLabel?: string;
  reverse?: boolean;
  bg?: 'white' | 'gray' | 'blue';
}) {
  const bgClass = bg === 'gray' ? 'bg-[#ecedef]' : bg === 'blue' ? 'bg-[#056bf1]' : 'bg-white';
  const textColor = bg === 'blue' ? 'text-white' : 'text-[#181818]';
  const descColor = bg === 'blue' ? 'text-white/80' : 'text-gray-600';

  return (
    <section className={`${bgClass} px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]`}>
      <div
        className={`max-w-[1340px] mx-auto flex flex-col ${
          reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        } items-center gap-8 md:gap-[50px]`}
      >
        <motion.div className="flex-1 w-full rounded-[15px] overflow-hidden" {...anim(0)}>
          <Image
            src={image}
            alt={title}
            width={670}
            height={400}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-[15px]"
          />
        </motion.div>
        <div className="flex-1 flex flex-col gap-6">
          <motion.h2
            className={`font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[42px] ${textColor} tracking-[-0.95px] leading-[1.15]`}
            {...anim(0.05)}
          >
            {title}
          </motion.h2>
          <motion.p
            className={`font-['Google_Sans',sans-serif] font-normal text-[16px] ${descColor} leading-relaxed`}
            {...anim(0.1)}
          >
            {description}
          </motion.p>
          {bullets && bullets.length > 0 && (
            <motion.ul className="flex flex-col gap-3" {...anim(0.15)}>
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="shrink-0 mt-0.5"
                  >
                    <path
                      d="M4 10.5L8 14.5L16 6.5"
                      stroke={bg === 'blue' ? '#ffffff' : '#056bf1'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className={`font-['Google_Sans',sans-serif] font-normal text-[16px] ${descColor}`}
                  >
                    {b}
                  </span>
                </li>
              ))}
            </motion.ul>
          )}
          {ctaLabel && (
            <motion.div {...anim(0.2)}>
              <CallToActionButton
                label={ctaLabel}
                variant={bg === 'blue' ? 'light' : 'dark'}
                size="md"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

/* -- Stats bar -- */
export function StatsBar({
  stats,
  bg = 'cyan',
}: {
  stats: { value: string; label: string }[];
  bg?: 'cyan' | 'blue' | 'dark';
}) {
  const bgClass =
    bg === 'blue' ? 'bg-[#056bf1]' : bg === 'dark' ? 'bg-[#0f1924]' : 'bg-[#cdf5fe]';
  const valColor = bg === 'cyan' ? 'text-[#181818]' : 'text-white';
  const labelColor = bg === 'cyan' ? 'text-[#181818]/70' : 'text-white/70';

  return (
    <section className={`${bgClass} px-4 md:px-8 lg:px-[50px] py-12 md:py-[60px]`}>
      <div className="max-w-[1340px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <motion.div key={s.label} className="text-center" {...anim(i * 0.08)}>
            <p className={`font-['Google_Sans',sans-serif] font-normal text-[36px] md:text-[48px] ${valColor}`}>
              {s.value}
            </p>
            <p className={`font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] ${labelColor}`}>
              {s.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -- Section heading -- */
export function SectionHeading({
  title,
  subtitle,
  bg = 'white',
}: {
  title: string;
  subtitle?: string;
  bg?: 'white' | 'gray';
}) {
  const bgClass = bg === 'gray' ? 'bg-[#ecedef]' : 'bg-white';
  return (
    <section className={`${bgClass} px-4 md:px-8 lg:px-[50px] pt-12 md:pt-[80px] pb-0`}>
      <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row items-start gap-4 lg:gap-0">
        <motion.h2
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal w-full lg:w-[670px] shrink-0"
          {...anim(0)}
        >
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-gray-600 leading-relaxed flex-1"
            {...anim(0.1)}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
