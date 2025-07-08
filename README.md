# 訪問看護事業支援システム

訪問看護事業における業務効率化と品質向上を実現するための統合管理システム

## 🎯 プロジェクト概要

本システムは、訪問看護事業の現場で発生する様々な業務課題を解決し、スタッフの負担軽減と利用者様へのサービス品質向上を目指した統合的な業務支援システムです。

### 主な機能
- 🗓️ **シフト自動作成機能** - AIによる最適なシフト配置
- 📍 **GPS連動勤怠管理** - 正確な訪問記録と勤務時間管理
- 💰 **複雑な給与計算システム** - 5つの係数による公平な評価
- 🎙️ **看護記録の音声入力** - 業務効率化と記録精度向上
- ⭐ **利用者評価システム** - サービス品質の可視化
- 🗺️ **訪問ルート最適化** - 効率的な訪問計画
- 📝 **求人文章作成支援** - AI活用による採用活動支援

## 🚀 技術スタック

### フロントエンド
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**

### バックエンド
- **Next.js API Routes**
- **Python** (シフト最適化アルゴリズム)
- **Supabase** (PostgreSQL + 認証)
- **Redis** (キャッシュ・セッション管理)

### 外部API連携
- **Google Maps API** - ルート最適化
- **Google Speech-to-Text API** - 音声認識
- **OpenAI API** - AI機能全般
- **LINE Messaging API** - 評価システム

### インフラ
- **Vercel** - ホスティング
- **Docker** - 開発環境
- **GitHub Actions** - CI/CD

## 📋 プロジェクト構成

```
nurse-hearing/
├── README.md              # このファイル
├── requirements.md        # 要件定義書
├── client-questions.md    # クライアント確認事項
├── TODO.md               # 開発タスクリスト
├── README-Docker.md      # Docker環境構築ガイド
├── docker-compose.yml    # Docker設定
├── docker-compose.dev.yml # 開発環境Docker設定
├── Dockerfile           # 本番環境用
├── Dockerfile.dev       # 開発環境用
├── .dockerignore        # Docker除外設定
└── .env.example         # 環境変数サンプル
```

## 🛠️ セットアップ

### 前提条件
- Node.js 20以上
- Docker Desktop
- Git

### 開発環境の構築

1. **リポジトリのクローン**
```bash
git clone https://github.com/kotashimizu/nurse-hearing.git
cd nurse-hearing
```

2. **環境変数の設定**
```bash
cp .env.example .env.local
# .env.localに必要な環境変数を設定
```

3. **Docker環境の起動**
```bash
docker-compose -f docker-compose.dev.yml up -d
```

4. **アプリケーションへのアクセス**
- アプリケーション: http://localhost:3000
- データベース管理: http://localhost:8080

詳細は [Docker環境構築ガイド](./README-Docker.md) を参照してください。

## 📅 開発スケジュール

### 第1フェーズ（3週間）
- 基盤構築
- シフト管理機能
- 勤怠管理機能

### 第2フェーズ（2週間）
- 給与計算システム
- 利用者評価システム

### 第3フェーズ（2週間）
- 看護記録自動化
- 訪問ルート最適化

### 第4フェーズ（1週間）
- 求人文章作成支援
- その他機能

詳細は [開発TODOリスト](./TODO.md) を参照してください。

## 🔒 セキュリティ

- SSL/TLS暗号化通信
- ロールベースアクセス制御（RBAC）
- 個人情報の適切な管理
- 定期的なバックアップ

## 📝 ドキュメント

- [要件定義書](./requirements.md)
- [クライアント確認事項](./client-questions.md)
- [開発TODOリスト](./TODO.md)
- [Docker環境構築ガイド](./README-Docker.md)

## 🤝 貢献方法

1. フォークする
2. フィーチャーブランチを作成する (`git checkout -b feature/AmazingFeature`)
3. 変更をコミットする (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュする (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成する

## 📄 ライセンス

このプロジェクトは非公開プロジェクトです。無断での使用・複製・配布を禁じます。

## 📞 連絡先

プロジェクトオーナー: 林様  
開発責任者: 志水様

---

© 2025 訪問看護事業支援システム. All Rights Reserved.