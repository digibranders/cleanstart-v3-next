"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Check, ChevronDown, ArrowRight } from "lucide-react";

const anim = (delay: number) => ({
  initial: { opacity: 0, y: 30 } as const,
  whileInView: { opacity: 1, y: 0 } as const,
  viewport: { once: true, margin: "-60px" } as const,
  transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export function BookDemoContent() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    businessEmail: "",
    companyName: "",
    country: "",
    source: "",
    agreeToPrivacy: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Demo request:", formData);
    setSubmitted(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white px-4 md:px-8 lg:px-[50px] py-12 md:py-20 lg:py-[100px]">
        <div className="max-w-[1340px] mx-auto">
          <motion.h1
            className="font-['Google_Sans',sans-serif] font-normal text-[32px] md:text-[40px] lg:text-[48px] text-[#181818] leading-[1.2] tracking-[-0.02em] text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Get a Demo
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-[40fr_60fr] gap-12 lg:gap-[80px]">
            {/* LEFT COLUMN: What Sets Us Apart + Offices */}
            <div className="flex flex-col gap-12">
              <motion.div {...anim(0)}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-[3px] bg-gradient-to-r from-[#056bf6] to-[#00d1ff] rounded" />
                  <span className="text-xs text-[#056bf6] font-medium uppercase tracking-wider font-['Google_Sans',sans-serif]">What Sets Us Apart?</span>
                </div>
                <div className="flex flex-col gap-5">
                  {[
                    "The industry\u2019s most high performance and lowest footprint images.",
                    "Compliance, governance, and security features built-in.",
                    "Continuously updated and patched images for maximum security.",
                    "Start immediately with 100% zero CVE hardened images.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-[#056bf6] shrink-0 mt-0.5" />
                      <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B] leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div {...anim(0.1)}>
                <h2 className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] text-[#181818] tracking-[-0.01em] mb-6">Our Offices</h2>
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-2xl p-6 border border-black/[0.06] hover:border-[#056bf6]/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">&#x1F1FA;&#x1F1F8;</span>
                      <h3 className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#181818]">US Office (HQ)</h3>
                    </div>
                    <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B] leading-relaxed">838 Walker Rd, 21-2, Dover, Delaware 19904, US</p>
                  </div>
                  <div className="bg-white rounded-2xl p-6 border border-black/[0.06] hover:border-[#056bf6]/20 transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">&#x1F1EE;&#x1F1F3;</span>
                      <h3 className="font-['Google_Sans',sans-serif] text-[15px] font-semibold text-[#181818]">India Office</h3>
                    </div>
                    <p className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B] leading-relaxed">5th Floor, Westgate - D Block, SG Road, Ahmedabad - 380015 Gujarat, India.</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Contact Form */}
            <motion.div {...anim(0.15)}>
              {!submitted ? (
                <div className="bg-white rounded-3xl p-8 border border-black/[0.06] ">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[3px] bg-gradient-to-r from-[#056bf6] to-[#00d1ff] rounded" />
                    <span className="text-xs text-[#056bf6] font-medium uppercase tracking-wider font-['Google_Sans',sans-serif]">Request a Demo</span>
                  </div>
                  <h2 className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] text-[#181818] tracking-[-0.01em] mb-2">Get in Touch with CleanStart</h2>
                  <p className="font-['Google_Sans',sans-serif] text-[14px] text-[#64748B] leading-relaxed mb-8">We would be happy to hear from you about any feedback or questions about CleanStart.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="John" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">Phone Number</label>
                      <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="+1 (555) 000-0000" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">Business Email</label>
                      <input type="email" name="businessEmail" value={formData.businessEmail} onChange={handleInputChange} placeholder="john.doe@company.com" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">Company Name</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Your Company" required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">Country</label>
                      <div className="relative">
                        <select name="country" value={formData.country} onChange={handleInputChange} required className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all appearance-none cursor-pointer">
                          <option value="">Select Country</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="United Kingdom">United Kingdom</option>
                          <option value="Germany">Germany</option>
                          <option value="France">France</option>
                          <option value="India">India</option>
                          <option value="Singapore">Singapore</option>
                          <option value="Australia">Australia</option>
                          <option value="Japan">Japan</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-['Google_Sans',sans-serif] text-[13px] font-medium text-[#181818]">How did you hear about CleanStart?</label>
                      <div className="relative">
                        <select name="source" value={formData.source} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-white border border-[#e2e8f0] font-['Google_Sans',sans-serif] text-[14px] text-[#181818] focus:outline-none focus:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/10 transition-all appearance-none cursor-pointer">
                          <option value="">Select an option</option>
                          <option value="Google Search">Google Search</option>
                          <option value="LinkedIn">LinkedIn</option>
                          <option value="Partner Referral">Partner Referral</option>
                          <option value="Event/Conference">Event/Conference</option>
                          <option value="Other">Other</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B] pointer-events-none" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer group">
                        <input type="checkbox" name="agreeToPrivacy" checked={formData.agreeToPrivacy} onChange={handleInputChange} required className="mt-1 w-5 h-5 rounded border-2 border-[#e2e8f0] bg-white checked:bg-[#056bf6] checked:border-[#056bf6] focus:ring-2 focus:ring-[#056bf6]/20 transition-colors cursor-pointer accent-[#056bf6]" />
                        <span className="font-['Google_Sans',sans-serif] text-[13px] text-[#64748B] leading-[1.6]">
                          In accordance with our{" "}
                          <a href="/privacy" className="text-[#056bf6] hover:underline">Privacy Policy</a>{" "}
                          you may be contacted about CleanStart or related products and services. I agree to the CleanStart Security Privacy Policy. You can unsubscribe at any time.
                        </span>
                      </label>
                    </div>

                    <div className="flex justify-center">
                      <button type="submit" className="flex items-center justify-center gap-2 h-[40px] pl-4 pr-1 rounded-full cursor-pointer bg-[#056bf6] hover:bg-[#5d04d8] text-white font-['Google_Sans',sans-serif] font-normal text-[15px] transition-all duration-300">
                        <span className="mr-2">Request a demo</span>
                        <div className="flex items-center justify-center rounded-full shrink-0 bg-white w-8 h-8">
                          <ArrowRight className="w-4 h-4 text-[#056bf6]" />
                        </div>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-black/[0.06] ">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-[3px] bg-gradient-to-r from-[#10b981] to-[#22c55e] rounded" />
                    <span className="text-xs text-[#10b981] font-medium uppercase tracking-wider font-['Google_Sans',sans-serif]">Success</span>
                  </div>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-[#10b981]/10 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-[#10b981]" />
                    </div>
                    <h2 className="font-['Google_Sans',sans-serif] font-normal text-[24px] md:text-[28px] text-[#181818] mb-3">Thank you! Your submission has been received!</h2>
                    <p className="font-['Google_Sans',sans-serif] text-[15px] text-[#64748B] leading-relaxed">We&apos;ll be in touch with you shortly to schedule your demo.</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
