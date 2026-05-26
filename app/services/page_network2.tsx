"use client";

import React from "react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";
import { NetworkContent } from "./components/NetworkContent";
import { NetworkVisual } from "./components/NetworkVisual";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Solutions", href: "/solutions" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

export default function NetworkPage() {
  return (
    <main
      className="relative min-h-screen text-[#E5E4E2]"
      style={{ background: 'radial-gradient(ellipse at bottom left, #0f172a 0%, #020617 60%, #000000 100%)' }}
    >
      <div className="fixed left-1/2 top-8 z-50 w-auto -translate-x-1/2">
        <AppleGlassNav items={NAV_LINKS} theme="dark" />
      </div>

      <div className="flex flex-col lg:flex-row w-full pt-24 items-start">
        {/* Left Column: Scrollable Content */}
        <NetworkContent />

        {/* Right Column: Sticky Globe Visual */}
        <NetworkVisual />
      </div>
    </main>
  );
}
