import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const VinylPools = () => {
  const benefits = [
    "Highly customizable shapes and sizes",
    "Smooth, non-porous surface that prevents algae",
    "Cost-effective installation compared to concrete",
    "Softer feel on feet compared to rough concrete",
    "Wide variety of liner patterns and colors",
    "Faster construction time"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Custom <span className="text-blue-600">Vinyl Liner</span> Pools
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed">
              Vinyl liner pools offer unparalleled versatility and affordability without sacrificing beauty. Perfect for families looking to create a customized backyard oasis quickly and cost-effectively in Greater Florida.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6">
                <Link to="/contact">Get a Free Estimate</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000" 
              alt="Beautiful Vinyl Pool" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Why Vinyl?</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">The Benefits of Vinyl Liner Pools</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-3xl overflow-hidden shadow-lg h-full">
               <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800" 
                alt="Vinyl Pool Patterns" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-6">
              <p className="text-slate-600 leading-relaxed text-lg">
                Modern vinyl liners are incredibly durable and come in a vast array of colors and patterns, allowing you to mimic the look of expensive tiles or natural stone. They are custom-fitted to your pool's exact specifications, meaning you can have a pool in virtually any shape or size.
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
          </div>
        </div>
      </section>

      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-6 flex flex-col items-center gap-8">
          <h2 className="text-4xl font-bold">Start Designing Your Vinyl Pool</h2>
          <p className="text-blue-100 text-lg">
            Our Riverside County team is ready to help you choose the perfect shape, size, and liner pattern for your backyard.
          </p>
          <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-slate-100 rounded-full px-10 py-8 text-xl">
            <a href="tel:4422342161" className="flex items-center gap-3">
              <Phone className="h-6 w-6" />
              Call (442) 234-2161
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default VinylPools;