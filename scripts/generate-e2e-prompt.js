#!/usr/bin/env node

/**
 * E2Eテストプロンプト自動生成スクリプト
 * TODO.mdからE2Eテストタスクを検出して適切なプロンプトを生成
 */

const fs = require('fs');
const path = require('path');

// TODO.mdを読み込む
const todoPath = path.join(__dirname, '..', 'TODO.md');
const todoContent = fs.readFileSync(todoPath, 'utf-8');

// 完了したE2Eテストタスクを検出
const completedE2ETests = [];
const lines = todoContent.split('\n');

lines.forEach((line, index) => {
  if (line.includes('[x]') && line.includes('🧪 E2Eテスト')) {
    completedE2ETests.push({
      line: line.trim(),
      index: index + 1,
      testName: line.match(/E2Eテスト：(.+)$/)?.[1] || 'Unknown'
    });
  }
});

// 最新の完了したE2Eテストを取得
const latestTest = completedE2ETests[completedE2ETests.length - 1];

if (!latestTest) {
  console.log('完了したE2Eテストタスクが見つかりませんでした。');
  process.exit(0);
}

// テストタイプに応じたプロンプトを生成
function generatePrompt(testName) {
  const basePrompt = `
🧪 E2Eテスト実行プロンプト
=======================

Playwright MCPを使用して、以下のE2Eテストを実行してください：

テスト対象: ${testName}

実行手順:
1. Playwright MCPを起動
2. 該当するテストファイルを確認（tests/e2e/ディレクトリ）
3. テストを実行し、結果を確認
4. 失敗した場合は原因を分析

`;

  // テストタイプ別の詳細指示
  const testInstructions = {
    'ログインフロー（全ロール）': `
具体的なテストシナリオ:
- 管理者、スタッフ、事務職員の各ロールでログイン
- 権限に応じた画面遷移の確認
- エラーハンドリング（無効な認証情報）
- モバイルレスポンシブの確認

テストファイル: tests/e2e/phase1-login.spec.ts
`,
    'シフト管理フロー全体': `
具体的なテストシナリオ:
- スタッフによるシフト希望提出
- 管理者によるシフト確認・承認
- 通知機能の動作確認
- データの整合性チェック
`,
    '勤怠打刻フロー': `
具体的なテストシナリオ:
- GPS位置情報での打刻
- 打刻履歴の確認
- 誤打刻の修正フロー
- オフライン時の動作
`,
    '第1フェーズ全体フロー': `
具体的なテストシナリオ:
- ログイン → シフト管理 → 勤怠管理の一連のフロー
- 各機能間の連携確認
- データの一貫性チェック
- パフォーマンステスト（3秒以内のレスポンス）
`
  };

  return basePrompt + (testInstructions[testName] || '');
}

// プロンプトを生成して出力
const prompt = generatePrompt(latestTest.testName);
console.log(prompt);

// プロンプトをファイルに保存
const promptPath = path.join(__dirname, '..', 'tests', 'e2e', 'latest-prompt.txt');
fs.writeFileSync(promptPath, prompt);
console.log(`\n📝 プロンプトが保存されました: ${promptPath}`);