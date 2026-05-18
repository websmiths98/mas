"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

/* ---------------- Custom Icon Asset Wrappers ---------------- */
const IconWrap = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
    {children}
  </svg>
);

const IconBox = ({ className }: { className?: string }) => (
  <IconWrap className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </IconWrap>
);

const IconGlobal = ({ className }: { className?: string }) => (
  <IconWrap className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </IconWrap>
);

const SECTIONS = [
  {
    id: "domestic",
    counter: "1/3",
    title: "Unified domestic shipping",
    icon: IconBox,
    bgGradient: "from-[#b4d2ff] via-[#b6bdff] to-[#d6bcff]",
    accentText: "text-[#3b82f6]",
    subContainers: [
      {
        title: "Transport Logistics",
        detail: "Reliable transport logistics solutions supported by a strong carrier network and efficient route planning designed to ensure safety, consistency, and timely delivery.",
        imageSrc: "/mas_logo.webp"
      },
      {
        title: "Procurement Logistics",
        detail: "Managing the seamless flow of goods from suppliers to destinations. We oversee planning, execution, and monitoring across warehousing, storage, and internal transit.",
        imageSrc: "/mas_logo.webp"
      },
      {
        title: "Outbound Logistics",
        detail: "A strong focus on reliability, timely delivery, and operational control. From warehouse dispatch to final market delivery, we ensure finished goods reach destinations efficiently.",
        imageSrc: "/mas_logo.webp"
      }
    ]
  },
  {
    id: "global",
    counter: "2/3",
    title: "Cross-border global shipping",
    sectionHeading: "Freight & Supply Chain Solutions :",
    sectionDescription: "At MAS Logistics, we provide reliable and efficient logistics solutions designed to support businesses across global markets. Our services are built around flexibility, operational efficiency, and dependable execution, helping businesses manage the movement of goods with greater control and confidence. From international freight forwarding to warehousing and specialized cargo handling, we deliver solutions tailored to meet diverse logistics and supply chain requirements.",
    icon: IconGlobal,
    bgGradient: "from-[#a7f3d0] via-[#86efac] to-[#6ee7b7]",
    accentText: "text-[#059669]",
    subContainers: [
      { 
        title: "Air Freight", 
        detail: "Our air freight services are designed to support time-sensitive and high-priority shipments across international markets. Through strong partnerships with leading global carriers, we ensure fast, secure, and reliable cargo movement with smooth coordination at every stage. Whether it is urgent deliveries or scheduled freight operations, we focus on maintaining speed, accuracy, and operational efficiency.", 
        features: ["Priority & express shipments", "Global carrier network", "Secure cargo handling", "Time-critical delivery support"],
        imageSrc: "/mas_logo.webp" 
      },
      { 
        title: "Sea Freight", 
        detail: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling Full Container Load (FCL) or Less than Container Load (LCL) shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks. Our focus remains on timely coordination, shipment visibility, and reliable delivery across international trade routes.", 
        features: ["FCL and LCL shipments", "Competitive global routing", "Strong port connectivity", "End-to-end shipment visibility"],
        imageSrc: "/mas_logo.webp" 
      }
    ]
  },
  {
    id: "fulfillment",
    counter: "3/3",
    title: "Advanced AI Fulfillment",
    icon: IconBox,
    bgGradient: "from-[#ffe4e6] via-[#fecdd3] to-[#fda4af]",
    accentText: "text-[#e11d48]",
    subContainers: [
      { 
        title: "Warehousing", 
        detail: "Our warehousing and distribution solutions are designed to support efficient inventory management and smooth supply chain operations. With scalable warehousing capabilities and structured storage systems, we help businesses improve operational efficiency, streamline dispatch activities, and reduce logistics-related costs.", 
        features: ["Inventory management support", "Distribution and dispatch handling", "Scalable storage solutions", "Cost-efficient operations"],
        imageSrc: "/mas_logo.webp" 
      },
      { 
        title: "Project / ODC Cargo", 
        detail: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently, ensuring smooth coordination from planning to execution and final delivery.", 
        features: ["Heavy and oversized cargo handling", "Route planning and coordination", "Specialized equipment support", "End-to-end project execution"],
        imageSrc: "/mas_logo.webp" 
      }
    ]
  }
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/network" },
  { name: "Industries", href: "/industry" },
  { name: "About us", href: "/about" },
];

export default function ServicesPage() {
  const [activeIdx, setActiveIdx] = useState(0);
  const isAnimating = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current) return;

    if (e.deltaY > 20 && activeIdx < SECTIONS.length - 1) {
      isAnimating.current = true;
      setActiveIdx((prev) => prev + 1);
    } else if (e.deltaY < -20 && activeIdx > 0) {
      isAnimating.current = true;
      setActiveIdx((prev) => prev - 1);
    }
  };

  const currentSection = SECTIONS[activeIdx];
  const SectionIcon = currentSection.icon;

  return (
    <main
      onWheel={handleWheel}
      className="relative w-full h-screen bg-gradient-to-tr from-[#f3f8fe] via-[#f4f3ff] to-[#fbf7ff] text-[#2d3748] overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Absolute Navbar Component */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max">
        <AppleGlassNav items={NAV_LINKS} theme="light" />
      </div>

      {/* HEADER SECTION */}
      <div className="w-full pt-28 px-12 pb-4 max-w-7xl mx-auto flex flex-col gap-2 shrink-0 z-20">
        <h1 className="text-3xl font-bold tracking-tight text-[#1c2434] max-w-4xl leading-tight">
          Why is Shiprocket the Trusted Partner for Scaling eCommerce Businesses?
        </h1>
        <p className="text-xs text-[#5a6578] max-w-4xl leading-relaxed font-normal">
          We're more than a shipping partner. Our tech solutions drive comprehensive e-commerce growth — streamlining operations, from marketing and warehousing to global expansion.
        </p>
      </div>

      {/* CORE WRAPPER CONTAINER SLOT */}
      <div className="relative w-full flex-1 max-w-7xl mx-auto px-12 pb-16 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSection.id}
            initial={{ y: "100%", scale: 1, opacity: 0.9 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 0, scale: 0.92, opacity: 0.4 }}
            onAnimationComplete={() => { isAnimating.current = false; }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-x-12 top-0 bottom-4 rounded-[2rem] bg-gradient-to-b ${currentSection.bgGradient} flex flex-col p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden`}
            style={{ zIndex: activeIdx }}
          >
            {/* Header Identity Row */}
            <div className="relative z-10 flex items-center gap-3 mb-2 shrink-0">
              <span className={`text-[10px] font-semibold ${currentSection.accentText} bg-white/80 px-2 py-0.5 rounded shadow-sm`}>
                {currentSection.counter}
              </span>
              <div className="h-8 w-8 rounded-lg bg-white/70 border border-white/40 flex items-center justify-center text-[#1c2434] shadow-sm">
                <SectionIcon className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#1c2434]">
                {currentSection.title}
              </h2>
            </div>

            {/* CENTERING GRID LAYOUT WRAPPER */}
            <div className="relative z-10 flex-1 flex items-center justify-center w-full overflow-hidden">
              
              <div 
                className={`w-full max-w-7xl gap-6 items-center justify-center overflow-hidden grid ${
                  currentSection.id === "global" 
                    ? "grid-cols-[1fr_320px_320px]" 
                    : currentSection.id === "fulfillment"
                    ? "grid-cols-[repeat(2,320px)]"
                    : "grid-cols-[repeat(auto-fit,minmax(280px,320px))]"
                }`}
              >
                
                {/* Left Column Text - Injected only on Container 2 (global) */}
                {currentSection.id === "global" && currentSection.sectionHeading && (
                  <div className="flex flex-col justify-center text-left pr-4 overflow-hidden h-[440px]">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight mb-3 leading-snug">
                      {currentSection.sectionHeading}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-700 font-normal">
                      {currentSection.sectionDescription}
                    </p>
                  </div>
                )}

                {/* Main Cards Loop */}
                {currentSection.subContainers.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="rounded-2xl bg-white border border-white/60 flex flex-col shadow-sm hover:shadow-md transition-all p-5 h-[440px] justify-between group overflow-hidden w-full"
                  >
                    {/* 1. Card Title (Top Slot) */}
                    <div className="shrink-0 w-full mb-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-bold text-[#1c2434] group-hover:text-[#3b82f6] transition-colors leading-tight">
                          {card.title}
                        </h3>
                        <ArrowUpRight className="h-4 w-4 text-slate-300 group-hover:text-[#3b82f6] transition-all shrink-0 mt-0.5" />
                      </div>
                    </div>

                    {/* 2. Image Graphic Box (Center Slot) */}
                    <div className="w-full h-32 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
                      {card.imageSrc && (
                        <img
                          src={card.imageSrc}
                          alt={card.title}
                          className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>

                    {/* 3. Description Subtitle & Key Features (Bottom Slot) */}
                    <div className="mt-2 flex-1 flex flex-col justify-between overflow-hidden w-full">
                      <p className="text-[10px] text-[#5a6578] leading-relaxed font-normal line-clamp-4">
                        {card.detail}
                      </p>

                      {/* Explicit Custom Bullet Block for Key Features */}
                      {"features" in card && card.features && (
                        <div className="mt-2 pt-2 border-t border-slate-100 shrink-0">
                          <span className="text-[9px] font-bold text-slate-700 tracking-wide uppercase block mb-1">
                            Key Features:
                          </span>
                          <div className="grid grid-cols-1 gap-0.5 text-[9px] font-medium text-slate-500">
                            {(card.features as string[]).map((feat, fIdx) => (
                              <span key={fIdx} className="truncate flex items-center gap-1">
                                <span className="text-[#3b82f6] font-bold">•</span> {feat}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PAGINATION DOTS INDICATORS */}
      <div className="w-full text-center pb-4 shrink-0 z-50">
        <div className="inline-flex items-center gap-2">
          {SECTIONS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => { if(!isAnimating.current) setActiveIdx(dotIdx); }}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIdx === dotIdx ? "w-6 bg-[#3b82f6]" : "w-1.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
