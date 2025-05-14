import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { LoggedInPage } from '../pages/LoggedInPage';
import { testConfig } from '../utils/testConfig';

test.describe('Login functionality tests', () => {
    test('Successful login with valid credentials', async ({ page }) => {

        const loginPage = new LoginPage(page);
        const loggedInPage = new LoggedInPage(page);

        await loginPage.navigate();
        await loginPage.login(testConfig.validUser.username, testConfig.validUser.password);
        await expect(loggedInPage.hasExpectedUrl()).resolves.toBeTruthy();
        await expect(loggedInPage.containsExpectedText()).resolves.toBeTruthy();
        await expect(loggedInPage.isLogoutButtonVisible()).resolves.toBeTruthy();
    });

    test('Failed login with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(testConfig.invalidUser.username, testConfig.invalidUser.password);
        await expect(loginPage.isErrorMessageDisplayed()).resolves.toBeTruthy();
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toEqual('Your username is invalid!');
    });

    test('Failed login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.navigate();
        await loginPage.login(testConfig.invalidPassword.username, testConfig.invalidPassword.password);
        await expect(loginPage.isErrorMessageDisplayed()).resolves.toBeTruthy();
        const errorMessage = await loginPage.getErrorMessageText();
        expect(errorMessage).toEqual('Your password is invalid!');
    });
});