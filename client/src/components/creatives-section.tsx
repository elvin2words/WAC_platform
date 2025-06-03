import { useQuery } from "@tanstack/react-query";
import { CreativeProfile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Instagram, ExternalLink, Users, Heart } from "lucide-react";

export function CreativesSection() {
  const { data: creatives, isLoading } = useQuery<CreativeProfile[]>({
    queryKey: ["/api/creatives"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-dark-tertiary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            FEATURED CREATIVES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="glass-effect rounded-xl p-6 animate-pulse">
                <div className="h-48 bg-dark-secondary rounded-lg mb-4"></div>
                <div className="h-6 bg-dark-secondary rounded mb-2"></div>
                <div className="h-4 bg-dark-secondary rounded mb-4"></div>
                <div className="h-20 bg-dark-secondary rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!creatives || creatives.length === 0) {
    return (
      <section className="py-20 bg-dark-tertiary">
        <div className="container mx-auto px-4">
          <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
            FEATURED CREATIVES
          </h2>
          <div className="text-center text-gray-400">
            <p>No creative profiles available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="creatives" className="py-20 bg-dark-tertiary">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl md:text-5xl text-center mb-16 gradient-text font-mono tracking-wider">
          FEATURED CREATIVES
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {creatives.map((creative) => (
            <div
              key={creative.id}
              className="glass-effect rounded-xl p-6 hover:scale-105 transition-transform duration-300 group"
            >
              {/* Profile Image */}
              <div className="relative mb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden bg-dark-secondary">
                  {creative.profileImageUrl ? (
                    <img
                      src={creative.profileImageUrl}
                      alt={creative.artistName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Users className="text-gray-500" size={48} />
                    </div>
                  )}
                </div>
                {creative.isVerified && (
                  <div className="absolute top-2 right-2 w-8 h-8 bg-neon-blue rounded-full flex items-center justify-center">
                    <Star className="text-white" size={16} fill="currentColor" />
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="mb-4">
                <h3 className="font-bold text-xl mb-2 text-neon-blue font-mono tracking-wider">
                  {creative.artistName}
                </h3>
                
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-neon-pink border-neon-pink">
                    {creative.specialty}
                  </Badge>
                  {creative.rating !== "0.00" && (
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400" size={14} fill="currentColor" />
                      <span className="text-sm text-gray-300">{creative.rating}</span>
                      <span className="text-sm text-gray-500">({creative.totalReviews})</span>
                    </div>
                  )}
                </div>

                {creative.location && (
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="text-gray-400" size={14} />
                    <span className="text-sm text-gray-400">{creative.location}</span>
                  </div>
                )}

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {creative.bio || "Passionate creative artist bringing unique visions to life."}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mb-4">
                {creative.instagramHandle && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-dark-secondary border-gray-600 hover:bg-neon-pink hover:scale-105 transition-all duration-300"
                  >
                    <Instagram size={16} className="mr-1" />
                    IG
                  </Button>
                )}
                {creative.portfolioWebsite && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 bg-dark-secondary border-gray-600 hover:bg-neon-blue hover:scale-105 transition-all duration-300"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Portfolio
                  </Button>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300"
                >
                  View Work
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-black transition-all duration-300"
                >
                  <Heart size={16} className="mr-1" />
                  Collaborate
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Join Community CTA */}
        <div className="text-center mt-16">
          <div className="glass-effect rounded-xl p-8 max-w-2xl mx-auto">
            <h3 className="font-bold text-2xl mb-4 text-neon-blue font-mono tracking-wider">
              JOIN OUR CREATIVE COMMUNITY
            </h3>
            <p className="text-gray-300 mb-6">
              Are you a tattoo artist, illustrator, or creative professional? Join our platform to showcase your work, collaborate with other artists, and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-[hsl(var(--neon-blue))] to-[hsl(var(--neon-purple))] px-8 py-3 font-semibold hover:scale-105 transition-transform duration-300">
                <Users className="mr-2" size={20} />
                Become a Creative
              </Button>
              <Button
                variant="outline"
                className="border-2 border-neon-pink text-neon-pink px-8 py-3 font-semibold hover:bg-neon-pink hover:text-black transition-all duration-300"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}