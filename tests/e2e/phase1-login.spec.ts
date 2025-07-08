import { test, expect } from '@playwright/test';

// 第1フェーズ：ログインフローのE2Eテスト
test.describe('ログインフロー', () => {
  test.beforeEach(async ({ page }) => {
    // ローカル環境のURLにアクセス
    await page.goto('http://localhost:3000/login');
  });

  test('管理者としてログイン', async ({ page }) => {
    // メールアドレスとパスワードを入力
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'admin-password');
    
    // ログインボタンをクリック
    await page.click('[data-testid="login-button"]');
    
    // ダッシュボードへリダイレクトされることを確認
    await expect(page).toHaveURL(/.*dashboard/);
    
    // 管理者メニューが表示されることを確認
    await expect(page.locator('[data-testid="admin-menu"]')).toBeVisible();
  });

  test('スタッフとしてログイン', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'staff@example.com');
    await page.fill('[data-testid="password-input"]', 'staff-password');
    await page.click('[data-testid="login-button"]');
    
    // スタッフ用ダッシュボードへリダイレクト
    await expect(page).toHaveURL(/.*staff-dashboard/);
    
    // シフト希望提出ボタンが表示される
    await expect(page.locator('[data-testid="shift-request-button"]')).toBeVisible();
  });

  test('事務職員としてログイン', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'office@example.com');
    await page.fill('[data-testid="password-input"]', 'office-password');
    await page.click('[data-testid="login-button"]');
    
    // 事務職員用ダッシュボードへリダイレクト
    await expect(page).toHaveURL(/.*office-dashboard/);
    
    // レポート閲覧権限があることを確認
    await expect(page.locator('[data-testid="reports-menu"]')).toBeVisible();
  });

  test('無効な認証情報でのログイン失敗', async ({ page }) => {
    await page.fill('[data-testid="email-input"]', 'invalid@example.com');
    await page.fill('[data-testid="password-input"]', 'wrong-password');
    await page.click('[data-testid="login-button"]');
    
    // エラーメッセージが表示される
    await expect(page.locator('[data-testid="error-message"]')).toContainText('メールアドレスまたはパスワードが正しくありません');
    
    // ログインページに留まる
    await expect(page).toHaveURL(/.*login/);
  });
});

// モバイルデバイスでのテスト
test.describe('モバイルレスポンシブ', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE

  test('モバイルでのログイン画面表示', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    
    // モバイル用のレイアウトが適用されている
    await expect(page.locator('[data-testid="mobile-header"]')).toBeVisible();
    
    // フォームが画面幅に合わせて調整されている
    const loginForm = page.locator('[data-testid="login-form"]');
    const box = await loginForm.boundingBox();
    expect(box?.width).toBeLessThan(375);
  });
});