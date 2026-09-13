"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import FloatingCallButton from "@/components/FloatingCallButton";

const BrycewoodProject = () => {
  const images = [
    "/images/projects/brycewood1.png",
    "/images/projects/brycewood2.png",
    "/images/projects/brycewood3.png",
    "/images/projects/brycewood4.png",
    "/images/projects/brycewood5.png"
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-4 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">
                <ChevronRight className="h-3 w-3" />
                Featured Project
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
                Brycewood Landscaping and Pool
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Project Overview Card */}
          <div className="bg-slate-900 rounded-[48px] p-8 md:p-12 text-white mb-16">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold mb-6">Project Overview</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                Our team carefully selected plants and features that thrive in the area, designing a balanced layout that’s both attractive and easy to maintain. The result is a vibrant outdoor space that invites relaxation and enjoyment throughout the year.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">Pool Type</p>
                  <p className="font-bold">Gunite</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">Spa</p>
                  <p className="font-bold">Integrated</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">Feature</p>
                  <p className="font-bold">Stacked Stone</p>
                </div>
                <div>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-1">Area</p>
                  <p className="font-bold">Plano</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="md:col-span-2 lg:col-span-2 h-[500px] rounded-[32px] overflow-hidden shadow-xl group relative">
              <img 
                src={images[0]} 
                alt="Brycewood Pool Overview" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            <div className="h-[500px] rounded-[32px] overflow-hidden shadow-xl group relative">
              <img 
                src={images[1]} 
                alt="Brycewood Pool Close-up" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {images.slice(2).map((img, i) => (
              <div key={i} className="h-80 rounded-[32px] overflow-hidden shadow-xl group relative">
                <img 
                  src={img} 
                  alt={`Brycewood Detail ${i + 3}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default BrycewoodProject;