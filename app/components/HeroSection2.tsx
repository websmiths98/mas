"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

import img1 from "../../images_frontend/airline_uploader.jpeg";
import img2 from "../../images_frontend/airplane_station.png";
import img3 from "../../images_frontend/flight_takeoff.png";

const IMAGES = [img1, img2, img3];

export default function HeroSection2() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Auto-play functionality: cycles every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === IMAGES.length - 1 ? 0 : prev + 1));
  };

  // Scroll-driven Parallax bindings for the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"], // Track from when it enters view to when it leaves
  });

  // Moves the image slightly on the Y-axis as the user scrolls past
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section 
      id="herosection2" 
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden flex"
    >
      {/* Full-bleed Fading Carousel Container */}
      <div className="relative w-full h-full flex flex-1 overflow-hidden">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.15 }}
            animate={{ opacity: 1, scale: 1.1 }} // Slow Ken Burns zoom out effect
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ y: parallaxY }} // Parallax effect bound to user scroll
            className="absolute inset-0 w-full h-full origin-center"
          >
            <Image
              src={IMAGES[currentIndex]}
              alt={`Slide ${currentIndex + 1}`}
              fill
              className="object-cover"
              placeholder="blur"
            />
          </motion.div>
        </AnimatePresence>

        {/* Controls overlay */}
        <div className="absolute inset-0 flex items-center justify-between p-6 z-10 pointer-events-none">
          
          {/* Previous Button */}
          <button 
            onClick={handlePrev}
            className="pointer-events-auto bg-black/40 hover:bg-black/80 text-white w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-lg border border-white/20"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Next Button */}
          <button 
            onClick={handleNext}
            className="pointer-events-auto bg-black/40 hover:bg-black/80 text-white w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-sm transition-all shadow-lg border border-white/20"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>

        </div>

        {/* Indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-10">
          {IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "bg-white scale-150 shadow-[0_0_10px_rgba(255,255,255,0.8)]" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
