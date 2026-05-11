"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

// ─── Cinematic Scroll-Reveal Hook ────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      },
      { threshold }
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
        filter: visible ? "blur(0px)" : "blur(8px)",
        transition: `all 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/network" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

const INDUSTRIES = [
    {
        name: "Automotive",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1200&auto=format&fit=crop",
        description: "End-to-end supply chain integration for the global automotive sector. From Just-In-Time (JIT) parts procurement to finished vehicle distribution, we ensure production lines never halt.",
        className: "md:col-span-2 md:row-span-2"
    },
    {
        name: "Lifestyle & Fashions",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        description: "Agile, fast-paced logistics tailored for seasonal retail cycles, luxury apparel, and high-volume fashion distribution.",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Medical Supplies",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
        description: "Precision temperature-controlled environments, cold-chain logistics, and highly secure transport networks dedicated to critical healthcare.",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Energy Generation",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
        description: "Specialized project cargo for massive energy infrastructure. We seamlessly move oversized turbines, renewable wind components, and heavy-duty traditional power generators across borders.",
        className: "md:col-span-2 md:row-span-1"
    },
    {
        name: "Hightech",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        description: "Globally compliant, ultra-secure, and agile logistics built for the fast-evolving electronics industry. We protect fragile silicon, server racks, and advanced consumer technology.",
        className: "md:col-span-1 md:row-span-2"
    },
    {
        name: "FMCG",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
        description: "High-volume, rapid-turnaround distribution networks engineered for fast-moving consumer goods to optimize shelf availability.",
        className: "md:col-span-1 md:row-span-1"
    },
    {
        name: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        description: "Comprehensive retail supply chain management integrating warehousing, e-commerce fulfillment, and store replenishment to ensure products meet consumer demand instantly.",
        className: "md:col-span-2 md:row-span-1"
    },
    {
        name: "Plant & Machinery",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
        description: "Expert handling of massive out-of-gauge (OOG) cargo, break-bulk, and heavy-lift industrial machinery for manufacturing plants, mining sites, and global construction projects.",
        className: "md:col-span-3 md:row-span-1"
    }
];

export default function Industry() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES[0] | null>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (selectedIndustry) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedIndustry]);

    return (
        <main className="min-h-screen bg-[#E5E4E2] text-zinc-900 overflow-x-hidden selection:bg-black selection:text-white">
            <nav className="flex items-center justify-center gap-6 py-6 border-b border-zinc-200">
                {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className="text-sm text-zinc-700 hover:text-black transition-colors">
                        {l.name}
                    </a>
                ))}
            </nav>

            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                <div className="relative">
                    <AppleGlassNav items={NAV_LINKS} theme="light" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
                <Reveal direction="down" delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 mb-6">
                        Industry Solutions
                    </h1>
                </Reveal>
                <Reveal direction="up" delay={0.2}>
                    <p className="text-lg md:text-2xl text-zinc-500 max-w-3xl font-light leading-relaxed">
                        Delivering dedicated supply chain management and specialized logistics for the world&apos;s most demanding and dynamic sectors.
                    </p>
                </Reveal>
            </div>

            {/* Modern Bento Box Grid with Shared Element Transitions */}
            <section className="relative z-30 px-6 pb-32 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4">
                    {INDUSTRIES.map((industry, index) => {
                        const isHovered = hoveredIndex === index;
                        // Hide the grid item if it's currently selected to avoid duplicates during layout animation
                        const isSelected = selectedIndustry?.name === industry.name;

                        return (
                            <Reveal 
                                key={industry.name} 
                                direction="scale" 
                                delay={index * 0.05}
                                className={`${industry.className} ${isSelected ? 'invisible' : 'visible'}`}
                            >
                                <motion.div
                                    layoutId={`card-${industry.name}`}
                                    onClick={() => setSelectedIndustry(industry)}
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                    className="relative w-full h-full rounded-3xl overflow-hidden cursor-pointer group block bg-zinc-100"
                                >
                                    <motion.div className="absolute inset-0 w-full h-full">
                                        <motion.img 
                                            layoutId={`image-${industry.name}`}
                                            src={industry.image} 
                                            alt={`Logistics for ${industry.name}`}
                                            className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
                                        />
                                    </motion.div>

                                    <motion.div 
                                        animate={{ opacity: isHovered ? 0.75 : 0.35 }}
                                        transition={{ duration: 0.5 }}
                                        className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" 
                                    />

                                    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8">
                                        <motion.h3 
                                            layoutId={`title-${industry.name}`}
                                            className="text-2xl md:text-3xl font-bold text-white tracking-tight relative z-30"
                                        >
                                            {industry.name}
                                        </motion.h3>

                                        <div className="overflow-hidden">
                                            <AnimatePresence>
                                                {isHovered && (
                                                    <motion.p
                                                        initial={{ opacity: 0, height: 0, y: 15 }}
                                                        animate={{ opacity: 1, height: "auto", y: 0 }}
                                                        exit={{ opacity: 0, height: 0, y: 15 }}
                                                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                                        className="text-white/80 text-sm md:text-base leading-relaxed mt-3 max-w-xl line-clamp-2"
                                                    >
                                                        Click to explore logistics for {industry.name}
                                                    </motion.p>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </motion.div>
                            </Reveal>
                        );
                    })}
                </div>
            </section>

            {/* Cinematic Modal Expansion */}
            <AnimatePresence>
                {selectedIndustry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setSelectedIndustry(null)}
                            className="absolute inset-0 bg-white/70 backdrop-blur-xl cursor-zoom-out"
                        />
                        
                        <motion.div 
                            layoutId={`card-${selectedIndustry.name}`}
                            className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-zinc-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="relative w-full h-[45%] md:h-[60%] shrink-0">
                                <motion.img 
                                    layoutId={`image-${selectedIndustry.name}`}
                                    src={selectedIndustry.image} 
                                    alt={selectedIndustry.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                                
                                <button 
                                    onClick={() => setSelectedIndustry(null)}
                                    className="absolute top-6 right-6 w-12 h-12 bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors z-50 border border-white/20"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className="relative p-8 md:p-16 flex flex-col justify-start flex-1 bg-zinc-900 z-10 overflow-y-auto">
                                <motion.h3 
                                    layoutId={`title-${selectedIndustry.name}`}
                                    className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-8"
                                >
                                    {selectedIndustry.name}
                                </motion.h3>
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-8"
                                >
                                    <p className="text-xl md:text-2xl text-zinc-300 font-light leading-relaxed max-w-4xl">
                                        {selectedIndustry.description}
                                    </p>
                                    
                                    <div className="pt-8 border-t border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-12">
                                        <div>
                                            <h5 className="text-zinc-100 font-medium text-lg mb-4">Key Logistics Offerings</h5>
                                            <ul className="text-zinc-400 space-y-3">
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    Dedicated supply chain planning
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    Real-time global tracking visibility
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                                                    Customs compliance & expedited clearance
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-zinc-100 font-medium text-lg mb-4">Service Excellence</h5>
                                            <p className="text-zinc-400 leading-relaxed">
                                                Our specialized teams operate around the clock to ensure your {selectedIndustry.name.toLowerCase()} cargo reaches its destination safely and on schedule, minimizing operational downtime and maximizing your ROI.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <section className="relative border-t border-zinc-200 bg-zinc-50 py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <Reveal direction="left" delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-zinc-900 mb-8">
                                Proven Track Record
                            </h2>
                        </Reveal>
                        
                        <div className="space-y-8">
                            <Reveal direction="up" delay={0.2}>
                                <div>
                                    <h4 className="text-xl font-medium text-zinc-900 mb-3">Global Expertise</h4>
                                    <p className="text-zinc-600 leading-relaxed font-light text-lg">
                                        We treat each single project as a unique assignment with special attention to every detail, from design and planning to execution and delivery. Our dedicated global project cargo teams plan and coordinate entire logistics networks.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal direction="up" delay={0.3}>
                                <div>
                                    <h4 className="text-xl font-medium text-zinc-900 mb-3">Specialized Project Cargo</h4>
                                    <p className="text-zinc-600 leading-relaxed font-light text-lg">
                                        We have the ability to handle your complex transport logistics, whether it is cargo shipped as Break Bulk (BB), Heavy Lift (HL) or Out of Gauge (OOG). With dedicated teams of professionals attending to your industrial needs, be assured that your cargo will be safely transported globally.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal direction="right" delay={0.4}>
                        <div className="relative rounded-[2rem] overflow-hidden aspect-square lg:aspect-[4/5] bg-zinc-200 shadow-2xl group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1400&auto=format&fit=crop" 
                                    alt="Project Cargo Logistics"
                                    className="w-full h-full object-cover"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                            
                            <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                                <div className="backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl">
                                    <h5 className="text-xl font-semibold text-white mb-3">People on the ground</h5>
                                    <p className="text-white/90 font-light leading-relaxed">
                                        Our local Project Cargo experts are present in key centers around the world to ensure footprint in emerging markets is unmatched.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </main>
    );
}
