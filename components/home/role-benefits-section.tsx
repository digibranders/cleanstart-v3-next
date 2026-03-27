"use client";

import { useState } from "react";
import { motion } from "motion/react";

// Inline SVG icon components (were imported from svg-jxhd3sscvl)

function ShieldIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M15 3.75L5 8.75V15C5 21.25 15 26.25 15 26.25C15 26.25 25 21.25 25 15V8.75L15 3.75Z"
        stroke="#056BF1"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path
        d="M11.25 15L13.75 17.5L18.75 12.5"
        stroke="#056BF1"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
      <path
        d="M3.75 8.75V22.5C3.75 23.19 4.31 23.75 5 23.75H25C25.69 23.75 26.25 23.19 26.25 22.5V11.25C26.25 10.56 25.69 10 25 10H16.25L13.75 6.25H5C4.31 6.25 3.75 6.81 3.75 7.5V8.75Z"
        stroke="#056BF1"
        strokeLinecap="round"
        strokeWidth="1.5"
      />
      <path d="M10 16.25H20" stroke="#056BF1" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M16.25 13.75L13.75 20" stroke="#056BF1" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        d="M5.83333 14.1667L14.1667 5.83333"
        stroke="#056BF1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M5.83333 5.83333H14.1667V14.1667"
        stroke="#056BF1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SecurityCheckIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <path
        d="M12.5 3.125L4.16667 6.25V12.5C4.16667 18.75 12.5 21.875 12.5 21.875C12.5 21.875 20.8333 18.75 20.8333 12.5V6.25L12.5 3.125Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.375 12.5L11.4583 14.5833L15.625 10.4167"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IntegrationIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <rect x="3.125" y="3.125" width="7.29167" height="7.29167" rx="1" stroke="white" />
      <rect x="14.5833" y="3.125" width="7.29167" height="7.29167" rx="1" stroke="white" />
      <rect x="3.125" y="14.5833" width="7.29167" height="7.29167" rx="1" stroke="white" />
      <rect x="14.5833" y="14.5833" width="7.29167" height="7.29167" rx="1" stroke="white" />
      <path d="M5.20833 12.5H10.4167" stroke="white" />
      <path d="M14.5833 12.5H19.7917" stroke="white" />
    </svg>
  );
}

function DevelopmentIcon() {
  return (
    <svg width="25" height="25" viewBox="0 0 25 25" fill="none">
      <rect x="3.125" y="3.125" width="18.75" height="18.75" rx="3" stroke="white" strokeLinejoin="round" />
      <path d="M17.7041 7.29167H17.7134" stroke="white" strokeLinejoin="round" />
      <path d="M8.33333 10.4167L5.20833 12.5L8.33333 14.5833" stroke="white" strokeLinejoin="round" />
      <path d="M16.6667 10.4167L19.7917 12.5L16.6667 14.5833" stroke="white" strokeLinejoin="round" />
      <path d="M14.0625 8.33333L10.9375 16.6667" stroke="white" strokeLinejoin="round" />
    </svg>
  );
}

function PillButton({
  icon,
  label,
  active,
  onHover,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onHover: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="flex items-center gap-[10px] px-[25px] py-[25px] rounded-[15px] cursor-pointer bg-white"
      onMouseEnter={() => {
        setHovered(true);
        onHover();
      }}
      onMouseLeave={() => setHovered(false)}
    >
      {icon}
      <span className="font-['Google_Sans',sans-serif] font-semibold text-[20px] text-[#056bf1]">
        {label}
      </span>
      <div
        className="p-[10px] transition-transform duration-300"
        style={{ transform: hovered ? "rotate(45deg)" : "rotate(0deg)" }}
      >
        <ArrowUpRight />
      </div>
    </button>
  );
}

const pillButtons = [
  { icon: <ShieldIcon />, label: "CISO" },
  { icon: <FolderIcon />, label: "Developers" },
];

const cisoFeatures = [
  {
    icon: <SecurityCheckIcon />,
    title: "Enhanced\nSecurity",
    description:
      "Signed, verified images with automated security updates and continuous vulnerability monitoring.",
  },
  {
    icon: <IntegrationIcon />,
    title: "Seamless\nIntegration",
    description:
      "CI/CD pipelines, private repos, and SSO support for complete workflow integration.",
  },
  {
    icon: <DevelopmentIcon />,
    title: "Streamlined\nDevelopment",
    description:
      "Speed up deployment with automated compliance and custom-built images.",
  },
];

const developerFeatures = [
  {
    icon: <DevelopmentIcon />,
    title: "Zero-CVE\nImages",
    description:
      "Start every build from a clean base with continuously patched, vulnerability-free container images.",
  },
  {
    icon: <SecurityCheckIcon />,
    title: "Fast\nOnboarding",
    description:
      "Drop-in replacements for popular base images — no config changes, no learning curve.",
  },
  {
    icon: <IntegrationIcon />,
    title: "CI/CD\nReady",
    description:
      "Native integrations with GitHub Actions, GitLab CI, and all major pipeline tools out of the box.",
  },
];

export function RoleBenefitsSection() {
  const [activeRole, setActiveRole] = useState<"CISO" | "Developers">("CISO");
  const features = activeRole === "CISO" ? cisoFeatures : developerFeatures;

  return (
    <section className="bg-[#056bf1] px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
      <div className="max-w-[1340px] mx-auto flex flex-col gap-[50px]">
        {/* Top row: title + description */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 lg:gap-[100px]">
          {/* Title - 30% (3 columns) */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <h2 className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-white tracking-[-0.02em] leading-[1.2] max-w-[400px]">
              How CleanStart will help
            </h2>
          </motion.div>

          {/* Description - 70% (7 columns) */}
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
          >
            <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-[1.6] max-w-[464px]">
              Purpose-built hardened images that integrate security, compliance,
              and speed into every layer of your workflow.
            </p>
          </motion.div>
        </div>

        {/* Bottom row: pill buttons + feature cards */}
        <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-[92px]">
          {/* Pill buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 md:gap-[25px] shrink-0">
            {pillButtons.map((btn) => (
              <PillButton
                key={btn.label}
                icon={btn.icon}
                label={btn.label}
                active={activeRole === btn.label}
                onHover={() =>
                  setActiveRole(btn.label as "CISO" | "Developers")
                }
              />
            ))}
          </div>

          {/* Feature columns */}
          <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-[25px]">
            {features.map((feature) => (
              <div
                key={`${activeRole}-${feature.title}`}
                className="flex-1 flex flex-col gap-[25px]"
              >
                <div className="flex items-center gap-[12px]">
                  {feature.icon}
                  <h3 className="font-['Google_Sans',sans-serif] font-normal text-[28px] text-white leading-[1.2] whitespace-pre-wrap">
                    {feature.title}
                  </h3>
                </div>
                <p className="font-['Google_Sans',sans-serif] font-normal text-[14px] md:text-[16px] text-white leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
