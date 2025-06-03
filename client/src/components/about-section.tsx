import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold text-3xl md:text-5xl mb-8 gradient-text font-mono tracking-wider">
                ABOUT US
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                We Are Creatives is more than just a tattoo printing service – we're a community of artists, dreamers, and innovators pushing the boundaries of creative expression.
              </p>
              <p className="text-gray-300 mb-8">
                Founded by passionate tattoo artists, we understand the importance of precision, quality, and artistic integrity. Every design we create and print is crafted with the same attention to detail that goes into the tattoos themselves.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-blue font-mono">500+</div>
                  <div className="text-sm text-gray-400">Designs Created</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-pink font-mono">150+</div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-neon-purple font-mono">5+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
              
              <Button className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-pink))] px-8 py-4 font-semibold hover:scale-105 transition-transform duration-300">
                <Users className="mr-2" size={20} />
                Join Our Community
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                  alt="Creative workspace"
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                    alt="Printing equipment"
                    className="w-full h-32 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=200"
                    alt="Artistic tools"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
