
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Truck } from "lucide-react";

interface DeliveryEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  pharmacyName: string;
  distance: string;
}

const DeliveryEstimator = ({ isOpen, onClose, pharmacyName, distance }: DeliveryEstimatorProps) => {
  const [address, setAddress] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState<string | null>(null);
  const { toast } = useToast();
  
  const handleEstimate = () => {
    if (!address.trim()) {
      toast({
        title: "Please enter delivery address",
        variant: "destructive",
      });
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate API call
    setTimeout(() => {
      // Calculate based on distance (just for demo)
      const distanceNum = parseFloat(distance);
      let time = "30-45 minutes";
      
      if (distanceNum < 2) {
        time = "20-30 minutes";
      } else if (distanceNum > 5) {
        time = "45-60 minutes";
      }
      
      setEstimatedTime(time);
      setIsCalculating(false);
    }, 1500);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delivery Estimation</DialogTitle>
          <DialogDescription>
            Check estimated delivery time from {pharmacyName}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="delivery-address">Delivery Address</Label>
            <Input 
              id="delivery-address" 
              placeholder="Enter your complete address" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          
          <Button 
            type="button" 
            onClick={handleEstimate}
            disabled={isCalculating}
            className="w-full"
          >
            {isCalculating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Calculating...
              </>
            ) : (
              <>
                <Truck className="mr-2 h-4 w-4" />
                Calculate Delivery Time
              </>
            )}
          </Button>
          
          {estimatedTime && (
            <div className="p-4 bg-ayurveda-cream/20 rounded-md border border-ayurveda-cream/40 mt-4">
              <h4 className="font-medium text-ayurveda-deepblue">Estimated Delivery Time</h4>
              <p className="text-muted-foreground">{estimatedTime}</p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                Actual delivery time may vary based on traffic conditions and pharmacy processing time.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeliveryEstimator;
