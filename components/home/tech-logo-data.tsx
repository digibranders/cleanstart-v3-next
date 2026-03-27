"use client";

// Tech logo SVG data extracted from Figma import (Frame2087328521)
// Each logo is a simplified renderable SVG for use in frosted glass squares
import svgPaths from '@/lib/svg-data/svg-bcnu6dd1yt';

interface LogoPath {
  d: string;
  fill: string;
  clipRule?: string;
  fillRule?: string;
  opacity?: string;
}

interface LogoGradient {
  type: 'linear' | 'radial';
  id: string;
  attrs: Record<string, string>;
  stops: { offset: string; stopColor: string; stopOpacity?: string }[];
}

export interface TechLogo {
  id: string;
  name: string;
  viewBox: string;
  paths: LogoPath[];
  scannedFills: string[]; // Blue/cyan fills after scanning (matches paths array order)
  gradients?: LogoGradient[];
  clipPath?: { id: string; rect: { width: string; height: string } };
}

export const TECH_LOGOS: TechLogo[] = [
  // Tomcat cat
  {
    id: 'tomcat',
    name: 'Tomcat',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p35f25900, fill: '#E6E6E6' },
      { d: svgPaths.p13eb3f00, fill: 'white' },
      { d: svgPaths.p3cccdfc0, fill: 'black' },
      { d: svgPaths.p3bdc4b00, fill: 'black' },
      { d: svgPaths.p3771ab80, fill: 'black' },
      { d: svgPaths.p2b209240, fill: 'black' },
      { d: svgPaths.p32d812f1, fill: 'black' },
    ],
    scannedFills: ['#056BF1', '#056BF1', '#06C7F2', '#06C7F2', '#06C7F2', '#06C7F2', '#06C7F2'],
    clipPath: { id: 'clip-tomcat', rect: { width: '128', height: '128' } },
  },
  // TensorFlow
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    viewBox: '0 0 128 128',
    paths: [{ d: svgPaths.p308e98a2, fill: 'white' }],
    scannedFills: ['#056BF1'],
  },
  // Ubuntu
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    viewBox: '0 0 128 128',
    paths: [{ d: svgPaths.p2c570540, fill: 'white' }],
    scannedFills: ['#056BF1'],
  },
  // Python
  {
    id: 'python',
    name: 'Python',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p479ce00, fill: 'white' },
      { d: svgPaths.p21b1cd00, fill: 'white' },
    ],
    scannedFills: ['#056BF1', '#056BF1'],
  },
  // CleanStart orbital
  {
    id: 'cleanstart-orbit',
    name: 'CleanStart',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p229a4800, fill: '#E3E3E3' },
      { d: svgPaths.p3ca99000, fill: 'white' },
      { d: svgPaths.p89f7d80, fill: '#E3E3E3' },
      { d: svgPaths.p2984bb00, fill: '#E3E3E3' },
    ],
    scannedFills: ['#056BF1', '#056BF1', '#056BF1', '#056BF1'],
  },
  // AWS
  {
    id: 'aws',
    name: 'AWS',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p138a00, fill: 'white' },
      { d: svgPaths.pf87bbe0, fill: 'white' },
    ],
    scannedFills: ['#056BF1', '#056BF1'],
  },
  // Windmill / Pinwheel (OpenGL)
  {
    id: 'windmill',
    name: 'Windmill',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p2d6ca400, fill: 'white' },
      { d: svgPaths.pc4fb980, fill: 'white' },
      { d: svgPaths.p1d435600, fill: '#ECECEC' },
      { d: svgPaths.p289f7ce0, fill: 'white' },
      { d: svgPaths.p18464980, fill: '#ECECEC' },
      { d: svgPaths.p28dc9b40, fill: 'white' },
      { d: svgPaths.p906f600, fill: '#ECECEC' },
      { d: svgPaths.p5641e80, fill: '#ECECEC' },
      { d: svgPaths.p23c32100, fill: '#4A4848' },
    ],
    scannedFills: ['#06C7F2', '#06C7F2', '#056BF1', '#06C7F2', '#056BF1', '#06C7F2', '#056BF1', '#056BF1', '#4A4848'],
    clipPath: { id: 'clip-windmill', rect: { width: '128', height: '128' } },
  },
  // C logo (hexagon)
  {
    id: 'c-lang',
    name: 'C',
    viewBox: '0 0 92 92',
    paths: [
      { d: svgPaths.p716f880, fill: '#DFDFDF' },
      { d: svgPaths.p23810900, fill: '#B3B3B3' },
      { d: svgPaths.p9283980, fill: 'white' },
    ],
    scannedFills: ['#056BF1', '#06C7F2', 'white'],
  },
  // Docker (whale)
  {
    id: 'docker',
    name: 'Docker',
    viewBox: '0 0 108 108',
    paths: [{ d: svgPaths.p5136580, fill: 'white' }],
    scannedFills: ['#056BF1'],
  },
  // Rust
  {
    id: 'rust',
    name: 'Rust',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p7e34400, fill: 'white', clipRule: 'evenodd', fillRule: 'evenodd' },
      { d: svgPaths.p19185380, fill: 'white', clipRule: 'evenodd', fillRule: 'evenodd' },
    ],
    scannedFills: ['#056BF1', '#056BF1'],
  },
  // Node.js
  {
    id: 'nodejs',
    name: 'Node.js',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p181edf80, fill: '#CBCBCB' },
      { d: svgPaths.p23d90800, fill: '#CBCBCB' },
      { d: svgPaths.p2928e3f0, fill: '#ADADAD' },
      { d: svgPaths.p1b9171f1, fill: 'white' },
    ],
    scannedFills: ['white', 'white', '#056BF1', '#06C7F2'],
  },
  // PHP
  {
    id: 'php',
    name: 'PHP',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.pbc19e00, fill: 'white' },
      { d: svgPaths.p168ad800, fill: '#AEAEAE' },
      { d: svgPaths.p9975580, fill: 'white' },
      { d: svgPaths.p2a758a30, fill: '#AEAEAE' },
      { d: svgPaths.p33339080, fill: 'white' },
      { d: svgPaths.p257dec00, fill: '#AEAEAE' },
      { d: svgPaths.p2fb8ea00, fill: 'white' },
    ],
    scannedFills: ['white', '#056BF1', 'white', '#056BF1', 'white', '#056BF1', 'white'],
  },
  // Databricks / stacked layers
  {
    id: 'layers',
    name: 'Layers',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p22af1b80, fill: '#EBEBEB' },
      { d: svgPaths.p3fd6e300, fill: '#DADADA' },
      { d: svgPaths.p13843f00, fill: '#EBEBEB' },
      { d: svgPaths.p21e45ec0, fill: '#DADADA' },
      { d: svgPaths.p65d4dc0, fill: '#EBEBEB' },
      { d: svgPaths.p185b9e80, fill: '#DADADA' },
      { d: svgPaths.p35fb8b00, fill: 'white' },
      { d: svgPaths.p14302080, fill: 'white' },
      { d: svgPaths.p366e9080, fill: 'white' },
      { d: svgPaths.p625a980, fill: '#C8C8C8' },
    ],
    scannedFills: ['#06C7F2', '#056BF1', '#06C7F2', '#056BF1', '#06C7F2', '#056BF1', 'white', 'white', 'white', '#06C7F2'],
  },
  // Kubernetes
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.p26975370, fill: 'white' },
    ],
    scannedFills: ['#056BF1'],
    clipPath: { id: 'clip-k8s', rect: { width: '128', height: '128' } },
  },
  // Swift
  {
    id: 'swift',
    name: 'Swift',
    viewBox: '0 0 128 128',
    paths: [
      { d: svgPaths.pec18fa0, fill: '#D8D8D8' },
      { d: svgPaths.p36b4a100, fill: '#FEFEFE' },
    ],
    scannedFills: ['#056BF1', '#FEFEFE'],
  },
  // Hat (Fedora)
  {
    id: 'fedora',
    name: 'Fedora',
    viewBox: '0 0 107 80',
    paths: [
      { d: svgPaths.p36429e00, fill: 'white' },
      { d: svgPaths.p208fc680, fill: 'white' },
      { d: svgPaths.pfe8a980, fill: '#C8C8C8' },
    ],
    scannedFills: ['#056BF1', '#056BF1', '#06C7F2'],
  },
  // Helm / wheel
  {
    id: 'helm',
    name: 'Helm',
    viewBox: '0 0 121.5 117.881',
    paths: [
      { d: svgPaths.pe49a800, fill: '#EAEAEA' },
      { d: svgPaths.p29282a00, fill: '#EAEAEA' },
      { d: svgPaths.p30a33500, fill: '#EAEAEA' },
    ],
    scannedFills: ['#056BF1', '#056BF1', '#056BF1'],
  },
];

// Render a single tech logo SVG
export function TechLogoSVG({ logo, size, scanned = false }: { logo: TechLogo; size: number; scanned?: boolean }) {
  // Before scanning: brand blue/cyan icons on white/frosted background
  // After scanning: white/grey icons on brand blue #056BF1 background
  const getFill = (pathIndex: number, originalFill: string) => {
    if (!scanned) return logo.scannedFills[pathIndex] || originalFill; // Blue icons before scan
    // After scanning — white/grey fills on blue background
    return originalFill;
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox={logo.viewBox}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      style={{ transition: 'all 0.4s ease' }}
    >
      {logo.clipPath && (
        <defs>
          <clipPath id={logo.clipPath.id}>
            <rect fill="white" width={logo.clipPath.rect.width} height={logo.clipPath.rect.height} />
          </clipPath>
        </defs>
      )}
      {logo.gradients?.map((g) => (
        <defs key={g.id}>
          {g.type === 'linear' ? (
            <linearGradient id={g.id} {...(g.attrs as React.SVGProps<SVGLinearGradientElement>)}>
              {g.stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.stopColor} stopOpacity={s.stopOpacity} />
              ))}
            </linearGradient>
          ) : (
            <radialGradient id={g.id} {...(g.attrs as React.SVGProps<SVGRadialGradientElement>)}>
              {g.stops.map((s, i) => (
                <stop key={i} offset={s.offset} stopColor={s.stopColor} stopOpacity={s.stopOpacity} />
              ))}
            </radialGradient>
          )}
        </defs>
      ))}
      <g clipPath={logo.clipPath ? `url(#${logo.clipPath.id})` : undefined}>
        {logo.paths.map((p, i) => (
          <path
            key={i}
            d={p.d}
            fill={getFill(i, p.fill)}
            clipRule={p.clipRule as 'evenodd' | 'nonzero' | undefined}
            fillRule={p.fillRule as 'evenodd' | 'nonzero' | undefined}
            opacity={p.opacity}
            style={{ transition: 'fill 0.4s ease' }}
          />
        ))}
      </g>
    </svg>
  );
}
