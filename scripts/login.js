/*************************************************************************
 * File: login.js
 * This file contains functions that support the log in page.
*************************************************************************/
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
    //resetLoginForm();
    //2. Place user acct data of logged in user in global JS object
    //GlobalUserData = JSON.parse(localStorage.getItem(userId));
    //3. Populate the "Rounds" table
    //populateRoundsTable();
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

 loginForm.addEventListener("submit",function(e) {
    e.preventDefault(); //Prevent default submti behavior
    if (true) { //Log user in
       login(GlobalEmailField.value);
       return;
    }
 });