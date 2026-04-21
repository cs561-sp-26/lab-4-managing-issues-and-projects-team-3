/********************************************************
 * @function restoreState
 * @descr
 * Restores application state based on the state object 
 * passed in.
 * @param state: The state object to restore
 * @global GlobalHistoryLogging: A boolean flag to control
 * whether to log history state changes
 * @global GlobalDialogClose: The dialog close button to
 * click to close an open dialog box, if one exists
 * @global GlobalModeActionButtons: Array of mode action
 * buttons
 * @global GlobalDialogCancelButtons: Array of dialog box
 * cancel buttons
 * @global GlobalModeTabButtons: Array of mode tab buttons
 * @global GlobalModeTabPanels: Array of mode tab panels
 * @global GlobalModeNamesMap: Maps mode names to integer
 ********************************************************/
function restoreState(state) {
  console.log('Console: In restoreState: state:', JSON.stringify(state), 
              " & GlobalDialogClose = ", GlobalDialogClose);
  GlobalHistoryLogging = false;
  if (GlobalDialogClose) {
    GlobalDialogClose.click();
    GlobalDialogClose = null;
  }
  switch (state.page) {
    case "MODE_DIALOG":
      GlobalModeActionButtons[state.mode].click();
      GlobalDialogClose = GlobalDialogCancelButtons[state.mode];
    break;
    case "ACTIVITY_FEED":
    case "ROUNDS":
    case "COURSES":
    case "BUDDIES":;
      GlobalModeTabButtons[state.mode].click();
      GlobalModeTabButtons[state.mode].focus();
      break;
    default:
      console.log('restoreState not implemented for this page value:', state.page);
      break;  
  }
  GlobalHistoryLogging = true;
}

window.addEventListener('load', (event) => {
  GlobalModeTabButtons[0].click();
});


window.addEventListener('popstate', (event) => {
  console.log('Console: In popstate: state:', JSON.stringify(event.state));
  if (!event.state) {
    console.log('Console: In popstate: No state associated with this history entry.');
    return;
  }
  restoreState(event.state);
});