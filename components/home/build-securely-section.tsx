"use client";

import { motion } from 'motion/react';
import { useState } from 'react';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';

const imgCard = "/images/figma/523d69e15824438a4fbbf34f51fb05a35f7fdf0d.png";
const imgCard1 = "/images/figma/cd141cb5bc524f13a11e1d3e641bff9c5c0aaf62.png";
const imgCard2 = "/images/figma/d77f8a0a1e5bedbff53424b69f5812b4cb560788.png";
const imgCard3 = "/images/figma/891596228f2ccc9edf84581e6b09c7000509f721.png";

const features = [
  'Compliance',
  'Faster Deployment',
  'Simplify Vulnerability Management',
  'Attack Surface Reduction',
];

const cards = [
  {
    image: imgCard,
    title: 'Container\nImages',
    description: 'CleanStart secures your development pipeline by continuously monitoring containers, virtual machines, libraries,',
  },
  {
    image: imgCard1,
    title: 'VM',
    description: 'Our platform simplifies compliance and vulnerability management, reducing operational complexity',
  },
  {
    image: imgCard2,
    title: 'Library',
    description: 'With automated scanning and real-time insights, teams can deploy faster without compromising protection',
  },
  {
    image: imgCard3,
    title: 'Packages',
    description: 'Designed for modern enterprises, CleanStart minimizes attack surfaces and enforces security',
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

export function BuildSecurelySection() {
  const [activeCard, setActiveCard] = useState(0);

  return (
    <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-8 md:py-[50px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-8 md:gap-[50px]">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-0">
          {/* Title */}
          <motion.div
            className="shrink-0 w-full lg:w-[670px]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
              Build securely with CleanStart
            </h2>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-[50px] gap-y-4 md:gap-y-[25px]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-[5px]">
                <CheckIcon />
                <span className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#181818]">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Cards — mobile: vertical stack, desktop: horizontal accordion */}
        {/* Mobile layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-[25px] lg:hidden">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative rounded-[15px] overflow-hidden group cursor-pointer h-[350px] md:h-[450px]"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <img
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={card.image}
              />
              <div className="relative flex flex-col justify-between h-full p-[25px]">
                <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white leading-normal">
                  {card.description}
                </p>
                <div className="flex items-end justify-between gap-4">
                  <h3 className="font-['Google_Sans',sans-serif] font-normal text-[28px] text-white leading-normal whitespace-pre-wrap">
                    {card.title}
                  </h3>
                  <CircleArrowCTA variant="outline-white" size={40} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Desktop accordion layout */}
        <div className="hidden lg:flex gap-[15px] items-center w-full" style={{ height: 540 }}>
          {cards.map((card, i) => {
            const isActive = activeCard === i;

            return (
              <motion.div
                key={card.title}
                className="relative rounded-[15px] overflow-hidden cursor-pointer origin-center"
                onMouseEnter={() => setActiveCard(i)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.16, 1, 0.3, 1] }}
                animate={{
                  flex: isActive ? 1.15 : 0.81,
                  height: isActive ? 540 : 432,
                }}
                style={{
                  transition: 'flex 500ms cubic-bezier(0.16, 1, 0.3, 1), height 500ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Background image */}
                <img
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  src={card.image}
                />

                {/* Expanded content — visible when active */}
                <motion.div
                  className="relative flex flex-col justify-between h-full p-[25px]"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: isActive ? 0.4 : 0.15, delay: isActive ? 0.12 : 0 }}
                >
                  <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white leading-normal">
                    {card.description}
                  </p>
                  <div className="flex items-end justify-between gap-4">
                    <h3 className="font-['Google_Sans',sans-serif] font-normal text-[28px] text-white leading-normal whitespace-pre-wrap">
                      {card.title}
                    </h3>
                    <CircleArrowCTA variant="outline-white" size={40} />
                  </div>
                </motion.div>

                {/* Collapsed content — visible when NOT active */}
                <motion.div
                  className="absolute inset-0 flex flex-col items-start justify-end p-[25px]"
                  animate={{ opacity: isActive ? 0 : 1 }}
                  transition={{ duration: isActive ? 0.15 : 0.4, delay: isActive ? 0 : 0.12 }}
                >
                  <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] text-white leading-normal whitespace-pre-wrap">
                    {card.title}
                  </h3>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
