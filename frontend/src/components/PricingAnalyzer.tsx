import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calculator, AlertCircle } from 'lucide-react';

const PricingAnalyzer = () => {
  const [pricing, setPricing] = useState({
    walmartPrice: '',
    amazonPrice: '',
    elasticity: '1.2'
  });

  const [results, setResults] = useState<{
    priceGap: number;
    shouldLowerPrice: boolean;
    demandUplift: number;
  } | null>(null);

  const calculatePriceImpact = () => {
    const walmart = parseFloat(pricing.walmartPrice);
    const amazon = parseFloat(pricing.amazonPrice);
    const elasticity = parseFloat(pricing.elasticity);

    if (!walmart || !amazon || !elasticity) return;

    const priceGap = ((walmart- amazon) / walmart) * 100;
    const shouldLowerPrice = priceGap > 10; // If competitor is 10% higher
    const demandUplift = shouldLowerPrice ? Math.abs(priceGap) * elasticity : 0;

    setResults({
      priceGap,
      shouldLowerPrice,
      demandUplift
    });
  };

  const competitorData = [
    {
      product: 'Wireless Headphones Pro',
      ourPrice: 89.99,
      walmartPrice: 94.99,
      amazonPrice: 92.99,
      recommendedAction: 'Hold Price',
      potentialUplift: 0
    },
    {
      product: 'Smart Fitness Tracker',
      ourPrice: 129.99,
      walmartPrice: 139.99,
      amazonPrice: 134.99,
      recommendedAction: 'Increase Price',
      potentialUplift: 5.2
    },
    {
      product: 'Bluetooth Speaker',
      ourPrice: 79.99,
      walmartPrice: 69.99,
      amazonPrice: 72.99,
      recommendedAction: 'Lower Price',
      potentialUplift: -8.1
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Competitor Pricing Analyzer</h1>
        <p className="text-gray-600">Analyze price gaps and predict demand impact</p>
      </div>

      {/* Price Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Price Impact Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Walmart Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="89.99"
              value={pricing.walmartPrice}
              onChange={(e) => setPricing({...pricing, walmartPrice: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amazon Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="94.99"
              value={pricing.amazonPrice}
              onChange={(e) => setPricing({...pricing, amazonPrice: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Elasticity Coefficient</label>
            <input
              type="number"
              step="0.1"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={pricing.elasticity}
              onChange={(e) => setPricing({...pricing, elasticity: e.target.value})}
            />
          </div>
        </div>

        <button
          onClick={calculatePriceImpact}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Impact
        </button>

        {/* Results */}
        {results && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-800">Price Gap</h4>
              </div>
              <p className="text-2xl font-bold text-gray-800">{results.priceGap.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Competitor difference</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-800">Recommendation</h4>
              </div>
              <p className={`text-2xl font-bold ${results.shouldLowerPrice ? 'text-red-600' : 'text-green-600'}`}>
                {results.shouldLowerPrice ? '✓ Lower Price' : '✗ Hold Price'}
              </p>
              <p className="text-sm text-gray-600">Based on competition</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-gray-600" />
                <h4 className="font-semibold text-gray-800">Demand Uplift</h4>
              </div>
              <p className="text-2xl font-bold text-blue-600">{results.demandUplift.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">Predicted increase</p>
            </div>
          </div>
        )}
      </div>

      {/* Competitor Analysis Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Current Competitor Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Product</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Our Price</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Walmart</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Amazon</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Recommended Action</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {competitorData.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{item.product}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-gray-800">${item.ourPrice}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">${item.walmartPrice}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">${item.amazonPrice}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.recommendedAction === 'Hold Price' ? 'bg-blue-100 text-blue-800' :
                      item.recommendedAction === 'Increase Price' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.recommendedAction}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-semibold ${item.potentialUplift > 0 ? 'text-green-600' : item.potentialUplift < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {item.potentialUplift > 0 ? '+' : ''}{item.potentialUplift}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Competitive Advantage</h3>
          <p className="text-3xl font-bold mb-2">67%</p>
          <p className="text-green-100">Products priced competitively</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Revenue Opportunity</h3>
          <p className="text-3xl font-bold mb-2">$45K</p>
          <p className="text-purple-100">Monthly uplift potential</p>
        </div>
      </div>
    </div>
  );
};

export default PricingAnalyzer;
