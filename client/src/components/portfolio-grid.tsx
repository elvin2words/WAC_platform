import { useQuery } from "@tanstack/react-query";
import { PortfolioItem } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Images } from "lucide-react";
import { useLightbox } from "@/hooks/use-lightbox";
import { Lightbox } from "./lightbox";

export function PortfolioGrid() {
  const { openLightbox, ...lightboxProps } = useLightbox();

  const { data: portfolioItems, isLoading } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio/featured"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            FEATURED WORK
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-square bg-dark-tertiary rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!portfolioItems || portfolioItems.length === 0) {
    return (
      <section className="py-20 bg-dark-secondary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            FEATURED WORK
          </h2>
          <div className="text-center text-gray-400">
            <p>No portfolio items available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
          FEATURED WORK
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="aspect-square bg-dark-tertiary rounded-lg overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => openLightbox({
                id: item.id,
                title: item.title,
                description: item.description,
                imageUrl: item.imageUrl
              })}
            >
              <div className="relative w-full h-full">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-300">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="border-2 border-neon-blue text-neon-blue px-8 py-3 font-semibold hover:bg-neon-blue hover:text-black transition-all duration-300"
          >
            <Images className="mr-2" size={20} />
            View Full Portfolio
          </Button>
        </div>
      </div>
      
      <Lightbox {...lightboxProps} />
    </section>
  );
}
