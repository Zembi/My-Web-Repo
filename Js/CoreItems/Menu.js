
export default class MenuItem {
   constructor(menuElmnt, menuBtn, menuContentElmnt) {
      this.menuElmnt = menuElmnt;
      this.menuBtn = menuBtn;
      this.menuContentElmnt = menuContentElmnt;

      this.menuItems = [];
      this.headerBtns = [];
   }

   // UPDATE IF MENU IS OPENED OR CLOSED BY RETURNING TRUE FOR OPENED AND FALSE FOR CLOSED
   GetMenuCurrentStatus() {
      let status;

      if (this.menuElmnt.classList.contains('openCoreMenu')) {
         return true;
      }
      else if (this.menuElmnt.classList.contains('closedCoreMenu')) {
         return false;
      }
   }

   AddMenuItemToMenu(menuItem) {
      this.menuItems.push(menuItem);

      this.PushToHTMLLastAdditionItemMenu(menuItem);
   }

   PushToHTMLLastAdditionItemMenu(menuItem) {
      let menuElmnt = document.createElement('div');
      menuElmnt.className = 'menuElement';
      this.menuContentElmnt.appendChild(menuElmnt);

      menuItem.AddMenuItemToHtml(menuElmnt);
   }

   GetMenuItems() {
      return this.menuItems;
   }

   SetAllHeadBtns(headerBtns) {
      this.headerBtns = headerBtns;
   }

   CloseMenu() {
      this.menuElmnt.classList.remove('openCoreMenu');
      this.menuElmnt.classList.add('closedCoreMenu');

      this.menuBtn.classList.remove('openCoreMenuBtn');
      this.menuBtn.classList.add('closedCoreMenuBtn');

      this.menuContentElmnt.classList.remove('openCoreMenuContent');
      this.menuContentElmnt.classList.add('closedCoreMenuContent');

      this.headerBtns.forEach((headBtn) => {
         headBtn.tabIndex = -1;
      });
   }

   OpenMenu() {
      this.menuElmnt.classList.remove('closedCoreMenu');
      this.menuElmnt.classList.add('openCoreMenu');

      this.menuBtn.classList.remove('closedCoreMenuBtn');
      this.menuBtn.classList.add('openCoreMenuBtn');

      this.menuContentElmnt.classList.remove('closedCoreMenuContent');
      this.menuContentElmnt.classList.add('openCoreMenuContent');

      this.headerBtns.forEach((headBtn) => {
         headBtn.tabIndex = 0;
      });
   }
}