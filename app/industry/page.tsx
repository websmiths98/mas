"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
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
                setVisible(entry.isIntersecting);
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

// ─── Fancy Spotlight Card ──────────────────────────────────────────────────
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setOpacity(1)}
            onMouseLeave={() => setOpacity(0)}
            className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-emerald-500/10 ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(120,119,255,0.15), transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full p-6">
                {children}
            </div>
        </div>
    );
}

// ─── 3D Tilt Card Component ───────────────────────────────────────────────
function TiltCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    // Smooth out the spring animation
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        x.set(mouseX / width - 0.5);
        y.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full h-full cursor-pointer ${className}`}
        >
            {children}
        </motion.div>
    );
}

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
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
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
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

const PROVEN_TRACK_SLIDES = [
    {
        title: "Proven Industry Experience",
        description: "MAS Logistics has extensive experience in handling project cargo across industries such as Oil & Gas, Construction, Energy, Maritime, Mining, and Heavy Machinery. Our team is equipped to manage highly complex transport requirements involving Break Bulk (BB), Heavy Lift (HL), and Out of Gauge (OOG) cargo.",
        capabilities: [
            "Break Bulk (BB) cargo handling",
            "Heavy Lift (HL) cargo management",
            "Out of Gauge (OOG) transportation",
            "Industry-focused logistics support",
            "Safe and secure oversized cargo handling"
        ],
        image: "/images_frontend/overall_logistic.webp",
        imagePosition: "object-center"
    },
    {
        title: "Warehousing Services",
        description: "MAS Logistics offers both Dedicated Warehousing and Multi-User Warehousing Solutions, designed to meet different operational and storage requirements. Our dedicated warehouse solutions align with your specific business requirements, offering greater flexibility and scalability to support growth.",
        capabilities: [
            "Dedicated storage solutions",
            "Flexible and scalable operations",
            "Inventory and distribution support",
            "Reduced operational costs",
            "Improved process efficiency"
        ],
        image: "/images/ai/modern_warehouse_interior.png"
    },
    {
        title: "Break-Bulk Services",
        description: "Our break-bulk logistics solutions are designed to handle oversized, heavy, and unconventional cargo that requires specialized transportation arrangements. Beyond standard shipping services, we provide complete logistics support, including pre-carriage, on-carriage, packaging, crating, and rigging.",
        capabilities: [
            "Oversized and overweight cargo handling",
            "Heavy and odd-sized shipment support",
            "Packing, crating, and rigging services",
            "Pre-carriage and on-carriage logistics",
            "Global shipping and carrier network"
        ],
        image: "/images_frontend/loading_container_truck.webp",
        imagePosition: "object-bottom"
    }
];

function MorphCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % PROVEN_TRACK_SLIDES.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div 
            className="relative w-full h-[80vh] md:h-[90vh] rounded-[3rem] overflow-hidden bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Morphing Images */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ filter: "blur(20px) brightness(0.5)", opacity: 0, scale: 1.1 }}
                    animate={{ filter: "blur(0px) brightness(1)", opacity: 1, scale: 1 }}
                    exit={{ filter: "blur(20px) brightness(0.5)", opacity: 0, scale: 0.95 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    <Image src={PROVEN_TRACK_SLIDES[activeIndex].image} fill sizes="100vw" className={`object-cover opacity-80 ${PROVEN_TRACK_SLIDES[activeIndex].imagePosition || 'object-center'}`} alt="Carousel Background" />
                </motion.div>
            </AnimatePresence>

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Content Overlay */}
            <div className="absolute top-0 left-0 right-0 bottom-[120px] md:bottom-[150px] flex flex-col justify-center px-4 md:px-16 lg:px-24 pt-12 pointer-events-none overflow-y-auto hide-scrollbar">
                <div className="max-w-2xl relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="pointer-events-auto"
                        >
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 pb-2">
                                {PROVEN_TRACK_SLIDES[activeIndex].title}
                            </h3>
                            <p className="text-zinc-200 text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow-lg">
                                {PROVEN_TRACK_SLIDES[activeIndex].description}
                            </p>
                            
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl inline-block w-full">
                                <h4 className="text-emerald-400 font-medium mb-4 text-lg">Service Capabilities:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                    {PROVEN_TRACK_SLIDES[activeIndex].capabilities.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-100">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] shrink-0"></span>
                                            <span className="text-sm md:text-base font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Thumbnails Navigation (Bottom Center) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-5 z-20 pointer-events-auto">
                {PROVEN_TRACK_SLIDES.map((slide, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`relative w-24 h-16 md:w-36 md:h-24 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer ${
                            activeIndex === i 
                                ? "ring-2 ring-white scale-110 shadow-2xl z-10" 
                                : "opacity-40 hover:opacity-100 hover:scale-105 saturate-50 hover:saturate-100"
                        }`}
                    >
                        <Image src={slide.image} fill sizes="(max-width: 768px) 96px, 144px" className={`object-cover ${slide.imagePosition || 'object-center'}`} alt={`Thumbnail ${i}`} />
                        {activeIndex === i && (
                            <motion.div layoutId="active-thumb-glow" className="absolute inset-0 bg-white/10 mix-blend-overlay pointer-events-none" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
}

interface IndustryProps {
    isEmbedded?: boolean;
}

export default function Industry({ isEmbedded = false }: IndustryProps) {
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
        <main className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">

            {!isEmbedded && (
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
            )}

            {/* 3D Wheel Hero Section */}
            <div
                className="relative w-full h-[100vh] min-h-[900px] overflow-hidden bg-[#050505] flex items-center justify-center"
            >
                <style>{`
                    @keyframes autoRun3d {
                        from { transform: rotateY(360deg); }
                        to { transform: rotateY(0deg); }
                    }

                    @keyframes animateBrightness {
                        0%, 100% { filter: brightness(1); }
                        50% { filter: brightness(0.2); }
                    }

                    .spin-container {
                        transform-style: preserve-3d;
                        animation: autoRun3d 25s linear infinite;
                        will-change: transform;
                    }

                    .spin-container:hover, .spin-container:hover .wheel-card-inner {
                        animation-play-state: paused !important;
                    }

                    .wheel-card {
                        position: absolute;
                        inset: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: rotateY(var(--card-angle)) translateZ(65vw);
                    }
                    @media (min-width: 640px) {
                        .wheel-card { transform: rotateY(var(--card-angle)) translateZ(55vw); }
                    }
                    @media (min-width: 768px) {
                        .wheel-card { transform: rotateY(var(--card-angle)) translateZ(50vw); }
                    }
                    @media (min-width: 1024px) {
                        .wheel-card { transform: rotateY(var(--card-angle)) translateZ(480px); }
                    }
                    @media (min-width: 1280px) {
                        .wheel-card { transform: rotateY(var(--card-angle)) translateZ(600px); }
                    }
                    .wheel-card-inner {
                        animation: animateBrightness 25s linear infinite;
                        animation-delay: calc(-25s * (1 - var(--angle-ratio)));
                        will-change: transform, filter;
                    }
                `}</style>

                {/* 3D Wheel Background */}
                <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
                    style={{ perspective: '2000px' }}
                >
                    {/* Tilt Container separated to ensure rotation axes behave correctly */}
                    <div
                        className="relative w-full h-full flex items-center justify-center"
                        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(-24deg) translateY(-10%)' }}
                    >
                        {/* Center Static Content - EXACT DESIGN AND PLACEMENT */}
                        <div 
                            className="absolute flex flex-col items-center justify-center text-center px-4 pointer-events-auto"
                            style={{ transform: 'translateZ(100px) translateY(-60px) rotateX(24deg)' }}
                        >
                            <div className="max-w-xl flex flex-col items-center gap-4">
                                {/* Title */}
                                <h1 className="text-3xl sm:text-[2.5rem] md:text-[3.5rem] lg:text-[4.5rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 leading-[1.1] tracking-tight drop-shadow-2xl pb-2">
                                    Industry Solutions
                                </h1>
                                
                                {/* Description */}
                                <p className="text-zinc-300 text-xs sm:text-sm md:text-base lg:text-lg font-medium max-w-lg mx-auto leading-relaxed drop-shadow-lg text-center mt-1">
                                    We deliver <span className="text-blue-400 font-semibold">industry-focused logistics</span> to support complex global supply chains
                                    <br className="hidden md:block mb-2" />
                                    From transportation to customs coordination, we provide <span className="text-emerald-400 font-semibold">reliable support</span> tailored to your business needs
                                </p>
                            </div>
                        </div>

                        <div
                            className="spin-container relative w-[40vw] h-[40vw] sm:w-[28vw] sm:h-[28vw] md:w-[24vw] md:h-[24vw] lg:w-[200px] lg:h-[200px] xl:w-[250px] xl:h-[250px]"
                        >
                            {INDUSTRIES.map((industry, index) => {
                                const angle = index * (360 / INDUSTRIES.length);
                                const angleRatio = index / INDUSTRIES.length;
                                const isSelected = selectedIndustry?.name === industry.name;
                                return (
                                    <div
                                        key={industry.name}
                                        className="wheel-card"
                                        style={{
                                            '--card-angle': `${angle}deg`,
                                            '--angle-ratio': angleRatio,
                                        } as React.CSSProperties}
                                    >
                                        <motion.div
                                            layoutId={`card-${industry.name}`}
                                            className={`wheel-card-inner relative w-full h-full overflow-hidden rounded-[2rem] bg-zinc-900 pointer-events-auto cursor-pointer transition-all duration-300 group ${isSelected ? 'opacity-0' : 'opacity-100'}`}
                                            onClick={() => setSelectedIndustry(industry)}
                                        >
                                            <motion.img
                                                layoutId={`image-${industry.name}`}
                                                src={industry.image}
                                                alt={industry.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            
                                            {/* Card Overlay Content */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                            
                                            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 flex flex-col items-center justify-end text-center pointer-events-none transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                                <h3 className="text-white font-bold text-xl md:text-2xl mb-2 drop-shadow-lg shadow-black">
                                                    {industry.name}
                                                </h3>
                                                <div className="flex items-center gap-2 text-white/80 text-xs md:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                    <span>Read more</span>
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>


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
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`card-${selectedIndustry!.name}`}
                            className="relative w-full max-w-5xl h-[85vh] md:h-[90vh] bg-zinc-950 border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="relative w-full h-[35%] md:h-[45%] shrink-0">
                                <motion.img
                                    layoutId={`image-${selectedIndustry!.name}`}
                                    src={selectedIndustry!.image}
                                    alt={selectedIndustry!.name}
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

                            <div className="relative p-6 md:p-10 flex flex-col justify-start flex-1 bg-zinc-950 z-10 overflow-y-auto">
                                <motion.h3
                                    layoutId={`title-${selectedIndustry!.name}`}
                                    className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400"
                                >
                                    {selectedIndustry!.name}
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-6"
                                >
                                    <p className="text-lg md:text-xl text-blue-100/90 font-light leading-relaxed max-w-4xl">
                                        {selectedIndustry!.description}
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
                                                Our specialized teams operate around the clock to ensure your <span className="text-white font-medium">{selectedIndustry!.name.toLowerCase()}</span> cargo reaches its destination safely and on schedule, minimizing operational downtime and maximizing your ROI.
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
            <div className="px-4 md:px-8 max-w-[1400px] mx-auto pb-20 md:pb-32 relative z-30">
                {/* <div className="mb-12 text-center">
                    <Reveal direction="down" delay={0.1}>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 pb-2">
                            Proven Track Record
                        </h2>
                    </Reveal>
                </div> */}

                <Reveal direction="up" delay={0.2}>
                    <MorphCarousel />
                </Reveal>
            </div>
        </main>
    );
}
