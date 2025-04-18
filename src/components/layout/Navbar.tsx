
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Heart, MapPin, Pill } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="ayu-container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
              <Heart className="text-white h-5 w-5 animate-pulse-glow" />
            </div>
            <span className="text-xl font-bold gradient-text">LoveHealth AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/symptoms" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <Heart size={18} />
              <span>Symptom Guide</span>
            </Link>
            <Link to="/providers" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <MapPin size={18} />
              <span>Healthcare Providers</span>
            </Link>
            <Link to="/pharmacies" className="flex items-center space-x-2 text-foreground/80 hover:text-ayurveda-deepblue transition-colors">
              <Pill size={18} />
              <span>Pharmacies</span>
            </Link>
            <Button variant="outline" className="border-ayurveda-sage text-ayurveda-deepblue hover:bg-ayurveda-sage/10">
              Login
            </Button>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 animate-fade-in">
            <Link to="/symptoms" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <Heart size={18} />
                <span>Symptom Guide</span>
              </div>
            </Link>
            <Link to="/providers" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Healthcare Providers</span>
              </div>
            </Link>
            <Link to="/pharmacies" className="block py-2 px-4 rounded-md hover:bg-muted">
              <div className="flex items-center space-x-2">
                <Pill size={18} />
                <span>Pharmacies</span>
              </div>
            </Link>
            <div className="pt-2">
              <Button variant="outline" className="w-full border-ayurveda-sage text-ayurveda-deepblue hover:bg-ayurveda-sage/10">
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
