/*************************************************************************
 * File: Login.js
 * Desc: Defines LoginPage, a Page Object Model 
 * (see https://playwright.dev/docs/pom) for the Login Page
 * Can be called by any test to set up the test by logging in a user
 * The email and password with which the object is initialized are
 * assumed to be valid; otherwise the login will fail and any 
 * subsequent tests will fail.
*************************************************************************/

class LoginPage {
    /**
     * constructor -- Constructs a new LoginPage object
     * from the page param. 
     * @param {import('playwright').Page} page 
     */
    constructor(page) {
      this.page = page;
      this.emailInput = page.locator('#email');
      this.passwordInput = page.locator('#password');
      this.loginButton = page.locator('#loginBtn');
    }
    
    /**
     * login -- Logs user in with specified email and 
     * password. 
     * @param email -- a valid email address
     * @param password -- a valid password
     * Note: if email or password is invalid, the login 
     * will fail and any subsequent tests will fail.
     */
  
    async login(email, password) {
        await this.page.goto(''); //goes to base URL set in config file
        await this.emailInput.click(); //Focus on email field
        await this.emailInput.type(email);
        await this.passwordInput.click(); //Focus on email field
        await this.passwordInput.type(password);
        await this.loginButton.click(); //Log in!
    }
    
  }

  module.exports = { LoginPage };