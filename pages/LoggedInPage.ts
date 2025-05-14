import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoggedInPage extends BasePage {

    private readonly logoutButton = '.wp-block-button__link';
    private readonly successMessage = '.post-content';
    private readonly expectedUrlPart = 'logged-in-successfully';
    private readonly congratulationTextPart = 'Congratulations student';
    private readonly successfullyLoggedInTextPart = 'successfully logged in';

    constructor(page: Page) {
        super(page);
    }

    async hasExpectedUrl(): Promise<boolean> {
        const currentUrl = await this.getCurrentUrl();
        return currentUrl.includes(this.expectedUrlPart);
    }

    async isLogoutButtonVisible(): Promise<boolean> {
        return await this.page.isVisible(this.logoutButton);
    }

    async clickLogout(): Promise<void> {
        await this.page.click(this.logoutButton);
    }

    async getSuccessMessage(): Promise<string> {
        return await this.page.textContent(this.successMessage) || '';
    }

    async containsExpectedText(): Promise<boolean> {
        const message = await this.getSuccessMessage();
        return message.includes(this.congratulationTextPart) ||
            message.includes(this.successfullyLoggedInTextPart);
    }
}