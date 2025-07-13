// inventory matrix
import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, CheckCircle, Download, Filter } from 'lucide-react';

const InventoryMatrix = () => {
  const [filters, setFilters] = useState({
    brand: 'all',
    category: 'all',
    location: 'all'
  });

  const inventory = [
    {
      id: 1,
      productName: 'Wireless Headphones Pro',
      currentStock: 156,
      forecastedDemand: 280,
      requiredStock: 350,
      shouldLowerPrice: true,
      brand: 'TechCorp',
      category: 'Electronics',
      location: 'Warehouse A'
    },
    {
      id: 2,
      productName: 'Smart Fitness Tracker',
      currentStock: 89,
      forecastedDemand: 145,
      requiredStock: 180,
      shouldLowerPrice: false,
      brand: 'FitTech',
      category: 'Electronics',
      location: 'Warehouse B'
    },
    {
      id: 3,
      productName: 'Organic Coffee Beans',
      currentStock: 234,
      forecastedDemand: 89,
      requiredStock: 120,
      shouldLowerPrice: false,
      brand: 'BrewMaster',
      category: 'Food',
      location: 'Warehouse A'
    },
    {
      id: 4,
      productName: 'Bluetooth Speaker',
      currentStock: 45,
      forecastedDemand: 156,
      requiredStock: 200,
      shouldLowerPrice: true,
      brand: 'SoundWave',
      category: 'Electronics',
      location: 'Warehouse C'
    },
    {
      id: 5,
      productName: 'Yoga Mat Premium',
      currentStock: 78,
      forecastedDemand: 134,
      requiredStock: 170,
      shouldLowerPrice: false,
      brand: 'ZenFit',
      category: 'Sports',
      location: 'Warehouse B'
    }
  ];

  const getStockStatus = (current: number, required: number) => {
    const ratio = current / required;
    if (ratio >= 1) return { status: 'good', color: 'green', text: 'Sufficient' };
    if (ratio >= 0.7) return { status: 'warning', color: 'yellow', text: 'Low' };
    return { status: 'critical', color: 'red', text: 'Critical' };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Inventory Demand Forecast Matrix</h1>
          <p className="text-gray-600">SKU-wise demand analysis and action recommendations</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-800">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.brand}
              onChange={(e) => setFilters({...filters, brand: e.target.value})}
            >
              <option value="all">All Brands</option>
              <option value="TechCorp">TechCorp</option>
              <option value="FitTech">FitTech</option>
              <option value="BrewMaster">BrewMaster</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Food">Food</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={filters.location}
              onChange={(e) => setFilters({...filters, location: e.target.value})}
            >
              <option value="all">All Locations</option>
              <option value="Warehouse A">Warehouse A</option>
              <option value="Warehouse B">Warehouse B</option>
              <option value="Warehouse C">Warehouse C</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Product</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Current Stock</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Forecasted Demand</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Required Stock</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Price Action</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Status</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {inventory.map((item) => {
                const stockStatus = getStockStatus(item.currentStock, item.requiredStock);
                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-gray-800">{item.productName}</div>
                        <div className="text-sm text-gray-500">{item.brand} • {item.category}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-800">{item.currentStock}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-800">{item.forecastedDemand}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-gray-800">{item.requiredStock}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.shouldLowerPrice ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          Lower Price
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Hold Price
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${stockStatus.color}-100 text-${stockStatus.color}-800`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Package className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-semibold">Critical Stock</h3>
          </div>
          <p className="text-2xl font-bold">2 Items</p>
          <p className="text-red-100 text-sm">Immediate reorder required</p>
        </div>
        
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <Package className="w-6 h-6" />
            <h3 className="font-semibold">Low Stock</h3>
          </div>
          <p className="text-2xl font-bold">1 Item</p>
          <p className="text-yellow-100 text-sm">Monitor closely</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-3 mb-2">
            <CheckCircle className="w-6 h-6" />
            <h3 className="font-semibold">Sufficient Stock</h3>
          </div>
          <p className="text-2xl font-bold">2 Items</p>
          <p className="text-green-100 text-sm">Well stocked</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryMatrix;