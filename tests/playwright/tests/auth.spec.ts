import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Authentication Tests', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
  });

  test('should display login form correctly', async () => {
    await loginPage.waitForLoginForm();
    
    // Verify all form elements are visible
    await expect(page.locator('[data-testid="email-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="password-input"]')).toBeVisible();
    await expect(page.locator('[data-testid="login-button"]')).toBeVisible();
  });

  test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.loginAsTestUser();
    
    // Wait for navigation to dashboard/home
    await page.waitForURL('**/');
    
    // Verify successful login (check for user menu or logout button)
    await expect(page.locator('[data-testid="user-menu"]')).toBeVisible();
  });

  test('should show error message with invalid credentials', async () => {
    await loginPage.login('invalid@email.com', 'wrongpassword');
    
    // Wait for error message
    await expect(async () => {
      const isErrorVisible = await loginPage.isErrorMessageVisible();
      expect(isErrorVisible).toBe(true);
    }).toPass();
    
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toContain('Invalid');
  });

  test('should navigate to register page', async ({ page }) => {
    await loginPage.clickRegisterLink();
    
    await page.waitForURL('**/register');
    expect(page.url()).toContain('/register');
  });

  test('admin login should access admin dashboard', async ({ page }) => {
    await loginPage.loginAsAdmin();
    
    // Wait for navigation
    await page.waitForURL('**/');
    
    // Verify admin-specific elements are visible
    await expect(page.locator('[data-testid="admin-menu"]')).toBeVisible();
  });
});
