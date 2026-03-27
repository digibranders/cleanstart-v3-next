"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import WhiteBgCube from '@/lib/svg-data/WhiteBgCube1';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';
import { type ReactNode } from 'react';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

// ─── Problem icons ────────────────────────────────────────────────────────────

function IconPackage({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconRefresh({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M23 4v6h-6" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconScan({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 12h10" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconShuffle({ color }: { color: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M16 3h5v5M4 20L21 3" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21 16v5h-5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15 15l6 6M4 4l5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
  icon: (color: string) => ReactNode;
  title: string;
  description: string;
  bg: string;
  dark: boolean;
  iconColor: string;
  iconBg: string;
}

const PROBLEMS: ProblemData[] = [
  {
    icon: (c) => <IconPackage color={c} />,
    title: 'Unknown Dependencies',
    description: 'Images include packages from multiple sources that are hard to verify.',
    bg: '#0F1924',
    dark: true,
    iconColor: '#60a5fa',
    iconBg: 'rgba(96,165,250,0.12)',
  },
  {
    icon: (c) => <IconRefresh color={c} />,
    title: 'Endless Patching',
    description: 'Fixing vulnerabilities after build leads to constant updates and overhead.',
    bg: '#056BF1',
    dark: true,
    iconColor: '#bfdbfe',
    iconBg: 'rgba(255,255,255,0.15)',
  },
  {
    icon: (c) => <IconScan color={c} />,
    title: 'Reactive Scanning',
    description: 'Scanning detects issues late but does not control how software is built.',
    bg: '#ECEDEF',
    dark: false,
    iconColor: '#056BF1',
    iconBg: 'rgba(5,107,241,0.1)',
  },
  {
    icon: (c) => <IconShuffle color={c} />,
    title: 'Uncontrolled Builds',
    description: 'Without deterministic builds, artifacts can change across environments.',
    bg: '#181818',
    dark: true,
    iconColor: '#f87171',
    iconBg: 'rgba(248,113,113,0.12)',
  },
];

const PRODUCTS = [
  {
    name: 'CleanImage',
    description: 'Hardened container images built from verified source with minimal components and near-zero vulnerabilities.',
    image: '/images/figma/523d69e15824438a4fbbf34f51fb05a35f7fdf0d.png',
  },
  {
    name: 'CleanSight',
    description: 'Real-time visibility across your software supply chain — detect risks before they reach production.',
    image: '/images/figma/cd141cb5bc524f13a11e1d3e641bff9c5c0aaf62.png',
  },
  {
    name: 'CleanSBOM',
    description: 'A verified bill of materials for every image you ship — full traceability from source to deployment.',
    image: '/images/figma/d77f8a0a1e5bedbff53424b69f5812b4cb560788.png',
  },
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

function ProblemCard({ icon, title, description, bg, dark, iconColor, iconBg, delay }: ProblemData & { delay: number }) {
  const [cardHovered, setCardHovered] = useState(false);
  const textColor = dark ? 'rgba(255,255,255,0.9)' : '#181818';
  const subColor = dark ? 'rgba(255,255,255,0.5)' : 'rgba(24,24,24,0.55)';

  return (
    <motion.div
      className="rounded-2xl flex flex-col gap-5 h-full cursor-pointer"
      style={{ background: bg, minHeight: '220px', padding: '28px' }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: iconBg }}
      >
        {icon(iconColor)}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="font-['Google_Sans',sans-serif] font-normal text-[20px] leading-[1.2] tracking-[-0.02em]"
          style={{ color: textColor }}
        >
          {title}
        </h3>
        <p
          className="font-['Google_Sans',sans-serif] font-normal text-[13px] leading-relaxed"
          style={{ color: subColor }}
        >
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="flex justify-end mt-auto">
        <CircleArrowCTA variant={dark ? 'filled-white' : 'filled-blue'} size={44} forceHovered={cardHovered} />
      </div>
    </motion.div>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const { value, ref } = useCountUp(stat.value, stat.decimals);
  return (
    <motion.div
      className="relative flex flex-col justify-between rounded-2xl overflow-hidden group h-full"
      style={{
        padding: '32px',
        minHeight: '160px',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, delay, ease: EASE }}
      whileHover={{ borderColor: 'rgba(6,199,242,0.25)', transition: { duration: 0.2 } }}
    >
      {/* Gradient top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-[1.5px]"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(6,199,242,0.6), rgba(5,107,241,0.4), transparent)' }}
      />
      {/* Inner glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,199,242,0.06), transparent 70%)' }}
      />
      {/* Number */}
      <p
        className="font-['Google_Sans',sans-serif] font-normal leading-none tracking-[-0.03em] text-white relative z-10"
        style={{ fontSize: '56px' }}
      >
        <span ref={ref}>
          {stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.round(value)}
        </span>
        <span style={{ color: '#06C7F2' }}>{stat.suffix}</span>
      </p>
      {/* Divider */}
      <div className="w-8 h-px my-3 relative z-10" style={{ background: 'rgba(255,255,255,0.15)' }} />
      {/* Label */}
      <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] leading-snug relative z-10" style={{ color: 'rgba(255,255,255,0.45)' }}>
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function BuildSecurelySection() {
  const [activeCard, setActiveCard] = useState(0);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const isComparisonInView = useInView(comparisonRef, { once: true, margin: '-80px' });

  return (
    <section className="bg-white">
      {/* ── PROBLEM BLOCK ─────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-10 md:gap-14">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0">
            <motion.div
              className="lg:w-[580px] shrink-0"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1]">
                Modern Software Introduces New Security Risks
              </h2>
            </motion.div>
            <motion.p
              className="flex-1 lg:pl-16 font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/55 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Every dependency is a risk. Every update is a vulnerability window. The traditional approach
              to container security leaves teams constantly patching — never truly secure.
            </motion.p>
          </div>

          {/* Problem cards — bento grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-5 auto-rows-fr">
            <div className="sm:col-span-1 lg:col-span-7 h-full">
              <ProblemCard {...PROBLEMS[0]} delay={0} />
            </div>
            <div className="sm:col-span-1 lg:col-span-5 h-full">
              <ProblemCard {...PROBLEMS[1]} delay={0.08} />
            </div>
            <div className="sm:col-span-1 lg:col-span-5 h-full">
              <ProblemCard {...PROBLEMS[2]} delay={0.16} />
            </div>
            <div className="sm:col-span-1 lg:col-span-7 h-full">
              <ProblemCard {...PROBLEMS[3]} delay={0.24} />
            </div>
          </div>
        </div>
      </div>

      {/* ── SOLUTION BLOCK ────────────────────────────────────────────────── */}
      <div className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">
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

            {/* Platform components pill */}
            <motion.div
              className="self-start flex items-center gap-2 px-4 py-2 rounded-full bg-[#056BF1]/8 border border-[#056BF1]/15"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
            >
              <span className="font-['Google_Sans',sans-serif] text-[12px] text-[#056BF1]/70 font-normal">
                CleanCompile&nbsp;&nbsp;·&nbsp;&nbsp;Factory&nbsp;&nbsp;·&nbsp;&nbsp;Vault&nbsp;&nbsp;·&nbsp;&nbsp;Build
              </span>
            </motion.div>
          </div>

          {/* ── PRODUCT CARDS (mobile: grid, desktop: accordion) ──────────── */}
          {/* Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:hidden">
            {PRODUCTS.map((card, i) => (
              <motion.div
                key={card.name}
                className="relative rounded-[15px] overflow-hidden h-[320px] sm:h-[380px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative flex flex-col justify-between h-full p-[25px]">
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/80 leading-normal">
                    {card.description}
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-['Google_Sans',sans-serif] font-bold text-[24px] text-white leading-tight">
                      {card.name}
                    </h3>
                    <CircleArrowCTA variant="outline-white" size={40} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Desktop accordion */}
          <div className="hidden lg:flex gap-[15px] items-center w-full" style={{ height: 500 }}>
            {PRODUCTS.map((card, i) => {
              const isActive = activeCard === i;
              return (
                <motion.div
                  key={card.name}
                  className="relative rounded-[15px] overflow-hidden cursor-pointer"
                  onMouseEnter={() => setActiveCard(i)}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1, ease: EASE }}
                  animate={{
                    flex: isActive ? 1.2 : 0.9,
                    height: isActive ? 500 : 400,
                  }}
                  style={{
                    transition: 'flex 500ms cubic-bezier(0.16,1,0.3,1), height 500ms cubic-bezier(0.16,1,0.3,1)',
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Expanded content */}
                  <motion.div
                    className="relative flex flex-col justify-between h-full p-[25px]"
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: isActive ? 0.4 : 0.15, delay: isActive ? 0.12 : 0 }}
                  >
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] text-white/80 leading-normal max-w-[280px]">
                      {card.description}
                    </p>
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="font-['Google_Sans',sans-serif] font-bold text-[28px] text-white leading-tight">
                        {card.name}
                      </h3>
                      <CircleArrowCTA variant="outline-white" size={40} />
                    </div>
                  </motion.div>
                  {/* Collapsed label */}
                  <motion.div
                    className="absolute inset-0 flex flex-col items-start justify-end p-[25px]"
                    animate={{ opacity: isActive ? 0 : 1 }}
                    transition={{ duration: isActive ? 0.15 : 0.4, delay: isActive ? 0 : 0.12 }}
                  >
                    <h3 className="font-['Google_Sans',sans-serif] font-bold text-[22px] text-white leading-tight">
                      {card.name}
                    </h3>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* ── COMPARISON TABLE ─────────────────────────────────────────── */}
          <motion.div
            ref={comparisonRef}
            className="rounded-2xl md:rounded-3xl overflow-hidden border border-[#056BF1]/12"
            style={{ boxShadow: '0 4px 40px rgba(5,107,241,0.07)' }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            {/* Column headers */}
            <div className="grid grid-cols-[1fr_auto_1fr]">
              {/* Left header — Public Images */}
              <div className="px-6 md:px-10 py-5 bg-[#F8FAFC] border-b border-[#056BF1]/10 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="1.8" />
                  <path d="M15 9l-6 6M9 9l6 6" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[14px] text-[#181818]/50 uppercase tracking-wide">
                  Public Images
                </span>
              </div>

              {/* Center header — Cube */}
              <div className="px-5 md:px-8 py-5 bg-[#056BF1] border-b border-[#056BF1] flex items-center justify-center">
                <motion.div
                  style={{ width: 32, height: 37 }}
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <WhiteBgCube />
                </motion.div>
              </div>

              {/* Right header — CleanStart */}
              <div className="px-6 md:px-10 py-5 bg-[#EBF5FF] border-b border-[#056BF1]/10 flex items-center gap-3 justify-end">
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[14px] text-[#056BF1] uppercase tracking-wide">
                  CleanStart
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#056BF1" strokeWidth="1.8" />
                  <path d="M8.5 12.5l2.5 2.5 5-5" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Rows */}
            {COMPARISON_ROWS.map((row, i) => (
              <div
                key={row.left}
                className="grid grid-cols-[1fr_auto_1fr]"
                style={{ borderBottom: i < COMPARISON_ROWS.length - 1 ? '1px solid rgba(5,107,241,0.08)' : 'none' }}
              >
                {/* Left cell */}
                <motion.div
                  className="px-6 md:px-10 py-4 md:py-5 bg-[#FAFAFA] flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isComparisonInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M18 6L6 18M6 6l12 12" stroke="rgba(239,68,68,0.6)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] text-[#181818]/55 leading-snug">
                    {row.left}
                  </span>
                </motion.div>

                {/* Center connector */}
                <div className="px-5 md:px-8 py-4 md:py-5 bg-[#056BF1] flex items-center justify-center">
                  <motion.svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    animate={isComparisonInView ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </div>

                {/* Right cell */}
                <motion.div
                  className="px-6 md:px-10 py-4 md:py-5 bg-[#EEF6FF] flex items-center gap-3 justify-end"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isComparisonInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.07, ease: EASE }}
                >
                  <span className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] text-[#056BF1]/80 leading-snug text-right">
                    {row.right}
                  </span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M20 6L9 17l-5-5" stroke="#056BF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── CLEANSTART ADVANTAGE STATS ────────────────────────────────────── */}
      <div className="bg-[#0F1924] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">

        <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Header — split: badge+title left, descriptor right */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0">
            <motion.div
              className="lg:w-[560px] shrink-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[36px] md:text-[48px] text-white tracking-[-0.02em] leading-[1.05]">
                CleanStart Advantage
              </h2>
            </motion.div>
            <motion.p
              className="flex-1 lg:pl-16 font-['Google_Sans',sans-serif] font-normal text-[15px] text-white/40 leading-relaxed max-w-[400px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            >
              Real results from teams that replaced vulnerable public images with CleanStart's hardened, source-built containers.
            </motion.p>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 md:grid-cols-12 gap-3 md:gap-4 auto-rows-fr">
            {/* Row 1 */}
            <div className="col-span-2 md:col-span-5 h-full">
              <StatCard stat={STATS[0]} delay={0} />
            </div>
            <div className="col-span-1 md:col-span-4 h-full">
              <StatCard stat={STATS[1]} delay={0.07} />
            </div>
            <div className="col-span-1 md:col-span-3 h-full">
              <StatCard stat={STATS[2]} delay={0.14} />
            </div>
            {/* Row 2 */}
            <div className="col-span-1 md:col-span-3 h-full">
              <StatCard stat={STATS[3]} delay={0.21} />
            </div>
            <div className="col-span-2 md:col-span-5 h-full">
              <StatCard stat={STATS[4]} delay={0.28} />
            </div>
            <div className="col-span-1 md:col-span-4 h-full">
              <StatCard stat={STATS[5]} delay={0.35} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
