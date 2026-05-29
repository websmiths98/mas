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
        question: "WHY CHOOSE OUR TRUCKING SERVICE?",
        answer: "Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate B2C users after installed base benefits. Dramatically visualize customer\n\nDirected convergence without revolutionary ROI.Efficiently unleash cross-media information without cross-media value. Quickly maximize timely deliverables for real-time schemas. Dramatically maintain clicks-and-mortar solutions without functional solutions",
    },
    {
        question: "ANY FACILITIES AVAILABLE ON WAREHOUSING AND STORAGE SERVICE?",
        answer: "Professionally cultivate one-to-one customer service with robust ideas dynamically innovate resource\n\nLeveling customer service for state of the art customer service.Objectively innovate empowered manufactured products whereas parallel platforms. Holisticly predominate extensible testing procedures for reliable supply chains. Dramatically engage top-line web services vis-a-vis",
    },
    {
        question: "IS IT POSSIBLE TO LOGISTIC SERVICE PROVIDERS TO UNDERSTAND OUR BUSINESS?",
        answer: "Proactively envisioned multimedia based expertise and cross-media growth strategies. Seamlessly visualize quality intellectual capital without superior collaboration and idea-sharing\n\nHolistically pontificate installed base portals after maintainable products.Phosfluorescently engage worldwide methodologies with web-enabled technology. Interactively coordinate proactive e-commerce via process-centric \"outside the box\" thinking. Completely pursue scalable customer",
    },
    {
        question: "ANY SPECIALITY IN OF ADVANCED GREEN CARRIERS?",
        answer: "Collaboratively administrate turnkey channels whereas virtual e-tailers. Objectively seize scalable metrics whereas proactive e-services. Seamlessly empower fully researched growth\n\nStrategies and interoperable internal or \"organic\" sources.Credibly innovate granular internal or \"organic\" sources whereas high standards in web-readiness. Energistically scale future-proof core competencies vis-a-vis impactful experiences. Dramatically synthesize integrated schemas",
    },
    {
        question: "HOW ABOUT DOMESTIC AND INTERNATIONAL DELIVERIES OF COLLECTIVE AND PARTIAL SHIPMENTS?",
        answer: "Interactively procrastinate high-payoff content without backward-compatible data. Quickly cultivate optimal processes and tactical architectures. Completely iterate covalent strategic theme\n\nAreas via accurate e-markets. Globally incubate standards compliant channels before scalable benefits. Quickly disseminate superior deliverables whereas web-enabled applications. Quickly drive clicks-and-mortar catalysts for change before vertical architectures",
    },
    {
        question: "HAVING PROBLEMS WITH YOUR TRUCK, VAN OR ANY KIND OF TRANSPORTATION VEHICLES?",
        answer: "Credibly reintermediate backend ideas for cross-platform models. Continually reintermediate integrated processes through technically sound intellectual capital holistically foster\n\nsuperior methodologies without market-driven best practices.Distinctively exploit optimal alignments for intuitive bandwidth. Quickly coordinate e-business applications through revolutionary catalysts for change. Seamlessly underwhelm optimal testing procedures whereas bricks-and-clicks",
    },
    {
        question: "HOW TO GET INFORMATIONS ABOUT OUR BRANCHES AROUND THE WORLD?",
        answer: "I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness\n\nNo one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that",
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

            <h2 className="text-[#e5e4e2] text-xl sm:text-xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 sm:mb-10 uppercase text-center lg:text-left">
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
                                <span className="text-[#e5e4e2] font-normal text-sm sm:text-base lg:text-lg text-left tracking-wide leading-relaxed">
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
                                        <div className="bg-[#e5e4e2] text-black p-5 sm:p-6 lg:p-8 rounded-[2rem] border border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] relative z-0">
                                            <p className="text-sm sm:text-base font-normal leading-relaxed whitespace-pre-line">
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
                <div className="hidden lg:block lg:w-1/2 relative z-0 overflow-hidden bg-[#202833]">
                    {/* Inner wrapper to add padding to clear the fixed nav, without breaking the component's internal layout */}
                    <div className="w-full pt-8 pb-16">
                        <Testimonials />
                    </div>
                </div>

                {/* Right side FAQ show off */}
                <div className="w-full lg:w-1/2 flex flex-col items-center pt-[4rem] sm:pt-[5rem] lg:pt-[7rem] pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 overflow-x-hidden">
                    <div className="w-full max-w-[800px] flex flex-col">
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
