import React, { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { StickyBanner } from './StickyBanner'
import { Footer } from './Footer'
import { CollapsibleDeviceSection } from './CollapsibleDeviceSection'
import { SmartphoneIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, InfoIcon, TabletIcon } from 'lucide-react'

export const DevicesPage = ({ onBack }) => {
  const { t, currentLanguage, changeLanguage } = useLanguage()

  // Handle devices navigation (stay on same page)
  const handleDevicesClick = () => {
    // Already on devices page, do nothing or scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Handle home navigation
  const handleHomeClick = () => {
    onBack()
  }

  const deviceTranslations = {
    en: {
      title: 'eSIM Compatible Devices',
      subtitle: 'Check if your device supports eSIM technology',
      important: 'Important: your phone or device must also be carrier-unlocked to use eSIM.',
      about: 'About eSIM Technology',
      aboutText: 'An eSIM (embedded SIM) is a digital SIM that allows you to activate a cellular plan from your carrier without having to use a physical SIM card.',
      notes: 'Notes',
      devices: 'Devices',
      deviceNotes: {
        apple: [
          "iPhones from mainland China and iPhone devices from Hong Kong and Macao (except for iPhone 13 mini, iPhone 12 mini, iPhone SE 2020, and iPhone XS) don't have eSIM capability.",
          'iPhone 14, iPhone 14 Plus, iPhone 14 Pro, and iPhone 14 Pro Max are not compatible with physical SIM cards in the USA.',
        ],
        google: [
          'Google Pixel 3 devices from Australia, Japan, and Taiwan are not compatible with eSIM.',
          'Google Pixel 3a from South East Asia is not compatible with eSIM.',
          'All Google Pixel phones sold in Hong Kong are incompatible with eSIM technology.',
        ],
        samsung: [
          'The following Samsung devices are not compatible with eSIM:',
          'Samsung Galaxy S20 FE 4G/5G',
          'Samsung S20/S21 (US versions)',
          'Galaxy Z Flip 5G (US versions)',
          'Samsung Note 20 Ultra (Versions from the US and Hong Kong)',
          'Samsung Galaxy Z Fold 2 (Versions from the US and Hong Kong)',
        ],
        honor: 'All Honor devices must be carrier unlocked to use eSIM.',
        huawei: 'The Huawei P40 Pro+ and P50 Pro are not compatible with eSIM.',
        oppo: 'The Oppo Find X5 Lite and Oppo Lite line are not compatible.',
        vivo: 'Vivo V29 Lite 5G eSIM is only supported in Europe.',
      },
    },
    ja: {
      title: 'eSIM対応デバイス',
      subtitle: 'お使いのデバイスがeSIMに対応しているかご確認ください',
      important: '重要：eSIMを使用するには、デバイスのSIMロックが解除されている必要があります。',
      about: 'eSIM技術について',
      aboutText: 'eSIM（組み込みSIM）は、物理的なSIMカードを使用せずに通信事業者のプランを有効化できるデジタルSIMです。',
      notes: '注意事項',
      devices: 'デバイス',
      deviceNotes: {
        apple: [
          '中国本土、香港、マカオのiPhone（iPhone 13 mini、iPhone 12 mini、iPhone SE 2020、iPhone XSを除く）はeSIMに対応していません。',
          'iPhone 14、iPhone 14 Plus、iPhone 14 Pro、iPhone 14 Pro Maxはアメリカでは物理的なSIMカードに対応していません。',
        ],
        google: [
          'オーストラリア、日本、台湾のGoogle Pixel 3はeSIMに対応していません。',
          '東南アジアのGoogle Pixel 3aはeSIMに対応していません。',
          '香港で販売されているすべてのGoogle Pixelスマートフォンは、eSIM技術に対応していません。',
        ],
        samsung: [
          '以下のSamsungデバイスはeSIMに対応していません：',
          'Samsung Galaxy S20 FE 4G/5G',
          'Samsung S20/S21（米国版）',
          'Galaxy Z Flip 5G（米国版）',
          'Samsung Note 20 Ultra（米国版および香港版）',
          'Samsung Galaxy Z Fold 2（米国版および香港版）',
        ],
        honor: 'すべてのHonorデバイスはeSIMを使用するためにSIMロック解除が必要です。',
        huawei: 'Huawei P40 Pro+とP50 ProはeSIMに対応していません。',
        oppo: 'Oppo Find X5 LiteとOppo Liteシリーズは対応していません。',
        vivo: 'Vivo V29 Lite 5GのeSIMはヨーロッパでのみサポートされています。',
      },
    },
    zh: {
      title: 'eSIM兼容设备',
      subtitle: '查看您的设备是否支持eSIM技术',
      important: '重要提示：您的设备必须已解锁才能使用eSIM。',
      about: '关于eSIM技术',
      aboutText: 'eSIM（嵌入式SIM卡）是一种数字SIM卡，无需使用物理SIM卡即可激活运营商套餐。',
      notes: '注意事项',
      devices: '设备',
      deviceNotes: {
        apple: [
          '中国大陆、香港和澳门的iPhone设备（iPhone 13 mini、iPhone 12 mini、iPhone SE 2020和iPhone XS除外）不支持eSIM功能。',
          'iPhone 14、iPhone 14 Plus、iPhone 14 Pro和iPhone 14 Pro Max在美国不支持物理SIM卡。',
        ],
        google: [
          '来自澳大利亚、日本和台湾的Google Pixel 3设备不支持eSIM。',
          '来自东南亚的Google Pixel 3a不支持eSIM。',
          '在香港销售的所有Google Pixel手机都不支持eSIM技术。',
        ],
        samsung: [
          '以下三星设备不支持eSIM：',
          'Samsung Galaxy S20 FE 4G/5G',
          'Samsung S20/S21（美国版本）',
          'Galaxy Z Flip 5G（美国版本）',
          'Samsung Note 20 Ultra（美国和香港版本）',
          'Samsung Galaxy Z Fold 2（美国和香港版本）',
        ],
        honor: '所有Honor设备必须解锁才能使用eSIM。',
        huawei: 'Huawei P40 Pro+和P50 Pro不支持eSIM。',
        oppo: 'Oppo Find X5 Lite和Oppo Lite系列不支持。',
        vivo: 'Vivo V29 Lite 5G仅在欧洲支持eSIM。',
      },
    },
    ko: {
      title: 'eSIM 호환 기기',
      subtitle: '사용 중인 기기의 eSIM 지원 여부를 확인하세요',
      important: '중요: eSIM을 사용하려면 기기가 잠금 해제되어 있어야 합니다.',
      about: 'eSIM 기술 소개',
      aboutText: 'eSIM(임베디드 SIM)은 물리적 SIM 카드 없이도 통신사 요금제를 활성화할 수 있는 디지털 SIM입니다.',
      notes: '참고사항',
      devices: '기기',
      deviceNotes: {
        apple: [
          '중국 본토, 홍콩, 마카오의 iPhone 기기(iPhone 13 mini, iPhone 12 mini, iPhone SE 2020, iPhone XS 제외)는 eSIM 기능을 지원하지 않습니다.',
          'iPhone 14, iPhone 14 Plus, iPhone 14 Pro, iPhone 14 Pro Max는 미국에서 물리적 SIM 카드를 지원하지 않습니다.',
        ],
        google: [
          '호주, 일본, 대만의 Google Pixel 3 기기는 eSIM을 지원하지 않습니다.',
          '동남아시아의 Google Pixel 3a는 eSIM을 지원하지 않습니다.',
          '홍콩에서 판매되는 모든 Google Pixel 휴대폰은 eSIM 기술과 호환되지 않습니다.',
        ],
        samsung: [
          '다음 삼성 기기는 eSIM을 지원하지 않습니다:',
          'Samsung Galaxy S20 FE 4G/5G',
          'Samsung S20/S21 (미국 버전)',
          'Galaxy Z Flip 5G (미국 버전)',
          'Samsung Note 20 Ultra (미국 및 홍콩 버전)',
          'Samsung Galaxy Z Fold 2 (미국 및 홍콩 버전)',
        ],
        honor: '모든 Honor 기기는 eSIM 사용을 위해 잠금 해제가 필요합니다.',
        huawei: 'Huawei P40 Pro+ 및 P50 Pro는 eSIM을 지원하지 않습니다.',
        oppo: 'Oppo Find X5 Lite와 Oppo Lite 라인은 지원되지 않습니다.',
        vivo: 'Vivo V29 Lite 5G eSIM은 유럽에서만 지원됩니다.',
      },
    },
  }

  const translation = deviceTranslations[currentLanguage.code] || deviceTranslations.en

  const deviceData = {
    apple: {
      devices: [
        'iPhone XR',
        'iPhone XS',
        'iPhone XS Max',
        'iPhone 11',
        'iPhone 11 Pro',
        'iPhone 11 Pro Max',
        'iPhone SE 2 (2020)',
        'iPhone 12',
        'iPhone 12 Mini',
        'iPhone 12 Pro',
        'iPhone 12 Pro Max',
        'iPhone 13',
        'iPhone 13 Mini',
        'iPhone 13 Pro',
        'iPhone 13 Pro Max',
        'iPhone SE 3 (2022)',
        'iPhone 14',
        'iPhone 14 Plus',
        'iPhone 14 Pro',
        'iPhone 14 Pro Max',
        'iPhone 15',
        'iPhone 15 Plus',
        'iPhone 15 Pro',
        'iPhone 15 Pro Max',
        'iPhone 16',
        'iPhone 16 Plus',
        'iPhone 16 Pro',
        'iPhone 16 Pro Max',
      ],
      notes: translation.deviceNotes.apple,
    },
    google: {
      devices: [
        'Google Pixel 2 (only phones bought with Google Fi service)',
        'Google Pixel 2 XL',
        'Google Pixel 3',
        'Google Pixel 3 XL',
        'Google Pixel 3a',
        'Google Pixel 3a XL',
        'Google Pixel 4',
        'Google Pixel 4a',
        'Google Pixel 4 XL',
        'Google Pixel 5',
        'Google Pixel 5a',
        'Google Pixel 6',
        'Google pixel 6a',
        'Google Pixel 6 Pro',
        'Google Pixel 7a',
        'Google Pixel 7',
        'Google Pixel 7 Pro',
        'Google Pixel 8a',
        'Google Pixel 8',
        'Google Pixel 8 Pro',
        'Google Pixel Fold',
        'Google Pixel 9',
        'Google Pixel 9 Pro',
        'Google Pixel 9 Pro XL',
      ],
      notes: translation.deviceNotes.google,
    },
    samsung: {
      devices: [
        'Samsung Galaxy S20',
        'Samsung Galaxy S20+',
        'Samsung Galaxy S20+ 5g',
        'Samsung Galaxy S20 Ultra',
        'Samsung Galaxy S20 Ultra 5G',
        'Samsung Galaxy S21',
        'Samsung Galaxy S21+ 5G',
        'Samsung Galaxy S21+ Ultra 5G',
        'Samsung Galaxy S22',
        'Samsung Galaxy S22+',
        'Samsung Galaxy S22 Ultra',
        'Samsung Galaxy S23',
        'Samsung Galaxy S23+',
        'Samsung Galaxy S23 Ultra',
        'Samsung Galaxy S23 FE',
        'Samsung Galaxy S24',
        'Samsung Galaxy S24+',
        'Samsung Galaxy S24 Ultra',
        'Samsung Galaxy S24 FE',
        'Samsung Galaxy Note 20',
        'Samsung Galaxy Note 20 Ultra 5G',
        'Samsung Galaxy Fold',
        'Samsung Galaxy Z Fold2 5G',
        'Samsung Galaxy Z Fold3 5G',
        'Samsung Galaxy Z Fold4',
        'Samsung Galaxy Z Fold5 5G',
        'Samsung Galaxy Z Fold6 5G',
        'Samsung Galaxy Z Flip',
        'Samsung Galaxy Z Flip3 5G',
        'Samsung Galaxy Z Flip4',
        'Samsung Galaxy Z Flip5 5G',
        'Samsung Galaxy Z Flip6 5G',
        'Samsung Galaxy A54',
        'Samsung Galaxy A55 5G',
        'Samsung Galaxy A35',
      ],
      notes: translation.deviceNotes.samsung,
    },
    honor: {
      devices: [
        'Honor Magic 4 Pro',
        'Honor Magic 5 Pro',
        'Honor Magic 6 Pro',
        'Honor 90',
        'Honor X8',
        'Honor 200 Pro',
        'Honor Magic V2',
        'Honor Magic V3',
      ],
      notes: [translation.deviceNotes.honor],
    },
    huawei: {
      devices: [
        'Huawei P40',
        'Huawei P40 Pro',
        'Huawei Mate 40 Pro',
        'Huawei Pura 70 Pro',
      ],
      notes: [translation.deviceNotes.huawei],
    },
    laptops: {
      devices: [
        'Microsoft Surface Pro X',
        'Microsoft Surface Go 2',
        'Microsoft Surface Pro LTE Advanced',
        'Acer Swift 3',
        'Acer Swift 7',
        'Asus Mini Transformer',
        'Asus NovaGo',
        'Asus VivoBook Flip 14',
        'HP Elitebook G5',
        'HP Probook G5',
        'HP Zbook G5',
        'HP Specter Folio 13',
        'Lenovo Yoga C630',
        'Lenovo Miix 630',
        'Lenovo Yoga 520',
        'Samsung Galaxy Book 2',
      ],
      notes: [],
    },
    motorola: {
      devices: [
        'Motorola Razr 2019',
        'Motorola Razr 2022',
        'Motorola Razr 5G',
        'Motorola Razr 40',
        'Motorola Razr 40 Ultra',
        'Motorola Razr+',
        'Motorola Edge 2022',
        'Motorola Edge 2023',
        'Motorola Edge+ (2023)',
        'Motorola Edge 40',
        'Motorola Edge 40 Pro',
        'Motorola Edge 40 Neo',
        'Motorola Edge 50 Pro',
        'Motorola Edge 50 Ultra',
        'Motorola Edge 50 Fusion',
        'Motorola Moto G Power 5G (2024)',
        'Motorola G52J 5G',
        'Motorola G52J 5G Ⅱ',
        'Motorola G53J 5G',
        'Moto G54 5G',
        'Motorola G84',
        'Motorola G34',
        'Motorola Moto G53',
        'Motorola Moto G54',
        'Motorola Razr+ 2024',
        'Motorola Razr 2024',
        'Motorola Moto G Stylus 5G 2024',
        'Motorola Moto G35',
      ],
      notes: [],
    },
    oneplus: {
      devices: [
        'OnePlus Open',
        'OnePlus 11',
        'OnePlus 12',
        'OnePlus 13',
        'OnePlus 13R',
      ],
      notes: [],
    },
    oppo: {
      devices: [
        'Oppo Find X3',
        'Oppo Find X3 Pro',
        'Find N2 Flip',
        'Oppo Reno 5A',
        'Oppo Reno 6 Pro 5G',
        'Oppo Reno 9A',
        'Oppo Find X5',
        'Oppo Find X5 Pro',
        'Oppo A55s 5G',
        'Oppo Find N3',
        'Oppo Find N3 Flip',
        'Oppo Find X8',
        'Oppo Find X8 Pro',
      ],
      notes: [translation.deviceNotes.oppo],
    },
    other: {
      devices: [
        'Gemini PDA',
        'Fairphone 4',
        'Fairphone 5',
        'DOOGEE V30',
        'HAMMER Blade 3',
        'HAMMER Explorer PRO',
        'HAMMER Blade 5G',
        'Nokia XR21',
        'Nokia X30',
        'Nokia G60 5G',
        'myPhone NOW eSIM',
        'OUKITEL WP30 Pro',
        'OUKITEL WP33 Pro',
        'Nuu X5',
        'ZTE Nubia Flip',
        'TLC 50 5G',
        'Asus ROG Phone 9',
        'Asus ROG Phone 9 Pro',
        'Realme 14 Pro+',
      ],
      notes: [],
    },
    rakuten: {
      devices: [
        'Rakuten Mini',
        'Rakuten Big-S',
        'Rakuten Big',
        'Rakuten Hand',
        'Rakuten Hand 5G',
      ],
      notes: [],
    },
    sharp: {
      devices: [
        'Sharp AQUOS Sense4 Lite',
        'Sharp AQUOS Sense6s',
        'AQUOS sense 7',
        'AQUOS sense 7plus',
        'Sharp AQUOS Wish',
        'AQUOS wish 2 SHG08',
        'AQUOS Wish3',
        'AQUOS Zero 6',
        'Simple Sumaho6',
        'Sharp AQUOS R7',
        'Sharp AQUOS R8',
        'Sharp AQUOS R8 Pro',
        'Sharp Aquos Sense8',
      ],
      notes: [],
    },
    sony: {
      devices: [
        'Sony Xperia 10 III Lite',
        'Sony Xperia 10 IV',
        'Xperia 10V',
        'Xperia 1 IV',
        'Sony Xperia 5 IV',
        'Sony Xperia 1 V',
        'Sony Xperia Ace III',
        'Sony Xperia 5 V',
        'Sony Xperia 1 VI',
      ],
      notes: [],
    },
    vivo: {
      devices: [
        'Vivo X80 Pro',
        'Vivo X90 Pro',
        'Vivo X100 Pro',
        'Vivo V29',
        'Vivo V29 Lite',
        'Vivo V29 Lite 5G',
        'Vivo V40',
        'Vivo V40 lite',
        'Vivo V40 SE',
        'Vivo X200',
        'Vivo X200 Pro',
      ],
      notes: [translation.deviceNotes.vivo],
    },
    xiaomi: {
      devices: [
        'Xiaomi 12T Pro',
        'Xiaomi 13',
        'Xiaomi 13 Lite',
        'Xiaomi 13 Pro',
        'Xiaomi 13T',
        'Xiaomi 13T Pro',
        'Xiaomi 14',
        'Xiaomi 14 Pro',
        'Xiaomi 14T',
        'Xiaomi 14T Pro',
        'Xiaomi Redmi Note 13 Pro+',
        'Xiaomi Redmi Note 14 Pro',
        'Xiaomi Redmi Note 14 Pro+',
        'Xiaomi Poco X7',
      ],
      notes: [],
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Banner */}
      <StickyBanner 
        onDevicesClick={handleDevicesClick}
        onHomeClick={handleHomeClick}
      />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center">
          <div className="inline-flex items-center justify-center bg-black text-white p-3 rounded-full mb-4">
            <SmartphoneIcon size={28} />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            {translation.title}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            {translation.subtitle}
            <span className="block mt-2 font-medium text-red-600">
              {translation.important}
            </span>
          </p>
        </header>

        <main className="mt-10 space-y-4">
          {Object.entries(deviceData).map(([brand, data]) => (
            <CollapsibleDeviceSection
              key={brand}
              title={`${brand.charAt(0).toUpperCase() + brand.slice(1)} ${translation.devices}`}
              devices={data.devices}
              notes={data.notes}
              icon={brand === 'laptops' ? 'tablet' : 'phone'}
              translation={translation}
            />
          ))}
        </main>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 pt-8 pb-12">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <InfoIcon size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-blue-800">{translation.about}</h3>
              <p className="mt-1 text-sm text-blue-700">{translation.aboutText}</p>
            </div>
          </div>
        </footer>
      </div>

      <Footer />
    </div>
  )
}