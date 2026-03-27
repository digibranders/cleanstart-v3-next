"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

// Inline arrow path data (was imported from svg-qm7mkkrrsd)
const ARROW_UP_RIGHT_PATH =
  "M8.24536 21.2446L21.2446 8.24536L21.2446 19.0779L24.2446 19.0779L24.2446 3.24536L8.41207 3.24536L8.41207 6.24536L19.2446 6.24536L6.24536 19.2446L8.24536 21.2446Z";

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

function ArrowCircle({
  hovered,
  color = "#056bf1",
}: {
  hovered: boolean;
  color?: string;
}) {
  const arrowColor = color === "white" ? "#056bf1" : "white";

  return (
    <div
      className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-transform duration-300 shrink-0"
      style={{
        backgroundColor: color,
        transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 29.49 29.49" fill="none">
        <path d={ARROW_UP_RIGHT_PATH} fill={arrowColor} />
      </svg>
    </div>
  );
}

function BlogCard({
  title,
  excerpt,
  image,
  delay,
}: {
  title: string;
  excerpt: string;
  image: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-[15px] overflow-hidden cursor-pointer flex flex-col h-full justify-between relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...anim(delay)}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="p-[24px] flex flex-col gap-[12px] flex-grow relative z-10">
        <div className="px-[8px] py-[4px] rounded-[8px] bg-white/20 backdrop-blur-sm text-white font-['Google_Sans',sans-serif] font-medium text-[12px] uppercase tracking-[0.5px] w-fit">
          Blog
        </div>
        <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] text-white leading-[1.3]">
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/90 leading-[1.5]">
          {excerpt}
        </p>
      </div>

      {/* Bottom Right: CTA */}
      <div className="flex justify-end p-[24px] pt-0 relative z-10">
        <ArrowCircle hovered={hovered} color="white" />
      </div>
    </motion.div>
  );
}

function ResourceCard({
  title,
  type,
  description,
  delay,
}: {
  title: string;
  type: string;
  description: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  const getBackgroundImage = () => {
    if (type === "PDF")
      return "https://images.unsplash.com/photo-1542753034-928e48a5ce79?w=800&q=80";
    if (type === "Research")
      return "https://images.unsplash.com/photo-1762279389083-abf71f22d338?w=800&q=80";
    if (type === "Guide")
      return "https://images.unsplash.com/photo-1652212976547-16d7e2841b8c?w=800&q=80";
    return "https://images.unsplash.com/photo-1601631547344-1b6948ea55c2?w=800&q=80";
  };

  return (
    <motion.div
      className="bg-white rounded-[15px] cursor-pointer flex flex-col h-full justify-between relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...anim(delay)}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getBackgroundImage()}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-white/90"></div>
      </div>

      <div className="p-[24px] flex flex-col gap-[12px] relative z-10">
        <div className="px-[8px] py-[4px] rounded-[8px] bg-white/60 backdrop-blur-sm text-[#64748B] font-['Google_Sans',sans-serif] font-medium text-[12px] uppercase tracking-[0.5px] w-fit">
          {type}
        </div>
        <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] text-[#181818] leading-[1.3]">
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.5]">
          {description}
        </p>
      </div>
      <div className="flex justify-end p-[24px] pt-0 relative z-10">
        <ArrowCircle hovered={hovered} />
      </div>
    </motion.div>
  );
}

function EventCard({
  title,
  date,
  description,
  delay,
}: {
  title: string;
  date: string;
  description: string;
  delay: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-[15px] cursor-pointer flex flex-col h-full justify-between relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...anim(delay)}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1760386129113-6e20e3b59731?w=800&q=80"
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#5d04d8]/90 to-[#7d24f8]/90"></div>
      </div>

      <div className="flex flex-col gap-[12px] p-[24px] relative z-10">
        <div className="px-[8px] py-[4px] rounded-[8px] bg-white/20 backdrop-blur-sm font-['Google_Sans',sans-serif] font-medium text-[12px] text-white uppercase tracking-[0.5px] w-fit">
          Event
        </div>
        <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] text-white leading-[1.3]">
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] text-white/80 leading-[1.4]">
          {date}
        </p>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/90 leading-[1.5]">
          {description}
        </p>
      </div>
      <div className="flex justify-end p-[24px] pt-0 relative z-10">
        <ArrowCircle hovered={hovered} color="white" />
      </div>
    </motion.div>
  );
}

function StatCard({
  value,
  description,
  color,
  delay,
}: {
  value: string;
  description: string;
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      className="rounded-[15px] p-[24px] flex flex-col gap-[12px] h-full"
      style={{ backgroundColor: color }}
      {...anim(delay)}
    >
      <h3 className="font-['Google_Sans',sans-serif] font-normal text-[48px] text-white leading-[1]">
        {value}
      </h3>
      <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/90 leading-[1.5]">
        {description}
      </p>
    </motion.div>
  );
}

function WinnerCard({ delay }: { delay: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-[15px] cursor-pointer flex flex-col h-full justify-between relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      {...anim(delay)}
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1762340916350-ad5a3d620c16?w=800&q=80"
          alt="Secure Deployments"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.05)" : "scale(1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a1f]/95 via-[#1a1a3f]/90 to-[#0a0a1f]/95"></div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(5,107,241,0.15)_50%,transparent_100%)] opacity-50"></div>
      </div>

      {/* Top: Title + Description */}
      <div className="flex flex-col gap-[12px] p-[24px] relative z-10">
        <h3 className="font-['Google_Sans',sans-serif] font-medium text-[18px] text-white leading-[1.3]">
          24,000+ Secure Deployments
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white/70 leading-[1.5]">
          Trusted by security teams worldwide
        </p>
      </div>
      {/* Bottom Right: CTA */}
      <div className="flex justify-end p-[24px] pt-0 relative z-10">
        <ArrowCircle hovered={hovered} color="white" />
      </div>
    </motion.div>
  );
}

export function ResourcesBentoGrid() {
  return (
    <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-12 md:gap-16 lg:gap-[80px]">
        {/* Header - 30:70 Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[24px]">
          {/* Title - 30% (3 out of 10 columns) */}
          <motion.h2
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.2] lg:col-span-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            Resources &amp; Insights
          </motion.h2>

          {/* Description + CTA - 70% (7 out of 10 columns) */}
          <div className="lg:col-span-7 flex flex-col gap-[24px]">
            <motion.p
              className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#64748B] leading-[1.6]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.05,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              Expert insights, research, and practical guides on container
              security, compliance, and DevSecOps best practices. Stay ahead of
              emerging threats and learn from real-world deployments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              {/* TODO: Replace with <CallToActionButton /> from @/components/shared/call-to-action-button */}
              <button className="flex items-center gap-2.5 pl-5 pr-[6px] py-[6px] rounded-full bg-[#056bf1] hover:bg-[#0455c0] transition-colors">
                <span className="font-['Google_Sans',sans-serif] font-semibold text-white text-[15px]">
                  View All Resources
                </span>
                <div className="bg-white flex items-center justify-center rounded-full size-[32px] shrink-0">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <path d={ARROW_UP_RIGHT_PATH} fill="#056bf1" />
                  </svg>
                </div>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Bento Grid with Centered Mascot - Pure 4x4 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[20px] auto-rows-[280px] md:auto-rows-[300px] lg:auto-rows-[320px]">
          {/* Row 1, Col 1: Vertical Event Card (1x2) */}
          <div className="row-span-2">
            <EventCard
              title="Live Webinar: FIPS Compliance"
              date="March 18, 2026 - 2:00 PM EST"
              description="Watch our security engineers deploy FIPS 140-2 validated containers in real-time."
              delay={0.1}
            />
          </div>

          {/* Row 1, Col 2: Square Stat Card (1x1) */}
          <div className="row-span-1">
            <StatCard
              value="67%"
              description="CVE reduction in 30 days"
              color="#5d04d8"
              delay={0.15}
            />
          </div>

          {/* Row 1, Col 3: Square Resource Card (1x1) */}
          <div className="row-span-1">
            <ResourceCard
              title="Compliance Checklist"
              type="PDF"
              description="SOC 2, ISO 27001, and HIPAA requirements."
              delay={0.2}
            />
          </div>

          {/* Row 1-2, Col 4: Vertical Blog Card (1x2) */}
          <div className="row-span-2">
            <BlogCard
              title="Zero-Trust Container Security Guide"
              excerpt="Implement zero-trust principles in your container infrastructure with hardened images and runtime protection."
              image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80"
              delay={0.25}
            />
          </div>

          {/* Row 2-3, Col 2-3: Bird Mascot (2x2) - CENTERED */}
          <motion.div
            className="col-span-2 row-span-2 rounded-[15px] relative flex items-center justify-center"
            {...anim(0.3)}
          >
            {/* TODO: Add mascot animation */}
          </motion.div>

          {/* Row 3, Col 1: Square Stat Card (1x1) */}
          <div className="row-span-1">
            <StatCard
              value="96%"
              description="faster incident response"
              color="#06c7f2"
              delay={0.35}
            />
          </div>

          {/* Row 3-4, Col 4: Vertical Resource Card (1x2) */}
          <div className="row-span-2">
            <ResourceCard
              title="State of Container Security 2026"
              type="Research"
              description="Annual analysis of critical CVE trends and vulnerability patterns across enterprise deployments."
              delay={0.4}
            />
          </div>

          {/* Row 4, Col 1: Square Resource Card (1x1) */}
          <div className="row-span-1">
            <ResourceCard
              title="SBOM Automation"
              type="Guide"
              description="Generate Software Bill of Materials automatically."
              delay={0.45}
            />
          </div>

          {/* Row 4, Col 2-3: Horizontal Winner Card (2x1) */}
          <div className="col-span-2 row-span-1">
            <WinnerCard delay={0.5} />
          </div>
        </div>
      </div>
    </section>
  );
}
