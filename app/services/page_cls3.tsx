"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

/* ---------------- Icons ---------------- */
const IconWrap = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={className}>{children}</svg>
);
const IconPlane = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></IconWrap>;
const IconShip = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></IconWrap>;
const IconWarehouse = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/></IconWrap>;
const IconFile = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></IconWrap>;
const IconBoxes = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></IconWrap>;
const IconContainer = ({ className }: { className?: string }) => <IconWrap className={className}><path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.5V8.5"/><path d="M18 17V7"/></IconWrap>;

const SERVICES = [
  { id: "1", title: "Air Freight", image: "/air_freight_service.png", icon: IconPlane, highlights: ["Express & Charter", "200+ Destinations"], description: `We provide fast and reliable air freight services through strong partnerships with leading global carriers. Our network enables smooth handling of time-sensitive shipments across international destinations.\n\n➤ Priority and express shipments\n➤ Global carrier network\n➤ Secure cargo handling\n➤ Time-critical delivery support` },
  { id: "2", title: "Sea Freight", image: "/sea_freight_services.jpeg", icon: IconShip, highlights: ["FCL & LCL", "Global Carriers"], description: `Our sea freight solutions are designed for flexibility and cost efficiency. Whether it is full container loads or smaller shipments, we ensure reliable movement through our global partner network.\n\n➤ FCL and LCL shipments\n➤ Competitive global routing\n➤ Strong port connectivity\n➤ End-to-end shipment visibility` },
  { id: "3", title: "Warehousing & Distribution", image: "/warehousing__Distribution_logistics_service.jpeg", icon: IconWarehouse, highlights: ["Bonded Storage", "Last-Mile"], description: `MAS warehousing services are specifically designed for your requirement; gives flexibility and scalability to cater to your business growth and overall needs.\n\nMAS offer shared warehouse, if you have low volumes, uncertain demand or seasonal operational fluctuations, operating in a shared warehousing allows you to enjoy the benefits at significantly low cost.` },
  { id: "4", title: "Project & ODC Cargo", image: "/project___ODC_Cargo_services.jpeg", icon: IconBoxes, highlights: ["Heavy Lift", "Route Surveys"], description: `We specialize in handling oversized, heavy-lift, and complex cargo that requires careful planning and execution. Our team ensures safe handling and timely delivery of critical shipments.\n\n➤ Heavy and oversized cargo handling\n➤ Route planning and coordination\n➤ Specialized equipment support\n➤ End-to-end project execution` },
  { id: "5", title: "Break-Bulk Shipping", image: "/Break-Bulk_Cargo_services.jpeg", icon: IconContainer, highlights: ["Charter Vessels", "Port Ops"], description: `MAS Logistics break-bulk services are designed to meet your shipping needs of over-sized, odd-sized or over-weight cargoes.\n\nApart from regular sailings, We also provide entire transportation solutions for general cargo, project cargo, steel products, etc. Our add-on options include packing, crating and rigging.` },
  { id: "6", title: "Customs Brokerage", image: "/customs_brokerage_specialized_services.jpeg", icon: IconFile, highlights: ["HS Classification", "Compliance"], description: `Our highly efficient customs brokerage, clearance and compliance service is designed to take the complexity out of the customs process.\n\nTo ensure the complete security of your goods, even in challenging environments, our personnel serve as the first point of contact with both customs authorities and receiving customers.` },
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
  const [active, setActive] = useState(0);

  return (
    <main className="relative flex h-screen w-full flex-col overflow-hidden bg-[#030608] text-[#E5E4E2]">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] h-[60%] w-[60%] rounded-full bg-cyan-600/10 blur-[160px]" />
        <div className="absolute bottom-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-blue-900/10 blur-[140px]" />
      </div>

      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100]">
        <AppleGlassNav items={NAV_LINKS} theme="dark" />
      </div>

      <div className="relative z-10 flex flex-1 pt-32 px-10 pb-10 gap-8 overflow-hidden">
        
        {/* LEFT COLUMN */}
        <div className="flex w-[320px] flex-col gap-8 shrink-0 overflow-y-auto no-scrollbar border-r border-white/5 pr-8">
          <div className="space-y-2 shrink-0">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-500">Logistics Excellence</span>
            <h1 className="text-4xl font-black tracking-tighter uppercase text-white leading-none">Our<br />Services</h1>
          </div>

          <div className="flex flex-col gap-2">
            {SERVICES.map((item, i) => {
              const Icon = item.icon;
              const isActive = active === i;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    "relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-300 cursor-pointer",
                    isActive 
                      ? "border-cyan-500/30 bg-white/5 shadow-[0_0_20px_rgba(6,182,212,0.05)] translate-x-2" 
                      : "border-transparent hover:bg-white/[0.02]"
                  )}
                >
                  <div className={cn(
                    "flex h-8 w-8 items-center justify-center transition-colors",
                    isActive ? "text-cyan-400" : "text-white/20"
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <h3 className={cn("text-xs font-bold uppercase tracking-widest transition-all", isActive ? "text-white" : "text-white/30")}>
                    {item.title}
                  </h3>

                  {isActive && (
                    <motion.div 
                      layoutId="nav-glow" 
                      className="absolute right-3 h-1 w-1 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" 
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="relative flex-1 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 overflow-hidden"
            >
              {/* This inner div handles the slow drift to prevent exit stuttering */}
              <motion.div
                initial={{ scale: 1.15, x: "1%" }}
                animate={{ scale: 1.05, x: "-1%" }}
                transition={{ duration: 10, ease: "linear" }}
                className="absolute inset-0"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${SERVICES[active].image})` }}
                />
              </motion.div>
              
              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Details */}
          <div className="relative h-full flex flex-col justify-end p-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={active + "desc"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl"
              >
                <div className="flex gap-4 mb-6">
                  {SERVICES[active].highlights.map((h) => (
                    <span key={h} className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500">
                      {h}
                    </span>
                  ))}
                </div>

                <h2 className="text-6xl font-extrabold uppercase tracking-[0.15em] leading-[1.1] mb-10 text-white drop-shadow-2xl">
                  {SERVICES[active].title}
                </h2>

                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/60 to-transparent" />
                  <p className="text-base font-light leading-relaxed text-white/90 whitespace-pre-line tracking-wide drop-shadow-lg">
                    {SERVICES[active].description}
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-6">
                   <div className="h-[1px] w-16 bg-cyan-500/50" />
                   <span className="text-[9px] font-bold text-white/30 uppercase tracking-[0.5em]">System Archive 0{active + 1}</span>
                   <div className="flex-1 h-[1px] bg-white/5" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute top-12 right-12 opacity-5 pointer-events-none select-none">
             <span className="text-9xl font-black tracking-tighter text-white">0{active + 1}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
