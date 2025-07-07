import React, { useState } from 'react';
import { MapPin, Calendar, Users, TrendingUp, Calculator } from 'lucide-react';

const EventEstimator = () => {
  const [eventData, setEventData] = useState({
    region: 'bangalore',
    eventScore: '',
    eventType: 'festival'
  });

  const [estimate, setEstimate] = useState<{
    multiplier: number;
    explanation: string;
    duration: string;
  } | null>(null);

  const calculateEventImpact = () => {
    const score = parseFloat(eventData.eventScore);
    if (isNaN(score)) return;

    let multiplier = 1.0;
    let explanation = '';
    let duration = '';

    // Event impact based on type and score
    switch (eventData.eventType) {
      case 'festival':
        multiplier = 1.0 + (score * 0.1);
        explanation = `${eventData.region} festival surge expected`;
        duration = '1-2 weeks';
        break;
      case 'conference':
        multiplier = 1.0 + (score * 0.05);
        explanation = `Professional conference in ${eventData.region}`;
        duration = '3-5 days';
        break;
      case 'sports':
        multiplier = 1.0 + (score * 0.15);
        explanation = `Major sporting event impact in ${eventData.region}`;
        duration = '1 week';
        break;
      case 'concert':
        multiplier = 1.0 + (score * 0.08);
        explanation = `Concert series driving local demand`;
        duration = '2-3 days';
        break;
    }

    setEstimate({ multiplier, explanation, duration });
  };

  const upcomingEvents = [
    {
      event: 'Diwali Festival',
      region: 'Mumbai',
      date: '2025-01-15',
      score: 9.5,
      type: 'Festival',
      expectedImpact: '+95%',
      categories: ['Electronics', 'Gifts', 'Clothing']
    },
    {
      event: 'Tech Summit 2025',
      region: 'Bangalore',
      date: '2025-01-20',
      score: 7.2,
      type: 'Conference',
      expectedImpact: '+36%',
      categories: ['Electronics', 'Gadgets', 'Accessories']
    },
    {
      event: 'IPL Match',
      region: 'Chennai',
      date: '2025-01-25',
      score: 8.1,
      type: 'Sports',
      expectedImpact: '+122%',
      categories: ['Sports Gear', 'Snacks', 'Merchandise']
    },
    {
      event: 'Music Festival',
      region: 'Pune',
      date: '2025-01-30',
      score: 6.8,
      type: 'Concert',
      expectedImpact: '+54%',
      categories: ['Audio Equipment', 'Apparel', 'Accessories']
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'Festival': return '🎉';
      case 'Conference': return '💼';
      case 'Sports': return '⚽';
      case 'Concert': return '🎵';
      default: return '📅';
    }
  };

  const getImpactColor = (impact: string) => {
    const value = parseInt(impact.replace('%', '').replace('+', ''));
    if (value > 80) return 'text-red-600';
    if (value > 40) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Event Spike Estimator</h1>
        <p className="text-gray-600">Predict demand spikes from local events and festivals</p>
      </div>

      {/* Event Calculator */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-2 mb-6">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Event Impact Calculator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Region</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={eventData.region}
              onChange={(e) => setEventData({...eventData, region: e.target.value})}
            >
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
              <option value="chennai">Chennai</option>
              <option value="pune">Pune</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Score (0-10)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="8.5"
              value={eventData.eventScore}
              onChange={(e) => setEventData({...eventData, eventScore: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <select 
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={eventData.eventType}
              onChange={(e) => setEventData({...eventData, eventType: e.target.value})}
            >
              <option value="festival">Festival</option>
              <option value="conference">Conference</option>
              <option value="sports">Sports Event</option>
              <option value="concert">Concert</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateEventImpact}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Calculate Event Impact
        </button>

        {/* Estimate Results */}
        {estimate && (
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <h4 className="font-semibold text-gray-800">Demand Multiplier</h4>
                </div>
                <p className="text-3xl font-bold text-purple-600">{estimate.multiplier.toFixed(1)}x</p>
                <p className="text-sm text-gray-600">Expected increase</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <h4 className="font-semibold text-gray-800">Duration</h4>
                </div>
                <p className="text-2xl font-bold text-blue-600">{estimate.duration}</p>
                <p className="text-sm text-gray-600">Impact period</p>
              </div>

              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-gray-800">Explanation</h4>
                </div>
                <p className="text-sm font-medium text-gray-800">{estimate.explanation}</p>
                <p className="text-sm text-gray-600">Reason for spike</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Upcoming Events Calendar</h3>
          <p className="text-sm text-gray-600 mt-1">Major events affecting warehouse demand</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Event</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Region</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Date</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Score</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Expected Impact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Categories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {upcomingEvents.map((event, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getEventIcon(event.type)}</span>
                      <div>
                        <span className="font-medium text-gray-800">{event.event}</span>
                        <p className="text-sm text-gray-500">{event.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-medium text-gray-800">{event.region}</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="text-gray-600">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="font-semibold text-blue-600">{event.score}/10</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`font-bold ${getImpactColor(event.expectedImpact)}`}>
                      {event.expectedImpact}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {event.categories.map((category, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {category}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Event Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-6 h-6" />
            <h3 className="font-semibold">High Impact</h3>
          </div>
          <p className="text-3xl font-bold mb-2">2</p>
          <p className="text-red-100 text-sm">Events this month</p>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <Calendar className="w-6 h-6" />
            <h3 className="font-semibold">Total Events</h3>
          </div>
          <p className="text-3xl font-bold mb-2">4</p>
          <p className="text-orange-100 text-sm">Next 30 days</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-6 h-6" />
            <h3 className="font-semibold">Avg Impact</h3>
          </div>
          <p className="text-3xl font-bold mb-2">+77%</p>
          <p className="text-green-100 text-sm">Demand increase</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-6 h-6" />
            <h3 className="font-semibold">Top Region</h3>
          </div>
          <p className="text-3xl font-bold mb-2">Mumbai</p>
          <p className="text-purple-100 text-sm">Highest activity</p>
        </div>
      </div>
    </div>
  );
};

export default EventEstimator;