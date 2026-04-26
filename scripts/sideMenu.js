/*************************************************************************
 * File: sideMenu.js
 * These functions support interaction with the side menu.
 ************************************************************************/

/*************************************************************************
 * @function menuBtn click handler
 * @desc 
 * When the user clicks the menuBtn, open or close the side menu 
 * based on current menu state.
 *************************************************************************/
 GlobalMenuBtn
   .addEventListener("click", function (e) {
    if (GlobalMenuIcon.classList.contains("fa-bars")) { //OPEN MENU
        //Change menu icon
        GlobalMenuIcon.classList.remove("fa-bars");
        GlobalMenuIcon.classList.add("fa-times");
        //Open menu
        GlobalMenuBtn.setAttribute("aria-expanded","true"); 
        sideMenu.classList.add("sidemenu-open");

    } else { //CLOSE MENU
        //Change menu icon
        GlobalMenuIcon.classList.remove("fa-times");
        GlobalMenuIcon.classList.add("fa-bars");
        //Close menu
        GlobalMenuBtn.setAttribute("aria-expanded","false");
        GlobalMenu.classList.remove("sidemenu-open");
        //Focus menu button
        setTimeout(() => GlobalMenuBtn.focus(),1);
    }
});

/*************************************************************************
 * @function GlobalMenuItems click handler
 * @desc 
 * When the user clicks on a menu item, close the menu. 
 * This functionality is a placeholder; we will update later with more
 * specific functionality for each menu item.
 *************************************************************************/
for (let i = 0; i < GlobalMenuItems.length; ++i) {
    GlobalMenuItems[i].addEventListener("click",function(e) {
      GlobalMenuBtn.click();
    });
}


/*************************************************************************
* @function keyDownMenuBtnFocused
* @desc 
* Handle keypress when the menuBtn has the focus. Process 
* the arrow keys, space, and enter. All other keys are ignored.
* @param key
* The code of the key that was pressed.
*************************************************************************/
function keyDownMenuBtnFocused(key) {
    if (key === "ArrowDown" || key === "ArrowUp" ||
            key === "Space" || key === "Enter") {
            menuBtn.click(); //open menu
            if (key === "ArrowUp") { //Focus on last item
                GlobalFocusedMenuItem.set(GlobalMenuItems.length-1);
            } else { //Focus on first item
                GlobalFocusedMenuItem.set(0);
            }
            GlobalMenuItems[GlobalFocusedMenuItem.get()].focus();
        }
}

/*************************************************************************
* @function keyDownMenuItemFocused
* @desc 
* Handle keypress when menu is open and an item has focus. Per Table
* 4.1 from the book, we handle the following key presses: tab, enter
* escape, up arrow, down arrow, home, and end. 
* are the arrow keys, space, and enter. All other keys are ignored.
* @param key
* The code of the key that was pressed.
* @globals
 * GlobalFocusedMenuItem is the index of the currently focused menu item
 * GlobalMenuItems is an array of the HTML elements that are menu items   
 * menuBtn is a reference to the menu button HTML element
*************************************************************************/
function keyDownMenuItemFocused(key) {  
    if (key == "Enter") { //Activate focused menu item
        document.activeElement.click();
    } else if (key === "Tab") { //Close menu
       GlobalMenuBtn.click();
    } else if (key == "Escape") { //Close menu
        GlobalMenuBtn.click();
        GlobalMenuBtn.focus();
    } else if (key === "ArrowUp") {  //Focus on next item
        GlobalFocusedMenuItem.set((GlobalFocusedMenuItem.get() - 1 + GlobalMenuItems.length)
          % GlobalMenuItems.length);
        GlobalMenuItems[GlobalFocusedMenuItem.get()].focus();
    } else if (key === "ArrowDown") {  //Focus on prev item                                                                                                                                             
        GlobalFocusedMenuItem.set((GlobalFocusedMenuItem.get() + 1) % GlobalMenuItems.length);
        GlobalMenuItems[GlobalFocusedMenuItem.get()].focus();
    } else if (key === "Home") { //Focus on first item
        GlobalFocusedMenuItem.set(0);
        GlobalMenuItems[GlobalFocusedMenuItem.get()].focus();
    } else if (key === "End") { //Focus on last item
        GlobalFocusedMenuItem.set(GlobalMenuItems.length - 1);
        GlobalMenuItems[GlobalFocusedMenuItem.get()].focus();
    } 
}