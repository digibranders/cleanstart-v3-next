"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MapPin } from "lucide-react";
import { CircleArrowCTA } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

type TabFilter = "upcoming" | "past";

interface EventCard {
  id: number;
  title: string;
  date: string;
  location: string;
  image: string;
  booth?: string;
}

const upcomingEvents: EventCard[] = [
  {
    id: 1,
    title: "SecuFest",
    date: "March 12–15, 2026",
    location: "Ramada Wyndham Lucknow, India",
    image: "/events/image-100.png",
  },
  {
    id: 2,
    title: "KCD Delhi 2026",
    date: "February 21, 2026",
    location: "Holiday Inn New Delhi Aerocity, India",
    image: "/events/whatsapp-image-2026-02-09-at-2.42.51-pm.jpeg",
  },
];

const pastEvents: EventCard[] = [
  {
    id: 3,
    title: "KubeCon + CloudNativeCon North America 2025",
    date: "Nov 10–13, 2025",
    location: "Booth #752",
    image: "/events/banner.webp",
    booth: "Booth #752",
  },
  {
    id: 4,
    title: "AISS 2025",
    date: "Dec 3, 2025",
    location: "Pullman Aerocity, New Delhi",
    image: "/events/aiss-2025.png",
  },
  {
    id: 5,
    title: "9th Edition India DevOps Show 2025",
    date: "Nov 12, 2025",
    location: "The Westin Chennai",
    image: "/events/for-the-event-page-min-2048x1279-1.webp",
  },
  {
    id: 6,
    title: "TechSparks 2025",
    date: "Nov 6, 2025",
    location: "Taj Yeshwantpur, Bengaluru",
    image: "/events/image-93.png",
  },
  {
    id: 7,
    title: "AppDevSec Show 2025",
    date: "June 6, 2025",
    location: "Aurika by Lemon Tree, Mumbai",
    image: "/events/appdevsec-show-2025.avif",
  },
  {
    id: 8,
    title: "Sundown with DevOps",
    date: "Nov 28, 2025",
    location: "Mumbai",
    image: "/events/image-90.png",
  },
  {
    id: 9,
    title: "Cyber AI Summit 2025",
    date: "Sept 4, 2025",
    location: "Sheraton Grand, Bengaluru",
    image: "/events/image-99.png",
  },
  {
    id: 10,
    title: "ET CISO",
    date: "March 20, 2025",
    location: "Le Meridian Coimbatore",
    image: "/events/event-poster.png",
  },
];

export function EventsContent(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<TabFilter>("upcoming");

  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative pt-[120px] md:pt-[160px] pb-14 md:pb-[90px] px-4 md:px-8 lg:px-[50px] overflow-hidden"
        style={{
          backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
        }}
      >
        <div className="max-w-[1340px] mx-auto relative z-10">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-normal text-[40px] md:text-[50px] lg:text-[58px] text-white tracking-[-1px] leading-[1.1] mb-5"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
          >
            In-Person Events
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] font-normal text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-[600px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Meet CleanStart at industry conferences and events worldwide.
          </motion.p>
        </div>
      </section>

      {/* ── Tab Filter ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] pt-[50px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.div
            className="flex gap-2"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            {(["upcoming", "past"] as TabFilter[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-full font-['Google_Sans',sans-serif] text-[14px] font-semibold transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-[#056BF1] text-white shadow-md"
                    : "bg-[#ecedef] text-[#181818] hover:bg-[#cdf5fe] hover:text-[#056BF1]"
                }`}
              >
                {tab === "upcoming" ? "Upcoming" : "Past"}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Event Cards ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-[50px]">
        <div className="max-w-[1340px] mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === "upcoming" ? (
              <motion.div
                key="upcoming"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-8">
                  <motion.div
                    className="w-full lg:w-[670px] shrink-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0, ease: EASE }}
                  >
                    <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                      Upcoming Events
                    </h2>
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {upcomingEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      className="group rounded-[15px] overflow-hidden border border-[#06C7F2]/30 bg-[#cdf5fe] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: EASE,
                      }}
                    >
                      <div className="relative w-full h-[220px] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] md:text-[22px] text-[#181818] leading-[1.3] mb-3 group-hover:text-[#056BF1] transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src="/events/calendar-1.png"
                            alt="Calendar"
                            className="w-4 h-4"
                          />
                          <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#181818]/70">
                            {event.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-5">
                          <MapPin className="w-4 h-4 text-[#056BF1]" />
                          <span className="font-['Google_Sans',sans-serif] text-[14px] text-[#181818]/70">
                            {event.location}
                          </span>
                        </div>
                        <CircleArrowCTA variant="blue-white" size={40} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="past"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-8">
                  <motion.div
                    className="w-full lg:w-[670px] shrink-0"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.6, delay: 0, ease: EASE }}
                  >
                    <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                      Past Events
                    </h2>
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map((event, i) => (
                    <motion.div
                      key={event.id}
                      className="group rounded-[15px] overflow-hidden bg-white border border-[#ecedef] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 0.5,
                        delay: (i % 6) * 0.07,
                        ease: EASE,
                      }}
                    >
                      <div className="relative w-full h-[190px] overflow-hidden">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5">
                        <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#181818] leading-[1.3] mb-3 group-hover:text-[#056BF1] transition-colors">
                          {event.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <img
                            src="/events/calendar-1.png"
                            alt="Calendar"
                            className="w-3.5 h-3.5"
                          />
                          <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818]/60">
                            {event.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-4">
                          <MapPin className="w-3.5 h-3.5 text-[#056BF1]" />
                          <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818]/60">
                            {event.location}
                          </span>
                        </div>
                        <CircleArrowCTA variant="blue-white" size={40} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
