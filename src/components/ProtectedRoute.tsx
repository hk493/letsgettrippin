import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { Button } from './Button'
import { ShieldCheckIcon, LogInIcon } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading, login } = useAuth()
  const { t, currentLanguage } = useLanguage()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {t('loginRequired')}
            </h2>
            <p className="text-gray-500">
              {t('loginRequiredMessage')}
            </p>
          </div>

          {/* Login Button */}
          <div className="space-y-6">
            <Button 
              onClick={() => login(currentLanguage.code)} 
              fullWidth 
              size="large"
            >
              <LogInIcon size={20} className="mr-2" />
              {t('auth.login')}
            </Button>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Secure authentication powered by Auth0
              </p>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Why authenticate?
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center">
                <ShieldCheckIcon size={16} className="mr-2 text-blue-500" />
                Access your QR codes anytime
              </li>
              <li className="flex items-center">
                <ShieldCheckIcon size={16} className="mr-2 text-blue-500" />
                Secure purchase history
              </li>
              <li className="flex items-center">
                <ShieldCheckIcon size={16} className="mr-2 text-blue-500" />
                Account management
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}