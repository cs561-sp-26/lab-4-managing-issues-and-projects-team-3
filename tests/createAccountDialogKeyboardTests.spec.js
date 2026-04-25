const { test, expect } = require('@playwright/test');

test.describe("create account keyboard tests",() => {
    test.beforeEach(async({ page }) => {
      await page.goto(''); //goes to base URL set in config file
      await page.keyboard.press('Tab'); //Focus skip link
      await expect(page.locator('#sLink')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "email" field
      await expect(page.locator('#email')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "email" field
      await expect(page.locator('#password')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "Log In" btton
      await expect(page.locator('#loginBtn')).toBeFocused();
      await page.keyboard.press('Tab'); //Focus "Create Account" btton
      await expect(page.locator('#createAccountBtn')).toBeFocused();
      await page.keyboard.press('Enter'); //Activate 'Create Account' link
      await expect(page.locator('#createAccountDialog')).toBeVisible(); //'Create Account' dialog visible
      await expect(page.locator('#loginPage')).not.toBeVisible(); //'Login' page hidden
      await expect(page.locator('#acctEmail')).toBeFocused(); //Email field has focus
    });

    test('invalid email and repeated password via kb interface', async ({ page }) => { 
        await page.keyboard.type('chris.h'); //Invalid email
        await page.keyboard.press('Tab'); //Focus on 'Password' field
        await expect(page.locator('#acctPassword')).toBeFocused();
        await page.keyboard.type('Speedgolf123'); //Valid password
        await page.keyboard.press('Tab'); //Focus on 'Repeat Password' field
        await expect(page.locator('#acctPasswordRepeat')).toBeFocused();
        await page.keyboard.type('Speedgolf1234'); //Password does not match.
        await page.keyboard.press('Tab'); //Focus on 'Display Name' field
        await expect(page.locator('#acctDisplayName')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Profile Pic' field
        await expect(page.locator('#acctProfilePic')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Security Q' field 
        await expect(page.locator('#acctSecurityQuestion')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Security A' field
        await expect(page.locator('#acctSecurityAnswer')).toBeFocused();
        await page.keyboard.press('Tab'); //Focus on 'Create Account' Button
        await page.keyboard.press('Enter'); //Activate 'Create Account' Button
        await expect(page.locator('#acctEmailError')).toBeVisible(); //Email error visible
        await expect(page.locator('#acctEmailError')).toBeFocused(); //top-most error should have focus 
        await expect(page.locator('#acctPasswordError')).not.toBeVisible(); //No password error
        await expect(page.locator('#acctPasswordRepeatError')).toBeVisible(); //No password error
        await expect(page.locator('#acctDisplayNameError')).toBeVisible(); //No password error
        await expect(page.locator('#acctSecurityQuestionError')).toBeVisible(); //No password error
        await expect(page.locator('#acctSecurityAnswerError')).toBeVisible(); //No password error
        await page.keyboard.press('Enter'); //Activate "Enter a valid email address"
        await expect(page.locator('#acctEmail')).toBeFocused(); //Email field should be focused
      });
    });
