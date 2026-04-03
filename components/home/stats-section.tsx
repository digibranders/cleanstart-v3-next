"use client";

import { motion } from 'motion/react';
import Image from 'next/image';

const imgMascot = "/images/figma/a674999a29eed54ef246c53ee3d19db8aeb8b33d.webp";

const stats = [
  { value: '95%', label: 'Had critical vulnerabilitties' },
  { value: '60%', label: 'Fail to recover after a major cyber attack' },
  { value: '207days', label: 'Average  time to detect a breach' },
];

export function StatsSection() {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Stats column */}
        <div className="flex flex-col gap-4 md:gap-[25px] flex-1 min-w-0 w-full">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.value}
              className="bg-[#cdf5fe] rounded-[15px] w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 md:p-[25px] gap-2">
                <p className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] text-[#181818] leading-normal">
                  {stat.value}
                </p>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818] leading-normal">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mascot */}
        <motion.div
          className="hidden md:block h-[300px] w-[304px] shrink-0 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            alt="CleanStart mascot"
            className="absolute h-full left-[-48.26%] max-w-none top-0 w-[148.26%]"
            src={imgMascot}
            width={452}
            height={300}
          />
        </motion.div>
      </div>
    </section>
  );
}
