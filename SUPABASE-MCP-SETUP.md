# Supabase MCP セットアップガイド

## 概要
Supabase MCPを使用することで、Claude/CursorからSupabaseデータベースに直接アクセスして操作できます。

## インストール済み設定

### 1. Claude Desktop設定
`~/Library/Application Support/Claude/claude_desktop_config.json`に追加済み：
```json
"supabase": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-supabase"],
  "env": {
    "SUPABASE_URL": "${SUPABASE_URL}",
    "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
  }
}
```

### 2. Cursor設定
`~/.cursor/mcp.json`に追加済み：
```json
"supabase": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-supabase"],
  "env": {
    "SUPABASE_URL": "${SUPABASE_URL}",
    "SUPABASE_SERVICE_ROLE_KEY": "${SUPABASE_SERVICE_ROLE_KEY}"
  }
}
```

### 3. VS Code設定
`.vscode/mcp.json`に追加済み：
```json
"supabase": {
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-supabase"],
  "env": {
    "SUPABASE_URL": "${env:SUPABASE_URL}",
    "SUPABASE_SERVICE_ROLE_KEY": "${env:SUPABASE_SERVICE_ROLE_KEY}"
  }
}
```

## 環境変数の設定

### ローカルSupabase（Docker）の場合
```bash
export SUPABASE_URL="http://localhost:54321"
export SUPABASE_SERVICE_ROLE_KEY="your-local-service-role-key"
```

### Supabaseクラウドの場合
```bash
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## 使用方法

### 1. 環境変数を設定
```bash
# .env.localに追加
echo 'SUPABASE_URL=http://localhost:54321' >> .env.local
echo 'SUPABASE_SERVICE_ROLE_KEY=your-key' >> .env.local
```

### 2. Claude/Cursorを再起動
環境変数を読み込むため、アプリケーションを再起動します。

### 3. 利用可能な機能
- データベーステーブルの作成・更新・削除
- データの挿入・更新・削除・検索
- RLS（Row Level Security）ポリシーの管理
- ストレージバケットの管理
- 認証ユーザーの管理

## セキュリティ注意事項

⚠️ **重要**: Service Role Keyは管理者権限を持つため、以下の点に注意：

1. **本番環境のキーは使用しない**
   - 開発環境のみで使用
   - 本番環境では読み取り専用のキーを使用

2. **キーの管理**
   - `.env.local`をGitにコミットしない
   - 環境変数として管理

3. **アクセス制限**
   - ローカル開発環境のみで使用
   - チームメンバーと共有しない

## トラブルシューティング

### MCPが起動しない場合
1. 環境変数が正しく設定されているか確認
2. Supabaseサービスが起動しているか確認
3. ネットワーク接続を確認

### 権限エラーが発生する場合
1. Service Role Keyが正しいか確認
2. Supabaseプロジェクトの設定を確認
3. RLSポリシーを確認

## 参考リンク
- [Supabase MCP Server](https://github.com/modelcontextprotocol/servers/tree/main/src/supabase)
- [Supabase Documentation](https://supabase.com/docs)