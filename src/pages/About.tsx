"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, Award, MapPin, Phone, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const values = [
    {
      title: "Quality Craftsmanship",
      description: "We use only premium materials and proven construction techniques to ensure your pool lasts a lifetime in the North Texas climate.",
      icon: <ShieldCheck className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Expert Design",
      description: "Our dedicated designers work closely with you to create a beautiful, functional layout that perfectly complements your home.",
      icon: <Award className="h-8 w-8 text-blue-600" />,
    },
    {
      title: "Client Focus",
      description: "We pride ourselves on transparent communication, sticking to timelines, and providing an exceptional customer experience.",
      icon: <Users className="h-8 w-8 text-blue-600" />,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6">About <span className="text-blue-200">Aquavida</span></h1>
            <p className="text-xl text-blue-100 leading-relaxed">
              We are DFW's trusted custom pool builders, dedicated to transforming backyards across the Dallas-Fort Worth metroplex into breathtaking luxury retreats.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col gap-8">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Our Story</h2>
            <h3 className="text-4xl font-bold text-slate-900">Building Oasis Destinations in DFW</h3>
            <p className="text-slate-600 leading-relaxed">
              At Aquavida Pools & Spas, we understand that a swimming pool is more than just water—it's a lifestyle enhancement, a gathering place for family, and a centerpiece for entertaining. 
              We started with a vision to raise the standard of pool construction in North Texas.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Whether you choose a low-maintenance fiberglass shell or a fully custom gunite concrete pool, our team handles the entire process with meticulous attention to detail. 
              From the initial 3D design rendering to the final landscaping touches, we are with you every step of the way.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">DFW Wide</p>
                  <p className="text-sm text-slate-500">Dallas, Fort Worth, Plano, Arlington</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Expert Support</p>
                  <p className="text-sm text-slate-500">Consultation to Completion</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1572331165267-854da2b10ccc?auto=format&fit=crop&q=80&w=1000" 
                alt="Aquavida Pool Construction Project" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-slate-900 p-8 rounded-2xl shadow-xl text-white hidden sm:block">
              <p className="text-4xl font-bold text-blue-400">100%</p>
              <p className="text-sm font-medium opacity-80 uppercase tracking-wider">Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4">Our Commitment</h2>
            <h3 className="text-4xl font-bold text-slate-900 mb-6">The Aquavida Standard</h3>
            <p className="text-slate-600">We don't just build pools; we build relationships. Our core values reflect our dedication to delivering the highest quality product and experience.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center gap-6">
                <div className="p-4 bg-blue-50 rounded-2xl">
                  {value.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900">{value.title}</h4>
                <p className="text-slate-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">
          <h2 className="text-4xl font-bold">Ready to Dive Into Luxury?</h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            Contact Aquavida Pools & Spas today to schedule your design consultation in the Dallas-Fort Worth metroplex.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-8 text-xl">
              <a href="tel:2147705168" className="flex items-center gap-3">
                <Phone className="h-6 w-6" />
                <span>(214) 770-5168</span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-10 py-8 text-xl border-2 border-white text-white hover:bg-white hover:text-slate-900 transition-all bg-transparent">
              <Link to="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;