"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

function useCountUp(end: number, duration: number = 2000, decimals: number = 0) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * end).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return { count, ref };
}

// --- Brand Logo Placeholder Components ---
// TODO: Replace these with actual SVG logo components exported from design system

function EncoraLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      ENCORA
    </div>
  );
}

function HPELogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      HPE
    </div>
  );
}

function KPMGLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      KPMG
    </div>
  );
}

function HitachiLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      HITACHI
    </div>
  );
}

function EventusLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      eventus
    </div>
  );
}

function LoopsLogo() {
  return (
    <svg width="31" height="22" viewBox="0 0 30.8863 21.9562" fill="none">
      <ellipse cx="8.17584" cy="13.5201" rx="7.26741" ry="7.39305" stroke="black" strokeWidth="1.81685" />
      <ellipse cx="22.7104" cy="7.86659" rx="7.26741" ry="6.95816" stroke="black" strokeWidth="1.81685" />
    </svg>
  );
}

function LivlongLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      LIVLONG
    </div>
  );
}

function EncoraBigLogo() {
  return (
    <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
      ENCORA
    </div>
  );
}

function LogoRow() {
  return (
    <div className="flex items-center shrink-0">
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EncoraLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px] overflow-hidden">
        <HPELogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <KPMGLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <HitachiLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EventusLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <LoopsLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <LivlongLogo />
      </div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
        <EncoraBigLogo />
      </div>
    </div>
  );
}

export function TrustedBrandsSection() {
  const orgCount = useCountUp(6000, 2000, 0);
  const uptimeCount = useCountUp(99.9, 2000, 1);

  return (
    <section className="px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px] bg-white overflow-hidden">
      <div className="max-w-[1340px] mx-auto">
        {/* Header - 30:70 split */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px]">
          {/* Left: Headline - 30% */}
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.2] tracking-[-0.02em] lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Trusted by Leading Global Brands
          </motion.h2>

          {/* Right: Description + Stats - 70% */}
          <div className="lg:col-span-7 flex flex-col gap-[48px]">
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              From Fortune 500 enterprises to fast-growing startups, teams trust CleanStart to eliminate vulnerabilities and accelerate secure deployments.
            </motion.p>

            {/* Stats Row */}
            <div className="flex flex-col sm:flex-row gap-[48px]">
              <motion.div
                className="flex flex-col gap-[12px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <p className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#056bf1] leading-[1.2] tracking-[-0.02em]">
                  <span ref={orgCount.ref}>{orgCount.count.toLocaleString()}</span>+
                </p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6]">
                  Organizations deploying zero-<br />CVE containers in production
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col gap-[12px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              >
                <p className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#056bf1] leading-[1.2] tracking-[-0.02em]">
                  <span ref={uptimeCount.ref}>{uptimeCount.count.toFixed(1)}</span>%
                </p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6]">
                  Uptime SLA with enterprise<br />support and monitoring
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Logo Ticker */}
        <motion.div
          className="mt-[80px]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

            <div className="flex items-center gap-0 animate-[scroll_30s_linear_infinite]">
              <LogoRow />
              <LogoRow />
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
