"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, MapPin, X, ChevronLeft, ChevronRight } from "lucide-react";
import FloatingCallButton from "@/components/FloatingCallButton";

interface Project {
  id: string;
  title: string;
  location: string;
  description: string;
  coverImage: string;
  images: string[];
  tags: string[];
  link?: string;
}

const projectsData: Project[] = [
  {
    id: "la-quinta-villa",
    title: "La Quinta Villa Pool & Sunken Spa",
    location: "La Quinta, CA",
    description: "Sleek geometric custom gunite pool surrounded by premium stone pavers, turf accent ribbons, and an integrated sunken spa set against a mountain backdrop.",
    coverImage: "/images/projects/IMG_8672.jpg",
    images: [
      "/images/projects/IMG_8672.jpg",
      "/images/projects/IMG_8673.jpg",
      "/images/projects/IMG_8674.jpg"
    ],
    tags: ["Custom Gunite Pool", "Sunken Spa", "Turf Accents", "Travertine Decking"]
  },
  {
    id: "palm-desert-estate",
    title: "Palm Desert Modern Estate & Outdoor Kitchen",
    location: "Palm Desert, CA",
    description: "Full resort-style backyard transformation featuring a clean modern lap pool, glass tile rim spa, custom tanning shelf, desert landscaping, and a fully equipped white stacked-stone outdoor kitchen island with stainless grill and refrigerator.",
    coverImage: "/images/projects/IMG_9977.jpg",
    images: [
      "/images/projects/IMG_9977.jpg",
      "/images/projects/IMG_9972.jpg",
      "/images/projects/IMG_9969.jpg",
      "/images/projects/IMG_9970.jpg",
      "/images/projects/IMG_9971_step.jpg",
      "/images/projects/IMG_9973.jpg",
      "/images/projects/IMG_9974.jpg"
    ],
    tags: ["Outdoor Kitchen", "Lap Pool", "Glass Tile Spa", "Tanning Shelf", "Desert Landscape"]
  }
];

const Projects = () => {
  const [selectedGallery, setSelectedGallery] = useState<{ images: string[]; index: number; title: string } | null>(null);

  const openLightbox = (images: string[], index: number, title: string) => {
    setSelectedGallery({ images, index, title });
  };

  const nextImage = () => {
    if (!selectedGallery) return;
    setSelectedGallery({
      ...selectedGallery,
      index: (selectedGallery.index + 1) % selectedGallery.images.length
    });
  };

  const prevImage = () => {
    if (!selectedGallery) return;
    setSelectedGallery({
      ...selectedGallery,
      index: (selectedGallery.index - 1 + selectedGallery.images.length) % selectedGallery.images.length
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Our Portfolio</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 leading-tight">
              A few of our <span className="text-blue-400">projects</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 leading-relaxed">
              Explore our gallery of recently completed custom pool builds and outdoor living transformations across Riverside County and Southern California.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10">
            {projectsData.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-[32px] overflow-hidden border border-slate-200/80 shadow-xl flex flex-col transition-all duration-300 hover:shadow-2xl"
              >
                {/* Cover & Gallery Thumbnails */}
                <div className="relative">
                  <div 
                    className="relative h-72 sm:h-80 overflow-hidden cursor-pointer group"
                    onClick={() => openLightbox(project.images, 0, project.title)}
                  >
                    <img 
                      src={project.coverImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-blue-400" />
                      <span>{project.location}</span>
                    </div>

                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-blue-600/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        {project.images.length} Photos — Click to View
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Row if multiple photos */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 p-3 bg-slate-900 overflow-x-auto scrollbar-none">
                      {project.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => openLightbox(project.images, idx, project.title)}
                          className="relative h-16 w-20 shrink-0 rounded-xl overflow-hidden border-2 border-slate-700 hover:border-blue-400 transition-all group"
                        >
                          <img src={img} alt={`${project.title} photo ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Details */}
                <div className="p-6 sm:p-8 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      {project.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-xs font-medium px-3 py-1 bg-slate-100 text-slate-700 rounded-full border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => openLightbox(project.images, 0, project.title)}
                      className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:text-blue-700 transition-colors"
                    >
                      <span>View Photos ({project.images.length})</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    {project.link && (
                      <Link 
                        to={project.link} 
                        className="text-xs font-semibold text-slate-500 hover:text-slate-900 underline transition-colors"
                      >
                        Project Details
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200">
          {/* Header */}
          <div className="w-full max-w-6xl flex items-center justify-between text-white pb-4 border-b border-slate-800">
            <div>
              <h4 className="text-lg sm:text-xl font-bold">{selectedGallery.title}</h4>
              <p className="text-xs text-slate-400">Image {selectedGallery.index + 1} of {selectedGallery.images.length}</p>
            </div>
            <button 
              onClick={() => setSelectedGallery(null)}
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Main Image Container */}
          <div className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-4">
            <img 
              src={selectedGallery.images[selectedGallery.index]} 
              alt={selectedGallery.title} 
              className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl"
            />

            {selectedGallery.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-colors shadow-xl"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 p-3 rounded-full bg-slate-900/80 hover:bg-blue-600 text-white transition-colors shadow-xl"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails row in modal */}
          {selectedGallery.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto max-w-xl p-2 bg-slate-900/80 rounded-2xl border border-slate-800">
              {selectedGallery.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGallery({ ...selectedGallery, index: idx })}
                  className={`h-14 w-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedGallery.index === idx ? "border-blue-500 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Ready to build your custom pool?</h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Get your instant 3D design quote online in minutes, or talk with Bruce and our expert builders.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/estimate" 
              className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg"
            >
              Get Instant Estimate
            </Link>
            <a 
              href="tel:4422342161" 
              className="px-8 py-4 bg-blue-700 text-white rounded-full font-bold text-lg hover:bg-blue-800 transition-colors border border-blue-500"
            >
              Call (442) 234-2161
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Projects;