"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

// Inline arrow path data (was imported from svg-qm7mkkrrsd)
const ARROW_UP_RIGHT_PATH =
  "M8.24536 21.2446L21.2446 8.24536L21.2446 19.0779L24.2446 19.0779L24.2446 3.24536L8.41207 3.24536L8.41207 6.24536L19.2446 6.24536L6.24536 19.2446L8.24536 21.2446Z";

// Placeholder image paths — replace with actual assets in /public/images/features/
const featureImages = [
  "/images/features/feature-1.png",
  "/images/features/feature-2.png",
  "/images/features/feature-3.png",
  "/images/features/feature-4.png",
];

const features = [
  "Compliance",
  "Faster Deployment",
  "Simplify Vulnerability Management",
  "Attack Surface Reduction",
];

const cards = [
  {
    image: featureImages[0],
    title: "Container\nImages",
    description:
      "CleanStart secures your development pipeline by continuously monitoring containers, virtual machines, libraries,",
    link: "Learn More",
  },
  {
    image: featureImages[1],
    title: "VM",
    description:
      "Our platform simplifies compliance and vulnerability management, reducing operational complexity",
    link: "Learn More",
  },
  {
    image: featureImages[2],
    title: "Library",
    description:
      "With automated scanning and real-time insights, teams can deploy faster without compromising protection",
    link: "Learn More",
  },
  {
    image: featureImages[3],
    title: "Packages",
    description:
      "Designed for modern enterprises, CleanStart minimizes attack surfaces and enforces security",
    link: "Learn More",
  },
];

function CheckIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" className="shrink-0">
      <path
        d="M5.20833 14.5833L8.85417 18.2292L19.7917 6.77083"
        stroke="#181818"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SecurityFeatureAccordion() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <div className="max-w-[1340px] mx-auto">
        {/* Header - 30:70 split */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px]">
          {/* Title - 30% */}
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.2] tracking-[-0.02em] lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Build securely with CleanStart
          </motion.h2>

          {/* Features grid - 70% */}
          <motion.div
            className="lg:col-span-7 flex flex-wrap gap-[16px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-[12px] bg-white px-[20px] py-[12px] rounded-[15px]"
              >
                <CheckIcon />
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[14px] md:text-[16px] text-[#181818] leading-[1.6]">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cards -- mobile: vertical stack, desktop: horizontal accordion */}
        {/* Mobile layout */}
        <div className="mt-[80px] grid grid-cols-1 sm:grid-cols-2 gap-[24px] lg:hidden">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative rounded-[15px] overflow-hidden group cursor-pointer h-[350px] md:h-[450px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <Image
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={card.image}
                fill
              />
              <div className="relative flex flex-col justify-between h-full p-[24px]">
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-[1.6]">
                  {card.description}
                </p>
                <div className="flex items-end justify-between">
                  <h3 className="font-['Google_Sans',sans-serif] font-normal text-[24px] text-white leading-[1.2] whitespace-pre-wrap">
                    {card.title}
                  </h3>
                  <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 29.49 29.49"
                      fill="none"
                      className="transition-transform duration-300"
                    >
                      <path d={ARROW_UP_RIGHT_PATH} fill="#181818" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop accordion layout */}
        <div
          className="mt-[80px] hidden lg:flex gap-[24px] items-center w-full"
          style={{ height: 540 }}
        >
          {cards.map((card, i) => {
            const isActive = activeCard === i;

            return (
              <motion.div
                key={card.title}
                className="relative rounded-[15px] overflow-hidden group cursor-pointer origin-center"
                onMouseEnter={() => setActiveCard(i)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                animate={{
                  flex: isActive ? 1.15 : 0.81,
                  height: isActive ? 540 : 432,
                }}
                style={{
                  transition:
                    "flex 500ms cubic-bezier(0.16, 1, 0.3, 1), height 500ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* Background image */}
                <Image
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  src={card.image}
                  fill
                />

                {/* Expanded content -- visible when active */}
                <motion.div
                  className="relative flex flex-col justify-between h-full p-[24px]"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{
                    duration: isActive ? 0.4 : 0.15,
                    delay: isActive ? 0.12 : 0,
                  }}
                >
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-[1.6]">
                    {card.description}
                  </p>
                  <div className="flex items-end justify-between">
                    <h3 className="font-['Google_Sans',sans-serif] font-normal text-[24px] text-white leading-[1.2] whitespace-pre-wrap">
                      {card.title}
                    </h3>
                    <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 29.49 29.49"
                        fill="none"
                        className="transition-transform duration-300"
                      >
                        <path d={ARROW_UP_RIGHT_PATH} fill="#181818" />
                      </svg>
                    </div>
                  </div>
                </motion.div>

                {/* Collapsed content -- visible when NOT active */}
                <motion.div
                  className="absolute inset-0 flex items-end justify-between p-[24px]"
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{
                    duration: isActive ? 0.15 : 0.4,
                    delay: isActive ? 0 : 0.12,
                  }}
                >
                  <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[18px] text-white leading-[1.2] whitespace-pre-wrap">
                    {card.title}
                  </h3>
                  <div className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 29.49 29.49"
                      fill="none"
                      className="transition-transform duration-300"
                    >
                      <path d={ARROW_UP_RIGHT_PATH} fill="#181818" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
