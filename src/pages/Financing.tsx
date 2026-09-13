"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Sparkles,
  Home,
  Check
} from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCallButton from "@/components/FloatingCallButton";

const Financing = () => {
  const projectItems = [
    "Custom pool construction",
    "Pool and spa combinations",
    "Outdoor kitchens",
    "Patios and pavers",
    "Pergolas and shade structures",
    "Firepits and fireplaces",
    "Waterfalls and water features",
    "Pool remodeling",
    "Complete backyard transformations"
  ];

  const lenders = [
    {
      title: "VistaFi",
      image: "/images/vistafi-logo.png",
      idealFor: "Homeowners looking for dedicated pool financing with predictable monthly payments and flexible repayment options.",
      benefits: [
        "Access to multiple lenders",
        "Competitive financing solutions",
        "Fast online application",
        "Flexible loan amounts",
        "Quick approval process"
      ]
    },
    {
      title: "Viking Capital",
      image: "/images/viking-logo.png",
      idealFor: "Homeowners seeking flexible financing with a straightforward application process.",
      benefits: [
        "Flexible financing programs",
        "Quick approval process",
        "Multiple repayment options",
        "Competitive rates",
        "Financing for pools, spas, and outdoor living"
      ]
    },
    {
      title: "Lyon Financial",
      image: "/images/lyon-logo.png",
      idealFor: "Homeowners looking for dedicated pool financing with predictable monthly payments and flexible repayment options.",
      benefits: [
        "Loans designed specifically for pools",
        "Fixed interest rates",
        "No prepayment penalties",
        "Long repayment terms",
        "Financing for pools, spas, and more"
      ]
    },
    {
      title: "HFS Home Improvement Loans",
      image: "/images/hfs-logo.webp",
      idealFor: "Homeowners planning complete outdoor living projects beyond just a swimming pool.",
      benefits: [
        "No home equity required",
        "Competitive fixed rates",
        "Flexible repayment terms",
        "Fast funding",
        "Simple online application"
      ]
    }
  ];

  const cities = ["Bermuda Dunes", "Palm Desert", "La Quinta", "Palm Springs", "Indio", "Rancho Mirage", "Temecula", "Murrieta", "Corona", "Riverside"];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Overview Section - Now the Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-6">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">— Financing Your Dream</span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight">Flexible Financing for Your <span className="text-blue-600 italic font-instrument">Outdoor Haven</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed">
              A custom pool or outdoor living project is a meaningful investment. Compare trusted lenders below to find financing options that help you explore a more flexible way to begin your project.
            </p>
            <div className="grid sm:grid-cols-2 gap-y-3 gap-x-8 mt-4">
              {projectItems.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                  <span className="font-medium text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs italic text-slate-400 mt-6 border-l-2 border-slate-200 pl-4">
              Financing is provided by third-party lenders. Approval, rates, and loan terms are subject to lender requirements and credit qualification.
            </p>
          </div>
          <div className="relative hidden lg:block">
            <div className="rounded-[40px] overflow-hidden shadow-2xl aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury pool financing" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-blue-600 p-8 rounded-3xl shadow-xl text-white hidden sm:block">
              <Sparkles className="h-10 w-10 mb-4" />
              <p className="text-2xl font-bold">Start Building</p>
              <p className="text-blue-100">Sooner than you think</p>
            </div>
          </div>
        </div>
      </section>

      {/* Lender Cards Section */}
      <section className="pb-24 pt-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {lenders.map((lender, i) => (
              <div key={i} className="bg-white border-2 border-slate-100 rounded-[32px] p-8 md:p-10 flex flex-col h-full hover:border-blue-200 transition-colors">
                <div className="h-16 mb-6 flex items-center">
                  <img src={lender.image} alt={lender.title} className="max-h-full max-w-[200px] object-contain" />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4">{lender.title}</h3>
                <div className="bg-blue-50 rounded-2xl p-4 mb-6">
                  <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">Ideal For</p>
                  <p className="text-slate-700 leading-relaxed">{lender.idealFor}</p>
                </div>
                <div className="space-y-4 mb-2 flex-grow">
                  <p className="font-bold text-slate-900">Benefits:</p>
                  {lender.benefits.map((benefit, bi) => (
                    <div key={bi} className="flex items-start gap-3">
                      <div className="mt-1 bg-green-100 rounded-full p-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-slate-600 text-sm leading-snug">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HELOC Highlight */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="max-w-5xl mx-auto px-6 flex flex-col items-center text-center gap-8">
          <div className="p-4 bg-white/10 rounded-full">
            <Home className="h-12 w-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">Alternative Financing: HELOC</h2>
          <div className="space-y-6 max-w-3xl">
            <p className="text-lg text-blue-50 leading-relaxed">
              If you’ve built equity in your home, a Home Equity Line of Credit (HELOC) may provide another way to finance your backyard project. A HELOC lets eligible homeowners borrow against their available home equity, often with competitive interest rates and flexible access to funds.
            </p>
            <p className="text-lg text-blue-50 leading-relaxed font-semibold">
              A HELOC can be an excellent option for larger projects, including custom pools, luxury spas, pergolas, outdoor kitchens, patios, and complete backyard renovations.
            </p>
          </div>
        </div>
      </section>

      {/* Feature List Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Finance More Than Just a Pool</h2>
            <p className="text-lg text-slate-600">Many financing programs can cover your complete outdoor project, including:</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            {[
              "Custom Swimming Pools", "Luxury Spas", "Pergolas", 
              "Outdoor Kitchens", "Fire Features", "Patio Extensions", 
              "Landscaping", "Lighting", "Water Features"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 font-bold text-slate-800 text-xl md:text-2xl">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Area & Final CTA */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Bringing Quality to Riverside County and Beyond</h2>
          <p className="text-lg text-slate-600 mb-10 max-w-2xl">
            Proudly serving homeowners across Riverside County and surrounding Southern California communities.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-20">
            {cities.map((city, i) => (
              <span key={i} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-700 shadow-sm">
                {city}
              </span>
            ))}
          </div>

          <div className="w-full max-w-4xl bg-slate-900 rounded-[48px] p-10 md:p-16 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">Ready to Turn Your Backyard Into a Space Worth Coming Home To?</h2>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-8 text-xl font-bold w-full sm:w-auto shadow-lg shadow-blue-600/20">
                  <Link to="/estimate">Get a Free Estimate</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-slate-900 rounded-full px-10 py-8 text-xl font-bold w-full sm:w-auto transition-all">
                  <a href="tel:2147705168">Speak With an Expert</a>
                </Button>
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

export default Financing;