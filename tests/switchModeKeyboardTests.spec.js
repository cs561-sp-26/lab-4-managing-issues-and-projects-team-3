const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/Login');

test.describe("switch mode keyboard tests",() => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('speedgolfer@gmail.com','Speedgolfer123');
    await expect(page.locator("#sLink")).toBeFocused();
    await page.keyboard.press('Tab'); //Focus menu button
    await expect(page.locator("#menuBtn")).toBeFocused();
    await page.keyboard.press('Tab'); //Focus search icon
    await expect(page.locator("#searchBtn")).toBeFocused();
    await page.keyboard.press('Tab'); //Focus profile pic
    await expect(page.locator("#profileBtn")).toBeFocused();
    await page.keyboard.press('Tab'); //Focus Feed Mode tab
    await expect(page.locator("#feedMode")).toBeFocused();
  });

  test('switch to rounds', async ({ page }) => { 
    await page.keyboard.press('ArrowRight'); //Select next tab
    await page.keyboard.press('Enter'); //Focus Rounds Tab
    await expect(page.locator('#roundsMode')).toBeFocused();
    await expect(page.locator('#roundsModeTab')).toBeVisible();
    await expect(page.locator('#feedModeTab')).not.toBeVisible();
    await expect(page.locator('#coursesModeTab')).not.toBeVisible();
    await expect(page.locator('#buddiesModeTab')).not.toBeVisible();
    await expect(page.locator('#roundsMode')).toHaveClass(/modetab-selected/);
    await expect(page.locator('#feedMode')).not.toHaveClass(/modetab-selected/);
    await expect(page.locator('#coursesMode')).not.toHaveClass(/modetab-selected/);
    await expect(page.locator('#buddiesMode')).not.toHaveClass(/modetab-selected/);
  });

  //TO DO: Insert tests for switching to other modes

});