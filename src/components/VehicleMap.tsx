import React, { useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapControls from './MapControls';
import VehiclePanel from './VehiclePanel';
import { vehicleData } from '../data/vehicleData';
import { ChevronDown, Calendar } from 'lucide-react';


if (!mapboxgl.supported()) {
  alert('Your browser does not support Mapbox GL');
}


mapboxgl.accessToken = 'pk.eyJ1IjoibGlsZXNoIiwiYSI6ImNsemp4ZTc0MzB0aDIya3IxMXF1NWJvbzgifQ.E4mLxZLZCph5ohJB6rtW9w';

type TimeRange = 'today' | 'yesterday' | 'thisWeek' | 'previousWeek' | 'thisMonth' | 'previousMonth' | 'custom';

function VehicleMap() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(vehicleData.currentLocation);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('today');
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [popup, setPopup] = useState<mapboxgl.Popup | null>(null);
  
  const mapContainer = React.useRef<HTMLDivElement>(null);
  const timeMenuRef = React.useRef<HTMLDivElement>(null);

  const createPopupContent = () => {
    const div = document.createElement('div');
    div.className = 'vehicle-popup';
    div.innerHTML = `
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2">
            <div class="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>
            </div>
            <span class="font-semibold text-gray-900">Vehicle Status</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.32a7.43 7.43 0 0 1 12 0"/><path d="M8.5 11.32a3.78 3.78 0 0 1 7 0"/><circle cx="12" cy="15.32" r="1"/></svg>
            </div>
            <span class="text-xs text-gray-600">WIRELESS</span>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-4 mb-4">
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">${currentLocation.speed.toFixed(2)}</div>
            <div class="text-xs text-gray-500">km/h</div>
            <div class="text-xs text-gray-500">Speed</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">${currentLocation.distance.toFixed(2)}</div>
            <div class="text-xs text-gray-500">km</div>
            <div class="text-xs text-gray-500">Distance</div>
          </div>
          <div class="text-center">
            <div class="text-lg font-semibold text-gray-900">${currentLocation.battery}%</div>
            <div class="text-xs text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mx-auto"><path d="M6 7h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9c0-1.1.9-2 2-2Z"/><line x1="4" y1="11" x2="4" y2="13"/></svg>
            </div>
            <div class="text-xs text-gray-500">Battery</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2">
          <div class="bg-gray-50 p-2 rounded">
            <div class="text-xs font-medium text-center">${vehicleData.timeRanges.today.movingTime}</div>
            <div class="text-xs text-gray-500 text-center">Today Moving</div>
          </div>
          <div class="bg-gray-50 p-2 rounded">
            <div class="text-xs font-medium text-center">${vehicleData.timeRanges.today.idleTime}</div>
            <div class="text-xs text-gray-500 text-center">Today Idle</div>
          </div>
          <div class="bg-gray-50 p-2 rounded">
            <div class="text-xs font-medium text-center">${vehicleData.timeRanges.today.stopTime}</div>
            <div class="text-xs text-gray-500 text-center">Today Stop</div>
          </div>
        </div>
      </div>
    `;
    return div;
  };

  
  useEffect(() => {
    if (!mapContainer.current || map) return;

    const newMap = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [currentLocation.longitude, currentLocation.latitude],
      zoom: 15,
      attributionControl: false
    });

    newMap.addControl(new mapboxgl.NavigationControl(), 'top-right');

    const el = document.createElement('div');
    el.className = 'marker';
    el.innerHTML = '<div class="marker-icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#3b82f6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18H3c-.6 0-1-.4-1-1V7c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v11"/><path d="M14 9h4l4 4v4c0 .6-.4 1-1 1h-2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></div>';

    const newPopup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: false,
      className: 'vehicle-popup',
      offset: [0, -15]
    });

    const newMarker = new mapboxgl.Marker(el)
      .setLngLat([currentLocation.longitude, currentLocation.latitude])
      .setPopup(newPopup)
      .addTo(newMap);

    el.addEventListener('mouseenter', () => {
      newPopup.setDOMContent(createPopupContent());
      newPopup.addTo(newMap);
    });

    newMap.on('load', () => {
      newMap.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: vehicleData.route.map(loc => [loc.longitude, loc.latitude])
          }
        }
      });

      newMap.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3b82f6',
          'line-width': 4,
          'line-opacity': 0.8
        }
      });
    });

    setMap(newMap);
    setMarker(newMarker);
    setPopup(newPopup);

    return () => {
      newMap.remove();
    };
  }, []);

 
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => {
          const nextTime = (prev + 1) % vehicleData.route.length;
          setCurrentLocation(vehicleData.route[nextTime]);
          return nextTime;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);


  useEffect(() => {
    if (!map || !marker) return;
    
    marker.setLngLat([currentLocation.longitude, currentLocation.latitude]);
    map.easeTo({
      center: [currentLocation.longitude, currentLocation.latitude],
      duration: 1000
    });
  }, [currentLocation, map, marker]);

  const handleTimelineChange = useCallback((value: number) => {
    setCurrentTime(value);
    setCurrentLocation(vehicleData.route[value]);
  }, []);

  const handleTimeRangeSelect = (range: TimeRange) => {
    setSelectedTimeRange(range);
    setShowTimeMenu(false);
  };

  return (
    <div className="absolute inset-0 bg-gray-100">
      <div ref={mapContainer} className="absolute inset-0" style={{ background: '#e5e7eb' }} />
      
      <div className="absolute top-4 left-4 z-10" ref={timeMenuRef}>
        <div className="relative">
          <button
            onClick={() => setShowTimeMenu(!showTimeMenu)}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">
              {selectedTimeRange.charAt(0).toUpperCase() + selectedTimeRange.slice(1)}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </button>

          {showTimeMenu && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              {['today', 'yesterday', 'thisWeek', 'previousWeek', 'thisMonth', 'previousMonth', 'custom'].map((range) => (
                <button
                  key={range}
                  onClick={() => handleTimeRangeSelect(range as TimeRange)}
                  className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                    selectedTimeRange === range ? 'text-blue-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1).replace(/([A-Z])/g, ' $1')}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <VehiclePanel currentLocation={currentLocation} />
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 z-10">
        <MapControls
          isPlaying={isPlaying}
          onPlayPauseClick={() => setIsPlaying(!isPlaying)}
          currentTime={currentTime}
          maxTime={vehicleData.route.length - 1}
          onTimelineChange={handleTimelineChange}
          currentLocation={currentLocation}
        />
      </div>
    </div>
  );
}

export default VehicleMap;