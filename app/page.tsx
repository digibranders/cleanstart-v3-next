import { HeroSection } from "@/components/home/hero-section";
import { TrustedBySection } from "@/components/home/trusted-by-section";
import { BuildSecurelySection } from "@/components/home/build-securely-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { HowItHelpsSection } from "@/components/home/how-it-helps-section";
import { ResourcesSection } from "@/components/home/resources-section";
import { FAQSection } from "@/components/home/faq-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustedBySection />
      <BuildSecurelySection />
      <TestimonialsSection />
      <HowItHelpsSection />
      <ResourcesSection />
      <FAQSection />
    </>
  );
}
