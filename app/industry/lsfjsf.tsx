"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
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
                    // observer.unobserve(el); // Uncomment to trigger only once
                }
            },
            { threshold, rootMargin: "-50px" }
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
        up: "translateY(50px)",
        down: "translateY(-50px)",
        left: "translateX(-50px)",
        right: "translateX(50px)",
        scale: "scale(0.9)",
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
                filter: visible ? "blur(0px)" : "blur(12px)",
                transition: `all 1.2s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
                willChange: "opacity, transform, filter",
            }}
        >
            {children}
        </div>
    );
}

// ─── 3D Tilt Card Component with Glare ─────────────────────────────────────
function PremiumTiltCard({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
    
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
    
    const glareOpacity = useTransform(mouseXSpring, [-0.5, 0.5], [0, 0.3]);
    const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
    const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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
            onClick={onClick}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={`relative w-full h-full cursor-pointer group ${className}`}
        >
            <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-zinc-900/50 backdrop-blur-sm shadow-2xl overflow-hidden transition-colors duration-500 group-hover:border-white/20 group-hover:bg-zinc-800/80">
                {children}
                
                {/* Realistic Glare Effect */}
                <motion.div
                    style={{
                        opacity: glareOpacity,
                        background: "radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 60%)",
                        left: glareX,
                        top: glareY,
                        transform: "translate(-50%, -50%)",
                    }}
                    className="absolute w-[150%] h-[150%] pointer-events-none mix-blend-overlay z-50"
                />
            </div>
        </motion.div>
    );
}

// ─── 3D Global Logistics Network Background ────────────────────────────────
function GlobalLogisticsNetwork3D() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center bg-[#020617]">
            {/* Cinematic Lighting */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full mix-blend-screen" />
            <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-purple-600/15 blur-[120px] rounded-full mix-blend-screen" />
            
            {/* 3D Isometric Grid Plane */}
            <motion.div 
                initial={{ opacity: 0, rotateX: 60, translateY: 100 }}
                animate={{ opacity: 1, rotateX: 65, translateY: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                className="absolute w-[200vw] h-[200vh] border border-transparent"
                style={{ 
                    transformStyle: "preserve-3d",
                    transformOrigin: "center 60%",
                    backgroundImage: `
                        linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            >
                {/* Animated Transport Routes */}
                <svg className="absolute inset-0 w-full h-full" overflow="visible">
                    <defs>
                        <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
                            <stop offset="50%" stopColor="#3b82f6" stopOpacity="1" />
                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Ship / Plane / Truck routes */}
                    {[...Array(8)].map((_, i) => (
                        <motion.path
                            key={i}
                            d={`M ${Math.random() * 2000} ${Math.random() * 2000} Q ${Math.random() * 2000} ${Math.random() * 2000} ${Math.random() * 2000} ${Math.random() * 2000}`}
                            fill="none"
                            stroke="url(#route-gradient)"
                            strokeWidth="2"
                            filter="url(#glow)"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: [0, 1, 1],
                                opacity: [0, 1, 0],
                                pathOffset: [0, 0, 1]
                            }}
                            transition={{ 
                                duration: 8 + Math.random() * 5, 
                                repeat: Infinity, 
                                ease: "linear",
                                delay: Math.random() * 5
                            }}
                        />
                    ))}

                    {/* Nodes / Ports */}
                    {[...Array(15)].map((_, i) => (
                        <motion.circle
                            key={`node-${i}`}
                            cx={Math.random() * 2000}
                            cy={Math.random() * 2000}
                            r="4"
                            fill="#38bdf8"
                            filter="url(#glow)"
                            animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
                            transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                        />
                    ))}
                </svg>
            </motion.div>
            
            {/* Fade out top edge */}
            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#020617] to-transparent z-10" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#020617] to-transparent z-10" />
        </div>
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
        }, 5000);

        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div 
            className="relative w-full h-[700px] md:h-[800px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-[#050505] border border-white/10 shadow-2xl group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Cinematic 3D Image Transitions */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                >
                    <Image 
                        src={PROVEN_TRACK_SLIDES[activeIndex].image} 
                        fill 
                        sizes="100vw" 
                        className={`object-cover opacity-60 mix-blend-lighten ${PROVEN_TRACK_SLIDES[activeIndex].imagePosition || 'object-center'}`} 
                        alt="Carousel Background" 
                    />
                </motion.div>
            </AnimatePresence>

            {/* Premium Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/60 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent pointer-events-none" />

            {/* Content Layer */}
            <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-16 lg:px-24 pb-[120px] md:pb-[160px] pointer-events-none">
                <div className="max-w-3xl relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="pointer-events-auto"
                        >
                            <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                                {PROVEN_TRACK_SLIDES[activeIndex].title}
                            </h3>
                            <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow-lg max-w-2xl">
                                {PROVEN_TRACK_SLIDES[activeIndex].description}
                            </p>
                            
                            <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl inline-block w-full relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1/2 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />
                                <h4 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-4">Service Capabilities</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                                    {PROVEN_TRACK_SLIDES[activeIndex].capabilities.map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-zinc-100 group/item cursor-default">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,1)] shrink-0 transition-transform group-hover/item:scale-150"></span>
                                            <span className="text-sm md:text-base font-medium">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            {/* Premium Interactive Thumbnails */}
            <div className="absolute bottom-8 left-6 md:left-16 flex items-center gap-4 z-20 pointer-events-auto">
                {PROVEN_TRACK_SLIDES.map((slide, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(i)}
                        className={`relative w-16 h-12 md:w-32 md:h-20 rounded-lg md:rounded-xl overflow-hidden transition-all duration-500 cursor-pointer ${
                            activeIndex === i 
                                ? "ring-2 ring-emerald-500 scale-105 shadow-2xl z-10" 
                                : "ring-1 ring-white/10 opacity-50 hover:opacity-100 hover:scale-100 saturate-0 hover:saturate-100"
                        }`}
                    >
                        <Image src={slide.image} fill sizes="(max-width: 768px) 64px, 128px" className={`object-cover ${slide.imagePosition || 'object-center'}`} alt={`Thumbnail ${i}`} />
                        <div className="absolute inset-0 bg-black/20" />
                        {activeIndex === i && (
                            <motion.div layoutId="active-thumb-glow" className="absolute inset-0 bg-emerald-500/10 mix-blend-screen pointer-events-none" />
                        )}
                    </button>
                ))}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full z-20">
                <motion.div 
                    key={`progress-${activeIndex}`}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-gradient-to-r from-blue-500 via-emerald-500 to-emerald-400"
                />
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
        <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500 selection:text-black overflow-x-hidden">

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

            {/* ─── 3D Cinematic Hero Section ─────────────────────────────────── */}
            <section className="relative w-full min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6">
                <GlobalLogisticsNetwork3D />
                
                <div className="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
                    <Reveal direction="down">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-xs md:text-sm font-medium tracking-widest uppercase text-blue-200">Global Supply Chain Network</span>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={0.1}>
                        <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
                            <span className="text-white">Industry</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                Solutions
                            </span>
                        </h1>
                    </Reveal>

                    <Reveal direction="up" delay={0.2}>
                        <p className="text-zinc-300 text-lg md:text-2xl font-light leading-relaxed max-w-3xl drop-shadow-lg mb-10">
                            We deliver <span className="text-white font-medium">industry-focused logistics</span> to support complex global supply chains. From transportation to customs coordination, we provide <span className="text-emerald-400 font-medium">reliable support</span> tailored to your business needs.
                        </p>
                    </Reveal>
                    
                    <Reveal direction="up" delay={0.3}>
                        <button className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                            Explore Industries
                        </button>
                    </Reveal>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs uppercase tracking-widest text-white/50">Scroll</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </section>

            {/* ─── Premium 3D Bento Grid Industries ───────────────────────────── */}
            <section className="relative z-20 px-4 md:px-8 max-w-[1600px] mx-auto py-24">
                <Reveal>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[300px]">
                        {INDUSTRIES.map((industry, index) => (
                            <div key={industry.name} className={`${industry.className} group perspective-1000`}>
                                <PremiumTiltCard onClick={() => setSelectedIndustry(industry)}>
                                    <motion.div layoutId={`card-${industry.name}`} className="w-full h-full relative">
                                        <Image
                                            src={industry.image}
                                            alt={industry.name}
                                            fill
                                            className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent" />
                                        
                                        <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                            <motion.h3 layoutId={`title-${industry.name}`} className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                {industry.name}
                                            </motion.h3>
                                            
                                            <div className="overflow-hidden">
                                                <p className="text-zinc-300 text-sm md:text-base font-light line-clamp-2 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                                    {industry.description}
                                                </p>
                                            </div>

                                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                        <path d="M5 12h14M12 5l7 7-7 7"/>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </PremiumTiltCard>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </section>

            {/* ─── Cinematic Modal Expansion ─────────────────────────────────── */}
            <AnimatePresence>
                {selectedIndustry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
                            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setSelectedIndustry(null)}
                            className="absolute inset-0 bg-black/60 cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`card-${selectedIndustry.name}`}
                            className="relative w-full max-w-6xl h-[85vh] md:h-[90vh] bg-[#020617] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
                        >
                            <div className="relative w-full md:w-1/2 h-[40%] md:h-full shrink-0 overflow-hidden">
                                <motion.img
                                    layoutId={`image-${selectedIndustry.name}`}
                                    src={selectedIndustry.image}
                                    alt={selectedIndustry.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-[#020617]" />

                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="absolute top-6 left-6 md:hidden w-10 h-10 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white z-50 border border-white/20"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            <div className="relative w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#020617] z-10 overflow-y-auto hide-scrollbar">
                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="hidden md:flex absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 backdrop-blur-md rounded-full items-center justify-center text-white transition-colors z-50 border border-white/10"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>

                                <motion.div
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                >
                                    <motion.h3
                                        layoutId={`title-${selectedIndustry.name}`}
                                        className="text-4xl md:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-500"
                                    >
                                        {selectedIndustry.name}
                                    </motion.h3>

                                    <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mb-8 rounded-full" />

                                    <p className="text-lg md:text-xl text-zinc-300 font-light leading-relaxed mb-10">
                                        {selectedIndustry.description}
                                    </p>

                                    <div className="space-y-8">
                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                            <h5 className="text-emerald-400 font-semibold tracking-wide uppercase text-sm mb-4">Key Logistics Offerings</h5>
                                            <ul className="text-zinc-200 space-y-3">
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] shrink-0"></span>
                                                    <span>Dedicated supply chain planning</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)] shrink-0"></span>
                                                    <span>Real-time global tracking visibility</span>
                                                </li>
                                                <li className="flex items-start gap-3">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)] shrink-0"></span>
                                                    <span>Customs compliance & expedited clearance</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h5 className="text-white font-medium text-lg mb-3">Service Excellence</h5>
                                            <p className="text-zinc-400 leading-relaxed font-light">
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

            {/* ─── Proven Track Record Section ────────────────────────────────── */}
            <div className="px-4 md:px-8 w-full max-w-[1600px] mx-auto pb-32 relative z-30">
                <Reveal direction="up">
                    <MorphCarousel />
                </Reveal>
            </div>
            
        </main>
    );
}
