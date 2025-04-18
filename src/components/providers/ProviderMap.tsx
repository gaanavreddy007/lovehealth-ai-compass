
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { MapPin } from "lucide-react";

interface ProviderMapProps {
  address: string;
  area: string;
}

const ProviderMap = ({ address, area }: ProviderMapProps) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleDirections = () => {
    toast({
      title: "Directions",
      description: `Directions to ${address}, ${area} would open in maps app`,
    });
  };
  
  return (
    <div 
      onClick={handleDirections}
      className="relative w-full h-[120px] bg-muted rounded-md overflow-hidden cursor-pointer group"
    >
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
        </div>
      )}
      
      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end transition-opacity ${isMapLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="p-3 text-white flex items-center space-x-1.5">
          <MapPin className="h-4 w-4" />
          <span className="text-xs font-medium truncate">View on Map</span>
        </div>
      </div>
      
      {isMapLoaded && (
        <div className="absolute inset-0 bg-ayurveda-deepblue/10">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-ayurveda-terracotta rounded-full h-6 w-6 flex items-center justify-center">
            <MapPin className="h-4 w-4 text-white" />
          </div>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  );
};

export default ProviderMap;
