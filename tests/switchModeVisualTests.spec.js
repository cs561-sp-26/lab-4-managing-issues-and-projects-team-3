const { test, expect } = require('@playwright/test');
const { LoginPage } = require('./models/Login');

test.describe("switch mode visual tests",() => {
  test.beforeEach(async({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login('speedgolfer@gmail.com','Speedgolfer123');
  });

  test('switch to rounds', async ({ page }) => { 
    await page.locator('#roundsMode').click();
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