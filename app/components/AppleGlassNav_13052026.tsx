"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavItem = {
    name: string;
    href: string;
};

interface NavProps {
    items: NavItem[];
    className?: string;
    theme?: "light" | "dark";
}

export const AppleGlassNav = ({ items, className, theme = "dark" }: NavProps) => {
    const pathname = usePathname();
    const [active, setActive] = useState("");

    useEffect(() => {
        const currentItem = items.find(item => item.href === pathname);
        if (currentItem) {
            setActive(currentItem.name);
        } else if (pathname === "/") {
            const homeItem = items.find(item => item.href === "/");
            if (homeItem) setActive(homeItem.name);
        }
    }, [pathname, items]);

    const isLight = theme === "light";

    return (
        <nav className={cn(
            "flex p-1.5 gap-2 backdrop-blur-xl rounded-full shadow-lg ring-1",
            isLight ? "bg-white/80 border border-black/5 ring-black/5" : "bg-[#2A2A2A]/90 border border-white/10 ring-white/10",
            className
        )}>
            {items.map((item) => {
                const isActive = active === item.name;
                return (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setActive(item.name)}
                        className={cn(
                            "relative px-4 py-1.5 text-sm font-medium transition-colors duration-300",
                            isActive 
                                ? (isLight ? "text-white" : "text-black") 
                                : isLight 
                                    ? "text-black/60 hover:text-black" 
                                    : "text-white/70 hover:text-white"
                        )}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="glass-active"
                                className={cn(
                                    "absolute inset-0 shadow-sm rounded-full backdrop-blur-md",
                                    isLight ? "bg-[#2A2A2A] shadow-lg" : "bg-white shadow-lg"
                                )}
                                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                            />
                        )}
                        <span className="relative z-10">{item.name}</span>
                    </Link>
                );
            })}
        </nav>
    );
};
