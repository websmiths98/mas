"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import createGlobe from "cobe";

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

export function NetworkVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const dragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const phiRef = useRef(4.7);
  const widthRef = useRef(0);

  const [ready, setReady] = useState(false);

  const markers = useMemo(() => HUBS.map((hub) => ({
    location: hub.location,
    size: 0.04,
    id: hub.id,
  })), []);

  const arcs = useMemo(() => ROUTES.map((route) => ({
    from: route.from,
    to: route.to,
    id: route.id,
    color: [0.23, 0.51, 0.96] as [number, number, number],
  })), []);

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
      dark: 1,
      diffuse: 1.2,
      scale: 0.95,
      mapSamples: 25000,
      mapBrightness: 6.0,
      baseColor: [0.05, 0.1, 0.25],
      markerColor: [0.2, 0.5, 1],
      glowColor: [0.05, 0.1, 0.2],
      offset: [180, -200],
      markers,
      arcs,
      arcColor: [0.23, 0.51, 0.96],
      arcWidth: 0.8,
      arcHeight: 0.45,
      markerElevation: 0.04,
    });

    fit();
    const ro = new ResizeObserver(() => fit());
    ro.observe(container);

    let raf = 0;
    const animate = () => {
      if (!dragging.current) phiRef.current += 0.003;
      phiRef.current += velocity.current;
      velocity.current *= 0.92;
      globe?.update({ phi: phiRef.current, theta: 0.25 });
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
    <div className="hidden lg:flex w-[45%] h-screen sticky top-0 items-center justify-center p-12 pointer-events-none">
      <div ref={containerRef} className="relative w-full aspect-square max-w-[600px] opacity-90 mix-blend-screen pointer-events-auto select-none">
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
          <div key={hub.id} className="absolute" style={{
            positionAnchor: `--cobe-${hub.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            opacity: `var(--cobe-visible-${hub.id}, 0)`,
            transform: "translate(-50%, -12px)",
            transition: "opacity 300ms ease, filter 300ms ease",
            filter: `blur(calc((1 - var(--cobe-visible-${hub.id}, 0)) * 8px))`,
          } as React.CSSProperties}>
            <div className="rounded-full border border-white/20 bg-black/40 px-3 py-1.5 shadow-2xl backdrop-blur-xl">
              <span className="whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.3em] text-white/90">{hub.label}</span>
            </div>
          </div>
        ))}

        {ROUTES.map((route) => (
          <div key={route.id} className="absolute" style={{
            positionAnchor: `--cobe-${route.id}`,
            bottom: "anchor(top)",
            left: "anchor(center)",
            opacity: `var(--cobe-visible-${route.id}, 0)`,
            transform: "translate(-50%, -50%) scale(0.8)",
            transition: "opacity 300ms ease",
          } as React.CSSProperties}>
            <div className="rounded-full border border-blue-500/20 bg-blue-500/10 p-2 shadow-[0_0_25px_rgba(59,130,246,0.2)] backdrop-blur-md">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-blue-400"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" /></svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
