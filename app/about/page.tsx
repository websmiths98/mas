"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { StarsBackground } from "@/app/components/StarsBackground";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/network" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Subtle parallax transforms for the images
    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -50]);

    // Elegant text reveal animation
    const textReveal = {
        hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)",
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
        }
    };

    return (
        <main className="min-h-screen bg-[#E5E4E2] text-zinc-900 selection:bg-black selection:text-white" ref={containerRef}>
            {/* White theme navigation */}
            <nav className="flex items-center justify-center gap-6 py-6 border-b border-zinc-100 relative z-50">
                {NAV_LINKS.map((l) => (
                    <a key={l.href} href={l.href} className="text-sm text-zinc-500 hover:text-black transition-colors font-medium">
                        {l.name}
                    </a>
                ))}
            </nav>

            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                <div className="relative">
                    <AppleGlassNav items={NAV_LINKS} theme="light" />
                </div>
            </div>

            {/* Header */}
            <section className="pt-32 pb-12 px-6 max-w-7xl mx-auto text-center relative z-20">
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-zinc-900 mb-6">
                        About Us
                    </h1>
                    <p className="text-xl md:text-2xl text-zinc-500 font-light max-w-2xl mx-auto">
                        We build logistics networks that power the modern world.
                    </p>
                </motion.div>
            </section>

            {/* Asymmetrical Editorial Grid (Story, Mission, Vision together) */}
            <section className="py-20 px-6 max-w-[1400px] mx-auto overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* Left Column */}
                    <div className="flex flex-col space-y-24">
                        
                        {/* Our Story Block */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={textReveal}
                            className="max-w-xl"
                        >
                            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 block">The Beginning</span>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
                                Our Story
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed mb-6">
                                MAS is one of India's leading providers of freight forwarding and supply chain management services. Our previous experience showed us that honesty and respect are not always put first. We decided to turn the system upside down.
                            </p>
                            <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                                Values we respect are set in stone, and no one can undermine them. MAS means people who care about quality and professional relationships.
                            </p>
                        </motion.div>

                        {/* Image 1 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl relative"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=800&auto=format&fit=crop" 
                                alt="Logistics Team Working" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                        </motion.div>

                        {/* Image 2 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[2rem] overflow-hidden aspect-video shadow-xl relative w-4/5 ml-auto"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop" 
                                alt="Strategy and Planning" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                        </motion.div>

                        {/* Our Vision Block */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={textReveal}
                            className="max-w-xl pt-12"
                        >
                            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 block">The Future</span>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
                                Our Vision
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
                                To grow as a highly trusted logistics company with a formidable presence across Asia and international markets, becoming the absolute standard for excellence in global supply chain management.
                            </p>
                        </motion.div>

                    </div>

                    {/* Right Column (Staggered downwards) */}
                    <div className="flex flex-col space-y-24 lg:pt-40">
                        
                        {/* Image 3 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[2rem] overflow-hidden aspect-square shadow-2xl relative w-11/12"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" 
                                alt="Corporate Office Workspace" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                        </motion.div>

                        {/* Our Mission Block */}
                        <motion.div 
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={textReveal}
                            className="max-w-xl pl-8 border-l border-zinc-200"
                        >
                            <span className="text-xs font-bold tracking-widest text-zinc-400 uppercase mb-4 block">Our Purpose</span>
                            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed mb-6">
                                Just like people, companies have their personalities. Our mission is to help businesses express their true uniqueness. From our base in Asia, we deliver dependable logistics solutions that help clients grow. 
                            </p>
                            <p className="text-xl md:text-2xl text-zinc-900 font-medium italic">
                                "Every detail matters" is our motto.
                            </p>
                        </motion.div>

                        {/* Image 4 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[2rem] overflow-hidden aspect-[3/4] shadow-2xl relative w-full"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" 
                                alt="Professional Handshake" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                        </motion.div>

                        {/* Image 5 */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-[2rem] overflow-hidden aspect-video shadow-xl relative w-4/5"
                        >
                            <motion.img 
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop" 
                                alt="Team Collaboration" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* Core Values Section - Dark Cosmic Bento Grid (Unchanged dark theme as requested previously) */}
            <section className="relative py-40 bg-zinc-950 overflow-hidden border-t border-white/5">
                <StarsBackground />
                
                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 25, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        className="mb-20 text-center"
                    >
                        <h2 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">
                            Our Principles
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6">
                            Core Values
                        </h3>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { 
                                title: "Value Creations", 
                                desc: "Creating real value for our clients, employees and shareholders through innovative solutions.",
                                img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-2"
                            },
                            { 
                                title: "Openness", 
                                desc: "True openness and transparency throughout our company with active open communication.",
                                img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-1"
                            },
                            { 
                                title: "Integrity", 
                                desc: "Following clear ethical guidelines and strictly enforcing them throughout the company.",
                                img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-1"
                            },
                            { 
                                title: "Trustworthiness", 
                                desc: "Developing trust amongst our clients and employees through reliable actions.",
                                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-1"
                            },
                            { 
                                title: "Compliance", 
                                desc: "Following rules adhering to environmental policies and business confidentiality.",
                                img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-1"
                            },
                            { 
                                title: "Commitment", 
                                desc: "Fully dedicated to all projects, assignments, and the success of our clients.",
                                img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
                                span: "lg:col-span-1"
                            },
                            { 
                                title: "Excellence", 
                                desc: "Practising a continuous process of improvement and innovation.",
                                img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
                                span: "lg:col-span-2"
                            }
                        ].map((val, idx) => (
                            <motion.div 
                                key={val.title}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-50px" }}
                                variants={{
                                    hidden: { opacity: 0, y: 30, scale: 0.95 },
                                    visible: { 
                                        opacity: 1, 
                                        y: 0, 
                                        scale: 1,
                                        transition: { duration: 0.8, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] } 
                                    }
                                }}
                                className={`group relative w-full h-[320px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 ${val.span}`}
                            >
                                <motion.div 
                                    className="absolute inset-0 w-full h-full"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                >
                                    <img 
                                        src={val.img} 
                                        alt={val.title}
                                        className="w-full h-full object-cover opacity-50 group-hover:opacity-30 transition-opacity duration-700"
                                    />
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/40 to-transparent" />
                                
                                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                                    <div className="mb-2 text-white/30 font-bold text-2xl tracking-tighter">
                                        0{idx + 1}
                                    </div>
                                    <h4 className="text-3xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors duration-500">
                                        {val.title}
                                    </h4>
                                    <p className="text-zinc-400 font-light leading-relaxed">
                                        {val.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
