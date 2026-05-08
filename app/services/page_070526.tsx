"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

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
    {
      id: "1",
      label: "Design",
      title: "Craft-first components",
      description:
        "Every Uilora component starts from a visual concept, not a spec doc. The motion is the product.",
      image:
        "https://images.unsplash.com/photo-1774637777045-e7390fc657e8?q=80&w=1400&auto=format&fit=crop",
    },
    {
      id: "2",
      label: "Motion",
      title: "Spring physics by default",
      description:
        "Velocity-driven, scroll-driven, and gesture-driven animations built into every layer.",
      image:
        "https://images.unsplash.com/photo-1775348437069-0f2d58a180ee?w=1400&auto=format&fit=crop&q=60",
    },
    {
      id: "3",
      label: "Code",
      title: "You own the source",
      description:
        "No npm lock-in. Copy the TSX, paste it into your project, and it's yours to fork forever.",
      image:
        "https://images.unsplash.com/photo-1775214593108-5d577e88d219?w=1400&auto=format&fit=crop&q=60",
    },
    {
      id: "4",
      label: "Ship",
      title: "Production-ready",
      description:
        "SSR-compatible, WCAG-audited, and tested in live Next.js deployments before publishing.",
      image:
        "https://images.unsplash.com/photo-1774270905958-86e7eaeae23d?w=1400&auto=format&fit=crop&q=60",
    },
  ],
  backgroundColor = "transparent",
  containerBorderColor = "#e4e4e7",
  itemBorderColor = "#e4e4e7",
  labelColor = "#ffffff",
  titleColor = "#ffffff",
  descriptionColor = "#d4d4d8",
  defaultActive = null,
  height = "20rem",
  borderRadius = "0.75rem",
}) => {
  const [active, setActive] = useState<number | null>(defaultActive);

  return (
    <div
      className="flex w-full overflow-hidden border"
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
            onClick={() => setActive(isActive ? null : i)}
            className={cn(
              "relative group flex flex-col justify-end p-6 cursor-pointer overflow-hidden",
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

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Industries", href: "/industry" },
  { name: "About us", href: "/about" },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav placeholder — keep your AppleGlassNav import if you have it */}
      <nav className="flex items-center justify-center gap-6 py-6 border-b border-zinc-200">
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} className="text-sm text-zinc-700 hover:text-black">
            {l.name}
          </a>
        ))}
      </nav>

      {/* Title */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
          Services
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <AccordionSplit />
      </div>
    </div>
  );
}

