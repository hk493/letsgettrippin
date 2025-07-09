import React, { useState, useEffect } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
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
        activePlans: 245 + Math.floor(Math.random() * 20),
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
      location: 'Tokyo Station',
      sales: 23,
      revenue: 64400,
      lastSale: '2024-12-12 13:45',
      status: 'Online'
    },
    {
      terminal: 'Terminal 005',
      location: 'Shinjuku Station',
      sales: 28,
      revenue: 71200,
      lastSale: '2024-12-12 14:28',
      status: 'Online'
    },
  ]

  const inventoryData = [
    {
      plan: 'Japan Basic (3 Days)',
      available: 89,
      issued: 67,
      limit: 200,
      trend: '+5'
    },
    {
      plan: 'Japan Standard (7 Days)',
      available: 156,
      issued: 94,
      limit: 250,
      trend: '+12'
    },
    {
      plan: 'Japan Premium (30 Days)',
      available: 78,
      issued: 42,
      limit: 150,
      trend: '+3'
    },
  ]

  const recentOrders = [
    {
      id: 'ORD-1734012345',
      customer: 'john.doe@email.com',
      plan: 'Japan Standard',
      amount: 2800,
      status: 'Completed',
      timestamp: '2024-12-12 14:30'
    },
    {
      id: 'ORD-1734012344',
      customer: 'mary.smith@email.com',
      plan: 'Japan Premium',
      amount: 5000,
      status: 'Processing',
      timestamp: '2024-12-12 14:28'
    },
    {
      id: 'ORD-1734012343',
      customer: 'wang.li@email.com',
      plan: 'Japan Basic',
      amount: 1500,
      status: 'Completed',
      timestamp: '2024-12-12 14:25'
    },
  ]

  const errorLogs = [
    {
      id: 1,
      terminal: 'Terminal 002',
      timestamp: '2024-12-12 14:23',
      error: 'Payment API Timeout',
      severity: 'Medium'
    },
    {
      id: 2,
      terminal: 'Terminal 003',
      timestamp: '2024-12-12 10:45',
      error: 'eSIM Provider API Error',
      severity: 'High'
    },
    {
      id: 3,
      terminal: 'Terminal 001',
      timestamp: '2024-12-11 16:30',
      error: 'Network Connection Issue',
      severity: 'Low'
    },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'sales':
        return (
          <div>
            {/* Real-time Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUpIcon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">今日の売上</p>
                    <p className="text-2xl font-bold text-gray-900">{realTimeData.totalSales}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <DollarSignIcon className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">今日の売上高</p>
                    <p className="text-2xl font-bold text-gray-900">¥{realTimeData.totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <BoxIcon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">アクティブプラン</p>
                    <p className="text-2xl font-bold text-gray-900">{realTimeData.activePlans}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <AlertCircleIcon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">処理中注文</p>
                    <p className="text-2xl font-bold text-gray-900">{realTimeData.pendingOrders}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">端末別売上実績</h2>
              <Button variant="secondary" size="small">
                <DownloadIcon size={16} className="mr-2" />
                CSV出力
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      端末ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      設置場所
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      売上件数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      売上高
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      最終売上
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salesData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.terminal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.sales}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ¥{item.revenue.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.lastSale}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Orders */}
            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">最新注文</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        注文ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        顧客
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        プラン
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        金額
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        状態
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        時刻
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.customer}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ¥{order.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              order.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.timestamp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )
      case 'inventory':
        return (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">eSIM在庫管理</h2>
              <Button variant="secondary" size="small">
                <DownloadIcon size={16} className="mr-2" />
                CSV出力
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      プラン
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      在庫数
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      発行済み
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      上限
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      トレンド
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {inventoryData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.plan}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.available}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.issued}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.limit}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                        {item.trend}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.available > item.limit * 0.3 
                              ? 'bg-green-100 text-green-800' 
                              : item.available > item.limit * 0.1
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {item.available > item.limit * 0.3 
                            ? '十分' 
                            : item.available > item.limit * 0.1
                            ? '少ない'
                            : '不足'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      case 'errors':
        return (
          <div>
            <div className="flex justify-between mb-6">
              <h2 className="text-xl font-bold">エラーログ</h2>
              <Button variant="secondary" size="small">
                <DownloadIcon size={16} className="mr-2" />
                CSV出力
              </Button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      端末
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      時刻
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      エラー内容
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      重要度
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      状態
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {errorLogs.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.terminal}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.timestamp}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.error}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.severity === 'High' ? 'bg-red-100 text-red-800' :
                          item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {item.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                          未解決
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      default:
        return <div>タブを選択してデータを表示</div>
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <Logo size="medium" />
          <div className="text-sm mt-2 text-gray-400">管理者ダッシュボード</div>
          <div className="text-xs mt-1 text-green-400">● リアルタイム更新中</div>
        </div>

        <nav className="flex-1 p-4">
          <button
            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'sales' ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-2 transition-colors`}
            onClick={() => setActiveTab('sales')}
          >
            <BarChartIcon size={18} className="mr-3" />
            <span>売上管理</span>
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'inventory' ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-2 transition-colors`}
            onClick={() => setActiveTab('inventory')}
          >
            <BoxIcon size={18} className="mr-3" />
            <span>在庫管理</span>
          </button>
          <button
            className={`flex items-center w-full p-3 rounded-lg ${activeTab === 'errors' ? 'bg-blue-600' : 'hover:bg-gray-700'} mb-2 transition-colors`}
            onClick={() => setActiveTab('errors')}
          >
            <AlertCircleIcon size={18} className="mr-3" />
            <span>エラーログ</span>
          </button>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            className="flex items-center w-full p-3 rounded-lg hover:bg-gray-700 text-gray-400 transition-colors"
            onClick={onExit}
          >
            <LogOutIcon size={18} className="mr-3" />
            <span>管理者モード終了</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold">
              {activeTab === 'sales' && '売上ダッシュボード'}
              {activeTab === 'inventory' && '在庫管理'}
              {activeTab === 'errors' && 'エラー監視'}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                最終更新: {new Date().toLocaleTimeString('ja-JP')}
              </div>
              <span className="bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                管理者
              </span>
              <span className="text-sm">admin@esimport.jp</span>
            </div>
          </div>
        </header>
        <main className="p-6">{renderContent()}</main>
      </div>
    </div>
  )
}