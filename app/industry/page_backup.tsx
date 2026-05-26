"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import Image from "next/image";
import Link from "next/link";

// ─── Uilora Global Styles ────────────────────────────────────────────────────
const globalStyles = `
  @keyframes gradient-x {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
  .animate-gradient-x {
    animation: gradient-x 4s ease-in-out infinite;
    background-size: 200% 200%;
  }
  /* Hide scrollbar for a seamless app-like experience */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ─── Cinematic Bidirectional Scroll Reveal Hook ──────────────────────────────
function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Bidirectional: updates state on both enter and exit
        setVisible(entry.isIntersecting);
      },
      { threshold, rootMargin: "50px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ─── Cinematic Reveal Component ──────────────────────────────────────────────
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "scale" | "none";
}

function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const { ref, visible } = useScrollReveal(0.1);

  const dirMap = {
    up: "translateY(40px)",
    down: "translateY(-40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
    scale: "scale(0.95)",
    none: "translate(0,0)",
  };

  const transformValue = visible 
    ? (direction === "scale" ? "scale(1)" : "translate(0,0)") 
    : dirMap[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: transformValue,
        transition: `all 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Bright Text Highlight Component ─────────────────────────────────────────
const HighlightTitle = ({ text, gradient, className = "" }: { text: string, gradient: string, className?: string }) => {
    const words = text.split(" ");
    return (
        <span className={`inline-block ${className}`}>
            {words.map((word, wIdx) => {
                const firstChar = word.charAt(0);
                const rest = word.slice(1);
                return (
                    <React.Fragment key={wIdx}>
                        <span className="inline-block relative">
                            {/* Super bright colored first letter */}
                            <span className={`bg-clip-text text-transparent bg-gradient-to-br ${gradient} font-black drop-shadow-[0_0_12px_rgba(255,255,255,0.6)]`}>
                                {firstChar}
                            </span>
                            {/* Pure white rest of the word */}
                            <span className="text-black drop-shadow-md">
                                {rest}
                            </span>
                        </span>
                        {wIdx < words.length - 1 && <span className="inline-block w-[0.25em]" />}
                    </React.Fragment>
                );
            })}
        </span>
    );
};

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
];

const INDUSTRIES = [
    {
        name: "Automotive",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
        description: "End-to-end supply chain integration for the global automotive sector. From Just-In-Time (JIT) parts procurement to finished vehicle distribution, we ensure production lines never halt. Our specialized teams manage complex cross-border transit, customs clearance, and inventory tracking to keep your assembly lines moving flawlessly.",
        features: ["JIT Procurement", "Vehicle Distribution", "Assembly Support"],
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        name: "Lifestyle & Fashions",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        description: "Agile, fast-paced logistics tailored for seasonal retail cycles, luxury apparel, and high-volume fashion distribution. We offer white-glove handling for high-value garments, hanging-garment transport, and rapid fulfillment strategies to ensure your latest collections hit the shelves right on time.",
        features: ["Seasonal Cycles", "Luxury Apparel", "White-Glove"],
        gradient: "from-pink-500 to-rose-500"
    },
    {
        name: "Hightech",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        description: "Globally compliant, ultra-secure, and agile logistics built for the fast-evolving electronics industry. We protect fragile silicon, server racks, and advanced consumer technology through anti-static environments, GPS-tracked secure transit, and stringent temperature controls.",
        features: ["Ultra-Secure", "Fragile Handling", "GPS Transit"],
        gradient: "from-indigo-500 to-purple-500"
    },
    {
        name: "Medical Supplies",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
        description: "Precision temperature-controlled environments, cold-chain logistics, and highly secure transport networks dedicated to critical healthcare. Whether it's life-saving pharmaceuticals, sensitive bio-materials, or advanced surgical equipment, we guarantee zero-compromise delivery compliance.",
        features: ["Cold-Chain", "Secure Transport", "Bio-Materials"],
        gradient: "from-emerald-500 to-teal-500"
    },
    {
        name: "FMCG",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
        description: "High-volume, rapid-turnaround distribution networks engineered for fast-moving consumer goods to optimize shelf availability. We minimize warehouse dwell times and leverage predictive routing to ensure groceries, perishables, and daily consumables reach consumers at peak freshness.",
        features: ["Shelf Optimization", "High-Volume", "Predictive Routing"],
        gradient: "from-lime-600 to-green-600"
    },
    {
        name: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        description: "Comprehensive retail supply chain management integrating warehousing, e-commerce fulfillment, and store replenishment. We seamlessly connect your digital storefronts with physical inventory, offering same-day dispatch capabilities and reverse logistics for hassle-free consumer returns.",
        features: ["E-Commerce", "Warehousing", "Reverse Logistics"],
        gradient: "from-fuchsia-500 to-pink-500"
    },
    {
        name: "Energy Generation",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
        description: "Specialized project cargo for massive energy infrastructure. We seamlessly move oversized turbines, renewable wind components, and heavy-duty traditional power generators across borders. Our engineers plan meticulous routing for abnormal loads to ensure safe, timely site delivery.",
        features: ["Project Cargo", "Oversized Infrastructure", "Abnormal Loads"],
        gradient: "from-amber-500 to-orange-500"
    },
    {
        name: "Plant & Machinery",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
        description: "Expert handling of massive out-of-gauge (OOG) cargo, break-bulk, and heavy-lift industrial machinery for manufacturing plants. From dismantling industrial sites to reinstalling heavy presses overseas, we provide heavy-lift cranes, flat rack containers, and full vessel charters.",
        features: ["Heavy-Lift", "Break-Bulk", "Vessel Charters"],
        gradient: "from-red-500 to-orange-500"
    }
];

// ─── Individual Snapping Text Block ──────────────────────────────────────────
function ScrollSection({ 
    industry, 
    index, 
    isActive, 
    setActiveIndex 
}: { 
    industry: any, 
    index: number, 
    isActive: boolean, 
    setActiveIndex: (i: number) => void 
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setActiveIndex(index);
                }
            },
            // Trigger when it hits the middle 40% of the screen
            { rootMargin: "-30% 0px -30% 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [index, setActiveIndex]);

    return (
        <div 
            ref={ref} 
            // VERY IMPORTANT: snap-always snap-center forces the auto-align the user wants. 
            // h-screen ensures exactly one block fits on the screen at a time.
            className={`snap-always snap-center h-screen flex flex-col justify-center transition-all duration-700 ease-in-out p-6 md:p-12 lg:bg-transparent ${
                isActive 
                ? 'opacity-100 scale-100 bg-white/80 backdrop-blur-xl border border-black/10 lg:border-none rounded-[2rem] lg:rounded-none' 
                : 'opacity-0 scale-95 translate-y-8 pointer-events-none bg-transparent'
            }`}
        >
            <h3 className={`text-3xl md:text-4xl font-bold tracking-tight mb-4 drop-shadow-xl transition-all duration-700 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <HighlightTitle text={industry.name} gradient={industry.gradient} />
            </h3>
            <p className={`text-zinc-600 text-lg leading-relaxed mb-6 drop-shadow-md transition-all duration-700 delay-200 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {industry.description}
            </p>
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                {industry.features.map((f: string) => (
                    <div 
                        key={f} 
                        className={`p-[1px] rounded-full bg-gradient-to-r ${industry.gradient} shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:scale-105 transition-transform duration-300 ease-out cursor-default`}
                    >
                        <div className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md w-full h-full flex items-center justify-center">
                            <span className={`bg-clip-text text-transparent bg-gradient-to-r ${industry.gradient} font-bold text-sm tracking-wide`}>
                                {f}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function Industry() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        // Changed main to the primary scroll container with CSS Scroll Snapping enabled
        <main className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory hide-scrollbar bg-white text-black selection:bg-blue-500 selection:text-white scroll-smooth relative">
            <style>{globalStyles}</style>

            {/* Apple Glass Nav */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                <div className="relative">
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
            </div>

            {/* Compact Centered Header */}
            <section className="snap-start pt-32 pb-4 px-4 flex flex-col items-center justify-center text-center shrink-0">
                <Reveal direction="down">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 mt-8">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x inline-block pr-2">
                            Industry
                        </span>
                        <span className="text-black drop-shadow-[0_0_20px_rgba(0,0,0,0.1)]">Solutions</span>
                    </h1>
                </Reveal>
                <Reveal direction="up" delay={0.1}>
                    <p className="text-zinc-600 text-lg max-w-2xl mx-auto leading-relaxed">
                        Dedicated supply chain management and specialized logistics for the world's most demanding sectors.
                    </p>
                </Reveal>
                <Reveal direction="up" delay={0.2}>
                    <div className="flex flex-col items-center mt-8">
                        <span className="text-xs tracking-[0.2em] text-zinc-500 uppercase mb-3 animate-pulse">Scroll to Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent" />
                    </div>
                </Reveal>
            </section>

            {/* Auto-Align Sticky Scroll Sequence */}
            <section className="relative max-w-[1400px] mx-auto px-4 md:px-8 flex flex-col lg:flex-row items-start pb-[20vh]">
                
                {/* Left: Sticky Image Viewer */}
                {/* h-screen so it stays in the viewport perfectly. */}
                <div className="w-full lg:w-1/2 sticky top-0 h-screen flex flex-col justify-center lg:py-24 z-0 pointer-events-none">
                    {/* The image container */}
                    <div className="w-full h-full lg:h-[85%] rounded-[2rem] lg:rounded-[3rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative border border-white/5">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={activeIndex}
                                src={INDUSTRIES[activeIndex].image}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        {/* Subtle aesthetic gradient overlay at bottom for blending */}
                        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" />
                    </div>
                </div>

                {/* Right: Snap Scrolling Content */}
                {/* We use negative margin on mobile so it slides over the sticky image perfectly */}
                <div className="w-full lg:w-1/2 flex flex-col z-10 relative -mt-[100vh] lg:mt-0">
                    {INDUSTRIES.map((industry, index) => (
                        <ScrollSection 
                            key={industry.name} 
                            index={index} 
                            industry={industry} 
                            isActive={activeIndex === index}
                            setActiveIndex={setActiveIndex} 
                        />
                    ))}
                </div>

            </section>
        </main>
    );
}

