"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import FloatingCallButton from "@/components/FloatingCallButton";

const Projects = () => {
  const projects = [
    {
      id: "spruce",
      title: "Spruce Hills Pool and Pergola",
      image: "/images/projects/spruce1.png",
      link: "/projects/spruce",
      description: "A complete transformation featuring a custom gunite pool, integrated spa, and a luxury cedar pergola."
    },
    {
      id: "montalcino",
      title: "Montalcino Backyard Retreat",
      image: "/images/projects/montalcino1.png",
      link: "/projects/montalcino",
      description: "We created a cozy and functional outdoor kitchen and firepit area for the Montalcino property. The goal was to build a space perfect for gatherings and relaxing evenings outdoors."
    },
    {
      id: "brycewood",
      title: "Brycewood Landscaping and Pool",
      image: "/images/projects/brycewood1.png",
      link: "/projects/brycewood",
      description: "We provided a fresh landscaping design for the Brycewood property to enhance its natural beauty and usability. The focus was on creating a welcoming, green space that fits the home’s style."
    },
    {
      id: "garland",
      title: "Garland Pool and Spa Retreat",
      image: "/images/projects/garland1.png",
      link: "/projects/garland",
      description: "We designed a custom pool and spa retreat for this Riverside County property. The goal was to create a luxurious, functional, and visually appealing outdoor living space featuring travertine tile, a pergola with a concrete base, enhanced privacy fencing, and a remote-controlled entry gate"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-4">A few of our <span className="text-blue-400">projects</span></h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Explore our gallery of recently completed backyard transformations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link 
                key={project.id} 
                to={project.link}
                className="group flex flex-col bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 mb-6 text-sm flex-1">
                    {project.description}
                  </p>
                  <div className="flex items-center gap-2 text-blue-600 font-bold group-hover:translate-x-2 transition-transform duration-300">
                    <span>View Project Details</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Projects;