"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import Image from "next/image";
import Link from "next/link";

// Static Image Asset Imports
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

function CascadingText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: delay + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: "some" }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

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
  { name: "Services", href: "/#section-services" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

export default function ServicesPage() {
  const [activeIdx, setActiveIdx] = useState(-1); // -1 is the intro "peeking" state
  const isAnimating = useRef(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (isAnimating.current) return;

    if (e.deltaY > 30 && activeIdx < SECTIONS.length - 1) {
      isAnimating.current = true;
      setActiveIdx((prev) => prev + 1);
    } else if (e.deltaY < -30 && activeIdx > -1) {
      isAnimating.current = true;
      setActiveIdx((prev) => prev - 1);
    }
  };

  const currentSection = activeIdx === -1 ? SECTIONS[0] : SECTIONS[activeIdx];
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
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto pointer-events-auto">
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

      {/* HEADER SECTION - Visible only when activeIdx === -1 */}
      <AnimatePresence>
        {activeIdx === -1 && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-32 left-0 w-full px-12 md:px-24 flex flex-col gap-2 z-20 pointer-events-none"
          >
            <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#1c2434] max-w-4xl leading-tight">
              <CascadingText text="Core Services" />
            </h1>
            <p className="text-sm md:text-base text-[#5a6578] max-w-3xl leading-relaxed font-medium mt-2">
              <CascadingText delay={0.2} text="At MAS Logistics, we deliver structured and dependable logistics solutions designed to support businesses at every stage of the supply chain. Our core logistics services focus on ensuring smooth coordination, operational efficiency, and reliable movement of goods through carefully managed transportation, procurement, and distribution systems." />
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL PAGE SLIDE CONTAINER */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSection.id}
            initial={{ y: "100%", scale: 0.98, opacity: 0.5 }}
            animate={{ 
              y: activeIdx === -1 ? "75%" : "0%", 
              scale: 1, 
              opacity: 1,
              borderRadius: activeIdx === -1 ? "3.5rem 3.5rem 0 0" : "0rem"
            }}
            exit={{ y: "-15%", scale: 0.92, opacity: 0 }}
            onAnimationComplete={() => { setTimeout(() => { isAnimating.current = false; }, 200); }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className={`absolute inset-x-0 bottom-0 top-0 bg-gradient-to-b ${currentSection.bgGradient} flex flex-col pt-24 md:pt-32 pb-8 px-6 md:px-16 shadow-[0_-20px_50px_rgba(0,0,0,0.15)] pointer-events-auto`}
            style={{ zIndex: activeIdx + 10 }}
          >
            
            {/* Peek Handle for Intro State */}
            {activeIdx === -1 && (
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: 0.5 } }}
                 className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group"
                 onClick={() => { if(!isAnimating.current) { isAnimating.current = true; setActiveIdx(0); } }}
               >
                 <div className="w-16 h-1.5 bg-black/15 rounded-full group-hover:bg-black/30 transition-colors" />
                 <span className="text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black/60 transition-colors">Scroll Down</span>
               </motion.div>
            )}

            {/* Inner Content Container - Faded when peeking */}
            <div className={`flex-1 flex flex-col w-full max-w-7xl mx-auto transition-all duration-700 ease-out ${activeIdx === -1 ? "opacity-30 blur-[4px] pointer-events-none scale-95" : "opacity-100 blur-0 scale-100"}`}>
              
              {/* Header Identity Row */}
              <div className="relative z-10 flex items-center gap-4 mb-6 shrink-0">
                <span className={`text-xs font-black tracking-widest uppercase ${currentSection.accentText} bg-white/60 backdrop-blur-md border border-white/40 px-3 py-1.5 rounded-md shadow-sm`}>
                  {currentSection.counter}
                </span>
                <div className="h-12 w-12 rounded-2xl bg-white/80 border border-white/50 flex items-center justify-center text-[#1c2434] shadow-md">
                  <SectionIcon className="h-6 w-6" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#1c2434]">
                  {currentSection.title}
                </h2>
              </div>

              {/* CENTERING GRID LAYOUT WRAPPER */}
              <div className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-10">

                {/* Left Side Sub-Para Description (only for Slide 2/3 - global section) */}
                {currentSection.id === "global" && (
                  <div className="w-full md:w-[32%] text-left space-y-4 flex flex-col justify-center shrink-0">
                    <span className={`text-[10px] font-black ${currentSection.accentText} tracking-widest uppercase bg-white/60 backdrop-blur-sm border border-white/40 px-3 py-1.5 rounded-md shadow-sm w-fit`}>
                      Integrated Fleet & Solutions
                    </span>
                    <p className="text-[13px] md:text-[14px] text-slate-700 font-medium leading-relaxed bg-white/30 p-6 rounded-3xl border border-white/30 shadow-inner">
                      At MAS Logistics, we provide reliable and efficient logistics solutions designed to support businesses across global markets. Our services are built around flexibility, operational efficiency, and dependable execution, helping businesses manage the movement of goods with greater control and confidence.
                    </p>
                  </div>
                )}

                <div
                  className={`flex md:grid gap-8 justify-start md:justify-center items-center overflow-x-auto md:overflow-hidden snap-x snap-mandatory scrollbar-none py-6 w-full ${currentSection.id === "global"
                    ? "md:w-[68%] md:grid-cols-2"
                    : currentSection.id === "fulfillment"
                      ? "md:grid-cols-2 max-w-5xl"
                      : "md:grid-cols-3 max-w-7xl"
                    }`}
                >
                  {currentSection.subContainers.map((cardItem, cIdx) => {
                    const card = cardItem as any;
                    return (
                      <div
                        key={cIdx}
                        className={`group [perspective:1000px] snap-center shrink-0 w-[85vw] md:w-full mx-auto ${currentSection.id === "domestic"
                          ? "h-[50vh] md:h-[60vh] md:max-w-[420px]"
                          : "h-[50vh] md:h-[65vh] md:max-w-[550px]"
                          }`}
                      >
                        <div className="relative w-full h-full [transform-style:preserve-3d] transition-transform duration-700 ease-out group-hover:[transform:rotateY(180deg)] cursor-pointer">

                          {/* FRONT CARD FACE */}
                          <div className="absolute inset-0 backface-hidden rounded-[2.5rem] md:rounded-[3rem] bg-slate-900 border border-white/20 flex flex-col justify-between shadow-xl overflow-hidden select-none">

                            {currentSection.id === "domestic" || currentSection.id === "global" || currentSection.id === "fulfillment" ? (
                              <div className="relative w-full h-full flex flex-col justify-between p-6 md:p-8">
                                {/* Background Image Cover */}
                                {card.imageSrc && (
                                  <Image
                                    src={card.imageSrc}
                                    alt={card.title}
                                    fill
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 opacity-90 group-hover:opacity-100"
                                  />
                                )}

                                {/* Cinematic Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20 z-10" />

                                {/* Title on the left-aligned slot */}
                                <div className="relative z-20 w-full flex items-start justify-between gap-2">
                                  <div className="text-left max-w-[85%]">
                                    <h3 className="text-xl md:text-2xl font-black text-white leading-tight drop-shadow-lg">
                                      {card.title}
                                    </h3>
                                    <span className="text-[10px] font-black text-sky-400 block mt-2 tracking-widest uppercase drop-shadow-sm">
                                      {currentSection.id === "domestic"
                                        ? "Domestic Cargo"
                                        : currentSection.id === "global"
                                          ? "Global Cargo"
                                          : "Fulfillment & Projects"}
                                    </span>
                                  </div>
                                  <div className="h-10 w-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center shrink-0">
                                    <ArrowUpRight className="h-5 w-5 text-sky-400" />
                                  </div>
                                </div>

                                {/* Bottom action indicator */}
                                <div className="relative z-20 mt-auto w-full flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                                  <span>MAS LOGISTICS</span>
                                  <span className="flex items-center gap-2 text-sky-400 animate-pulse bg-sky-400/10 px-3 py-1.5 rounded-full border border-sky-400/20">
                                    🔄 Hover to Flip
                                  </span>
                                </div>
                              </div>
                            ) : (
                              /* Slides 2 & 3 Layout Alternative */
                              <div className="w-full h-full p-6 flex flex-col justify-between bg-white">
                                <div className="shrink-0 w-full mb-4">
                                  <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-bold text-[#1c2434] leading-tight">
                                      {card.title}
                                    </h3>
                                    <ArrowUpRight className="h-5 w-5 text-slate-300 transition-all shrink-0" />
                                  </div>
                                </div>
                                <div className="w-full flex-1 rounded-[2rem] bg-gradient-to-b from-[#f8fafc] to-[#f1f5f9] border border-slate-100 flex items-center justify-center relative overflow-hidden shadow-inner shrink-0">
                                  {card.badge && (
                                    <div className={`absolute top-4 left-4 z-10 text-[10px] font-bold tracking-wide px-2 py-1 rounded shadow-sm ${card.themeColor}`}>
                                      {card.badge}
                                    </div>
                                  )}
                                  <div className="text-center">
                                    <span className="text-[12px] font-sans font-semibold text-slate-400 block tracking-wide">
                                      {"visualMock" in card ? card.visualMock : ""}
                                    </span>
                                  </div>
                                </div>
                                <div className="mt-4 shrink-0 w-full flex items-center justify-between text-[10px] font-bold text-slate-400/90 uppercase tracking-widest">
                                  <span>MAS LOGISTICS</span>
                                  <span className="flex items-center gap-1 text-[#3b82f6] animate-pulse">
                                    🔄 Hover to Flip
                                  </span>
                                </div>
                              </div>
                            )}

                          </div>

                          {/* BACK CARD FACE */}
                          <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white border border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-2xl overflow-hidden select-none">
                            <div className="shrink-0 w-full mb-4">
                              <div className="flex items-start justify-between gap-2">
                                <h3 className="text-xl font-bold text-white leading-tight">
                                  {card.title}
                                </h3>
                                <ArrowUpRight className="h-5 w-5 text-cyan-400 shrink-0" />
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col justify-center py-4 space-y-5">
                              <p className="text-[13px] md:text-[14px] text-slate-300 leading-relaxed font-medium">
                                {card.detail}
                              </p>
                              {card.features ? (
                                <div className="p-4 rounded-[1.5rem] bg-white/5 border border-white/10 space-y-3 text-left shadow-inner">
                                  <div className="text-[10px] text-sky-400 uppercase tracking-widest font-black">
                                    Key Features
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                    {card.features.map((feat: string, fIdx: number) => (
                                      <div key={fIdx} className="flex items-center gap-2 text-[11px] text-slate-200 font-semibold">
                                        <span className="text-emerald-400 font-bold">✓</span>
                                        <span>{feat}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <div className="p-4 rounded-[1.5rem] bg-white/5 border border-white/10 space-y-2 text-left shadow-inner">
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                    <span>Service Pipeline</span>
                                    <span className="text-emerald-400">Active & Managed</span>
                                  </div>
                                  <div className="h-px bg-white/10 my-2" />
                                  <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-widest font-black">
                                    <span>Assurance Status</span>
                                    <span className="text-cyan-400">100% Secured</span>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="w-full shrink-0 flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                              <span>Operational specs</span>
                              <span className="text-slate-400 bg-white/5 px-3 py-1.5 rounded-md">Secured Node</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* SCROLL INDICATOR & PAGINATION */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50 pointer-events-auto bg-white/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/50 shadow-lg">
        {/* Up arrow */}
        <motion.button
          onClick={() => { if (!isAnimating.current && activeIdx > -1) { isAnimating.current = true; setActiveIdx(prev => prev - 1); } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeIdx > -1 ? 1 : 0.3 }}
          className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
          disabled={activeIdx === -1}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 8L6 4L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {SECTIONS.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => { if (!isAnimating.current && activeIdx !== dotIdx) { isAnimating.current = true; setActiveIdx(dotIdx); } }}
              className={`h-2 transition-all duration-500 rounded-full ${activeIdx === dotIdx ? "w-8 bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" : "w-2 bg-slate-400 hover:bg-slate-600"}`}
            />
          ))}
        </div>

        {/* Down arrow */}
        <motion.button
          onClick={() => { if (!isAnimating.current && activeIdx < SECTIONS.length - 1) { isAnimating.current = true; setActiveIdx(prev => prev + 1); } }}
          initial={{ opacity: 0 }}
          animate={{ opacity: activeIdx < SECTIONS.length - 1 ? 1 : 0.3 }}
          className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-slate-600 hover:text-blue-600 transition-colors shadow-sm"
          disabled={activeIdx === SECTIONS.length - 1}
        >
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>

    </main>
  );
}
