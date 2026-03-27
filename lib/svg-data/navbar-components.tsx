import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import Group from "./Group1321323012";
import svgPaths from "./svg-0tcrrv7e40";

// --- Navbar Components ---
function NavLogo() {
  return (
    <div className="relative w-[126px] h-[26px] shrink-0">
      <div className="absolute inset-0">
        <svg
          className="absolute"
          style={{
            left: "8.34%",
            top: "25.9%",
            width: "12.61px",
            height: "19.27px",
          }}
          fill="none"
          viewBox="0 0 12.6069 19.2667"
        >
          <path d={svgPaths.p33248900} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "0.29%",
            top: "0",
            width: "22.71px",
            height: "20.76px",
          }}
          fill="none"
          viewBox="0 0 22.7101 20.7634"
        >
          <path d={svgPaths.p164f400} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "23.22%",
            top: "23.84%",
            width: "12.31px",
            height: "13.81px",
          }}
          fill="none"
          viewBox="0 0 12.3063 13.8115"
        >
          <path d={svgPaths.p29578200} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "34.74%",
            top: "23.84%",
            width: "2.22px",
            height: "13.53px",
          }}
          fill="none"
          viewBox="0 0 2.21782 13.534"
        >
          <path d={svgPaths.p25a63f40} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "38.25%",
            top: "36.59%",
            width: "9.60px",
            height: "10.50px",
          }}
          fill="none"
          viewBox="0 0 9.59681 10.4963"
        >
          <path d={svgPaths.pfbeab80} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "46.9%",
            top: "36.59%",
            width: "8.76px",
            height: "10.50px",
          }}
          fill="none"
          viewBox="0 0 8.76406 10.4963"
        >
          <path d={svgPaths.p157f1500} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "55.74%",
            top: "36.55%",
            width: "9.14px",
            height: "10.23px",
          }}
          fill="none"
          viewBox="0 0 9.14457 10.2272"
        >
          <path d={svgPaths.p2d484200} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "64.44%",
            top: "23.92%",
            width: "10.69px",
            height: "13.79px",
          }}
          fill="none"
          viewBox="0 0 10.6897 13.7927"
        >
          <path d={svgPaths.p27204200} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "73.63%",
            top: "27.03%",
            width: "6.94px",
            height: "12.87px",
          }}
          fill="none"
          viewBox="0 0 6.93515 12.87"
        >
          <path d={svgPaths.p2ad29300} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "80.4%",
            top: "36.59%",
            width: "8.76px",
            height: "10.50px",
          }}
          fill="none"
          viewBox="0 0 8.76196 10.4963"
        >
          <path d={svgPaths.p234fdc80} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "89.25%",
            top: "37.46%",
            width: "5.60px",
            height: "9.99px",
          }}
          fill="none"
          viewBox="0 0 5.60026 9.99267"
        >
          <path d={svgPaths.p3ffe2d00} fill="white" />
        </svg>
        <svg
          className="absolute"
          style={{
            left: "94.21%",
            top: "27.02%",
            width: "6.94px",
            height: "12.87px",
          }}
          fill="none"
          viewBox="0 0 6.93515 12.87"
        >
          <path d={svgPaths.p370d8700} fill="white" />
        </svg>
      </div>
    </div>
  );
}

function ArrowIcon() {
  return (
    <div className="bg-[#056bf1] flex items-center justify-center rounded-full size-[28px] shrink-0">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d={svgPaths.p2bb94200} fill="white" />
      </svg>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 13 13"
      fill="none"
      className="shrink-0"
    >
      <path d={svgPaths.p8edd980} fill="white" />
    </svg>
  );
}

function NavDropdownItem({ label }: { label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-3.5 py-[7px] rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[13px] text-white tracking-[-0.3px] hover:bg-white/10 transition-colors cursor-pointer">
      {label}
      <PlusIcon />
    </button>
  );
}

function NavLinkItem({ label }: { label: string }) {
  return (
    <button className="px-3.5 py-[7px] rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[13px] text-white tracking-[-0.3px] hover:bg-white/10 transition-colors cursor-pointer">
      {label}
    </button>
  );
}

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [isNavButtonHovered, setIsNavButtonHovered] =
    useState(false);
  const [isNavButtonClicked, setIsNavButtonClicked] =
    useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleNavButtonClick = () => {
    setIsNavButtonClicked(true);
    setTimeout(() => setIsNavButtonClicked(false), 300);
  };

  return (
    <motion.nav
      className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-[50px] py-4 lg:py-[25px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="relative z-50">
          <NavLogo />
        </div>

        {/* Desktop Navigation - centered */}
        <div className="hidden lg:flex items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <NavDropdownItem label="Products" />
          <NavDropdownItem label="Solutions" />
          <NavDropdownItem label="Resources" />
          <NavDropdownItem label="Company" />
          <NavLinkItem label="Pricing" />
          <NavLinkItem label="Partners" />
        </div>

        {/* Desktop CTA Button */}
        <motion.button
          ref={buttonRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsNavButtonHovered(true)}
          onMouseLeave={() => setIsNavButtonHovered(false)}
          onClick={handleNavButtonClick}
          className="hidden sm:flex items-center gap-2 sm:gap-2.5 pl-3 sm:pl-4 pr-[4px] sm:pr-[5px] py-[4px] sm:py-[5px] rounded-full transition-all cursor-pointer relative overflow-hidden group"
          animate={{
            backgroundColor: isNavButtonClicked
              ? "#056bf1"
              : isNavButtonHovered
                ? "#8B5CF6"
                : "#056bf1",
          }}
          transition={{ duration: 0.15 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Magnetic spotlight that follows cursor */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 100px at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.25), transparent)`,
            }}
          />

          <span className="font-['Google_Sans',sans-serif] font-semibold text-white text-[13px] sm:text-[15px] relative z-10">
            Book a Demo
          </span>
          <motion.div
            className="bg-white flex items-center justify-center rounded-full size-[24px] sm:size-[28px] shrink-0 relative z-10"
            animate={{ rotate: isNavButtonHovered ? 45 : 0 }}
            transition={{ duration: 0.15 }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              className="sm:w-[18px] sm:h-[18px]"
            >
              <motion.path
                d={svgPaths.p2bb94200}
                animate={{
                  fill: isNavButtonClicked
                    ? "#056bf1"
                    : isNavButtonHovered
                      ? "#8B5CF6"
                      : "#056bf1",
                }}
                transition={{ duration: 0.15 }}
              />
            </svg>
          </motion.div>
        </motion.button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden relative z-50 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Toggle menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <motion.span
              className="w-full h-0.5 bg-white rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 7 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded-full"
              animate={{
                opacity: isMobileMenuOpen ? 0 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="w-full h-0.5 bg-white rounded-full"
              animate={{
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -7 : 0,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        className="sm:hidden fixed inset-0 bg-gradient-to-b from-[#031630] to-[#056bf1] z-40"
        initial={{ opacity: 0, x: "100%" }}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          x: isMobileMenuOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          pointerEvents: isMobileMenuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col items-start gap-2 px-6 pt-24 pb-8">
          {/* Mobile Nav Items */}
          <motion.div
            className="w-full flex flex-col gap-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <button className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Products
              <PlusIcon />
            </button>
            <button className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Solutions
              <PlusIcon />
            </button>
            <button className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Resources
              <PlusIcon />
            </button>
            <button className="flex items-center justify-between w-full px-4 py-3.5 rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Company
              <PlusIcon />
            </button>
            <button className="w-full px-4 py-3.5 text-left rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Pricing
            </button>
            <button className="w-full px-4 py-3.5 text-left rounded-lg font-['Google_Sans',sans-serif] font-semibold text-[15px] text-white hover:bg-white/10 transition-colors">
              Partners
            </button>
          </motion.div>

          {/* Mobile CTA Button */}
          <motion.div
            className="w-full mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : 20,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button className="w-full bg-white flex items-center justify-center gap-2.5 px-5 py-4 rounded-full hover:bg-white/90 transition-colors cursor-pointer">
              <span className="font-['Google_Sans',sans-serif] font-semibold text-[#056bf1] text-[15px]">
                Book a Demo
              </span>
              <div className="bg-[#056bf1] flex items-center justify-center rounded-full size-[28px] shrink-0">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path d={svgPaths.p2bb94200} fill="white" />
                </svg>
              </div>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// --- Orbital Verification Rings ---

interface VerificationRing {
  id: number;
  label: string;
  radius: number;
  duration: number; // rotation duration in seconds
  markerCount: number;
  color: string;
  opacity: number;
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

function AntigravityParticles({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(undefined);
  const rotationRef = useRef(0);

  // Initialize particles in a circular area around center
  useEffect(() => {
    const particleCount = 80;
    const newParticles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const radius = 80 + Math.random() * 60; // 80-140px from center
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

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      setMousePos({
        x: e.clientX - centerX,
        y: e.clientY - centerY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () =>
      window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  // Animation loop
  useEffect(() => {
    const animate = () => {
      // Increment rotation (faster - 0.004 radians per frame = ~10 seconds per full rotation)
      rotationRef.current += 0.004;

      setParticles((prevParticles) =>
        prevParticles.map((particle, index) => {
          // Rotate base positions
          const originalAngle =
            (Math.PI * 2 * index) / prevParticles.length;
          const originalRadius =
            80 + ((particle.size - 2) / 3) * 60; // Reconstruct original radius from size

          const rotatedAngle =
            originalAngle + rotationRef.current;
          const newBaseX =
            Math.cos(rotatedAngle) * originalRadius;
          const newBaseY =
            Math.sin(rotatedAngle) * originalRadius;

          // Calculate distance from mouse
          const dx = mousePos.x - particle.x;
          const dy = mousePos.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Repulsion force from cursor
          const repulsionRadius = 120;
          let ax = 0;
          let ay = 0;

          if (distance < repulsionRadius && distance > 0) {
            const force =
              (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            ax = -Math.cos(angle) * force * 2;
            ay = -Math.sin(angle) * force * 2;
          }

          // Spring force back to rotating base position
          const toBaseX = newBaseX - particle.x;
          const toBaseY = newBaseY - particle.y;
          ax += toBaseX * 0.02;
          ay += toBaseY * 0.02;

          // Antigravity drift (slow upward float)
          ay -= 0.05;

          // Update velocity with damping
          let newVx = (particle.vx + ax) * 0.95;
          let newVy = (particle.vy + ay) * 0.95;

          // Random drift
          newVx += (Math.random() - 0.5) * 0.1;
          newVy += (Math.random() - 0.5) * 0.1;

          // Update position
          let newX = particle.x + newVx;
          let newY = particle.y + newVy;

          // Soft bounds (elastic)
          const maxDist = 150;
          const distFromCenterNew = Math.sqrt(
            newX * newX + newY * newY,
          );
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
        }),
      );

      animationFrameRef.current =
        requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
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

function VerificationMarker({
  angle,
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
      style={{
        left: "50%",
        top: "50%",
        x: "-50%",
        y: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: verified ? 1 : 0.6,
        opacity: verified ? 1 : 0.3,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <div
        className="w-2 h-2 rounded-full"
        style={{
          background: verified
            ? "white"
            : "rgba(255, 255, 255, 0.3)",
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
  isVerifying,
  isCompleted,
}: {
  ring: VerificationRing;
  isActive: boolean;
  isVerifying: boolean;
  isCompleted: boolean;
}) {
  const [verifiedMarkers, setVerifiedMarkers] = useState<
    number[]
  >([]);

  useEffect(() => {
    if (!isActive) {
      setVerifiedMarkers([]);
      return;
    }

    // Verify markers sequentially
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

  const markers = Array.from(
    { length: ring.markerCount },
    (_, i) => {
      const angle = (360 / ring.markerCount) * i;
      return {
        angle,
        verified: verifiedMarkers.includes(i),
      };
    },
  );

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: ring.radius * 2,
        height: ring.radius * 2,
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: isCompleted ? 0 : isActive ? 1 : 0,
        rotate: 360,
      }}
      transition={{
        opacity: {
          duration: 1.5,
          ease: [0.4, 0, 0.2, 1],
        },
        rotate: {
          duration: ring.duration,
          repeat: Infinity,
          ease: "linear",
        },
      }}
    >
      {/* Ring circle */}
      <div
        className="absolute inset-0 rounded-full border"
        style={{
          borderColor: `rgba(255, 255, 255, ${ring.opacity})`,
          borderWidth: "1.5px",
        }}
      />

      {/* Markers */}
      {markers.map((marker, idx) => {
        const x =
          Math.cos((marker.angle * Math.PI) / 180) *
          ring.radius;
        const y =
          Math.sin((marker.angle * Math.PI) / 180) *
          ring.radius;

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

      {/* Label */}
      <motion.div
        className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-8"
        style={{
          rotate: -360,
        }}
        animate={{
          rotate: [0, -360],
        }}
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
              color: isActive
                ? "white"
                : "rgba(255, 255, 255, 0.6)",
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
  const [completedRings, setCompletedRings] = useState<
    Set<number>
  >(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentIndex = 0;

    const advanceRing = () => {
      const ring = RINGS[currentIndex];

      // Activate current ring
      setActiveRingIndex(currentIndex);

      // Calculate timing
      const verificationDuration = ring.markerCount * 120 + 400;
      const holdDuration = 800;
      const fadeStartDelay =
        verificationDuration + holdDuration;

      // Start next ring BEFORE current one completes (this creates overlap)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % RINGS.length;

        // Reset if looping back
        if (currentIndex === 0) {
          setCompletedRings(new Set());
        }

        // Start next ring (creates overlap)
        advanceRing();
      }, fadeStartDelay - 1000); // Start next ring 1000ms before current fades

      // Mark current ring as completed after it's had time to fade
      setTimeout(() => {
        setCompletedRings(
          (prev) =>
            new Set([
              ...prev,
              currentIndex === 0
                ? RINGS.length - 1
                : currentIndex - 1,
            ]),
        );
      }, fadeStartDelay + 1500); // After fade completes
    };

    // Start sequence
    const startTimeout = setTimeout(advanceRing, 500);

    return () => {
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center"
    >
      {/* Ambient gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(6, 107, 241, 0.04), transparent 60%)",
        }}
        animate={{
          opacity:
            completedRings.size === RINGS.length ? 1 : 0.5,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Antigravity particles */}
      <AntigravityParticles containerRef={containerRef} />

      {/* Orbital rings */}
      <div className="relative">
        {RINGS.map((ring, index) => (
          <OrbitalRing
            key={ring.id}
            ring={ring}
            isActive={
              index === activeRingIndex ||
              completedRings.has(index)
            }
            isVerifying={index === activeRingIndex}
            isCompleted={completedRings.has(index)}
          />
        ))}
      </div>

      {/* Center container */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        style={{ width: "140px", height: "161px" }}
        animate={{
          scale:
            completedRings.size === RINGS.length ? 1.03 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Group />

        {/* Center glow when complete */}
        {completedRings.size === RINGS.length && (
          <motion.div
            className="absolute -inset-12 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(6, 107, 241, 0.15), transparent 70%)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        )}
      </motion.div>

      {/* Status text */}

      {/* Success badge */}
      {completedRings.size === RINGS.length && (
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
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

// --- Main Hero Section ---

interface HeroSlide {
  id: number;
  title: string;
  subtitle: string;
  ctaText: string;
  background: string; // gradient or color
  visualType: "orbital" | "grid" | "waves";
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    title: "Secure by Design. Built for Speed.",
    subtitle: "Hardened Container Images",
    ctaText: "Browse Images",
    background:
      "linear-gradient(1.9317e-06deg, rgb(255, 255, 255) 0%, rgb(6, 199, 242) 29.808%, rgb(6, 107, 241) 60.096%, rgb(3, 22, 48) 100%)",
    visualType: "orbital",
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
    subtitle:
      "Advanced Security Monitoring and Threat Detection",
    ctaText: "Try CleanSight",
    background:
      "linear-gradient(180deg, rgb(3, 22, 48) 0%, rgb(6, 107, 241) 60%, rgb(6, 199, 242) 100%)",
    visualType: "waves",
  },
];

// SBOM Dependency Network Visual
function GridPatternVisual() {
  const [nodes, setNodes] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      delay: number;
      type: string;
    }>
  >([]);

  useEffect(() => {
    // Create network nodes representing components
    const newNodes = [];
    const centerX = 0;
    const centerY = 0;

    // Center node (main package)
    newNodes.push({
      id: 0,
      x: centerX,
      y: centerY,
      delay: 0,
      type: "main",
    });

    // First layer - direct dependencies (6 nodes)
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

    // Second layer - sub-dependencies (12 nodes)
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 * i) / 12 + 0.26; // Offset for stagger
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
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Connection lines */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          width="700"
          height="600"
          viewBox="-350 -300 700 600"
          style={{ overflow: "visible" }}
        >
          <g>
            {/* Lines from center to first layer */}
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

            {/* Lines from first layer to second layer */}
            {nodes
              .filter((n) => n.type === "secondary")
              .map((node, i) => {
                const parentIndex = Math.floor(i / 2) % 6;
                const parent = nodes.filter(
                  (n) => n.type === "primary",
                )[parentIndex];
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

            {/* Animated data pulse on lines */}
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

        {/* Nodes */}
        <div className="absolute left-1/2 top-1/2">
          {nodes.map((node) => (
            <motion.div
              key={node.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{
                left: node.x,
                top: node.y,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: node.delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {node.type === "main" ? (
                // Main package node
                <motion.div
                  className="relative"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
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
                  {/* Glow */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/20 blur-xl" />
                </motion.div>
              ) : (
                // Dependency nodes
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -5, 0],
                  }}
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
                  {/* Scanning animation */}
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

        {/* Floating particles representing verified components */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (Math.PI * 2 * i) / 20;
          const radius = 160 + Math.random() * 100;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute left-1/2 top-1/2 w-1 h-1 rounded-full bg-white"
              style={{
                x,
                y,
              }}
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

        {/* Status badge */}
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
        ></motion.div>
      </motion.div>
    </div>
  );
}

// CleanSight Radar Scanning Visual - Omniscient Threat Detection
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
    // Generate threat positions - some critical, most standard
    const newThreats = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: Math.random() * 360,
      distance: 100 + Math.random() * 200,
      detected: false,
      isCritical: Math.random() > 0.7, // 30% critical threats
    }));
    setThreats(newThreats);
  }, []);

  useEffect(() => {
    // Continuous radar scanning
    const interval = setInterval(() => {
      setScanAngle((prev) => (prev + 2) % 360);

      // Detect threats when scan beam passes over them
      setThreats((prev) =>
        prev.map((threat) => {
          const angleDiff = Math.abs(scanAngle - threat.angle);
          const normalizedDiff = Math.min(
            angleDiff,
            360 - angleDiff,
          );

          if (normalizedDiff < 15 && !threat.detected) {
            return { ...threat, detected: true };
          }
          return threat;
        }),
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
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Radar circles */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[100, 160, 220, 280, 340].map((radius, i) => (
            <motion.div
              key={radius}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              style={{
                width: radius * 2,
                height: radius * 2,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Pulse effect */}
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

          {/* Crosshair lines */}
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

          {/* Rotating scan beam */}
          <motion.div
            className="absolute left-1/2 top-1/2 origin-left"
            style={{
              width: 340,
              height: 2,
              rotate: scanAngle,
            }}
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

          {/* Scan sweep gradient */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: 680,
              height: 680,
              background: `conic-gradient(from ${scanAngle}deg, rgba(255, 255, 255, 0.08), transparent 60deg)`,
            }}
          />

          {/* Threat indicators */}
          {threats.map((threat) => {
            const x =
              Math.cos((threat.angle * Math.PI) / 180) *
              threat.distance;
            const y =
              Math.sin((threat.angle * Math.PI) / 180) *
              threat.distance;

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
                {/* Threat pulse - more prominent for critical */}
                <motion.div
                  className={`absolute inset-0 ${threat.isCritical ? "-m-4" : "-m-3"} rounded-full border-2 ${threat.isCritical ? "border-red-400" : "border-red-400/60"}`}
                  animate={{
                    scale: [
                      1,
                      threat.isCritical ? 2.2 : 1.8,
                      1,
                    ],
                    opacity: [0.9, 0, 0.9],
                  }}
                  transition={{
                    duration: threat.isCritical ? 1.2 : 2,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* Threat marker */}
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

          {/* Center shield icon */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            animate={{
              scale: [1, 1.03, 1],
            }}
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
              {/* Shield glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white/20 blur-xl" />
            </div>
          </motion.div>
        </div>

        {/* Status badge */}
        <motion.div
          className="absolute left-1/2 bottom-[20px] -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.5,
            ease: [0.16, 1, 0.3, 1],
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
                  {threats.filter((t) => t.detected).length}{" "}
                  Threats Detected
                </span>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Scanning grid overlay */}
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
          <rect
            width="1000"
            height="600"
            fill="url(#radarGrid)"
          />
        </svg>
      </motion.div>
    </div>
  );
}

// Scroll Down Indicator
function ScrollDownIndicator() {
  return (
    <motion.div
      className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2 }}
    >
      {/* Mouse Icon */}
      <div className="relative w-[26px] h-[40px]">
        {/* Mouse outline */}
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

        {/* Animated scroll dot */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-white"
          style={{ top: "10px" }}
          animate={{
            y: [0, 12, 0],
            opacity: [0.8, 0.3, 0.8],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Scroll text */}
      <span className="font-['Google_Sans',sans-serif] text-[11px] text-white/40 tracking-[0.3em] uppercase">
        scroll
      </span>
    </motion.div>
  );
}

// Advanced Slide Navigation
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
    const duration = 5000; // 5 seconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(
        (elapsed / duration) * 100,
        100,
      );
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying]);

  return (
    <motion.div
      className="hidden md:absolute md:right-[50px] md:top-1/2 md:-translate-y-1/2 z-30 md:flex flex-col items-center gap-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 1.5 }}
    >
      {/* Slide Counter */}

      {/* Slide Dots */}
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
                {/* Progress Ring (only on active) */}
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

                {/* Glow Ring (on hover or active) */}
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

                {/* Dot */}
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
                  {/* Inner pulse (active only) */}
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

                {/* Slide label (on hover) - positioned to the left */}
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

      {/* Divider */}
      <div className="w-6 h-[1px] bg-white/20" />

      {/* Play/Pause Button */}
      <motion.button
        onClick={onPlayPauseToggle}
        className="group cursor-pointer relative"
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        aria-label={
          isAutoPlaying ? "Pause slideshow" : "Play slideshow"
        }
      >
        {isAutoPlaying ? (
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
          >
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
          <svg
            width="10"
            height="12"
            viewBox="0 0 10 12"
            fill="none"
          >
            <path
              d="M1 0.5L9.5 6L1 11.5V0.5Z"
              fill="white"
              opacity="0.8"
              className="group-hover:opacity-100 transition-opacity"
            />
          </svg>
        )}

        {/* Tooltip - positioned to the left */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-black/80 backdrop-blur-sm rounded-lg text-[11px] text-white font-['Google_Sans',sans-serif] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isAutoPlaying ? "Pause" : "Play"}
        </div>
      </motion.button>
    </motion.div>
  );
}

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [heroCtaMousePos, setHeroCtaMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [isHeroCtaHovered, setIsHeroCtaHovered] =
    useState(false);
  const [isHeroCtaClicked, setIsHeroCtaClicked] =
    useState(false);
  const heroCtaRef = useRef<HTMLButtonElement>(null);

  const handleHeroCtaMouseMove = (
    e: React.MouseEvent<HTMLButtonElement>,
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

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % HERO_SLIDES.length,
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const togglePlayPause = () => {
    setIsAutoPlaying((prev) => !prev);
  };

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
        style={{
          backgroundImage: activeSlide.background,
        }}
      />

      {/* Subtle grid - removed to let gradient shine */}

      {/* Navbar */}
      <Navbar />

      {/* Main content - Centered Flex Column */}
      <div className="relative flex-1 flex flex-col items-center justify-center gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-20">
        {/* Title & Subtitle */}
        <motion.div
          className="text-center z-10 w-full max-w-4xl"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <h1 className="font-['Google_Sans',sans-serif] text-[32px] sm:text-[40px] md:text-[48px] font-normal text-white leading-[1.2] tracking-[-0.02em] mb-2 sm:mb-3 px-4">
            {activeSlide.title}
          </h1>
          <p className="font-['Google_Sans',sans-serif] text-[14px] sm:text-[15px] md:text-[16px] text-white/80 leading-[1.6] px-4">
            {activeSlide.subtitle}
          </p>
        </motion.div>

        {/* Visualization */}
        <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] max-w-[800px]">
          {activeSlide.visualType === "orbital" && (
            <OrbitalVerification />
          )}
          {activeSlide.visualType === "grid" && (
            <GridPatternVisual />
          )}
          {activeSlide.visualType === "waves" && (
            <WavesVisual />
          )}
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
            {/* Magnetic spotlight that follows cursor */}
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
                  d={svgPaths.p2bb94200}
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