import React from 'react'
import { useLanguage } from '../context/LanguageContext'
import {
  ZapIcon,
  ShieldCheckIcon,
  GlobeIcon,
  SmartphoneIcon,
  CreditCardIcon,
  HeadphonesIcon,
  WifiIcon,
  MapPinIcon,
  ArrowRightIcon
} from 'lucide-react'

export const FeaturesSection = ({ onGetStarted }) => {
  const { t, currentLanguage } = useLanguage()

  const featuresContent = {
    en: {
      title: "Why choose Esimport?",
      subtitle: "Everything you need for seamless connectivity in Japan",
      cta: "Get your eSIM now",
      features: [
        {
          icon: ZapIcon,
          title: "Instant Setup",
          description: "Scan QR code and you're connected in under 3 minutes",
          color: "yellow"
        },
        {
          icon: ShieldCheckIcon,
          title: "Secure & Reliable",
          description: "Bank-level encryption with 99.9% network uptime",
          color: "green"
        },
        {
          icon: GlobeIcon,
          title: "Japan-wide Coverage",
          description: "From Tokyo to Okinawa, stay connected everywhere",
          color: "blue"
        },
        {
          icon: SmartphoneIcon,
          title: "No SIM Swapping",
          description: "Keep your original SIM while using our eSIM",
          color: "purple"
        },
        {
          icon: CreditCardIcon,
          title: "Save 90% on Roaming",
          description: "Avoid expensive roaming charges from your carrier",
          color: "pink"
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 Support",
          description: "Multilingual support team ready to help anytime",
          color: "indigo"
        }
      ]
    },
    ja: {
      title: "なぜEsimportを選ぶのか？",
      subtitle: "日本でのシームレスな接続に必要なすべて",
      cta: "今すぐeSIMを取得",
      features: [
        {
          icon: ZapIcon,
          title: "即座セットアップ",
          description: "QRコードをスキャンして3分以内に接続",
          color: "yellow"
        },
        {
          icon: ShieldCheckIcon,
          title: "安全で信頼性",
          description: "銀行レベルの暗号化と99.9%のネットワーク稼働時間",
          color: "green"
        },
        {
          icon: GlobeIcon,
          title: "日本全国カバレッジ",
          description: "東京から沖縄まで、どこでもつながる",
          color: "blue"
        },
        {
          icon: SmartphoneIcon,
          title: "SIM交換不要",
          description: "元のSIMを保持しながらeSIMを使用",
          color: "purple"
        },
        {
          icon: CreditCardIcon,
          title: "ローミング料金90%節約",
          description: "キャリアの高額なローミング料金を回避",
          color: "pink"
        },
        {
          icon: HeadphonesIcon,
          title: "24時間サポート",
          description: "多言語対応サポートチームがいつでもお手伝い",
          color: "indigo"
        }
      ]
    },
    zh: {
      title: "为什么选择Esimport？",
      subtitle: "在日本无缝连接所需的一切",
      cta: "立即获取eSIM",
      features: [
        {
          icon: ZapIcon,
          title: "即时设置",
          description: "扫描二维码，3分钟内即可连接",
          color: "yellow"
        },
        {
          icon: ShieldCheckIcon,
          title: "安全可靠",
          description: "银行级加密，99.9%网络正常运行时间",
          color: "green"
        },
        {
          icon: GlobeIcon,
          title: "日本全国覆盖",
          description: "从东京到冲绳，随时随地保持连接",
          color: "blue"
        },
        {
          icon: SmartphoneIcon,
          title: "无需更换SIM卡",
          description: "保留原SIM卡的同时使用我们的eSIM",
          color: "purple"
        },
        {
          icon: CreditCardIcon,
          title: "节省90%漫游费",
          description: "避免运营商昂贵的漫游费用",
          color: "pink"
        },
        {
          icon: HeadphonesIcon,
          title: "24/7支持",
          description: "多语言支持团队随时准备提供帮助",
          color: "indigo"
        }
      ]
    },
    ko: {
      title: "왜 Esimport를 선택해야 할까요?",
      subtitle: "일본에서 원활한 연결을 위해 필요한 모든 것",
      cta: "지금 eSIM 받기",
      features: [
        {
          icon: ZapIcon,
          title: "즉시 설정",
          description: "QR 코드를 스캔하고 3분 이내에 연결",
          color: "yellow"
        },
        {
          icon: ShieldCheckIcon,
          title: "안전하고 신뢰할 수 있는",
          description: "은행 수준의 암호화와 99.9% 네트워크 가동 시간",
          color: "green"
        },
        {
          icon: GlobeIcon,
          title: "일본 전국 커버리지",
          description: "도쿄에서 오키나와까지, 어디서나 연결 유지",
          color: "blue"
        },
        {
          icon: SmartphoneIcon,
          title: "SIM 교체 불필요",
          description: "원래 SIM을 유지하면서 eSIM 사용",
          color: "purple"
        },
        {
          icon: CreditCardIcon,
          title: "로밍 요금 90% 절약",
          description: "통신사의 비싼 로밍 요금 회피",
          color: "pink"
        },
        {
          icon: HeadphonesIcon,
          title: "24/7 지원",
          description: "다국어 지원팀이 언제든지 도움을 제공",
          color: "indigo"
        }
      ]
    }
  }

  const content = featuresContent[currentLanguage.code] || featuresContent.en

  const colorClasses = {
    yellow: "bg-yellow-100 text-yellow-600",
    green: "bg-green-100 text-green-600",
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    indigo: "bg-indigo-100 text-indigo-600"
  }

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-8xl">🌸</div>
        <div className="absolute top-40 right-20 text-6xl">⛩️</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🗾</div>
        <div className="absolute bottom-40 right-10 text-5xl">🍜</div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="feature-card group hover:scale-105 transition-all duration-300"
              >
                <div className={`w-16 h-16 rounded-2xl ${colorClasses[feature.color]} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center bg-gradient-to-r from-pink-100 to-blue-100 rounded-full px-6 py-3 mb-6">
            <WifiIcon className="w-5 h-5 text-blue-600 mr-2" />
            <span className="font-medium text-gray-700">Ready to stay connected in Japan?</span>
          </div>
          
          {/* Get eSIM Button */}
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center mx-auto group shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            {content.cta}
            <ArrowRightIcon className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  )
}