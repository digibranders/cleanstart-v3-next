"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CircleArrowCTA, CallToActionButton } from '@/components/shared/call-to-action-button';

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tall?: boolean;
}

const blogs: BlogPost[] = [
  { id: 1, title: "Why You Cannot Trust Prebuilt Container Images from Official Registries", category: "Product Security", date: "March 4, 2026", readTime: "8 min", image: "/blogs/68ad931d4b8c436be6f24a7e-blog-1.avif", tall: true },
  { id: 2, title: "Eliminating Runtime Blind Spots: How CleanStart and Sysdig Build Continuous Trust", category: "Product Security", date: "Feb 25, 2026", readTime: "5 min", image: "/blogs/csxsysdig-1.png" },
  { id: 3, title: "When Everyone Can Code: The New Business Differentiation", category: "Application Security", date: "Feb 6, 2026", readTime: "6 min", image: "/blogs/freepik-expand-45776-1.webp", tall: true },
  { id: 4, title: "Why 'Zero Critical CVEs' Is a Misleading Security Metric", category: "Cyber Security", date: "Jan 31, 2026", readTime: "7 min", image: "/blogs/container-security-scaled-1-2048x1152.webp" },
  { id: 5, title: "Minimal vs Hardened vs Secure Container Images", category: "Product Security", date: "Jan 31, 2026", readTime: "6 min", image: "/blogs/facts-myths-vs-scaled-1-2048x1152.webp" },
  { id: 6, title: "CVE Fatigue: Why Most Container Vulnerabilities Never Get Fixed", category: "Cyber Security", date: "Jan 9, 2026", readTime: "8 min", image: "/blogs/blog-images-05-1.webp", tall: true },
  { id: 7, title: "Over 10,000 Docker Hub Images Exposed Credentials", category: "Data Protection", date: "Jan 2, 2026", readTime: "5 min", image: "/blogs/docker-hub-10000.webp" },
  { id: 8, title: "Your Container Images Are Ticking Time Bombs", category: "Cyber Security", date: "Dec 15, 2025", readTime: "7 min", image: "/blogs/hacker-with-laptop-v2-1.jpg", tall: true },
  { id: 9, title: "Supply Chain Security Is Now a Business Variable", category: "Network Security", date: "Dec 12, 2025", readTime: "6 min", image: "/blogs/cleanstart-blog-thumbnails-03.jpg" },
  { id: 10, title: "Shai-Hulud, Revisited: Evolution of the November NPM Activity", category: "Application Security", date: "Dec 4, 2025", readTime: "9 min", image: "/blogs/javascript-1-2048x1365.webp" },
  { id: 11, title: "Software Supply Chain in 2026", category: "Application Security", date: "Nov 24, 2025", readTime: "7 min", image: "/blogs/blogs-thumbnail-664d8dd5.webp" },
  { id: 12, title: "Built-In Compliance: CleanStart's FIPS Foundations Series", category: "Cyber Security", date: "Nov 14, 2025", readTime: "8 min", image: "/blogs/cs-blog-thumbnail-design.png", tall: true },
  { id: 13, title: "Graboid Worm: Docker Container Nightmare", category: "Application Security", date: "Oct 31, 2025", readTime: "12 min", image: "/blogs/blogs-thumbnail-68ad936b.avif" },
];

const categories = ["All stuff", "Product Security", "Application Security", "Cyber Security", "Data Protection", "Network Security"];

/* ═══════════════════════════════════════════════
   Blog Card — masonry style
   ═══════════════════════════════════════════════ */
function BlogCard({ blog, index }: { blog: BlogPost; index: number }) {
  return (
    <motion.a
      href="#"
      className="group block mb-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.06, ease: EASE }}
    >
      <div className="relative overflow-hidden rounded-[14px] aspect-square">
        {/* Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content overlay — bottom */}
        <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col">
          <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-white tracking-[-0.01em] leading-[1.35] line-clamp-2 mb-3">
            {blog.title}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-['Google_Sans',sans-serif] text-[12px] text-white/60">
              {blog.date}
            </span>
            <CircleArrowCTA variant="outline-white" size={40} />
          </div>
        </div>
      </div>
    </motion.a>
  );
}

/* ═══════════════════════════════════════════════
   Page Export
   ═══════════════════════════════════════════════ */
export function BlogContent(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = useState("All stuff");

  const filteredBlogs = activeCategory === "All stuff"
    ? blogs
    : blogs.filter((b) => b.category === activeCategory);

  // Split into 2 columns for masonry
  const col1 = filteredBlogs.filter((_, i) => i % 2 === 0);
  const col2 = filteredBlogs.filter((_, i) => i % 2 === 1);

  const today = new Date();
  const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}`;
  const timeStr = today.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  return (
    <div>
    {/* Hero with gradient */}
    <section
      className="px-4 md:px-8 lg:px-[50px] pt-[120px] md:pt-[160px] pb-[60px] md:pb-[80px]"
      style={{
        backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          className="flex flex-col lg:flex-row items-start justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <h1 className="font-['Google_Sans',sans-serif] font-normal text-[42px] md:text-[56px] lg:text-[64px] text-white tracking-[-0.03em] leading-[1.1]">
            Blogs
          </h1>
          <p className="font-['Google_Sans',sans-serif] text-[15px] md:text-[16px] text-white/50 leading-[1.6] max-w-[400px] lg:pt-4">
            A Curated Collection of Writings, Research, and Solutions
          </p>
        </motion.div>
      </div>
    </section>

    <section className="bg-white px-4 md:px-8 lg:px-[50px] pt-[40px] md:pt-[60px] pb-[80px]">
      <div className="max-w-[1400px] mx-auto">

        {/* Main layout: sidebar + masonry grid */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">

          {/* ── LEFT SIDEBAR ── */}
          <div className="w-full lg:w-[280px] shrink-0">
            <div className="lg:sticky lg:top-[100px] flex flex-col gap-5">

              {/* Filter card */}
              <motion.div
                className="rounded-[16px] border border-[#ecedef] p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              >
                <h2 className="font-['Google_Sans',sans-serif] font-normal text-[22px] text-[#181818] mb-4">
                  Filter
                </h2>
                <p className="font-['Google_Sans',sans-serif] text-[11px] uppercase tracking-[0.08em] text-[#94a3b8] mb-3 pb-2" style={{ borderBottom: "1px dashed #e2e8f0" }}>
                  By topic
                </p>
                <nav className="flex flex-col gap-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left px-0 py-1.5 font-['Google_Sans',sans-serif] text-[15px] transition-colors duration-200 cursor-pointer ${
                        activeCategory === cat
                          ? "text-[#181818] font-semibold"
                          : "text-[#b0b8c4] hover:text-[#181818]"
                      }`}
                    >
                      {activeCategory === cat && <span className="mr-1">·</span>}
                      {cat}
                    </button>
                  ))}
                </nav>
              </motion.div>

              {/* CTA card */}
              <motion.div
                className="rounded-[16px] border border-[#ecedef] p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              >
                <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#181818] mb-2">
                  Got a question?
                </h3>
                <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#94a3b8] leading-[1.5] mb-5">
                  Secure it. Ship it. Trust it. Fast.
                </p>
                <CallToActionButton label="Reach out" variant="dark" size="sm" href="/company/contact" />
              </motion.div>

              {/* Today widget */}
              <motion.div
                className="rounded-[16px] border border-[#ecedef] p-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#181818]">
                    Today
                  </h3>
                  <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818] font-medium">
                    {dateStr}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#94a3b8]">
                    Container Security
                  </span>
                  <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#181818] font-medium">
                    {timeStr}
                  </span>
                </div>
              </motion.div>

            </div>
          </div>

          {/* ── RIGHT: MASONRY GRID ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="flex gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {/* Column 1 */}
                <div className="flex-1">
                  {col1.map((blog, i) => (
                    <BlogCard key={blog.id} blog={blog} index={i * 2} />
                  ))}
                </div>
                {/* Column 2 */}
                <div className="flex-1">
                  {col2.map((blog, i) => (
                    <BlogCard key={blog.id} blog={blog} index={i * 2 + 1} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {filteredBlogs.length === 0 && (
              <div className="py-20 text-center">
                <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#94a3b8]">
                  No articles found in this category.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
    </div>
  );
}
