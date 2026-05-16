"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/network" },
  { name: "Industries", href: "/industry" },
  { name: "About us", href: "/about" },
];

type Hub = {
  id: string;
  label: string;
  location: [number, number];
};

type Route = {
  id: string;
  from: [number, number];
  to: [number, number];
};

const HUBS: Hub[] = [
  { id: "chennai", label: "Chennai", location: [13.0827, 80.2707] },
  { id: "nyc", label: "New York", location: [40.7128, -74.006] },
  { id: "london", label: "London", location: [51.5074, -0.1278] },
  { id: "tokyo", label: "Tokyo", location: [35.6762, 139.6503] },
  { id: "singapore", label: "Singapore", location: [1.3521, 103.8198] },
  { id: "dubai", label: "Dubai", location: [25.2048, 55.2708] },
];

const ROUTES: Route[] = [
  { id: "chennai-nyc", from: [13.0827, 80.2707], to: [40.7128, -74.006] },
  { id: "chennai-london", from: [13.0827, 80.2707], to: [51.5074, -0.1278] },
  { id: "chennai-tokyo", from: [13.0827, 80.2707], to: [35.6762, 139.6503] },
  { id: "chennai-singapore", from: [13.0827, 80.2707], to: [1.3521, 103.8198] },
  { id: "chennai-dubai", from: [13.0827, 80.2707], to: [25.2048, 55.2708] },
];

function Globe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const initialPhi = 4.39 + (new Date().getUTCHours() / 24) * 2 * Math.PI;
  const phiRef = useRef(initialPhi);
  const widthRef = useRef(0);

  const [ready, setReady] = useState(false);

  const markers = useMemo(
    () =>
      HUBS.map((hub) => ({
        location: hub.location,
        size: 0.04,
        id: hub.id,
      })),
    []
  );

  const arcs = useMemo(
    () =>
      ROUTES.map((route) => ({
        from: route.from,
        to: route.to,
        id: route.id,
        color: [0.23, 0.51, 0.96] as [number, number, number],
      })),
    []
  );

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    setReady(true);

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
      phi: 4.39 + (new Date().getUTCHours() / 24) * 2 * Math.PI,
      theta: -0.50,
      dark: 1, 
      diffuse: 1.5,
      scale: 0.75, 
      mapSamples: 25000, 
      mapBrightness: 6.0, 
      baseColor: [0.15, 0.4, 0.15], 
      markerColor: [1, 1, 1],
      glowColor: [0.1, 0.3, 0.8], 
      offset: [180, -200],
      markers,
      arcs,
      arcColor: [0.3, 0.6, 1],
      arcWidth: 0.8,
      arcHeight: 0.45,
      markerElevation: 0.04,
    });

    fit();

    const ro = new ResizeObserver(() => fit());
    ro.observe(container);

    let raf = 0;
    const animate = () => {
      if (!dragging.current) {
        phiRef.current += 0.003; // Slower, more majestic rotation
      }

      phiRef.current += velocity.current;
      velocity.current *= 0.92;

      globe?.update({
        phi: phiRef.current,
        theta: 0.25,
      });

      raf = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      globe?.destroy();
      globe = null;
    };
  }, [markers, arcs]);

  return (
    <div
      ref={containerRef}
      className="relative ml-auto aspect-square w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px] select-none"
    >
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
        onPointerCancel={(e) => {
          dragging.current = false;
          e.currentTarget.style.cursor = "grab";
        }}
      />

      {HUBS.map((hub) => (
        <div
          key={hub.id}
          className="absolute"
          style={
            {
              positionAnchor: `--cobe-${hub.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              opacity: `var(--cobe-visible-${hub.id}, 0)`,
              transform: "translate(-50%, -12px)",
              transition: "opacity 300ms ease, filter 300ms ease",
              filter: `blur(calc((1 - var(--cobe-visible-${hub.id}, 0)) * 8px))`,
            } as React.CSSProperties
          }
        >
          <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 shadow-2xl backdrop-blur-xl">
            <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">
              {hub.label}
            </span>
          </div>
        </div>
      ))}

      {ROUTES.map((route) => (
        <div
          key={route.id}
          className="absolute"
          style={
            {
              positionAnchor: `--cobe-${route.id}`,
              bottom: "anchor(top)",
              left: "anchor(center)",
              opacity: `var(--cobe-visible-${route.id}, 0)`,
              transform: "translate(-50%, -50%) scale(0.8)",
              transition: "opacity 300ms ease",
            } as React.CSSProperties
          }
        >
          <div className="rounded-full border border-blue-500/20 bg-blue-500/10 p-2 shadow-[0_0_25px_rgba(59,130,246,0.2)] backdrop-blur-md">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-blue-400" aria-hidden="true">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

const OVERVIEW_BLOCKS = [
  {
    title: "Air Freight Connectivity",
    description: "Fast and time-sensitive cargo solutions through strategic airline partnerships and international airport connectivity.",
  },
  {
    title: "Ocean Freight Operations",
    description: "Efficient FCL, LCL, breakbulk, and project cargo movement through major global seaports.",
  },
  {
    title: "Inland Transportation",
    description: "Integrated domestic and cross-border transportation support for uninterrupted cargo movement.",
  },
  {
    title: "Warehouse & Distribution",
    description: "Scalable warehousing and distribution systems designed to support inventory flow and supply chain continuity.",
  },
];

const CONNECTIVITY_BLOCKS = [
  {
    title: "Asia Trade Network",
    description: "Strong operational connectivity across Asian manufacturing and sourcing markets.",
  },
  {
    title: "Middle East Operations",
    description: "Strategic freight support connecting India with major Middle East trade hubs.",
  },
  {
    title: "Europe & Global Destinations",
    description: "Reliable international shipment coordination through global freight forwarding associates.",
  },
];

const CAPABILITIES = [
  "Air Freight",
  "Ocean Freight",
  "Customs Brokerage",
  "Project Cargo",
  "Breakbulk & ODC",
  "Warehousing",
  "Distribution",
  "Cargo Visibility",
];

const METRICS = [
  "80+ Global Destinations",
  "58+ Operational Members",
  "270+ Group Strength",
  "Multi-Industry Support",
  "ISO 9001:2015 Certified",
  "India & International Operations",
];

export default function NetworkPage() {
  return (
    <main
      className="relative min-h-screen text-[#E5E4E2]"
      style={{ background: 'radial-gradient(ellipse at bottom left, #020c1b 0%, #010409 60%, #000000 100%)' }}
    >
      <div className="fixed left-1/2 top-8 z-50 w-auto -translate-x-1/2">
        <AppleGlassNav items={NAV_LINKS} theme="dark" />
      </div>

      <div className="flex flex-col lg:flex-row w-full pt-24">
        {/* Left Column: Flowing Content */}
        <div className="w-full lg:w-[55%] px-6 md:px-12 lg:px-20 pb-32">
          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-sm font-bold tracking-[0.3em] text-blue-400 uppercase mb-4">Global Network Overview</h1>
              <h2 className="text-3xl md:text-5xl font-semibold text-white mb-6 leading-tight">
                Integrated Global Freight & <br /> Supply Chain Operations
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-12">
                Our logistics network supports businesses operating across multiple industries and international markets.
                Through established carrier partnerships, regional operational support, and coordinated freight
                management systems, MAS Logistics delivers reliable cargo movement across air, ocean, and inland
                transportation networks.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {OVERVIEW_BLOCKS.map((block, i) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all duration-300"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors">{block.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{block.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-sm font-bold tracking-[0.3em] text-blue-400 uppercase mb-4">International Connectivity</h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Connected to Global Trade Markets</h2>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl mb-10">
                Our international logistics network supports cargo movement across Asia, the Middle East, Europe,
                and other major global trade regions through established freight forwarding partnerships and
                overseas operational associates.
              </p>
            </motion.div>

            <div className="space-y-4">
              {CONNECTIVITY_BLOCKS.map((block, i) => (
                <motion.div
                  key={block.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col md:flex-row md:items-center gap-4 p-6 rounded-2xl border border-white/5 bg-gradient-to-r from-white/[0.02] to-transparent"
                >
                  <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                  <div>
                    <h3 className="text-white font-medium mb-1">{block.title}</h3>
                    <p className="text-zinc-500 text-sm">{block.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-sm font-bold tracking-[0.3em] text-blue-400 uppercase mb-4">Global Freight Capabilities</h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-8">Comprehensive Freight Management Capabilities</h2>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {CAPABILITIES.map((cap, i) => (
                <motion.div
                  key={cap}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-zinc-300"
                >
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm font-medium">{cap}</span>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-zinc-500 text-sm leading-relaxed border-l-2 border-blue-500/30 pl-6 italic"
            >
              MAS Logistics manages complex freight operations through coordinated logistics planning,
              shipment visibility, documentation support, and carrier management systems designed for
              international trade efficiency.
            </motion.p>
          </section>

          <section className="mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h1 className="text-sm font-bold tracking-[0.3em] text-blue-400 uppercase mb-4">Network Strength Metrics</h1>
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-10">Global Network Strength</h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {METRICS.map((metric, i) => (
                <motion.div
                  key={metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center md:text-left"
                >
                  <div className="text-2xl md:text-3xl font-bold text-white mb-2 tabular-nums">
                    {metric.split(' ')[0]}
                  </div>
                  <div className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-blue-500/80">
                    {metric.split(' ').slice(1).join(' ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Globe (Sticky) */}
        <div className="hidden lg:flex w-[45%] h-screen sticky top-0 items-center justify-center p-12 pointer-events-none">
          <div className="relative w-full aspect-square max-w-[600px] opacity-90 mix-blend-screen pointer-events-auto">
            <Globe />
          </div>
        </div>
      </div>
    </main>
  );
}
