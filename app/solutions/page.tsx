import React from "react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

export default function Solutions() {
    return (
        <main className="min-h-screen relative flex flex-col" style={{ backgroundColor: "rgb(230, 236, 242)" }}>
            {/* Apple Glass Nav */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
                <div className="relative">
                    <AppleGlassNav items={NAV_LINKS} theme="light" />
                </div>
            </div>

            {/* Dedicated Title Container */}
            <div className="w-full pt-32 pb-16 px-6 flex justify-center border-b border-black/10 bg-white/40">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Solutions</h1>
            </div>

            {/* Content Container */}
            <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12">
                <p className="text-gray-700 text-lg">
                    This is the foundational content for the Solutions page. Build your awesome features here!
                </p>
            </div>
        </main>
    );
}
