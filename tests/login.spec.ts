import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';
import { testConfig } from '../utils/testConfig';

test.describe('Login functionality tests', () => {
    let loginPage: LoginPage;
    let loggedInPage: LoggedInPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        loggedInPage = new LoggedInPage(page);
        await loginPage.navigate();
    });

    test('Successful login with valid credentials', async () => {
        await loginPage.login(testConfig.validUser.username, testConfig.validUser.password);
        await expect(await loggedInPage.hasExpectedUrl()).toBeTruthy();
        await expect(await loggedInPage.containsExpectedText()).toBeTruthy();
        await expect(await loggedInPage.isLogoutButtonVisible()).toBeTruthy();
    });

    test('Failed login with invalid username', async () => {
        await loginPage.login(testConfig.invalidUser.username, testConfig.invalidUser.password);
        await expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toEqual('Your username is invalid!');
    });

    test('Failed login with invalid password', async () => {
        await loginPage.login(testConfig.invalidPassword.username, testConfig.invalidPassword.password);
        await expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toEqual('Your password is invalid!');
    });
});