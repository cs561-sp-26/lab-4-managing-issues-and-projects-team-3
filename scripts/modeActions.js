/*************************************************************************
 * File: modeActions.js
 * Desc: Contains the JavaScript functions to respond to interactions 
 * with the UI elements in each mode.
*************************************************************************/

/*************************************************************************
 * @function Mode Floating Action Button CLICK handler 
 * @Desc 
 * When the user clicks on the action button in the current mode, we 
 * present the corresponding action dialog box; disable the 
 * navigation bar buttons; and hide the mode tabs. We use currentMode
 * to determine which action dialog box to display.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
 for (let i = 0; i < GlobalModeActionButtons.length; ++i) {
    GlobalModeActionButtons[i].addEventListener("click",
        () => transitionToDialog(GlobalModeActionDialogs[i],GlobalDialogTitles[i],GlobalDialogPrepFuncs[i]));
  };
    // //Hide tab panel
    // GlobalModeTabPanels[GlobalCurrentMode.get()].classList.add("hidden");
    // //Hide and disable all UI elements
    // GlobalMenuBtn.classList.add("disabled");
    // GlobalSearchBtn.classList.add("disabled");
    // GlobalProfileBtn.classList.add("disabled");
    // GlobalSkipLink.classList.add("hidden"); 
    // GlobalModeTabsContainer.classList.add("disabled");
    // //Show dialog box
    // GlobalModeActionDialogs[GlobalCurrentMode.get()].classList.remove("hidden");
    // //Set focus to dialog box's action button
    // GlobalDialogActionButtons[GlobalCurrentMode.get()].focus();
    //});

/*************************************************************************
 * @function Dialog Box Action Button CLICK handler 
 * @Desc 
 * When the user clicks on the primary action button in a dialog box, we
 * perform the corresponding action, close the dialog box; restore 
 * the navigation bar buttons; show the mode tabs; restore the 
 * current mode's main page; and set the focus to the current mode's 
 * action button. We use currentMode to determine which mode we're in.
 * @global currentMode: index of current mode
 * @global modeTabsContainer: the <div> containing the mode tab buttons
 * @global modeTabPanels: array of tab panels for each mode
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
 //Feed mode
 GlobalDialogActionButtons[0].addEventListener("click",
        () => transitionFromDialog(GlobalModeActionDialogs[0]));
//Courses mode
GlobalDialogActionButtons[2].addEventListener("click",
        () => transitionFromDialog(GlobalModeActionDialogs[2]));
//Buddies mode
GlobalDialogActionButtons[3].addEventListener("click",
        () => transitionFromDialog(GlobalModeActionDialogs[3]));

/*************************************************************************
 * @function Dialog Box Cancel Button CLICK handler 
 * @Desc 
 * When the user clicks on the cancel button in a dialog box, we
 * close the dialog box; restore the navigation bar buttons; 
 *  show the mode tabs; restore the current mode's main page; and set the 
 * focus to the current mode's action button. We use currentMode to 
 * determine which mode we're in.
 * @global GlobalCurrentMode: index of current mode
 * @global GlobalModeTabsContainer: the <div> containing the mode tab buttons
 * @global GlobalModeTabPanels: array of tab panels for each mode
 * @global GlobalModeActionDialogs: array of dialog boxes for each mode
 * @global GlobalDialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 *************************************************************************/
//FEED mode
GlobalDialogCancelButtons[0].addEventListener("click",
 () => transitionFromDialog(GlobalModeActionDialogs[0]));
//ROUNDS mode
GlobalDialogCancelButtons[1].addEventListener("click",function() {
   resetLogRoundForm(); //Log round form needs to be reset
   transitionFromDialog(GlobalModeActionDialogs[1]);
});
//COURSES mode
GlobalDialogCancelButtons[2].addEventListener("click",
 () => transitionFromDialog(GlobalModeActionDialogs[2]));
//BUDDIES mode
GlobalDialogCancelButtons[3].addEventListener("click",
 () => transitionFromDialog(GlobalModeActionDialogs[3]));

/*************************************************************************
 * @function keyDownDialogFocused
 * @Desc 
 * When the user issues a keypress when a dialog box is open,
 * we need to see if it is a tab or escape. If tab, we ensure that the
 * user stays within the dialog. If escape, we cancel out of dialog.
 * @param e, the keyboard event. e.code gives code of key pressed.                  
 * @global modeActionDialogs: array of dialog boxes for each mode
 * @global dialogActionButtons: array of default ("OK") buttons for
 * each mode's dialog box
 * @global dialogCancelButtons: array of cancel buttons for
 * each mode's dialog box
 *************************************************************************/
 function keyDownDialogFocused(e) {
    if (document.activeElement.classList
        .contains("action-button") && 
        e.code === "Tab" && e.shiftKey) {
        //User is shift-tabbing from first focusable item in dialog. 
        //Prevent tab to URL bar by explicitly setting focus to 
        //last focusable item in dialog. 
        GlobalModeActionDialogs[GlobalCurrentMode.get()].focus();
        e.preventDefault()
    } else if (document.activeElement.classList
        .contains("cancel-button") && e.code === "Tab" &&
        !e.shiftKey) {
        //User is tabbing from last focusable item in a dialog. 
        //Prevent tab to URL bar by explicitly setting focus 
        //to first focusable item in dialog.
        GlobalModeActionDialogs[GlobalCurrentMode.get()].focus();     
        e.preventDefault();
    } else if (document.activeElement.hasAttribute("role") && 
               e.code === "Tab" && e.shiftKey) {
        GlobalDialogCancelButtons[GlobalCurrentMode.get()].focus();
        e.preventDefault();
    } else if (e.code === "Escape") { //Close and cancel
        GlobalDialogCancelButtons[GlobalCurrentMode.get()].click();
    }
}