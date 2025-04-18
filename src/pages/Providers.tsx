
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Phone, Clock, Star, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookAppointmentModal from "@/components/providers/BookAppointmentModal";
import ProviderMap from "@/components/providers/ProviderMap";

interface Provider {
  id: number;
  name: string;
  type: "Hospital" | "Clinic" | "Specialist";
  specialties: string[];
  address: string;
  area: string;
  phone: string;
  rating: number;
  hours: string;
  distance: string;
}

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [bookingProvider, setBookingProvider] = useState<Provider | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showDetailsId, setShowDetailsId] = useState<number | null>(null);

  // Sample data - in a real app this would come from an API
  const providers: Provider[] = [
    {
      id: 1,
      name: "Apollo Hospital",
      type: "Hospital",
      specialties: ["Multi-specialty", "Emergency Care", "Surgery"],
      address: "154/11, Bannerghatta Road",
      area: "Bannerghatta",
      phone: "+91-80-4612-4444",
      rating: 4.5,
      hours: "24 hours",
      distance: "3.2 km"
    },
    {
      id: 2,
      name: "Manipal Hospital",
      type: "Hospital",
      specialties: ["Cardiology", "Neurology", "Orthopedics"],
      address: "98, HAL Airport Road",
      area: "Indiranagar",
      phone: "+91-80-2502-4444",
      rating: 4.7,
      hours: "24 hours",
      distance: "5.5 km"
    },
    {
      id: 3,
      name: "Dr. Sharma's Clinic",
      type: "Clinic",
      specialties: ["General Medicine", "Family Practice"],
      address: "45, 100 Feet Road",
      area: "Koramangala",
      phone: "+91-98765-43210",
      rating: 4.3,
      hours: "10:00 AM - 8:00 PM",
      distance: "1.8 km"
    },
    {
      id: 4,
      name: "Ayurveda Wellness Center",
      type: "Clinic",
      specialties: ["Ayurveda", "Holistic Health", "Panchakarma"],
      address: "23, 5th Block",
      area: "Jayanagar",
      phone: "+91-80-2663-1111",
      rating: 4.8,
      hours: "9:00 AM - 7:00 PM",
      distance: "4.7 km"
    },
    {
      id: 5,
      name: "Dr. Patel - Neurologist",
      type: "Specialist",
      specialties: ["Neurology", "Headaches", "Stroke Management"],
      address: "Brigade Road Medical Center",
      area: "MG Road",
      phone: "+91-99887-76655",
      rating: 4.9,
      hours: "11:00 AM - 6:00 PM",
      distance: "3.9 km"
    },
    {
      id: 6,
      name: "Fortis Hospital",
      type: "Hospital",
      specialties: ["Cardiology", "Oncology", "Gastroenterology"],
      address: "154, Bannerghatta Main Road",
      area: "Bannerghatta",
      phone: "+91-80-6621-4444",
      rating: 4.6,
      hours: "24 hours",
      distance: "3.5 km"
    }
  ];

  const filteredProviders = providers
    .filter(provider => {
      // Filter based on search query
      if (searchQuery === "") return true;
      return (
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        provider.area.toLowerCase().includes(searchQuery.toLowerCase())
      );
    })
    .filter(provider => {
      // Filter based on active tab
      if (activeTab === "all") return true;
      return provider.type.toLowerCase() === activeTab.toLowerCase();
    });

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i - rating < 1 && i - rating > 0) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 opacity-50" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  const handleBookAppointment = (provider: Provider) => {
    setBookingProvider(provider);
    setShowBookingModal(true);
  };

  const handleViewDetails = (id: number) => {
    setShowDetailsId(showDetailsId === id ? null : id);
  };

  return (
    <AppLayout>
      <div className="ayu-container py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Healthcare Provider Finder</h1>
        <p className="text-muted-foreground mb-8">
          Find hospitals, clinics, and specialists across Bengaluru to meet your healthcare needs.
        </p>

        {/* Search and filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              placeholder="Search by name, specialty, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter Options
          </Button>
        </div>

        {/* Tabs for provider types */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="hospital">Hospitals</TabsTrigger>
            <TabsTrigger value="clinic">Clinics</TabsTrigger>
            <TabsTrigger value="specialist">Specialists</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Provider listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProviders.length > 0 ? (
            filteredProviders.map((provider) => (
              <Card key={provider.id} className="ayu-card overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-ayurveda-deepblue">{provider.name}</h3>
                      <div className="flex items-center mt-1">
                        {renderStars(provider.rating)}
                        <span className="ml-2 text-sm text-muted-foreground">{provider.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <Badge variant={
                      provider.type === "Hospital" ? "default" :
                      provider.type === "Clinic" ? "secondary" : "outline"
                    }>
                      {provider.type}
                    </Badge>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-start space-x-2 mt-2 text-sm">
                      <MapPin className="h-4 w-4 mt-0.5 text-ayurveda-terracotta" />
                      <div>
                        <p className="text-muted-foreground">{provider.address}</p>
                        <p className="text-muted-foreground">{provider.area}, Bengaluru</p>
                        <p className="text-xs text-ayurveda-deepblue mt-1">Distance: {provider.distance}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-3 text-sm">
                      <Phone className="h-4 w-4 text-ayurveda-terracotta" />
                      <p className="text-muted-foreground">{provider.phone}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-2 text-sm">
                      <Clock className="h-4 w-4 text-ayurveda-terracotta" />
                      <p className="text-muted-foreground">{provider.hours}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-3 border-t border-border">
                    <h4 className="text-sm font-medium mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {provider.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="bg-ayurveda-cream/50 text-ayurveda-deepblue">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {showDetailsId === provider.id && (
                    <div className="mt-4 animate-fade-in">
                      <ProviderMap address={provider.address} area={provider.area} />
                    </div>
                  )}
                  
                  <div className="mt-4 flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDetails(provider.id)}
                    >
                      {showDetailsId === provider.id ? "Hide Details" : "View Details"}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleBookAppointment(provider)}
                    >
                      Book Appointment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-2 text-center py-12">
              <p className="text-muted-foreground">No healthcare providers found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      {bookingProvider && (
        <BookAppointmentModal 
          isOpen={showBookingModal} 
          onClose={() => setShowBookingModal(false)} 
          providerName={bookingProvider.name} 
        />
      )}
    </AppLayout>
  );
};

export default Providers;
