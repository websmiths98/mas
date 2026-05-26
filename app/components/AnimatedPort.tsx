"use client";

import React from "react";
import { motion } from "framer-motion";

export function AnimatedPort() {
  return (
    <div className="relative w-full overflow-hidden flex items-center justify-center p-4 py-12 md:py-24">
      {/* Decorative background blurs */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]" />

      <svg 
        viewBox="0 0 1000 500" 
        className="w-full max-w-5xl drop-shadow-2xl z-10"
        style={{ filter: "drop-shadow(0px 0px 10px rgba(59, 130, 246, 0.2))" }}
      >
        <defs>
          <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#020617" stopOpacity="1"/>
          </linearGradient>
          <linearGradient id="shipGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="craneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* --- Grid / Blueprint Background --- */}
        <g stroke="#ffffff" strokeWidth="1" opacity="0.03">
          {[...Array(20)].map((_, i) => (
            <line key={`v-${i}`} x1={i * 50} y1="0" x2={i * 50} y2="500" />
          ))}
          {[...Array(10)].map((_, i) => (
            <line key={`h-${i}`} x1="0" y1={i * 50} x2="1000" y2={i * 50} />
          ))}
        </g>

        {/* --- Dock (Left side) --- */}
        <rect x="0" y="380" width="300" height="120" fill="#0f172a" stroke="#1e293b" strokeWidth="4"/>
        <path d="M 0 380 L 300 380" stroke="#4f46e5" strokeWidth="4" filter="url(#glow)" />
        {/* Dock details */}
        <rect x="50" y="400" width="30" height="80" fill="#1e293b" />
        <rect x="120" y="400" width="30" height="80" fill="#1e293b" />
        <rect x="220" y="400" width="30" height="80" fill="#1e293b" />

        {/* --- Water --- */}
        <motion.path 
          d="M300 420 Q 450 410, 650 420 T 1000 420 L 1000 500 L 300 500 Z" 
          fill="url(#waterGrad)"
          animate={{ 
            d: [
              "M300 420 Q 450 410, 650 420 T 1000 420 L 1000 500 L 300 500 Z",
              "M300 420 Q 450 430, 650 420 T 1000 420 L 1000 500 L 300 500 Z",
              "M300 420 Q 450 410, 650 420 T 1000 420 L 1000 500 L 300 500 Z"
            ] 
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />
        <motion.path 
          d="M300 440 Q 500 430, 700 440 T 1000 440 L 1000 500 L 300 500 Z" 
          fill="#1e3a8a" opacity="0.3"
          animate={{ 
            d: [
              "M300 440 Q 500 450, 700 440 T 1000 440 L 1000 500 L 300 500 Z",
              "M300 440 Q 500 430, 700 440 T 1000 440 L 1000 500 L 300 500 Z",
              "M300 440 Q 500 450, 700 440 T 1000 440 L 1000 500 L 300 500 Z"
            ] 
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        />

        {/* --- Ship --- */}
        <motion.g 
          animate={{ y: [-3, 3, -3], rotate: [-0.2, 0.2, -0.2] }} 
          transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
          style={{ originX: "650px", originY: "420px" }}
        >
          {/* Ship Hull */}
          <path d="M 380 410 L 920 410 L 870 470 L 410 470 Z" fill="url(#shipGrad)" stroke="#475569" strokeWidth="2"/>
          <path d="M 380 410 L 920 410" stroke="#3b82f6" strokeWidth="3" opacity="0.5" />
          
          {/* Ship Bridge / Cabin */}
          <rect x="780" y="320" width="90" height="90" fill="#0f172a" stroke="#475569" strokeWidth="2"/>
          <rect x="800" y="290" width="10" height="30" fill="#475569" /> {/* Radar Mast */}
          <circle cx="805" cy="290" r="4" fill="#ef4444" filter="url(#glow)" />
          
          {/* Windows */}
          {[0, 1, 2].map((i) => (
            <rect key={`win-${i}`} x={795 + i * 25} y="335" width="15" height="15" fill="#3b82f6" opacity="0.6" filter="url(#glow)"/>
          ))}
          
          {/* Static Containers on Ship */}
          <g>
            <rect x="420" y="375" width="70" height="35" fill="#1e293b" stroke="#334155" />
            <rect x="495" y="375" width="70" height="35" fill="#0f172a" stroke="#334155" />
            <rect x="570" y="375" width="70" height="35" fill="#1e293b" stroke="#334155" />
            <rect x="645" y="375" width="70" height="35" fill="#0f172a" stroke="#334155" />

            <rect x="420" y="340" width="70" height="35" fill="#0f172a" stroke="#334155" />
            <rect x="495" y="340" width="70" height="35" fill="#1e293b" stroke="#334155" />
            
            <rect x="420" y="305" width="70" height="35" fill="#1e293b" stroke="#334155" />
          </g>

          {/* Target slot for the animated container */}
          <rect x="570" y="340" width="70" height="35" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="4 4" opacity="0.5"/>
        </motion.g>

        {/* --- Crane Structure (Static part) --- */}
        {/* Back Leg */}
        <polygon points="60,380 90,380 70,120 40,120" fill="url(#craneGrad)"/>
        {/* Front Leg */}
        <polygon points="230,380 260,380 240,120 210,120" fill="url(#craneGrad)"/>
        {/* Base connect */}
        <rect x="40" y="370" width="220" height="10" fill="#1e293b" />
        
        {/* Boom (Horizontal arm over the ship) */}
        <rect x="20" y="100" width="750" height="25" fill="url(#craneGrad)" stroke="#334155" strokeWidth="1"/>
        <path d="M 20 125 L 770 125" stroke="#a855f7" strokeWidth="2" filter="url(#glow)"/>
        {/* Boom supports */}
        <line x1="60" y1="100" x2="150" y2="40" stroke="#475569" strokeWidth="4" />
        <line x1="230" y1="100" x2="150" y2="40" stroke="#475569" strokeWidth="4" />
        <circle cx="150" cy="40" r="6" fill="#ef4444" filter="url(#glow)"/>

        {/* --- Moving Assembly (Trolley + Hoist + Container) --- */}
        {/* 
          Animation Timeline (12s total):
          0s: At dock, lowering hoist
          1.5s: Hoist touches container
          2s: Pick up, hoist rises
          3.5s: Hoist at top
          4.5s: Trolley moves right (to ship)
          7.5s: Trolley stops over ship
          8s: Hoist lowers
          9.5s: Container dropped
          10s: Hoist rises
          11s: Trolley moves left (to dock)
          12s: Loop
        */}
        <motion.g
          animate={{ x: [0, 0, 0, 0, 420, 420, 420, 420, 420, 0, 0] }}
          transition={{ repeat: Infinity, duration: 12, times: [0, 0.125, 0.166, 0.29, 0.375, 0.625, 0.66, 0.79, 0.83, 0.91, 1], ease: "easeInOut" }}
        >
          {/* Trolley Box */}
          <rect x="120" y="125" width="60" height="20" fill="#334155" stroke="#475569" strokeWidth="2"/>
          <circle cx="135" cy="135" r="4" fill="#3b82f6" filter="url(#glow)"/>
          <circle cx="165" cy="135" r="4" fill="#3b82f6" filter="url(#glow)"/>

          {/* Cables */}
          <motion.g
            animate={{ scaleY: [1, 1.8, 1.8, 1, 1, 1, 1.4, 1.4, 1, 1, 1] }}
            transition={{ repeat: Infinity, duration: 12, times: [0, 0.125, 0.166, 0.29, 0.375, 0.625, 0.66, 0.79, 0.83, 0.91, 1], ease: "easeInOut" }}
            style={{ originY: "145px" }}
          >
            <line x1="130" y1="145" x2="130" y2="245" stroke="#94a3b8" strokeWidth="2" />
            <line x1="170" y1="145" x2="170" y2="245" stroke="#94a3b8" strokeWidth="2" />
            
            {/* Spreader (Hook) */}
            <rect x="110" y="245" width="80" height="8" fill="#eab308" />
          </motion.g>

          {/* Lifted Container */}
          <motion.g
            animate={{ 
              y: [0, 100, 100, 0, 0, 0, 50, 50, 0, 0, 0],
              opacity: [0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0]
            }}
            transition={{ repeat: Infinity, duration: 12, times: [0, 0.125, 0.166, 0.29, 0.375, 0.625, 0.66, 0.79, 0.83, 0.91, 1], ease: "easeInOut" }}
          >
            <rect x="115" y="253" width="70" height="35" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
            <path d="M 125 253 L 125 288 M 145 253 L 145 288 M 165 253 L 165 288 M 185 253 L 185 288" stroke="#4f46e5" strokeWidth="1" opacity="0.5"/>
            <text x="150" y="275" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">MAS</text>
          </motion.g>
        </motion.g>

        {/* --- Dock Static Container (Reappears when lifted one leaves) --- */}
        <motion.g
          animate={{ opacity: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1] }}
          transition={{ repeat: Infinity, duration: 12, times: [0, 0.125, 0.166, 0.29, 0.375, 0.625, 0.66, 0.79, 0.83, 0.91, 1], ease: "step-end" }}
        >
          <rect x="115" y="345" width="70" height="35" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
          <path d="M 125 345 L 125 380 M 145 345 L 145 380 M 165 345 L 165 380 M 185 345 L 185 380" stroke="#4f46e5" strokeWidth="1" opacity="0.5"/>
          <text x="150" y="367" fill="white" fontSize="10" fontWeight="bold" textAnchor="middle" opacity="0.8">MAS</text>
        </motion.g>

        {/* Foreground Dock / Railings */}
        <path d="M 0 380 L 300 380" stroke="#a855f7" strokeWidth="1" opacity="0.5" />
        <circle cx="20" cy="375" r="3" fill="#cbd5e1" />
        <circle cx="100" cy="375" r="3" fill="#cbd5e1" />
        <circle cx="180" cy="375" r="3" fill="#cbd5e1" />
        <circle cx="260" cy="375" r="3" fill="#cbd5e1" />

      </svg>
    </div>
  );
}
