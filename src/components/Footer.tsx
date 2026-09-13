import React from "react";
import { Link } from "react-router-dom";
import { Clock, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-28">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        {/* Brand Section */}
        <div className="flex flex-col items-center gap-6 max-w-lg">
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex flex-col items-center group cursor-pointer"
          >
            <span className="text-[10px] font-bold text-[#7AD1E4] uppercase tracking-tighter mb-1 leading-none transition-colors group-hover:text-blue-300">
              Purrfect Pools & Construction
            </span>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full overflow-hidden border border-[#7AD1E4]/30 bg-white flex items-center justify-center p-0.5 transition-transform group-hover:scale-105">
                <img src="/purrfect-pools-logo.jpg" alt="Purrfect Pools & Construction Logo" className="h-full w-full object-contain" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-lg leading-none text-white transition-colors group-hover:text-blue-200">
                  Purrfect Pools
                </span>
                <span className="text-[10px] font-medium tracking-wider uppercase text-[#7AD1E4] transition-colors group-hover:text-blue-300">
                  & Construction
                </span>
              </div>
            </div>
          </Link>
          <p className="text-sm leading-relaxed">
            Premium custom pool builders dedicated to excellence across the Dallas-Fort Worth metroplex.
            We turn your backyard dreams into reality with expert craftsmanship and personalized service.
          </p>
        </div>

        {/* Info & Copyright Section */}
        <div className="w-full pt-6 border-t border-slate-800 flex flex-col items-center gap-4 text-xs text-slate-400">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 font-medium">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#7AD1E4]" />
              <span>Office hours: 7 Days - 9am - 8pm</span>
            </div>
            <div className="hidden sm:block text-slate-700">•</div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#7AD1E4]" />
              <span>Office Address: Richardson, TX, 75082</span>
            </div>
          </div>
          <p className="text-slate-500">
            Copyright 2026 - Purrfect Pools & Construction. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;