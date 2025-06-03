import { Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--dark-primary))] via-[hsl(var(--dark-primary)/0.9)] to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-black text-4xl md:text-7xl mb-6 animate-slide-up font-mono tracking-wider">
            <span className="gradient-text">WE ARE</span><br />
            <span className="neon-text">CREATIVES</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 animate-slide-up">
            Premium tattoo printing services for the creative community. From concept to skin, we bring your artistic vision to life.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-slide-up">
            <Button
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] px-8 py-4 text-lg font-semibold hover:scale-105 transform transition-all duration-300 neon-glow"
            >
              <Calendar className="mr-2" size={20} />
              Book Appointment
            </Button>
            <Button
              variant="outline"
              onClick={() => scrollToSection('portfolio')}
              className="border-2 border-neon-pink text-neon-pink px-8 py-4 text-lg font-semibold hover:bg-neon-pink hover:text-black transition-all duration-300"
            >
              <Eye className="mr-2" size={20} />
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 border-2 border-neon-blue rounded-full animate-float opacity-30"></div>
      <div className="absolute bottom-1/4 right-10 w-16 h-16 border-2 border-neon-pink rounded-full animate-float opacity-20" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
