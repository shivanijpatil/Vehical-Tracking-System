import React from 'react';
import { Car, MapPin } from 'lucide-react';
import { VehicleLocation } from '../types';

interface VehiclePanelProps {
  currentLocation: VehicleLocation;
}

const VehiclePanel: React.FC<VehiclePanelProps> = ({ currentLocation }) => {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-72">
      <div className="space-y-4">
        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
            <Car className="w-4 h-4 text-blue-600" />
            Vehicle Details
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-600">Vehicle ID: KA-01-1234</p>
            <p className="text-xs text-gray-600">Type: Delivery Van</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold flex items-center gap-2 text-gray-900">
            <MapPin className="w-4 h-4 text-blue-600" />
            Current Location
          </h2>
          <div className="mt-2 space-y-1">
            <p className="text-xs text-gray-600">
              Lat: {currentLocation.latitude.toFixed(4)}
            </p>
            <p className="text-xs text-gray-600">
              Long: {currentLocation.longitude.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;