const { test, expect } = require('@playwright/test');

test.describe("create account visual tests",() => {
    test.beforeEach(async({ page }) => {
      await page.goto(''); //goes to base URL set in config file
      await page.click('#createAccountBtn'); //Click on 'Create Account' link
      await expect(page.locator('#createAccountDialog')).toBeVisible(); //'Create Account' dialog visible
      await expect(page.locator('#loginPage')).not.toBeVisible(); //'Login' page hidden
      await expect(page.locator('#acctEmail')).toBeFocused(); //Email field has focus

    });
  
    test('invalid email and repeated password via visual interface', async ({ page }) => { 
      await page.keyboard.type('chris.h'); //Invalid email
      await page.click('#acctPassword'); //Focus on 'Password' field
      await expect(page.locator('#acctPassword')).toBeFocused();
      await page.keyboard.type('Speedgolf123'); //Valid password
      await page.click('#acctPasswordRepeat'); //Focus on 'Repeat Password' field
      await expect(page.locator('#acctPasswordRepeat')).toBeFocused();
      await page.keyboard.type('Speedgolf1234'); //Password does not match. 
      await page.click('#submitCreateAccountBtn'); //Focus on 'Repeat Password' field
      await expect(page.locator('#acctEmailError')).toBeVisible(); //Email error visible
      await expect(page.locator('#acctPasswordError')).not.toBeVisible(); //No password error
      await expect(page.locator('#acctPasswordRepeatError')).toBeVisible(); //No password error
      await expect(page.locator('#acctDisplayNameError')).toBeVisible(); //No password error
      await expect(page.locator('#acctSecurityQuestionError')).toBeVisible(); //No password error
      await expect(page.locator('#acctSecurityAnswerError')).toBeVisible(); //No password error
      await expect(page.locator('#acctEmailError')).toBeFocused(); //top-most error should have focus 
      await page.click('#acctEmailError'); //Activate "Enter a valid email address"
      await expect(page.locator('#acctEmail')).toBeFocused(); //Email field should be focused
    });

});