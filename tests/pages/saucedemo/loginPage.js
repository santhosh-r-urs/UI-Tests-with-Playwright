const saudedemoUrl = 'https://www.saucedemo.com/';

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameField = page.locator('[data-test="username"]');
    this.passwordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.pageHeader = page.getByText('Swag Labs');
  }

  async login() {
    await this.usernameField.fill(process.env.SAUCEDEMO_USERNAME_STANDARD);
    await this.passwordField.fill(process.env.SAUCEDEMO_PASSWORD_STANDARD);
    await this.loginButton.click();
  }

  async goToSaucedemoPage() {
    await this.page.goto(saudedemoUrl);
  }
}
