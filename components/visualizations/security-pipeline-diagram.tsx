"use client";

import { motion } from 'motion/react';

const ease = [0.16, 1, 0.3, 1] as const;

/* ═══════════════════════════════════════════════
   FROSTED PANEL — light glass on gradient bg
   ═══════════════════════════════════════════════ */
function FrostedPanel({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden ${className}`}
      style={{
        background: 'rgba(255,255,255,0.12)',
        border: '1px solid rgba(255,255,255,0.25)',
        backdropFilter: 'blur(24px)',
        boxShadow:
          '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)',
      }}
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ISOMETRIC CUBE
   ═══════════════════════════════════════════════ */
function Cube({ size = 28, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
      <path d="M20 10L30 16L20 22L10 16Z" fill={color} fillOpacity="0.95" />
      <path d="M10 16L20 22L20 32L10 26Z" fill={color} fillOpacity="0.65" />
      <path d="M20 22L30 16L30 26L20 32Z" fill={color} fillOpacity="0.8" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   HORIZONTAL CONNECTOR — fixed width, dashed + particle
   ═══════════════════════════════════════════════ */
function HConnector({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative flex-1 min-w-[20px] h-[2px] flex items-center">
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.5) 5px, transparent 5px)',
          backgroundSize: '12px 2px',
        }}
        initial={{ scaleX: 0, transformOrigin: 'left' }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay, ease }}
      />
      <motion.div
        className="absolute right-[-4px] top-1/2 -translate-y-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
      >
        <svg width="6" height="10" viewBox="0 0 7 12" fill="none">
          <path
            d="M1 1L5.5 6L1 11"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white"
        style={{ boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
        animate={{
          left: ['-6px', 'calc(100% + 6px)'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.8,
          delay: delay + 0.4,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VERTICAL CONNECTOR
   ═══════════════════════════════════════════════ */
function VConnector({ delay = 0, h = 22 }: { delay?: number; h?: number }) {
  return (
    <div
      className="relative mx-auto flex items-center justify-center"
      style={{ width: 2, height: h }}
    >
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(255,255,255,0.5) 5px, transparent 5px)',
          backgroundSize: '2px 12px',
        }}
        initial={{ scaleY: 0, transformOrigin: 'top' }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, delay, ease }}
      />
      <motion.div
        className="absolute bottom-[-4px] left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.3, delay: delay + 0.3 }}
      >
        <svg width="10" height="6" viewBox="0 0 12 7" fill="none">
          <path
            d="M1 1L6 5.5L11 1"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
        style={{ boxShadow: '0 0 6px rgba(255,255,255,0.6)' }}
        animate={{
          top: ['-6px', 'calc(100% + 6px)'],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 1.4,
          delay: delay + 0.3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SEMI-FILLED ICONS
   ═══════════════════════════════════════════════ */
function BoxIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M21 16V8a2 2 0 0 0-1-1.73L13 2.27a2 2 0 0 0-2 0L4 6.27A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M3.27 6.96L12 12.01l8.73-5.05"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 22.08V12"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LayersIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L2 7l10 5 10-5-10-5z"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M2 17l10 5 10-5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12l10 5 10-5"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="1"
        y="3"
        width="22"
        height="5"
        rx="1"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M10 12h4"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle
        cx="9"
        cy="7"
        r="4"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M23 21v-2a4 4 0 0 0-3-3.87"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="3"
        r="4"
        fill="none"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
      />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <path
        d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.5"
      />
      <path
        d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function ServerIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="2"
        width="20"
        height="8"
        rx="2"
        fill="rgba(255,255,255,0.12)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <rect
        x="2"
        y="14"
        width="20"
        height="8"
        rx="2"
        fill="rgba(255,255,255,0.08)"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.5"
      />
      <circle cx="6" cy="6" r="1" fill="rgba(255,255,255,0.6)" />
      <circle cx="6" cy="18" r="1" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   1. REPOSITORY SOURCE
   ═══════════════════════════════════════════════ */
function RepositoryPanel({ delay = 0 }: { delay?: number }) {
  const items = [
    { label: 'Container Images', icon: <BoxIcon /> },
    { label: 'Libraries', icon: <LayersIcon /> },
    { label: 'Package', icon: <ArchiveIcon /> },
  ];

  return (
    <FrostedPanel delay={delay} className="p-3 lg:p-3.5 shrink-0">
      <div className="flex items-center gap-1.5 mb-2.5">
        <div className="w-1.5 h-1.5 rounded-full bg-white/50" />
        <span className="font-['Google_Sans',sans-serif] font-semibold text-[10px] lg:text-[11px] text-white tracking-wide uppercase">
          Repository
        </span>
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, i) => (
          <motion.div
            key={item.label}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.3 + i * 0.1, ease }}
          >
            {item.icon}
            <span className="font-['Google_Sans',sans-serif] font-medium text-[9px] lg:text-[10px] text-white/80">
              {item.label}
            </span>
          </motion.div>
        ))}
      </div>
    </FrostedPanel>
  );
}

/* ═══════════════════════════════════════════════
   2. CLEANSTART PLATFORM HUB
   Container sized to fully contain rings — no overflow
   ═══════════════════════════════════════════════ */
function CleanStartHub({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex flex-col items-center shrink-0"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {/* Sized container — matches outermost ring so nothing overflows */}
      <div className="relative w-[110px] h-[110px] lg:w-[130px] lg:h-[130px]">
        {/* Ring 1 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92px] h-[92px] lg:w-[108px] lg:h-[108px] rounded-full"
          style={{
            border: '1.5px solid rgba(255,255,255,0.15)',
            boxShadow: '0 0 20px rgba(255,255,255,0.05)',
          }}
          animate={{ rotate: -360 }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        />
        {/* Ring 2 */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[108px] h-[108px] lg:w-[128px] lg:h-[128px] rounded-full"
          style={{ border: '1px solid rgba(255,255,255,0.08)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 35, ease: 'linear', repeat: Infinity }}
        />

        {/* Core sphere — centered inside */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[68px] h-[68px] lg:w-[80px] lg:h-[80px] rounded-full flex items-center justify-center z-10"
          style={{
            background:
              'radial-gradient(circle at 38% 38%, rgba(255,255,255,0.25) 0%, rgba(5,107,241,0.6) 50%, rgba(5,107,241,0.9) 100%)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            boxShadow:
              '0 0 30px rgba(255,255,255,0.1), inset 0 0 16px rgba(255,255,255,0.08), 0 0 60px rgba(5,107,241,0.15)',
          }}
        >
          {/* Scan sweep */}
          <motion.div className="absolute inset-0 rounded-full overflow-hidden">
            <motion.div
              className="absolute w-full h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)',
              }}
              animate={{ top: ['15%', '85%', '15%'] }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </motion.div>

          {/* CS Logo — placeholder replacing Figma Group import */}
          <motion.div
            className="relative z-10 w-[24px] h-[28px] lg:w-[30px] lg:h-[35px] flex items-center justify-center"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.4))',
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 30 35" fill="none" className="w-full h-full">
              <path
                d="M15 2L3 9v17l12 7 12-7V9L15 2z"
                stroke="white"
                strokeWidth="1.5"
                fill="rgba(255,255,255,0.1)"
                strokeLinejoin="round"
              />
              <text
                x="15"
                y="22"
                textAnchor="middle"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                fontFamily="Sora, sans-serif"
              >
                CS
              </text>
            </svg>
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ border: '1.5px solid rgba(255,255,255,0.3)' }}
            animate={{ scale: [1, 1.3, 1.3], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Label */}
      <motion.p
        className="font-['Google_Sans',sans-serif] font-semibold text-[11px] lg:text-[12px] text-white whitespace-nowrap -mt-0.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      >
        CleanStart
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   3. CUSTOMER PRIVATE REPOSITORY
   ═══════════════════════════════════════════════ */
function CustomerRepoNode({ delay = 0 }: { delay?: number }) {
  return (
    <FrostedPanel delay={delay} className="px-3 py-2 flex items-center gap-2">
      <DatabaseIcon />
      <div>
        <p className="font-['Google_Sans',sans-serif] font-semibold text-[9px] lg:text-[10px] text-white whitespace-nowrap">
          Customer Private Repository
        </p>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[7px] lg:text-[8px] text-white/50">
          Organization image storage
        </p>
      </div>
    </FrostedPanel>
  );
}

/* ═══════════════════════════════════════════════
   4. DEVELOPER PULL LAYER
   ═══════════════════════════════════════════════ */
function DeveloperNode({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="flex flex-col items-center gap-1.5 shrink-0"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <div
        className="w-[38px] h-[38px] lg:w-[44px] lg:h-[44px] rounded-xl flex items-center justify-center"
        style={{
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <UsersIcon />
      </div>
      <div className="text-center max-w-[100px]">
        <p className="font-['Google_Sans',sans-serif] font-semibold text-[9px] lg:text-[10px] text-white">
          Developers Pull
        </p>
        <p className="font-['Google_Sans',sans-serif] font-normal text-[7px] lg:text-[8px] text-white/55 leading-snug mt-0.5">
          Build on Clean Images
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   5. PRIVATE REGISTRY
   ═══════════════════════════════════════════════ */
function PrivateRegistryNode({ delay = 0 }: { delay?: number }) {
  return (
    <FrostedPanel delay={delay} className="p-3 lg:p-3.5 shrink-0">
      <div className="flex items-center gap-1.5 mb-2">
        <ServerIcon />
        <span className="font-['Google_Sans',sans-serif] font-semibold text-[10px] lg:text-[11px] text-white tracking-wide uppercase">
          Private Registry
        </span>
      </div>
      <div className="flex flex-col gap-1.5">
        {['Verified', 'Scanned', 'Signed'].map((label, i) => (
          <motion.div
            key={label}
            className="flex items-center gap-1.5"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: delay + 0.3 + i * 0.1, ease }}
          >
            <motion.div
              className="w-1 h-1 rounded-full bg-white"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }}
            />
            <span className="font-['Google_Sans',sans-serif] font-medium text-[9px] lg:text-[10px] text-white/70">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </FrostedPanel>
  );
}

/* ═══════════════════════════════════════════════
   6. SECURITY & OPTIMIZATION PIPELINE + PRODUCTION
   Placeholder replacing Figma-imported PipelineGroup component
   ═══════════════════════════════════════════════ */
function SecurityPipelineWithProduction({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      className="relative flex flex-col items-center shrink-0 overflow-visible"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay, ease }}
    >
      <div className="relative w-[266px] h-[150px] overflow-visible flex items-center justify-center">
        {/* Placeholder for Figma PipelineGroup — replace with actual SVG/design */}
        <div
          className="w-full h-full rounded-2xl flex flex-col items-center justify-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.15)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex items-center gap-2">
            <Cube size={20} color="#fff" />
            <span className="font-['Google_Sans',sans-serif] font-semibold text-[10px] text-white/80 uppercase tracking-wide">
              Security Pipeline
            </span>
          </div>
          <div className="flex gap-3">
            {['Scan', 'Harden', 'Sign', 'Deploy'].map((step, i) => (
              <motion.div
                key={step}
                className="flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: delay + 0.5 + i * 0.15, ease }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
                  />
                </div>
                <span className="font-['Google_Sans',sans-serif] text-[7px] text-white/60">
                  {step}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MAIN FLOW DIAGRAM — EXPORT
   ═══════════════════════════════════════════════ */
export function SecurityPipelineDiagram() {
  return (
    <div className="w-full relative overflow-visible px-4 md:px-6 lg:px-8 pt-6 md:pt-8 lg:pt-10 pb-10 md:pb-14 lg:pb-20">
      {/* ═══════════════════════════════════════
         DESKTOP — centered horizontal pipeline
         ═══════════════════════════════════════ */}
      <div className="hidden lg:flex flex-col items-center w-full">
        {/* Single row — items-center aligns everything on the same horizontal midline */}
        <div className="flex items-center w-full mb-[130px]">
          {/* 1. Repository */}
          <RepositoryPanel delay={0.5} />

          <HConnector delay={0.9} />

          {/* 2. CleanStart column — sub-content hangs below via padding + absolute */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <CleanStartHub delay={1.0} />
            </div>
            {/* Sub-content positioned below orb — absolute so it doesn't affect flex centering height */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 flex flex-col items-center mt-0.5 w-max">
              {/* Feature tags */}
              <div className="flex flex-wrap justify-center gap-1 max-w-[220px]">
                {['Build Custom Images', 'Verify Image Signing', 'Support', 'Documentation', 'Manage Subscription'].map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-1.5 py-[2px] rounded-full font-['Google_Sans',sans-serif] font-medium text-[7px] lg:text-[8px]"
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: 'rgba(255,255,255,0.75)',
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 2.0 + i * 0.06, ease }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <VConnector delay={2.2} h={12} />
              <CustomerRepoNode delay={2.4} />
            </div>
          </div>

          <HConnector delay={1.4} />

          {/* 3. Developers Pull */}
          <DeveloperNode delay={1.5} />

          <HConnector delay={1.8} />

          {/* 4. Private Registry */}
          <PrivateRegistryNode delay={1.9} />

          <HConnector delay={2.3} />

          {/* 5. Security Pipeline column — sub-content hangs below */}
          <div className="relative overflow-visible">
            <SecurityPipelineWithProduction delay={2.4} />
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
         MOBILE / TABLET — vertical flow, centered
         ═══════════════════════════════════════ */}
      <div className="flex lg:hidden flex-col items-center">
        <RepositoryPanel delay={0.5} />
        <VConnector delay={0.9} />
        <CleanStartHub delay={1.0} />
        {/* Feature tags — mobile */}
        <div className="flex flex-wrap justify-center gap-1 mt-2 mb-1 max-w-[220px]">
          {['Build Custom Images', 'Verify Image Signing', 'Support', 'Documentation', 'Manage Subscription'].map((tag, i) => (
            <motion.span
              key={tag}
              className="px-1.5 py-[2px] rounded-full font-['Google_Sans',sans-serif] font-medium text-[7px] md:text-[8px]"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.75)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 1.4 + i * 0.06, ease }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        <VConnector delay={1.6} />
        <CustomerRepoNode delay={1.7} />
        <VConnector delay={1.9} />
        <DeveloperNode delay={2.0} />
        <VConnector delay={2.2} />
        <PrivateRegistryNode delay={2.3} />
        <VConnector delay={2.6} />
        <SecurityPipelineWithProduction delay={2.7} />
      </div>
    </div>
  );
}
