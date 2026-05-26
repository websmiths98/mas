"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import type { ComponentType, ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { AppleGlassNav } from "@/app/components/AppleGlassNav";

import imageTruck from "@/images_frontend/loading_container_truck.webp";
import imagePort from "@/images_frontend/1-landscape-from-bird-eye-view-for-laem-chabang-logistic-port-anek-suwannaphoom.webp";
import imageWarehouse from "@/public/warehousing__Distribution_logistics_service.webp";
import imageAir from "@/public/air_freight_service.webp";
import imageSea from "@/public/sea_freight_services.webp";
import imageODC from "@/public/project___ODC_Cargo_services.webp";

import bgDomestic from "@/public/bg_domestic.png";
import bgGlobal from "@/public/bg_global.png";
import bgFulfillment from "@/public/bg_fulfillment.png";

let gsapReady = false;

function registerGsapScroll() {
  if (typeof window === "undefined" || gsapReady) return;

  gsap.registerPlugin(ScrollTrigger);
  gsap.config({
    force3D: true,
    nullTargetWarn: false,
  });
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  gsapReady = true;
}

function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerGsapScroll();

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, []);

  return <>{children}</>;
}

const IconWrap = ({ children, className }: { children: ReactNode; className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    className={className}
  >
    {children}
  </svg>
);

const IconBox = ({ className }: { className?: string }) => (
  <IconWrap className={className}>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </IconWrap>
);

const IconGlobal = ({ className }: { className?: string }) => (
  <IconWrap className={className}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </IconWrap>
);

const IconTrendingUp = ({ className }: { className?: string }) => (
  <IconWrap className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </IconWrap>
);

type StackServiceItem = {
  title: string;
  detail: ReactNode;
  imageSrc: StaticImageData;
  eyebrow: string;
  features?: string[];
};

type StackSectionData = {
  id: string;
  counter: string;
  title: string;
  kicker: string;
  intro?: string;
  accent: string;
  gradient: string;
  Icon: ComponentType<{ className?: string }>;
  imageBgSrc?: StaticImageData;
  items: StackServiceItem[];
};

function StackCard({ section, layer }: { section: StackSectionData; layer: number }) {
  const SectionIcon = section.Icon;
  const hasIntro = Boolean(section.intro);

  return (
    <article
      className={`stack-card absolute inset-x-0 top-0 min-h-[800px] overflow-hidden rounded-[32px] md:rounded-[36px] ${section.gradient}`}
      data-layer={layer}
    >
      {section.imageBgSrc && (
        <>
          <Image
            src={section.imageBgSrc}
            alt="background"
            fill
            className="object-cover"
            priority={layer === 1}
          />
          <div className="absolute inset-0 bg-slate-950/50" />
        </>
      )}
      <div className="relative z-10 flex min-h-[800px] flex-col px-5 py-5 sm:px-8 md:px-10 lg:px-12 lg:py-6">
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center justify-center rounded-full bg-white/70 px-4 py-1 text-sm font-extrabold text-slate-900 shadow-sm">
              {section.counter}
            </span>
            <p className={`text-xs font-extrabold uppercase tracking-[0.16em] ${section.imageBgSrc ? 'text-white/90' : section.accent}`}>
              {section.kicker}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <motion.span 
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/90 text-slate-950 shadow-sm"
            >
              <SectionIcon className="h-8 w-8" />
            </motion.span>
            <h2 className={`max-w-5xl text-[24px] font-semibold leading-[1.06] tracking-[-0.02em] sm:text-3xl lg:text-[40px] ${section.imageBgSrc ? 'text-white' : 'text-slate-950'}`}>
              {section.title}
            </h2>
          </div>
        </div>

        <div
          className={`mt-6 grid flex-1 items-stretch gap-4 md:mt-8 lg:gap-6 ${hasIntro
              ? "lg:grid-cols-[0.75fr_1fr_1fr]"
              : section.items.length === 2
                ? "lg:grid-cols-2"
                : "lg:grid-cols-3"
            }`}
        >
          {hasIntro && (
            <div className={`flex min-h-[250px] flex-col justify-center rounded-[28px] ${section.imageBgSrc ? 'bg-white/10 ring-white/20 text-white' : 'bg-white/16 ring-white/25 text-slate-800'} p-6 backdrop-blur-sm`}>
              <span className={`mb-4 w-fit rounded-full bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em] text-slate-900`}>
                Integrated Fleet & Solutions
              </span>
              <p className={`text-base font-semibold leading-8 ${section.imageBgSrc ? 'text-white' : 'text-slate-800/90'}`}>
                {section.intro}
              </p>
            </div>
          )}

          {section.items.map((item) => (
            <div
              key={item.title}
              className="group flex flex-col overflow-hidden rounded-[28px] bg-white text-slate-950 shadow-[0_18px_46px_rgba(15,23,42,0.08)] ring-1 ring-black/5"
            >
              <div className="relative flex-1 min-h-[200px] overflow-hidden bg-slate-100">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 92vw, 32vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/36 via-transparent to-transparent" />
              </div>

              <div className="flex shrink-0 flex-col justify-between p-5 md:p-6 bg-white">
                <div>
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <div>
                      <p className={`text-xs font-extrabold uppercase tracking-[0.16em] ${section.accent}`}>
                        {item.eyebrow}
                      </p>
                      <h3 
                        className="mt-2 text-xl font-bold tracking-[-0.02em] text-slate-800 drop-shadow-sm"
                        style={{ textShadow: "1px 1px 0px #cbd5e1, 2px 2px 0px #94a3b8" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-500 ring-1 ring-slate-200">
                      <ArrowUpRight className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="line-clamp-3 text-sm font-medium leading-6 text-slate-600">
                    {item.detail}
                  </p>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  {(item.features ?? ["Managed network", "Secure handling", "Live coordination", "On-time movement"]).map((feature) => (
                    <span
                      key={feature}
                      className="rounded-full bg-slate-50 px-3 py-2 text-[11px] font-bold text-slate-600 ring-1 ring-slate-100"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

function StickyStackSection({ sections }: { sections: StackSectionData[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useLayoutEffect(() => {
    registerGsapScroll();

    const root = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!root || cards.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set(cards, {
          transformOrigin: "center top",
          willChange: "transform",
          force3D: true,
        });

        gsap.set(cards[0], { y: 0, scale: 0.95, zIndex: 1 });
        gsap.set(cards[1], { y: window.innerHeight, scale: 0.95, zIndex: 2 });
        gsap.set(cards[2], { y: window.innerHeight, scale: 0.95, zIndex: 3 });

        const timeline = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 2.0)}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(cards[0], { scale: 0.95, y: -20 }, 0)
          .to(cards[1], { y: 0 }, 0)
          .to(cards[0], { scale: 0.9, y: -40 }, 1)
          .to(cards[1], { scale: 0.95, y: -20 }, 1)
          .to(cards[2], { y: 0 }, 1);

        return () => timeline.kill();
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set(cards, {
          transformOrigin: "center top",
          willChange: "transform",
          force3D: true,
        });

        gsap.set(cards[0], { y: 0, scale: 1, zIndex: 1 });
        gsap.set(cards[1], { y: window.innerHeight, scale: 1, zIndex: 2 });
        gsap.set(cards[2], { y: window.innerHeight, scale: 1, zIndex: 3 });

        const timeline = gsap.timeline({
          defaults: { ease: "none", force3D: true },
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${Math.round(window.innerHeight * 2.0)}`,
            pin: true,
            pinSpacing: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        timeline
          .to(cards[0], { scale: 0.96, y: -15 }, 0)
          .to(cards[1], { y: 0 }, 0)
          .to(cards[0], { scale: 0.92, y: -30 }, 1)
          .to(cards[1], { scale: 0.96, y: -15 }, 1)
          .to(cards[2], { y: 0 }, 1);

        return () => timeline.kill();
      });

      return () => mm.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#f5f7fb] px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto flex h-[calc(100vh-80px)] max-w-[1760px] items-center">
        <div className="relative h-[840px] max-h-[94vh] w-full">
          {sections.map((section, index) => (
            <div
              key={section.id}
              ref={(node) => {
                if (node) cardsRef.current[index] = node;
              }}
              className="absolute inset-x-0 top-0"
            >
              <StackCard section={section} layer={index + 1} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#section-services" },
  { name: "Network", href: "/#section-network" },
  { name: "Industries", href: "/#section-industry" },
  { name: "About us", href: "/#section-about" },
];

const STACK_SECTIONS: StackSectionData[] = [
  {
    id: "domestic",
    counter: "1/3",
    kicker: "Domestic Cargo",
    title: "Unified domestic shipping",
    Icon: IconBox,
    accent: "text-[#1e3a8a]",
    gradient: "bg-[linear-gradient(135deg,#93c5fd_0%,#60a5fa_50%,#3b82f6_100%)]",
    imageBgSrc: bgDomestic,
    items: [
      {
        title: "Transport Logistics",
        eyebrow: "Surface Network",
        detail: (
          <>We provide reliable transport logistics solutions supported by a<span className="font-bold text-blue-600"> Our transportation services are designed to ensure the smooth movement of cargo across locations</span>while maintaining safety, consistency, and timely delivery</>
        ),
        imageSrc: imageTruck,
        features: ["Route planning", "Carrier network", "Cargo safety", "Timed dispatch"],
      },
      {
        title: "Procurement Logistics",
        eyebrow: "Supplier Flow",
        detail: (
          <>Seamless movement of goods from suppliers to destinations with <span className="font-bold text-blue-600">coordinated procurement</span> and <span className="font-bold text-blue-600">internal transportation</span>.</>
        ),
        imageSrc: imagePort,
        features: ["Supplier pickup", "Storage control", "Flow planning", "Live tracking"],
      },
      {
        title: "Outbound Logistics",
        eyebrow: "Market Delivery",
        detail: (
          <>Warehouse dispatch to final market delivery managed with <span className="font-bold text-blue-600">reliability</span>, <span className="font-bold text-blue-600">operational control</span>, and timely movement.</>
        ),
        imageSrc: imageWarehouse,
        features: ["Dispatch control", "Final delivery", "SLA focus", "Proof updates"],
      },
    ],
  },
  {
    id: "global",
    counter: "2/3",
    kicker: "Global Cargo",
    title: "Freight & supply chain solutions",
    Icon: IconGlobal,
    accent: "text-[#064e3b]",
    gradient: "bg-[linear-gradient(135deg,#6ee7b7_0%,#34d399_50%,#10b981_100%)]",
    imageBgSrc: bgGlobal,
    intro:
      "At MAS Logistics, we provide reliable and efficient logistics solutions designed to support businesses across global markets. Our services are built around flexibility, operational efficiency, and dependable execution.",
    items: [
      {
        title: "Air Freight",
        eyebrow: "Time Critical",
        detail: (
          <>Air freight for <span className="font-bold text-emerald-600">time-sensitive</span> and <span className="font-bold text-emerald-600">high-priority shipments</span> through global carrier partnerships and coordinated handling.</>
        ),
        imageSrc: imageAir,
        features: ["Express freight", "Global carriers", "Secure handling", "Priority lanes"],
      },
      {
        title: "Sea Freight",
        eyebrow: "Ocean Network",
        detail: (
          <>Dependable sea freight solutions for <span className="font-bold text-emerald-600">FCL and LCL cargo</span> with trusted shipping partners and <span className="font-bold text-emerald-600">established port networks</span>.</>
        ),
        imageSrc: imageSea,
        features: ["FCL / LCL", "Port network", "Cost routing", "Shipment visibility"],
      },
    ],
  },
  {
    id: "fulfillment",
    counter: "3/3",
    kicker: "Fulfillment & Projects",
    title: "Advanced warehousing & ODC fulfillment",
    Icon: IconTrendingUp,
    accent: "text-[#78350f]",
    gradient: "bg-[linear-gradient(135deg,#fcd34d_0%,#fbbf24_50%,#f59e0b_100%)]",
    imageBgSrc: bgFulfillment,
    items: [
      {
        title: "Warehousing",
        eyebrow: "Inventory Control",
        detail: (
          <>Scalable warehousing and distribution solutions that support <span className="font-bold text-amber-600">efficient inventory management</span> and <span className="font-bold text-amber-600">smooth dispatch operations</span>.</>
        ),
        imageSrc: imageWarehouse,
        features: ["Inventory support", "Dispatch handling", "Scalable storage", "Cost control"],
      },
      {
        title: "Project / ODC Cargo",
        eyebrow: "Heavy Lift",
        detail: (
          <>Specialized handling for <span className="font-bold text-amber-600">oversized, heavy-lift</span>, and complex cargo with <span className="font-bold text-amber-600">precision planning</span> and careful execution.</>
        ),
        imageSrc: imageODC,
        features: ["Heavy cargo", "Route planning", "Equipment support", "Project execution"],
      },
    ],
  },
];

export default function ServicesPage({ isEmbedded = false }: { isEmbedded?: boolean }) {
  return (
    <SmoothScrollProvider>
      <main className="min-h-screen overflow-x-hidden bg-[#f5f7fb] text-slate-950">
        {!isEmbedded && (
          <div className="fixed left-1/2 top-7 z-[100] w-auto -translate-x-1/2">
            <AppleGlassNav
              items={NAV_LINKS}
              theme="light"
              logo={
                <Link href="/" className="flex items-center">
                  <Image
                    src="/mas_logo.webp"
                    alt="MAS Logistics"
                    width={200}
                    height={50}
                    className="h-9 w-auto origin-center scale-[2.1] object-contain"
                    priority
                  />
                </Link>
              }
            />
          </div>
        )}

        <section className="mx-auto max-w-[1760px] px-5 pb-8 pt-32 sm:px-8 lg:px-10 lg:pt-36">
          <h1 className="max-w-5xl text-[36px] font-semibold leading-[1.04] tracking-[-0.03em] text-slate-950 sm:text-6xl lg:text-[76px]">
            Built to Simplify Global Logistics Operations
          </h1>
          <p className="mt-6 max-w-7xl text-lg font-medium leading-9 text-slate-600 lg:text-xl">
            At MAS Logistics, we provide structured and dependable logistics solutions that support businesses across every stage of the supply chain. From transportation and procurement to warehousing and distribution, our services are designed to ensure smooth cargo movement, operational efficiency, and reliable global connectivity. With a strong focus on coordinated execution and timely delivery, we help businesses manage logistics operations with greater control, visibility, and consistency
          </p>
        </section>

        <StickyStackSection sections={STACK_SECTIONS} />


      </main>
    </SmoothScrollProvider>
  );
}
