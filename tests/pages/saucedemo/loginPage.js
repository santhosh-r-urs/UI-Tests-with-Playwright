import {expect} from '@playwright/test';

export class LoginPage {
    constructor(page) {
        this.page = page;
        this.usernameField = page.locator('[data-test="username"]');
        this.passwordField = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.pageHeader = page.getByText('Swag Labs');
    }

    async login() {
        await this.usernameField.fill(process.env.SAUCEDEMO_USERNAME);
        await this.passwordField.fill(process.env.SAUCEDEMO_PASSWORD);
        await this.loginButton.click();
    }

    async pageHeaderIsVisible() {
        await expect(this.pageHeader).toBeVisible();
    }

    async goToSaucedemoPage() {
        await this.page.goto('https://www.saucedemo.com/');
        await this.pageHeaderIsVisible();
    }
}