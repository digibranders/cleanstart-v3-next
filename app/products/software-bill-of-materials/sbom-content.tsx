"use client";

import { motion, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   SVG Icons for Pipeline Steps
   ═══════════════════════════════════════════════ */

function PlatformIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.rect
        x="4" y="8" width="32" height="24" rx="3"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0, ease: EASE }}
      />
      <motion.line x1="20" y1="8" x2="20" y2="32" stroke={color} strokeWidth="1.5" strokeOpacity="0.4"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }} />
      <motion.line x1="4" y1="18" x2="36" y2="18" stroke={color} strokeWidth="1.5" strokeOpacity="0.4"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }} />
    </svg>
  );
}

function RepositoryIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M8 12L8 32C8 34.2 9.8 36 12 36L36 36"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0, ease: EASE }}
      />
      <motion.rect x="12" y="6" width="20" height="14" rx="2"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }} />
    </svg>
  );
}

function PullIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M6 20L20 6L34 20"
        fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0, ease: EASE }}
      />
      <motion.line x1="20" y1="16" x2="20" y2="34" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }} />
    </svg>
  );
}

function PrivateRepoIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.rect x="6" y="14" width="28" height="20" rx="3"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0, ease: EASE }}
      />
      <motion.path d="M14 14V10C14 8.9 14.9 8 16 8H24C25.1 8 26 8.9 26 10V14"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }} />
    </svg>
  );
}

function ProductionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path d="M6 22C6 18.7 8.7 16 12 16H28C31.3 16 34 18.7 34 22"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0, ease: EASE }}
      />
      <motion.path d="M12 22V28H28V22"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Problem & Solution Icons
   ═══════════════════════════════════════════════ */

function ProblemIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 40" width="24" height="24">
      <motion.circle cx="20" cy="20" r="16"
        fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <motion.line x1="20" y1="12" x2="20" y2="20" stroke={color} strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }} />
      <motion.circle cx="20" cy="28" r="1.5" fill={color}
        initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 0.5 }} />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Export Function
   ═══════════════════════════════════════════════ */

export function SbomContent(): React.ReactElement {
  const [activeStep, setActiveStep] = useState(0);

  const pipelineSteps = [
    {
      title: "CleanStart Platform",
      subtitle: "Triam's CleanStart platform is at the core.",
      description: "Custom image building, subscription management, image signing verification, support and documentation.",
      icon: PlatformIcon,
    },
    {
      title: "Repository Populated",
      subtitle: "The CleanStart system prepares everything.",
      description: "Container images, libraries, and packages — all stored in a CleanStart repository, fully secured and hardened.",
      icon: RepositoryIcon,
    },
    {
      title: "Pull Clean Images",
      subtitle: "Your team pulls verified base images directly.",
      description: "Builds on top of clean, pre-secured containers. No CVEs, no junk — just a secure starting point.",
      icon: PullIcon,
    },
    {
      title: "Private Repository",
      subtitle: "Integrated into your own infrastructure.",
      description: "These images are integrated into your own private repository, fully under your control. Great for scaling across teams or projects.",
      icon: PrivateRepoIcon,
    },
    {
      title: "Push to Production",
      subtitle: "Your custom containers are ready.",
      description: "Repackaged and pushed to production — secure, verified, and ready to deploy at scale.",
      icon: ProductionIcon,
    },
  ];

  return (
    <div className="w-full">
      {/* ═════════════════════════════════════════════════════
          SECTION 1: Pipeline (Dark Theme)
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] pt-[120px] md:pt-[160px] pb-12 md:pb-[100px]"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
        aria-labelledby="pipeline-section"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-start">
            {/* Tabs (Left) */}
            <div className="flex flex-col gap-3">
              {pipelineSteps.map((step, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className="text-left px-4 py-3 rounded-[15px] transition-all duration-300"
                  style={{
                    background:
                      activeStep === idx
                        ? "#056BF1"
                        : "rgba(255,255,255,0.08)",
                    border:
                      activeStep === idx
                        ? "1px solid #056BF1"
                        : "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      activeStep === idx
                        ? "0 8px 32px rgba(5, 107, 241, 0.25)"
                        : "none",
                  }}
                  {...anim(idx * 0.1)}
                >
                  <div
                    className={`text-sm font-semibold font-['Google_Sans',sans-serif] transition-colors ${
                      activeStep === idx ? "text-white" : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div
                    className={`text-xs font-['Google_Sans',sans-serif] mt-1 transition-colors ${
                      activeStep === idx
                        ? "text-blue-100"
                        : "text-gray-400"
                    }`}
                  >
                    {step.subtitle}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Detail Panel (Right) */}
            <div className="h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="bg-gradient-to-br from-white/[0.08] to-white/[0.03] border border-white/[0.12] rounded-[15px] p-6 md:p-8"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/[0.08]">
                      {pipelineSteps[activeStep].icon({ color: "#06C7F2" })}
                    </div>
                    <div>
                      <h4 className="text-xl md:text-2xl font-bold text-white font-['Google_Sans',sans-serif]">
                        {pipelineSteps[activeStep].title}
                      </h4>
                      <p className="text-sm text-gray-300 font-['Google_Sans',sans-serif] mt-1">
                        {pipelineSteps[activeStep].subtitle}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed font-['Google_Sans',sans-serif]">
                    {pipelineSteps[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 2: Hero
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-gradient-to-br from-blue-50 to-blue-100"
        aria-labelledby="sbom-hero"
      >
        <div className="max-w-[1340px] mx-auto text-center">
          <motion.h2
            id="sbom-hero"
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-4"
            {...anim(0)}
          >
            Software Bill of Materials
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-700 font-['Google_Sans',sans-serif] mb-8 max-w-2xl mx-auto"
            {...anim(0.1)}
          >
            Know What You Ship. Verify Every Component.
          </motion.p>
          <motion.div {...anim(0.2)}>
            <CallToActionButton
              label="Learn More"
              variant="light"
              href="/resources/resource-center"
            />
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 3: Two Components
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-white"
        aria-labelledby="components-section"
      >
        <div className="max-w-[1340px] mx-auto">
          <motion.h3
            id="components-section"
            className="text-lg md:text-xl text-gray-600 font-['Google_Sans',sans-serif] mb-8 text-center"
            {...anim(0)}
          >
            CleanStart Solution includes two main components
          </motion.h3>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Portal Card */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-[15px] p-6 md:p-8"
              {...anim(0.1)}
            >
              <h4 className="text-2xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-3">
                CleanStart Portal
              </h4>
              <p className="text-gray-700 font-['Google_Sans',sans-serif] leading-relaxed">
                It allows customers manage subscriptions, check usage, request custom images, verify signatures, and contact support.
              </p>
            </motion.div>

            {/* Repository Card */}
            <motion.div
              className="bg-gradient-to-br from-cyan-50 to-cyan-100 border border-cyan-200 rounded-[15px] p-6 md:p-8"
              {...anim(0.2)}
            >
              <h4 className="text-2xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-3">
                CleanStart Repository
              </h4>
              <p className="text-gray-700 font-['Google_Sans',sans-serif] leading-relaxed">
                It offers clean, vulnerability-free container and virtual machine images. Customers may choose access to public or private repositories.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 4: Problems & Solutions
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-gray-50"
        aria-labelledby="problems-solutions-section"
      >
        <div className="max-w-[1340px] mx-auto">
          {/* Problems */}
          <div className="mb-16 md:mb-20">
            <motion.h3
              id="problems-solutions-section"
              className="text-3xl md:text-4xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-12"
              {...anim(0)}
            >
              When SBOMs Fall Short, Risk Grows
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Incomplete Insight",
                  description: "NOASSERTION fields indicate missing supplier, license, or timestamp details, leaving critical risks undetected.",
                },
                {
                  title: "Broken Traceability",
                  description: "Without commit-level provenance, teams cannot verify authenticity or trace vulnerabilities to their source.",
                },
                {
                  title: "Stale Data",
                  description: "Manually generated SBOMs become outdated within days, missing version drift and new dependency exposures.",
                },
                {
                  title: "Compliance Risk",
                  description: "Incomplete or unsigned SBOMs fail to meet mandates such as EO 14028, EU CRA, and RBI/DORA.",
                },
              ].map((problem, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white border-2 border-red-200 rounded-[15px] p-6 hover:border-red-300 transition-colors"
                  {...anim(0.1 + idx * 0.05)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                      <ProblemIcon color="#EF4444" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 font-['Google_Sans',sans-serif]">
                      {problem.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 text-sm font-['Google_Sans',sans-serif] leading-relaxed">
                    {problem.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solutions */}
          <div>
            <motion.div className="mb-12" {...anim(0.5)}>
              <h3 className="text-3xl md:text-4xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-3">
                Self-Updating, Self-Verifying SBOMs
              </h3>
              <p className="text-gray-600 text-lg font-['Google_Sans',sans-serif] max-w-2xl">
                Automated SBOM creation with cryptographic signing and continuous validation in CI/CD ensures accuracy at every deployment.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  number: "01",
                  title: "Automated SBOMs",
                  description: "Every build automatically creates a complete SBOM with all direct and transitive dependencies.",
                },
                {
                  number: "02",
                  title: "Verified Provenance",
                  description: "Each SBOM includes commit IDs and timestamps to verify the authenticity of every component.",
                },
                {
                  number: "03",
                  title: "Open Standards",
                  description: "Supports SPDX and CycloneDX formats for compatibility with vulnerability and license management tools.",
                },
                {
                  number: "04",
                  title: "Continuous Validation",
                  description: "Automated rebuilds and checks keep SBOMs current, accurate, and always audit-ready for every deployment.",
                },
              ].map((solution, idx) => (
                <motion.div
                  key={idx}
                  className="bg-white border border-blue-100 rounded-[15px] p-6 hover:border-blue-300 transition-colors"
                  {...anim(0.55 + idx * 0.05)}
                >
                  <div className="text-sm font-bold text-blue-600 font-['Google_Sans',sans-serif] mb-2">
                    {solution.number}
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-3">
                    {solution.title}
                  </h4>
                  <p className="text-gray-600 text-sm font-['Google_Sans',sans-serif] leading-relaxed">
                    {solution.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 5: From Paperwork to Proof
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        style={{ background: "#056BF1" }}
        aria-labelledby="impact-section"
      >
        <div className="max-w-[1340px] mx-auto">
          <motion.div className="text-center mb-12" {...anim(0)}>
            <h3
              id="impact-section"
              className="text-3xl md:text-4xl font-bold text-white font-['Google_Sans',sans-serif] mb-3"
            >
              From Paperwork to Proof
            </h3>
            <p className="text-white/90 text-lg font-['Google_Sans',sans-serif] max-w-2xl mx-auto">
              CleanStart SBOM turns visibility into measurable value for security, compliance, and business operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Faster Audits",
                description: "Cut audit preparation from weeks to hours with continuously verified SBOMs.",
              },
              {
                title: "Smaller Attack Surface",
                description: "Compliance built in for EO 14028, EU CRA, and RBI/DORA.",
              },
              {
                title: "No Prioritization Needed",
                description: "Avoid up to $14.8M in manual audit and remediation expenses through automation.",
              },
              {
                title: "Continuous Protection",
                description: "Identify vulnerable components in seconds with commit-level traceability.",
              },
            ].map((metric, idx) => (
              <motion.div
                key={idx}
                className="bg-white/[0.15] border border-white/[0.25] rounded-[15px] p-6 backdrop-blur-sm"
                {...anim(0.1 + idx * 0.1)}
              >
                <h4 className="text-lg font-bold text-white font-['Google_Sans',sans-serif] mb-3">
                  {metric.title}
                </h4>
                <p className="text-white/80 text-sm font-['Google_Sans',sans-serif] leading-relaxed">
                  {metric.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 6: The CleanStart SBOM Advantage
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-white"
        aria-labelledby="advantage-section"
      >
        <div className="max-w-[1340px] mx-auto">
          <motion.div className="mb-12" {...anim(0)}>
            <h3
              id="advantage-section"
              className="text-3xl md:text-4xl font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-3"
            >
              The CleanStart SBOM Advantage
            </h3>
            <p className="text-gray-600 text-lg font-['Google_Sans',sans-serif] max-w-2xl">
              From data completeness to compliance automation, CleanStart turns SBOMs into actionable intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Complete Coverage",
                bullets: [
                  "99.2% field completeness with enriched metadata",
                  "Transitive and shared dependency mapping across all ecosystems",
                  "Scales to 5,000+ containers per hour",
                ],
              },
              {
                title: "Provenance & Integrity",
                bullets: [
                  "Commit-level tracking with build timestamps",
                  "Cryptographic signing for every SBOM and image",
                  "Immutable records prevent tampering or drift",
                ],
              },
              {
                title: "Continuous Compliance",
                bullets: [
                  "Native alignment with FIPS 140-3, SLSA Level 4, and RBI/DORA",
                  "Automatic evidence collection for EO 14028 and EU CRA audits",
                  "Always-current audit trails and no manual updates",
                ],
              },
              {
                title: "Unified Visibility",
                bullets: [
                  "Central dashboard for developers, security, and compliance teams",
                  "Exports in SPDX, CycloneDX, and JSON formats",
                  "Integration with CI/CD pipelines and vulnerability management tools",
                ],
              },
            ].map((pillar, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-[15px] p-6"
                {...anim(0.1 + idx * 0.1)}
              >
                <h4 className="text-lg font-bold text-gray-900 font-['Google_Sans',sans-serif] mb-4">
                  {pillar.title}
                </h4>
                <ul className="space-y-3">
                  {pillar.bullets.map((bullet, bulletIdx) => (
                    <li
                      key={bulletIdx}
                      className="flex items-start gap-3 text-sm text-gray-700 font-['Google_Sans',sans-serif]"
                    >
                      <span className="text-blue-600 font-bold mt-0.5">✓</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════
          SECTION 7: Bottom CTA
          ═════════════════════════════════════════════════════ */}
      <section
        className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        style={{
          background: "linear-gradient(135deg, #030E1F 0%, #0A2A5E 100%)",
        }}
        aria-labelledby="bottom-cta-section"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-16 items-center">
            {/* Left: Title */}
            <motion.div {...anim(0)}>
              <h2
                id="bottom-cta-section"
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-['Google_Sans',sans-serif]"
              >
                See Everything. Trust Every Component.
              </h2>
            </motion.div>

            {/* Right: Description + CTA */}
            <motion.div {...anim(0.1)}>
              <p className="text-white/80 text-base md:text-lg font-['Google_Sans',sans-serif] mb-8 leading-relaxed">
                Don&apos;t settle for static or incomplete SBOMs. CleanStart delivers continuous visibility, verified provenance, and audit-ready evidence.
              </p>
              <CallToActionButton
                label="Contact Us"
                variant="light"
                href="/company/contact"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
