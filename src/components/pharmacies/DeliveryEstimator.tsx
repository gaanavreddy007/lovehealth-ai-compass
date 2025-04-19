import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Clock, MapPin, Truck, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DeliveryEstimatorProps {
  onCalculate?: (data: {
    pincode: string;
    estimatedTime: string;
    charge: string;
    distance: string;
  }) => void;
}

const DeliveryEstimator = ({ onCalculate }: DeliveryEstimatorProps) => {
  const [pincode, setPincode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [calculatedData, setCalculatedData] = useState<{
    estimatedTime: string;
    charge: string;
    distance: string;
  } | null>(null);
  
  const { toast } = useToast();
  
  // For demo purposes, we'll simulate the calculation
  const calculateDelivery = () => {
    if (!pincode || pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      toast({
        title: "Invalid Pincode",
        description: "Please enter a valid 6-digit pincode",
        variant: "destructive",
      });
      return;
    }
    
    setLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      // Generate random data based on pincode
      const lastDigit = parseInt(pincode.slice(-1));
      
      // Simulate different delivery times based on last digit
      let estimatedTime, charge, distance;
      
      if (lastDigit < 3) {
        // Nearby areas (fast delivery)
        estimatedTime = "30-45 minutes";
        charge = "₹35";
        distance = "3.2 km";
      } else if (lastDigit < 6) {
        // Medium distance
        estimatedTime = "45-60 minutes";
        charge = "₹50";
        distance = "5.8 km";
      } else if (lastDigit < 9) {
        // Farther distance
        estimatedTime = "60-90 minutes";
        charge = "₹75";
        distance = "8.4 km";
      } else {
        // Remote areas
        estimatedTime = "90-120 minutes";
        charge = "₹100";
        distance = "12.7 km";
      }
      
      const result = { estimatedTime, charge, distance };
      setCalculatedData(result);
      
      if (onCalculate) {
        onCalculate({
          pincode,
          ...result
        });
      }
      
      setLoading(false);
    }, 1500); // Simulate a 1.5s calculation process
  };
  
  const resetCalculation = () => {
    setPincode("");
    setCalculatedData(null);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Truck className="mr-2 h-5 w-5 text-ayurveda-sage" />
          Medication Delivery Calculator
        </CardTitle>
        <CardDescription>
          Check delivery time and charges for your location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pincode">Your Pincode</Label>
          <div className="flex space-x-2">
            <Input
              id="pincode"
              placeholder="Enter 6-digit pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              maxLength={6}
              className="flex-1"
            />
            <Button
              onClick={calculateDelivery}
              disabled={loading || !pincode}
            >
              {loading ? "Calculating..." : "Calculate"}
            </Button>
          </div>
        </div>
        
        {calculatedData && (
          <div className="mt-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm relative">
            <button 
              onClick={resetCalculation}
              className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              aria-label="Clear results"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-ayurveda-sage" />
                <div>
                  <p className="text-sm font-medium">Delivery Location</p>
                  <p className="text-sm text-muted-foreground">Pincode: {pincode}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-ayurveda-sage" />
                <div>
                  <p className="text-sm font-medium">Estimated Delivery Time</p>
                  <p className="text-sm text-muted-foreground">{calculatedData.estimatedTime}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-ayurveda-sage" />
                <div>
                  <p className="text-sm font-medium">Delivery Charge</p>
                  <p className="text-sm text-muted-foreground">{calculatedData.charge} ({calculatedData.distance})</p>
                </div>
              </div>
            </div>
            
            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="delivery-info">
                <AccordionTrigger>Delivery Information</AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm space-y-2 text-muted-foreground">
                    <p>• Prescription medicines require a valid doctor's prescription</p>
                    <p>• Orders placed after 8 PM might be delivered the next day</p>
                    <p>• Payment can be made online or cash on delivery</p>
                    <p>• Free delivery for orders above ₹500</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DeliveryEstimator;
