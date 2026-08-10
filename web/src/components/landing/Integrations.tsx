import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Tap to Check In",
    description:
      "A customer arrives and taps an NFC tag at your service point. Their phone confirms their queue position instantly — no app download required.",
    icon: <i className="hgi hgi-stroke hgi-rounded hgi-smartphone-nfc text-2xl"></i>,
    active: false,
  },
  {
    number: "02",
    title: "Fill a Smart Form",
    description:
      "A customisable form captures what the customer needs — service type, name, order, or table number. Fully configured for your business.",
    icon: <i className="hgi hgi-stroke hgi-rounded hgi-profile text-2xl"></i>,
    active: true,
  },
  {
    number: "03",
    title: "Auto-Routed to Queue",
    description:
      "Relay routes the customer to the correct queue based on their service selection and issues a real-time ticket number automatically.",
    icon: <img src="https://img.icons8.com/m_rounded/1200/queue.jpg" className="w-8 h-8 rounded-full object-cover" alt="Queue icon" />,
    active: false,
  },
  {
    number: "04",
    title: "Staff Get Full Context",
    description:
      "Staff receive customer details on their dashboard before calling. They serve with full context from the very first second.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    active: true,
  },
  {
    number: "05",
    title: "Customer Gets Updates",
    description:
      "Customers receive live position updates on their phone and an instant push notification when it's their turn — no waiting in line.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    active: false,
  },
  {
    number: "06",
    title: "Insights & Campaigns",
    description:
      "After every visit, Relay captures data for analytics and lets you send targeted campaign messages to re-engage customers.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    active: false,
  },
];

const row1 = steps.slice(0, 3);
const row2 = steps.slice(3, 6);

// Layout constants (px) — fixed on desktop to ensure line coordinates match DOM exactly
const ROW_H = 280;
const GAP_H = 140; // spacer between rows
const STEP3_Y = 64;
const STEP4_Y = ROW_H + GAP_H + 64; // 280 + 140 + 64 = 484
const WRAPPER_H = ROW_H * 2 + GAP_H; // 700

// Horizontal connector: icon centre y within its own row = pt-8 + icon-radius = 64px
const ICON_Y = 64;

function StepNode({
  step,
  delay,
}: {
  step: (typeof steps)[0];
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="flex flex-col items-center text-center px-3 pt-8 pb-8 animate-fade-in"
    >
      {/* Icon — z-10 + white bg so the SVG line appears to pass behind it */}
      <div
        className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4
          ${step.active
            ? "bg-white border-[3px] border-primary text-primary shadow-md shadow-primary/20"
            : "bg-white border-2 border-slate-200 text-slate-500 dark:bg-slate-50"
          }`}
      >
        {step.icon}
      </div>
      <h3 className="font-semibold text-[15px] mb-1.5 text-foreground leading-snug">
        {step.title}
      </h3>
      <p className="text-[13px] text-muted-foreground leading-relaxed max-w-[190px]">
        {step.description}
      </p>
    </motion.div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.getBoundingClientRect().width;
        // The grid layout is designed for a width of 1000px
        const newScale = Math.min(1, width / 1000);
        setScale(newScale);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-8" ref={containerRef}>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 lg:mb-20"
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-primary block mb-3">
            
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight mb-3">
            How Relay Works
          </h2>
          <p className="text-muted-foreground text-sm max-w-md">
            Tactically placed NFC tags. No dedicated hardware. No structural workflow changes.
          </p>
        </motion.div>

        {/* ── Scaled container that preserves the desktop layout perfectly on all screen sizes ── */}
        <div
          className="relative origin-top-left"
          style={{
            width: "1000px",
            height: `${WRAPPER_H}px`,
            transform: `scale(${scale})`,
            marginBottom: `${(scale - 1) * WRAPPER_H}px`,
          }}
        >

          {/* ── Row 1 ── */}
          <div className="relative grid grid-cols-3 h-[280px]">
            {/* Horizontal connector line through icon centres */}
            <div
              className="absolute left-[16.67%] right-[16.67%] h-[2px] bg-primary/35 z-0"
              style={{ top: `${ICON_Y}px`, transform: "translateY(-50%)" }}
            />
            {row1.map((step, i) => (
              <StepNode key={step.number} step={step} delay={0.1 + i * 0.12} />
            ))}
          </div>

          {/* Gap */}
          <div style={{ height: `${GAP_H}px` }} />

          {/* ── Row 2 ── */}
          <div className="relative grid grid-cols-3 h-[280px]">
            {/* Horizontal connector line through icon centres */}
            <div
              className="absolute left-[16.67%] right-[16.67%] h-[2px] bg-primary/35 z-0"
              style={{ top: `${ICON_Y}px`, transform: "translateY(-50%)" }}
            />
            {row2.map((step, i) => (
              <StepNode key={step.number} step={step} delay={0.4 + i * 0.12} />
            ))}
          </div>

          {/*
            ── Bezier connector: Auto-Routed (step3) → Staff Context (step4) ──
            The curve travels around the text for step 3 and then goes to step 4.
            We start at (833, STEP3_Y), go right to 950, curve down around step 3's text,
            then diagonal left across the gap, and down into step 4's icon.
          */}
          <svg
            className="absolute top-0 left-0 w-full pointer-events-none"
            height={WRAPPER_H}
            viewBox={`0 0 1000 ${WRAPPER_H}`}
            preserveAspectRatio="none"
            fill="none"
          >
            <path
              d={`M 833 ${STEP3_Y} L 950 ${STEP3_Y} C 990 ${STEP3_Y}, 990 320, 850 330 L 180 370 C 80 385, 60 430, 60 ${STEP4_Y} L 167 ${STEP4_Y}`}
              stroke="rgba(59,130,246,0.5)"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </div>

      </div>
    </section>
  );
}
