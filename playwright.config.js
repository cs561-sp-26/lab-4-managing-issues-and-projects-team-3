
const { devices } = require('@playwright/test');

const config = {
    outputDir: './test-results',
    use: {
      baseURL: 'http://localhost:5500', 
      // headless: false,
      // launchOptions: {sloMo: 1000,},
    },
    projects: [
      {
        name: "ChromeDesktop",
        browserName: "chromium",
        use: { ...devices['Desktop Chrome'] },
        viewport: {width: 1024, height: 768}
      },
      {
        name: "ChromeMobile",
        browserName: "chromium",
        use: { ...devices['Pixel 6'] },
      },
      {
        name: "SafariMobile",
        browserName: "webkit",
        use: { ...devices['iPhone 10']},
      }
    ],
  };
  
  module.exports = config;