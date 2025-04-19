import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Search, Filter, MapIcon, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import DeliveryEstimator from "@/components/pharmacies/DeliveryEstimator";
import PharmacyContact from "@/components/pharmacies/PharmacyContact";

// Pharmacy types
interface Pharmacy {
  id: number;
  name: string;
  address: string;
  area: string;
  phone: string;
  hours: string;
  isOpen24Hours: boolean;
  isOpenNow: boolean;
  hasDelivery: boolean;
  distance: string;
  deliveryTime: string;
  deliveryFee: string;
}

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [showDeliveryModal, setShowDeliveryModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  
  const { toast } = useToast();

  // Sample data - in a real app this would come from an API
  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: "MedPlus Pharmacy",
      address: "67, 80 Feet Road",
      area: "Koramangala",
      phone: "+91-80-2553-1122",
      hours: "8:00 AM - 11:00 PM",
      isOpen24Hours: false,
      isOpenNow: true,
      hasDelivery: true,
      distance: "1.2 km",
      deliveryTime: "30-45 min",
      deliveryFee: "₹40"
    },
    {
      id: 2,
      name: "Apollo Pharmacy",
      address: "14, 100 Feet Road",
      area: "Indiranagar",
      phone: "+91-80-2555-3434",
      hours: "24 Hours",
      isOpen24Hours: true,
      isOpenNow: true,
      hasDelivery: true,
      distance: "3.5 km",
      deliveryTime: "45-60 min",
      deliveryFee: "₹50"
    },
    {
      id: 3,
      name: "MedLife Pharmacy",
      address: "234, 5th Cross",
      area: "Jayanagar",
      phone: "+91-80-2664-5656",
      hours: "9:00 AM - 10:00 PM",
      isOpen24Hours: false,
      isOpenNow: true,
      hasDelivery: true,
      distance: "4.2 km",
      deliveryTime: "50-65 min",
      deliveryFee: "₹60"
    },
    {
      id: 4,
      name: "Wellness Forever",
      address: "45, 1st Cross",
      area: "HSR Layout",
      phone: "+91-80-4545-7878",
      hours: "24 Hours",
      isOpen24Hours: true,
      isOpenNow: true,
      hasDelivery: false,
      distance: "2.8 km",
      deliveryTime: "N/A",
      deliveryFee: "N/A"
    },
    {
      id: 5,
      name: "Ayurvedic Health Centre",
      address: "112, 4th Block",
      area: "Jayanagar",
      phone: "+91-80-2664-9900",
      hours: "10:00 AM - 8:00 PM",
      isOpen24Hours: false,
      isOpenNow: false,
      hasDelivery: true,
      distance: "5.1 km",
      deliveryTime: "60-75 min",
      deliveryFee: "₹70"
    }
  ];

  // Filter pharmacies based on search, tab, and area
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "open-now" && pharmacy.isOpenNow) ||
      (activeTab === "delivery" && pharmacy.hasDelivery);
    
    // Area filter
    const matchesArea = 
      selectedArea === "all" || 
      pharmacy.area === selectedArea;
    
    return matchesSearch && matchesTab && matchesArea;
  });

  // Get unique areas for filter
  const areas = Array.from(new Set(pharmacies.map(p => p.area)));

  const handleDeliveryEstimate = (pharmacy: Pharmacy) => {
    if (!pharmacy.hasDelivery) {
      toast({
        title: "Delivery Unavailable",
        description: "This pharmacy doesn't offer delivery services.",
        variant: "destructive"
      });
      return;
    }
    
    setSelectedPharmacy(pharmacy);
    setShowDeliveryModal(true);
  };

  const handleContactPharmacy = (pharmacy: Pharmacy) => {
    setSelectedPharmacy(pharmacy);
    setShowContactModal(true);
  };

  return (
    <AppLayout>
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">
          Nearby Pharmacies
        </h1>
        <p className="text-muted-foreground mb-8">
          Find pharmacies near you for medication and health supplies.
        </p>
        
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative mb-6">
            <Input
              placeholder="Search by pharmacy name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="area-filter" className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-ayurveda-sage" />
                Area
              </Label>
              <Select 
                value={selectedArea} 
                onValueChange={setSelectedArea}
              >
                <SelectTrigger id="area-filter">
                  <SelectValue placeholder="Filter by area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto">
            <TabsTrigger value="all">All Pharmacies</TabsTrigger>
            <TabsTrigger value="open-now">Open Now</TabsTrigger>
            <TabsTrigger value="delivery">Has Delivery</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPharmacies.length > 0 ? (
                filteredPharmacies.map((pharmacy) => (
                  <Card key={pharmacy.id} className="ayu-card overflow-hidden">
                    <CardContent className="p-6">
                      <div>
                        <h3 className="text-lg font-semibold text-ayurveda-deepblue">{pharmacy.name}</h3>
                        <div className="flex items-center mt-1">
                          <Badge variant={pharmacy.isOpenNow ? "outline" : "secondary"} className={pharmacy.isOpenNow ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}>
                            {pharmacy.isOpenNow ? "Open Now" : "Closed"}
                          </Badge>
                          {pharmacy.isOpen24Hours && (
                            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-800 hover:bg-blue-100">
                              24 Hours
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-start space-x-2 mt-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
                          <div>
                            <p className="text-muted-foreground">{pharmacy.address}</p>
                            <p className="text-muted-foreground">{pharmacy.area}, Bengaluru</p>
                            <p className="text-xs text-ayurveda-terracotta">{pharmacy.distance} away</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Phone className="h-4 w-4 text-ayurveda-sage" />
                          <p className="text-muted-foreground">{pharmacy.phone}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-4 w-4 text-ayurveda-sage" />
                          <p className="text-muted-foreground">Hours: {pharmacy.hours}</p>
                        </div>
                        
                        {pharmacy.hasDelivery && (
                          <div className="flex items-center space-x-2 mt-2">
                            <Truck className="h-4 w-4 text-ayurveda-sage" />
                            <div>
                              <p className="text-muted-foreground">
                                Delivery: {pharmacy.deliveryTime} • Fee: {pharmacy.deliveryFee}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button 
                          size="sm"
                          variant="outline"
                          onClick={() => handleContactPharmacy(pharmacy)}
                        >
                          <Phone className="mr-2 h-3.5 w-3.5" />
                          Contact
                        </Button>
                        
                        {pharmacy.hasDelivery && (
                          <Button 
                            size="sm"
                            onClick={() => handleDeliveryEstimate(pharmacy)}
                          >
                            <Truck className="mr-2 h-3.5 w-3.5" />
                            Delivery Options
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No pharmacies found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedArea("all");
                      setActiveTab("all");
                    }}
                    className="mt-2"
                  >
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Modals */}
      {selectedPharmacy && (
        <>
          {showDeliveryModal && (
            <DeliveryEstimator
              onCalculate={() => {}}
            />
          )}
          {showContactModal && (
            <PharmacyContact
              name={selectedPharmacy.name}
              address={selectedPharmacy.address}
              phone={selectedPharmacy.phone}
              hours={selectedPharmacy.hours}
              rating={4.5}
              isOpen={selectedPharmacy.isOpenNow}
            />
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Pharmacies;
