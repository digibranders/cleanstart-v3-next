'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

/**
 * AnimatedCounter - Counts up from 0 to target value when in view
 * Inspired by cleanstart.com's requestAnimationFrame counters
 */
export function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.6,
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const steps = 50;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      // Ease-out curve for natural deceleration
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (current >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}

/**
 * GradientCounter - Large gradient text animated counter
 * Matches cleanstart.com's -webkit-background-clip: text pattern
 */
export function GradientCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 1.6,
  gradient = 'linear-gradient(180deg, rgba(229,244,251,0.9), rgba(141,221,244,0.9))',
  className = '',
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  gradient?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const steps = 50;
    const stepDuration = (duration * 1000) / steps;
    let current = 0;

    const timer = setInterval(() => {
      current++;
      const progress = current / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(eased * value));
      if (current >= steps) clearInterval(timer);
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
      }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}
