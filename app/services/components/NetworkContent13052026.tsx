"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Plane, Ship, Truck, Warehouse, 
  Globe, Users, Shield, MapPin, 
  ChevronRight, Activity, ArrowRight
} from "lucide-react";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const OVERVIEW_BLOCKS = [
  { 
    title: "Air Freight Connectivity", 
    description: "Fast and time-sensitive cargo solutions through strategic airline partnerships and international airport connectivity.",
    icon: <Plane className="w-5 h-5" />,
    color: "text-sky-400"
  },
  { 
    title: "Ocean Freight Operations", 
    description: "Efficient FCL, LCL, breakbulk, and project cargo movement through major global seaports.",
    icon: <Ship className="w-5 h-5" />,
    color: "text-blue-400"
  },
  { 
    title: "Inland Transportation", 
    description: "Integrated domestic and cross-border transportation support for uninterrupted cargo movement.",
    icon: <Truck className="w-5 h-5" />,
    color: "text-indigo-400"
  },
  { 
    title: "Warehouse & Distribution", 
    description: "Scalable warehousing and distribution systems designed to support inventory flow and supply chain continuity.",
    icon: <Warehouse className="w-5 h-5" />,
    color: "text-violet-400"
  },
];

const CONNECTIVITY_BLOCKS = [
  { title: "Asia Trade Network", description: "Strong operational connectivity across Asian manufacturing and sourcing markets." },
  { title: "Middle East Operations", description: "Strategic freight support connecting India with major Middle East trade hubs." },
  { title: "Europe & Global Destinations", description: "Reliable international shipment coordination through global freight forwarding associates." },
];

const METRICS = [
  { label: "Global Destinations", value: "80+", icon: <Globe className="w-4 h-4" /> },
  { label: "Operational Members", value: "58+", icon: <MapPin className="w-4 h-4" /> },
  { label: "Group Strength", value: "270+", icon: <Users className="w-4 h-4" /> },
  { label: "ISO Certified", value: "9001", icon: <Shield className="w-4 h-4" /> },
];

export function NetworkContent() {
  return (
    <div className="w-full lg:w-[55%] px-6 md:px-12 lg:pl-20 lg:pr-10 pb-40 pt-12 relative overflow-hidden">
      
      {/* --- DASHBOARD PILLS (Spring Animation) --- */}
      <motion.section 
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="mb-16 flex flex-wrap gap-4"
      >
        {METRICS.map((metric, i) => (
          <motion.div
            key={metric.label}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex items-center gap-3 bg-white/[0.03] border border-white/5 px-4 py-2 rounded-full backdrop-blur-md cursor-default"
          >
            <div className="text-blue-500/70">{metric.icon}</div>
            <div className="flex flex-col">
              <span className="text-[14px] font-black text-white leading-none tracking-tighter">{metric.value}</span>
              <span className="text-[8px] uppercase tracking-widest text-zinc-500 font-bold">{metric.label.split(' ')[0]}</span>
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* --- REVEAL HEADER --- */}
      <header className="mb-24 relative">
        <motion.div 
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          viewport={{ once: false }}
          className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-blue-500 via-indigo-500 to-transparent origin-top"
        />
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div className="overflow-hidden mb-4">
            <motion.h1 
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm font-bold tracking-[0.5em] text-blue-500 uppercase flex items-center gap-2"
            >
              <Activity className="w-3 h-3 animate-pulse" /> System Live: Global Overview
            </motion.h1>
          </div>

          <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-[-0.04em] leading-[0.9]">
            <motion.span 
              initial={{ opacity: 0 }} 
              whileInView={{ opacity: 1 }} 
              transition={{ duration: 1 }}
              className="block"
            >LOGISTICS</motion.span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-600 italic">REDEFINED.</span>
          </h2>
          
          <motion.p 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            className="text-zinc-400 text-lg max-w-lg font-light leading-relaxed"
          >
            Our logistics network supports businesses operating across multiple industries, ensuring reliable movement of goods through optimized corridors.
          </motion.p>
        </motion.div>
      </header>

      {/* --- ASYMMETRIC GRID WITH PARALLAX EFFORT --- */}
      <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
        {OVERVIEW_BLOCKS.map((block, i) => (
          <motion.div
            key={block.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            viewport={{ once: false, margin: "-50px" }}
            whileHover={{ y: -8 }}
            className={`relative group ${i % 2 !== 0 ? 'md:mt-16' : ''}`}
          >
            <div className={`mb-6 flex items-center gap-4 ${block.color}`}>
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-3 bg-current/10 rounded-xl border border-current/20 backdrop-blur-sm"
              >
                {block.icon}
              </motion.div>
              <div className="h-[1px] flex-grow bg-gradient-to-r from-current/30 to-transparent" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-4 tracking-tight flex items-center gap-2 group-hover:text-blue-400 transition-colors">
              {block.title} 
              <ArrowRight className="w-4 h-4 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </h3>
            <p className="text-zinc-500 text-sm leading-relaxed border-l-2 border-zinc-900 pl-4 group-hover:border-blue-500/50 transition-colors duration-500">
              {block.description}
            </p>
          </motion.div>
        ))}
      </section>

      {/* --- CONNECTIVITY STEPPER (Sequential Reveal) --- */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent -rotate-1 skew-y-1 rounded-3xl -z-10" />
        <div className="relative p-8 md:p-12 border border-white/5 rounded-3xl backdrop-blur-xl">
          
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-3xl font-black text-white tracking-tighter">International Connectivity</h2>
            <span className="text-[10px] font-mono text-zinc-600 hidden md:block">LATENCY: 24ms // SYNC: ACTIVE</span>
          </div>

          <div className="space-y-10">
            {CONNECTIVITY_BLOCKS.map((block, i) => (
              <motion.div
                key={block.title}
                variants={fadeInUp}
                className="flex items-start gap-6 group cursor-pointer"
              >
                <div className="flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", delay: i * 0.2 }}
                    className="h-5 w-5 rounded-full border-2 border-blue-500 flex items-center justify-center bg-[#020617]"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 group-hover:scale-150 transition-transform" />
                  </motion.div>
                  {i !== CONNECTIVITY_BLOCKS.length - 1 && (
                    <motion.div 
                      initial={{ height: 0 }}
                      whileInView={{ height: 48 }}
                      transition={{ duration: 0.8, delay: i * 0.2 }}
                      className="w-[1px] bg-gradient-to-b from-blue-500/50 to-transparent" 
                    />
                  )}
                </div>
                <div className="pt-0.5">
                  <h4 className="text-white font-bold text-lg mb-1 flex items-center gap-2 group-hover:translate-x-2 transition-transform duration-300">
                    {block.title} <ChevronRight className="w-4 h-4 text-blue-500" />
                  </h4>
                  <p className="text-zinc-500 text-sm max-w-md leading-snug">
                    {block.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
}
