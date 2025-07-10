import React from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import { NavigationMenu } from '../components/NavigationMenu';

export const PrivacyPolicy = () => {
  const handleNavigate = (path: string) => {
    window.location.href = path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationMenu onNavigate={handleNavigate} />
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center">
            <button 
              onClick={() => window.history.back()}
              className="mr-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeftIcon className="w-6 h-6" />
            </button>
            <h1 className="text-3xl font-bold text-gray-900">プライバシーポリシー</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Trippinプライバシーポリシー</h2>
            
            <p className="text-gray-600 mb-6">
              最終更新日: 2024年1月1日
            </p>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. 個人情報の収集について</h3>
              <p className="text-gray-700 mb-4">
                当社は、以下の目的で個人情報を収集いたします：
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
                <li>サービスの提供および運営</li>
                <li>お客様からのお問い合わせへの対応</li>
                <li>サービスの改善および新サービスの開発</li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. 収集する個人情報の種類</h3>
              <p className="text-gray-700 mb-4">
                当社が収集する個人情報には、以下のものが含まれます：
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
                <li>氏名、メールアドレス、電話番号</li>
                <li>住所、生年月日</li>
                <li>パスポート情報（eSIMサービス利用時）</li>
                <li>旅行計画情報</li>
                <li>決済情報</li>
                <li>デバイス情報、IPアドレス</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. 個人情報の利用目的</h3>
              <p className="text-gray-700 mb-4">
                収集した個人情報は、以下の目的で利用いたします：
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
                <li>eSIMサービスの提供および管理</li>
                <li>AI旅行プランナー機能の提供</li>
                <li>フライト検索サービスの提供</li>
                <li>お客様サポートの提供</li>
                <li>決済処理の実行</li>
                <li>サービスの改善および開発</li>
                <li>法令に基づく対応</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">4. 個人情報の第三者提供</h3>
              <p className="text-gray-700 mb-4">
                当社は、以下の場合を除き、個人情報を第三者に提供いたしません：
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
                <li>お客様の事前の同意がある場合</li>
                <li>法令に基づく場合</li>
                <li>人の生命、身体または財産の保護のために必要な場合</li>
                <li>公衆衛生の向上または児童の健全な育成の推進のために特に必要な場合</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">5. 個人情報の安全管理</h3>
              <p className="text-gray-700 mb-4">
                当社は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理のために必要かつ適切な措置を講じます。
              </p>
              <ul className="list-disc list-inside text-gray-700 ml-4 mb-4">
                <li>SSL暗号化による通信の保護</li>
                <li>アクセス制御による不正アクセスの防止</li>
                <li>定期的なセキュリティ監査の実施</li>
                <li>従業員への個人情報保護教育の実施</li>
              </ul>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">6. 個人情報の開示・訂正・利用停止</h3>
              <p className="text-gray-700 mb-4">
                お客様は、当社に対して、ご自身の個人情報の開示、訂正、追加または削除、利用停止、消去および第三者への提供停止を求めることができます。
              </p>
              <p className="text-gray-700 mb-4">
                これらの請求をされる場合は、以下の連絡先までお問い合わせください：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Trippin株式会社</strong><br />
                  個人情報保護担当者<br />
                  メール: privacy@Trippin.jp<br />
                  電話: 03-1234-5678
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">7. クッキー（Cookie）の使用</h3>
              <p className="text-gray-700 mb-4">
                当社のウェブサイトでは、お客様により良いサービスを提供するため、クッキーを使用しています。クッキーは、お客様のブラウザに送信され、お客様のコンピュータに保存されます。
              </p>
              <p className="text-gray-700 mb-4">
                クッキーの使用を拒否する場合は、ブラウザの設定を変更してください。ただし、その場合、サービスの一部機能が正常に動作しない可能性があります。
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">8. アクセス解析ツールの使用</h3>
              <p className="text-gray-700 mb-4">
                当社のウェブサイトでは、Google Analyticsなどのアクセス解析ツールを使用しています。これらのツールは、お客様のアクセス情報を収集し、サービスの改善に活用いたします。
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">9. プライバシーポリシーの変更</h3>
              <p className="text-gray-700 mb-4">
                当社は、必要に応じて、このプライバシーポリシーを変更することがあります。重要な変更がある場合は、ウェブサイト上でお知らせいたします。
              </p>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">10. お問い合わせ</h3>
              <p className="text-gray-700 mb-4">
                このプライバシーポリシーに関するお問い合わせは、以下の連絡先までお願いいたします：
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Trippin株式会社</strong><br />
                  個人情報保護担当者<br />
                  〒100-0001 東京都千代田区千代田1-1-1<br />
                  メール: privacy@Trippin.jp<br />
                  電話: 03-1234-5678
                </p>
              </div>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                このプライバシーポリシーは、個人情報の保護に関する法律（個人情報保護法）に基づいて作成されています。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 