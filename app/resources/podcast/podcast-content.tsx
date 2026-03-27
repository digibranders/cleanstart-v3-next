"use client";

import { motion } from "motion/react";
import { Play } from "lucide-react";
import {
  ScrollReveal,
  ScrollRevealStagger,
  ScrollRevealItem,
} from "@/components/shared/scroll-reveal";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface Episode {
  id: number;
  number: number;
  title: string;
  description: string;
  thumbnail: string;
}

const episodes: Episode[] = [
  {
    id: 1,
    number: 1,
    title: "From Stealth to Spotlight",
    description:
      "The founding story of CleanStart and the vision behind building trust into every software build.",
    thumbnail: "/podcast/podcast-thumbnail-1d73c4dc.jpg",
  },
  {
    id: 2,
    number: 2,
    title: "The Compliance Maze",
    description:
      "Navigating regulatory frameworks from EO 14028 to EU CRA and what they mean for engineering teams.",
    thumbnail: "/podcast/podcast-thumbnail-81941366.jpg",
  },
  {
    id: 3,
    number: 3,
    title: "Demystify Software Supply Chain",
    description:
      "Breaking down the complexity of modern software supply chains and where trust breaks down.",
    thumbnail: "/podcast/podcast-thumbnail-f6b9b829.jpg",
  },
  {
    id: 4,
    number: 4,
    title: "What Most Teams Get Wrong About CVEs",
    description:
      "Why chasing CVE counts misses the point and what metrics actually matter for container security.",
    thumbnail: "/podcast/podcast-thumbnail-1d73c4dc.jpg",
  },
];

export function PodcastContent() {
  return (
    <>
      {/* Hero Section — dark gradient */}
      <section className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] pt-[140px] md:pt-[160px] pb-[80px] md:pb-[100px]" style={{ backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)' }}>
        {/* Subtle grid overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.04]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hero-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        <div className="relative z-10 max-w-[1340px] mx-auto text-center">
          <ScrollReveal direction="up" delay={0}>
            <h1 className="font-['Google_Sans',sans-serif] font-normal text-[36px] md:text-[48px] lg:text-[60px] text-white leading-[1.1] tracking-[-0.02em] mb-5">
              CleanStart Leadership Exchange
            </h1>
            <p className="font-['Google_Sans',sans-serif] text-[17px] md:text-[19px] text-white/75 leading-[1.65] max-w-[680px] mx-auto">
              Where industry leaders decode container security and define the
              future of the software supply chain.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Video Section — dark bg continues */}
      <section className="bg-[#0a1628] px-4 md:px-8 lg:px-[50px] pb-[80px] md:pb-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="relative rounded-[15px] overflow-hidden group cursor-pointer">
              <img
                src="/podcast/youtubethumbnaildownload.com-full-hd-f1v-xnvttmq.jpg"
                alt="CleanStart Introduction podcast video thumbnail"
                className="w-full aspect-video object-cover"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />
              {/* Play button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full bg-[#056BF1] flex items-center justify-center shadow-lg shadow-[#056BF1]/40">
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="white" />
                </div>
              </motion.div>
              {/* Title bar */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 md:px-8 md:py-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="font-['Google_Sans',sans-serif] font-semibold text-[18px] md:text-[22px] text-white">
                  Podcast: CleanStart Introduction
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Episodes Grid — white bg */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-[80px] md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-12 md:mb-16">
            <motion.div
              className="w-full lg:w-[670px] shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                All Episodes
              </h2>
            </motion.div>
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            >
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Conversations on software security and supply chain integrity
              </p>
            </motion.div>
          </div>

          <ScrollRevealStagger staggerDelay={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {episodes.map((episode) => (
                <ScrollRevealItem key={episode.id} direction="up">
                  <motion.div
                    className="group rounded-[15px] overflow-hidden bg-white border border-[#ecedef] cursor-pointer"
                    whileHover={{
                      y: -6,
                      boxShadow:
                        "0 12px 40px rgba(5,107,241,0.12), 0 4px 12px rgba(0,0,0,0.06)",
                    }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden">
                      <img
                        src={episode.thumbnail}
                        alt={`${episode.title} episode thumbnail`}
                        className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Episode badge */}
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#056BF1] font-['Google_Sans',sans-serif] text-[12px] font-semibold text-white">
                        Episode {episode.number}
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="p-5 md:p-6">
                      <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-[#181818] leading-[1.3] tracking-[-0.01em] mb-2 group-hover:text-[#056BF1] transition-colors duration-300">
                        {episode.title}
                      </h3>
                      <p className="font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] text-[#181818]/55 leading-[1.65] mb-5">
                        {episode.description}
                      </p>
                      <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#056BF1]/[0.08] text-[#056BF1] font-['Google_Sans',sans-serif] text-[14px] font-semibold group-hover:bg-[#056BF1] group-hover:text-white transition-all duration-300">
                        <Play className="w-4 h-4" fill="currentColor" />
                        Listen Now
                      </button>
                    </div>
                  </motion.div>
                </ScrollRevealItem>
              ))}
            </div>
          </ScrollRevealStagger>
        </div>
      </section>

      {/* CTA Section — blue bg */}
      <section className="px-4 md:px-8 lg:px-[50px] py-[80px] md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="relative rounded-[15px] overflow-hidden bg-[#056BF1] px-8 md:px-16 py-16 md:py-20 text-center">
              {/* Decorative circles */}
              <div className="absolute -top-20 -right-20 w-[200px] h-[200px] rounded-full bg-white/[0.06]" />
              <div className="absolute -bottom-16 -left-16 w-[160px] h-[160px] rounded-full bg-white/[0.04]" />

              <div className="relative z-10">
                <h2 className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] lg:text-[42px] text-white leading-[1.15] tracking-[-0.02em] mb-4">
                  Subscribe to the podcast
                </h2>
                <p className="font-['Google_Sans',sans-serif] text-[16px] md:text-[17px] text-white/80 leading-[1.6] mb-8 max-w-[480px] mx-auto">
                  Never miss an episode. Get notified when new episodes drop.
                </p>
                <div className="flex justify-center">
                  <CallToActionButton
                    label="Subscribe"
                    variant="light"
                    size="md"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
