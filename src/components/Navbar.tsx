"use client";

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    { name: "Financing", path: "/financing" },
    { name: "About", path: "/about" },
  ];

  const phoneNumber = "(214) 770-5168";
  const telLink = "tel:2147705168";

  // Define pages that should have a static black navbar
  const isStaticPage = ["/fiberglass-pools", "/concrete-pools", "/spas", "/projects", "/projects/spruce"].includes(location.pathname);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
        isStaticPage 
          ? "bg-slate-950 shadow-md py-3" 
          : scrolled 
            ? "bg-slate-900/95 backdrop-blur-md shadow-md py-3" 
            : "bg-transparent py-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex flex-col group">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <img src="/logo-new.jpg" alt="Aquavida Pools & Spas Logo" className="h-full w-full object-contain scale-[1.21]" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-white">
                Aquavida
              </span>
              <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#7AD1E4] font-serif italic">
                Pools & Spas
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-blue-400",
                location.pathname === link.path || (link.path === "/projects" && location.pathname.startsWith("/projects")) ? "text-blue-400" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5">
            <Link to="/estimate" className="flex items-center gap-1.5 font-bold">
              <Sparkles className="h-4 w-4 animate-pulse text-yellow-300" />
              Free Estimate
            </Link>
          </Button>
          <a href={telLink} className="text-sm font-bold text-white hover:text-blue-400 flex items-center gap-1.5">
            <Phone className="h-4 w-4 text-blue-400" />
            <span>{phoneNumber}</span>
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-800 shadow-xl p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-lg font-semibold",
                location.pathname === link.path || (link.path === "/projects" && location.pathname.startsWith("/projects")) ? "text-blue-400" : "text-white"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white w-full py-6 text-lg">
            <Link to="/estimate" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 font-bold">
              <Sparkles className="h-5 w-5 text-yellow-300 animate-pulse" />
              Get Free Estimate
            </Link>
          </Button>
          <Button asChild variant="outline" className="text-white border-white/20 w-full py-6 text-lg bg-slate-850">
            <a href={telLink} className="flex items-center justify-center gap-2">
              <Phone className="h-5 w-5 text-blue-400" />
              <span>{phoneNumber}</span>
            </a>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;