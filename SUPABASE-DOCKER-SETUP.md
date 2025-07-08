# Supabase Dockerセットアップガイド

## 前提条件

### Docker Desktopのインストール

Supabaseのローカル開発にはDocker Desktopが必要です。

1. [Docker Desktop](https://www.docker.com/products/docker-desktop)からダウンロード
2. インストール後、Docker Desktopを起動

## Supabaseの起動

### 1. Docker Desktopが起動していることを確認

```bash
docker --version
```

### 2. Supabaseを起動

```bash
npx supabase start
```

初回起動時は、Dockerイメージのダウンロードに数分かかります。

### 3. 起動完了後の情報

起動が完了すると、以下の情報が表示されます：

```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJ...
 service_role key: eyJ...
```

### 4. 環境変数の設定

`.env.local`ファイルを作成し、上記の情報を設定：

```bash
cp .env.local.example .env.local
```

編集して以下の値を設定：
- `NEXT_PUBLIC_SUPABASE_URL`: API URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon key
- `SUPABASE_SERVICE_ROLE_KEY`: service_role key

## 管理ツール

### Supabase Studio

`http://localhost:54323` でSupabase Studioにアクセスできます。

- データベースの管理
- SQLエディタ
- 認証ユーザーの管理
- ストレージの管理

### Inbucket

`http://localhost:54324` でメールテストツールにアクセスできます。

- 認証メールの確認
- パスワードリセットメールの確認

## 基本的なコマンド

### 状態確認
```bash
npx supabase status
```

### 停止
```bash
npx supabase stop
```

### データベースのリセット
```bash
npx supabase db reset
```

### マイグレーションの作成
```bash
npx supabase migration new migration_name
```

## トラブルシューティング

### Dockerが起動しない場合

1. Docker Desktopがインストールされているか確認
2. Docker Desktopが起動しているか確認
3. Docker Desktopの設定でメモリ割り当てを確認

### ポートが使用中の場合

以下のポートが他のアプリケーションで使用されていないか確認：
- 54321 (API)
- 54322 (Database)
- 54323 (Studio)
- 54324 (Inbucket)
- 54327 (Analytics)
- 54329 (Pooler)

## 次のステップ

1. Docker Desktopをインストール・起動
2. `npx supabase start` を実行
3. `.env.local`を設定
4. `npm run dev` でNext.jsアプリケーションを起動
5. 認証機能の実装を継続