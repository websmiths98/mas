"use client";
import Image from "next/image";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import ServicesPage from "./services/page";
import NetworkPage from "./network/page";
import IndustryPage from "./industry/page";
import AboutPage from "./about/page";
import ReviewPage from "./review/page";
import FAQPage from "./FAQ/page";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
  // { name: "FAQ", href: "/#section-FAQ" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5E4E2] relative overflow-x-hidden text-gray-900">
      
      {/* ── Fixed Header Container ── */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-auto">
        <AppleGlassNav 
          items={NAV_LINKS} 
          theme="light"
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

      <div id="section-home" className="w-full">
        <HeroSection />
      </div>

      <div id="section-services" className="w-full relative z-10">
        <ServicesPage isEmbedded={true} />
      </div>

      <div id="section-network" className="w-full relative z-10">
        <NetworkPage />
      </div>

      <div id="section-industry" className="w-full relative z-10">
        <IndustryPage isEmbedded={true} />
      </div>

      <div id="section-about" className="w-full relative z-10">
        <AboutPage isEmbedded={true} />
      </div>

      {/* <div id="section-review" className="w-full relative z-10">
        <ReviewPage />
      </div> */}

      <div id="section-FAQ" className="w-full relative z-10">
        <FAQPage isEmbedded={true} />
      </div>

    </main>
  );
}
