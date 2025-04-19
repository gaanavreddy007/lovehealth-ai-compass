import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-ayurveda-cream/30 border-t border-ayurveda-cream py-12">
      <div className="ayu-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="relative w-10 h-10 bg-gradient-to-br from-ayurveda-terracotta to-ayurveda-sage rounded-full flex items-center justify-center">
                <Heart className="text-white h-5 w-5" />
              </div>
              <span className="text-xl font-bold gradient-text">LoveHealth AI</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your compassionate AI health companion for Bengaluru residents, blending modern health advice with traditional wisdom.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-ayurveda-deepblue">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/symptoms" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Symptom Guide</Link></li>
              <li><Link to="/providers" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Healthcare Providers</Link></li>
              <li><Link to="/pharmacies" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Pharmacy Locator</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-ayurveda-deepblue">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">About Ayu</Link></li>
              <li><Link to="/faq" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">FAQ</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Health Blog</Link></li>
              <li><Link to="/contact" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-ayurveda-deepblue">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Terms of Use</Link></li>
              <li><Link to="/disclaimer" className="text-sm text-muted-foreground hover:text-ayurveda-deepblue transition-colors">Medical Disclaimer</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-ayurveda-cream/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            {new Date().getFullYear()} LoveHealth AI. All rights reserved.
          </p>
          <div className="flex items-center mt-4 md:mt-0">
            <p className="text-xs text-muted-foreground flex items-center">
              Made with <Heart size={12} className="mx-1 text-ayurveda-terracotta" /> in Bengaluru
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-xs text-muted-foreground text-center md:text-left">
          <p>Disclaimer: LoveHealth AI is not a substitute for professional medical advice, diagnosis, or treatment. Always consult qualified healthcare providers with questions about medical conditions.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
