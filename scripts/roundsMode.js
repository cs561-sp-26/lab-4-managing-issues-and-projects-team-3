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

/*************************************************************************
* @function GlobalRoundsTableSortBtns CLICK Handler 
* @desc 
* When one of the sort buttons in a sortable Rounds Table header column
* is clicked, sort by that column using sortRoundsTable function
* @global GlobalRoundsTableSortBtns: Array of buttons in col header that
*         can be clicked 
*************************************************************************/
for (let i = 0; i < GlobalRoundsTableSortBtns.length; ++i) {
GlobalRoundsTableSortBtns[i].addEventListener("click",() => sortRoundsTable(i+1) );
}

/*************************************************************************
* @function writeRoundToTable
* @desc 
* Given an HTML row elemnt and the index of the round to write, write
* the round to the row element by replacing its innerHTML.
* @param row -- a reference to an HTML table row
* @param rIndex -- an integer index into userData.rounds indicating the
*        round to write to the table.
* @global GlobalUserData: The data for the current user
*************************************************************************/
function writeRoundToTable(row, rIndex) {
row.innerHTML = "<td>" + GlobalUserData.rounds[rIndex].date + "</td><td>" +
GlobalUserData.rounds[rIndex].course + "</td><td>" + 
GlobalUserData.rounds[rIndex].SGS + " (" + GlobalUserData.rounds[rIndex].strokes +
" in " + GlobalUserData.rounds[rIndex].minutes + ":" + 
GlobalUserData.rounds[rIndex].seconds + 
")</td>" +
"<td><button aria-label='View and Edit Round'" + 
"onclick='editRound(" + GlobalUserData.rounds[rIndex].roundNum + ")'><span class='fas fa-eye'>" +
"</span>&nbsp;<span class='fas fa-edit'></span></button></td>" +
"<td><button aria-label='Delete Round'" + 
"onclick='confirmDelete(" + GlobalUserData.rounds[rIndex].roundNum + ")'>" +
"<span class='fas fa-trash'></span></button></td>";
}

/*************************************************************************
* @function addRoundToTable 
* @desc 
* Adds a new round to the "Rounds" table, updating the caption
* @param roundIndex: index in userData.rounds of round to add
* @global GlobalUserData: the current user's data object
* @global GlobalRoundsTableCaption: The table's caption
*************************************************************************/
function addRoundToTable(roundIndex) {
const roundId = GlobalUserData.rounds[roundIndex].roundNum;
if (GlobalRoundsTable.rows[1].innerHTML.includes ("colspan")) {
  //empty table! Remove this row before adding new one
  GlobalRoundsTable.deleteRow(1);
}
//Write new row containing new round to table body
const thisRoundBody = GlobalRoundsTable.querySelector("tbody");
const thisRound = thisRoundBody.insertRow(0); //insert as first table row
thisRound.id = "r-" + roundId; //set unique id of  row so we can access it later
thisRound.classList.add("row-item"); //needed for sorting.
writeRoundToTable(thisRound,roundIndex);
}

/*************************************************************************
* @function populateRoundsTable 
* @desc 
* Iterate through the userData.rounds array, adding a row corresponding
* to each round stored in the array. 
* @global GlobaluserData: object containing the current user's data
* @global GlobalRoundsDataCaption: The caption for the "Rounds" table
*************************************************************************/
function populateRoundsTable() {
for (let i = 0; i < GlobalUserData.rounds.length; ++i) {
  addRoundToTable(i);
}
if (GlobalUserData.rounds.length == 1) {
  GlobalRoundsTableCaption.textContent = "Table displaying 1 speedgolf round";
} else {
  GlobalRoundsTableCaption.textContent = "Table displaying " + GlobalUserData.rounds.length + " speedgolf rounds";
}
}

/*************************************************************************
* @function sortRoundsTable 
* @desc 
* Sort the rounds table in ascending or descending order by a given column.
* Use w3.sortHTML to perform the sort. The function alternatively sorts
* in ascending and descending order on successive calls.
* @param colNum -- the integer 1-based index of the column to sort by
* @global GlobalRoundsTableSortBtns: Array of buttons in col header that
*         can be clicked 
* @global GlobalRoundsTableSortableColHeaders: Array of refs to the 
*         header col elements of the first three (sortable) cols
* @global GlobalRoundsTableHeaderColLabels: Array of strings labeling 
*         data in corresponding column
*************************************************************************/
function sortRoundsTable(colNum) {
const sortOrder =  (GlobalRoundsTableSortBtns[colNum-1]
  .getAttribute("aria-label").indexOf("ascending") != -1) ? 
  "ascending" : "descending";
const futureSortOrder = (sortOrder === "ascending") ? "descending" : "ascending";
w3.sortHTML('#roundsTable','.row-item','td:nth-child(' + colNum + ')');
for (let i = 1; i <=3; ++i) {
  if (colNum === i) {
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down-alt")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down-alt");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down");
    }
    GlobalRoundsTableSortIcons[i-1].classList.add(
      (sortOrder === "ascending" ? "fa-sort-amount-down-alt" : "fa-sort-amount-down"));
    GlobalRoundsTableSortBtns[i-1].setAttribute("aria-label", 'Sort ' + 
    futureSortOrder + ' by ' + GlobalRoundsTableHeaderColLabels[colNum-1]);
    GlobalRoundsTableSortableColHeaders[i-1].setAttribute('aria-sort',sortOrder);
  } else {
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down-alt")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down-alt");
    }
    if (GlobalRoundsTableSortIcons[i-1].classList.contains("fa-sort-amount-down")) {
      GlobalRoundsTableSortIcons[i-1].classList.remove("fa-sort-amount-down");
    }
    GlobalRoundsTableSortIcons[i-1].classList.add("fa-sort");
    GlobalRoundsTableSortBtns[i-1].setAttribute("aria-label", 'Sort ascending by ' + 
    GlobalRoundsTableHeaderColLabels[i-1]);
    GlobalRoundsTableSortableColHeaders[i-1].setAttribute('aria-sort','none');
  }
}
}

/*************************************************************************
* @function searchRoundsTable 
* @Desc 
* When the user performs a keystroke within the search box, perform a 
* search of the rounds table, displaying only those rows that contain
* the text within the search box.
* @param searchVal, the text string in the search box
* @global createAccountForm: the <form> element whose 
*         SUBMIT handler is triggered
* @global roundsTable: The table of rounds
*************************************************************************/
function searchRoundsTable(searchVal) {
searchVal = searchVal.toUpperCase(); //case insensitive
let tr = GlobalRoundsTable.getElementsByTagName("tr");
let td, rowText, i, j;
let numVisibleRows = 0;
for (i = 1; i < tr.length; i++) {  //Loop through all table rows
  td = tr[i].getElementsByTagName("td");
  rowText = "";
  for (j = 0; j < 3; ++j) { //only consider Date, Course, Score cols
    rowText += td[j].textContent;
  }
  if (rowText != "") {
    if (rowText.toUpperCase().indexOf(searchVal) > -1) {
      tr[i].style.display = ""; //show row
      numVisibleRows++;
    } else {
      tr[i].style.display = "none"; //hide row
    }
  }
}
if (numVisibleRows == 1) {
  GlobalRoundsTableCaption.textContent = "Table displaying 1 speedgolf round";
} else {
  GlobalRoundsTableCaption.textContent = "Table displaying " + numVisibleRows + " speedgolf rounds";
}
}