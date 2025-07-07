import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Page selectors using data-testid attributes
  private readonly emailInput = '[data-testid="email-input"]';
  private readonly passwordInput = '[data-testid="password-input"]';
  private readonly loginButton = '[data-testid="login-button"]';
  private readonly errorMessage = '[data-testid="error-message"]';
  private readonly registerLink = '[data-testid="register-link"]';
  private readonly forgotPasswordLink = '[data-testid="forgot-password-link"]';

  constructor(page: Page) {
    super(page);
  }

  // Navigation
  async navigate(): Promise<void> {
    await this.goto('/login');
    await this.waitForPageLoad();
  }

  // Actions
  async enterEmail(email: string): Promise<void> {
    await this.fillInput(this.emailInput, email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.fillInput(this.passwordInput, password);
  }

  async clickLogin(): Promise<void> {
    await this.clickElement(this.loginButton);
  }

  async clickRegisterLink(): Promise<void> {
    await this.clickElement(this.registerLink);
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
  }

  // Combined actions
  async login(email: string, password: string): Promise<void> {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  async loginAsAdmin(): Promise<void> {
    await this.login(
      process.env.ADMIN_EMAIL || 'admin@ecommerce.com',
      process.env.ADMIN_PASSWORD || 'admin123'
    );
  }

  async loginAsTestUser(): Promise<void> {
    await this.login(
      process.env.TEST_USER_EMAIL || 'user@test.com',
      process.env.TEST_USER_PASSWORD || 'user123'
    );
  }

  // Validations
  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorMessage);
  }

  async isErrorMessageVisible(): Promise<boolean> {
    return await this.isVisible(this.errorMessage);
  }

  async isLoginButtonEnabled(): Promise<boolean> {
    return await this.page.isEnabled(this.loginButton);
  }

  // Wait for elements
  async waitForLoginForm(): Promise<void> {
    await this.expectVisible(this.emailInput);
    await this.expectVisible(this.passwordInput);
    await this.expectVisible(this.loginButton);
  }
}
