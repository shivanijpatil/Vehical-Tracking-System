// import { addDays, subDays, startOfWeek, startOfMonth, format } from 'date-fns';

// export interface VehicleLocation {
//   latitude: number;
//   longitude: number;
//   timestamp: string;
//   speed: number;
//   distance: number;
//   battery: number;
//   status: 'moving' | 'idle' | 'stopped';
// }

// export interface TimeStats {
//   movingTime: string;
//   idleTime: string;
//   stopTime: string;
//   totalDistance: number;
//   averageSpeed: number;
//   maxSpeed: number;
//   fuelConsumption: number;
//   batteryUsage: number;
// }

// export interface VehicleData {
//   id: string;
//   name: string;
//   currentLocation: VehicleLocation;
//   route: VehicleLocation[];
//   timeRanges: {
//     today: TimeStats;
//     yesterday: TimeStats;
//     thisWeek: {
//       summary: TimeStats;
//       dailyStats: Record<string, TimeStats>;
//     };
//     previousWeek: {
//       summary: TimeStats;
//       dailyStats: Record<string, TimeStats>;
//     };
//     thisMonth: {
//       summary: TimeStats;
//       weeklyStats: Record<string, TimeStats>;
//     };
//     previousMonth: {
//       summary: TimeStats;
//       weeklyStats: Record<string, TimeStats>;
//     };
//   };
// }


// const generateRoutePoint = (baseLatitude: number, baseLongitude: number, index: number): VehicleLocation => {
//   const speed = 15 + Math.sin(index * 0.5) * 10 + Math.random() * 20; 
//   const status = speed < 2 ? 'stopped' : speed < 5 ? 'idle' : 'moving';
//   const battery = Math.max(95); 

//   return {
//     latitude: baseLatitude + (index * 0.000021) + (Math.random() * 0.00002),
//     longitude: baseLongitude + (index * 0.000024) + (Math.random() * 0.00002),
//     timestamp: new Date(Date.now() - (index * 5000)).toISOString(),
//     speed,
//     distance: index * 0.1,
//     battery,
//     status
//   };
// };


// const generateTimeStats = (date: Date, multiplier = 1): TimeStats => {
//   const isWeekend = [0, 6].includes(date.getDay());
//   const baseMovingHours = isWeekend ? 4 : 8;
  
//   const movingMinutes = Math.floor((baseMovingHours + Math.random() * 2) * 60 * multiplier);
//   const idleMinutes = Math.floor((2 + Math.random()) * 60 * multiplier);
//   const stopMinutes = Math.floor((1 + Math.random()) * 60 * multiplier);
  
//   return {
//     movingTime: `${Math.floor(movingMinutes / 60)}h:${movingMinutes % 60}m`,
//     idleTime: `${Math.floor(idleMinutes / 60)}h:${idleMinutes % 60}m`,
//     stopTime: `${Math.floor(stopMinutes / 60)}h:${stopMinutes % 60}m`,
//     totalDistance: (baseMovingHours * 35 + Math.random() * 50) * multiplier,
//     averageSpeed: 35 + Math.random() * 10,
//     maxSpeed: 75 + Math.random() * 15,
//     fuelConsumption: (baseMovingHours * 2.5 + Math.random() * 1.5) * multiplier,
//     batteryUsage: Math.min(95, 80 + Math.random() * 15)
//   };
// };


// const generateWeeklyData = (startDate: Date): { summary: TimeStats; dailyStats: Record<string, TimeStats> } => {
//   const dailyStats: Record<string, TimeStats> = {};
//   let totalMovingMinutes = 0;
//   let totalIdleMinutes = 0;
//   let totalStopMinutes = 0;
//   let totalDistance = 0;
//   let maxSpeed = 0;
//   let totalFuelConsumption = 0;

//   for (let i = 0; i < 7; i++) {
//     const date = addDays(startDate, i);
//     const stats = generateTimeStats(date);
//     const dayKey = format(date, 'EEEE');
//     dailyStats[dayKey] = stats;


//     totalMovingMinutes += parseInt(stats.movingTime.split('h:')[0]) * 60 + 
//                          parseInt(stats.movingTime.split('h:')[1].replace('m', ''));
//     totalIdleMinutes += parseInt(stats.idleTime.split('h:')[0]) * 60 + 
//                        parseInt(stats.idleTime.split('h:')[1].replace('m', ''));
//     totalStopMinutes += parseInt(stats.stopTime.split('h:')[0]) * 60 + 
//                        parseInt(stats.stopTime.split('h:')[1].replace('m', ''));
//     totalDistance += stats.totalDistance;
//     maxSpeed = Math.max(maxSpeed, stats.maxSpeed);
//     totalFuelConsumption += stats.fuelConsumption;
//   }

//   return {
//     summary: {
//       movingTime: `${Math.floor(totalMovingMinutes / 60)}h:${totalMovingMinutes % 60}m`,
//       idleTime: `${Math.floor(totalIdleMinutes / 60)}h:${totalIdleMinutes % 60}m`,
//       stopTime: `${Math.floor(totalStopMinutes / 60)}h:${totalStopMinutes % 60}m`,
//       totalDistance,
//       averageSpeed: totalDistance / (totalMovingMinutes / 60),
//       maxSpeed,
//       fuelConsumption: totalFuelConsumption,
//       batteryUsage: 85 + Math.random() * 10
//     },
//     dailyStats
//   };
// };


// const generateMonthlyData = (startDate: Date): { summary: TimeStats; weeklyStats: Record<string, TimeStats> } => {
//   const weeklyStats: Record<string, TimeStats> = {};
//   let totalMovingMinutes = 0;
//   let totalIdleMinutes = 0;
//   let totalStopMinutes = 0;
//   let totalDistance = 0;
//   let maxSpeed = 0;
//   let totalFuelConsumption = 0;

//   for (let i = 0; i < 4; i++) {
//     const weekStart = addDays(startDate, i * 7);
//     const stats = generateTimeStats(weekStart, 7);
//     const weekKey = `Week ${i + 1}`;
//     weeklyStats[weekKey] = stats;

//     totalMovingMinutes += parseInt(stats.movingTime.split('h:')[0]) * 60 + 
//                          parseInt(stats.movingTime.split('h:')[1].replace('m', ''));
//     totalIdleMinutes += parseInt(stats.idleTime.split('h:')[0]) * 60 + 
//                        parseInt(stats.idleTime.split('h:')[1].replace('m', ''));
//     totalStopMinutes += parseInt(stats.stopTime.split('h:')[0]) * 60 + 
//                        parseInt(stats.stopTime.split('h:')[1].replace('m', ''));
//     totalDistance += stats.totalDistance;
//     maxSpeed = Math.max(maxSpeed, stats.maxSpeed);
//     totalFuelConsumption += stats.fuelConsumption;
//   }

//   return {
//     summary: {
//       movingTime: `${Math.floor(totalMovingMinutes / 60)}h:${totalMovingMinutes % 60}m`,
//       idleTime: `${Math.floor(totalIdleMinutes / 60)}h:${totalIdleMinutes % 60}m`,
//       stopTime: `${Math.floor(totalStopMinutes / 60)}h:${totalStopMinutes % 60}m`,
//       totalDistance,
//       averageSpeed: totalDistance / (totalMovingMinutes / 60),
//       maxSpeed,
//       fuelConsumption: totalFuelConsumption,
//       batteryUsage: 85 + Math.random() * 10
//     },
//     weeklyStats
//   };
// };


// const today = new Date();
// const todayRoute = Array.from({ length: 30 }, (_, i) => 
//   generateRoutePoint(19.996427, 73.789726, i)
// );

// export const vehicleData: VehicleData = {
//   id: 'VH-001',
//   name: 'Delivery Van 1',
//   currentLocation: todayRoute[0],
//   route: todayRoute,
//   timeRanges: {
//     today: generateTimeStats(today),
//     yesterday: generateTimeStats(subDays(today, 1)),
//     thisWeek: generateWeeklyData(startOfWeek(today)),
//     previousWeek: generateWeeklyData(startOfWeek(subDays(today, 7))),
//     thisMonth: generateMonthlyData(startOfMonth(today)),
//     previousMonth: generateMonthlyData(startOfMonth(subDays(today, 30)))
//   }
// };

// export const mockRoute = todayRoute;

export const vehicleData = {
  "id": "VH-001",
  "name": "Delivery Van 1",
  "currentLocation": {
    "latitude": 20.014970211803703,
    "longitude": 73.7960410504287,
    "timestamp": "2024-02-20T10:30:00Z",
    "speed": 35.5,
    "distance": 0,
    "battery": 85,
    "status": "moving"
  },
  "route": [
    {
      "latitude": 20.014970211803703,
      "longitude": 73.7960410504287,
      "timestamp": "2024-02-20T10:30:00Z",
      "speed": 35.5,
      "distance": 0,
      "battery": 85,
      "status": "moving"
    },
    {
      "latitude": 20.014169850683672,
      "longitude": 73.79605273433828,
      "timestamp": "2024-02-20T10:35:00Z",
      "speed": 36.2,
      "distance": 0.2,
      "battery": 84,
      "status": "moving"
    },
    {
      "latitude": 20.01312285675396,
      "longitude": 73.7958972622421,
      "timestamp": "2024-02-20T10:40:00Z",
      "speed": 37.0,
      "distance": 0.5,
      "battery": 83,
      "status": "moving"
    },
    {
      "latitude": 20.011994092895453,
      "longitude": 73.79562770023828,
      "timestamp": "2024-02-20T10:45:00Z",
      "speed": 38.2,
      "distance": 0.9,
      "battery": 82,
      "status": "moving"
    },
    {
      "latitude": 20.012118215645035,
      "longitude": 73.7949504424769,
      "timestamp": "2024-02-20T10:50:00Z",
      "speed": 39.3,
      "distance": 1.1,
      "battery": 81,
      "status": "moving"
    },
    {
      "latitude": 20.012416865928415,
      "longitude": 73.79412834539991,
      "timestamp": "2024-02-20T10:55:00Z",
      "speed": 40.5,
      "distance": 1.4,
      "battery": 80,
      "status": "moving"
    },
    {
      "latitude": 20.012555479787988,
      "longitude": 73.79418869510039,
      "timestamp": "2024-02-20T11:00:00Z",
      "speed": 41.0,
      "distance": 1.6,
      "battery": 79,
      "status": "moving"
    }
  ],
  "timeRanges": {
    "today": {
      "movingTime": "5h 30m",
      "idleTime": "1h 15m",
      "stopTime": "0h 45m",
      "totalDistance": 185.5,
      "averageSpeed": 38.2,
      "maxSpeed": 75.8,
      "fuelConsumption": 15.3,
      "batteryUsage": 85
    },
    "yesterday": {
      "movingTime": "6h 15m",
      "idleTime": "1h 30m",
      "stopTime": "1h 00m",
      "totalDistance": 210.3,
      "averageSpeed": 42.1,
      "maxSpeed": 82.4,
      "fuelConsumption": 17.8,
      "batteryUsage": 90
    },
    "thisWeek": {
      "summary": {
        "movingTime": "28h 45m",
        "idleTime": "7h 30m",
        "stopTime": "4h 15m",
        "totalDistance": 950.8,
        "averageSpeed": 40.5,
        "maxSpeed": 85.2,
        "fuelConsumption": 82.5,
        "batteryUsage": 88
      },
      "dailyStats": {
        "Monday": {
          "movingTime": "5h 45m",
          "idleTime": "1h 15m",
          "stopTime": "0h 45m",
          "totalDistance": 195.2,
          "averageSpeed": 41.2,
          "maxSpeed": 78.5,
          "fuelConsumption": 16.8,
          "batteryUsage": 87
        },
        "Tuesday": {
          "movingTime": "6h 00m",
          "idleTime": "1h 30m",
          "stopTime": "0h 45m",
          "totalDistance": 205.5,
          "averageSpeed": 42.8,
          "maxSpeed": 80.2,
          "fuelConsumption": 17.5,
          "batteryUsage": 89
        }
      }
    }
  }
};
