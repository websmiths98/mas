"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import GetQuoteForm from "./GetQuoteForm";

export default function FloatingQuoteButton() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  React.useEffect(() => {
    const handleOpenQuote = () => setIsQuoteOpen(true);
    window.addEventListener("openQuoteModal", handleOpenQuote);
    return () => window.removeEventListener("openQuoteModal", handleOpenQuote);
  }, []);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end">
        {/* Pulse effect rings */}
        <div className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20 h-14 w-14"></div>
        
        <button
          onClick={() => setIsQuoteOpen(true)}
          className="group relative flex items-center justify-center h-14 w-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 overflow-hidden hover:w-40 hover:px-4 focus:outline-none"
          aria-label="Get a Quote"
        >
          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="transform group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-300">
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
            </svg>
          </div>
          <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 opacity-0 group-hover:opacity-100 font-semibold text-sm">
            Get a Quote
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isQuoteOpen && (
          <GetQuoteForm onClose={() => setIsQuoteOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
