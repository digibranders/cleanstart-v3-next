"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// Placeholder image paths — replace with actual assets in /public/images/hero/
const heroEventImage = "/images/hero/kubecon-event.png";

// Inline SVG path data (was imported from svg-0tcrrv7e40)
const ARROW_PATH =
  "M10.808 3.353L10.808 16.167L15.275 11.697L16.688 13.112L9.98 19.82L3.272 13.112L4.687 11.697L9.158 16.167L9.158 3.353L10.808 3.353Z";

// --- CleanStart Logo SVG (was Group1321323012) ---
function CleanStartLogo() {
  return (
    <div className="relative size-full">
      <svg
        className="absolute block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 22.7573 26.0001"
      >
        {/* TODO: Add actual CleanStart logo path data from design export */}
        <rect width="22.7573" height="26.0001" rx="4" fill="#2CC1EB" />
        <path
          d="M11.38 8L6 13.5L8.5 16L11.38 13L14.26 16L16.76 13.5L11.38 8Z"
          fill="white"
        />
      </svg>
    </div>
  );
}

// --- Orbital Verification Rings ---

interface VerificationRing {
  id: number;
  label: string;
  radius: number;
  duration: number;
  markerCount: number;
  color: string;
  opacity: number;
}

const RINGS: VerificationRing[] = [
  {
    id: 1,
    label: "Source",
    radius: 160,
    duration: 25,
    markerCount: 8,
    color: "white",
    opacity: 0.3,
  },
  {
    id: 2,
    label: "Build",
    radius: 220,
    duration: 30,
    markerCount: 12,
    color: "white",
    opacity: 0.25,
  },
  {
    id: 3,
    label: "Runtime",
    radius: 280,
    duration: 35,
    markerCount: 16,
    color: "white",
    opacity: 0.2,
  },
  {
    id: 4,
    label: "Deploy",
    radius: 340,
    duration: 40,
    markerCount: 20,
    color: "white",
    opacity: 0.15,
  },
];

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

function AntigravityParticles({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const rotationRef = useRef(0);

  useEffect(() => {
    const particleCount = 80;
    const newParticles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 80 + Math.random() * 60;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      newParticles.push({
        id: i,
        x,
        y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 2 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.4,
        baseX: x,
        baseY: y,
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
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  useEffect(() => {
    const animate = () => {
      rotationRef.current += 0.004;
      setParticles((prevParticles) =>
        prevParticles.map((particle, index) => {
          const originalAngle =
            (Math.PI * 2 * index) / prevParticles.length;
          const originalRadius = 80 + ((particle.size - 2) / 3) * 60;
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

          const maxDist = 150;
          const distFromCenterNew = Math.sqrt(newX * newX + newY * newY);
          if (distFromCenterNew > maxDist) {
            const angle = Math.atan2(newY, newX);
            newX = Math.cos(angle) * maxDist;
            newY = Math.sin(angle) * maxDist;
            newVx *= -0.3;
            newVy *= -0.3;
          }

          return {
            ...particle,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            baseX: newBaseX,
            baseY: newBaseY,
          };
        })
      );
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [mousePos]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
            background: "white",
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 255, 255, ${particle.opacity * 0.6})`,
          }}
        />
      ))}
    </div>
  );
}

function VerificationMarker({
  verified,
  delay,
}: {
  angle: number;
  verified: boolean;
  delay: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{ left: "50%", top: "50%", x: "-50%", y: "-50%" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: verified ? 1 : 0.6,
        opacity: verified ? 1 : 0.3,
      }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{
          background: verified ? "white" : "rgba(255, 255, 255, 0.3)",
          boxShadow: verified
            ? "0 0 12px rgba(255, 255, 255, 0.8)"
            : "none",
        }}
      />
    </motion.div>
  );
}

function OrbitalRing({
  ring,
  isActive,
  isCompleted,
}: {
  ring: VerificationRing;
  isActive: boolean;
  isVerifying: boolean;
  isCompleted: boolean;
}) {
  const [verifiedMarkers, setVerifiedMarkers] = useState<number[]>([]);

  useEffect(() => {
    if (!isActive) {
      setVerifiedMarkers([]);
      return;
    }
    const timeouts: NodeJS.Timeout[] = [];
    for (let i = 0; i < ring.markerCount; i++) {
      const timeout = setTimeout(() => {
        setVerifiedMarkers((prev) => [...prev, i]);
      }, i * 70);
      timeouts.push(timeout);
    }
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [isActive, ring.markerCount]);

  const markers = Array.from({ length: ring.markerCount }, (_, i) => ({
    angle: (360 / ring.markerCount) * i,
    verified: verifiedMarkers.includes(i),
  }));

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: ring.radius * 2, height: ring.radius * 2 }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isCompleted ? 0 : isActive ? 1 : 0,
        rotate: 360,
      }}
      transition={{
        opacity: { duration: 1.5, ease: [0.4, 0, 0.2, 1] },
        rotate: {
          duration: ring.duration,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: `rgba(255, 255, 255, ${ring.opacity})`,
          borderWidth: "1.5px",
        }}
      />
      {markers.map((marker, idx) => {
        const x =
          Math.cos((marker.angle * Math.PI) / 180) * ring.radius;
        const y =
          Math.sin((marker.angle * Math.PI) / 180) * ring.radius;
        return (
          <div
            key={idx}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <VerificationMarker
              angle={marker.angle}
              verified={marker.verified}
              delay={idx * 0.05}
            />
          </div>
        );
      })}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8"
        style={{ rotate: -360 }}
        animate={{ rotate: [0, -360] }}
        transition={{
          duration: ring.duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="px-3 py-1.5 rounded-full backdrop-blur-sm border"
          style={{
            background: isActive
              ? "rgba(255, 255, 255, 0.15)"
              : "rgba(255, 255, 255, 0.08)",
            borderColor: isActive
              ? "rgba(255, 255, 255, 0.3)"
              : "rgba(255, 255, 255, 0.15)",
          }}
        >
          <span
            className="font-['Google_Sans',sans-serif] text-[11px] font-medium"
            style={{
              color: isActive ? "white" : "rgba(255, 255, 255, 0.6)",
            }}
          >
            {ring.label}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OrbitalVerification() {
  const [activeRingIndex, setActiveRingIndex] = useState(0);
  const [completedRings, setCompletedRings] = useState<Set<number>>(
    new Set()
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;
    const advanceRing = () => {
      const ring = RINGS[currentIndex];
      setActiveRingIndex(currentIndex);
      const verificationDuration = ring.markerCount * 120 + 400;
      const holdDuration = 800;
      const fadeStartDelay = verificationDuration + holdDuration;

      setTimeout(() => {
        currentIndex = (currentIndex + 1) % RINGS.length;
        if (currentIndex === 0) setCompletedRings(new Set());
        advanceRing();
      }, fadeStartDelay - 1000);

      setTimeout(() => {
        setCompletedRings(
          (prev) =>
            new Set([
              ...prev,
              currentIndex === 0
                ? RINGS.length - 1
                : currentIndex - 1,
            ])
        );
      }, fadeStartDelay + 1500);
    };

    const startTimeout = setTimeout(advanceRing, 500);
    return () => clearTimeout(startTimeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(6, 107, 241, 0.04), transparent 60%)",
        }}
        animate={{
          opacity: completedRings.size === RINGS.length ? 1 : 0.5,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      />
      <AntigravityParticles containerRef={containerRef} />
      <div className="relative">
        {RINGS.map((ring, index) => (
          <OrbitalRing
            key={ring.id}
            ring={ring}
            isActive={
              index === activeRingIndex || completedRings.has(index)
            }
            isVerifying={index === activeRingIndex}
            isCompleted={completedRings.has(index)}
          />
        ))}
      </div>
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ width: "140px", height: "161px" }}
        animate={{
          scale: completedRings.size === RINGS.length ? 1.03 : 1,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <CleanStartLogo />
        {completedRings.size === RINGS.length && (
          <motion.div
            className="absolute -inset-12 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 107, 241, 0.15), transparent 70%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          />
        )}
      </motion.div>
      {completedRings.size === RINGS.length && (
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <div
            className="px-5 py-2.5 rounded-full border"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(6, 107, 241, 0.2)",
              boxShadow: "0 4px 24px rgba(6, 107, 241, 0.15)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#056bf1"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-[#056bf1]">
                All Layers Verified
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// --- SBOM Dependency Network Visual ---

function GridPatternVisual() {
  const [nodes, setNodes] = useState<
    Array<{ id: number; x: number; y: number; delay: number; type: string }>
  >([]);

  useEffect(() => {
    const newNodes = [];
    const centerX = 0;
    const centerY = 0;
    newNodes.push({ id: 0, x: centerX, y: centerY, delay: 0, type: "main" });
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 * i) / 6;
      const radius = 120;
      newNodes.push({
        id: i + 1,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        delay: i * 0.1,
        type: "primary",
      });
    }
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + 0.26;
      const radius = 220;
      newNodes.push({
        id: i + 7,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        delay: 0.6 + i * 0.05,
        type: "secondary",
      });
    }
    setNodes(newNodes);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width="700"
          height="600"
          viewBox="-350 -300 700 600"
          style={{ overflow: "visible" }}
        >
          <g>
            {nodes
              .filter((n) => n.type === "primary")
              .map((node, i) => (
                <motion.line
                  key={`line-main-${i}`}
                  x1="0"
                  y1="0"
                  x2={node.x}
                  y2={node.y}
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: node.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
            {nodes
              .filter((n) => n.type === "secondary")
              .map((node, i) => {
                const parentIndex = Math.floor(i / 2) % 6;
                const parent = nodes.filter((n) => n.type === "primary")[
                  parentIndex
                ];
                if (!parent) return null;
                return (
                  <motion.line
                    key={`line-sub-${i}`}
                    x1={parent.x}
                    y1={parent.y}
                    x2={node.x}
                    y2={node.y}
                    stroke="rgba(255, 255, 255, 0.2)"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: node.delay + 0.2,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            {nodes
              .filter((n) => n.type === "primary")
              .map((node, i) => (
                <motion.circle
                  key={`pulse-${i}`}
                  r="3"
                  fill="white"
                  initial={{ opacity: 0 }}
                  animate={{
                    cx: [0, node.x],
                    cy: [0, node.y],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: node.delay + 1,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </g>
        </svg>
        <div className="absolute left-1/2 top-1/2">
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: node.delay,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              {node.type === "main" ? (
                <motion.div
                  className="relative"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-20 h-20 rounded-full border-[3px] border-white bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 2L2 7L12 12L22 7L12 2Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="rgba(255,255,255,0.3)"
                      />
                      <path
                        d="M2 17L12 22L22 17"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 12L12 17L22 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/20 blur-xl" />
                </motion.div>
              ) : (
                <motion.div
                  className="relative"
                  animate={{ y: [0, -5, 0] }}
                  transition={{
                    duration: 3 + node.id * 0.1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.delay,
                  }}
                >
                  <div
                    className={`${node.type === "primary" ? "w-12 h-12" : "w-8 h-8"} rounded-full border-2 border-white/60 bg-white/15 backdrop-blur-sm flex items-center justify-center`}
                  >
                    {node.type === "primary" && (
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="white"
                          strokeWidth="2"
                          fill="rgba(255,255,255,0.2)"
                        />
                        <rect
                          x="14"
                          y="3"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="white"
                          strokeWidth="2"
                          fill="rgba(255,255,255,0.2)"
                        />
                        <rect
                          x="3"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="white"
                          strokeWidth="2"
                          fill="rgba(255,255,255,0.2)"
                        />
                        <rect
                          x="14"
                          y="14"
                          width="7"
                          height="7"
                          rx="1"
                          stroke="white"
                          strokeWidth="2"
                          fill="rgba(255,255,255,0.2)"
                        />
                      </svg>
                    )}
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ opacity: 0, scale: 1 }}
                    animate={{
                      opacity: [0, 0.8, 0],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 2,
                      delay: node.delay + 2,
                      repeat: Infinity,
                      repeatDelay: 4,
                      ease: "easeOut",
                    }}
                  />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 20;
          const radius = 160 + Math.random() * 100;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white"
              style={{ x, y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 3,
                delay: 1 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
            />
          );
        })}
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        />
      </motion.div>
    </div>
  );
}

// --- CleanSight Radar Scanning Visual ---

function WavesVisual() {
  const [threats, setThreats] = useState<
    Array<{
      id: number;
      angle: number;
      distance: number;
      detected: boolean;
      isCritical: boolean;
    }>
  >([]);
  const [scanAngle, setScanAngle] = useState(0);

  useEffect(() => {
    const newThreats = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: Math.random() * 360,
      distance: 100 + Math.random() * 200,
      detected: false,
      isCritical: Math.random() > 0.7,
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
          if (normalizedDiff < 15 && !threat.detected)
            return { ...threat, detected: true };
          return threat;
        })
      );
    }, 30);
    return () => clearInterval(interval);
  }, [scanAngle]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="relative w-full h-full flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      >
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[100, 160, 220, 280, 340].map((radius, i) => (
            <motion.div
              key={radius}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              style={{ width: radius * 2, height: radius * 2 }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-white"
                initial={{ opacity: 0, scale: 1 }}
                animate={{
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  delay: i * 0.3,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          ))}

          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="700"
            height="700"
            viewBox="-350 -350 700 700"
          >
            <motion.line
              x1="-340"
              y1="0"
              x2="340"
              y2="0"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.line
              x1="0"
              y1="-340"
              x2="0"
              y2="340"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>

          <motion.div
            className="absolute left-1/2 top-1/2 origin-left"
            style={{ width: 340, height: 2, rotate: scanAngle }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255, 255, 255, 0.6), transparent)",
                filter: "blur(2px)",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 680,
              height: 680,
              background: `conic-gradient(from ${scanAngle}deg, rgba(255, 255, 255, 0.08), transparent 60deg)`,
            }}
          />

          {threats.map((threat) => {
            const x =
              Math.cos((threat.angle * Math.PI) / 180) * threat.distance;
            const y =
              Math.sin((threat.angle * Math.PI) / 180) * threat.distance;
            return (
              <motion.div
                key={threat.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: threat.detected ? 1 : 0,
                  opacity: threat.detected ? 1 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <motion.div
                  className={`absolute inset-0 ${threat.isCritical ? "-m-4" : "-m-3"} rounded-full border-2 ${threat.isCritical ? "border-red-400" : "border-red-400/60"}`}
                  animate={{
                    scale: [1, threat.isCritical ? 2.2 : 1.8, 1],
                    opacity: [0.9, 0, 0.9],
                  }}
                  transition={{
                    duration: threat.isCritical ? 1.2 : 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <div
                  className={`relative ${threat.isCritical ? "w-7 h-7" : "w-5 h-5"} rounded-full ${threat.isCritical ? "bg-red-500" : "bg-red-500/70"} border-2 border-white flex items-center justify-center`}
                >
                  <div
                    className={`${threat.isCritical ? "w-2.5 h-2.5" : "w-1.5 h-1.5"} rounded-full bg-white`}
                  />
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-[3px] border-white bg-white/20 backdrop-blur-md flex items-center justify-center">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="rgba(255,255,255,0.3)"
                  />
                  <path
                    d="M9 12L11 14L15 10"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/20 blur-xl" />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          <div
            className="px-5 py-2.5 rounded-full border backdrop-blur-md"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              borderColor: "rgba(6, 107, 241, 0.2)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <motion.div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="font-['Google_Sans',sans-serif] text-[13px] font-semibold text-[#056bf1]">
                  {threats.filter((t) => t.detected).length} Threats
                  Detected
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <svg
          className="absolute inset-0 w-full h-full opacity-10"
          viewBox="0 0 1000 600"
        >
          <defs>
            <pattern
              id="radarGrid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="1000" height="600" fill="url(#radarGrid)" />
        </svg>
      </motion.div>
    </div>
  );
}

// --- Scroll Down Indicator ---

function ScrollDownIndicator() {
  return (
    <motion.div
      className="hidden sm:flex absolute bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      <div className="relative w-[26px] h-[40px]">
        <svg
          width="26"
          height="40"
          viewBox="0 0 26 40"
          fill="none"
          className="absolute inset-0"
        >
          <rect
            x="1"
            y="1"
            width="24"
            height="38"
            rx="12"
            stroke="white"
            strokeWidth="2"
            fill="none"
            opacity="0.4"
          />
        </svg>
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
          style={{ top: "10px" }}
          animate={{ y: [0, 12, 0], opacity: [0.8, 0.3, 0.8] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/40 tracking-[0.3em] uppercase">
        scroll
      </span>
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
  visualType: "orbital" | "grid" | "waves" | "event";
  eventImage?: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "KubeCon India 2026",
    subtitle:
      "Meet the CleanStart team in Mumbai. Discover how we're securing cloud-native infrastructure at scale.",
    ctaText: "Register Now",
    background:
      "linear-gradient(135deg, rgb(3, 22, 48) 0%, rgb(20, 88, 156) 40%, rgb(6, 107, 241) 70%, rgb(6, 199, 242) 100%)",
    visualType: "event",
    eventImage: heroEventImage,
  },
  {
    id: 2,
    title: "Complete Transparency. Every Component.",
    subtitle:
      "Software Bill of Materials for Total Supply Chain Visibility",
    ctaText: "Explore SBOM",
    background:
      "linear-gradient(135deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 50%, rgb(6, 199, 242) 100%)",
    visualType: "grid",
  },
  {
    id: 3,
    title: "Real-Time Insights. Continuous Protection.",
    subtitle: "Advanced Security Monitoring and Threat Detection",
    ctaText: "Try CleanSight",
    background:
      "linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 60%, rgb(6, 199, 242) 100%)",
    visualType: "waves",
  },
];

function SlideNavigation({
  totalSlides,
  currentSlide,
  isAutoPlaying,
  onSlideChange,
  onPlayPauseToggle,
}: {
  totalSlides: number;
  currentSlide: number;
  isAutoPlaying: boolean;
  onSlideChange: (index: number) => void;
  onPlayPauseToggle: () => void;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isAutoPlaying) {
      setProgress(0);
      return;
    }
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
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      <div className="flex flex-col items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => {
          const isActive = currentSlide === index;
          return (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className="group cursor-pointer relative"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div className="relative flex items-center justify-center">
                {isActive && isAutoPlaying && (
                  <svg
                    className="absolute inset-0 -m-2 w-9 h-9"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.15)"
                      strokeWidth="1.5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="16"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeDasharray="100.5"
                      strokeDashoffset={
                        100.5 - (100.5 * progress) / 100
                      }
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                      }}
                      opacity="0.7"
                    />
                  </svg>
                )}
                <motion.div
                  className="absolute inset-0 -m-1.5 w-8 h-8 rounded-full"
                  initial={false}
                  animate={{
                    opacity: isActive ? 0.5 : 0,
                    scale: isActive ? 1.3 : 1,
                  }}
                  whileHover={{ opacity: 0.3, scale: 1.3 }}
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255, 255, 255, 0.6), transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
                <motion.div
                  className="relative w-5 h-5 rounded-full transition-all duration-300"
                  initial={false}
                  animate={{
                    scale: isActive ? 1 : 0.6,
                    backgroundColor: isActive
                      ? "rgb(255, 255, 255)"
                      : "rgba(255, 255, 255, 0.3)",
                  }}
                  whileHover={{
                    scale: isActive ? 1.1 : 0.75,
                    backgroundColor: isActive
                      ? "rgb(255, 255, 255)"
                      : "rgba(255, 255, 255, 0.5)",
                  }}
                  style={{
                    boxShadow: isActive
                      ? "0 0 20px rgba(255, 255, 255, 0.7)"
                      : "none",
                  }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-white"
                      animate={{
                        scale: [1, 1.8],
                        opacity: [0.7, 0],
                      }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </motion.div>
                <motion.div
                  className="absolute right-full mr-4 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-[11px] text-white font-['Google_Sans',sans-serif] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  initial={false}
                >
                  {HERO_SLIDES[index].title.split(".")[0]}
                </motion.div>
              </div>
            </button>
          );
        })}
      </div>
      <div className="w-6 h-[1px] bg-white/20" />
      <motion.button
        onClick={onPlayPauseToggle}
        className="group cursor-pointer relative"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
      >
        {isAutoPlaying ? (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <rect
              x="0"
              y="0"
              width="3"
              height="12"
              rx="1"
              fill="white"
              opacity="0.8"
              className="group-hover:opacity-100 transition-opacity"
            />
            <rect
              x="7"
              y="0"
              width="3"
              height="12"
              rx="1"
              fill="white"
              opacity="0.8"
              className="group-hover:opacity-100 transition-opacity"
            />
          </svg>
        ) : (
          <svg width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path
              d="M1 0.5L9.5 6L1 11.5V0.5Z"
              fill="white"
              opacity="0.8"
              className="group-hover:opacity-100 transition-opacity"
            />
          </svg>
        )}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-[11px] text-white font-['Google_Sans',sans-serif] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isAutoPlaying ? "Pause" : "Play"}
        </div>
      </motion.button>
    </motion.div>
  );
}

// --- Main Hero Section ---

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [heroCtaMousePos, setHeroCtaMousePos] = useState({ x: 0, y: 0 });
  const [isHeroCtaHovered, setIsHeroCtaHovered] = useState(false);
  const [isHeroCtaClicked, setIsHeroCtaClicked] = useState(false);
  const heroCtaRef = useRef<HTMLButtonElement>(null);

  const handleHeroCtaMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!heroCtaRef.current) return;
    const rect = heroCtaRef.current.getBoundingClientRect();
    setHeroCtaMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleHeroCtaClick = () => {
    setIsHeroCtaClicked(true);
    setTimeout(() => setIsHeroCtaClicked(false), 300);
  };

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
    <div
      className="relative h-screen flex flex-col bg-white overflow-hidden"
      data-scroll-section
      style={{ scrollSnapAlign: "start" }}
    >
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{ backgroundImage: activeSlide.background }}
      />

      {/* Event Image Background - Full Coverage */}
      {activeSlide.visualType === "event" && activeSlide.eventImage && (
        <motion.div
          className="absolute inset-0 z-[1]"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeSlide.eventImage}
            alt="KubeCon + CloudNativeCon India 2026"
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50" />
        </motion.div>
      )}

      {/* Navbar is rendered by layout — not included here */}

      {/* Main content */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-28 sm:pb-32 md:pb-36">
        {/* Title & Subtitle */}
        <motion.div
          className="text-center z-10 w-full max-w-4xl"
          key={`text-${currentSlide}`}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <h1 className="font-['Google_Sans',sans-serif] text-[40px] md:text-[56px] lg:text-[64px] font-normal text-white leading-[1.2] tracking-[-0.02em] mb-2 sm:mb-3 px-4">
            {activeSlide.title}
          </h1>
          <p className="font-['Google_Sans',sans-serif] text-[16px] md:text-[18px] text-white/80 leading-[1.6] px-4">
            {activeSlide.subtitle}
          </p>
        </motion.div>

        {/* Visualization */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] max-w-[800px]">
          {activeSlide.visualType === "orbital" && (
            <OrbitalVerification key={`orbital-${currentSlide}`} />
          )}
          {activeSlide.visualType === "grid" && (
            <GridPatternVisual key={`grid-${currentSlide}`} />
          )}
          {activeSlide.visualType === "waves" && (
            <WavesVisual key={`waves-${currentSlide}`} />
          )}
          {/* Event slide uses full background image - no visualization needed */}
        </div>

        {/* CTA */}
        <motion.div
          className="z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.button
            ref={heroCtaRef}
            onMouseMove={handleHeroCtaMouseMove}
            onMouseEnter={() => setIsHeroCtaHovered(true)}
            onMouseLeave={() => setIsHeroCtaHovered(false)}
            onClick={handleHeroCtaClick}
            className="flex items-center gap-2 sm:gap-2.5 pl-4 sm:pl-5 pr-[5px] sm:pr-[6px] py-[5px] sm:py-[6px] rounded-full cursor-pointer group relative overflow-hidden transition-transform"
            animate={{
              backgroundColor: isHeroCtaClicked
                ? "#056bf1"
                : isHeroCtaHovered
                  ? "#8B5CF6"
                  : "#056bf1",
            }}
            transition={{ duration: 0.15 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle 100px at ${heroCtaMousePos.x}px ${heroCtaMousePos.y}px, rgba(255, 255, 255, 0.25), transparent)`,
              }}
            />
            <span className="font-['Google_Sans',sans-serif] font-semibold text-white text-[14px] sm:text-[15px] relative z-10">
              {activeSlide.ctaText}
            </span>
            <motion.div
              className="bg-white flex items-center justify-center rounded-full size-[28px] sm:size-[32px] shrink-0 relative z-10"
              animate={{
                rotate: isHeroCtaHovered ? 45 : 0,
                scale: isHeroCtaHovered ? 1.1 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                className="sm:w-5 sm:h-5"
              >
                <motion.path
                  d={ARROW_PATH}
                  animate={{
                    fill: isHeroCtaClicked
                      ? "#056bf1"
                      : isHeroCtaHovered
                        ? "#8B5CF6"
                        : "#056bf1",
                  }}
                  transition={{ duration: 0.15 }}
                />
              </svg>
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Slide Navigation */}
      <SlideNavigation
        totalSlides={HERO_SLIDES.length}
        currentSlide={currentSlide}
        isAutoPlaying={isAutoPlaying}
        onSlideChange={goToSlide}
        onPlayPauseToggle={togglePlayPause}
      />

      {/* Scroll Down Indicator */}
      <ScrollDownIndicator />
    </div>
  );
}
