"use client";

import { motion, AnimatePresence } from "motion/react";
import { CallToActionButton } from '@/components/shared/call-to-action-button';
import { useState } from "react";

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const offices = [
  {
    label: "Singapore",
    address: "1003 Bukit Merah Central, #07-23, Singapore 159836",
  },
  {
    label: "India (Bengaluru)",
    address: "Bhive Platinum, 114/5 Old Madras Road, Halasuru, Bengaluru 560008",
  },
  {
    label: "India (Ahmedabad)",
    address: "Westport by Vsquare, 1304 Sindhu Bhavan Marg, Thaltej, Ahmedabad 380058",
  },
  {
    label: "North America (HQ)",
    address: "16192 Coastal Highway, Lewes, Delaware 19958",
  },
];

const faqs = [
  {
    question: "What is CleanStart?",
    answer:
      "CleanStart provides hardened, debloated container images with near-zero CVEs. Our images are built from source, independently verified, and designed for production environments that demand security and compliance.",
  },
  {
    question: "How does CleanStart handle security updates?",
    answer:
      "We continuously monitor upstream sources and apply patches proactively. Critical and High CVEs are remediated within 7 days, and Medium/Low within 14 days under our Enterprise SLA.",
  },
  {
    question: "Can I customize CleanStart images?",
    answer:
      "Yes. Enterprise customers can request custom packages, configurations, and compliance frameworks applied to any CleanStart base image. Our team works directly with you to tailor images to your requirements.",
  },
  {
    question: "How can I verify a CleanStart image?",
    answer:
      "Every CleanStart image ships with a full SBOM (Software Bill of Materials) and is built with SLSA Level 2 or Level 3 provenance. You can verify the build chain and contents independently.",
  },
  {
    question: "Which registries work with CleanStart images?",
    answer:
      "CleanStart images are compatible with all major container registries including Docker Hub, Amazon ECR, Google Artifact Registry, Azure Container Registry, and GitHub Container Registry.",
  },
  {
    question: "Do you offer FIPS-compliant images?",
    answer:
      "Yes. FIPS 140-2 compliant images are available as part of our Enterprise Image tier. These are purpose-built for government, defense, and regulated industry workloads.",
  },
];

function MapPinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
        fill="#056BF1"
      />
    </svg>
  );
}

function PlusIcon({ open }: { open: boolean }) {
  return (
    <div className="relative w-5 h-5 flex-shrink-0">
      <motion.span
        className="absolute top-1/2 left-1/2 w-[14px] h-[2px] bg-[#056BF1] rounded-full"
        style={{ x: "-50%", y: "-50%" }}
      />
      <motion.span
        className="absolute top-1/2 left-1/2 w-[14px] h-[2px] bg-[#056BF1] rounded-full"
        animate={{ rotate: open ? 0 : 90 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ x: "-50%", y: "-50%" }}
      />
    </div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div
      className="bg-white rounded-[20px] border border-[rgba(0,0,0,0.08)] overflow-hidden"
      {...anim(index * 0.08)}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-[#F8FAFC] transition-colors cursor-pointer"
      >
        <span className="font-['Google_Sans',sans-serif] font-semibold text-[16px] md:text-[18px] text-[#181818] pr-4">
          {question}
        </span>
        <PlusIcon open={isOpen} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="faq-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0">
              <p className="font-['Google_Sans',sans-serif] text-[14px] md:text-[15px] text-[#64748B] leading-[1.7]">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ContactContent() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-28 md:py-36 lg:py-44 px-4 md:px-8 lg:px-[50px]" style={{ backgroundImage: 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 70%, rgb(205, 245, 254) 100%)' }}>
        {/* Multi-stop gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(5,107,241,0.25) 0%, rgba(93,4,216,0.12) 40%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 100%, rgba(6,199,242,0.15) 0%, transparent 60%)",
          }}
        />
        {/* Dot grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-[1340px] mx-auto text-center">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-bold text-[40px] md:text-[56px] lg:text-[72px] text-white leading-[1.08] tracking-[-0.03em] mb-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] lg:text-[20px] text-white/70 max-w-[640px] mx-auto leading-[1.6]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            We would be happy to hear from you about any feedback or questions
          </motion.p>
        </div>
      </section>

      {/* ── Contact Form ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px] mb-12">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.15] tracking-[-0.02em] lg:col-span-4"
              {...anim(0)}
            >
              Send Us a Message
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[14px] md:text-[16px] text-[#64748B] leading-[1.6] lg:col-span-6"
              {...anim(0.1)}
            >
              Whether you have a question about features, pricing, trials, or security — our team is ready to help.
            </motion.p>
          </div>
          <motion.div
            className="max-w-[800px] mx-auto bg-white rounded-[20px] p-8 md:p-10 border border-black/[0.06] "
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.firstName}
                    onChange={handleChange("firstName")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.lastName}
                    onChange={handleChange("lastName")}
                    className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john.doe@company.com"
                  value={form.email}
                  onChange={handleChange("email")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={handleChange("subject")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">
                  Message
                </label>
                <textarea
                  rows={5}
                  placeholder="Tell us more about your needs..."
                  value={form.message}
                  onChange={handleChange("message")}
                  className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056BF1] focus:ring-2 focus:ring-[#056BF1]/10 transition-all resize-none"
                />
              </div>
              <div className="flex justify-center pt-2">
                <CallToActionButton label="Send Message" variant="dark" size="lg" />
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* ── Office Locations ── */}
      <section className="bg-[#ecedef] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 mb-14">
            <motion.div className="w-full lg:w-[670px] shrink-0" {...anim(0)}>
              <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] tracking-[-0.95px] leading-normal">
                Our Offices
              </h2>
            </motion.div>
            <motion.div className="flex-1" {...anim(0.1)}>
              <p className="font-['Google_Sans',sans-serif] font-normal text-[16px] text-[#181818]/60 leading-normal max-w-[526px]">
                Reach out to any of our global offices for support, partnerships, or general inquiries.
              </p>
            </motion.div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[25px]">
            {offices.map((office, i) => (
              <motion.div
                key={office.label}
                className="bg-white rounded-[20px] p-[25px]  transition-all duration-300 border border-black/[0.04]"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <MapPinIcon />
                  <h3 className="font-['Google_Sans',sans-serif] font-semibold text-[16px] text-[#181818]">
                    {office.label}
                  </h3>
                </div>
                <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] leading-[1.7]">
                  {office.address}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px] mb-12">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.15] tracking-[-0.02em] lg:col-span-4"
              {...anim(0)}
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[14px] md:text-[16px] text-[#64748B] leading-[1.6] lg:col-span-6"
              {...anim(0.1)}
            >
              Quick answers to common questions about CleanStart images, security, and compliance.
            </motion.p>
          </div>
          <div className="max-w-[900px] mx-auto flex flex-col gap-4">
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-[#cdf5fe] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <div className="max-w-[900px] mx-auto text-center flex flex-col gap-6">
            <motion.h2
              className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.15] tracking-[-0.02em]"
              {...anim(0)}
            >
              Ready to build secure software?
            </motion.h2>
            <motion.p
              className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-[#64748B] leading-[1.6] mb-4"
              {...anim(0.1)}
            >
              See CleanStart in action with a personalized demo.
            </motion.p>
            <motion.div className="flex justify-center" {...anim(0.2)}>
              <CallToActionButton label="Book a Demo" variant="dark" size="lg" href="/book-demo" />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
