"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

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

export const AccordionFAQBold: React.FC<AccordionFAQBoldProps> = ({
    accentColor = "#ffffff",
    items = DEFAULT_ITEMS,
    heading = "FAQ",
}) => {
    const [active, setActive] = useState<number | null>(null);
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div
            className="w-full max-w-2xl rounded-2xl p-8"
            style={{ background: "#0a0a0b" }}
        >
            {/* Big editorial heading */}
            <h2
                className="font-black leading-none mb-10"
                style={{
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    color: "#ffffff",
                    letterSpacing: "-0.04em",
                }}
            >
                {heading}
            </h2>

            {/* Items */}
            <div>
                {items.map((item, i) => {
                    const isActive = active === i;
                    const isHovered = hovered === i;
                    return (
                        <div
                            key={i}
                            className="border-t"
                            style={{ borderColor: "#1f1f22" }}
                        >
                            <button
                                onClick={() => setActive(isActive ? null : i)}
                                onMouseEnter={() => setHovered(i)}
                                onMouseLeave={() => setHovered(null)}
                                className="w-full flex items-center justify-between py-5 text-left"
                            >
                                <span
                                    className="text-sm font-semibold pr-6 leading-snug transition-colors duration-200"
                                    style={{
                                        color: isActive ? "#ffffff" : isHovered ? "#e4e4e7" : "#71717a",
                                    }}
                                >
                                    {item.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: isActive ? 45 : 0 }}
                                    transition={{ duration: 0.22, ease: "easeInOut" }}
                                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{
                                        background: isActive ? accentColor : "#1a1a1e",
                                        border: `1px solid ${isActive ? accentColor : "#2a2a2e"}`,
                                        transition: "background 0.2s, border-color 0.2s",
                                    }}
                                >
                                    <span
                                        className="text-sm font-bold leading-none"
                                        style={{ color: isActive ? "#000000" : "#52525b" }}
                                    >
                                        +
                                    </span>
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.26, ease: [0.4, 0, 0.2, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pb-5 pr-12">
                                            <p className="text-sm leading-relaxed" style={{ color: "#71717a" }}>
                                                {item.answer}
                                            </p>
                                            <motion.button
                                                whileHover={{ x: 3 }}
                                                className="mt-3 text-xs font-semibold flex items-center gap-1.5 transition-opacity hover:opacity-70"
                                                style={{ color: "#52525b" }}
                                            >
                                                Read more <span>→</span>
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
                <div className="border-t" style={{ borderColor: "#1f1f22" }} />
            </div>
        </div>
    );
};

export default function AccordionFAQBoldPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
    return (
        <main className="w-full relative overflow-x-hidden text-gray-900" style={{ background: "#0a0a0b" }}>
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

            <div className="w-full flex flex-col items-center justify-center min-h-screen py-32 px-6 pt-40">
                <AccordionFAQBold />
                {!isEmbedded && (
                    <div className="mt-12">
                        <Link href="/" className="px-6 py-3 rounded-full text-sm font-semibold text-black bg-white hover:bg-zinc-200 transition-colors">
                            Back to Home
                        </Link>
                    </div>
                )}
            </div>
        </main>
    );
}
