'use client';

import { useEffect, useRef, useState } from 'react';

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey || apiKey === 'your_google_maps_api_key_here') {
      setApiKeyMissing(true);
      return;
    }

    const loadGoogleMaps = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 48.30897158531647, lng: 17.28917563487912 }, // Pezinská 154, Vinosady coordinates
          zoom: 16,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ color: '#f2f2f2' }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#eeeeee' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#7b7b7b' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{ color: '#c8d7d4' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#070707' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            }
          ]
        });

        // Add marker
        const marker = new window.google.maps.Marker({
          position: { lat: 48.30897158531647, lng: 17.28917563487912 },
          map: map,
          title: 'Pezinská 154 - Vinárstvo, 902 01 Vinosady',
          animation: window.google.maps.Animation.DROP,
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: bold;">Pezinská 154 - Vinárstvo</h3>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">902 01 Vinosady</p>
              <p style="margin: 0; color: #666; font-size: 14px;">Slovensko</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });

        setMapLoaded(true);
      }
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      script.onerror = () => {
        console.error('Failed to load Google Maps');
        setApiKeyMissing(true);
      };
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

  if (apiKeyMissing) {
    return (
      <div className="w-full h-full min-h-[500px] bg-background">
        <div className="p-6">
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
            Nájdete nás tu
          </h2>
          <div className="mb-4 text-center">
            <p className="text-foreground text-lg font-semibold mb-2">
              Putec Vinosady
            </p>
            <p className="text-foreground-muted">
              Pezinská 154, 902 01 Vinosady
            </p>
            <p className="text-foreground-muted">
              Slovensko
            </p>
          </div>
        </div>
        <div className="w-full h-96 rounded-lg shadow-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
          <div className="text-center p-8">
            <h3 className="text-xl font-bold text-gray-700 mb-4">
              Google Maps nie je nakonfigurované
            </h3>
            <div className="text-gray-600 space-y-2">
              <p>Pre zobrazenie mapy potrebujete:</p>
              <ol className="list-decimal list-inside space-y-1 text-left max-w-md mx-auto">
                <li>Získať Google Maps API kľúč na <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Cloud Console</a></li>
                <li>Vytvoriť súbor <code className="bg-gray-200 px-1 rounded">.env.local</code> v root priečinku</li>
                <li>Pridať: <code className="bg-gray-200 px-1 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here</code></li>
                <li>Reštartovať development server</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[500px] bg-background">
      <div className="p-6">
        <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
          Nájdete nás tu
        </h2>
        <div className="mb-4 text-center">
          <p className="text-foreground text-lg font-semibold mb-2">
            Pezinská 154 - Vinárstvo
          </p>
          <p className="text-foreground-muted">
            902 01 Vinosady
          </p>
          <p className="text-foreground-muted">
            Slovensko
          </p>
        </div>
      </div>
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg shadow-lg border border-gray-200"
        style={{ minHeight: '400px' }}
      />
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-2"></div>
            <p className="text-gray-600">Načítavam mapu...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}