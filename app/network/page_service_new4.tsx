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
        imageSrc: "/Break-Bulk_Cargo_services.webp"
      },
      {
        title: "Procurement Logistics",
        detail: "Managing the seamless flow of goods from suppliers to destinations. We oversee planning, execution, and monitoring across warehousing, storage, and internal transit.",
        imageSrc: "/customs_brokerage_specialized_services.webp"
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
        imageSrc: "/air_freight_service.webp" 
      },
      { 
        title: "Sea Freight", 
        detail: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling Full Container Load (FCL) or Less than Container Load (LCL) shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks. Our focus remains on timely coordination, shipment visibility, and reliable delivery across international trade routes.", 
        features: ["FCL and LCL shipments", "Competitive global routing", "Strong port connectivity", "End-to-end shipment visibility"],
        imageSrc: "/sea_freight_services.webp" 
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
        imageSrc: "/warehousing__Distribution_logistics_service.webp" 
      },
      { 
        title: "Project / ODC Cargo", 
        detail: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently, ensuring smooth coordination from planning to execution and final delivery.", 
        features: ["Heavy and oversized cargo handling", "Route planning and coordination", "Specialized equipment support", "End-to-end project execution"],
        imageSrc: "/project___ODC_Cargo_services.webp" 
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
      className="relative w-full h-screen bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#f8fafc] text-slate-800 overflow-hidden select-none flex flex-col justify-between antialiased"
    >
      {/* Absolute Navbar Component */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max drop-shadow-[0_4px_12px_rgba(0,0,0,0.03)] backdrop-blur-[2px]">
        <AppleGlassNav items={NAV_LINKS} theme="light" />
      </div>

      {/* HEADER SECTION - Lifted up using pt-20 instead of pt-28 */}
      <div className="w-full pt-20 px-12 pb-2 max-w-7xl mx-auto flex flex-col gap-2 shrink-0 z-20">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 max-w-4xl leading-tight">
          Our Core Logistics Services
        </h1>
        <p className="text-xs text-slate-500 max-w-4xl leading-relaxed font-medium tracking-wide">
          At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Our core logistics services focus on ensuring smooth coordination, operational efficiency, and reliable movement of goods through carefully managed transportation, procurement, and distribution systems. 
        </p>
      </div>

      {/* CORE WRAPPER CONTAINER SLOT - Expanded bottom gap to allow seamless 3D transformation clears */}
      <div className="relative w-full flex-1 max-w-7xl mx-auto px-12 pb-8 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSection.id}
            initial={{ y: "100%", scale: 1, opacity: 0.9 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 0, scale: 0.94, opacity: 0.4 }}
            onAnimationComplete={() => { isAnimating.current = false; }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute inset-x-12 top-0 bottom-2 rounded-[2rem] bg-gradient-to-b ${currentSection.bgGradient} flex flex-col p-8 shadow-[0_24px_60px_rgba(0,0,0,0.06)] border border-white/20 overflow-hidden`}
            style={{ zIndex: activeIdx }}
          >
            {/* Header Identity Row */}
            <div className="relative z-10 flex items-center gap-3 mb-2 shrink-0">
              <span className={`text-[10px] font-bold ${currentSection.accentText} bg-white/95 px-2.5 py-0.5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.02)] tracking-wider uppercase`}>
                {currentSection.counter}
              </span>
              <div className="h-8 w-8 rounded-xl bg-white/80 border border-white/50 flex items-center justify-center text-slate-800 shadow-[0_2px_6px_rgba(0,0,0,0.03)] backdrop-blur-sm">
                <SectionIcon className="h-4 w-4 stroke-[2.25]" />
              </div>
              <h2 className="text-lg font-extrabold tracking-tight text-slate-900">
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
                  <div className="flex flex-col justify-center text-left pr-6 overflow-hidden h-[460px]">
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight mb-3.5 leading-snug">
                      {currentSection.sectionHeading}
                    </h3>
                    <p className="text-xs leading-relaxed text-slate-700 font-medium">
                      {currentSection.sectionDescription}
                    </p>
                  </div>
                )}

                {/* Main Cards Loop with Full-Bleed Images & Overlaid Text */}
                {currentSection.subContainers.map((card, cIdx) => (
                  <div
                    key={cIdx}
                    className="w-full h-[460px] perspective-[1200px] group select-none"
                  >
                    <div className="relative w-full h-full duration-700 transform-style-3d group-hover:rotate-y-180 transition-transform ease-[cubic-bezier(0.2,0.8,0.2,1)]">
                      
                      {/* --- FRONT SIDE --- */}
                      <div className="absolute inset-0 backface-hidden rounded-2xl bg-white border border-slate-100/80 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] overflow-hidden">
                        
                        {/* 1. Full Card Background Image Slot */}
                        {card.imageSrc && (
                          <div className="absolute inset-0 w-full h-full z-0">
                            <img
                              src={card.imageSrc}
                              alt={card.title}
                              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/70 to-slate-950/20 mix-blend-multiply opacity-90" />
                          </div>
                        )}

                        {/* Top Accent Shadow / Frame Details */}
                        <div className="relative z-10 w-full p-5 pt-4 flex items-start justify-between gap-2 bg-gradient-to-b from-slate-950/40 to-transparent pointer-events-none">
                          <span className="text-[9px] font-bold text-white/60 uppercase tracking-widest">MAS Network</span>
                          <ArrowUpRight className="h-4 w-4 text-white/50 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                        </div>

                        {/* 2. Text Details Container Overlaying the Bottom of the Card */}
                        <div className="relative z-10 p-5 w-full flex flex-col justify-end bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-transparent pt-12">
                          <h3 className="text-sm font-bold text-white transition-colors duration-300 leading-tight tracking-tight mb-2">
                            {card.title}
                          </h3>
                          
                          <p className="text-[10px] text-slate-300 leading-relaxed font-medium line-clamp-4 mb-3">
                            {card.detail}
                          </p>

                          {/* Front Features Block Over image */}
                          {"features" in card && card.features && (
                            <div className="pt-2.5 border-t border-white/10">
                              <span className="text-[8px] font-bold text-white/40 tracking-wider uppercase block mb-1">
                                Key Features:
                              </span>
                              <div className="grid grid-cols-1 gap-0.5 text-[9px] font-medium text-slate-300">
                                {(card.features as string[]).map((feat, fIdx) => (
                                  <span key={fIdx} className="truncate flex items-center gap-1.5">
                                    <span className="text-blue-400 font-black">•</span> {feat}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* --- BACK SIDE --- */}
                      <div className="absolute inset-0 rotate-y-180 backface-hidden rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col p-5 shadow-2xl overflow-hidden justify-between">
                        {/* Header identity */}
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 shrink-0">
                          <h3 className="text-sm font-bold text-white tracking-tight">
                            {card.title}
                          </h3>
                          <span className="text-[9px] text-slate-400 font-mono font-bold tracking-wider uppercase bg-slate-800 px-2 py-0.5 rounded-full">
                            Overview
                          </span>
                        </div>
                        
                        {/* Scrollable Container */}
                        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar flex flex-col gap-3">
                          <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                            {card.detail}
                          </p>

                          {/* Back Side Features Block */}
                          {"features" in card && card.features && (
                            <div className="pt-2 border-t border-slate-800 shrink-0">
                              <span className="text-[9px] font-bold text-slate-400 tracking-wide uppercase block mb-1.5">
                                Key Features:
                              </span>
                              <div className="grid grid-cols-1 gap-1 text-[10px] font-medium text-slate-300">
                                {(card.features as string[]).map((feat, fIdx) => (
                                  <span key={fIdx} className="flex items-start gap-2">
                                    <span className="text-emerald-400 font-black">•</span>
                                    <span>{feat}</span>
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

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
        <div className="inline-flex items-center gap-2 bg-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.02)] px-3 py-1.5 rounded-full border border-slate-200/50 backdrop-blur-sm">
          {SECTIONS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => { if(!isAnimating.current) setActiveIdx(dotIdx); }}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIdx === dotIdx ? "w-6 bg-blue-600 shadow-[0_1px_4px_rgba(59,130,246,0.3)]" : "w-1.5 bg-slate-300 hover:bg-slate-400"}`}
            />
          ))}
        </div>
      </div>

      {/* Advanced CSS Injections for Clean Graphics & Rotation Stability */}
      <style jsx global>{`
        .perspective-1200 { perspective: 1200px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { 
          backface-visibility: hidden; 
          -webkit-backface-visibility: hidden; 
        }
        .rotate-y-180 { transform: rotateY(180deg); }
        .group-hover\\:rotate-y-180:hover .group-hover\\:rotate-y-180,
        .group:hover .group-hover\\:rotate-y-180 { transform: rotateY(180deg); }
        
        /* Smooth Scrollbar Configuration */
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 99px; }
        
        /* Visual fix for aliasing artifacts during 3D transforms */
        .group {
          -webkit-font-smoothing: antialiased;
        }
      `}</style>
    </main>
  );
}
