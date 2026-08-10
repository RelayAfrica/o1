
export function FlowingLineLeft() {
  return (
    <svg
      className="absolute left-0 pointer-events-none select-none"
      style={{ top: "50%", transform: "translateY(-50%)", width: 140, height: 420, overflow: "visible" }}
      viewBox="0 0 140 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 0 C10 80, 130 100, 130 160 C130 220, 10 240, 10 310 C10 370, 130 390, 130 420"
        stroke="hsl(88 75% 48%)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <circle cx="10" cy="0" r="5" fill="hsl(88 75% 48%)" opacity="0.4" />
      <circle cx="130" cy="420" r="5" fill="hsl(88 75% 48%)" opacity="0.4" />
    </svg>
  );
}

export function FlowingLineRight() {
  return (
    <svg
      className="absolute right-0 pointer-events-none select-none"
      style={{ top: "50%", transform: "translateY(-50%)", width: 140, height: 420, overflow: "visible" }}
      viewBox="0 0 140 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M130 0 C130 80, 10 100, 10 160 C10 220, 130 240, 130 310 C130 370, 10 390, 10 420"
        stroke="hsl(88 75% 48%)"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.35"
      />
      <circle cx="130" cy="0" r="5" fill="hsl(88 75% 48%)" opacity="0.4" />
      <circle cx="10" cy="420" r="5" fill="hsl(88 75% 48%)" opacity="0.4" />
    </svg>
  );
}

export function BlobTopRight({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg
      className="absolute top-0 right-0 pointer-events-none select-none"
      style={{ width: 520, height: 520, overflow: "visible" }}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="hsl(88 75% 48%)"
        opacity={opacity}
        d="M51.5,-67.2C65.5,-59.1,74.8,-43.3,81.4,-26.5C88,-9.7,91.9,8,86.6,23.1C81.3,38.2,66.8,50.7,51.2,60.8C35.6,70.9,18.9,78.6,1.4,76.8C-16.1,75,-32.2,63.7,-46.8,51.8C-61.4,39.9,-74.5,27.4,-80.2,11.5C-85.9,-4.4,-84.2,-23.7,-74.6,-38.7C-65,-53.7,-47.4,-64.4,-31.2,-71.4C-15,-78.4,3.7,-81.7,20.8,-77.9C37.9,-74.1,51.5,-75.3,51.5,-67.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function BlobBottomLeft({ opacity = 0.18 }: { opacity?: number }) {
  return (
    <svg
      className="absolute bottom-0 left-0 pointer-events-none select-none"
      style={{ width: 480, height: 480, overflow: "visible" }}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="hsl(88 75% 48%)"
        opacity={opacity}
        d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.1,-46.1C90.4,-33.1,96,-16.6,95.5,-0.3C95,16,88.4,32.1,78.5,45.4C68.6,58.7,55.3,69.2,40.7,75.4C26.1,81.6,10.2,83.5,-4.8,81.3C-19.8,79,-33.9,72.6,-46.3,63.9C-58.7,55.2,-69.3,44.2,-76.7,31.2C-84.1,18.2,-88.3,3.1,-87.3,-11.6C-86.3,-26.3,-80.1,-40.6,-70.7,-51.7C-61.3,-62.8,-48.7,-70.7,-35.3,-76.1C-21.9,-81.5,-7.7,-84.4,6.7,-83.4C21.1,-82.4,30.6,-83.6,44.7,-76.4Z"
        transform="translate(100 100)"
      />
    </svg>
  );
}

export function WavySeparator({ flip = false }: { flip?: boolean }) {
  return (
    <div className="relative w-full overflow-hidden pointer-events-none select-none" style={{ height: 60, transform: flip ? "scaleX(-1)" : undefined }}>
      <svg
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        className="w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30"
          stroke="hsl(88 75% 48%)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}

export function SnakeLine() {
  return (
    <div className="relative w-full pointer-events-none select-none overflow-hidden" style={{ height: 80 }}>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1380,20 1440,40"
          stroke="hsl(88 75% 48%)"
          strokeWidth="3"
          fill="none"
          opacity="0.25"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export function GreenDot({ size = 8, opacity = 0.5 }: { size?: number; opacity?: number }) {
  return (
    <div
      className="rounded-full bg-primary shrink-0"
      style={{ width: size, height: size, opacity }}
    />
  );
}

export function GreenAccentLine() {
  return (
    <svg
      className="absolute pointer-events-none select-none"
      style={{ left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 900, height: 120, overflow: "visible" }}
      viewBox="0 0 900 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,60 C150,0 300,120 450,60 C600,0 750,120 900,60"
        stroke="hsl(88 75% 48%)"
        strokeWidth="3"
        fill="none"
        opacity="0.22"
        strokeLinecap="round"
      />
      <ellipse cx="450" cy="60" rx="12" ry="12" fill="hsl(88 75% 48%)" opacity="0.18" />
      <ellipse cx="0" cy="60" rx="6" ry="6" fill="hsl(88 75% 48%)" opacity="0.22" />
      <ellipse cx="900" cy="60" rx="6" ry="6" fill="hsl(88 75% 48%)" opacity="0.22" />
    </svg>
  );
}
