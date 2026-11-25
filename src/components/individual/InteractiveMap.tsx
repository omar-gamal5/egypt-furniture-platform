import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for leaflet marker icons
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface MapLocation {
  id: string;
  name: string;
  description?: string;
  location: string;
  coordinates: [number, number]; // [latitude, longitude]
  imageUrl?: string;
}

interface InteractiveMapProps {
  locations: MapLocation[];
  height?: string;
  width?: string;
  zoom?: number;
  center?: [number, number];
  onMarkerClick?: (location: MapLocation) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  locations,
  height = '400px',
  width = '100%',
  zoom = 10,
  center,
  onMarkerClick
}) => {
  // If no center is provided, use the average of all locations or default to Cairo
  const mapCenter = center || (
    locations.length > 0 
      ? [
          locations.reduce((sum, loc) => sum + loc.coordinates[0], 0) / locations.length,
          locations.reduce((sum, loc) => sum + loc.coordinates[1], 0) / locations.length
        ] as [number, number]
      : [30.0444, 31.2357] // Cairo coordinates as default
  );

  return (
    <div style={{ height, width }} className="rounded-lg overflow-hidden shadow-md">
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={loc.coordinates}
            eventHandlers={{
              click: () => onMarkerClick && onMarkerClick(loc)
            }}
          >
            <Popup>
              <div className="flex flex-col space-y-2">
                {loc.imageUrl && (
                  <img 
                    src={loc.imageUrl} 
                    alt={loc.name} 
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}
                <h3 className="text-lg font-semibold">{loc.name}</h3>
                <p className="text-sm text-gray-600">{loc.location}</p>
                {loc.description && (
                  <p className="text-sm">{loc.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default InteractiveMap;