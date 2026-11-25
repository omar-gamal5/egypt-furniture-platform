import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import InteractiveMap from '../InteractiveMap';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: jest.fn(({ children, center, zoom, style, className }) => (
    <div data-testid="map-container" style={style} className={className}>
      <div data-testid="map-center">{JSON.stringify(center)}</div>
      <div data-testid="map-zoom">{zoom}</div>
      {children}
    </div>
  )),
  TileLayer: jest.fn(({ url, attribution }) => (
    <div data-testid="tile-layer">
      <div data-testid="tile-url">{url}</div>
      <div data-testid="tile-attribution">{attribution}</div>
    </div>
  )),
  Marker: jest.fn(({ position, children }) => (
    <div data-testid="map-marker">
      <div data-testid="marker-position">{JSON.stringify(position)}</div>
      {children}
    </div>
  )),
  Popup: jest.fn(({ children }) => (
    <div data-testid="map-popup">{children}</div>
  )),
}));

// Mock Leaflet to avoid issues with missing L object
jest.mock('leaflet', () => ({
  Icon: {
    Default: {
      prototype: {
        _getIconUrl: jest.fn(),
      },
      mergeOptions: jest.fn(),
    },
  },
}));

describe('InteractiveMap Component', () => {
  const mockLocations = [
    {
      id: '1',
      name: 'Test Location 1',
      description: 'Description 1',
      location: 'Cairo, Egypt',
      coordinates: [30.0444, 31.2357],
      imageUrl: 'https://example.com/image1.jpg',
    },
    {
      id: '2',
      name: 'Test Location 2',
      description: 'Description 2',
      location: 'Alexandria, Egypt',
      coordinates: [31.2001, 29.9187],
    },
  ];

  test('renders map container with correct props', () => {
    render(<InteractiveMap locations={mockLocations} />);
    
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    
    // Check that center is calculated as average of all locations
    const centerElement = screen.getByTestId('map-center');
    const center = JSON.parse(centerElement.textContent || '');
    expect(center).toEqual([
      (mockLocations[0].coordinates[0] + mockLocations[1].coordinates[0]) / 2,
      (mockLocations[0].coordinates[1] + mockLocations[1].coordinates[1]) / 2,
    ]);
    
    // Check zoom level
    expect(screen.getByTestId('map-zoom').textContent).toBe('10');
  });

  test('renders markers for each location', () => {
    render(<InteractiveMap locations={mockLocations} />);
    
    const markers = screen.getAllByTestId('map-marker');
    expect(markers).toHaveLength(mockLocations.length);
    
    // Check first marker position
    const firstMarkerPosition = screen.getAllByTestId('marker-position')[0];
    expect(firstMarkerPosition.textContent).toBe(JSON.stringify(mockLocations[0].coordinates));
  });

  test('renders with custom height, width, and zoom', () => {
    const customHeight = '600px';
    const customWidth = '80%';
    const customZoom = 15;
    
    render(
      <InteractiveMap 
        locations={mockLocations} 
        height={customHeight}
        width={customWidth}
        zoom={customZoom}
      />
    );
    
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toHaveStyle(`height: 100%`);
    
    const parent = mapContainer.parentElement;
    expect(parent).toHaveStyle(`height: ${customHeight}`);
    expect(parent).toHaveStyle(`width: ${customWidth}`);
    
    // Check zoom level
    expect(screen.getByTestId('map-zoom').textContent).toBe(customZoom.toString());
  });

  test('renders with custom center coordinates', () => {
    const customCenter: [number, number] = [35.6895, 139.6917]; // Tokyo
    
    render(
      <InteractiveMap 
        locations={mockLocations} 
        center={customCenter}
      />
    );
    
    const centerElement = screen.getByTestId('map-center');
    const center = JSON.parse(centerElement.textContent || '');
    expect(center).toEqual(customCenter);
  });

  test('renders with empty locations', () => {
    render(<InteractiveMap locations={[]} />);
    
    const mapContainer = screen.getByTestId('map-container');
    expect(mapContainer).toBeInTheDocument();
    
    // Check that default center is used
    const centerElement = screen.getByTestId('map-center');
    const center = JSON.parse(centerElement.textContent || '');
    expect(center).toEqual([30.0444, 31.2357]); // Default Cairo coordinates
    
    // No markers should be rendered
    const markers = screen.queryAllByTestId('map-marker');
    expect(markers).toHaveLength(0);
  });
});