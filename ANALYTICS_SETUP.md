# Google Analytics 設定ガイド

## 概要
Let's Get Trippin'アプリケーションにGoogle Analytics（GA4）を統合しました。

## 設定内容

### 1. 基本設定
- **トラッキングID**: `G-Q65SK1WHYP`
- **実装方法**: Google Tag Manager (gtag.js)
- **配置場所**: `index.html`の`<head>`セクション

### 2. 実装された機能

#### 自動ページビュー追跡
- React Routerのページ遷移を自動追跡
- `usePageTracking`フックで実装

#### カスタムイベント追跡
以下のイベントが実装されています：

##### ユーザーインタラクション
- ボタンクリック (`button_click`)
- フォーム送信 (`form_submit`)
- 機能使用 (`feature_usage`)

##### コンバージョン
- ユーザー登録 (`sign_up`)
- eSIM購入 (`purchase`)
- ダウンロード (`download`)

##### エンゲージメント
- ページ滞在時間 (`time_on_page`)
- 検索クエリ (`search`)
- ソーシャルシェア (`share`)

### 3. 使用方法

#### 基本的なイベント追跡
```typescript
import { trackEvent } from '../utils/analytics';

// カスタムイベントを送信
trackEvent('button_click', 'UI Interaction', 'cta_button', 1);
```

#### フックを使用した追跡
```typescript
import { useInteractionTracking, useTimeTracking } from '../hooks/useAnalytics';

const MyComponent = () => {
  const { trackClick, trackFeatureUse } = useInteractionTracking();
  useTimeTracking('my_page');

  const handleClick = () => {
    trackClick('my_button', 'my_page');
  };

  return <button onClick={handleClick}>Click me</button>;
};
```

#### 専用関数の使用
```typescript
import { 
  trackESIMPurchase, 
  trackPlanCreation, 
  trackRegistration 
} from '../utils/analytics';

// eSIM購入を追跡
trackESIMPurchase('Adventurer Plan', 1980);

// 旅行プラン作成を追跡
trackPlanCreation('Tokyo', '7 days');

// ユーザー登録を追跡
trackRegistration('email');
```

### 4. 実装済みページ

#### LandingPage
- ページビュー自動追跡
- CTAボタンクリック追跡
- 機能紹介クリック追跡
- デモ動画ボタンクリック追跡

#### 全ページ共通
- ページビュー自動追跡
- 滞在時間追跡（5秒以上）

### 5. Google Analytics ダッシュボード

#### 確認すべき指標
1. **リアルタイムレポート**
   - アクティブユーザー数
   - ページビュー
   - イベント発生状況

2. **エンゲージメントレポート**
   - ページ滞在時間
   - ページビュー数
   - バウンス率

3. **コンバージョンレポート**
   - ユーザー登録数
   - eSIM購入数
   - 旅行プラン作成数

4. **イベントレポート**
   - ボタンクリック数
   - 機能使用状況
   - フォーム送信数

### 6. カスタマイズ

#### 新しいイベントの追加
```typescript
// utils/analytics.ts に新しい関数を追加
export const trackCustomEvent = (eventName: string, parameters: any) => {
  trackEvent(eventName, 'Custom', JSON.stringify(parameters));
};
```

#### 新しいページでの使用
```typescript
import { usePageTracking, useTimeTracking } from '../hooks/useAnalytics';

const NewPage = () => {
  usePageTracking(); // 自動ページビュー追跡
  useTimeTracking('new_page'); // 滞在時間追跡
  
  return <div>New Page Content</div>;
};
```

### 7. プライバシーとコンプライアンス

#### GDPR対応
- ユーザー同意の取得が必要な場合があります
- 個人情報の追跡は行っていません

#### データ保持
- Google Analyticsの標準的なデータ保持期間に従います
- 必要に応じてデータエクスポート機能を追加できます

### 8. トラブルシューティング

#### イベントが送信されない場合
1. ブラウザの開発者ツールでネットワークタブを確認
2. Google Analyticsのリアルタイムレポートを確認
3. `window.gtag`が定義されているか確認

#### ページビューが追跡されない場合
1. React Routerが正しく設定されているか確認
2. `usePageTracking`フックがApp.tsxで呼び出されているか確認

### 9. 今後の拡張予定

- [ ] エラートラッキング
- [ ] パフォーマンス追跡
- [ ] A/Bテスト統合
- [ ] カスタムダッシュボード
- [ ] リアルタイムアラート

## 注意事項
- 本番環境でのテストを必ず行ってください
- プライバシーポリシーの更新が必要な場合があります
- 定期的にデータの正確性を確認してください 