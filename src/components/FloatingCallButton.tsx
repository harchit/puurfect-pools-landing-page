"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const FloatingCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(true);
      }
    };

    // Check on mount in case page is already scrolled
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-[18px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm md:max-w-md lg:max-w-lg transition-all duration-700 ease-in-out ${
        isVisible 
          ? "opacity-100 translate-y-0 pointer-events-auto" 
          : "opacity-0 translate-y-12 pointer-events-none"
      }`}
    >
      <Button
        asChild
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3.5 px-6 text-lg sm:text-xl md:text-2xl font-extrabold shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 border-2 border-white/20 backdrop-blur-md h-auto"
      >
        <a href="sms:+14422342161" className="flex items-center gap-3 whitespace-nowrap">
          <MessageSquare className="h-5 w-5 md:h-6 md:w-6 animate-pulse shrink-0" />
          <span className="whitespace-nowrap">Text or Call (442) 234-2161</span>
        </a>
      </Button>
    </div>
  );
};

export default FloatingCallButton;