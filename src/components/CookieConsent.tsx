import React, { useState, useEffect } from 'react'
import { Button } from './Button'
import { CookieIcon, XIcon } from 'lucide-react'
import { setCookieConsent, getCookieConsent } from '../utils/cookieManager'
import { useLanguage } from '../context/LanguageContext'

export const CookieConsent = () => {
  const { t, currentLanguage } = useLanguage()
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = getCookieConsent()
    if (consent === null) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    setCookieConsent(true)
    setShowBanner(false)
  }

  const handleDecline = () => {
    setCookieConsent(false)
    setShowBanner(false)
  }

  if (!showBanner) return null

  const messages = {
    en: {
      title: 'Cookie Notice',
      message: 'We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By continuing to use this site, you consent to our use of cookies.',
      accept: 'Accept All',
      decline: 'Decline',
      learnMore: 'Learn More'
    },
    ja: {
      title: 'Cookieについて',
      message: '当サイトでは、ユーザー体験の向上、サイト利用状況の分析、マーケティング活動の支援のためにCookieを使用しています。このサイトを継続してご利用いただくことで、Cookieの使用に同意したものとみなされます。',
      accept: 'すべて受け入れる',
      decline: '拒否する',
      learnMore: '詳細を見る'
    },
    zh: {
      title: 'Cookie通知',
      message: '我们使用Cookie来增强您的体验、分析网站使用情况并协助我们的营销工作。继续使用本网站即表示您同意我们使用Cookie。',
      accept: '接受全部',
      decline: '拒绝',
      learnMore: '了解更多'
    },
    ko: {
      title: 'Cookie 알림',
      message: '저희는 사용자 경험 향상, 사이트 이용 현황 분석, 마케팅 활동 지원을 위해 쿠키를 사용합니다. 이 사이트를 계속 사용하시면 쿠키 사용에 동의하는 것으로 간주됩니다.',
      accept: '모두 수락',
      decline: '거부',
      learnMore: '자세히 보기'
    }
  }

  const content = messages[currentLanguage.code] || messages.en

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start">
            <CookieIcon className="text-blue-500 mr-3 mt-1 flex-shrink-0" size={24} />
            <div>
              <h3 className="font-bold text-lg mb-2">{content.title}</h3>
              <p className="text-sm text-gray-600 max-w-3xl">
                {content.message}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm border border-gray-300 rounded-lg transition-colors"
            >
              {content.decline}
            </button>
            <Button
              onClick={handleAccept}
              size="medium"
              className="whitespace-nowrap"
            >
              {content.accept}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}