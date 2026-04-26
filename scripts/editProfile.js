/*************************************************************************
 * File: editProfile.js
 * This file contains functions that support the "Account and Profile
 * Settings" Dialog.
 ************************************************************************/

 /*************************************************************************
 * @function profilePicField CHANGE Handler 
 * @Desc 
 * When the user finishes interacting with the File picker dialog box,
 * update the user's profile picture based on the selection from the
 * file picker. If the user cancels out of the File Picker, the input
 * element's value will be empty and we set the profile picture to the
 * default picture.
 * @global profilePicField: The "Update Profile" form field 
 *         containing the optional profile picture
 * @global profilePicImage: The "Update Profile" <img> element that
 *         displays the user's profile picture (possibly the default)
 *************************************************************************/
  GlobalProfilePicField.addEventListener("change",function(e) {
    if (GlobalProfilePicField.value.length !== 0) {
        const reader = new FileReader();
        reader.readAsDataURL(GlobalProfilePicField.files[0]);
        reader.addEventListener("load",function() {
            GlobalProfilePicImage.setAttribute("src",this.result);
        });
    } else {
        GlobalProfilePicImage.setAttribute("src",GlobalDefaultProfilePic);
    }
});

/*************************************************************************
 * @function resetupdateProfileForm 
 * @Desc 
 * When the user exits the "Update Profile" Dialog, reset the form to
 * blank in case the form is visited again.
 * @global GlobalProfileEmailFiled: Form's email field
 * @global GlobalProfilePasswordField: Form's password field
 * @global GlobalProfileDisplayNameField: Form's display name field
 * @global GlobalProfileSecurityQuestionField: Form's security q field
 * @global GlobalProfileSecurityAnswerField: Form's security answ field
 * @global GlobalProfileErrBox: <div> containing the error messages
 * @global GlobalProfileEmailErr: Error message for email field
 * @global GlobalProfilePasswordErr: Error message for password field
 * @global GlobalProfileDisplaynameErr: Error message for display name field
 * @global GlobalProfileSecurityQuestionErr: Error message for security q field
 * @global GlobalProfileSecurityAnswerErr: Error message for security answ field
 *************************************************************************/
 function resetUpdateProfileForm() {
    //Hide errors
    GlobalProfileErrBox.classList.add("hidden");
    GlobalProfileEmailErr.classList.add("hidden");
    GlobalProfileDisplayNameErr.classList.add("hidden");
    GlobalProfileSecurityQuestionErr.classList.add("hidden");
    GlobalProfileSecurityAnswerErr.classList.add("hidden");
    //Blank out account info
    GlobalProfileEmailField.value = "";
    GlobalProfilePasswordField.value = "";
    GlobalProfileSecurityQuestionField.value = "";
    GlobalProfileSecurityAnswerField.value = "";
    //Blank out Identity info
    GlobalProfileDisplayNameField.value = "";
    GlobalProfilePicField.value = "";
    GlobalProfilePicImage.setAttribute("src",GlobalDefaultProfilePic);
    //Blank out Speedgolf info
    GlobalProfileBioField.value = "";
    GlobalProfileFirstRoundField.value = "";
    GlobalProfileHomeCourseField.value = "";
    GlobalProfileBestStrokesField.value = "";
    GlobalProfileBestMinutesField.value = "";
    GlobalProfileBestSecondsField.value = "";
    GlobalProfileBestCourseField.value = "";
    for (let i = 0; i < GlobalAllClubs.length; ++i) {
        document.getElementById("sg"+ GlobalAllClubs[i]).checked = false;
    }
    GlobalProfileClubCommentsField.value = "";
    //Set first focusable item.
    GlobalFirstFocusableUpdateProfileItem.set(GlobalProfileEmailField);
    //Expand only the first accordion panel
    GlobalAccountSettingsBtn.classList.remove("collapsed");
    GlobalAccountSettingsPanel.classList.add("show");
    GlobalProfileSettingsBtn.classList.add("collapsed");
    GlobalProfileSettingsPanel.classList.remove("show");
    GlobalsgSettingsBtn.classList.add("collapsed");
    GlobalsgSettingsPanel.classList.remove("show");
}

/*************************************************************************
 * @function populateProfileSettingsForm 
 * @Desc 
 * Populates the "Account and Profile Settings" dialog form with the 
 * current user's data. 
 * The following global vars are used to access fields in the form
 *  @global GlobalProfileEmailField
 *  @global GlobalProfilePasswordField
 *  @global GlobalProfileSecurityQuestionField
 *  @global GlobalProfileSecurityAnswerField
 *  @global GlobalProfileDisplayNameField
 *  @global GlobalProfilePicImage
 *  @global GlobalProfileBioField    
 *  @global GlobalProfileBestStrokesField
 *  @global GlobalProfileBestMinutesField
 *  @global GlobalProfileBestSecondsField
 *  @global GlobalProfileBestCourseField
 *************************************************************************/
 function populateProfileSettingsForm() {
    GlobalProfileEmailField.value = GlobalUserData.accountInfo.email;
    GlobalProfilePasswordField.value = GlobalUserData.accountInfo.password;
    GlobalProfileSecurityQuestionField.value = GlobalUserData.accountInfo.securityQuestion;
    GlobalProfileSecurityAnswerField.value = GlobalUserData.accountInfo.securityAnswer;
    GlobalProfileDisplayNameField.value = GlobalUserData.identityInfo.displayName;
    GlobalProfilePicImage.setAttribute("src",GlobalUserData.identityInfo.profilePic);
    GlobalProfileBioField.value = GlobalUserData.speedgolfInfo.bio;
    GlobalProfileHomeCourseField.value = GlobalUserData.speedgolfInfo.homeCourse;
    GlobalProfileFirstRoundField.value = GlobalUserData.speedgolfInfo.firstRound;
    GlobalProfileBestStrokesField.value = GlobalUserData.speedgolfInfo.personalBest.strokes;
    GlobalProfileBestMinutesField.value = GlobalUserData.speedgolfInfo.personalBest.minutes;
    GlobalProfileBestSecondsField.value = GlobalUserData.speedgolfInfo.personalBest.seconds;
    GlobalProfileBestCourseField.value = GlobalUserData.speedgolfInfo.personalBest.course;   
    //Check checkboxes...
    for (const prop in GlobalUserData.speedgolfInfo.clubs) {
        document.getElementById("sg" + prop).checked = true;
    }
    GlobalProfileClubCommentsField.value = GlobalUserData.speedgolfInfo.clubComments;
    GlobalProfileEmailField.focus(); //Set focus to first field.
}

/*************************************************************************
 * @function profileBtn CLICK Handler 
 * @Desc 
 * When the user clicks their profile picture, hide the menu button, tabs,
 * and current tab panel, and show the "Account and Profile Settings" Dialog
 * @global GlobalMenuBtn: The menu button
 * @global GlobalModeTabsContainer: The mode tabs
 * @global GlobalModeTabPanels: array of tab panels 
 * @global GlobalCurrentMode, index of current mode.
 * @global GlobalProfileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 GlobalProfileBtn.addEventListener("click", function(e) {
    transitionToDialog(GlobalProfileSettingsDialog, "Edit Account and Profile",populateProfileSettingsForm);
    //populateProfileSettingsForm();
    GlobalProfileEmailField.focus();
});

/*************************************************************************
 * @function updateProfile
 * @Desc 
 * Given valid profile data in the form, update the current user's
 * object in localStorage
 * @global menuBtn: The menu button
 * @global modeTabsContainer: The mode tabs
 * @global modeTabPanels: array of tab panels 
 * @global currentMode, index of current mode.
 * @global profileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 function updateProfile() {
    let clubsInBag = {};
    for (let i = 0; i < GlobalProfileClubsInBagChecks.length; ++i) {
        if (GlobalProfileClubsInBagChecks[i].checked) {
            clubsInBag[GlobalProfileClubsInBagChecks[i].name] = true;
        }
    }
    const oldUserEmail = GlobalUserData.accountInfo.email;
    GlobalUserData = {
        accountInfo: {
            email: GlobalProfileEmailField.value, 
            password: GlobalProfilePasswordField.value,
            securityQuestion: GlobalProfileSecurityQuestionField.value,
            securityAnswer: GlobalProfileSecurityAnswerField.value
        },
        identityInfo: {
            displayName: GlobalProfileDisplayNameField.value,
            profilePic: GlobalProfilePicImage.getAttribute("src"),
        },
        speedgolfInfo: {
            bio: GlobalProfileBioField.value,
            firstRound: GlobalProfileFirstRoundField.value,
            homeCourse: GlobalProfileHomeCourseField.value,
            personalBest: {
                strokes: GlobalProfileBestStrokesField.value,
                minutes: GlobalProfileBestMinutesField.value, 
                seconds: GlobalProfileBestSecondsField.value, 
                course: GlobalProfileBestCourseField.value},
            clubs: clubsInBag,
            clubComments: GlobalProfileClubCommentsField.value
        },
        rounds: [...GlobalUserData.rounds],
        roundCount: GlobalUserData.roundCount
    };
    //Save updated profile to localStorage as key-value pair
    localStorage.setItem(GlobalUserData.accountInfo.email, 
        JSON.stringify(GlobalUserData));
    if (oldUserEmail !== GlobalUserData.accountInfo.email) {
        //We need to remove old user record from localStorage
        localStorage.removeItem(oldUserEmail);
    }
    //Reset form in case it is visited again
    resetUpdateProfileForm();
    //Transition back to previous mode page
    GlobalProfileBtn.style.backgroundImage = "url(" + GlobalUserData.identityInfo.profilePic + ")";
    transitionFromDialog(GlobalProfileSettingsDialog);
}

/*************************************************************************
 * @function submit button CLICK Handler 
 * @Desc 
 * When the user clicks the form's "Update" (submit) button, we need to
 * validate the form data. If it's valid, we update the current user's
 * object in localStorage.
 * @global GlobalMenuBtn: The menu button
 * @global GlobalModeTabsContainer: The mode tabs
 * @global GlobalModeTabPanels: array of tab panels 
 * @global GlobalCurrentMode, index of current mode.
 * @global GlobalProfileSettingsDialog: The "Account and Profile Settings" 
 *         dialog
 *************************************************************************/
 editProfileForm.addEventListener("submit",function(e) {
    e.preventDefault(); //Prevent default submit behavior
    //Is the email field valid?
    let emailValid = !GlobalProfileEmailField.validity.typeMismatch && 
                        !GlobalProfileEmailField.validity.valueMissing;
    //Is display field valid?
    let displayNameValid = !GlobalProfileDisplayNameField.validity.tooShort &&
                            !GlobalProfileDisplayNameField.validity.valueMissing;
    //Is security question field valid?
    let securityQuestionValid = !GlobalProfileSecurityQuestionField.validity.tooShort &&
                                !GlobalProfileSecurityQuestionField.validity.valueMissing;
    //Is security answer field valid?
    let securityAnswerValid = !GlobalProfileSecurityAnswerField.validity.tooShort &&
                                !GlobalProfileSecurityAnswerField.validity.valueMissing;
    if (emailValid && displayNameValid && 
        securityQuestionValid & securityAnswerValid) { 
        //All is well -- Call updateProfile()
        updateProfile();
        return;
    }
    //If here, at least one field is invalid: Display the errors
    //and allow user to fix them.
    GlobalProfileErrBox.classList.remove("hidden");
    if (!emailValid || !securityQuestionValid || !securityAnswerValid) {
        //expand account panel
        accountSettingsBtn.classList.remove("collapsed");
        accountSettingsPanel.classList.add("show");
    } else {
        //collapse account panel
        accountSettingsBtn.classList.add("collapsed");
        accountSettingsPanel.classList.remove("show");
    }
    if (!displayNameValid) {
        //expand Profile panel
        GlobalProfileSettingsBtn.classList.remove("collapsed");
        GlobalProfileSettingsPanel.classList.add("show");
    } else {
        //collapse account panel
        GlobalProfileSettingsBtn.classList.add("collapsed");
        GlobalProfileSettingsPanel.classList.remove("show");
    }
    //Speedgolf Settings Panel always collapsed
    GlobalsgSettingsBtn.classList.add("collapsed");
    GlobalsgSettingsPanel.classList.remove("show");
    document.title = "Error: Update Account & Profile";
    if (!securityAnswerValid) { //Display name field is invalid
        GlobalProfileSecurityAnswerErr.classList.remove("hidden");
        GlobalProfileSecurityAnswerErr.focus();
        GlobalFirstFocusableUpdateProfileItem.set(GlobalProfileSecurityAnswerErr);
    } else {
        GlobalProfileSecurityAnswerErr.classList.add("hidden");
    }
    if (!securityQuestionValid) { //Display name field is invalid
        GlobalProfileSecurityQuestionErr.classList.remove("hidden");
        GlobalProfileSecurityQuestionErr.focus();
        GlobalFrstFocusableUpdateProfileItem.set(GlobalProfileSecurityQuestionErr);
    } else {
        GlobalProfileSecurityQuestionErr.classList.add("hidden");
    } 
    if (!displayNameValid) { //Display name field is invalid
        GlobalProfileDisplayNameErr.classList.remove("hidden");
        GlobalProfileDisplayNameErr.focus();
        GlobalFirstFocusableUpdateProfileItem.set(GlobalProfileDisplayName);
    } else {
        GlobalProfileDisplayNameErr.classList.add("hidden");
    } 
    if (!emailValid) { //Email field is invalid
        GlobalProfileEmailErr.classList.remove("hidden");
        GlobalProfileEmailErr.focus();
        GlobalFirstFocusableUpdateProfileItem.set(GlobalProfileEmailErr);
    } else {
        GlobalProfileEmailErr.classList.add("hidden");
    }
 });

 cancelUpdateProfileBtn.addEventListener("click", function(e) {
    //Reset form in case it is visited again
    resetUpdateProfileForm();
    //Transition back to previous mode page
    transitionFromDialog(GlobalProfileSettingsDialog);
 });