const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/Login');

test.describe("menu visual tests",() => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('speedgolfer@gmail.com','Speedgolfer123');
    await page.locator('#menuBtn').click();
  });

  test('open menu', async ({ page }) => { 
    await expect(page.locator('#sideMenu')).toBeVisible();
  });

  test('close menu', async ({ page }) => {
    await page.locator('#menuBtn').click();
    await expect(page.locator('#sideMenu')).not.toBeVisible();
  });

  test('click settings menu item', async ({ page }) => {
    await page.locator("li",{hasText: "Settings"}).click();
    await expect(page.locator('#sideMenu')).not.toBeVisible();
  });

});