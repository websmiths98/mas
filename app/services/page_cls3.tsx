"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
  { id: "1", title: "Air Freight", image: "/air_freight_service.webp", icon: IconPlane, highlights: ["Express & Charter", "200+ Destinations"], description: `We provide fast and reliable air freight services through strong partnerships with leading global carriers. Our network enables smooth handling of time-sensitive shipments across international destinations.\n\n➤ Priority and express shipments\n➤ Global carrier network\n➤ Secure cargo handling\n➤ Time-critical delivery support` },
  { id: "2", title: "Sea Freight", image: "/sea_freight_services.webp", icon: IconShip, highlights: ["FCL & LCL", "Global Carriers"], description: `Our sea freight solutions are designed for flexibility and cost efficiency. Whether it is full container loads or smaller shipments, we ensure reliable movement through our global partner network.\n\n➤ FCL and LCL shipments\n➤ Competitive global routing\n➤ Strong port connectivity\n➤ End-to-end shipment visibility` },
  { id: "3", title: "Warehousing & Distribution", image: "/warehousing__Distribution_logistics_service.webp", icon: IconWarehouse, highlights: ["Bonded Storage", "Last-Mile"], description: `MAS warehousing services are specifically designed for your requirement; gives flexibility and scalability to cater to your business growth and overall needs.\n\nMAS offer shared warehouse, if you have low volumes, uncertain demand or seasonal operational fluctuations, operating in a shared warehousing allows you to enjoy the benefits at significantly low cost.` },
  { id: "4", title: "Project & ODC Cargo", image: "/project___ODC_Cargo_services.webp", icon: IconBoxes, highlights: ["Heavy Lift", "Route Surveys"], description: `We specialize in handling oversized, heavy-lift, and complex cargo that requires careful planning and execution. Our team ensures safe handling and timely delivery of critical shipments.\n\n➤ Heavy and oversized cargo handling\n➤ Route planning and coordination\n➤ Specialized equipment support\n➤ End-to-end project execution` },
  { id: "5", title: "Break-Bulk Shipping", image: "/Break-Bulk_Cargo_services.webp", icon: IconContainer, highlights: ["Charter Vessels", "Port Ops"], description: `MAS Logistics break-bulk services are designed to meet your shipping needs of over-sized, odd-sized or over-weight cargoes.\n\nApart from regular sailings, We also provide entire transportation solutions for general cargo, project cargo, steel products, etc. Our add-on options include packing, crating and rigging.` },
  { id: "6", title: "Customs Brokerage", image: "/customs_brokerage_specialized_services.webp", icon: IconFile, highlights: ["HS Classification", "Compliance"], description: `Our highly efficient customs brokerage, clearance and compliance service is designed to take the complexity out of the customs process.\n\nTo ensure the complete security of your goods, even in challenging environments, our personnel serve as the first point of contact with both customs authorities and receiving customers.` },
];

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

export default function ServicesPage() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Calculate sliding. 6 cards, we map scroll to horizontal shift
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  // Fade out and translate the left title during the first 15% of the scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.15], ["0%", "-20%"]);

  return (
    <main className="relative bg-[#030608] text-[#E5E4E2] selection:bg-cyan-500/30">
      {/* Navigation */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <AppleGlassNav 
          items={NAV_LINKS} 
          theme="dark" 
          logo={
            <Link href="/" className="flex items-center">
              <Image
                src="/mas_logo.webp"
                alt="Logo"
                width={200}
                height={50}
                className="h-9 w-30 object-contain transform scale-225 origin-centre brightness-0 invert" 
                priority
              />
            </Link>
          }
        />
      </div>

      {/* Intro hero spacer */}
      <section className="h-[50vh] flex flex-col justify-end px-12 md:px-24 pb-20">
         <div className="space-y-2">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase text-cyan-500">Logistics Excellence</span>
            <h1 className="text-6xl font-black tracking-tighter uppercase text-white leading-none">Our<br />Services</h1>
         </div>
      </section>

      {/* The Shiprocket-Style Trusted Partner Sliding Section */}
      <section ref={targetRef} className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
          
          {/* Left Title: Sticky Info Panel (Fades out on scroll) */}
          <motion.div 
            style={{ opacity: textOpacity, x: textX }} 
            className="absolute left-12 md:left-24 top-1/2 -translate-y-1/2 w-[90%] md:w-[450px] z-10 pointer-events-none"
          >
            <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase leading-[1.1] text-white mb-6 drop-shadow-2xl">
              Why is MAS Logistics the <br/><span className="text-cyan-400">Trusted Partner</span> for Scaling Businesses?
            </h2>
            <div className="h-1 w-16 bg-cyan-500 mb-6" />
            <p className="text-lg text-white/80 font-light leading-relaxed drop-shadow-md">
              From end-to-end shipping to complex global scaling, we handle the logistics so you can focus on pursuing bigger goals. Swipe through our unified suite of services.
            </p>
          </motion.div>

          {/* Right Sliding Cards Container */}
          <motion.div style={{ x }} className="flex pl-[100vw] md:pl-[45vw] gap-12 md:gap-20 pr-[20vw] items-center h-[85vh]">
            {SERVICES.map((service) => (
              <div 
                key={service.id} 
                className="relative h-[70vh] md:h-[80vh] min-h-[450px] w-[85vw] md:w-[80vw] shrink-0 rounded-[3rem] border border-white/10 overflow-hidden group bg-black shadow-2xl"
              >
                {/* Background Image */}
                <Image 
                  src={service.image} 
                  alt={service.title} 
                  fill 
                  className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 opacity-50 group-hover:opacity-70" 
                  priority={service.id === "1" || service.id === "2"}
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-cyan-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 mix-blend-color-dodge pointer-events-none" />
                
                {/* Content */}
                <div className="absolute inset-0 p-10 md:p-16 flex flex-col justify-between">
                   
                   {/* Top: Icon & Highlights */}
                   <div>
                     <div className="h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md mb-8 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all duration-500">
                        <service.icon className="h-8 w-8 md:h-10 md:w-10 text-white group-hover:text-cyan-400 transition-colors" />
                     </div>
                     <div className="flex gap-4 flex-wrap">
                       {service.highlights.map(h => (
                         <span key={h} className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-cyan-400 bg-cyan-400/10 px-3 py-1.5 rounded-sm border border-cyan-400/20">
                           {h}
                         </span>
                       ))}
                     </div>
                   </div>

                   {/* Bottom: Title & Desc */}
                   <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out max-w-4xl">
                     <h3 className="text-5xl md:text-7xl font-extrabold uppercase tracking-widest text-white mb-6 leading-tight drop-shadow-xl">{service.title}</h3>
                     
                     <div className="relative pl-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-gradient-to-b from-cyan-400 to-transparent" />
                        <p className="text-white/80 text-base md:text-xl leading-relaxed whitespace-pre-line drop-shadow-md">
                          {service.description}
                        </p>
                     </div>
                   </div>

                </div>

                {/* Number Watermark */}
                <div className="absolute top-12 right-12 text-8xl md:text-[12rem] font-black text-white/5 pointer-events-none select-none leading-none">
                  0{service.id}
                </div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* Spacer or Footer */}
      <div className="h-[30vh] flex flex-col justify-center items-center text-center opacity-30">
        <span className="text-[10px] font-black tracking-[0.4em] uppercase text-white">End of Services</span>
      </div>
    </main>
  );
}
