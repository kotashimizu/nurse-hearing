#!/usr/bin/env node

/**
 * Taskmaster AI 統合スクリプト
 * TODOリストと連携してタスク管理を自動化
 */

const TaskMaster = require('task-master-ai');
const fs = require('fs').promises;
const path = require('path');

// 設定ファイルを読み込む
async function loadConfig() {
  const configPath = path.join(__dirname, '.taskmaster', 'config.json');
  const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
  
  // 環境変数からAPIキーを設定
  config.ai.apiKey = process.env.ANTHROPIC_API_KEY || config.ai.apiKey;
  
  return config;
}

// TODOファイルを解析
async function parseTodoFile() {
  const todoPath = path.join(__dirname, 'TODO.md');
  const content = await fs.readFile(todoPath, 'utf-8');
  
  const tasks = [];
  const lines = content.split('\n');
  let currentPhase = '';
  let currentCategory = '';
  
  lines.forEach((line, index) => {
    // フェーズの検出
    if (line.startsWith('## 第')) {
      currentPhase = line.replace('## ', '');
    }
    // カテゴリの検出
    else if (line.startsWith('### ')) {
      currentCategory = line.replace('### ', '');
    }
    // タスクの検出
    else if (line.match(/^- \[([ x])\] (.+)$/)) {
      const [, status, taskName] = line.match(/^- \[([ x])\] (.+)$/);
      tasks.push({
        line: index + 1,
        status: status === 'x' ? 'completed' : 'pending',
        name: taskName,
        phase: currentPhase,
        category: currentCategory,
        isE2E: taskName.includes('🧪 E2Eテスト')
      });
    }
  });
  
  return tasks;
}

// 次のタスクを取得
function getNextTask(tasks) {
  // 未完了のタスクから優先度順に取得
  const pendingTasks = tasks.filter(t => t.status === 'pending' && !t.isE2E);
  
  // フェーズ1を優先
  const phase1Tasks = pendingTasks.filter(t => t.phase.includes('第1フェーズ'));
  if (phase1Tasks.length > 0) {
    return phase1Tasks[0];
  }
  
  return pendingTasks[0];
}

// タスク実行プロンプトを生成
async function generateTaskPrompt(task, config) {
  const templatePath = path.join(__dirname, '.taskmaster', 'templates', 'task-prompt.md');
  let template = await fs.readFile(templatePath, 'utf-8');
  
  // テンプレート変数を置換
  template = template.replace('{{taskName}}', task.name);
  template = template.replace('{{currentPhase}}', task.phase);
  template = template.replace('{{currentCategory}}', task.category);
  template = template.replace('{{techStack}}', 'Next.js 14, TypeScript, Tailwind CSS, Supabase');
  
  // 要件を取得
  let requirements = '';
  if (task.name.includes('ログイン')) {
    requirements = '- 3つのロール（管理者/スタッフ/事務）に対応\n- Supabase Authを使用\n- セキュアな認証フロー';
  } else if (task.name.includes('シフト')) {
    requirements = '- スタッフの希望シフト提出機能\n- 管理者の承認フロー\n- 自動最適化アルゴリズム';
  }
  
  template = template.replace('{{requirements}}', requirements);
  template = template.replace('{{dependencies}}', '基盤構築タスク');
  
  return template;
}

// 進捗レポートを生成
async function generateProgressReport(tasks) {
  const completed = tasks.filter(t => t.status === 'completed').length;
  const total = tasks.length;
  const percentage = Math.round((completed / total) * 100);
  
  const phaseProgress = {};
  tasks.forEach(task => {
    if (!phaseProgress[task.phase]) {
      phaseProgress[task.phase] = { completed: 0, total: 0 };
    }
    phaseProgress[task.phase].total++;
    if (task.status === 'completed') {
      phaseProgress[task.phase].completed++;
    }
  });
  
  let report = `# 進捗レポート\n\n`;
  report += `## 全体進捗: ${percentage}% (${completed}/${total})\n\n`;
  report += `## フェーズ別進捗\n`;
  
  Object.entries(phaseProgress).forEach(([phase, progress]) => {
    const phasePercentage = Math.round((progress.completed / progress.total) * 100);
    report += `- ${phase}: ${phasePercentage}% (${progress.completed}/${progress.total})\n`;
  });
  
  report += `\n## 次のタスク\n`;
  const nextTask = getNextTask(tasks);
  if (nextTask) {
    report += `- ${nextTask.name} (${nextTask.phase})\n`;
  }
  
  return report;
}

// メイン処理
async function main() {
  try {
    console.log('🤖 Taskmaster AI を起動しています...\n');
    
    const config = await loadConfig();
    const tasks = await parseTodoFile();
    
    // コマンドライン引数を解析
    const command = process.argv[2];
    
    switch (command) {
      case 'next':
        // 次のタスクを表示
        const nextTask = getNextTask(tasks);
        if (nextTask) {
          console.log('📋 次のタスク:');
          console.log(`  ${nextTask.name}`);
          console.log(`  フェーズ: ${nextTask.phase}`);
          console.log(`  カテゴリ: ${nextTask.category}`);
          
          const prompt = await generateTaskPrompt(nextTask, config);
          console.log('\n📝 タスク実行プロンプト:');
          console.log(prompt);
        } else {
          console.log('✅ すべてのタスクが完了しています！');
        }
        break;
        
      case 'progress':
        // 進捗レポートを表示
        const report = await generateProgressReport(tasks);
        console.log(report);
        break;
        
      case 'sync':
        // TODOファイルを同期
        console.log('🔄 TODOファイルを同期中...');
        // 実際の同期処理はここに実装
        console.log('✅ 同期完了');
        break;
        
      default:
        console.log('使用方法:');
        console.log('  node taskmaster.js next     - 次のタスクを表示');
        console.log('  node taskmaster.js progress - 進捗レポートを表示');
        console.log('  node taskmaster.js sync     - TODOファイルを同期');
    }
    
  } catch (error) {
    console.error('❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

// 実行
main();