"use client";

import { motion, useInView } from "motion/react";
import { useState, useEffect, useRef, useMemo } from "react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';
import { CircleArrowCTA } from '@/components/shared/circle-arrow-cta';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ═══════════════════════════════════════════════
   Custom SVG Icons
   ═══════════════════════════════════════════════ */

function AnimatedShieldIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M20 4L6 10V20C6 28.4 12 35.2 20 37C28 35.2 34 28.4 34 20V10L20 4Z"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: EASE }}
      />
      <motion.path
        d="M14 20L18 24L26 16"
        fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.6, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedClockIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.path
        d="M20 10V20L26 23"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.5, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedGlobeIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.circle cx="20" cy="20" r="16" fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.path d="M4 20H36" fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
      />
      <motion.ellipse cx="20" cy="20" rx="8" ry="16" fill="none" stroke={color} strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.6, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedUsersIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.circle cx="16" cy="12" r="5" fill="none" stroke={color} strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay, type: "spring", stiffness: 300, damping: 35 }}
      />
      <motion.path d="M6 32C6 26.5 10.5 22 16 22C21.5 22 26 26.5 26 32"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3, ease: EASE }}
      />
      <motion.circle cx="28" cy="14" r="4" fill="none" stroke={color} strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring", stiffness: 300, damping: 35 }}
      />
      <motion.path d="M28 22C32 22 35 25 35 29"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + 0.5, ease: EASE }}
      />
    </svg>
  );
}

function AnimatedRocketIcon({ color, delay = 0 }: { color: string; delay?: number }) {
  return (
    <svg viewBox="0 0 40 40" width="28" height="28">
      <motion.path
        d="M20 4C20 4 28 8 28 20L24 28H16L12 20C12 8 20 4 20 4Z"
        fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: EASE }}
      />
      <motion.circle cx="20" cy="16" r="3" fill="none" stroke={color} strokeWidth="2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.6, type: "spring", stiffness: 300, damping: 35 }}
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="M21 21L16.65 16.65" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9L12 15L18 9" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Floating Code Brackets (Hero BG)
   ═══════════════════════════════════════════════ */

function FloatingBracket({ x, y, size, delay, color }: { x: string; y: string; size: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 0.3, y: 0, scale: 1 }}
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path d="M14 8L6 20L14 32" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M26 8L34 20L26 32" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M22 6L18 34" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   Job Listings Data
   ═══════════════════════════════════════════════ */

interface JobListing {
  id: number;
  title: string;
  department: string;
  location: string;
  experience: string;
}

const jobListings: JobListing[] = [
  { id: 1, title: "Finance & Compliance Manager \u2013 Global Accounting", department: "Admin & IT", location: "Ahmedabad", experience: "4\u20136 Years" },
  { id: 2, title: "HR Executive \u2013 People Operations & Talent", department: "HR", location: "Ahmedabad", experience: "1\u20133 Years" },
  { id: 3, title: "Admin & Operations Executive", department: "Admin", location: "Ahmedabad", experience: "2\u20134 Years" },
  { id: 4, title: "Marketing Content Specialist", department: "Marketing", location: "Ahmedabad / Bengaluru", experience: "3\u20137 Years" },
  { id: 5, title: "Developer Advocate", department: "Marketing", location: "Bengaluru", experience: "3\u20137 Years" },
  { id: 6, title: "Customer Acquisition Executive", department: "Customer Acquisition", location: "Ahmedabad", experience: "3\u20135 Years" },
  { id: 7, title: "Business Development Representative", department: "Sales", location: "SE Asia / Australia", experience: "3\u20134 Years" },
  { id: 8, title: "Sales Engineer", department: "Sales", location: "Singapore", experience: "5\u20136 Years" },
  { id: 9, title: "Pre-Sales Engineer", department: "Sales", location: "Mumbai", experience: "10+ Years" },
  { id: 10, title: "Enterprise Account Executive", department: "Sales", location: "Singapore", experience: "5+ Years" },
];

const allDepartments = Array.from(new Set(jobListings.map((j) => j.department)));

const cultureCards = [
  {
    icon: (d: number) => <AnimatedShieldIcon color="#06C7F2" delay={d} />,
    title: "Meaningful Mission",
    description: "Build compliance into the foundation of software. Your work protects organizations worldwide.",
  },
  {
    icon: (d: number) => <AnimatedClockIcon color="#06C7F2" delay={d} />,
    title: "Security & Speed",
    description: "We build systems where security and speed reinforce each other, not compete.",
  },
  {
    icon: (d: number) => <AnimatedRocketIcon color="#06C7F2" delay={d} />,
    title: "Measurable Impact",
    description: "Every feature you ship makes software supply chains more trustworthy and verifiable.",
  },
  {
    icon: (d: number) => <AnimatedGlobeIcon color="#06C7F2" delay={d} />,
    title: "Global Reach",
    description: "Work with the world\u2019s largest enterprises across continents and industries.",
  },
];

/* ═══════════════════════════════════════════════
   Department Tag Colors
   ═══════════════════════════════════════════════ */

function getDeptColor(dept: string): { bg: string; text: string } {
  const colorMap: Record<string, { bg: string; text: string }> = {
    "Admin & IT": { bg: "rgba(93,4,216,0.08)", text: "#5d04d8" },
    HR: { bg: "rgba(5,107,241,0.08)", text: "#056BF1" },
    Admin: { bg: "rgba(6,199,242,0.08)", text: "#0590b8" },
    Marketing: { bg: "rgba(5,107,241,0.08)", text: "#056BF1" },
    "Customer Acquisition": { bg: "rgba(93,4,216,0.08)", text: "#5d04d8" },
    Sales: { bg: "rgba(6,199,242,0.08)", text: "#0590b8" },
  };
  return colorMap[dept] || { bg: "rgba(5,107,241,0.08)", text: "#056BF1" };
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
      }}
    >
      {/* Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="careers-hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#careers-hero-grid)" />
      </svg>

      {/* Floating brackets */}
      <FloatingBracket x="7%" y="20%" size={52} delay={0.5} color="#06c7f2" />
      <FloatingBracket x="88%" y="15%" size={44} delay={0.8} color="#ffffff" />
      <FloatingBracket x="14%" y="65%" size={38} delay={1.1} color="#cdf5fe" />
      <FloatingBracket x="80%" y="60%" size={50} delay={1.4} color="#06c7f2" />
      <FloatingBracket x="50%" y="78%" size={34} delay={1.7} color="#ffffff" />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 55% 40% at 50% 35%, rgba(6,199,242,0.18) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto px-4 md:px-8 lg:px-[50px] pt-[120px] md:pt-[160px] pb-[100px] md:pb-[140px]">
        <div className="text-center max-w-[820px] mx-auto">
          <motion.h1
            className="font-['Google_Sans',sans-serif] text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-white tracking-[-0.95px] leading-[1.08] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          >
            Build the Future of{" "}
            <span className="text-[#cdf5fe]">Secure Software</span>
          </motion.h1>

          <motion.p
            className="font-['Google_Sans',sans-serif] text-[17px] md:text-[19px] text-white/70 leading-[1.65] max-w-[620px] mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
          >
            Help us empower the world&apos;s largest enterprises to secure their applications. Are you ready to join?
          </motion.p>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease: EASE }}
          >
            <CallToActionButton label="View Open Roles" variant="light" size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   WHY CLEANSTART — Culture Cards
   ═══════════════════════════════════════════════ */

function WhyCleanStartSection() {
  return (
    <section
      className="relative overflow-hidden px-4 md:px-8 lg:px-[50px] py-16 md:py-24 lg:py-[120px]"
      style={{
        background: "linear-gradient(180deg, #0f1924 0%, #141f2e 100%)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 50% 50% at 50% 30%, rgba(6,199,242,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-[1340px] mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14 md:mb-20">
          <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.95px] leading-normal">
              Why CleanStart?
            </h2>
          </motion.div>
          <motion.div className="flex-1" {...anim(0.1)}>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white/60 leading-normal max-w-[526px]">
              Join a mission-driven team building the future of secure software delivery.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
          {cultureCards.map((card, i) => (
            <motion.div
              key={card.title}
              className="relative rounded-[20px] p-[25px] overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: EASE }}
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#06C7F2] to-[#056BF1]" />
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ background: "rgba(6,199,242,0.08)" }}>
                {card.icon(i * 0.1)}
              </div>
              <h3 className="font-['Google_Sans',sans-serif] text-[17px] font-semibold text-white mb-2">{card.title}</h3>
              <p className="font-['Google_Sans',sans-serif] text-[14px] text-white/50 leading-[1.7]">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   OPEN ROLES — Filterable Job Cards
   ═══════════════════════════════════════════════ */

function OpenRolesSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState<string>("All");
  const [deptDropdownOpen, setDeptDropdownOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const matchesSearch =
        searchQuery === "" ||
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDept = selectedDept === "All" || job.department === selectedDept;
      return matchesSearch && matchesDept;
    });
  }, [searchQuery, selectedDept]);

  return (
    <section id="open-roles" className="bg-white px-4 md:px-8 lg:px-[50px] py-16 md:py-24 lg:py-[120px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <motion.h2
            className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#0f1924] tracking-[-0.95px] leading-[1.1] mb-5"
            {...anim(0.1)}
          >
            Find Your Role
          </motion.h2>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-[#64748B] leading-[1.65] max-w-[520px] mx-auto"
            {...anim(0.15)}
          >
            Explore opportunities across engineering, sales, marketing, and operations.
          </motion.p>
        </div>

        {/* Filters */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-10"
          {...anim(0.2)}
        >
          <div className="flex-1 relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search job titles, departments, locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-[14px] border border-black/[0.08] bg-white font-['Google_Sans',sans-serif] text-[14px] text-[#0f1924] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
            />
          </div>

          {/* Department filter */}
          <div className="relative">
            <button
              onClick={() => setDeptDropdownOpen(!deptDropdownOpen)}
              className="px-5 py-3.5 rounded-[14px] border border-black/[0.08] bg-white font-['Google_Sans',sans-serif] text-[14px] text-[#0f1924] hover:border-[#056BF1] transition-colors flex items-center gap-2 min-w-[180px] justify-between"
            >
              <span>{selectedDept === "All" ? "All Departments" : selectedDept}</span>
              <ChevronDownIcon />
            </button>
            {deptDropdownOpen && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-[14px] border border-black/[0.08] shadow-lg z-20 overflow-hidden">
                <button
                  onClick={() => { setSelectedDept("All"); setDeptDropdownOpen(false); }}
                  className="w-full text-left px-4 py-2.5 font-['Google_Sans',sans-serif] text-[14px] text-[#0f1924] hover:bg-[#f6f7f9] transition-colors"
                >
                  All Departments
                </button>
                {allDepartments.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setSelectedDept(dept); setDeptDropdownOpen(false); }}
                    className="w-full text-left px-4 py-2.5 font-['Google_Sans',sans-serif] text-[14px] text-[#0f1924] hover:bg-[#f6f7f9] transition-colors"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.p
          className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] mb-6"
          {...anim(0.25)}
        >
          Showing {filteredJobs.length} of {jobListings.length} positions
        </motion.p>

        {/* Job cards */}
        <div className="flex flex-col gap-4">
          {filteredJobs.map((job, i) => {
            const deptColor = getDeptColor(job.department);
            return (
              <motion.div
                key={job.id}
                className="relative bg-white rounded-[20px] p-[25px] overflow-hidden transition-all duration-300 group"
                style={{ border: "1px solid rgba(0,0,0,0.06)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1 flex flex-col gap-3">
                    {/* Department tag */}
                    <span
                      className="inline-flex items-center text-[12px] font-semibold px-3 py-1 rounded-full font-['Google_Sans',sans-serif] w-fit uppercase tracking-[0.05em]"
                      style={{ background: deptColor.bg, color: deptColor.text }}
                    >
                      {job.department}
                    </span>

                    {/* Title */}
                    <h3 className="font-['Google_Sans',sans-serif] text-[17px] md:text-[18px] font-semibold text-[#0f1924] group-hover:text-[#056BF1] transition-colors">
                      {job.title}
                    </h3>

                    {/* Location & experience badges */}
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-[#f6f7f9] text-[#64748B] text-[13px] px-3 py-1 rounded-full font-['Google_Sans',sans-serif]">
                        <MapPinIcon />
                        {job.location}
                      </span>
                      <span className="inline-flex items-center gap-1.5 bg-[#f6f7f9] text-[#64748B] text-[13px] px-3 py-1 rounded-full font-['Google_Sans',sans-serif]">
                        <BriefcaseIcon />
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  {/* Apply button */}
                  <div className="self-start md:self-center shrink-0">
                    <CircleArrowCTA variant="filled-blue" size={40} />
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* No results */}
          {filteredJobs.length === 0 && (
            <div className="text-center py-16">
              <p className="font-['Google_Sans',sans-serif] text-[20px] font-semibold text-[#0f1924] mb-2">No positions found</p>
              <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B]">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   LIFE AT CLEANSTART — Culture Section
   ═══════════════════════════════════════════════ */

function LifeAtCleanStartSection() {
  return (
    <section className="bg-[#f6f7f9] px-4 md:px-8 lg:px-[50px] py-16 md:py-24 lg:py-[120px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <h2 className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] font-semibold text-[#0f1924] tracking-[-0.95px] leading-[1.1] mb-5">
              Life at CleanStart
            </h2>
            <p className="font-['Google_Sans',sans-serif] text-[16px] text-[#64748B] leading-[1.7] mb-8">
              We move fast, stay curious, and build things that matter. Our teams are small, empowered, and globally distributed across engineering, security, and product.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: (d: number) => <AnimatedRocketIcon color="#056BF1" delay={d} />, title: "Move Fast", desc: "Ship features, not slides" },
                { icon: (d: number) => <AnimatedUsersIcon color="#056BF1" delay={d} />, title: "Collaborate", desc: "Small teams, big ownership" },
                { icon: (d: number) => <AnimatedGlobeIcon color="#056BF1" delay={d} />, title: "Work Globally", desc: "Distributed across continents" },
              ].map((item, i) => (
                <div key={item.title} className="bg-white rounded-[16px] p-5" style={{ border: "1px solid rgba(0,0,0,0.04)" }}>
                  <div className="w-12 h-12 rounded-xl bg-[#056BF1]/[0.06] flex items-center justify-center mb-3">
                    {item.icon(i * 0.1)}
                  </div>
                  <h3 className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#0f1924] mb-1">{item.title}</h3>
                  <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B]">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual grid */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div
              className="rounded-[20px] p-8 flex flex-col justify-end h-[160px]"
              style={{ background: "linear-gradient(135deg, #f0f7ff, #e4f0ff)" }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="mb-3">
                <path d="M20 4C20 4 28 8 28 20L24 28H16L12 20C12 8 20 4 20 4Z" stroke="#056BF1" strokeWidth="2" />
                <circle cx="20" cy="16" r="3" stroke="#056BF1" strokeWidth="2" />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#0f1924]">Innovation</span>
            </div>
            <div
              className="rounded-[20px] p-8 flex flex-col justify-end h-[160px]"
              style={{ background: "linear-gradient(135deg, #056BF1, #0559d4)" }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="mb-3">
                <path d="M20 4L6 10V20C6 28.4 12 35.2 20 37C28 35.2 34 28.4 34 20V10L20 4Z" stroke="white" strokeWidth="2" />
                <path d="M14 20L18 24L26 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-white">Security First</span>
            </div>
            <div
              className="rounded-[20px] p-8 flex flex-col justify-end h-[160px]"
              style={{ background: "linear-gradient(135deg, #0f1924, #1a2a3a)" }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="mb-3">
                <path d="M6 34L14 20L22 26L34 6" stroke="#06C7F2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-white">Speed</span>
            </div>
            <div
              className="rounded-[20px] p-8 flex flex-col justify-end h-[160px]"
              style={{ background: "linear-gradient(135deg, #cdf5fe, #e4f9ff)" }}
            >
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none" className="mb-3">
                <circle cx="20" cy="20" r="16" stroke="#0590b8" strokeWidth="2" />
                <path d="M4 20H36" stroke="#0590b8" strokeWidth="2" />
                <ellipse cx="20" cy="20" rx="8" ry="16" stroke="#0590b8" strokeWidth="2" />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#0f1924]">Global</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════════ */

function CtaSection() {
  return (
    <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-16 md:py-24 lg:py-[120px]">
      <div className="max-w-[1340px] mx-auto">
        <div className="max-w-[900px] mx-auto text-center flex flex-col gap-6">
          <motion.h2
            className="font-['Google_Sans',sans-serif] text-[32px] md:text-[40px] lg:text-[48px] font-semibold text-[#0f1924] tracking-[-0.95px] leading-[1.1]"
            {...anim(0)}
          >
            Don&apos;t see your role?
          </motion.h2>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-[#64748B] leading-[1.65] mb-4"
            {...anim(0.1)}
          >
            We&apos;re always looking for exceptional talent. Send us your resume and tell us how you can contribute.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            {...anim(0.2)}
          >
            <CallToActionButton label="Contact HR" variant="dark" size="lg" />
            <CallToActionButton label="Apply Now" variant="dark" size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   MAIN EXPORT
   ═══════════════════════════════════════════════ */

export function CareersContent() {
  return (
    <>
      <HeroSection />
      <WhyCleanStartSection />
      <OpenRolesSection />
      <LifeAtCleanStartSection />
      <CtaSection />
    </>
  );
}
