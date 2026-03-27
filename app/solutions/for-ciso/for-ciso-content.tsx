"use client";

import { motion } from "motion/react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ---- Inline SVG Icons ---- */

function EyeOffIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M4 14C4 14 7.5 7 14 7C20.5 7 24 14 24 14C24 14 20.5 21 14 21C7.5 21 4 14 4 14Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 23L23 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function FingerprintIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 5C9.6 5 6 8.6 6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M22 13C22 8.6 18.4 5 14 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M9 13C9 10.2 11.2 8 14 8C16.8 8 19 10.2 19 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 11V21" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M11 16C11 16 11 20 14 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FileWarningIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M8 4H18L23 9V23C23 24.1 22.1 25 21 25H8C6.9 25 6 24.1 6 23V6C6 4.9 6.9 4 8 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M18 4V9H23" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="13" x2="14" y2="18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="14" cy="21" r="1" fill="currentColor" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L4 7V13C4 19 7.6 23 12 24C16.4 23 20 19 20 13V7L12 3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 12.5L11 15L16 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 11V7C8 4.8 9.8 3 12 3C14.2 3 16 4.8 16 7V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ScanIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 7V5C3 3.9 3.9 3 5 3H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M17 3H19C20.1 3 21 3.9 21 5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M21 17V19C21 20.1 20.1 21 19 21H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 21H5C3.9 21 3 20.1 3 19V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 12L10.5 14.5L16 9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="4" width="14" height="17" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 2H15V4C15 4.6 14.6 5 14 5H10C9.4 5 9 4.6 9 4V2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12H15M9 15H13" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M13 2L4 14H12L11 22L20 10H12L13 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3L2 8L12 13L22 8L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 16L12 21L22 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---- Data ---- */

const CHALLENGES = [
  {
    icon: <EyeOffIcon />,
    title: "Build Blindness",
    description:
      "You cannot defend what you cannot see. Most organizations lack visibility into the components embedded in their container base images.",
  },
  {
    icon: <FingerprintIcon />,
    title: "Provenance Gap",
    description:
      "When regulators ask where your software came from, tracing lineage back through layers of public images is nearly impossible.",
  },
  {
    icon: <FileWarningIcon />,
    title: "Compliance Burden",
    description:
      "Proving security posture across hundreds of containers manually is costly, error-prone, and does not scale.",
  },
];

const OUTCOMES = [
  { icon: <ShieldCheckIcon />, title: "Reduce Exposure", description: "Eliminate inherited vulnerabilities before they enter production environments." },
  { icon: <LockIcon />, title: "Strengthen Integrity", description: "Every image is built from verified source with cryptographic attestation." },
  { icon: <ScanIcon />, title: "Eliminate Blind Spots", description: "Complete SBOMs for every image give you full visibility into your software supply chain." },
  { icon: <ClipboardIcon />, title: "Prove Compliance", description: "Audit-ready documentation and verifiable provenance for every deployed container." },
  { icon: <ZapIcon />, title: "Accelerate Response", description: "When a zero-day hits, know immediately which images are affected and act in minutes." },
  { icon: <LayersIcon />, title: "Cut Tool Sprawl", description: "Replace fragmented scanning and patching workflows with a single trusted source of images." },
];

const REGULATED_FEATURES = [
  {
    icon: <ClipboardIcon />,
    title: "Proof for Auditors",
    description: "Cryptographic attestation and full provenance chains satisfy SOC 2, FedRAMP, and ISO 27001 requirements out of the box.",
  },
  {
    icon: <TargetIcon />,
    title: "Zero-Day Containment",
    description: "Minimal images mean a smaller blast radius. When vulnerabilities emerge, fewer components are exposed.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Policy Enforcement",
    description: "Enforce image sourcing policies across teams. Only approved, verified base images enter your pipeline.",
  },
];

export function ForCISOContent() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-[100px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)",
        }}
      >
        <motion.div
          className="max-w-[1340px] mx-auto flex flex-col items-center text-center gap-6 relative z-10"
          {...anim()}
        >
          <h1 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[56px] text-white tracking-[-0.02em] leading-[1.1] max-w-[800px]">
            Prove What Your Software Is Built On
          </h1>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed max-w-[560px]">
            Security, compliance, and traceability you can defend in any audit or board review.
          </p>
          <CallToActionButton label="Book a Demo" variant="light" size="md" />
        </motion.div>
      </section>

      {/* ===== Section 2 — The CISO Challenge ===== */}
      <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              The CISO Challenge
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              Container adoption outpaces security visibility. The foundation your teams build on is often opaque,
              unverified, and impossible to audit at scale.
            </motion.p>
          </div>

          {/* Challenge cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CHALLENGES.map((challenge, i) => (
              <motion.div
                key={challenge.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[25px] hover:border-[#056BF1]/20 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#056BF1]/[0.07] flex items-center justify-center text-[#056BF1] mb-4">
                  {challenge.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-2 leading-[1.3]">
                  {challenge.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed">
                  {challenge.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3 — Enterprise Outcomes ===== */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Enterprise Outcomes
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              CleanStart delivers measurable security improvements across your container infrastructure — from
              vulnerability reduction to audit readiness.
            </motion.p>
          </div>

          {/* Outcome cards — 2x3 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OUTCOMES.map((outcome, i) => (
              <motion.div
                key={outcome.title}
                className="rounded-[15px] border border-[#ecedef] p-[25px] hover:border-[#056BF1]/20 transition-colors duration-300"
                {...anim(i * 0.06)}
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#056BF1]/[0.07] flex items-center justify-center text-[#056BF1] mb-4">
                  {outcome.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-2 leading-[1.3]">
                  {outcome.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed">
                  {outcome.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 4 — For Regulated Environments (Blue bg) ===== */}
      <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              For Regulated Environments
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              Built for organizations where compliance is not optional. CleanStart provides the evidence trail
              regulators and auditors demand.
            </motion.p>
          </div>

          {/* Feature items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REGULATED_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="rounded-[15px] border border-white/[0.15] p-[25px] hover:border-white/30 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <div className="w-10 h-10 rounded-[10px] bg-white/[0.12] flex items-center justify-center text-white mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-white mb-2 leading-[1.3]">
                  {feature.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 5 — CTA with stat (Gray bg) ===== */}
      <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.div className="flex flex-col items-center text-center gap-6" {...anim()}>
            <div className="font-['Google_Sans',sans-serif] font-normal text-[48px] md:text-[64px] text-[#056BF1] tracking-[-0.02em] leading-none">
              10/10
            </div>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed max-w-[480px]">
              Regulators mandate verifiable evidence of software provenance. CleanStart delivers it for every image,
              every build, every deployment.
            </p>
            <CallToActionButton label="Book a Demo" variant="light" size="md" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
