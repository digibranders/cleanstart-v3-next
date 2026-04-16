"use client";

import { motion } from "motion/react";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { CallToActionButton } from "@/components/shared/call-to-action-button";

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                  */
/* ------------------------------------------------------------------ */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const anim = (delay = 0) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: EASE },
});

/* ------------------------------------------------------------------ */
/*  Static Data                                                        */
/* ------------------------------------------------------------------ */

interface ResourceItem {
  title: string;
  subtitle?: string;
  date: string;
}

interface DiscussionItem {
  title: string;
  timeAgo: string;
}

interface GalleryCard {
  title: string;
  category: string;
  date: string;
  gradient: string;
}

interface TestimonialData {
  quote: string;
  author: string;
  role: string;
}

const WHATS_NEW_ITEMS: ResourceItem[] = [
  { title: "Secure Container Pipelines Whitepaper", date: "April 20" },
  { title: "Zero-CVE Pipeline Best Practices", subtitle: "Security Playbook", date: "April 12" },
  { title: "Understanding SBOMs Guide", date: "April 5" },
];

const DISCUSSION_ITEMS: DiscussionItem[] = [
  { title: "Creating Secure Container Pipelines", timeAgo: "2 hours ago" },
  { title: "Best practices for SBOM management", timeAgo: "6 hours ago" },
  { title: "Achieving Zero-CVE Images in 2024", timeAgo: "1 day ago" },
];

const COMMUNITY_IMAGE_LIST: ResourceItem[] = [
  { title: "Secure Container Pipelines Whitepaper", date: "April 20" },
  { title: "Zero-CVE Pipeline Best Practices", subtitle: "Security Playbook", date: "April 12" },
  { title: "Understanding SBOMs Guide", date: "April 5" },
];

const IMAGE_GALLERY_CARDS: GalleryCard[] = [
  { title: "SBOM Best Practices", category: "Workshop", date: "April 15", gradient: "from-[#056BF1]/30 to-[#06C7F2]/20" },
  { title: "Secure Container Pipelines", category: "Guide", date: "April 20", gradient: "from-[#0F1924]/30 to-[#056BF1]/20" },
  { title: "DevSecOps Dashboard", category: "Dashboard", date: "April 10", gradient: "from-[#06C7F2]/30 to-[#056BF1]/10" },
  { title: "Vulnerability Scan", category: "Vulnerability Scan", date: "April 8", gradient: "from-[#0F1924]/20 to-[#06C7F2]/20" },
];

const TESTIMONIAL: TestimonialData = {
  quote: "CleanStart reduced our container vulnerabilities by 90% within the first quarter of adoption.",
  author: "Kevin R.",
  role: "CISO, TechCorp",
};

const TRUSTED_BRANDS = ["Sysdig", "Snyk", "Red Hat", "AWS"];

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                   */
/* ------------------------------------------------------------------ */

function DocumentIcon(): React.ReactElement {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
      <rect width="36" height="36" rx="8" fill="#EBF4FF" />
      <path
        d="M12 10h8l5 5v11a1 1 0 01-1 1H12a1 1 0 01-1-1V11a1 1 0 011-1z"
        stroke="#056BF1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M20 10v5h5" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 19h8M14 22h5" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LinkedInIcon(): React.ReactElement {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
      <rect width="36" height="36" rx="8" fill="#EBF4FF" />
      <path
        d="M14 15v7m4-4.5v4.5m0-4.5a2.5 2.5 0 015 0v4.5m-9-11h.01"
        stroke="#056BF1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="10" y="10" width="16" height="16" rx="2" stroke="#056BF1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ImageIcon(): React.ReactElement {
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" className="shrink-0">
      <rect width="36" height="36" rx="8" fill="#EBF4FF" />
      <rect x="11" y="11" width="14" height="14" rx="2" stroke="#056BF1" strokeWidth="1.5" fill="none" />
      <circle cx="15.5" cy="15.5" r="1.5" fill="#056BF1" />
      <path d="M11 22l3.5-4 2.5 3 3-4 5 5" stroke="#056BF1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function QuoteIcon(): React.ReactElement {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-60">
      <path
        d="M8 20.5C8 14.5 12 10 18 8l1 2c-4 2-6 5-6 8h5v10H8v-7.5zm16 0C24 14.5 28 10 34 8l1 2c-4 2-6 5-6 8h5v10h-10v-7.5z"
        fill="#056BF1"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function HeroPreviewCard(): React.ReactElement {
  return (
    <div className="relative rounded-[20px] bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden">
      <div className="h-[200px] md:h-[240px] bg-gradient-to-br from-[#056BF1]/40 to-[#06C7F2]/30 flex items-center justify-center relative">
        <div className="w-[80%] h-[75%] bg-white/90 rounded-[12px] flex flex-col items-center justify-center gap-3 p-4">
          <div className="w-10 h-10 rounded-full bg-[#056BF1]/10 flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 3h8l4 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" stroke="#056BF1" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
          <span className="text-[#0F1924] font-semibold text-sm text-center leading-tight">
            SBOM Best Practices
          </span>
          <div className="flex gap-1">
            <div className="w-8 h-1 rounded-full bg-[#056BF1]" />
            <div className="w-8 h-1 rounded-full bg-[#056BF1]/30" />
            <div className="w-8 h-1 rounded-full bg-[#056BF1]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ResourceListItem({
  icon,
  title,
  subtitle,
  meta,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  meta: string;
}): React.ReactElement {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#ECEDEF] last:border-b-0 cursor-pointer hover:bg-[#F8FAFC]/60 -mx-2 px-2 rounded-lg transition-colors duration-200">
      {icon}
      <div className="flex-1 min-w-0">
        <p className="text-[#181818] font-medium text-[14px] md:text-[15px] leading-snug">{title}</p>
        {subtitle && (
          <p className="text-[#6B7280] text-[12px] md:text-[13px] mt-0.5">{subtitle}</p>
        )}
        <p className="text-[#9CA3AF] text-[12px] mt-1">{meta}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  children,
  footerLabel,
  footerHref,
}: {
  title: string;
  children: React.ReactNode;
  footerLabel: string;
  footerHref: string;
}): React.ReactElement {
  return (
    <div className="bg-white rounded-[20px] border border-[#ECEDEF] p-6 md:p-8">
      <h3 className="text-[#181818] font-semibold text-[18px] md:text-[20px] mb-4 tracking-[-0.02em]">
        {title}
      </h3>
      <div>{children}</div>
      <div className="mt-5 pt-4 border-t border-[#ECEDEF]">
        <CallToActionButton label={footerLabel} variant="on-white" size="sm" href={footerHref} />
      </div>
    </div>
  );
}

function GalleryCardItem({ card }: { card: GalleryCard }): React.ReactElement {
  return (
    <div className="group rounded-[20px] overflow-hidden border border-[#ECEDEF] bg-white cursor-pointer hover:border-[#056BF1]/20 transition-colors duration-200">
      <div className={`h-[100px] md:h-[120px] bg-gradient-to-br ${card.gradient} relative flex items-end p-3`}>
        <span className="text-[11px] font-medium text-white bg-[#056BF1]/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
          {card.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-[#181818] font-medium text-[13px] md:text-[14px] leading-snug">{card.title}</p>
        <p className="text-[#9CA3AF] text-[11px] md:text-[12px] mt-1">{card.date}</p>
      </div>
    </div>
  );
}

function BrandLogoRow(): React.ReactElement {
  return (
    <div className="flex items-center shrink-0">
      {[...TRUSTED_BRANDS, ...TRUSTED_BRANDS].map((brand, i) => (
        <div key={`${brand}-${i}`} className="flex items-center justify-center px-[14px] py-[18px] h-[85px] w-[182px]">
          <div className="text-black font-['Google_Sans',sans-serif] font-bold text-[16px] tracking-wide opacity-60">
            {brand}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function CommunityContent(): React.ReactElement {
  return (
    <div className="overflow-hidden">
      {/* ===== SECTION 1: Hero ===== */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-12 md:pb-[80px] px-4 md:px-8 lg:px-[50px]"
        style={{
          background: "linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)",
        }}
      >
        {/* Decorative glow */}
        <div className="absolute top-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-[#06C7F2]/10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left — copy */}
          <div>
            <motion.h1
              {...anim(0)}
              className="text-white text-[36px] md:text-[48px] lg:text-[56px] font-bold leading-[1.1] tracking-[-0.02em] mb-4"
            >
              Join the Clean Software Movement
            </motion.h1>
            <motion.p
              {...anim(0.1)}
              className="text-white/80 text-[15px] md:text-[17px] leading-relaxed mb-8 max-w-[520px]"
            >
              Collaborate with developers, security leaders, and enterprises building trusted software.
            </motion.p>
            <motion.div {...anim(0.2)} className="flex flex-wrap gap-3">
              <CallToActionButton label="Join Community" variant="light" size="md" href="/community" />
              <CallToActionButton label="Explore Community Images" variant="ghost-light" size="md" href="/community" />
            </motion.div>
          </div>

          {/* Right — preview card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
            className="hidden lg:block"
          >
            <HeroPreviewCard />
          </motion.div>
        </div>
      </section>

      {/* ===== SECTION 2: What's New + Latest Discussions ===== */}
      <section className="bg-[#F8FAFC] px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ScrollReveal delay={0}>
            <SectionCard title="What&apos;s New" footerLabel="Explore All Resources" footerHref="/resources/resource-center">
              {WHATS_NEW_ITEMS.map((item) => (
                <ResourceListItem
                  key={item.title}
                  icon={<DocumentIcon />}
                  title={item.title}
                  subtitle={item.subtitle}
                  meta={item.date}
                />
              ))}
            </SectionCard>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <SectionCard title="Latest Community Discussions" footerLabel="Explore All Discussions" footerHref="/community">
              {DISCUSSION_ITEMS.map((item) => (
                <ResourceListItem
                  key={item.title}
                  icon={<LinkedInIcon />}
                  title={item.title}
                  meta={item.timeAgo}
                />
              ))}
            </SectionCard>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 3: Community Images List + Gallery ===== */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]">
        <div className="max-w-[1340px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <ScrollReveal delay={0}>
            <SectionCard title="Latest Community Images" footerLabel="Explore All Resources" footerHref="/resources/resource-center">
              {COMMUNITY_IMAGE_LIST.map((item) => (
                <ResourceListItem
                  key={item.title}
                  icon={<ImageIcon />}
                  title={item.title}
                  subtitle={item.subtitle}
                  meta={item.date}
                />
              ))}
            </SectionCard>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div>
              <h3 className="text-[#181818] font-semibold text-[18px] md:text-[20px] mb-5 tracking-[-0.02em]">
                Latest Community Images
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {IMAGE_GALLERY_CARDS.map((card) => (
                  <GalleryCardItem key={card.title} card={card} />
                ))}
              </div>
              <div className="mt-5">
                <CallToActionButton label="Explore All Images" variant="on-white" size="sm" href="/community" />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== SECTION 4: Trusted by Industry Leaders ===== */}
      <section className="bg-[#F8FAFC] px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px] overflow-hidden">
        <div className="max-w-[1340px] mx-auto">
          <motion.p
            {...anim(0)}
            className="text-center text-[#64748B] font-['Google_Sans',sans-serif] text-[14px] md:text-[16px] font-medium mb-8 tracking-wide"
          >
            Trusted by Industry Leaders
          </motion.p>

          {/* Marquee logo ticker — matches trusted-brands-section.tsx pattern */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10" />

              <div className="flex items-center gap-0 animate-[community-logo-scroll_25s_linear_infinite]">
                <BrandLogoRow />
                <BrandLogoRow />
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes community-logo-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ===== SECTION 5: Dual CTA ===== */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]">
        <ScrollReveal>
          <div className="max-w-[1340px] mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
            <CallToActionButton label="Join the Community" variant="light" size="md" href="/community" />
            <CallToActionButton label="Book a Demo" variant="dark" size="md" href="/book-demo" />
          </div>
        </ScrollReveal>
      </section>

      {/* ===== SECTION 6: Testimonial ===== */}
      <section className="bg-[#F8FAFC] px-4 md:px-8 lg:px-[50px] py-12 md:py-[80px]">
        <div className="max-w-[800px] mx-auto">
          <ScrollReveal>
            <div className="bg-white rounded-[20px] p-8 md:p-10 border border-[#ecedef] flex flex-col gap-6">
              <QuoteIcon />
              <p className="font-['Google_Sans',sans-serif] text-[#181818] text-[17px] md:text-[18px] leading-[1.7]">
                &ldquo;{TESTIMONIAL.quote}&rdquo;
              </p>
              <div className="border-t border-[#ecedef] pt-5">
                <p className="font-['Google_Sans',sans-serif] font-semibold text-[15px] text-[#181818]">
                  {TESTIMONIAL.author}
                </p>
                <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#6b7280] mt-0.5">
                  {TESTIMONIAL.role}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
