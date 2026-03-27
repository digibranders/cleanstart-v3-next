"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   SECTION 1 — HOW IT WORKS: 5-Step Pipeline
   ═══════════════════════════════════════════════ */

const PIPELINE_STEPS = [
  {
    num: "01",
    title: "CleanStart Platform",
    subtitle: "Triam's CleanStart platform is at the core.",
    desc: "Custom image building, subscription management, image signing verification, support and documentation.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="white" strokeWidth="1.8" />
        <path d="M10 14H18M14 10V18" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Repository Populated",
    subtitle: "The CleanStart system prepares everything.",
    desc: "Container images, libraries, and packages — all stored in a CleanStart repository, fully secured and hardened.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 8L14 4L24 8V20L14 24L4 20V8Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 8L14 12M14 12L24 8M14 12V24" stroke="white" strokeWidth="1.2" strokeOpacity="0.5" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Pull Clean Images",
    subtitle: "Your team pulls verified base images directly.",
    desc: "Builds on top of clean, pre-secured containers. No CVEs, no junk — just a secure starting point.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4V18M14 18L9 13M14 18L19 13" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 20V22C4 23.1 4.9 24 6 24H22C23.1 24 24 23.1 24 22V20" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Private Repository",
    subtitle: "Integrated into your own infrastructure.",
    desc: "These images are integrated into your own private repository, fully under your control. Great for scaling across teams or projects.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="7" y="13" width="14" height="10" rx="2" stroke="white" strokeWidth="1.8" />
        <path d="M10 13V9C10 6.8 11.8 5 14 5C16.2 5 18 6.8 18 9V13" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="14" cy="18" r="1.5" fill="white" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Push to Production",
    subtitle: "Your custom containers are ready.",
    desc: "Repackaged and pushed to production — secure, verified, and ready to deploy at scale.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M4 14L12 22L24 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════
   SECTION 3 — PUBLIC IMAGES ARE BLOATED (Problems)
   ═══════════════════════════════════════════════ */

const PROBLEMS = [
  {
    title: "Inherited Vulnerabilities",
    desc: "Risk exists before application code is added. Public base images carry hundreds of known CVEs from day one.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Too Many Components",
    desc: "Public images include shells, package managers, debug tools, and libraries most workloads never use.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21" stroke="#EF4444" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Oversized SBOMs",
    desc: "More components to track, justify, and audit. Bloated SBOMs create unnecessary operational burden.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15M9 5C9 6.10457 9.89543 7 11 7H13C14.1046 7 15 6.10457 15 5M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5M9 12H15M9 16H12" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Constant Patching",
    desc: "The same base issues reappear release after release, draining engineering cycles with no end in sight.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M4 4V9H9M20 20V15H15M4 9C5.5 5.5 8.5 3 12 3C16.5 3 20.2 6.2 20.8 10.5M20 15C18.5 18.5 15.5 21 12 21C7.5 21 3.8 17.8 3.2 13.5" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════
   SECTION 4 — THE CLEANSTART APPROACH (Solutions)
   ═══════════════════════════════════════════════ */

const SOLUTIONS = [
  {
    title: "Minimal Foundations",
    desc: "Only required components are included in every image. Every package justifies its presence.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" stroke="#056BF1" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M12 12L20 7.5M12 12L4 7.5M12 12V21" stroke="#056BF1" strokeWidth="1" strokeOpacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Unnecessary Components Excluded",
    desc: "Shells, package managers, and unused tools are removed at build time, not disabled after deployment.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#056BF1" strokeWidth="1.8" />
        <path d="M9 9L15 15M15 9L9 15" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Deterministic Builds",
    desc: "Images are built consistently from trusted sources with full provenance tracking and reproducibility.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="#056BF1" strokeWidth="1.8" />
        <path d="M8 12L11 15L16 9" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Secure Defaults Applied",
    desc: "Hardened configurations are enforced at the image layer — non-root users, read-only filesystems, minimal capabilities.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 3L4 7V12C4 17 7.5 21.4 12 22.5C16.5 21.4 20 17 20 12V7L12 3Z" stroke="#056BF1" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M9 12L11 14L15 10" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════
   SECTION 5 — WHAT THIS DELIVERS (Benefits)
   ═══════════════════════════════════════════════ */

const DELIVERS = [
  { value: "80%", title: "Reduced Vulnerability Exposure", desc: "Fewer exploitable components exist at image pull time." },
  { value: "70%", title: "Smaller CVE Backlog", desc: "Less recurring remediation across builds and releases." },
  { value: "5x", title: "Focused SBOMs", desc: "Only meaningful components to track and defend." },
  { value: "60%", title: "Lower Operational Load", desc: "Less scanning, patching, and rework for teams." },
];

/* ═══════════════════════════════════════════════
   SECTION 6 — BUILT FOR MODERN PRODUCTION ENVIRONMENTS
   ═══════════════════════════════════════════════ */

const ENVIRONMENTS = [
  {
    title: "Kubernetes Platforms",
    desc: "Production clusters running containerized workloads. Optimized for fast scheduling, minimal resource consumption, and secure pod execution.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="#056BF1" strokeWidth="1.8" />
        <path d="M14 4V24M4 14H24" stroke="#056BF1" strokeWidth="1" strokeOpacity="0.3" />
        <path d="M14 10L17 14L14 18L11 14Z" stroke="#056BF1" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Regulated Environments",
    desc: "Workloads with compliance and audit requirements. Meet FIPS, FedRAMP, DISA STIG, and SOC 2 standards by construction.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4L5 9V14.5C5 20 8.4 24.5 14 26C19.6 24.5 23 20 23 14.5V9L14 4Z" stroke="#056BF1" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M10 14L13 17L18 11" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Security-Focused Teams",
    desc: "Teams prioritizing prevention over remediation. Fewer alerts, smaller backlogs, and cleaner audit trails from day one.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="10" r="4" stroke="#056BF1" strokeWidth="1.8" />
        <path d="M6 24C6 20 9.6 17 14 17C18.4 17 22 20 22 24" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════════════════
   SECTION 7 — FITS INTO WHAT YOU'VE ALREADY BUILT
   ═══════════════════════════════════════════════ */

const INTEGRATIONS = [
  { num: "01", title: "Drop-In Images", desc: "Replace public base images without changing workflows, Dockerfiles, or deployment scripts." },
  { num: "02", title: "Pipeline Compatible", desc: "Works with existing CI/CD and registries — GitHub Actions, GitLab CI, Jenkins, and all major platforms." },
  { num: "03", title: "Deploy Anywhere", desc: "Supports Kubernetes, EKS, GKE, AKS, OpenShift, and any OCI-compliant container runtime." },
];

/* ═══════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════ */

export function AttackSurfaceContent(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          HERO — BIGGER IMAGES, BIGGER RISK
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-0 px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)' }}
      >
        <motion.div className="max-w-[1340px] mx-auto flex flex-col items-center text-center gap-6 relative z-10 pb-16 md:pb-[100px]" {...anim()}>
          <h1
            className="font-['Google_Sans',sans-serif] font-normal text-[36px] md:text-[48px] lg:text-[60px] leading-[1.08] text-white max-w-[800px]"
          >
            Bigger Images, Bigger Risk
          </h1>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] md:text-[18px] text-white/70 max-w-[620px] leading-relaxed">
            CleanStart Images reduce attack surface by eliminating unnecessary components before they enter production.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <CallToActionButton label="Explore CleanStart Images" variant="light" size="md" href="https://images.cleanstart.com/" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 1 — HOW IT WORKS (5-Step Pipeline)
          ═══════════════════════════════════════════════════════ */}
      <section
        className="relative py-12 md:py-[100px] px-4 md:px-8 lg:px-[50px] overflow-hidden bg-white"
        aria-labelledby="how-it-works-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="how-it-works-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[52px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              How It Works
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              From platform to production in five steps. Every image is built, verified, and hardened before your team touches it.
            </motion.p>
          </div>

          {/* Interactive pipeline */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Step selector */}
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible lg:w-[300px] shrink-0 pb-2 lg:pb-0" aria-label="Pipeline steps">
              {PIPELINE_STEPS.map((step, i) => (
                <motion.button
                  key={step.num}
                  onClick={() => setActiveStep(i)}
                  aria-pressed={activeStep === i}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-[14px] text-left shrink-0 cursor-pointer transition-all duration-300 border ${
                    activeStep === i
                      ? "bg-[#056BF1] border-[#056BF1] text-white"
                      : "bg-[#f6f7f9] border-[#ecedef] text-[#181818]/70 hover:bg-[#ecedef] hover:border-[#181818]/10"
                  }`}
                  {...anim(i * 0.06)}
                >
                  <span className={`font-['Google_Sans',sans-serif] font-normal text-[13px] tabular-nums ${activeStep === i ? "text-white/60" : "text-[#181818]/25"}`}>
                    {step.num}
                  </span>
                  <span className="font-['Google_Sans',sans-serif] font-medium text-[14px] whitespace-nowrap">
                    {step.title}
                  </span>
                </motion.button>
              ))}
            </nav>

            {/* Step detail panel */}
            <div className="flex-1 min-h-[280px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="rounded-[18px] border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm p-8 md:p-10 flex flex-col gap-6 h-full"
                >
                  <div className="w-14 h-14 rounded-[14px] bg-[#056BF1] flex items-center justify-center">
                    {PIPELINE_STEPS[activeStep].icon}
                  </div>
                  <div>
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] text-[#056BF1] uppercase tracking-wider mb-2">
                      Step {PIPELINE_STEPS[activeStep].num}
                    </p>
                    <h3 className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[30px] text-white mb-2">
                      {PIPELINE_STEPS[activeStep].title}
                    </h3>
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/40 mb-4">
                      {PIPELINE_STEPS[activeStep].subtitle}
                    </p>
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed max-w-[540px]">
                      {PIPELINE_STEPS[activeStep].desc}
                    </p>
                  </div>
                  {/* Progress indicators */}
                  <div className="flex gap-2 mt-auto pt-4" role="tablist" aria-label="Step progress">
                    {PIPELINE_STEPS.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveStep(i)}
                        aria-label={`Go to step ${i + 1}`}
                        aria-selected={i === activeStep}
                        role="tab"
                        className={`h-[3px] rounded-full transition-all duration-300 cursor-pointer ${
                          i === activeStep ? "w-8 bg-[#056BF1]" : "w-3 bg-white/15 hover:bg-white/25"
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 removed — hero moved to top */}

      {/* ═══════════════════════════════════════════════════════
          SECTION 3 — PUBLIC IMAGES ARE BLOATED (The Problem)
          4 problem cards on light background
          ═══════════════════════════════════════════════════════ */}
      <section
        className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="bloated-images-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="bloated-images-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Public Images Are Bloated
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              Every unnecessary component in a container image is an opportunity for attackers. Most public base images ship with far more than your workload needs.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROBLEMS.map((item, i) => (
              <motion.article
                key={item.title}
                className="rounded-[15px] border border-[#ecedef] p-[25px] hover:border-red-200 transition-colors duration-300 group"
                {...anim(i * 0.06)}
              >
                <div className="w-10 h-10 rounded-[10px] bg-red-50 flex items-center justify-center mb-5 group-hover:bg-red-100 transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] md:text-[20px] text-[#181818] mb-2">
                  {item.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-[#181818]/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 4 — THE CLEANSTART APPROACH (The Solution)
          4 solution cards on light-blue background
          ═══════════════════════════════════════════════════════ */}
      <section
        className="bg-[#F0F9FF] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="cleanstart-approach-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="cleanstart-approach-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              The CleanStart Approach
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              Instead of patching bloated images, CleanStart builds from the ground up — including only what your workload actually requires.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOLUTIONS.map((item, i) => (
              <motion.article
                key={item.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[25px] hover:border-[#056BF1]/20 transition-colors duration-300 group"
                {...anim(i * 0.06)}
              >
                <div className="w-10 h-10 rounded-[10px] bg-[#056BF1]/[0.07] flex items-center justify-center mb-5 group-hover:bg-[#056BF1]/[0.12] transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] md:text-[20px] text-[#181818] mb-2">
                  {item.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-[#181818]/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 5 — WHAT THIS DELIVERS (Impact Metrics)
          Blue background, 4 stat cards
          ═══════════════════════════════════════════════════════ */}
      <section
        className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="delivers-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="delivers-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-white lg:w-[670px] shrink-0"
              {...anim()}
            >
              What This Delivers
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              Measurable improvements across security, operations, and compliance — from day one.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {DELIVERS.map((stat, i) => (
              <motion.article
                key={stat.title}
                className="rounded-[15px] border border-white/10 bg-white/[0.05] p-[25px] flex flex-col gap-3 hover:bg-white/[0.08] transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <span className="font-['Google_Sans',sans-serif] font-normal text-[36px] md:text-[48px] text-white leading-none">
                  {stat.value}
                </span>
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[15px] md:text-[16px] text-white">
                  {stat.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] md:text-[14px] text-white/50 leading-relaxed">
                  {stat.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 6 — BUILT FOR MODERN PRODUCTION ENVIRONMENTS
          Light gray background, 3 cards
          ═══════════════════════════════════════════════════════ */}
      <section
        className="bg-[#F4F5F6] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="environments-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="environments-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Built for Modern Production Environments
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              Purpose-built for the platforms, compliance frameworks, and security postures your teams rely on every day.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {ENVIRONMENTS.map((env, i) => (
              <motion.article
                key={env.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[30px] hover:border-[#056BF1]/20 transition-all duration-300"
                {...anim(i * 0.1)}
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#056BF1]/[0.07] flex items-center justify-center mb-5">
                  {env.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[20px] text-[#181818] mb-2">
                  {env.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] text-[#181818]/50 leading-relaxed">
                  {env.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 7 — FITS INTO WHAT YOU'VE ALREADY BUILT
          White background, 3 numbered integration steps
          ═══════════════════════════════════════════════════════ */}
      <section
        className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="integration-heading"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="integration-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Fits Into What You Have Already Built
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              No rip-and-replace. CleanStart integrates with your existing tools and workflows.
            </motion.p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {INTEGRATIONS.map((item, i) => (
              <motion.article
                key={item.title}
                className="rounded-[15px] border border-[#ecedef] p-[30px] hover:border-[#056BF1]/20 transition-all duration-300"
                {...anim(i * 0.1)}
              >
                <span className="font-['Google_Sans',sans-serif] font-normal text-[40px] text-[#056BF1]/15 leading-none block mb-3">
                  {item.num}
                </span>
                <h3 className="font-['Google_Sans',sans-serif] font-medium text-[20px] text-[#181818] mb-2">
                  {item.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] text-[#181818]/50 leading-relaxed">
                  {item.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          SECTION 8 — BOTTOM CTA
          Reduce Attack Surface at the Foundation
          ═══════════════════════════════════════════════════════ */}
      <section
        className="px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="bottom-cta-heading"
        style={{ background: "linear-gradient(135deg, #030E1F 0%, #0A2A5E 100%)" }}
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-12">
            <motion.h2
              id="bottom-cta-heading"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-white lg:w-[670px] shrink-0"
              {...anim()}
            >
              Reduce Attack Surface at the Foundation
            </motion.h2>
            <motion.div className="flex-1 flex flex-col gap-5" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/50 leading-relaxed">
                Start with container images designed to include only what matters. Browse and pull secure images directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CallToActionButton label="Explore CleanStart Images" variant="light" size="md" href="https://images.cleanstart.com/" />
                <CallToActionButton label="Talk to a Security Expert" variant="dark" size="md" href="/company/contact" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
