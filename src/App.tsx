import React from 'react';
import { Navigation } from 'lucide-react';
import VehicleMap from './components/VehicleMap';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="bg-white shadow-md p-4 flex-none">
        <div className="container mx-auto flex items-center gap-2">
          <Navigation className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-800">Vehicle Tracking System</h1>
        </div>
      </header>
      <main className="flex-1 relative">
        <ErrorBoundary>
          <VehicleMap />
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;