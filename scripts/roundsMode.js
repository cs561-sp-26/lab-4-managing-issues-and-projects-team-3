/*************************************************************************
 * File: roundsMode.js
 * This file contains functions that support the "Rounds" mode, 
 * including the "Log Round" modal.
*************************************************************************/

/*************************************************************************
* @function prepEditRoundForm 
* @desc 
* Prepares the round form to edit an existing round by setting the app's
* title, and the form button's label and icon.
* and button label to "Log Round," and by setting the button's icon
* @global GlobalRoundFormHeader: Form's H1 element
* @global GlobalRoundFormSubmitBtnLabel: Form's button label
* @global GlobalRoundFormSubmitBtnIcon: Form's button icon
*************************************************************************/
function prepEditRoundForm() {
  GlobalRoundFormHeader.textContent = "Edit Round";
  GlobalRoundFormSubmitBtnLabel.innerHTML = "&nbsp;Update Round";
  if (GlobalRoundFormSubmitBtnIcon.classList.contains("fa-save")) {
    GlobalRoundFormSubmitBtnIcon.classList.remove("fa-save");
  }
  if (!GlobalRoundFormSubmitBtnIcon.classList.contains("fa-edit")) {
    GlobalRoundFormSubmitBtnIcon.classList.add("fa-edit");
  }
}

/*************************************************************************
* @function fillRoundForm 
* @desc 
* Prepares the round form for editing by filling it with the data on the
* round to be edited. 
* @param round: An object containing the round data
* @global GlobalRoundDate: Form's date field
* @global GlobalRoundCourse: Form's course field
* @global GlobalRoundType: Form's type field
* @global GlobalRoundStrokes: Form's strokes field
* @global GlobalRoundMinutes: Form's minutes field
* @global GlobalRoundSeconds: Form's seconds field
* @global GlobalRoundSGS: Form's Speedgolf Score field
* @global GlobalRoundNotes: Form's notes field
*************************************************************************/
function fillRoundForm(round) {
GlobalRoundDate.value = round.date;
GlobalRoundCourse.value = round.course;
GlobalRoundType.value = round.type;
GlobalRoundHoles.value = round.holes;
GlobalRoundStrokes.value = round.strokes;
GlobalRoundMinutes.value = round.minutes;
GlobalRoundSeconds.value = round.seconds;
GlobalRoundSGS.value = round.SGS;
GlobalRoundNotes.value = round.notes;
}

/*************************************************************************
* @function updateRoundInTable 
* @desc 
* Updates an existing round in the "Rounds" table with edits made by user.
* After locating the row, calls writeRoundToTable to write data.
* @param rowIndex: index in userData.rounds of round to update
* @global userData: the current user's data object
*************************************************************************/
function updateRoundInTable(rowIndex) {
const thisRound = document.getElementById("r-" + GlobalUserData.rounds[rowIndex].roundNum);
writeRoundToTable(thisRound,rowIndex);
}

/*************************************************************************
* @function editRound 
* @desc 
* Set to click handler of "View/Edit" button associated with each row of
* "Rounds" table. Sets up the round mode form to enable users to view and
* edit the data on the round on which they clicked, then transitions to
* the round mode form modal dialog. The index of the round being edited
* is saved to the global variable roundIndex so that data on this round
* can be saved when the form is submitted. 
* @param roundId the unique id of the round that was clicked by the user
* @global globalRoundIndex: the index (in GlobalUserData.rounds of the 
*         round to edit. Initialized in this function.
* @global GlobalUserData: object containing the current user's data
*************************************************************************/
function editRound(roundId) {
//Find current array index of this round

for (GlobalRoundIndex = 0; GlobalRoundIndex < GlobalUserData.rounds.length; ++GlobalRoundIndex) {
  if (GlobalUserData.rounds[GlobalRoundIndex].roundNum === roundId) {
    break;
  }
}
//Populate form with round data to be edited.
fillRoundForm(GlobalUserData.rounds[GlobalRoundIndex]);
//Display dialog
transitionToDialog(GlobalRoundsModeDialog,"SpeedScore: Edit Round",prepEditRoundForm);
}

/*************************************************************************
* @function updateRound 
* @desc 
* Update JavaScript object associated with an existing round, save the
* round to localStorage, update the "Rounds"table, return the user to 
* "Rounds" mode page, and display a toast message indicating that a 
* new round was logged.
* @global GlobalRoundIndex: The index of the round to be edited;
*         previously initialized in editRound()
* @global GlobalRoundDate: The date field in "Log Round" form
* @global GlobalRoundCourse: The course field in "Log Round" form
* @global GlobalRoundType: The type field in "Log Round" form
* @global GlobalRoundHoles: The holes field in "Log Round" form
* @global GlobalRoundStrokes: The strokes field in "Log Round" form
* @global GlobalRoundMinutes: The minutes field in "Log Round" form
* @global GlobalRoundSeconds: The seconds field in "Log Round" form
* @global GlobalRoundMinutes: The minutes field in "Log Round" form
* @global GlobalRoundSGS: The SGS field in "Log Round" form
* @global GlobalRoundNotes: The round updated toast notification
* @global GlobalRoundUpdatedMsg: Reference to notification toast
* @global GlobalRoundUpdatedMsg: The message field of the round updated toast
*************************************************************************/
function updateRound() {
//Update existing round, which is located at userData.rounds[GlobalRoundIndex]
GlobalUserData.rounds[GlobalRoundIndex].date = GlobalRoundDate.value;
GlobalUserData.rounds[GlobalRoundIndex].course = GlobalRoundCourse.value;
GlobalUserData.rounds[GlobalRoundIndex].type = GlobalRoundType.value;
GlobalUserData.rounds[GlobalRoundIndex].holes = GlobalRoundHoles.value;
GlobalUserData.rounds[GlobalRoundIndex].strokes = GlobalRoundStrokes.value;
GlobalUserData.rounds[GlobalRoundIndex].minutes = GlobalRoundMinutes.value;
GlobalUserData.rounds[GlobalRoundIndex].seconds = GlobalRoundSeconds.value;
GlobalUserData.rounds[GlobalRoundIndex].SGS = GlobalRoundSGS.value;
GlobalUserData.rounds[GlobalRoundIndex].notes = GlobalRoundNotes.value;
//Write to local storage
localStorage.setItem(GlobalUserData.accountInfo.email,
  JSON.stringify(GlobalUserData));
//Reset form to prepare for next visit
resetLogRoundForm();
//Add new round to table
updateRoundInTable(GlobalRoundIndex);
//Transition back to mode page
roundUpdatedMsg.textContent = "Round Updated!";
roundUpdated.classList.remove("hidden");
transitionFromDialog(GlobalRoundsModeDialog);
}