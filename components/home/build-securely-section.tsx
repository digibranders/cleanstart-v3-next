"use client";

import { motion, useInView } from 'motion/react';
import { useRef, useEffect, useState } from 'react';
import WhiteBgCube from '@/lib/svg-data/WhiteBgCube1';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';
import { type ReactNode } from 'react';
import { PackageOpenIcon, RefreshIcon, ScanIcon, ShuffleIcon } from 'hugeicons-react';

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
}

const PROBLEMS: ProblemData[] = [
  {
    icon: <PackageOpenIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Unknown Dependencies',
    description: 'Images include packages from multiple sources that are hard to verify.',
  },
  {
    icon: <RefreshIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Endless Patching',
    description: 'Fixing vulnerabilities after build leads to constant updates and overhead.',
  },
  {
    icon: <ScanIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Reactive Scanning',
    description: 'Scanning detects issues late but does not control how software is built.',
  },
  {
    icon: <ShuffleIcon size={20} color="#0F1924" strokeWidth={1.5} />,
    title: 'Uncontrolled Builds',
    description: 'Without deterministic builds, artifacts can change across environments.',
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

function ProblemCard({ icon, title, description, delay }: ProblemData & { delay: number }) {
  const [cardHovered, setCardHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl h-full cursor-pointer group flex flex-col justify-between"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        padding: '28px',
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      onMouseEnter={() => setCardHovered(true)}
      onMouseLeave={() => setCardHovered(false)}
    >
      {/* Icon + Title row */}
      <div className="flex items-center gap-3 mb-4">
        <div className="shrink-0">{icon}</div>
        <h3 className="font-['Google_Sans',sans-serif] font-medium text-[17px] leading-[1.3] tracking-[-0.01em] text-[#0F1924]">
          {title}
        </h3>
      </div>

      {/* Subtext + CTA row */}
      <div className="flex items-end justify-between gap-4">
        <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] leading-relaxed text-[#0F1924]/45 flex-1 min-w-0">
          {description}
        </p>
        <div className="shrink-0">
          <CircleArrowCTA variant="filled-blue" size={40} forceHovered={cardHovered} />
        </div>
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
      <svg viewBox="0 0 950 480" fill="none" className="w-full hidden md:block">
        <defs>
          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="3" />
            <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cubeDropShadow" x="-20%" y="-10%" width="140%" height="150%">
            <feDropShadow dx="6" dy="10" stdDeviation="8" floodColor="rgba(10,40,100,0.18)" />
          </filter>
        </defs>

        {/* ── Foundation Platform ── */}
        <motion.g
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        >
          <ellipse cx={475} cy={395} rx={340} ry={28} fill="rgba(5,107,241,0.04)" />
          <path d="M475 345 L820 375 L475 405 L130 375 Z" fill="white" fillOpacity={0.55} stroke="#93c5fd" strokeWidth="1" />
          <path d="M130 375 L475 405 L475 418 L130 388 Z" fill="#dbeafe" fillOpacity={0.7} stroke="#93c5fd" strokeWidth="0.7" />
          <path d="M820 375 L475 405 L475 418 L820 388 Z" fill="#bfdbfe" fillOpacity={0.6} stroke="#93c5fd" strokeWidth="0.7" />
          {[0.25, 0.5, 0.75].map((t) => (
            <line key={t}
              x1={130 + (475 - 130) * t} y1={375 + (345 - 375) * t}
              x2={475 + (820 - 475) * t} y2={405 + (375 - 405) * t}
              stroke="#93c5fd" strokeWidth="0.4" opacity={0.35} />
          ))}
        </motion.g>

        {/* Platform labels */}
        {PLABELS.map((name, i) => (
          <motion.text key={name} x={220 + i * 160} y={393} textAnchor="middle"
            className="font-['Google_Sans',sans-serif]" fontSize="10.5" fill="#3b82f6" fillOpacity={0.45}
            fontWeight="500" letterSpacing="0.04em"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: 0.9 + i * 0.08, ease: EASE }}
          >{name}</motion.text>
        ))}
        <motion.text x={475} y={450} textAnchor="middle"
          className="font-['Google_Sans',sans-serif]" fontSize="10" fill="#3b82f6" fillOpacity={0.3}
          fontWeight="500" letterSpacing="0.15em"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 1.1, ease: EASE }}
        >CLEANSTART PLATFORM</motion.text>

        {/* ── Vertical dashed connectors ── */}
        {NODES.map((node, i) => (
          <motion.g key={`vc-${i}`} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: EASE }}>
            <line x1={node.x} y1={node.y + 95} x2={node.x} y2={348}
              stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 5" opacity={0.18} />
            <circle cx={node.x} cy={348} r="2.5" fill="#3b82f6" opacity={0.25} />
          </motion.g>
        ))}

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

        {/* ═══ NODE 4 — CleanSight: solid cube + magnifier ═══ */}
        <motion.g initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay: 0.6, ease: EASE }}
          filter="url(#cubeDropShadow)">
          <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
            {(() => { const g = cubeGeom(790, 230, 58); return (<><path d={g.left} fill="#1d4ed8" /><path d={g.right} fill="#3b82f6" /><path d={g.top} fill="#60a5fa" /></>); })()}
            <circle cx={790} cy={198} r="10" fill="none" stroke="white" strokeWidth="1.5" />
            <circle cx={790} cy={198} r="4" fill="white" opacity={0.8} />
            <line x1={798} y1={206} x2={804} y2={212} stroke="white" strokeWidth="1.8" strokeLinecap="round" />
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

          {/* Problem cards — single row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {PROBLEMS.map((problem, i) => (
              <ProblemCard key={problem.title} {...problem} delay={i * 0.08} />
            ))}
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

          {/* ── PIPELINE INFOGRAPHIC ──────────────────────────────────── */}
          <PipelineInfographic />

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
