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
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setVisible(true);
        }, { threshold });
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, visible };
}

function Reveal({ children, delay = 0, className = "", direction = "up" }: any) {
    const { ref, visible } = useScrollReveal(0.1);
    const dirMap: any = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.95)", none: "translate(0,0)" };
    return (
        <div ref={ref} className={className} style={{
            opacity: visible ? 1 : 0, transform: visible ? (direction === "scale" ? "scale(1)" : "translate(0,0)") : dirMap[direction],
            filter: visible ? "blur(0px)" : "blur(8px)", transition: `all 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
            willChange: "opacity, transform, filter"
        }}>
            {children}
        </div>
    );
}

// ─── 3D Network Map Background ──────────────────────────────────────────────
const MapNetwork = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute inset-0 bg-[#020617]" />
            <div className="absolute inset-0 [perspective:1500px] flex items-center justify-center opacity-70">
                <motion.div 
                    className="w-[200vw] h-[200vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ rotateX: 70, transformStyle: "preserve-3d" }}
                    animate={{ rotateZ: 360 }}
                    transition={{ duration: 150, ease: "linear", repeat: Infinity }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.15)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_80%)]" />
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                        {Array.from({length: 25}).map((_, i) => {
                            const x1 = Math.random() * 1000;
                            const y1 = Math.random() * 1000;
                            const x2 = Math.random() * 1000;
                            const y2 = Math.random() * 1000;
                            const cx = (x1 + x2) / 2 + (Math.random() - 0.5) * 200;
                            const cy = (y1 + y2) / 2 + (Math.random() - 0.5) * 200;
                            return (
                                <motion.path key={i} d={`M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`} fill="none" stroke="rgba(56,189,248,0.4)" strokeWidth="1.5"
                                    initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                                    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
                                />
                            );
                        })}
                        {Array.from({length: 40}).map((_, i) => (
                            <motion.circle key={`node-${i}`} cx={Math.random() * 1000} cy={Math.random() * 1000} r={Math.random() > 0.8 ? 5 : 2} fill="#bae6fd"
                                initial={{ opacity: 0, scale: 0 }} animate={{ opacity: [0, 1, 0.5, 0], scale: [0, 1.5, 1, 0] }}
                                transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 5 }}
                                style={{ filter: "drop-shadow(0 0 10px rgba(56,189,248,1))" }}
                            />
                        ))}
                    </svg>
                </motion.div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-[#020617]/80" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_100%)] opacity-80" />
        </div>
    );
};

// ─── Premium 3D Card ─────────────────────────────────────────────────────────
function Premium3DCard({ industry, onClick }: any) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    return (
        <div className={`[perspective:1500px] w-full h-full ${industry.className}`}>
            <motion.div
                ref={ref} onMouseMove={handleMouseMove} onMouseLeave={() => { x.set(0); y.set(0); }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} onClick={onClick}
                className="group relative w-full h-full rounded-[2rem] overflow-hidden bg-[#070b14] border border-sky-500/10 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.8)]"
            >
                <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ transform: "translateZ(-30px) scale(1.15)" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={industry.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-all duration-700 ease-out group-hover:scale-105" alt={industry.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                </motion.div>
                
                <motion.div className="absolute inset-0 z-10 p-6 md:p-8 flex flex-col justify-end pointer-events-none" style={{ transform: "translateZ(50px)" }}>
                    <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-lg">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                    <motion.h3 layoutId={`title-${industry.name}`} className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-sky-300 transition-colors duration-500 drop-shadow-md">
                        {industry.name}
                    </motion.h3>
                    <p className="text-sky-100/70 text-sm md:text-base font-light line-clamp-2 mb-4 drop-shadow">
                        {industry.description}
                    </p>
                    <div className="flex items-center gap-2 text-sky-400 font-medium text-sm uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                        <span>Read more</span>
                    </div>
                </motion.div>
                
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ transform: "translateZ(60px)" }} />
            </motion.div>
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
        image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200",
        description: "End-to-end supply chain integration for the global automotive sector. From Just-In-Time (JIT) parts procurement to finished vehicle distribution, we ensure production lines never halt.",
        className: "md:col-span-2 lg:row-span-2"
    },
    {
        name: "Lifestyle & Fashions",
        image: "https://images.unsplash.com/photo-1494412519320-ce1eeb1209fb?q=80&w=1200",
        description: "Agile, fast-paced logistics tailored for seasonal retail cycles, luxury apparel, and high-volume fashion distribution.",
        className: "md:col-span-1 lg:row-span-1"
    },
    {
        name: "Medical Supplies",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1200",
        description: "Precision temperature-controlled environments, cold-chain logistics, and highly secure transport networks dedicated to critical healthcare.",
        className: "md:col-span-1 lg:row-span-1"
    },
    {
        name: "Energy Generation",
        image: "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?q=80&w=1200",
        description: "Specialized project cargo for massive energy infrastructure. We seamlessly move oversized turbines, renewable wind components, and heavy-duty traditional power generators across borders.",
        className: "md:col-span-2 lg:row-span-1"
    },
    {
        name: "Hightech",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200",
        description: "Globally compliant, ultra-secure, and agile logistics built for the fast-evolving electronics industry. We protect fragile silicon, server racks, and advanced consumer technology.",
        className: "md:col-span-1 lg:row-span-2"
    },
    {
        name: "FMCG",
        image: "https://images.unsplash.com/photo-1586528116311-ad8ed74533b3?q=80&w=1200",
        description: "High-volume, rapid-turnaround distribution networks engineered for fast-moving consumer goods to optimize shelf availability.",
        className: "md:col-span-1 lg:row-span-1"
    },
    {
        name: "Retail",
        image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1200",
        description: "Comprehensive retail supply chain management integrating warehousing, e-commerce fulfillment, and store replenishment to ensure products meet consumer demand instantly.",
        className: "md:col-span-1 lg:row-span-1"
    },
    {
        name: "Plant & Machinery",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400",
        description: "Expert handling of massive out-of-gauge (OOG) cargo, break-bulk, and heavy-lift industrial machinery for manufacturing plants, mining sites, and global construction projects.",
        className: "md:col-span-3 lg:row-span-1"
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
        }, 4000);
        return () => clearInterval(interval);
    }, [isHovered]);

    return (
        <div 
            className="relative w-full h-[650px] md:h-[750px] rounded-[3rem] overflow-hidden bg-[#020617] border border-sky-500/20 shadow-[0_0_80px_rgba(14,165,233,0.15)] group [perspective:2000px]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="w-full h-full relative" style={{ transformStyle: "preserve-3d" }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, rotateX: 5, scale: 1.05 }}
                        animate={{ opacity: 1, rotateX: 0, scale: 1 }}
                        exit={{ opacity: 0, rotateX: -5, scale: 0.98 }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 w-full h-full pointer-events-none origin-bottom"
                    >
                        <Image src={PROVEN_TRACK_SLIDES[activeIndex].image} fill sizes="100vw" className={`object-cover opacity-60 ${PROVEN_TRACK_SLIDES[activeIndex].imagePosition || 'object-center'}`} alt="Carousel Background" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/50 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/90 via-[#020617]/40 to-transparent" />
                    </motion.div>
                </AnimatePresence>

                <div className="absolute top-0 left-0 right-0 bottom-[120px] md:bottom-[150px] flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-12 pointer-events-none z-10">
                    <div className="max-w-2xl relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                className="pointer-events-auto"
                            >
                                <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 drop-shadow-2xl bg-clip-text text-transparent bg-gradient-to-r from-sky-300 via-blue-400 to-indigo-400 pb-2 tracking-tight">
                                    {PROVEN_TRACK_SLIDES[activeIndex].title}
                                </h3>
                                <p className="text-sky-100/80 text-lg md:text-xl font-light leading-relaxed mb-8 drop-shadow-lg max-w-xl">
                                    {PROVEN_TRACK_SLIDES[activeIndex].description}
                                </p>
                                
                                <div className="bg-[#020617]/40 backdrop-blur-2xl border border-sky-500/20 rounded-2xl p-6 shadow-2xl inline-block w-full max-w-lg">
                                    <h4 className="text-sky-400 font-medium mb-4 text-lg">Service Capabilities:</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6">
                                        {PROVEN_TRACK_SLIDES[activeIndex].capabilities.map((item, i) => (
                                            <div key={i} className="flex items-center gap-3 text-zinc-200">
                                                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.8)] shrink-0"></span>
                                                <span className="text-sm md:text-base font-light">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 md:gap-5 z-20 pointer-events-auto">
                    {PROVEN_TRACK_SLIDES.map((slide, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`relative w-24 h-16 md:w-36 md:h-24 rounded-xl overflow-hidden transition-all duration-500 cursor-pointer border border-white/10 ${
                                activeIndex === i ? "ring-2 ring-sky-400 scale-110 shadow-[0_0_20px_rgba(14,165,233,0.5)] z-10" : "opacity-40 hover:opacity-100 hover:scale-105"
                            }`}
                        >
                            <Image src={slide.image} fill sizes="(max-width: 768px) 96px, 144px" className={`object-cover ${slide.imagePosition || 'object-center'}`} alt={`Thumbnail ${i}`} />
                            {activeIndex === i && <motion.div layoutId="active-thumb-glow" className="absolute inset-0 bg-sky-500/20 mix-blend-overlay pointer-events-none" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function Industry({ isEmbedded = false }: { isEmbedded?: boolean }) {
    const [selectedIndustry, setSelectedIndustry] = useState<typeof INDUSTRIES[0] | null>(null);

    useEffect(() => {
        if (selectedIndustry) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [selectedIndustry]);

    return (
        <main className="min-h-screen bg-[#020617] text-white selection:bg-sky-500 selection:text-white">
            {!isEmbedded && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                    <AppleGlassNav
                        items={NAV_LINKS}
                        theme="dark"
                        logo={
                            <Link href="/" className="flex items-center">
                                <Image src="/mas_logo.webp" alt="Logo" width={200} height={50} className="h-9 w-30 object-contain transform scale-225 origin-centre brightness-0 invert" priority />
                            </Link>
                        }
                    />
                </div>
            )}

            {/* Hero Section */}
            <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden">
                <MapNetwork />
                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center pt-20">
                    <Reveal direction="down">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-sky-50 to-sky-200/50 tracking-tighter mb-6 pb-2 drop-shadow-2xl">
                            Industry Solutions
                        </h1>
                    </Reveal>
                    <Reveal direction="up" delay={0.2}>
                        <p className="text-sky-100 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed mb-4 drop-shadow-lg">
                            We deliver <span className="text-sky-400 font-medium">industry-focused logistics</span> to support complex global supply chains
                        </p>
                        <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto font-light drop-shadow">
                            From transportation to customs coordination, we provide <span className="text-white font-medium">reliable support</span> tailored to your business needs
                        </p>
                    </Reveal>
                </div>
                
                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-sky-500/50"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <span className="text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
                </motion.div>
            </section>

            {/* Premium 3D Bento Grid Section */}
            <section className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-8 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 auto-rows-[320px] gap-6">
                    {INDUSTRIES.map((industry, index) => (
                        <Reveal key={index} direction="up" delay={index * 0.1} className={industry.className}>
                            <Premium3DCard industry={industry} onClick={() => setSelectedIndustry(industry)} />
                        </Reveal>
                    ))}
                </div>
            </section>

            {/* Proven Track Record Section */}
            <section className="px-4 md:px-8 w-full max-w-[1400px] mx-auto pb-32 relative z-30">
                <Reveal direction="up" delay={0.2}>
                    <MorphCarousel />
                </Reveal>
            </section>

            {/* Cinematic Modal Expansion */}
            <AnimatePresence>
                {selectedIndustry && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 pointer-events-auto [perspective:2000px]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            onClick={() => setSelectedIndustry(null)}
                            className="absolute inset-0 bg-[#020617]/80 backdrop-blur-2xl cursor-zoom-out"
                        />

                        <motion.div
                            layoutId={`card-${selectedIndustry.name}`}
                            className="relative w-full max-w-6xl h-[85vh] md:h-[90vh] bg-[#020617]/90 backdrop-blur-2xl border border-sky-500/20 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(14,165,233,0.15)] flex flex-col lg:flex-row transform-style-3d"
                        >
                            {/* Image Section */}
                            <div className="relative w-full lg:w-1/2 h-[40%] lg:h-full shrink-0 overflow-hidden">
                                <motion.img
                                    layoutId={`image-${selectedIndustry.name}`}
                                    src={selectedIndustry.image}
                                    alt={selectedIndustry.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-[#020617] opacity-100" />
                                <div className="absolute inset-0 bg-sky-500/10 mix-blend-overlay" />
                                
                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="absolute top-6 left-6 lg:hidden w-12 h-12 bg-black/40 backdrop-blur-xl rounded-full flex items-center justify-center text-white border border-white/20 z-50"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="relative w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-start lg:justify-center flex-1 bg-transparent z-10 overflow-y-auto hide-scrollbar">
                                <button
                                    onClick={() => setSelectedIndustry(null)}
                                    className="hidden lg:flex absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-sky-500/20 backdrop-blur-xl rounded-full items-center justify-center text-white transition-all z-50 border border-white/10 hover:border-sky-500/50 hover:scale-105 shadow-xl"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>

                                <motion.h3
                                    layoutId={`title-${selectedIndustry.name}`}
                                    className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-sky-100 to-sky-300 drop-shadow-xl"
                                >
                                    {selectedIndustry.name}
                                </motion.h3>

                                <motion.div
                                    initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                                    transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    className="space-y-8"
                                >
                                    <p className="text-lg md:text-xl text-sky-100/90 font-light leading-relaxed">
                                        {selectedIndustry.description}
                                    </p>

                                    <div className="pt-8 border-t border-sky-500/20 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div>
                                            <h5 className="text-sky-400 font-medium text-base md:text-lg mb-4 flex items-center gap-2">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                                Key Logistics Offerings
                                            </h5>
                                            <ul className="text-zinc-300 space-y-3 text-sm md:text-base font-light">
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></span>
                                                    Dedicated supply chain planning
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></span>
                                                    Real-time global tracking visibility
                                                </li>
                                                <li className="flex items-center gap-3">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]"></span>
                                                    Customs compliance & expedited clearance
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h5 className="text-sky-400 font-medium text-base md:text-lg mb-4 flex items-center gap-2">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                                Service Excellence
                                            </h5>
                                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light">
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
        </main>
    );
}
