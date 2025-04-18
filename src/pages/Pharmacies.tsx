
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Clock, Truck, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Pharmacy {
  id: number;
  name: string;
  address: string;
  area: string;
  phone: string;
  hours: string;
  delivers: boolean;
  is24Hours: boolean;
  distance: string;
}

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeliveryOnly, setShowDeliveryOnly] = useState(false);
  const [show24HoursOnly, setShow24HoursOnly] = useState(false);

  // Sample data - in a real app this would come from an API
  const pharmacies: Pharmacy[] = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      address: "75, 100 Feet Road",
      area: "Indiranagar",
      phone: "+91-80-2525-1111",
      hours: "24 Hours",
      delivers: true,
      is24Hours: true,
      distance: "2.1 km"
    },
    {
      id: 2,
      name: "MedPlus",
      address: "23, 80 Feet Road",
      area: "Koramangala 4th Block",
      phone: "+91-80-4141-2222",
      hours: "8:00 AM - 11:00 PM",
      delivers: true,
      is24Hours: false,
      distance: "1.5 km"
    },
    {
      id: 3,
      name: "Wellness Forever",
      address: "12th Main, HSR Layout",
      area: "HSR Layout",
      phone: "+91-80-6767-3333",
      hours: "24 Hours",
      delivers: true,
      is24Hours: true,
      distance: "3.8 km"
    },
    {
      id: 4,
      name: "Krishna Medical",
      address: "45, 5th Block",
      area: "Jayanagar",
      phone: "+91-80-2662-4444",
      hours: "9:00 AM - 10:00 PM",
      delivers: false,
      is24Hours: false,
      distance: "5.2 km"
    },
    {
      id: 5,
      name: "Himalaya Wellness",
      address: "Forum Mall, 1st Floor",
      area: "Koramangala",
      phone: "+91-80-2222-5555",
      hours: "10:00 AM - 9:00 PM",
      delivers: true,
      is24Hours: false,
      distance: "1.7 km"
    },
    {
      id: 6,
      name: "MediLife Pharmacy",
      address: "Whitefield Main Road",
      area: "Whitefield",
      phone: "+91-80-2846-6666",
      hours: "24 Hours",
      delivers: true,
      is24Hours: true,
      distance: "8.4 km"
    }
  ];

  // Filter pharmacies based on search query and filters
  const filteredPharmacies = pharmacies.filter(pharmacy => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pharmacy.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Delivery filter
    const matchesDelivery = !showDeliveryOnly || pharmacy.delivers;
    
    // 24 Hours filter
    const matches24Hours = !show24HoursOnly || pharmacy.is24Hours;
    
    return matchesSearch && matchesDelivery && matches24Hours;
  });

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Pharmacy Locator</h1>
        <p className="text-muted-foreground mb-8">
          Find nearby pharmacies with delivery services and operating hours across Bengaluru.
        </p>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative mb-4">
            <Input
              placeholder="Search by pharmacy name or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="delivery-filter"
                checked={showDeliveryOnly}
                onCheckedChange={setShowDeliveryOnly}
              />
              <Label htmlFor="delivery-filter">Delivery Available</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="24hours-filter"
                checked={show24HoursOnly}
                onCheckedChange={setShow24HoursOnly}
              />
              <Label htmlFor="24hours-filter">Open 24 Hours</Label>
            </div>
          </div>
        </div>

        {/* Pharmacy listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPharmacies.length > 0 ? (
            filteredPharmacies.map((pharmacy) => (
              <Card key={pharmacy.id} className="ayu-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-ayurveda-deepblue">{pharmacy.name}</h3>
                    <div className="flex space-x-2">
                      {pharmacy.is24Hours && (
                        <Badge className="bg-ayurveda-sage text-white">24 Hours</Badge>
                      )}
                      {pharmacy.delivers && (
                        <Badge className="bg-ayurveda-terracotta text-white">Delivers</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-start space-x-2 mt-2 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
                      <div>
                        <p className="text-muted-foreground">{pharmacy.address}</p>
                        <p className="text-muted-foreground">{pharmacy.area}, Bengaluru</p>
                        <p className="text-xs text-ayurveda-deepblue mt-1">Distance: {pharmacy.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3 text-sm">
                      <Phone className="h-4 w-4 text-ayurveda-sage" />
                      <p className="text-muted-foreground">{pharmacy.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2 text-sm">
                      <Clock className="h-4 w-4 text-ayurveda-sage" />
                      <p className="text-muted-foreground">{pharmacy.hours}</p>
                    </div>
                    
                    {pharmacy.delivers && (
                      <div className="flex items-center space-x-2 mt-2 text-sm">
                        <Truck className="h-4 w-4 text-ayurveda-sage" />
                        <p className="text-muted-foreground">Delivery available</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <Button variant="outline" size="sm">View on Map</Button>
                    <Button size="sm">Contact</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No pharmacies found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Pharmacies;
