"use client";

import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import svgPaths from '@/lib/svg-data/svg-qdq9a17cp5';

/* -- Fill colors for contrast on white bg -- */
const F1 = '#374151'; // primary dark grey
const F2 = '#6b7280'; // medium grey (for accent paths)

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

/* -- Row 1 Logos -- */

function Logo26() {
  return (
    <svg className="h-[28px] w-auto" fill="none" viewBox="0 0 202.15 43.5789">
      <g clipPath="url(#c26)">
        <path d={svgPaths.p3fc70300} fill={F1} />
        <path d={svgPaths.p22f3db00} fill={F1} />
        <path d={svgPaths.p25188600} fill={F1} />
        <path d={svgPaths.pc83ef00} fill={F1} />
        <path d={svgPaths.p2ffd8180} fill={F2} />
        <path d={svgPaths.p1a9b4040} fill={F2} />
        <path d={svgPaths.p1a4baf92} fill={F2} />
        <path d={svgPaths.p29773680} fill={F1} />
        <path d={svgPaths.p384e9820} fill={F2} />
        <path d={svgPaths.p26fe9f00} fill={F2} />
        <path d={svgPaths.p2afd6900} fill={F1} />
        <path d={svgPaths.pb948030} fill={F1} />
        <path d={svgPaths.p27a01600} fill={F1} />
        <path d={svgPaths.p2bf71380} fill={F1} />
        <path d={svgPaths.p1db0f700} fill={F1} />
        <path d={svgPaths.p1ca193f0} fill={F1} />
        <path d={svgPaths.pa419c80} fill={F2} />
        <path d={svgPaths.pbdcae00} fill={F1} />
        <path d={svgPaths.p35979200} fill={F1} />
      </g>
      <defs><clipPath id="c26"><rect fill="white" height="43.5789" width="202.15" /></clipPath></defs>
    </svg>
  );
}

function Logo27() {
  return (
    <svg className="h-[36px] w-auto" fill="none" viewBox="0 0 201.428 56.4911">
      <g clipPath="url(#c27)">
        <path d={svgPaths.p24e4aa00} fill={F1} />
        <path d={svgPaths.p123c3f00} fill={F1} />
        <path d={svgPaths.p35b6d580} fill={F1} />
        <path d={svgPaths.p125c2600} fill={F1} />
        <path d={svgPaths.p27b1a670} fill={F2} />
        <path d={svgPaths.p13892100} fill={F1} />
        <path d={svgPaths.p3c7a680} fill={F1} />
        <path d={svgPaths.p2131b980} fill={F2} />
        <path d={svgPaths.p17fab540} fill={F2} />
      </g>
      <defs><clipPath id="c27"><rect fill="white" height="56.4911" width="201.428" /></clipPath></defs>
    </svg>
  );
}

function Logo28() {
  return (
    <svg className="h-[38px] w-auto" fill="none" viewBox="0 0 202.347 61.7367">
      <g clipPath="url(#c28)">
        <path d={svgPaths.p3485fe00} fill={F1} />
        <path d={svgPaths.p37e9d100} fill={F1} />
        <path d={svgPaths.p331920} fill={F2} />
        <path d={svgPaths.p3364d200} fill={F1} />
        <path d={svgPaths.p34bfdaf1} fill={F1} />
        <path d={svgPaths.p37406bb0} fill={F1} />
        <path d={svgPaths.p2cbe8c00} fill={F1} />
        <path d={svgPaths.p29a7ecc0} fill={F1} />
        <path d={svgPaths.p24a55580} fill={F1} />
      </g>
      <defs><clipPath id="c28"><rect fill="white" height="61.7367" width="202.347" /></clipPath></defs>
    </svg>
  );
}

function Logo29() {
  return (
    <svg className="h-[36px] w-auto" fill="none" viewBox="0 0 202.247 57.7016">
      <g>
        <path d={svgPaths.p216f0780} fill={F2} />
        <path d={svgPaths.p269500} fill={F1} />
        <path d={svgPaths.p1148d900} fill={F2} />
        <path d={svgPaths.p33379340} fill={F1} />
        <path d={svgPaths.p3a925c80} fill={F1} />
        <path d={svgPaths.p3796eb40} fill={F2} />
        <path d={svgPaths.p35ce5600} fill={F1} />
        <path d={svgPaths.p34e0ca80} fill={F2} />
        <path d={svgPaths.p31019b00} fill={F1} />
        <path d={svgPaths.pdbeb400} fill={F1} />
        <path d={svgPaths.p3e7bfc00} fill={F1} />
        <path d={svgPaths.p230512f0} fill={F1} />
        <path d={svgPaths.p1b169e00} fill={F1} />
        <path d={svgPaths.p19a76df0} fill={F1} />
        <path d={svgPaths.p5e68700} fill={F1} />
        <path d={svgPaths.p1d747cf0} fill={F2} />
        <path d={svgPaths.p3c042100} fill={F1} />
        <path d={svgPaths.p150d5180} fill={F1} />
        <path d={svgPaths.p179cf480} fill={F1} />
        <path d={svgPaths.p3ca4d640} fill={F1} />
        <path d={svgPaths.p27b6f200} fill={F1} />
        <path d={svgPaths.pd1c1d00} fill={F1} />
        <path d={svgPaths.p377172f0} fill={F1} />
        <path d={svgPaths.p2c1dbe00} fill={F1} />
        <path d={svgPaths.p2a27be00} fill={F1} />
      </g>
    </svg>
  );
}

function Logo30and31() {
  return (
    <div className="flex items-center gap-[2px]">
      <svg className="h-[60px] w-auto" fill="none" viewBox="0 0 63.7957 59.5427">
        <g>
          <path d={svgPaths.p29807180} fill={F1} />
          <path d={svgPaths.p2528a900} fill={F2} />
          <path d={svgPaths.p38fca900} fill={F2} />
        </g>
      </svg>
      <svg className="h-[30px] w-auto" fill="none" viewBox="0 0 135.743 47.0494">
        <g clipPath="url(#c31)">
          <path d={svgPaths.p1eff15f0} fill={F1} />
          <path d={svgPaths.pb6ae8c0} fill={F1} />
          <path d={svgPaths.p3f9fd100} fill={F1} />
          <path d={svgPaths.p258bad00} fill={F1} />
          <path d={svgPaths.p27598100} fill={F1} />
          <path d={svgPaths.p2dbca400} fill={F1} />
          <path d={svgPaths.p26232980} fill={F1} />
          <path d={svgPaths.p1991ff00} fill={F1} />
          <path d={svgPaths.p6bac580} fill={F1} />
          <path d={svgPaths.p24ef9680} fill={F1} />
          <path d={svgPaths.pf89bc80} fill={F1} />
          <path d={svgPaths.p1ce1f500} fill={F1} />
          <path d={svgPaths.p17d89500} fill={F1} />
        </g>
        <defs><clipPath id="c31"><rect fill="white" height="47.0494" width="135.743" /></clipPath></defs>
      </svg>
    </div>
  );
}

/* -- Row 2 Logos -- */

function Logo32() {
  return (
    <svg className="h-[40px] w-auto" fill="none" viewBox="0 0 107.545 64.5613">
      <g clipPath="url(#c32)">
        <path d={svgPaths.p2ca66c80} fill={F1} />
        <path d={svgPaths.p3acbde80} fill={F2} />
        <path d={svgPaths.p14679280} fill={F1} />
        <path d={svgPaths.p103e7900} fill={F1} />
        <path d={svgPaths.p2b86ce00} fill={F2} />
      </g>
      <defs><clipPath id="c32"><rect fill="white" height="64.5613" width="107.545" /></clipPath></defs>
    </svg>
  );
}

function Logo33() {
  return (
    <svg className="h-[46px] w-auto" fill="none" viewBox="0 0 201.374 73.035">
      <g clipPath="url(#c33)">
        <path d={svgPaths.p355c0900} fill={F1} />
        <g>
          <path d={svgPaths.p8024a80} fill={F1} />
          <path d={svgPaths.p2b286780} fill={F1} />
          <path d={svgPaths.p1c25f700} fill={F1} />
          <path d={svgPaths.p20c7e700} fill={F1} />
          <path d={svgPaths.p15ed6100} fill={F1} />
          <path d={svgPaths.p31ef0e00} fill={F1} />
          <path d={svgPaths.pd1b330} fill={F1} />
        </g>
      </g>
      <defs><clipPath id="c33"><rect fill="white" height="73.035" width="201.374" /></clipPath></defs>
    </svg>
  );
}

function Logo34() {
  return (
    <div className="relative h-[38px] w-[130px] overflow-clip">
      <div className="absolute inset-[8.63%_54.66%_8.64%_1.53%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 88.5901 49.7361">
          <g>
            <path d={svgPaths.p28e04c00} fill={F1} />
            <path d={svgPaths.p16087180} fill={F1} />
            <path d={svgPaths.p18a78d00} fill={F1} />
            <path d={svgPaths.p254dde00} fill={F1} />
            <path d={svgPaths.p26b0b1f0} fill={F1} />
            <path d={svgPaths.pcb76dc0} fill={F1} />
            <path d={svgPaths.p122fb100} fill={F1} />
            <path d={svgPaths.p64480} fill={F1} />
            <path d={svgPaths.p3594a00} fill={F1} />
            <path d={svgPaths.p1fea6ac0} fill={F1} />
            <path d={svgPaths.p31d1cc70} fill={F1} />
          </g>
        </svg>
      </div>
      <div className="absolute inset-[16.57%_2.22%_9.73%_51.49%]">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 93.5929 44.3108">
          <g>
            <path d={svgPaths.p1e8f47f0} fill={F1} />
            <path d={svgPaths.p33f29600} fill={F1} />
            <path d={svgPaths.p15fc46f1} fill={F1} />
            <path d={svgPaths.p3412a400} fill={F1} />
            <path d={svgPaths.p29506d00} fill={F1} />
          </g>
        </svg>
      </div>
    </div>
  );
}

function Logo35() {
  return (
    <svg className="h-[30px] w-auto" fill="none" viewBox="0 0 202.148 45.9999">
      <g clipPath="url(#c35)">
        <path d={svgPaths.p1eb2c1a0} fill={F1} />
        <path d={svgPaths.p24dc5280} fill={F1} />
        <path d={svgPaths.p12fb3d00} fill={F1} />
        <path d={svgPaths.pb5e46e0} fill={F1} />
        <path d={svgPaths.p27b843f0} fill={F1} />
        <path d={svgPaths.p33fdf880} fill={F1} />
        <path d={svgPaths.p17307a00} fill={F1} />
        <path d={svgPaths.pad0da80} fill={F1} />
        <path d={svgPaths.p23025880} fill={F1} />
        <path d={svgPaths.p381566c0} fill={F1} />
        <path d={svgPaths.p1ca9e700} fill={F1} />
        <path d={svgPaths.p1f190500} fill={F1} />
        <path d={svgPaths.p353fc3c0} fill={F1} />
        <path d={svgPaths.p17adcf00} fill={F1} />
        <path d={svgPaths.p3210ee00} fill={F1} />
        <path d={svgPaths.p3376ad00} fill={F1} />
        <path d={svgPaths.p2c917e00} fill={F1} />
        <path d={svgPaths.p3aa0b00} fill={F1} />
      </g>
      <defs><clipPath id="c35"><rect fill="white" height="45.9999" width="202.148" /></clipPath></defs>
    </svg>
  );
}

function Logo36() {
  return (
    <svg className="h-[20px] w-auto" fill="none" viewBox="0 0 202.456 30.2631">
      <g clipPath="url(#c36)">
        <path d={svgPaths.p144d4980} fill={F2} />
        <path d={svgPaths.p2fdf880} fill={F1} />
        <path d={svgPaths.p32090400} fill={F1} />
        <path d={svgPaths.p26f24880} fill={F1} />
        <path d={svgPaths.p185f44c0} fill={F1} />
        <path d={svgPaths.p328a3cc0} fill={F1} />
        <path d={svgPaths.p2ae768c0} fill={F1} />
        <path d={svgPaths.pacea500} fill={F1} />
        <path d={svgPaths.p3f25ab80} fill={F2} />
        <path d={svgPaths.p16b59200} fill={F1} />
        <path d={svgPaths.p666de90} fill={F1} />
        <path d={svgPaths.p12621f00} fill={F2} />
        <path d={svgPaths.p43b5880} fill={F1} />
        <path d={svgPaths.p33877d70} fill={F1} />
        <path d={svgPaths.p1b17b080} fill={F1} />
      </g>
      <defs><clipPath id="c36"><rect fill="white" height="30.2631" width="202.456" /></clipPath></defs>
    </svg>
  );
}

export function BuiltForEnvironmentSection() {
  const imageCount = useCountUp(400, 2000, 0);
  const updateFreq = useCountUp(24, 2000, 0);

  return (
    <section className="bg-white overflow-hidden px-4 md:px-8 lg:px-[50px] pt-[80px] pb-[200px]">
      <div className="max-w-[1340px] mx-auto flex flex-col lg:flex-row items-start gap-8 lg:gap-0">
        <motion.div
          className="shrink-0 w-full lg:w-[670px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-black tracking-[-0.95px] leading-normal">
            Built for Your<br />
            Environment
          </h2>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-[50px] w-full lg:w-[670px]">
          <motion.p
            className="font-['Google_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-black leading-normal w-full lg:w-[616px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Works seamlessly across all major platforms, registries, and CI/CD pipelines with zero configuration changes.
          </motion.p>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-[59px]">
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-['Google_Sans',sans-serif] font-normal text-[36px] text-[#056bf1] leading-[56px] tracking-[-1.12px]">
                {/* eslint-disable-next-line react-hooks/refs */}
                <span ref={imageCount.ref}>{imageCount.count.toLocaleString()}</span>+
              </p>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-black leading-normal">
                Production-ready images<br />across major ecosystems
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-['Google_Sans',sans-serif] font-normal text-[36px] text-[#056bf1] leading-[56px] tracking-[-1.12px]">
                {/* eslint-disable-next-line react-hooks/refs */}
                <span ref={updateFreq.ref}>{updateFreq.count}</span>hr
              </p>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-black leading-normal">
                Rebuild cycle for continuous<br />vulnerability remediation
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-16 max-w-[1340px] mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex items-center gap-0 animate-[envScroll_35s_linear_infinite]">
            <TickerRow />
            <TickerRow />
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes envScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

function TickerRow() {
  return (
    <div className="flex items-center shrink-0">
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo26 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo27 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo28 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo29 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo30and31 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo32 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo33 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo34 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo35 /></div>
      <div className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]"><Logo36 /></div>
    </div>
  );
}
