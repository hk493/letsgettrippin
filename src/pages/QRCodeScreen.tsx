import React, { useEffect, useState } from 'react'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'
import { StickyBanner } from '../components/StickyBanner'
import { Layout } from '../components/Layout'
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

  const handleDevicesClick = () => {
    window.location.href = '/devices'
  }

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
            .qr-code {
              margin: 30px 0;
            }
            .qr-code img {
              border: 3px solid #264653;
              border-radius: 15px;
            }
            .instructions {
              background: #f8f9fa;
              padding: 20px;
              border-radius: 15px;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Trippin eSIM</h1>
              <p>Order ID: ${orderId}</p>
            </div>
            
            <div class="qr-code">
              <img src="${qrCodeUrl}" alt="eSIM QR Code" />
            </div>
            
            <div class="instructions">
              <h3>アクティベーション手順</h3>
              <ol style="text-align: left; margin: 20px 0;">
                <li>スマートフォンの設定を開く</li>
                <li>「モバイル通信」または「セルラー」を選択</li>
                <li>「eSIMを追加」をタップ</li>
                <li>QRコードをスキャン</li>
                <li>「eSIMを追加」を確認</li>
                <li>アクティベーション完了まで数分待機</li>
              </ol>
            </div>
            
            <div class="footer">
              <p>Trippin - 日本旅行をより楽しく</p>
              <p>サポート: support@trippin.com</p>
            </div>
          </div>
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 wave-pattern">
        {/* Sticky Banner */}
        <StickyBanner 
          onDevicesClick={handleDevicesClick}
          onHomeClick={handleHomeClick}
        />

        <main className="container mx-auto p-6 relative z-10">
          <div className="max-w-2xl mx-auto">
            {/* Success Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
                <img 
                  src="/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview.png" 
                  alt="Esimport Mascot" 
                  className="w-12 h-12 mr-3 mascot-bounce object-contain"
                  onError={(e) => {
                    console.log('Primary mascot image failed, trying fallback...')
                    e.target.src = "/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview copy.png"
                    e.target.onerror = () => {
                      console.log('All mascot images failed, using emoji fallback')
                      e.target.style.display = 'none'
                      const fallback = document.createElement('div')
                      fallback.className = 'text-3xl mr-3 mascot-bounce'
                      fallback.textContent = '🦊'
                      e.target.parentNode.insertBefore(fallback, e.target.nextSibling)
                    }
                  }}
                />
                <span className="font-medium text-gray-700">{t('activationReady')}</span>
              </div>
              
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                {t('activationSuccess')}
              </h1>
              
              <p className="text-gray-600">
                {t('qrCodeReady')}
              </p>
            </div>

            {/* QR Code Card */}
            <div className="feature-card">
              <div className="text-center">
                {isLoading ? (
                  <div className="py-12">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">{t('generatingQrCode')}</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="bg-white p-6 rounded-2xl shadow-lg inline-block">
                        <img 
                          src={qrCodeUrl} 
                          alt="eSIM QR Code" 
                          className="w-64 h-64 mx-auto"
                        />
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{t('activationInstructions')}</h3>
                      <div className="bg-gray-50 rounded-lg p-6 text-left">
                        <ol className="space-y-3 text-gray-700">
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                            <span>{t('openSettings')}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                            <span>{t('selectMobile')}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                            <span>{t('addEsim')}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                            <span>{t('scanQrCode')}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                            <span>{t('confirmActivation')}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                            <span>{t('waitActivation')}</span>
                          </li>
                        </ol>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={handlePrint}
                        className="btn-secondary flex items-center justify-center"
                      >
                        <PrinterIcon size={20} className="mr-2" />
                        {t('printInstructions')}
                      </button>
                      
                      <button
                        onClick={() => window.open(qrCodeUrl, '_blank')}
                        className="btn-secondary flex items-center justify-center"
                      >
                        <DownloadIcon size={20} className="mr-2" />
                        {t('downloadQrCode')}
                      </button>
                    </div>

                    {/* Order Details */}
                    <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">{t('orderDetails')}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">{t('orderId')}:</span> {orderId}</p>
                        <p><span className="font-medium">{t('plan')}:</span> {plan?.name}</p>
                        <p><span className="font-medium">{t('duration')}:</span> {plan?.duration}</p>
                        <p><span className="font-medium">{t('data')}:</span> {plan?.data}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Continue Button */}
            <div className="text-center mt-8">
              <button
                onClick={onContinue}
                className="btn-primary"
              >
                {t('continue')}
              </button>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  )
}