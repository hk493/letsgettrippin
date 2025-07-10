interface EmailData {
  to: string
  subject: string
  html: string
  attachments?: Array<{
    filename: string
    content: string
    contentType: string
  }>
}

interface PurchaseDetails {
  orderId: string
  planName: string
  price: number
  duration: string
  data: string
  customerEmail: string
  customerName: string
  qrCodeUrl: string
  activationInstructions: string
  language?: string
}

// EmailJS configuration removed - API keys cleared
const EMAILJS_CONFIG = {
  serviceId: '',
  templateId: '',
  publicKey: ''
}

// 多言語テキスト定義
const emailTexts = {
  en: {
    subject: '🎉 Your Japan eSIM is Ready! Order #{{order_id}} - Datapocket',
    title: 'Your Japan eSIM is ready!',
    greeting: 'Dear {{customer_name}},',
    thankYou: 'Thank you for choosing Datapocket! Your Japan eSIM has been successfully processed and is ready to use.',
    orderDetails: '📋 Order Details',
    orderId: 'Order ID:',
    plan: 'Plan:',
    duration: 'Duration:',
    data: 'Data:',
    price: 'Price:',
    status: 'Status:',
    readyToActivate: '✅ Ready to activate',
    freePlan: '🎁 FREE (Test Plan)',
    importantInfo: '⚠️ Important Information',
    importantPoints: [
      'Keep this email safe - you\'ll need the QR code to activate your eSIM',
      'Your eSIM can be activated before or during your trip to Japan',
      'Make sure your device is unlocked and supports eSIM technology'
    ],
    qrCodeTitle: '📱 Your eSIM QR Code',
    scanInstruction: 'Scan this QR code to activate your eSIM',
    activationSteps: '🚀 Activation Steps',
    steps: [
      'Open Settings → Cellular/Mobile Data',
      'Tap "Add Cellular Plan" or "Add eSIM"',
      'Scan the QR code above',
      'Follow the setup wizard (2-3 minutes)',
      'Enjoy your Japan adventure! 🇯🇵'
    ],
    proTip: '💡 Pro Tip:',
    proTipText: 'You can activate this eSIM before your trip or when you arrive in Japan. The data allowance starts when you first connect to a Japanese network.',
    needHelp: '📞 Need Help? Contact Support',
    supportInfo: '🆘 Support Information',
    phone: '📞 Phone:',
    email: '📧 Email:',
    hours: '🕒 Hours:',
    languages: '🌐 Languages:',
    hoursText: '9:00-18:00 (Weekdays JST)',
    languagesText: 'English, 日本語, 中文, 한국어',
    accountAccess: 'You can also access your QR code anytime by logging into your account at',
    adventureReady: '🎌 Ready for your Japan adventure?',
    adventureText: 'With Datapocket, you\'ll stay connected from Tokyo to Kyoto, Osaka to Hiroshima!',
    footer: 'Datapocket - Your Japan Connection',
    copyright: '© 2024 Datapocket. All rights reserved.',
    sentTo: 'This email was sent to {{customer_email}}',
    enjoyJapan: '🌸 Have an amazing time in Japan! 🌸'
  },
  ja: {
    subject: '🎉 日本eSIMの準備が完了しました！注文 #{{order_id}} - Datapocket',
    title: '日本eSIMの準備が完了しました！',
    greeting: '{{customer_name}} 様',
    thankYou: 'Datapocketをお選びいただき、ありがとうございます！日本eSIMの処理が正常に完了し、ご利用いただけます。',
    orderDetails: '📋 ご注文詳細',
    orderId: '注文ID:',
    plan: 'プラン:',
    duration: '有効期間:',
    data: 'データ量:',
    price: '料金:',
    status: '状態:',
    readyToActivate: '✅ 有効化準備完了',
    freePlan: '🎁 無料（テストプラン）',
    importantInfo: '⚠️ 重要な情報',
    importantPoints: [
      'このメールを大切に保管してください - eSIMの有効化にQRコードが必要です',
      'eSIMは日本旅行前または旅行中に有効化できます',
      'デバイスのSIMロックが解除され、eSIM技術に対応していることを確認してください'
    ],
    qrCodeTitle: '📱 eSIM QRコード',
    scanInstruction: 'このQRコードをスキャンしてeSIMを有効化してください',
    activationSteps: '🚀 有効化手順',
    steps: [
      '設定 → モバイル通信を開く',
      '「モバイル通信プランを追加」または「eSIMを追加」をタップ',
      '上記のQRコードをスキャン',
      'セットアップウィザードに従う（2-3分）',
      '日本の冒険をお楽しみください！ 🇯🇵'
    ],
    proTip: '💡 プロのヒント:',
    proTipText: 'このeSIMは旅行前または日本到着時に有効化できます。データ使用量は日本のネットワークに初回接続時から開始されます。',
    needHelp: '📞 サポートが必要ですか？お問い合わせ',
    supportInfo: '🆘 サポート情報',
    phone: '📞 電話:',
    email: '📧 メール:',
    hours: '🕒 営業時間:',
    languages: '🌐 対応言語:',
    hoursText: '9:00-18:00（平日 JST）',
    languagesText: 'English, 日本語, 中文, 한국어',
    accountAccess: 'QRコードには、datapocket.jpのアカウントにログインしていつでもアクセスできます。',
    adventureReady: '🎌 日本の冒険の準備はできましたか？',
    adventureText: 'Datapocketで、東京から京都、大阪から広島まで、つながり続けましょう！',
    footer: 'Datapocket - Your Japan Connection',
    copyright: '© 2024 Datapocket. All rights reserved.',
    sentTo: 'このメールは {{customer_email}} に送信されました',
    enjoyJapan: '🌸 素晴らしい日本の時間をお過ごしください！ 🌸'
  }
}

// EmailJS初期化 - disabled due to API key removal
const initEmailJS = () => {
  console.log('📧 EmailJS disabled - API keys removed')
}

// EmailJS経由でメール送信 - disabled
export const sendEmailViaEmailJS = async (templateParams: any) => {
  console.log('📧 Email service disabled - API keys removed')
  return { success: false, message: 'Email service disabled - API keys removed' }
}

export const sendPurchaseConfirmationEmail = async (purchaseDetails: PurchaseDetails) => {
  console.log('📧 Purchase confirmation email disabled - API keys removed')
  
  // Show notification that email service is disabled
  if (typeof window !== 'undefined') {
    const notification = document.createElement('div')
    notification.innerHTML = `
      <div style="
        position: fixed; 
        top: 20px; 
        right: 20px; 
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
        color: white; 
        padding: 15px 20px; 
        border-radius: 10px; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-family: 'Poppins', sans-serif;
        max-width: 350px;
      ">
        <div style="display: flex; align-items: center;">
          <span style="font-size: 1.5rem; margin-right: 10px;">⚠️</span>
          <div>
            <div style="font-weight: bold;">Email Service Disabled</div>
            <div style="font-size: 0.9rem; opacity: 0.9;">
              API keys have been removed
            </div>
            <div style="font-size: 0.8rem; opacity: 0.8; margin-top: 5px;">
              Order: ${purchaseDetails.orderId}
            </div>
          </div>
        </div>
      </div>
    `
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 5000)
  }

  return { success: false, message: 'Email service disabled - API keys removed' }
}

export const sendActivationInstructions = async (customerEmail: string, planName: string, language: string = 'en') => {
  console.log('📧 Activation instructions disabled - API keys removed')
  return false
}

// メール送信テスト関数
export const testEmailService = async (testEmail: string, language: string = 'en') => {
  console.log('📧 Email test disabled - API keys removed')
  return { success: false, message: 'Email service disabled - API keys removed' }
}

// EmailJS設定確認関数
export const checkEmailJSConfig = () => {
  console.log('📧 EmailJS Configuration: Disabled - API keys removed')
  return EMAILJS_CONFIG
}