import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { CreativesSection } from "@/components/creatives-section";
import { ServicesSection } from "@/components/services-section";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { PortfolioSubmissionForm } from "@/components/portfolio-submission-form";
import { Calendar, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-primary text-white">
      <Navigation />
      <HeroSection />
      <PortfolioGrid />
      <CreativesSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
      
      {/* Footer */}
      <footer className="bg-dark-secondary py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="font-bold text-2xl gradient-text mb-4 font-mono tracking-wider">
              WE ARE CREATIVES
            </div>
            <p className="text-gray-400 mb-6">Bringing artistic visions to life, one design at a time.</p>
            <div className="text-sm text-gray-500">
              © 2024 We Are Creatives. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <PortfolioSubmissionForm />
        <Button
          onClick={scrollToContact}
          size="icon"
          className="w-14 h-14 bg-gradient-to-r from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))] rounded-full shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse"
        >
          <Calendar className="text-white" size={24} />
        </Button>
      </div>
    </div>
  );
}
