"use client";

import { useState } from "react";

type CircleVariant = "filled-blue" | "filled-white" | "outline-white" | "outline-dark";

interface CircleArrowCTAProps {
  variant?: CircleVariant;
  size?: number;
  href?: string;
  className?: string;
  forceHovered?: boolean;
}

const config: Record<CircleVariant, {
  bg: string;
  hoverBg: string;
  stroke: string;
  hoverStroke: string;
  border: string;
  hoverBorder: string;
}> = {
  "filled-blue": {
    bg: "#056BF1",
    hoverBg: "#0455c5",
    stroke: "#ffffff",
    hoverStroke: "#ffffff",
    border: "transparent",
    hoverBorder: "transparent",
  },
  "filled-white": {
    bg: "#ffffff",
    hoverBg: "#f0f0f0",
    stroke: "#056BF1",
    hoverStroke: "#056BF1",
    border: "transparent",
    hoverBorder: "transparent",
  },
  "outline-white": {
    bg: "transparent",
    hoverBg: "rgba(255,255,255,0.15)",
    stroke: "#ffffff",
    hoverStroke: "#ffffff",
    border: "rgba(255,255,255,0.4)",
    hoverBorder: "rgba(255,255,255,0.7)",
  },
  "outline-dark": {
    bg: "transparent",
    hoverBg: "rgba(0,0,0,0.05)",
    stroke: "#181818",
    hoverStroke: "#056BF1",
    border: "rgba(24,24,24,0.2)",
    hoverBorder: "#056BF1",
  },
};

export function CircleArrowCTA({
  variant = "filled-blue",
  size = 28,
  href,
  className = "",
  forceHovered,
}: CircleArrowCTAProps) {
  const [selfHovered, setSelfHovered] = useState(false);
  const hovered = forceHovered ?? selfHovered;
  const c = config[variant];
  const arrowSize = Math.round(size * 0.36);
  const strokeWidth = 1.3;

  const circle = (
    <div
      className={`rounded-full flex items-center justify-center shrink-0 cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: hovered ? c.hoverBg : c.bg,
        border: `${strokeWidth}px solid ${hovered ? c.hoverBorder : c.border}`,
        transform: hovered ? "rotate(45deg)" : "rotate(-20deg)",
      }}
      onMouseEnter={() => setSelfHovered(true)}
      onMouseLeave={() => setSelfHovered(false)}
    >
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3.5 3.5L12.5 3.5M12.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
          stroke={hovered ? c.hoverStroke : c.stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="no-underline">
        {circle}
      </a>
    );
  }

  return circle;
}
