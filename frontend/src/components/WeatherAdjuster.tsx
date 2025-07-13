import React, { useState } from 'react';
import { Cloud, Sun, CloudRain, Snowflake, Calculator } from 'lucide-react';

const WeatherAdjuster = () => {
  const [weatherData, setWeatherData] = useState({
    category: 'electronics',
    temperature: '',
    precipitation: '',
    region: 'california'
  });

  const [forecast, setForecast] = useState<{
    multiplier: number;
    adjustedDemand: number;
    explanation: string;
  } | null>(null);

  const calculateWeatherImpact = () => {
    const temp = parseFloat(weatherData.temperature);
    const precip = parseFloat(weatherData.precipitation);

    if (isNaN(temp) || isNaN(precip)) return;

    let multiplier = 1.0;
    let explanation = '';

    // Weather impact logic based on category
    switch (weatherData.category) {
      case 'electronics':
        if (precip > 50) {
          multiplier = 1.3;
          explanation = 'High rain increases indoor entertainment demand';
        } else if (temp > 85) {
          multiplier = 1.2;
          explanation = 'Hot weather drives AC and fan sales';
        } else {
          multiplier = 1.0;
          explanation = 'Normal weather conditions';
        }
        break;
      case 'apparel':
        if (temp < 40) {
          multiplier = 1.4;
          explanation = 'Cold weather boosts winter clothing';
        } else if (temp > 80) {
          multiplier = 1.3;
          explanation = 'Hot weather increases summer wear';
        } else {
          multiplier = 1.1;
          explanation = 'Mild seasonal adjustment';
        }
        break;
      case 'outdoor':
        if (precip > 30) {
          multiplier = 0.7;
          explanation = 'Rain reduces outdoor activity products';
        } else if (temp > 70 && temp < 85) {
          multiplier = 1.5;
          explanation = 'Perfect weather boosts outdoor gear';
        } else {
          multiplier = 1.0;
          explanation = 'Weather neutral for outdoor products';
        }
        break;
    }

    const baseDemand = 1000; // Example base demand
    const adjustedDemand = Math.round(baseDemand * multiplier);

    setForecast({ multiplier, adjustedDemand, explanation });
  };

  const weatherHistory = [
    {
      date: '2025-01-01',
      weather: 'Sunny, 75°F',
      category: 'Outdoor Gear',
      impact: '+45%',
      sales: 1450
    },
    {
      date: '2024-12-31',
      weather: 'Rainy, 55°F',
      category: 'Electronics',
      impact: '+28%',
      sales: 1280
    },
    {
      date: '2024-12-30',
      weather: 'Cold, 35°F',
      category: 'Winter Apparel',
      impact: '+67%',
      sales: 1670
    },
    {
      date: '2024-12-29',
      weather: 'Snowy, 28°F',
      category: 'Heating Products',
      impact: '+89%',
      sales: 1890
    }
  ];

  const getWeatherIcon = (temp: number, precip: number) => {
    if (precip > 50) return <CloudRain className="w-8 h-8 text-blue-600" />;
    if (temp < 35) return <Snowflake className="w-8 h-8 text-blue-300" />;
    if (temp > 80) return <Sun className="w-8 h-8 text-yellow-500" />;
    return <Cloud className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Weather Adjuster</h1>
        <p className="text-gray-600">Predict demand changes based on weather conditions</p>
      </div>

      {/* Weather Input */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Weather Impact Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={weatherData.category}
              onChange={(e) => setWeatherData({...weatherData, category: e.target.value})}
            >
              <option value="electronics">Electronics</option>
              <option value="apparel">Apparel</option>
              <option value="outdoor">Outdoor Gear</option>
              <option value="home">Home & Garden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Temperature (°F)</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="75"
              value={weatherData.temperature}
              onChange={(e) => setWeatherData({...weatherData, temperature: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Precipitation (%)</label>
            <input
              type="number"
              min="0"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="20"
              value={weatherData.precipitation}
              onChange={(e) => setWeatherData({...weatherData, precipitation: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={weatherData.region}
              onChange={(e) => setWeatherData({...weatherData, region: e.target.value})}
            >
              <option value="california">California</option>
              <option value="texas">Texas</option>
              <option value="newyork">New York</option>
              <option value="florida">Florida</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateWeatherImpact}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Weather Impact
        </button>

        {/* Forecast Results */}
        {forecast && (
          <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
            <div className="flex items-center space-x-4 mb-4">
              {getWeatherIcon(parseFloat(weatherData.temperature), parseFloat(weatherData.precipitation))}
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Weather Impact Forecast</h4>
                <p className="text-gray-600">{forecast.explanation}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-gray-700 mb-2">Demand Multiplier</h5>
                <p className="text-3xl font-bold text-blue-600">{forecast.multiplier.toFixed(1)}x</p>
                <p className="text-sm text-gray-500">Applied to base demand</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-gray-700 mb-2">Adjusted Demand</h5>
                <p className="text-3xl font-bold text-green-600">{forecast.adjustedDemand}</p>
                <p className="text-sm text-gray-500">Forecasted units</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Weather History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Recent Weather Impact History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Weather</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Category</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Impact</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Sales</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {weatherHistory.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{record.weather}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-gray-800">{record.category}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-green-600">{record.impact}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-blue-600">{record.sales}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weather Insights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Sun className="w-6 h-6" />
            <h3 className="font-semibold">Hot Weather</h3>
          </div>
          <p className="text-2xl font-bold mb-2">+23%</p>
          <p className="text-yellow-100 text-sm">Cooling products</p>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <CloudRain className="w-6 h-6" />
            <h3 className="font-semibold">Rainy Days</h3>
          </div>
          <p className="text-2xl font-bold mb-2">+31%</p>
          <p className="text-blue-100 text-sm">Indoor products</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Snowflake className="w-6 h-6" />
            <h3 className="font-semibold">Cold Snap</h3>
          </div>
          <p className="text-2xl font-bold mb-2">+67%</p>
          <p className="text-purple-100 text-sm">Winter gear</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Cloud className="w-6 h-6" />
            <h3 className="font-semibold">Perfect Days</h3>
          </div>
          <p className="text-2xl font-bold mb-2">+45%</p>
          <p className="text-green-100 text-sm">Outdoor activities</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAdjuster;