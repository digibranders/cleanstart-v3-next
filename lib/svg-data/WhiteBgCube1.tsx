import svgPaths from "./svg-onurlnsh3";

function Layer() {
  return (
    <div className="absolute contents inset-0" data-name="Layer 1">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 129.99 150">
        <g id="Group">
          <path d={svgPaths.p1ba57030} fill="#2CC1EB" id="Vector" />
          <path d={svgPaths.p5794800} fill="white" id="Vector_2" />
        </g>
      </svg>
    </div>
  );
}

export default function WhiteBgCube() {
  return (
    <div className="relative size-full" data-name="White BG Cube 1">
      <Layer />
    </div>
  );
}