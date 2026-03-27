"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ---- Inline SVG Icons ---- */

function BugIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <ellipse cx="14" cy="16" rx="6" ry="7" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 9C11 7.3 12.3 6 14 6C15.7 6 17 7.3 17 9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 14H8M20 14H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 19L8.5 17.5M23 19L19.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 10L9 12M22 10L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M21 8H7C5.3 8 4 9.3 4 11V13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 5L21 8L18 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 20H21C22.7 20 24 18.7 24 17V15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M10 23L7 20L10 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="11" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 8V14.5L18.5 17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function RocketIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2C12 2 7 7 7 14L5 16L8 19L10 17C17 17 22 12 22 12C22 12 17 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="15" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="5" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 3V7M16 3V7M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ---- Tab data ---- */

const TAB_DATA = [
  {
    id: "images",
    label: "Images",
    title: "Verified Base Images",
    description:
      "Start from a foundation that has been rebuilt from source with zero inherited vulnerabilities. Every image is minimal, deterministic, and ready for production.",
    bullets: [
      "Zero known CVEs at build time",
      "Minimal footprint — only what your app needs",
      "Rebuilt from source, not patched on top",
    ],
  },
  {
    id: "sbom",
    label: "SBOM",
    title: "Complete Software Bill of Materials",
    description:
      "Every CleanStart image ships with a precise, machine-readable SBOM. Know exactly what is in your container — no guessing, no hidden dependencies.",
    bullets: [
      "Accurate component inventory for every image",
      "Machine-readable format for automated tooling",
      "Audit-ready provenance documentation",
    ],
  },
  {
    id: "pipeline",
    label: "Pipeline",
    title: "Drop-In CI/CD Integration",
    description:
      "Replace your base image reference and keep building. CleanStart images work with any registry, any orchestrator, and any build system you already use.",
    bullets: [
      "Compatible with Docker, Podman, and Buildah",
      "Works with GitHub Actions, GitLab CI, Jenkins",
      "No workflow changes required",
    ],
  },
];

/* ---- Problems data ---- */

const PROBLEMS = [
  {
    icon: <BugIcon />,
    title: "Inherited Vulnerabilities",
    description:
      "Public base images ship with hundreds of packages you never asked for — and vulnerabilities you did not introduce.",
  },
  {
    icon: <RepeatIcon />,
    title: "Recurring CVEs",
    description:
      "Patch Tuesday never ends. The same CVEs resurface across rebuilds because the root cause lives upstream in bloated images.",
  },
  {
    icon: <ClockIcon />,
    title: "Security Delays",
    description:
      "Scanning, triaging, and re-patching eat into sprint velocity. Developers spend more time on security debt than features.",
  },
];

/* ---- Benefits data ---- */

const BENEFITS = [
  { icon: <ShieldCheckIcon />, title: "Fewer CVEs", description: "Start with zero known vulnerabilities instead of inheriting hundreds." },
  { icon: <ScanIcon />, title: "Cleaner Scans", description: "Scanners return actionable results, not pages of inherited noise." },
  { icon: <RocketIcon />, title: "Faster Builds", description: "Smaller images pull faster and build quicker across every pipeline stage." },
  { icon: <CalendarIcon />, title: "Predictable Releases", description: "No last-minute CVE fire drills blocking your deployment window." },
];

export function ForDevelopersContent() {
  const [activeTab, setActiveTab] = useState("images");

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
            Build Secure Software Without Slowing Down
          </h1>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed max-w-[560px]">
            Start with verified, vulnerability-free base images. Ship faster with security built in from the foundation.
          </p>
          <CallToActionButton label="Book a Demo" variant="light" size="md" />
        </motion.div>
      </section>

      {/* ===== Section 2 — The Developer Problem ===== */}
      <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              The Developer Problem
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              Most container vulnerabilities are inherited, not introduced. Public base images carry bloated package sets
              that create security debt before you write a single line of code.
            </motion.p>
          </div>

          {/* Problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[25px] hover:border-[#056BF1]/20 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <div className="w-12 h-12 rounded-[12px] bg-[#056BF1]/[0.07] flex items-center justify-center text-[#056BF1] mb-4">
                  {problem.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-2 leading-[1.3]">
                  {problem.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 3 — How CleanStart Helps (Interactive Tabs) ===== */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              How CleanStart Helps
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              Secure images, transparent SBOMs, and zero-friction pipeline integration — everything a developer needs
              to ship without security slowdowns.
            </motion.p>
          </div>

          {/* Tab pills */}
          <motion.div className="flex gap-2 mb-8" {...anim(0.15)}>
            {TAB_DATA.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`font-['Google_Sans',sans-serif] font-normal text-[15px] px-5 py-2.5 rounded-full transition-colors duration-300 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#056BF1] text-white"
                    : "bg-[#ecedef] text-[#181818]/50 hover:text-[#181818]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            {TAB_DATA.filter((t) => t.id === activeTab).map((tab) => (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="bg-[#ecedef] rounded-[15px] p-[25px] md:p-10"
              >
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-3">
                  {tab.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed mb-6 max-w-[640px]">
                  {tab.description}
                </p>
                <ul className="flex flex-col gap-3">
                  {tab.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 mt-0.5">
                        <circle cx="10" cy="10" r="10" fill="#056BF1" fillOpacity="0.1" />
                        <path d="M6.5 10.5L9 13L14 7.5" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818] leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== Section 4 — Developer Benefits (Blue bg) ===== */}
      <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Split header */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-12 mb-10 md:mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.02em] leading-[1.1] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Developer Benefits
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed flex-1 pt-1 lg:pt-3"
              {...anim(0.1)}
            >
              Security that works with your workflow, not against it. Spend less time triaging and more time building.
            </motion.p>
          </div>

          {/* Benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {BENEFITS.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="rounded-[15px] border border-white/[0.15] p-[25px] hover:border-white/30 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <div className="w-10 h-10 rounded-[10px] bg-white/[0.12] flex items-center justify-center text-white mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-white mb-2 leading-[1.3]">
                  {benefit.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/60 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Section 5 — CTA (Gray bg) ===== */}
      <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.div className="flex flex-col items-center text-center gap-6" {...anim()}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1] max-w-[700px]">
              Explore Free Secure Images
            </h2>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed max-w-[520px]">
              Browse the CleanStart image library. Every image is verified, minimal, and ready to drop into your
              pipeline today.
            </p>
            <CallToActionButton label="Browse Images" variant="light" size="md" href="/images" />
          </motion.div>
        </div>
      </section>
    </>
  );
}
