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
  length: string;
  width: string;
  height: string;
  unit: string;
  file: File | null;
}

// Apple-inspired smooth spring physics configuration matrix
const springTransition = {
  type: "spring",
  stiffness: 140,
  damping: 22,
  mass: 1
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: springTransition
  }
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

  const [containers, setContainers] = useState<ContainerRow[]>([
    { id: Date.now(), type: "", quantity: 1, weight: "", length: "", width: "", height: "", unit: "CM", file: null }
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
      { id: Date.now(), type: "", quantity: 1, weight: "", length: "", width: "", height: "", unit: "CM", file: null }
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
    setContainers([...containers, { id: Date.now(), type: "", quantity: 1, weight: "", length: "", width: "", height: "", unit: "CM", file: null }]);
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
    <div className="fixed top-[4rem] bottom-0 left-0 right-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 overflow-y-auto text-left">
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={springTransition}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl text-gray-800 overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Header Module */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 backdrop-blur-md">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-600">MAS Logistics Step Process</h3>
            <h2 className="text-2xl font-extrabold text-gray-900 mt-0.5">Request a Quote</h2>
          </div>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 font-bold text-2xl w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all duration-200">
            &times;
          </button>
        </div>

        {/* Scroll Form Area */}
        <div 
          ref={formContainerRef} 
          className="p-6 overflow-y-auto text-sm max-h-full scroll-smooth"
          style={{ scrollbarWidth: "thin" }}
        >
          {/* Form wrapper acts as an coordinated layout group container */}
          <form onSubmit={handleSubmit} className="space-y-6 pb-40">
            
            {/* STEP 1: Transport Mode selection links */}
            <div className="flex gap-4 border-b border-gray-200 pb-3">
              <button
                type="button" 
                onClick={() => handleTabChange("Sea")}
                className={`flex items-center gap-2 pb-2 px-4 font-bold text-sm transition-all relative border-b-2 ${transportMode === "Sea" ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-400"}`}
              >
                🚢 Sea Freight
              </button>
              <button
                type="button" 
                onClick={() => handleTabChange("Air")}
                className={`flex items-center gap-2 pb-2 px-4 font-bold text-sm transition-all relative border-b-2 ${transportMode === "Air" ? "border-emerald-600 text-emerald-600" : "border-transparent text-gray-400"}`}
              >
                ✈️ Air Freight
              </button>
            </div>

            {/* STEP 2: Country Selector Input box */}
            <div className="flex flex-col gap-1.5 relative w-full md:w-1/2" ref={countryDropdownRef}>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Select Your Country :</label>
              
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Start typing..."
                  value={displayInputValue}
                  onChange={(e) => {
                    if (!isCountryDropdownOpen) setIsCountryDropdownOpen(true);
                    setCountrySearch(e.target.value);
                  }}
                  onFocus={() => {
                    setIsCountryDropdownOpen(true);
                    setCountrySearch(""); 
                  }}
                  className="w-full p-3 pr-10 border border-gray-300 rounded-xl bg-gray-50/50 font-medium text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all cursor-pointer shadow-sm"
                />
                
                <div 
                  className="absolute right-3 pointer-events-none text-gray-400 transition-transform duration-300 ease-out"
                  style={{ transform: isCountryDropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Selection Options Dropdown Overlay */}
              <AnimatePresence>
                {isCountryDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98, y: -4 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute left-0 right-0 top-[calc(100%+6px)] bg-white border border-gray-200 rounded-xl shadow-xl z-[100] overflow-y-auto max-h-48 py-1.5 backdrop-blur-lg"
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
                          className={`px-4 py-2.5 text-xs font-medium cursor-pointer transition-colors duration-150 hover:bg-emerald-50 hover:text-emerald-700 flex items-center justify-between ${selectedCountry === country ? "bg-emerald-50 text-emerald-600 font-bold" : "text-gray-700"}`}
                        >
                          <span>{country}</span>
                          {selectedCountry === country && (
                            <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-4 text-xs text-gray-400 italic text-center">
                        No matching countries found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* STEP 3: Shipment Type Field */}
            <AnimatePresence initial={false}>
              {selectedCountry && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-6 border-t border-gray-100 pt-5"
                >
                  <div className="flex flex-col gap-2.5">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Shipment Type :</label>
                    <div className="flex gap-8">
                      <label className="flex items-center gap-2.5 font-semibold text-gray-700 cursor-pointer group">
                        <input type="radio" name="stype" checked={shipmentType === "Containerized"} onChange={() => { setShipmentType("Containerized"); setContainerLoad(""); }} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> Containerized Cargo
                      </label>
                      <label className="flex items-center gap-2.5 font-semibold text-gray-700 cursor-pointer group">
                        <input type="radio" name="stype" checked={shipmentType === "Oversized"} onChange={() => { setShipmentType("Oversized"); setContainerLoad("FCL"); }} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> Oversized Cargo
                      </label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 4: Container specifications Load mode switches */}
            <AnimatePresence initial={false}>
              {shipmentType === "Containerized" && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col gap-2.5 bg-gray-50 p-4 rounded-2xl border border-gray-100"
                >
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Container Type :</label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer group">
                      <input type="radio" name="cload" checked={containerLoad === "FCL"} onChange={() => setContainerLoad("FCL")} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> Full Container Load (FCL)
                    </label>
                    <label className="flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer group">
                      <input type="radio" name="cload" checked={containerLoad === "LCL"} onChange={() => setContainerLoad("LCL")} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> Less Container Load (LCL)
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 5: Port select matrices */}
            <AnimatePresence initial={false}>
              {containerLoad && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-gray-100 pt-5"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Port of Loading *</label>
                    <select value={portLoading} onChange={(e) => setPortLoading(e.target.value)} className="p-2.5 border border-gray-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm transition-all duration-200">
                      <option value="">Select Port</option>
                      {loadingPorts.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Port of Discharge *</label>
                    <select value={portDischarge} onChange={(e) => setPortDischarge(e.target.value)} className="p-2.5 border border-gray-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm transition-all duration-200">
                      <option value="">Select Port</option>
                      {dischargePorts.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Preferred Shipping Date *</label>
                    <input type="date" value={shippingDate} onChange={(e) => setShippingDate(e.target.value)} className="p-2.5 border border-gray-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm transition-all duration-200"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Commodity *</label>
                    <input type="text" placeholder="Cargo description..." value={commodity} onChange={(e) => setCommodity(e.target.value)} className="p-2.5 border border-gray-200 bg-white rounded-xl focus:border-emerald-500 outline-none shadow-sm transition-all duration-200"/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 6: Hazard selection controls */}
            <AnimatePresence initial={false}>
              {isRoutingComplete && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex flex-col gap-2.5 border-t border-gray-100 pt-5"
                >
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Is the Commodity Dangerous ?</label>
                  <div className="flex gap-8">
                    <label className="flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer group"><input type="radio" name="haz" checked={isDangerous === "Yes"} onChange={() => setIsDangerous("Yes")} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> Yes</label>
                    <label className="flex items-center gap-2.5 font-medium text-gray-700 cursor-pointer group"><input type="radio" name="haz" checked={isDangerous === "No"} onChange={() => setIsDangerous("No")} className="accent-emerald-600 w-4 h-4 transition-transform group-hover:scale-105"/> No</label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 7: Inco Terms selection grid */}
            <AnimatePresence initial={false}>
              {isDangerous && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-3 border-t border-gray-100 pt-5"
                >
                  <label className="text-xs font-bold text-gray-500 uppercase block tracking-wide">Select Inco Term :</label>
                  <div className="flex flex-wrap gap-2">
                    {["EXW", "FCA", "FAS", "FOB", "CFR", "CIF", "CPT", "CIP", "DAP", "DDP"].map((term) => (
                      <button
                        key={term} type="button" onClick={() => setIncoTerm(term)}
                        className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all duration-200 ${incoTerm === term ? "bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-600/10 scale-[1.02]" : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"}`}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 8: Logistics parameters checkboxes */}
            <AnimatePresence initial={false}>
              {incoTerm && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-gray-50/50 p-4 rounded-2xl border border-gray-100"
                >
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Origin Requirement :</h4>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={originReq.trucking} onChange={(e) => { setOriginReq({ ...originReq, trucking: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Trucking</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={originReq.clearance} onChange={(e) => { setOriginReq({ ...originReq, clearance: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Clearance</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={originReq.insurance} onChange={(e) => { setOriginReq({ ...originReq, insurance: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Insurance</label>
                    </div>
                  </div>
                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wide">Destination Requirement :</h4>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={destReq.trucking} onChange={(e) => { setDestReq({ ...destReq, trucking: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Trucking</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={destReq.clearance} onChange={(e) => { setDestReq({ ...destReq, clearance: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Clearance</label>
                      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={destReq.insurance} onChange={(e) => { setDestReq({ ...destReq, insurance: e.target.checked }); setOriginReqSelected(true); }} className="accent-emerald-600 rounded w-4 h-4"/> Insurance</label>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 9: Pickup / Destination geo fields */}
            <AnimatePresence initial={false}>
              {originReqSelected && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-100 pt-5"
                >
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Pickup Address *</label>
                    <input type="text" placeholder="Complete collection details..." value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} className="p-3 border border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-xs shadow-sm transition-all"/>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Delivery Address *</label>
                    <input type="text" placeholder="Final drop unloading details..." value={deliveryAddress} onChange={(e) => setDeliveryAddress(e.target.value)} className="p-3 border border-gray-200 rounded-xl focus:border-emerald-500 outline-none text-xs shadow-sm transition-all"/>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* STEP 10: Matrix specification dynamic repeat arrays layout rows */}
            <AnimatePresence initial={false}>
              {isAddressesComplete && (
                <motion.div 
                  layout="position"
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="space-y-4 border-t border-gray-100 pt-5"
                >
                  <label className="text-xs font-bold text-gray-500 uppercase block tracking-wide">Container Specification Metrics & Load Matrix :</label>
                  
                  <div className="space-y-4">
                    {containers.map((row) => (
                      <motion.div 
                        layout 
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={springTransition}
                        key={row.id} 
                        className="bg-gray-50 p-4 rounded-2xl border border-gray-200/60 relative space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                          <div className="md:col-span-5 flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Container Type</span>
                            <select
                              value={row.type}
                              onChange={(e) => handleUpdateRow(row.id, { type: e.target.value })}
                              className="p-2 border border-gray-200 rounded-xl text-xs bg-white focus:border-emerald-500 outline-none font-medium shadow-sm"
                            >
                              <option value="">-- Select Type --</option>
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

                          <div className="md:col-span-3 flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">No of Containers *</span>
                            <input
                              type="number" min={1} value={row.quantity}
                              onChange={(e) => handleUpdateRow(row.id, { quantity: parseInt(e.target.value) || 1 })}
                              className="p-2 border border-gray-200 rounded-xl text-xs text-center bg-white shadow-sm"
                            />
                          </div>

                          <div className="md:col-span-3 flex flex-col gap-1">
                            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">Gross Weight (KG)</span>
                            <input
                              type="text" placeholder="0.00" value={row.weight}
                              onChange={(e) => handleUpdateRow(row.id, { weight: e.target.value })}
                              className="p-2 border border-gray-200 rounded-xl text-xs text-right bg-white shadow-sm"
                            />
                          </div>

                          <div className="md:col-span-1 flex justify-center pt-3 md:pt-4">
                            <button
                              type="button" disabled={containers.length === 1}
                              onClick={() => handleRemoveRow(row.id)}
                              className="text-red-500 hover:bg-red-50 w-9 h-9 rounded-xl flex items-center justify-center transition-all disabled:opacity-20 text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* Dimensions Panel */}
                        <div className="bg-white p-3 rounded-xl border border-gray-100 space-y-2.5 shadow-sm">
                          <span className="text-[11px] font-bold text-gray-400 uppercase block tracking-wide">Cargo Dimensions :</span>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-semibold">Length</span>
                              <input type="text" placeholder="0" value={row.length} onChange={(e) => handleUpdateRow(row.id, { length: e.target.value })} className="p-2 border border-gray-200 rounded-lg text-xs text-center focus:border-emerald-500 outline-none bg-gray-50/30"/>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-semibold">Width</span>
                              <input type="text" placeholder="0" value={row.width} onChange={(e) => handleUpdateRow(row.id, { width: e.target.value })} className="p-2 border border-gray-200 rounded-lg text-xs text-center focus:border-emerald-500 outline-none bg-gray-50/30"/>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-semibold">Height</span>
                              <input type="text" placeholder="0" value={row.height} onChange={(e) => handleUpdateRow(row.id, { height: e.target.value })} className="p-2 border border-gray-200 rounded-lg text-xs text-center focus:border-emerald-500 outline-none bg-gray-50/30"/>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] text-gray-400 font-semibold">Measured Unit</span>
                              <select value={row.unit} onChange={(e) => handleUpdateRow(row.id, { unit: e.target.value })} className="p-2 border border-gray-200 rounded-lg text-xs bg-gray-50 outline-none font-bold text-gray-600">
                                <option value="CM">CM</option>
                                <option value="MM">MM</option>
                                <option value="Inches">Inches</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* File Upload Module */}
                        <div className="flex flex-col gap-1 pt-1">
                          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wide">File Upload *</span>
                          <div className="flex items-center gap-3">
                            <input
                              type="file"
                              id={`file-${row.id}`}
                              className="hidden"
                              onChange={(e) => handleUpdateRow(row.id, { file: e.target.files?.[0] || null })}
                            />
                            <label
                              htmlFor={`file-${row.id}`}
                              className="px-3 py-2 border border-gray-300 rounded-xl text-xs font-bold text-gray-600 bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors border-dashed"
                            >
                              Choose File
                            </label>
                            <span className="text-xs text-gray-400 truncate max-w-xs font-medium">
                              {row.file ? row.file.name : "No file selected."}
                            </span>
                          </div>
                        </div>

                      </motion.div>
                    ))}
                  </div>

                  <button
                    type="button" onClick={handleAddRow}
                    className="w-full py-3 border-2 border-dashed border-emerald-600/20 text-emerald-600 font-bold text-xs rounded-xl hover:bg-emerald-50/40 transition-all duration-200 flex items-center justify-center gap-1.5"
                  >
                    ➕ Add More
                  </button>

                  {/* Submission Footer area */}
                  <div className="pt-5 border-t border-gray-100 flex justify-between items-center">
                    <button
                      type="button" onClick={onClose}
                      className="px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-500 hover:bg-gray-50 text-xs transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={!containers[0].type}
                      className="px-8 py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-700 shadow-lg shadow-emerald-600/10 transition-all transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-40 disabled:hover:bg-emerald-600 disabled:scale-100"
                    >
                      Proceed Submission ➔
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
