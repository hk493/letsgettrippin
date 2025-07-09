import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  UserIcon, 
  ShoppingBagIcon, 
  QrCodeIcon, 
  EditIcon, 
  SaveIcon, 
  WifiIcon,
  MapPinIcon,
  TrendingUpIcon,
  HeartIcon,
  CalendarIcon
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  });

  const handleSaveProfile = () => {
    updateUserProfile(editForm);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || ''
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800';
      case 'Expired':
        return 'bg-gray-100 text-gray-800';
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mock data for demonstration
  const mockOrders = [
    {
      id: 'ORD-001',
      planName: 'Adventurer Plan',
      status: 'Active',
      purchaseDate: '2024-01-15T10:30:00',
      expiryDate: '2024-01-22T10:30:00',
      amount: 1980,
      dataUsed: '1.2GB',
      dataLimit: '3GB'
    },
    {
      id: 'ORD-002',
      planName: 'Explorer Plan',
      status: 'Expired',
      purchaseDate: '2024-01-08T14:20:00',
      expiryDate: '2024-01-11T14:20:00',
      amount: 980,
      dataUsed: '0.8GB',
      dataLimit: '1GB'
    }
  ];

  const mockTravelPlans = [
    {
      id: 1,
      title: 'Tokyo Adventure',
      duration: '7 days',
      status: 'Active',
      progress: 75,
      destinations: ['Shibuya', 'Asakusa', 'Harajuku']
    },
    {
      id: 2,
      title: 'Kyoto Cultural Tour',
      duration: '5 days',
      status: 'Planning',
      progress: 30,
      destinations: ['Fushimi Inari', 'Kinkaku-ji', 'Arashiyama']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Let&apos;s Get Trippin&apos;, {user?.name || 'Traveler'}!
          </h1>
          <p className="text-gray-600 text-lg">
            Your Japan adventure dashboard - where the journey begins
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Plans</p>
                <p className="text-3xl font-bold text-blue-600">2</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <WifiIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Data Used</p>
                <p className="text-3xl font-bold text-green-600">2.0GB</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUpIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Travel Plans</p>
                <p className="text-3xl font-bold text-purple-600">3</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <MapPinIcon className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Savings</p>
                <p className="text-3xl font-bold text-orange-600">¥15,000</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <UserIcon size={24} className="mr-2" />
                Profile Settings
              </h2>
            </div>
            
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center overflow-hidden">
                  {user?.picture ? (
                    <img 
                      src={user.picture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon size={40} className="text-blue-500" />
                  )}
                </div>
                <div className="ml-6 flex-1">
                  {isEditing ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        placeholder="Name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        placeholder="Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="flex space-x-3">
                        <button
                          onClick={handleSaveProfile}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center"
                        >
                          <SaveIcon size={16} className="mr-2" />
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-gray-800">
                        {user?.name || 'No name set'}
                      </h3>
                      <p className="text-gray-600 mb-3">
                        {user?.email}
                      </p>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 text-sm rounded-full ${user?.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {user?.verified ? '✓ Verified' : '⚠ Unverified'}
                        </span>
                        {user?.stripeCustomerId && (
                          <span className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800">
                            Stripe Customer
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
                      >
                        <EditIcon size={16} className="mr-2" />
                        Edit Profile
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* QR Codes Section */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <QrCodeIcon size={24} className="mr-2" />
                Active eSIM QR Codes
              </h2>
            </div>
            
            <div className="p-6">
              {mockOrders.filter(order => order.status === 'Active').length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {mockOrders.filter(order => order.status === 'Active').map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="text-center">
                        <img
                          src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://esim-activation-${order.id}.com/activate`}
                          alt={`QR Code for ${order.planName}`}
                          className="w-24 h-24 mx-auto mb-3"
                        />
                        <p className="font-semibold text-gray-800">{order.planName}</p>
                        <p className="text-sm text-gray-500 mb-2">{order.id}</p>
                        <div className="flex items-center justify-center space-x-2">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                            Active
                          </span>
                          <span className="text-xs text-gray-500">
                            Expires: {formatDate(order.expiryDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <QrCodeIcon size={48} className="text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No active eSIM QR codes found</p>
                  <button
                    onClick={() => navigate('/planning')}
                    className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Get Your First eSIM
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Travel Plans Section */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <MapPinIcon size={24} className="mr-2" />
                Your Travel Plans
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockTravelPlans.map((plan) => (
                  <div key={plan.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{plan.title}</h3>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        plan.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {plan.status}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <CalendarIcon size={16} className="mr-2" />
                        {plan.duration}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${plan.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{plan.progress}% complete</p>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Destinations:</p>
                      <div className="flex flex-wrap gap-2">
                        {plan.destinations.map((dest, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {dest}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => navigate(`/trip/${plan.id}`)}
                      className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => navigate('/planning')}
                  className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 flex items-center mx-auto"
                >
                  <MapPinIcon size={20} className="mr-2" />
                  Create New Travel Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Purchase History */}
        <div className="mt-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-6 text-white">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingBagIcon size={24} className="mr-2" />
                Purchase History
              </h2>
            </div>
            
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Plan</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Purchase Date</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Data Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">{order.id}</td>
                        <td className="py-3 px-4 text-sm text-gray-800">{order.planName}</td>
                        <td className="py-3 px-4">
                          <span className={`px-3 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">{formatDate(order.purchaseDate)}</td>
                        <td className="py-3 px-4 text-sm font-medium text-gray-800">¥{order.amount.toLocaleString()}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{order.dataUsed} / {order.dataLimit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;