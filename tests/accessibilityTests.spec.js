const { test } = require('@playwright/test');
const { injectAxe, checkA11y } = require('axe-playwright');

test('check accessibility', async ({ page }) => { 
  await page.goto(''); //goes to base URL set in config file
  await injectAxe(page);
  await checkA11y(page);
});