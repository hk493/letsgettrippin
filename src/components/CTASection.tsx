import React from 'react'
import { Button } from './Button'
import { useLanguage } from '../context/LanguageContext'
import { ArrowRightIcon, WifiIcon, MapPinIcon } from 'lucide-react'

export const CTASection = ({ onGetStarted }) => {
  const { t } = useLanguage()

  const ctaContent = {
    en: {
      title: "Ready for your Japan adventure?",
      subtitle: "Join thousands of travelers who chose Esimport for their Japan trip",
      cta: "Get your eSIM now",
      features: [
        "Instant delivery",
        "No roaming fees",
        "24/7 support"
      ]
    },
    ja: {
      title: "日本の冒険の準備はできましたか？",
      subtitle: "日本旅行でEsimportを選んだ何千人もの旅行者に参加",
      cta: "今すぐeSIMを取得",
      features: [
        "即座配信",
        "ローミング料金なし",
        "24時間サポート"
      ]
    },
    zh: {
      title: "准备好您的日本冒险了吗？",
      subtitle: "加入数千名为日本之旅选择Esimport的旅行者",
      cta: "立即获取eSIM",
      features: [
        "即时交付",
        "无漫游费",
        "24/7支持"
      ]
    },
    ko: {
      title: "일본 모험을 위한 준비가 되셨나요?",
      subtitle: "일본 여행을 위해 Esimport를 선택한 수천 명의 여행자와 함께하세요",
      cta: "지금 eSIM 받기",
      features: [
        "즉시 배송",
        "로밍 요금 없음",
        "24/7 지원"
      ]
    }
  }

  const content = ctaContent[t('currentLanguage.code')] || ctaContent.en

  return (
    <section className="py-20 japan-gradient relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 text-6xl opacity-20 floating-animation">🌸</div>
        <div className="absolute top-40 right-20 text-4xl opacity-30 floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
        <div className="absolute bottom-20 left-1/4 text-5xl opacity-25 floating-animation" style={{ animationDelay: '4s' }}>🗾</div>
        <div className="absolute bottom-10 right-10 text-3xl opacity-35 floating-animation" style={{ animationDelay: '1s' }}>🍜</div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-purple-600/90"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Content */}
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('travelSmarter')}
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            {t('appValueProp')}
          </p>

          {/* Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {content.features.map((feature, index) => (
              <div key={index} className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={onGetStarted}>{t('aiTravelPlannerButton')}</Button>
            
            <div className="flex items-center text-white/80">
              <WifiIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">Starting from ¥900</span>
            </div>
          </div>

          {/* Mascot */}
          <div className="mt-12 flex justify-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-6 mascot-bounce">
              <img 
                src="/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview.png" 
                alt="Esimport Mascot" 
                className="w-16 h-16 object-contain"
                onError={(e) => {
                  console.log('Primary mascot image failed, trying fallback...')
                  e.target.src = "/ChatGPT_Image_2025年6月28日_14_25_54-removebg-preview copy.png"
                  e.target.onerror = () => {
                    console.log('All mascot images failed, using emoji fallback')
                    e.target.style.display = 'none'
                    const fallback = document.createElement('div')
                    fallback.className = 'text-4xl mascot-bounce'
                    fallback.textContent = '🦊'
                    e.target.parentNode.appendChild(fallback)
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"></path>
        </svg>
      </div>
    </section>
  )
}