"use client";

import { Button } from "@/components/ui/button";
import { Phone, MapPin, ArrowRight, Star, ShieldCheck, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import FloatingCallButton from "@/components/FloatingCallButton";

const Index = () => {
  const poolTypes = [
    {
      title: "Gunite Pools",
      description: "The ultimate in luxury and durability. Concrete (Gunite) pools can be built to any size, shape, or depth with premium finishes.",
      image: "/images/concrete-pool.jpg",
      link: "/concrete-pools"
    },
    {
      title: "Fiberglass Pools",
      description: "Durable, low maintenance, and quick to install. Enjoy a beautiful, smooth finish that resists algae and lasts for decades.",
      image: "/images/fiberglass-pool.jpg",
      link: "/fiberglass-pools"
    },
    {
      title: "Custom Spas",
      description: "Add a touch of therapy to your backyard. Our custom-built spas and hot tubs offer year-round relaxation and luxury.",
      image: "/images/spas-luxury.jpg",
      link: "/spas"
    }
  ];

  const testimonials = [
    {
      name: "Vishal L.",
      text: "Excellent customer service and I highly recommend Michael at Purrfect pools. This was our first pool and we could not have asked for a better experience.",
      rating: 5,
    },
    {
      name: "Cynthia S.",
      text: "Job well done customer friendly could'nt have choosen a better company. Answers all my questions anytime of day month or year. Mike checks on us all the time making sure everyting is working. We really like our pool however the Grandkids loves it more.",
      rating: 5,
    },
    {
      name: "Matthew N.",
      text: "From start to finish a seamless process, from our first meeting discussing my vision, budget, design, and execution. Michael and his team delivered and exceeded my expectations.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[600px] lg:min-h-[800px] flex items-center overflow-hidden pt-24 pb-12">
        {/* Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero-main.jpg" 
            alt="Luxury Custom Pool Oasis" 
            className="w-full h-full object-cover object-center scale-100"
          />
          {/* Refined Overlays for better text contrast */}
          <div className="absolute inset-0 bg-slate-950/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="flex flex-col gap-4 max-w-2xl">
            {/* Location Banner */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 w-fit backdrop-blur-sm">
              <MapPin className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-bold text-blue-100 uppercase tracking-wider">
                Serving Riverside County
              </span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] animate-in fade-in slide-in-from-left-20 duration-1000 ease-in-out drop-shadow-2xl">
              Build Your Dream <span className="text-blue-400 font-instrument italic font-bold text-5xl lg:text-7xl block sm:inline">Backyard Oasis</span>
            </h1>
            
            <p className="text-lg lg:text-xl text-white max-w-xl leading-relaxed mt-2 drop-shadow-lg font-medium">
              Purrfect Pools & Construction specializes in custom gunite pools. Transform your outdoor living space with Riverside County's premier pool builders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Link to="/estimate" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-7 text-lg shadow-xl shadow-blue-900/40 font-bold">
                  <Sparkles className="h-5 w-5 text-yellow-300 mr-2" />
                  Get a Free Estimate in 18 Hrs
                </Button>
              </Link>
            </div>
            
            <div className="flex items-center gap-4 pt-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-200 flex items-center justify-center overflow-hidden shadow-lg">
                    <img src={`https://i.pravatar.cc/150?img=${i + 15}`} alt="Customer" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <div className="flex text-yellow-400">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </div>
                <span className="text-sm font-bold text-white drop-shadow-sm">Riverside County & Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Badge (Desktop Only) */}
        <div className="absolute bottom-8 right-8 bg-slate-900/70 backdrop-blur-sm p-3 rounded-2xl shadow-lg z-20 hidden lg:block border border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-500/20 p-2 rounded-xl">
              <ShieldCheck className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Licensed & Insured</p>
              <p className="text-[11px] text-slate-300">Certified Pool Professionals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Pool Types Section */}
      <section id="pool-types" className="pt-10 pb-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Build Your Oasis</h3>
            <p className="text-lg text-slate-600">We offer the most reliable high-end pool construction methods to fit your backyard, budget, and style preference in Riverside County.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {poolTypes.map((pool, index) => (
              <Link 
                key={index} 
                to={pool.link} 
                className="group relative h-[400px] rounded-[32px] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col justify-end"
              >
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${pool.image})` }}
                />
                
                {/* Dark Gradient Overlay - Bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
                
                {/* Content */}
                <div className="relative z-10 p-8 pr-20 flex flex-col gap-2 transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h4 className="text-2xl font-bold text-white">{pool.title}</h4>
                  <p className="text-slate-200 leading-snug text-base">{pool.description}</p>
                </div>

                {/* Navigation Arrow */}
                <div className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 text-white transform transition-all duration-300 group-hover:bg-blue-600 group-hover:scale-110 group-hover:translate-x-1">
                  <ArrowRight className="h-6 w-6" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="pb-16 pt-16">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <img
                    src="/images/bruce-founder.png"
                    alt="Michael, Founder of Purrfect Pools & Construction"
                    className="rounded-[32px] shadow-2xl w-full aspect-square object-cover object-top"
                  />
                  <p className="text-sm font-semibold text-slate-600 mt-3 text-center">Michael, Founder & Owner</p>
                </div>
                <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-xl">
                  <p className="text-3xl font-black mb-2">100%</p>
                  <p className="text-xs font-bold opacity-90 uppercase tracking-widest">Custom Designs</p>
                </div>
              </div>
              <div className="space-y-6 pt-12">
                <div className="bg-slate-900 p-8 rounded-[32px] text-white shadow-xl">
                  <p className="text-2xl font-black mb-2">Riverside</p>
                  <p className="text-xs font-bold opacity-90 uppercase tracking-widest">Wide Coverage</p>
                </div>
                <div className="rounded-[32px] shadow-2xl aspect-square overflow-hidden">
                  <img src="/images/crew-updated.jpg" alt="Pool Construction Team" className="w-full h-full object-cover scale-110" />
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex flex-col gap-6">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Why Choose Purrfect Pools</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 leading-[1.1]">Riverside County's Premier Pool Experts</h3>
            <div className="flex items-center gap-3">
              <div className="h-px w-10 bg-blue-600" />
              <p className="text-blue-600 font-bold uppercase tracking-widest text-sm">
                Founded 1980 • 45 years of pool building.
              </p>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed">
              Building a pool is a significant investment in your home. At Purrfect Pools & Construction, we guide you through every step of the process—from initial 3D design to the final fill. Serving Greater Riverside County, our commitment to quality craftsmanship ensures a stunning result that handles the Southern California climate perfectly.
            </p>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {[
                "Custom 3D design renders",
                "High-quality gunite shells",
                "Dedicated project managers",
                "Transparent project timelines",
                "Licensed & insured team",
                "Premium tile & finishes"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="bg-blue-100 p-1 rounded-full shrink-0">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-slate-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/15 rounded-full -mr-24 -mt-24 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-800/10 rounded-full -ml-24 -mb-24 blur-[100px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-8">
            <h2 className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-1">Testimonials</h2>
            <h3 className="text-2xl md:text-3xl font-bold">What Our Clients Say</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex flex-col gap-4 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex text-yellow-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-[11px] font-medium text-slate-200">
                    <svg className="w-3 h-3 shrink-0" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span>Google Review</span>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed text-sm italic">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/10">
                  <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white shadow-md shrink-0">
                    {t.name[0]}
                  </div>
                  <span className="font-bold text-white text-sm">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-blue-50 rounded-[48px] p-10 md:p-20 text-center relative overflow-hidden border border-blue-100 shadow-sm">
            <div className="relative z-10 flex flex-col items-center gap-8">
              <h2 className="text-3xl md:text-6xl font-bold text-slate-900 leading-tight">Ready to Dive In?</h2>
              <p className="text-slate-600 text-xl max-w-2xl leading-relaxed">
                Contact Purrfect Pools & Construction today to schedule your free backyard consultation and start designing the pool of your dreams in Riverside County.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/estimate" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 py-8 text-xl shadow-2xl shadow-blue-900/30 font-bold transition-all hover:scale-105 active:scale-95">
                    <Sparkles className="h-6 w-6 text-yellow-300 mr-2" />
                    Get a Free Estimate in 18 Hrs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Index;