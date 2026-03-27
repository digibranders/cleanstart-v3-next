"use client";

import { useState, useRef, useEffect } from 'react';

type CTAVariant =
  | 'light'        // white pill, blue text → blue expand (hero Browse Images, footer primary, testimonials)
  | 'dark'         // blue pill, white text → white expand (scrolled navbar)
  | 'mobile-dark'  // blue pill, white text, no arrow circle (mobile menu)
  | 'ghost-light'  // NO bg, white text + arrow → arrow rotates only
  | 'on-white'     // NO bg, dark text + arrow → arrow rotates only
  | 'on-blue'      // NO bg, white text + arrow → arrow rotates only
  | 'on-card'      // NO bg, white text + arrow → arrow rotates only
  ;

/* ── Whether a variant has a visible pill background ── */
const hasPillBg = (v: CTAVariant) =>
  v === 'light' || v === 'dark' || v === 'mobile-dark';

/* ══════════════════════════════════════════════════════════
   STANDARDISED SIZE SYSTEM
   Based on "Book a Demo" md as the golden ratio:
     circle = text × 2.14  |  arrow = circle × 0.57
     Consistent padding proportions across all sizes.
   ══════════════════════════════════════════════════════════ */
const sizeConfig = {
  sm: { text: 'text-[13px]', circle: 26, arrow: 15, pillPad: 'pl-[14px] pr-[4px] py-[4px]', gap: 'gap-[6px]' },
  md: { text: 'text-[14px]', circle: 30, arrow: 16, pillPad: 'pl-[18px] pr-[5px] py-[5px]', gap: 'gap-[8px]' },
  lg: { text: 'text-[15px]', circle: 34, arrow: 18, pillPad: 'pl-[22px] pr-[6px] py-[6px]', gap: 'gap-[10px]' },
} as const;

/* ── Unified Arrow Component — scales to any size ── */
function ArrowSvg({ size, color, className = '' }: { size: number; color: string; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: color }}
      />
    </svg>
  );
}

/* ── Color configs for PILL variants (expanding‑circle animation) ── */
const pillConfig: Record<string, {
  defaultBg: string;
  expandColor: string;
  hoveredBg: string;
  defaultText: string;
  hoveredText: string;
  defaultCircleBg: string;
  hoveredCircleBg: string;
  defaultArrow: string;
  hoveredArrow: string;
  border?: string;
  shadow?: string;
  hoveredShadow?: string;
  showArrow: boolean;
}> = {
  light: {
    defaultBg: '#ffffff',
    expandColor: '#056BF1',
    hoveredBg: '#056BF1',
    defaultText: '#056BF1',
    hoveredText: '#ffffff',
    defaultCircleBg: '#056BF1',
    hoveredCircleBg: '#ffffff',
    defaultArrow: '#ffffff',
    hoveredArrow: '#056BF1',
    shadow: '0 2px 8px rgba(5, 107, 241, 0.12)',
    hoveredShadow: '0 4px 20px rgba(5, 107, 241, 0.35)',
    showArrow: true,
  },
  dark: {
    defaultBg: '#056BF1',
    expandColor: '#ffffff',
    hoveredBg: '#ffffff',
    defaultText: '#ffffff',
    hoveredText: '#056BF1',
    defaultCircleBg: '#ffffff',
    hoveredCircleBg: '#056BF1',
    defaultArrow: '#056BF1',
    hoveredArrow: '#ffffff',
    border: '1.5px solid rgba(5, 107, 241, 0.25)',
    shadow: '0 2px 8px rgba(5, 107, 241, 0.2)',
    hoveredShadow: '0 4px 16px rgba(5, 107, 241, 0.15)',
    showArrow: true,
  },
  'mobile-dark': {
    defaultBg: '#056BF1',
    expandColor: '#0450BD',
    hoveredBg: '#0450BD',
    defaultText: '#ffffff',
    hoveredText: '#ffffff',
    defaultCircleBg: '#ffffff',
    hoveredCircleBg: '#0450BD',
    defaultArrow: '#056BF1',
    hoveredArrow: '#ffffff',
    shadow: '0 2px 8px rgba(5, 107, 241, 0.2)',
    hoveredShadow: '0 4px 16px rgba(4, 80, 189, 0.3)',
    showArrow: false,
  },
};

/* ── Color configs for NO‑BG variants (arrow‑rotate only) ── */
const noBgConfig: Record<string, {
  textColor: string;
  hoverTextColor: string;
  arrowColor: string;
  hoverArrowColor: string;
}> = {
  'ghost-light': { textColor: '#ffffff', hoverTextColor: '#ffffff', arrowColor: '#ffffff', hoverArrowColor: '#ffffff' },
  'on-white':    { textColor: '#181818', hoverTextColor: '#056BF1', arrowColor: '#056BF1', hoverArrowColor: '#056BF1' },
  'on-blue':     { textColor: '#ffffff', hoverTextColor: '#ffffff', arrowColor: '#ffffff', hoverArrowColor: '#ffffff' },
  'on-card':     { textColor: '#ffffff', hoverTextColor: '#ffffff', arrowColor: '#ffffff', hoverArrowColor: '#ffffff' },
};

/* ────────────────────────────────────────────────────── */

interface AnimatedCTAProps {
  label: string;
  variant?: CTAVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  arrowSize?: number;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
}

export function AnimatedCTA({
  label,
  variant = 'light',
  size = 'md',
  className = '',
  arrowSize,
  onClick,
  href,
  fullWidth = false,
}: AnimatedCTAProps) {
  /* If variant has a pill bg → expanding‑circle animation */
  if (hasPillBg(variant)) {
    return (
      <PillCTA
        label={label}
        variant={variant}
        size={size}
        className={className}
        arrowSize={arrowSize}
        onClick={onClick}
        href={href}
        fullWidth={fullWidth}
      />
    );
  }

  /* Otherwise → simple arrow‑rotate treatment */
  return (
    <ArrowRotateCTA
      label={label}
      variant={variant}
      size={size}
      className={className}
      arrowSize={arrowSize}
      onClick={onClick}
      href={href}
    />
  );
}

/* ═══════════════════════════════════════════════════════
   PILL CTA — expanding circle from arrow center
   ═══════════════════════════════════════════════════════ */

function PillCTA({
  label, variant, size = 'md', className, arrowSize, onClick, href, fullWidth,
}: Omit<AnimatedCTAProps, 'variant'> & { variant: CTAVariant }) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [arrowCenter, setArrowCenter] = useState({ x: 0, y: 0 });
  const config = pillConfig[variant];
  const sizes = sizeConfig[size];

  useEffect(() => {
    const update = () => {
      if (!btnRef.current || !arrowRef.current) return;
      const btnRect = btnRef.current.getBoundingClientRect();
      const arrowRect = arrowRef.current.getBoundingClientRect();
      setArrowCenter({
        x: arrowRect.left + arrowRect.width / 2 - btnRect.left,
        y: arrowRect.top + arrowRect.height / 2 - btnRect.top,
      });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const circleSize = arrowSize ?? sizes.circle;

  const paddingClass = config.showArrow ? sizes.pillPad : 'px-6 py-3';

  const inner = (
    <div
      ref={btnRef}
      className={`flex items-center ${sizes.gap} ${paddingClass} rounded-full cursor-pointer relative overflow-hidden transition-all duration-[350ms] ${fullWidth ? 'w-full justify-center' : 'w-fit'} ${className}`}
      style={{
        background: hovered ? config.hoveredBg : config.defaultBg,
        border: config.border || 'none',
        boxShadow: hovered ? (config.hoveredShadow || 'none') : (config.shadow || 'none'),
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Expanding fill from arrow circle center */}
      <div
        className="absolute rounded-full pointer-events-none z-[1]"
        style={{
          width: '500px',
          height: '500px',
          backgroundColor: config.expandColor,
          left: `${arrowCenter.x}px`,
          top: `${arrowCenter.y}px`,
          transform: hovered
            ? 'translate(-50%, -50%) scale(1)'
            : 'translate(-50%, -50%) scale(0)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      {/* Text */}
      <span
        className={`relative z-10 font-['Google_Sans',sans-serif] font-semibold ${sizes.text} transition-colors duration-300 whitespace-nowrap`}
        style={{ color: hovered ? config.hoveredText : config.defaultText }}
      >
        {label}
      </span>

      {/* Arrow circle */}
      {config.showArrow && (
        <div
          ref={arrowRef}
          className="relative z-10 flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: hovered ? config.hoveredCircleBg : config.defaultCircleBg,
          }}
        >
          <div
            className="flex items-center justify-center transition-transform duration-300"
            style={{ transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)' }}
          >
            <ArrowSvg
              size={sizes.arrow}
              color={hovered ? config.hoveredArrow : config.defaultArrow}
              className="transition-colors duration-300"
            />
          </div>
        </div>
      )}

      {/* Hidden ref for mobile-dark (no visible arrow) */}
      {!config.showArrow && <div ref={arrowRef} className="absolute right-4 top-1/2" />}
    </div>
  );

  if (href) return <a href={href} className="no-underline">{inner}</a>;
  return onClick ? <div onClick={onClick}>{inner}</div> : inner;
}

/* ═══════════════════════════════════════════════════════
   ARROW‑ROTATE CTA — no bg, unified arrow, rotates -45→0 on hover
   ═══════════════════════════════════════════════════════ */

function ArrowRotateCTA({
  label, variant = 'on-white', size = 'md', className, arrowSize, onClick, href,
}: Omit<AnimatedCTAProps, 'fullWidth'> & { variant: CTAVariant }) {
  const [hovered, setHovered] = useState(false);
  const config = noBgConfig[variant];
  const sizes = sizeConfig[size];

  /* Arrow circle for no-bg — uses a smaller proportional circle */
  const circleSize = arrowSize ?? Math.round(sizes.circle * 0.85);

  const inner = (
    <div
      className={`flex items-center ${sizes.gap} cursor-pointer w-fit group ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Text */}
      <span
        className={`font-['Google_Sans',sans-serif] font-semibold ${sizes.text} tracking-[-0.14px] whitespace-nowrap transition-colors duration-300`}
        style={{ color: hovered ? config.hoverTextColor : config.textColor }}
      >
        {label}
      </span>

      {/* Arrow with circle bg */}
      <div
        className="flex items-center justify-center rounded-full shrink-0 transition-all duration-300"
        style={{
          width: circleSize,
          height: circleSize,
          backgroundColor: hovered
            ? `${config.hoverArrowColor}18`
            : 'transparent',
        }}
      >
        <div
          className="transition-transform duration-300"
          style={{ transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)' }}
        >
          <ArrowSvg
            size={sizes.arrow}
            color={hovered ? config.hoverArrowColor : config.arrowColor}
            className="transition-colors duration-300"
          />
        </div>
      </div>
    </div>
  );

  if (href) return <a href={href} className="no-underline">{inner}</a>;
  return onClick ? <div onClick={onClick}>{inner}</div> : inner;
}
