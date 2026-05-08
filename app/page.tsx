"use client";
import HeroSection from "./components/HeroSection";
import { AppleGlassNav } from "./components/AppleGlassNav";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Solutions", href: "/solutions" },
    { name: "Industries", href: "/industry" },
    { name: "About us", href: "/about" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* ── Apple Glass Nav ── */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <div className="relative">
          <AppleGlassNav items={NAV_LINKS} />
        </div>
      </div>

      <HeroSection />
      
      {/* New Responsive Image Marquee Slider Section */}


      {/* Some extra content to allow for more scrolling, demonstrating the parallax */}
      <section className="h-screen bg-black flex items-center justify-center relative z-20">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Explore the Depths of Logistics</h2>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Our global network ensures your cargo arrives safely, tracked via satellite,
            orchestrated by state-of-the-art algorithms, and moving at the speed of light.
          </p>
        </div>
      </section>
    </main>
  );
}
