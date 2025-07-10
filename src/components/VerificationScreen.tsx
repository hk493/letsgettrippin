import React, { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useLanguage } from '../context/LanguageContext'
import { CheckCircleIcon, LoaderIcon } from 'lucide-react'

export const VerificationScreen = ({ onSuccess }) => {
  const { t } = useLanguage()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    // Auto-redirect when user is authenticated and verified
    if (user && user.verified && !isLoading) {
      setTimeout(() => {
        onSuccess()
      }, 1500)
    }
  }, [user, isLoading, onSuccess])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <LoaderIcon className="h-16 w-16 mx-auto text-blue-500 mb-4 animate-spin" />
          <h2 className="text-2xl font-bold mb-2">Verifying...</h2>
          <p className="text-gray-600">Please wait while we verify your account</p>
        </div>
      </div>
    )
  }

  if (user && user.verified) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <CheckCircleIcon className="h-16 w-16 mx-auto text-green-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">
            {t('auth.verificationSuccess')}
          </h2>
          <p className="text-gray-600 mb-4">{t('auth.continueToPayment')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Account Not Verified</h2>
        <p className="text-gray-600">Please verify your email address to continue.</p>
      </div>
    </div>
  )
}