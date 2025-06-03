import { useQuery } from "@tanstack/react-query";
import { Service } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Palette, Zap, Printer, Check } from "lucide-react";

const iconMap = {
  palette: Palette,
  bolt: Zap,
  print: Printer,
};

export function ServicesSection() {
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  if (isLoading) {
    return (
      <section id="services" className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            SERVICES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-8 animate-pulse">
                <div className="h-48 bg-dark-tertiary rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!services || services.length === 0) {
    return (
      <section id="services" className="py-20 bg-dark-primary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            SERVICES
          </h2>
          <div className="text-center text-gray-400">
            <p>No services available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'neon-blue':
        return {
          gradient: 'from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]',
          text: 'text-neon-blue',
          bg: 'bg-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]'
        };
      case 'neon-pink':
        return {
          gradient: 'from-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))]',
          text: 'text-neon-pink',
          bg: 'bg-[hsl(var(--neon-pink))] to-[hsl(var(--neon-purple))]'
        };
      case 'neon-purple':
        return {
          gradient: 'from-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))]',
          text: 'text-neon-purple',
          bg: 'bg-[hsl(var(--neon-purple))] to-[hsl(var(--neon-blue))]'
        };
      default:
        return {
          gradient: 'from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]',
          text: 'text-neon-blue',
          bg: 'bg-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))]'
        };
    }
  };

  return (
    <section id="services" className="py-20 bg-dark-primary">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
          SERVICES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Palette;
            const colorClasses = getColorClasses(service.color);
            
            return (
              <div
                key={service.id}
                className="glass-effect rounded-xl p-8 hover:scale-105 transition-transform duration-300 group"
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 bg-gradient-to-r ${colorClasses.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-pulse`}>
                    <IconComponent size={24} className="text-white" />
                  </div>
                  <h3 className={`font-bold text-xl mb-2 ${colorClasses.text} font-mono tracking-wider`}>
                    {service.name}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
                
                <ul className="space-y-2 mb-6 text-sm">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="text-neon-green mr-2" size={16} />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-white mb-4">
                    ${service.priceMin}{service.priceMax ? ` - $${service.priceMax}` : ''}
                  </div>
                  <Button className={`w-full bg-gradient-to-r ${colorClasses.gradient} px-6 py-3 font-semibold hover:scale-105 transition-transform duration-300`}>
                    Get Quote
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
