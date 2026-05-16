"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Cinematic Scroll-Reveal Hook ────────────────────────────────────────────
function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hasLeft, setHasLeft] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setHasLeft(false);
        } else {
          // Allow bidirectional: hide again when scrolled past
          if (visible) setHasLeft(true);
          setVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, visible]);

  return { ref, visible, hasLeft };
}

// ─── Reveal Line Component ────────────────────────────────────────────────────
interface RevealLineProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}

function RevealLine({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealLineProps) {
  const { ref, visible } = useScrollReveal(0.1);

  const dirMap = {
    up: "translateY(38px)",
    down: "translateY(-38px)",
    left: "translateX(-38px)",
    right: "translateX(38px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : dirMap[direction],
        transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}

// ─── Staggered word reveal ────────────────────────────────────────────────────
function WordReveal({
  text,
  delay = 0,
  className = "",
  as: Component = "div",
}: {
  text: string;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, visible } = useScrollReveal(0.1);
  const words = text.split(" ");

  return (
    <Component ref={ref as any} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${
              delay + i * 0.07
            }s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${
              delay + i * 0.07
            }s`,
            willChange: "opacity, transform",
            marginRight: "0.28em",
          }}
        >
          {word}
        </span>
      ))}
    </Component>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.15]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.82]);



  return (
    <div ref={containerRef} className="relative bg-[#E5E4E2]" style={{ height: "120vh" }}>
      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">

        {/* ── Video BG ── */}
        <motion.div
          className="absolute inset-0 z-0 origin-center"
          style={{ scale: videoScale, y: videoY }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/Firefly%20You%20are%20a%20motion%20graphics%20director%20specializing%20in%20cinematic%20sequences%20involving%20maritime%20an.mp4"
          />
        </motion.div>

        {/* ── Dark overlay ── */}
        <motion.div
          className="absolute inset-0 z-[1]"
          style={{
            opacity: overlayOpacity,
            background:
              "linear-gradient(160deg, rgba(2,6,18,0.96) 0%, rgba(3,9,28,0.88) 50%, rgba(5,12,35,0.72) 100%)",
          }}
        />

        {/* ── Noise texture ── */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
            opacity: 0.35,
          }}
        />

        {/* ── Hero Content ── */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto px-6 md:px-16 flex flex-col items-center text-center gap-6"
        >
          {/* ─ Badge ─ */}
          <RevealLine delay={0.1} direction="up">
            <div className="hero-badge">
              <span className="hero-badge-dot" />
              Trusted logistics partner across India & global markets
            </div>
          </RevealLine>

          {/* ─ Primary Heading ─ */}
          <h3 className="hero-h1" aria-label="International Freight Forwarding & Supply Chain Solutions">
            {"International Freight Forwarding & Supply Chain Solutions".split(" ").map((word, i) => (
              <motion.span
                key={i}
                style={{ display: "inline-block", marginRight: "0.3em" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </motion.span>
            ))}
          </h3>

          {/* ─ Subtitle ─ */}
          <RevealLine delay={0.8} direction="up">
            <h5 className="hero-h2">
              MAS Logistics is an India-based international logistics company
              delivering reliable freight forwarding and supply chain solutions
              across global markets.
            </h5>
          </RevealLine>

          {/* ─ CTAs ─ */}
          <RevealLine delay={1.1} direction="up">
            <div className="hero-cta-row">
              <a href="#quote" className="hero-quote-btn">
                <div className="svg-wrapper-1">
                  <div className="svg-wrapper">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path fill="none" d="M0 0h24v24H0z"></path>
                      <path
                        fill="currentColor"
                        d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                      ></path>
                    </svg>
                  </div>
                </div>
                <span>Get a Quote</span>
              </a>
              <a
                href="#services"
                className="flex justify-center gap-2 items-center mx-auto shadow-xl text-sm bg-[#E5E4E2]/10 backdrop-blur-md font-semibold isolation-auto border-[#E5E4E2]/20 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-white before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-6 py-3 overflow-hidden border-2 rounded-full group transition-all duration-300 text-[#E5E4E2]"
              >
                Explore Services
                <svg
                  className="w-5 h-5 justify-end group-hover:rotate-90 group-hover:bg-[#E5E4E2] text-[#E5E4E2] ease-linear duration-300 rounded-full border border-[#E5E4E2]/30 group-hover:border-none p-1 rotate-45"
                  viewBox="0 0 16 19"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                    className="fill-[#E5E4E2] group-hover:fill-gray-800"
                  ></path>
                </svg>
              </a>
            </div>
          </RevealLine>
        </div>

        {/* ── Scroll indicator ── */}
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-dot" />
        </div>
      </div>
    </div>
  );
}
