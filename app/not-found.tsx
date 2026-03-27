"use client";

import { motion } from "motion/react";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="text-center max-w-xl"
      >
        <h1 className="text-[120px] md:text-[180px] font-bold leading-none text-[#056BF1]">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium text-[#181818] mt-4">
          Page Not Found
        </h2>
        <p className="text-base text-[#64748B] mt-4 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#056BF1] text-white font-medium text-base hover:bg-[#0455c1] transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
