/*************************************************************************
 * File: main.js
 * Definitions of variables to maintain app state and provide
 * convenient access to frequently used DOM elements.
 *************************************************************************/

/************************************/
/* USER DATA                        */
/************************************/
//Global variable containing data object of user currently logged in
let GlobalUserData = {}; //set upon login

/************************************/
/* MENU VARIABLES                   */
/************************************/
const GlobalMenuBtn =  document.getElementById("menuBtn"); 
const GlobalMenu = document.getElementById("sideMenu");
const GlobalMenuIcon = document.getElementById("menuBtnIcon");
const GlobalMenuItems = document.querySelectorAll("li[role='menuitem']");


//Note: Per Josh Wulf's blog post, we implement all mutable global variables using
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
//Array mapping current mode to its name, so that
//we can set document.title appropriately
GlobalModeNames=["Activity Feed", "Rounds","Courses","Buddies"];

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

/*******************************************************/
/* SEARCH BUTTON, PROFILE BUTTON, SKIP LINK, MODE TABS */
/*******************************************************/
const GlobalSearchBtn = document.getElementById("searchBtn");
const GlobalSearchBox = document.getElementById("searchBox");
const GlobalProfileBtn = document.getElementById("profileBtn");
const GlobalProfileBtnImg = document.getElementById("profileBtnImg")
const GlobalSkipLink = document.getElementById("sLink");
const GlobalModeTabsContainer = document.getElementById("modeTabs");

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
const GlobalAccountSettingsBtn = document.getElementById("accountSettingsBtn");
const GlobalAccountSettingsPanel = document.getElementById("accountSettingsPanel");
const GlobalProfileSettingsBtn = document.getElementById("profileSettingsBtn");
const GlobalProfileSettingsPanel = document.getElementById("profileSettingsPanel");
const GlobalsgSettingsBtn = document.getElementById("sgSettingsBtn");
const GlobalsgSettingsPanel = document.getElementById("sgSettingsPanel");
const GlobalEditProfileForm = document.getElementById("editProfileForm");
const GlobalProfileErrBox = document.getElementById("profileErrorBox");
const GlobalProfileEmailErr = document.getElementById("profileEmailError");
const GlobalProfileDisplayNameErr = document.getElementById("profileDisplayNameError");
const GlobalProfileSecurityQuestionErr = document.getElementById("profileSecurityQuestionError");
const GlobalProfileSecurityAnswerErr = document.getElementById("profileSecurityAnswerError");
const GlobalProfileEmailField = document.getElementById("profileEmail");
const GlobalProfilePasswordField = document.getElementById("profilePassword");
const GlobalProfileSecurityQuestionField = document.getElementById("profileSecurityQuestion");
const GlobalProfileSecurityAnswerField = document.getElementById("profileSecurityAnswer");
const GlobalProfileDisplayNameField = document.getElementById("profileDisplayName");
const GlobalProfilePicField = document.getElementById("profilePic");
const GlobalProfilePicImage = document.getElementById("profilePicImage");
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
const GlobalCancelUpdateProfileBtn = document.getElementById("cancelUpdateProfileBtn");
const GlobalFirstFocusableUpdateProfileItem = (() => {
  let _firstFocusedUpdateProfileItem = GlobalAcctEmailField
  const Store = {
      get: () => _firstFocusedUpdateProfileItem,
      set: val => (_firstFocusedUpdateProfileItem = val)
  }
  return Object.freeze(Store)
})()

/*****************************************************/
/* LOG ROUND DIALOG FORM                             */
/*****************************************************/
const GlobalRoundsModeDialog = document.getElementById("roundsModeDialog");
const GlobalRoundFormHeader = document.getElementById("roundFormHeader");
const GlobalRoundFormSubmitBtn = document.getElementById("roundFormSubmitBtn");
const GlobalRoundFormSubmitBtnLabel = document.getElementById("roundFormSubmitBtnLabel");
const GlobalRoundFormSubmitBtnIcon = document.getElementById("roundFormSubmitBtnIcon");
const GlobalLogRoundForm = document.getElementById("logRoundForm");
const GlobalRoundErrBox = document.getElementById("roundErrorBox");
const GlobalRoundDateErr = document.getElementById("roundDateError");
const GlobalRoundCourseErr = document.getElementById("roundCourseError");
const GlobalRoundStrokesErr = document.getElementById("roundStrokesError");
const GlobalRoundMinutesErr = document.getElementById("roundMinutesError");
const GlobalRoundSecondsErr = document.getElementById("roundSecondsError");
const GlobalRoundNotesErr = document.getElementById("roundNotesError");
const GlobalRoundDate = document.getElementById("roundDate");
const GlobalRoundCourse = document.getElementById("roundCourse");
const GlobalRoundType = document.getElementById("roundType");
const GlobalRoundHoles = document.getElementById("roundHoles");
const GlobalRoundStrokes = document.getElementById("roundStrokes");
const GlobalRoundMinutes = document.getElementById("roundMinutes");
const GlobalRoundSeconds = document.getElementById("roundSeconds");
const GlobalRoundSGS = document.getElementById("roundSGS");
const GlobalRoundNotes = document.getElementById("roundNotes");
const GlobalFirstFocusableLogRoundItem = (() => {
  let _firstFocusedLogRoundItem = GlobalRoundDate
  const Store = {
      get: () => _firstFocusedLogRoundItem,
      set: val => (_firstFocusedLogRoundItem = val)
  }
  return Object.freeze(Store)
})()

GlobalRoundDate.valueAsNumber = 
Date.now()-(new Date()).getTimezoneOffset()*60000;

/*****************************************************/
/* LOG ROUND DIALOG FORM TOAST                       */
/*****************************************************/
const GlobalRoundUpdatedClose = document.getElementById("roundUpdatedClose");
const GlobalRoundUpdated = document.getElementById("roundUpdated");
const GlobalRoundUpdatedMsg = document.getElementById("roundUpdatedMsg");

/*****************************************************/
/* ROUNDS MODE TABLE                                 */
/*****************************************************/
const GlobalRoundsTable = document.getElementById("roundsTable");
const GlobalRoundsTableCaption = document.getElementById("roundsTableCaption");
const GlobalRoundsTableSortableColHeaders = document.getElementsByClassName('sortable-header');
const GlobalRoundsTableSortBtns = document.getElementsByClassName('table-sort-btn');
const GlobalRoundsTableHeaderColLabels = ['date','course','score'];
const GlobalRoundsTableSortIcons = document.getElementsByClassName('sort-icon');

const GlobalDialogPrepFuncs = [()=>{}, ()=>prepLogRoundForm(), ()=>{}, ()=>{}];
const GlobalDialogTitles = ["SpeedScore: Post to Feed","SpeedScore: Log Round",
  "SpeedScore: Add Course","SpeedScore: Find Buddies"];

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