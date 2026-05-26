"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Plane, Ship, Truck, Warehouse,
  Globe, Users, Shield, MapPin,
  ChevronRight, Activity, Zap, Sparkles, ArrowUpRight
} from "lucide-react";

const OVERVIEW_BLOCKS = [
  { title: "Air Freight", description: "Strategic airline partnerships for time-critical cargo.", icon: <Plane /> },
  { title: "Ocean Freight", description: "Global FCL/LCL movement through major seaports.", icon: <Ship /> },
  { title: "Inland Tech", description: "Domestic cross-border uninterrupted cargo movement.", icon: <Truck /> },
  { title: "Smart Warehousing", description: "Scalable inventory systems for supply continuity.", icon: <Warehouse /> },
];

const METRICS = [
  { label: "Destinations", value: "80+", icon: <MapPin className="w-5 h-5" /> },
  { label: "Members", value: "58+", icon: <Users className="w-5 h-5" /> },
  { label: "Strength", value: "270+", icon: <Shield className="w-5 h-5" /> },
];

const REGIONS = [
  { name: "Asia-Pacific Hubs", code: "APAC", nodes: "32" },
  { name: "Trans-Atlantic Corridors", code: "ATL", nodes: "24" },
  { name: "Middle-East Gateways", code: "MEA", nodes: "18" },
];

export function NetworkContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -120]), { stiffness: 100, damping: 30 });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div ref={containerRef} className="relative min-h-screen w-full overflow-hidden bg-[#030412] text-white">
      {/* --- MONOCHROME ANIMATED BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Drifting cyan aurora blobs (single hue, varied opacity) */}
        <motion.div
          style={{ y: blob1Y }}
          animate={{ x: [0, 60, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-60 -left-40 h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.35),transparent_60%)] blur-3xl"
        />
        <motion.div
          style={{ y: blob2Y }}
          animate={{ x: [0, -60, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-60 h-[800px] w-[800px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.25),transparent_60%)] blur-3xl"
        />
        <motion.div
          style={{ y: blob3Y }}
          animate={{ x: [0, 40, 0], scale: [1, 1.25, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.2),transparent_70%)] blur-3xl"
        />

        {/* Animated concentric rings (radar pulse) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15"
              style={{ width: 400, height: 400 }}
              animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
              transition={{ duration: 6, repeat: Infinity, delay: i * 2, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* Twinkling starfield */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-px w-px rounded-full bg-cyan-200"
              style={{
                top: `${(i * 37) % 100}%`,
                left: `${(i * 53) % 100}%`,
              }}
              animate={{ opacity: [0.1, 0.9, 0.1], scale: [1, 1.5, 1] }}
              transition={{ duration: 3 + (i % 4), repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(3,4,18,0.92))]" />
      </div>

      {/* --- CONTENT LAYER --- */}
      <motion.div style={{ y: smoothY }} className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-32">

        {/* 1. METRICS */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-24 flex flex-wrap items-center justify-center gap-3 md:gap-4"
        >
          {METRICS.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i, type: "spring", stiffness: 120 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="group relative flex items-center gap-3 rounded-full border border-cyan-400/15 bg-white/[0.03] px-5 py-2.5 backdrop-blur-2xl"
            >
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 opacity-0 blur-md transition-opacity group-hover:opacity-100" />
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/20">
                {metric.icon}
              </div>
              <div className="relative flex items-baseline gap-2">
                <span className="bg-gradient-to-b from-white to-cyan-100/60 bg-clip-text text-xl font-bold tracking-tight text-transparent">
                  {metric.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.22em] text-cyan-100/50">
                  {metric.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 2. HERO HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mb-32 text-center"
        >
          <div className="mb-8 flex justify-center">
            <div className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full border border-cyan-400/25 bg-cyan-400/5 px-5 py-2 backdrop-blur-xl">
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
              />
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              <span className="relative text-[11px] font-medium uppercase tracking-[0.25em] text-cyan-100">
                Vector: Orbital · Node: Active
              </span>
            </div>
          </div>

          <h1 className="relative text-6xl font-bold leading-[0.9] tracking-tighter md:text-8xl lg:text-[9rem]">
            <span className="block bg-gradient-to-b from-white via-cyan-50 to-cyan-100/20 bg-clip-text text-transparent">
              CORE
            </span>
            <span className="relative mt-2 inline-block">
              <motion.span
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-to-b from-cyan-200 to-cyan-500 bg-clip-text text-transparent blur-2xl"
              >
                ENGINE.
              </motion.span>
              <span className="relative bg-gradient-to-b from-cyan-100 via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                ENGINE.
              </span>
              <Sparkles className="absolute -right-10 -top-2 h-7 w-7 animate-pulse text-cyan-300/80" />
            </span>
          </h1>

          <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-cyan-50/55 md:text-lg">
            Transforming standard freight into a high-velocity digital ecosystem.
          </p>

          <div className="mx-auto mt-12 h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        </motion.div>

        {/* 3. CARD GRID — monochrome with animated edge glow */}
        <div className="mb-32 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW_BLOCKS.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl border border-cyan-400/10 bg-gradient-to-b from-white/[0.05] via-white/[0.02] to-transparent p-7 backdrop-blur-2xl transition-all duration-500 hover:border-cyan-400/40"
            >
              {/* Animated rotating glow */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-1 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(34,211,238,0.4), transparent 30%)",
                }}
              />
              <div className="absolute inset-[1px] rounded-3xl bg-[#06081a]/95" />

              {/* Top edge highlight */}
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              {/* Animated corner glow */}
              <motion.div
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-400/40 blur-2xl"
              />

              {/* Icon plate */}
              <div className="relative mb-7">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/40 to-cyan-600/10 p-[1.5px]">
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#06081a]/95 backdrop-blur-xl">
                    {React.cloneElement(block.icon as React.ReactElement<any>, { className: "w-7 h-7 text-cyan-200" })}
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl"
                />
              </div>

              <h3 className="relative mb-3 text-xl font-semibold tracking-tight text-white">
                {block.title}
              </h3>
              <p className="relative text-sm leading-relaxed text-cyan-50/55">
                {block.description}
              </p>

              <div className="relative mt-7 flex items-center justify-between border-t border-cyan-400/10 pt-5">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-100/40">
                  0{i + 1} / 04
                </span>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-400/10 transition-all duration-300 group-hover:bg-cyan-400/30">
                  <ArrowUpRight className="h-4 w-4 text-cyan-200/60 transition-all duration-300 group-hover:rotate-12 group-hover:text-cyan-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. CONNECTIVITY SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2rem] border border-cyan-400/15 bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent p-8 backdrop-blur-2xl md:p-14"
        >
          {/* Animated glow orbs */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-cyan-400/20 blur-2xl"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity }}
            className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-cyan-400/15 blur-2xl"
          />

          {/* Scanline */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]">
            <motion.div
              animate={{ y: ["-10%", "110%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute inset-x-0 h-32 bg-gradient-to-b from-transparent via-cyan-400/[0.1] to-transparent"
            />
          </div>

          <div className="relative mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/15 ring-1 ring-cyan-300/30 backdrop-blur-xl">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Globe className="h-6 w-6 text-cyan-200" />
                  </motion.div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 rounded-2xl bg-cyan-400/30 blur-xl"
                />
              </div>
              <div>
                <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-cyan-300/80">
                  Network Operations
                </div>
                <h2 className="mt-1 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                  Global Uplink
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-1.5 backdrop-blur-xl">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
              </span>
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan-100">
                All Systems Live
              </span>
            </div>
          </div>

          <div className="relative space-y-3">
            {REGIONS.map((region, i) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
                className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-cyan-400/10 bg-gradient-to-r from-white/[0.04] to-transparent px-6 py-5 transition-all duration-300 hover:border-cyan-400/40"
              >
                {/* Sliding shine on hover */}
                <motion.div
                  className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent transition-all duration-700 group-hover:left-full"
                />

                <div className="relative flex items-center gap-5">
                  <div className="text-[10px] font-mono font-bold tracking-widest text-cyan-300/70">
                    {region.code}
                  </div>
                  <div className="h-8 w-px bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent" />
                  <div className="flex items-center gap-3">
                    <Activity className="h-4 w-4 text-cyan-400/80" />
                    <span className="text-base font-medium text-white/90">{region.name}</span>
                  </div>
                </div>

                <div className="relative flex items-center gap-5">
                  <div className="hidden items-baseline gap-1.5 md:flex">
                    <span className="text-lg font-semibold text-cyan-100">{region.nodes}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-100/40">nodes</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-cyan-300/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-200" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="relative mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-cyan-400/10 pt-6 text-[10px] uppercase tracking-[0.25em] text-cyan-100/40">
            <div className="flex items-center gap-2">
              <Zap className="h-3 w-3 text-cyan-400" />
              Live Sync
            </div>
            <div>24/7 Operations</div>
            <div>Real-Time Visibility</div>
            <div className="ml-auto font-mono text-cyan-300/60">v2.4.0</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

