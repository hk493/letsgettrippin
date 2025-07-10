import React, { useState, useRef, useEffect } from 'react'
import { MessageCircleIcon, XIcon, SendIcon, BotIcon, UserIcon } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export const ChatBot = () => {
  const { t, currentLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Initial greeting message
      const greeting = getGreetingMessage()
      setMessages([{
        id: Date.now().toString(),
        text: greeting,
        isBot: true,
        timestamp: new Date()
      }])
    }
  }, [isOpen, currentLanguage.code])

  const getGreetingMessage = () => {
    const greetings = {
      ja: 'こんにちは！eSIM Portのサポートチャットボットです。eSIMに関するご質問やサポートが必要でしたら、お気軽にお声かけください。',
      en: 'Hello! I\'m the eSIM Port support chatbot. Feel free to ask me any questions about eSIM or if you need support.',
      zh: '您好！我是eSIM Port的支持聊天机器人。如果您对eSIM有任何问题或需要支持，请随时询问。',
      ko: '안녕하세요! eSIM Port 지원 챗봇입니다. eSIM에 대한 질문이나 지원이 필요하시면 언제든지 말씀해 주세요.'
    }
    return greetings[currentLanguage.code] || greetings.en
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    const responses = {
      ja: {
        greeting: ['こんにちは', 'はじめまして', 'おはよう', 'こんばんは'],
        esim: ['esim', 'イーシム', 'sim'],
        price: ['価格', '料金', '値段', '費用', 'プライス'],
        setup: ['設定', 'セットアップ', '使い方', '設置'],
        support: ['サポート', 'ヘルプ', '問い合わせ', '連絡'],
        coverage: ['エリア', '対応地域', 'カバレッジ', '使える場所'],
        device: ['端末', 'デバイス', 'スマホ', 'iphone', 'android']
      },
      en: {
        greeting: ['hello', 'hi', 'hey', 'good morning', 'good evening'],
        esim: ['esim', 'e-sim', 'sim'],
        price: ['price', 'cost', 'fee', 'pricing', 'how much'],
        setup: ['setup', 'install', 'activate', 'how to use'],
        support: ['support', 'help', 'contact', 'assistance'],
        coverage: ['coverage', 'area', 'region', 'where'],
        device: ['device', 'phone', 'iphone', 'android', 'compatible']
      },
      zh: {
        greeting: ['你好', '您好', '早上好', '晚上好'],
        esim: ['esim', 'e-sim', 'sim卡'],
        price: ['价格', '费用', '多少钱', '收费'],
        setup: ['设置', '安装', '激活', '怎么用'],
        support: ['支持', '帮助', '联系', '客服'],
        coverage: ['覆盖', '地区', '区域', '哪里能用'],
        device: ['设备', '手机', 'iphone', 'android', '兼容']
      },
      ko: {
        greeting: ['안녕하세요', '안녕', '좋은 아침', '좋은 저녁'],
        esim: ['esim', 'e-sim', 'sim'],
        price: ['가격', '요금', '비용', '얼마'],
        setup: ['설정', '설치', '활성화', '사용법'],
        support: ['지원', '도움', '연락', '고객센터'],
        coverage: ['커버리지', '지역', '사용 가능 지역', '어디서'],
        device: ['기기', '폰', '아이폰', '안드로이드', '호환']
      }
    }

    const currentResponses = responses[currentLanguage.code] || responses.en

    // Check for greeting
    if (currentResponses.greeting.some(word => message.includes(word))) {
      const greetingResponses = {
        ja: 'こんにちは！何かお手伝いできることはありますか？',
        en: 'Hello! How can I help you today?',
        zh: '您好！今天我可以为您做些什么？',
        ko: '안녕하세요! 오늘 어떻게 도와드릴까요?'
      }
      return greetingResponses[currentLanguage.code] || greetingResponses.en
    }

    // Check for eSIM questions
    if (currentResponses.esim.some(word => message.includes(word))) {
      const esimResponses = {
        ja: 'eSIMは物理的なSIMカードを必要としないデジタルSIMです。当社では日本国内および海外で使用できる高品質なeSIMプランを提供しています。',
        en: 'eSIM is a digital SIM that doesn\'t require a physical SIM card. We offer high-quality eSIM plans for use in Japan and overseas.',
        zh: 'eSIM是不需要物理SIM卡的数字SIM。我们提供在日本和海外使用的高质量eSIM套餐。',
        ko: 'eSIM은 물리적 SIM 카드가 필요 없는 디지털 SIM입니다. 일본 국내 및 해외에서 사용할 수 있는 고품질 eSIM 플랜을 제공합니다.'
      }
      return esimResponses[currentLanguage.code] || esimResponses.en
    }

    // Check for price questions
    if (currentResponses.price.some(word => message.includes(word))) {
      const priceResponses = {
        ja: '料金プランは以下の通りです：\n• Japan Basic (3日間/1GB): ¥1,500\n• Japan Standard (7日間/3GB): ¥2,800\n• Japan Premium (30日間/10GB): ¥5,000',
        en: 'Our pricing plans are:\n• Japan Basic (3 days/1GB): ¥1,500\n• Japan Standard (7 days/3GB): ¥2,800\n• Japan Premium (30 days/10GB): ¥5,000',
        zh: '我们的价格计划如下：\n• Japan Basic (3天/1GB): ¥1,500\n• Japan Standard (7天/3GB): ¥2,800\n• Japan Premium (30天/10GB): ¥5,000',
        ko: '요금제는 다음과 같습니다:\n• Japan Basic (3일/1GB): ¥1,500\n• Japan Standard (7일/3GB): ¥2,800\n• Japan Premium (30일/10GB): ¥5,000'
      }
      return priceResponses[currentLanguage.code] || priceResponses.en
    }

    // Check for setup questions
    if (currentResponses.setup.some(word => message.includes(word))) {
      const setupResponses = {
        ja: 'eSIMの設定は簡単です：\n1. 購入後にQRコードを受け取ります\n2. 設定 > モバイル通信 > eSIMを追加\n3. QRコードをスキャン\n4. 設定完了！',
        en: 'eSIM setup is easy:\n1. Receive QR code after purchase\n2. Settings > Cellular > Add eSIM\n3. Scan QR code\n4. Setup complete!',
        zh: 'eSIM设置很简单：\n1. 购买后收到二维码\n2. 设置 > 蜂窝网络 > 添加eSIM\n3. 扫描二维码\n4. 设置完成！',
        ko: 'eSIM 설정은 간단합니다:\n1. 구매 후 QR 코드 수신\n2. 설정 > 셀룰러 > eSIM 추가\n3. QR 코드 스캔\n4. 설정 완료!'
      }
      return setupResponses[currentLanguage.code] || setupResponses.en
    }

    // Check for support questions
    if (currentResponses.support.some(word => message.includes(word))) {
      const supportResponses = {
        ja: 'サポートが必要でしたら、以下の方法でお問い合わせください：\n• 電話: 080-7886-2747\n• メール: esimport.jp@gmail.com\n• 営業時間: 9:00-18:00 (平日)',
        en: 'For support, please contact us:\n• Phone: 080-7886-2747\n• Email: esimport.jp@gmail.com\n• Hours: 9:00-18:00 (Weekdays)',
        zh: '如需支持，请联系我们：\n• 电话: 080-7886-2747\n• 邮箱: esimport.jp@gmail.com\n• 营业时间: 9:00-18:00 (工作日)',
        ko: '지원이 필요하시면 연락해 주세요:\n• 전화: 080-7886-2747\n• 이메일: esimport.jp@gmail.com\n• 운영시간: 9:00-18:00 (평일)'
      }
      return supportResponses[currentLanguage.code] || supportResponses.en
    }

    // Default response
    const defaultResponses = {
      ja: '申し訳ございませんが、その質問については詳しい情報を提供できません。より詳細なサポートが必要でしたら、080-7886-2747までお電話いただくか、esimport.jp@gmail.comまでメールでお問い合わせください。',
      en: 'I apologize, but I don\'t have detailed information about that question. For more detailed support, please call 080-7886-2747 or email esimport.jp@gmail.com.',
      zh: '抱歉，我无法提供关于该问题的详细信息。如需更详细的支持，请致电080-7886-2747或发送邮件至esimport.jp@gmail.com。',
      ko: '죄송하지만 해당 질문에 대한 자세한 정보를 제공할 수 없습니다. 더 자세한 지원이 필요하시면 080-7886-2747로 전화하거나 esimport.jp@gmail.com로 이메일을 보내주세요.'
    }
    return defaultResponses[currentLanguage.code] || defaultResponses.en
  }

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all z-50"
        aria-label="Open chat support"
      >
        <MessageCircleIcon size={24} />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl border z-50 flex flex-col">
          {/* Header */}
          <div className="bg-blue-500 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <BotIcon size={20} className="mr-2" />
              <span className="font-semibold">eSIM Port Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-blue-600 p-1 rounded"
            >
              <XIcon size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <div className="flex items-start">
                    {message.isBot && (
                      <BotIcon size={16} className="mr-2 mt-1 flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-wrap text-sm">
                      {message.text}
                    </div>
                    {!message.isBot && (
                      <UserIcon size={16} className="ml-2 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-[80%]">
                  <div className="flex items-center">
                    <BotIcon size={16} className="mr-2" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isTyping}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <SendIcon size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}