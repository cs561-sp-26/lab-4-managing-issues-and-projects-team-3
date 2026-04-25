 /*************************************************************************
 * File: createAccount.js
 * This file contains functions that support the "Create Account" Dialog.
 ************************************************************************/

  /*************************************************************************
 * @function createAccountBtn CLICK Handler 
 * @Desc 
 * When the user clicks the "Create Account" button link on the "Log In"
 * page, transition to the "Create Account" dialog.
 * @global GlobalCreateAccountDialog: The "Create Account" dialog
 * @global GlobalLoginPage: The Log In page
 * @global GlobalAcctEmailField: The email field
 *************************************************************************/
GlobalCreateAccountBtn.addEventListener("click",function(e) {
    GlobalLoginPage.classList.add("hidden");
    GlobalCreateAccountDialog.classList.remove("hidden");
    document.title = "Create Account";
    GlobalAcctEmailField.focus();
});