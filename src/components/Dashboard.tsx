// dashboard 
import React from 'react';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  BarChart3,
  ArrowUp,
  ArrowDown,
  DollarSign,
  Users
} from 'lucide-react';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Total SKUs',
      value: '12,847',
      change: '+5.2%',
      trend: 'up',
      icon: Package,
      color: 'blue'
    },
    {
      title: 'Capacity Utilization',
      value: '84.3%',
      change: '+2.1%',
      trend: 'up',
      icon: BarChart3,
      color: 'green'
    },
    {
      title: 'Reorder Required',
      value: '327',
      change: '-12.5%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Revenue Impact',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'purple'
    }
  ];

  const insights = [
    {
      title: 'XGBoost Demand Forecast',
      description: 'High accuracy prediction for next 30 days',
      accuracy: '94.2%',
      status: 'optimal',
      icon: TrendingUp
    },
    {
      title: 'Prophet Seasonality',
      description: 'Q4 holiday season trend detected',
      impact: '+23% demand',
      status: 'alert',
      icon: BarChart3
    },
    {
      title: 'Trend Spike Detection',
      description: 'Viral products identified for restocking',
      count: '15 items',
      status: 'action',
      icon: AlertTriangle
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome to WarehouseIQ</h1>
        <p className="text-blue-100 text-lg">AI-powered logistics optimization dashboard</p>
        <div className="mt-6 flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>3 Warehouses</span>
          </div>
          <div className="flex items-center space-x-2">
            <Package className="w-5 h-5" />
            <span>12,847 SKUs</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${metric.color}-50`}>
                  <Icon className={`w-6 h-6 text-${metric.color}-600`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                  <span>{metric.change}</span>
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-1">{metric.value}</h3>
              <p className="text-gray-600 text-sm">{metric.title}</p>
            </div>
          );
        })}
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          const statusColors = {
            optimal: 'green',
            alert: 'yellow',
            action: 'red'
          };
          const color = statusColors[insight.status as keyof typeof statusColors];
          
          return (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg bg-${color}-50`}>
                  <Icon className={`w-5 h-5 text-${color}-600`} />
                </div>
                <h3 className="font-semibold text-gray-800">{insight.title}</h3>
              </div>
              <p className="text-gray-600 mb-3">{insight.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {insight.accuracy || insight.impact || insight.count}
                </span>
                <div className={`px-3 py-1 rounded-full text-xs font-medium bg-${color}-50 text-${color}-700`}>
                  {insight.status.charAt(0).toUpperCase() + insight.status.slice(1)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
            <Package className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Generate Reorder Report</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="font-medium text-purple-800">Run Demand Forecast</span>
          </button>
          <button className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Export Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;