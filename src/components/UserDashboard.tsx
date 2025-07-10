import React, { useState } from 'react'
import { Button } from './Button'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import {
  UserIcon,
  ShoppingBagIcon,
  QrCodeIcon,
  SettingsIcon,
  LogOutIcon,
  EditIcon,
  SaveIcon,
  XIcon,
} from 'lucide-react'

export const UserDashboard = ({ onClose }) => {
  const { t } = useLanguage()
  const { user, logout, updateUserProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    email: user?.email || ''
  })

  const handleSaveProfile = () => {
    updateUserProfile(editForm)
    setIsEditing(false)
  }

  const handleCancelEdit = () => {
    setEditForm({
      name: user?.name || '',
      email: user?.email || ''
    })
    setIsEditing(false)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-800'
      case 'Expired':
        return 'bg-gray-100 text-gray-800'
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg max-h-[90vh] overflow-hidden">
      <div className="border-b px-6 py-4 flex justify-between items-center">
        <h2 className="text-xl font-bold">{t('auth.accountSettings')}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <XIcon size={24} />
        </button>
      </div>

      <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium flex items-center">
              <UserIcon size={20} className="mr-2" />
              {t('auth.profile')}
            </h3>
            {!isEditing && (
              <Button
                variant="secondary"
                size="small"
                onClick={() => setIsEditing(true)}
              >
                <EditIcon size={16} className="mr-1" />
                Edit
              </Button>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center overflow-hidden">
                {user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UserIcon size={32} className="text-blue-500" />
                )}
              </div>
              <div className="ml-4 flex-1">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Name"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      placeholder="Email"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-2">
                      <Button
                        variant="primary"
                        size="small"
                        onClick={handleSaveProfile}
                      >
                        <SaveIcon size={16} className="mr-1" />
                        Save
                      </Button>
                      <Button
                        variant="secondary"
                        size="small"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-medium">
                      {user?.name || 'No name set'}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.email}
                    </p>
                    <div className="flex items-center mt-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${user?.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {user?.verified ? 'Verified' : 'Unverified'}
                      </span>
                      {user?.stripeCustomerId && (
                        <span className="ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                          Stripe: {user.stripeCustomerId}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* QR Codes Section */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <QrCodeIcon size={20} className="mr-2" />
            {t('auth.myQrCodes')}
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            {user?.orders && user.orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {user.orders.filter(order => order.status === 'Active').map((order) => (
                  <div key={order.id} className="bg-white rounded-lg p-4 border">
                    <div className="text-center">
                      <img
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://esim-activation-${order.id}.com/activate`}
                        alt={`QR Code for ${order.planName}`}
                        className="w-32 h-32 mx-auto mb-2"
                      />
                      <p className="text-sm font-medium">{order.planName}</p>
                      <p className="text-xs text-gray-500">{order.id}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center">
                No active eSIM QR codes found
              </p>
            )}
          </div>
        </div>

        {/* Purchase History */}
        <div className="mb-8">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <ShoppingBagIcon size={20} className="mr-2" />
            {t('auth.purchaseHistory')}
          </h3>
          <div className="bg-white rounded-lg border overflow-hidden">
            {user?.orders && user.orders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {user.orders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.planName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.data}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ¥{order.price.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                No purchase history found
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button variant="secondary" onClick={onClose} size="medium">
            {t('cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              logout()
              onClose()
            }}
            size="medium"
          >
            <LogOutIcon size={18} className="mr-2" />
            {t('auth.logout')}
          </Button>
        </div>
      </div>
    </div>
  )
}