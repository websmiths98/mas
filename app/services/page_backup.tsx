"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

// Static Image Asset Imports for 1/3, 2/3, and 3/3 Carousels
import imageTruck from "@/images_frontend/loading_container_truck.webp";
import imagePort from "@/images_frontend/1-landscape-from-bird-eye-view-for-laem-chabang-logistic-port-anek-suwannaphoom.webp";
import imageWarehouse from "@/public/warehousing__Distribution_logistics_service.webp";
import imageAir from "@/public/air_freight_service.webp";
import imageSea from "@/public/sea_freight_services.webp";
import imageODC from "@/public/project___ODC_Cargo_services.webp";

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
    bgGradient: "from-[#a5f3fc] via-[#b4d2ff] to-[#d6bcff]",
    accentText: "text-[#3b82f6]",
    subContainers: [
      {
        title: "Transport Logistics",
        detail: "We provide reliable transport logistics solutions supported by a strong carrier network and efficient route planning. Our transportation services are designed to ensure the smooth movement of cargo across locations while maintaining safety, consistency, and timely delivery.",
        imageSrc: imageTruck,
        themeColor: "text-blue-600 bg-blue-50",
        overlayGradient: "from-blue-950/95 via-slate-950/40 to-transparent"
      },
      {
        title: "Procurement Logistics",
        detail: "Our procurement logistics solutions focus on managing the seamless flow of goods from suppliers to final destinations. We oversee planning, execution, and monitoring of logistics activities to ensure smooth coordination across procurement, warehousing, storage, and internal transportation.",
        imageSrc: imagePort,
        themeColor: "text-purple-600 bg-purple-50",
        overlayGradient: "from-purple-950/95 via-slate-950/40 to-transparent"
      },
      {
        title: "Outbound Logistics",
        detail: "We manage outbound logistics with a strong focus on reliability, timely delivery, and operational control. From warehouse dispatch to final market delivery, we ensure finished goods reach their intended destinations efficiently and without unnecessary delays.",
        imageSrc: imageWarehouse,
        themeColor: "text-indigo-600 bg-indigo-50",
        overlayGradient: "from-indigo-950/95 via-slate-950/40 to-transparent"
      }
    ]
  },
  {
    id: "global",
    counter: "2/3",
    title: "Freight & Supply Chain Solutions",
    icon: IconGlobal,
    bgGradient: "from-[#a7f3d0] via-[#86efac] to-[#93c5fd]",
    accentText: "text-[#059669]",
    subContainers: [
      {
        title: "Air Freight",
        detail: "Our air freight services are designed to support time-sensitive and high-priority shipments across international markets. Through strong partnerships with leading global carriers, we ensure fast, secure, and reliable cargo movement with smooth coordination at every stage. Whether it is urgent deliveries or scheduled freight operations, we focus on maintaining speed, accuracy, and operational efficiency.",
        imageSrc: imageAir,
        themeColor: "text-emerald-600 bg-emerald-50",
        overlayGradient: "from-emerald-950/95 via-slate-950/40 to-transparent",
        features: [
          "Priority & express shipments",
          "Global carrier network",
          "Secure cargo handling",
          "Time-critical delivery support"
        ]
      },
      {
        title: "Sea Freight",
        detail: "We offer dependable sea freight solutions that combine flexibility, cost efficiency, and global connectivity. Whether handling Full Container Load (FCL) or Less than Container Load (LCL) shipments, our team ensures smooth cargo movement through trusted shipping partners and established port networks. Our focus remains on timely coordination, shipment visibility, and reliable delivery across international trade routes.",
        imageSrc: imageSea,
        themeColor: "text-teal-600 bg-teal-50",
        overlayGradient: "from-teal-950/95 via-slate-950/40 to-transparent",
        features: [
          "FCL and LCL shipments",
          "Competitive global routing",
          "Strong port connectivity",
          "End-to-end shipment visibility"
        ]
      }
    ]
  },
  {
    id: "fulfillment",
    counter: "3/3",
    title: "Advanced Warehousing & ODC Fulfillment",
    icon: IconBox,
    bgGradient: "from-[#ffe4e6] via-[#fda4af] to-[#fed7aa]",
    accentText: "text-[#e11d48]",
    subContainers: [
      {
        title: "Warehousing",
        detail: "Our warehousing and distribution solutions are designed to support efficient inventory management and smooth supply chain operations. With scalable warehousing capabilities and structured storage systems, we help businesses improve operational efficiency, streamline dispatch activities, and reduce logistics-related costs.",
        imageSrc: imageWarehouse,
        themeColor: "text-rose-600 bg-rose-50",
        overlayGradient: "from-rose-950/95 via-slate-950/40 to-transparent",
        features: [
          "Inventory management support",
          "Distribution and dispatch handling",
          "Scalable storage solutions",
          "Cost-efficient operations"
        ]
      },
      {
        title: "Project / ODC Cargo",
        detail: "MAS Logistics specializes in handling oversized, heavy-lift, and complex cargo that demands precision planning and specialized logistics expertise. Our project and ODC cargo services are carefully designed to manage critical shipments safely and efficiently, ensuring smooth coordination from planning to execution and final delivery.",
        imageSrc: imageODC,
        themeColor: "text-red-600 bg-red-50",
        overlayGradient: "from-red-950/95 via-slate-950/40 to-transparent",
        features: [
          "Heavy and oversized cargo handling",
          "Route planning and coordination",
          "Specialized equipment support",
          "End-to-end project execution"
        ]
      }
    ]
  }
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  // { name: "Solutions", href: "/solutions" },
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
      {/* Self-contained 3D perspective and backface rules */}
      <style>{`
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* Absolute Navbar Component */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-max">
        <AppleGlassNav items={NAV_LINKS} theme="light" />
      </div>

      {/* HEADER SECTION */}
      <div className="w-full pt-22 px-12 pb-2 max-w-7xl mx-auto flex flex-col gap-1.5 shrink-0 z-20">
        <h1 className="text-3xl font-bold tracking-tight text-[#1c2434] max-w-4xl leading-tight">
          Core Services
        </h1>
        <p className="text-xs text-[#5a6578] max-w-4xl leading-relaxed font-normal">
          At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Our core logistics services focus on ensuring smooth coordination, operational efficiency, and reliable movement of goods through carefully managed transportation, procurement, and distribution systems.
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
            className={`absolute inset-x-12 top-0 bottom-2 rounded-[3.25rem] bg-gradient-to-b ${currentSection.bgGradient} flex flex-col p-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden`}
            style={{ zIndex: activeIdx }}
          >
            {/* Header Identity Row */}
            <div className="relative z-10 flex items-center gap-3 mb-2 shrink-0">
              <span className={`text-[10px] font-semibold ${currentSection.accentText} bg-white/80 px-2 py-0.5 rounded shadow-sm`}>
                {currentSection.counter}
              </span>
              <div className="h-8 w-8 rounded-xl bg-white/70 border border-white/40 flex items-center justify-center text-[#1c2434] shadow-sm">
                <SectionIcon className="h-4 w-4" />
              </div>
              <h2 className="text-lg font-bold tracking-tight text-[#1c2434]">
                {currentSection.title}
              </h2>
            </div>

            {/* CENTERING GRID LAYOUT WRAPPER (Strict single-row lineup for desktop/tablet; swipe snaps for mobile) */}
            <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center w-full overflow-hidden px-4 md:px-8 gap-6 md:gap-8 max-w-6xl mx-auto">

              {/* Left Side Sub-Para Description (only for Slide 2/3 - global section) */}
              {currentSection.id === "global" && (
                <div className="w-full md:w-[32%] text-left space-y-2 flex flex-col justify-center shrink-0">
                  <span className={`text-[9px] font-sans font-bold ${currentSection.accentText} tracking-wider uppercase bg-white/50 border border-white/20 px-2 py-0.5 rounded shadow-xs w-fit`}>
                    Integrated Fleet & Solutions
                  </span>
                  <p className="pt-2 text-[11px] md:text-[12px] text-slate-700 font-semibold leading-relaxed">
                    At MAS Logistics, we provide reliable and efficient logistics solutions designed to support businesses across global markets. Our services are built around flexibility, operational efficiency, and dependable execution, helping businesses manage the movement of goods with greater control and confidence. From international freight forwarding to warehousing and specialized cargo handling, we deliver solutions tailored to meet diverse logistics and supply chain requirements.
                  </p>
                </div>
              )}

              <div
                className={`flex md:grid gap-6 md:gap-8 justify-start md:justify-center items-center overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-none py-6 ${currentSection.id === "global"
                  ? "w-full md:w-[68%] md:grid-cols-2"
                  : currentSection.id === "fulfillment"
                    ? "w-full md:grid-cols-2 max-w-4xl"
                    : "w-full md:grid-cols-3"
                  }`}
              >
                {currentSection.subContainers.map((cardItem, cIdx) => {
                  const card = cardItem as any;
                  return (
                    <div
                      key={cIdx}
                      className={`group [perspective:1000px] snap-center shrink-0 w-[290px] md:w-full mx-auto ${currentSection.id === "domestic"
                        ? "h-[380px] md:h-[440px] md:max-w-[360px]"
                        : "h-[350px] md:h-[410px] md:max-w-[440px]"
                        }`}
                    >
                      <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)] cursor-pointer">

                        {/* FRONT CARD FACE (Curvy visual design - Full-Bleed Optimized Background Image Layout) */}
                        <div className="absolute inset-0 backface-hidden rounded-[2.5rem] bg-slate-900 border border-white/10 flex flex-col justify-between shadow-lg overflow-hidden select-none">

                          {currentSection.id === "domestic" || currentSection.id === "global" || currentSection.id === "fulfillment" ? (
                            /* Slide 1/3, 2/3 & 3/3 Layout: Fully flat, Full-Card-Bleed Background Image Cover */
                            <div className="relative w-full h-full flex flex-col justify-between p-5">
                              {/* Background Image Cover (Dynamic width & height optimization) */}
                              {card.imageSrc && (
                                <img
                                  src={typeof card.imageSrc === "string" ? card.imageSrc : card.imageSrc.src}
                                  alt={card.title}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              )}

                              {/* Cinematic Gradient Overlay for rich readability */}
                              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/20 z-10" />

                              {/* Title on the left-aligned slot (placed on top of overlay) */}
                              <div className="relative z-20 w-full flex items-start justify-between gap-2">
                                <div className="text-left max-w-[80%]">
                                  <h3 className="text-sm font-extrabold text-white leading-tight drop-shadow-md">
                                    {card.title}
                                  </h3>
                                  <span className="text-[9px] font-sans font-bold text-sky-400 block mt-1 tracking-wide uppercase drop-shadow-sm">
                                    {currentSection.id === "domestic"
                                      ? "Domestic Cargo"
                                      : currentSection.id === "global"
                                        ? "Global Cargo"
                                        : "Fulfillment & Projects"}
                                  </span>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                              </div>

                              {/* Bottom action indicator (placed on top of overlay) */}
                              <div className="relative z-20 mt-auto w-full flex items-center justify-between text-[8.5px] font-extrabold text-white/80">
                                <span>MAS LOGISTICS</span>
                                <span className="flex items-center gap-1 text-sky-400 animate-pulse">
                                  🔄 Hover to Flip
                                </span>
                              </div>
                            </div>
                          ) : (
                            /* Slides 2 & 3 Layout: badge + visual -> title + arrow bottom */
                            <div className="w-full h-full p-5 flex flex-col justify-between bg-white">
                              {/* 1. Title slot at the top */}
                              <div className="shrink-0 w-full mb-2">
                                <div className="flex items-start justify-between gap-2">
                                  <h3 className="text-sm font-bold text-[#1c2434] leading-tight">
                                    {card.title}
                                  </h3>
                                  <ArrowUpRight className="h-4 w-4 text-slate-300 transition-all shrink-0 mt-0.5" />
                                </div>
                              </div>

                              {/* 2. visual frame in the center */}
                              <div className="w-full flex-1 rounded-[1.75rem] bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
                                {card.badge && (
                                  <div className={`absolute top-2 left-2 z-10 text-[8px] font-bold tracking-wide px-1.5 py-0.5 rounded shadow-sm ${card.themeColor}`}>
                                    {card.badge}
                                  </div>
                                )}
                                <div className="text-center">
                                  <span className="text-[10px] font-sans font-semibold text-slate-400 block tracking-wide">
                                    {"visualMock" in card ? card.visualMock : ""}
                                  </span>
                                </div>
                              </div>

                              {/* 3. Bottom action row */}
                              <div className="mt-3 shrink-0 w-full flex items-center justify-between text-[8.5px] font-bold text-slate-400/90">
                                <span>MAS LOGISTICS</span>
                                <span className="flex items-center gap-1 text-[#3b82f6] animate-pulse">
                                  🔄 Hover to Flip
                                </span>
                              </div>
                            </div>
                          )}

                        </div>

                        {/* BACK CARD FACE (Sleek deep-dark luxury mode to create high-end visual reveal!) */}
                        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-[2.5rem] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white border border-white/5 p-5 flex flex-col justify-between shadow-xl overflow-hidden select-none">

                          {/* Title at top */}
                          <div className="shrink-0 w-full mb-2">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="text-sm font-bold text-white leading-tight">
                                {card.title}
                              </h3>
                              <ArrowUpRight className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                            </div>
                          </div>

                          {/* Details/Explanation text in center */}
                          <div className="flex-1 flex flex-col justify-center py-2 space-y-3">
                            <p className="text-[11px] text-slate-300 leading-relaxed font-normal">
                              {card.detail}
                            </p>

                            {card.features ? (
                              /* Curved High-fidelity Features Matrix */
                              <div className="p-3 rounded-[1.25rem] bg-white/5 border border-white/10 space-y-1.5 text-left">
                                <div className="text-[8px] text-sky-400 uppercase tracking-wider font-extrabold">
                                  Key Features
                                </div>
                                <div className="h-px bg-white/10 my-0.5" />
                                <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                                  {card.features.map((feat: string, fIdx: number) => (
                                    <div key={fIdx} className="flex items-center gap-1 text-[8.5px] text-slate-300 font-semibold">
                                      <span className="text-emerald-400">✓</span>
                                      <span>{feat}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              /* Curvy High-fidelity Specifications Box */
                              <div className="p-3 rounded-[1.25rem] bg-white/5 border border-white/10 space-y-1 text-left">
                                <div className="flex items-center justify-between text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">
                                  <span>Service Pipeline</span>
                                  <span className="text-emerald-400">Active & Managed</span>
                                </div>
                                <div className="h-px bg-white/10 my-1" />
                                <div className="flex items-center justify-between text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">
                                  <span>Assurance Status</span>
                                  <span className="text-cyan-400">100% Secured</span>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Bottom close flip indicator */}
                          <div className="w-full shrink-0 flex items-center justify-between text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">
                            <span>Operational specs</span>
                            <span className="text-slate-400">Secured Node</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
              onClick={() => { if (!isAnimating.current) setActiveIdx(dotIdx); }}
              className={`h-1.5 transition-all duration-300 rounded-full ${activeIdx === dotIdx ? "w-6 bg-[#3b82f6]" : "w-1.5 bg-slate-300"}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
