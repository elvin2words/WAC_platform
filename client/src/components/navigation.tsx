import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="font-bold text-xl gradient-text font-mono tracking-wider">
            WE ARE CREATIVES
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-neon-blue hover:bg-dark-tertiary"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Portfolio
            </button>
            <button
              onClick={() => scrollToSection('creatives')}
              className="hover:text-neon-purple transition-colors duration-300"
            >
              Creatives
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-neon-blue transition-colors duration-300"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="hover:text-neon-blue transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col space-y-4 text-center">
              <button
                onClick={() => scrollToSection('home')}
                className="hover:text-neon-blue transition-colors duration-300 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('portfolio')}
                className="hover:text-neon-blue transition-colors duration-300 py-2"
              >
                Portfolio
              </button>
              <button
                onClick={() => scrollToSection('creatives')}
                className="hover:text-neon-purple transition-colors duration-300 py-2"
              >
                Creatives
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="hover:text-neon-blue transition-colors duration-300 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="hover:text-neon-blue transition-colors duration-300 py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-neon-blue transition-colors duration-300 py-2"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
