'use client';

import { useEffect, useRef } from 'react';

export default function GoogleMaps() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadGoogleMaps = () => {
      if (window.google && mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 48.2897, lng: 17.2667 }, // Vinosady coordinates
          zoom: 15,
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
          position: { lat: 48.2897, lng: 17.2667 },
          map: map,
          title: 'Putec Vinosady',
          animation: window.google.maps.Animation.DROP,
        });

        // Add info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px; font-weight: bold;">Putec Vinosady</h3>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">Pezinská 154</p>
              <p style="margin: 0 0 5px 0; color: #666; font-size: 14px;">902 01 Vinosady</p>
              <p style="margin: 0; color: #666; font-size: 14px;">Slovensko</p>
            </div>
          `,
        });

        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
      }
    };

    // Load Google Maps script if not already loaded
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = loadGoogleMaps;
      document.head.appendChild(script);
    } else {
      loadGoogleMaps();
    }
  }, []);

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
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg shadow-lg border border-gray-200"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    google: any;
  }
}
