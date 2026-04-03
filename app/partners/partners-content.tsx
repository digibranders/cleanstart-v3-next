"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const partnerBenefits = [
  {
    title: "Differentiate Through Trust",
    description: "Deliver verified, zero-vulnerability components that strengthen your product.",
    icon: "/partners/partner-tier.svg",
  },
  {
    title: "Accelerate Compliance Wins",
    description: "Help customers achieve FIPS, FedRAMP, and CIS goals faster through built-in automation.",
    icon: "/partners/partner-tier-2.svg",
  },
  {
    title: "Drive Revenue with Confidence",
    description: "Win new business in regulated markets with a foundation customers can prove.",
    icon: "/partners/partner-tier-3.svg",
  },
  {
    title: "Partner for Lasting Growth",
    description: "Gain enablement, co-marketing, and support that scale your business and impact.",
    icon: "/partners/partner-tier-4.svg",
  },
];

const partnerTypes = [
  {
    title: "Technology Partners",
    description: "Integrate CleanStart assurance into your platform to deliver verified, zero-vulnerability software.",
    icon: "/partners/partner-tier-5.svg",
  },
  {
    title: "Value Sellers",
    description: "Provide verified, compliance-ready infrastructure for customers requiring secure and trusted delivery.",
    icon: "/partners/partner-tier-6.svg",
  },
  {
    title: "System Integrators & MSPs",
    description: "Embed CleanStart into managed services to simplify compliance and strengthen customer trust.",
    icon: "/partners/partner-tier.svg",
  },
];

const partnerLogos = [
  { src: "/partners/partner-logo.png", alt: "Hitachi Systems" },
  { src: "/partners/partner-logo-2.png", alt: "CyberNx" },
  { src: "/partners/partner-logo-3.png", alt: "Citius Cloud" },
  { src: "/partners/partner-logo-4.png", alt: "eCaps" },
  { src: "/partners/partner-logo-5.png", alt: "Eventus Security" },
  { src: "/partners/partner-logo-6.png", alt: "SEESEC" },
  { src: "/partners/mask-group-25.png", alt: "Partner" },
  { src: "/partners/unnamed-file.png", alt: "Partner" },
];

const testimonials = [
  {
    quote:
      "CleanStart is manna from heaven for the software industry — delivering clean, hardened, and compliant container and VM images with zero critical vulnerabilities.",
    name: "Anuj Gupta",
    role: "MD - Hitachi Systems India",
    photo: "/partners/partner-testimonial.png",
  },
  {
    quote:
      "CleanStart makes it possible for teams to ship faster, safer, and smarter — with peace of mind baked into your pipeline.",
    name: "Shaq Khan",
    role: "Founder & CEO - Fortifire (US)",
    photo: "/partners/partner-testimonial-2.webp",
  },
];

export function PartnersContent() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-28 md:py-36 lg:py-44 px-4 md:px-8 lg:px-[50px]" style={{ backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(5,107,241,0.25) 0%, rgba(6,199,242,0.12) 40%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6,199,242,0.15) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-[1340px] mx-auto text-center">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-bold text-[40px] md:text-[56px] lg:text-[72px] text-white leading-[1.08] tracking-[-0.03em] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Join the Clean Software Movement
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] lg:text-[20px] text-white/70 max-w-[640px] mx-auto leading-[1.6]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            Together, we set a new standard for trusted software.
          </motion.p>
        </div>
      </section>

      {/* ── Partner Benefits ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Why Partner with CleanStart
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Help customers ship clean, compliant, and verifiable software with trust built in.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
            {partnerBenefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                className="bg-white rounded-[15px] p-[25px]  transition-all duration-300 border border-black/[0.04]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#056BF1]/10 flex items-center justify-center mb-5">
                  <img src={benefit.icon} alt="" width={28} height={28} />
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[17px] text-[#181818] mb-2">
                  {benefit.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] leading-[1.7]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partner Types ── */}
      <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Partner in the Way That Fits You Best
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Whether you integrate the technology, deliver it to customers, or embed it into managed services, each partnership creates shared value and growth.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-[25px]">
            {partnerTypes.map((type, i) => (
              <motion.div
                key={type.title}
                className="relative bg-white rounded-[15px] p-[25px]  transition-all duration-300 border border-black/[0.06] overflow-hidden"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#056BF1] to-[#06C7F2]" />
                <div className="w-14 h-14 rounded-2xl bg-[#056BF1]/10 flex items-center justify-center mb-5">
                  <img src={type.icon} alt="" width={32} height={32} />
                </div>
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#181818] mb-3">
                  {type.title}
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B] leading-relaxed">
                  {type.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Partner Ecosystem ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Global Partner Ecosystem
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Trusted innovators across the world building clean, verifiable software.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {partnerLogos.map((logo, i) => (
              <motion.div
                key={logo.alt + i}
                className="bg-[#f8f9fa] rounded-[15px] p-6 flex items-center justify-center h-[100px] border border-black/[0.04] transition-all duration-300"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-[50px] max-w-[140px] object-contain"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="bg-[#181818] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="text-center mb-14">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.15] tracking-[-0.02em] mb-4"
              {...anim(0)}
            >
              What Our Partners Say
            </motion.h2>
          </div>
          <div className="max-w-[900px] mx-auto">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.name}
                className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                  activeTestimonial === i ? "block" : "hidden"
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full overflow-hidden flex-shrink-0 border-2 border-[#056BF1]/30">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-white/80 leading-[1.7] mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <p className="font-['Google_Sans',sans-serif] font-semibold text-[16px] text-white">
                    {testimonial.name}
                  </p>
                  <p className="font-['Google_Sans',sans-serif] text-[14px] text-white/50 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="flex justify-center gap-3 mt-10">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === i
                      ? "bg-[#056BF1] scale-110"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`View testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#056BF1] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="max-w-[900px] mx-auto text-center flex flex-col items-center gap-6">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white leading-[1.15] tracking-[-0.02em]"
              {...anim(0)}
            >
              Start Your Partnership Journey
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-white/80 leading-[1.6] max-w-[560px]"
              {...anim(0.1)}
            >
              Join forces with CleanStart and help build a more secure software ecosystem.
            </motion.p>
            <motion.div {...anim(0.2)}>
              <CallToActionButton label="Become a Partner" variant="light" size="lg" href="/contact" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
