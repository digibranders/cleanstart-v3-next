"use client";

import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   Animated SVG Icons
   ═══════════════════════════════════════════════ */

function AnimatedShieldIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M20 4L6 10V20C6 28.4 12 35.2 20 37C28 35.2 34 28.4 34 20V10L20 4Z"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      />
      <motion.path
        d="M14 20L18 24L26 16"
        fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.6, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedComplianceIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.rect
        x="6" y="6" width="28" height="28" rx="4"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.path
        d="M6 14H34"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.5 }}
      />
      <motion.path
        d="M14 22L18 26L26 18"
        fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.7, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedVisibilityIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M4 20C4 20 10 10 20 10C30 10 36 20 36 20C36 20 30 30 20 30C10 30 4 20 4 20Z"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.circle
        cx="20" cy="20" r="5" fill="none" stroke={color} strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.5, type: "spring", stiffness: 300, damping: 35 }}
      />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Marquee Component
   ═══════════════════════════════════════════════ */

const TECH_LOGOS = [
  { src: "/about-us/postgresql-horizontal-1.png", alt: "PostgreSQL" },
  { src: "/about-us/apache-couchdb-ar21-1.png", alt: "Apache CouchDB" },
  { src: "/about-us/debian-ar21~bgwhite-1.png", alt: "Debian" },
];

function LogoMarquee() {
  return (
    <div className="relative overflow-hidden w-full py-6">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      <motion.div
        className="flex items-center gap-16 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS, ...TECH_LOGOS].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="h-10 md:h-14 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity duration-300"
          />
        ))}
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   Testimonial Card
   ═══════════════════════════════════════════════ */

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
}

const TESTIMONIALS: TestimonialData[] = [
  {
    quote: "With CleanStart, we\u2019ve reduced our vulnerability remediation efforts by nearly 3x.",
    author: "CTO",
    role: "Leading FinTech Company (India)",
  },
  {
    quote: "CleanStart gives us assurance that every component is verified, compliant, and secure.",
    author: "Head of Security",
    role: "Global Consulting Firm",
  },
  {
    quote: "CleanStart made it possible to prove our builds are clean and compliant at every stage.",
    author: "VP of Engineering",
    role: "Cloud SaaS Provider",
  },
];

function TestimonialCard({ data, delay }: { data: TestimonialData; delay: number }) {
  return (
    <motion.div
      {...anim(delay)}
      className="bg-white rounded-[20px] p-8 md:p-10 shadow-[0_2px_20px_rgba(0,0,0,0.06)] border border-[#ecedef] flex flex-col gap-6 h-full"
    >
      <img
        src="/about-us/quote-decoration.svg"
        alt=""
        aria-hidden="true"
        className="w-10 h-10 opacity-60"
      />
      <p className="font-['Google_Sans',sans-serif] text-[#181818] text-[17px] md:text-[18px] leading-[1.7] flex-1">
        &ldquo;{data.quote}&rdquo;
      </p>
      <div className="border-t border-[#ecedef] pt-5">
        <p className="font-['Google_Sans',sans-serif] font-semibold text-[15px] text-[#181818]">
          {data.author}
        </p>
        <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#6b7280] mt-1">
          {data.role}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Benefit Card
   ═══════════════════════════════════════════════ */

interface BenefitData {
  title: string;
  description: string;
  image: string;
}

const BENEFITS: BenefitData[] = [
  {
    title: "Faster Audits",
    description: "Cut audit preparation from weeks to hours with continuously verified SBOMs.",
    image: "/about-us/about-stat.png",
  },
  {
    title: "Smaller Attack Surface",
    description: "Compliance built in for EO 14028, EU CRA, and RBI/DORA.",
    image: "/about-us/about-stat-2.png",
  },
  {
    title: "No Prioritization Needed",
    description: "Avoid up to $14.8M in manual audit and remediation expenses through automation.",
    image: "/about-us/about-stat-3.png",
  },
  {
    title: "Continuous Protection",
    description: "Identify vulnerable components in seconds with commit-level traceability.",
    image: "/about-us/about-feature.webp",
  },
];

/* ═══════════════════════════════════════════════
   Pillar Data
   ═══════════════════════════════════════════════ */

interface PillarData {
  icon: "shield" | "compliance" | "visibility";
  title: string;
  description: string;
}

const PILLARS: PillarData[] = [
  {
    icon: "shield",
    title: "Secure Foundation",
    description: "Security is embedded from the very first build. Every container and VM image starts clean, hardened, and vulnerability-free.",
  },
  {
    icon: "compliance",
    title: "Continuous Compliance",
    description: "Stay audit-ready at all times. CleanStart continuously validates every artifact against EO 14028, EU CRA, RBI, and DORA frameworks.",
  },
  {
    icon: "visibility",
    title: "Full Visibility",
    description: "Every artifact is cryptographically signed, traceable, and verifiable. Know exactly what is in every build, at every stage.",
  },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */

export function AboutContent() {
  return (
    <main className="overflow-hidden">
      {/* ─── HERO ─── */}
      <section
        className="relative min-h-[85vh] flex items-center"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
      >
        {/* Decorative floating elements */}
        <motion.div
          className="absolute top-20 right-[10%] w-32 h-32 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #06C7F2, transparent)" }}
          animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-[5%] w-20 h-20 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #ffffff, transparent)" }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <div className="max-w-[1340px] mx-auto w-full px-4 md:px-8 lg:px-[50px] py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Text */}
            <div className="relative z-10">
              <motion.h1
                className="font-['Google_Sans',sans-serif] text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-1.5px] text-white mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                Security Begins at{" "}
                <span className="text-[#06C7F2]">The Source</span>
              </motion.h1>

              <motion.p
                className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] leading-[1.7] text-white/80 max-w-[520px] mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
              >
                CleanStart delivers a secure foundation for modern software, helping organizations
                build, ship, and run software that is clean, compliant, and trusted from the very beginning.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: EASE }}
              >
                <CallToActionButton label="Book a Demo" variant="light" href="/demo" />
                <CallToActionButton label="Contact Us" variant="dark" href="/contact" />
              </motion.div>
            </div>

            {/* Right: Hero illustration */}
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.95, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            >
              <img
                src="/about-us/about-hero.webp"
                alt="CleanStart security illustration showing secure software foundation"
                className="w-full max-w-[560px] h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ─── PILLARS: Built on Three Pillars ─── */}
      <section className="bg-white py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim()}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Built on Three Pillars
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.title}
                {...anim(i * 0.12)}
                className="relative bg-[#f8f9fb] rounded-[20px] p-8 md:p-10 border border-[#ecedef] hover:border-[#056BF1]/20 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-[15px] bg-[#056BF1]/10 flex items-center justify-center mb-6 group-hover:bg-[#056BF1]/15 transition-colors duration-300">
                  {pillar.icon === "shield" && <AnimatedShieldIcon color="#056BF1" delay={i * 0.15} />}
                  {pillar.icon === "compliance" && <AnimatedComplianceIcon color="#056BF1" delay={i * 0.15} />}
                  {pillar.icon === "visibility" && <AnimatedVisibilityIcon color="#056BF1" delay={i * 0.15} />}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] text-[20px] md:text-[22px] font-semibold text-[#181818] mb-3">
                  {pillar.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] leading-[1.7] text-[#6b7280]">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR STORY ─── */}
      <section className="bg-[#cdf5fe] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.h2
                {...anim(0.1)}
                className="font-['Google_Sans',sans-serif] text-[30px] md:text-[40px] lg:text-[46px] font-bold leading-[1.15] tracking-[-1px] text-[#181818] mb-6"
              >
                From a Flaw in the System to a{" "}
                <span className="text-[#056BF1]">Clean Foundation</span>
              </motion.h2>
              <motion.p
                {...anim(0.15)}
                className="font-['Google_Sans',sans-serif] text-[16px] md:text-[17px] leading-[1.8] text-[#374151] mb-5"
              >
                Our founders spent decades in cybersecurity and engineering and saw a recurring flaw:
                security was always added after software was built. CleanStart began with a simple
                belief — trust must start at the foundation.
              </motion.p>
              <motion.p
                {...anim(0.2)}
                className="font-['Google_Sans',sans-serif] text-[16px] md:text-[17px] leading-[1.8] text-[#374151] mb-8"
              >
                Today, CleanStart helps enterprises worldwide build, ship, and run software that is
                clean, compliant, and verifiable from source to production.
              </motion.p>
              <motion.div {...anim(0.25)}>
                <CallToActionButton label="Meet the Team" variant="dark" href="/company/team" />
              </motion.div>
            </div>

            <motion.div
              {...anim(0.15)}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                <img
                  src="/about-us/about-illustration.webp"
                  alt="CleanStart story illustration showing secure software development journey"
                  className="w-full max-w-[520px] h-auto rounded-[20px]"
                />
                {/* Decorative accent */}
                <motion.img
                  src="/about-us/decorative-accent.webp"
                  alt=""
                  aria-hidden="true"
                  className="absolute -bottom-6 -left-6 w-24 h-24 opacity-60"
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY IT MATTERS: From Paperwork to Proof ─── */}
      <section className="bg-white py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim()}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                From Paperwork to Proof
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                CleanStart turns visibility into measurable value across your entire software pipeline.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                {...anim(i * 0.1)}
                className="relative bg-[#f8f9fb] rounded-[20px] overflow-hidden border border-[#ecedef] hover:border-[#056BF1]/20 transition-all duration-500 group"
              >
                <div className="p-8 md:p-10">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#056BF1]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <img
                        src="/about-us/tick-circle.svg"
                        alt=""
                        aria-hidden="true"
                        className="w-5 h-5"
                      />
                    </div>
                    <div>
                      <h3 className="font-['Google_Sans',sans-serif] text-[20px] md:text-[22px] font-semibold text-[#181818] mb-2">
                        {benefit.title}
                      </h3>
                      <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] leading-[1.7] text-[#6b7280]">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-8 md:px-10 pb-6">
                  <img
                    src={benefit.image}
                    alt={`${benefit.title} visual showing CleanStart benefit`}
                    className="w-full h-auto rounded-[15px] shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="bg-[#ecedef] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <motion.div {...anim()} className="text-center mb-14 md:mb-20">
            <h2 className="font-['Google_Sans',sans-serif] text-[30px] md:text-[40px] lg:text-[46px] font-bold leading-[1.15] tracking-[-1px] text-[#181818]">
              Trusted by Security-First Teams
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {TESTIMONIALS.map((testimonial, i) => (
              <TestimonialCard key={i} data={testimonial} delay={i * 0.12} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── OUR VISION (Blue BG) ─── */}
      <section className="relative bg-[#056BF1] py-12 md:py-[100px] overflow-hidden">
        {/* Floating decorative shields */}
        <motion.div
          className="absolute top-16 left-[8%] opacity-10"
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg viewBox="0 0 60 60" width="60" height="60">
            <path
              d="M30 6L10 14V30C10 42.6 18 52.8 30 56C42 52.8 50 42.6 50 30V14L30 6Z"
              fill="none" stroke="white" strokeWidth="2"
            />
            <path
              d="M22 30L28 36L38 24"
              fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-[12%] opacity-10"
          animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <svg viewBox="0 0 50 50" width="50" height="50">
            <path
              d="M25 5L8 12V25C8 36 15 44 25 47C35 44 42 36 42 25V12L25 5Z"
              fill="none" stroke="white" strokeWidth="2"
            />
          </svg>
        </motion.div>
        <motion.div
          className="absolute top-[40%] right-[25%] opacity-[0.07]"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <svg viewBox="0 0 40 40" width="80" height="80">
            <circle cx="20" cy="20" r="18" fill="none" stroke="white" strokeWidth="1.5" />
            <path d="M14 20L18 24L26 16" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>

        {/* Gradient orbs */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-[#06C7F2] opacity-[0.08] blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#031630] opacity-[0.15] blur-[120px]" />

        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px] relative z-10">
          <div className="max-w-[780px] mx-auto text-center">
            <motion.h2
              {...anim(0.1)}
              className="font-['Google_Sans',sans-serif] text-[30px] md:text-[40px] lg:text-[46px] font-bold leading-[1.15] tracking-[-1px] text-white mb-7"
            >
              Secure by Design
            </motion.h2>
            <motion.p
              {...anim(0.2)}
              className="font-['Google_Sans',sans-serif] text-[17px] md:text-[19px] leading-[1.8] text-white/85"
            >
              We believe every organization should be able to build and release software that is
              secure by design. CleanStart is creating that future — one clean build at a time.
            </motion.p>

            {/* Decorative line */}
            <motion.div
              className="w-16 h-[3px] bg-[#06C7F2] rounded-full mx-auto mt-10"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            />
          </div>
        </div>
      </section>

      {/* ─── ECOSYSTEM: Built for The Ecosystems You Trust ─── */}
      <section className="bg-white py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px]">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-10 md:mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim()}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Built for The Ecosystems You Trust
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                CleanStart works seamlessly with the platforms, registries, and ecosystems you already use.
              </p>
            </motion.div>
          </div>

          <motion.div {...anim(0.15)}>
            <LogoMarquee />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
