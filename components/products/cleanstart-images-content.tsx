"use client";

import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { FlowDiagram } from '@/components/products/flow-diagram';
import { CallToActionButton } from '@/components/shared/call-to-action-button';
import CsDashboardUiFresh from '@/lib/svg-data/CsDashboardUiFresh';
import LocalRegistry from '@/lib/svg-data/LocalRegistry';
import { SidePanelAnimation } from '@/components/products/side-panel-animation';
import { SecureIcon, DeveloperIcon, PerformanceIcon } from '@/components/products/isometric-icons';
import { UniqueValueProposition } from '@/components/products/unique-value-proposition';
import { BuiltForEnvironmentSection } from '@/components/products/built-for-environment-section';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
});

/* ═══════════════════════════════════════════════
   1. HERO + FLOW DIAGRAM
   ═══════════════════════════════════════════════ */
function ImagesHero() {
  return (
    <section
      className="relative pt-[120px] md:pt-[160px] pb-0 px-4 md:px-8 lg:px-[50px] overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
      }}
    >
      <motion.div
        className="max-w-[1340px] mx-auto flex flex-col items-center text-center gap-6 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[56px] text-white tracking-[-0.95px] leading-[1.1] max-w-[800px]">
          A Secure Foundation for Every Container Build
        </h1>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] md:text-[18px] text-white/80 leading-relaxed max-w-[600px]">
          Zero-CVE container images, rebuilt daily and fully verifiable. Build on a secure foundation with no extra tooling required.
        </p>
        <div>
          <CallToActionButton label="Browse Image Catalog" variant="light" size="md" href="#catalog" />
        </div>
      </motion.div>
      <motion.div
        className="max-w-[1340px] mx-auto mt-10 md:mt-14 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <FlowDiagram />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SCALED FIGMA DASHBOARD WRAPPER
   ═══════════════════════════════════════════════ */
const FIGMA_W = 1441;
const FIGMA_H = 1024;

function ScaledDashboard({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new ResizeObserver(([entry]) => { setScale(entry.contentRect.width / FIGMA_W); });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={wrapRef} className="relative w-full overflow-hidden" style={{ paddingBottom: `${(FIGMA_H / FIGMA_W) * 100}%` }}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: FIGMA_W, height: FIGMA_H, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   1b. PORTAL & REPOSITORY SHOWCASE — Split Panels
   ═══════════════════════════════════════════════ */

const panelData = {
  portal: {
    title: 'CleanStart Portal',
    description: 'Browse, verify, and deploy zero-CVE container images directly from the CleanStart portal or your private repository.',
    cta: 'Explore Portal',
    features: ['Browse All Images', 'Subscribed Images', 'Threat Intelligence', 'Tools Hub', 'Dashboard', 'Tickets'],
  },
  repository: {
    title: 'CleanStart Repository',
    description: 'Browse, search, and pull from our catalog of 500+ hardened container images — all signed, verified, and rebuilt daily with zero known CVEs.',
    cta: 'Browse Images',
    features: ['500+ Hardened Images', 'FIPS & Minimal Variants', 'Private Registry Support'],
  },
};

function PortalShowcaseSection() {
  const [active, setActive] = useState<'portal' | 'repository'>('portal');
  const panels: Array<{ key: 'portal' | 'repository'; bg: string; bgInactive: string; textColor: string; textMuted: string; featureColor: string; ctaStyle: string; dashboard: React.ReactNode }> = [
    { key: 'portal', bg: '#ffffff', bgInactive: '#ffffff', textColor: '#181818', textMuted: 'rgba(24,24,24,0.55)', featureColor: '#056bf1', ctaStyle: 'bg-[#056bf1] text-white', dashboard: <CsDashboardUiFresh /> },
    { key: 'repository', bg: '#ffffff', bgInactive: '#ffffff', textColor: '#181818', textMuted: 'rgba(24,24,24,0.55)', featureColor: '#056bf1', ctaStyle: 'bg-[#056bf1] text-white', dashboard: <LocalRegistry /> },
  ];

  return (
    <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] overflow-hidden">
      <motion.div className="max-w-[1340px] mx-auto" {...anim(0)}>
        <div className="lg:hidden flex flex-col gap-6">
          <div className="relative inline-flex items-center rounded-full p-[3px] self-start" style={{ background: 'rgba(24,24,24,0.07)' }}>
            <motion.div className="absolute top-[3px] bottom-[3px] rounded-full bg-[#056bf1]" layout animate={{ left: active === 'portal' ? 3 : '50%', right: active === 'portal' ? '50%' : 3 }} transition={{ type: 'spring', stiffness: 400, damping: 35 }} />
            {(['portal', 'repository'] as const).map((t) => (
              <button key={t} className="relative z-10 px-5 py-2.5 rounded-full cursor-pointer transition-colors duration-300" onClick={() => setActive(t)}>
                <span className={`font-['Google_Sans',sans-serif] font-semibold text-[14px] whitespace-nowrap transition-colors duration-300 ${active === t ? 'text-white' : 'text-[#181818]/50'}`}>{panelData[t].title}</span>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }} className="flex flex-col gap-4">
              <p className="font-['Google_Sans',sans-serif] text-[16px] text-[#181818]/60 leading-relaxed">{panelData[active].description}</p>
              <div className="flex flex-wrap gap-2">{panelData[active].features.map((f) => (<span key={f} className="font-['Google_Sans',sans-serif] text-[13px] text-[#056bf1]">{'>'} {f}</span>))}</div>
            </motion.div>
          </AnimatePresence>
          <div className="rounded-[15px] overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                <ScaledDashboard>{active === 'portal' ? <CsDashboardUiFresh /> : <LocalRegistry />}</ScaledDashboard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="hidden lg:flex gap-4 h-[680px] xl:h-[740px]">
          {panels.map((panel) => {
            const isActive = active === panel.key;
            const data = panelData[panel.key];
            return (
              <motion.div key={panel.key} className="relative rounded-[20px] overflow-hidden cursor-pointer flex flex-col" style={{ background: isActive ? panel.bg : panel.bgInactive }} layout animate={{ flex: isActive ? 5.5 : 1 }} transition={{ type: 'spring', stiffness: 300, damping: 35 }} onClick={() => setActive(panel.key)}>
                <div className="p-4 xl:p-5 flex flex-col gap-3 shrink-0 relative z-10">
                  <motion.h3 className="font-['Google_Sans',sans-serif] tracking-[-0.5px] leading-[1.15]" style={{ color: panel.textColor }} layout animate={{ fontSize: isActive ? 36 : 24 }} transition={{ type: 'spring', stiffness: 300, damping: 35 }}>{data.title}</motion.h3>
                  <AnimatePresence>{isActive && (<motion.p className="font-['Google_Sans',sans-serif] text-[16px] leading-relaxed max-w-[520px]" style={{ color: panel.textMuted }} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>{data.description}</motion.p>)}</AnimatePresence>
                  <AnimatePresence>{isActive && (<motion.div className="flex flex-wrap gap-x-6 gap-y-1 mt-1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.3, delay: 0.05 }}>{data.features.map((f) => (<span key={f} className="font-['Google_Sans',sans-serif] text-[13px] xl:text-[14px]" style={{ color: panel.featureColor }}>{'>'}&nbsp;&nbsp;{f}</span>))}</motion.div>)}</AnimatePresence>
                  <AnimatePresence>{!isActive && (<motion.p className="font-['Google_Sans',sans-serif] text-[13px] leading-relaxed" style={{ color: panel.textMuted }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{data.description.split('\u2014')[0].trim()}</motion.p>)}</AnimatePresence>
                </div>
                <AnimatePresence>{isActive && (<motion.div className="flex-1 px-2.5 xl:px-3.5 pb-2.5 xl:pb-3.5 min-h-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}><div className="rounded-[14px] overflow-hidden h-full" style={{ boxShadow: '0 12px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.06)' }}><ScaledDashboard>{panel.dashboard}</ScaledDashboard></div></motion.div>)}</AnimatePresence>
                <AnimatePresence>{!isActive && (<motion.div className="px-4 xl:px-5 mt-auto pb-4 xl:pb-5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full ${panel.ctaStyle}`}><span className="font-['Google_Sans',sans-serif] font-semibold text-[13px] whitespace-nowrap">{data.cta}</span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg></div></motion.div>)}</AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. EASY TO START
   ═══════════════════════════════════════════════ */

const easyFeatures = [
  { Icon: SecureIcon, title: 'Always secure', description: 'Every CleanStart image is continuously scanned, hardened, and verified to keep vulnerabilities close to zero.' },
  { Icon: DeveloperIcon, title: 'Built for developers', description: 'CleanStart integrates smoothly into CI/CD pipelines, repositories, and cloud platforms without workflow disruption.' },
  { Icon: PerformanceIcon, title: 'Performance guaranteed', description: 'CleanStart images are smaller, faster, and lighter than typical public container images, enabling faster builds and deployments.' },
];

function EasyToStartSection() {
  return (
    <section className="relative pt-0 pb-12 md:pt-0 md:pb-[100px] overflow-hidden bg-white">
      <div className="w-full relative z-10">
        <motion.div className="w-full" style={{ height: '45vh', minHeight: 360 }} {...anim(0)}>
          <SidePanelAnimation title="Works with Your Existing Workflow" />
        </motion.div>
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[50px] mt-10 md:mt-[60px]">
            {easyFeatures.map((feature, i) => (
              <motion.div key={feature.title} className="flex flex-col" {...anim(0.1 + i * 0.08)}>
                <div className="mb-4"><feature.Icon /></div>
                <div className="w-full h-[1px] bg-[#181818]/10 mb-6" />
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] md:text-[22px] text-[#181818] tracking-[-0.3px] mb-3">{feature.title}</h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════ */
export function CleanstartImagesContent() {
  return (
    <>
      <ImagesHero />
      <PortalShowcaseSection />
      <EasyToStartSection />
      <UniqueValueProposition />
      <BuiltForEnvironmentSection />
    </>
  );
}
