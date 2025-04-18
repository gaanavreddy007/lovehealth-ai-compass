
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MapPin, Pill, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AyuAvatar from "@/components/ayu/AyuAvatar";
import AppLayout from "@/components/layout/AppLayout";

const Index = () => {
  const [showGreeting, setShowGreeting] = useState(false);
  const [isAyuAnimating, setIsAyuAnimating] = useState(false);

  useEffect(() => {
    // Show the greeting animation after a short delay
    const timer1 = setTimeout(() => setShowGreeting(true), 1000);
    const timer2 = setTimeout(() => setIsAyuAnimating(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const features = [
    {
      title: "Symptom Guide",
      description: "Get personalized health guidance with traditional and modern remedies for common ailments",
      icon: <Heart className="h-5 w-5 text-ayurveda-terracotta" />,
      link: "/symptoms",
    },
    {
      title: "Healthcare Provider Finder",
      description: "Find the right hospitals and specialists across Bengaluru neighborhoods",
      icon: <MapPin className="h-5 w-5 text-ayurveda-deepblue" />,
      link: "/providers",
    },
    {
      title: "Pharmacy Locator",
      description: "Locate nearby pharmacies with operating hours and medication delivery services",
      icon: <Pill className="h-5 w-5 text-ayurveda-sage" />,
      link: "/pharmacies",
    }
  ];

  return (
    <AppLayout>
      {/* Hero section */}
      <section className="relative bg-gradient-to-b from-ayurveda-cream/40 to-background pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="ayu-container">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-ayurveda-deepblue">
                Meet <span className="gradient-text">Ayu</span>, Your Health Companion
              </h1>
              <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
                A compassionate AI health assistant for Bengaluru residents, blending modern healthcare with traditional wisdom.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 text-white">
                  <Link to="/symptoms">
                    Talk to Ayu
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-ayurveda-sage text-ayurveda-deepblue hover:bg-ayurveda-sage/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground/70 max-w-md">
                Not a substitute for professional medical advice. Always consult qualified healthcare providers.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end mt-10 md:mt-0">
              <div className="relative">
                <div className="absolute -z-10 w-64 h-64 bg-gradient-to-r from-ayurveda-terracotta/20 to-ayurveda-sage/20 rounded-full blur-3xl"></div>
                <AyuAvatar 
                  size="lg" 
                  className="float-animation" 
                  isAnimating={isAyuAnimating}
                  showGreeting={showGreeting}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16">
        <div className="ayu-container">
          <h2 className="text-3xl font-semibold text-center mb-12 text-ayurveda-deepblue">
            How Ayu Can Help You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="ayu-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-full bg-ayurveda-cream/50 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-ayurveda-deepblue">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button asChild variant="ghost" className="p-0 hover:bg-transparent text-ayurveda-sage hover:text-ayurveda-sage/80">
                    <Link to={feature.link} className="flex items-center">
                      Explore
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials section */}
      <section className="py-16 bg-ayurveda-cream/20">
        <div className="ayu-container">
          <h2 className="text-3xl font-semibold text-center mb-12 text-ayurveda-deepblue">
            What People Say About Ayu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "Ayu helped me find a specialist for my chronic back pain. The interface is so easy to use and the advice is always helpful.",
                name: "Priya S.",
                location: "Koramangala"
              },
              {
                quote: "I love how Ayu combines modern medicine with traditional remedies. Found a great Ayurvedic doctor through the app!",
                name: "Rahul M.",
                location: "Indiranagar"
              },
              {
                quote: "The pharmacy locator saved me during a late night fever. Found a 24-hour pharmacy just 10 minutes away from my home.",
                name: "Lakshmi K.",
                location: "Whitefield"
              }
            ].map((testimonial, index) => (
              <Card key={index} className="ayu-card">
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="text-ayurveda-deepblue/80 mb-4">
                      ❝
                    </div>
                    <p className="text-muted-foreground flex-grow">{testimonial.quote}</p>
                    <div className="mt-4 pt-4 border-t border-ayurveda-cream">
                      <p className="font-medium text-ayurveda-deepblue">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20">
        <div className="ayu-container">
          <div className="bg-gradient-to-r from-ayurveda-sage/30 via-ayurveda-deepblue/20 to-ayurveda-terracotta/20 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-semibold mb-4 text-ayurveda-deepblue">Ready to Talk with Ayu?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Get personalized health guidance, find healthcare providers, or locate nearby pharmacies with your compassionate AI health companion.
            </p>
            <Button asChild size="lg" className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90 text-white">
              <Link to="/symptoms">
                Start a Conversation
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
