"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ];

  const phoneNumber = "(214) 770-5168";
  const telLink = "tel:2147705168";

  // Define pages that should have a static black navbar
  const isStaticPage = ["/concrete-pools", "/spas", "/projects", "/projects/spruce"].includes(location.pathname);

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

        {/* Navigation Bar Content */}
        <div className="flex items-center gap-2.5 sm:gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-xs sm:text-sm font-semibold transition-colors hover:text-blue-400",
                location.pathname === link.path || (link.path === "/projects" && location.pathname.startsWith("/projects")) ? "text-blue-400" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-3 sm:px-5 h-8 sm:h-10 text-xs sm:text-sm">
            <Link to="/estimate" className="flex items-center gap-1 sm:gap-1.5 font-bold">
              <Sparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 animate-pulse text-yellow-300" />
              <span className="hidden min-[400px]:inline">Free </span>Estimate
            </Link>
          </Button>
          <a href={telLink} className="text-xs sm:text-sm font-bold text-white hover:text-blue-400 flex items-center gap-1 sm:gap-1.5">
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-400" />
            <span className="hidden lg:inline">{phoneNumber}</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;