'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ── Inline SVG Icons ── */

function ValidatedCryptoIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="8" y="8" width="24" height="24" rx="2" stroke="#056BF1" strokeWidth="1.5" fill="none" />
      <path d="M14 20l4 4 8-8" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CentralizedManagementIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="12" r="3" stroke="#056BF1" strokeWidth="1.5" fill="none" />
      <path d="M20 15v10M12 28h16v2H12z" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 25l8-8 8 8" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SecureBootIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 6l-10 4v8c0 10 8 14 10 14s10-4 10-14v-8l-10-4z" stroke="#056BF1" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 20l4 4 8-8" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DocumentationIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="10" y="6" width="20" height="28" rx="2" stroke="#056BF1" strokeWidth="1.5" fill="none" />
      <path d="M14 14h12M14 20h12M14 26h8" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ContinuousMonitoringIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="10" stroke="#056BF1" strokeWidth="1.5" fill="none" />
      <path d="M20 14v6l4 4" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M28 20c0 4.4-3.6 8-8 8s-8-3.6-8-8" stroke="#056BF1" strokeWidth="1.2" strokeDasharray="4" fill="none" />
    </svg>
  );
}

/* ── Data ── */

const CAPABILITY_CARDS = [
  {
    icon: <ValidatedCryptoIcon />,
    title: 'Validated Cryptographic Modules',
    desc: 'Ensures encryption functions are correctly designed, tested, and verified for secure use.',
  },
  {
    icon: <CentralizedManagementIcon />,
    title: 'Centralized Cryptographic Management',
    desc: 'Ensures encryption functions are correctly designed, tested, and verified for compliance.',
  },
  {
    icon: <SecureBootIcon />,
    title: 'Validated Secure Boot Process',
    desc: 'Requires traceable documentation and structured reporting for compliance evaluations and review.',
  },
  {
    icon: <DocumentationIcon />,
    title: 'Automated Compliance Documentation',
    desc: 'Enforces uniform cryptographic configuration across versions, systems, and deployment environments.',
  },
  {
    icon: <ContinuousMonitoringIcon />,
    title: 'Continuous Compliance Monitoring',
    desc: 'Helps maintain certification status over time and ensures compliance does not degrade silently.',
  },
];

const MATURITY_STAGES = [
  {
    id: 'foundation',
    label: 'Foundation',
    title: 'Foundation',
    desc: 'Defines the cryptographic boundary and deterministic build prerequisites.',
    learnMoreHref: '/resources/embedding-fips-140-2-compliance-at-the-foundation',
  },
  {
    id: 'implementation',
    label: 'Implementation Controls',
    title: 'Implementation Controls',
    desc: 'Enforces approved algorithms, modules, and key management by design.',
    learnMoreHref: '/resources/fips-compliance',
  },
  {
    id: 'validation',
    label: 'Validation & Evidence',
    title: 'Validation & Evidence',
    desc: 'Proves cryptographic correctness through automated testing and evidence.',
    learnMoreHref: '/resources/fips-140-3-and-the-quantum-imperative',
  },
  {
    id: 'continuous',
    label: 'Continuous Compliance',
    title: 'Continuous Compliance',
    desc: 'Sustains control and validation across every build with drift detection.',
    learnMoreHref: '/resources/fips-traces',
  },
];

const USE_CASES = [
  {
    title: 'Government, Defense & Public Sector',
    desc: 'Supports cryptographic validation required for Authority to Operate (ATO) processes and NIST-aligned frameworks.',
  },
  {
    title: 'Financial Services & FinTech',
    desc: 'Meets PCI DSS 4.0 encryption mandates & streamlines compliance audits with validated, evidence-ready images.',
  },
  {
    title: 'Healthcare & Life Sciences',
    desc: 'Aligns with HIPAA and NIST SP 800-53 guidance for secure handling of sensitive data across workloads.',
  },
  {
    title: 'Enterprise Security Teams',
    desc: 'Eliminates cryptographic drift by enforcing validated, monitored images at build time, without slowing delivery.',
  },
];

const ROI_STATS = [
  { value: '70%', label: 'faster Time-to-Compliance' },
  { value: '60%', label: 'reduction in Operational Costs' },
  { value: '45%', label: 'improvement in Development Productivity' },
  { value: '82%', label: 'of organizations delayed releases due to security issues' },
];

export function FipsComplianceContent(): React.ReactElement {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <>
      {/* ── SECTION 1: HERO ── */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-[100px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgb(3,22,48) 0%, rgb(6,107,241) 40%, rgb(6,199,242) 70%, rgb(205,245,254) 100%)',
        }}
        aria-labelledby="hero-title"
      >
        <motion.div className="max-w-[1340px] mx-auto flex flex-col items-center text-center gap-6 relative z-10" {...anim()}>
          <h1
            id="hero-title"
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[56px] leading-[1.1] text-white max-w-[900px]"
          >
            FIPS-Validated. Always Verified.
          </h1>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/70 max-w-[700px] leading-relaxed">
            FIPS 140-3 validated cryptography, built into our hermetic build system, ensures secure containers from build to
            runtime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <CallToActionButton
              label="Explore Free FIPS Images"
              variant="light"
              size="md"
              href="https://images.cleanstart.com/?fips"
            />
            <CallToActionButton label="Contact Us" variant="light" size="md" href="/company/contact" />
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: WHY FIPS 140-3 MATTERS ── */}
      <section
        className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="why-fips-title"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="why-fips-title"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Why FIPS 140-3 Matters
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              FIPS 140-3 defines the standard for trusted cryptography. It governs how encryption must be implemented.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITY_CARDS.map((card, i) => (
              <motion.article
                key={card.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[30px] hover:border-[#056BF1]/30 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <div className="mb-6">{card.icon}</div>
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[20px] md:text-[22px] text-[#181818] mb-3">
                  {card.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/60 leading-relaxed">
                  {card.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: HOW CLEANSTART ENABLES ── */}
      <section
        className="bg-[#f5f7fa] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="enables-title"
      >
        <motion.div className="max-w-[1340px] mx-auto text-center" {...anim()}>
          <h2
            id="enables-title"
            className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[44px] leading-[1.2] text-[#181818] max-w-[800px] mx-auto"
          >
            How CleanStart Enables FIPS 140-3 Compliance
          </h2>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] md:text-[18px] text-[#181818]/60 leading-relaxed max-w-[600px] mx-auto mt-4">
            CleanStart embeds this validation directly into every build, making compliance continuous, not manual.
          </p>
        </motion.div>
      </section>

      {/* ── SECTION 4: MATURITY MODEL ── */}
      <section
        className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="maturity-title"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="maturity-title"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              CleanStart FIPS 140-3 Maturity Model
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              A four-stage framework that demonstrates how CleanStart moves from crypto design to ongoing compliance.
            </motion.p>
          </div>

          {/* Stage tabs */}
          <motion.nav
            className="flex flex-wrap gap-3 mb-10"
            {...anim(0.15)}
            role="tablist"
            aria-label="FIPS Maturity Stages"
          >
            {MATURITY_STAGES.map((stage, i) => (
              <button
                key={stage.id}
                role="tab"
                aria-selected={activeStage === i}
                aria-controls={`panel-${stage.id}`}
                onClick={() => setActiveStage(i)}
                className={`px-6 py-3 rounded-full font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] font-normal transition-all duration-300 cursor-pointer border ${
                  activeStage === i
                    ? 'bg-[#056BF1] text-white border-[#056BF1]'
                    : 'bg-white text-[#181818]/70 border-[#ecedef] hover:border-[#056BF1]/30'
                }`}
              >
                {stage.label}
              </button>
            ))}
          </motion.nav>

          {/* Stage content panel */}
          <motion.article
            className="bg-white rounded-[15px] border border-[#ecedef] p-[30px] md:p-10 min-h-[320px]"
            {...anim(0.2)}
            role="tabpanel"
            id={`panel-${MATURITY_STAGES[activeStage].id}`}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={MATURITY_STAGES[activeStage].id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                  <div className="flex-1">
                    <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#056BF1] font-medium mb-2">
                      Stage {activeStage + 1} of {MATURITY_STAGES.length}
                    </p>
                    <h3 className="font-['Google_Sans',sans-serif] font-normal text-[26px] md:text-[32px] text-[#181818] mb-4">
                      {MATURITY_STAGES[activeStage].title}
                    </h3>
                    <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/60 leading-relaxed mb-6 max-w-[500px]">
                      {MATURITY_STAGES[activeStage].desc}
                    </p>
                    <CallToActionButton
                      label="Learn more"
                      variant="dark"
                      size="sm"
                      href={MATURITY_STAGES[activeStage].learnMoreHref}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.article>
        </div>
      </section>

      {/* ── SECTION 5: USE CASES ── */}
      <section
        className="bg-[#f5f7fa] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="use-cases-title"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="use-cases-title"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-[#181818] lg:w-[670px] shrink-0"
              {...anim()}
            >
              Use Cases
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/50 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              With FIPS validation built into every build, CleanStart accelerates compliance while enabling secure deployment.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {USE_CASES.map((useCase, i) => (
              <motion.article
                key={useCase.title}
                className="bg-white rounded-[15px] border border-[#ecedef] p-[30px] hover:border-[#056BF1]/30 transition-colors duration-300"
                {...anim(i * 0.08)}
              >
                <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] md:text-[24px] text-[#181818] mb-3">
                  {useCase.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-[#181818]/60 leading-relaxed">
                  {useCase.desc}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: ROI / BOTTOM CTA ── */}
      <section
        className="bg-gradient-to-br from-[#056BF1] to-[#0445a8] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]"
        aria-labelledby="roi-title"
      >
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 mb-12 md:mb-16">
            <motion.h2
              id="roi-title"
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] leading-[1.1] text-white lg:w-[670px] shrink-0"
              {...anim()}
            >
              The ROI of Built-In Compliance
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[15px] md:text-[16px] text-white/70 leading-relaxed flex-1 pt-2"
              {...anim(0.1)}
            >
              CleanStart shifts FIPS compliance from a manual effort to an automated outcome, reducing audit timelines.
            </motion.p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
            {ROI_STATS.map((stat, i) => (
              <motion.div key={stat.label} className="text-center" {...anim(i * 0.08)}>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[44px] text-white mb-2">
                  {stat.value}
                </p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[15px] text-white/70 leading-snug">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div className="flex flex-col sm:flex-row gap-4 items-center justify-center" {...anim(0.4)}>
            <CallToActionButton
              label="Talk to a Security Expert"
              variant="light"
              size="md"
              href="/company/contact"
            />
          </motion.div>

          <motion.p
            className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[15px] text-white/60 text-center mt-6"
            {...anim(0.5)}
          >
            Start Clean. Stay Compliant.
          </motion.p>
        </div>
      </section>
    </>
  );
}
