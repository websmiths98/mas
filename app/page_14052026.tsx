"use client";
import HeroSection from "./components/HeroSection";
import { AppleGlassNav } from "./components/AppleGlassNav";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#section-services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/#section-network" },
    { name: "Industries", href: "/#section-industry" },
    { name: "About us", href: "/#section-about" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E4E2] relative overflow-x-hidden text-gray-900">
      {/* ── Apple Glass Nav ── */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <div className="relative">
          <AppleGlassNav items={NAV_LINKS} />
        </div>
      </div>

      <HeroSection />
      
      {/* New Responsive Image Marquee Slider Section */}

    </main>
  );
}
