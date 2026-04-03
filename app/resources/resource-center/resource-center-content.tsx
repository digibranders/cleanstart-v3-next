"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleArrowCTA } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type ResourceType =
  | "Whitepaper"
  | "Ebook"
  | "Datasheet"
  | "Architecture Insights"
  | "Report";

interface Resource {
  id: number;
  title: string;
  type: ResourceType;
  image: string;
  cta: "Read More" | "Download";
}

const resources: Resource[] = [
  // Architecture Insights
  { id: 1, title: "Retrofitting Security vs Building It In", type: "Architecture Insights", image: "/resource-center/retrofitting-security-vs-building-it-in.jpg", cta: "Read More" },
  { id: 2, title: "Isolated Package Compilation", type: "Architecture Insights", image: "/resource-center/isolated-package-compilation.jpg", cta: "Read More" },
  { id: 3, title: "Eliminating the Security-Velocity Trade-off", type: "Architecture Insights", image: "/resource-center/eliminating-the-security.png", cta: "Read More" },
  { id: 4, title: "VEX and the Shift From Vulnerability Presence to Exploitability", type: "Architecture Insights", image: "/resource-center/vex-and-the-shift-from-vulnerability-presence-to-exploitability.jpg", cta: "Read More" },
  { id: 5, title: "SLSA Levels as Architectural States of Trust", type: "Architecture Insights", image: "/resource-center/slsa-levels-as-architectural-states-of-trust.jpg", cta: "Read More" },
  { id: 6, title: "STIG Hardening by Design", type: "Architecture Insights", image: "/resource-center/stig-hardening.png", cta: "Read More" },
  { id: 7, title: "STIG & OpenSCAP Compliance Architecture", type: "Architecture Insights", image: "/resource-center/stig-and-openscap.png", cta: "Read More" },
  { id: 8, title: "Dependency Management and Attack Surface Reduction", type: "Architecture Insights", image: "/resource-center/dependency-management-and-attack-surface-reduction.png", cta: "Read More" },
  // Whitepapers
  { id: 9, title: "Secure Lightweight Container Images", type: "Whitepaper", image: "/resource-center/secure-lightweight.png", cta: "Download" },
  { id: 10, title: "The Real Cost of Public Container Images", type: "Whitepaper", image: "/resource-center/the-real-cost-of-public-container-images.png", cta: "Download" },
  { id: 11, title: "Rethinking Container Builds for Security and Scale", type: "Whitepaper", image: "/resource-center/rethinking-container-builds-for-security-and-bscale.png", cta: "Download" },
  // Ebooks
  { id: 12, title: "Containing Vulnerabilities in your Containers", type: "Ebook", image: "/resource-center/containing-vulnerabilities-in-your-container.webp", cta: "Download" },
  // Datasheets
  { id: 13, title: "CleanSight", type: "Datasheet", image: "/resource-center/cleansight-2.jpg", cta: "Download" },
  { id: 14, title: "CleanStart AI-SBOM", type: "Datasheet", image: "/resource-center/ai-sbom.jpg", cta: "Download" },
  { id: 15, title: "Enterprise-Grade Hardened Container Images", type: "Datasheet", image: "/resource-center/enterprise-grade-hardened-container-images.png", cta: "Download" },
  { id: 16, title: "Software Bill of Materials", type: "Datasheet", image: "/resource-center/software-bill-of-materials.png", cta: "Download" },
  // Reports
  { id: 17, title: "Securing the Software Supply Chain in 2026", type: "Report", image: "/resource-center/cover-thumbnail.jpg", cta: "Download" },
];

const typeFilters: string[] = [
  "All",
  "Whitepaper",
  "Ebook",
  "Datasheet",
  "Architecture Insights",
  "Report",
];

const badgeColors: Record<ResourceType, { bg: string; text: string }> = {
  "Architecture Insights": { bg: "rgba(93, 4, 216, 0.08)", text: "#5d04d8" },
  Whitepaper: { bg: "rgba(5, 107, 241, 0.08)", text: "#056BF1" },
  Ebook: { bg: "rgba(217, 119, 6, 0.08)", text: "#d97706" },
  Datasheet: { bg: "rgba(6, 199, 242, 0.08)", text: "#0891b2" },
  Report: { bg: "rgba(5, 150, 105, 0.08)", text: "#059669" },
};

export function ResourceCenterContent() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = resources.filter((r) => {
    const matchType = activeFilter === "All" || r.type === activeFilter;
    const matchSearch =
      searchQuery === "" ||
      r.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-16 md:pb-[100px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
      >
        <div className="max-w-[1340px] mx-auto relative z-10">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-normal text-[38px] md:text-[48px] lg:text-[56px] text-white tracking-[-0.02em] leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            Resource Center
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[17px] md:text-[19px] text-white/80 leading-relaxed max-w-[640px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            A curated library of whitepapers, datasheets, architecture insights,
            and reports.
          </motion.p>
        </div>
      </section>

      {/* ── Filters + Grid ── */}
      <section className="bg-[#f8fafc] px-4 md:px-8 lg:px-[50px] py-[60px] md:py-[80px]">
        <div className="max-w-[1340px] mx-auto">
          {/* Search + Filter Bar */}
          <motion.div
            className="flex flex-col md:flex-row md:items-center gap-5 mb-10"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Search */}
            <div className="relative w-full md:w-[300px] shrink-0">
              <img
                src="/resource-center/search.svg"
                alt=""
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
              />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#ecedef] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1]/30 focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <img
                src="/resource-center/hugeicons-filter.svg"
                alt=""
                className="w-4 h-4 opacity-40 hidden md:block"
              />
              {typeFilters.map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className={`px-4 py-2 rounded-full font-['Google_Sans',sans-serif] text-[13px] font-medium transition-all duration-300 ${
                    activeFilter === t
                      ? "bg-[#056BF1] text-white shadow-md shadow-[#056BF1]/20"
                      : "bg-white text-[#64748B] border border-[#ecedef] hover:border-[#056BF1]/30 hover:text-[#056BF1]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Resource Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter + searchQuery}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.map((resource, i) => {
                const badge = badgeColors[resource.type];
                return (
                  <motion.div
                    key={resource.id}
                    className="group bg-white border border-[#ecedef] rounded-[15px] overflow-hidden cursor-pointer flex flex-col transition-shadow duration-300 hover:scale-[1.02]"
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.5,
                      delay: (i % 9) * 0.06,
                      ease: EASE,
                    }}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#ecedef]">
                      <img
                        src={resource.image}
                        alt={resource.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col flex-1 p-5 md:p-6">
                      {/* Type Badge */}
                      <span
                        className="inline-block self-start px-3 py-1 rounded-full font-['Google_Sans',sans-serif] text-[12px] font-semibold mb-3"
                        style={{
                          backgroundColor: badge.bg,
                          color: badge.text,
                        }}
                      >
                        {resource.type}
                      </span>

                      {/* Title */}
                      <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[17px] md:text-[18px] text-[#181818] leading-[1.35] mb-4 group-hover:text-[#056BF1] transition-colors duration-300">
                        {resource.title}
                      </h3>

                      {/* CTA */}
                      <div className="mt-auto pt-4 border-t border-[#ecedef]">
                        <CircleArrowCTA variant="blue-white" size={40} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-['Google_Sans',sans-serif] text-[16px] text-[#94A3B8]">
                No resources found. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
