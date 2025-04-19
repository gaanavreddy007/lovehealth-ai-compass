import { Heart, ShieldCheck, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { scrollToTopSmooth } from "@/lib/scrollToTop";

const Footer = () => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    // Only scroll for left-clicks, no modifier keys
    if (
      !e.defaultPrevented &&
      e.button === 0 &&
      !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    ) {
      scrollToTopSmooth();
    }
  };

  return (
    <footer className="w-full bg-ayurveda-deepblue text-white py-8 px-4 md:px-12 mt-16 border-t border-ayurveda-sage/20">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        <div className="flex flex-col gap-3 mb-8 md:mb-0 min-w-[180px]">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded transition-shadow" onClick={handleLinkClick}>
            <Heart className="h-7 w-7 text-ayurveda-terracotta" />
            LoveHealth
          </Link>
          <p className="text-sm text-ayurveda-sage/90 max-w-xs mt-1">Your AI-powered health companion for Bengaluru and beyond.</p>
        </div>
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
          <div>
            <h4 className="font-semibold mb-3 text-base">Features</h4>
            <ul className="space-y-2">
              <li><Link to="/ayu" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>AI Chat</Link></li>
              <li><Link to="/health-tracker" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Health Tracker</Link></li>
              <li><Link to="/symptoms" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Symptom Guide</Link></li>
              <li><Link to="/providers" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Provider Finder</Link></li>
              <li><Link to="/pharmacies" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Pharmacy Locator</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-base">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>FAQ</Link></li>
              <li><Link to="/contact" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Contact</Link></li>
              <li><Link to="/about" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>About</Link></li>
              <li><Link to="/blog" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-base">Legal</h4>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded" onClick={handleLinkClick}>Disclaimer</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-ayurveda-sage/30 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-ayurveda-sage" />
          <span>Not medical advice. For emergencies, call 112.</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/gaanavreddy007/lovehealth-ai-compass" target="_blank" rel="noopener noreferrer" className="hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white rounded flex items-center gap-1">
            <Github className="h-5 w-5" />
            <span>GitHub</span>
          </a>
          <span className="hidden md:inline">|</span>
          <span> {new Date().getFullYear()} LoveHealth</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
