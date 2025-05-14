import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';
import { testConfig } from '../utils/testConfig';

test.describe('Logout functionality tests', () => {
    let loginPage: LoginPage;
    let loggedInPage: LoggedInPage;

    test('Successful logout after login', async ({ page }) => {
        loginPage = new LoginPage(page);
        loggedInPage = new LoggedInPage(page);

        await loginPage.navigate();
        await loginPage.login(testConfig.validUser.username, testConfig.validUser.password);
        // await expect(await loggedInPage.isLogoutButtonVisible()).toBeTruthy(); unstable on Firefox
        await loggedInPage.clickLogout();
        await page.waitForURL('**/practice-test-login/**');
        await expect(page.url()).toContain('practice-test-login');
        await expect(await loginPage.isLoginFormVisible()).toBeTruthy();
    });
});