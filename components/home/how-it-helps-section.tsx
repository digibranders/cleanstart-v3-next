"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import svgPaths from "@/lib/svg-data/svg-jxhd3sscvl";
import { CircleArrowCTA } from "@/components/shared/circle-arrow-cta";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const AUTO_SWITCH_INTERVAL = 5000;

/* ═══════════════════════════════════════════════
   Icons
   ═══════════════════════════════════════════════ */

function ShieldCheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p26be7000} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p326d4400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p12ad3580} stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p903ac00} stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p27c54700} stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p3835480} stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p672dc28} stroke="currentColor" strokeWidth="1.5" />
      <path d="M5.20833 12.5H10.4167" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.5833 12.5H19.7917" stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p30c1aec0} stroke="currentColor" strokeWidth="1.5" />
      <path d={svgPaths.p27f45d80} stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p37d7a200} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d="M17.7041 7.29167H17.7134" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.pe642d80} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.p2d54ce00} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
      <path d={svgPaths.pb25fd7} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

type Role = "CISO" | "Developers";

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface RoleData {
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  href: string;
  ctaLabel: string;
  cards: FeatureCard[];
}

const ROLE_DATA: Record<Role, RoleData> = {
  CISO: {
    label: "For CISOs",
    heroTitle: "Security leadership that scales",
    heroSubtitle: "Automated compliance, real-time visibility, and governance tools designed for security leaders managing container infrastructure at scale.",
    href: "/solutions/for-ciso",
    ctaLabel: "Explore for CISOs",
    cards: [
      {
        icon: <ShieldCheckIcon />,
        title: "Reduce Security Costs",
        description: "Automated security, real-time scanning, and built-in compliance enable lean, cost-efficient DevSecOps teams.",
      },
      {
        icon: <IntegrationIcon />,
        title: "24/7 Enhanced Security",
        description: "Always-on security with smart threat detection and vulnerability protection across your entire container fleet.",
      },
      {
        icon: <DevelopmentIcon />,
        title: "Centralized Visibility",
        description: "Unified dashboard for complete visibility and control over security posture and compliance status.",
      },
    ],
  },
  Developers: {
    label: "For Developers",
    heroTitle: "Build fast, ship secure",
    heroSubtitle: "Pre-hardened images, seamless CI/CD integration, and zero-config security so you can focus on writing code, not fixing vulnerabilities.",
    href: "/solutions/for-developers",
    ctaLabel: "Explore for Developers",
    cards: [
      {
        icon: <ShieldCheckIcon />,
        title: "Zero-Day Protection",
        description: "Signed, verified images with automated security updates — no manual patching required.",
      },
      {
        icon: <IntegrationIcon />,
        title: "Seamless Integration",
        description: "CI/CD pipelines, private repos, and SSO support for complete workflow integration.",
      },
      {
        icon: <DevelopmentIcon />,
        title: "Streamlined Development",
        description: "Speed up deployment with automated compliance and custom-built minimal images.",
      },
    ],
  },
};

const ROLES: Role[] = ["CISO", "Developers"];

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */

export function HowItHelpsSection() {
  const [activeRole, setActiveRole] = useState<Role>("CISO");
  const [isPaused, setIsPaused] = useState(false);
  const data = ROLE_DATA[activeRole];

  const switchRole = useCallback(() => {
    setActiveRole((prev) => (prev === "CISO" ? "Developers" : "CISO"));
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(switchRole, AUTO_SWITCH_INTERVAL);
    return () => clearInterval(timer);
  }, [isPaused, switchRole]);

  return (
    <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] overflow-hidden">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-10 md:gap-14">

        {/* ── Header — split: title left, description right ── */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.1] tracking-[-0.02em] lg:w-[35%] shrink-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            How CleanStart Will Help
          </motion.h2>
          <motion.p
            className="flex-1 lg:pl-8 font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/70 leading-relaxed max-w-[480px]"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          >
            Tailored solutions for every role in your organization — from security leaders to engineering teams.
          </motion.p>
        </div>

        {/* ── Main layout: Hero left + 2x2 grid right ── */}
        <div
          className="flex flex-col lg:flex-row gap-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >

          {/* Left: Hero card */}
          <a
            href={data.href}
            className="lg:w-[42%] shrink-0 rounded-[20px] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden cursor-pointer group block no-underline"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            {/* Decorative gradient orb */}
            <div
              className="absolute bottom-0 right-0 w-[70%] h-[60%] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at 80% 90%, rgba(5,107,241,0.08) 0%, rgba(6,199,242,0.04) 40%, transparent 70%)",
              }}
            />

            {/* Role tabs */}
            <div className="flex gap-2 mb-8 relative z-10">
              {ROLES.map((role) => {
                const isActive = activeRole === role;
                return (
                  <button
                    key={role}
                    onClick={(e) => { e.preventDefault(); setActiveRole(role); }}
                    className={`px-4 py-2 rounded-full text-[13px] font-['Google_Sans',sans-serif] font-medium transition-all duration-300 ${
                      isActive
                        ? "bg-[#056BF1] text-white"
                        : "bg-[#F0F1F3] text-[#0F1924]/60 hover:bg-[#E8E9EC] hover:text-[#0F1924]"
                    }`}
                  >
                    {ROLE_DATA[role].label}
                  </button>
                );
              })}
            </div>

            {/* Content — smooth crossfade, no layout shift */}
            <div className="flex flex-col gap-4 relative z-10 flex-1 justify-center">
              <motion.div
                key={`hero-content-${activeRole}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="flex flex-col gap-4"
              >
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[42px] text-[#0F1924] leading-[1.1] tracking-[-0.02em]">
                  {data.heroTitle}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[15px] text-[#0F1924]/50 leading-relaxed max-w-[400px]">
                  {data.heroSubtitle}
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <div className="relative z-10 mt-8 flex items-center gap-3">
              <span className="font-['Google_Sans',sans-serif] font-medium text-[14px] text-[#0F1924]">
                {data.ctaLabel}
              </span>
              <CircleArrowCTA variant="filled-blue" size={36} />
            </div>
          </a>

          {/* Right: Feature grid */}
          <div className="flex-1 min-w-0">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 h-full rounded-[20px] overflow-hidden"
              style={{
                border: "1px solid rgba(0,0,0,0.06)",
                background: "#F4F5F7",
              }}
            >
                {data.cards.map((card, i) => (
                  <motion.div
                    key={`${activeRole}-${card.title}`}
                    className="p-6 md:p-7 flex flex-col gap-4 relative"
                    style={{
                      borderRight: i < 2 ? "1px solid rgba(0,0,0,0.06)" : "none",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  >
                    {/* Icon */}
                    <div className="text-[#056BF1]">
                      {card.icon}
                    </div>

                    {/* Title */}
                    <h4 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#0F1924] leading-[1.3]">
                      {card.title}
                    </h4>

                    {/* Description */}
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] text-[#0F1924]/50 leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
