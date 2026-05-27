"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import createGlobe from "cobe";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import Link from "next/link";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// ─── DATA (PRESERVING EXACT ORIGINAL CONTENT) ──────────────────────────

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
        className: "md:col-span-2 md:row-span-2 min-h-[350px] md:min-h-[600px]"
    },
    {
        name: "Lifestyle & Fashions",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
        description: "Agile, fast-paced logistics tailored for seasonal retail cycles, luxury apparel, and high-volume fashion distribution.",
        className: "md:col-span-1 md:row-span-1 min-h-[350px] md:min-h-0"
    },
    {
        name: "Medical Supplies",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop",
        description: "Precision temperature-controlled environments, cold-chain logistics, and highly secure transport networks dedicated to critical healthcare.",
        className: "md:col-span-1 md:row-span-1 min-h-[350px] md:min-h-0"
    },
    {
        name: "Energy Generation",
        image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop",
        description: "Specialized project cargo for massive energy infrastructure. We seamlessly move oversized turbines, renewable wind components, and heavy-duty traditional power generators across borders.",
        className: "md:col-span-2 md:row-span-1 min-h-[350px] md:min-h-[300px]"
    },
    {
        name: "Hightech",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        description: "Globally compliant, ultra-secure, and agile logistics built for the fast-evolving electronics industry. We protect fragile silicon, server racks, and advanced consumer technology.",
        className: "md:col-span-1 md:row-span-2 min-h-[350px] md:min-h-[600px]"
    },
    {
        name: "FMCG",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
        description: "High-volume, rapid-turnaround distribution networks engineered for fast-moving consumer goods to optimize shelf availability.",
        className: "md:col-span-1 md:row-span-1 min-h-[350px] md:min-h-0"
    },
    {
        name: "Retail",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop",
        description: "Comprehensive retail supply chain management integrating warehousing, e-commerce fulfillment, and store replenishment to ensure products meet consumer demand instantly.",
        className: "md:col-span-2 md:row-span-1 min-h-[350px] md:min-h-[300px]"
    },
    {
        name: "Plant & Machinery",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1400&auto=format&fit=crop",
        description: "Expert handling of massive out-of-gauge (OOG) cargo, break-bulk, and heavy-lift industrial machinery for manufacturing plants, mining sites, and global construction projects.",
        className: "md:col-span-3 md:row-span-1 min-h-[350px] md:min-h-[300px]"
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
        ]
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
        ]
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
        ]
    }
];

const STATS = [
    { label: "Countries Served", value: 184, suffix: "+" },
    { label: "Containers / Yr", value: 2.5, suffix: "M" },
    { label: "Global Partners", value: 850, suffix: "+" },
    { label: "Accuracy Rate", value: 99.9, suffix: "%" },
];

// ─── SUB COMPONENTS ────────────────────────────────────────────────────

function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        let phi = 0;
        if (!canvasRef.current) return;
        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000,
            height: 1000,
            phi: 0,
            theta: 0.25,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.03, 0.03, 0.05],
            markerColor: [0.1, 0.8, 1],
            glowColor: [0.05, 0.1, 0.2],
            markers: [
                { location: [37.7595, -122.4367], size: 0.04 },
                { location: [40.7128, -74.0060], size: 0.05 },
                { location: [51.5074, -0.1278], size: 0.04 },
                { location: [35.6895, 139.6917], size: 0.06 },
                { location: [22.3193, 114.1694], size: 0.05 },
                { location: [1.3521, 103.8198], size: 0.06 },
                { location: [25.2048, 55.2708], size: 0.04 },
                { location: [-33.8688, 151.2093], size: 0.04 }
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003;
            },
        });
        return () => globe.destroy();
    }, []);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", maxWidth: 800, aspectRatio: 1 }} />;
}

function StatCounter({ value, label, suffix }: { value: number, label: string, suffix: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
    
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setCount(latest * value);
        });
    }, [scrollYProgress, value]);

    return (
        <div ref={ref} className="flex flex-col items-center">
            <h4 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 mb-2 font-mono drop-shadow-xl">
                {count.toFixed(value % 1 !== 0 ? 1 : 0)}{suffix}
            </h4>
            <span className="text-zinc-400 text-sm md:text-base uppercase tracking-widest font-semibold">{label}</span>
        </div>
    );
}

function TiltCard({ industry, index }: { industry: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

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
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d"
            }}
            className={`relative w-full h-full rounded-[2rem] overflow-hidden cursor-pointer group bg-zinc-900 border border-white/10 ${industry.className} shadow-2xl`}
        >
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ transform: "translateZ(-30px) scale(1.15)" }}
            >
                <img
                    src={industry.image}
                    alt={industry.name}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
            </motion.div>

            <div
                className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-end pointer-events-none"
                style={{ transform: "translateZ(50px)" }}
            >
                <div className="w-10 h-10 md:w-12 md:h-12 mb-4 md:mb-6 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 transform group-hover:scale-110 transition-transform duration-500 shadow-xl group-hover:bg-blue-500/20 group-hover:border-blue-500/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white group-hover:text-emerald-400 transition-colors">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white mb-2 md:mb-3 tracking-tight drop-shadow-xl">
                    {industry.name}
                </h3>
                <p className="text-zinc-300 text-xs md:text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-500 max-w-lg">
                    {industry.description}
                </p>
            </div>

            {/* Dynamic hover glow overlay */}
            <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] shadow-[inset_0_0_50px_rgba(255,255,255,0.15)] bg-gradient-to-tr from-white/0 via-blue-500/5 to-white/0" />
        </motion.div>
    );
}


// ─── MAIN PAGE ─────────────────────────────────────────────────────────

export default function Industry({ isEmbedded = false }: { isEmbedded?: boolean }) {
    // 1. Lenis Smooth Scroll
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            touchMultiplier: 2,
        });
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, []);

    // 2. Hero 3D Interactions
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 100, damping: 30 });
    const mouseYSpring = useSpring(y, { stiffness: 100, damping: 30 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
    
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [x, y]);

    // Parallax
    const { scrollY } = useScroll();
    const heroY = useTransform(scrollY, [0, 1000], [0, 300]);
    const heroOpacity = useTransform(scrollY, [0, 800], [1, 0]);

    // 3. Horizontal Scroll Ref for Process Flow
    const processContainerRef = useRef<HTMLDivElement>(null);
    const processWrapperRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!processContainerRef.current || !processWrapperRef.current) return;
        const sections = gsap.utils.toArray(".process-step", processWrapperRef.current);
        
        gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: processContainerRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + processWrapperRef.current!.offsetWidth,
            }
        });
    }, { scope: processContainerRef });


    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white overflow-hidden relative">
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

            {/* Ambient Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-600/10 blur-[150px]" />
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-600/10 blur-[150px]" />
            </div>

            {/* SECTION 1 — Hero Industry Experience (PRESERVING ORIGINAL TEXT) */}
            <section className="relative h-screen w-full flex flex-col justify-center overflow-hidden bg-[#050505]">
                <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1586528116311-ad8ed7c50a30?q=100&w=2500&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-[0.25]" alt="Cinematic Logistics" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-transparent to-[#050505]" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(5,5,5,0.9)_100%)]" />
                </motion.div>
                
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none" style={{ perspective: "1000px", transform: "rotateX(60deg) scale(2.5) translateY(-50%)" }} />
                
                <motion.div 
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="relative z-10 max-w-7xl mx-auto px-6 text-center"
                >
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.1 }} style={{ transform: "translateZ(100px)" }}>
                        <div className="inline-flex items-center gap-3 px-5 py-2 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.15)]">
                            <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_10px_#60a5fa] animate-pulse" />
                            <span className="text-xs md:text-sm font-bold text-blue-200 tracking-[0.2em] uppercase">Global Logistics Ecosystem</span>
                        </div>
                    </motion.div>
                    
                    {/* ORIGINAL TEXT: "Industry Solutions" */}
                    <motion.h1 
                        initial={{ opacity: 0, y: 40 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ duration: 1.2, delay: 0.3 }} 
                        style={{ transform: "translateZ(160px)" }}
                        className="text-5xl md:text-7xl lg:text-[7rem] font-black tracking-tighter mb-8 leading-[1.05]"
                    >
                        <span className="text-white drop-shadow-2xl">Industry</span>
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 pb-2 inline-block">
                            Solutions
                        </span>
                    </motion.h1>

                    {/* ORIGINAL TEXT: "We deliver industry-focused logistics to support complex global supply chains. From transportation to customs coordination, we provide reliable support tailored to your business needs." */}
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1.2, delay: 0.5 }} 
                        style={{ transform: "translateZ(80px)" }}
                        className="text-lg md:text-2xl text-zinc-400 font-light max-w-4xl mx-auto mb-14 leading-relaxed drop-shadow-md"
                    >
                        We deliver industry-focused logistics to support complex global supply chains. From transportation to customs coordination, we provide reliable support tailored to your business needs.
                    </motion.p>
                    
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} style={{ transform: "translateZ(120px)" }}>
                        <button className="px-10 py-5 bg-white text-black font-bold tracking-widest uppercase rounded-full text-sm md:text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.3)] relative group overflow-hidden">
                            <span className="relative z-10">Initiate System</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-emerald-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </button>
                    </motion.div>
                </motion.div>
            </section>


            {/* SECTION 2 — Industry Solutions Bento Grid (PRESERVING EXACT 8 INDUSTRIES) */}
            <section className="relative z-20 max-w-[1600px] mx-auto px-4 md:px-8 pb-32 pt-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6" style={{ perspective: "2000px" }}>
                    {INDUSTRIES.map((industry, index) => (
                        <TiltCard key={industry.name} industry={industry} index={index} />
                    ))}
                </div>
            </section>


            {/* SECTION 3 — Logistics Network Visualization (Globe) */}
            <section className="relative w-full py-40 bg-[#050505] overflow-hidden flex flex-col items-center justify-center border-t border-white/5">
                <div className="text-center z-10 mb-16 relative px-6">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">Global Logistics Command</h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light">Real-time intelligent routing across the world's most critical transport nodes.</p>
                </div>
                
                <div className="relative w-full max-w-[1000px] aspect-[1/1] md:aspect-square flex items-center justify-center">
                    <div className="absolute inset-0 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
                    <Globe />
                    
                    {/* Floating Holographic UI Data */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
                        className="absolute top-[20%] left-[5%] md:left-0 bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl hidden md:block"
                    >
                        <div className="text-xs text-blue-400 font-mono mb-2 tracking-widest">NODE: HKG-01</div>
                        <div className="text-white font-bold text-lg">Hong Kong Port</div>
                        <div className="text-emerald-400 text-xs mt-2 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            STATUS: OPERATIONAL
                        </div>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.8 }}
                        className="absolute bottom-[20%] right-[5%] md:right-0 bg-[#09090b]/80 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-2xl hidden md:block"
                    >
                        <div className="text-xs text-blue-400 font-mono mb-2 tracking-widest">NODE: NYC-04</div>
                        <div className="text-white font-bold text-lg">New York Hub</div>
                        <div className="text-amber-400 text-xs mt-2 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                            STATUS: HIGH TRAFFIC
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* SECTION 4 — Process Flow Experience (PRESERVING EXACT PROVEN_TRACK_SLIDES TEXT) */}
            <section ref={processContainerRef} className="h-screen w-full bg-[#050505] overflow-hidden flex items-center relative z-20 border-y border-white/5">
                <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:100px_100px]" />
                
                <div ref={processWrapperRef} className="flex w-[300vw] h-full items-center">
                    {PROVEN_TRACK_SLIDES.map((slide, i) => (
                        <div key={i} className="process-step w-screen h-full flex flex-col items-center justify-center px-6 md:px-20 relative shrink-0">
                            {/* Giant background number */}
                            <div className="absolute text-[40vw] md:text-[25vw] font-black text-white/[0.02] -z-10 tracking-tighter pointer-events-none select-none top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                0{i + 1}
                            </div>
                            
                            <div className="w-4 h-4 bg-blue-500 shadow-[0_0_30px_#3b82f6] rounded-full mb-8 relative">
                                <div className="absolute inset-0 border border-blue-400 rounded-full animate-ping" />
                            </div>
                            
                            <h3 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase tracking-tight text-center drop-shadow-xl">{slide.title}</h3>
                            <p className="text-lg md:text-2xl text-zinc-400 max-w-4xl text-center font-light leading-relaxed mb-12">{slide.description}</p>
                            
                            <div className="flex flex-wrap items-center justify-center gap-4 max-w-5xl">
                                {slide.capabilities.map((cap, capIndex) => (
                                    <div key={capIndex} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm md:text-base text-zinc-300 flex items-center gap-3 backdrop-blur-md">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        {cap}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Global Routing Line */}
                <div className="absolute top-[calc(50%-70px)] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent pointer-events-none -z-10" />
            </section>

            {/* SECTION 5 — Trust & Scale */}
            <section className="relative w-full py-40 bg-[#050505] overflow-hidden">
                <div className="max-w-[1400px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                        {STATS.map((stat, i) => (
                            <StatCounter key={i} value={stat.value} label={stat.label} suffix={stat.suffix} />
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 6 — Final CTA */}
            <section className="relative w-full h-[90vh] flex flex-col items-center justify-center bg-[#050505] overflow-hidden border-t border-white/10">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2500&auto=format&fit=crop" className="w-full h-full object-cover opacity-20" alt="Logistics Terminal" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/50 to-transparent" />
                </div>
                
                <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="relative z-10 text-center px-6 max-w-5xl">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 tracking-tighter leading-tight">
                        Ready to Deploy <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Intelligent Logistics?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-3xl mx-auto">Integrate our high-performance infrastructure into your global supply chain today.</p>
                    
                    <button className="px-12 py-6 bg-white text-black font-extrabold tracking-widest uppercase rounded-full text-sm md:text-lg hover:scale-105 transition-transform duration-300 shadow-[0_0_50px_rgba(255,255,255,0.15)] hover:shadow-[0_0_80px_rgba(255,255,255,0.4)] border border-white/20">
                        Initialize Partnership
                    </button>
                </motion.div>
            </section>
        </main>
    );
}
