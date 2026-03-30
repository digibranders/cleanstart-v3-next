"use client";

import { motion } from 'motion/react';
import { useState, useEffect, useRef, useMemo } from 'react';
import WhiteBgCube from '@/lib/svg-data/WhiteBgCube1';
import { CallToActionButton } from '@/components/shared/call-to-action-button';
import { TECH_LOGOS, TechLogoSVG } from '@/components/home/tech-logo-data';

function pseudoRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

// --- Antigravity Particle System ---

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseX: number;
  baseY: number;
}

function AntigravityParticles({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(undefined);
  const rotationRef = useRef(0);

  useEffect(() => {
    const particleCount = 135;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 140 + Math.random() * 100;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      newParticles.push({
        id: i, x, y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
        baseX: x, baseY: y,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setMousePos({ x: e.clientX - centerX, y: e.clientY - centerY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  useEffect(() => {
    const animate = () => {
      rotationRef.current += 0.004;
      setParticles((prevParticles) =>
        prevParticles.map((particle, index) => {
          const originalAngle = (Math.PI * 2 * index) / prevParticles.length;
          const originalRadius = 140 + ((particle.size - 2) / 3) * 100;
          const rotatedAngle = originalAngle + rotationRef.current;
          const newBaseX = Math.cos(rotatedAngle) * originalRadius;
          const newBaseY = Math.sin(rotatedAngle) * originalRadius;

          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const repulsionRadius = 120;
          let ax = 0;
          let ay = 0;
          if (distance < repulsionRadius && distance > 0) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            ax = -Math.cos(angle) * force * 2;
            ay = -Math.sin(angle) * force * 2;
          }

          const toBaseX = newBaseX - particle.x;
          const toBaseY = newBaseY - particle.y;
          ax += toBaseX * 0.02;
          ay += toBaseY * 0.02;
          ay -= 0.05;

          let newVx = (particle.vx + ax) * 0.95;
          let newVy = (particle.vy + ay) * 0.95;
          newVx += (Math.random() - 0.5) * 0.1;
          newVy += (Math.random() - 0.5) * 0.1;

          let newX = particle.x + newVx;
          let newY = particle.y + newVy;

          const maxDist = 280;
          const distFromCenterNew = Math.sqrt(newX * newX + newY * newY);
          if (distFromCenterNew > maxDist) {
            const angle = Math.atan2(newY, newX);
            newX = Math.cos(angle) * maxDist;
            newY = Math.sin(angle) * maxDist;
            newVx *= -0.3;
            newVy *= -0.3;
          }

          return { ...particle, x: newX, y: newY, vx: newVx, vy: newVy, baseX: newBaseX, baseY: newBaseY };
        })
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePos]);

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: particle.size, height: particle.size,
            x: particle.x, y: particle.y,
            background: 'rgba(255, 255, 255, 0.5)',
            opacity: particle.opacity,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.3})`,
          }}
        />
      ))}
    </div>
  );
}

// --- Frosted Square Flow (left → center → green → right fade) ---

interface FrostedSquare {
  id: number;
  size: number;
  yOffset: number;
  delay: number;
  rotation: number;
  duration: number;
  logoIndex: number;
}

function FrostedSquareFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [halfWidth, setHalfWidth] = useState(960);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setHalfWidth(containerRef.current.offsetWidth / 2 + 60);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const squares = useMemo<FrostedSquare[]>(() => {
    const items: FrostedSquare[] = [];
    const logoCount = TECH_LOGOS.length;
    const UNIFORM_SIZE = 56;
    for (let i = 0; i < 9; i++) {
      const ySeed = pseudoRandom(i + 1);
      const rotationSeed = pseudoRandom(i + 101);
      const durationSeed = pseudoRandom(i + 201);
      items.push({
        id: i,
        size: UNIFORM_SIZE,
        yOffset: (ySeed - 0.5) * 280,
        delay: i * 1.0,
        rotation: rotationSeed * 20 - 10,
        duration: 6 + durationSeed * 1.5,
        logoIndex: i % logoCount,
      });
    }
    return items;
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 22 }}
    >
      {squares.map((sq) => {
        const logo = TECH_LOGOS[sq.logoIndex];
        const logoSize = sq.size * 0.55;
        const animDuration = sq.duration;
        const animDelay = sq.delay * 0.7;

        return (
          <motion.div
            key={sq.id}
            className="absolute top-1/2 left-1/2"
            style={{
              width: sq.size,
              height: sq.size,
              marginTop: sq.yOffset,
              marginLeft: -sq.size / 2,
              borderRadius: '50%',
            }}
            initial={{ x: -halfWidth, opacity: 1, rotate: sq.rotation, scale: 0.85 }}
            animate={{
              x: [-halfWidth, -halfWidth * 0.3, 0, halfWidth * 0.3, halfWidth],
              opacity: [1, 1, 1, 1, 1],
              rotate: [sq.rotation, sq.rotation * 0.5, 0, -sq.rotation * 0.3, -sq.rotation],
              scale: [0.85, 1.0, 1.1, 1.0, 0.85],
            }}
            transition={{
              duration: animDuration,
              delay: animDelay,
              times: [0, 0.25, 0.5, 0.75, 1],
              ease: [0.25, 0.46, 0.45, 0.94],
              repeat: Infinity,
              repeatDelay: 0.5,
            }}
          >
            {/* Frosted circle — white/frosted start, snaps to brand blue #056BF1 after scanning center */}
            <motion.div
              className="w-full h-full rounded-full relative overflow-hidden flex items-center justify-center"
              style={{
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              animate={{
                background: [
                  'rgba(255,255,255,0.95)',
                  'rgba(255,255,255,0.95)',
                  'rgba(255,255,255,0.85)',
                  'rgba(5,107,241,0.85)',
                  'rgba(5,107,241,0.95)',
                  'rgba(5,107,241,0.95)',
                ],
                borderColor: [
                  'rgba(5,107,241,0.15)',
                  'rgba(5,107,241,0.15)',
                  'rgba(5,107,241,0.4)',
                  'rgba(255,255,255,0.4)',
                  'rgba(255,255,255,0.2)',
                  'rgba(255,255,255,0.2)',
                ],
              }}
              transition={{
                duration: animDuration,
                delay: animDelay,
                times: [0, 0.42, 0.47, 0.53, 0.58, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.5,
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid rgba(5,107,241,0.1)' }}
              />
              {/* Inner shine line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
              {/* Tech logo — crossfade between pre-scan (blue/cyan) and post-scan (white/grey) using same keyframe timing as circle bg */}
              <div className="relative z-[1] flex items-center justify-center" style={{ width: logoSize, height: logoSize }}>
                {/* Pre-scan: blue/cyan icons on white bg — visible before center, fades out at center */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [1, 1, 1, 0, 0, 0],
                  }}
                  transition={{
                    duration: animDuration,
                    delay: animDelay,
                    times: [0, 0.42, 0.47, 0.53, 0.58, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <TechLogoSVG logo={logo} size={logoSize} scanned={false} />
                </motion.div>
                {/* Post-scan: white/grey icons on blue bg — hidden before center, fades in at center */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    opacity: [0, 0, 0, 1, 1, 1],
                  }}
                  transition={{
                    duration: animDuration,
                    delay: animDelay,
                    times: [0, 0.42, 0.47, 0.53, 0.58, 1],
                    ease: 'easeInOut',
                    repeat: Infinity,
                    repeatDelay: 0.5,
                  }}
                >
                  <TechLogoSVG logo={logo} size={logoSize} scanned={true} />
                </motion.div>
              </div>
              {/* Checkmark overlay — fades in after crossing center (brand blue phase) */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  opacity: [0, 0, 0, 1, 0],
                }}
                transition={{
                  duration: animDuration,
                  delay: animDelay,
                  times: [0, 0.25, 0.5, 0.65, 0.85],
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center rounded-full"
                  style={{ background: 'rgba(5,107,241,0.4)' }}
                >
                  <svg width={sq.size * 0.35} height={sq.size * 0.35} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M9 12l2 2 4-4"
                      stroke="rgba(255,255,255,0.95)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

function OrbitalVerification() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showVerified, setShowVerified] = useState(false);

  useEffect(() => {
    // Show the "All Layers Verified" pill after a delay
    const timeout = setTimeout(() => setShowVerified(true), 3000);
    const loop = setInterval(() => {
      setShowVerified(false);
      setTimeout(() => setShowVerified(true), 3000);
    }, 8000);
    return () => { clearTimeout(timeout); clearInterval(loop); };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.015) 40%, transparent 65%)' }}
        animate={{ opacity: showVerified ? 1 : 0.6 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <AntigravityParticles containerRef={containerRef} />
      {/* Frosted glass circle behind logo — brand blue */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ zIndex: 25, width: 286, height: 286 }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: '1.5px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.08)',
          }}
        />
      </motion.div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: '140px', height: '161px', zIndex: 30, opacity: 1 }}
        animate={{ scale: showVerified ? 1.03 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="w-full h-full" style={{ opacity: 1 }}>
          <WhiteBgCube />
        </div>
      </motion.div>
      {showVerified && (
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="px-5 py-2.5 rounded-full border"
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderColor: 'rgba(255,255,255,0.35)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">All Layers Verified</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// --- CleanSight Radar Scanning Visual ---

function WavesVisual() {
  const [threats, setThreats] = useState<Array<{ id: number; angle: number; distance: number; detected: boolean; isCritical: boolean }>>([]);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const newThreats = Array.from({ length: 12 }, (_, i) => ({
      id: i, angle: Math.random() * 360, distance: 100 + Math.random() * 200,
      detected: false, isCritical: Math.random() > 0.7,
    }));
    setThreats(newThreats);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);
      setThreats((prev) =>
        prev.map((threat) => {
          const angleDiff = Math.abs(scanAngle - threat.angle);
          const normalizedDiff = Math.min(angleDiff, 360 - angleDiff);
          if (normalizedDiff < 15 && !threat.detected) return { ...threat, detected: true };
          return threat;
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, [scanAngle]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[100, 160, 220, 280, 340].map((radius, i) => (
            <motion.div key={radius} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ width: radius * 2, height: radius * 2, border: '1px solid rgba(255, 255, 255, 0.2)' }}
              initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div className="absolute inset-0 rounded-full" style={{ border: '2px solid rgba(255, 255, 255, 0.15)' }} initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 3, delay: i * 0.3, repeat: Infinity, repeatDelay: 1, ease: 'easeOut' }}
              />
            </motion.div>
          ))}

          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" width="700" height="700" viewBox="-350 -350 700 700">
            <motion.line x1="-340" y1="0" x2="340" y2="0" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
            <motion.line x1="0" y1="-340" x2="0" y2="340" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.5 }} />
          </svg>

          <motion.div className="absolute left-1/2 top-1/2 -translate-y-1/2 origin-left" style={{ width: 340, height: 2, rotate: scanAngle }}>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.4), transparent)', filter: 'blur(2px)' }} />
          </motion.div>

          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ width: 680, height: 680, background: `conic-gradient(from ${scanAngle}deg, rgba(255, 255, 255, 0.08), transparent 60deg)` }}
          />

          {threats.map((threat) => {
            const x = Math.cos((threat.angle * Math.PI) / 180) * threat.distance;
            const y = Math.sin((threat.angle * Math.PI) / 180) * threat.distance;
            return (
              <motion.div key={threat.id} className="absolute left-1/2 top-1/2" style={{ transform: `translate(${x}px, ${y}px) translate(-50%, -50%)` }}
                initial={{ scale: 0, opacity: 0 }} animate={{ scale: threat.detected ? 1 : 0, opacity: threat.detected ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <motion.div className={`absolute inset-0 ${threat.isCritical ? '-m-4' : '-m-3'} rounded-full`}
                  style={{ border: `2px solid ${threat.isCritical ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.25)'}` }}
                  animate={{ scale: [1, threat.isCritical ? 2.2 : 1.8, 1], opacity: [0.9, 0, 0.9] }}
                  transition={{ duration: threat.isCritical ? 1.2 : 2, repeat: Infinity, ease: 'easeOut' }}
                />
                <div className={`relative ${threat.isCritical ? 'w-7 h-7' : 'w-5 h-5'} rounded-full border-2 border-white/30 flex items-center justify-center`}
                  style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', boxShadow: '0 0 12px rgba(255,255,255,0.2)' }}
                >
                  <div className={`${threat.isCritical ? 'w-2.5 h-2.5' : 'w-1.5 h-1.5'} rounded-full bg-white`} />
                </div>
              </motion.div>
            );
          })}

          <motion.div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
              {/* Frosted glass circle behind shield — centered on radar origin */}
              <div className="flex items-center justify-center"
                style={{
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.12)',
                  border: '1.5px solid rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(32px)',
                  WebkitBackdropFilter: 'blur(32px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15), 0 8px 32px rgba(0,0,0,0.06)',
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.08)" />
                  <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
          </motion.div>
        </div>

        <motion.div className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="px-5 py-2.5 rounded-full border backdrop-blur-md"
            style={{ background: 'rgba(255,255,255,0.15)', borderColor: 'rgba(255,255,255,0.3)' }}
          >
            <div className="flex items-center gap-2.5">
              <motion.div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: 'white' }} />
                <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">
                  {threats.filter((t) => t.detected).length} Threats Detected
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 600">
          <defs>
            <pattern id="radarGrid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="url(#radarGrid)" />
        </svg>
      </motion.div>
    </div>
  );
}

// --- Vulnerability Scan Visual (Slide 2) — Concentric ring scan ---

function VulnerabilityGridVisual() {
  const RINGS = [
    { radius: 60, label: 'OS', delay: 0 },
    { radius: 100, label: 'Runtime', delay: 0.8 },
    { radius: 140, label: 'Libraries', delay: 1.6 },
    { radius: 180, label: 'Packages', delay: 2.4 },
    { radius: 220, label: 'Config', delay: 3.2 },
  ];

  const [scannedCount, setScannedCount] = useState(0);
  const isDone = scannedCount >= RINGS.length;

  useEffect(() => {
    let timeoutIds: ReturnType<typeof setTimeout>[] = [];
    const clearAll = () => { timeoutIds.forEach(clearTimeout); timeoutIds = []; };

    const runCycle = () => {
      clearAll();
      setScannedCount(0);
      for (let i = 0; i < RINGS.length; i++) {
        const t = setTimeout(() => setScannedCount(i + 1), 1500 + i * 900);
        timeoutIds.push(t);
      }
      const tLoop = setTimeout(runCycle, 10000);
      timeoutIds.push(tLoop);
    };

    runCycle();
    return clearAll;
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Concentric scan rings */}
      {RINGS.map((ring, i) => {
        const isScanned = i < scannedCount;
        return (
          <motion.div
            key={ring.label}
            className="absolute rounded-full"
            style={{
              width: ring.radius * 2, height: ring.radius * 2,
              border: `1.5px solid ${isScanned ? 'rgba(6, 199, 242, 0.4)' : 'rgba(255,255,255,0.12)'}`,
              transition: 'border-color 0.8s ease',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Scanning pulse on active ring */}
            {i === scannedCount - 1 && (
              <motion.div className="absolute inset-0 rounded-full"
                style={{ border: '2px solid rgba(6, 199, 242, 0.6)' }}
                animate={{ scale: [1, 1.08, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
              />
            )}
            {/* Ring label */}
            <motion.div
              className="absolute font-['Google_Sans',sans-serif] text-[10px] font-medium whitespace-nowrap"
              style={{
                top: -8, left: '50%', transform: 'translateX(-50%)',
                color: isScanned ? 'rgba(6, 199, 242, 0.9)' : 'rgba(255,255,255,0.4)',
                transition: 'color 0.8s ease',
              }}
            >
              {ring.label}
            </motion.div>
            {/* Scanned checkmark at right */}
            {isScanned && (
              <motion.div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  right: -14, top: '50%', marginTop: -14, width: 28, height: 28,
                  background: 'rgba(6, 199, 242, 0.2)',
                  border: '1.5px solid rgba(6, 199, 242, 0.5)',
                  backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M9 12l2 2 4-4" stroke="rgba(6,199,242,0.95)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </motion.div>
        );
      })}

      {/* Central shield icon */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 80, height: 80, zIndex: 25,
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.svg width="36" height="36" viewBox="0 0 24 24" fill="none"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {/* Rotating scan line */}
      <motion.div
        className="absolute"
        style={{ width: 440, height: 2, zIndex: 24, transformOrigin: 'center center' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <div style={{
          width: '50%', height: '100%', marginLeft: '50%',
          background: 'linear-gradient(90deg, rgba(6,199,242,0.6), transparent)',
        }} />
      </motion.div>

      {/* Status pill */}
      <motion.div
        className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-2.5 rounded-full border" style={{
          background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        }}>
          <div className="flex items-center gap-2.5">
            <motion.div className="w-2 h-2 rounded-full shrink-0"
              animate={{ backgroundColor: isDone ? 'rgba(6, 199, 242, 0.9)' : 'rgba(255, 255, 255, 0.6)' }}
              transition={{ duration: 0.3 }}
            />
            <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white whitespace-nowrap">
              {isDone ? '19 CVEs Eliminated — All Layers Clean' : `Scanning Layer ${scannedCount + 1} of ${RINGS.length}...`}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Award Visual (Slide 3) — Rising trophy with staggered badge reveals ---

function AwardShieldVisual() {
  const BADGES = [
    { label: 'Verified', x: -180, y: -80 },
    { label: 'Secure', x: 170, y: -60 },
    { label: 'Trusted', x: -160, y: 50 },
    { label: 'Certified', x: 190, y: 70 },
    { label: 'Compliant', x: -100, y: 140 },
    { label: 'Hardened', x: 120, y: 150 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Subtle radial glow rings */}
      {[160, 240, 320].map((size, i) => (
        <motion.div key={size} className="absolute rounded-full"
          style={{ width: size, height: size, border: '1px solid rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}

      {/* Central frosted circle with trophy */}
      <motion.div
        className="absolute flex items-center justify-center rounded-full"
        style={{
          width: 200, height: 200, zIndex: 25,
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, scale: 0.85, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Gold shimmer */}
        <motion.div className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,220,60,0.1), transparent 65%)' }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{ zIndex: 1 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M8 21h8M12 17v4M6 3H4a2 2 0 000 4c0 3 2 5 4.5 6M18 3h2a2 2 0 010 4c0 3-2 5-4.5 6M12 17c-3.5 0-6-2.5-6-6V3h12v8c0 3.5-2.5 6-6 6z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      {/* Floating badge pills — staggered reveal */}
      {BADGES.map((badge, i) => (
        <motion.div
          key={badge.label}
          className="absolute px-4 py-2 rounded-full font-['Google_Sans',sans-serif] text-[12px] font-medium text-white"
          style={{
            zIndex: 26,
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}
          initial={{ opacity: 0, scale: 0.8, x: badge.x * 0.5, y: badge.y * 0.5 }}
          animate={{ opacity: 1, scale: 1, x: badge.x, y: badge.y }}
          transition={{ duration: 0.8, delay: 0.8 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
            style={{ display: 'block' }}
          >
            {badge.label}
          </motion.span>
        </motion.div>
      ))}

      {/* Connecting lines from badges to center */}
      <svg className="absolute" style={{ width: 500, height: 400, left: '50%', top: '50%', marginLeft: -250, marginTop: -200, zIndex: 23 }}>
        {BADGES.map((badge, i) => (
          <motion.line
            key={`line-${i}`}
            x1={250} y1={200}
            x2={250 + badge.x} y2={200 + badge.y}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </svg>

      {/* Award pill */}
      <motion.div
        className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-2.5 rounded-full border" style={{
          background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        }}>
          <div className="flex items-center gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="rgba(255,255,255,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="rgba(255,255,255,0.1)" />
            </svg>
            <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">
              Cybersecurity Excellence Award 2026
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Build Pipeline Visual (Slide 4) — Fluid drop flow ---

function SourceBuildVisual() {
  const sources = [
    { name: 'ubuntu', label: 'Ubuntu 22.04' },
    { name: 'node', label: 'Node 20 LTS' },
    { name: 'python', label: 'Python 3.11' },
    { name: 'golang', label: 'Go 1.21' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Central frosted circle with CleanStart logo */}
      <motion.div
        className="absolute flex flex-col items-center justify-center rounded-full"
        style={{
          width: 180, height: 180, zIndex: 25,
          background: 'rgba(255, 255, 255, 0.15)',
          border: '1.5px solid rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(32px)', WebkitBackdropFilter: 'blur(32px)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 8px 32px rgba(0,0,0,0.08)',
        }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width: 60, height: 68 }}>
          <WhiteBgCube />
        </div>
        <span className="font-['Google_Sans',sans-serif] text-[11px] font-semibold text-white/80 mt-1">Build Engine</span>
      </motion.div>

      {/* Source circles — left side */}
      {sources.map((src, i) => {
        const yOffset = (i - 1.5) * 68;
        return (
          <motion.div
            key={src.name}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: '50%', top: '50%', marginLeft: -250, marginTop: yOffset - 24, zIndex: 26 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center rounded-full" style={{
              width: 48, height: 48,
              background: 'rgba(255,255,255,0.15)',
              border: '1.5px solid rgba(255,255,255,0.3)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-['Google_Sans',sans-serif] text-[10px] text-white/60 whitespace-nowrap">{src.label}</span>
          </motion.div>
        );
      })}

      {/* Output circles — right side (bright cyan instead of green for better contrast) */}
      {sources.map((src, i) => {
        const yOffset = (i - 1.5) * 68;
        return (
          <motion.div
            key={`out-${src.name}`}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ left: '50%', top: '50%', marginLeft: 202, marginTop: yOffset - 24, zIndex: 26 }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: i * 0.12 + 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center rounded-full" style={{
              width: 48, height: 48,
              background: 'rgba(6, 199, 242, 0.15)',
              border: '1.5px solid rgba(6, 199, 242, 0.45)',
              backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" stroke="rgba(6,199,242,0.9)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 12l2 2 4-4" stroke="rgba(6,199,242,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-['Google_Sans',sans-serif] text-[10px] text-white/60 whitespace-nowrap">cs/{src.name}</span>
          </motion.div>
        );
      })}

      {/* Fluid drop connections — left to center */}
      {sources.map((_, i) => {
        const yOffset = (i - 1.5) * 68;
        return (
          <div key={`lconn-${i}`} className="absolute" style={{ left: '50%', top: '50%', marginLeft: -190, marginTop: yOffset, zIndex: 24 }}>
            <div className="relative" style={{ width: 110, height: 1 }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(6,199,242,0.12))' }} />
              {/* Fluid elongated drop */}
              <motion.div className="absolute -top-[3px]"
                style={{
                  width: 20, height: 8, borderRadius: '40%',
                  background: 'linear-gradient(90deg, rgba(6,199,242,0.3), rgba(6,199,242,0.8))',
                  boxShadow: '0 0 12px rgba(6,199,242,0.4)',
                  filter: 'blur(0.5px)',
                }}
                animate={{ x: [-10, 100], scaleX: [0.6, 1.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1], delay: i * 0.35 }}
              />
            </div>
          </div>
        );
      })}

      {/* Fluid drop connections — center to right */}
      {sources.map((_, i) => {
        const yOffset = (i - 1.5) * 68;
        return (
          <div key={`rconn-${i}`} className="absolute" style={{ left: '50%', top: '50%', marginLeft: 80, marginTop: yOffset, zIndex: 24 }}>
            <div className="relative" style={{ width: 110, height: 1 }}>
              <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, rgba(6,199,242,0.12), rgba(255,255,255,0.06))' }} />
              {/* Fluid elongated drop */}
              <motion.div className="absolute -top-[3px]"
                style={{
                  width: 20, height: 8, borderRadius: '40%',
                  background: 'linear-gradient(90deg, rgba(6,199,242,0.8), rgba(6,199,242,0.3))',
                  boxShadow: '0 0 12px rgba(6,199,242,0.4)',
                  filter: 'blur(0.5px)',
                }}
                animate={{ x: [-10, 100], scaleX: [0.6, 1.2, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: [0.4, 0, 0.2, 1], delay: i * 0.35 + 1 }}
              />
            </div>
          </div>
        );
      })}

      {/* Status pill */}
      <motion.div
        className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
        style={{ zIndex: 30 }}
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="px-5 py-2.5 rounded-full border" style={{
          background: 'rgba(255,255,255,0.2)', borderColor: 'rgba(255,255,255,0.35)',
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        }}>
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full" style={{ background: 'rgba(6, 199, 242, 0.9)' }} />
            <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-white">
              0 CVEs in Output — Built from Source
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// --- Scroll Down Indicator ---

function ScrollDownIndicator() {
  return (
    <motion.div
      className="hidden sm:flex flex-col items-center gap-2 shrink-0 z-40"
      initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <div className="relative w-[26px] h-[40px]">
        <svg width="26" height="40" viewBox="0 0 26 40" fill="none" className="absolute inset-0">
          <rect x="1" y="1" width="24" height="38" rx="12" stroke="#056BF1" strokeWidth="2" fill="none" opacity="0.5" />
        </svg>
        <motion.div className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full" style={{ top: '10px', background: '#056BF1' }}
          animate={{ y: [0, 12, 0], opacity: [0.8, 0.3, 0.8] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <span className="font-['Google_Sans',sans-serif] text-[11px] text-[#056BF1]/60 tracking-[0.3em] uppercase">scroll</span>
    </motion.div>
  );
}

// --- Slide Navigation ---

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  background: string;
  visualType: 'orbital' | 'grid' | 'waves' | 'vulnerability-grid' | 'award' | 'source-build';
  navLabel: string;
}

const MASTER_GRADIENT = 'linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 40%, rgb(6, 199, 242) 75%, rgb(255, 255, 255) 100%)';

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: 'A Secure Foundation for Every Container You Ship',
    subtitle: 'Verified container images built from source with minimal components and near-zero vulnerabilities.',
    ctaText: 'Explore Images',
    background: MASTER_GRADIENT,
    visualType: 'orbital',
    navLabel: 'Secure Foundation',
  },
  {
    id: 2,
    title: '95% of Container Images Contain Critical Vulnerabilities',
    subtitle: 'Security risks often start in the software supply chain. CleanStart helps eliminate them before production.',
    ctaText: 'Learn How',
    background: MASTER_GRADIENT,
    visualType: 'vulnerability-grid',
    navLabel: 'Container Security',
  },
  {
    id: 3,
    title: 'Gold Award Winner — Cybersecurity Excellence Award 2026',
    subtitle: 'Recognized for innovation in secure software supply chain and hardened container images.',
    ctaText: 'Read More',
    background: MASTER_GRADIENT,
    visualType: 'award',
    navLabel: 'Award Winner',
  },
  {
    id: 4,
    title: 'Zero-Vulnerability Images, Built from Source',
    subtitle: 'Minimal components, reproducible builds, and verified source packages for a trusted software foundation.',
    ctaText: 'See Platform',
    background: MASTER_GRADIENT,
    visualType: 'source-build',
    navLabel: 'Zero-Vulnerability',
  },
];

function SlideNavigation({ totalSlides, currentSlide, isAutoPlaying, onSlideChange, onPlayPauseToggle }: {
  totalSlides: number; currentSlide: number; isAutoPlaying: boolean;
  onSlideChange: (index: number) => void; onPlayPauseToggle: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) { setProgress(0); return; }
    setProgress(0);
    const startTime = Date.now();
    const duration = 5000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);
      if (newProgress >= 100) clearInterval(interval);
    }, 16);
    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <motion.div
      className="hidden md:absolute md:right-[50px] md:top-1/2 md:-translate-y-1/2 z-30 md:flex flex-col items-center gap-6"
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <button key={index} onClick={() => onSlideChange(index)} className="group cursor-pointer relative" aria-label={`Go to slide ${index + 1}`}>
              <div className="relative flex items-center justify-center">
                {isActive && isAutoPlaying && (
                  <svg className="absolute inset-0 -m-2 w-9 h-9" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.5" />
                    <motion.circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round"
                      strokeDasharray="100.5" strokeDashoffset={100.5 - (100.5 * progress) / 100}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }} opacity="0.7"
                    />
                  </svg>
                )}
                <motion.div className="absolute inset-0 -m-1.5 w-8 h-8 rounded-full" initial={false}
                  animate={{ opacity: isActive ? 0.5 : 0, scale: isActive ? 1.3 : 1 }}
                  whileHover={{ opacity: 0.3, scale: 1.3 }}
                  style={{ background: 'radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent 70%)' }}
                />
                <motion.div className="relative w-5 h-5 rounded-full transition-all duration-300" initial={false}
                  animate={{ scale: isActive ? 1 : 0.6, backgroundColor: isActive ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.3)' }}
                  whileHover={{ scale: isActive ? 1.1 : 0.75, backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.5)' }}
                >
                  {isActive && (
                    <motion.div className="absolute inset-0 rounded-full" style={{ background: 'rgba(255, 255, 255, 0.8)' }}
                      animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                </motion.div>
                <motion.div
                  className="absolute right-full mr-4 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-[11px] text-white font-['Google_Sans',sans-serif] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={false}
                >
                  {HERO_SLIDES[index].navLabel}
                </motion.div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="w-6 h-[1px]" style={{ background: 'rgba(255, 255, 255, 0.3)' }} />
      <motion.button onClick={onPlayPauseToggle} className="group cursor-pointer relative" whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <rect x="0" y="0" width="3" height="12" rx="1" fill="white" opacity="0.6" className="group-hover:opacity-90 transition-opacity" />
            <rect x="7" y="0" width="3" height="12" rx="1" fill="white" opacity="0.6" className="group-hover:opacity-90 transition-opacity" />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M1 0.5L9.5 6L1 11.5V0.5Z" fill="white" opacity="0.6" className="group-hover:opacity-90 transition-opacity" />
          </svg>
        )}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-[11px] text-white font-['Google_Sans',sans-serif] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isAutoPlaying ? 'Pause' : 'Play'}
        </div>
      </motion.button>
    </motion.div>
  );
}

// --- Main Hero Section ---

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const togglePlayPause = () => setIsAutoPlaying((prev) => !prev);
  const activeSlide = HERO_SLIDES[currentSlide];

  return (
    <div className="relative h-screen flex flex-col bg-white overflow-hidden" data-scroll-section style={{ scrollSnapAlign: 'start' }}>
      {/* Gradient background */}
      <div className="absolute inset-0" style={{ backgroundImage: activeSlide.background }} />

      {/* Frosted square flow — full viewport width, only on orbital slide */}
      {activeSlide.visualType === 'orbital' && <FrostedSquareFlow />}

      {/* Main content — no Navbar here, it's in the Next.js layout */}
      <div className="relative flex-1 flex flex-col items-center justify-center pt-[90px] px-4 sm:px-6 md:px-8" style={{ gap: '16px' }}>
        {/* Title & Subtitle — z-40 to stay above hero animation and below navbar z-100 */}
        <motion.div
          className="text-center z-40 w-full max-w-4xl shrink-0 flex flex-col items-center justify-end"
          style={{ minHeight: '120px' }}
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="font-['Google_Sans',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] font-normal text-white leading-[1.2] tracking-[-0.02em] px-4">
            {activeSlide.title}
          </h1>
          <p className="font-['Google_Sans',sans-serif] text-[14px] sm:text-[15px] md:text-[16px] text-white/70 leading-[1.6] px-4 mt-[10px]">
            {activeSlide.subtitle}
          </p>
        </motion.div>

        {/* Visualization — equal fixed size, clipped to prevent overlap */}
        <div className="relative w-full max-w-[940px] aspect-square shrink-0" style={{ maxHeight: '530px', zIndex: 23 }}>
          <div className="absolute inset-0 flex items-center justify-center" style={{ transform: 'scale(0.78)', transformOrigin: 'center center' }}>
            {activeSlide.visualType === 'orbital' && <OrbitalVerification />}
            {activeSlide.visualType === 'waves' && <WavesVisual />}
            {activeSlide.visualType === 'vulnerability-grid' && <VulnerabilityGridVisual />}
            {activeSlide.visualType === 'award' && <AwardShieldVisual />}
            {activeSlide.visualType === 'source-build' && <SourceBuildVisual />}
          </div>
        </div>

        {/* CTA — below animation */}
        <motion.div className="z-40 shrink-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}>
          <CallToActionButton label={activeSlide.ctaText} variant="light" size="md" />
        </motion.div>

        {/* Scroll Down Indicator — below CTA, brand blue */}
        <ScrollDownIndicator />
      </div>

      {/* Slide Navigation */}
      <SlideNavigation
        totalSlides={HERO_SLIDES.length}
        currentSlide={currentSlide}
        isAutoPlaying={isAutoPlaying}
        onSlideChange={goToSlide}
        onPlayPauseToggle={togglePlayPause}
      />
    </div>
  );
}
