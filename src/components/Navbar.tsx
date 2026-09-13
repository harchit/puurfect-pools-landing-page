"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define pages that should have a static black navbar
  const isStaticPage = ["/concrete-pools", "/spas", "/projects", "/projects/spruce", "/financing"].includes(location.pathname);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-3 sm:px-6",
        isStaticPage 
          ? "bg-slate-950 shadow-md py-3" 
          : scrolled 
            ? "bg-slate-900/95 backdrop-blur-md shadow-md py-3" 
            : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        <Link to="/" className="flex flex-col group shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full overflow-hidden bg-white flex items-center justify-center p-0.5 shadow-sm">
              <img src="/purrfect-pools-logo.jpg" alt="Purrfect Pools & Construction Logo" className="h-full w-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base sm:text-xl leading-none text-white">
                Purrfect Pools
              </span>
              <span className="text-[9px] sm:text-[11px] font-medium tracking-[0.08em] uppercase text-[#7AD1E4] font-serif italic">
                & Construction
              </span>
            </div>
          </div>
        </Link>

        {/* Navigation Right Items */}
        <div className="flex items-center gap-4 sm:gap-6">
          <Link to="/" className="text-xs sm:text-sm font-semibold text-white hover:text-blue-400 transition-colors">
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;