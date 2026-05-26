"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
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
  const phiRef = useRef(4.7);
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
      phi: 4.39,
      theta: -0.50,
      dark: 0.00,
      diffuse: 1.5,
      scale: 0.95,
      mapSamples: 21000,
      mapBrightness: 12.0,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: [1, 1, 1],
      offset: [180, -200],
      markers,
      arcs,
      arcColor: [0.23, 0.51, 0.96],
      arcWidth: 0.75,
      arcHeight: 0.50,
      markerElevation: 0.03,
    });

    fit();

    const ro = new ResizeObserver(() => fit());
    ro.observe(container);

    let raf = 0;
    const animate = () => {
      if (!dragging.current) {
        phiRef.current += 0.005;
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

      {/* Hub labels */}
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
              transition: "opacity 180ms linear, filter 180ms linear",
              filter: `blur(calc((1 - var(--cobe-visible-${hub.id}, 0)) * 4px))`,
            } as React.CSSProperties
          }
        >
          <div className="rounded-full border border-white/70 bg-white/90 px-3 py-1.5 shadow-lg backdrop-blur-md">
            <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-900">
              {hub.label}
            </span>
          </div>
        </div>
      ))}

      {/* Route labels / plane icons */}
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
              transform: "translate(-50%, -50%)",
              transition: "opacity 180ms linear, filter 180ms linear",
              filter: `blur(calc((1 - var(--cobe-visible-${route.id}, 0)) * 4px))`,
            } as React.CSSProperties
          }
        >
          <div className="rounded-full border border-blue-400/30 bg-blue-500/10 px-2.5 py-2 shadow-[0_0_18px_rgba(59,130,246,0.35)] backdrop-blur-md">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5 fill-blue-500"
              aria-hidden="true"
            >
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function NetworkPage() {
  return (
    <main className="page-container-fixed text-[#E5E4E2]" style={{ background: 'radial-gradient(circle at center, #111827 0%, #020617 100%)' }}>
      <div className="fixed left-1/2 top-8 z-50 w-auto -translate-x-1/2">
        <AppleGlassNav items={NAV_LINKS} theme="dark" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 pt-24 text-left">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-4 text-3xl md:text-4xl font-extrabold text-white tracking-tight"
        >
          Network
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="max-w-2xl text-base text-zinc-400 md:text-lg"
        >
          A real-time digital twin of global logistics routes, hubs, and movement.
        </motion.p>
      </section>

      <section className="content-flex-center px-6 pb-12">
        <div className="relative w-full max-w-7xl h-full flex items-center justify-end">
          <div className="w-full max-w-[500px] md:max-w-[600px] lg:max-w-[700px]">
            <Globe />
          </div>
        </div>
      </section>


    </main>
  );
}