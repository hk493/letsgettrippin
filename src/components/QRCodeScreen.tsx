import React, { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { useLanguage } from '../context/LanguageContext'
import { QrCodeIcon, PrinterIcon, ArrowLeftIcon, CheckCircleIcon, DownloadIcon } from 'lucide-react'

export const QRCodeScreen = ({ plan, orderId, onContinue }) => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)

  // Simulate QR code loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  const handleHomeClick = () => {
    window.location.href = '/'
  }

  // Generate QR code URL with order ID
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://esim-activation-${orderId}.com/activate`

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    printWindow.document.write(`
      <html>
        <head>
          <title>eSIM QR Code - ${orderId}</title>
          <style>
            body { 
              font-family: 'Poppins', Arial, sans-serif; 
              text-align: center; 
              padding: 40px; 
              background: linear-gradient(135deg, #FADADD 0%, #FFE4E6 100%);
            }
            .container {
              background: white;
              border-radius: 20px;
              padding: 40px;
              box-shadow: 0 10px 30px rgba(0,0,0,0.1);
              max-width: 500px;
              margin: 0 auto;
            }
            .header {
              background: linear-gradient(135deg, #264653 0%, #2A5A6B 100%);
              color: white;
              padding: 20px;
              border-radius: 15px;
              margin-bottom: 30px;
            }
            .qr-container { 
              margin: 30px 0; 
              padding: 20px;
              background: #f8f9fa;
              border-radius: 15px;
            }
            .order-info { 
              margin: 20px 0; 
              text-align: left;
              background: #e3f2fd;
              padding: 20px;
              border-radius: 15px;
            }
            .mascot { font-size: 3rem; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🦊 Esimport - Your Japan eSIM</h1>
            </div>
            <div class="order-info">
              <p><strong>Order ID:</strong> ${orderId}</p>
              <p><strong>Plan:</strong> ${plan?.name}</p>
              <p><strong>Duration:</strong> ${plan?.duration}</p>
              <p><strong>Data:</strong> ${plan?.data}</p>
              ${plan?.price === 0 ? '<p><strong>Price:</strong> FREE (Test Plan)</p>' : `<p><strong>Price:</strong> ¥${plan?.price?.toLocaleString()}</p>`}
            </div>
            <div class="qr-container">
              <img src="${qrCodeUrl}" alt="eSIM QR Code" style="width: 300px; height: 300px; border-radius: 15px;">
            </div>
            <div class="mascot">🌸</div>
            <p style="color: #666; font-size: 14px;">${t('scanInstructions')}</p>
            <p style="color: #666; font-size: 12px; margin-top: 20px;">Keep this QR code safe - you'll need it to activate your eSIM</p>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 wave-pattern">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-20 floating-animation">🌸</div>
      <div className="absolute top-40 right-20 text-4xl opacity-30 floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-25 floating-animation" style={{ animationDelay: '4s' }}>🗾</div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-pink-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Logo size="medium" />
              <div className="hidden md:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                  Esimport
                </h1>
                <p className="text-sm text-gray-600">{t('scanQR')}</p>
              </div>
            </div>
            
            <Button variant="secondary" onClick={handleHomeClick} size="medium" className="btn-secondary">
              <ArrowLeftIcon size={18} className="mr-2" />
              {t('home')}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <CheckCircleIcon className="text-green-500 mr-3" size={24} />
              <span className="font-medium text-gray-700">{t('complete')}</span>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t('scanQR')}
            </h1>
            
            <div className="text-2xl mb-4 mascot-bounce">🦊</div>
          </div>

          {/* QR Code Card */}
          <div className="feature-card">
            {/* Order Information */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-4 text-center text-gray-800">{t('orderDetails')}</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">{t('orderId')}:</p>
                  <p className="font-semibold text-blue-600">{orderId}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('plan')}:</p>
                  <p className="font-semibold">{plan?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('duration')}:</p>
                  <p className="font-semibold">{plan?.duration}</p>
                </div>
                <div>
                  <p className="text-gray-600">{t('data')}:</p>
                  <p className="font-semibold">{plan?.data}</p>
                </div>
              </div>
              {plan?.price === 0 && (
                <div className="mt-4 text-center">
                  <span className="inline-flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    <CheckCircleIcon size={16} className="mr-1" />
                    {t('freePlan')}
                  </span>
                </div>
              )}
            </div>

            {/* QR Code Display */}
            <div className="text-center mb-8">
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('processing')}</p>
                    <div className="text-2xl mt-4 mascot-bounce">🦊</div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-gradient-to-r from-pink-200 to-blue-200 inline-block">
                    <img
                      src={qrCodeUrl}
                      alt="eSIM QR Code"
                      className="w-80 h-80 rounded-2xl"
                    />
                  </div>
                  
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h4 className="font-bold text-lg mb-3 text-blue-800">{t('activationTitle')}</h4>
                    <ol className="text-left text-sm text-blue-700 space-y-2">
                      <li>{t('activationStep1')}</li>
                      <li>{t('activationStep2')}</li>
                      <li>{t('activationStep3')}</li>
                      <li>{t('activationStep4')}</li>
                      <li>{t('activationStep5')}</li>
                    </ol>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={handlePrint}
                  disabled={isLoading}
                  className="btn-secondary flex items-center justify-center"
                >
                  <PrinterIcon size={18} className="mr-2" />
                  {t('printQrCode')}
                </button>
                
                <button
                  onClick={() => {
                    const link = document.createElement('a')
                    link.href = qrCodeUrl
                    link.download = `esim-qr-${orderId}.png`
                    link.click()
                  }}
                  disabled={isLoading}
                  className="btn-secondary flex items-center justify-center"
                >
                  <DownloadIcon size={18} className="mr-2" />
                  {t('downloadQR')}
                </button>
              </div>
              
              <button 
                onClick={onContinue} 
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}