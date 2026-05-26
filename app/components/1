"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GetQuoteFormProps {
  onClose: () => void;
}

interface ContainerRow {
  id: number;
  type: string;
  quantity: number;
  weight: string;
}

const springTransition = {
  type: "spring",
  stiffness: 150,
  damping: 24,
  mass: 0.9
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.99 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: springTransition
  },
  exit: { opacity: 0, y: -8, scale: 0.99, transition: { duration: 0.15 } }
};

export default function GetQuoteForm({ onClose }: GetQuoteFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [transportMode, setTransportMode] = useState<"Sea" | "Air">("Sea");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearch, setCountrySearch] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  
  const [shipmentType, setShipmentType] = useState<"Containerized" | "Oversized" | "">("");
  const [containerLoad, setContainerLoad] = useState<"FCL" | "LCL" | "">("");
  
  const [portLoading, setPortLoading] = useState("");
  const [portDischarge, setPortDischarge] = useState("");
  const [shippingDate, setShippingDate] = useState("");
  const [commodity, setCommodity] = useState("");
  
  const [isDangerous, setIsDangerous] = useState<"Yes" | "No" | "">("");
  const [incoTerm, setIncoTerm] = useState("");
  const [originReqSelected, setOriginReqSelected] = useState(false);
  const [originReq, setOriginReq] = useState({ trucking: false, clearance: false, insurance: false });
  const [destReq, setDestReq] = useState({ trucking: false, clearance: false, insurance: false });
  
  const [pickupAddress, setPickupAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");

  // Cleaned up Row State Structure (Matching the video design items)
  const [containers, setContainers] = useState<ContainerRow[]>([
    { id: Date.now(), type: "", quantity: 1, weight: "" }
  ]);

  const countries = ["Algeria", "Argentina", "Bahrain", "India", "Indonesia", "United Arab Emirates", "United Kingdom", "United States"];
  const loadingPorts = ["DKAAB - AABENRAA", "DEAAH - AACHEN", "INBOM - Nhava Sheva, Mumbai"];
  const dischargePorts = ["INBLS - BALASORE CONCOR ICD", "INBNS6 - AFS Kapashera, Bijwasan Road"];

  const isRoutingComplete = portLoading && portDischarge && shippingDate && commodity.trim();
  const isAddressesComplete = pickupAddress.trim() && deliveryAddress.trim();

  const displayInputValue = isCountryDropdownOpen ? countrySearch : selectedCountry;

  const filteredCountries = countries.filter((country) =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
        setCountrySearch(""); 
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleTabChange = (mode: "Sea" | "Air") => {
    setTransportMode(mode);
    setSelectedCountry("");
    setCountrySearch("");
    setIsCountryDropdownOpen(false);
    setShipmentType("");
    setContainerLoad("");
    setPortLoading("");
    setPortDischarge("");
    setShippingDate("");
    setCommodity("");
    setIsDangerous("");
    setIncoTerm("");
    setOriginReqSelected(false);
    setOriginReq({ trucking: false, clearance: false, insurance: false });
    setDestReq({ trucking: false, clearance: false, insurance: false });
    setPickupAddress("");
    setDeliveryAddress("");
    setContainers([
      { id: Date.now(), type: "", quantity: 1, weight: "" }
    ]);

    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isCountryDropdownOpen) return;
    if (!selectedCountry) return;

    if (formContainerRef.current) {
      setTimeout(() => {
        formContainerRef.current?.scrollTo({
          top: formContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 150);
    }
  }, [
    shipmentType, 
    containerLoad, 
    isRoutingComplete, 
    isDangerous, 
    incoTerm, 
    originReqSelected, 
    isAddressesComplete,
    containers.length,
    isCountryDropdownOpen
  ]);

  const handleAddRow = () => {
    setContainers([...containers, { id: Date.now(), type: "", quantity: 1, weight: "" }]);
  };

  const handleUpdateRow = (id: number, fields: Partial<ContainerRow>) => {
    setContainers(containers.map(row => row.id === id ? { ...row, ...fields } : row));
  };

  const handleRemoveRow = (id: number) => {
    if (containers.length > 1) {
      setContainers(containers.filter(row => row.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Quote Request Submitted Successfully!");
    onClose();
  };

  return (
    <div className="fixed top-[4rem] bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-slate-900/40 backdrop-blur-xl p-4 overflow-y-auto text-left selection:bg-emerald-500/20">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/10 to-slate-950/30" onClick={onClose} />

      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 25, scale: 0.98 }}
        transition={springTransition}
        className="bg-white/95 border border-white/80 rounded-[2rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.15)] w-full max-w-4xl text-slate-800 overflow-hidden flex flex-col max-h-[86vh]"
      >
        {/* Header Section */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/60 backdrop-blur-md">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Process Step Disclosure</span>
            <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">Create Quote Request</h2>
          </div>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-slate-400 hover:text-slate-900 font-medium text-xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100/80 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Scrollable Form Body */}
        <div 
          ref={formContainerRef} 
          className="p-6 overflow-y-auto text-sm max-h-full scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          <form onSubmit={handleSubmit} className="space-y-8 pb-32">
            
            {/* STEP 1: Tabs Selection */}
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl w-fit border border-slate-200/40">
              <button
                type="button" 
                onClick={() => handleTabChange("Sea")}
                className={`flex items-center gap-2 py-2 px-5 font-bold text-xs rounded-xl transition-all duration-300 ${transportMode === "Sea" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                🚢 Sea Freight
              </button>
              <button
                type="button" 
                onClick={() => handleTabChange("Air")}
                className={`flex items-center gap-2 py-2 px-5 font-bold text-xs rounded-xl transition-all duration-300 ${transportMode === "Air" ? "bg-white text-emerald-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                ✈️ Air Freight
              </button>
            </div>

            {/* STEP 2: Custom Search Input Field */}
            <div className="flex flex-col gap-2 relative w-full md:w-1/2" ref={countryDropdownRef}>
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Target Destination Country</label>
              
              <div className="relative flex items-center group">
                <input 
                  type="text"
                  placeholder="Type to search country..."
                  value={displayInputValue}
                  onChange={(e) => {
                    if (!isCountryDropdownOpen) setIsCountryDropdownOpen(true);
                    setCountrySearch(e.target.value);
                  }}
                  onFocus={() => {
                    setIsCountryDropdownOpen(true);
                    setCountrySearch(""); 
                  }}
                  className="w-full p-3.5 pr-10 border border-slate-200 rounded-2xl bg-slate-50/50 font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all duration-300 shadow-inner"
                />
                <div 
                  className="absolute right-4 pointer-events-none text-slate-400 transition-transform duration-300"
                  style={{ transform: isCountryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Floating Country List overlay dropdown */}
              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.99 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-[calc(100%+8px)] bg-white/95 border border-slate-200 rounded-2xl shadow-[0_20px_40px_rgba(15,23,42,0.12)] z-[100] overflow-y-auto max-h-52 p-2 backdrop-blur-xl"
                  >
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <div
                          key={country}
                          onClick={() => {
                            setSelectedCountry(country);
                            setCountrySearch("");
                            setIsCountryDropdownOpen(false);
                            setShipmentType("");
                            setContainerLoad("");
                          }}
                          className={`px-4 py-2.5 text-xs font-semibold rounded-xl cursor-pointer transition-all duration-150 flex items-center justify-between ${selectedCountry === country ? "bg-emerald-50 text-emerald-700 font-bold" : "text-slate-700 hover:bg-slate-50"}`}
                        >
                          <span>{country}</span>
                          {selectedCountry === country && (
                            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-xs text-slate-400 italic text-center">No results found</div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 3: Shipment Selection Display Cards */}
            <AnimatePresence initial={false}>
              {selectedCountry && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-3 border-t border-slate-100 pt-6"
                >
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Shipment Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => { setShipmentType("Containerized"); setContainerLoad(""); }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-1 ${shipmentType === "Containerized" ? "bg-emerald-50/40 border-emerald-500 shadow-sm shadow-emerald-500/5" : "bg-white border-slate-200/80 hover:border-slate-300"}`}
                    >
                      <span className="font-bold text-slate-900 text-sm">Containerized Cargo</span>
                      <span className="text-xs text-slate-400">Standard general multi-unit container cargo logistics</span>
                    </div>
                    <div 
                      onClick={() => { setShipmentType("Oversized"); setContainerLoad("FCL"); }}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col gap-1 ${shipmentType === "Oversized" ? "bg-emerald-50/40 border-emerald-500 shadow-sm shadow-emerald-500/5" : "bg-white border-slate-200/80 hover:border-slate-300"}`}
                    >
                      <span className="font-bold text-slate-900 text-sm">Oversized Cargo</span>
                      <span className="text-xs text-slate-400">Heavy equipment machinery or out of gauge operations</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 4: Container Load Options Mode Selector */}
            <AnimatePresence initial={false}>
              {shipmentType === "Containerized" && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200/60"
                >
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Container Load Capacity</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div 
                      onClick={() => setContainerLoad("FCL")}
                      className={`p-3.5 rounded-xl border cursor-pointer bg-white font-bold text-xs transition-all text-center shadow-sm ${containerLoad === "FCL" ? "border-emerald-500 ring-2 ring-emerald-500/10 text-emerald-700" : "border-slate-200 hover:border-slate-300 text-slate-600"}`}
                    >
                      Full Container Load (FCL)
                    </div>
                    <div 
                      onClick={() => setContainerLoad("LCL")}
                      className={`p-3.5 rounded-xl border cursor-pointer bg-white font-bold text-xs transition-all text-center shadow-sm ${containerLoad === "LCL" ? "border-emerald-500 ring-2 ring-emerald-500/10 text-emerald-700" : "border-slate-200 hover:border-slate-300 text-slate-600"}`}
                    >
                      Less Container Load (LCL)
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 5: Core Port Routing Data */}
            <AnimatePresence initial={false}>
              {containerLoad && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-slate-100 pt-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Port of Loading *</label>
                    <select value={portLoading} onChange={(e) => setPortLoading(e.target.value)} className="p-3 border border-slate-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm text-xs font-semibold appearance-none cursor-pointer">
                      <option value="">Select Port</option>
                      {loadingPorts.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Port of Discharge *</label>
                    <select value={portDischarge} onChange={(e) => setPortDischarge(e.target.value)} className="p-3 border border-slate-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm text-xs font-semibold appearance-none cursor-pointer">
                      <option value="">Select Port</option>
                      {dischargePorts.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Shipping Date *</label>
                    <input type="date" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} className="p-2.5 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none shadow-sm text-xs font-semibold"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Commodity *</label>
                    <input type="text" placeholder="Cargo description..." value={commodity} onChange={(e) => setCommodity(e.target.value)} className="p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none shadow-sm text-xs font-semibold"/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 6: Risk Hazard verification parameters */}
            <AnimatePresence initial={false}>
              {isRoutingComplete && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-2 border-t border-slate-100 pt-6"
                >
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Is the Commodity Dangerous / Hazardous?</label>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setIsDangerous("Yes")} className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all ${isDangerous === "Yes" ? "bg-red-50 text-red-700 border-red-300" : "bg-white border-slate-200 text-slate-600"}`}>Yes</button>
                    <button type="button" onClick={() => setIsDangerous("No")} className={`px-6 py-2 rounded-xl text-xs font-bold border transition-all ${isDangerous === "No" ? "bg-emerald-50 text-emerald-700 border-emerald-300" : "bg-white border-slate-200 text-slate-600"}`}>No</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 7: Commercial Terms selection tags */}
            <AnimatePresence initial={false}>
              {isDangerous && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-3 border-t border-slate-100 pt-6"
                >
                  <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Commercial Shipping Inco Term</label>
                  <div className="flex flex-wrap gap-2">
                    {["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DDP"].map((term) => (
                      <button
                        key={term} type="button" onClick={() => setIncoTerm(term)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${incoTerm === term ? "bg-slate-900 text-white border-slate-900 shadow-md scale-[1.03]" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"}`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 8: Extra Requirements metrics */}
            <AnimatePresence initial={false}>
              {incoTerm && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-slate-50 p-5 rounded-2xl border border-slate-200/60 shadow-inner"
                >
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Origin Requirements</h4>
                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                      {["trucking", "clearance", "insurance"].map((req) => (
                        <label key={req} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer select-none">
                          <input type="checkbox" checked={(originReq as any)[req]} onChange={(e) => { setOriginReq({ ...originReq, [req]: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/>
                          <span className="capitalize">{req}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Destination Requirements</h4>
                    <div className="flex flex-wrap gap-3 text-xs font-semibold text-slate-600">
                      {["trucking", "clearance", "insurance"].map((req) => (
                        <label key={req} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 cursor-pointer select-none">
                          <input type="checkbox" checked={(destReq as any)[req]} onChange={(e) => { setDestReq({ ...destReq, [req]: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/>
                          <span className="capitalize">{req}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 9: Pickup Location fields */}
            <AnimatePresence initial={false}>
              {originReqSelected && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-100 pt-6"
                >
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Pickup Address *</label>
                    <input type="text" placeholder="Complete address or postal code..." value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} className="p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none text-xs font-semibold shadow-sm transition-all"/>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Delivery Address *</label>
                    <input type="text" placeholder="Final drop destination unloading details..." value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="p-3 border border-slate-200 rounded-xl focus:border-emerald-500 outline-none text-xs font-semibold shadow-sm transition-all"/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 10: Cleaned Container Selection Rows (Matching Video Specs) */}
            <AnimatePresence initial={false}>
              {isAddressesComplete && (
                <motion.div 
                  layout="position" variants={fadeUpVariants} initial="hidden" animate="visible" exit="exit"
                  className="space-y-4 border-t border-slate-100 pt-6"
                >
                  <label className="text-[11px] font-bold text-slate-400 uppercase block tracking-wider">Container Specification Metrics & Load Matrix</label>
                  
                  <div className="space-y-4">
                    {containers.map((row) => (
                      <motion.div 
                        layout 
                        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                        transition={springTransition}
                        key={row.id} 
                        className="bg-slate-50/70 p-5 rounded-3xl border border-slate-200/60 relative shadow-sm"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          <div className="md:col-span-5 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Container Specification Type</span>
                            <select
                              value={row.type}
                              onChange={(e) => handleUpdateRow(row.id, { type: e.target.value })}
                              className="p-2.5 border border-slate-200 rounded-xl text-xs bg-white focus:border-emerald-500 outline-none font-semibold shadow-sm cursor-pointer"
                            >
                              <option value="">-- Select Structural Type --</option>
                              <optgroup label="Specialized Open Top & Flat Racks">
                                <option value="20'OT - Open Top">20'OT - Open Top</option>
                                <option value="40'OT HC - Open Top High Cube">40'OT HC - Open Top High Cube</option>
                                <option value="20'FR - Flat Rack">20'FR - Flat Rack</option>
                                <option value="40'FR HC - Flat Rack High Cube">40'FR HC - Flat Rack High Cube</option>
                              </optgroup>
                              <optgroup label="Standard Logistics Equipment">
                                <option value="20GP - General Purpose">20GP - General Purpose</option>
                                <option value="40HC - High Cube">40HC - High Cube</option>
                                <option value="20RF - Reefer Container">20RF - Reefer Container</option>
                              </optgroup>
                            </select>
                          </div>

                          <div className="md:col-span-3 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">No of Containers *</span>
                            <input
                              type="number" min={1} value={row.quantity}
                              onChange={(e) => handleUpdateRow(row.id, { quantity: parseInt(e.target.value) || 1 })}
                              className="p-2.5 border border-slate-200 rounded-xl text-xs text-center bg-white shadow-sm font-semibold"
                            />
                          </div>

                          <div className="md:col-span-3 flex flex-col gap-1.5">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Gross Weight (KG)</span>
                            <input
                              type="text" placeholder="0.00" value={row.weight}
                              onChange={(e) => handleUpdateRow(row.id, { weight: e.target.value })}
                              className="p-2.5 border border-slate-200 rounded-xl text-xs text-right bg-white shadow-sm font-semibold"
                            />
                          </div>

                          <div className="md:col-span-1 flex justify-center pt-4">
                            <button
                              type="button" disabled={containers.length === 1}
                              onClick={() => handleRemoveRow(row.id)}
                              className="text-rose-500 hover:bg-rose-50 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-20 text-xs font-bold border border-transparent hover:border-rose-100"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <button
                    type="button" onClick={handleAddRow}
                    className="w-full py-3 border-2 border-dashed border-slate-300 hover:border-emerald-500/40 text-slate-500 hover:text-emerald-600 font-bold text-xs rounded-2xl hover:bg-emerald-50/20 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    ✨ Append Another Cargo Parameter Row
                  </button>

                  {/* Submission footer */}
                  <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
                    <button
                      type="button" onClick={onClose}
                      className="px-6 py-3 border border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!containers[0].type}
                      className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-2xl hover:from-emerald-700 hover:to-teal-700 shadow-lg shadow-emerald-600/20 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:pointer-events-none"
                    >
                      Complete & Submit Quote ➔
                    </button>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
