import React, { useState } from 'react';
import { Map, MapPin, TrendingUp, AlertTriangle, Info } from 'lucide-react';

const DemandMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<any>(null);

  const regions = [
    {
      id: 1,
      name: 'California',
      demand: 'High',
      spike: 45,
      reason: 'Tech Conference Season',
      duration: '2 weeks',
      products: ['Wireless Headphones', 'Tablets', 'Cables'],
      coordinates: { x: 15, y: 35 }
    },
    {
      id: 2,
      name: 'Texas',
      demand: 'Medium',
      spike: 23,
      reason: 'Back to School',
      duration: '1 month',
      products: ['Backpacks', 'Notebooks', 'Pens'],
      coordinates: { x: 45, y: 55 }
    },
    {
      id: 3,
      name: 'New York',
      demand: 'Very High',
      spike: 67,
      reason: 'Holiday Season',
      duration: '6 weeks',
      products: ['Electronics', 'Clothing', 'Gifts'],
      coordinates: { x: 75, y: 25 }
    },
    {
      id: 4,
      name: 'Florida',
      demand: 'High',
      spike: 38,
      reason: 'Tourism Peak',
      duration: '3 weeks',
      products: ['Sunscreen', 'Swimwear', 'Cameras'],
      coordinates: { x: 70, y: 70 }
    }
  ];

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'Very High': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      default: return 'bg-green-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Demand Spike Map</h1>
        <p className="text-gray-600">Regional demand patterns and spike analysis</p>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Map className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Interactive Demand Heatmap</h3>
        </div>

        <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl p-8 min-h-96">
          {/* Simulated US Map */}
          <div className="relative w-full h-80 bg-gradient-to-r from-blue-200 to-blue-300 rounded-lg overflow-hidden">
            {regions.map((region) => (
              <div
                key={region.id}
                className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-3 -translate-y-3 ${getDemandColor(region.demand)} shadow-lg hover:scale-110 transition-transform`}
                style={{ 
                  left: `${region.coordinates.x}%`, 
                  top: `${region.coordinates.y}%` 
                }}
                onClick={() => setSelectedRegion(region)}
              >
                <div className="absolute inset-0 rounded-full animate-ping bg-current opacity-30"></div>
              </div>
            ))}
            
            {/* Map Labels */}
            <div className="absolute top-4 left-4 text-white font-semibold text-lg">USA</div>
            <div className="absolute bottom-4 right-4 text-xs text-blue-700">Click regions for details</div>
          </div>

          {/* Legend */}
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Very High Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-sm text-gray-600">High Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Medium Demand</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Low Demand</span>
            </div>
          </div>
        </div>
      </div>

      {/* Region Details */}
      {selectedRegion && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-800">{selectedRegion.name} Region Details</h3>
            </div>
            <button
              onClick={() => setSelectedRegion(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-600">Demand Level</span>
              </div>
              <p className="text-xl font-bold text-gray-800">{selectedRegion.demand}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-600">Spike %</span>
              </div>
              <p className="text-xl font-bold text-orange-600">+{selectedRegion.spike}%</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-600">Reason</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{selectedRegion.reason}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-gray-600">Duration</span>
              </div>
              <p className="text-xl font-bold text-green-600">{selectedRegion.duration}</p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-800 mb-3">Top Affected Products</h4>
            <div className="flex flex-wrap gap-2">
              {selectedRegion.products.map((product: string, index: number) => (
                <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {product}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regional Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {regions.map((region) => (
          <div key={region.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
               onClick={() => setSelectedRegion(region)}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-800">{region.name}</h3>
              <div className={`w-3 h-3 ${getDemandColor(region.demand)} rounded-full`}></div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-1">+{region.spike}%</p>
            <p className="text-sm text-gray-600 mb-2">{region.reason}</p>
            <p className="text-xs text-gray-500">{region.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DemandMap;