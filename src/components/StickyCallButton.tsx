import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const StickyCallButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-6 left-0 right-0 z-50 px-6 transition-all duration-500 md:hidden",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}
    >
      <Button
        asChild
        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-8 text-xl font-bold shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 border-2 border-white/20 backdrop-blur-sm"
      >
        <a href="tel:4422342161">
          <Phone className="h-6 w-6 animate-pulse" />
          Call (442) 234-2161
        </a>
      </Button>
    </div>
  );
};

export default StickyCallButton;