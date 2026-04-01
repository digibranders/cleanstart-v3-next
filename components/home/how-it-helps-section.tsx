"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import svgPaths from "@/lib/svg-data/svg-jxhd3sscvl";
import { CircleArrowCTA } from "@/components/shared/circle-arrow-cta";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ═══════════════════════════════════════════════
   Icons — white stroke on blue/dark bg
   ═══════════════════════════════════════════════ */

function SecurityCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p26be7000} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.p326d4400} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p12ad3580} stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p903ac00} stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p27c54700} stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p3835480} stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p672dc28} stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.20833 12.5H10.4167" stroke="currentColor" strokeWidth="1.2" />
      <path d="M14.5833 12.5H19.7917" stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p30c1aec0} stroke="currentColor" strokeWidth="1.2" />
      <path d={svgPaths.p27f45d80} stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p37d7a200} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M17.7041 7.29167H17.7134" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.pe642d80} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.p2d54ce00} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.pb25fd7} stroke="currentColor" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

type Role = "CISO" | "Developers";

interface FeatureCard {
  icon: React.ReactNode;
  stat: string;
  title: string;
  description: string;
}

const ROLE_DATA: Record<Role, { label: string; subtitle: string; href: string; cards: FeatureCard[] }> = {
  CISO: {
    label: "For CISOs",
    subtitle: "Security leadership & governance",
    href: "/solutions/for-ciso",
    cards: [
      {
        icon: <SecurityCheckIcon />,
        stat: "70%",
        title: "Reduce Security Costs",
        description: "Automated security, real-time scanning, and built-in compliance enable lean, cost-efficient DevSecOps teams.",
      },
      {
        icon: <IntegrationIcon />,
        stat: "24/7",
        title: "Enhanced Security",
        description: "Always-on security with smart threat and vulnerability protection.",
      },
      {
        icon: <DevelopmentIcon />,
        stat: "100%",
        title: "Centralized Visibility",
        description: "Unified dashboard for complete visibility and control over security and compliance.",
      },
    ],
  },
  Developers: {
    label: "For Developers",
    subtitle: "Build fast, ship secure",
    href: "/solutions/for-developers",
    cards: [
      {
        icon: <SecurityCheckIcon />,
        stat: "Zero",
        title: "Enhanced Security",
        description: "Signed, verified images with automated security updates.",
      },
      {
        icon: <IntegrationIcon />,
        stat: "Native",
        title: "Seamless Integration",
        description: "CI/CD pipelines, private repos, and SSO support for complete workflow integration.",
      },
      {
        icon: <DevelopmentIcon />,
        stat: "75%",
        title: "Streamlined Development",
        description: "Speed up deployment with automated compliance and custom-built images.",
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
  const data = ROLE_DATA[activeRole];

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

        {/* ── Two-panel layout: role tabs left + cards right ── */}
        <div className="flex flex-col lg:flex-row gap-5">

          {/* Left: Role selector panels — stretch to match cards height */}
          <div className="flex flex-col gap-4 lg:w-[300px] shrink-0">
            {ROLES.map((role, i) => {
              const isActive = activeRole === role;
              const roleData = ROLE_DATA[role];
              return (
                <motion.div
                  key={role}
                  className="rounded-[15px] p-6 md:p-7 flex flex-col justify-between cursor-pointer relative overflow-hidden flex-1"
                  animate={{
                    background: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.12)",
                    borderColor: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.18)",
                  }}
                  style={{ border: "1.5px solid", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.35, ease: EASE }}
                  onMouseEnter={() => setActiveRole(role)}
                  onClick={() => setActiveRole(role)}
                >
                  <div className="flex flex-col gap-2">
                    <span className={`font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] transition-colors duration-300 ${isActive ? "text-[#0F1924]" : "text-white"}`}>
                      {roleData.label}
                    </span>
                    <p className={`font-['Google_Sans',sans-serif] font-normal text-[14px] leading-relaxed transition-colors duration-300 ${isActive ? "text-[#0F1924]/70" : "text-white/70"}`}>
                      {roleData.subtitle}
                    </p>
                  </div>

                  {/* CTA */}
                  <Link
                    href={roleData.href}
                    className="mt-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <CircleArrowCTA variant={isActive ? "filled-blue" : "filled-white"} size={40} />
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* Right: Feature cards — animate on role change */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`cards-${activeRole}`}
                className="grid grid-cols-1 md:grid-cols-3 gap-5 h-full"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                {data.cards.map((card, i) => (
                  <motion.div
                    key={card.title}
                    className="rounded-[15px] p-6 md:p-7 flex flex-col gap-5 relative overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      border: "1.5px solid rgba(255,255,255,0.18)",
                      backdropFilter: "blur(20px)",
                      WebkitBackdropFilter: "blur(20px)",
                    }}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                  >
                    {/* Icon */}
                    <div className="text-white">
                      {card.icon}
                    </div>

                    {/* Big stat */}
                    <span className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] text-white leading-none tracking-[-0.02em]">
                      {card.stat}
                    </span>

                    {/* Title */}
                    <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-white leading-[1.3]">
                      {card.title}
                    </h3>

                    {/* Description */}
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] text-white/70 leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
