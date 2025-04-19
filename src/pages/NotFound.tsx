import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Home, Heart } from "lucide-react";
import AyuAvatar from "@/components/ayu/AyuAvatar";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-ayurveda-cream/20 to-background p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <AyuAvatar size="lg" isAnimating={true} />
        
        <h1 className="text-3xl font-bold text-ayurveda-deepblue mt-6">
          Page Not Found
        </h1>
        
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-4 text-ayurveda-terracotta">
            <Search className="h-5 w-5" />
            <h2 className="font-medium">Looking for something?</h2>
          </div>
          
          <div className="space-y-3 text-left text-sm text-muted-foreground">
            <p>Maybe try one of these pages:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li><Link to="/symptoms" className="text-ayurveda-deepblue hover:underline">Symptom Guide</Link></li>
              <li><Link to="/providers" className="text-ayurveda-deepblue hover:underline">Healthcare Providers</Link></li>
              <li><Link to="/pharmacies" className="text-ayurveda-deepblue hover:underline">Pharmacy Locator</Link></li>
              <li><Link to="/about" className="text-ayurveda-deepblue hover:underline">About Ayu</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-4 flex justify-center gap-4">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          
          <Button asChild variant="outline">
            <Link to="/symptoms">
              <Heart className="mr-2 h-4 w-4" />
              Talk to Ayu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
