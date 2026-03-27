"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import svgPaths from "@/lib/svg-data/svg-jxhd3sscvl";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

/* ═══════════════════════════════════════════════
   Icons — white stroke on blue/dark bg
   ═══════════════════════════════════════════════ */

function SecurityCheckIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p26be7000} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.p326d4400} stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p12ad3580} stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p903ac00} stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p27c54700} stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p3835480} stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p672dc28} stroke="white" strokeWidth="1.2" />
      <path d="M5.20833 12.5H10.4167" stroke="white" strokeWidth="1.2" />
      <path d="M14.5833 12.5H19.7917" stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p30c1aec0} stroke="white" strokeWidth="1.2" />
      <path d={svgPaths.p27f45d80} stroke="white" strokeWidth="1.2" />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 25 25" fill="none">
      <path d={svgPaths.p37d7a200} stroke="white" strokeLinejoin="round" strokeWidth="1.2" />
      <path d="M17.7041 7.29167H17.7134" stroke="white" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.pe642d80} stroke="white" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.p2d54ce00} stroke="white" strokeLinejoin="round" strokeWidth="1.2" />
      <path d={svgPaths.pb25fd7} stroke="white" strokeLinejoin="round" strokeWidth="1.2" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Data
   ═══════════════════════════════════════════════ */

type Role = "CISO" | "Developers" | "Enterprises";

const ROLES: Role[] = ["CISO", "Developers", "Enterprises"];

interface FeatureCard {
  icon: React.ReactNode;
  stat: string;
  title: string;
  description: string;
}

const ROLE_DATA: Record<Role, { tagline: string; cards: FeatureCard[] }> = {
  CISO: {
    tagline: "",
    cards: [
      {
        icon: <SecurityCheckIcon />,
        stat: "70%",
        title: "Reduce Security Costs by 70%",
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
        title: "Centralized Visibility & Governance",
        description: "Unified dashboard for complete visibility and control over security and compliance.",
      },
    ],
  },
  Developers: {
    tagline: "",
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
  Enterprises: {
    tagline: "",
    cards: [
      {
        icon: <DevelopmentIcon />,
        stat: "75%",
        title: "Boost Efficiency",
        description: "Deploy 75% faster with zero-touch updates and no manual patching.",
      },
      {
        icon: <IntegrationIcon />,
        stat: "FIPS",
        title: "Simplify Compliance",
        description: "Real-time compliance with FIPS, NIST, CIS, SOC 2, and more—plus instant audit-ready reports.",
      },
      {
        icon: <SecurityCheckIcon />,
        stat: "85%",
        title: "Reduce Costs",
        description: "Focus on your business with zero maintenance and 85% faster incident response.",
      },
      {
        icon: <DevelopmentIcon />,
        stat: "98%",
        title: "Transform Your Business",
        description: "Eliminate critical vulnerabilities, speed up updates by 95%, and cut audit prep by 98%.",
      },
      {
        icon: <IntegrationIcon />,
        stat: "360°",
        title: "Comprehensive Governance",
        description: "One dashboard for real-time threats, compliance, and risk metrics.",
      },
      {
        icon: <SecurityCheckIcon />,
        stat: "24/7",
        title: "24/7 Support",
        description: "24/7 expert support with dedicated advisors and seamless implementation.",
      },
    ],
  },
};

/* ═══════════════════════════════════════════════
   Component
   ═══════════════════════════════════════════════ */

export function HowItHelpsSection() {
  const [activeRole, setActiveRole] = useState<Role>("CISO");
  const data = ROLE_DATA[activeRole];

  return (
    <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] overflow-hidden">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-10 md:gap-16">

        {/* ── Header: 30/70 split ── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.1] tracking-[-0.02em] lg:w-[670px] shrink-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            How CleanStart Will Help
          </motion.h2>
        </div>

        {/* ── Role Switcher — frosted glass pill toggle ── */}
        <motion.div
          className="flex items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        >
          <div className="inline-flex items-center rounded-full p-[4px]"
            style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => setActiveRole(role)}
                className={`relative px-6 md:px-8 py-3 rounded-full cursor-pointer transition-all duration-300 ${
                  activeRole === role
                    ? "bg-white/20 backdrop-blur-sm"
                    : "bg-transparent"
                }`}
              >
                <span
                  className={`font-['Google_Sans',sans-serif] font-medium text-[14px] md:text-[15px] whitespace-nowrap transition-colors duration-300 ${
                    activeRole === role ? "text-white" : "text-white/40"
                  }`}
                >
                  {role === "CISO" ? "For CISOs" : role === "Developers" ? "For Developers" : "For Enterprises"}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── Feature Cards — 3 frosted glass cards ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`cards-${activeRole}`}
            className={`grid grid-cols-1 gap-4 md:gap-6 ${data.cards.length > 3 ? "md:grid-cols-3" : "md:grid-cols-3"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            {data.cards.map((card, i) => (
              <motion.div
                key={card.title}
                className="rounded-[20px] p-6 md:p-8 flex flex-col gap-5 relative overflow-hidden group"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(20px)",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                whileHover={{ borderColor: "rgba(255,255,255,0.25)" }}
              >
                {/* Subtle shine on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 50%, rgba(255,255,255,0.02) 100%)",
                  }}
                />

                {/* Icon circle */}
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.15)",
                  }}
                >
                  {card.icon}
                </div>

                {/* Big stat number */}
                <span className="font-['Google_Sans',sans-serif] font-normal text-[40px] md:text-[48px] text-white leading-none tracking-[-0.02em]">
                  {card.stat}
                </span>

                {/* Title */}
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] md:text-[20px] text-white leading-[1.3]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[15px] text-white/50 leading-relaxed">
                  {card.description}
                </p>

                {/* Bottom accent line */}
                <div className="mt-auto pt-4">
                  <div
                    className="h-[2px] rounded-full transition-all duration-500 group-hover:w-full w-[40px]"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
