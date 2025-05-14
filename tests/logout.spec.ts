import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';
import { testConfig } from '../utils/testConfig';

test.describe('Logout functionality tests', () => {
    test('Successful logout after login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const loggedInPage = new LoggedInPage(page);

        await loginPage.navigate();
        await loginPage.login(testConfig.validUser.username, testConfig.validUser.password);
        await expect(loggedInPage.isLogoutButtonVisible()).resolves.toBeTruthy();
        await loggedInPage.clickLogout();
        await expect(page.url()).toContain('practice-test-login');
        await expect(loginPage.isLoginFormVisible()).resolves.toBeTruthy();
    });
});