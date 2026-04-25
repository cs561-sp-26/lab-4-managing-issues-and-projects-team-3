const { test, expect } = require('@playwright/test');

test.describe("login keyboard tests",() => {
  test.beforeEach(async({ page }) => {
    await page.goto(''); //goes to base URL set in config file
    await page.keyboard.press('Tab'); //Focus skip link
    await expect(page.locator('#sLink')).toBeFocused();
    await page.keyboard.press('Tab'); //Focus "email" field
    await expect(page.locator('#email')).toBeFocused();
  });

  test('invalid email via keyboard', async ({ page }) => { 
    await page.keyboard.type('chris.h'); //Invalid email
    await page.keyboard.press('Tab'); //Focus on password field
    await expect(page.locator('#password')).toBeFocused();
    await page.keyboard.type('Speedgolf123'); //Valid password
    await page.keyboard.press('Tab'); //Focus on "Log In" button
    await page.keyboard.press('Enter'); //Activate "Log In" button
    await expect(page.locator('#errorBox')).toBeVisible(); //Pink box is visible
    await expect(page.locator('#emailError')).toBeVisible(); //Email error visible
    await expect(page.locator('#passwordError')).not.toBeVisible(); //No password error
    await expect(page.locator('#emailError')).toBeFocused(); //Email error focused
    await page.keyboard.press('Enter'); //Activate "Enter a valid email address"
    await expect(page.locator('#email')).toBeFocused(); //Email field should be focused
  });


});