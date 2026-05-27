"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import masIcon from "@/images_frontend/mas_without_wording.png";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
    //   { name: "FAQ", href: "/#section-FAQ" },
];

interface FAQItem {
    question: string;
    answer: string;
}

interface AccordionFAQBoldProps {
    accentColor?: string;
    items?: FAQItem[];
    heading?: string;
}

const DEFAULT_ITEMS: FAQItem[] = [
    {
        question: "When and how should it be used?",
        answer: "Deploy this accordion on any page where bold, direct communication is the priority — product landing pages, documentation hubs, or brand storytelling sequences.",
    },
    {
        question: "What's an accordion component?",
        answer: "An accordion is a stacked UI pattern where each row expands to reveal its content, then collapses to save vertical space. Only one item is active at a time by design.",
    },
    {
        question: "How is Uilora different from shadcn/ui?",
        answer: "Uilora focuses on motion craft and visual distinction. Where shadcn/ui gives you functional primitives, Uilora gives you finished, opinionated components with production-grade animation built in.",
    },
    {
        question: "What if I need multiple items open at once?",
        answer: "Change `setActive(isActive ? null : i)` to track an array of open indices instead of a single number. The AnimatePresence exit animations handle the rest without any additional logic.",
    },
    {
        question: "How do I choose an icon to indicate expansion?",
        answer: "Uilora uses a circular +/— icon that fills with the accent color on active. It communicates the toggle clearly without competing with the label typography or expanding content.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
        }
    },
};

export const AccordionFAQBold: React.FC<AccordionFAQBoldProps> = ({
    accentColor = "#ffffff",
    items = DEFAULT_ITEMS,
    heading = "FAQ",
}) => {
    const [active, setActive] = useState<number | null>(0);

    return (
        <div className="w-full relative z-10">
            {/* Ambient Background layer */}
            <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden rounded-3xl">
                <motion.div
                    animate={{ y: [0, -40, 0], opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 -left-10 w-96 h-96 bg-zinc-800 rounded-full blur-[120px]"
                />
            </div>

            <h2 className="text-[#e5e4e2] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 sm:mb-12 uppercase text-center md:text-left" style={{ WebkitTextStroke: "1px #e5e4e2" }}>
                {heading}
            </h2>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
            >
                {items.map((item, i) => {
                    const isActive = active === i;

                    return (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            className="w-full mb-4 sm:mb-6"
                            onMouseEnter={() => setActive(i)}
                            onMouseLeave={() => setActive(null)}
                        >
                            {/* Question Pill */}
                            <motion.button
                                className="w-full flex items-center justify-between gap-4 p-4 sm:p-6 bg-[#0a0a0b] hover:bg-[#1a1a1c] border border-[#2a2a2c] rounded-[2rem] transition-colors shadow-xl group"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="text-[#e5e4e2] font-bold text-lg sm:text-xl lg:text-2xl text-left tracking-tight leading-tight">
                                    {item.question}
                                </span>
                            </motion.button>

                            {/* Answer Card */}
                            <AnimatePresence mode="wait">
                                {isActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.96, rotate: -0.4 }}
                                        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.98, transition: { duration: 0.2 } }}
                                        transition={{ type: "spring", stiffness: 220, damping: 20 }}
                                        className="relative mt-3 ml-4 sm:ml-12 w-[calc(100%-1rem)] sm:w-[calc(100%-3rem)]"
                                    >
                                        <div className="bg-[#e5e4e2] text-black p-6 sm:p-8 rounded-[2rem] border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-0">
                                            <p className="text-sm sm:text-base md:text-lg font-medium leading-relaxed">
                                                {item.answer}
                                            </p>
                                        </div>

                                        {/* Detached Rotating Badge */}
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -top-4 -right-4 w-14 h-14 bg-[#e5e4e2] rounded-full flex items-center justify-center border-[3px] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] z-10 overflow-hidden"
                                        >
                                            <Image src={masIcon} alt="Icon" className="w-[65%] h-[65%] object-contain scale-125 translate-x-0.5" />
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};

import Testimonials from "@/app/review/page";

export default function AccordionFAQBoldPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
    return (
        <main className="w-full relative overflow-x-clip text-gray-900" style={{ background: "#0a0a0b" }}>
            {/* ── Fixed Header Container ── */}
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
                                    className="h-9 w-30 object-contain transform scale-225 origin-centre"
                                    priority
                                />
                            </Link>
                        }
                    />
                </div>
            )}

            <div className="w-full flex min-h-[600px] relative border-b border-[#1f1f22]">
                {/* Left side Testimonials show off */}
                <div className="hidden md:block w-1/2 relative z-0 overflow-hidden bg-[#202833]">
                    {/* Inner wrapper to add padding to clear the fixed nav, without breaking the component's internal layout */}
                    <div className="w-full pt-8 pb-16">
                        <Testimonials />
                    </div>
                </div>

                {/* Right side FAQ show off */}
                <div className="w-full md:w-1/2 flex flex-col items-center pt-[5rem] lg:pt-[7rem] pb-16 px-6 md:px-12 relative z-10 overflow-x-hidden">
                    <div className="w-full max-w-[900px] flex flex-col">
                        <AccordionFAQBold />
                        {!isEmbedded && (
                            <div className="mt-16">
                                <Link href="/" className="inline-block px-8 py-4 rounded-full text-base font-semibold text-black bg-white hover:bg-zinc-200 transition-colors shadow-lg">
                                    Back to Home
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}
