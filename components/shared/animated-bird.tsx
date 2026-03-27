"use client";

import { useEffect, useState } from "react";

const TOTAL_FRAMES = 131;
const FPS = 24;

// Generate frame paths
const frames = Array.from({ length: TOTAL_FRAMES }, (_, i) =>
  `/kubr-bird-frames/frame-${String(i + 1).padStart(3, "0")}.png`
);

export function AnimatedBird({ className }: { className?: string }) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES);
    }, 1000 / FPS);

    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src={frames[currentFrame]}
      alt="CleanStart Kubr Bird Mascot"
      className={className}
      draggable={false}
    />
  );
}
