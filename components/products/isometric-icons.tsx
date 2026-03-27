"use client";

import { motion } from 'motion/react';

/* ════════════════════════════════════════════════
   SHARED ANIMATION VARIANTS
   ════════════════════════════════════════════════ */
const float = {
  animate: {
    y: [0, -6, 0],
    transition: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const floatSlow = {
  animate: {
    y: [0, -4, 0],
    transition: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const pulse = {
  animate: {
    opacity: [0.4, 1, 0.4],
    transition: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' as const },
  },
};

const drawLine = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: [0, 1, 1, 0],
    transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' as const, times: [0, 0.4, 0.7, 1] },
  },
};

/* ════════════════════════════════════════════════
   1. ALWAYS SECURE — Shield + scan lines + checkmark
   ════════════════════════════════════════════════ */
export function SecureIcon() {
  return (
    <div className="w-[160px] aspect-square relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <motion.path
          d="M100 170 L30 135 L100 100 L170 135 Z"
          stroke="#056BF1"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity={0.25}
          {...floatSlow}
        />
        <motion.path
          d="M100 160 L45 130 L100 100 L155 130 Z"
          stroke="#056BF1"
          strokeWidth="1"
          strokeDasharray="6 3"
          fill="rgba(5,107,241,0.04)"
          opacity={0.4}
        />

        <motion.g {...float}>
          <motion.path
            d="M100 30 L60 50 L60 95 Q60 120 100 145 Q140 120 140 95 L140 50 Z"
            stroke="#056BF1"
            strokeWidth="1.5"
            fill="rgba(5,107,241,0.06)"
            strokeLinejoin="round"
          />
          <motion.path
            d="M100 42 L70 58 L70 93 Q70 112 100 133 Q130 112 130 93 L130 58 Z"
            stroke="#056BF1"
            strokeWidth="1"
            strokeDasharray="5 3"
            fill="none"
            opacity={0.35}
          />

          <motion.path
            d="M85 88 L95 100 L118 72"
            stroke="#056BF1"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            {...drawLine}
          />

          <motion.line
            x1="65" y1="75" x2="135" y2="75"
            stroke="#056BF1"
            strokeWidth="0.8"
            opacity={0.3}
            animate={{
              y1: [60, 120, 60],
              y2: [60, 120, 60],
              opacity: [0, 0.4, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.line
            x1="68" y1="80" x2="132" y2="80"
            stroke="#056BF1"
            strokeWidth="0.5"
            opacity={0.2}
            animate={{
              y1: [65, 125, 65],
              y2: [65, 125, 65],
              opacity: [0, 0.25, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.15 }}
          />
        </motion.g>

        <motion.rect
          x="47" y="25" width="8" height="8"
          stroke="#056BF1" strokeWidth="1" fill="none" opacity={0.3}
          {...pulse}
        />
        <motion.line
          x1="51" y1="33" x2="75" y2="48"
          stroke="#056BF1" strokeWidth="0.7" strokeDasharray="3 3" opacity={0.25}
        />
        <motion.rect
          x="145" y="42" width="6" height="6"
          stroke="#056BF1" strokeWidth="1" fill="none" opacity={0.3}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />

        <motion.circle
          cx="155" cy="70" r="2.5" fill="#056BF1" opacity={0.35}
          animate={{ y: [0, -5, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="42" cy="85" r="2" fill="#056BF1" opacity={0.25}
          animate={{ y: [0, -4, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════
   2. BUILT FOR DEVELOPERS — Isometric cube with centered </>
   ════════════════════════════════════════════════ */
export function DeveloperIcon() {
  return (
    <div className="w-[160px] aspect-square relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <motion.path
          d="M100 180 L25 143 L100 106 L175 143 Z"
          stroke="#056BF1"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity={0.2}
          {...floatSlow}
        />

        <motion.g {...float}>
          <path
            d="M100 45 L150 72 L100 99 L50 72 Z"
            stroke="#056BF1"
            strokeWidth="1.3"
            fill="rgba(5,107,241,0.08)"
            strokeLinejoin="round"
          />
          <path
            d="M50 72 L100 99 L100 150 L50 123 Z"
            stroke="#056BF1"
            strokeWidth="1.3"
            fill="rgba(5,107,241,0.05)"
            strokeLinejoin="round"
          />
          <path
            d="M150 72 L100 99 L100 150 L150 123 Z"
            stroke="#056BF1"
            strokeWidth="1.3"
            fill="rgba(5,107,241,0.03)"
            strokeLinejoin="round"
          />

          <path
            d="M100 53 L143 76 L100 99 L57 76 Z"
            stroke="#056BF1"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            fill="none"
            opacity={0.2}
          />
          <line x1="57" y1="76" x2="57" y2="118" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="4 3" opacity={0.15} />
          <line x1="143" y1="76" x2="143" y2="118" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="4 3" opacity={0.15} />
          <line x1="100" y1="99" x2="100" y2="141" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="4 3" opacity={0.15} />

          <motion.path
            d="M84 62 L74 72 L84 82"
            stroke="#056BF1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            {...drawLine}
          />
          <motion.path
            d="M116 62 L126 72 L116 82"
            stroke="#056BF1"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{
              pathLength: [0, 1, 1, 0],
              transition: { duration: 4, repeat: Infinity, ease: 'easeInOut', times: [0, 0.4, 0.7, 1], delay: 0.3 },
            }}
          />
          <motion.line
            x1="107" y1="58" x2="93" y2="86"
            stroke="#056BF1"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity={0.5}
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={i}
              x1={62}
              y1={92 + i * 10}
              x2={62 + 22 - i * 4}
              y2={92 + i * 10}
              stroke="#056BF1"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={0.2}
              animate={{ opacity: [0.1, 0.35, 0.1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
            />
          ))}

          {[0, 1, 2, 3].map((i) => (
            <motion.line
              key={`r${i}`}
              x1={115}
              y1={92 + i * 10}
              x2={115 + 20 - i * 4}
              y2={92 + i * 10}
              stroke="#056BF1"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity={0.18}
              animate={{ opacity: [0.08, 0.3, 0.08] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: 0.1 + i * 0.2 }}
            />
          ))}
        </motion.g>

        <line x1="30" y1="168" x2="170" y2="168" stroke="#056BF1" strokeWidth="0.7" strokeDasharray="4 4" opacity={0.15} />
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={i}
            cx={30}
            cy={168}
            r="3"
            fill="#056BF1"
            opacity={0.35}
            animate={{
              cx: [30, 170],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.7,
            }}
          />
        ))}

        <motion.rect
          x="160" y="38" width="7" height="7"
          stroke="#056BF1" strokeWidth="1" fill="none" opacity={0.25}
          {...pulse}
        />
        <line x1="160" y1="42" x2="155" y2="58" stroke="#056BF1" strokeWidth="0.7" strokeDasharray="3 3" opacity={0.2} />

        <motion.circle
          cx="35" cy="55" r="2" fill="#056BF1" opacity={0.25}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════
   3. PERFORMANCE GUARANTEED — Stacked isometric layers
   ════════════════════════════════════════════════ */
export function PerformanceIcon() {
  return (
    <div className="w-[160px] aspect-square relative flex items-center justify-center">
      <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
        <motion.path
          d="M100 175 L25 138 L100 101 L175 138 Z"
          stroke="#056BF1"
          strokeWidth="1"
          strokeDasharray="4 4"
          fill="none"
          opacity={0.2}
          {...floatSlow}
        />

        <motion.g {...float}>
          <motion.path
            d="M55 130 L100 155 L145 130 L100 105 Z"
            stroke="#056BF1" strokeWidth="1" strokeDasharray="5 3"
            fill="rgba(5,107,241,0.03)" opacity={0.3}
          />
          <motion.path
            d="M55 112 L100 137 L145 112 L100 87 Z"
            stroke="#056BF1" strokeWidth="1" strokeDasharray="5 3"
            fill="rgba(5,107,241,0.05)" opacity={0.45}
          />
          <motion.path
            d="M55 94 L100 119 L145 94 L100 69 Z"
            stroke="#056BF1" strokeWidth="1.3"
            fill="rgba(5,107,241,0.08)" opacity={0.7}
          />
          <line x1="55" y1="94" x2="55" y2="130" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="3 3" opacity={0.2} />
          <line x1="100" y1="119" x2="100" y2="155" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="3 3" opacity={0.2} />
          <line x1="145" y1="94" x2="145" y2="130" stroke="#056BF1" strokeWidth="0.8" strokeDasharray="3 3" opacity={0.2} />

          <motion.path
            d="M92 88 L98 95 L110 82"
            stroke="#056BF1"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            {...drawLine}
          />
        </motion.g>

        <motion.circle
          cx="80" cy="75" r="2" fill="#056BF1" opacity={0.3}
          animate={{ y: [0, -12, 0], opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="120" cy="68" r="1.5" fill="#056BF1" opacity={0.25}
          animate={{ y: [0, -10, 0], opacity: [0.1, 0.35, 0.1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        />

        <motion.rect
          x="35" y="70" width="6" height="6"
          stroke="#056BF1" strokeWidth="1" fill="none" opacity={0.25}
          {...pulse}
        />
        <line x1="41" y1="73" x2="55" y2="86" stroke="#056BF1" strokeWidth="0.7" strokeDasharray="3 3" opacity={0.15} />
        <motion.rect
          x="155" y="78" width="5" height="5"
          stroke="#056BF1" strokeWidth="1" fill="none" opacity={0.2}
          animate={{ opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
        <motion.circle
          cx="162" cy="120" r="2" fill="#056BF1" opacity={0.25}
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />
      </svg>
    </div>
  );
}
