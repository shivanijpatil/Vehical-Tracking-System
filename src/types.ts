export interface VehicleLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  speed: number;
  distance: number;
  battery: number;
  status: 'moving' | 'idle' | 'stopped';
}

export interface Vehicle {
  id: string;
  name: string;
  currentLocation: VehicleLocation;
  route: VehicleLocation[];
}

export type TimeRange = 'today' | 'yesterday' | 'thisWeek' | 'previousWeek' | 'thisMonth' | 'previousMonth' | 'custom';