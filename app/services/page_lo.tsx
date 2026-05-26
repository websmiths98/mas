"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ---------------- Inline SVG Icons ---------------- */
const IconWrap = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);
const IconPlane = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></IconWrap>
);
const IconShip = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10v4"/><path d="M12 2v3"/></IconWrap>
);
const IconWarehouse = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z"/><path d="M6 18h12"/><path d="M6 14h12"/><rect width="12" height="12" x="6" y="10"/></IconWrap>
);
const IconFile = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></IconWrap>
);
const IconBoxes = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M2.97 12.92A2 2 0 0 0 2 14.63v3.24a2 2 0 0 0 .97 1.71l3 1.8a2 2 0 0 0 2.06 0L12 19v-5.5l-5-3-4.03 2.42Z"/><path d="m7 16.5-4.74-2.85"/><path d="m7 16.5 5-3"/><path d="M7 16.5v5.17"/><path d="M12 13.5V19l3.97 2.38a2 2 0 0 0 2.06 0l3-1.8a2 2 0 0 0 .97-1.71v-3.24a2 2 0 0 0-.97-1.71L17 10.5l-5 3Z"/><path d="m17 16.5-5-3"/><path d="m17 16.5 4.74-2.85"/><path d="M17 16.5v5.17"/><path d="M7.97 4.42A2 2 0 0 0 7 6.13v4.37l5 3 5-3V6.13a2 2 0 0 0-.97-1.71l-3-1.8a2 2 0 0 0-2.06 0l-3 1.8Z"/><path d="M12 8 7.26 5.15"/><path d="m12 8 4.74-2.85"/><path d="M12 13.5V8"/></IconWrap>
);
const IconContainer = ({ className }: { className?: string }) => (
  <IconWrap className={className}><path d="M22 7.7c0-.6-.4-1.2-.8-1.5l-6.3-3.9a1.72 1.72 0 0 0-1.7 0l-10.3 6c-.5.2-.9.8-.9 1.4v6.6c0 .5.4 1.2.8 1.5l6.3 3.9a1.72 1.72 0 0 0 1.7 0l10.3-6c.5-.3.9-1 .9-1.5Z"/><path d="M10 21.9V14L2.1 9.1"/><path d="m10 14 11.9-6.9"/><path d="M14 19.5V8.5"/><path d="M18 17V7"/></IconWrap>
);

/* ---------------- Animated text Component ---------------- */
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.025, delayChildren: 0.1 } },
  };
  const child = {
    hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <motion.span
      ref={ref}
      className={cn("inline-block", className)}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      {text.split("").map((c, i) => (
        <motion.span key={i} variants={child} className="inline-block">
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
};

/* ---------------- Data ---------------- */
interface ServiceItem {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<{ className?: string }>;
  highlights: string[];
}

const SERVICES: ServiceItem[] = [
  { id: "1", label: "Air Freight", title: "Global Air Freight", description: "Fast, secure and time-critical air cargo solutions powered by trusted global carrier networks.", image: "/air_freight_service.png", icon: IconPlane, highlights: ["Express & Charter", "200+ Destinations"] },
  { id: "2", label: "Sea Freight", title: "Ocean Freight Solutions", description: "Reliable and cost-effective sea cargo services with seamless global shipping and end-to-end visibility.", image: "/sea_freight_services.jpeg", icon: IconShip, highlights: ["FCL & LCL", "Global Carriers"] },
  { id: "3", label: "Warehousing", title: "Warehousing & Distribution", description: "Flexible dedicated and multi-user warehousing solutions designed for efficient, scalable operations.", image: "/warehousing__Distribution_logistics_service.jpeg", icon: IconWarehouse, highlights: ["Bonded Storage", "Last-Mile"] },
  { id: "4", label: "Customs Brokerage", title: "Customs Brokerage", description: "Smooth and reliable customs clearance with expert compliance support across global trade lanes.", image: "/customs_brokerage_specialized_services.jpeg", icon: IconFile, highlights: ["HS Classification", "Compliance"] },
  { id: "5", label: "Project & ODC", title: "Project & ODC Cargo", description: "Expert handling of oversized and heavy-lift cargo with precise route planning and engineering.", image: "/project___ODC_Cargo_services.jpeg", icon: IconBoxes, highlights: ["Heavy Lift", "Route Surveys"] },
  { id: "6", label: "Break-Bulk", title: "Break-Bulk Shipping", description: "Specialized transport solutions for oversized and irregular cargo with secure, careful handling.", image: "/Break-Bulk_Cargo_services.jpeg", icon: IconContainer, highlights: ["Charter Vessels", "Port Ops"] },
];

/* ---------------- Accordion ---------------- */
const AccordionSplit: React.FC<{ items?: ServiceItem[] }> = ({ items = SERVICES }) => {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="relative flex h-full w-full flex-col gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white/50 p-3 shadow-sm lg:flex-row lg:gap-2">
      {items.map((item, i) => {
        const isActive = active === i;
        const Icon = item.icon;

        return (
          <motion.div
            key={item.id}
            layout
            onMouseEnter={() => setActive(i)}
            onClick={() => setActive(i)}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "group relative flex cursor-pointer overflow-hidden rounded-xl border border-gray-200 transition-shadow duration-500",
              isActive ? "lg:flex-[6] flex-[4] shadow-lg" : "lg:flex-[1] flex-[1] hover:border-gray-300"
            )}
          >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-out group-hover:scale-105" style={{ backgroundImage: `url(${item.image})` }} />
            <div className={cn("absolute inset-0 transition-opacity duration-500", isActive ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent" : "bg-black/30")} />

            <div className="relative z-10 flex w-full flex-col justify-between p-6 lg:p-8">
              <div className="flex items-start justify-between">
                <div className={cn("flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-500", isActive ? "border-white/40 bg-white/10 backdrop-blur-md" : "border-white/20 bg-black/10")}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <span className={cn("text-[10px] font-medium tracking-[0.2em] text-white/50 transition-opacity", isActive ? "opacity-100" : "opacity-0")}>0{i + 1}</span>
              </div>

              <div>
                <AnimatedText text={item.label} className={cn("mb-2 block text-xs font-medium uppercase tracking-[0.25em] transition-colors", isActive ? "text-cyan-400" : "text-white/60")} />
                <AnimatePresence mode="wait">
                  {isActive && (
                    <motion.div key={item.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.5 }}>
                      <h3 className="mb-3 text-2xl font-semibold leading-tight text-white lg:text-3xl">
                        <AnimatedText text={item.title} />
                      </h3>
                      <p className="mb-5 text-sm leading-relaxed text-white/75 lg:text-base">
                        <AnimatedText text={item.description} />
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.highlights.map((h) => (
                          <span key={h} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                            <AnimatedText text={h} />
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ---------------- Main Page Component ---------------- */
export default function Services() {
  const nav = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
  ];

  return (
    <main className="relative flex h-screen max-h-screen flex-col overflow-hidden bg-white text-gray-900">
      {/* Tight Navigation Header */}
      <header className="relative z-20 mx-auto mt-4 shrink-0">
        <nav className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-xl">
          <ul className="flex items-center">
            {nav.map((item, index) => (
              <li key={item.name} className="flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "group relative px-3.5 text-sm font-medium text-gray-600 transition-colors hover:text-blue-600",
                    index === 0 && "pl-1",
                    index === nav.length - 1 && "pr-1"
                  )}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
                </Link>
                {index < nav.length - 1 && <span className="h-3 w-px bg-gray-200" />}
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Badge Section */}
      <section className="relative z-10 mx-auto mt-6 w-[min(96%,1400px)] shrink-0">
        <div className="flex flex-col items-start gap-2">
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
            <AnimatedText text="Our Services" className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500" />
          </div>
          {/* Invisible spacer for layout balance */}
          <h1 className="h-1 text-transparent"></h1>
        </div>
      </section>

      {/* Accordion Content */}
      <section className="relative z-10 mx-auto mt-2 mb-3 flex min-h-0 w-[min(98%,1700px)] flex-1">
        <AccordionSplit />
      </section>
    </main>
  );
}
