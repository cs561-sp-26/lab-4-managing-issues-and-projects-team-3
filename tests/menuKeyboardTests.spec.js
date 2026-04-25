const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/Login');

test.describe("menu keyboard tests",() => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('speedgolfer@gmail.com','Speedgolfer123');
    await expect(page.locator("#sLink")).toBeFocused();
    await page.keyboard.press('Tab'); //Focus on menu button
    await expect(page.locator("#menuBtn")).toBeFocused();
    await page.keyboard.press('Enter'); //Open menu
  });

  test('open menu via keyboard', async ({ page }) => { 
    await expect(page.locator('#sideMenu')).toBeVisible();
  });

  test('close menu via keyboard', async ({ page }) => {
    
    await page.keyboard.press('Escape'); //Close menu
    await expect(page.locator('#sideMenu')).not.toBeVisible();
    await expect(page.locator('#menuBtn')).toBeFocused();
  });

  test('open Settings menu item via keyboard', async ({ page }) => {
    await page.keyboard.press('Enter'); //Select first menu item
    await expect(page.locator('#sideMenu')).not.toBeVisible();
    await expect(page.locator('#menuBtn')).toBeFocused();
  });

});