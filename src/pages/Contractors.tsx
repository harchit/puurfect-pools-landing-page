import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { isDevEnvironment } from "@/utils/isDev";
import { ShieldCheck, Target, TrendingUp, DollarSign, CheckCircle2, ArrowRight, ChevronLeft, Search, PhoneCall, Calendar, MapPin, Info, Loader2 } from "lucide-react";

// Standard window.fbq type helper
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const Contractors = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCheckingZip, setIsCheckingZip] = useState(false);
  
  const [formData, setFormData] = useState({
    companyType: "",
    firstName: "",
    email: "",
    phone: "",
    currentJobs: "",
    capacityJobs: "",
    radius: "",
    zipCode: "",
  });

  // Track PageView on component mount
  useEffect(() => {
    console.log("Triggering FB Pixel: PageView");
    if (window.fbq) {
      window.fbq('track', 'PageView');
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "zipCode") {
      // Restrict Zip Code input to numbers only and maximum 5 digits
      const numericVal = value.replace(/[^\d]/g, "").slice(0, 5);
      setFormData(prev => ({ ...prev, [id]: numericVal }));
    } else {
      // No formatting for other fields including phone
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleCompanyTypeSelect = (value: string) => {
    setFormData(prev => ({ ...prev, companyType: value }));
    setTimeout(() => setStep(2), 300);
  };

  const handleJobSelect = (value: string) => {
    setFormData(prev => ({ ...prev, currentJobs: value }));
    setTimeout(() => setStep(3), 300);
  };

  const handleCapacitySelect = (value: string) => {
    setFormData(prev => ({ ...prev, capacityJobs: value }));
    setTimeout(() => setStep(4), 300);
  };

  const handleNextStep = () => {
    if (step === 4) {
      if (!formData.radius || !formData.zipCode) {
        toast({
          title: "Missing Information",
          description: "Please fill in all location details to continue.",
          variant: "destructive"
        });
        return;
      }
      if (formData.zipCode.length !== 5) {
        toast({
          title: "Invalid Zip Code",
          description: "Zip code must be exactly 5 digits.",
          variant: "destructive"
        });
        return;
      }
      
      // Simulate checking zip code availability
      setIsCheckingZip(true);
      setTimeout(() => {
        setIsCheckingZip(false);
        setStep(prev => prev + 1);
      }, 1500);
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate phone number length (strip all non-digits to check)
    const cleanedPhone = formData.phone.replace(/\D/g, "");
    if (cleanedPhone.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    if (isDevEnvironment()) {
      console.log("🔵 [Dev Mode] Skipped sending real FormSubmit request.");
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSubmitting(false);
      setIsSubmitted(true);
      return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/harchit23@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "_subject": `New B2B Pool Partner Lead: ${formData.firstName}`,
          "Business Type": formData.companyType === "yes" ? "Construction" : "Maintenance",
          "Name": formData.firstName,
          "Email": formData.email,
          "Phone": formData.phone,
          "Current Jobs/Month": formData.currentJobs,
          "Additional Capacity/Month": formData.capacityJobs,
          "Service Radius": formData.radius,
          "HQ Zip Code": formData.zipCode,
          "_honey": "",
          "_captcha": "false"
        })
      });

      if (!response.ok) throw new Error("Failed to submit");
      
      // Facebook Pixel Lead Event Logic
      const isQualified = formData.companyType === 'yes';

      if (isQualified) {
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_category: 'B2B Partner',
            content_name: 'Pool Contractor Application'
          });
        }
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
      setIsSubmitted(true); 
    }
  };

  const OptionCard = ({ value, selected, onClick, children }: { value: string, selected: boolean, onClick: (v: string) => void, children: React.ReactNode }) => (
    <div 
      onClick={() => onClick(value)}
      className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between ${
        selected 
          ? 'border-blue-600 bg-blue-50 ring-4 ring-blue-600/10' 
          : 'border-slate-200 bg-white hover:border-blue-400 hover:bg-slate-50'
      }`}
    >
      <span className="font-semibold text-slate-700 text-base sm:text-lg">{children}</span>
      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selected ? 'border-blue-600' : 'border-slate-300'}`}>
        {selected && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-in zoom-in duration-200" />}
      </div>
    </div>
  );

  const steps = [
    {
      title: "1. Lead Generation",
      description: "We handle 100% of marketing to find high-intent homeowners in your specific area.",
      icon: <Search className="h-6 w-6 text-blue-600" />
    },
    {
      title: "2. Expert Vetting",
      description: "Our sales team verifies every project timeline, budget, and address. You also receive an audio recording of the phone call with the lead.",
      icon: <PhoneCall className="h-6 w-6 text-blue-600" />
    },
    {
      title: "3. Direct Booking",
      description: "We schedule the in-person appointment directly onto your estimator's calendar.",
      icon: <Calendar className="h-6 w-6 text-blue-600" />
    },
    {
      title: "4. Show Up & Close",
      description: "You follow up and arrive at the address on the date and time to win the job.",
      icon: <MapPin className="h-6 w-6 text-blue-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Sticky Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-slate-950/80 backdrop-blur-md border-b border-slate-900/50">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="flex items-center gap-3">
            <img src="/estimate.png" alt="EstimateHub Logo" className="h-10 w-10 rounded-full object-cover border border-blue-600/20 bg-white" />
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none text-white">
                Estimate<span className="text-blue-400">Hub</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-blue-400 mt-0.5">
                For Pool Builders
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-slate-950 text-white relative overflow-hidden flex-grow">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356f12?auto=format&fit=crop&q=80&w=2000" 
            alt="Pool Construction Site" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/80" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[65vh]">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
            <h1 className="text-[32px] min-[400px]:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.15] text-center tracking-tight">
              Get <span className="text-blue-400">10-20 New-Build</span><br />
              <span className="text-blue-400">Pool Estimates</span> per<br />
              week <span className="underline">GUARANTEED</span>
            </h1>

            <p className="text-[19px] min-[400px]:text-[22px] md:text-3xl font-bold text-slate-200 leading-tight mt-1 text-center whitespace-nowrap">
              and only <span className="text-blue-400">Pay per Appointment</span>
            </p>
          </div>

          {/* Form Side */}
          <div className="relative flex flex-col mt-0 lg:-mt-4">
            {!isSubmitted && (
              <div className="text-center mb-3">
                <p className="text-lg md:text-xl font-extrabold text-white leading-tight tracking-wide">
                  $0 monthly fees. $0 ad spend.
                </p>
                <p className="text-xs md:text-sm font-normal text-slate-300 mt-0.5">
                  Strictly performance basis
                </p>
              </div>
            )}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-30 animate-pulse" />
              <div className="bg-white rounded-3xl p-5 md:p-6 relative shadow-2xl">
                {isSubmitted ? (
                  <div className="flex flex-col items-center justify-center text-center gap-4 py-2 animate-in zoom-in duration-500">
                    <div className="bg-green-100 p-3 rounded-full">
                      <CheckCircle2 className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Application Received</h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Thanks for applying, {formData.firstName}. Our team will reach out within 24 hours.
                      </p>
                    </div>
                    
                    <div className="w-full bg-slate-50 p-4 rounded-xl text-left text-xs text-slate-600 space-y-3">
                      <p className="font-bold text-slate-900 border-b border-slate-200 pb-1.5">Summary of Application</p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="col-span-2">
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Business Type</p>
                          <p className="font-semibold text-slate-800 break-words">
                            {formData.companyType === 'yes' ? 'Pool Construction' : 'Pool Maintenance'}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Name</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.firstName}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Email</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.email}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Phone</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.phone}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Current Vol</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.currentJobs}/mo</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Added Capacity</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.capacityJobs}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Zip Code</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.zipCode}</p>
                        </div>
                        <div>
                          <p className="font-bold text-slate-400 uppercase text-[8px] tracking-wider mb-0.5">Radius</p>
                          <p className="font-semibold text-slate-800 break-words">{formData.radius} Miles</p>
                        </div>
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        setIsSubmitted(false);
                        setStep(1);
                        setFormData({
                          companyType: "", firstName: "", email: "", phone: "",
                          currentJobs: "", capacityJobs: "", radius: "", zipCode: "",
                        });
                      }}
                      variant="outline"
                      className="w-full h-11 border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm"
                    >
                      Submit Another Application
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {/* Progress Header */}
                    <div className="mb-5">
                      <div className="flex items-center justify-between mb-2.5 h-5">
                        {step > 1 && !isCheckingZip ? (
                          <button 
                            type="button" 
                            onClick={() => setStep(s => s - 1)}
                            className="text-slate-500 hover:text-slate-900 flex items-center text-xs font-semibold transition-colors"
                          >
                            <ChevronLeft className="w-3.5 h-3.5 mr-0.5" /> Back
                          </button>
                        ) : (
                          <div /> // Spacer
                        )}
                        <span className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                          Step {step} of 5
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full transition-all duration-500 ease-out" 
                          style={{ width: `${(step / 5) * 100}%` }} 
                        />
                      </div>
                    </div>

                    {/* Step Form Content */}
                    <form onSubmit={handleSubmit}>
                      {step === 1 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                          <div className="text-center mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Do you offer pool construction?</h3>
                            <p className="text-sm text-slate-500 mt-1">Select your business type</p>
                          </div>
                          <div className="grid gap-2.5">
                            {[
                              { value: 'yes', label: 'Yes' },
                              { value: 'no', label: 'I do pool maintenance' }
                            ].map(opt => (
                              <OptionCard 
                                key={opt.value}
                                value={opt.value} 
                                selected={formData.companyType === opt.value} 
                                onClick={handleCompanyTypeSelect}
                              >
                                {opt.label}
                              </OptionCard>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                          <div className="text-center mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">How many jobs are you doing per month at the moment?</h3>
                            <p className="text-sm text-slate-500 mt-1">Select your current volume</p>
                          </div>
                          <div className="grid gap-2.5">
                            {[
                              { value: '0-2', label: '0 - 2 pools/month' },
                              { value: '3-5', label: '3 - 5 pools/month' },
                              { value: '6-10', label: '6 - 10 pools/month' },
                              { value: '10+', label: '10+ pools/month' }
                            ].map(opt => (
                              <OptionCard 
                                key={opt.value}
                                value={opt.value} 
                                selected={formData.currentJobs === opt.value} 
                                onClick={handleJobSelect}
                              >
                                {opt.label}
                              </OptionCard>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                          <div className="text-center mb-4">
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">How many more can you handle?</h3>
                            <p className="text-sm text-slate-500 mt-1">Select your added capacity</p>
                          </div>
                          <div className="grid gap-2.5">
                            {[
                              { value: '1-2', label: '1 - 2 more pools' },
                              { value: '3-5', label: '3 - 5 more pools' },
                              { value: '6-10', label: '6 - 10 more pools' },
                              { value: '10+', label: '10+ more pools' }
                            ].map(opt => (
                              <OptionCard 
                                key={opt.value}
                                value={opt.value} 
                                selected={formData.capacityJobs === opt.value} 
                                onClick={handleCapacitySelect}
                              >
                                {opt.label}
                              </OptionCard>
                            ))}
                          </div>
                        </div>
                      )}

                      {step === 4 && (
                        isCheckingZip ? (
                          <div className="flex flex-col items-center justify-center py-8 space-y-3 animate-in fade-in duration-300">
                            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                            <p className="text-lg font-semibold text-slate-700">Checking territory availability...</p>
                          </div>
                        ) : (
                          <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="text-center mb-4">
                              <h3 className="text-xl md:text-2xl font-bold text-slate-900">Where do you operate?</h3>
                              <p className="text-sm text-slate-500 mt-1">Tell us your service area</p>
                            </div>
                            <div className="space-y-3">
                              <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-1.5">
                                  <Label htmlFor="zipCode" className="text-slate-700 font-semibold text-sm">HQ Zip Code</Label>
                                  <Input id="zipCode" placeholder="Zip Code" required value={formData.zipCode} onChange={handleInputChange} inputMode="numeric" className="h-11 text-base bg-slate-50 text-slate-900" />
                                </div>
                                <div className="space-y-1.5">
                                  <Label htmlFor="radius" className="text-slate-700 font-semibold text-sm">Radius (Miles)</Label>
                                  <Input id="radius" type="number" placeholder="50" required value={formData.radius} onChange={handleInputChange} inputMode="numeric" className="h-11 text-base bg-slate-50 text-slate-900" />
                                </div>
                              </div>
                              <Button 
                                type="button" 
                                onClick={handleNextStep}
                                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white text-base mt-3 font-bold"
                              >
                                Continue <ArrowRight className="ml-1.5 w-5 h-5" />
                              </Button>
                            </div>
                          </div>
                        )
                      )}

                      {step === 5 && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
                          <div className="text-center mb-4">
                            <div className="inline-flex items-center gap-1.5 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-green-200">
                              <CheckCircle2 className="h-4 w-4" />
                              {formData.zipCode} is available.
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-slate-900">Where should we reach you?</h3>
                            <p className="text-sm text-slate-500 mt-1">Almost done! Enter your contact details.</p>
                          </div>
                          <div className="space-y-3.5">
                            <div className="space-y-1.5">
                              <Label htmlFor="firstName" className="text-slate-700 font-semibold text-sm">Your Name</Label>
                              <Input id="firstName" required value={formData.firstName} onChange={handleInputChange} className="bg-slate-50 h-11 text-base text-slate-900" />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="email" className="text-slate-700 font-semibold text-sm">Email Address</Label>
                              <Input id="email" type="email" required value={formData.email} onChange={handleInputChange} className="bg-slate-50 h-11 text-base text-slate-900" />
                            </div>
                            <div className="space-y-1.5">
                              <Label htmlFor="phone" className="text-slate-700 font-semibold text-sm">Phone Number</Label>
                              <Input id="phone" type="tel" placeholder="(xxx) xxx-xxxx" required value={formData.phone} onChange={handleInputChange} autoComplete="tel-national" inputMode="tel" className="bg-slate-50 h-11 text-base text-slate-900" />
                            </div>
                            <Button 
                              type="submit" 
                              disabled={isSubmitting}
                              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white text-base mt-4 font-bold"
                            >
                              {isSubmitting ? "Submitting..." : "Submit"}
                            </Button>
                            <p className="text-[10px] text-center text-slate-500 mt-3">
                              By applying, you agree to receive communications regarding this program. We do not sell your data.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>

            {/* Lead Criteria Section placed under the form */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 mt-6">
              <h3 className="text-blue-400 font-bold text-2xl md:text-3xl mb-3 text-center">Our Lead Criteria</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> 
                  <span className="text-lg sm:text-xl font-normal leading-tight whitespace-nowrap">$75k-120k+ Customer Budget</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> 
                  <span className="text-lg sm:text-xl font-normal leading-tight whitespace-nowrap">New-Build pools only</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> 
                  <span className="text-lg sm:text-xl font-normal leading-tight whitespace-nowrap">Date/Time + Address confirmed</span>
                </li>
                <li className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0" /> 
                  <span className="text-lg sm:text-xl font-normal leading-tight whitespace-nowrap">Agreed to an in-person estimate</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3">How It Works</h2>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">A Simple, Scalable Process</h3>
            <p className="text-slate-600 mt-2 text-base">
              We take the heavy lifting out of marketing so you can focus on building world-class pools.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {steps.map((step, i) => (
              <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 hover:shadow-md transition-all">
                <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Generic Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/estimate.png" alt="EstimateHub Logo" className="h-10 w-10 rounded-full object-cover border border-slate-800 bg-white" />
            <div className="flex flex-col">
              <span className="font-bold text-base leading-none text-white">
                Estimate<span className="text-blue-400">Hub</span>
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-blue-400">
                Pool Construction
              </span>
            </div>
          </div>
          <div className="text-sm text-slate-500 text-center md:text-right">
            <p>© {new Date().getFullYear()} EstimateHub. All rights reserved.</p>
            <p className="text-xs mt-1 text-slate-600">Privacy Policy • Terms of Service • Partner Program</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contractors;