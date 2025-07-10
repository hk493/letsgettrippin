import React from 'react'
import { Button } from './Button'
import { useLanguage } from '../context/LanguageContext'
import { Logo } from './Logo'
import { 
  WifiIcon, 
  MapPinIcon, 
  ShieldCheckIcon, 
  ZapIcon,
  ArrowRightIcon,
  StarIcon
} from 'lucide-react'

export const HeroSection = ({ onGetStarted }) => {
  const { t } = useLanguage()

  const heroContent = {
    en: {
      tagline: "The eSIM made just for Japan",
      subtitle: "Travel light. Stay connected. Skip roaming fees.",
      cta: "Get your eSIM now",
      trustBadge: "Trusted by 50,000+ travelers",
      features: [
        "No SIM swapping needed",
        "Instant activation",
        "Save up to 90% on roaming"
      ]
    },
    ja: {
      tagline: "日本専用eSIM",
      subtitle: "身軽に旅行。つながり続ける。ローミング料金をスキップ。",
      cta: "今すぐeSIMを取得",
      trustBadge: "50,000人以上の旅行者に信頼されています",
      features: [
        "SIM交換不要",
        "即座にアクティベーション",
        "ローミング料金を最大90%節約"
      ]
    },
    zh: {
      tagline: "专为日本设计的eSIM",
      subtitle: "轻松旅行。保持连接。跳过漫游费用。",
      cta: "立即获取eSIM",
      trustBadge: "受到50,000+旅行者信赖",
      features: [
        "无需更换SIM卡",
        "即时激活",
        "节省高达90%的漫游费用"
      ]
    },
    ko: {
      tagline: "일본 전용 eSIM",
      subtitle: "가볍게 여행하세요. 연결을 유지하세요. 로밍 요금을 건너뛰세요.",
      cta: "지금 eSIM 받기",
      trustBadge: "50,000명 이상의 여행자가 신뢰",
      features: [
        "SIM 교체 불필요",
        "즉시 활성화",
        "로밍 요금 최대 90% 절약"
      ]
    }
  }

  const { currentLanguage } = useLanguage()
  const content = heroContent[currentLanguage.code] || heroContent.en

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src="/japan-scenery.jpg"
          alt="Beautiful Japan scenery with torii gates"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-purple-900/60 to-pink-900/70"></div>
      </div>
      
      {/* Floating Japanese Elements */}
      <div className="absolute top-20 left-10 text-6xl opacity-30 floating-animation text-white">🌸</div>
      <div className="absolute top-40 right-20 text-4xl opacity-40 floating-animation text-white" style={{ animationDelay: '2s' }}>⛩️</div>
      <div className="absolute bottom-40 left-20 text-5xl opacity-35 floating-animation text-white" style={{ animationDelay: '4s' }}>🍜</div>
      <div className="absolute bottom-20 right-10 text-3xl opacity-45 floating-animation text-white" style={{ animationDelay: '1s' }}>🏯</div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Trust Badge */}
            <div className="inline-flex items-center bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
              <StarIcon className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">{content.trustBadge}</span>
            </div>

            {/* Main Headline with Compact Logo Background Frame */}
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 mb-8">
              <div className="flex-shrink-0">
                {/* Compact logo with bigger logo inside same background frame */}
                <div className="relative">
                  {/* Same background frame size */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/85 to-white/80 backdrop-blur-md rounded-2xl shadow-xl border border-white/20"></div>
                  {/* Subtle inner glow */}
                  <div className="absolute inset-1 bg-gradient-to-br from-blue-50/30 to-pink-50/30 rounded-xl"></div>
                  {/* Same padding, bigger logo */}
                  <div className="relative p-4 md:p-5">
                    <img
                      src="/trippin-logo.png"
                      alt="Trippin Logo"
                      className="h-24 md:h-32 lg:h-40 w-auto object-contain drop-shadow-md"
                      onError={(e) => {
                        console.log('Primary logo failed, trying fallback...')
                        e.target.src = "/trippin-logo.png"
                        e.target.onerror = () => {
                          console.log('All logos failed, hiding element')
                          e.target.style.display = 'none'
                        }
                      }}
                    />
                  </div>
                  {/* Same decorative corner elements */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full opacity-70"></div>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-50"></div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-70"></div>
                </div>
              </div>
              <div>
                <h1 className="hero-title text-white drop-shadow-lg">
                  {t('travelSmarter')}
                  <br />
                  <span className="text-gray-800">{t('notHarder')}</span>
                </h1>
                <div className="flex items-center mt-4">
                  <img 
                    src="/trippin-logo.png" 
                    alt="Trippin Mascot" 
                    className="w-16 h-16 mr-4 mascot-bounce object-contain"
                    onError={(e) => {
                      console.log('Primary mascot image failed, trying fallback...')
                      e.target.src = "/trippin-logo.png"
                      e.target.onerror = () => {
                        console.log('All mascot images failed, using emoji fallback')
                        e.target.style.display = 'none'
                        const fallback = document.createElement('div')
                        fallback.className = 'text-4xl mr-4 mascot-bounce'
                        fallback.textContent = '🦊'
                        e.target.parentNode.insertBefore(fallback, e.target.nextSibling)
                      }
                    }}
                  />
                  <div className="text-white/90 text-lg font-medium">
                    {t('appValueProp')}
                  </div>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p className="hero-subtitle text-white/90 mb-8 max-w-lg mx-auto lg:mx-0 drop-shadow-md">
              {content.subtitle}
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-8">
              {content.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start">
                  <div className="w-6 h-6 bg-green-400 rounded-full flex items-center justify-center mr-3">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-white font-medium drop-shadow-sm">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onGetStarted}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center group shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                {t('aiTravelPlannerButton')}
                <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => window.location.href = '/devices'}
                className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/30 px-6 py-3 rounded-full font-semibold hover:bg-white/30 transition-all duration-300 flex items-center justify-center"
              >
                <WifiIcon className="w-5 h-5 mr-2" />
                {t('esimCompatibleDevices')}
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">3min</div>
                <div className="text-sm text-white/80">Setup time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">90%</div>
                <div className="text-sm text-white/80">Cost savings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24/7</div>
                <div className="text-sm text-white/80">Support</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image & Mascot */}
          <div className="relative">
            {/* Main Hero Image - Phone mockup */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <div className="p-8">
                <div className="bg-white rounded-2xl p-6 shadow-xl">
                  <div className="text-center mb-4">
                    <div className="flex items-center justify-center mb-4">
                      <img
                        src="/trippin-logo.png"
                        alt="Trippin Logo"
                        className="h-8 w-auto object-contain"
                        onError={(e) => {
                          console.log('Primary logo failed, trying fallback...')
                          e.target.src = "/trippin-logo.png"
                        }}
                      />
                      <h3 className="font-bold text-gray-800 ml-2">Your Japan eSIM</h3>
                    </div>
                    <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://esim-demo.com/activate"
                        alt="Sample QR Code"
                        className="w-28 h-28"
                      />
                    </div>
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>Ready to activate</span>
                    </div>
                  </div>
                  
                  {/* Get eSIM Button in Phone Mockup */}
                  <button
                    onClick={onGetStarted}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                  >
                    {t('aiTravelPlannerButton')}
                  </button>
                </div>
              </div>
              
              {/* Floating UI Elements */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Connected</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <ZapIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">5G Speed</span>
                </div>
              </div>
            </div>

            {/* Mascot Character */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-4 shadow-xl">
              <img 
                src="/trippin-logo.png" 
                alt="Trippin Mascot" 
                className="w-16 h-16 object-contain mascot-bounce"
                onError={(e) => {
                  console.log('Primary mascot image failed, trying fallback...')
                  e.target.src = "/trippin-logo.png"
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

            {/* Floating Feature Cards */}
            <div className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl floating-animation">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <ShieldCheckIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Secure</div>
                  <div className="text-xs text-gray-500">Bank-level encryption</div>
                </div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl floating-animation" style={{ animationDelay: '3s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <MapPinIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Japan-wide</div>
                  <div className="text-xs text-gray-500">Full coverage</div>
                </div>
              </div>
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