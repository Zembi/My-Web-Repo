
import Menu from '../Js/CoreItems/Menu.js';
import MenuItem from '../Js/CoreItems/MenuItem.js';

CreateAScriptToLoad();

main();

function CreateAScriptToLoad() {
   let src = localStorage.getItem('currScript');

   if (src != null) {
      // CREATE A NEW ONE
      let script = document.createElement('script');
      script.id = 'scriptToLoad';
      script.setAttribute('src', src);
      script.setAttribute('type', 'module');
      document.body.appendChild(script);
   }
}

function main() {
   // CRUCIAL VARIABLES
   // MENU VARIABLES
   const menu = document.getElementById('menu');
   const menuBtn = document.getElementById('menuTitle').querySelector('button');
   const menuContent = document.getElementById('menuContent');
   const menuObj = new Menu(menu, menuBtn, menuContent);

   // MENU VARIABLES
   const consoleElmnt = document.getElementById('consoleIn');
   const consoleObj = new Console(consoleElmnt);
   consoleObj.start();

   InitializeCoreFunctions();

   function InitializeCoreFunctions() {
      // CORE MENU FUNCTIONS
      CreateTheMainCoreOfMenu();

      const menuStatus = localStorage.getItem('overallMenuStatus');
      if (menuStatus == 'false' || menuStatus == null) {
         //DEFAULT
         menuObj.CloseMenu();
      }
      else {
         menuObj.OpenMenu();
      }

      menuBtn.addEventListener('click', () => {
         if (menu.classList.contains('openCoreMenu')) {
            menuObj.CloseMenu();
         }
         else {
            menuObj.OpenMenu();
         }
         localStorage.setItem('overallMenuStatus', menuObj.GetMenuCurrentStatus());
      });

      ShortcutEvents();
   }

   function CreateTheMainCoreOfMenu() {
      // MENU 1
      let menuItem1 = new MenuItem(menuObj);
      menuItem1.AddHeadMenuItem('FirstProjects', '../Js/FirstProjects/');
      menuItem1.AddElemntsToMenuItem('FirstProj', 'FirstProj.js');
      menuItem1.AddElemntsToMenuItem('SecondProj', 'html.js');
      menuObj.AddMenuItemToMenu(menuItem1);

      menuObj.SetAllHeadBtns(menuContent.querySelectorAll('button'));
   }

   function ShortcutEvents() {
      document.addEventListener('keydown', (e) => {
         let specialKey = e.altKey;

         if (e.key.toLowerCase() === 'x' && specialKey) {
            menuBtn.click();
            e.preventDefault();
         }
      });
   }
}