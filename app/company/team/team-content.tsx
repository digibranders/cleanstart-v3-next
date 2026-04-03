"use client";

import { motion, useInView } from "motion/react";
import { useState, useRef } from "react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   SVG Icons
   ═══════════════════════════════════════════════ */

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function QuoteIcon({ className }: { className?: string }) {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className={className}>
      <path
        d="M10.5 25.5C10.5 22.5 12 18.5 16 14.5L18 16.5C15.5 19 14.5 21 14.5 22.5H18V30H10.5V25.5ZM24.5 25.5C24.5 22.5 26 18.5 30 14.5L32 16.5C29.5 19 28.5 21 28.5 22.5H32V30H24.5V25.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function ClipboardCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

const executiveLeadership = [
  {
    name: "Nilesh Jain",
    title: "CO-FOUNDER & CEO",
    photo: "/teams/nilesh-1.avif",
    linkedin: "https://www.linkedin.com/in/nilesh-jain-80243520/",
  },
  {
    name: "Biswajit De",
    title: "CO-FOUNDER & CTO",
    photo: "/teams/leadership-image-3.png",
    linkedin: "https://www.linkedin.com/in/biswajitde/",
  },
  {
    name: "Vijendra Katiyar",
    title: "CO-FOUNDER & CRO",
    photo: "/teams/leadership-image-2.png",
    linkedin: "https://www.linkedin.com/in/vijendra-katiyar-55456ba/",
  },
];

const advisoryBoard = [
  {
    name: "Anandamoy Roychowdhary",
    title: "Advisor",
    photo: "/teams/leadership-image-4.png",
    linkedin: "https://www.linkedin.com/in/anandamoy/",
  },
];

const teamTestimonials = [
  {
    name: "Pooja Lachhwani",
    role: "HR Manager",
    quote:
      "Great products are born from understanding people, not just technology. We design with empathy.",
  },
  {
    name: "Sanket Modi",
    role: "Sr. Manager, Developer Relations",
    quote:
      "Working at CleanStart means solving problems that matter. We build systems where security and speed reinforce each other, not compete.",
  },
  {
    name: "Mayank Solanki",
    role: "Director - R&D",
    quote:
      "CleanStart gives me the rare chance to build compliance into the foundation of how software is made. It\u2019s meaningful work with measurable impact.",
  },
];

const mosaicImages = [
  { src: "/teams/team-office.avif", alt: "CleanStart office space" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.33.31-pm.jpeg", alt: "Team collaboration moment" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.34.18-pm.jpeg", alt: "Team working together" },
  { src: "/teams/team-culture.webp", alt: "CleanStart team culture" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.33.31-pm-1.jpeg", alt: "Team brainstorming session" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.35.05-pm.jpeg", alt: "Team celebration" },
  { src: "/teams/img20260107154155.jpg.jpeg", alt: "CleanStart team event" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.36.30-pm.jpeg", alt: "Team building activity" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.37.14-pm.jpeg", alt: "Team outdoor gathering" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.37.31-pm.jpeg", alt: "Team workshop session" },
  { src: "/teams/whatsapp-image-2026-03-16-at-1.37.50-pm.jpeg", alt: "Team casual meetup" },
];

const howWeWorkValues = [
  {
    icon: <ShieldIcon />,
    title: "Trusted Foundation",
    description: "Security built in from the start",
  },
  {
    icon: <ClipboardCheckIcon />,
    title: "Always Audit-Ready",
    description: "Continuous compliance at every step",
  },
  {
    icon: <EyeIcon />,
    title: "Proven Visibility",
    description: "Every artifact verifiable",
  },
];

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)",
      }}
    >
      {/* Grid pattern */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="team-hero-grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#team-hero-grid)" />
      </svg>

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 35%, rgba(6,199,242,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px] pt-[120px] md:pt-[160px] pb-[100px] md:pb-[140px]">
        <div className="text-center max-w-[800px] mx-auto">
          <motion.h1
            className="font-['Google_Sans',sans-serif] text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white tracking-[-0.95px] leading-[1.08] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            United by <span className="text-[#cdf5fe]">Purpose</span>
          </motion.h1>

          <motion.p
            className="font-['Google_Sans',sans-serif] text-[18px] md:text-[22px] text-white/80 leading-[1.5] mb-4 font-medium"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          >
            Leaders and innovators building trust into software.
          </motion.p>

          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-white/60 leading-[1.7] max-w-[640px] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          >
            Our teams bring deep expertise in security, compliance, and
            engineering &mdash; connected by a shared commitment to building
            trusted software from the start.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   EXECUTIVE LEADERSHIP
   ═══════════════════════════════════════════════ */

function LeadershipSection() {
  return (
    <section className="bg-[#181818] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
          <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.95px] leading-normal">
              Executive Leadership
            </h2>
          </motion.div>
          <motion.div className="flex-1" {...anim(0.1)}>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white/60 leading-normal max-w-[526px]">
              Meet the founders driving CleanStart&apos;s mission to secure the
              software supply chain at every stage.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] max-w-[1060px] mx-auto">
          {executiveLeadership.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative bg-[#222222] rounded-[15px] overflow-hidden hover:bg-[#2a2a2a] transition-all duration-400"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              {/* Top accent bar */}
              <div className="h-[3px] bg-gradient-to-r from-[#056BF1] to-[#06C7F2]" />

              {/* Photo */}
              <div className="relative w-full aspect-[4/4] overflow-hidden bg-[#1a1a1a]">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#222222] via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6 pt-4 text-center">
                <h3 className="font-['Google_Sans',sans-serif] text-[18px] font-semibold text-white mb-1">
                  {member.name}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[12px] font-semibold text-[#06C7F2] uppercase tracking-[0.12em] mb-5">
                  {member.title}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-['Google_Sans',sans-serif] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-300"
                >
                  <LinkedInIcon />
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ADVISORY BOARD
   ═══════════════════════════════════════════════ */

function AdvisorySection() {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
          <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
              Advisory Board
            </h2>
          </motion.div>
          <motion.div className="flex-1" {...anim(0.1)}>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
              Experienced advisors guiding CleanStart&apos;s strategy across
              security, compliance, and enterprise markets.
            </p>
          </motion.div>
        </div>

        <div className="max-w-[380px] mx-auto">
          {advisoryBoard.map((member, i) => (
            <motion.div
              key={member.name}
              className="group relative bg-white rounded-[15px] overflow-hidden transition-all duration-400"
              style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              {/* Top accent bar */}
              <div className="h-[3px] bg-gradient-to-r from-[#056BF1] to-[#06C7F2]" />

              {/* Photo */}
              <div className="relative w-full aspect-[4/4] overflow-hidden bg-[#f6f7f9]">
                <img
                  src={member.photo}
                  alt={`${member.name}, ${member.title}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-6 pt-4 text-center">
                <h3 className="font-['Google_Sans',sans-serif] text-[18px] font-semibold text-[#181818] mb-1">
                  {member.name}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[12px] font-semibold text-[#056BF1] uppercase tracking-[0.12em] mb-5">
                  {member.title}
                </p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-['Google_Sans',sans-serif] text-[#64748B] hover:text-[#056BF1] bg-[#f6f7f9] hover:bg-[#eef5ff] transition-all duration-300"
                >
                  <LinkedInIcon />
                  Connect on LinkedIn
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   THE HUSTLE SQUAD — Photo Mosaic
   ═══════════════════════════════════════════════ */

function HustleSquadSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] overflow-hidden">
      <div className="max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
          <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
              The Hustle Squad
            </h2>
          </motion.div>
          <motion.div className="flex-1" {...anim(0.1)}>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
              A glimpse into our energy, our culture, and the people who make
              CleanStart what it is.
            </p>
          </motion.div>
        </div>

        {/* Masonry mosaic grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {mosaicImages.map((image, i) => {
            // Vary heights for masonry effect
            const heights = [
              "aspect-[3/4]",
              "aspect-[4/3]",
              "aspect-[1/1]",
              "aspect-[3/4]",
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-[1/1]",
              "aspect-[4/3]",
              "aspect-[3/4]",
              "aspect-[4/3]",
              "aspect-[1/1]",
            ];
            return (
              <motion.div
                key={image.src}
                className="relative break-inside-avoid overflow-hidden rounded-[15px] cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.1, ease: EASE }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`${heights[i % heights.length]} overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      hoveredIndex === i ? "scale-110" : "scale-100"
                    }`}
                  />
                </div>
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-[#056BF1]/40 to-transparent transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: hoveredIndex === i ? 1 : 0 }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CLEANSTART INSIDERS — Testimonials
   ═══════════════════════════════════════════════ */

function InsidersSection() {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="text-center mb-14 md:mb-20">
          <motion.h2
            className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#181818] tracking-[-0.95px] leading-[1.1]"
            {...anim(0.1)}
          >
            CleanStart Insiders
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px]">
          {teamTestimonials.map((person, i) => (
            <motion.div
              key={person.name}
              className="relative bg-[#f6f7f9] rounded-[15px] p-8 md:p-10 overflow-hidden transition-all duration-300 group"
              style={{ border: "1px solid rgba(0,0,0,0.04)" }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#056BF1] to-[#06C7F2]" />

              {/* Quote icon */}
              <QuoteIcon className="text-[#056BF1]/10 mb-4" />

              {/* Quote text */}
              <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-[#181818]/70 leading-[1.8] mb-8 italic">
                &ldquo;{person.quote}&rdquo;
              </p>

              {/* Person info */}
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#056BF1] to-[#06C7F2] flex items-center justify-center text-white text-[13px] font-bold font-['Google_Sans',sans-serif] shrink-0">
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#181818]">
                    {person.name}
                  </h3>
                  <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B]">
                    {person.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   HOW WE WORK — Values Strip
   ═══════════════════════════════════════════════ */

function HowWeWorkSection() {
  return (
    <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] overflow-hidden relative">
      {/* Subtle grid overlay */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="values-grid"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#values-grid)" />
      </svg>

      <div className="relative z-10 max-w-[1340px] mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <motion.h2
            className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-white tracking-[-0.95px] leading-[1.1] mb-5"
            {...anim(0.1)}
          >
            How We Work
          </motion.h2>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-white/60 leading-[1.65] max-w-[620px] mx-auto"
            {...anim(0.15)}
          >
            We work the way we build &mdash; with clarity, trust, and continuous
            improvement at every step.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] max-w-[1000px] mx-auto">
          {howWeWorkValues.map((val, i) => (
            <motion.div
              key={val.title}
              className="relative rounded-[15px] p-8 text-center overflow-hidden group"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(12px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mx-auto mb-5 text-white group-hover:bg-white/15 transition-colors duration-300">
                {val.icon}
              </div>
              <h3 className="font-['Google_Sans',sans-serif] text-[18px] font-semibold text-white mb-2">
                {val.title}
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-[14px] text-white/60 leading-[1.7]">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   JOIN THE TEAM CTA
   ═══════════════════════════════════════════════ */

function JoinCtaSection() {
  return (
    <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        <motion.div
          className="relative rounded-[15px] overflow-hidden px-8 md:px-16 py-14 md:py-20 text-center"
          style={{
            background:
              "linear-gradient(135deg, #181818 0%, #1e2a3a 50%, #181818 100%)",
          }}
          {...anim(0)}
        >
          {/* Glow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(5,107,241,0.12) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-[600px] mx-auto">
            <motion.h2
              className="font-['Google_Sans',sans-serif] text-[28px] md:text-[36px] lg:text-[44px] font-semibold text-white tracking-[-0.95px] leading-[1.1] mb-5"
              {...anim(0.1)}
            >
              Join the{" "}
              <span className="text-[#06C7F2]">Team</span>
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[16px] md:text-[17px] text-white/55 leading-[1.7] mb-8"
              {...anim(0.2)}
            >
              Want to be part of the squad? Visit our career page to explore
              open opportunities.
            </motion.p>
            <motion.div {...anim(0.3)}>
              <CallToActionButton label="Explore Careers" variant="dark" size="md" href="/company/careers" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */

export function TeamContent() {
  return (
    <>
      <HeroSection />
      <LeadershipSection />
      <AdvisorySection />
      <HustleSquadSection />
      <InsidersSection />
      <HowWeWorkSection />
      <JoinCtaSection />
    </>
  );
}
