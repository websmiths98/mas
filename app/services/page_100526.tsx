"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// --- UPDATED ANIMATED TEXT COMPONENT (Word-based to prevent orphan characters) ---
const AnimatedText = ({ text, className }: { text: string; className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.3, ease: "easeOut" }
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-block", className)}
    >
      {/* Splitting by " " (space) ensures words stay intact and don't break mid-character */}
      {text.split(" ").map((word, index) => (
        <motion.span 
          key={index} 
          variants={childVariants} 
          className="inline-block whitespace-nowrap"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.span>
  );
};

interface AccordionItem {
  id: string;
  label: string;
  title?: string;
  description?: string;
  content?: React.ReactNode;
  image?: string;
}

interface AccordionSplitProps {
  items?: AccordionItem[];
  backgroundColor?: string;
  containerBorderColor?: string;
  itemBorderColor?: string;
  labelColor?: string;
  titleColor?: string;
  descriptionColor?: string;
  defaultActive?: number | null;
}

const AccordionSplit: React.FC<AccordionSplitProps> = ({
  items = [
    { id: "1", label: "Air Freight", title: "Global Air Freight", description: "Fast, secure, and time-critical air cargo solutions powered by trusted global carrier networks.", image: "/air_freight_service.png" },
    { id: "2", label: "Sea Freight", title: "Ocean Freight Solutions", description: "Reliable and cost-effective sea cargo services with seamless global shipping and end-to-end visibility.", image: "/sea_freight_services.jpeg" },
    { id: "3", label: "Warehousing & Distribution", title: "Warehousing & Distribution Services", description: "Flexible dedicated and multi-user warehousing solutions designed for efficient operations.", image: "/warehousing__Distribution_logistics_service.jpeg" },
    { id: "4", label: "Customs Brokerage", title: "Customs Brokerage", description: "Smooth and reliable customs clearance services with expert compliance support.", image: "customs_brokerage_specialized_services.jpeg" },
    { id: "5", label: "Project & ODC", title: "Project & ODC Cargo", description: "Expert handling of oversized and heavy-lift cargo with precise planning.", image: "/project___ODC_Cargo_services.jpeg" },
    { id: "6", label: "Break-Bulk Shipping", title: "Break-Bulk Shipping", description: "Specialized transport solutions for oversized and heavy cargo with secure handling.", image: "Break-Bulk_Cargo_services.jpeg" },
  ],
  backgroundColor = "transparent",
  containerBorderColor = "#e4e4e7",
  itemBorderColor = "#e4e4e7",
  labelColor = "#ffffff",
  titleColor = "#ffffff",
  descriptionColor = "#d4d4d8",
  defaultActive = null,
}) => {
  const [active, setActive] = useState<number | null>(defaultActive);

  return (
    <div
      className="flex w-full h-full overflow-hidden border"
      onMouseLeave={() => setActive(defaultActive)}
      style={{
        backgroundColor,
        borderColor: containerBorderColor,
        borderRadius: "0.75rem",
      }}
    >
      {items.map((item, i) => {
        const isActive = active === i;
        return (
          <div
            key={item.id}
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative group flex flex-col justify-end p-8 cursor-pointer overflow-hidden transition-all duration-500 ease-[0.4,0,0.2,1]",
              isActive ? "flex-[12]" : "flex-1 border-l first:border-l-0"
            )}
            style={{ borderColor: !isActive ? itemBorderColor : "transparent" }}
          >
            <div
              className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
              style={{
                backgroundImage: item.image
                  ? `linear-gradient(rgba(0,0,0,${isActive ? 0.4 : 0.2}), rgba(0,0,0,${isActive ? 0.8 : 0.5})), url(${item.image})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: isActive ? "scale(1.05)" : "scale(1)",
              }}
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: labelColor }}>
               {item.label}
            </span>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="relative z-10 mt-4 max-w-2xl"
              >
                {item.title && (
                  <h3 className="text-2xl md:text-4xl font-bold mb-3" style={{ color: titleColor }}>
                    <AnimatedText text={item.title} />
                  </h3>
                )}
                {item.description && (
                  <p className="text-base md:text-lg leading-relaxed opacity-90" style={{ color: descriptionColor }}>
                    <AnimatedText text={item.description} />
                  </p>
                )}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function Services() {
  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden text-gray-900">
      <nav className="flex items-center justify-center gap-8 py-4 border-b border-zinc-100 flex-shrink-0">
        {[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Solutions", href: "/solutions" },
          { name: "Industries", href: "/industry" },
          { name: "About us", href: "/about" },
        ].map((l) => (
          <a key={l.href} href={l.href} className="text-sm font-medium text-zinc-500 hover:text-black transition-colors">
            <AnimatedText text={l.name} />
          </a>
        ))}
      </nav>

      {/* Title & Subtitle Section */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-8 pb-6 flex-shrink-0">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 mb-2">
          <AnimatedText text="Core Services" />
        </h1>
        <p className="max-w-4xl text-zinc-500 text-sm md:text-base leading-relaxed">
          <AnimatedText text="MAS Logistics delivers reliable and efficient logistics solutions across global markets. Our services are designed to support businesses at every stage of the supply chain with clarity, consistency, and control." />
        </p>
      </div>

      {/* Accordion taking remaining height */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 pb-6">
        <AccordionSplit />
      </div>
    </div>
  );
}

