import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Search, 
  CalendarCheck, 
  Map, 
  Filter 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import BookAppointmentModal from "@/components/providers/BookAppointmentModal";
import ProviderMap from "@/components/providers/ProviderMap";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Provider types
type Specialty = 
  | "General Physician" 
  | "Pediatrician" 
  | "Gynecologist" 
  | "Dermatologist" 
  | "Cardiologist" 
  | "Orthopedic" 
  | "ENT" 
  | "Ayurvedic" 
  | "Dentist";

interface Provider {
  id: number;
  name: string;
  specialty: Specialty;
  address: string;
  area: string;
  phone: string;
  hours: string;
  isAvailableToday: boolean;
  onlineBooking: boolean;
  teleMedicine: boolean;
  languages: string[];
  rating: number;
  distance: string;
  experience: string;
}

const Providers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);

  // Sample data - in a real app this would come from an API
  const providers: Provider[] = [
    {
      id: 1,
      name: "Dr. Priya Singh",
      specialty: "General Physician",
      address: "45/1, 4th Block",
      area: "Jayanagar",
      phone: "+91-80-2664-2211",
      hours: "10:00 AM - 7:00 PM",
      isAvailableToday: true,
      onlineBooking: true,
      teleMedicine: true,
      languages: ["English", "Hindi", "Kannada"],
      rating: 4.8,
      distance: "3.2 km",
      experience: "15 years"
    },
    {
      id: 2,
      name: "Dr. Vikram Desai",
      specialty: "Cardiologist",
      address: "221, CMH Road",
      area: "Indiranagar",
      phone: "+91-80-2525-3344",
      hours: "9:00 AM - 5:00 PM",
      isAvailableToday: false,
      onlineBooking: true,
      teleMedicine: false,
      languages: ["English", "Hindi", "Gujarati"],
      rating: 4.9,
      distance: "2.4 km",
      experience: "20 years"
    },
    {
      id: 3,
      name: "Dr. Lakshmi Narayan",
      specialty: "Pediatrician",
      address: "78, 6th Cross",
      area: "Koramangala",
      phone: "+91-80-4141-5566",
      hours: "10:00 AM - 6:00 PM",
      isAvailableToday: true,
      onlineBooking: false,
      teleMedicine: true,
      languages: ["English", "Tamil", "Telugu"],
      rating: 4.7,
      distance: "1.8 km",
      experience: "12 years"
    },
    {
      id: 4,
      name: "Dr. Sanjay Gupta",
      specialty: "Orthopedic",
      address: "122, 1st Main",
      area: "HSR Layout",
      phone: "+91-80-6767-7788",
      hours: "11:00 AM - 8:00 PM",
      isAvailableToday: true,
      onlineBooking: true,
      teleMedicine: true,
      languages: ["English", "Hindi", "Bengali"],
      rating: 4.6,
      distance: "4.1 km",
      experience: "18 years"
    },
    {
      id: 5,
      name: "Dr. Meena Sharma",
      specialty: "Gynecologist",
      address: "33, 5th Main",
      area: "Indiranagar",
      phone: "+91-80-2525-8899",
      hours: "9:30 AM - 6:30 PM",
      isAvailableToday: false,
      onlineBooking: true,
      teleMedicine: true,
      languages: ["English", "Hindi", "Kannada"],
      rating: 4.9,
      distance: "2.8 km",
      experience: "22 years"
    },
    {
      id: 6,
      name: "Dr. Rajesh Kumar",
      specialty: "Ayurvedic",
      address: "56, 2nd Cross",
      area: "JP Nagar",
      phone: "+91-80-2664-0011",
      hours: "8:00 AM - 2:00 PM",
      isAvailableToday: true,
      onlineBooking: false,
      teleMedicine: false,
      languages: ["English", "Hindi", "Sanskrit"],
      rating: 4.7,
      distance: "5.6 km",
      experience: "25 years"
    }
  ];

  // Filter providers based on search, tab, and dropdowns
  const filteredProviders = providers.filter(provider => {
    // Search query filter
    const matchesSearch = searchQuery === "" || 
      provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      provider.area.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const matchesTab = 
      activeTab === "all" || 
      (activeTab === "available" && provider.isAvailableToday) ||
      (activeTab === "telemedicine" && provider.teleMedicine);
    
    // Specialty filter
    const matchesSpecialty = 
      selectedSpecialty === "all" || 
      provider.specialty === selectedSpecialty;
    
    // Area filter
    const matchesArea = 
      selectedArea === "all" || 
      provider.area === selectedArea;
    
    return matchesSearch && matchesTab && matchesSpecialty && matchesArea;
  });

  // Get unique specialties and areas for filters
  const specialties = Array.from(new Set(providers.map(p => p.specialty)));
  const areas = Array.from(new Set(providers.map(p => p.area)));

  const handleBookAppointment = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowAppointmentModal(true);
  };

  const handleShowMap = (provider: Provider) => {
    setSelectedProvider(provider);
    setShowMapModal(true);
  };

  return (
    <AppLayout>
      <div className="ayu-container max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
        <h1 className="text-3xl font-bold mb-2 text-ayurveda-deepblue">Healthcare Providers</h1>
        <p className="text-muted-foreground mb-8">
          Find qualified healthcare providers and specialists in Bengaluru.
        </p>
        
        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="relative mb-6">
            <Input
              placeholder="Search by doctor name, specialty, or area..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty-filter" className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-ayurveda-sage" />
                Specialty
              </Label>
              <Select 
                value={selectedSpecialty} 
                onValueChange={setSelectedSpecialty}
              >
                <SelectTrigger id="specialty-filter">
                  <SelectValue placeholder="Filter by specialty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specialties</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
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
            <TabsTrigger value="all">All Providers</TabsTrigger>
            <TabsTrigger value="available">Available Today</TabsTrigger>
            <TabsTrigger value="telemedicine">Telemedicine</TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeTab} className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProviders.length > 0 ? (
                filteredProviders.map((provider) => (
                  <Card key={provider.id} className="ayu-card overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-ayurveda-deepblue">{provider.name}</h3>
                          <p className="text-sm text-ayurveda-terracotta">
                            {provider.specialty} • {provider.experience}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{provider.rating}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <div className="flex items-start space-x-2 mt-2">
                          <MapPin className="h-4 w-4 mt-0.5 text-ayurveda-sage" />
                          <div>
                            <p className="text-muted-foreground">{provider.address}</p>
                            <p className="text-muted-foreground">{provider.area}, Bengaluru</p>
                            <p className="text-xs text-ayurveda-terracotta">{provider.distance} away</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-3">
                          <Phone className="h-4 w-4 text-ayurveda-sage" />
                          <p className="text-muted-foreground">{provider.phone}</p>
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Clock className="h-4 w-4 text-ayurveda-sage" />
                          <p className="text-muted-foreground">Hours: {provider.hours}</p>
                          {provider.isAvailableToday && (
                            <Badge className="ml-2 bg-green-500 hover:bg-green-600">Available Today</Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="text-xs text-muted-foreground">
                            Languages: {provider.languages.join(", ")}
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {provider.onlineBooking && (
                            <Badge variant="secondary">Online Booking</Badge>
                          )}
                          {provider.teleMedicine && (
                            <Badge variant="secondary">Telemedicine</Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {provider.onlineBooking && (
                          <Button 
                            size="sm"
                            onClick={() => handleBookAppointment(provider)}
                          >
                            <CalendarCheck className="mr-2 h-3.5 w-3.5" />
                            Book Appointment
                          </Button>
                        )}
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleShowMap(provider)}
                        >
                          <Map className="mr-2 h-3.5 w-3.5" />
                          View on Map
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-2 text-center py-12">
                  <p className="text-muted-foreground">No providers found matching your criteria.</p>
                  <Button 
                    variant="link" 
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedSpecialty("all");
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
      {selectedProvider && (
        <>
          {showAppointmentModal && (
            <BookAppointmentModal
              isOpen={showAppointmentModal}
              onClose={() => setShowAppointmentModal(false)}
              providerName={selectedProvider.name}
            />
          )}
          {showMapModal && (
            <ProviderMap
              providers={[
                {
                  id: selectedProvider.id,
                  name: selectedProvider.name,
                  speciality: selectedProvider.specialty,
                  address: selectedProvider.address,
                  area: selectedProvider.area,
                  latitude: 12.9716,
                  longitude: 77.5946
                }
              ]}
              selectedProviderId={selectedProvider.id}
              center={{ lat: 12.9716, lng: 77.5946 }}
              zoom={14}
            />
          )}
        </>
      )}
    </AppLayout>
  );
};

export default Providers;
