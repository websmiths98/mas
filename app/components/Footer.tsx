"use client";

import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import masLogo from "../../public/images_frontend/mas_logo.webp";

export default function Footer() {
  return (
    <footer className="bg-[#e5e4e2] text-black rounded-t-[40px] pt-16 pb-8 px-8 md:px-16 -mt-8 font-sans relative z-50">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
        
        {/* Brand Section */}
        <div className="w-full lg:w-1/3 flex flex-col space-y-3 -mt-8">
          <Link href="/" className="block">
            <Image
              src={masLogo}
              alt="MAS Logistics Logo"
              width={180}
              height={54}
              className="h-auto w-auto max-w-[180px] hover:opacity-90 transition-opacity"
            />
          </Link>
          
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            Delivering excellence in logistics and supply chain management with reliable, efficient, and innovative solutions worldwide.
          </p>

          <div className="flex space-x-4 pt-2">
            <Link href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-black transition-all shadow-sm">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-black transition-all shadow-sm">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-black transition-all shadow-sm">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-black transition-all shadow-sm">
              <Youtube className="w-5 h-5" />
            </Link>
            <Link href="#" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-gray-700 hover:text-white hover:bg-black transition-all shadow-sm">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Links & Contact Section */}
        <div className="w-full lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 lg:gap-4">
          
          {/* Company */}
          <div>
            <h3 className="font-bold text-xs mb-6 text-black uppercase tracking-widest">Company</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>Home</Link></li>
              <li><Link href="/#about" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>About Us</Link></li>
              <li><Link href="/#faq" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>FAQ</Link></li>
              <li><button onClick={(e) => { e.preventDefault(); window.dispatchEvent(new Event('openQuoteModal')); }} className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>Get a Quote</button></li>
            </ul>
          </div>

          {/* Offerings */}
          <div>
            <h3 className="font-bold text-xs mb-6 text-black uppercase tracking-widest">Offerings</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link href="/services" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>Services</Link></li>
              <li><Link href="/network" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>Network</Link></li>
              <li><Link href="/industry" className="min-h-[44px] hover:text-black transition-colors flex items-center group"><span className="w-0 group-hover:w-2 h-[1px] bg-black mr-0 group-hover:mr-2 transition-all duration-300"></span>Industry Solution</Link></li>
            </ul>
          </div>



          {/* Reach Us At */}
          <div>
            <h3 className="font-bold text-xs mb-6 text-black uppercase tracking-widest">Reach Us At</h3>
            <div className="space-y-5 text-sm text-gray-600">
              <div className="flex items-start space-x-3 group">
                <div className="mt-0.5 p-1.5 rounded-full bg-white group-hover:bg-black group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="mt-1 font-medium flex flex-col space-y-1">
                  <a href="tel:+914442034201" className="hover:text-black transition-colors whitespace-nowrap">+91 44 4203 4201</a>
                  <a href="tel:+914435560700" className="hover:text-black transition-colors whitespace-nowrap">+91 44 355 60 700</a>
                  <a href="tel:+919043555290" className="hover:text-black transition-colors whitespace-nowrap">+91 9043555290</a>
                </div>
              </div>

              <a href="mailto:support@maslogistics.com" className="flex items-start space-x-3 hover:text-black transition-colors group">
                <div className="mt-0.5 p-1.5 rounded-full bg-white group-hover:bg-black group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="mt-1 font-medium whitespace-nowrap">support@maslogistics.com</span>
              </a>
              
              <div className="flex items-start space-x-3 hover:text-black transition-colors group">
                <div className="mt-0.5 p-1.5 rounded-full bg-white group-hover:bg-black group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <div className="mt-1">
                  <p className="font-semibold text-black mb-1">Registered Office</p>
                  <p className="leading-relaxed">#37/23A, Periyar Nagar, TVT,<br />Chennai - 600019, TN, India</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-300/80 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p className="font-medium text-gray-600">© {new Date().getFullYear()} MAS Logistics. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-4 md:mt-0 font-medium">
          <Link href="/terms" className="hover:text-black transition-colors">Terms & Conditions</Link>
          <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
          <Link href="/compliance" className="hover:text-black transition-colors">Compliance</Link>
          <Link href="/refund" className="hover:text-black transition-colors">Refund & Cancellation Policy</Link>
        </div>
      </div>
    </footer>
  );
}
