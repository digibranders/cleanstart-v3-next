"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

/* ---------- Container Transformation Animation ---------- */

function ContainerTransformAnimation() {
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'done'>('idle');

  useEffect(() => {
    let mounted = true;
    function run() {
      if (!mounted) return;
      setPhase('idle');
      const t1 = setTimeout(() => { if (mounted) setPhase('scanning'); }, 900);
      const t2 = setTimeout(() => { if (mounted) setPhase('done'); }, 2600);
      const t3 = setTimeout(() => { if (mounted) run(); }, 7000);
      return [t1, t2, t3];
    }
    const ids = run();
    return () => { mounted = false; ids?.forEach(clearTimeout); };
  }, []);

  const layers = [
    { h: 18, color: '#ef4444' },
    { h: 24, color: '#f97316' },
    { h: 30, color: '#eab308' },
    { h: 22, color: '#a3a3a3' },
    { h: 16, color: '#6b7280' },
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-14 w-full max-w-[700px]">
        {/* Open Source container */}
        <motion.div
          className="flex flex-col items-center gap-3 flex-1 max-w-[200px]"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="w-full rounded-[10px] border border-white/15 bg-white/[0.06] p-3 relative overflow-hidden backdrop-blur-sm"
            style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
          >
            <div className="flex flex-col gap-1">
              {layers.map((l, i) => (
                <motion.div
                  key={i}
                  className="rounded-[3px] relative overflow-hidden"
                  style={{ height: l.h, backgroundColor: `${l.color}33`, border: `1px solid ${l.color}44` }}
                  animate={{
                    height: phase === 'done' ? l.h * 0.3 : l.h,
                    opacity: phase === 'done' ? 0.3 : 1,
                  }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                />
              ))}
            </div>
            {/* Vuln badges */}
            <motion.div
              className="absolute top-2 right-2 flex flex-col gap-1"
              animate={{ opacity: phase === 'scanning' || phase === 'done' ? 0 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {['Critical', 'High', 'Med'].map((s, i) => (
                <div key={s} className="flex items-center gap-1">
                  <div
                    className="w-[6px] h-[6px] rounded-full"
                    style={{ backgroundColor: ['#ef4444', '#f97316', '#eab308'][i] }}
                  />
                  <span className="text-[8px] text-white/40 font-['Google_Sans',sans-serif]">{s}</span>
                </div>
              ))}
            </motion.div>
            <div className="mt-2 text-center">
              <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/40">387 MB</span>
            </div>
          </div>
          <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/50">Open Source Image</span>
        </motion.div>

        {/* Scan beam arrow area */}
        <motion.div
          className="flex flex-col items-center gap-2 shrink-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative w-[60px] sm:w-[90px] md:w-[120px] h-[6px] rounded-full overflow-hidden bg-white/[0.08]">
            <motion.div
              className="absolute top-0 h-full w-[40%] rounded-full"
              style={{ background: 'linear-gradient(90deg, transparent, #00d1ff, #056bf1, transparent)', boxShadow: '0 0 12px #00d1ff' }}
              animate={{
                left: phase === 'scanning' ? ['0%', '100%'] : '-40%',
                opacity: phase === 'scanning' ? 1 : 0,
              }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          </div>
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.span key="idle" className="font-['Google_Sans',sans-serif] text-[9px] tracking-widest text-white/30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                READY
              </motion.span>
            )}
            {phase === 'scanning' && (
              <motion.span key="scan" className="font-['Google_Sans',sans-serif] text-[9px] tracking-widest text-[#00d1ff]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                SCANNING
              </motion.span>
            )}
            {phase === 'done' && (
              <motion.span key="done" className="font-['Google_Sans',sans-serif] text-[9px] tracking-widest text-emerald-400" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                HARDENED
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>

        {/* CleanStart hardened container */}
        <motion.div
          className="flex flex-col items-center gap-3 flex-1 max-w-[200px]"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Shield glow */}
            <motion.div
              className="absolute -inset-3 rounded-[16px] pointer-events-none"
              animate={{
                opacity: phase === 'done' ? 0.6 : 0,
                boxShadow: phase === 'done' ? '0 0 30px rgba(0, 209, 255, 0.15), inset 0 0 30px rgba(0, 209, 255, 0.05)' : 'none',
              }}
              transition={{ duration: 0.6 }}
              style={{ border: '1.5px solid rgba(0, 209, 255, 0.2)' }}
            />
            <div
              className="w-full rounded-[10px] border border-white/15 bg-white/[0.06] p-3 relative overflow-hidden backdrop-blur-sm"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)' }}
            >
              <div className="flex flex-col gap-1">
                {[
                  { h: 10, color: '#00d1ff' },
                  { h: 12, color: '#056bf1' },
                  { h: 8, color: '#00d1ff' },
                ].map((l, i) => (
                  <motion.div
                    key={i}
                    className="rounded-[3px]"
                    style={{ backgroundColor: `${l.color}33`, border: `1px solid ${l.color}44` }}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: phase === 'done' ? l.h : 0,
                      opacity: phase === 'done' ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  />
                ))}
              </div>
              <motion.div
                className="absolute top-2 right-2 flex flex-col gap-1"
                animate={{ opacity: phase === 'done' ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                {['Secure', 'FIPS', 'Signed'].map((s) => (
                  <div key={s} className="flex items-center gap-1">
                    <svg width="7" height="7" viewBox="0 0 12 12" fill="none">
                      <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span className="text-[8px] text-emerald-400/70 font-['Google_Sans',sans-serif]">{s}</span>
                  </div>
                ))}
              </motion.div>
              <motion.div className="mt-2 text-center" animate={{ opacity: phase === 'done' ? 1 : 0.3 }}>
                <span className="font-['Google_Sans',sans-serif] text-[11px] text-[#00d1ff]">45 MB</span>
              </motion.div>
            </div>
          </div>
          <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/50">CleanStart Image</span>
        </motion.div>
      </div>

      {/* Result badges */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 mt-6"
        animate={{ opacity: phase === 'done' ? 1 : 0, y: phase === 'done' ? 0 : 10 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {[
          { text: '80% smaller', color: '#00d1ff' },
          { text: '0 critical vulnerabilities', color: '#10b981' },
          { text: 'FIPS compliant', color: '#a78bfa' },
        ].map((b) => (
          <span
            key={b.text}
            className="px-3 py-1 rounded-full text-[11px] font-['Google_Sans',sans-serif] font-semibold"
            style={{ color: b.color, background: `${b.color}15`, border: `1px solid ${b.color}25` }}
          >
            {b.text}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ---------- Mini card animations ---------- */

export function MiniBarComparison() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-2 mb-5">
      <div className="flex items-center gap-2">
        <span className="font-['Google_Sans',sans-serif] text-[9px] text-white/30 w-[52px] shrink-0">Docker</span>
        <div className="flex-1 h-[14px] rounded-[3px] bg-white/[0.06] overflow-hidden relative">
          <motion.div
            className="h-full rounded-[3px]"
            style={{ background: 'linear-gradient(90deg, rgba(239,68,68,0.5), rgba(239,68,68,0.3))' }}
            initial={{ width: 0 }}
            animate={{ width: show ? '100%' : 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          />
          <motion.span
            className="absolute right-2 top-1/2 -translate-y-1/2 font-['Google_Sans',sans-serif] text-[9px] text-white/50"
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            387 MB
          </motion.span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-['Google_Sans',sans-serif] text-[9px] text-[#00d1ff]/60 w-[52px] shrink-0">CleanStart</span>
        <div className="flex-1 h-[14px] rounded-[3px] bg-white/[0.06] overflow-hidden relative">
          <motion.div
            className="h-full rounded-[3px]"
            style={{ background: 'linear-gradient(90deg, #00d1ff, #056bf1)' }}
            initial={{ width: 0 }}
            animate={{ width: show ? '12%' : 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          />
          <motion.span
            className="absolute left-[14%] top-1/2 -translate-y-1/2 font-['Google_Sans',sans-serif] text-[9px] text-[#00d1ff]"
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ delay: 0.8 }}
          >
            45 MB
          </motion.span>
        </div>
      </div>
    </div>
  );
}

export function MiniVulnScan() {
  const [phase, setPhase] = useState<'show' | 'scan' | 'clean'>('show');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let mounted = true;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && mounted) {
        function run() {
          if (!mounted) return;
          setPhase('show');
          const t1 = setTimeout(() => { if (mounted) setPhase('scan'); }, 800);
          const t2 = setTimeout(() => { if (mounted) setPhase('clean'); }, 2000);
          const t3 = setTimeout(() => { if (mounted) run(); }, 5000);
          return [t1, t2, t3];
        }
        run();
      }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => { mounted = false; obs.disconnect(); };
  }, []);

  const badges = [
    { label: 'Critical', color: '#ef4444' },
    { label: 'High', color: '#f97316' },
    { label: 'Medium', color: '#eab308' },
    { label: 'Low', color: '#ca8a04' },
  ];

  return (
    <div ref={ref} className="mb-5">
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {badges.map((b, i) => (
          <motion.div
            key={b.label}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full"
            style={{ border: `1px solid ${phase === 'clean' ? '#10b98133' : b.color + '44'}` }}
            animate={{ backgroundColor: phase === 'clean' ? 'rgba(16,185,129,0.1)' : `${b.color}15` }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
          >
            {phase === 'clean' ? (
              <motion.svg width="8" height="8" viewBox="0 0 12 12" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.2 }}>
                <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            ) : (
              <div className="w-[6px] h-[6px] rounded-full" style={{ backgroundColor: b.color }} />
            )}
            <span
              className="text-[9px] font-['Google_Sans',sans-serif]"
              style={{ color: phase === 'clean' ? '#10b981' : `${b.color}99` }}
            >
              {b.label}
            </span>
          </motion.div>
        ))}
      </div>
      <div className="relative h-[3px] rounded-full bg-white/[0.06] overflow-hidden mb-2">
        <motion.div
          className="absolute top-0 h-full w-[30%] rounded-full"
          style={{ background: 'linear-gradient(90deg, transparent, #00d1ff, transparent)', boxShadow: '0 0 8px #00d1ff' }}
          animate={{
            left: phase === 'scan' ? ['0%', '100%'] : '-30%',
            opacity: phase === 'scan' ? 1 : 0,
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>
      <motion.span
        className="font-['Google_Sans',sans-serif] text-[10px]"
        animate={{ opacity: phase === 'clean' ? 1 : 0, color: '#10b981' }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        0 vulnerabilities detected
      </motion.span>
    </div>
  );
}

export function MiniComplianceOrbit() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setShow(true); }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const badges = ['NIST', 'CIS', 'PCI DSS', 'FedRAMP'];
  const radius = 52;

  return (
    <div ref={ref} className="flex justify-center mb-5">
      <div className="relative" style={{ width: radius * 2 + 50, height: radius * 2 + 50 }}>
        {/* Center shield */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'radial-gradient(circle, rgba(0,209,255,0.2), rgba(5,107,241,0.1))',
            border: '1.5px solid rgba(0,209,255,0.3)',
          }}
          initial={{ scale: 0 }}
          animate={{ scale: show ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
              stroke="#00d1ff" strokeWidth="1.5" fill="rgba(0,209,255,0.1)"
            />
            <path d="M9 12L11 14L15 10" stroke="#00d1ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <motion.span
            className="absolute -bottom-4 font-['Google_Sans',sans-serif] text-[7px] text-[#00d1ff] whitespace-nowrap"
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            FIPS 140-3
          </motion.span>
        </motion.div>

        {/* Orbiting badges */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: show ? 360 : 0 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          {badges.map((b, i) => {
            const angle = (i / badges.length) * 360;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;
            return (
              <motion.div
                key={b}
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: show ? 1 : 0, scale: show ? 1 : 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
              >
                <motion.div
                  animate={{ rotate: show ? -360 : 0 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                >
                  <span
                    className="px-2 py-0.5 rounded-full font-['Google_Sans',sans-serif] text-[8px] font-semibold text-[#00d1ff] whitespace-nowrap"
                    style={{ background: 'rgba(0,209,255,0.1)', border: '1px solid rgba(0,209,255,0.2)' }}
                  >
                    {b}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Card data ---------- */

const uvpCards = [
  {
    title: 'Performance Enhancement',
    bullets: [
      '60-80% lighter than original images',
      'Reduced memory footprint',
      'Lower CPU consumption',
      'Faster container pull time',
    ],
    Visual: MiniBarComparison,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="#00d1ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Vulnerability Reduction',
    bullets: [
      'Faster container pull times',
      '100% vulnerability-free',
      'Pre-hardened security',
      'Continuous protection',
    ],
    Visual: MiniVulnScan,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#00d1ff" strokeWidth="1.5" />
        <path d="M12 8V12M12 16H12.01" stroke="#00d1ff" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Compliance Ready',
    bullets: [
      'FIPS compliant as per NIST standards',
      'Pre-validated for security audits',
      'Continuous compliance monitoring',
      'Significant time and cost saving',
    ],
    Visual: MiniComplianceOrbit,
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#00d1ff" strokeWidth="1.5" />
        <path d="M9 12L11 14L15 10" stroke="#00d1ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ---------- Main Export ---------- */

export function ContainerHardeningFlow() {
  return (
    <section className="relative bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px] overflow-hidden">
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(3,22,48,0.25) 0%, transparent 40%, rgba(3,22,48,0.2) 100%)' }} />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(0,209,255,0.08), transparent 70%)' }} />

      <div className="max-w-[1340px] mx-auto relative z-10">
        {/* Section title */}
        <motion.div className="text-center mb-12 md:mb-16" {...anim(0)}>
          <h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.95px] leading-[1.15]"
            style={{ textShadow: '0 0 40px rgba(0,209,255,0.15)' }}
          >
            Unique Value Proposition
          </h2>
          <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-white/80 leading-relaxed mt-3 max-w-[520px] mx-auto">
            See how CleanStart transforms open source containers into hardened, secure, compliant images.
          </p>
        </motion.div>

        {/* Top area — container transformation animation */}
        <motion.div className="mb-14 md:mb-20" {...anim(0.1)}>
          <ContainerTransformAnimation />
        </motion.div>

        {/* Bottom area — three value cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[20px]">
          {uvpCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="rounded-[15px] border border-white/[0.12] bg-white/[0.06] backdrop-blur-sm p-5 md:p-6 group transition-all duration-300 hover:border-[#00d1ff]/30 hover:bg-white/[0.09]"
              style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)' }}
              {...anim(0.15 + i * 0.08)}
            >
              {/* Mini animation */}
              <card.Visual />

              {/* Icon + title */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-[8px] bg-[#00d1ff]/10 flex items-center justify-center shrink-0 border border-[#00d1ff]/15">
                  {card.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-white tracking-[-0.3px]">
                  {card.title}
                </h3>
              </div>

              {/* Bullets */}
              <ul className="flex flex-col gap-2">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <div className="w-[5px] h-[5px] rounded-full bg-[#00d1ff]/50 mt-[7px] shrink-0" />
                    <span className="font-['Google_Sans',sans-serif] text-[13px] md:text-[14px] text-white/75 leading-relaxed">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
