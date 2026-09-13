"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCallButton from "@/components/FloatingCallButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  Sparkles,
  Zap,
  ArrowRight,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Phone,
  Ruler,
  FileText,
  ClipboardList,
  MapPin,
  X,
  ChevronLeft
} from "lucide-react";

// Declaring standard window.fbq and Cal type helper
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    Cal?: any;
  }
}

interface Question {
  id: number;
  title: string | React.ReactNode;
  field: string;
  options: { label: string; value: string }[];
}

const SESSION_STORAGE_KEY = "aquavida_estimate_state";

const estimateProjects = [
  {
    id: "la-quinta-villa",
    title: "La Quinta Villa Pool & Sunken Spa",
    location: "La Quinta, CA",
    description: "Sleek geometric custom gunite pool with premium stone pavers, turf accent ribbons, and sunken spa.",
    coverImage: "/images/projects/IMG_8672.jpg",
    images: [
      "/images/projects/IMG_8672.jpg",
      "/images/projects/IMG_8673.jpg",
      "/images/projects/IMG_8674.jpg"
    ],
    tags: ["Custom Gunite Pool", "Sunken Spa", "Turf Accents"]
  },
  {
    id: "palm-desert-estate",
    title: "Palm Desert Modern Estate & Outdoor Kitchen",
    location: "Palm Desert, CA",
    description: "Modern lap pool, glass tile rim spa, tanning shelf, and stacked-stone outdoor kitchen island with stainless grill.",
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
    tags: ["Outdoor Kitchen", "Lap Pool", "Glass Tile Spa"]
  },
  {
    id: "indian-wells-resort",
    title: "Indian Wells Resort Pool & Swim-Up Bar",
    location: "Indian Wells, CA",
    description: "Sprawling luxury estate pool with built-in swim-up bar stools, rim spa, fire pit table, and turf grid.",
    coverImage: "/images/projects/IMG_5701.jpeg",
    images: [
      "/images/projects/IMG_5701.jpeg",
      "/images/projects/IMG_6493.jpeg"
    ],
    tags: ["Swim-Up Bar", "Fire Pit", "Sunken Spa"]
  },
  {
    id: "rancho-mirage-fairway",
    title: "Rancho Mirage Golf Course Fairway Pool",
    location: "Rancho Mirage, CA",
    description: "Fairway view pool with modern fire pit patio, cobalt blue fire glass, spillover spa, and mountain backdrop.",
    coverImage: "/images/projects/IMG_4407.jpg",
    images: [
      "/images/projects/IMG_4407.jpg",
      "/images/projects/IMG_3415.jpg"
    ],
    tags: ["Fairway View", "Fire Pit Lounge", "Spillover Spa"]
  },
  {
    id: "palm-springs-mountain",
    title: "Palm Springs Mountain Vista Pool & Raised Spa",
    location: "Palm Springs, CA",
    description: "Clean modern lap pool and raised stone spillover spa framed by sleek concrete decking and mountain views.",
    coverImage: "/images/projects/IMG_3248.jpeg",
    images: [
      "/images/projects/IMG_3248.jpeg",
      "/images/projects/IMG_3247.jpeg"
    ],
    tags: ["Mountain Views", "Raised Spillover Spa", "Lap Pool"]
  },
  {
    id: "coachella-waterfall",
    title: "Coachella Valley Stone Waterfall & Sheer Descent",
    location: "Coachella Valley, CA",
    description: "Custom gunite pool with stacked natural stone water wall, dual sheer descent waterfalls, and tanning ledge.",
    coverImage: "/images/projects/IMG_2856.jpg",
    images: [
      "/images/projects/IMG_2856.jpg"
    ],
    tags: ["Stone Water Wall", "Sheer Descent", "Waterfall"]
  }
];

const initialFormData = {
  poolType: "concrete", 
  motivation: "",
  features: "",
  timeframe: "",
  firstName: "",
  email: "",
  phone: "",
  zipCode: "",
  projectDetails: ""
};

const getSavedState = () => {
  try {
    const saved = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.formData?.firstName?.includes("Debug")) {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return null;
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error reading saved estimate state:", e);
  }
  return null;
};

const Estimate = () => {
  const { toast } = useToast();
  const location = useLocation();

  const savedState = getSavedState();

  const [step, setStep] = useState<number>(savedState?.step || 1);
  const [formData, setFormData] = useState(savedState?.formData || initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
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

  useEffect(() => {
    try {
      if (!isCompleted && !formData.firstName?.includes("Debug")) {
        sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({ step, formData })
        );
      } else {
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      }
    } catch (e) {
      console.error("Error saving estimate state:", e);
    }
  }, [step, formData, isCompleted]);

  useEffect(() => {
    document.title = "Free Custom Pool Proposal";
  }, []);

  useEffect(() => {
    if (isCompleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isCompleted]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('debug') === 'success') {
      setFormData({
        firstName: "John (Debug)",
        email: "john@example.com",
        phone: "5555555555",
        zipCode: "75201",
        motivation: "all-of-the-above",
        features: "90000-105000",
        timeframe: "this-month",
        poolType: "concrete",
        projectDetails: "Debug project details."
      });
      setIsCompleted(true);
    }
  }, [location.search]);

  useEffect(() => {
    console.log("Triggering FB Pixel: PageView (Estimate Page)");
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      (function (C, A, L) { 
        let p = function (a: any, ar: any) { a.q.push(ar); }; 
        let d = C.document; 
        C.Cal = C.Cal || function () { 
          let cal = C.Cal; 
          let ar = arguments; 
          if (!cal.loaded) { 
            cal.ns = {}; 
            cal.q = cal.q || []; 
            d.head.appendChild(d.createElement("script")).src = A; 
            cal.loaded = true; 
          } 
          if (ar[0] === L) { 
            const api: any = function () { p(api, arguments); }; 
            const namespace = ar[1]; 
            api.q = api.q || []; 
            if(typeof namespace === "string"){
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar); 
            return;
          } 
          p(cal, ar); 
        }; 
      })(window as any, "https://app.cal.com/embed/embed.js", "init");

      if (window.Cal) {
        window.Cal("init", "30min", {origin:"https://app.cal.com"});
        window.Cal.config = window.Cal.config || {};
        window.Cal.config.forwardQueryParams = true;

        window.Cal.ns["30min"]("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
      }
    }
  }, [isCompleted]);

  const questions: Question[] = [
    {
      id: 1,
      title: "What's the primary goal with your pool?",
      field: "motivation",
      options: [
        { label: "Increase home value", value: "home-value" },
        { label: "Family entertainment", value: "family-entertainment" },
        { label: "Aesthetics", value: "aesthetics" },
        { label: "All of the above", value: "all-of-the-above" }
      ]
    },
    {
      id: 2,
      title: "When is construction planned?",
      field: "timeframe",
      options: [
        { label: "This week", value: "this-week" },
        { label: "This month", value: "this-month" },
        { label: "Next Month", value: "next-month" },
        { label: "No Preference", value: "no-preference" }
      ]
    },
    {
      id: 3,
      title: "What's your estimated project budget?",
      field: "features",
      options: [
        { label: "$75,000 - 90,000", value: "75000-90000" },
        { label: "$90,000 - 105,000", value: "90000-105000" },
        { label: "$105,000 - 120,000", value: "105000-120000" },
        { label: "$120,000+", value: "120000+" }
      ]
    }
  ];

  const getLabelForField = (field: string) => {
    const val = formData[field as keyof typeof formData];
    if (!val) return "Unspecified";
    
    const question = questions.find(q => q.field === field);
    if (!question) return val;
    
    const match = question.options.find(opt => opt.value === val);
    return match ? match.label : val;
  };

  const handleOptionSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setStep(prev => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === "zipCode") {
      const numericValue = value.replace(/[^\d]/g, "").slice(0, 5);
      setFormData(prev => ({ ...prev, [id]: numericValue }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.phone || !formData.zipCode) {
      toast({
        title: "Incomplete details",
        description: "Please fill in all the required contact fields.",
        variant: "destructive"
      });
      return;
    }

    const digitsOnlyPhone = formData.phone.replace(/[^\d]/g, "");
    const finalDigits = (digitsOnlyPhone.length === 11 && digitsOnlyPhone.startsWith("1")) 
      ? digitsOnlyPhone.slice(1) 
      : digitsOnlyPhone;

    if (finalDigits.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    if (/^0+$/.test(finalDigits)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number (cannot be all zeros).",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const formSubmitResponse = await fetch("https://formsubmit.co/ajax/harchit23@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "_subject": `New Riverside County Pool Lead - ${formData.firstName || "Customer"}`,
          "First Name": formData.firstName,
          "Email": formData.email,
          "Phone": formData.phone,
          "Zip Code": formData.zipCode,
          "Primary Goal": getLabelForField("motivation"),
          "Estimated Budget": getLabelForField("features"),
          "Target Timeframe": getLabelForField("timeframe"),
          "Project Details": formData.projectDetails || "None provided",
          "_honey": "",
          "_captcha": "false"
        })
      });

      if (!formSubmitResponse.ok) {
        throw new Error("Failed to send lead details.");
      }

      setIsSubmitting(false);
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsProcessing(false);
      setIsCompleted(true);

      if (window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Pool Proposal Quote",
          predicted_pool_type: formData.poolType,
          zip_code: formData.zipCode
        });
      }

      toast({
        title: "Proposal Requested!",
        description: "Your configurations have been forwarded successfully.",
      });

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setIsCompleted(true);
      toast({
        title: "Warning",
        description: "Delivery delay. A representative will contact you.",
        variant: "destructive"
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const currentProgress = (step / 4) * 100;

  const howItWorksSteps = [
    {
      icon: <ClipboardList className="h-5 w-5 text-blue-600" />,
      title: "Project Overview",
      description: "Provide details about your pool project including primary goal, timeline, desired features, and contact info."
    },
    {
      icon: <Phone className="h-5 w-5 text-blue-600" />,
      title: "Initial Follow-Up",
      description: "Our rep Harry will immediately ring you to book your in-person estimate within the next 48 hours."
    },
    {
      icon: <Ruler className="h-5 w-5 text-blue-600" />,
      title: "On-site Visit",
      description: "Our estimator will meet you in person to take measurements and collect job scope and timeline details."
    },
    {
      icon: <FileText className="h-5 w-5 text-blue-600" />,
      title: "Full Proposal",
      description: "Receive a complete proposal highlighting all project costs, timeline, and details."
    }
  ];

  const pillClasses = "flex min-h-[2rem] items-center justify-center gap-1.5 px-2 min-[400px]:px-4 py-1 rounded-full bg-slate-900/70 text-[10px] min-[400px]:text-xs font-bold w-full text-center leading-tight text-white shadow-lg";

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Compact Hero Section */}
      <section className="relative pt-24 pb-7 lg:pt-28 lg:pb-8 overflow-hidden flex flex-col items-center text-center justify-center bg-slate-950 text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/estimate-hero-bg.jpg" 
            alt="Luxury Custom Pool Construction Background" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10 w-full flex flex-col items-center gap-3.5">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight max-w-3xl [text-shadow:_0_2px_10px_rgba(0,0,0,0.8)]">
            Get a <span className="text-[#7AD1E4]">0-Cost Pool Proposal</span> in Riverside County in <span className="underline italic">24hrs</span>
          </h1>

          <div className="grid grid-cols-2 gap-x-2.5 gap-y-[7.5px] max-w-3xl w-full">
            <div className={pillClasses}>
              <ShieldCheck className="h-3.5 w-3.5 text-[#7AD1E4] shrink-0" />
              On-Site Visits
            </div>
            <div className={pillClasses}>
              <Zap className="h-3.5 w-3.5 text-[#7AD1E4] shrink-0" />
              Competitive Bids
            </div>
            <div className={pillClasses}>
              <Sparkles className="h-3.5 w-3.5 text-[#7AD1E4] shrink-0" />
              No hidden fees
            </div>
            <div className={pillClasses}>
              <MapPin className="h-3.5 w-3.5 text-[#7AD1E4] shrink-0" />
              Riverside County
            </div>
          </div>
        </div>
      </section>

      {/* Multi-step card container */}
      <section className="pb-4 px-6 relative -mt-6 z-20">
        <div className={`mx-auto bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 md:p-6 flex flex-col transition-all duration-500 ${isCompleted ? 'max-w-2xl' : 'max-w-xl'}`}>
          
          {isProcessing ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12 gap-8 animate-in fade-in duration-500">
              <div className="relative">
                <div className="h-24 w-24 border-4 border-slate-100 rounded-full" />
                <div className="h-24 w-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-blue-500 animate-pulse" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h3 className="text-2xl font-bold text-slate-900">Analyzing Project Scope...</h3>
                <p className="text-slate-500 font-medium">Matching your details with our project managers.</p>
              </div>
            </div>
          ) : !isCompleted ? (
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
                <button 
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors ${
                    step > 1 ? "text-blue-600 hover:text-blue-800" : "text-slate-200 cursor-not-allowed"
                  }`}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <span>Question {step === 4 ? 4 : step} of 4</span>
              </div>

              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-4">
                <div 
                  className="h-full bg-blue-600 transition-all duration-500 rounded-full" 
                  style={{ width: `${currentProgress}%` }}
                />
              </div>

              {step <= 3 ? (
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3.5 leading-snug">
                    {questions[step - 1].title}
                  </h2>

                  {step === 2 && formData.motivation === "home-value" && (
                    <div className="mb-4 -mt-1 py-2 px-3 bg-blue-50/70 border border-blue-100 rounded-xl text-sm font-semibold text-blue-600 animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-3">
                      In-ground pools can add 5-8% to your home's value
                    </div>
                  )}

                  {step === 3 && (
                    <div className="mb-4 -mt-1 py-2 px-3 bg-blue-50/70 border border-blue-100 rounded-xl text-sm font-semibold text-blue-600 animate-in fade-in slide-in-from-top-2 duration-500 flex items-center gap-3">
                      In-ground pools typically range from $75,000 to $120,000
                    </div>
                  )}

                  <div className="flex flex-col gap-2">
                    {questions[step - 1].options.map((opt, index) => {
                      const isSelected = formData[questions[step - 1].field as keyof typeof formData] === opt.value;
                      return (
                        <button
                          key={index}
                          onClick={() => handleOptionSelect(questions[step - 1].field, opt.value)}
                          className={`w-full flex items-center justify-between text-left p-3.5 md:p-4 rounded-2xl border-2 transition-all group ${
                            isSelected 
                            ? "bg-blue-50/50 border-blue-600 shadow-md shadow-blue-50" 
                            : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/40"
                          }`}
                        >
                          <span className={`font-semibold text-lg md:text-xl ${
                            isSelected ? "text-blue-700" : "text-slate-800"
                          }`}>
                            {opt.label}
                          </span>
                          <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${
                            isSelected ? "text-blue-600" : "text-slate-300"
                          }`} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug">
                      Who's the decision maker?
                    </h2>

                    <div className="grid grid-cols-3 gap-2 bg-slate-50 border border-slate-100 p-2.5 rounded-xl mb-0.5">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">GOAL</span>
                        <span className="text-xs font-semibold text-slate-700 truncate">{getLabelForField("motivation")}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Timeframe</span>
                        <span className="text-xs font-semibold text-slate-700 truncate">{getLabelForField("timeframe")}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Budget</span>
                        <span className="text-xs font-semibold text-slate-700 truncate">{getLabelForField("features")}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="space-y-1">
                      <Label htmlFor="firstName" className="text-slate-700 font-semibold text-sm">First Name</Label>
                      <Input 
                        id="firstName" 
                        name="firstName"
                        placeholder="John" 
                        required 
                        autoComplete="given-name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="rounded-xl py-2.5 h-11 text-sm placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" 
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="phone" className="text-slate-700 font-semibold text-sm">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        placeholder="(442) 234-2161"
                        required
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="rounded-xl py-2.5 h-11 text-sm placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="email" className="text-slate-700 font-semibold text-sm">Email Address</Label>
                      <Input 
                        id="email" 
                        name="email"
                        type="email"
                        placeholder="email@example.com" 
                        required 
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="rounded-xl py-2.5 h-11 text-sm placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" 
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="zipCode" className="text-slate-700 font-semibold text-sm">Zip Code</Label>
                      <Input 
                        id="zipCode" 
                        name="zipCode"
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        placeholder="75201" 
                        required 
                        autoComplete="postal-code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="rounded-xl py-2.5 h-11 text-sm placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" 
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="projectDetails" className="text-slate-700 font-semibold text-sm">Project Details (Optional)</Label>
                      <Textarea 
                        id="projectDetails" 
                        name="projectDetails"
                        placeholder="Tell us about your vision, site conditions, or special features..." 
                        value={formData.projectDetails}
                        onChange={handleInputChange}
                        className="rounded-xl min-h-[70px] text-sm placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" 
                      />
                    </div>
                  </div>

                  <div className="mt-auto pt-4">
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-auto min-h-[3.5rem] py-3 px-4 sm:px-8 text-xl font-bold shadow-md shadow-blue-600/20 transition-all active:scale-[0.98] flex justify-center items-center text-center"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                          <span>Finalizing Details...</span>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-2 text-center">
                          <span className="whitespace-normal">Submit</span>
                          <ArrowRight className="h-5 w-5 shrink-0" />
                        </div>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 py-1 animate-in fade-in zoom-in-95 duration-500">
              <div className="space-y-1.5">
                <h3 className="text-3xl font-extrabold text-slate-900">Request Received!</h3>
                <p className="text-slate-600 text-lg max-w-md leading-relaxed mx-auto">
                  Thank you, {formData.firstName}! We have captured your specifications.
                </p>
              </div>
              
              <div className="flex flex-col gap-6 w-full max-w-md items-center">
                <div className="w-full flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 border border-green-200 rounded-2xl font-bold text-sm shadow-sm leading-relaxed text-left">
                  Our rep Harry will ring you to discuss your project and book your in-person estimate in the next 48 hours.
                </div>

                <div className="w-full bg-slate-50 border border-slate-100 p-5 sm:p-6 rounded-2xl text-left text-sm text-slate-500 space-y-4">
                  <div>
                    <p className="font-bold text-slate-700 mb-1 border-b border-slate-200 pb-1.5 uppercase tracking-wider text-xs">Project Summary</p>
                    <p>• <span className="font-semibold text-slate-600">Primary Goal:</span> {getLabelForField("motivation")}</p>
                    <p>• <span className="font-semibold text-slate-600">Estimated Budget:</span> {getLabelForField("features")}</p>
                    <p>• <span className="font-semibold text-slate-600">Target Timeframe:</span> {getLabelForField("timeframe")}</p>
                    <p>• <span className="font-semibold text-slate-600">Location:</span> {formData.zipCode}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* How It Works Section */}
      <section className="pt-2 pb-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 flex flex-col items-center">
          <div className="flex flex-col items-center mb-4 text-center">
            <Link to="/" className="mb-4 inline-block">
              <img
                src="/purrfect-pools-full-logo.png"
                alt="Purrfect Pools Logo"
                className="h-16 md:h-20 w-auto object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">How it works</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative w-full">
            {howItWorksSteps.map((item, idx) => (
              <div key={idx} className="flex flex-col items-start text-left p-5 bg-slate-50/50 rounded-3xl border border-slate-100 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-blue-100 shadow-sm relative">
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </div>
                  {React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                    className: "h-5 w-5 transition-colors group-hover:text-white"
                  })}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <div className="space-y-2">
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects Portfolio Section */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Our Work</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">Recent Projects & Built Pools</h2>
              <p className="text-slate-600 mt-2 text-base max-w-xl">
                Take a look at real custom pool and outdoor living transformations built across Southern California.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors group"
            >
              <span>Explore All Projects</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {estimateProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div
                  className="relative h-60 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(project.images, 0, project.title)}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-80" />
                  <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-blue-400" />
                    <span>{project.location}</span>
                  </div>
                  {project.images.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-blue-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md">
                      {project.images.length} Photos
                    </div>
                  )}
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs leading-relaxed line-clamp-2 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg border border-slate-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => openLightbox(project.images, 0, project.title)}
                    className="w-full py-2.5 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 font-bold text-xs rounded-xl border border-slate-200 hover:border-blue-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>View Photos ({project.images.length})</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-200">
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

      {/* Debug shortcut container serving directly as button */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Debug toggle confirmation view"
        onClick={() => {
          if (!isCompleted) {
            setFormData({
              firstName: "John (Debug)",
              email: "john@example.com",
              phone: "(442) 234-2161",
              zipCode: "92203",
              motivation: "home-value",
              features: "90000-105000",
              timeframe: "this-month",
              poolType: "concrete",
              projectDetails: "Debug dummy project details for testing confirmation view."
            });
            setIsCompleted(true);
          } else {
            setFormData(initialFormData);
            setIsCompleted(false);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            if (!isCompleted) {
              setFormData({
                firstName: "John (Debug)",
                email: "john@example.com",
                phone: "(442) 234-2161",
                zipCode: "92203",
                motivation: "home-value",
                features: "90000-105000",
                timeframe: "this-month",
                poolType: "concrete",
                projectDetails: "Debug dummy project details for testing confirmation view."
              });
              setIsCompleted(true);
            } else {
              setFormData(initialFormData);
              setIsCompleted(false);
            }
          }
        }}
        className="py-2 text-center bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer border-t border-slate-200 min-h-[16px]"
      />

      <Footer />
      <FloatingCallButton />
    </div>
  );
};

export default Estimate;