"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];
const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ── Section 1: Hero ── */
function HeroSection(): React.ReactElement {
  return (
    <section
      className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-[100px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
      style={{ backgroundImage: "linear-gradient(180deg, rgb(3,22,48) 0%, rgb(6,107,241) 40%, rgb(6,199,242) 70%, rgb(205,245,254) 100%)" }}
    >
      <motion.div className="max-w-[1340px] mx-auto flex flex-col items-center text-center gap-6 relative z-10" {...anim()}>
        <h1 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[56px] leading-[1.1] text-white max-w-[900px]">
          Enhancing SCA effectiveness with CleanStart
        </h1>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/70 max-w-[700px] leading-relaxed">
          CleanStart images create a powerful synergy with SCA tools, reducing noise and improving security effectiveness.
        </p>
        <CallToActionButton label="Get Started" variant="light" size="md" href="/company/contact" />
      </motion.div>
    </section>
  );
}

/* ── Section 2: Challenges with Traditional SCA ── */
function ChallengesSection(): React.ReactElement {
  const alertVolumeBullets = [
    "89% of alerts relate to base image vulnerabilities",
    "Security teams overwhelmed by findings",
    "High false-positive rates",
    "Delayed deployment cycles",
  ];

  const resourceImpactBullets = [
    "30% of developer time spent on vulnerability fixes",
    "Multiple security review cycles",
    "Constant remediation efforts",
    "Delayed releases",
  ];

  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="challenges-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.div className="mb-3" {...anim()}>
          <span className="font-['Google_Sans',sans-serif] text-[13px] md:text-[14px] text-[#056BF1] font-medium uppercase tracking-wide">
            The Current SCA Landscape
          </span>
        </motion.div>

        <motion.h2
          id="challenges-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] max-w-[670px] mb-12 md:mb-16"
          {...anim(0.05)}
        >
          Challenges with Traditional SCA
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Alert Volume */}
          <motion.article className="flex flex-col" {...anim(0.1)}>
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-[#181818] mb-6">
              Alert Volume
            </h3>
            <ul className="space-y-4">
              {alertVolumeBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#056BF1] mt-2 shrink-0" />
                  <span className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-[#181818]/70 leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>

          {/* Resource Impact */}
          <motion.article className="flex flex-col" {...anim(0.15)}>
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-[#181818] mb-6">
              Resource Impact
            </h3>
            <ul className="space-y-4">
              {resourceImpactBullets.map((bullet, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#056BF1] mt-2 shrink-0" />
                  <span className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-[#181818]/70 leading-relaxed">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ── Section 3: How CleanStart Complements SCA Tools ── */
function ComplementsSection(): React.ReactElement {
  return (
    <section className="bg-[#f5f5f5] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="complements-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.h2
          id="complements-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] leading-[1.2] text-[#181818] max-w-[900px]"
          {...anim()}
        >
          How CleanStart Complements SCA Tools
        </motion.h2>
        <motion.p
          className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-[#181818]/60 max-w-[800px] mt-6 leading-relaxed"
          {...anim(0.1)}
        >
          By starting with verified, zero-vulnerability base images, CleanStart reduces alert noise and enables your SCA tools to focus on what matters: application-level vulnerabilities and custom code risks. This partnership transforms SCA from a source of overwhelm into a precision security mechanism.
        </motion.p>
      </div>
    </section>
  );
}

/* ── Section 4: Visual Comparison ── */
interface ComparisonMetric {
  label: string;
  traditional: string;
  cleanstart: string;
}

const COMPARISON_METRICS: ComparisonMetric[] = [
  { label: "Vulnerabilities Found", traditional: "247", cleanstart: "0" },
  { label: "Critical/High Severity", traditional: "126", cleanstart: "All Low" },
  { label: "Image Size", traditional: "1.2 GB", cleanstart: "300 MB" },
  { label: "Security Validation", traditional: "No Security Validation", cleanstart: "Continuous Security" },
];

function ComparisonSection(): React.ReactElement {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="comparison-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.h2
          id="comparison-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] mb-12 md:mb-16"
          {...anim()}
        >
          Enhance Your Security Processes with Refined Alerts and Improving Review Speed and Accuracy
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Standard Image */}
          <motion.article
            className="rounded-[15px] border border-[#ecedef] p-8 md:p-10 bg-[#fef2f2]/20"
            {...anim(0.1)}
          >
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-[#181818] mb-8">
              Standard Image
            </h3>
            <div className="space-y-6">
              {COMPARISON_METRICS.map((metric) => (
                <div key={metric.label}>
                  <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818]/50 mb-2">
                    {metric.label}
                  </p>
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] text-[#181818]">
                    {metric.traditional}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>

          {/* CleanStart Image */}
          <motion.article
            className="rounded-[15px] border border-[#056BF1]/20 p-8 md:p-10 bg-[#f0f7ff]/30"
            {...anim(0.15)}
          >
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-[#181818] mb-8">
              CleanStart Image
            </h3>
            <div className="space-y-6">
              {COMPARISON_METRICS.map((metric) => (
                <div key={metric.label}>
                  <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818]/50 mb-2">
                    {metric.label}
                  </p>
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] text-[#056BF1]">
                    {metric.cleanstart}
                  </p>
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

/* ── Section 5: CleanStart + SCA Integration Pipeline ── */
interface PipelineStep {
  id: string;
  title: string;
  description: string;
}

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "clean-base",
    title: "Clean Base",
    description: "Zero-vulnerability CleanStart Image",
  },
  {
    id: "build",
    title: "Build",
    description: "Application build process",
  },
  {
    id: "sca-scan",
    title: "SCA Scan",
    description: "Focused application scanning",
  },
  {
    id: "deploy",
    title: "Deploy",
    description: "Rapid secure development",
  },
];

function PipelineSection(): React.ReactElement {
  return (
    <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="pipeline-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.div className="mb-3" {...anim()}>
          <span className="font-['Google_Sans',sans-serif] text-[13px] md:text-[14px] text-white font-medium uppercase tracking-wide opacity-80">
            Enhanced Security Workflow
          </span>
        </motion.div>

        <motion.h2
          id="pipeline-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-white max-w-[670px] mb-12 md:mb-16"
          {...anim(0.05)}
        >
          CleanStart + SCA Integration
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
          {PIPELINE_STEPS.map((step, i) => (
            <motion.article key={step.id} className="relative" {...anim(i * 0.08)}>
              <div className="rounded-[15px] border border-white/20 p-6 md:p-8 bg-white/10 backdrop-blur-sm">
                <div className="w-[48px] h-[48px] rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <span className="font-['Google_Sans',sans-serif] font-normal text-[18px] text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[18px] md:text-[20px] text-white mb-2">
                  {step.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>

              {i < PIPELINE_STEPS.length - 1 && (
                <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M11 5l3 3-3 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 6: Measurable Outcomes ── */
interface OutcomeCard {
  title: string;
  points: string[];
}

const OUTCOMES: OutcomeCard[] = [
  {
    title: "Security Impact",
    points: [
      "90% reduction in vulnerability alerts",
      "Zero base image vulnerabilities",
      "Focused security findings",
      "Faster remediation cycles",
    ],
  },
  {
    title: "Operational Benefits",
    points: [
      "75% faster security reviews",
      "85% reduction in false positives",
      "Streamlined deployment process",
      "Improved developer productivity",
    ],
  },
  {
    title: "Business Value",
    points: [
      "Faster time to market",
      "Reduced security costs",
      "Improved compliance",
      "Better resource utilization",
    ],
  },
];

function OutcomesSection(): React.ReactElement {
  return (
    <section className="bg-[#f5f5f5] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="outcomes-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.h2
          id="outcomes-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] mb-12 md:mb-16"
          {...anim()}
        >
          Measurable Outcomes
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {OUTCOMES.map((outcome, i) => (
            <motion.article
              key={outcome.title}
              className="rounded-[15px] border border-[#ecedef] p-8 bg-white"
              {...anim(i * 0.1)}
            >
              <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-6">
                {outcome.title}
              </h3>
              <ul className="space-y-4">
                {outcome.points.map((point, j) => (
                  <li key={j} className="flex gap-3 items-start">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#056BF1] mt-2 shrink-0" />
                    <span className="font-['Google_Sans',sans-serif] text-[15px] text-[#181818]/70 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Section 7: Integration Scenarios ── */
interface IntegrationScenario {
  id: string;
  name: string;
  toolFocuses: string[];
  cleanstartProvides: string[];
}

const INTEGRATION_SCENARIOS: IntegrationScenario[] = [
  {
    id: "snyk",
    name: "Snyk Integration",
    toolFocuses: ["Application dependencies", "Custom code scanning", "License compliance", "Security policies"],
    cleanstartProvides: ["Clean base images", "Zero vulnerability foundation", "SBOM integration", "Automated updates"],
  },
  {
    id: "checkmarx",
    name: "Checkmarx Integration",
    toolFocuses: ["SAST analysis", "Custom code review", "Application security", "Development guidance"],
    cleanstartProvides: ["Base image security", "Container Hardening", "Compliance baseline", "Runtime protection"],
  },
  {
    id: "synopsys",
    name: "Synopsys Integration",
    toolFocuses: ["Code analysis", "Open source scanning", "Policy enforcement", "Risk assessment"],
    cleanstartProvides: ["Secure infrastructure", "Verified base images", "Compliance automation", "Supply chain security"],
  },
];

function IntegrationScenariosSection(): React.ReactElement {
  const [activeTab, setActiveTab] = useState("snyk");
  const activeScenario = INTEGRATION_SCENARIOS.find((s) => s.id === activeTab);

  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="integration-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.div className="mb-3" {...anim()}>
          <span className="font-['Google_Sans',sans-serif] text-[13px] md:text-[14px] text-[#056BF1] font-medium uppercase tracking-wide">
            Tool Integration
          </span>
        </motion.div>

        <motion.h2
          id="integration-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] max-w-[670px] mb-12 md:mb-16"
          {...anim(0.05)}
        >
          Integration Scenarios
        </motion.h2>

        {/* Tab buttons */}
        <motion.div className="flex flex-wrap gap-3 mb-10 md:mb-12" {...anim(0.1)}>
          {INTEGRATION_SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => setActiveTab(scenario.id)}
              className={`px-6 py-3 rounded-[10px] font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] font-medium transition-all duration-300 ${
                activeTab === scenario.id
                  ? "bg-[#056BF1] text-white"
                  : "bg-[#f5f5f5] text-[#181818] hover:bg-[#ecedef]"
              }`}
            >
              {scenario.name.split(" ")[0]}
            </button>
          ))}
        </motion.div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeScenario && (
            <motion.article
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="grid md:grid-cols-2 gap-8 lg:gap-12"
            >
              {/* Tool Focuses */}
              <div className="rounded-[15px] border border-[#ecedef] p-8 bg-[#f9f9f9]">
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] text-[#181818] mb-6">
                  {activeScenario.name.split(" ")[0]} Focuses On
                </h3>
                <ul className="space-y-4">
                  {activeScenario.toolFocuses.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#181818]/20 mt-2 shrink-0" />
                      <span className="font-['Google_Sans',sans-serif] text-[15px] text-[#181818]/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CleanStart Provides */}
              <div className="rounded-[15px] border border-[#056BF1]/20 p-8 bg-[#f0f7ff]/30">
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] text-[#181818] mb-6">
                  CleanStart Provides
                </h3>
                <ul className="space-y-4">
                  {activeScenario.cleanstartProvides.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#056BF1] mt-2 shrink-0" />
                      <span className="font-['Google_Sans',sans-serif] text-[15px] text-[#181818]/70">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ── Section 8: Bottom CTA Comparison ── */
function CtaComparisonSection(): React.ReactElement {
  return (
    <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]" aria-labelledby="cta-comparison-heading">
      <div className="max-w-[1340px] mx-auto">
        <motion.h2
          id="cta-comparison-heading"
          className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[44px] leading-[1.2] text-white text-center max-w-[900px] mx-auto mb-12 md:mb-16"
          {...anim()}
        >
          Experience the difference with CleanStart
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* With SCA Only */}
          <motion.article
            className="rounded-[15px] border border-white/20 p-8 md:p-10 bg-white/10 backdrop-blur-sm"
            {...anim(0.1)}
          >
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-white mb-8">
              With SCA
            </h3>
            <ul className="space-y-6">
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Vulnerabilities</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-white">
                  200+
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Review Cycle</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-white">
                  3 weeks
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">False Positives</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-white">
                  40%
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Deployments</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-white">
                  Delayed
                </p>
              </li>
            </ul>
          </motion.article>

          {/* With SCA + CleanStart */}
          <motion.article
            className="rounded-[15px] border border-[#06C7F2]/40 p-8 md:p-10 bg-[#06C7F2]/10"
            {...anim(0.15)}
          >
            <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[24px] text-white mb-8">
              With SCA + CleanStart
            </h3>
            <ul className="space-y-6">
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Vulnerabilities</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-[#06C7F2]">
                  0
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Review Cycle</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-[#06C7F2]">
                  2 days
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">False Positives</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-[#06C7F2]">
                  &lt;5%
                </p>
              </li>
              <li>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-white/70 mb-2">Deployments</p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[32px] text-[#06C7F2]">
                  Same-day
                </p>
              </li>
            </ul>
          </motion.article>
        </div>

        <motion.div className="flex justify-center" {...anim(0.2)}>
          <CallToActionButton label="Get Started" variant="light" size="lg" href="/company/contact" />
        </motion.div>
      </div>
    </section>
  );
}

export function ScaContent(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <ComplementsSection />
      <ComparisonSection />
      <PipelineSection />
      <OutcomesSection />
      <IntegrationScenariosSection />
      <CtaComparisonSection />
    </>
  );
}
