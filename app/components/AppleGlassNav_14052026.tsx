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

export const AppleGlassNav = ({ items, className, theme = "light" }: NavProps) => {
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
                "flex p-1.5 gap-1 backdrop-blur-[24px] rounded-[22px] transition-all duration-500",
                "shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] border border-white/20",
                isLight 
                    ? "bg-white/40 ring-1 ring-black/5" 
                    : "bg-black/30 ring-1 ring-white/10",
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
                                "relative px-5 py-2.5 text-[13px] font-semibold tracking-tight transition-all duration-300 rounded-[16px]",
                                isActive 
                                    ? (isLight ? "text-white" : "text-black") 
                                    : isLight 
                                        ? "text-zinc-800/70 hover:text-black hover:bg-white/10" 
                                        : "text-white/60 hover:text-white hover:bg-white/5"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="glass-active"
                                    className={cn(
                                        "absolute inset-0 shadow-lg z-0 rounded-[16px]",
                                        isLight ? "bg-zinc-900" : "bg-white"
                                    )}
                                    transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                                />
                            )}
                            <span className="relative z-10">{item.name}</span>
                        </Link>
                    );
                })}
        </nav>
    );
};
