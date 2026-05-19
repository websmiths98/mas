"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  animate,
  useInView,
  useMotionValue,
} from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Globe2, Activity } from "lucide-react";

// ============================================================================
// DATA & CONSTANTS
// ============================================================================

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  // { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/network" },
  { name: "Industries", href: "/industry" },
  { name: "About us", href: "/about" },
];

const HUBS = [
  { id: "chennai", label: "Chennai", location: [13.0827, 80.2707] },
  { id: "australia", label: "Australia", location: [-25.2744, 133.7751] },
  { id: "bangladesh", label: "Bangladesh", location: [23.6850, 90.3563] },
  { id: "belgium", label: "Belgium", location: [50.5039, 4.4699] },
  { id: "cambodia", label: "Cambodia", location: [12.5657, 104.9910] },
  { id: "canada", label: "Canada", location: [56.1304, -106.3468] },
  { id: "china", label: "China", location: [35.8617, 104.1954] },
  { id: "colombia", label: "Colombia", location: [4.5709, -74.2973] },
  { id: "france", label: "France", location: [46.2276, 2.2137] },
  { id: "germany", label: "Germany", location: [51.1657, 10.4515] },
  { id: "iran", label: "Iran", location: [32.4279, 53.6880] },
  { id: "iraq", label: "Iraq", location: [33.2232, 43.6793] },
  { id: "indonesia", label: "Indonesia", location: [-0.7893, 113.9213] },
  { id: "japan", label: "Japan", location: [36.2048, 138.2529] },
  { id: "korea", label: "Korea", location: [35.9078, 127.7669] },
  { id: "malaysia", label: "Malaysia", location: [4.2105, 101.9758] },
  { id: "mauritius", label: "Mauritius", location: [-20.3484, 57.5522] },
  { id: "morocco", label: "Morocco", location: [31.7917, -7.0926] },
  { id: "netherlands", label: "Netherlands", location: [52.1326, 5.2913] },
  { id: "pakistan", label: "Pakistan", location: [30.3753, 69.3451] },
  { id: "panama", label: "Panama", location: [8.5380, -80.7821] },
  { id: "philippines", label: "Philippines", location: [12.8797, 121.7740] },
  { id: "singapore", label: "Singapore", location: [1.3521, 103.8198] },
  { id: "south-africa", label: "South Africa", location: [-30.5595, 22.9375] },
  { id: "sri-lanka", label: "Sri Lanka", location: [7.8731, 80.7718] },
  { id: "switzerland", label: "Switzerland", location: [46.8182, 8.2275] },
  { id: "taiwan", label: "Taiwan", location: [23.6978, 120.9605] },
  { id: "thailand", label: "Thailand", location: [15.8700, 100.9925] },
  { id: "turkey", label: "Turkey", location: [38.9637, 35.2433] },
  { id: "uk", label: "UK", location: [55.3781, -3.4360] },
  { id: "usa", label: "USA", location: [37.0902, -95.7129] },
  { id: "vietnam", label: "Vietnam", location: [14.0583, 108.2772] },
];

const ROUTES = HUBS.filter(hub => hub.id !== "chennai").map(hub => ({
  id: `chennai-${hub.id}`,
  label: `Chennai ↔ ${hub.label}`,
  from: [13.0827, 80.2707] as [number, number],
  to: hub.location as [number, number],
}));

const NETWORK_STATS = [
  { value: 80, suffix: "+", label: "Global Destinations" },
  { value: 58, suffix: "+", label: "Operational Members" },
  { value: 270, suffix: "+", label: "Group Strength" },
];

const NETWORK_HIGHLIGHTS = [
  { label: "Multi-Industry Support", icon: Activity, detail: "Sector-Specific Logistics" },
  { label: "ISO 9001:2015 Certified", icon: ShieldCheck, detail: "Quality Management System" },
  { label: "India & International", icon: Globe2, detail: "Global Operations Network" },
];

const WORKFLOW_STEPS = [
  {
    num: "01",
    title: "End-to-End Supply Chain Support",
    sub: "Complete logistics coordination from origin to final destination with streamlined cargo movement and operational control.",
  },
  {
    num: "02",
    title: "Efficient Planning & Execution",
    sub: "Structured shipment planning and coordinated execution designed to meet timelines and operational requirements.",
  },
  {
    num: "03",
    title: "Integrated Warehousing & Dispatch",
    sub: "Optimized warehousing, storage, and dispatch operations ensuring efficient inventory flow and timely cargo movement.",
  },
  {
    num: "04",
    title: "Real-Time Process Visibility",
    sub: "Transparent logistics workflows and coordinated systems providing better shipment visibility and operational tracking.",
  },
  {
    num: "05",
    title: "Consistent & Timely Delivery",
    sub: "Reliable freight execution focused on safe cargo handling, timely delivery, and consistent logistics performance.",
  },
];

const WHY_POINTS = [
  "Global Freight Expertise",
  "Reliable International Network",
  "Industry-Compliant Operations",
  "Experienced Logistics Professionals",
  "Scalable Supply Chain Solutions",
];

// ============================================================================
// HELPER COMPONENTS
// ============================================================================

function Counter({ to }: { to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    const node = nodeRef.current;
    if (!node) return;
    const controls = animate(0, to, {
      duration: 2,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });
    return () => controls.stop();
  }, [to, isInView]);
  return <span ref={nodeRef}>0</span>;
}

function ScrollRevealText({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.1"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.98, 1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [30, 0, 0, -30]);
  const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], ["blur(12px)", "blur(0px)", "blur(0px)", "blur(12px)"]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      style={{ opacity, scale, y, filter: blur }}
      transition={{ duration: 1.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CinematicText({ text, delay = 0, className, spanClassName }: { text: string; delay?: number; className?: string; spanClassName?: string }) {
  return (
    <div className={className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: delay + (i * 0.02),
            ease: [0.2, 0.65, 0.3, 0.9]
          }}
          viewport={{ once: true }}
          className={`inline-block ${spanClassName || ""}`}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
}

function Hover3DCard({ children, className, delay = 0, initialX = 0, initialY = 0 }: { children: React.ReactNode, className?: string, delay?: number, initialX?: number, initialY?: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`[perspective:1000px] ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// MAIN VISUAL COMPONENTS
// ============================================================================

function Globe({ isMobile }: { isMobile?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const phiRef = useRef(3.31 + (new Date().getUTCHours() / 24) * 2 * Math.PI);
  const widthRef = useRef(0);

  const markers = useMemo(
    () =>
      HUBS.map((hub) => ({
        location: hub.location as [number, number],
        size: 0.04,
        id: hub.id,
      })),
    []
  );

  const arcs = useMemo(
    () =>
      ROUTES.map((route) => ({
        from: route.from as [number, number],
        to: route.to as [number, number],
        id: route.id,
        color: [0.23, 0.51, 0.96] as [number, number, number],
      })),
    []
  );

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    const fit = () => {
      const w = Math.max(320, container.clientWidth);
      widthRef.current = w;
      canvas.width = w * 2;
      canvas.height = w * 2;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${w}px`;
      globe?.update({ width: w * 2, height: w * 2 });
    };

    let globe: ReturnType<typeof createGlobe> | null = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: 1000,
      height: 1000,
      phi: 3.25,
      theta: 0.50,
      dark: 0.96,
      diffuse: 3.0,
      scale: 0.85,
      mapSamples: 25000,
      mapBrightness: 6.0,
      baseColor: [0.05, 0.1, 0.25],
      markerColor: [0.2, 0.5, 1],
      glowColor: [0.05, 0.1, 0.2],
      offset: isMobile ? [0, 150] : [-100, 200],
      markers,
      arcs,
      arcColor: [0.8, 0.8, 0.8],
      arcWidth: 0.8,
      arcHeight: 0.45,
      markerElevation: 0.04,
    });

    fit();

    const ro = new ResizeObserver(() => fit());
    ro.observe(container);

    let raf = 0;
    const animateRaf = () => {
      if (!dragging.current) {
        phiRef.current += 0.003;
      }
      phiRef.current += velocity.current;
      velocity.current *= 0.92;
      globe?.update({
        phi: phiRef.current,
        theta: 0.50,
      });
      raf = requestAnimationFrame(animateRaf);
    };
    animateRaf();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe?.destroy();
      globe = null;
    };
  }, [markers, arcs]);

  return (
    <div ref={containerRef} className="relative aspect-square w-full select-none">
      <canvas
        ref={canvasRef}
        className="h-full w-full cursor-grab touch-none"
        onPointerDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
          velocity.current = 0;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.style.cursor = "grabbing";
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          const dx = e.clientX - lastX.current;
          lastX.current = e.clientX;
          velocity.current = dx * 0.00035;
        }}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.style.cursor = "grab";
        }}
      />
      {HUBS.map((hub) => (
        <div
          key={hub.id}
          className="absolute"
          style={{
            positionAnchor: `--cobe-${hub.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            opacity: `var(--cobe-visible-${hub.id}, 0)`,
            transform: "translate(-50%, -12px)",
            transition: "opacity 300ms ease",
          } as React.CSSProperties}
        >
          <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 shadow-2xl backdrop-blur-xl">
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
              {hub.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}



// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function NetworkPage() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 25,
    restDelta: 0.001
  });

  const globeX = useTransform(smoothProgress, [0, 0.25], ["0vw", isMobile ? "0vw" : "32vw"]);
  const globeY = useTransform(smoothProgress, [0, 0.25], ["0vh", isMobile ? "-15vh" : "0vh"]);
  const globeScale = useTransform(smoothProgress, [0, 0.25], [isMobile ? 0.9 : 1.1, isMobile ? 0.6 : 0.75]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);
  const contentOpacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);

  return (
    <main ref={containerRef} className="relative min-h-[350vh] bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="fixed left-1/2 top-8 z-50 -translate-x-1/2">
        <AppleGlassNav
          items={NAV_LINKS}
          theme="light"
          logo={
            <Link href="/" className="flex items-center">
              <Image
                src="/mas_logo.webp"
                alt="Logo"
                width={200}
                height={50}
                className="h-9 w-30 object-contain transform scale-225 origin-centre"
                priority
              />
            </Link>
          }
        />
      </div>

      {/* 1. STICKY VISUAL LAYER */}
      <div className="fixed inset-0 h-screen w-full overflow-hidden pointer-events-none z-20">
        <motion.div
          style={{ x: globeX, y: globeY, scale: globeScale }}
          className="absolute inset-0 flex items-center justify-center translate-y-8 sm:translate-y-4"
        >
          <div className="w-full max-w-[800px] pointer-events-auto">
            <Globe isMobile={isMobile} />
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6 translate-y-8 sm:translate-y-4"
        >
          <div className="overflow-hidden mb-6">
            <CinematicText
              text="GLOBAL"
              delay={1.2}
              className="text-5xl sm:text-6xl md:text-[8rem] font-black uppercase tracking-tighter text-white leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            />
            <CinematicText
              text="LOGISTICS NETWORK"
              delay={1.6}
              className="text-5xl sm:text-6xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.8] drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
              spanClassName="text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-700"
            />
          </div>
        </motion.div>
      </div>

      {/* 2. SCROLLING CONTENT LAYER */}
      <div className="relative z-30 pt-[100vh]">
        <motion.div
          style={{ opacity: contentOpacity }}
          className="w-full lg:w-[50%] px-6 md:px-12 lg:px-20 pb-20 space-y-32"
        >

          {/* ── SECTION 1: GLOBAL REACH MAP ── */}
          <section className="pt-16 space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Global Reach Map</span>
              </div>
              <ScrollRevealText>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Connected Across{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Global Trade Routes</span>
                </h2>
              </ScrollRevealText>
              <ScrollRevealText delay={0.1}>
                <p className="text-zinc-400 text-base max-w-lg font-light leading-relaxed">
                  Our international network enables seamless cargo movement and supply chain coordination across key global markets.
                </p>
              </ScrollRevealText>
            </div>

            {/* Country Pills */}
            <ScrollRevealText delay={0.2}>
              <div className="flex flex-wrap gap-2">
                {HUBS.filter(h => h.id !== "chennai").map((hub, i) => (
                  <motion.div
                    key={hub.id}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.06, y: -2 }}
                    className="cursor-default group relative px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <span className="text-[11px] font-semibold tracking-wide text-zinc-400 group-hover:text-blue-300 transition-colors duration-300">
                      {hub.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollRevealText>

            {/* Animated route count badge */}
            <ScrollRevealText delay={0.3}>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl border border-blue-500/20 bg-blue-500/5">
                <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-sm font-semibold text-blue-300 tracking-wide">31 Active Trade Corridors from Chennai</span>
              </div>
            </ScrollRevealText>
          </section>

          {/* ── SECTION 2: OUR WORKING APPROACH ── */}
          <section className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Our Working Approach</span>
              </div>
              <ScrollRevealText>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  How We{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Work</span>
                </h2>
              </ScrollRevealText>
              <ScrollRevealText delay={0.1}>
                <p className="text-zinc-400 text-base max-w-lg font-light leading-relaxed">
                  We follow a structured logistics process focused on operational efficiency, shipment visibility, and dependable execution across every stage of the supply chain.
                </p>
              </ScrollRevealText>
            </div>

            {/* Workflow Cards */}
            <div className="space-y-4 [perspective:1000px]">
              {WORKFLOW_STEPS.map((step, i) => (
                <Hover3DCard
                  key={step.num}
                  initialX={-24}
                  delay={i * 0.08}
                  className="group relative flex gap-5 p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-blue-500/25 transition-colors duration-500 cursor-default"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  {/* Left accent bar */}
                  <div className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-blue-500/0 group-hover:bg-blue-500/60 transition-colors duration-500" />

                  {/* Step number */}
                  <div className="relative shrink-0 w-11 h-11 flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] group-hover:border-blue-500/40 group-hover:bg-blue-500/10 transition-all duration-500 group-hover:[transform:translateZ(40px)]">
                    <span className="text-[11px] font-black tracking-widest text-zinc-500 group-hover:text-blue-400 transition-colors duration-500">{step.num}</span>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 min-w-0 transition-all duration-500 group-hover:[transform:translateZ(30px)]">
                    <h4 className="text-white font-bold text-base mb-1.5 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all duration-400 leading-snug">{step.title}</h4>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-300 transition-colors duration-400">{step.sub}</p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="relative shrink-0 self-center text-zinc-700 group-hover:text-blue-500 transition-all duration-500 translate-x-0 group-hover:translate-x-1 group-hover:[transform:translateZ(50px)]">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Hover3DCard>
              ))}
            </div>
          </section>

          {/* ── SECTION 3: WHY MAS LOGISTICS ── */}
          <section className="space-y-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">Why MAS Logistics</span>
              </div>
              <ScrollRevealText>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                  Why Businesses Choose{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">MAS Logistics</span>
                </h2>
              </ScrollRevealText>
            </div>

            <div className="space-y-3 [perspective:1000px]">
              {WHY_POINTS.map((point, i) => (
                <Hover3DCard
                  key={point}
                  initialY={16}
                  delay={i * 0.07}
                  className="group flex items-center gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-blue-500/30 hover:bg-blue-500/5 transition-colors duration-400 cursor-default"
                >
                  {/* Check icon */}
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/60 transition-all duration-400 group-hover:[transform:translateZ(30px)]">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2.5 7.5l3 3 6-6" stroke="#60a5fa" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-zinc-300 font-semibold text-sm tracking-wide group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-indigo-300 transition-all duration-400 group-hover:[transform:translateZ(20px)]">{point}</span>
                  {/* Subtle number */}
                  <span className="ml-auto text-[10px] font-black tracking-widest text-zinc-700 group-hover:text-blue-600/60 transition-all duration-400 group-hover:[transform:translateZ(40px)]">0{i + 1}</span>
                </Hover3DCard>
              ))}
            </div>
          </section>

          {/* ── LUXURY METRICS DASHBOARD ── */}
          <section className="py-10 relative overflow-hidden">
            <div className="max-w-7xl w-full">
              <div className="text-left mb-16 relative">
                <div className="h-px w-24 mb-6 bg-gradient-to-r from-blue-500 to-transparent" />
                <h2 className="uppercase tracking-[0.4em] text-[10px] font-extrabold mb-4 text-blue-500/80">Global Presence</h2>
                <ScrollRevealText>
                  <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#E5E4E2] leading-tight">
                    A Strong Network Built for{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Global Logistics</span>
                  </h3>
                </ScrollRevealText>
                <ScrollRevealText delay={0.15}>
                  <p className="mt-5 text-zinc-400 text-base md:text-lg max-w-xl font-light leading-relaxed">
                    With an established operational base in India and a growing international logistics network, MAS Logistics delivers reliable supply chain solutions supported by industry expertise and trusted global partnerships.
                  </p>
                </ScrollRevealText>
              </div>

              {/* Primary Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative mb-20 border-b border-white/5 pb-20">
                <div className="hidden md:block absolute inset-y-0 left-1/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                <div className="hidden md:block absolute inset-y-0 left-2/3 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                {NETWORK_STATS.map((stat, i) => (
                  <div key={i} className="text-center group px-8">
                    <div className="relative inline-block mb-4">
                      <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="text-5xl md:text-6xl font-bold opacity-90 group-hover:scale-105 transition-transform duration-700 ease-out bg-clip-text text-transparent bg-gradient-to-b from-[#E5E4E2] via-blue-100 to-blue-400 tracking-tight">
                        <Counter to={stat.value} />
                        <span className="text-2xl md:text-3xl ml-1 align-top mt-1 inline-block font-medium">{stat.suffix}</span>
                      </div>
                    </div>
                    <p className="uppercase tracking-[0.2em] text-[10px] font-bold transition-colors text-zinc-500 group-hover:text-blue-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                {NETWORK_HIGHLIGHTS.map((item, i) => (
                  <ScrollRevealText key={i} delay={i * 0.05} className="lg:col-span-2">
                    <div className="relative overflow-hidden group p-8 rounded-3xl border border-white/5 bg-white/[0.01] transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 h-full">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                      <div className="relative z-10 flex flex-col gap-8">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/5 text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-500/30 group-hover:text-white transition-all duration-700 shadow-xl">
                          <item.icon size={26} strokeWidth={1.5} />
                        </div>
                        <div>
                          <h4 className="text-[#E5E4E2] font-bold text-xl tracking-tight mb-3 group-hover:text-white transition-colors duration-500">{item.label}</h4>
                          <p className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-bold leading-relaxed group-hover:text-zinc-300 transition-colors duration-500">{item.detail}</p>
                        </div>
                      </div>

                      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                  </ScrollRevealText>
                ))}
              </div>
            </div>
          </section>

        </motion.div>
      </div>
    </main>
  );
}