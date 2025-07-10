import React from 'react'
import { Button } from './Button'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import {
  UserIcon,
  ShieldCheckIcon,
  LogInIcon,
} from 'lucide-react'

export const AuthForm = ({ onSuccess }) => {
  const { t } = useLanguage()
  const { login, isLoading, error } = useAuth()

  const handleLogin = async () => {
    try {
      await login()
      onSuccess()
    } catch (err) {
      console.error('Login error:', err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
            <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            {t('auth.authRequired')}
          </h2>
          <p className="text-gray-500">
            {t('auth.pleaseLoginOrRegister')}
          </p>
        </div>

        {/* Auth0 Login */}
        <div className="space-y-6">
          <Button 
            onClick={handleLogin} 
            fullWidth 
            size="large" 
            disabled={isLoading}
          >
            <LogInIcon size={20} className="mr-2" />
            {isLoading ? 'Authenticating...' : t('auth.login')}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Secure authentication powered by Auth0
            </p>
          </div>
        </div>

        {/* Error Messages */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
            {error}
          </div>
        )}

        {/* Features */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Why authenticate?
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <UserIcon size={16} className="mr-2 text-blue-500" />
              Access your QR codes anytime
            </li>
            <li className="flex items-center">
              <ShieldCheckIcon size={16} className="mr-2 text-blue-500" />
              Secure purchase history
            </li>
            <li className="flex items-center">
              <UserIcon size={16} className="mr-2 text-blue-500" />
              Account management
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}