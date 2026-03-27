import svgPaths from "./svg-npccw2o0o2";

/* ── Small animated chevron arrow (absolutely positioned) ── */
function AnimatedArrow({
  direction,
  style,
  delayMs = 0,
}: {
  direction: 'right' | 'left' | 'up' | 'down';
  style: React.CSSProperties;
  delayMs?: number;
}) {
  const animName =
    direction === 'right'
      ? 'arrow-bounce-right'
      : direction === 'left'
        ? 'arrow-bounce-left'
        : direction === 'up'
          ? 'arrow-bounce-up'
          : 'arrow-bounce-down';

  return (
    <div className="absolute" style={style}>
      <svg
        width="7"
        height="7"
        viewBox="0 0 10 10"
        fill="none"
        style={{
          animation: `${animName} 1.6s ease-in-out ${delayMs}ms infinite`,
          display: 'block',
        }}
      >
        <path
          d="M3 1.5L7 5L3 8.5"
          stroke="white"
          strokeOpacity="0.75"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

/* ── Base ring (static, very faint) ── */
function BaseRing() {
  return (
    <svg
      className="absolute block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 149.991 149.991"
    >
      <path
        d={svgPaths.p14ce1080}
        stroke="var(--stroke-0, white)"
        strokeOpacity="0.06"
        strokeWidth="1.99988"
      />
      {/* Static dot at top of circle */}
      <path d={svgPaths.p24036450} fill="var(--fill-0, white)" />
    </svg>
  );
}

/* ── Dashed strokes layer — rotates continuously ── */
function RotatingStrokes() {
  return (
    <svg
      className="absolute block size-full"
      fill="none"
      preserveAspectRatio="none"
      viewBox="0 0 149.991 149.991"
      style={{ animation: 'spin-pipeline 8s linear infinite' }}
    >
      <path
        d={svgPaths.p14ce1080}
        stroke="var(--stroke-0, white)"
        strokeDasharray="56.52 257.46"
        strokeLinecap="round"
        strokeOpacity="0.3"
        strokeWidth="1.99988"
      />
      <path
        d={svgPaths.p14ce1080}
        stroke="var(--stroke-0, white)"
        strokeDasharray="56.52 257.46"
        strokeLinecap="round"
        strokeOpacity="0.3"
        strokeWidth="1.99988"
      />
      <path
        d={svgPaths.p14ce1080}
        stroke="var(--stroke-0, white)"
        strokeDasharray="56.52 257.46"
        strokeLinecap="round"
        strokeOpacity="0.3"
        strokeWidth="1.99988"
      />
      <path
        d={svgPaths.p14ce1080}
        stroke="var(--stroke-0, white)"
        strokeDasharray="56.52 257.46"
        strokeLinecap="round"
        strokeOpacity="0.3"
        strokeWidth="1.99988"
      />
    </svg>
  );
}

function Svg() {
  return (
    <div className="absolute left-[51px] size-[149.991px] top-0" data-name="svg">
      <BaseRing />
      <RotatingStrokes />
    </div>
  );
}

function Svg1() {
  return (
    <div className="h-[59.999px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute bottom-[45%] left-1/4 right-1/4 top-1/4" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 30 17.9997">
          <path d={svgPaths.p2d162f80} fill="var(--fill-0, white)" fillOpacity="0.95" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[20%] left-1/4 right-1/2 top-[40%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 23.9996">
          <path d={svgPaths.p5261180} fill="var(--fill-0, white)" fillOpacity="0.65" id="Vector" />
        </svg>
      </div>
      <div className="absolute bottom-[20%] left-1/2 right-1/4 top-[40%]" data-name="Vector">
        <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 23.9996">
          <path d={svgPaths.p1be800b0} fill="var(--fill-0, white)" fillOpacity="0.8" id="Vector" />
        </svg>
      </div>
    </div>
  );
}

function MotionDiv() {
  return (
    <div className="relative shrink-0 size-[60px]" data-name="motion.div">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Svg1 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-[51px] size-[149.991px] top-0" data-name="Container">
      <MotionDiv />
    </div>
  );
}

/* ── Label pills — EXACT original positions preserved ── */

function Span() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.15)] border-[0.626px] border-[rgba(255,255,255,0.25)] border-solid h-[20.51px] left-[95px] rounded-[20993500px] top-[-0.12px] w-[64.648px]" data-name="span">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[13.5px] left-[9.99px] text-[9px] text-[rgba(255,255,255,0.9)] top-[3px] whitespace-nowrap">Hardened</p>
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.15)] border-[0.626px] border-[rgba(255,255,255,0.25)] border-solid h-[20.51px] left-[83px] rounded-[20993500px] top-[133.88px] w-[87.709px]" data-name="span">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[13.5px] left-[9.99px] text-[9px] text-[rgba(255,255,255,0.9)] top-[3px] whitespace-nowrap">FIPS Compliant</p>
    </div>
  );
}

function Span2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.15)] border-[0.626px] border-[rgba(255,255,255,0.25)] border-solid h-[20.51px] left-[182.44px] rounded-[20993500px] top-[67px] w-[83.31px]" data-name="span">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[13.5px] left-[9.99px] text-[9px] text-[rgba(255,255,255,0.9)] top-[3px] whitespace-nowrap">Near Zero CVE</p>
    </div>
  );
}

function Div() {
  return (
    <div className="absolute h-[303px] left-0 top-0 w-[266px]" data-name="div">
      <Svg />
      <Container />
      <Span />
      <Span1 />
      <Span2 />
      {/* ── Animated arrows next to each label ── */}
      {/* Hardened arrow — to the right of the pill, pointing left (← toward circle) */}
      <AnimatedArrow
        direction="left"
        style={{ left: 95 + 64.648 + 4, top: -0.12 + 6 }}
        delayMs={0}
      />
      {/* Near Zero CVE arrow — to the right of the pill, pointing left */}
      <AnimatedArrow
        direction="left"
        style={{ left: 182.44 + 83.31 + 4, top: 67 + 6 }}
        delayMs={200}
      />
      {/* FIPS Compliant arrow — to the right, pointing up (↑ toward circle) */}
      <AnimatedArrow
        direction="up"
        style={{ left: 83 + 87.709 + 4, top: 133.88 + 6 }}
        delayMs={400}
      />
    </div>
  );
}

function P() {
  return (
    <div className="absolute h-[14.996px] left-0 top-0 w-[98.159px]" data-name="p">
      <p className="-translate-x-1/2 absolute font-['Sora:SemiBold',sans-serif] font-semibold leading-[15px] left-[49.5px] text-[10px] text-center text-white top-[-0.37px] whitespace-nowrap">Push to Production</p>
    </div>
  );
}

function MotionSpan() {
  return (
    <div className="absolute content-stretch flex h-[10.01px] items-start left-[13.82px] opacity-56 top-[25.01px] w-[70.503px]" data-name="motion.span">
      <p className="font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[12px] relative shrink-0 text-[8px] text-[rgba(255,255,255,0.6)] text-center tracking-[0.4px] uppercase whitespace-nowrap">Secure Deploy</p>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute h-[38.996px] left-0 top-[49.98px] w-[98.159px]" data-name="div">
      <P />
      <MotionSpan />
    </div>
  );
}

function Svg2() {
  return (
    <div className="relative shrink-0 size-[18.972px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18.9724 18.9724">
        <g id="svg">
          <path d={svgPaths.pa14e000} fill="var(--fill-0, white)" fillOpacity="0.2" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.18578" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.15)] content-stretch flex items-center justify-center left-[-1.19px] pl-[1.251px] pr-[1.261px] py-[1.251px] rounded-[14px] size-[46.375px] top-[-1.19px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[1.251px] border-[rgba(255,255,255,0.4)] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_0px_20px_0px_rgba(255,255,255,0.1)]" />
      <Svg2 />
    </div>
  );
}

function MotionDiv2() {
  return <div className="absolute border-[1.251px] border-[rgba(255,255,255,0.3)] border-solid left-[-1.56px] opacity-42 rounded-[14px] size-[47.121px] top-[-1.56px]" data-name="motion.div" />;
}

function Div2() {
  return (
    <div className="absolute left-[27.08px] size-[43.991px] top-0" data-name="div">
      <Container2 />
      <MotionDiv2 />
    </div>
  );
}

function MotionDiv1() {
  return (
    <div className="absolute h-[88.98px] left-[-25.23px] top-[-0.76px] w-[98.159px]" data-name="motion.div">
      <Div1 />
      <Div2 />
    </div>
  );
}

function MotionDiv3() {
  return <div className="absolute bg-gradient-to-b from-[41.684%] from-[rgba(255,255,255,0.5)] h-[11.995px] left-0 to-[41.684%] to-[rgba(0,0,0,0)] top-0 w-[1.994px]" data-name="motion.div" />;
}

function Svg3() {
  return (
    <div className="h-[5.993px] overflow-clip relative shrink-0 w-full" data-name="svg">
      <div className="absolute inset-[15.27%_8.33%_22.21%_8.33%]" data-name="Vector">
        <div className="absolute inset-[-16.67%_-7.5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.57464 4.99547">
            <path d={svgPaths.p686a100} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.24887" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MotionDiv4() {
  return (
    <div className="absolute content-stretch flex flex-col h-[5.993px] items-start left-[-4px] opacity-70 top-[10px] w-[9.991px]" data-name="motion.div">
      <Svg3 />
    </div>
  );
}

function MotionDiv5() {
  return <div className="absolute bg-white left-[-2px] opacity-84 rounded-[20993500px] shadow-[0px_0px_6px_0px_rgba(255,255,255,0.6)] size-[5.993px] top-[13.93px]" data-name="motion.div" />;
}

function Container3() {
  return (
    <div className="absolute h-[11.995px] left-[22.85px] top-[-32.75px] w-[1.994px]" data-name="Container">
      <MotionDiv3 />
      <MotionDiv4 />
      <MotionDiv5 />
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute h-[119.247px] left-[103.23px] top-[213.75px] w-[129.908px]" data-name="Container">
      <MotionDiv1 />
      <Container3 />
    </div>
  );
}

function Span3() {
  return (
    <div className="absolute bg-[rgba(255,255,255,0.15)] border-[0.626px] border-[rgba(255,255,255,0.25)] border-solid h-[24.8px] left-0 rounded-[20993500px] top-[64.4px] w-[68px]" data-name="span">
      <p className="absolute font-['Plus_Jakarta_Sans:SemiBold',sans-serif] font-semibold leading-[13.5px] left-[9.99px] text-[9px] text-[rgba(255,255,255,0.9)] top-[4.6px] whitespace-nowrap">Debloated</p>
    </div>
  );
}

export default function Group() {
  return (
    <div className="relative size-full">
      <Div />
      <Container1 />
      <Span3 />
      {/* Debloated arrow — to the left of the pill, pointing right (→ toward circle) */}
      <AnimatedArrow
        direction="right"
        style={{ left: -12, top: 64.4 + 8 }}
        delayMs={600}
      />
    </div>
  );
}
