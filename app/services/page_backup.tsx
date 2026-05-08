import React from "react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

export default function Services() {
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
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Services</h1>
            </div>

            {/* Content Container */}
            <div className="flex-1 max-w-5xl w-full mx-auto p-6 md:p-12">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <article className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Service One</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.
                            Sed cursus ante dapibus diam.
                        </p>
                    </article>

                    <article className="rounded-2xl border border-black/10 bg-white/70 p-6 shadow-sm">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-3">Service Two</h2>
                        <p className="text-gray-700 leading-relaxed">
                            Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris,
                            fusce nec tellus sed augue semper porta.
                        </p>
                    </article>
                </section>
            </div>
        </main>
    );
}
