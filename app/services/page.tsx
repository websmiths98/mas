"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ... (Interfaces remain the same)
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
  height?: string;
  borderRadius?: string;
}

const AccordionSplit: React.FC<AccordionSplitProps> = ({
  items = [
    /* ... default items ... */
    {
      id: "1",
      label: "Air Freight",
      title: "Global Air Freight",
      description: "Fast, secure, and time-critical air cargo solutions powered by trusted global carrier networks.",
      image: "/air_freight_service.png",
    },
    {
      id: "2",
      label: "Sea Freight",
      title: "Ocean Freight Solutions",
      description: "Reliable and cost-effective sea cargo services with seamless global shipping and end-to-end visibility.",
      image: "/sea_freight_services.jpeg",
    },
    {
      id: "3",
      label: "Warehousing & Distribution",
      title: "Warehousing & Distribution Services",
      description: "Flexible dedicated and multi-user warehousing solutions designed for efficient operations, scalability, and faster delivery.",
      image: "/warehousing__Distribution_logistics_service.jpeg",
    },
    {
      id: "4",
      label: "Customs Brokerage",
      title: "Customs Brokerage",
      description: "Smooth and reliable customs clearance services with expert compliance support for hassle-free international shipping.",
      image: "customs_brokerage_specialized_services.jpeg",
    },
    {
      id: "5",
      label: "Project & ODC",
      title: "Project & ODC Cargo",
      description: "Expert handling of oversized and heavy-lift cargo with precise planning, specialized equipment, and reliable execution.",
      image: "/project___ODC_Cargo_services.jpeg",
    },
    {
      id: "6",
      label: "Break-Bulk Shipping",
      title: "Break-Bulk Shipping",
      description: "Specialized transport solutions for oversized and heavy cargo with secure handling, global carrier support, and end-to-end coordination.",
      image: "Break-Bulk_Cargo_services.jpeg",
    },

  ],
  backgroundColor = "transparent",
  containerBorderColor = "#e4e4e7",
  itemBorderColor = "#e4e4e7",
  labelColor = "#ffffff",
  titleColor = "#ffffff",
  descriptionColor = "#d4d4d8",
  defaultActive = null,
  height = "30rem",
  borderRadius = "0.75rem",
}) => {
  const [active, setActive] = useState<number | null>(defaultActive);

  return (
    <div
      className="flex w-full overflow-hidden border"
      // Added onMouseLeave here so if the cursor leaves the whole container, 
      // it goes back to the default state (optional)
      onMouseLeave={() => setActive(defaultActive)}
      style={{
        backgroundColor,
        borderColor: containerBorderColor,
        height,
        borderRadius,
      }}
    >
      {items.map((item, i) => {
        const isActive = active === i;

        return (
          <div
            key={item.id}
            // CHANGED: From onClick to onMouseEnter
            onMouseEnter={() => setActive(i)}
            className={cn(
              "relative group flex flex-col justify-end p-6 cursor-default overflow-hidden",
              isActive ? "flex-[4]" : "flex-1 border-l first:border-l-0"
            )}
            style={{
              borderColor: !isActive ? itemBorderColor : "transparent",
              backgroundImage: item.image
                ? `linear-gradient(rgba(0,0,0,${isActive ? 0.3 : 0.15}), rgba(0,0,0,${isActive ? 0.72 : 0.45})), url(${item.image})`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              transition: "flex 0.4s cubic-bezier(0.4,0,0.2,1)",
            }}
          >
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span
              className="relative z-10 text-sm font-medium tracking-wide"
              style={{ color: labelColor }}
            >
              {item.label}
            </span>

            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
                className="relative z-10 mt-3 max-w-md"
              >
                {item.title && (
                  <h3
                    className="text-xl md:text-2xl font-semibold mb-2"
                    style={{ color: titleColor }}
                  >
                    {item.title}
                  </h3>
                )}
                {item.description && (
                  <p className="text-sm leading-relaxed" style={{ color: descriptionColor }}>
                    {item.description}
                  </p>
                )}
                {item.content && <div className="mt-2">{item.content}</div>}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ... (Rest of the Services component remains the same)
export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-center gap-6 py-6 border-b border-zinc-200">
        {[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Solutions", href: "/solutions" },
          { name: "Industries", href: "/industry" },
          { name: "About us", href: "/about" },
        ].map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-zinc-700 hover:text-black">
            {l.name}
          </a>
        ))}
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
          Services
        </h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-20">
        <AccordionSplit />
      </div>
    </div>
  );
}
