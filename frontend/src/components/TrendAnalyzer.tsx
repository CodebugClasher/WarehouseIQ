import React, { useState } from 'react';
import { TrendingUp, Twitter, Heart, Hash, Calculator } from 'lucide-react';

const TrendAnalyzer = () => {
  const [trendData, setTrendData] = useState({
    tweetVolume: '',
    sentimentScore: '',
    trendIndex: ''
  });

  const [prediction, setPrediction] = useState<{
    spikePercentage: number;
    confidence: number;
    recommendation: string;
  } | null>(null);

  const calculateTrendImpact = () => {
    const volume = parseFloat(trendData.tweetVolume);
    const sentiment = parseFloat(trendData.sentimentScore);
    const trend = parseFloat(trendData.trendIndex);

    if (!volume || !sentiment || !trend) return;

    // Simplified trend calculation
    const spikePercentage = Math.round((volume * sentiment * trend) / 20000);
    const confidence = Math.min(95, 60 + (sentiment * 10) + (trend * 5));
    
    let recommendation = 'Monitor closely';
    if (spikePercentage > 50) recommendation = 'Increase inventory immediately';
    else if (spikePercentage > 25) recommendation = 'Prepare for moderate spike';

    setPrediction({ spikePercentage, confidence, recommendation });
  };

  const viralProducts = [
    {
      product: 'Wireless Gaming Headset',
      tweetVolume: 15420,
      sentiment: 8.4,
      trendIndex: 9.2,
      predictedSpike: 67,
      timeframe: '48 hours',
      status: 'Viral'
    },
    {
      product: 'Smart Home Hub',
      tweetVolume: 8930,
      sentiment: 7.8,
      trendIndex: 6.5,
      predictedSpike: 34,
      timeframe: '72 hours',
      status: 'Rising'
    },
    {
      product: 'Fitness Smart Ring',
      tweetVolume: 12100,
      sentiment: 9.1,
      trendIndex: 8.7,
      predictedSpike: 89,
      timeframe: '24 hours',
      status: 'Viral'
    },
    {
      product: 'Portable Coffee Maker',
      tweetVolume: 3420,
      sentiment: 6.2,
      trendIndex: 4.1,
      predictedSpike: 12,
      timeframe: '1 week',
      status: 'Stable'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Viral': return 'bg-red-100 text-red-800';
      case 'Rising': return 'bg-orange-100 text-orange-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Trend-Based Demand Spike Tool</h1>
        <p className="text-gray-600">Predict demand spikes from social media trends</p>
      </div>

      {/* Trend Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Trend Impact Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Twitter className="w-4 h-4 inline mr-1" />
              Tweet Volume (24h)
            </label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="15420"
              value={trendData.tweetVolume}
              onChange={(e) => setTrendData({...trendData, tweetVolume: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Heart className="w-4 h-4 inline mr-1" />
              Sentiment Score (1-10)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8.4"
              value={trendData.sentimentScore}
              onChange={(e) => setTrendData({...trendData, sentimentScore: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-1" />
              Trend Index (1-10)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="10"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="9.2"
              value={trendData.trendIndex}
              onChange={(e) => setTrendData({...trendData, trendIndex: e.target.value})}
            />
          </div>
        </div>

        <button
          onClick={calculateTrendImpact}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Spike Prediction
        </button>

        {/* Prediction Results */}
        {prediction && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-4 border border-red-200">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-red-600" />
                <h4 className="font-semibold text-red-800">Predicted Spike</h4>
              </div>
              <p className="text-3xl font-bold text-red-600">+{prediction.spikePercentage}%</p>
              <p className="text-sm text-red-700">Demand increase</p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Hash className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-blue-800">Confidence Level</h4>
              </div>
              <p className="text-3xl font-bold text-blue-600">{prediction.confidence}%</p>
              <p className="text-sm text-blue-700">Prediction accuracy</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <Calculator className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-green-800">Recommendation</h4>
              </div>
              <p className="text-sm font-bold text-green-600">{prediction.recommendation}</p>
              <p className="text-sm text-green-700">Action required</p>
            </div>
          </div>
        )}
      </div>

      {/* Viral Products Monitor */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Real-time Viral Products Monitor</h3>
          <p className="text-sm text-gray-600 mt-1">Products trending on social media</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Product</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Tweet Volume</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Sentiment</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Trend Index</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Predicted Spike</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Timeframe</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {viralProducts.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-800">{item.product}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Twitter className="w-4 h-4 text-blue-600" />
                      <span className="font-semibold text-gray-800">{item.tweetVolume.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="font-semibold text-gray-800">{item.sentiment}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-blue-600">{item.trendIndex}/10</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-bold text-red-600">+{item.predictedSpike}%</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">{item.timeframe}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Trending Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Viral Products</h3>
          </div>
          <p className="text-3xl font-bold mb-2">3</p>
          <p className="text-purple-100">Currently trending</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Twitter className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Total Mentions</h3>
          </div>
          <p className="text-3xl font-bold mb-2">39.9K</p>
          <p className="text-orange-100">In last 24 hours</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Heart className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Avg Sentiment</h3>
          </div>
          <p className="text-3xl font-bold mb-2">7.9/10</p>
          <p className="text-green-100">Positive sentiment</p>
        </div>
      </div>
    </div>
  );
};

export default TrendAnalyzer;
