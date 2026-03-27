"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import nodeSvg from '@/lib/svg-data/svg-yg2uoi8ah6';
import redisSvg from '@/lib/svg-data/svg-e8aibdfjyq';
import pythonSvg from '@/lib/svg-data/svg-q561u0fo63';
import compSvg from '@/lib/svg-data/svg-wmsareggds';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ═══════════════════════════════════════════════
   Tab data
   ═══════════════════════════════════════════════ */

const uvpTabs = [
  {
    id: 'performance' as const,
    label: 'Performance Enhancement',
    bullets: ['60-80% lighter than original images', 'Reduced memory footprint', 'Lower CPU consumption', 'Faster container pull time'],
  },
  {
    id: 'vulnerability' as const,
    label: 'Vulnerability Reduction',
    bullets: ['Faster container pull times', 'Pre-hardened security', 'Continuous protection', '100% vulnerability-free'],
  },
  {
    id: 'compliance' as const,
    label: 'Compliance Ready',
    bullets: ['FIPS compliant as per NIST standards', 'Pre-validated for security audits', 'Continuous compliance monitoring', 'Significant time and cost saving'],
  },
  {
    id: 'debloated' as const,
    label: 'Optimally Debloated',
    bullets: ['Removal of unnecessary packages', 'Elimination of unused libraries', 'Essential components only', 'Reduced attack vectors'],
  },
];

type UvpTabId = 'performance' | 'vulnerability' | 'compliance' | 'debloated';

/* ═══════════════════════════════════════════════
   Performance Enhancement Visual
   ═══════════════════════════════════════════════ */

const imageComparisons = [
  { name: 'NodeJS', docker: 387, clean: 45, svgType: 'node' as const },
  { name: 'Redis', docker: 157, clean: 64, svgType: 'redis' as const },
  { name: 'Python', docker: 120, clean: 32, svgType: 'python' as const },
];

function TechIcon({ type, phase }: { type: 'node' | 'redis' | 'python'; phase: 'initial' | 'scanning' | 'optimized' }) {
  const iconColor = phase === 'initial' || phase === 'scanning' ? '#031630' : 'white';

  if (type === 'node') {
    return (
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <motion.path
          d={nodeSvg.p2c96a200}
          fill={iconColor}
          transition={{ duration: 0.4 }}
        />
      </svg>
    );
  }
  if (type === 'redis') {
    return (
      <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
        <motion.path d={redisSvg.p1b39b170} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#DCDCDC'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p3df1680} fill={iconColor} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.pc410a80} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#DCDCDC'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p24582330} fill={iconColor} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p15c16200} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#DCDCDC'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p1a1a5f88} fill={iconColor} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p2f8fdc00} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#B0B0B0'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p35052600} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#B0B0B0'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p365cf340} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#B0B0B0'} transition={{ duration: 0.4 }} />
        <motion.path d={redisSvg.p32ea8100} fill={phase === 'initial' || phase === 'scanning' ? '#031630' : '#B0B0B0'} transition={{ duration: 0.4 }} />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 100 110" fill="none">
      <motion.path d={pythonSvg.p1d870580} fill={iconColor} style={{ opacity: phase === 'initial' || phase === 'scanning' ? 1 : 0.3 }} transition={{ duration: 0.4 }} />
      <motion.path d={pythonSvg.p320df800} fill={iconColor} transition={{ duration: 0.4 }} />
      <motion.path d={pythonSvg.p871d000} fill={iconColor} style={{ opacity: phase === 'initial' || phase === 'scanning' ? 1 : 0.8 }} transition={{ duration: 0.4 }} />
    </svg>
  );
}

function PerformanceVisual() {
  const [phase, setPhase] = useState<'initial' | 'scanning' | 'optimized'>('initial');

  useEffect(() => {
    let mounted = true;
    function run() {
      if (!mounted) return;
      setPhase('initial');
      const t1 = setTimeout(() => { if (mounted) setPhase('scanning'); }, 800);
      const t2 = setTimeout(() => { if (mounted) setPhase('optimized'); }, 2200);
      const t3 = setTimeout(() => { if (mounted) run(); }, 6000);
      return [t1, t2, t3];
    }
    const ids = run();
    return () => { mounted = false; ids?.forEach(clearTimeout); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-3 md:gap-4 px-2" style={{ maxWidth: 600, margin: '0 auto' }}>
      {imageComparisons.map((img, i) => {
        const reduction = Math.round((1 - img.clean / img.docker) * 100);
        const dockerBarH = (img.docker / 400) * 100;
        const cleanBarH = (img.clean / 400) * 100;

        return (
          <motion.div
            key={img.name}
            className="flex flex-col items-center gap-3 flex-1 max-w-[165px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
          >
            <div
              className="relative w-full rounded-2xl overflow-hidden p-4 pt-5"
              style={{
                background: 'rgba(255,255,255,0.22)',
                border: '1px solid rgba(255,255,255,0.4)',
                backdropFilter: 'blur(24px)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
            >
              <motion.div
                className="absolute left-0 right-0 h-[2px] z-10"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,1), rgba(255,255,255,0.7), transparent)' }}
                initial={{ top: 0, opacity: 0 }}
                animate={{ top: phase === 'scanning' ? '100%' : '0%', opacity: phase === 'scanning' ? [0, 1, 1, 0] : 0 }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
              />
              <div className="flex items-center gap-2 mb-4">
                <TechIcon type={img.svgType} phase={phase} />
                <p className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">{img.name}</p>
              </div>
              <div className="flex items-end justify-center gap-3 h-[120px]">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <motion.div
                    className="w-full rounded-t-[4px] relative overflow-hidden"
                    style={{ background: 'linear-gradient(180deg, #d1d5db, #b0b7c0)' }}
                    initial={{ height: 0 }}
                    animate={{ height: `${dockerBarH}%`, opacity: phase === 'optimized' ? 0.3 : 1 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                  >
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent" animate={{ y: phase === 'scanning' ? ['100%', '-100%'] : '100%' }} transition={{ duration: 1, ease: 'linear' }} />
                  </motion.div>
                  <span className="font-['Google_Sans',sans-serif] text-[10px] text-white">{img.docker} MB</span>
                </div>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <motion.div
                    className="w-full rounded-t-[4px]"
                    style={{ background: 'linear-gradient(180deg, #4ade80, #22c55e)' }}
                    initial={{ height: 0 }}
                    animate={{ height: phase === 'optimized' ? `${cleanBarH}%` : '0%' }}
                    transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <motion.span className="font-['Google_Sans',sans-serif] text-[10px] text-[#4ade80]" animate={{ opacity: phase === 'optimized' ? 1 : 0 }}>{img.clean} MB</motion.span>
                </div>
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#d1d5db]" /><span className="font-['Google_Sans',sans-serif] text-[9px] text-white">Docker</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-[#4ade80]" /><span className="font-['Google_Sans',sans-serif] text-[9px] text-white">CleanStart</span></div>
              </div>
            </div>
            <motion.div
              className="px-3 py-1 rounded-full"
              style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }}
              animate={{ opacity: phase === 'optimized' ? 1 : 0, y: phase === 'optimized' ? 0 : 8 }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <span className="font-['Google_Sans',sans-serif] text-[12px] font-semibold text-white">{reduction}% smaller</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Vulnerability Reduction Visual
   ═══════════════════════════════════════════════ */

const vulnData = {
  original: [
    { severity: 'Critical', count: 1, color: '#d1d5db' },
    { severity: 'High', count: 9, color: '#d1d5db' },
    { severity: 'Medium', count: 12, color: '#d1d5db' },
    { severity: 'Low', count: 100, color: '#d1d5db' },
    { severity: 'Unspecified', count: 4, color: '#d1d5db' },
  ],
};

const frostedCard = {
  background: 'rgba(255,255,255,0.22)',
  border: '1px solid rgba(255,255,255,0.4)',
  backdropFilter: 'blur(24px)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.35)',
};

function VulnerabilityVisual() {
  const [phase, setPhase] = useState<'show' | 'scanning' | 'clean'>('show');

  useEffect(() => {
    let mounted = true;
    function run() {
      if (!mounted) return;
      setPhase('show');
      const t1 = setTimeout(() => { if (mounted) setPhase('scanning'); }, 1000);
      const t2 = setTimeout(() => { if (mounted) setPhase('clean'); }, 2800);
      const t3 = setTimeout(() => { if (mounted) run(); }, 6500);
      return [t1, t2, t3];
    }
    const ids = run();
    return () => { mounted = false; ids?.forEach(clearTimeout); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center gap-3 md:gap-4 px-2" style={{ maxWidth: 600, margin: '0 auto' }}>
      <motion.div
        className="flex-1 max-w-[225px] rounded-2xl p-4 relative overflow-hidden"
        style={frostedCard}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="absolute left-0 right-0 h-[3px] z-10"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,1), rgba(255,255,255,0.7), transparent)', boxShadow: '0 0 20px rgba(255,255,255,0.5)' }}
          initial={{ top: 0, opacity: 0 }}
          animate={{ top: phase === 'scanning' ? '100%' : '0%', opacity: phase === 'scanning' ? [0, 1, 1, 0] : 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
        <div className="flex items-center gap-2 mb-5">
          <div className="w-3 h-3 rounded-full bg-[#d1d5db]" />
          <p className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">Open Source Image</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {vulnData.original.map((v, i) => (
            <motion.div key={v.severity} className="flex items-center justify-between" animate={{ opacity: phase === 'clean' ? 0.25 : 1 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <div className="flex items-center gap-2">
                <motion.div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: v.color }} animate={{ scale: phase === 'scanning' ? [1, 1.4, 1] : 1 }} transition={{ duration: 0.4, delay: i * 0.08 }} />
                <span className="font-['Google_Sans',sans-serif] text-[12px] text-white">{v.severity}</span>
              </div>
              <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold" style={{ color: v.color }}>{v.count}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
          <span className="font-['Google_Sans',sans-serif] text-[11px] text-white">Total Vulnerabilities</span>
          <span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#d1d5db]">126</span>
        </div>
      </motion.div>

      <motion.div className="flex flex-col items-center gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
        <motion.svg width="40" height="20" viewBox="0 0 40 20" fill="none" animate={{ x: phase === 'scanning' ? [0, 6, 0] : 0 }} transition={{ duration: 0.8, repeat: phase === 'scanning' ? Infinity : 0 }}>
          <path d="M0 10H35M35 10L28 3M35 10L28 17" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
        </motion.svg>
        <motion.span className="font-['Google_Sans',sans-serif] text-[10px] text-white" animate={{ opacity: phase === 'scanning' ? 1 : 0.3 }}>SCAN</motion.span>
      </motion.div>

      <motion.div
        className="flex-1 max-w-[225px] rounded-2xl overflow-hidden p-4 relative"
        style={{
          ...frostedCard,
          borderColor: phase === 'clean' ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.25)',
          background: phase === 'clean' ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.22)',
          transition: 'border-color 0.4s, background 0.4s',
        }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-2 mb-5">
          <motion.div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ffffff' }} animate={{ backgroundColor: phase === 'clean' ? '#10b981' : '#ffffff' }} />
          <p className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">CleanStart Image</p>
        </div>
        <div className="flex flex-col gap-2.5">
          {vulnData.original.map((v, i) => (
            <div key={v.severity} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.div className="w-2.5 h-2.5 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ffffff' }} animate={{ backgroundColor: phase === 'clean' ? '#10b981' : '#ffffff' }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                  <motion.svg width="8" height="8" viewBox="0 0 12 12" fill="none" animate={{ opacity: phase === 'clean' ? 1 : 0, scale: phase === 'clean' ? 1 : 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.08 }}>
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.div>
                <span className="font-['Google_Sans',sans-serif] text-[12px] text-white">{v.severity}</span>
              </div>
              <motion.span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold" style={{ color: '#ffffff' }} animate={{ color: phase === 'clean' ? '#10b981' : '#ffffff' }} transition={{ duration: 0.4, delay: i * 0.08 }}>0</motion.span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-white/30 flex items-center justify-between">
          <span className="font-['Google_Sans',sans-serif] text-[11px] text-white">Total Vulnerabilities</span>
          <motion.span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold" style={{ color: '#ffffff' }} animate={{ color: phase === 'clean' ? '#10b981' : '#ffffff' }}>0</motion.span>
        </div>
        <AnimatePresence>
          {phase === 'clean' && (
            <motion.div className="absolute inset-0 flex items-center justify-center pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
              <motion.div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(16,185,129,0.1), transparent 70%)' }} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Compliance Ready Visual
   ═══════════════════════════════════════════════ */

const complianceIcons = [
  {
    position: { left: 256, top: 6 },
    paths: [
      { d: compSvg.p3dcf3a00, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.p262e4d80, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.p263ac9f0, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: 'M11.6406 21.6914H18.3072', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: 'M12 28H25.3333', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
    ],
  },
  {
    position: { left: 52, top: -44 },
    paths: [
      { d: compSvg.p182e3c80, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.p34130400, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.pf392700, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
    ],
  },
  {
    position: { left: -46, top: 187 },
    paths: [
      { d: compSvg.p28d6d100, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.p1bee5b00, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
      { d: compSvg.p11d8c940, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const },
    ],
  },
  {
    position: { left: 256, top: 221 },
    paths: [
      { d: compSvg.p2136d580 },
      { d: compSvg.p1603f200 },
      { d: 'M3.33594 20H36.6693' },
    ],
  },
];

function ComplianceVisual() {
  const [showBadges, setShowBadges] = useState(false);
  const [pulseOut, setPulseOut] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowBadges(true), 600);
    const t2 = setTimeout(() => setPulseOut(true), 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute w-[300px] h-[300px]" viewBox="0 0 300 300" fill="none">
        <path d={compSvg.p3d2b5a30} opacity="0.6" stroke="#ffffff" strokeWidth="2" />
        <path d={compSvg.p39a5f080} opacity="0.6" stroke="#ffffff" strokeWidth="2" />
        <path d={compSvg.p35233300} opacity="0.6" stroke="#ffffff" strokeWidth="0.5" />
        <path d={compSvg.p16880600} opacity="0.6" stroke="#ffffff" strokeWidth="0.5" />
      </svg>

      <div className="absolute rounded-full w-[300px] h-[300px]" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
        {complianceIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute flex items-center justify-center p-[10px] rounded-[15px]"
            style={{
              left: icon.position.left,
              top: icon.position.top,
              background: 'rgba(255,255,255,0.25)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: showBadges ? 1 : 0, scale: showBadges ? 1 : 0 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none rounded-[15px]"
              style={{
                border: '1px solid rgba(255,255,255,0.45)',
                boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.06)',
              }}
            />
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              {icon.paths.map((p, j) => (
                <path
                  key={j}
                  d={p.d}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  strokeLinecap={'strokeLinecap' in p ? p.strokeLinecap : undefined}
                  strokeLinejoin={'strokeLinejoin' in p ? p.strokeLinejoin : undefined}
                  fill="none"
                />
              ))}
            </svg>
          </motion.div>
        ))}

        <motion.div
          className="absolute font-['Google_Sans',sans-serif] font-semibold text-[11px] text-center text-white tracking-[0.275px] whitespace-nowrap"
          style={{ left: 135, top: 322, width: 62, lineHeight: '16.5px' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p>FIPS 140-3</p>
          <p>Certified</p>
        </motion.div>
      </div>

      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="w-[100px] h-[100px] rounded-full flex items-center justify-center relative"
          style={{
            background: 'rgba(255,255,255,0.25)',
            border: '2px solid rgba(255,255,255,0.5)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1), 0 0 40px rgba(255,255,255,0.15)',
            backdropFilter: 'blur(24px)',
          }}
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="46" height="46" viewBox="0 0 45.6476 45.6476" fill="none">
            <path
              d={compSvg.p39e0cca0}
              fill="rgba(255,255,255,0.1)"
              stroke="#ffffff"
              strokeWidth="2.85297"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={compSvg.p40f600}
              stroke="#ffffff"
              strokeWidth="3.80397"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {pulseOut && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/50"
              animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Optimally Debloated Visual
   ═══════════════════════════════════════════════ */

const depRows = [
  { name: 'express', color: '#ffffff', width: '75%', status: 'keep' as const },
  { name: 'lodash', color: 'rgba(255,255,255,0.4)', width: '60%', status: 'remove' as const },
  { name: 'moment', color: 'rgba(255,255,255,0.4)', width: '55%', status: 'remove' as const },
  { name: 'node:crypto', color: '#ffffff', width: '45%', status: 'keep' as const },
  { name: 'chalk', color: 'rgba(255,255,255,0.4)', width: '35%', status: 'remove' as const },
  { name: 'dotenv', color: '#ffffff', width: '30%', status: 'keep' as const },
  { name: 'debug', color: 'rgba(255,255,255,0.4)', width: '40%', status: 'remove' as const },
  { name: 'cors', color: '#ffffff', width: '50%', status: 'keep' as const },
  { name: 'uuid', color: 'rgba(255,255,255,0.4)', width: '25%', status: 'remove' as const },
  { name: 'zlib', color: '#ffffff', width: '35%', status: 'keep' as const },
];

const floatingLabels = [
  { text: 'Zero bloat, faster builds', top: -8, right: 8, delay: 0.8 },
  { text: 'Built for performance', top: 100, right: -4, delay: 1.1 },
  { text: 'Streamlined integration', bottom: 55, right: 12, delay: 1.4 },
  { text: 'Pre-bundled essentials', top: 160, left: -4, delay: 1.0 },
];

function DebloatedVisual() {
  const [phase, setPhase] = useState<'show' | 'scanning' | 'clean'>('show');

  useEffect(() => {
    let mounted = true;
    function run() {
      if (!mounted) return;
      setPhase('show');
      const t1 = setTimeout(() => { if (mounted) setPhase('scanning'); }, 1200);
      const t2 = setTimeout(() => { if (mounted) setPhase('clean'); }, 3200);
      const t3 = setTimeout(() => { if (mounted) run(); }, 7000);
      return [t1, t2, t3];
    }
    const ids = run();
    return () => { mounted = false; ids?.forEach(clearTimeout); };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div className="relative">
        {floatingLabels.map((label, i) => (
          <motion.div
            key={i}
            className="absolute z-20 whitespace-nowrap"
            style={{
              ...(label.top !== undefined ? { top: label.top } : {}),
              ...(label.bottom !== undefined ? { bottom: label.bottom } : {}),
              ...(label.right !== undefined ? { right: label.right, transform: 'translateX(100%)' } : {}),
              ...(label.left !== undefined ? { left: label.left, transform: 'translateX(-100%)' } : {}),
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: phase === 'clean' ? 1 : 0, scale: phase === 'clean' ? 1 : 0.8 }}
            transition={{ duration: 0.5, delay: phase === 'clean' ? label.delay - 0.8 : 0 }}
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-full"
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: '1px solid rgba(255,255,255,0.45)',
                boxShadow: '0px 4px 16px 0px rgba(0,0,0,0.06)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.3)', border: '1px solid rgba(255,255,255,0.5)' }}>
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-['Google_Sans',sans-serif] text-[10px] text-white">{label.text}</span>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="relative w-[300px] rounded-2xl overflow-hidden"
          style={frostedCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/20">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.4)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/70 ml-2">dependencies.lock</span>
          </div>

          <motion.div
            className="absolute left-0 right-0 h-[2px] z-10"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,1), rgba(255,255,255,0.7), transparent)',
              boxShadow: '0 0 20px rgba(255,255,255,0.5)',
            }}
            initial={{ top: 48, opacity: 0 }}
            animate={{
              top: phase === 'scanning' ? '100%' : 48,
              opacity: phase === 'scanning' ? [0, 1, 1, 0] : 0,
            }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          />

          <div className="flex flex-col gap-0 px-3 py-2">
            {depRows.map((dep, i) => {
              const isRemoved = dep.status === 'remove';
              return (
                <motion.div
                  key={dep.name}
                  className="flex items-center gap-2.5 py-[6px] px-2 rounded-md"
                  animate={{
                    opacity: phase === 'clean' && isRemoved ? 0.2 : 1,
                    x: phase === 'clean' && isRemoved ? 6 : 0,
                  }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                >
                  <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="shrink-0">
                    <path
                      d="M4 2L8 6L4 10"
                      stroke={phase === 'clean' && isRemoved ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.7)'}
                      strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>

                  <div className="flex-1 h-[6px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        width: dep.width,
                        background: phase === 'clean' && isRemoved
                          ? 'rgba(255,255,255,0.12)'
                          : phase === 'clean' && !isRemoved
                          ? '#4ade80'
                          : dep.color,
                      }}
                      animate={{
                        opacity: phase === 'clean' && isRemoved ? 0.3 : 1,
                      }}
                      transition={{ duration: 0.4, delay: i * 0.04 }}
                    />
                  </div>

                  <span
                    className="font-['Google_Sans',sans-serif] text-[9px] w-[65px] text-right shrink-0"
                    style={{
                      color: phase === 'clean' && isRemoved ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.7)',
                      textDecoration: phase === 'clean' && isRemoved ? 'line-through' : 'none',
                    }}
                  >
                    {dep.name}
                  </span>

                  <motion.div
                    className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: phase === 'clean'
                        ? isRemoved ? 'rgba(255,255,255,0.1)' : 'rgba(74,222,128,0.25)'
                        : 'rgba(255,255,255,0.15)',
                      border: phase === 'clean' && !isRemoved ? '1px solid rgba(74,222,128,0.4)' : '1px solid rgba(255,255,255,0.2)',
                    }}
                    animate={{
                      scale: phase === 'scanning' ? [1, 1.3, 1] : 1,
                    }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    {phase === 'clean' && (
                      <motion.svg
                        width="8" height="8" viewBox="0 0 12 12" fill="none"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.04 }}
                      >
                        {isRemoved ? (
                          <path d="M3 3L9 9M9 3L3 9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" strokeLinecap="round" />
                        ) : (
                          <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        )}
                      </motion.svg>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          <AnimatePresence>
            {phase === 'clean' && (
              <motion.div
                className="flex items-center justify-between px-4 py-3 border-t border-white/20"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.3)' }} />
                  <span className="font-['Google_Sans',sans-serif] text-[10px] text-white/50">5 removed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#4ade80]" />
                  <span className="font-['Google_Sans',sans-serif] text-[10px] text-white/50">5 essential</span>
                </div>
                <motion.div
                  className="px-3 py-1 rounded-full"
                  style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.35)' }}
                >
                  <span className="font-['Google_Sans',sans-serif] text-[11px] font-semibold text-white">50% lighter</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Main UVP Section — exported component
   ═══════════════════════════════════════════════ */

export function UniqueValueProposition() {
  const [activeTab, setActiveTab] = useState<UvpTabId>('performance');
  const activeData = uvpTabs.find((t) => t.id === activeTab)!;

  useEffect(() => {
    const durations: Record<UvpTabId, number> = {
      performance: 6000,
      vulnerability: 6500,
      compliance: 5000,
      debloated: 7000,
    };
    const order: UvpTabId[] = ['performance', 'vulnerability', 'compliance', 'debloated'];
    let mounted = true;
    let timeout: ReturnType<typeof setTimeout>;
    function scheduleNext(current: UvpTabId) {
      timeout = setTimeout(() => {
        if (!mounted) return;
        const idx = order.indexOf(current);
        const next = order[(idx + 1) % order.length];
        setActiveTab(next);
        scheduleNext(next);
      }, durations[current]);
    }
    scheduleNext(activeTab);
    return () => { mounted = false; clearTimeout(timeout); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="relative bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-[50px] pb-[120px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 60%)' }} />
      </div>

      <div className="max-w-[1340px] mx-auto relative z-10">
        <motion.h2
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.95px] leading-[1.15] mb-4 md:mb-6"
          {...anim(0)}
        >
          Why CleanStart Images
        </motion.h2>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start lg:items-center">
          <div className="flex-1 max-w-[480px]">
            <motion.div className="flex flex-col gap-2 mb-8" {...anim(0.1)}>
              {uvpTabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="text-left cursor-pointer transition-all duration-300 py-1"
                  >
                    <span className={`font-['Google_Sans',sans-serif] font-semibold text-[20px] md:text-[24px] tracking-[-0.5px] transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/30 hover:text-white/50'}`}>
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.ul
                key={activeTab}
                className="flex flex-col gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeData.bullets.map((bullet, i) => (
                  <motion.li
                    key={bullet}
                    className="flex items-center gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.25)', border: '1px solid rgba(255,255,255,0.4)' }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span className="font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] text-white">{bullet}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>

          <div className="flex-1 w-full lg:w-auto min-h-[340px] md:min-h-[400px] relative" style={{ maxWidth: 600 }}>
            <AnimatePresence mode="wait">
              {activeTab === 'performance' && (
                <motion.div key="perf" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <PerformanceVisual />
                </motion.div>
              )}
              {activeTab === 'vulnerability' && (
                <motion.div key="vuln" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <VulnerabilityVisual />
                </motion.div>
              )}
              {activeTab === 'compliance' && (
                <motion.div key="comp" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <ComplianceVisual />
                </motion.div>
              )}
              {activeTab === 'debloated' && (
                <motion.div key="debloated" className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
                  <DebloatedVisual />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
