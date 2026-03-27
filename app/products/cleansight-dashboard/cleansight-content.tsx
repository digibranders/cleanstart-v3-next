"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   Animated Counter Hook
   ═══════════════════════════════════════════════ */

function useCountUp(target: number, decimals = 0, duration = 2000) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!isInView || hasStarted.current) return;
    hasStarted.current = true;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((eased * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, target, decimals, duration]);

  return { value, ref };
}

/* ═══════════════════════════════════════════════
   Custom SVG Icons
   ═══════════════════════════════════════════════ */

function ShadowContainerIcon({ stroke = "#EF4444" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="8" y="8" width="12" height="12" rx="2" stroke={stroke} strokeWidth="2" />
      <rect x="20" y="20" width="12" height="12" rx="2" stroke={stroke} strokeWidth="2" opacity="0.5" />
      <circle cx="34" cy="34" r="1.5" fill={stroke} />
    </svg>
  );
}

function CloudSilosIcon({ stroke = "#EF4444" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <path d="M8 28C6.9 28 6 27.1 6 26V18C6 14.7 8.7 12 12 12C12.3 9.3 14.6 7 17.5 7C19.9 7 22 8.4 23 10.5C23.3 10.5 23.7 10.5 24 10.5C27.3 10.5 30 13.2 30 16.5V26C30 27.1 29.1 28 28 28H8Z" stroke={stroke} strokeWidth="2" />
      <line x1="18" y1="15" x2="18" y2="25" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function ImageContentsIcon({ stroke = "#EF4444" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="6" y="6" width="28" height="28" rx="2" stroke={stroke} strokeWidth="2" />
      <path d="M6 20H34" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
      <path d="M6 14H34" stroke={stroke} strokeWidth="1" opacity="0.3" />
      <path d="M6 26H34" stroke={stroke} strokeWidth="1" opacity="0.3" />
      <circle cx="12" cy="12" r="1.5" fill={stroke} />
    </svg>
  );
}

function AuditComplianceIcon({ stroke = "#EF4444" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="8" y="6" width="14" height="28" rx="1" stroke={stroke} strokeWidth="2" />
      <path d="M22 12L28 12C29.1 12 30 12.9 30 14V34C30 35.1 29.1 36 28 36H22" stroke={stroke} strokeWidth="2" />
      <path d="M12 18H18M12 24H18M12 30H18" stroke={stroke} strokeWidth="1.5" />
      <path d="M24 18L26 20L30 16" stroke={stroke} strokeWidth="1.5" opacity="0.6" />
    </svg>
  );
}

function DiscoveryIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <circle cx="18" cy="18" r="10" stroke={stroke} strokeWidth="2" />
      <path d="M26 26L32 32" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="18" cy="18" r="5" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
      <circle cx="18" cy="18" r="2" fill={stroke} />
    </svg>
  );
}

function SBOMIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="8" y="6" width="10" height="28" rx="1" stroke={stroke} strokeWidth="2" />
      <rect x="22" y="10" width="10" height="24" rx="1" stroke={stroke} strokeWidth="2" />
      <path d="M11 14H15M11 20H15M11 26H15" stroke={stroke} strokeWidth="1.5" />
      <path d="M25 18H33M25 24H33M25 30H33" stroke={stroke} strokeWidth="1.5" />
    </svg>
  );
}

function RiskAssessmentIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <path d="M12 34L20 8L28 34H12Z" stroke={stroke} strokeWidth="2" />
      <circle cx="20" cy="26" r="1.5" fill={stroke} />
      <path d="M20 20V24" stroke={stroke} strokeWidth="1.5" />
      <path d="M8 34H32" stroke={stroke} strokeWidth="1.5" opacity="0.5" />
    </svg>
  );
}

function RemediationIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="8" y="14" width="16" height="14" rx="2" stroke={stroke} strokeWidth="2" />
      <path d="M24 21V22C24 25.3 27 28 30 28C33 28 36 25.3 36 22V21" stroke={stroke} strokeWidth="2" opacity="0.7" />
      <path d="M14 24L18 28L26 20" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VisibilityIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <path d="M4 20C4 20 10 10 20 10C30 10 36 20 36 20C36 20 30 30 20 30C10 30 4 20 4 20Z" stroke={stroke} strokeWidth="2" />
      <circle cx="20" cy="20" r="5" stroke={stroke} strokeWidth="2" />
      <circle cx="20" cy="20" r="2" fill={stroke} />
    </svg>
  );
}

function IntelligenceIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <path d="M20 4C12 4 6 10 6 20C6 30 12 36 20 36C28 36 34 30 34 20C34 10 28 4 20 4Z" stroke={stroke} strokeWidth="2" />
      <path d="M20 14V26M14 20H26" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="20" cy="20" r="3" fill={stroke} opacity="0.3" />
    </svg>
  );
}

function ComplianceIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="8" y="10" width="24" height="20" rx="2" stroke={stroke} strokeWidth="2" />
      <path d="M14 22L18 26L28 14" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8L32 8M8 32L32 32" stroke={stroke} strokeWidth="1" opacity="0.3" />
    </svg>
  );
}

function ReplacementIcon({ stroke = "#056BF1" }: { stroke?: string }) {
  return (
    <svg viewBox="0 0 40 40" width="32" height="32" fill="none">
      <rect x="6" y="10" width="12" height="14" rx="2" stroke={stroke} strokeWidth="2" opacity="0.5" />
      <path d="M22 24L28 18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M28 24L22 18" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="20" width="12" height="14" rx="2" stroke={stroke} strokeWidth="2" />
      <circle cx="28" cy="27" r="2" fill={stroke} />
    </svg>
  );
}

function CheckIcon({ fill = "#06C7F2" }: { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M20 6L9 17L4 12" stroke={fill} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon({ fill = "#EF4444" }: { fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
      <path d="M18 6L6 18M6 6L18 18" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 1: Hero
   ═══════════════════════════════════════════════ */

function HeroSection(): React.ReactElement {
  return (
    <section
      className="relative w-full overflow-hidden pt-[120px] md:pt-[160px] pb-12 md:pb-[100px] px-4 md:px-8 lg:px-[50px]"
      aria-labelledby="hero-heading"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
      }}
    >
      <div className="max-w-[1340px] mx-auto text-center">
        <motion.h1
          id="hero-heading"
          className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          {...anim(0)}
        >
          Continuous Container Visibility
        </motion.h1>
        <motion.p
          className="font-['Google_Sans',sans-serif] text-lg md:text-xl text-white/90 mb-8 max-w-[700px] mx-auto"
          {...anim(0.1)}
        >
          Discover, assess, and remediate container risk with CleanSight.
        </motion.p>
        <motion.div className="flex flex-col sm:flex-row gap-4 justify-center items-center" {...anim(0.2)}>
          <CallToActionButton label="Learn More" href="/resources/resource-center" variant="light" size="md" />
          <CallToActionButton label="Book a Demo" href="/book-demo" variant="dark" size="md" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 2: Problem Cards
   ═══════════════════════════════════════════════ */

function ProblemsSection(): React.ReactElement {
  const problems = [
    {
      icon: <ShadowContainerIcon />,
      title: "Shadow Containers",
      description: "Production containers without security oversight.",
    },
    {
      icon: <CloudSilosIcon />,
      title: "Fragmented Cloud Views",
      description: "AWS, GCP, and Azure operate in silos without unified inventory.",
    },
    {
      icon: <ImageContentsIcon />,
      title: "Unknown Image Contents",
      description: "Teams lack clarity on dependencies, licenses, and vulnerable images.",
    },
    {
      icon: <AuditComplianceIcon />,
      title: "Audit & Compliance Risk",
      description: "Missing inventory and evidence break audit and compliance readiness.",
    },
  ];

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-white"
      aria-labelledby="problems-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...anim(0)}>
            <h2
              id="problems-heading"
              className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-[#181818] mb-2"
            >
              When Container Visibility Falls Short, Risk Grows
            </h2>
          </motion.div>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-lg text-gray-600 self-end"
            {...anim(0.1)}
          >
            And remediation falls even further behind.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {problems.map((problem, idx) => (
            <motion.article
              key={idx}
              className="p-6 rounded-[15px] border border-gray-200 hover:border-red-200 transition-colors bg-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="mb-4 w-fit">{problem.icon}</div>
              <h3 className="font-['Google_Sans',sans-serif] text-xl font-bold text-[#181818] mb-2">
                {problem.title}
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-gray-600">{problem.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 3: Bridge / Transition
   ═══════════════════════════════════════════════ */

function BridgeSection(): React.ReactElement {
  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-gray-50"
      aria-labelledby="bridge-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <motion.div className="text-center" {...anim(0)}>
          <h2
            id="bridge-heading"
            className="font-['Google_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#181818] mb-6"
          >
            See how CleanSight discovers containers, analyzes risk, and maps each to secure CleanStart
            alternatives.
          </h2>
          <p className="font-['Google_Sans',sans-serif] text-lg text-gray-600 max-w-[800px] mx-auto">
            CleanSight closes the gap between finding container risk and fixing it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 4: Four Steps
   ═══════════════════════════════════════════════ */

function StepsSection(): React.ReactElement {
  const steps = [
    {
      number: 1,
      icon: <DiscoveryIcon />,
      title: "Automated Discovery",
      description: "Find every container image across cloud accounts, registries, and clusters.",
    },
    {
      number: 2,
      icon: <SBOMIcon />,
      title: "Enterprise SBOM Generation",
      description: "SPDX 3.0 SBOMs with full dependency mapping and vulnerability correlation.",
    },
    {
      number: 3,
      icon: <RiskAssessmentIcon />,
      title: "Risk & Compliance Assessment",
      description: "Exploitability-aware risk scoring with compliance framework mapping.",
    },
    {
      number: 4,
      icon: <RemediationIcon />,
      title: "One-Click Remediation",
      description: "Instant mapping to secure CleanStart images with compatibility scoring.",
    },
  ];

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
      style={{ backgroundColor: "#056BF1" }}
      aria-labelledby="steps-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...anim(0)}>
            <h2
              id="steps-heading"
              className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-white mb-2"
            >
              Four Steps to Secure Containers
            </h2>
          </motion.div>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-lg text-white/90 self-end"
            {...anim(0.1)}
          >
            From discovery to remediation, CleanSight automates your entire container security workflow.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {steps.map((step, idx) => (
            <motion.article
              key={idx}
              className="p-8 rounded-[15px] backdrop-blur-sm border border-white/20 bg-white/5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 flex-shrink-0">
                  <span className="text-white font-bold">{step.number}</span>
                </div>
                <div className="text-white/80">{step.icon}</div>
              </div>
              <h3 className="font-['Google_Sans',sans-serif] text-xl font-bold text-white mb-2">
                {step.title}
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-white/80">{step.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 5: Advantage Cards
   ═══════════════════════════════════════════════ */

function AdvantageSection(): React.ReactElement {
  const advantages = [
    {
      icon: <VisibilityIcon />,
      title: "Complete Visibility",
      description: "Single pane of glass for AWS, GCP, and Azure containers.",
    },
    {
      icon: <IntelligenceIcon />,
      title: "Actionable Intelligence",
      description: "Prioritized risk instead of endless CVE lists.",
    },
    {
      icon: <ComplianceIcon />,
      title: "Built-In Compliance",
      description: "Out-of-the-box mapping to NIST, FedRAMP, STIG, FIPS, SOC 2, PCI DSS.",
    },
    {
      icon: <ReplacementIcon />,
      title: "Secure Replacement Images",
      description: "Every vulnerable image matched to a hardened CleanStart alternative.",
    },
  ];

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-white"
      aria-labelledby="advantage-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <motion.div {...anim(0)}>
            <h2
              id="advantage-heading"
              className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-[#181818] mb-2"
            >
              The CleanSight Advantage
            </h2>
          </motion.div>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-lg text-gray-600 self-end"
            {...anim(0.1)}
          >
            From visibility to remediation, CleanSight turns container security data into action.
          </motion.p>
        </div>

        <motion.div
          className="grid md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          {advantages.map((adv, idx) => (
            <motion.article
              key={idx}
              className="p-8 rounded-[15px] border border-gray-200 bg-white transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="mb-4 w-fit">{adv.icon}</div>
              <h3 className="font-['Google_Sans',sans-serif] text-xl font-bold text-[#181818] mb-2">
                {adv.title}
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-gray-600">{adv.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 6: Comparison
   ═══════════════════════════════════════════════ */

function ComparisonSection(): React.ReactElement {
  const comparisons = [
    { scanner: "Find vulnerable images", cleansight: "Find vulnerable images" },
    { scanner: "Produce CVE lists", cleansight: "Maps secure replacements" },
    { scanner: "Require manual fixes", cleansight: "Enables one-click remediation" },
  ];

  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px] bg-gray-100"
      aria-labelledby="comparison-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <motion.div className="text-center mb-12" {...anim(0)}>
          <h2
            id="comparison-heading"
            className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-[#181818] mb-4"
          >
            Vulnerability Scanners vs CleanSight
          </h2>
          <p className="font-['Google_Sans',sans-serif] text-lg text-gray-600">
            Why discovery alone isn't enough.
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
        >
          {/* Left Column: Vulnerability Scanners */}
          <motion.div
            className="p-8 rounded-[15px] bg-white border border-gray-200"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-['Google_Sans',sans-serif] text-2xl font-bold text-[#181818] mb-6">
              Vulnerability Scanners
            </h3>
            <ul className="space-y-4">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <XIcon />
                  </div>
                  <span className="font-['Google_Sans',sans-serif] text-gray-700">{item.scanner}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column: CleanSight */}
          <motion.div
            className="p-8 rounded-[15px] bg-white border border-gray-200"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-['Google_Sans',sans-serif] text-2xl font-bold text-[#056BF1] mb-6">
              CleanSight
            </h3>
            <ul className="space-y-4">
              {comparisons.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    <CheckIcon />
                  </div>
                  <span className="font-['Google_Sans',sans-serif] text-gray-700">
                    {item.cleansight}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 7: Stats
   ═══════════════════════════════════════════════ */

function StatsSection(): React.ReactElement {
  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
      style={{ backgroundColor: "#056BF1" }}
      aria-labelledby="stats-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <motion.h2
          id="stats-heading"
          className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-white text-center mb-12"
          {...anim(0)}
        >
          Proven Outcomes
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, staggerChildren: 0.1 }}
        >
          <motion.article
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div className="font-['Google_Sans',sans-serif] text-5xl md:text-6xl font-bold text-white mb-2">
              <span ref={useCountUp(24).ref}>{useCountUp(24).value}</span>h
            </div>
            <p className="font-['Google_Sans',sans-serif] text-white/80">Time to remediate</p>
          </motion.article>

          <motion.article
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="font-['Google_Sans',sans-serif] text-5xl md:text-6xl font-bold text-white mb-2">
              <span ref={useCountUp(99).ref}>{useCountUp(99).value}</span>%
            </div>
            <p className="font-['Google_Sans',sans-serif] text-white/80">Remediation coverage</p>
          </motion.article>

          <motion.article
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="font-['Google_Sans',sans-serif] text-5xl md:text-6xl font-bold text-white mb-2">
              <span ref={useCountUp(95).ref}>{useCountUp(95).value}</span>%
            </div>
            <p className="font-['Google_Sans',sans-serif] text-white/80">CVE reduction</p>
          </motion.article>

          <motion.article
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="font-['Google_Sans',sans-serif] text-5xl md:text-6xl font-bold text-white mb-2">
              100%
            </div>
            <p className="font-['Google_Sans',sans-serif] text-white/80">Compliance ready</p>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SECTION 8: Bottom CTA
   ═══════════════════════════════════════════════ */

function BottomCtaSection(): React.ReactElement {
  return (
    <section
      className="w-full px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
      style={{
        background: "linear-gradient(135deg, #030E1F 0%, #0A2A5E 100%)",
      }}
      aria-labelledby="bottom-cta-heading"
    >
      <div className="max-w-[1340px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...anim(0)}>
            <h2
              id="bottom-cta-heading"
              className="font-['Google_Sans',sans-serif] text-4xl md:text-5xl font-bold text-white mb-4"
            >
              See Everything. Fix Everything.
            </h2>
            <p className="font-['Google_Sans',sans-serif] text-lg text-white/80 mb-8">
              From discovery to secure production in minutes. Don't settle for static scans or
              fragmented inventories.
            </p>
            <motion.div {...anim(0.1)}>
              <CallToActionButton label="Book a Demo" href="/book-demo" variant="light" size="md" />
            </motion.div>
          </motion.div>

          <motion.div
            className="hidden lg:block relative h-[400px] rounded-[15px] overflow-hidden bg-white/5 border border-white/10"
            {...anim(0.2)}
          >
            {/* Decorative gradient shapes */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-400 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-300 rounded-full blur-3xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   Main Component
   ═══════════════════════════════════════════════ */

export function CleansightContent(): React.ReactElement {
  return (
    <>
      <HeroSection />
      <ProblemsSection />
      <BridgeSection />
      <StepsSection />
      <AdvantageSection />
      <ComparisonSection />
      <StatsSection />
      <BottomCtaSection />
    </>
  );
}
