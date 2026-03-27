"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Shield,
  Key,
  Eye,
  FileCheck,
  GitBranch,
  Lock,
  AlertTriangle,
  Fingerprint,
  Database,
  Clock,
} from "lucide-react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface KnowledgeArticle {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  topics: string[];
  readTime: string;
}

const knowledgeArticles: KnowledgeArticle[] = [
  {
    id: 1,
    title: "How to Use VEX Documents to Suppress Non-Exploitable CVEs in Your Pipeline",
    category: "Emerging Standards",
    description:
      "Vulnerability Exploitability eXchange (VEX) enables software suppliers and security teams to communicate whether vulnerabilities in software components are actually exploitable in a specific product context.",
    icon: <AlertTriangle className="w-6 h-6" />,
    topics: ["CVE Alert Fatigue", "VEX Status Types", "OpenVEX", "CSAF VEX", "CycloneDX VEX", "CI/CD Integration"],
    readTime: "15 min read",
  },
  {
    id: 2,
    title: "How to Implement Keyless Container Image Signing Using Sigstore Fulcio and OIDC Identity",
    category: "Security Features",
    description:
      "Identity-based signing architecture using ephemeral certificate issuance, OIDC configuration for GitHub Actions and GitLab CI/CD, signature verification, and policy enforcement.",
    icon: <Key className="w-6 h-6" />,
    topics: ["Ephemeral Signing", "Fulcio CA", "Rekor Transparency Log", "Kyverno Policies", "Air-Gapped Verification"],
    readTime: "20 min read",
  },
  {
    id: 3,
    title: "Publishing and Querying Container Signatures in Rekor Transparency Logs",
    category: "Security Features",
    description:
      "Technical workflow for persisting container signatures and querying immutable audit trails using Sigstore ecosystem components including Trillian and Merkle trees.",
    icon: <Fingerprint className="w-6 h-6" />,
    topics: ["Rekor Architecture", "Trillian Integration", "Merkle Trees", "rekor-cli", "Forensics & Auditing"],
    readTime: "18 min read",
  },
  {
    id: 4,
    title: "Vulnerability Monitoring",
    category: "Product Security",
    description:
      "CleanStart provides continuous vulnerability scanning that monitors multiple threat intelligence sources to identify new security issues that might affect your containers.",
    icon: <Eye className="w-6 h-6" />,
    topics: ["Multi-Source Scanning", "Real-Time Alerts", "Proprietary Intelligence", "Automated Patch Management"],
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "How to Design an Automated Attestation Pipeline for Software Factory Architecture",
    category: "DevOps / Kyverno",
    description:
      "Comprehensive guide for automating cryptographic verification throughout the software supply chain to achieve SLSA compliance across five pipeline stages.",
    icon: <GitBranch className="w-6 h-6" />,
    topics: ["Attestation Pipeline", "in-toto Format", "SLSA Levels", "OPA Policies", "Kyverno Enforcement"],
    readTime: "22 min read",
  },
  {
    id: 6,
    title: "What Are Attestation-Based Admission Policies and Why Do They Matter",
    category: "Compliance & Certification",
    description:
      "Supply chain security through attestation verification at the Kubernetes admission layer to prevent untrusted artifacts from reaching production.",
    icon: <FileCheck className="w-6 h-6" />,
    topics: ["Admission Control", "DevSecOps Practices", "Artifact Verification", "Kubernetes Gatekeeper"],
    readTime: "12 min read",
  },
];

const categories = ["All", "Emerging Standards", "Security Features", "Product Security", "DevOps / Kyverno", "Compliance & Certification"];

const categoryIcons: Record<string, React.ReactNode> = {
  "Emerging Standards": <Database className="w-4 h-4" />,
  "Security Features": <Shield className="w-4 h-4" />,
  "Product Security": <Eye className="w-4 h-4" />,
  "DevOps / Kyverno": <GitBranch className="w-4 h-4" />,
  "Compliance & Certification": <Lock className="w-4 h-4" />,
};

/* ---------- Frosted Glass Supply Chain Infographic ---------- */
function SupplyChainInfographic() {
  const stages = [
    { label: "Source", icon: <Database className="w-5 h-5" />, color: "#056bf1" },
    { label: "Build", icon: <GitBranch className="w-5 h-5" />, color: "#5d04d8" },
    { label: "Test", icon: <FileCheck className="w-5 h-5" />, color: "#06c7f2" },
    { label: "SBOM", icon: <Fingerprint className="w-5 h-5" />, color: "#059669" },
    { label: "Deploy", icon: <Shield className="w-5 h-5" />, color: "#056bf1" },
  ];

  return (
    <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#0f1924] via-[#0a2a5c] to-[#056bf1] p-8 md:p-12">
      {/* Grid background */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="kh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#kh-grid)" />
      </svg>

      <div className="relative z-10">
        <motion.p
          className="font-['Google_Sans',sans-serif] text-[12px] font-medium text-[#06c7f2] mb-2 uppercase tracking-wider text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          Software Supply Chain Pipeline
        </motion.p>
        <motion.h3
          className="font-['Google_Sans',sans-serif] text-[20px] md:text-[24px] font-normal text-white text-center mb-10 tracking-[-0.02em]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          Five Stages of Verified Trust
        </motion.h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex items-center gap-3">
              <motion.div
                className="rounded-2xl p-4 md:p-5 flex flex-col items-center gap-2 min-w-[100px]"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.20)",
                  backdropFilter: "blur(24px)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.15)",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: EASE }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${stage.color}30` }}
                >
                  <div style={{ color: stage.color }}>{stage.icon}</div>
                </div>
                <span className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-white">
                  {stage.label}
                </span>
                <div className="w-full h-[3px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${stage.color}, transparent)` }} />
              </motion.div>

              {/* Animated connector arrow */}
              {i < stages.length - 1 && (
                <motion.div
                  className="hidden md:block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.12 + 0.2 }}
                >
                  <svg width="40" height="12" viewBox="0 0 40 12" fill="none">
                    {/* Track */}
                    <line x1="0" y1="6" x2="30" y2="6" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                    {/* Animated line */}
                    <motion.line
                      x1="0" y1="6" x2="30" y2="6"
                      stroke={stages[i + 1].color}
                      strokeWidth="2"
                      strokeDasharray="30"
                      initial={{ strokeDashoffset: 30 }}
                      whileInView={{ strokeDashoffset: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.15 + 0.4, ease: EASE }}
                    />
                    {/* Arrowhead */}
                    <motion.path
                      d="M30 2L38 6L30 10"
                      fill={stages[i + 1].color}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.15 + 0.9 }}
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function KnowledgeHubContent() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = knowledgeArticles.filter((a) => {
    const matchCat = activeCategory === "All" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-12 md:pb-[80px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{ backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)' }}
      >
        <div className="max-w-[1340px] mx-auto flex flex-col gap-6 relative z-10">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-normal text-[40px] md:text-[48px] lg:text-[56px] text-white tracking-[-0.95px] leading-[1.1] max-w-[800px]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            Knowledge Hub
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] font-normal text-[18px] text-white/80 leading-relaxed max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Deep-dive tutorials, implementation guides, and best practices from our engineering and security teams.
          </motion.p>
        </div>
      </section>

      {/* Pipeline Infographic */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-[60px]">
        <div className="max-w-[1340px] mx-auto">
          <SupplyChainInfographic />
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[#f8fafc] px-4 md:px-8 lg:px-[50px] pt-[50px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-['Google_Sans',sans-serif] text-[13px] font-medium transition-all duration-300 ${
                    activeCategory === cat
                      ? "bg-[#056bf1] text-white shadow-md scale-[1.05]"
                      : "bg-white text-[#64748B] border border-black/[0.06] hover:border-[#056bf1]/30 hover:text-[#056bf1]"
                  }`}
                >
                  {cat !== "All" && categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search guides..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-black/[0.06] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf1]/30 focus:ring-2 focus:ring-[#056bf1]/10 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[#f8fafc] px-4 md:px-8 lg:px-[50px] py-[50px]">
        <div className="max-w-[1340px] mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filtered.map((article, i) => (
                <motion.article
                  key={article.id}
                  className="group bg-white border border-black/[0.06] rounded-2xl p-6 md:p-8 hover:translate-y-[-6px] transition-all duration-300 cursor-pointer flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-[#056bf1]/[0.06] flex items-center justify-center text-[#056bf1] shrink-0">
                      {article.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="font-['Google_Sans',sans-serif] text-[12px] font-medium text-[#056bf1] bg-[#056bf1]/[0.06] px-2.5 py-0.5 rounded-full">
                          {article.category}
                        </span>
                        <span className="flex items-center gap-1 font-['Google_Sans',sans-serif] text-[12px] text-[#94A3B8]">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="font-['Google_Sans',sans-serif] font-normal text-[18px] md:text-[20px] text-[#181818] leading-[1.3] tracking-[-0.01em] group-hover:text-[#056bf1] transition-colors">
                        {article.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] leading-relaxed mb-5 flex-1">
                    {article.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {article.topics.map((topic) => (
                      <span
                        key={topic}
                        className="px-2.5 py-1 rounded-lg bg-[#f8fafc] border border-black/[0.04] font-['Google_Sans',sans-serif] text-[11px] text-[#64748B]"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="pt-4 border-t border-black/[0.06]">
                    <CallToActionButton label="Read Guide" variant="dark" size="sm" />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="font-['Google_Sans',sans-serif] text-[16px] text-[#94A3B8]">
                No guides found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-[80px]">
        <div className="max-w-[1340px] mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="text-center mb-12">
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] text-[#181818] leading-[1.2] tracking-[-0.02em] mb-3">
                Core Product Capabilities
              </h2>
              <p className="font-['Google_Sans',sans-serif] text-[16px] text-[#64748B]">
                Technical foundations covered in our knowledge base
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "CleanStart Images", desc: "CVE-free container images with attack surface reduction", icon: <Shield className="w-5 h-5" /> },
              { title: "CleanStart SBOM", desc: "Software Bill of Materials generation and verification", icon: <Database className="w-5 h-5" /> },
              { title: "CleanSight", desc: "Continuous container visibility and monitoring", icon: <Eye className="w-5 h-5" /> },
              { title: "Keyless Signing", desc: "Sigstore / Fulcio implementation with OIDC federation", icon: <Key className="w-5 h-5" /> },
              { title: "Automated Attestation", desc: "SLSA compliance and provenance documentation", icon: <FileCheck className="w-5 h-5" /> },
              { title: "Runtime Evidence", desc: "Continuous monitoring and immutable audit trails", icon: <Fingerprint className="w-5 h-5" /> },
            ].map((cap, i) => (
              <motion.div
                key={cap.title}
                className="group bg-[#f8fafc] rounded-2xl p-6 hover:bg-[#056bf1] hover:translate-y-[-4px] transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
              >
                <div className="w-10 h-10 rounded-xl bg-[#056bf1]/10 group-hover:bg-white/20 flex items-center justify-center text-[#056bf1] group-hover:text-white mb-3 transition-all">
                  {cap.icon}
                </div>
                <h4 className="font-['Google_Sans',sans-serif] font-medium text-[16px] text-[#181818] group-hover:text-white mb-1 transition-colors">
                  {cap.title}
                </h4>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B] group-hover:text-white/80 transition-colors">
                  {cap.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 md:px-8 lg:px-[50px] py-[80px] mb-[60px] md:mb-[120px]">
        <div className="max-w-[1340px] mx-auto">
          <ScrollReveal direction="up" delay={0}>
            <div className="bg-[#056bf1] rounded-2xl px-8 md:px-12 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h2 className="font-['Google_Sans',sans-serif] font-normal text-[28px] md:text-[36px] text-white leading-[1.2] tracking-[-0.02em] mb-3">
                  Contribute to the Hub
                </h2>
                <p className="font-['Google_Sans',sans-serif] text-[16px] text-white/80 leading-[1.6]">
                  Are you a security expert? We welcome guest contributions to our knowledge base.
                </p>
              </div>
              <div className="shrink-0">
                <CallToActionButton label="Submit a Guide" variant="light" size="md" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
