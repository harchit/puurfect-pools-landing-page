"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  ArrowLeft,
  Loader2,
  Sparkles
} from "lucide-react";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

interface Question {
  id: number;
  title: string | React.ReactNode;
  field: string;
  options: { label: string; value: string }[];
}

const SERVICED_ZIP_CODES = new Set([
  "92201", "92203", "92210", "92211", "92230", "92234", "92236", "92240",
  "92241", "92252", "92253", "92256", "92258", "92260", "92262", "92264",
  "92268", "92270", "92276", "92282", "92284", "92549", "92561", "92277", "92278"
]);

const Contact = () => {
  const { toast } = useToast();
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    poolType: "concrete",
    motivation: "",
    features: "",
    timeframe: "",
    financing: "",
    firstName: "",
    email: "",
    phone: "",
    zipCode: "",
    projectDetails: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  useEffect(() => {
    if (isCompleted) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isCompleted]);

  const contactInfo = [
    {
      title: "Service Areas",
      content: "Coachella Valley (Bermuda Dunes, Palm Desert, La Quinta, Palm Springs, Indio, Cathedral City, Rancho Mirage, etc.)",
      icon: <MapPin className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Phone Number",
      content: "(442) 234-2161",
      link: "tel:4422342161",
      icon: <Phone className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Business Hours",
      content: "7 days a week: 8:00 AM - 9:00 PM",
      icon: <Clock className="h-6 w-6 text-blue-600" />,
    },
  ];

  const questions: Question[] = [
    {
      id: 1,
      title: "Whats the biggest motivation behind your pool project?",
      field: "motivation",
      options: [
        { label: "Increasing home value", value: "home-value" },
        { label: "Family entertainment", value: "family-entertainment" },
        { label: "Aesthetics", value: "aesthetics" },
        { label: "All of the above", value: "all-of-the-above" }
      ]
    },
    {
      id: 2,
      title: "When are you looking to start building?",
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
    },
    {
      id: 4,
      title: (
        <span>
          How do you plan to fund your pool project?
          <span className="block mt-2 text-sm font-semibold text-blue-600 bg-blue-50/70 border border-blue-100 py-2 px-3 rounded-xl">
            This helps us match you with the best financial resources/planning
          </span>
        </span>
      ),
      field: "financing",
      options: [
        { label: "Cash/liquid savings", value: "cash" },
        { label: "My Home Equity", value: "home-equity" },
        { label: "Pre-Approved Pool/Personal Loan", value: "pre-approved" },
        { label: "I need help finding financing", value: "financing-help" },
        { label: "Haven't considered the funding yet", value: "not-thought" }
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
    if (!formData.firstName || !formData.phone || !formData.email || !formData.zipCode) {
      toast({
        title: "Incomplete details",
        description: "Please fill in all the required contact fields.",
        variant: "destructive"
      });
      return;
    }

    const digitsOnlyPhone = formData.phone.replace(/[^\d]/g, "");
    if (digitsOnlyPhone.length < 10) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const isQualified = formData.financing !== "not-thought";
    const isServicedZip = SERVICED_ZIP_CODES.has((formData.zipCode || "").trim());

    try {
      if (isServicedZip) {
        const formSubmitResponse = await fetch("https://formsubmit.co/ajax/harchit23@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            "_subject": `New Coachella Valley Pool Lead - ${formData.firstName || "Customer"}${!isQualified ? " [DQ]" : ""}`,
            "First Name": formData.firstName,
            "Email": formData.email,
            "Phone": formData.phone,
            "Zip Code": formData.zipCode,
            "Motivation": getLabelForField("motivation"),
            "Estimated Budget": getLabelForField("features"),
            "Target Timeframe": getLabelForField("timeframe"),
            "Financing Plan": getLabelForField("financing"),
            "Project Details": formData.projectDetails || "None provided",
            "Qualified": isQualified ? "Yes" : "No",
            "_honey": "", "_captcha": "false"
          })
        });

        if (!formSubmitResponse.ok) throw new Error("Failed to send lead details.");
      }

      setIsSubmitting(false);
      setIsProcessing(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setIsCompleted(true);

      if (isServicedZip && isQualified && window.fbq) {
        window.fbq("track", "Lead", {
          content_name: "Contact Form Quote",
          zip_code: formData.zipCode,
        });
      }

      toast({ title: "Request Sent!", description: "We'll be in touch shortly." });

    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setIsCompleted(true);
      toast({ title: "Warning", description: "Delivery delay. We'll contact you.", variant: "destructive" });
    }
  };

  const handleBack = () => { if (step > 1) setStep(prev => prev - 1); };

  const currentProgress = (step / 5) * 100;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Header Section */}
      <section className="pt-32 pb-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/10" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-extrabold mb-6">Contact <span className="text-blue-400">Purrfect Pools</span></h1>
            <p className="text-xl text-slate-300 leading-relaxed">
              Ready to build your dream pool? Reach out to our design and construction experts to schedule your consultation in Coachella Valley.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <h2 className="text-blue-600 font-bold uppercase tracking-widest text-sm">Get In Touch</h2>
              <h3 className="text-4xl font-bold text-slate-900">Start Your Backyard Transformation</h3>
              <p className="text-slate-600 leading-relaxed">
                Whether you're interested in a custom spa or a luxury custom concrete pool, our team is ready to answer your questions and provide a detailed estimate.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex flex-col gap-4 p-6 bg-blue-50 rounded-3xl border border-blue-100">
                  <div className="p-3 bg-white rounded-2xl w-fit shadow-sm">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-1 text-2xl">{info.title}</h4>
                    {info.link ? (
                      <a href={info.link} className="text-slate-600 hover:text-blue-600 transition-colors text-xl">
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-slate-600 text-xl">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mt-auto">
                <h4 className="font-bold text-slate-900 text-2xl mb-2">Schedule a Free Consultation</h4>
                <p className="text-slate-600 mb-6 text-xl">We'll visit your property, discuss your vision, and provide a comprehensive plan for your new pool.</p>
                <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
                    <a href="tel:4422342161" className="flex items-center justify-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span className="text-xl">Call (442) 234-2161</span>
                    </a>
                </Button>
            </div>
          </div>

          {/* Form Side */}
          <div className={`bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-slate-100 flex flex-col transition-all duration-500 ${isCompleted ? 'min-h-[600px]' : 'min-h-[550px]'}`}>
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
                  <h3 className="text-2xl font-bold text-slate-900">Processing Request...</h3>
                  <p className="text-slate-500 font-medium">Matching your details with our Coachella Valley team.</p>
                </div>
              </div>
            ) : isCompleted ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-green-100 p-4 rounded-full">
                  <CheckCircle2 className="h-10 w-10 text-green-600 animate-bounce" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-extrabold text-slate-900">Thank You!</h3>
                  <p className="text-slate-600 text-lg max-w-md leading-relaxed mx-auto">
                    We've captured your project details, {formData.firstName}. 
                  </p>
                </div>
                <div className="px-5 py-3 bg-green-50 text-green-700 border border-green-200 rounded-2xl font-bold text-sm shadow-sm">
                  Our team will contact you within 48 hours to book your on-site estimate.
                </div>
                <Button 
                  onClick={() => { setIsCompleted(false); setStep(1); setFormData({...formData, firstName: "", email: "", phone: "", zipCode: ""}); }}
                  variant="outline"
                  className="rounded-full px-8 py-4 text-base font-semibold border-2 border-slate-200 mt-4 text-slate-700 hover:bg-slate-50 transition-all"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">
                  <button type="button" onClick={handleBack} disabled={step === 1} className={`flex items-center gap-1 text-sm font-semibold transition-colors ${step > 1 ? "text-blue-600 hover:text-blue-800" : "text-slate-200 cursor-not-allowed"}`}>
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <span>Step {step} of 5</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-8">
                  <div className="h-full bg-blue-600 transition-all duration-500 rounded-full" style={{ width: `${currentProgress}%` }} />
                </div>

                {step <= 4 ? (
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 leading-snug">
                      {questions[step - 1].title}
                    </h2>
                    <div className="flex flex-col gap-3">
                      {questions[step - 1].options.map((opt, index) => {
                        const isSelected = formData[questions[step - 1].field as keyof typeof formData] === opt.value;
                        return (
                          <button
                            key={index}
                            onClick={() => handleOptionSelect(questions[step - 1].field, opt.value)}
                            className={`w-full flex items-center justify-between text-left p-4 rounded-2xl border-2 transition-all group ${isSelected ? "bg-blue-50/50 border-blue-600" : "bg-white border-slate-100 hover:border-blue-200 hover:bg-slate-50/40"}`}
                          >
                            <span className={`font-semibold text-xl ${isSelected ? "text-blue-700" : "text-slate-800"}`}>
                              {opt.label}
                            </span>
                            <ChevronRight className={`h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 ${isSelected ? "text-blue-600" : "text-slate-300"}`} />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
                    <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug">
                      Contact Information
                    </h2>
                    <div className="space-y-3.5">
                      <div className="space-y-1.5">
                        <Label htmlFor="firstName" className="text-slate-700 font-semibold text-base">First Name</Label>
                        <Input id="firstName" placeholder="Your Name" required autoComplete="given-name" value={formData.firstName} onChange={handleInputChange} className="rounded-xl py-4 h-11 text-base placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <Label htmlFor="phone" className="text-slate-700 font-semibold text-base">Phone Number</Label>
                          <Input id="phone" type="tel" inputMode="tel" placeholder="(442) 234-2161" required autoComplete="tel" value={formData.phone} onChange={handleInputChange} className="rounded-xl py-4 h-11 text-base placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" />
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="zipCode" className="text-slate-700 font-semibold text-base">Zip Code</Label>
                          <Input id="zipCode" inputMode="numeric" pattern="[0-9]*" placeholder="92203" required autoComplete="postal-code" value={formData.zipCode} onChange={handleInputChange} className="rounded-xl py-4 h-11 text-base placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-slate-700 font-semibold text-base">Email Address</Label>
                        <Input id="email" type="email" placeholder="email@example.com" required autoComplete="email" value={formData.email} onChange={handleInputChange} className="rounded-xl py-4 h-11 text-base placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="projectDetails" className="text-slate-700 font-semibold text-base">Project Details (Optional)</Label>
                        <Textarea 
                          id="projectDetails" 
                          placeholder="Tell us about your backyard vision..." 
                          value={formData.projectDetails} 
                          onChange={handleInputChange} 
                          className="rounded-xl min-h-[90px] text-base placeholder:italic placeholder:text-slate-300/60 placeholder:font-normal" 
                        />
                      </div>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 text-lg font-bold">
                        {isSubmitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Send className="h-5 w-5 mr-2" />}
                        {isSubmitting ? "Sending..." : "Send Request"}
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;