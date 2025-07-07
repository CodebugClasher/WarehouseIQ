// App.tsx
import React, { useState } from 'react';
import {
  BarChart3,
  Package,
  DollarSign,
  Map,
  Calendar,
  TrendingUp,
  Cloud,
  MapPin,
  Truck,
  Menu,
  X,
  Home
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import InventoryMatrix from './components/InventoryMatrix';
import PricingAnalyzer from './components/PricingAnalyzer';
import DemandMap from './components/DemandMap';
import SeasonalForecast from './components/SeasonalForecast';
import TrendAnalyzer from './components/TrendAnalyzer';
import WeatherAdjuster from './components/WeatherAdjuster';
import EventEstimator from './components/EventEstimator';
import ControlPanel from './components/ControlPanel';

type Module = {
  id: string;
  name: string;
  icon: React.ElementType;
  component: React.ComponentType;
};

const modules: Module[] = [
  { id: 'dashboard', name: 'Dashboard', icon: Home, component: Dashboard },
  { id: 'inventory', name: 'Inventory Matrix', icon: Package, component: InventoryMatrix },
  { id: 'pricing', name: 'Pricing Analyzer', icon: DollarSign, component: PricingAnalyzer },
  { id: 'map', name: 'Demand Map', icon: Map, component: DemandMap },
  { id: 'seasonal', name: 'Seasonal Forecast', icon: Calendar, component: SeasonalForecast },
  { id: 'trends', name: 'Trend Analyzer', icon: TrendingUp, component: TrendAnalyzer },
  { id: 'weather', name: 'Weather Adjuster', icon: Cloud, component: WeatherAdjuster },
  { id: 'events', name: 'Event Estimator', icon: MapPin, component: EventEstimator },
  { id: 'control', name: 'Control Panel', icon: Truck, component: ControlPanel },
];

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const ActiveComponent = modules.find((m) => m.id === activeModule)?.component || Dashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">WarehouseIQ</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.id}
                onClick={() => {
                  setActiveModule(module.id);
                  setSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                  ${
                    activeModule === module.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600'
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{module.name}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-1">AI Insights</h3>
            <p className="text-sm text-gray-600">
              Optimize your warehouse operations with ML-powered forecasting
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-800">
                {modules.find((m) => m.id === activeModule)?.name}
              </h2>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>System Online</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <ActiveComponent />
        </main>git commit -m "Updated UI: Fixed App.tsx layout"
      </div>
    </div>
  );
};

export default App;
