"use client";

import { motion, useInView, AnimatePresence, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';
import { type ReactNode } from 'react';
import { PackageOpenIcon, RefreshIcon, ScanIcon, ShuffleIcon, Blockchain04Icon, Shield01Icon, Bug01Icon, Layers01Icon } from 'hugeicons-react';
import { HugeiconsIcon } from '@hugeicons/react';
import { CodeSquareIcon, Configuration01Icon, LockedIcon } from '@hugeicons/core-free-icons';

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

const COMPARISON_PUBLIC = [
  'Patch after image creation',
  'Public base images',
  'Large attack surface',
  'Scanner-driven security',
  'Non-deterministic builds',
];

const COMPARISON_CLEAN = [
  'Built from verified source',
  'Controlled packages',
  'Minimal components',
  'Secure by design',
  'Reproducible builds',
];


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
        padding: '20px',
        minHeight: '160px',
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
        className="absolute -top-[40px] -right-[40px] opacity-[0.18] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.25]"
      >
        {bgIcon}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] leading-[1.3] tracking-[-0.01em] text-[#0F1924] mb-1.5">
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[12px] leading-relaxed text-[#0F1924]/50 max-w-[280px]">
          {description}
        </p>
      </div>

      {/* CTA bottom right */}
      <div className="relative z-10 flex justify-end mt-2">
        <CircleArrowCTA variant="filled-blue" size={36} forceHovered={cardHovered} />
      </div>
    </motion.div>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const { value, ref } = useCountUp(stat.value, stat.decimals);

  return (
    <motion.div
      className="relative flex flex-col justify-between rounded-[10px] overflow-hidden bg-white h-full"
      style={{ padding: '18px 16px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: EASE }}
    >
      <p className="font-['Google_Sans',sans-serif] font-semibold leading-none tracking-[-0.02em] text-[#0F1924] text-[28px] md:text-[32px]">
        {stat.prefix && <span>{stat.prefix}</span>}
        <span ref={ref}>
          {stat.decimals > 0 ? value.toFixed(stat.decimals) : Math.round(value)}
        </span>
        <span>{stat.suffix}</span>
      </p>
      <p className="font-['Google_Sans',sans-serif] font-normal text-[12px] md:text-[13px] leading-snug text-[#0F1924]/50 mt-3">
        {stat.label}
      </p>
    </motion.div>
  );
}

// ─── Platform Process Flow (inside dark strip) ─────────────────────────────

const PROCESS_STEPS = [
  { label: 'CleanCompile', icon: CodeSquareIcon },
  { label: 'Build', icon: Configuration01Icon },
  { label: 'Vault', icon: LockedIcon },
] as const;

// Card index → pipeline step index mapping
const CARD_TO_STEP: Record<number, number> = {
  0: 0, // CleanImages → CleanCompile
  1: 1, // Packages → Build
  2: 1, // LLM Models → Build
  3: 2, // CleanSight → Vault
};

function PlatformProcessFlow({ activeStep }: { activeStep: number | null }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <div ref={ref} className="flex items-center gap-0">
      {PROCESS_STEPS.map((step, i) => {
        const isActive = activeStep === i;
        return (
          <div key={step.label} className="flex items-center">
            {/* Step: icon + label */}
            <motion.div
              className="flex items-center gap-[8px] relative z-10 px-[12px] py-[6px] rounded-[8px]"
              style={{
                background: isActive ? '#06C7F2' : 'rgba(255,255,255,0.95)',
                border: 'none',
                transition: 'all 0.3s ease',
              }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 + 0.2, ease: EASE }}
            >
              <div
                className="flex items-center justify-center rounded-[5px]"
                style={{
                  width: 24,
                  height: 24,
                  background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(5,107,241,0.1)',
                  transition: 'background 0.3s ease',
                }}
              >
                <HugeiconsIcon
                  icon={step.icon}
                  size={14}
                  color={isActive ? '#ffffff' : '#056BF1'}
                  strokeWidth={1.5}
                />
              </div>
              <span
                className="font-['Google_Sans',sans-serif] text-[13px] font-medium whitespace-nowrap tracking-[-0.01em]"
                style={{
                  color: isActive ? '#ffffff' : '#0F1924',
                  transition: 'color 0.3s ease',
                }}
              >
                {step.label}
              </span>
            </motion.div>

            {/* Connector: track + animated dot */}
            {i < PROCESS_STEPS.length - 1 && (
              <div className="relative flex items-center" style={{ width: 48, marginLeft: 6, marginRight: 6 }}>
                {/* Static track */}
                <div className="absolute top-1/2 -translate-y-1/2 w-full h-[1px] rounded-full bg-white/[0.15]" />

                {/* Traveling dot */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 rounded-full"
                  style={{
                    width: 4,
                    height: 4,
                    background: '#ffffff',
                    boxShadow: '0 0 8px 2px rgba(255,255,255,0.4)',
                  }}
                  animate={isInView ? { left: ['-2px', '46px'] } : {}}
                  transition={{
                    duration: 1.4,
                    delay: i * 0.6 + 1.2,
                    repeat: Infinity,
                    repeatDelay: 3 - i * 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />

                {/* Chevron */}
                <svg
                  className="absolute right-[-2px] top-1/2 -translate-y-1/2 z-10"
                  width="6" height="10" viewBox="0 0 6 10" fill="none"
                >
                  <path d="M1.5 2l2.5 3L1.5 8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Product Accordion Cards ─────────────────────────────────────────────────

/* ── Product Suite Data ─────────────────────────────────────────────────── */

interface ProductSuiteItem {
  title: string;
  subtitle: string;
  tag: string;
  icon: ReactNode;
}

const PRODUCT_SUITE: ProductSuiteItem[] = [
  {
    title: 'Clean Image', subtitle: 'Minimal, immutable runtime with zero known CVEs.', tag: 'RUNTIME',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M6 10h.01M10 10h.01M14 10h.01" /><path d="M2 10h20" /></svg>,
  },
  {
    title: 'Clean Packages', subtitle: 'Every dependency curated, verified, and traceable.', tag: 'DEPENDENCIES',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" /></svg>,
  },
  {
    title: 'Clean ML Models', subtitle: 'Scanned, signed, and safe by design for AI workloads.', tag: 'AI / ML',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" /></svg>,
  },
  {
    title: 'CleanSight', subtitle: 'AI-powered risk, policy, and drift detection in real time.', tag: 'OBSERVABILITY',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>,
  },
  {
    title: 'Clean SBOM', subtitle: 'Complete, signed software bill of materials — always current.', tag: 'TRANSPARENCY',
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6M9 13h6M9 17h3M9 9h1" /></svg>,
  },
];

/* ── Engine data ── */

interface EngineFeature {
  label: string;
  desc: string;
  icon: ReactNode;
}

const ENGINE_FEATURES_AI: EngineFeature[] = [
  { label: 'Plan', desc: 'Define build strategy', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h10M4 18h6" /></svg> },
  { label: 'Analyze', desc: 'Scan dependencies', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.35-4.35" /></svg> },
  { label: 'Orchestrate', desc: 'Optimize pipeline', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="19" cy="19" r="2" /><path d="M12 7v4M7.5 17.5L10.5 13M16.5 17.5L13.5 13" /></svg> },
];

const ENGINE_FEATURES_COMPILE: EngineFeature[] = [
  { label: 'Spec', desc: 'Lock requirements', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h3" /></svg> },
  { label: 'Build', desc: 'Hermetic compile', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94L6.13 20.8a2.1 2.1 0 01-3-3l7.37-7.37a6 6 0 017.94-7.94l-3.76 3.76z" /></svg> },
  { label: 'Attest', desc: 'Sign provenance', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg> },
  { label: 'Handoff', desc: 'Deliver artifact', icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg> },
];

/* ── Legacy data kept for compatibility ─────────────────────────────────── */
const PRODUCT_CARDS = [
  { title: 'CleanImages', cta: 'Learn More', image: '/home/card-container-images.png' },
  { title: 'Packages', cta: 'Learn More', image: '/home/card-packages.png' },
  { title: 'LLM Models', cta: 'Learn More', image: '/home/card-library.png' },
  { title: 'CleanSight', cta: 'Learn More', image: '/home/card-vm.png' },
];

/* ── Product card data for bottom row ── */
const PRODUCT_CARDS_STATIC = [
  {
    tag: 'RUNTIME',
    title: 'Clean Image',
    subtitle: 'Minimal. Immutable. Zero CVE.',
    icon: '/home/factory/group-quality.svg',
  },
  {
    tag: 'DEPENDENCIES',
    title: 'Clean Packages',
    subtitle: 'Curated. Verified. No hidden risk.',
    icon: '/home/factory/capa-shield.svg',
  },
  {
    tag: 'AI/ML',
    title: 'Clean ML Models',
    subtitle: 'Scanned. Signed. Safe by design.',
    icon: '/home/factory/five-v.svg',
  },
  {
    tag: 'OBSERVABILITY',
    title: 'Cleansight',
    subtitle: 'AI-powered insights. Risk, policy & drift detection.',
    icon: '/home/factory/four-v.svg',
  },
  {
    tag: 'TRANSPARENCY',
    title: 'Clean SBOM',
    subtitle: 'Complete. Signed. Continuously verified.',
    icon: '/home/factory/gov-3.svg',
  },
];

/* ── Foundation card (shared between desktop/mobile) ── */
function FoundationCard(): React.ReactElement {
  return (
    <div
      className="rounded-[20px] border border-[#E5E7EB] bg-white overflow-hidden"
      style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.04)' }}
    >
      <div className="text-center py-5 border-b border-[#E5E7EB]">
        <span className="font-['Google_Sans',sans-serif] font-bold text-[13px] md:text-[15px] tracking-[0.15em] uppercase text-[#181818]">
          Built on Zero-CVE Foundation
        </span>
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 bg-[#056BF1] p-6 md:p-8 lg:p-10">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-1">
              <h4 className="font-['Google_Sans',sans-serif] font-bold text-[18px] md:text-[22px] text-white tracking-[-0.02em] uppercase mb-2">AI Logic Engine</h4>
              <p className="font-['Google_Sans',sans-serif] text-[12px] md:text-[13px] text-white/80 leading-relaxed">Multi-agent orchestration that plans, analyzes, and optimizes every build.</p>
            </div>
            <Image src="/home/factory/ai-engine.svg" alt="AI Logic Engine" width={80} height={80} className="shrink-0" />
          </div>
          <div className="flex gap-3 md:gap-4">
            {[
              { label: 'Plan', icon: '/home/factory/step-plan.svg' },
              { label: 'Analyze', icon: '/home/factory/step-analyze.svg' },
              { label: 'Orchestrate', icon: '/home/factory/step-orchestrate.svg' },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[12px] md:text-[14px] text-white block mb-2">{s.label}</span>
                <div className="flex justify-center"><Image src={s.icon} alt={s.label} width={36} height={36} /></div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center px-2 py-4 lg:py-0 bg-white">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="hidden lg:block"><path d="M8 16h16M20 10l6 6-6 6" stroke="#056BF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="lg:hidden"><path d="M16 8v16M10 20l6 6 6-6" stroke="#056BF1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
        <div className="flex-1 bg-[#056BF1] p-6 md:p-8 lg:p-10">
          <div className="flex items-start gap-4 mb-6">
            <Image src="/home/factory/compile-factory.svg" alt="CleanCompile Factory" width={80} height={80} className="shrink-0" />
            <div className="flex-1">
              <h4 className="font-['Google_Sans',sans-serif] font-bold text-[18px] md:text-[22px] text-white tracking-[-0.02em] uppercase mb-2">CleanCompile Factory</h4>
              <p className="font-['Google_Sans',sans-serif] text-[12px] md:text-[13px] text-white/80 leading-relaxed">Hermetic, deterministic builds. Only what you specify.</p>
            </div>
          </div>
          <div className="flex gap-3 md:gap-4">
            {[
              { label: 'Spec', icon: '/home/factory/step-spec.svg' },
              { label: 'Build', icon: '/home/factory/step-plan.svg' },
              { label: 'Attest', icon: '/home/factory/step-attest.svg' },
              { label: 'Handoff', icon: '/home/factory/step-handoff.svg' },
            ].map((s) => (
              <div key={s.label} className="flex-1 text-center">
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[12px] md:text-[14px] text-white block mb-2">{s.label}</span>
                <div className="flex justify-center"><Image src={s.icon} alt={s.label} width={36} height={36} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Product card (shared) ── */
function ProductCard({ card, visible }: { card: typeof PRODUCT_CARDS_STATIC[0]; visible: boolean }): React.ReactElement {
  return (
    <div
      className="rounded-[16px] bg-[#056BF1] p-4 md:p-5 lg:p-6 flex flex-col items-center text-center transition-all duration-700 min-h-[180px] md:min-h-[200px] lg:min-h-[220px]"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
      }}
    >
      <span className="font-['Google_Sans',sans-serif] font-bold text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-white mb-3 md:mb-4">{card.tag}</span>
      <div className="mb-3 md:mb-4 flex-shrink-0"><Image src={card.icon} alt={card.title} width={40} height={40} className="md:w-[50px] md:h-[50px]" /></div>
      <h4 className="font-['Google_Sans',sans-serif] font-bold text-[14px] md:text-[15px] lg:text-[17px] text-white leading-tight mb-1">{card.title}</h4>
      <p className="font-['Google_Sans',sans-serif] text-[10px] md:text-[11px] lg:text-[12px] text-white leading-snug mb-3 md:mb-4">{card.subtitle}</p>
      <div className="mt-auto">
        <div className="w-[34px] h-[34px] md:w-[40px] md:h-[40px] rounded-full bg-white flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </div>
      </div>
    </div>
  );
}

/* ── SVG path data — circuit-board right-angle paths with rounded corners ── */
const R = 18;
const FLOW_PATHS = [
  { endX: 100, d: `M 500 0 L 500 ${30 - R} Q 500 30, ${500 - R} 30 L ${100 + R} 30 Q 100 30, 100 ${30 + R} L 100 130` },
  { endX: 300, d: `M 500 0 L 500 ${60 - R} Q 500 60, ${500 - R} 60 L ${300 + R} 60 Q 300 60, 300 ${60 + R} L 300 130` },
  { endX: 500, d: `M 500 0 L 500 130` },
  { endX: 700, d: `M 500 0 L 500 ${60 - R} Q 500 60, ${500 + R} 60 L ${700 - R} 60 Q 700 60, 700 ${60 + R} L 700 130` },
  { endX: 900, d: `M 500 0 L 500 ${30 - R} Q 500 30, ${500 + R} 30 L ${900 - R} 30 Q 900 30, 900 ${30 + R} L 900 130` },
];

/* ── Fluid node animation hook — rAF-driven dash traveling along path ── */
function useFluidPaths(
  pathRefs: React.RefObject<(SVGPathElement | null)[]>,
  flowRefs: React.RefObject<(SVGPathElement | null)[]>,
  active: boolean,
) {
  const offsetsRef = useRef<number[]>([0, 0, 0, 0, 0]);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    if (!active) return;

    let rafId: number;

    function frame(t: number) {
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      const paths = pathRefs.current;
      const flows = flowRefs.current;
      if (!paths || !flows) { rafId = requestAnimationFrame(frame); return; }

      for (let i = 0; i < 5; i++) {
        const basePath = paths[i];
        const flowPath = flows[i];
        if (!basePath || !flowPath) continue;

        const totalLen = basePath.getTotalLength();
        const dashLen = totalLen * 0.28; // visible dash = ~28% of path

        // speed varies per line for organic feel
        const speed = (2.0 + i * 0.1);
        const v = totalLen / speed; // px/sec

        offsetsRef.current[i] -= v * dt;
        if (offsetsRef.current[i] < -totalLen) offsetsRef.current[i] += totalLen;

        flowPath.style.strokeDasharray = `${dashLen} ${totalLen}`;
        flowPath.style.strokeDashoffset = String(offsetsRef.current[i]);
      }

      rafId = requestAnimationFrame(frame);
    }

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [active, pathRefs, flowRefs]);
}

/* ── Scroll-driven animated build flow ── */
function StaticBuildFlow(): React.ReactElement {
  const scrollRef = useRef<HTMLDivElement>(null);
  const basePathRefs = useRef<(SVGPathElement | null)[]>([]);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start start', 'end end'],
  });

  // Scroll-driven: lines draw in first, then cards appear
  const lineProgress = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const cardsProgress = useTransform(scrollYProgress, [0.55, 0.8], [0, 1]);

  const [lineP, setLineP] = useState(0);
  const [cardsP, setCardsP] = useState(0);

  useEffect(() => {
    const unsubLine = lineProgress.on('change', (v) => setLineP(v));
    const unsubCards = cardsProgress.on('change', (v) => setCardsP(v));
    return () => { unsubLine(); unsubCards(); };
  }, [lineProgress, cardsProgress]);

  return (
    <>
      {/* ═══ DESKTOP: scroll-driven animation ═══ */}
      <div ref={scrollRef} className="hidden lg:block relative" style={{ height: '200vh' }}>
        <div className="sticky top-20 pb-10">
          <FoundationCard />

          {/* SVG flow lines */}
          <div className="relative" style={{ height: 140 }}>
            <svg
              className="absolute inset-0 w-full"
              viewBox="0 0 1000 140"
              style={{ height: 140, overflow: 'visible' }}
              preserveAspectRatio="none"
            >
              <defs />

              {/* Base paths — solid blue stroke, draw in with scroll */}
              {FLOW_PATHS.map((fp, i) => {
                const stagger = Math.min(1, Math.max(0, lineP * 1.6 - i * 0.12));
                const totalLen = 600;
                return (
                  <path
                    key={`base-${i}`}
                    ref={(el) => { basePathRefs.current[i] = el; }}
                    d={fp.d}
                    fill="none"
                    stroke="#056BF1"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    strokeDasharray={totalLen}
                    strokeDashoffset={totalLen * (1 - stagger)}
                  />
                );
              })}


              {/* Arrow tips */}
              {FLOW_PATHS.map((fp, i) => {
                const tipVisible = lineP * 1.6 - i * 0.12 > 0.9;
                return (
                  <polygon
                    key={`tip-${i}`}
                    points={`${fp.endX},140 ${fp.endX - 7},126 ${fp.endX + 7},126`}
                    fill="#056BF1"
                    style={{ opacity: tipVisible ? 1 : 0, transition: 'opacity 0.3s' }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Product cards */}
          <div className="grid grid-cols-5 gap-3">
            {PRODUCT_CARDS_STATIC.map((card, i) => {
              const threshold = 0.15 * i;
              const cardVisible = cardsP > threshold;
              return <ProductCard key={card.title} card={card} visible={cardVisible} />;
            })}
          </div>
        </div>
      </div>

      {/* ═══ MOBILE: static layout ═══ */}
      <div className="lg:hidden flex flex-col gap-6">
        <FoundationCard />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PRODUCT_CARDS_STATIC.map((card) => (
            <ProductCard key={card.title} card={card} visible />
          ))}
        </div>
      </div>
    </>
  );
}

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

// ─── Advantage Stats — scroll-driven card fan animation ─────────────────────

const ADVANTAGE_CARDS = [
  { stat: '88,000+', label: 'CVEs remediated', color: '#D4EDDA' },
  { stat: '97.6%', label: 'Average CVE reduction', color: '#D6E4F0' },
  { stat: '352,000+', label: 'Engineering hours saved', color: '#056BF1' },
  { stat: '10M+', label: 'Packages from verified source', color: '#E8E8EC' },
  { stat: '100%', label: 'Deterministic builds', color: '#FFAB91' },
];

function AdvantageStatCard({
  card,
  index,
  fanProgress,
}: {
  card: typeof ADVANTAGE_CARDS[0];
  index: number;
  fanProgress: MotionValue<number>;
}): React.ReactElement {
  const isDark = card.color === '#056BF1';

  // Stacked: cards pile vertically with small offset, centered horizontally
  // Released: cards spread into a horizontal row
  const stackedX = 0;
  const fannedX = index * 175;

  const stackedY = index * 44;
  const fannedY = 0;

  const x = useTransform(fanProgress, [0, 1], [stackedX, fannedX]);
  const y = useTransform(fanProgress, [0, 1], [stackedY, fannedY]);

  return (
    <motion.div
      className="absolute rounded-[10px] flex flex-col justify-between"
      style={{
        x,
        y,
        width: 170,
        height: 190,
        background: card.color,
        padding: '22px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        zIndex: 5 - index,
      }}
    >
      <p className={`font-['Google_Sans',sans-serif] font-bold text-[34px] leading-none tracking-[-0.03em] ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
        {card.stat}
      </p>
      <p className={`font-['Google_Sans',sans-serif] text-[13px] leading-snug ${isDark ? 'text-white' : 'text-[#4B5563]'}`}>
        {card.label}
      </p>
    </motion.div>
  );
}

function AdvantageStats(): React.ReactElement {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const fanProgress = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  return (
    <div ref={sectionRef} className="overflow-hidden" style={{ background: '#F0F1F3' }}>
      <div className="px-4 md:px-8 lg:px-[50px] py-16 md:py-[100px]" style={{ maxWidth: 1340, margin: '0 auto' }}>
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

          {/* Left: headline + subtext */}
          <div className="lg:w-[320px] flex-shrink-0">
            <h2 className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] lg:text-[44px] font-bold text-[#0A1628] leading-[1.1] tracking-[-0.02em] mb-4">
              CleanStart<br />Advantage
            </h2>
            <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-[#6B7280] leading-[1.6]">
              Real results from teams that replaced vulnerable public images with CleanStart&apos;s hardened, source-built containers.
            </p>
          </div>

          {/* Right: animated cards — stack vertically → release horizontally */}
          <div className="flex-1 hidden lg:block relative" style={{ height: 210 }}>
            {ADVANTAGE_CARDS.map((card, i) => (
              <AdvantageStatCard key={card.stat} card={card} index={i} fanProgress={fanProgress} />
            ))}
          </div>

        </div>

        {/* Mobile + Tablet: static grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:hidden mt-8">
          {ADVANTAGE_CARDS.map((card) => {
            const isDark = card.color === '#056BF1';
            return (
              <div
                key={card.stat}
                className="p-4 md:p-5 flex flex-col justify-between rounded-[10px]"
                style={{ background: card.color, aspectRatio: '1' }}
              >
                <p className={`font-['Google_Sans',sans-serif] font-bold text-[22px] md:text-[28px] leading-none tracking-[-0.03em] ${isDark ? 'text-white' : 'text-[#0A1628]'}`}>
                  {card.stat}
                </p>
                <p className={`font-['Google_Sans',sans-serif] text-[11px] md:text-[12px] ${isDark ? 'text-white' : 'text-[#4B5563]'}`}>
                  {card.label}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function BuildSecurelySection() {
  return (
    <section className="bg-white">
      {/* ── PROBLEM BLOCK ─────────────────────────────────────────────────── */}
      <div className="px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row gap-8 md:gap-6 lg:gap-8">
          {/* Header — 35% left */}
          <motion.div
            className="md:w-[40%] lg:w-[35%] md:flex-shrink-0 md:sticky md:top-32 md:self-start"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1]">
              Modern Software Introduces New Security Risks
            </h2>
          </motion.div>

          {/* Problem cards — 65% right, 2x2 grid */}
          <div className="md:w-[60%] lg:w-[65%] grid grid-cols-1 sm:grid-cols-2 gap-3">
            {PROBLEMS.map((problem, i) => (
              <ProblemCard key={problem.title} {...problem} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </div>

      {/* ── SOLUTION BLOCK ────────────────────────────────────────────────── */}
      <div className="bg-white px-4 md:px-8 lg:px-[50px] py-16 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16">

          {/* Solution header — tight, left-aligned with subtitle */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-5 lg:gap-12">
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] max-w-[600px]">
                Built Securely, from Source to Image
              </h2>
            </motion.div>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#0F1924]/45 leading-relaxed max-w-[400px] lg:pb-1"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Five hardened products built on a zero-CVE foundation, powered by AI-driven compilation.
            </motion.p>
          </div>

          {/* ── STATIC BUILD FLOW — foundation + product cards ────────── */}
          <StaticBuildFlow />

        </div>
      </div>

      {/* ── COMPARISON ──────────────────────────────────────────────────── */}
      <div className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">

          {/* Header — 35/65 split */}
          <div className="flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-0 mb-12 md:mb-16">
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
              className="flex-1 lg:pl-8 font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#0F1924]/45 leading-relaxed max-w-[480px]"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              Most tools patch vulnerabilities after the fact. CleanStart eliminates them at the source.
            </motion.p>
          </div>

          {/* Infographic comparison — two cards with VS center */}
          <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-0 relative">

            {/* Public Images card — light/muted */}
            <motion.div
              className="flex-1 rounded-[18px] md:rounded-r-none overflow-hidden relative"
              style={{ background: '#F4F5F7', border: '1px solid rgba(0,0,0,0.04)', borderRight: 'none' }}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              {/* Card header */}
              <div className="px-7 md:px-10 pt-8 pb-5">
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[22px] md:text-[26px] text-[#181818]/60 tracking-[-0.02em]">
                  Public Images
                </h3>
              </div>

              {/* Items */}
              <div className="px-7 md:px-10 pb-8 flex flex-col gap-[6px]">
                {COMPARISON_PUBLIC.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3.5 py-[10px]"
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: 0.15 + i * 0.08, ease: EASE }}
                  >
                    {/* Cross icon */}
                    <motion.div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(0,0,0,0.05)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 + i * 0.09 }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3.5 3.5L8.5 8.5M8.5 3.5L3.5 8.5" stroke="#181818" strokeOpacity="0.25" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                    <span className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#0F1924]/40 leading-snug">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Center VS badge */}
            <motion.div
              className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
            >
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                style={{
                  background: '#056BF1',
                  boxShadow: '0 0 0 5px white, 0 4px 20px rgba(5,107,241,0.25)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7 4l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </motion.div>

            {/* CleanStart card — brand blue */}
            <motion.div
              className="flex-1 rounded-[18px] md:rounded-l-none overflow-hidden relative"
              style={{ background: '#056BF1' }}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            >
              {/* Card header */}
              <div className="px-7 md:px-10 pt-8 pb-5">
                <div className="flex items-center gap-[10px]">
                  <svg className="w-[24px] h-[26px] shrink-0" viewBox="0 0 108.25 123.68" fill="none">
                    <polygon points="94.39 39.89 94.39 85.24 61.19 105.11 61.19 59.02 48.28 66.46 48.63 66.68 48.63 120.39 54.12 123.68 108.25 92.04 108.25 32.16 108.03 32.03 94.39 39.89" fill="#06C7F2"/>
                    <polygon points="61.19 58.83 19.87 34.52 54.64 15.43 94.39 38.18 94.39 39.89 108.03 32.03 53.86 0 0 32.16 0 91.26 12.55 98.77 12.55 45.5 48.28 66.46 61.19 59.02 61.19 58.83" fill="white"/>
                  </svg>
                  <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[22px] md:text-[26px] text-white tracking-[-0.02em]">
                    CleanStart
                  </h3>
                </div>
              </div>

              {/* Items */}
              <div className="px-7 md:px-10 pb-8 flex flex-col gap-[6px]">
                {COMPARISON_CLEAN.map((item, i) => (
                  <motion.div
                    key={item}
                    className="flex items-center gap-3.5 py-[10px]"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: EASE }}
                  >
                    {/* Check circle */}
                    <motion.div
                      className="w-[28px] h-[28px] rounded-full flex items-center justify-center shrink-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.3 + i * 0.09 }}
                    >
                      <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                        <path d="M3 7.5L5.5 10L11 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <span className="font-['Google_Sans',sans-serif] font-medium text-[15px] md:text-[16px] text-white leading-snug">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative corner arcs */}
              <div className="absolute -bottom-[60px] -right-[60px] w-[180px] h-[180px] rounded-full border border-white/[0.06] pointer-events-none" />
              <div className="absolute -bottom-[30px] -right-[30px] w-[120px] h-[120px] rounded-full border border-white/[0.04] pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── CLEANSTART ADVANTAGE — animated stats showcase ─────────── */}
      <AdvantageStats />
    </section>
  );
}
