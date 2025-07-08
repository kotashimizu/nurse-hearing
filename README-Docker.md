# Docker環境構築ガイド

## 概要
このプロジェクトは、Docker及びDocker Composeを使用して開発・本番環境を構築できます。

## 前提条件
- Docker Desktop または Docker Engine がインストールされていること
- Docker Compose がインストールされていること

## ファイル構成
```
nurse-hearing/
├── Dockerfile              # 本番環境用のDockerfile
├── Dockerfile.dev          # 開発環境用のDockerfile
├── docker-compose.yml      # 本番環境用のDocker Compose設定
├── docker-compose.dev.yml  # 開発環境用のDocker Compose設定
├── .dockerignore          # Dockerビルド時の除外ファイル設定
└── .env.example           # 環境変数のサンプルファイル
```

## セットアップ手順

### 1. 環境変数の設定
```bash
# .env.exampleをコピーして.env.localを作成
cp .env.example .env.local

# .env.localを編集して必要な環境変数を設定
# 特に以下の項目は必須です：
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - OPENAI_API_KEY
# - その他のAPI キー
```

### 2. 開発環境の起動
```bash
# 開発環境を起動
docker-compose -f docker-compose.dev.yml up -d

# ログを確認
docker-compose -f docker-compose.dev.yml logs -f

# 開発環境を停止
docker-compose -f docker-compose.dev.yml down
```

開発環境では以下のサービスが起動します：
- Next.jsアプリケーション: http://localhost:3000
- PostgreSQLデータベース: localhost:5432
- Redis: localhost:6379
- Adminer（DB管理ツール）: http://localhost:8080

### 3. 本番環境の起動
```bash
# 本番環境をビルド
docker-compose build

# 本番環境を起動
docker-compose up -d

# Nginxを含む完全な本番環境を起動
docker-compose --profile production up -d

# Pythonサービスも含めて起動
docker-compose --profile with-python up -d
```

## よく使うコマンド

### コンテナ操作
```bash
# 実行中のコンテナを確認
docker-compose ps

# 特定のサービスのログを確認
docker-compose logs -f app

# コンテナに入る
docker-compose exec app sh
docker-compose exec db psql -U postgres -d nurse_hearing

# コンテナを再起動
docker-compose restart app
```

### データベース操作
```bash
# データベースのバックアップ
docker-compose exec db pg_dump -U postgres nurse_hearing > backup.sql

# データベースのリストア
docker-compose exec -T db psql -U postgres nurse_hearing < backup.sql

# マイグレーションの実行（Next.jsアプリ内で）
docker-compose exec app npm run db:migrate
```

### ビルド・クリーンアップ
```bash
# イメージを再ビルド
docker-compose build --no-cache

# 未使用のリソースをクリーンアップ
docker system prune -a

# ボリュームも含めて完全にクリーンアップ
docker-compose down -v
```

## トラブルシューティング

### ポートが既に使用されている場合
```bash
# 使用中のポートを確認
lsof -i :3000
lsof -i :5432

# 別のポートで起動する場合は、docker-compose.ymlを編集
# または環境変数で上書き
PORT=3001 docker-compose up
```

### パーミッションエラーが発生する場合
```bash
# ボリュームの所有者を確認
docker-compose exec app ls -la

# 必要に応じて権限を修正
docker-compose exec app chown -R node:node /app
```

### データベース接続エラー
```bash
# データベースの状態を確認
docker-compose exec db pg_isready

# データベースに直接接続してテスト
docker-compose exec db psql -U postgres
```

## 開発のヒント

1. **ホットリロード**: 開発環境では、ソースコードの変更が自動的に反映されます。

2. **デバッグ**: VSCodeのRemote Containers拡張機能を使用すると、コンテナ内で直接デバッグできます。

3. **パフォーマンス**: Macの場合、Dockerのファイル同期が遅い場合があります。`.dockerignore`でnode_modulesを除外することで改善できます。

4. **メモリ設定**: Docker Desktopの設定で、十分なメモリ（最低4GB推奨）を割り当ててください。

## 本番環境へのデプロイ

1. 環境変数を本番用に設定
2. SSL証明書を`nginx/ssl`ディレクトリに配置
3. `nginx/nginx.conf`を本番環境に合わせて設定
4. Docker Swarmまたはkubernetesでのオーケストレーション設定

詳細なデプロイ手順は、別途デプロイメントガイドを参照してください。