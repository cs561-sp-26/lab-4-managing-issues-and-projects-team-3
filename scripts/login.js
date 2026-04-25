/*************************************************************************
 * File: login.js
 * This file contains functions that support the log in page.
*************************************************************************/
/*************************************************************************
 * @function validAccount
 * @desc 
 * Given an email and password entered into the "Log In" page, return true
 * if the account exists in localStorage and the password matches, false 
 * otherwise. 
 * @param email: String entered into Email field of "Log In" form
 * @param password: String entered into Password field of "Log In" form
 *************************************************************************/
 function validAccount(email, password) {
    let acct = localStorage.getItem(email);
    if (acct === null) {
        return false;
    }
    acct = JSON.parse(acct);
    if (acct.accountInfo.password !== password) {
        return false;
    }
    return true;
}

/*************************************************************************
 * @function resetLoginForm
 * @desc 
 * After a user successfully logs in, this function should be called to
 * reset the form to its default state. 
 * @global GlobalErrorBox: The <div> containing the list of error messages
 * @global GlobalEmailField: The form's email field
 * @global GlobalPasswordField: The form's password field
 * @global GlobalEmailError: The error message for the email field
 *************************************************************************/
 function resetLoginForm() {
    document.title = "Log in to SpeedScore";
    GlobalErrorBox.classList.add("hidden");
    GlobalEmailError.classList.add("hidden");
    GlobalPasswordError.classList.add("hidden");
    GlobalEmailField.value = "";
    GlobalPasswordField.value = "";
}

/*************************************************************************
 * @function login
 * @desc 
 * When a user is successfully authenticated, this function resets the 
 * login form and configure the app's initial state and appearance. 
 * The login page is hidden and the default app mode ("Feed") is displayed. 
 * @global GlobalLoginPage: The login page <div>
 * @global GlobalModeTabsContainer: The <div> containing the mode tabs
 * @global GlobalModeTabPanels: Array of tab panels associated with each mode
 * @global GlobalCurrentMode: Integer index indicating current mode 
 * @global GlobalSearchBtn: The search button in the top banner bar
 * @global GlobalProfileBtn: The profile picture button in the top banner bar
 *************************************************************************/
 function login(userId) {
    //1. Reset the login form in case user logs in again
    resetLoginForm();
    //2. Place user acct data of logged in user in global JS object
    GlobalUserData = JSON.parse(localStorage.getItem(userId));
    //3. Populate the "Rounds" table
    populateRoundsTable();
    //2. Reset state of app with user logged in.
    GlobalLoginPage.classList.add("hidden");
    GlobalModeTabsContainer.classList.remove("hidden");
    GlobalModeTabPanels[GlobalCurrentMode.get()].classList.remove("hidden");
    GlobalMenuBtn.classList.remove("hidden");
    GlobalMenu.classList.remove("hidden");
    GlobalSearchBtn.classList.remove("hidden");
    GlobalProfileBtn.classList.remove("hidden");
    GlobalProfileBtn.style.backgroundImage = "url(" + GlobalUserData.identityInfo.profilePic + ")";
    document.title = "SpeedScore: Activity Feed";
    GlobalSkipLink.focus(); //Force initial focus on skip link
}

/*************************************************************************
 * @function Login Form SUBMIT Handler 
 * @Desc 
 * When the user clicks on the "Log In" button, we first check the
 * validity of the email and password fields, presenting accessible
 * error notifications if errors exist. If no errors exist, we
 * call the login() function, passing in the username of the user
 * @global GlobalLoginForm: the <form> element whose 
 *         SUBMIT handler is triggered
 * @global GlobalEmailField: The form's email field
 * @global GlobalPasswordField: The form's password field
 * @global GlobalErrorBox: The <div> containing the error messages
 * @global GlobalEmailError: The error message for the email field
 * @global GlobalPasswordError: The error message for the password field
 *************************************************************************/
 loginForm.addEventListener("submit",function(e) {
    e.preventDefault(); //Prevent default submti behavior
    //Is the email field valid?
    let emailValid = !GlobalEmailField.validity.typeMismatch && 
                     !GlobalEmailField.validity.valueMissing;
    //Is the password field valid?
    let passwordValid = !GlobalPasswordField.validity.patternMismatch && 
                        !GlobalPasswordField.validity.valueMissing;
    //Did the user specify valid account credentials?
    let authenticated = emailValid && passwordValid && 
                        validAccount(GlobalEmailField.value, GlobalPasswordField.value);
    if (authenticated) { //Log user in
       login(GlobalEmailField.value);
       return;
    }
    //If here, at least one field is invalid
    GlobalErrorBox.classList.remove("hidden");
    document.title = "Error: Log in to SpeedScore";
    if (!passwordValid) { //Password field is invalid
         GlobalPasswordError.classList.remove("hidden");
         GlobalPasswordError.focus();
     } else {
         GlobalPasswordError.classList.add("hidden");
     } 
    if (!emailValid) { //Email field is invalid
        GlobalEmailError.classList.remove("hidden");
        GlobalEmailError.focus();
    } else {
        GlobalEmailError.classList.add("hidden");
    }
    if (emailValid && passwordValid) { //Authentication failed
       GlobalAuthError.classList.remove("hidden");
       GlobalAuthError.focus();
     } else {
         GlobalAuthError.classList.add("hidden");
     }
 });