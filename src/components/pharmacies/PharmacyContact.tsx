import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Phone, MapPin, Clock, Mail, ExternalLink, Star, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PharmacyContactProps {
  name: string;
  address: string;
  phone: string;
  email?: string;
  hours: string;
  rating: number;
  distance?: string;
  isOpen?: boolean;
  services?: string[];
}

const PharmacyContact = ({
  name,
  address,
  phone,
  email,
  hours,
  rating,
  distance,
  isOpen = true,
  services = [],
}: PharmacyContactProps) => {
  const [showMore, setShowMore] = useState(false);

  // Generate star rating display
  const renderRating = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <Star 
          key="half-star" 
          className="h-4 w-4 text-yellow-400"
          style={{ 
            maskImage: 'linear-gradient(to right, black 50%, transparent 50%)', 
            WebkitMaskImage: 'linear-gradient(to right, black 50%, transparent 50%)'
          }}
        />
      );
    }

    // Add empty stars to make total of 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-star-${i}`} className="h-4 w-4 text-gray-300" />);
    }

    return <div className="flex items-center">{stars} <span className="ml-1 text-sm">({rating.toFixed(1)})</span></div>;
  };

  // Handle copying phone to clipboard
  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
  };

  // Handle opening phone dialer
  const handleCall = () => {
    window.open(`tel:${phone}`);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-bold">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={`text-sm font-medium ${isOpen ? 'text-green-600' : 'text-red-600'}`}>
                {isOpen ? 'Open Now' : 'Closed'}
              </span>
            </CardDescription>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <Phone className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
              <div className="flex-1">
                <p className="font-medium">{phone}</p>
                <div className="flex space-x-2 mt-2">
                  <Button size="sm" variant="outline" onClick={handleCopyPhone}>
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy
                  </Button>
                  <Button size="sm" onClick={handleCall}>
                    <Phone className="mr-2 h-3.5 w-3.5" />
                    Call
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
              <div className="flex-1">
                <p className="font-medium">{address}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
              <div>
                <p className="font-medium">Hours</p>
                <p>{hours}</p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* ...rest of the component... */}
      </CardContent>
    </Card>
  );
};

export default PharmacyContact;
