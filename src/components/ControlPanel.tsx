import React, { useState } from 'react';
import { Truck, Package, CheckCircle, AlertTriangle, Clock, FileText } from 'lucide-react';

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState('reorders');

  const pendingReorders = [
    {
      id: 'RO-001',
      product: 'Wireless Headphones Pro',
      currentStock: 45,
      requiredStock: 200,
      supplier: 'TechCorp',
      urgency: 'High',
      estimatedDelivery: '2025-01-05'
    },
    {
      id: 'RO-002',
      product: 'Smart Fitness Tracker',
      currentStock: 89,
      requiredStock: 180,
      supplier: 'FitTech',
      urgency: 'Medium',
      estimatedDelivery: '2025-01-07'
    },
    {
      id: 'RO-003',
      product: 'Bluetooth Speaker',
      currentStock: 23,
      requiredStock: 150,
      supplier: 'SoundWave',
      urgency: 'Critical',
      estimatedDelivery: '2025-01-03'
    }
  ];

  const shipments = [
    {
      id: 'SH-001',
      type: 'Inbound',
      product: 'Yoga Mat Premium',
      quantity: 500,
      source: 'ZenFit Factory',
      status: 'In Transit',
      eta: '2025-01-04'
    },
    {
      id: 'SH-002',
      type: 'Outbound',
      product: 'Wireless Headphones',
      quantity: 150,
      destination: 'Retail Store A',
      status: 'Processing',
      eta: '2025-01-03'
    },
    {
      id: 'SH-003',
      type: 'Inbound',
      product: 'Smart Home Hub',
      quantity: 200,
      source: 'SmartTech Inc',
      status: 'Delayed',
      eta: '2025-01-06'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-purple-100 text-purple-800';
      case 'Delayed': return 'bg-red-100 text-red-800';
      case 'Delivered': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Warehouse Manager Control Panel</h1>
        <p className="text-gray-600">Manage reorders, restocking, and shipments</p>
      </div>

      {/* Control Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('reorders')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'reorders' 
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Package className="w-5 h-5" />
            <span>Pending Reorders</span>
          </button>
          <button
            onClick={() => setActiveTab('shipments')}
            className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
              activeTab === 'shipments' 
                ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Truck className="w-5 h-5" />
            <span>Shipments</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'reorders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Pending Reorder Requests</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Generate Report
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 rounded-lg">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Reorder ID</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Product</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Current Stock</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Required</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Supplier</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Urgency</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">ETA</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {pendingReorders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-blue-600">{order.id}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">{order.product}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-red-600">{order.currentStock}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-gray-800">{order.requiredStock}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-600">{order.supplier}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(order.urgency)}`}>
                            {order.urgency}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-600">
                            {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <FileText className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'shipments' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">Active Shipments</h3>
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                  Track Shipment
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 rounded-lg">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Shipment ID</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Type</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Product</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Quantity</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-800">Source/Destination</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">ETA</th>
                      <th className="px-6 py-3 text-center text-sm font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {shipments.map((shipment) => (
                      <tr key={shipment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="font-medium text-blue-600">{shipment.id}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            shipment.type === 'Inbound' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                          }`}>
                            {shipment.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium text-gray-800">{shipment.product}</span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="font-semibold text-gray-800">{shipment.quantity}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-gray-600">
                            {shipment.source || shipment.destination}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(shipment.status)}`}>
                            {shipment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-gray-600">
                            {new Date(shipment.eta).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center space-x-2">
                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                              <Truck className="w-4 h-4" />
                            </button>
                            <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                              <Clock className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Bulk Reorder</h3>
          </div>
          <p className="text-gray-600 text-sm">Process multiple reorders</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Approve Orders</h3>
          </div>
          <p className="text-gray-600 text-sm">Review and approve pending orders</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-purple-50 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Schedule Delivery</h3>
          </div>
          <p className="text-gray-600 text-sm">Plan outbound shipments</p>
        </button>

        <button className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow text-left">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 bg-orange-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-800">Critical Alerts</h3>
          </div>
          <p className="text-gray-600 text-sm">Handle urgent notifications</p>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Pending Reorders</h3>
          <p className="text-3xl font-bold mb-2">3</p>
          <p className="text-blue-100">Requiring attention</p>
        </div>
        
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Active Shipments</h3>
          <p className="text-3xl font-bold mb-2">7</p>
          <p className="text-green-100">In transit or processing</p>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Deliveries Today</h3>
          <p className="text-3xl font-bold mb-2">2</p>
          <p className="text-purple-100">Expected arrivals</p>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;