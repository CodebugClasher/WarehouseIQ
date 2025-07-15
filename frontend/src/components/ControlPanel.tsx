import React, { useState } from 'react';
import {
  Truck,
  Package,
  CheckCircle,
  AlertTriangle,
  Clock,
  FileText,
  PlusCircle,
  XCircle
} from 'lucide-react';

interface Reorder {
  id: string;
  product: string;
  currentStock: number;
  requiredStock: number;
  supplier: string;
  urgency: string;
  estimatedDelivery: string;
}

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState<'reorders' | 'shipments'>('reorders');
  const [showReorderForm, setShowReorderForm] = useState(false);
  const [newReorder, setNewReorder] = useState<Reorder>({
    id: '',
    product: '',
    currentStock: 0,
    requiredStock: 0,
    supplier: '',
    urgency: '',
    estimatedDelivery: ''
  });

  const [pendingReorders, setPendingReorders] = useState<Reorder[]>([
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
  ]);

  const handleReorderChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewReorder(prev => ({
      ...prev,
      [name]: name === 'currentStock' || name === 'requiredStock' ? Number(value) : value
    }));
  };

  const handleReorderSubmit = () => {
    setPendingReorders([...pendingReorders, newReorder]);
    setNewReorder({
      id: '',
      product: '',
      currentStock: 0,
      requiredStock: 0,
      supplier: '',
      urgency: '',
      estimatedDelivery: ''
    });
    setShowReorderForm(false);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-white">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Warehouse Manager Control Panel</h1>
        <p className="text-gray-600">Manage reorders, inventory and shipments</p>
      </div>

      {/* Inventory Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Critical Items</h3>
          <p className="text-3xl font-bold mb-2">34</p>
          <p className="text-red-100">Need Immediate Reorder</p>
        </div>
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Low Stock</h3>
          <p className="text-3xl font-bold mb-2">120</p>
          <p className="text-yellow-100">Monitor Closely</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Sufficient Stock</h3>
          <p className="text-3xl font-bold mb-2">850</p>
          <p className="text-green-100">Healthy Inventory</p>
        </div>
      </div>

      {/* Inventory Matrix */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory Matrix</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 font-medium">SKU</th>
                <th className="px-6 py-3 font-medium">Product</th>
                <th className="px-6 py-3 font-medium">Brand</th>
                <th className="px-6 py-3 font-medium text-center">Current</th>
                <th className="px-6 py-3 font-medium text-center">Forecast</th>
                <th className="px-6 py-3 font-medium text-center">Required</th>
                <th className="px-6 py-3 font-medium text-center">Status</th>
                <th className="px-6 py-3 font-medium text-center">Price Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-3">SKU-101</td>
                <td className="px-6 py-3">Bluetooth Speaker</td>
                <td className="px-6 py-3">SoundWave</td>
                <td className="px-6 py-3 text-center">23</td>
                <td className="px-6 py-3 text-center">145</td>
                <td className="px-6 py-3 text-center">150</td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Critical</span>
                </td>
                <td className="px-6 py-3 text-center text-orange-600 font-medium">Lower Price</td>
              </tr>
              <tr>
                <td className="px-6 py-3">SKU-102</td>
                <td className="px-6 py-3">Smart Fitness Tracker</td>
                <td className="px-6 py-3">FitTech</td>
                <td className="px-6 py-3 text-center">89</td>
                <td className="px-6 py-3 text-center">120</td>
                <td className="px-6 py-3 text-center">180</td>
                <td className="px-6 py-3 text-center">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Low</span>
                </td>
                <td className="px-6 py-3 text-center text-green-600 font-medium">Hold Price</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Reorders Tab */}
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => setActiveTab('reorders')}
          className={`px-4 py-2 rounded ${activeTab === 'reorders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Reorders
        </button>
        <button
          onClick={() => setActiveTab('shipments')}
          className={`px-4 py-2 rounded ${activeTab === 'shipments' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
        >
          Shipments
        </button>
      </div>

      {activeTab === 'reorders' && (
        <>
          {/* Show Reorders */}
          <div className="grid gap-4">
            {pendingReorders.map((order, idx) => (
              <div key={idx} className="p-4 border rounded-md">
                <p><strong>ID:</strong> {order.id}</p>
                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Stock:</strong> {order.requiredStock}</p>
                <p><strong>Supplier:</strong> {order.supplier}</p>
                <p><strong>Urgency:</strong> {order.urgency}</p>
                <p><strong>ETA:</strong> {order.estimatedDelivery}</p>
              </div>
            ))}
          </div>

          {/* Toggle Form */}
          <div className="text-right">
            <button
              onClick={() => setShowReorderForm(prev => !prev)}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {showReorderForm ? 'Close Form' : 'New Reorder'}
            </button>
          </div>

          {/* Form */}
          {showReorderForm && (
            <div className="bg-gray-50 p-6 rounded-xl border mt-4 space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  name="id"
                  placeholder="Reorder ID"
                  value={newReorder.id}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
                <input
                  name="product"
                  placeholder="Product Name"
                  value={newReorder.product}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
                <input
                  name="supplier"
                  placeholder="Supplier"
                  value={newReorder.supplier}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
                <input
                  name="currentStock"
                  placeholder="Current Stock"
                  type="number"
                  value={newReorder.currentStock}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
                <input
                  name="requiredStock"
                  placeholder="Required Stock"
                  type="number"
                  value={newReorder.requiredStock}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
                <select
                  name="urgency"
                  value={newReorder.urgency}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                >
                  <option value="">Urgency</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <input
                  name="estimatedDelivery"
                  placeholder="ETA"
                  type="date"
                  value={newReorder.estimatedDelivery}
                  onChange={handleReorderChange}
                  className="p-2 border rounded"
                />
              </div>
              <button
                onClick={handleReorderSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Reorder
              </button>
            </div>
          )}
        </>
      )}

      {activeTab === 'shipments' && (
        <div className="text-gray-500">shipments are on the way</div>
      )}
    </div>
  );
};

export default ControlPanel;
