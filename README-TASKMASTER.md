# Taskmaster AI 導入ガイド

## 概要
Taskmaster AIは、プロジェクトのタスク管理を自動化し、AI支援により開発効率を向上させるツールです。

## インストール済み機能

### 1. タスク管理コマンド
```bash
# 次のタスクを表示（推奨）
npm run task:next

# 進捗レポートを表示
npm run task:progress

# TODOファイルを同期
npm run task:sync
```

### 2. MCP統合
VS CodeとCursorで利用可能：
- `.vscode/mcp.json`に設定済み
- Anthropic APIキーが必要

### 3. 自動化機能
- タスク優先順位の自動判定
- タスク実行プロンプトの生成
- 進捗レポートの自動作成
- E2Eテストトリガーとの連携

## 使用方法

### 開発フロー
1. **作業開始時**
   ```bash
   npm run task:next
   ```
   - 最優先タスクが表示される
   - 実装プロンプトが生成される

2. **タスク完了時**
   - TODO.mdで該当タスクを[x]にマーク
   - 自動的にhooksが実行される
   - 次のタスクを確認

3. **定期確認**
   ```bash
   npm run task:progress
   ```
   - フェーズ別進捗を確認
   - 全体の進捗率を把握

## 設定ファイル

### `.taskmaster/config.json`
- プロジェクト設定
- フェーズ定義
- 自動化ルール

### `.taskmaster/templates/`
- タスクプロンプトテンプレート
- レポートテンプレート

## 連携機能

### TODO.mdとの連携
- 自動的にTODO.mdを解析
- タスクの状態を追跡
- フェーズとカテゴリを認識

### E2Eテストとの連携
- 🧪マークのタスクを自動検出
- テスト実行を促進

### Git連携
- コミットプレフィックスの自動化
- タスク完了時の自動コミット（オプション）

## トラブルシューティング

### APIキーエラー
```bash
export ANTHROPIC_API_KEY="your-api-key"
```

### タスクが見つからない
- TODO.mdのフォーマットを確認
- `- [ ] タスク名` の形式が必要

### 進捗が更新されない
```bash
npm run task:sync
```

## ベストプラクティス

1. **毎日の開始時**
   - `npm run task:next`を実行
   - 当日の目標を明確化

2. **タスク実行中**
   - プロンプトに従って実装
   - テストファーストで開発

3. **週次レビュー**
   - `npm run task:progress`で進捗確認
   - 計画の調整

---

Taskmaster AIにより、効率的なタスク管理と開発が可能になります。