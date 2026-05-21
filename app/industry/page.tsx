"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import Image from "next/image";
import Link from "next/link";

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
          observer.disconnect(); // Optimize: Only reveal once to prevent flickering or disappearing when scrolling
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

interface IndustryProps {
    isEmbedded?: boolean;
}

export default function Industry({ isEmbedded = false }: IndustryProps) {
    const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES[0] | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [carouselHovered, setCarouselHovered] = useState(false);

    const x = useMotionValue(0);
    const rotation = useTransform(x, (val) => val * 0.25);

    useAnimationFrame((t, delta) => {
        if (!carouselHovered && !isDragging && !selectedIndustry) {
            x.set(x.get() - delta * 0.03);
        }
    });

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
        <main className="min-h-screen bg-white text-zinc-900 selection:bg-black selection:text-white">
            
            {!isEmbedded && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
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
            )}

            <div className="max-w-7xl mx-auto px-6 pt-40 pb-12 text-center">
                <Reveal direction="down" delay={0.1}>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 drop-shadow-sm pb-2">
                        Industry Solutions
                    </h1>
                </Reveal>
                <Reveal direction="up" delay={0.2}>
                    <p className="text-lg md:text-2xl text-zinc-500 max-w-3xl mx-auto font-light leading-relaxed">
                        Delivering dedicated supply chain management and specialized logistics for the world&apos;s most demanding and dynamic sectors.
                    </p>
                </Reveal>
            </div>

            {/* 3D 360-Degree Carousel Section */}
            <div className="px-4 md:px-8 max-w-[1400px] mx-auto mb-20 md:mb-32 relative z-30">
                <section className="relative w-full py-16 md:py-24 overflow-visible carousel-container flex flex-col items-center">
                    
                    {/* Background layer separated from 3D context to prevent clipping */}
                    <div className="absolute inset-0 w-full h-full bg-slate-50 rounded-[3rem] md:rounded-[4rem] border border-slate-200 shadow-sm pointer-events-none -z-10" />

                    <style>{`
                    .carousel-container { --carousel-tz: 300px; }
                    @media (min-width: 768px) {
                        .carousel-container { --carousel-tz: 450px; }
                    }
                `}</style>
                
                

                <div 
                    className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center cursor-grab active:cursor-grabbing mt-10 md:mt-16"
                    style={{ perspective: '2000px', transformStyle: 'preserve-3d' }}
                    onMouseEnter={() => setCarouselHovered(true)}
                    onMouseLeave={() => setCarouselHovered(false)}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onTouchStart={() => setIsDragging(true)}
                    onTouchEnd={() => setIsDragging(false)}
                >
                    <motion.div
                        className="relative w-[240px] h-[340px] md:w-[320px] md:h-[460px]"
                        style={{
                            transformStyle: 'preserve-3d',
                            rotateY: rotation
                        }}
                        drag="x"
                        dragElastic={0}
                        dragMomentum={false}
                    >
                        {INDUSTRIES.map((industry, index) => {
                            const angle = index * 45;
                            const isSelected = selectedIndustry?.name === industry.name;

                            return (
                                <div 
                                    key={industry.name}
                                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                                    style={{
                                        transform: `rotateY(${angle}deg) translateZ(var(--carousel-tz))`,
                                        backfaceVisibility: 'hidden',
                                        WebkitBackfaceVisibility: 'hidden',
                                    }}
                                >
                                    <motion.div 
                                        layoutId={`card-${industry.name}`}
                                        className="relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl cursor-pointer group"
                                        onClick={() => setSelectedIndustry(industry)}
                                    >
                                        <motion.img 
                                            layoutId={`image-${industry.name}`}
                                            src={industry.image} 
                                            alt={`Logistics for ${industry.name}`}
                                            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
                                        
                                        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-8 pointer-events-none">
                                            <motion.h3 
                                                layoutId={`title-${industry.name}`}
                                                className="text-2xl md:text-3xl font-bold text-white tracking-tight relative z-30 mb-2"
                                            >
                                                {industry.name}
                                            </motion.h3>
                                            <p className="text-zinc-300 text-sm md:text-base line-clamp-2 font-light">
                                                {industry.description}
                                            </p>
                                        </div>
                                    </motion.div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>

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
                            <div className="relative w-full h-[35%] md:h-[45%] shrink-0">
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

                            <div className="relative p-6 md:p-10 flex flex-col justify-start flex-1 bg-zinc-900 z-10 overflow-y-auto">
                                <motion.h3 
                                    layoutId={`title-${selectedIndustry.name}`}
                                    className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                                >
                                    {selectedIndustry.name}
                                </motion.h3>
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6"
                                >
                                    <p className="text-lg md:text-xl text-blue-100/90 font-light leading-relaxed max-w-4xl">
                                        {selectedIndustry.description}
                                    </p>
                                    
                                    <div className="pt-6 border-t border-zinc-800/50 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h5 className="text-emerald-300 font-medium text-base md:text-lg mb-3">Key Logistics Offerings</h5>
                                            <ul className="text-zinc-300 space-y-2.5 text-sm md:text-base">
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                                                    Dedicated supply chain planning
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                                                    Real-time global tracking visibility
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.8)]"></span>
                                                    Customs compliance & expedited clearance
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-amber-300 font-medium text-base md:text-lg mb-3">Service Excellence</h5>
                                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                                Our specialized teams operate around the clock to ensure your <span className="text-white font-medium">{selectedIndustry.name.toLowerCase()}</span> cargo reaches its destination safely and on schedule, minimizing operational downtime and maximizing your ROI.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Proven Track Record Section */}
            <div className="px-4 md:px-8 max-w-[1400px] mx-auto mb-20 md:mb-32 relative">
                <section className="relative w-full py-20 md:py-32 bg-slate-50 rounded-[3rem] md:rounded-[4rem] border border-slate-200 shadow-sm overflow-hidden">
                    <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <Reveal direction="left" delay={0.1}>
                            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 pb-2">
                                Proven Track Record
                            </h2>
                        </Reveal>
                        
                        <div className="space-y-8">
                            <Reveal direction="up" delay={0.2}>
                                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm">
                                    <h4 className="text-xl font-bold text-emerald-700 mb-3 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">✓</span>
                                        Global Expertise
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                        We treat each single project as a unique assignment with special attention to every detail, from design and planning to <span className="text-emerald-700 font-bold">execution and delivery</span>. Our dedicated global project cargo teams plan and coordinate entire logistics networks.
                                    </p>
                                </div>
                            </Reveal>

                            <Reveal direction="up" delay={0.3}>
                                <div className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm backdrop-blur-sm">
                                    <h4 className="text-xl font-bold text-amber-700 mb-3 flex items-center gap-3">
                                        <span className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm">★</span>
                                        Specialized Project Cargo
                                    </h4>
                                    <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                        We have the ability to handle your complex transport logistics, whether it is cargo shipped as <span className="text-amber-700 font-bold">Break Bulk (BB), Heavy Lift (HL)</span> or Out of Gauge (OOG). With dedicated teams of professionals attending to your industrial needs, be assured that your cargo will be safely transported globally.
                                    </p>
                                </div>
                            </Reveal>
                        </div>
                    </div>

                    <Reveal direction="right" delay={0.4}>
                        <div className="relative rounded-[2rem] overflow-hidden aspect-square lg:aspect-[4/5] bg-slate-100 shadow-2xl group">
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
        </div>
        </main>
    );
}
