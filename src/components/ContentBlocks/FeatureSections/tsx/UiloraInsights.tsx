"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Moon,
    Activity,
    Shield,
    Zap,
    Heart,
    Layers,
    type LucideIcon,
} from "lucide-react";

interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
    visual: React.ReactNode;
}

interface UiloraInsightsProps {
    features?: FeatureItem[];
    title?: string;
    subtitle?: string;
    accentColor?: string;
    bgColor?: string;
}

/* ---------- image visual helper ---------- */

const ImageVisual = ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} className="w-full h-full object-cover" />
);

/* ---------- default features ---------- */

const defaultFeatures: FeatureItem[] = [
    {
        icon: Moon,
        title: "Dark Mode",
        description:
            "Automatic dark mode support across all components with zero configuration needed.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2670&auto=format&fit=crop"
                alt="Dark mode coding"
            />
        ),
    },
    {
        icon: Activity,
        title: "Motion System",
        description:
            "Physics-based animations powered by Framer Motion for buttery smooth interactions.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop"
                alt="Motion and technology"
            />
        ),
    },
    {
        icon: Shield,
        title: "Type Safety",
        description:
            "Full TypeScript coverage with strict mode compatibility and IntelliSense support.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2574&auto=format&fit=crop"
                alt="Code on screen"
            />
        ),
    },
    {
        icon: Zap,
        title: "Performance",
        description:
            "Tree-shakeable exports and lazy loading for minimal bundle impact.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Performance dashboard"
            />
        ),
    },
    {
        icon: Heart,
        title: "Accessibility",
        description:
            "WCAG compliant components with proper ARIA labels and keyboard navigation.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=2669&auto=format&fit=crop"
                alt="Inclusive design"
            />
        ),
    },
    {
        icon: Layers,
        title: "Design Tokens",
        description:
            "Consistent spacing, colors, and typography tokens across your entire application.",
        visual: (
            <ImageVisual
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2564&auto=format&fit=crop"
                alt="Design system colors"
            />
        ),
    },
];

/* ---------- component ---------- */

const UiloraInsights: React.FC<UiloraInsightsProps> = ({
    features = defaultFeatures,
    title = "Track What Matters",
    subtitle = "BUILT-IN-INSIGHTS",
    accentColor = "#1a1a1a",
    bgColor = "#F5F3EF",
}) => {
    const [active, setActive] = useState<number>(0);

    return (
        <section 
            className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 py-16"
            style={{ background: bgColor }}
        >
            <motion.div
                className="mx-auto max-w-6xl w-full bg-white rounded-2xl shadow-[0_4px_40px_rgba(0,0,0,0.06)] p-6 sm:p-10 lg:p-14"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">
                    {/* ---- Left column ---- */}
                    <div className="w-full lg:w-[45%] flex flex-col">
                        <span
                            className="text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
                            style={{ color: accentColor }}
                        >
                            {subtitle}
                        </span>
                        <h2
                            className="text-3xl sm:text-4xl font-bold mb-8"
                            style={{ color: accentColor }}
                        >
                            {title}
                        </h2>

                        <div className="flex flex-col">
                            {features.map((feature, index) => {
                                const isActive = index === active;
                                const Icon = feature.icon;
                                return (
                                    <button
                                        key={index}
                                        type="button"
                                        className="text-left w-full focus:outline-none"
                                        onClick={() => setActive(index)}
                                        onMouseEnter={() => setActive(index)}
                                    >
                                        <div
                                            className={`flex gap-3 py-4 pl-4 border-l-2 transition-all duration-300 ${
                                                isActive
                                                    ? "border-l-[3px]"
                                                    : "border-gray-200"
                                            }`}
                                            style={
                                                isActive
                                                    ? { borderColor: accentColor }
                                                    : undefined
                                            }
                                        >
                                            <Icon
                                                className="w-5 h-5 mt-0.5 shrink-0 transition-colors duration-300"
                                                style={{
                                                    color: isActive
                                                        ? accentColor
                                                        : "#9ca3af",
                                                }}
                                            />
                                            <div>
                                                <span
                                                    className="font-semibold text-[15px] leading-snug transition-colors duration-300"
                                                    style={{
                                                        color: isActive
                                                            ? accentColor
                                                            : "#9ca3af",
                                                    }}
                                                >
                                                    {feature.title}
                                                </span>
                                                <AnimatePresence initial={false}>
                                                    {isActive && (
                                                        <motion.p
                                                            className="text-sm text-gray-500 mt-1 leading-relaxed"
                                                            initial={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                height: "auto",
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                                ease: "easeInOut",
                                                            }}
                                                        >
                                                            {feature.description}
                                                        </motion.p>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* ---- Right column ---- */}
                    <div className="w-full lg:w-[55%] relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[460px] bg-[#111]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.04 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.97 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                            >
                                {/* Visual */}
                                <div className="absolute inset-0">
                                    {features[active]?.visual}
                                </div>

                                {/* Top overlay bar */}
                                <div className="absolute top-0 inset-x-0 flex items-center justify-between px-5 py-3 z-10 bg-gradient-to-b from-black/50 to-transparent">
                                    <span className="text-white/90 text-xs font-medium tracking-wide">
                                        {features[active]?.title}
                                    </span>
                                    <span className="text-[10px] font-semibold tracking-wider text-white/80 border border-white/20 rounded-full px-3 py-1">
                                        Explore Uilora
                                    </span>
                                </div>

                                {/* Bottom gradient + text */}
                                <div className="absolute bottom-0 inset-x-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-6 pb-6 pt-16">
                                    <h3 className="text-white text-lg font-bold mb-1">
                                        {features[active]?.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                                        {features[active]?.description}
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default UiloraInsights;

