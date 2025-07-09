import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Modal } from './Modal'
import { Button } from './Button'
import { 
  PhoneIcon, 
  MailIcon, 
  MapPinIcon,
  FileTextIcon,
  ShieldIcon,
  CookieIcon,
  AlertTriangleIcon,
  LuggageIcon,
  PlaneIcon,
  StarIcon,
  HeartIcon,
  MapIcon,
  GlobeIcon
} from 'lucide-react'

export const Footer = () => {
  const { t } = useLanguage()
  const [activeModal, setActiveModal] = useState(null)

  const openModal = (modalType) => setActiveModal(modalType)
  const closeModal = () => setActiveModal(null)

  return (
    <>
      {/* Enhanced Travel Services Section - More Fun & Engaging */}
      <div className="w-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-16 border-t border-pink-200 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-10 floating-animation">🌸</div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-15 floating-animation" style={{ animationDelay: '2s' }}>⛩️</div>
        
        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-6 shadow-lg">
              <img 
                src="/datapocket-logo-latest.png" 
                alt="Datapocket Mascot" 
                className="w-12 h-12 mr-3 mascot-bounce object-contain"
                onError={(e) => {
                  console.log('Primary mascot image failed, trying fallback...')
                  e.target.src = "/datapocket-logo.png"
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
              <span className="font-medium text-gray-700">Complete your Japan adventure with us!</span>
            </div>
            
            <h2 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t('makeYourTripPerfect')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('beyondEsim')}
            </p>
          </div>

          {/* Travel Services Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Radical Storage Card */}
            <div className="feature-card group hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <LuggageIcon className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      Luggage Storage
                    </h3>
                    <div className="text-lg font-semibold text-orange-600 mb-2">
                      Radical Storage
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">Trusted by 1M+ travelers</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Store your luggage anywhere in Japan for just ¥300/day. Hundreds of verified locations near stations, attractions, and shopping areas.
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Instant booking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">24/7 access</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Secure storage</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Best locations</span>
                  </div>
                </div>
                
                <a 
                  href="https://radicalstorage.tpm.li/ifUR6bJd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center group-hover:shadow-xl transition-all"
                >
                  <LuggageIcon className="h-5 w-5 mr-2" />
                  {t('findStorage')}
                  <span className="ml-2 text-sm opacity-80">from ¥300/day</span>
                </a>
              </div>
            </div>

            {/* Trip.com Card */}
            <div className="feature-card group hover:scale-105 transition-all duration-300 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                    <PlaneIcon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">
                      Hotels & Activities
                    </h3>
                    <div className="text-lg font-semibold text-blue-600 mb-2">
                      Trip.com
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-sm text-gray-500 ml-2">400M+ bookings worldwide</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Book hotels, activities, and transportation in Japan at exclusive discounted rates. Special deals for DataPocket users!
                </p>
                
                {/* Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Best price guarantee</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Instant confirmation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">24/7 support</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-sm text-gray-600">Flexible booking</span>
                  </div>
                </div>
                
                <a 
                  href="https://trip.tpm.li/OsXgNBNT" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-primary w-full flex items-center justify-center group-hover:shadow-xl transition-all"
                >
                  <PlaneIcon className="h-5 w-5 mr-2" />
                  {t('bookTravel')}
                  <span className="ml-2 text-sm opacity-80">Save up to 50%</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <HeartIcon className="w-5 h-5 text-red-500 mr-2" />
              <span className="font-medium text-gray-700">Everything you need for the perfect Japan trip!</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('companyInfo')}</h3>
              <div className="space-y-3 text-sm">
                <p><strong>{t('serviceName')}:</strong> Datapocket</p>
                <p><strong>{t('representative')}:</strong> 田島宝人</p>
                <div className="flex items-center space-x-2">
                  <PhoneIcon size={16} className="text-white flex-shrink-0" />
                  <span>080-7886-2747</span>
                </div>
                <div className="flex items-start space-x-2">
                  <MailIcon size={16} className="text-white flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col">
                    <span>datapocket.jp@gmail.com</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPinIcon size={16} className="text-white flex-shrink-0" />
                  <span>東京都渋谷区</span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('legalInfo')}</h3>
              <div className="space-y-2 text-sm">
                <button 
                  onClick={() => openModal('terms')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <FileTextIcon size={16} className="mr-2" />
                  {t('termsOfService')}
                </button>
                <button 
                  onClick={() => openModal('privacy')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <ShieldIcon size={16} className="mr-2" />
                  {t('privacyPolicy')}
                </button>
                <button 
                  onClick={() => openModal('tokusho')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <FileTextIcon size={16} className="mr-2" />
                  {t('tokusho')}
                </button>
                <button 
                  onClick={() => openModal('cookie')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <CookieIcon size={16} className="mr-2" />
                  {t('cookiePolicy')}
                </button>
              </div>
            </div>

            {/* Service Information */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('serviceInfo')}</h3>
              <div className="space-y-2 text-sm">
                <button 
                  onClick={() => openModal('disclaimer')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <AlertTriangleIcon size={16} className="mr-2" />
                  {t('disclaimer')}
                </button>
                <button 
                  onClick={() => openModal('overseas')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <FileTextIcon size={16} className="mr-2" />
                  {t('overseasUsage')}
                </button>
                <button 
                  onClick={() => openModal('payment')}
                  className="flex items-center hover:text-blue-400 transition-colors"
                >
                  <FileTextIcon size={16} className="mr-2" />
                  {t('paymentDisplay')}
                </button>
              </div>
            </div>

            {/* Contact & Support */}
            <div>
              <h3 className="text-lg font-bold mb-4">{t('support')}</h3>
              <div className="space-y-2 text-sm">
                <p>{t('businessHours')}</p>
                <p>{t('emailSupport')}</p>
                <p>{t('emergencySupport')}</p>
                <div className="mt-4">
                  <p className="text-xs text-gray-400">
                    {t('telecomNotice')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Datapocket. {t('allRightsReserved')}</p>
            <p className="mt-2">
              {t('paymentActNotice')}
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        isOpen={activeModal === 'terms'}
        onClose={closeModal}
        title={t('termsOfService')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">第1条（目的）</h3>
            <p>本利用規約（以下「本規約」）は、Datapocket（以下「当社」）が提供するeSIMサービス（以下「本サービス」）の利用条件を定めるものです。</p>
          </section>
          
          <section>
            <h3 className="font-bold text-lg mb-3">第2条（利用資格）</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>満18歳以上であること</li>
              <li>正確な情報を提供すること</li>
              <li>本規約に同意すること</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">第3条（サービス内容）</h3>
            <p>当社は、日本国内および海外でのモバイル通信サービスを提供するeSIMを販売いたします。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">第4条（禁止事項）</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>法令に違反する行為</li>
              <li>第三者の権利を侵害する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>eSIMの転売・譲渡</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">第5条（免責事項）</h3>
            <p>当社は、通信障害、電波状況、端末の不具合等による損害について責任を負いません。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">第6条（準拠法・管轄裁判所）</h3>
            <p>本規約は日本法に準拠し、東京地方裁判所を専属的合意管轄裁判所とします。</p>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'privacy'}
        onClose={closeModal}
        title={t('privacyPolicy')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">1. 個人情報の取得</h3>
            <p>当社は、以下の個人情報を取得いたします：</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>氏名、メールアドレス、電話番号</li>
              <li>決済情報（クレジットカード情報等）</li>
              <li>利用履歴、アクセスログ</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">2. 利用目的</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>eSIMサービスの提供</li>
              <li>顧客サポート</li>
              <li>サービス改善のための分析</li>
              <li>重要なお知らせの配信</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">3. 第三者提供</h3>
            <p>法令に基づく場合を除き、お客様の同意なく第三者に個人情報を提供することはありません。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">4. 保管期間</h3>
            <p>個人情報は、利用目的達成後、適切な期間保管した後に削除いたします。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">5. お問い合わせ窓口</h3>
            <p>個人情報に関するお問い合わせ：datapocket.jp@gmail.com</p>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'tokusho'}
        onClose={closeModal}
        title={t('tokusho')}
      >
        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold">事業者名</h4>
              <p>Datapocket</p>
            </div>
            <div>
              <h4 className="font-bold">代表者</h4>
              <p>田島宝人</p>
            </div>
            <div>
              <h4 className="font-bold">所在地</h4>
              <p>東京都渋谷区</p>
            </div>
            <div>
              <h4 className="font-bold">電話番号</h4>
              <p>080-7886-2747</p>
            </div>
            <div>
              <h4 className="font-bold">メールアドレス</h4>
              <p>datapocket.jp@gmail.com</p>
            </div>
            <div>
              <h4 className="font-bold">営業時間</h4>
              <p>9:00-18:00（平日）</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-2">支払い方法</h4>
            <ul className="list-disc pl-5">
              <li>クレジットカード（Visa、Mastercard、AMEX）</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-2">商品の引き渡し時期</h4>
            <p>決済完了後、即座にQRコードを発行いたします。</p>
          </div>

          <div>
            <h4 className="font-bold mb-2">返品・キャンセル</h4>
            <p>デジタル商品の性質上、QRコード発行後の返品・キャンセルはお受けできません。技術的な問題がある場合は、サポートまでご連絡ください。</p>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'cookie'}
        onClose={closeModal}
        title={t('cookiePolicy')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">Cookieの使用について</h3>
            <p>当サイトでは、サービス向上のためにCookieを使用しています。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">使用するCookieの種類</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>必須Cookie:</strong> サイトの基本機能に必要</li>
              <li><strong>認証Cookie:</strong> ログイン状態の維持</li>
              <li><strong>分析Cookie:</strong> サイト利用状況の分析</li>
              <li><strong>機能Cookie:</strong> 言語設定等の保存</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">第三者Cookie</h3>
            <p>以下のサービスのCookieを使用する場合があります：</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Google Analytics（アクセス解析）</li>
              <li>Stripe（決済処理）</li>
              <li>Auth0（認証サービス）</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">Cookieの管理</h3>
            <p>ブラウザの設定でCookieを無効にできますが、一部機能が制限される場合があります。</p>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'disclaimer'}
        onClose={closeModal}
        title={t('disclaimer')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">通信サービスに関する免責</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>電波状況による通信品質の低下</li>
              <li>通信事業者のネットワーク障害</li>
              <li>海外での通信制限・規制</li>
              <li>端末の互換性問題</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">損害の範囲</h3>
            <p>当社の責任は、お客様が支払った料金の範囲内に限定されます。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">不可抗力</h3>
            <p>天災、戦争、政府の規制等による影響については責任を負いません。</p>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'overseas'}
        onClose={closeModal}
        title={t('overseasUsage')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">利用可能地域</h3>
            <p>日本国内および当社が指定する海外地域でご利用いただけます。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">海外での注意事項</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>現地の法律・規制に従ってください</li>
              <li>一部地域では利用が制限される場合があります</li>
              <li>通信品質は現地の電波状況に依存します</li>
              <li>緊急通話は現地の番号をご利用ください</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">技術的制限</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>5G対応は地域により異なります</li>
              <li>VoLTE対応は端末に依存します</li>
              <li>テザリング機能の利用制限がある場合があります</li>
            </ul>
          </section>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === 'payment'}
        onClose={closeModal}
        title={t('paymentDisplay')}
      >
        <div className="space-y-6 text-sm">
          <section>
            <h3 className="font-bold text-lg mb-3">決済方法</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>クレジットカード（Visa、Mastercard、American Express）</li>
              <li>Apple Pay</li>
              <li>Google Pay</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">決済手数料</h3>
            <p>表示価格に決済手数料は含まれています。追加手数料はかかりません。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">決済セキュリティ</h3>
            <p>決済処理はStripe社のセキュアな決済システムを使用しています。クレジットカード情報は当社サーバーに保存されません。</p>
          </section>

          <section>
            <h3 className="font-bold text-lg mb-3">領収書</h3>
            <p>決済完了後、メールで領収書を送付いたします。</p>
          </section>
        </div>
      </Modal>
    </>
  )
}