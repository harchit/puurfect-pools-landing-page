"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCallButton from "@/components/FloatingCallButton";

const FiberglassPools = () => {
  const benefits = [
    "Rapid installation time (often weeks, not months)",
    "Extremely low maintenance and chemical usage",
    "Non-abrasive, smooth gel-coat finish",
    "Built-in steps, seating, and tanning ledges",
    "Highly durable and flexible shell that resists cracking",
    "Algae-resistant surface"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-center">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Why <span className="text-blue-600">Fiberglass?</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Manufactured in climate-controlled environments, fiberglass pools offer incredible durability, a smooth finish, and the fastest installation time in the DFW area.
            </p>
            <div className="flex gap-4 pt-2">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6">
                <Link to="/contact">Get a Free Estimate</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img 
              src="/fiberglass-pool.jpg" 
              alt="Fiberglass Pool Installation" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Faster Build time, Low Maintenance</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <p className="text-slate-600 leading-relaxed text-lg">
                Because fiberglass pools arrive at your home fully formed, the installation process is significantly faster than concrete or vinyl. Their non-porous gel coat finish not only looks stunning but also requires fewer chemicals and less scrubbing to maintain in our warm Texas climate.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    <span className="text-slate-700 font-medium text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-lg h-full order-1 md:order-2">
               <img
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800"
                alt="Fiberglass Pool Design"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
          <h2 className="text-2xl md:text-3xl font-bold">Ready for a Low-Maintenance Oasis?</h2>
          <p className="text-slate-300 text-lg">
            Let Purrfect Pools & Construction deliver a beautiful fiberglass pool to your DFW backyard.
          </p>
          <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-10 py-8 text-xl">
            <a href="tel:2147705168" className="flex items-center gap-3">
              <Phone className="h-6 w-6" />
              <span>Call (214) 770-5168</span>
            </a>
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default FiberglassPools;