import AppLayout from "@/components/layout/AppLayout";
import { Heart, MessageCircle, Award, Clock, Globe, Users } from "lucide-react";
import AyuAvatar from "@/components/ayu/AyuAvatar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <AppLayout>
      <div className="ayu-container py-16">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <AyuAvatar size="lg" className="mb-8" />
          <h1 className="text-4xl font-bold mb-6 text-ayurveda-deepblue">About Ayu Health Companion</h1>
          <p className="text-lg text-muted-foreground">
            Ayu is an AI-powered health companion designed to help residents of Bengaluru navigate their healthcare journey,
            blending modern medicine with traditional wisdom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-ayurveda-deepblue">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              Ayu aims to make healthcare accessible and understandable for everyone in Bengaluru. By providing easy access to health information, connecting users with appropriate healthcare providers, and helping locate needed medications, we bridge the gap between people and healthcare services.
            </p>
            <p className="text-muted-foreground">
              We believe in a holistic approach to health, integrating evidence-based modern medicine with traditional Ayurvedic wisdom when appropriate, empowering users to make informed health decisions.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-ayurveda-deepblue">How Ayu Can Help</h2>
            <ul className="space-y-4">
              <li className="flex">
                <Heart className="h-6 w-6 text-ayurveda-terracotta mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">Get guidance for common symptoms with both modern and traditional remedies</p>
              </li>
              <li className="flex">
                <MessageCircle className="h-6 w-6 text-ayurveda-terracotta mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">Chat with our AI health assistant for personalized advice</p>
              </li>
              <li className="flex">
                <Award className="h-6 w-6 text-ayurveda-terracotta mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">Find qualified healthcare providers across different specialties</p>
              </li>
              <li className="flex">
                <Clock className="h-6 w-6 text-ayurveda-terracotta mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">Book appointments with doctors who offer online booking</p>
              </li>
              <li className="flex">
                <Globe className="h-6 w-6 text-ayurveda-terracotta mr-3 flex-shrink-0" />
                <p className="text-muted-foreground">Locate nearby pharmacies and check medication availability</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-ayurveda-cream/20 p-8 rounded-2xl mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-ayurveda-deepblue text-center">Our Approach to Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Heart className="h-8 w-8 text-ayurveda-sage" />
              </div>
              <h3 className="font-medium mb-2 text-ayurveda-deepblue">Holistic Perspective</h3>
              <p className="text-sm text-muted-foreground">We consider the whole person, not just isolated symptoms, integrating multiple approaches to health and wellbeing.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Users className="h-8 w-8 text-ayurveda-terracotta" />
              </div>
              <h3 className="font-medium mb-2 text-ayurveda-deepblue">Community-Oriented</h3>
              <p className="text-sm text-muted-foreground">We are designed specifically for the Bengaluru community, considering local healthcare resources and cultural contexts.</p>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Globe className="h-8 w-8 text-ayurveda-deepblue" />
              </div>
              <h3 className="font-medium mb-2 text-ayurveda-deepblue">Evidence-Informed</h3>
              <p className="text-sm text-muted-foreground">While respecting traditional wisdom, we ensure our guidance is grounded in scientific evidence and best healthcare practices.</p>
            </div>
          </div>
        </div>

        <div className="bg-ayurveda-deepblue/10 p-8 rounded-2xl mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-ayurveda-deepblue">Medical Disclaimer</h2>
          <p className="text-muted-foreground mb-4">
            Ayu is designed to provide general health information and assist in finding healthcare resources. It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
          <p className="text-muted-foreground">
            Always seek the advice of qualified healthcare providers with any questions you may have regarding medical conditions. Never disregard professional medical advice or delay in seeking it because of something you have read on this application.
          </p>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-6 text-ayurveda-deepblue">Ready to Get Started?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-ayurveda-deepblue hover:bg-ayurveda-deepblue/90">
              <Link to="/symptoms">Talk to Ayu</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-ayurveda-sage text-ayurveda-deepblue hover:bg-ayurveda-sage/10">
              <Link to="/providers">Find Healthcare Providers</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-ayurveda-sage text-ayurveda-deepblue hover:bg-ayurveda-sage/10">
              <Link to="/pharmacies">Locate Pharmacies</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default About;