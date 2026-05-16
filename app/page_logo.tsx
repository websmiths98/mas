"use client";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import { AppleGlassNav } from "./components/AppleGlassNav";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Network", href: "/network" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E4E2] relative overflow-x-hidden text-gray-900">
      
      {/* ── Fixed Header Container ── */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-6 w-auto">
        
        {/* Logo Section - Extended Width */}
        <Link href="/" className="flex-shrink-0">
          <div className="relative">
            <Image 
              src="/mas_logo.webp" 
              alt="Logo" 
              width={150} 
              height={150} 
              className="h-20 w-32 object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300" 
              /* 
                 EXTENDING WIDTH:
                 h-12 = 48px height (Standard)
                 w-32 = 128px width (Double a standard square logo)
                 object-contain = Keeps the logo from stretching/distorting
              */
              priority
            />
          </div>
        </Link>

        {/* Navigation Bar */}
        <div className="relative">
          <AppleGlassNav items={NAV_LINKS} />
        </div>
        
      </div>

      <HeroSection />

      {/* New Responsive Image Marquee Slider Section */}

    </main>
  );
}
