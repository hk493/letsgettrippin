import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { StickyBanner } from './StickyBanner'
import { CollapsibleDeviceSection } from './CollapsibleDeviceSection'
import { Footer } from './Footer'
// import { SmartphoneIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon, InfoIcon, TabletIcon } from 'lucide-react'

export const DevicesPage = ({ onBack }: { onBack: any }) => {
  const { t, currentLanguage, changeLanguage } = useLanguage() as any

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
    // ...（他言語省略）
  }

  const translation = (deviceTranslations as any)[currentLanguage.code] || deviceTranslations.en

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
    // ...（他ブランド省略、全文はproject 6参照）
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
            {/* <SmartphoneIcon size={28} /> */}
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
            {/* <InfoIcon size={20} className="text-blue-600 mt-0.5 flex-shrink-0" /> */}
            <div>
              <h3 className="font-medium text-blue-800">{translation.about}</h3>
              <p className="mt-1 text-sm text-blue-700">{translation.aboutText}</p>
            </div>
          </div>
        </footer>
      </div>

      {/* <Footer /> */}
    </div>
  )
} 