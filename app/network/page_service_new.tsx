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
    // Dynamic column span definition so 3 cards stretch beautifully across the grid width
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", 
    subContainers: [
      { 
        title: "Transport Logistics", 
        badge: "🚚 Carrier Network", 
        detail: "Reliable transport logistics solutions supported by a strong carrier network and efficient route planning designed to ensure safety, consistency, and timely delivery.", 
        imageSrc: "/mas_logo.webp", 
        themeColor: "text-blue-600 bg-blue-50" 
      },
      { 
        title: "Procurement Logistics", 
        badge: "📦 Supplier Flow", 
        detail: "Managing the seamless flow of goods from suppliers to destinations. We oversee planning, execution, and monitoring across warehousing, storage, and internal transit.", 
        imageSrc: "/mas_logo.webp", 
        themeColor: "text-purple-600 bg-purple-50" 
      },
      { 
        title: "Outbound Logistics", 
        badge: "🚛 Market Delivery", 
        detail: "A strong focus on reliability, timely delivery, and operational control. From warehouse dispatch to final market delivery, we ensure finished goods reach destinations efficiently.", 
        imageSrc: "/mas_logo.webp", 
        themeColor: "text-indigo-600 bg-indigo-50" 
      }
    ]
  },
  {
    id: "global",
    counter: "2/3",
    title: "Cross-border global shipping",
    icon: IconGlobal,
    bgGradient: "from-[#a7f3d0] via-[#86efac] to-[#6ee7b7]",
    accentText: "text-[#059669]",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    subContainers: [
      { title: "ShiprocketX", badge: "✈️ Express", detail: "Seamless international delivery handling across 220+ countries.", visualMock: "Custom Clearance Passed", themeColor: "text-emerald-600 bg-emerald-50" },
      { title: "CargoX Freight", badge: "🚢 Air & Sea", detail: "Commercial scale air freight routes for bulk distribution.", visualMock: "B2B Global Cargo Booking", themeColor: "text-teal-600 bg-teal-50" },
      { title: "HS Customs", badge: "📋 Automated", detail: "Automated duty computations and border documentation.", visualMock: "HS Code Mapped Instantly", themeColor: "text-green-600 bg-green-50" },
      { title: "Tracking", badge: "🌐 Real-Time", detail: "Unified global shipping pipeline monitoring loops.", visualMock: "Global Route Tracking Loop", themeColor: "text-cyan-600 bg-cyan-50" }
    ]
  },
  {
    id: "fulfillment",
    counter: "3/3",
    title: "Advanced AI Fulfillment",
    icon: IconBox, 
    bgGradient: "from-[#ffe4e6] via-[#fecdd3] to-[#fda4af]", 
    accentText: "text-[#e11d48]",
    gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    subContainers: [
      { title: "Smart Routing", badge: "🤖 AI Choice", detail: "Predictive order routing using local distribution loops.", visualMock: "Optimizing Delivery Lanes", themeColor: "text-rose-600 bg-rose-50" },
      { title: "Live Guard", badge: "🛡️ SecuTrack", detail: "Real-time automated damage risk assessments during transit.", visualMock: "Secure Pipeline Active", themeColor: "text-red-600 bg-red-50" },
      { title: "Instant Sync", badge: "⚡ Multi-Store", detail: "Omnichannel listing updates synchronized instantly everywhere.", visualMock: "Inventory Mapped 100%", themeColor: "text-amber-600 bg-amber-50" },
      { title: "Auto-Claims", badge: "💸 Fast Refund", detail: "Instant settlement processes for transit delay issues.", visualMock: "Claim Credited: $150.00", themeColor: "text-pink-600 bg-pink-50" }
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
            <div className="relative z-10 flex items-center gap-3 mb-4 shrink-0">
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

            {/* SUB-CONTAINERS GRID */}
            <div className={`relative z-10 grid ${currentSection.gridCols} gap-4 flex-1 items-stretch overflow-hidden`}>
              {currentSection.subContainers.map((card, cIdx) => (
                <div
                  key={cIdx}
                  className="rounded-2xl bg-white border border-white/60 flex flex-col shadow-sm hover:shadow-md transition-all p-4 justify-between group overflow-hidden"
                >
                  {/* Card Graphic Frame Placeholder */}
                  <div className="w-full h-32 md:h-auto md:flex-1 rounded-xl bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner">
                    <div className={`absolute top-2 left-2 z-10 text-[8px] font-bold tracking-wide px-1.5 py-0.5 rounded shadow-sm ${card.themeColor}`}>
                      {card.badge}
                    </div>
                    
                    {/* Conditional render: uses local image if provided, otherwise defaults to standard layout preview text */}
                    {"imageSrc" in card ? (
                      <img 
                        src={card.imageSrc} 
                        alt={card.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      />
                    ) : (
                      <div className="text-center">
                        <span className="text-[10px] font-sans font-medium text-slate-400 block">
                          {"visualMock" in card ? card.visualMock : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Text Details Area */}
                  <div className="space-y-1 mt-3 shrink-0 flex flex-col justify-end">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-[#1c2434] group-hover:text-[#3b82f6] transition-colors line-clamp-1">
                        {card.title}
                      </h3>
                      <ArrowUpRight className="h-3.5 w-3.5 text-slate-300 group-hover:text-[#3b82f6] transition-all shrink-0" />
                    </div>
                    <p className="text-[10px] text-[#5a6578] leading-normal font-normal line-clamp-3">
                      {card.detail}
                    </p>
                  </div>
                </div>
              ))}
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
