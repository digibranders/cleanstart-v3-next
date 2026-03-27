"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const frames = Array.from({ length: 131 }, (_, i) =>
  `/images/mascot/frame-${String(i + 1).padStart(3, '0')}.png`
);

export function MascotSpriteAnimation({ className }: { className?: string }) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % frames.length);
    }, 1000 / 24); // 24 fps

    return () => clearInterval(interval);
  }, []);

  return (
    <Image
      src={frames[currentFrame]}
      alt="CleanStart Animated Mascot"
      className={className}
      width={200}
      height={200}
      unoptimized
      priority
    />
  );
}
