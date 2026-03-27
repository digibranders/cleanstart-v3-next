"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const imgMascot = "/images/figma/82d49bdfed2c595f2665832701007b3b68fd268f.png";

const faqItems = [
  {
    question: 'What is CleanStart?',
    answer:
      'CleanStart provides hardened, near-zero-CVE container base images that are continuously scanned, rebuilt, and cryptographically signed. Our images are designed to eliminate known vulnerabilities at the source, giving your team secure foundations to build on.',
  },
  {
    question: 'How does CleanStart handle security updates?',
    answer:
      'Our automated pipeline continuously monitors upstream sources and rebuilds images within hours of new CVE disclosures. Every update is cryptographically signed and verified before publishing to our registry.',
  },
  {
    question: 'Can I customize CleanStart images for my applications?',
    answer:
      'Yes. CleanStart images are fully compatible with standard Dockerfiles. You can layer your application on top of our hardened base images while maintaining the security guarantees we provide.',
  },
  {
    question: 'How can I verify a CleanStart image?',
    answer:
      'Every CleanStart image is cryptographically signed using Sigstore cosign. You can verify signatures locally or integrate verification into your CI/CD pipeline with a single command.',
  },
  {
    question: 'Which registries work with CleanStart images?',
    answer:
      'CleanStart images are compatible with all major container registries including Docker Hub, AWS ECR, Google Artifact Registry, Azure Container Registry, and any OCI-compliant registry.',
  },
  {
    question: 'Which registries work with CleanStart images?',
    answer:
      'We also support private registry mirrors and can provide dedicated endpoints for enterprise customers with specific compliance requirements.',
  },
];

function PlusIcon() {
  return (
    <svg
      className="shrink-0"
      width="14"
      height="14"
      viewBox="0 0 13.5 13.5"
      fill="none"
    >
      <path
        d="M6.75 0C7.002 0 7.2 0.198 7.2 0.45V6.3H13.05C13.1693 6.3 13.2838 6.34741 13.3682 6.4318C13.4526 6.51619 13.5 6.63065 13.5 6.75C13.5 6.86935 13.4526 6.98381 13.3682 7.0682C13.2838 7.15259 13.1693 7.2 13.05 7.2H7.2V13.05C7.2 13.1693 7.15259 13.2838 7.0682 13.3682C6.98381 13.4526 6.86935 13.5 6.75 13.5C6.63065 13.5 6.51619 13.4526 6.4318 13.3682C6.34741 13.2838 6.3 13.1693 6.3 13.05V7.2H0.45C0.330653 7.2 0.216193 7.15259 0.131802 7.0682C0.0474107 6.98381 0 6.86935 0 6.75C0 6.63065 0.0474107 6.51619 0.131802 6.4318C0.216193 6.34741 0.330653 6.3 0.45 6.3H6.3V0.45C6.3 0.198 6.498 0 6.75 0Z"
        fill="#0A0A1A"
      />
    </svg>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] pt-12 md:pt-[100px] pb-[120px] md:pb-[220px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-8 md:gap-[50px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-0">
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-black tracking-[-0.95px] w-full lg:w-[670px] shrink-0"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Questions &amp; Answers
          </motion.h2>
          <motion.p
            className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-black max-w-full lg:max-w-[526px] leading-normal"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Common questions about CleanStart&apos;s hardened container images, security, and integrations.
          </motion.p>
        </div>

        {/* FAQ + Mascot */}
        <div className="relative">
          {/* FAQ items */}
          <motion.div
            className="flex flex-col gap-4 md:gap-[25px] w-full lg:w-[814px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {faqItems.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white rounded-[15px] cursor-pointer overflow-hidden"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                >
                  <div className="flex items-center justify-between p-[25px]">
                    <p className="font-['Manrope',sans-serif] font-semibold text-[20px] text-black">
                      {item.question}
                    </p>
                    {!isOpen && <PlusIcon />}
                  </div>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-black leading-normal px-[25px] pb-[25px]">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>

          {/* Mascot */}
          <motion.div
            className="hidden lg:block absolute right-0 top-[40px] w-[500px] h-[508px] pointer-events-none"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              alt="CleanStart mascot"
              className="w-full h-full object-contain"
              src={imgMascot}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
