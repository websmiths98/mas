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
  { name: "Services", href: "/#section-services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

const HUBS = [
  { id: "chennai", label: "Chennai", location: [13.0827, 80.2707] },
  { id: "nyc", label: "New York", location: [40.7128, -74.006] },
  { id: "london", label: "London", location: [51.5074, -0.1278] },
  { id: "tokyo", label: "Tokyo", location: [35.6762, 139.6503] },
  { id: "singapore", label: "Singapore", location: [1.3521, 103.8198] },
  { id: "dubai", label: "Dubai", location: [25.2048, 55.2708] },
];

const ROUTES = [
  { id: "chennai-nyc", label: "Chennai ↔ New York", from: [13.0827, 80.2707], to: [40.7128, -74.006] },
  { id: "chennai-london", label: "Chennai ↔ London", from: [13.0827, 80.2707], to: [51.5074, -0.1278] },
  { id: "chennai-tokyo", label: "Chennai ↔ Tokyo", from: [13.0827, 80.2707], to: [35.6762, 139.6503] },
  { id: "chennai-singapore", label: "Chennai ↔ Singapore", from: [13.0827, 80.2707], to: [1.3521, 103.8198] },
  { id: "chennai-dubai", label: "Chennai ↔ Dubai", from: [13.0827, 80.2707], to: [25.2048, 55.2708] },
];

const SECTIONS = [
  {
    tag: "Network Architecture",
    title: "Global Freight Grid",
    desc: "A high-performance tapestry of strategic airline partnerships and intercontinental hubs, engineered for surgical precision.",
    blocks: [
      { title: "Air Freight", text: "Fast, time-sensitive cargo solutions through strategic airline partnerships." },
      { title: "Ocean Freight", text: "Efficient FCL and LCL movement through major global seaports." },
    ]
  },
  {
    tag: "Intelligence",
    title: "Designed for Velocity",
    desc: "We connect strategic freight corridors through intelligent routing and operational precision.",
    blocks: [
      { title: "Asia Network", text: "Strong connectivity across Asian manufacturing and sourcing markets." },
      { title: "Middle East Hubs", text: "Strategic freight support connecting India with GCC trade hubs." },
    ]
  },
  {
    tag: "Global Operations",
    title: "Strategic Routes",
    desc: "Our primary intercontinental lanes connecting Chennai to the world's most vital economic centers.",
    blocks: ROUTES.map(r => ({ 
      title: r.label.split(' ↔ ')[1], 
      text: `Direct operational lane: ${r.label}` 
    }))
  }
];

const CAPABILITIES = [
  "Air Freight", 
  "Ocean Freight", 
  "Customs Brokerage", 
  "Project Cargo", 
  "Warehousing", 
  "Distribution"
];

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
          viewport={{ once: false }}
          className={`inline-block ${spanClassName || ""}`}
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
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
      phi: 3.89,
      theta: 0.50,
      dark: 0.96, 
      diffuse: 3.0,
      scale: 0.85, 
      mapSamples: 25000, 
      mapBrightness: 6.0, 
      baseColor:  [0.05, 0.1, 0.25], 
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
              text="LOGISTICS GRID" 
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
          className="w-full lg:w-[50%] px-6 md:px-12 lg:px-20 pb-20 space-y-24"
        >
          {/* Sections */}
          {SECTIONS.map((sec) => (
            <section key={sec.title} className="space-y-12">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-blue-500" />
                  <span className="text-[10px] font-bold tracking-[0.4em] text-blue-500 uppercase">{sec.tag}</span>
                </div>
                <ScrollRevealText>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">{sec.title}</h2>
                </ScrollRevealText>
                <ScrollRevealText delay={0.1}>
                  <p className="text-zinc-500 text-base md:text-lg max-w-lg font-light leading-relaxed">{sec.desc}</p>
                </ScrollRevealText>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sec.blocks.map(block => (
                  <div key={block.title} className="p-8 rounded-[2rem] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                    <h4 className="text-white font-bold text-lg mb-3 group-hover:text-blue-400 transition-colors">{block.title}</h4>
                    <p className="text-sm text-zinc-500 leading-relaxed">{block.text}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Capabilities */}
          <section className="space-y-12">
            <div className="h-px w-full bg-white/5" />
            <ScrollRevealText>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {CAPABILITIES.map(cap => (
                  <div key={cap} className="px-6 py-4 rounded-xl border border-white/5 bg-white/[0.01] text-center">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">{cap}</span>
                  </div>
                ))}
              </div>
            </ScrollRevealText>
          </section>

          {/* Luxury Metrics Dashboard */}
          <section className="py-24 relative overflow-hidden">
              <div className="max-w-7xl w-full">
                  <div className="text-left mb-16 relative">
                      <div className="h-px w-24 mb-6 bg-gradient-to-r from-blue-500 to-transparent" />
                      <h2 className="uppercase tracking-[0.4em] text-[10px] font-extrabold mb-4 text-blue-500/80">Global Logistics Infrastructure</h2>
                      <ScrollRevealText>
                        <h3 className="text-3xl md:text-5xl font-bold tracking-tight text-[#E5E4E2] leading-tight">
                          Global Network <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Strength</span>
                        </h3>
                      </ScrollRevealText>
                  </div>

                  {/* Primary Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 relative mb-20 border-b border-white/5 pb-20">
                      {/* Vertical Dividers */}
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

                  {/* Highlights Grid - Redesigned 6-column layout with motion and luxury gradients */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                      {NETWORK_HIGHLIGHTS.map((item, i) => (
                        <ScrollRevealText key={i} delay={i * 0.05} className="lg:col-span-2">
                          <div 
                              className="relative overflow-hidden group p-8 rounded-3xl border border-white/5 bg-white/[0.01] transition-all duration-700 hover:-translate-y-2 hover:border-blue-500/30 h-full"
                          >
                              {/* Multi-linear Gradient Background on Hover */}
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

                              {/* Corner Glow Effect */}
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