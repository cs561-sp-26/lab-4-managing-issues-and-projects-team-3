/*************************************************************************
 * File: main.js
 * Definitions of variables to maintain app state and provide
 * convenient access to frequently used DOM elements.
 *************************************************************************/
let GlobalHistoryLogging = true;
let GlobalDialogClose = null;

/************************************/
/* MENU VARIABLES                   */
/************************************/
const GlobalMenuBtn =  document.getElementById("menuBtn"); 
const GlobalMenu = document.getElementById("sideMenu");
const GlobalMenuItems = document.querySelectorAll("li[role='menuitem']");

//Note: Per Josh Wulf's blog post, we implement all immutable global variables using
//immediately invoked function expressions
const GlobalFocusedMenuItem = (() => {
    let _focusedMenuItem = 0
    const Store = {
        get: () => _focusedMenuItem,
        set: val => (_focusedMenuItem = val)
    }
    return Object.freeze(Store)
})()

/************************************/
/* MODE TAB VARIABLES               */
/************************************/
//Array of mode names
const GlobalModeNumbersToModes = new Map([
  [0, "ACTIVITY_FEED"],
  [1, "ROUNDS"],
  [2, "COURSES"],
  [3, "BUDDIES"]
]);
const GlobalModeNumbersToRoutes = new Map([
  [0, "/activityfeed"],
  [1, "/rounds"],
  [2, "/courses"],
  [3, "/buddies"]
]);
const GlobalModeDialogNumbersToRoutes = new Map([
  [0, "/activityfeed/newpost"],
  [1, "/rounds/newround"],
  [2, "/courses/addcourse"],
  [3, "/buddies/findbuddy"]
]);
//The current mode (0, 1, 2, or 3)
const GlobalCurrentMode = (() => {
    let _currentMode= 0
    const Store = {
        get: () => _currentMode,
        set: val => (_currentMode = val)
    }
    return Object.freeze(Store)
})()

const GlobalFocusedMode = (() => {
    let _focusedMode= 0
    const Store = {
        get: () => _focusedMode,
        set: val => (_focusedMode = val)
    }
    return Object.freeze(Store)
})()

//Array of mode tab button elements:
const GlobalModeTabButtons = 
  document.querySelectorAll("button[role='tab']");
//Array of mode tab panel elements:
const GlobalModeTabPanels = 
  document.querySelectorAll("div[role='tabpanel']");

/*****************************************************/
/* FLOATING ACTION BUTTON AND MODAL DIALOG VARIABLES */
/*****************************************************/
//Array of mode action buttons
const GlobalModeActionButtons = 
  document.querySelectorAll("button.float-btn");
//array of mode action dialog boxes
const GlobalModeActionDialogs =
  document.querySelectorAll("div.action-dialog");
//array of "OK" buttons within the dialog boxes
const GlobalDialogActionButtons =
  document.querySelectorAll("button.action-button");
//array of "Cancel" buttons within the dialog boxes
const GlobalDialogCancelButtons =
  document.querySelectorAll("button.cancel-button");

/*****************************************************/
/* LOGIN PAGE AND FORM                               */
/*****************************************************/
const GlobalLoginPage = document.getElementById("loginPage");
const GlobalLoginForm = document.getElementById("loginForm");
const GlobalErrorBox = document.getElementById("errorBox");
const GlobalEmailField = document.getElementById("email");
const GlobalPasswordField = document.getElementById("password");
const GlobalEmailError = document.getElementById("emailError");
const GlobalPasswordError = document.getElementById("passwordError");
const GlobalAuthError = document.getElementById("authError");
const GlobalCreateAccountBtn = document.getElementById("createAccountBtn");
const GlobalLoginBtnIcon = document.getElementById("loginBtnIcon");
const GlobalLoginBtn = document.getElementById("loginBtn");
const GlobalResetPasswordBtn = document.getElementById("resetPasswordBtn");
const GlobalAccountCreated = document.getElementById("accountCreated");
const GlobalAccountCreatedClose = document.getElementById("accountCreatedClose");
const GlobalAccountCreatedEmail = document.getElementById("accountCreatedEmail")

/*****************************************************/
/* CREATE ACCOUNT DIALOG FORM                        */
/*****************************************************/
const GlobalCreateAccountDialog = document.getElementById("createAccountDialog");
const GlobalSubmitCreateAccountBtn = document.getElementById("submitCreateAccountBtn");
const GlobalCancelCreateAccountBtn = document.getElementById("cancelCreateAccountBtn");
const GlobalAcctErrBox = document.getElementById("acctErrorBox");
const GlobalAcctEmailField = document.getElementById("acctEmail");
const GlobalAcctPasswordField = document.getElementById("acctPassword");
const GlobalAcctPasswordRepeatField = document.getElementById("acctPasswordRepeat");
const GlobalAcctDisplayNameField = document.getElementById("acctDisplayName");
const GlobalAcctProfilePicField = document.getElementById("acctProfilePic");
const GlobalAcctProfilePicImage = document.getElementById("acctProfilePicImage");
const GlobalAcctSecurityQuestionField = document.getElementById("acctSecurityQuestion");
const GlobalAcctSecurityAnswerField = document.getElementById("acctSecurityAnswer");
const GlobalAcctEmailErr = document.getElementById("acctEmailError");
const GlobalAcctPasswordErr = document.getElementById("acctPasswordError");
const GlobalAcctPasswordRepeatErr = document.getElementById("acctPasswordRepeatError");
const GlobalAcctDisplayNameErr = document.getElementById("acctDisplayNameError");
const GlobalAcctSecurityQuestionErr = document.getElementById("acctSecurityQuestionError");
const GlobalAcctSecurityAnswerErr = document.getElementById("acctSecurityAnswerError");
const GlobalFirstFocusableCreateAccountItem = (() => {
  let _firstFocusedCreateAccountItem = GlobalAcctEmailField
  const Store = {
      get: () => _firstFocusedCreateAccountItem,
      set: val => (_firstFocusedCreateAccountItem = val)
  }
  return Object.freeze(Store)
})()
const GlobalDefaultProfilePic = "images/DefaultProfilePic.jpg";

/*****************************************************/
/* ACCOUNT & SETTINGS DIALOG FORM                    */
/*****************************************************/
const GlobalProfileSettingsDialog = document.getElementById("profileSettingsDialog");
const GlobalEditProfileForm = document.getElementById("editProfileForm");
const GlobalProfileErrBox = document.getElementById("profileErrorBox");
const GlobalProfileEmailErr = document.getElementById("profileEmailError");
const GlobalProfileDisplayNameErr = document.getElementById("profileDisplayNameError");
const GlobalProfileSecurityQuestionErr = document.getElementById("profileSecurityQuestionError");
const GlobalProfileSecurityAnswerErr = document.getElementById("profileSecurityAnswerError");
const GlobalCancelUpdateProfileBtn = document.getElementById("cancelUpdateProfileBtn");
const GlobalAccountSettingsBtn = document.getElementById("accountSettingsBtn");
const GlobalAccountSettingsPanel = document.getElementById("accountSettingsPanel");
const GlobalProfileEmailField = document.getElementById("profileEmail");
const GlobalProfilePasswordField = document.getElementById("profilePassword");
const GlobalProfileSecurityQuestionField = document.getElementById("profileSecurityQuestion");
const GlobalProfileSecurityAnswerField = document.getElementById("profileSecurityAnswer");
const GlobalProfileSettingsBtn = document.getElementById("profileSettingsBtn");
const GlobalProfileSettingsPanel = document.getElementById("profileSettingsPanel");
const GlobalProfileDisplayNameField = document.getElementById("profileDisplayName");
const GlobalProfilePicField = document.getElementById("profilePic");
const GlobalProfilePicImage = document.getElementById("profilePicImage");
const GlobalsgSettingsBtn = document.getElementById("sgSettingsBtn");
const GlobalsgSettingsPanel = document.getElementById("sgSettingsPanel");
const GlobalProfileBioField = document.getElementById("sgBio");
const GlobalProfileFirstRoundField = document.getElementById("sgFirstRound");
const GlobalProfileHomeCourseField = document.getElementById("sgHomeCourse");
const GlobalProfileBestStrokesField = document.getElementById("sgBestStrokes");
const GlobalProfileBestMinutesField = document.getElementById("sgBestMinutes");
const GlobalProfileBestSecondsField = document.getElementById("sgBestSeconds");
const GlobalProfileBestCourseField = document.getElementById("sgBestCourse");
const GlobalAllClubs = ["Driver","3W","4W","5W","Hybrid","1I","2I","3I","4I","5I","6I","7I","8I","9I","PW","GW","SW","LW","Putter"];
const GlobalProfileClubsInBagChecks = document.getElementById("clubsDiv").querySelectorAll("input");
const GlobalProfileClubCommentsField = document.getElementById("sgClubComments");
const GlobalFirstFocusableUpdateProfileItem = (() => {
  let _firstFocusedUpdateProfileItem = GlobalAcctEmailField
  const Store = {
      get: () => _firstFocusedUpdateProfileItem,
      set: val => (_firstFocusedUpdateProfileItem = val)
  }
  return Object.freeze(Store)
})()

/*****************************************************/
/* OTHER UI COMPONENT VARIABLES */
/*****************************************************/
const GlobalSearchBtn = document.getElementById("searchBtn");
const GlobalProfileBtn = document.getElementById("profileBtn");
const GlobalSkipLink = document.getElementById("sLink");
const GlobalModeTabsContainer = document.getElementById("modeTabs");

/*************************************************************************
 * @function transitionToDialog
 * @desc 
 * This function prepares the UI prior to opening a dialog box. It hides
 * the skip link, banner bar buttons, mode tabs, and current tab panel,
 * so that they are unavailable while the user interacts with the dialog.
 * It then displays the dialog box and dialog box title.
 * Note: This function is placed in main.js because it is useful to 
 * multiple UI components.
 * @param dialogTitle: The title of the dialog to which to set 
 * document.title
 * @param dialog: A reference to the HTML element containing the dialog;
 * it will be shown by removing the "hidden" class 
 * @param dialogPrepFunc: A reference to a function to call to prepare 
 * the dialog's appearance.
 * @global GlobalSkipLink: The skip link
 * @global GlobalMenuBtn: The menu button
 * @global GlobalModeTabsContainer: The mode tabs
 * @global GlobalModeTabPanels: array of tab panels 
 * @global GlobalCurrentMode, index of current mode.
 *************************************************************************/
function transitionToDialog(dialog, dialogTitle, dialogPrepFunc) {
  GlobalSkipLink.classList.add("hidden"); 
  GlobalMenuBtn.classList.add("hidden");
  GlobalSearchBtn.classList.add("hidden");
  GlobalProfileBtn.classList.add("hidden");
  GlobalModeTabsContainer.classList.add("hidden");
  GlobalModeTabPanels[GlobalCurrentMode.get()].classList.add("hidden");
  document.title = dialogTitle;
  dialogPrepFunc();
  dialog.classList.remove("hidden");
}

/*************************************************************************
 * @function transitionFromDialog
 * @param dialogToClose -- a reference to the HML dialog element to close
 * @desc 
 * This function restores the UI after closing a dialog box. It shows
 * the skip link, banner bar buttons, mode tabs, and current tab panel,
 * Note: This function is placed in main.js because it is useful to 
 * multiple UI components.
 * @global GlobalSkipLink: The skip link
 * @global GlobalMenuBtn: The menu button
 * @global GlobalModeTabsContainer: The mode tabs
 * @global GlobalModeTabPanels: array of tab panels 
 * @global GlobalCurrentMode, index of current mode.
 *************************************************************************/
function transitionFromDialog(dialogToClose) {
  GlobalSkipLink.classList.remove("hidden"); 
  GlobalMenuBtn.classList.remove("hidden");
  GlobalSearchBtn.classList.remove("hidden");
  GlobalProfileBtn.classList.remove("hidden");
  GlobalModeTabsContainer.classList.remove("hidden");
  GlobalModeTabPanels[GlobalCurrentMode.get()].classList.remove("hidden");
  document.title = "SpeedScore: " + GlobalModeNames[GlobalCurrentMode.get()];
  dialogToClose.classList.add("hidden");
}