'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

/**
 * CallToActionButton - Unified CTA System for CleanStart
 *
 * Combines all CTA variants into one component with consistent animations.
 * Features premium expanding circle animation from arrow center for pill variants,
 * and elegant arrow rotation for text-only variants.
 */

/** Arrow SVG path (diagonal arrow) */
const ARROW_DIAGONAL_PATH = 'M0.71 0V2H26.07L0 28.07L1.41 29.49L27.49 3.41V28.78H29.49V0H0.71Z';

type CTAVariant =
  | 'premium'      // Blue (#056BF1) -> Purple (#5d04d8) with 45deg arrow rotation
  | 'light'        // White pill, blue text -> blue expand (hero, footer, testimonials)
  | 'dark'         // Blue pill, white text -> white expand (scrolled navbar)
  | 'mobile-dark'  // Blue pill, white text, no arrow circle (mobile menu)
  | 'ghost-light'  // NO bg, white text + blue arrow circle -> arrow rotates
  | 'on-white'     // NO bg, dark text + arrow -> arrow rotates
  | 'on-blue'      // NO bg, white text + arrow -> arrow rotates
  | 'on-card'      // NO bg, white text + arrow -> arrow rotates
  ;

/* -- Whether a variant has a visible pill background -- */
const hasPillBg = (v: CTAVariant) =>
  v === 'premium' || v === 'light' || v === 'dark' || v === 'mobile-dark';

/* -- Color configs for PILL variants (expanding-circle animation) -- */
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
  showArrow: boolean;
  useCustomArrow?: boolean; // Use diagonal arrow with rotation
  arrowRotation?: { default: number; hovered: number }; // Arrow rotation angles
}> = {
  premium: {
    defaultBg: '#056BF1',
    expandColor: '#5d04d8',
    hoveredBg: '#5d04d8',
    defaultText: '#ffffff',
    hoveredText: '#ffffff',
    defaultCircleBg: '#ffffff',
    hoveredCircleBg: '#ffffff',
    defaultArrow: '#056BF1',
    hoveredArrow: '#5d04d8',
    showArrow: true,
    useCustomArrow: true,
    arrowRotation: { default: 0, hovered: 45 },
  },
  light: {
    defaultBg: '#ffffff',
    expandColor: '#06C7F2',
    hoveredBg: '#06C7F2',
    defaultText: '#056BF1',
    hoveredText: '#ffffff',
    defaultCircleBg: '#056BF1',
    hoveredCircleBg: '#ffffff',
    defaultArrow: '#ffffff',
    hoveredArrow: '#06C7F2',
    showArrow: true,
    arrowRotation: { default: -45, hovered: 0 },
  },
  dark: {
    defaultBg: '#056BF1',
    expandColor: '#06C7F2',
    hoveredBg: '#06C7F2',
    defaultText: '#ffffff',
    hoveredText: '#ffffff',
    defaultCircleBg: '#ffffff',
    hoveredCircleBg: '#ffffff',
    defaultArrow: '#056BF1',
    hoveredArrow: '#06C7F2',
    showArrow: true,
    arrowRotation: { default: -45, hovered: 0 },
  },
  'mobile-dark': {
    defaultBg: '#056BF1',
    expandColor: '#0455c5',
    hoveredBg: '#0455c5',
    defaultText: '#ffffff',
    hoveredText: '#ffffff',
    defaultCircleBg: '#ffffff',
    hoveredCircleBg: '#0455c5',
    defaultArrow: '#056BF1',
    hoveredArrow: '#ffffff',
    showArrow: false,
  },
};

/* -- Color configs for NO-BG variants (arrow-rotate only) -- */
const noBgConfig: Record<string, {
  textColor: string;
  arrowColor: string;
  circleBg: string; // '' = no circle
}> = {
  'ghost-light': { textColor: '#ffffff', arrowColor: '#ffffff', circleBg: '#056BF1' },
  'on-white':    { textColor: '#181818', arrowColor: '#181818', circleBg: '' },
  'on-blue':     { textColor: '#ffffff', arrowColor: '#ffffff', circleBg: '' },
  'on-card':     { textColor: '#ffffff', arrowColor: '#ffffff', circleBg: '' },
};

/* --------------------------------------------------- */

export interface CallToActionButtonProps {
  label: string;
  variant?: CTAVariant;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  arrowSize?: number;
  onClick?: () => void;
  href?: string;
  fullWidth?: boolean;
}

export function CallToActionButton({
  label,
  variant = 'light',
  size = 'md',
  className = '',
  arrowSize,
  onClick,
  href,
  fullWidth = false,
}: CallToActionButtonProps) {
  /* If variant has a pill bg -> expanding-circle animation */
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

  /* Otherwise -> simple arrow-rotate treatment */
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

/* =====================================================
   PILL CTA -- expanding circle from arrow center
   ===================================================== */

function PillCTA({
  label, variant, size, className, arrowSize, onClick, href, fullWidth,
}: Omit<CallToActionButtonProps, 'variant'> & { variant: CTAVariant }) {
  const [hovered, setHovered] = useState(false);
  const btnRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const [arrowCenter, setArrowCenter] = useState({ x: 0, y: 0 });
  const config = pillConfig[variant];

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

  // Premium variant uses fixed 40px height, 32px circle
  const isPremium = variant === 'premium';
  const circleSize = isPremium ? 32 : (arrowSize ?? (size === 'sm' ? 24 : size === 'lg' ? 36 : 28));

  const heightClass = isPremium ? 'h-[40px]' : '';
  const paddingClass = isPremium
    ? 'pl-4 pr-1'
    : config.showArrow
      ? size === 'sm'
        ? 'pl-3 pr-[4px] py-[4px]'
        : size === 'lg'
          ? 'pl-6 pr-[5px] py-[5px]'
          : 'pl-[10px] pr-[5px] py-[5px]'
      : 'px-6 py-3';

  const textSize = isPremium
    ? 'text-[15px]'
    : size === 'sm' ? 'text-[13px]' : size === 'lg' ? 'text-[16px]' : 'text-[14px]';

  const fontWeight = isPremium ? 'font-normal' : 'font-semibold';

  const inner = (
    <div
      ref={btnRef}
      className={`flex items-center gap-2 ${heightClass} ${paddingClass} rounded-full cursor-pointer relative overflow-hidden transition-colors duration-[350ms] ${fullWidth ? 'w-full justify-center' : 'w-fit'} ${className}`}
      style={{
        background: hovered ? config.hoveredBg : config.defaultBg,
        border: config.border || 'none',
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
        className={`relative z-10 font-['Google_Sans',sans-serif] ${fontWeight} ${textSize} transition-colors duration-300 whitespace-nowrap ${isPremium ? 'mr-2' : ''}`}
        style={{ color: hovered ? config.hoveredText : config.defaultText }}
      >
        {label}
      </span>

      {/* Arrow circle */}
      {config.showArrow && (
        <div
          ref={arrowRef}
          className="relative z-10 flex items-center justify-center rounded-full shrink-0 transition-colors duration-300"
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: hovered ? config.hoveredCircleBg : config.defaultCircleBg,
          }}
        >
          {config.useCustomArrow ? (
            /* Diagonal arrow for premium variant */
            <svg
              width="12"
              height="12"
              viewBox="0 0 29.49 29.49"
              fill="none"
              className="transition-transform duration-300"
              style={{
                transform: `rotate(${hovered ? config.arrowRotation?.hovered ?? 0 : config.arrowRotation?.default ?? 0}deg)`
              }}
            >
              <path
                d={ARROW_DIAGONAL_PATH}
                className="transition-[fill] duration-300"
                style={{ fill: hovered ? config.hoveredArrow : config.defaultArrow }}
              />
            </svg>
          ) : (
            /* Standard arrow for other variants */
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-all duration-300"
              style={{
                transform: `rotate(${hovered ? config.arrowRotation?.hovered ?? 0 : config.arrowRotation?.default ?? 0}deg)`
              }}
            >
              <path
                d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-[stroke] duration-300"
                style={{ stroke: hovered ? config.hoveredArrow : config.defaultArrow }}
              />
            </svg>
          )}
        </div>
      )}

      {/* Hidden ref for mobile-dark (no visible arrow) */}
      {!config.showArrow && <div ref={arrowRef} className="absolute right-4 top-1/2" />}
    </div>
  );

  if (href) return <Link href={href} className="no-underline">{inner}</Link>;
  return onClick ? <div onClick={onClick}>{inner}</div> : inner;
}

/* =====================================================
   ARROW-ROTATE CTA -- no bg, arrow rotates -45->0 on hover
   ===================================================== */

function ArrowRotateCTA({
  label, variant = 'on-white', size, className, arrowSize, onClick, href,
}: Omit<CallToActionButtonProps, 'fullWidth'> & { variant: CTAVariant }) {
  const [hovered, setHovered] = useState(false);
  const config = noBgConfig[variant] || noBgConfig['on-white'];
  const hasCircle = config.circleBg !== '';

  const circleSize = arrowSize ?? (size === 'sm' ? 24 : size === 'lg' ? 32 : 28);
  const textSize =
    size === 'sm' ? 'text-[14px]' : size === 'lg' ? 'text-[16px]' : 'text-[14px]';

  const inner = (
    <div
      className={`flex items-center gap-[8px] cursor-pointer w-fit ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Text */}
      <span
        className={`font-['Google_Sans',sans-serif] font-semibold ${textSize} tracking-[-0.14px] whitespace-nowrap`}
        style={{ color: config.textColor }}
      >
        {label}
      </span>

      {/* Arrow (with or without circle bg) */}
      {hasCircle ? (
        <div
          className="flex items-center justify-center rounded-full shrink-0"
          style={{
            width: circleSize,
            height: circleSize,
            backgroundColor: config.circleBg,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300"
            style={{ transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)' }}
          >
            <path
              d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ stroke: config.arrowColor }}
            />
          </svg>
        </div>
      ) : (
        <div className="transition-transform duration-300"
          style={{ transform: hovered ? 'rotate(0deg)' : 'rotate(-45deg)' }}
        >
          <svg width="13" height="12" viewBox="0 0 12.7921 11.204" fill="none">
            <path
              d="M7.072 0.105996C6.9935 0.0338566 6.88955 -0.00414213 6.78303 0.000358746C6.67651 0.00485962 6.57614 0.0514914 6.504 0.129996C6.43186 0.2085 6.39386 0.312445 6.39836 0.418966C6.40286 0.525487 6.4495 0.625856 6.528 0.697995L11.464 5.202H0.4C0.293913 5.202 0.192172 5.24414 0.117157 5.31915C0.0421428 5.39417 0 5.49591 0 5.602C0 5.70808 0.0421428 5.80982 0.117157 5.88484C0.192172 5.95985 0.293913 6.002 0.4 6.002H11.464L6.528 10.506C6.4495 10.5781 6.40286 10.6785 6.39836 10.785C6.39386 10.8915 6.43186 10.9955 6.504 11.074C6.57614 11.1525 6.67651 11.1991 6.78303 11.2036C6.88955 11.2081 6.9935 11.1701 7.072 11.098L12.6 6.042C12.6606 5.98583 12.7089 5.91776 12.742 5.84204C12.775 5.76633 12.7921 5.68461 12.7921 5.602C12.7921 5.51938 12.775 5.43766 12.742 5.36195C12.7089 5.28623 12.6606 5.21816 12.6 5.162L7.072 0.105996Z"
              fill={config.arrowColor}
            />
          </svg>
        </div>
      )}
    </div>
  );

  if (href) return <Link href={href} className="no-underline">{inner}</Link>;
  return onClick ? <div onClick={onClick}>{inner}</div> : inner;
}

/* =====================================================
   CIRCLE ARROW CTA — icon-only, no text
   28px circle, 10px diagonal arrow, 1.3px stroke
   Used inside cards (blog, feature, resource cards)
   ===================================================== */

const DIAGONAL_ARROW_10 = "M1.5 8.5L8.5 1.5M8.5 1.5H3M8.5 1.5V7";

type CircleArrowVariant = 'white-blue' | 'blue-white' | 'outline-white' | 'outline-dark';

const circleArrowConfig: Record<CircleArrowVariant, {
  bg: string;
  arrowColor: string;
  border: string;
  hoverBg: string;
  hoverArrow: string;
  hoverBorder: string;
}> = {
  'white-blue': {
    bg: '#ffffff',
    arrowColor: '#056BF1',
    border: 'none',
    hoverBg: '#056BF1',
    hoverArrow: '#ffffff',
    hoverBorder: 'none',
  },
  'blue-white': {
    bg: '#056BF1',
    arrowColor: '#ffffff',
    border: 'none',
    hoverBg: '#06C7F2',
    hoverArrow: '#ffffff',
    hoverBorder: 'none',
  },
  'outline-white': {
    bg: 'transparent',
    arrowColor: '#ffffff',
    border: '1.3px solid rgba(255,255,255,0.4)',
    hoverBg: 'rgba(255,255,255,0.15)',
    hoverArrow: '#ffffff',
    hoverBorder: '1.3px solid rgba(255,255,255,0.8)',
  },
  'outline-dark': {
    bg: 'transparent',
    arrowColor: '#181818',
    border: '1.3px solid rgba(24,24,24,0.2)',
    hoverBg: '#056BF1',
    hoverArrow: '#ffffff',
    hoverBorder: '1.3px solid #056BF1',
  },
};

export interface CircleArrowCTAProps {
  variant?: CircleArrowVariant;
  size?: number;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function CircleArrowCTA({
  variant = 'blue-white',
  size = 28,
  className = '',
  href,
  onClick,
}: CircleArrowCTAProps) {
  const [hovered, setHovered] = useState(false);
  const config = circleArrowConfig[variant];
  const arrowSize = Math.round(size * 0.36);

  const circle = (
    <div
      className={`flex items-center justify-center rounded-full shrink-0 cursor-pointer transition-all duration-300 ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor: hovered ? config.hoverBg : config.bg,
        border: hovered ? config.hoverBorder : config.border,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg
        width={arrowSize}
        height={arrowSize}
        viewBox="0 0 10 10"
        fill="none"
        className="transition-all duration-300"
        style={{ transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)' }}
      >
        <path
          d={DIAGONAL_ARROW_10}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke] duration-300"
          style={{ stroke: hovered ? config.hoverArrow : config.arrowColor }}
        />
      </svg>
    </div>
  );

  if (href) return <Link href={href} className="no-underline">{circle}</Link>;
  return onClick ? <div onClick={onClick}>{circle}</div> : circle;
}

/* =====================================================
   TEXT ARROW CTA — "Learn More ↗" style, no circle
   Used inline in cards for subtle CTAs
   ===================================================== */

export interface TextArrowCTAProps {
  label: string;
  color?: string;
  hoverColor?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export function TextArrowCTA({
  label,
  color = '#181818',
  hoverColor = '#056BF1',
  className = '',
  href,
  onClick,
}: TextArrowCTAProps) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <div
      className={`inline-flex items-center gap-1.5 cursor-pointer ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className="font-['Google_Sans',sans-serif] text-[13px] font-medium transition-colors duration-300"
        style={{ color: hovered ? hoverColor : color }}
      >
        {label}
      </span>
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        className="transition-all duration-300"
        style={{ transform: hovered ? 'rotate(45deg)' : 'rotate(0deg)' }}
      >
        <path
          d={DIAGONAL_ARROW_10}
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-[stroke] duration-300"
          style={{ stroke: hovered ? hoverColor : color }}
        />
      </svg>
    </div>
  );

  if (href) return <Link href={href} className="no-underline">{content}</Link>;
  return onClick ? <div onClick={onClick}>{content}</div> : content;
}
