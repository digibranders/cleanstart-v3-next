"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';
import { type ReactNode } from 'react';
import { PackageOpenIcon, RefreshIcon, ScanIcon, ShuffleIcon, Blockchain04Icon, Shield01Icon, Bug01Icon, Layers01Icon } from 'hugeicons-react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, decimals = 0, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(parseFloat((eased * target).toFixed(decimals)));
          if (progress < 1) requestAnimationFrame(tick);
          else setValue(target);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, decimals, duration]);

  return { value, ref };
}

// ─── Data ─────────────────────────────────────────────────────────────────────

interface ProblemData {
  icon: ReactNode;
  title: string;
  description: string;
  tint: string;
  bgIcon: ReactNode;
  bgColor: string;
}

const PROBLEMS: ProblemData[] = [
  {
    icon: <PackageOpenIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Unknown Dependencies',
    description: 'Images include packages from multiple sources that are hard to verify.',
    tint: '#e8f5ed',
    bgColor: '#8fd4b0',
    bgIcon: <Blockchain04Icon size={180} color="#8cc8a8" strokeWidth={1.2} />,
  },
  {
    icon: <RefreshIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Endless Patching',
    description: 'Fixing vulnerabilities after build leads to constant updates and overhead.',
    tint: '#eee8f8',
    bgColor: '#b8a0e0',
    bgIcon: <Shield01Icon size={180} color="#a890d0" strokeWidth={1.2} />,
  },
  {
    icon: <ScanIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Reactive Scanning',
    description: 'Scanning detects issues late but does not control how software is built.',
    tint: '#fae8e2',
    bgColor: '#e8a890',
    bgIcon: <Bug01Icon size={180} color="#d8a090" strokeWidth={1.2} />,
  },
  {
    icon: <ShuffleIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Uncontrolled Builds',
    description: 'Without deterministic builds, artifacts can change across environments.',
    tint: '#faf3e0',
    bgColor: '#e8d480',
    bgIcon: <Layers01Icon size={180} color="#d8c870" strokeWidth={1.2} />,
  },
];

const PIPELINE_NODES = [
  { id: 'clean-images', label: 'CleanImages', description: 'Secured base images' },
  { id: 'packages', label: 'Packages', description: 'Verified packages' },
  { id: 'llm-models', label: 'LLM Models', description: 'Scanned AI artifacts' },
  { id: 'clean-sight', label: 'CleanSight', description: 'Visibility dashboard' },
];

const COMPARISON_ROWS = [
  { left: 'Patch after image creation', right: 'Built from verified source' },
  { left: 'Public base images', right: 'Controlled packages' },
  { left: 'Large attack surface', right: 'Minimal components' },
  { left: 'Scanner-driven security', right: 'Secure by design' },
  { left: 'Non-deterministic builds', right: 'Reproducible builds' },
] as const;

interface StatItem {
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  prefix?: string;
}

const STATS: StatItem[] = [
  { value: 88, suffix: ',000+', decimals: 0, label: 'CVEs remediated' },
  { value: 97.6, suffix: '%', decimals: 1, label: 'Average CVE reduction' },
  { value: 80, suffix: '%', decimals: 0, label: 'Attack surface reduction' },
  { value: 352, suffix: ',000+', decimals: 0, label: 'Engineering hours saved' },
  { value: 10, suffix: 'M+', decimals: 0, label: 'Packages from verified source' },
  { value: 100, suffix: '%', decimals: 0, label: 'Deterministic builds' },
];

// ─── Sub-components ────────────────────────────────────────────────────────────

function ProblemCard({ icon, title, description, tint, bgIcon, bgColor, delay }: ProblemData & { delay: number }) {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      className="relative rounded-[15px] h-full cursor-pointer group flex flex-col justify-between overflow-hidden"
      style={{
        background: tint,
        border: '1px solid rgba(0,0,0,0.04)',
        padding: '28px',
        minHeight: '240px',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Large bg icon — top right, 30% masked */}
      <div
        className="absolute -top-[54px] -right-[54px] opacity-[0.18] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.25]"
      >
        {bgIcon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[18px] leading-[1.3] tracking-[-0.01em] text-[#0F1924] mb-2">
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] leading-relaxed text-[#0F1924]/50 max-w-[300px]">
          {description}
        </p>
      </div>

      {/* CTA bottom right */}
      <div className="relative z-10 flex justify-end mt-4">
        <CircleArrowCTA variant="filled-blue" size={40} forceHovered={cardHovered} />
      </div>
    </motion.div>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const { value, ref } = useCountUp(stat.value, stat.decimals);
  return (
    <motion.div
      className="relative flex flex-col justify-between rounded-[12px] overflow-hidden h-full"
      style={{
        padding: '15px',
        minHeight: '280px',
        background: 'transparent',
        border: '1.5px solid rgba(255,255,255,0.25)',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {/* Number */}
      <p
        className="font-['Google_Sans',sans-serif] font-normal leading-none tracking-[-0.03em] text-white text-[32px] md:text-[40px]"
      >
        {stat.prefix && <span>{stat.prefix}</span>}
        <span ref={ref}>
          {stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.round(value)}
        </span>
        <span>{stat.suffix}</span>
      </p>
      {/* Label */}
      <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] leading-snug mt-4" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Product Accordion Cards ─────────────────────────────────────────────────

const PRODUCT_CARDS = [
  { title: 'CleanImages', cta: 'Learn More', image: '/home/card-container-images.png' },
  { title: 'Packages', cta: 'Learn More', image: '/home/card-packages.png' },
  { title: 'LLM Models', cta: 'Learn More', image: '/home/card-library.png' },
  { title: 'CleanSight', cta: 'Learn More', image: '/home/card-vm.png' },
];

function ProductAccordionCards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [cardCenters, setCardCenters] = useState<number[]>([]);

  // Measure card center positions for dynamic node lines
  useEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const centers = cardRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return ((rect.left + rect.width / 2 - containerRect.left) / containerRect.width) * 1000;
      });
      setCardCenters(centers);
    }
    measure();
    // Re-measure on resize and after accordion animation settles
    const timer = setTimeout(measure, 400);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(timer); window.removeEventListener('resize', measure); };
  }, [activeIndex]);

  // Platform strip target positions (fixed: center of SVG)
  const platformLeft = 350;
  const platformRight = 650;
  const platformTargets = [350, 450, 550, 650];

  return (
    <div>
      {/* Desktop accordion */}
      <div ref={containerRef} className="hidden lg:flex gap-5" style={{ height: '420px' }}>
        {PRODUCT_CARDS.map((card, i) => {
          const isActive = i === activeIndex;
          return (
            <div
              key={card.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="relative rounded-[15px] overflow-hidden flex flex-col justify-end cursor-pointer h-full"
              onMouseEnter={() => setActiveIndex(i)}
              style={{
                flex: isActive ? '0 0 420px' : '1 1 0px',
                minWidth: 0,
                transition: 'flex 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-[#0F1924]/90 to-transparent" />

              {/* Bottom: title + CTA */}
              <div
                className="relative z-10 p-6 md:p-7 flex items-center justify-between gap-4"
                style={{ opacity: isActive ? 1 : 0.7, transition: 'opacity 0.3s ease' }}
              >
                <h4 className="font-['Google_Sans',sans-serif] text-[18px] text-white font-semibold leading-tight whitespace-nowrap">
                  {card.title}
                </h4>
                <div
                  style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'scale(1)' : 'scale(0.8)',
                    transition: 'opacity 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <CircleArrowCTA variant="filled-blue" size={44} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dynamic node connecting lines (cards → platform) */}
      {cardCenters.length === 4 && cardCenters[0] > 0 && (
        <svg className="hidden lg:block w-full h-[50px]" viewBox="0 0 1000 50" preserveAspectRatio="none" fill="none">
          {cardCenters.map((cx, i) => {
            const tx = platformTargets[i];
            const midY = 25;
            const curveR = 10;
            const goRight = tx > cx;
            const path = `M ${cx} 0 L ${cx} ${midY - curveR} Q ${cx} ${midY} ${cx + (goRight ? curveR : -curveR)} ${midY} L ${tx + (goRight ? -curveR : curveR)} ${midY} Q ${tx} ${midY} ${tx} ${midY + curveR} L ${tx} 50`;
            return (
              <motion.path
                key={i}
                d={path}
                stroke="#056BF1"
                strokeWidth="1.5"
                fill="none"
                opacity="0.4"
                initial={false}
                animate={{ d: path }}
                transition={{ duration: 0.4, ease: EASE }}
              />
            );
          })}
          {/* Node dots at card bottoms */}
          {cardCenters.map((cx, i) => (
            <motion.circle
              key={`top-${i}`}
              cy={3}
              r={3}
              fill="#056BF1"
              opacity={0.6}
              initial={false}
              animate={{ cx }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          ))}
          {/* Node dots at platform top */}
          {platformTargets.map((tx, i) => (
            <circle key={`bot-${i}`} cx={tx} cy={47} r={3} fill="#056BF1" />
          ))}
        </svg>
      )}

      {/* Platform strip */}
      <div className="hidden lg:flex mx-auto rounded-[15px] bg-[#056BF1] flex-col items-center justify-center gap-2 py-4 px-8"
        style={{ boxShadow: '0 4px 24px rgba(5,107,241,0.3)', width: 'calc(50% - 10px)' }}
      >
        <svg width="180" height="37" viewBox="0 0 595.93 123.68" fill="none">
          <polygon points="94.39 39.89 94.39 85.24 61.19 105.11 61.19 59.02 48.28 66.46 48.63 66.68 48.63 120.39 54.12 123.68 108.25 92.04 108.25 32.16 108.03 32.03 94.39 39.89" fill="#08c5f0"/>
          <polygon points="61.19 58.83 19.87 34.52 54.64 15.43 94.39 38.18 94.39 39.89 108.03 32.03 53.86 0 0 32.16 0 91.26 12.55 98.77 12.55 45.5 48.28 66.46 61.19 59.02 61.19 58.83" fill="white"/>
          <path d="M157.05,42.27c2.82-1.9,6.34-2.85,10.58-2.85,4.7,0,8.53,1.16,11.47,3.48,2.95,2.32,5.04,5.54,6.26,9.66l10.64-2.93c-1.96-6.16-5.36-11.06-10.2-14.69-4.85-3.63-10.91-5.45-18.17-5.45-6.31,0-11.71,1.38-16.2,4.14s-7.95,6.61-10.36,11.54c-2.41,4.93-3.61,10.66-3.61,17.17s1.21,12.23,3.61,17.17c2.41,4.93,5.86,8.78,10.36,11.54,4.5,2.76,9.9,4.14,16.2,4.14,7.27,0,13.33-1.82,18.17-5.45,4.85-3.63,8.25-8.53,10.2-14.69l-10.64-2.93c-1.23,4.09-3.31,7.3-6.26,9.63-2.95,2.34-6.77,3.5-11.47,3.5-4.23,0-7.77-.95-10.6-2.85-2.83-1.9-4.96-4.56-6.37-7.99-1.42-3.43-2.12-7.45-2.12-12.07.03-4.61.75-8.63,2.17-12.07,1.42-3.43,3.53-6.09,6.35-7.99Z" fill="white"/>
          <rect x="206.51" y="29.49" width="10.55" height="64.38" fill="white"/>
          <path d="M263.6,48.69c-3.43-2.29-7.6-3.44-12.5-3.44-4.64,0-8.73,1.05-12.26,3.15-3.53,2.1-6.29,5.06-8.28,8.87-1.99,3.81-2.98,8.3-2.98,13.47,0,4.79,1.01,9.02,3.04,12.7,2.03,3.68,4.85,6.55,8.47,8.63,3.62,2.07,7.82,3.11,12.61,3.11s8.72-1.18,12.5-3.55,6.58-5.68,8.39-9.94l-10.42-3.15c-1.02,2.19-2.47,3.86-4.36,5.01-1.88,1.15-4.12,1.73-6.72,1.73-4.03,0-7.09-1.31-9.2-3.94-1.65-2.06-2.64-4.8-3-8.19h34.22c.41-5.66-.22-10.58-1.88-14.76-1.66-4.17-4.21-7.41-7.64-9.7ZM251.53,54.49c3.83,0,6.63,1.18,8.41,3.55,1.26,1.68,2.08,4.07,2.46,7.14h-23.24c.48-2.73,1.39-4.96,2.74-6.68,2.1-2.67,5.31-4.01,9.63-4.01Z" fill="white"/>
          <path d="M319.33,54.05c-1.55-3.12-3.92-5.37-7.12-6.74-3.2-1.37-6.9-2.06-11.1-2.06-5.58,0-10.01,1.21-13.29,3.64-3.29,2.42-5.51,5.63-6.68,9.63l9.63,3.02c.79-2.42,2.17-4.13,4.16-5.12,1.99-.99,4.04-1.49,6.17-1.49,3.53,0,6.04.77,7.53,2.32,1.24,1.29,1.94,3.18,2.13,5.65-1.9.28-3.77.55-5.57.81-2.99.42-5.77.88-8.32,1.38-2.56.5-4.78,1.05-6.68,1.67-2.51.85-4.55,1.93-6.13,3.26-1.58,1.33-2.75,2.91-3.5,4.73-.76,1.83-1.14,3.88-1.14,6.15,0,2.6.61,4.98,1.82,7.14,1.21,2.16,3,3.89,5.37,5.19,2.36,1.3,5.25,1.95,8.67,1.95,4.26,0,7.82-.8,10.66-2.39,2.19-1.22,4.17-2.99,5.93-5.3v6.37h9.24v-29.04c0-2.04-.09-3.93-.26-5.67-.18-1.74-.69-3.44-1.53-5.1ZM309.6,78.93c-.35,1.08-1.03,2.23-2.04,3.46-1.01,1.23-2.36,2.26-4.05,3.11-1.69.85-3.74,1.27-6.13,1.27-1.67,0-3.06-.26-4.18-.79-1.12-.53-1.98-1.23-2.56-2.12s-.88-1.92-.88-3.09c0-1.02.23-1.91.68-2.67.45-.76,1.1-1.43,1.95-2.01s1.88-1.09,3.11-1.53c1.25-.41,2.7-.78,4.34-1.12,1.63-.34,3.59-.69,5.87-1.07,1.45-.24,3.11-.51,4.93-.8-.02.8-.05,1.71-.09,2.75-.07,1.74-.39,3.28-.94,4.62Z" fill="white"/>
          <path d="M374.37,57.21c-.64-2.04-1.63-3.97-2.98-5.78-1.34-1.81-3.15-3.3-5.43-4.47-2.28-1.17-5.17-1.75-8.67-1.75-4.44,0-8.17.97-11.21,2.91-1.63,1.04-3.04,2.28-4.25,3.71v-5.27h-9.42v47.3h10.69v-24.31c0-2.89.32-5.26.96-7.12.64-1.85,1.5-3.31,2.56-4.38s2.26-1.82,3.57-2.26c1.31-.44,2.64-.66,3.99-.66,2.51,0,4.5.54,5.98,1.62s2.58,2.46,3.33,4.14,1.22,3.42,1.42,5.23c.2,1.81.31,3.46.31,4.95v22.77h10.69v-26.41c0-1.14-.1-2.62-.29-4.45-.19-1.82-.61-3.76-1.25-5.8Z" fill="white"/>
          <path d="M429.25,62.77c-1.78-1.25-3.63-2.23-5.56-2.93-1.93-.7-3.66-1.25-5.21-1.66l-11.3-3.15c-1.43-.38-2.84-.85-4.23-1.42-1.39-.57-2.55-1.34-3.48-2.32s-1.4-2.24-1.4-3.79c0-1.63.55-3.07,1.64-4.29,1.09-1.23,2.54-2.17,4.34-2.83,1.79-.66,3.74-.97,5.85-.94,2.16.06,4.2.5,6.11,1.31,1.91.82,3.53,2.01,4.86,3.57,1.33,1.56,2.23,3.45,2.69,5.67l11.34-1.97c-.94-3.88-2.54-7.2-4.82-9.94s-5.11-4.84-8.5-6.29-7.24-2.18-11.56-2.21c-4.26-.03-8.14.64-11.63,2.01-3.49,1.37-6.26,3.44-8.32,6.2s-3.09,6.17-3.09,10.23c0,2.77.46,5.1,1.38,6.99.92,1.88,2.1,3.43,3.55,4.64,1.44,1.21,2.98,2.16,4.6,2.85,1.62.69,3.13,1.23,4.53,1.64l16.29,4.82c1.17.35,2.2.77,3.09,1.25s1.62,1.01,2.19,1.6,1,1.25,1.29,1.99c.29.75.44,1.55.44,2.43,0,1.96-.62,3.61-1.86,4.95-1.24,1.34-2.85,2.36-4.84,3.07-1.99.7-4.1,1.05-6.35,1.05-3.8,0-7.15-1.02-10.05-3.07-2.91-2.04-4.83-4.93-5.76-8.67l-10.95,1.66c.64,4.12,2.15,7.67,4.53,10.66,2.38,2.99,5.42,5.29,9.11,6.9,3.69,1.61,7.85,2.41,12.46,2.41,3.24,0,6.34-.41,9.31-1.23,2.96-.82,5.6-2.04,7.9-3.68s4.14-3.69,5.5-6.15c1.36-2.47,2.04-5.34,2.04-8.61s-.58-5.75-1.73-7.8c-1.15-2.04-2.62-3.69-4.4-4.95Z" fill="white"/>
          <path d="M458.72,33.43h-10.51v13.14h-8.58v8.28h8.58v19.71c0,2.69.03,5.1.09,7.23s.63,4.22,1.71,6.26c1.23,2.25,3.02,3.89,5.39,4.93,2.37,1.04,5.04,1.59,8.04,1.66,2.99.07,6.05-.18,9.18-.77v-8.85c-2.95.44-5.58.55-7.88.35s-3.99-1.18-5.04-2.93c-.55-.9-.85-2.07-.9-3.5s-.07-3.09-.07-4.99v-19.09h13.88v-8.28h-13.88v-13.14Z" fill="white"/>
          <path d="M520.08,54.05c-1.55-3.12-3.92-5.37-7.12-6.74-3.2-1.37-6.9-2.06-11.1-2.06-5.58,0-10.01,1.21-13.29,3.64-3.29,2.42-5.51,5.63-6.68,9.63l9.63,3.02c.79-2.42,2.17-4.13,4.16-5.12,1.99-.99,4.04-1.49,6.17-1.49,3.53,0,6.04.77,7.53,2.32,1.24,1.29,1.94,3.18,2.13,5.65-1.9.28-3.77.55-5.57.81-2.99.42-5.77.88-8.32,1.38-2.56.5-4.78,1.05-6.68,1.67-2.51.85-4.55,1.93-6.13,3.26-1.58,1.33-2.74,2.91-3.5,4.73-.76,1.83-1.14,3.88-1.14,6.15,0,2.6.61,4.98,1.82,7.14,1.21,2.16,3,3.89,5.36,5.19,2.37,1.3,5.26,1.95,8.67,1.95,4.26,0,7.82-.8,10.66-2.39,2.19-1.22,4.17-2.99,5.93-5.3v6.37h9.24v-29.04c0-2.04-.09-3.93-.26-5.67-.18-1.74-.69-3.44-1.53-5.1ZM510.35,78.93c-.35,1.08-1.03,2.23-2.04,3.46-1.01,1.23-2.36,2.26-4.05,3.11-1.69.85-3.74,1.27-6.13,1.27-1.66,0-3.06-.26-4.18-.79-1.12-.53-1.98-1.23-2.56-2.12s-.88-1.92-.88-3.09c0-1.02.23-1.91.68-2.67.45-.76,1.1-1.43,1.95-2.01.85-.58,1.88-1.09,3.11-1.53,1.25-.41,2.7-.78,4.34-1.12,1.63-.34,3.59-.69,5.87-1.07,1.45-.24,3.11-.51,4.93-.8-.02.8-.05,1.71-.09,2.75-.07,1.74-.39,3.28-.94,4.62Z" fill="white"/>
          <path d="M555.55,46.37c-1.49.1-2.94.38-4.36.83-1.42.45-2.71,1.07-3.88,1.86-1.37.85-2.55,1.92-3.53,3.22-.44.59-.84,1.21-1.21,1.86v-7.57h-9.33v47.3h10.6v-24.04c0-1.81.22-3.5.66-5.06.44-1.56,1.12-2.96,2.04-4.18.92-1.23,2.11-2.23,3.57-3.02,1.46-.88,3.1-1.39,4.93-1.53,1.82-.15,3.44-.01,4.84.39v-9.85c-1.4-.23-2.85-.3-4.34-.2Z" fill="white"/>
          <path d="M595.93,54.84v-8.28h-13.88v-13.14h-10.51v13.14h-8.58v8.28h8.58v19.71c0,2.69.03,5.1.09,7.23s.63,4.22,1.71,6.26c1.23,2.25,3.02,3.89,5.39,4.93,2.37,1.04,5.04,1.59,8.04,1.66,2.99.07,6.05-.18,9.18-.77v-8.85c-2.95.44-5.58.55-7.88.35s-3.99-1.18-5.04-2.93c-.55-.9-.85-2.07-.9-3.5s-.07-3.09-.07-4.99v-19.09h13.88Z" fill="white"/>
        </svg>
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-white font-medium tracking-wide">
          Platform
        </span>
      </div>

      {/* Sub-labels below platform strip */}
      <div className="hidden lg:flex mt-3 mx-auto items-center justify-center gap-0"
        style={{ width: 'calc(50% - 10px)' }}
      >
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1]/70 font-medium">CleanCompile</span>
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1]/30 mx-3">|</span>
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1]/70 font-medium">Build</span>
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1]/30 mx-3">|</span>
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1]/70 font-medium">Vault</span>
      </div>

      {/* Mobile/tablet grid fallback */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 lg:hidden">
        {PRODUCT_CARDS.map((card, i) => (
          <motion.div
            key={card.title}
            className="relative rounded-[15px] overflow-hidden flex flex-col justify-end aspect-square cursor-pointer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: EASE }}
          >
            <Image src={card.image} alt={card.title} fill className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0F1924] to-transparent" />
            <div className="relative z-10 p-6 flex items-center justify-between gap-4">
              <h4 className="font-['Google_Sans',sans-serif] text-[18px] text-white font-semibold leading-tight">{card.title}</h4>
              <CircleArrowCTA variant="filled-blue" size={44} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Pipeline Infographic ────────────────────────────────────────────────────

function cubeGeom(cx: number, cy: number, size: number) {
  const hw = size * 0.58;
  const hh = size * 0.33;
  const h = size * 0.72;
  return {
    top: `M${cx},${cy - h} L${cx + hw},${cy - h + hh} L${cx},${cy - h + 2 * hh} L${cx - hw},${cy - h + hh} Z`,
    left: `M${cx - hw},${cy - h + hh} L${cx},${cy - h + 2 * hh} L${cx},${cy} L${cx - hw},${cy - hh} Z`,
    right: `M${cx + hw},${cy - h + hh} L${cx},${cy - h + 2 * hh} L${cx},${cy} L${cx + hw},${cy - hh} Z`,
  };
}

function PipelineInfographic() {
  const NODES = [
    { x: 160, y: 175, label: 'CleanImages', desc: 'Secured base images' },
    { x: 370, y: 175, label: 'Packages', desc: 'Verified packages' },
    { x: 580, y: 175, label: 'LLM Models', desc: 'Scanned AI models' },
    { x: 790, y: 175, label: 'CleanSight', desc: 'Visibility dashboard' },
  ];
  const PLABELS = ['CleanCompile', 'Factory', 'Vault', 'Build'];

  return (
    <motion.div
      className="relative w-full max-w-[1060px] mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      {/* ═══ DESKTOP ═══ */}
      <svg viewBox="0 0 950 510" fill="none" className="w-full hidden md:block">
        <defs>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cubeDropShadow" x="-20%" y="-10%" width="140%" height="150%">
            <feDropShadow dx="6" dy="10" stdDeviation="8" floodColor="rgba(10,40,100,0.18)" />
          </filter>
        </defs>

        {/* ── Foundation — blob platform (reference clone) ── */}
        <defs>
          <filter id="blobShadow" x="-5%" y="-5%" width="110%" height="120%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feOffset dy="3" result="shifted" />
            <feFlood floodColor="rgba(5,107,241,0.08)" result="color" />
            <feComposite in="color" in2="shifted" operator="in" result="shadow" />
            <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          filter="url(#blobShadow)"
        >
          {/* ── White blob outline — single continuous path ── */}
          {/* Shape: CC bulge → narrow neck → Factory bulge → narrow neck → Vault bulge */}
          {/*        with branch from Factory bottom → narrow neck → Build bulge */}
          <path d={`
            M 265,340
            C 289,340 306,352 312,368
            C 316,376 324,380 340,380
            L 410,380
            C 426,380 434,376 438,368
            C 444,352 461,340 475,336
            C 489,340 506,352 512,368
            C 516,376 524,380 540,380
            L 620,380
            C 636,380 644,376 648,368
            C 654,352 671,340 695,340
            C 724,340 740,360 740,385
            C 740,410 724,430 695,430
            C 671,430 654,418 648,402
            C 644,394 636,390 620,390
            L 540,390
            C 524,390 516,394 512,402
            C 509,408 506,416 502,424
            C 498,432 498,438 498,444
            C 498,448 500,452 504,456
            C 508,460 516,462 524,462
            C 542,462 556,454 560,446
            C 566,432 573,424 584,420
            C 596,416 608,424 608,446
            C 608,472 594,488 568,488
            C 548,488 534,480 526,472
            C 518,464 510,460 502,460
            C 494,460 488,456 484,448
            C 480,440 478,432 474,424
            C 470,416 464,408 458,402
            C 454,394 446,390 430,390
            L 340,390
            C 324,390 316,394 312,402
            C 306,418 289,430 265,430
            C 236,430 220,410 220,385
            C 220,360 236,340 265,340
            Z
          `} fill="white" />

          {/* Factory — central hub (largest) */}
          <circle cx={475} cy={370} r={48} fill="#056BF1" />
          <text x={475} y={375} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="14" fill="white"
            fontWeight="600">Factory</text>

          {/* CleanCompile — left node */}
          <circle cx={265} cy={385} r={34} fill="#056BF1" />
          <text x={265} y={389} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="8.5" fill="white"
            fontWeight="500">CleanCompile</text>

          {/* Vault — right node */}
          <circle cx={695} cy={385} r={32} fill="#056BF1" />
          <text x={695} y={389} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="10.5" fill="white"
            fontWeight="500">Vault</text>

          {/* Build — branch node */}
          <circle cx={568} cy={458} r={24} fill="#056BF1" />
          <text x={568} y={462} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="9" fill="white"
            fontWeight="500">Build</text>

          {/* CLEANSTART PLATFORM label */}
          <text x={475} y={505} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="10" fill="#056BF1" fillOpacity={0.3}
            fontWeight="500" letterSpacing="0.15em">CLEANSTART PLATFORM</text>
        </motion.g>

        {/* ── Horizontal connections ── */}
        {[0, 1, 2].map((i) => {
          const x1 = NODES[i].x + 55, x2 = NODES[i + 1].x - 55, y = NODES[i].y + 40;
          return (
            <motion.g key={`conn-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: EASE }}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="#3b82f6" strokeWidth="1" opacity={0.2} />
              <circle cx={x1} cy={y} r="3" fill="#3b82f6" />
              <circle cx={x2} cy={y} r="3" fill="#3b82f6" />
              <motion.circle r="4" fill="#3b82f6" filter="url(#dotGlow)"
                animate={{ cx: [x1, x2], cy: [y, y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.5, delay: 1 + i * 0.6, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.9, 1] }} />
            </motion.g>
          );
        })}

        {/* ═══ NODE 1 — CleanImages: stacked layers + shield ═══ */}
        <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          filter="url(#cubeDropShadow)">
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
            {[
              { yOff: 0, fill: '#dbeafe', stroke: '#93c5fd' },
              { yOff: -12, fill: '#bfdbfe', stroke: '#60a5fa' },
              { yOff: -24, fill: '#93c5fd', stroke: '#3b82f6' },
              { yOff: -36, fill: '#60a5fa', stroke: '#2563eb' },
            ].map((l, i) => (
              <path key={i} d={`M160,${220 + l.yOff - 12} L210,${220 + l.yOff} L160,${220 + l.yOff + 12} L110,${220 + l.yOff} Z`}
                fill={l.fill} stroke={l.stroke} strokeWidth="1" />
            ))}
            <path d="M160,155 L174,162 L174,174 C174,181 160,187 160,187 C160,187 146,181 146,174 L146,162 Z"
              fill="white" stroke="#2563eb" strokeWidth="1.5" />
            <path d="M155,173 L158,176 L166,167" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </motion.g>
        </motion.g>

        {/* ═══ NODE 2 — Packages: solid cube cluster ═══ */}
        <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.3, ease: EASE }}
          filter="url(#cubeDropShadow)">
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}>
            {(() => { const g = cubeGeom(370, 230, 62); return (<><path d={g.left} fill="#1d4ed8" /><path d={g.right} fill="#3b82f6" /><path d={g.top} fill="#60a5fa" /></>); })()}
            {(() => { const g = cubeGeom(335, 215, 32); return (<><path d={g.left} fill="#0891b2" /><path d={g.right} fill="#06b6d4" /><path d={g.top} fill="#67e8f9" /></>); })()}
            {(() => { const g = cubeGeom(405, 218, 32); return (<><path d={g.left} fill="#1e40af" /><path d={g.right} fill="#2563eb" /><path d={g.top} fill="#93c5fd" /></>); })()}
          </motion.g>
        </motion.g>

        {/* ═══ NODE 3 — LLM Models: wireframe + neural dots ═══ */}
        <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.45, ease: EASE }}>
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}>
            {(() => { const g = cubeGeom(580, 230, 65); return (<>
              <path d={g.left} fill="rgba(255,255,255,0.45)" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 4" />
              <path d={g.right} fill="rgba(255,255,255,0.3)" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 4" />
              <path d={g.top} fill="rgba(255,255,255,0.6)" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="6 4" />
            </>); })()}
            {(() => {
              const ns = [[562, 197], [580, 188], [598, 197], [568, 208], [592, 208], [580, 216]];
              const cs = [[0,1],[1,2],[0,3],[2,4],[3,4],[3,5],[4,5],[1,3],[1,4]];
              return (<>
                {cs.map(([a, b], ci) => <line key={ci} x1={ns[a][0]} y1={ns[a][1]} x2={ns[b][0]} y2={ns[b][1]} stroke="#3b82f6" strokeWidth="0.8" opacity={0.35} />)}
                {ns.map(([nx, ny], ni) => <motion.circle key={ni} cx={nx} cy={ny} r="3.5" fill="#3b82f6"
                  animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, delay: ni * 0.2, repeat: Infinity, ease: 'easeInOut' }} />)}
              </>);
            })()}
          </motion.g>
        </motion.g>

        {/* ═══ NODE 4 — CleanSight: magnifying glass scanning a diamond ═══ */}
        <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          filter="url(#cubeDropShadow)">
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            {/* Magnifying glass */}
            <circle cx={790} cy={205} r="22" fill="rgba(255,255,255,0.6)" stroke="#1d4ed8" strokeWidth="2" />
            <circle cx={790} cy={205} r="13" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="3 2" />
            <line x1={806} y1={221} x2={818} y2={233} stroke="#1d4ed8" strokeWidth="2.5" strokeLinecap="round" />
            {/* Scan lines inside lens */}
            <line x1={781} y1={200} x2={799} y2={200} stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
            <line x1={781} y1={205} x2={799} y2={205} stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
            <line x1={781} y1={210} x2={799} y2={210} stroke="#3b82f6" strokeWidth="1" opacity={0.5} />
          </motion.g>
        </motion.g>

        {/* ── Node labels ── */}
        {NODES.map((node, i) => (
          <motion.g key={node.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: EASE }}>
            <rect x={node.x - 50} y={node.y + 86} width={100} height={24} rx={12}
              fill="white" fillOpacity={0.75} stroke="#93c5fd" strokeWidth="0.8" />
            <text x={node.x} y={node.y + 102} textAnchor="middle"
              className="font-['Google_Sans',sans-serif]" fontSize="11" fill="#1d4ed8" fontWeight="600">{node.label}</text>
            <text x={node.x} y={node.y + 120} textAnchor="middle"
              className="font-['Google_Sans',sans-serif]" fontSize="9" fill="rgba(24,24,24,0.4)">{node.desc}</text>
          </motion.g>
        ))}
      </svg>

      {/* ═══ MOBILE ═══ */}
      <div className="md:hidden flex flex-col items-center gap-6">
        {PIPELINE_NODES.map((node, i) => (
          <motion.div key={node.id} className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}>
            <svg viewBox="0 0 100 90" fill="none" className="w-[80px] h-[72px]">
              <path d="M50 15 L80 32 L50 49 L20 32 Z" fill="#60a5fa" />
              <path d="M20 32 L50 49 L50 75 L20 58 Z" fill="#1d4ed8" />
              <path d="M80 32 L50 49 L50 75 L80 58 Z" fill="#3b82f6" />
            </svg>
            <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#181818] font-medium">{node.label}</span>
            <span className="font-['Google_Sans',sans-serif] text-[11px] text-[#181818]/40 -mt-1">{node.description}</span>
            {i < 3 && (
              <svg width="2" height="20" viewBox="0 0 2 20" className="mt-1">
                <line x1="1" y1="0" x2="1" y2="16" stroke="#3b82f6" strokeWidth="1" strokeDasharray="3 3" opacity={0.3} />
                <circle cx="1" cy="18" r="1.5" fill="#3b82f6" opacity={0.5} />
              </svg>
            )}
          </motion.div>
        ))}
        <motion.div className="w-full max-w-[300px] mt-2 py-3 px-4 rounded-xl border border-[#93c5fd]/30"
          style={{ background: 'rgba(255,255,255,0.5)' }}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.4, ease: EASE }}>
          <p className="text-center font-['Google_Sans',sans-serif] text-[10px] text-[#1d4ed8]/40 tracking-widest mb-1.5">CLEANSTART PLATFORM</p>
          <p className="text-center font-['Google_Sans',sans-serif] text-[11px] text-[#1d4ed8]/50">
            CleanCompile&nbsp;&nbsp;·&nbsp;&nbsp;Factory&nbsp;&nbsp;·&nbsp;&nbsp;Vault&nbsp;&nbsp;·&nbsp;&nbsp;Build
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

// ─── Starburst Infographic ───────────────────────────────────────────────────
//
// Rays radiate from Factory center but SKIP circular regions around each node,
// creating natural blank cutout spaces where text labels sit.

const BLUE = '#056BF1';
const SCX = 475, SCY = 265, SFR = 72;

// Node positions + blank-circle radii (sized to fit label text)
// Also includes tier label positions as exclusion zones
const STARBURST_NODES = [
  { label: 'CleanImages', x: 195, y: 100, r: 46 },
  { label: 'Packages', x: 370, y: 58, r: 38 },
  { label: 'LLM Models', x: 590, y: 58, r: 44 },
  { label: 'CleanSight', x: 760, y: 100, r: 44 },
  { label: 'CleanCompile', x: 205, y: 425, r: 48 },
  { label: 'Build', x: 475, y: 462, r: 30 },
  { label: 'Vault', x: 745, y: 425, r: 30 },
];

// Extra exclusion zones for tier labels (rays skip these too)
const LABEL_ZONES = [
  { x: 475, y: 22, r: 50 },  // SOURCES label
  { x: 475, y: 518, r: 80 }, // CLEANSTART PLATFORM label
];
const ALL_EXCLUSIONS = [...STARBURST_NODES, ...LABEL_ZONES];

// Clip a ray segment around circular exclusion zones
function clipRay(
  x1: number, y1: number, x2: number, y2: number,
  circles: { x: number; y: number; r: number }[],
): { x1: number; y1: number; x2: number; y2: number }[] {
  const dx = x2 - x1, dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return [];
  const gaps: [number, number][] = [];
  for (const c of circles) {
    const fx = x1 - c.x, fy = y1 - c.y;
    const b = 2 * (fx * dx + fy * dy);
    const disc = b * b - 4 * lenSq * (fx * fx + fy * fy - c.r * c.r);
    if (disc < 0) continue;
    const sq = Math.sqrt(disc);
    const t1 = Math.max(0, (-b - sq) / (2 * lenSq));
    const t2 = Math.min(1, (-b + sq) / (2 * lenSq));
    if (t1 < t2) gaps.push([t1, t2]);
  }
  if (gaps.length === 0) return [{ x1, y1, x2, y2 }];
  gaps.sort((a, b) => a[0] - b[0]);
  // merge overlapping
  const mg: [number, number][] = [gaps[0]];
  for (let i = 1; i < gaps.length; i++) {
    const last = mg[mg.length - 1];
    if (gaps[i][0] <= last[1]) last[1] = Math.max(last[1], gaps[i][1]);
    else mg.push(gaps[i]);
  }
  const segs: { x1: number; y1: number; x2: number; y2: number }[] = [];
  let t = 0;
  for (const [gs, ge] of mg) {
    if (t < gs) segs.push({
      x1: x1 + dx * t, y1: y1 + dy * t,
      x2: x1 + dx * gs, y2: y1 + dy * gs,
    });
    t = ge;
  }
  if (t < 1) segs.push({
    x1: x1 + dx * t, y1: y1 + dy * t, x2, y2,
  });
  return segs;
}

// Pre-compute all clipped ray segments — rays extend to SVG edges
const SVG_W = 950, SVG_H = 530;
const RAY_COUNT = 140;
const CLIPPED_RAYS: { x1: number; y1: number; x2: number; y2: number }[] = [];
for (let i = 0; i < RAY_COUNT; i++) {
  const angle = (i / RAY_COUNT) * Math.PI * 2 + ((i * 17) % 5 - 2) * 0.006;
  const cos = Math.cos(angle), sin = Math.sin(angle);
  const startR = SFR + 3;
  const x1 = SCX + cos * startR;
  const y1 = SCY + sin * startR;
  // Extend ray to the edge of the SVG rectangle
  let tMax = 1000; // large default
  if (cos > 0.001) tMax = Math.min(tMax, (SVG_W - x1) / cos);
  else if (cos < -0.001) tMax = Math.min(tMax, -x1 / cos);
  if (sin > 0.001) tMax = Math.min(tMax, (SVG_H - y1) / sin);
  else if (sin < -0.001) tMax = Math.min(tMax, -y1 / sin);
  const x2 = x1 + cos * tMax;
  const y2 = y1 + sin * tMax;
  CLIPPED_RAYS.push(...clipRay(x1, y1, x2, y2, ALL_EXCLUSIONS));
}

function OrbitalInfographic() {
  return (
    <div className="w-full max-w-[1060px] mx-auto">
      {/* ═══ DESKTOP ═══ */}
      <svg viewBox="0 0 950 530" className="w-full hidden md:block">

        {/* ── Clipped radiating rays (skip node regions) ── */}
        {CLIPPED_RAYS.map((r, i) => (
          <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2}
            stroke={BLUE} strokeWidth="2" />
        ))}

        {/* ── Factory — center circle ── */}
        <circle cx={SCX} cy={SCY} r={SFR} fill={BLUE} />
        <text x={SCX} y={SCY + 7} textAnchor="middle"
          className="font-['Google_Sans',sans-serif]" fontSize="20" fill="white"
          fontWeight="600">Factory</text>

        {/* ── Node labels centered in blank cutout spaces ── */}
        {STARBURST_NODES.map((n) => (
          <text key={n.label}
            x={n.x} y={n.y + 5}
            textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="13" fill="#0F1924"
            fontWeight="600">{n.label}</text>
        ))}

      </svg>

      {/* ═══ MOBILE ═══ */}
      <div className="md:hidden py-8 px-6 flex flex-col items-center gap-5">
        <p className="font-['Google_Sans',sans-serif] text-[10px] text-[#056BF1] tracking-widest font-medium">SOURCES</p>
        <div className="flex flex-wrap justify-center gap-2.5">
          {STARBURST_NODES.slice(0, 4).map((s) => (
            <span key={s.label} className="px-3.5 py-2 rounded-full bg-[#056BF1] font-['Google_Sans',sans-serif] text-[11px] text-white font-medium">
              {s.label}
            </span>
          ))}
        </div>
        <div className="w-24 h-24 rounded-full bg-[#056BF1] flex items-center justify-center">
          <span className="font-['Google_Sans',sans-serif] text-white font-semibold text-[15px]">Factory</span>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5">
          {STARBURST_NODES.slice(4).map((o) => (
            <span key={o.label} className="px-3.5 py-2 rounded-full bg-[#056BF1] font-['Google_Sans',sans-serif] text-[11px] text-white font-medium">
              {o.label}
            </span>
          ))}
        </div>
        <p className="font-['Google_Sans',sans-serif] text-[10px] text-[#056BF1] tracking-widest font-medium">CLEANSTART PLATFORM</p>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function BuildSecurelySection() {
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isComparisonInView = useInView(comparisonRef, { once: true, margin: '-80px' });

  return (
    <section className="bg-white">
      {/* ── PROBLEM BLOCK ─────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-10 md:gap-14">
          {/* Header */}
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1]"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            Modern Software Introduces<br />New Security Risks
          </motion.h2>

          {/* Problem cards — 2x2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {PROBLEMS.map((problem, i) => (
              <ProblemCard key={problem.title} {...problem} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SOLUTION BLOCK ────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-[50px]">
        <div className="relative rounded-[15px] overflow-hidden bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
          {/* Perspective grid background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Grid at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[45%]" style={{ perspective: '400px' }}>
              <div
                className="absolute inset-0 origin-bottom"
                style={{
                  transform: 'rotateX(55deg)',
                  backgroundImage: `
                    linear-gradient(to right, rgba(5,107,241,0.35) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(5,107,241,0.35) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
              {/* Center radial gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 100%, rgba(5,107,241,0.15) 0%, rgba(205,245,254,0.7) 50%, rgba(205,245,254,1) 100%)',
                }}
              />
            </div>
            {/* Grid at top */}
            <div className="absolute top-0 left-0 right-0 h-[25%]" style={{ perspective: '400px' }}>
              <div
                className="absolute inset-0 origin-top"
                style={{
                  transform: 'rotateX(-55deg)',
                  backgroundImage: `
                    linear-gradient(to right, rgba(5,107,241,0.3) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(5,107,241,0.3) 1px, transparent 1px)
                  `,
                  backgroundSize: '50px 50px',
                }}
              />
              {/* Fade out */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse at 50% 0%, rgba(5,107,241,0.1) 0%, rgba(205,245,254,0.75) 50%, rgba(205,245,254,1) 100%)',
                }}
              />
            </div>
          </div>

          <div className="relative z-10 max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">
          {/* Solution header */}
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
                Built Securely, from Source to Image
              </h2>
            </motion.div>

          </div>

          {/* ── PRODUCT CARDS (accordion) + nodes + platform ────────── */}
          <ProductAccordionCards />

          </div>
        </div>
      </div>

      {/* ── COMPARISON TABLE (white background) ─────────────────────────── */}
      <div className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Header — split: title left, description right */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
            <motion.div
              className="lg:w-[35%] shrink-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1]">
                Security isn&apos;t just patching
              </h2>
            </motion.div>
            <motion.p
              className="flex-1 lg:pl-8 font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#181818]/50 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Comparison Block with a Cube
            </motion.p>
          </div>

          {/* Before → After — two premium cards with center connector */}
          <motion.div
            ref={comparisonRef}
            className="relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">

              {/* ── Left: Without CleanStart ── */}
              <div
                className="rounded-[20px] lg:rounded-r-none p-8 md:p-10 lg:p-12 relative overflow-hidden"
                style={{ background: '#F8F9FB', border: '1px solid #ECEDEF', borderRight: 'none' }}
              >
                {/* Subtle grid pattern bg */}
                <div className="absolute inset-0 opacity-[0.4]" style={{
                  backgroundImage: 'linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }} />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Header */}
                  <span className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818]">
                    Public Images
                  </span>

                  {/* Items */}
                  <div className="flex flex-col gap-5">
                    {COMPARISON_ROWS.map((row, i) => (
                      <motion.div
                        key={row.left}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -12 }}
                        animate={isComparisonInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <circle cx="12" cy="12" r="10" stroke="#181818" strokeOpacity="0.15" strokeWidth="1.5" />
                          <path d="M8 12h8" stroke="#181818" strokeOpacity="0.3" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#181818]/70 leading-relaxed">
                          {row.left}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Center connector (desktop) ── */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div
                  className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                  style={{ background: '#056BF1', boxShadow: '0 0 0 8px white, 0 4px 20px rgba(5,107,241,0.25)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* Mobile connector */}
              <div className="flex lg:hidden items-center justify-center py-3">
                <div
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                  style={{ background: '#056BF1', boxShadow: '0 4px 16px rgba(5,107,241,0.25)' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-90">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>

              {/* ── Right: With CleanStart ── */}
              <div
                className="rounded-[20px] lg:rounded-l-none p-8 md:p-10 lg:p-12 relative overflow-hidden"
                style={{ background: '#056BF1' }}
              >
                {/* Subtle radial glow */}
                <div className="absolute -top-[100px] -right-[100px] w-[300px] h-[300px] rounded-full opacity-[0.15]" style={{ background: 'radial-gradient(circle, #06C7F2, transparent 70%)' }} />

                <div className="relative z-10 flex flex-col gap-6">
                  {/* Header */}
                  <span className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-white">
                    With CleanStart
                  </span>

                  {/* Items */}
                  <div className="flex flex-col gap-5">
                    {COMPARISON_ROWS.map((row, i) => (
                      <motion.div
                        key={row.right}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: 12 }}
                        animate={isComparisonInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: EASE }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0">
                          <circle cx="12" cy="12" r="10" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" />
                          <path d="M8 12l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-relaxed">
                          {row.right}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── CLEANSTART ADVANTAGE STATS ────────────────────────────────────── */}
      <div className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">

        <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Header — split: title left, description right (ref layout) */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
            <motion.div
              className="lg:w-[35%] shrink-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.02em] leading-[1.1]">
                CleanStart<br />Advantage
              </h2>
            </motion.div>
            <motion.p
              className="flex-1 lg:pl-8 font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/60 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Real results from teams that replaced vulnerable public images with CleanStart&apos;s hardened, source-built containers.
            </motion.p>
          </div>

          {/* Stats grid — all in one row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} delay={i * 0.07} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
