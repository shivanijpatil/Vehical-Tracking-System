import React from 'react';
import { Play, Pause } from 'lucide-react';
import { VehicleLocation } from '../types';

interface MapControlsProps {
  isPlaying: boolean;
  onPlayPauseClick: () => void;
  currentTime: number;
  maxTime: number;
  onTimelineChange: (value: number) => void;
  currentLocation: VehicleLocation;
}

const MapControls: React.FC<MapControlsProps> = ({
  isPlaying,
  onPlayPauseClick,
  currentTime,
  maxTime,
  onTimelineChange,
  currentLocation
}) => {
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-sm p-4 mx-4 mb-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-4">
        <button
          onClick={onPlayPauseClick}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <div className="flex-1">
          <input
            type="range"
            min="0"
            max={maxTime}
            value={currentTime}
            onChange={(e) => onTimelineChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        <div className="text-sm font-medium text-gray-600">
          {new Date(currentLocation.timestamp).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MapControls;