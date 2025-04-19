import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";

interface ProviderMapProps {
  providers: {
    id: number;
    name: string;
    speciality: string;
    address: string;
    area: string;
    latitude: number;
    longitude: number;
  }[];
  selectedProviderId?: number;
  onSelectProvider?: (id: number) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

const ProviderMap = ({
  providers,
  selectedProviderId,
  onSelectProvider,
  center = { lat: 12.9716, lng: 77.5946 }, // Default to Bangalore coordinates
  zoom = 12
}: ProviderMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Load Google Maps API script if not already loaded
    if (!window.google && !document.getElementById('google-maps-script')) {
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else if (window.google && !mapInstanceRef.current) {
      initMap();
    }

    return () => {
      // Clean up markers on unmount if needed
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  useEffect(() => {
    // Add markers once the map is initialized
    if (mapInstanceRef.current) {
      addMarkers();
    }
  }, [providers, mapInstanceRef.current]);

  useEffect(() => {
    // Highlight selected marker
    if (mapInstanceRef.current && selectedProviderId) {
      highlightSelectedMarker();
    }
  }, [selectedProviderId]);

  const initMap = () => {
    if (mapRef.current && window.google) {
      const mapOptions = {
        center: center,
        zoom: zoom,
        disableDefaultUI: true,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        styles: [
          {
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{ visibility: 'off' }]
          }
        ]
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      mapInstanceRef.current = map;

      if (providers.length > 0) {
        addMarkers();
      }
    }
  };

  const addMarkers = () => {
    if (!mapInstanceRef.current) return;

    // Clear any existing markers
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];

    // Add new markers
    providers.forEach(provider => {
      const marker = new window.google.maps.Marker({
        position: { lat: provider.latitude, lng: provider.longitude },
        map: mapInstanceRef.current,
        title: provider.name,
        icon: {
          url: selectedProviderId === provider.id 
            ? 'https://maps.google.com/mapfiles/ms/icons/green-dot.png' 
            : 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        },
        animation: window.google.maps.Animation.DROP,
        optimized: false
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px; max-width: 200px;">
            <h3 style="margin: 0; font-size: 16px; font-weight: 600;">${provider.name}</h3>
            <p style="margin: 4px 0 0; color: #666;">${provider.speciality}</p>
            <p style="margin: 4px 0 0; font-size: 12px;">${provider.address}, ${provider.area}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
        if (onSelectProvider) {
          onSelectProvider(provider.id);
        }
      });

      markersRef.current.push(marker);
    });
  };

  const highlightSelectedMarker = () => {
    markersRef.current.forEach((marker, index) => {
      if (providers[index].id === selectedProviderId) {
        marker.setIcon({
          url: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        });
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(() => {
          marker.setAnimation(null);
        }, 1500);
        
        // Center map on selected marker
        mapInstanceRef.current.panTo(marker.getPosition());
        mapInstanceRef.current.setZoom(14);
      } else {
        marker.setIcon({
          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          scaledSize: new window.google.maps.Size(40, 40)
        });
      }
    });
  };

  return (
    <Card className="overflow-hidden border border-muted rounded-lg shadow-sm h-[500px]">
      <div 
        ref={mapRef} 
        className="w-full h-full"
        style={{ position: 'relative' }}
      >
        {!window.google && (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProviderMap;
