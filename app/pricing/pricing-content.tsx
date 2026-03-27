"use client";

import { motion } from "motion/react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="10" fill="#056BF1" fillOpacity="0.1" />
      <path d="M6.5 10.5L9 13L14 7.5" stroke="#056BF1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const tiers = [
  {
    badge: "Free",
    title: "For Developer",
    price: "$0",
    priceLabel: "Free",
    description: "Perfect for testing and development workflows.",
    features: [
      "Latest container images",
      "SBOM included",
      "Free for testing & deployment",
      "Debloated architecture",
      "SLSA Level 2 build",
      "No SLA commitment",
    ],
    ctaLabel: "Get Started for Free",
    ctaVariant: "light" as const,
    ctaHref: "/images",
    featured: false,
  },
  {
    badge: "Most Popular",
    title: "Enterprise Image",
    price: "Custom",
    priceLabel: "Custom pricing",
    description: "Production-grade images with full SLA and compliance.",
    features: [
      "CleanStart Images (dev + production)",
      "Latest 3 releases",
      "SBOM + SLSA Level 3",
      "CVE remediation SLA (7 days Critical/High, 14 days Medium/Low)",
      "Enterprise features included",
      "Custom packages available",
      "Volume discount (50+ images)",
      "FIPS Available",
    ],
    ctaLabel: "Get a Custom Quote",
    ctaVariant: "dark" as const,
    ctaHref: "/company/contact",
    featured: true,
  },
  {
    badge: "Custom",
    title: "Custom Enterprise",
    price: "Custom",
    priceLabel: "Tailored to your needs",
    description: "Fully bespoke solutions for regulated environments.",
    features: [
      "Custom image hardening",
      "24x7 support",
      "On-premise deployment",
      "Custom compliance framework",
    ],
    ctaLabel: "Contact Sales",
    ctaVariant: "dark" as const,
    ctaHref: "/company/contact",
    featured: false,
  },
];

export function PricingContent() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-28 md:py-36 lg:py-44 px-4 md:px-8 lg:px-[50px]"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
      >
        {/* Decorative mesh */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 20% 100%, rgba(93,4,216,0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 0%, rgba(205,245,254,0.2) 0%, transparent 50%)",
          }}
        />
        <div className="relative max-w-[1340px] mx-auto text-center">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-bold text-[40px] md:text-[56px] lg:text-[72px] text-white leading-[1.08] tracking-[-0.03em] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] lg:text-[20px] text-white/80 max-w-[520px] mx-auto leading-[1.6]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Start free. Scale securely.
          </motion.p>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[25px] items-start">
            {tiers.map((tier, i) => (
              <motion.div
                key={tier.title}
                className={`relative bg-white rounded-[20px] p-[25px] flex flex-col overflow-hidden transition-all duration-300 ${
                  tier.featured
                    ? "border-2 border-[#056BF1] shadow-xl md:scale-[1.04] z-10"
                    : "border border-black/[0.06] "
                }`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Top gradient bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[3px]"
                  style={{
                    background: tier.featured
                      ? "linear-gradient(90deg, #056BF1, #06C7F2)"
                      : tier.badge === "Custom"
                      ? "linear-gradient(90deg, #5d04d8, #056BF1)"
                      : "linear-gradient(90deg, #94a3b8, #cbd5e1)",
                  }}
                />

                {/* Badge */}
                <div className="mb-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[12px] font-semibold font-['Google_Sans',sans-serif] ${
                      tier.featured
                        ? "bg-[#056BF1] text-white"
                        : "bg-[#f8fafc] text-[#64748B] border border-black/[0.06]"
                    }`}
                  >
                    {tier.badge}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#181818] mb-2">
                  {tier.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] leading-relaxed mb-6">
                  {tier.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <span className="font-['Google_Sans',sans-serif] font-bold text-[36px] md:text-[42px] text-[#181818] tracking-[-0.02em]">
                    {tier.price}
                  </span>
                  {tier.price !== "Custom" && (
                    <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] ml-2">
                      / forever
                    </span>
                  )}
                </div>

                {/* Divider */}
                <div className="w-full h-[1px] bg-black/[0.06] mb-6" />

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#4B5563] leading-[1.5]">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex justify-center mt-auto">
                  <CallToActionButton
                    label={tier.ctaLabel}
                    variant={tier.ctaVariant}
                    size="md"
                    href={tier.ctaHref}
                    fullWidth
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Community vs Custom ── */}
      <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Community vs Custom Images
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Choose the tier that matches your security and deployment requirements.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[25px] max-w-[860px] mx-auto">
            <motion.div
              className="bg-white rounded-[20px] p-[25px]  transition-shadow border border-black/[0.04]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#056BF1]/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21V19C17 16.7909 15.2091 15 13 15H5C2.79086 15 1 16.7909 1 19V21" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M23 21V19C22.9986 17.1771 21.765 15.5857 20 15.13" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 3.13C17.7699 3.58317 19.0078 5.17799 19.0078 7.005C19.0078 8.83201 17.7699 10.4268 16 10.88" stroke="#056BF1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] md:text-[26px] text-[#181818] tracking-[-0.01em] mb-3">
                Community Images
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B] leading-relaxed">
                Free, verified base images curated by CleanStart for developers and open-source users. Ideal for testing, prototyping, and non-production workloads.
              </p>
            </motion.div>
            <motion.div
              className="bg-white rounded-[20px] p-[25px]  transition-shadow border border-black/[0.04]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-2xl bg-[#5d04d8]/10 flex items-center justify-center mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="#5d04d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12L11 14L15 10" stroke="#5d04d8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] md:text-[26px] text-[#181818] tracking-[-0.01em] mb-3">
                Custom Images
              </h3>
              <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B] leading-relaxed">
                Pre-built, optimized base images with near-zero CVEs and automatic versioned updates. Built for production, compliance, and enterprise-grade security.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Need Help CTA ── */}
      <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="max-w-[900px] mx-auto text-center flex flex-col gap-6">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.15] tracking-[-0.02em]"
              {...anim(0)}
            >
              Need help choosing?
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-[#64748B] leading-[1.6] mb-4"
              {...anim(0.1)}
            >
              Our team can help you find the right plan for your security and compliance needs.
            </motion.p>
            <motion.div className="flex justify-center" {...anim(0.2)}>
              <CallToActionButton label="Contact Sales" variant="dark" size="lg" href="/company/contact" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
