import React from 'react'
import { useLanguage } from '../context/LanguageContext'

export const TermsAndConditions = () => {
  const { t } = useLanguage()

  return (
    <div className="space-y-8 text-gray-700 max-w-none">
      {/* Service Overview */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          1. {t('terms.serviceOverview.title')}
        </h3>
        <p className="leading-relaxed">{t('terms.serviceOverview.content')}</p>
      </section>

      {/* User Eligibility */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          2. {t('terms.eligibility.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.eligibility.legalAge')}</li>
          <li className="leading-relaxed">{t('terms.eligibility.accurateInfo')}</li>
        </ul>
      </section>

      {/* Account Registration */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          3. {t('terms.registration.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.registration.validCredentials')}</li>
          <li className="leading-relaxed">{t('terms.registration.verification')}</li>
          <li className="leading-relaxed">{t('terms.registration.security')}</li>
        </ul>
      </section>

      {/* Service Usage */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          4. {t('terms.usage.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.usage.personalUse')}</li>
          <li className="leading-relaxed">{t('terms.usage.networkTerms')}</li>
          <li className="leading-relaxed">{t('terms.usage.deviceCompatibility')}</li>
        </ul>
      </section>

      {/* Payments & Refunds */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          5. {t('terms.payments.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.payments.secureProcessing')}</li>
          <li className="leading-relaxed">{t('terms.payments.noRefunds')}</li>
          <li className="leading-relaxed">{t('terms.payments.technicalSupport')}</li>
        </ul>
      </section>

      {/* QR Code and Account Access */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          6. {t('terms.qrCode.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.qrCode.unique')}</li>
          <li className="leading-relaxed">{t('terms.qrCode.access')}</li>
          <li className="leading-relaxed">{t('terms.qrCode.security')}</li>
        </ul>
      </section>

      {/* Service Limitations */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          7. {t('terms.limitations.title')}
        </h3>
        <p className="leading-relaxed mb-2">{t('terms.limitations.notResponsible')}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.limitations.compatibility')}</li>
          <li className="leading-relaxed">{t('terms.limitations.network')}</li>
          <li className="leading-relaxed">{t('terms.limitations.roaming')}</li>
          <li className="leading-relaxed">{t('terms.limitations.userErrors')}</li>
        </ul>
      </section>

      {/* Personal Data & Privacy */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          8. {t('terms.privacy.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.privacy.minimalData')}</li>
          <li className="leading-relaxed">{t('terms.privacy.secureStorage')}</li>
          <li className="leading-relaxed">{t('terms.privacy.payments')}</li>
          <li className="leading-relaxed">{t('terms.privacy.policy')}</li>
        </ul>
      </section>

      {/* Prohibited Actions */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          9. {t('terms.prohibited.title')}
        </h3>
        <p className="leading-relaxed mb-2">{t('terms.prohibited.intro')}</p>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.prohibited.sharing')}</li>
          <li className="leading-relaxed">{t('terms.prohibited.unlawful')}</li>
          <li className="leading-relaxed">{t('terms.prohibited.hacking')}</li>
        </ul>
        <p className="leading-relaxed mt-2">{t('terms.prohibited.violation')}</p>
      </section>

      {/* Limitation of Liability */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          10. {t('terms.liability.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.liability.indirect')}</li>
          <li className="leading-relaxed">{t('terms.liability.limit')}</li>
        </ul>
      </section>

      {/* Governing Law */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          11. {t('terms.law.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.law.jurisdiction')}</li>
          <li className="leading-relaxed">{t('terms.law.disputes')}</li>
        </ul>
      </section>

      {/* Changes to Terms */}
      <section>
        <h3 className="text-lg font-semibold mb-3 text-blue-600">
          12. {t('terms.changes.title')}
        </h3>
        <ul className="list-disc pl-5 space-y-2">
          <li className="leading-relaxed">{t('terms.changes.updates')}</li>
          <li className="leading-relaxed">{t('terms.changes.notification')}</li>
        </ul>
      </section>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>最終更新日:</strong> 2024年12月12日<br/>
          <strong>お問い合わせ:</strong> support@esimport.jp | 080-7886-2747
        </p>
      </div>
    </div>
  )
}