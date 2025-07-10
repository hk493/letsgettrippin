import React, { useState, useEffect } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { Layout } from '../components/Layout'
import {
  BarChartIcon,
  UsersIcon,
  BoxIcon,
  AlertCircleIcon,
  DownloadIcon,
  LogOutIcon,
  TrendingUpIcon,
  DollarSignIcon,
} from 'lucide-react'

export const AdminDashboard = ({ onExit }) => {
  const [activeTab, setActiveTab] = useState('sales')
  const [realTimeData, setRealTimeData] = useState({
    totalSales: 0,
    totalRevenue: 0,
    activePlans: 0,
    pendingOrders: 0
  })

  // Simulate real-time data updates
  useEffect(() => {
    const updateRealTimeData = () => {
      setRealTimeData(prev => ({
        totalSales: prev.totalSales + Math.floor(Math.random() * 3),
        totalRevenue: prev.totalRevenue + (Math.floor(Math.random() * 5000) + 1000),
        activePlans: 245 + Math.floor(Math.random() * 10),
        pendingOrders: Math.floor(Math.random() * 5)
      }))
    }

    // Initial data
    setRealTimeData({
      totalSales: 156,
      totalRevenue: 428000,
      activePlans: 245,
      pendingOrders: 2
    })

    // Update every 30 seconds
    const interval = setInterval(updateRealTimeData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Real sales data with timestamps
  const salesData = [
    {
      terminal: 'Terminal 001',
      location: 'Narita Airport T1',
      sales: 32,
      revenue: 89600,
      lastSale: '2024-12-12 14:23',
      status: 'Online'
    },
    {
      terminal: 'Terminal 002',
      location: 'Narita Airport T2',
      sales: 28,
      revenue: 76800,
      lastSale: '2024-12-12 14:15',
      status: 'Online'
    },
    {
      terminal: 'Terminal 003',
      location: 'Haneda Airport',
      sales: 45,
      revenue: 126000,
      lastSale: '2024-12-12 14:30',
      status: 'Online'
    },
    {
      terminal: 'Terminal 004',
      location: 'Kansai Airport',
      sales: 23,
      revenue: 64400,
      lastSale: '2024-12-12 14:18',
      status: 'Online'
    },
    {
      terminal: 'Terminal 005',
      location: 'Chubu Airport',
      sales: 18,
      revenue: 50400,
      lastSale: '2024-12-12 14:25',
      status: 'Online'
    }
  ]

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-4">
              <Logo />
              <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            </div>
            <button
              onClick={onExit}
              className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <LogOutIcon size={20} />
              <span>Exit Admin</span>
            </button>
          </div>

          {/* Real-time Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Sales</p>
                  <p className="text-2xl font-bold text-green-600">{realTimeData.totalSales}</p>
                </div>
                <BarChartIcon className="text-green-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-2xl font-bold text-blue-600">¥{realTimeData.totalRevenue.toLocaleString()}</p>
                </div>
                <DollarSignIcon className="text-blue-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Plans</p>
                  <p className="text-2xl font-bold text-purple-600">{realTimeData.activePlans}</p>
                </div>
                <UsersIcon className="text-purple-500" size={24} />
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-orange-600">{realTimeData.pendingOrders}</p>
                </div>
                <AlertCircleIcon className="text-orange-500" size={24} />
              </div>
            </div>
          </div>

          {/* Sales Data Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Terminal Sales Data</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Terminal</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sale</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((terminal, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{terminal.terminal}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{terminal.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{terminal.sales}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">¥{terminal.revenue.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{terminal.lastSale}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          {terminal.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}