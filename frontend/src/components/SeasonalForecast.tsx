import React, { useState } from 'react';
import { Calendar, TrendingUp, Cloud, BarChart3 } from 'lucide-react';

const SeasonalForecast = () => {
  const [settings, setSettings] = useState({
    product: 'wireless-headphones',
    warehouse: 'warehouse-a',
    days: 30,
    weatherImpact: true
  });

  const forecastData = [
    { date: '2025-01-01', demand: 245, weather: 'Sunny' },
    { date: '2025-01-02', demand: 267, weather: 'Cloudy' },
    { date: '2025-01-03', demand: 289, weather: 'Rainy' },
    { date: '2025-01-04', demand: 234, weather: 'Sunny' },
    { date: '2025-01-05', demand: 312, weather: 'Sunny' },
    { date: '2025-01-06', demand: 298, weather: 'Cloudy' },
    { date: '2025-01-07', demand: 321, weather: 'Sunny' }
  ];

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Sunny': return '☀️';
      case 'Cloudy': return '☁️';
      case 'Rainy': return '🌧️';
      default: return '☀️';
    }
  };

  const products = [
    { id: 'wireless-headphones', name: 'Wireless Headphones Pro' },
    { id: 'fitness-tracker', name: 'Smart Fitness Tracker' },
    { id: 'bluetooth-speaker', name: 'Bluetooth Speaker' },
    { id: 'yoga-mat', name: 'Yoga Mat Premium' }
  ];

  const warehouses = [
    { id: 'warehouse-a', name: 'Warehouse A - California' },
    { id: 'warehouse-b', name: 'Warehouse B - Texas' },
    { id: 'warehouse-c', name: 'Warehouse C - New York' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Seasonal Forecast Viewer</h1>
        <p className="text-gray-600">Prophet-powered seasonal demand forecasting</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calendar className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Forecast Settings</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={settings.product}
              onChange={(e) => setSettings({...settings, product: e.target.value})}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>{product.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={settings.warehouse}
              onChange={(e) => setSettings({...settings, warehouse: e.target.value})}
            >
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Range</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={settings.days}
              onChange={(e) => setSettings({...settings, days: parseInt(e.target.value)})}
            >
              <option value={7}>7 Days</option>
              <option value={14}>14 Days</option>
              <option value={30}>30 Days</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Weather Impact</label>
            <div className="flex items-center space-x-3 mt-2">
              <button
                onClick={() => setSettings({...settings, weatherImpact: !settings.weatherImpact})}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  settings.weatherImpact ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.weatherImpact ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <span className="text-sm text-gray-600">
                {settings.weatherImpact ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Forecast Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Demand Forecast</h3>
        </div>

        {/* Simulated Chart */}
        <div className="relative h-64 bg-gradient-to-t from-blue-50 to-white rounded-lg p-4">
          <div className="flex items-end justify-between h-full space-x-2">
            {forecastData.map((point, index) => {
              const height = (point.demand / 350) * 100; // Normalize to percentage
              return (
                <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                  <div className="text-xs text-gray-600 text-center">
                    {settings.weatherImpact && getWeatherIcon(point.weather)}
                  </div>
                  <div 
                    className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm w-full transition-all duration-500 hover:from-blue-700 hover:to-blue-500 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${point.date}: ${point.demand} units`}
                  ></div>
                  <div className="text-xs text-gray-500 text-center">
                    {new Date(point.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Chart Legend */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded"></div>
              <span className="text-sm text-gray-600">Forecasted Demand</span>
            </div>
            {settings.weatherImpact && (
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600">Weather Impact Included</span>
              </div>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Confidence: 94.2%
          </div>
        </div>
      </div>

      {/* Forecast Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Detailed Forecast</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Forecasted Demand</th>
                {settings.weatherImpact && (
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Weather</th>
                )}
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Confidence</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {forecastData.map((point, index) => {
                const trend = index > 0 ? point.demand - forecastData[index - 1].demand : 0;
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">
                        {new Date(point.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-blue-600">{point.demand}</span>
                    </td>
                    {settings.weatherImpact && (
                      <td className="px-6 py-4 text-center">
                        <span className="text-lg">{getWeatherIcon(point.weather)}</span>
                        <span className="ml-2 text-sm text-gray-600">{point.weather}</span>
                      </td>
                    )}
                    <td className="px-6 py-4 text-center">
                      <span className="text-green-600 font-medium">94.2%</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        <span className={`text-sm font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {trend >= 0 ? '+' : ''}{trend}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Seasonal Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Seasonal Pattern</h3>
          <p className="text-3xl font-bold mb-2">Q1 Growth</p>
          <p className="text-blue-100">18% increase expected</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Weather Impact</h3>
          <p className="text-3xl font-bold mb-2">+12%</p>
          <p className="text-green-100">Rain boosts indoor products</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Model Accuracy</h3>
          <p className="text-3xl font-bold mb-2">94.2%</p>
          <p className="text-purple-100">Prophet confidence level</p>
        </div>
      </div>
    </div>
  );
};

export default SeasonalForecast;