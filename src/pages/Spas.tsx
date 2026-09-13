"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCallButton from "@/components/FloatingCallButton";

const Spas = () => {
  const benefits = [
    "Year-round relaxation and hydrotherapy",
    "Fully integrated with your pool design",
    "Custom seating and jet configurations",
    "Energy-efficient heating systems",
    "Premium stone, tile, and pebble finishes",
    "Increases overall property appeal and value"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-24 pb-8 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-start text-left">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Custom <span className="text-blue-600">Spas & Hot Tubs</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Elevate your backyard experience with a custom-built spa. Whether as a standalone feature or seamlessly integrated into your new pool, our spas offer the ultimate in relaxation and therapy for DFW homeowners.
            </p>
            <div className="flex justify-start gap-4 pt-2">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 text-lg font-bold">
                <Link to="/estimate">
                   <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
                   Get a Free Estimate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Therapeutic Luxury, Custom Built</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-6 order-2 md:order-1">
              <p className="text-slate-600 leading-relaxed text-lg">
                Our custom spas are engineered for both beauty and performance. From spillover designs that create a soothing waterfall effect into your pool to standalone retreats with custom lighting and jets, we use only the highest quality components to ensure your spa is a sanctuary for years to come.
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
            <div className="rounded-3xl overflow-hidden shadow-lg h-full order-1 md:order-2 aspect-[4/3]">
               <img
                src="/images/spa-details.jpg"
                alt="Spa Design Details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
          <h2 className="text-2xl md:text-3xl font-bold">Ready to Relax?</h2>
          <p className="text-slate-300 text-lg">
            Let Purrfect Pools & Construction design and build your dream spa in Riverside County.
          </p>
          <Button asChild size="lg" className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-10 py-8 text-xl font-bold">
            <a href="tel:4422342161" className="flex items-center gap-3">
              <Phone className="h-6 w-6" />
              <span>Call (442) 234-2161</span>
            </a>
          </Button>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Spas;