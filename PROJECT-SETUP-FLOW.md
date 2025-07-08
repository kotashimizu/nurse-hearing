# プロジェクトセットアップフロー図

## あなたが実行してきた作業の流れ

```mermaid
flowchart TD
    Start([プロジェクト開始]) --> A[GitHubリポジトリ作成<br/>nurse-hearing]
    
    A --> B[プロジェクト初期設定]
    B --> B1[要件定義書作成<br/>requirements.md]
    B --> B2[クライアント確認事項<br/>client-questions.md]
    B --> B3[TODO リスト作成<br/>TODO.md]
    
    B1 --> C[Docker環境構築]
    C --> C1[Dockerfile作成]
    C --> C2[docker-compose.yml作成]
    C --> C3[開発/本番環境分離]
    
    C3 --> D[ファイル名問題対応]
    D --> D1[日本語ファイル名の<br/>文字化け問題発見]
    D --> D2[英語ファイル名に変更]
    D --> D3[Git設定調整]
    
    D3 --> E[MCP設定]
    E --> E1[Claude Desktop設定<br/>GitHub MCP追加]
    E --> E2[Cursor設定<br/>GitHub MCP追加]
    E --> E3[context7確認<br/>Claude専用と判明]
    
    E3 --> F[Hooks設定]
    F --> F1[TODO完了時の<br/>通知音設定]
    F --> F2[コードチェック<br/>自動実行設定]
    F --> F3[危険コマンド<br/>ブロック設定]
    
    F3 --> G[E2Eテスト自動化]
    G --> G1[CLAUDE.mdに<br/>E2Eタイミング追加]
    G --> G2[TODO.mdに<br/>🧪マーク追加]
    G --> G3[自動プロンプト<br/>生成スクリプト]
    G --> G4[Playwright設定]
    
    G4 --> H[Taskmaster AI導入]
    H --> H1[パッケージインストール]
    H --> H2[設定ファイル作成]
    H --> H3[タスク管理<br/>スクリプト作成]
    H --> H4[npmコマンド追加]
    
    H4 --> I[プロジェクト文書整理]
    I --> I1[README.md作成]
    I --> I2[CLAUDE.md作成]
    I --> I3[各種ガイド作成]
    
    I3 --> End([現在の状態])
    
    style Start fill:#e1f5e1
    style End fill:#ffe1e1
    style D1 fill:#ffeeee
    style F fill:#eeeeff
    style G fill:#fffeee
    style H fill:#eeffee
```

## 各ステップで作成されたファイル

```mermaid
graph LR
    subgraph "1. 初期設定"
        A1[requirements.md]
        A2[client-questions.md]
        A3[TODO.md]
    end
    
    subgraph "2. Docker"
        B1[Dockerfile]
        B2[Dockerfile.dev]
        B3[docker-compose.yml]
        B4[docker-compose.dev.yml]
        B5[.dockerignore]
    end
    
    subgraph "3. 環境設定"
        C1[.env.example]
        C2[.gitignore]
        C3[package.json]
    end
    
    subgraph "4. MCP/Hooks"
        D1[.claude/settings.local.json]
        D2[.vscode/mcp.json]
        D3[.cursor/mcp.json]
    end
    
    subgraph "5. 自動化"
        E1[scripts/generate-e2e-prompt.js]
        E2[scripts/check-dependencies.js]
        E3[taskmaster.js]
    end
    
    subgraph "6. ドキュメント"
        F1[README.md]
        F2[CLAUDE.md]
        F3[README-Docker.md]
        F4[README-TASKMASTER.md]
        F5[ARCHITECTURE.md]
    end
```

## 技術的な決定事項

```mermaid
mindmap
  root((プロジェクト<br/>技術選定))
    フロントエンド
      Next.js 14
      React 18
      TypeScript
      Tailwind CSS
    バックエンド
      Next.js API Routes
      Python（シフト最適化）
      Supabase
      Redis
    開発環境
      Docker
      VS Code/Cursor
      Claude Code CLI
    自動化
      Taskmaster AI
      Playwright
      Hooks
      GitHub Actions
    外部サービス
      Google Maps API
      Google Speech-to-Text
      OpenAI API
      LINE Messaging API
```

## セットアップの成果

1. **プロジェクト基盤** ✅
   - GitHubリポジトリ
   - 要件定義
   - タスク管理システム

2. **開発環境** ✅
   - Docker環境
   - MCP統合
   - 自動化ツール

3. **品質保証** ✅
   - E2Eテスト自動化
   - コードチェック
   - セキュリティ設定

4. **効率化** ✅
   - Taskmaster AI
   - Hooks通知
   - 自動プロンプト生成

現在、開発を開始する準備が完全に整っています。