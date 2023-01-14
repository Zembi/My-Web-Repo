
import Menu from '../Js/CoreItems/Menu.js';
import MenuItem from '../Js/CoreItems/MenuItem.js';
import Console from '../Js/CoreItems/Console.js';

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
   const consoleEl = document.getElementById('console');
   const consoleBtn = document.getElementById('consoleTitle').querySelector('button');
   const consoleContent = document.getElementById('consoleContent');
   const consoleObj = new Console(consoleEl, consoleBtn, consoleContent);
   consoleObj.ResizeConsole('--consoleChangeHeight', '25%');
   consoleObj.InitializationMessage();
   consoleObj.AddNewLineToConsole('msg', 'Test line');

   // localStorage.removeItem('overallConsoleStatus');
   const consoleStatus = JSON.parse(localStorage.getItem('overallConsoleStatus'));

   // CHANGE CONSOLE FUNCTION
   // console.log = function (message) {
   //    consoleObj.AddNewLineToConsole('msg', message);
   // }

   consoleObj.AddNewLineToConsole('msg', menuObj);
   console.log(menuObj);

   window.onerror = function (error, url, line) {
      let errData = { error: error, url: url, line: line };
      consoleObj.AddNewLineToConsole('err', errData);
   }

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


      // CORE CONSOLE FUNCTIONS
      CreateTheMainCoreOfConsole();

      // STATUS INITIALIZATION
      if (consoleStatus == null || consoleStatus[0] == false) {
         //DEFAULT
         consoleObj.CloseConsole();
      }
      else {
         consoleObj.OpenConsole();
      }

      // HEIGHT INITIALIZATION
      if (consoleStatus != null) {
         let consoleHeight = consoleStatus[1];
         $('#sizesOfCoreConsoleSlct option').map((index, option) => {
            if (option.value == consoleHeight) {
               $('#sizesOfCoreConsoleSlct').val(consoleHeight);
            }
         });
         //consoleHeight = consoleHeight.slice(0, consoleHeight.indexOf('%'));
         consoleObj.ResizeConsole('--consoleChangeHeight', consoleHeight);
      }

      // ALIGN INITIALIZATION
      if (consoleStatus != null) {
         consoleObj.InitialAlign('--flexDirect', '--consoleAlign', consoleStatus[2]);
      }
      else {
         consoleObj.InitialAlign('--flexDirect', '--consoleAlign', 'center');
      }

      let buttonInfo = consoleObj.nextAlign.toUpperCase();
      document.getElementById('changeConsoleAlignBtn').innerHTML = `Align [${buttonInfo}]`;


      consoleBtn.addEventListener('click', () => {
         if (consoleEl.classList.contains('openCoreConsole')) {
            consoleObj.CloseConsole();
         }
         else {
            consoleObj.OpenConsole();
         }
         let consoleFunct = [consoleObj.GetConsoleCurrentStatus(), consoleObj.consoleSize, consoleObj.alignContent];
         consoleFunct = JSON.stringify(consoleFunct);
         localStorage.setItem('overallConsoleStatus', consoleFunct);
      });

      ShortcutEvents();
   }

   function CreateTheMainCoreOfMenu() {
      // MENU 1
      let menuItem1 = new MenuItem(menuObj);
      menuItem1.AddHeadMenuItem('FirstProjects', '../Js/FirstProjects/');
      menuItem1.AddElemntsToMenuItem('FirstProj', 'FirstProj.js');
      menuObj.AddMenuItemToMenu(menuItem1);

      menuObj.SetAllHeadBtns(menuContent.querySelectorAll('button'));
   }

   function CreateTheMainCoreOfConsole() {
      // ALIGN CONSOLE EVENT
      document.getElementById('changeConsoleAlignBtn').addEventListener('click', () => {
         consoleObj.ChangeAlign('--consoleAlign');

         let buttonInfo = consoleObj.nextAlign.toUpperCase();
         document.getElementById('changeConsoleAlignBtn').innerHTML = `Align [${buttonInfo}]`;

         let consoleFunct = [consoleObj.GetConsoleCurrentStatus(), consoleObj.consoleSize, consoleObj.alignContent];
         consoleFunct = JSON.stringify(consoleFunct);
         localStorage.setItem('overallConsoleStatus', consoleFunct);
      });

      // CLEAR CONSOLE EVENT
      document.getElementById('clearConsoleBtn').addEventListener('click', () => {
         consoleObj.ClearConsoleEvent();
      });

      // CHANGE SIZE CONSOLE EVENT
      document.getElementById('sizesOfCoreConsoleSlct').addEventListener('change', () => {
         let newHeight = document.getElementById('sizesOfCoreConsoleSlct').value;
         consoleObj.ResizeConsole('--consoleChangeHeight', newHeight);


         let consoleFunct = [consoleObj.GetConsoleCurrentStatus(), consoleObj.consoleSize, consoleObj.alignContent];
         consoleFunct = JSON.stringify(consoleFunct);
         localStorage.setItem('overallConsoleStatus', consoleFunct);
      });
   }

   function ShortcutEvents() {
      document.addEventListener('keydown', (e) => {
         let specialKey = e.altKey;

         if (e.key.toLowerCase() === 'x' && specialKey) {
            menuBtn.click();
            e.preventDefault();
         }

         if (e.key.toLowerCase() === 'c' && specialKey) {
            consoleBtn.click();
            e.preventDefault();
         }

         // IMPORTANT CONSOLE BUTTONS
         if (e.key.toLowerCase() === 'q' && specialKey && consoleObj.consoleStatus) {
            document.getElementById('changeConsoleAlignBtn').focus();
            e.preventDefault();
         }
         if (e.key.toLowerCase() === 'w' && specialKey && consoleObj.consoleStatus) {
            document.getElementById('clearConsoleBtn').focus();
            e.preventDefault();
         }
         if (e.key.toLowerCase() === 'e' && specialKey && consoleObj.consoleStatus) {
            document.getElementById('sizesOfCoreConsoleSlct').focus();
            e.preventDefault();
         }
      });
   }
}