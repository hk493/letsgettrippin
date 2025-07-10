import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  ShoppingCartIcon,
  QrCodeIcon,
  WifiIcon,
  CheckCircleIcon,
  ArrowRightIcon
} from 'lucide-react'

export const HowItWorksSection = ({ onGetStarted }) => {
  const { t, currentLanguage } = useLanguage()

  const howItWorksContent = {
    en: {
      title: "How it works",
      subtitle: "Get connected in 3 simple steps",
      cta: "Start now",
      steps: [
        {
          icon: ShoppingCartIcon,
          title: "Choose Plan",
          description: "Select the perfect eSIM plan for your Japan trip",
          detail: "Starting from ¥900"
        },
        {
          icon: QrCodeIcon,
          title: "Get QR Code",
          description: "Receive your unique QR code instantly after purchase",
          detail: "Instant delivery"
        },
        {
          icon: WifiIcon,
          title: "Stay Connected",
          description: "Scan and activate - you're ready to explore Japan!",
          detail: "5G Speed"
        }
      ]
    },
    ja: {
      title: "使い方",
      subtitle: "3つの簡単なステップで接続",
      cta: "今すぐ開始",
      steps: [
        {
          icon: ShoppingCartIcon,
          title: "プラン選択",
          description: "日本旅行に最適なeSIMプランを選択",
          detail: "900円から"
        },
        {
          icon: QrCodeIcon,
          title: "QRコード取得",
          description: "購入後すぐにユニークなQRコードを受信",
          detail: "即座配信"
        },
        {
          icon: WifiIcon,
          title: "接続完了",
          description: "スキャンして有効化 - 日本探索の準備完了！",
          detail: "5G速度"
        }
      ]
    },
    zh: {
      title: "使用方法",
      subtitle: "3个简单步骤即可连接",
      cta: "立即开始",
      steps: [
        {
          icon: ShoppingCartIcon,
          title: "选择套餐",
          description: "为您的日本之旅选择完美的eSIM套餐",
          detail: "从900日元起"
        },
        {
          icon: QrCodeIcon,
          title: "获取二维码",
          description: "购买后立即收到您的专属二维码",
          detail: "即时交付"
        },
        {
          icon: WifiIcon,
          title: "保持连接",
          description: "扫描并激活 - 准备探索日本！",
          detail: "5G速度"
        }
      ]
    },
    ko: {
      title: "사용 방법",
      subtitle: "3가지 간단한 단계로 연결",
      cta: "지금 시작",
      steps: [
        {
          icon: ShoppingCartIcon,
          title: "플랜 선택",
          description: "일본 여행에 완벽한 eSIM 플랜을 선택하세요",
          detail: "900엔부터"
        },
        {
          icon: QrCodeIcon,
          title: "QR 코드 받기",
          description: "구매 후 즉시 고유한 QR 코드를 받으세요",
          detail: "즉시 배송"
        },
        {
          icon: WifiIcon,
          title: "연결 유지",
          description: "스캔하고 활성화 - 일본 탐험 준비 완료!",
          detail: "5G 속도"
        }
      ]
    }
  }

  const content = howItWorksContent[currentLanguage.code] || howItWorksContent.en

  return (
    <section className="py-20 sakura-gradient relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 text-6xl floating-animation">🌸</div>
        <div className="absolute top-40 right-20 text-4xl floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
        <div className="absolute bottom-20 left-1/3 text-5xl floating-animation" style={{ animationDelay: '4s' }}>🗾</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-4">
            {content.steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="relative">
                  {/* Connection Line */}
                  {index < content.steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-pink-300 to-blue-300 z-0"></div>
                  )}
                  
                  {/* Step Card */}
                  <div className="bg-white rounded-3xl p-8 shadow-xl relative z-10 text-center group hover:scale-105 transition-all duration-300">
                    {/* Step Number */}
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <IconComponent className="w-10 h-10 text-indigo-600" />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="inline-flex items-center bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {step.detail}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mascot Guide */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-4 shadow-lg mb-6">
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
            <div className="text-left">
              <div className="font-bold text-gray-800">{t('kitsuneMessage')}</div>
              <div className="text-sm text-gray-600">{t('readyToConnect')}</div>
            </div>
          </div>
          
          {/* Get eSIM Button */}
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {content.cta}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}