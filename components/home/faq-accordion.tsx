"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

// Placeholder mascot image path — replace with actual asset in /public/images/
const imgMascot = "/images/mascot/faq-mascot.png";

const faqItems = [
  {
    question: "What is CleanStart?",
    answer:
      "CleanStart provides hardened, near-zero-CVE container base images that are continuously scanned, rebuilt, and cryptographically signed. Our images are designed to eliminate known vulnerabilities at the source, giving your team secure foundations to build on.",
  },
  {
    question: "How does CleanStart handle security updates?",
    answer:
      "Our automated pipeline continuously monitors upstream sources and rebuilds images within hours of new CVE disclosures. Every update is cryptographically signed and verified before publishing to our registry.",
  },
  {
    question: "Can I customize CleanStart images for my applications?",
    answer:
      "Yes. CleanStart images are fully compatible with standard Dockerfiles. You can layer your application on top of our hardened base images while maintaining the security guarantees we provide.",
  },
  {
    question: "How can I verify a CleanStart image?",
    answer:
      "Every CleanStart image is cryptographically signed using Sigstore cosign. You can verify signatures locally or integrate verification into your CI/CD pipeline with a single command.",
  },
  {
    question: "Which registries work with CleanStart images?",
    answer:
      "CleanStart images are compatible with all major container registries including Docker Hub, AWS ECR, Google Artifact Registry, Azure Container Registry, and any OCI-compliant registry.",
  },
  {
    question: "Which registries work with CleanStart images?",
    answer:
      "We also support private registry mirrors and can provide dedicated endpoints for enterprise customers with specific compliance requirements.",
  },
];

// Inline plus icon path
const PLUS_PATH =
  "M7.583 0.583H6.417V6.417H0.583V7.583H6.417V13.417H7.583V7.583H13.417V6.417H7.583V0.583Z";

// Inline minus icon path
const MINUS_PATH = "M0.583 6.417H13.417V7.583H0.583V6.417Z";

function PlusIcon() {
  return (
    <svg
      className="shrink-0 size-[14px]"
      fill="none"
      viewBox="0 0 13.999 13.999"
    >
      <path d={PLUS_PATH} fill="#0A0A1A" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="shrink-0 size-[14px]"
      fill="none"
      viewBox="0 0 13.999 13.999"
    >
      <path d={MINUS_PATH} fill="#0A0A1A" />
    </svg>
  );
}

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#F8FAFC] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        {/* Main Grid - 30:70 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-[326px_1fr] gap-10 lg:gap-[100px]">
          {/* Left Column - Title + Mascot */}
          <div className="flex flex-col gap-[48px]">
            {/* Title */}
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.2] tracking-[-0.02em]"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              Questions &amp; Answers
            </motion.h2>

            {/* Mascot */}
            <motion.div
              className="relative w-full overflow-visible hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="CleanStart mascot"
                className="w-full max-w-full origin-top-left lg:scale-[1.65] pointer-events-none select-none"
                style={{ transform: "scaleX(-1)" }}
                src={imgMascot}
              />
            </motion.div>
          </div>

          {/* Right Column - Description + FAQ */}
          <div className="flex flex-col gap-[48px]">
            {/* Description */}
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              Common questions about CleanStart&apos;s hardened container images,
              security, and integrations.
            </motion.p>

            {/* FAQ items */}
            <motion.div
              className="flex flex-col gap-4 md:gap-[25px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              {faqItems.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-[15px] cursor-pointer overflow-hidden transition-colors duration-200 ${
                      isOpen ? "bg-white" : "bg-transparent"
                    }`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    {/* Question row */}
                    <div className="flex items-center justify-between px-[20px] md:px-[25px] py-[20px] md:py-[25px]">
                      <p className="font-['Google_Sans',sans-serif] font-medium text-[16px] md:text-[18px] text-[#181818] leading-[1.4]">
                        {item.question}
                      </p>
                      {isOpen ? <MinusIcon /> : <PlusIcon />}
                    </div>

                    {/* Answer */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6] px-[20px] md:px-[25px] pb-[20px] md:pb-[25px]">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Mobile Mascot - shown below FAQ on small screens */}
        <motion.div
          className="flex lg:hidden items-center justify-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="CleanStart mascot"
            className="-scale-y-100 rotate-180 w-[260px] max-w-full pointer-events-none select-none"
            src={imgMascot}
          />
        </motion.div>
      </div>
    </section>
  );
}
