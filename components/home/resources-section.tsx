"use client";

import React, { useState } from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import { CallToActionButton } from '@/components/shared/call-to-action-button';
import { AnimatedBird } from '@/components/shared/animated-bird';

/* ---- Arrow Circle Component ---- */

function ArrowCircle({ variant = 'blue', forceHovered }: { variant?: 'blue' | 'white'; forceHovered?: boolean }) {
  const [selfHovered, setSelfHovered] = useState(false);
  const hovered = forceHovered ?? selfHovered;
  const bgClass = variant === 'blue' ? 'bg-[#056bf1]' : 'bg-white';
  const arrowColor = variant === 'blue' ? 'white' : '#181818';

  return (
    <div
      className={`w-[44px] h-[44px] rounded-full ${bgClass} flex items-center justify-center transition-transform duration-300 cursor-pointer ${hovered ? 'rotate-45' : ''}`}
      onMouseEnter={() => setSelfHovered(true)}
      onMouseLeave={() => setSelfHovered(false)}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path
          d="M4 12L12 4M12 4H5.33M12 4V10.67"
          stroke={arrowColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ---- Card Components ---- */

function EventCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative rounded-[15px] overflow-hidden lg:col-start-1 lg:row-start-1 lg:row-span-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        alt="Cybersecurity conference event"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
        src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F1924]/90 via-[#0F1924]/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-between p-6">
        <span className="bg-[#056BF1] text-white font-['Google_Sans',sans-serif] text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full self-start">
          Event
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] text-white leading-tight">
            Cybersecurity Summit 2026
          </h3>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[13px] text-white/70">
            March 15-17, 2026
          </p>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/80 leading-normal">
            Join industry leaders for three days of security insights and networking.
          </p>
          <div className="flex justify-end mt-2">
            <ArrowCircle variant="white" forceHovered={hovered} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({
  value,
  description,
  bgColor,
  gridClass,
}: {
  value: string;
  description: string;
  bgColor: string;
  gridClass: string;
}) {
  return (
    <motion.div
      className={`${bgColor} rounded-[15px] flex flex-col justify-between p-6 ${gridClass}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      <h3 className="font-['Google_Sans',sans-serif] font-normal text-[48px] text-white leading-none">
        {value}
      </h3>
      <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-white/90 leading-normal mt-auto">
        {description}
      </p>
    </motion.div>
  );
}

function ResourceCard({
  badge,
  title,
  description,
  gridClass,
}: {
  badge: string;
  title: string;
  description: string;
  gridClass: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className={`bg-white rounded-[15px] relative overflow-hidden flex flex-col justify-between p-6 ${gridClass}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Subtle image overlay */}
      <div className="absolute inset-0 opacity-[0.04]">
        <Image
          alt=""
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=40"
          fill
        />
      </div>
      <div className="relative flex flex-col gap-3 flex-1">
        <span className="bg-[#ecedef] text-[#181818] font-['Google_Sans',sans-serif] text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full self-start">
          {badge}
        </span>
        <h3 className={`font-['Google_Sans',sans-serif] font-semibold text-[18px] text-[#181818] leading-tight transition-colors duration-300 ${hovered ? 'text-[#056bf1]' : ''}`}>
          {title}
        </h3>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-[#181818]/70 leading-normal">
          {description}
        </p>
      </div>
      <div className="relative flex justify-end mt-3">
        <ArrowCircle variant="blue" forceHovered={hovered} />
      </div>
    </motion.div>
  );
}

function BlogCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative rounded-[15px] overflow-hidden lg:col-start-4 lg:row-start-1 lg:row-span-2"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        alt="Blog post about container security"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
        fill
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="relative h-full flex flex-col justify-between p-6">
        <span className="bg-[#056bf1] text-white font-['Google_Sans',sans-serif] text-[12px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full self-start">
          Blog
        </span>
        <div className="flex flex-col gap-2">
          <h3 className="font-['Google_Sans',sans-serif] font-normal text-[22px] text-white leading-tight">
            The future of container hardening in enterprise
          </h3>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/80 leading-normal">
            Explore how zero-CVE containers are reshaping security posture for Fortune 500 companies.
          </p>
          <div className="flex justify-end mt-2">
            <ArrowCircle variant="blue" forceHovered={hovered} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MascotCard() {
  return (
    <motion.div
      className="rounded-[15px] overflow-hidden lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2 flex items-center justify-center bg-[#ecedef]"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <AnimatedBird className="w-full h-full object-contain scale-110" />
    </motion.div>
  );
}

function WinnerCard() {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative rounded-[15px] overflow-hidden lg:col-start-2 lg:col-span-2 lg:row-start-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        alt="Secure deployments worldwide"
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${hovered ? 'scale-105' : 'scale-100'}`}
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
        fill
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="flex flex-col gap-1">
          <h3 className="font-['Google_Sans',sans-serif] font-normal text-[24px] text-white leading-tight">
            24,000+ Secure Deployments
          </h3>
          <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] text-white/80 leading-normal">
            Trusted by organizations of all sizes across every sector worldwide.
          </p>
        </div>
        <div className="flex justify-end">
          <ArrowCircle variant="white" forceHovered={hovered} />
        </div>
      </div>
    </motion.div>
  );
}

/* ---- Main Section ---- */

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: '-60px' } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export function ResourcesSection() {
  return (
    <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-[100px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-8 md:gap-[50px]">
        {/* Header: 35:65 split */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-0">
          {/* Left 35% */}
          <motion.div className="lg:w-[35%] shrink-0" {...anim(0)}>
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.02em] leading-[1.1]">
              Resources &amp; Insights
            </h2>
          </motion.div>

          {/* Right 65% */}
          <motion.div className="flex-1 lg:pl-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4" {...anim(0.05)}>
            <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-[#181818]/70 leading-relaxed max-w-[480px]">
              Stay informed with the latest research, threat intelligence reports, and expert analysis from our security team.
            </p>
            <CallToActionButton label="View All Resources" variant="dark" size="md" />
          </motion.div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[280px] md:auto-rows-[300px] lg:auto-rows-[320px] gap-4 md:gap-[25px] w-full">
          {/* Row 1 Col 1: EventCard (span 2 rows) */}
          <EventCard />

          {/* Row 1 Col 2: StatCard 67% purple */}
          <StatCard
            value="67%"
            description="of security teams report improved incident response time"
            bgColor="bg-[#056BF1]"
            gridClass="lg:col-start-2 lg:row-start-1"
          />

          {/* Row 1 Col 3: ResourceCard PDF */}
          <ResourceCard
            badge="PDF"
            title="Container Security Best Practices"
            description="A comprehensive guide to securing your container workloads in production environments."
            gridClass="lg:col-start-3 lg:row-start-1"
          />

          {/* Row 1-2 Col 4: BlogCard (span 2 rows) */}
          <BlogCard />

          {/* Row 2-3 Col 2-3: Mascot (span 2x2) */}
          <MascotCard />

          {/* Row 3 Col 1: StatCard 96% cyan */}
          <StatCard
            value="96%"
            description="of customers report reduced vulnerability exposure within 30 days"
            bgColor="bg-[#06c7f2]"
            gridClass="lg:col-start-1 lg:row-start-3"
          />

          {/* Row 3-4 Col 4: ResourceCard Research (span 2 rows) */}
          <ResourceCard
            badge="Research"
            title="2026 State of Container Security Report"
            description="Our annual analysis of vulnerability trends, attack vectors, and emerging threats in containerized infrastructure."
            gridClass="lg:col-start-4 lg:row-start-3 lg:row-span-2"
          />

          {/* Row 4 Col 1: ResourceCard Guide */}
          <ResourceCard
            badge="Guide"
            title="Zero-CVE Migration Playbook"
            description="Step-by-step framework for transitioning your organization to hardened container images."
            gridClass="lg:col-start-1 lg:row-start-4"
          />

          {/* Row 4 Col 2-3: WinnerCard (span 2 cols) */}
          <WinnerCard />
        </div>
      </div>
    </section>
  );
}
