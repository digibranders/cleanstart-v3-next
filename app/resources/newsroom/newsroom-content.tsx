"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CircleArrowCTA } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface NewsArticle {
  id: number;
  title: string;
  source: string;
  sourceLogo: string;
  date: string;
  excerpt: string;
  featured?: boolean;
}

const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: 1,
    title:
      "CleanStart Announces Strategic Partnership with Sysdig to Deliver Continuous Software Supply Chain Verification",
    source: "PR Newswire",
    sourceLogo: "/news/prn-cision-logo-desktop.png",
    date: "Feb 27, 2026",
    excerpt:
      "Partnership aims to help enterprises secure their software supply chain through continuous verification spanning source to production environments.",
    featured: true,
  },
  {
    id: 2,
    title: "Why container images have become a trust boundary",
    source: "TechBullion",
    sourceLogo: "/news/techbullionlogo-3.webp",
    date: "Jan 21, 2026",
    excerpt:
      "Explores how software teams frequently reuse components without fully understanding their composition, creating hidden vulnerabilities in container image construction.",
  },
  {
    id: 3,
    title: "Where AI Fits in Cybersecurity",
    source: "ChannelE2E",
    sourceLogo: "/news/svgviewer-output.svg",
    date: "Jan 14, 2026",
    excerpt:
      "Discusses how cybersecurity has evolved from static defenses to dynamic threat landscapes, examining AI's emerging role in modern defensive strategies.",
  },
  {
    id: 4,
    title: "SBOMs in 2026: Some Love, Some Hate, Much Ambivalence",
    source: "Dark Reading",
    sourceLogo: "/news/logo-dark-reading-1.webp",
    date: "Dec 30, 2025",
    excerpt:
      "Analyzes adoption challenges for Software Bills of Materials, noting complexities in creating an end-to-end verified chain of code.",
  },
  {
    id: 5,
    title: "Why Containers Drive Supply Chain Breaches",
    source: "Cyber Defense Magazine",
    sourceLogo: "/news/cyberdefensemagazine-logo.png",
    date: "Dec 26, 2025",
    excerpt:
      "Examines how teams rapidly deploy container images from public registries with minimal security review before production deployment.",
  },
  {
    id: 6,
    title:
      "Inside CleanStart's mission to make software safer from the ground up",
    source: "YourStory",
    sourceLogo: "/news/headerv3-ys.svg",
    date: "Nov 20, 2025",
    excerpt:
      "Profiles CleanStart's Bengaluru-based operations and AI-driven approach to securing software supply chains before threats reach production environments.",
  },
];

/* ──────────────────── Featured Card ──────────────────── */

function FeaturedArticleCard({ article }: { article: NewsArticle }) {
  return (
    <ScrollReveal direction="up" delay={0.1}>
      <motion.a
        href="#"
        className="group block rounded-[15px] overflow-hidden bg-white border border-[#ecedef] transition-shadow duration-300"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        <div className="flex flex-col lg:flex-row">
          {/* Left accent strip */}
          <div className="hidden lg:block w-[6px] bg-gradient-to-b from-[#056BF1] to-[#06C7F2] shrink-0" />

          <div className="flex-1 p-8 md:p-10 lg:p-12">
            {/* Source logo */}
            <div className="mb-6">
              <img
                src={article.sourceLogo}
                alt={article.source}
                className="h-6 md:h-7 object-contain"
              />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 mb-5">
              <img
                src="/news/calendar-1.png"
                alt="Date"
                className="w-[18px] h-[18px] opacity-50"
              />
              <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#181818]/50">
                {article.date}
              </span>
            </div>

            {/* Title */}
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] lg:text-[32px] text-[#181818] leading-[1.25] tracking-[-0.02em] mb-4 group-hover:text-[#056BF1] transition-colors duration-300">
              {article.title}
            </h2>

            {/* Excerpt */}
            <p className="font-['Google_Sans',sans-serif] text-[16px] md:text-[17px] text-[#181818]/60 leading-[1.7] mb-8 max-w-[640px]">
              {article.excerpt}
            </p>

            {/* Read link */}
            <CircleArrowCTA variant="blue-white" size={40} />
          </div>
        </div>
      </motion.a>
    </ScrollReveal>
  );
}

/* ──────────────────── Grid Card ──────────────────── */

function NewsGridCard({
  article,
  index,
}: {
  article: NewsArticle;
  index: number;
}) {
  return (
    <motion.a
      href="#"
      className="group flex flex-col rounded-[15px] bg-white border border-[#ecedef] p-7 md:p-8 transition-shadow duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
      whileHover={{ y: -6 }}
    >
      {/* Source logo */}
      <div className="mb-5">
        <img
          src={article.sourceLogo}
          alt={article.source}
          className="h-5 md:h-6 object-contain"
        />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 mb-4">
        <img
          src="/news/calendar-1.png"
          alt="Date"
          className="w-4 h-4 opacity-50"
        />
        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818]/50">
          {article.date}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[18px] md:text-[20px] text-[#181818] leading-[1.3] tracking-[-0.01em] mb-3 group-hover:text-[#056BF1] transition-colors duration-300">
        {article.title}
      </h3>

      {/* Excerpt */}
      <p className="font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] text-[#181818]/55 leading-[1.65] mb-6 flex-1">
        {article.excerpt}
      </p>

      {/* Read link */}
      <div className="mt-auto">
        <CircleArrowCTA variant="blue-white" size={40} />
      </div>
    </motion.a>
  );
}

/* ──────────────────── Main Export ──────────────────── */

export function NewsroomContent(): React.JSX.Element {
  const featured = NEWS_ARTICLES.find((a) => a.featured);
  const gridArticles = NEWS_ARTICLES.filter((a) => !a.featured);

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-12 md:pb-[80px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
      >
        <div className="max-w-[1340px] mx-auto flex flex-col gap-5 relative z-10">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-normal text-[40px] md:text-[48px] lg:text-[56px] text-white tracking-[-0.03em] leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Newsroom
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[17px] md:text-[18px] text-white/75 leading-[1.6] max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          >
            CleanStart in the press — coverage, partnerships, and industry
            insights.
          </motion.p>
        </div>
      </section>

      {/* ── Featured Article ── */}
      {featured && (
        <section className="bg-[#f8f9fb] px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
          <div className="max-w-[1340px] mx-auto">
            <FeaturedArticleCard article={featured} />
          </div>
        </section>
      )}

      {/* ── News Grid ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-10">
            <motion.div
              className="w-full lg:w-[670px] shrink-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0, ease: EASE }}
            >
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                CleanStart in the News
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gridArticles.map((article, i) => (
              <NewsGridCard key={article.id} article={article} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
