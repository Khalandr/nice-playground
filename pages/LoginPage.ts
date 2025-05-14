import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

    private readonly loginUrl = 'https://practicetestautomation.com/practice-test-login/';
    private readonly usernameInput = '#username';
    private readonly passwordInput = '#password';
    private readonly submitButton = '#submit';
    private readonly errorMessage = '#error';

    constructor(page: Page) {
        super(page);
    }

    async navigate(): Promise<void> {
        await this.navigateTo(this.loginUrl);
    }

    async enterUsername(username: string): Promise<void> {
        await this.page.fill(this.usernameInput, username);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.fill(this.passwordInput, password);
    }

    async clickSubmit(): Promise<void> {
        await this.page.click(this.submitButton);
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
    }

    async isErrorMessageDisplayed(): Promise<boolean> {
        return await this.page.isVisible(this.errorMessage);
    }

    async getErrorMessageText(): Promise<string> {
        return await this.page.textContent(this.errorMessage) || '';
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.page.isVisible(this.usernameInput) &&
            await this.page.isVisible(this.passwordInput) &&
            await this.page.isVisible(this.submitButton);
    }
}