
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

   // GET TRACE AS STRING SO I CAN SHOW THE LINE OF MESSAGE ON MY CONSOLE
   let getStackTraceImportant = function () {
      var obj = {};
      Error.captureStackTrace(obj, getStackTraceImportant);

      let urlAndLine = obj.stack;

      // FIRST URL FROM CONSOLE.LOG OVERRIDEN CUSTOM FUNCTION
      let firstUrl = urlAndLine.substring(urlAndLine.indexOf('(') + 1, urlAndLine.indexOf(')'));
      urlAndLine = urlAndLine.replace(urlAndLine.substring(0, urlAndLine.indexOf(')') + 1), ' ');

      // IMPORTANT URL TO SHOW WHERE MESSAGE CAME FROM, ON CONSOLE
      let secondUrl = urlAndLine.substring(urlAndLine.indexOf('(') + 1, urlAndLine.indexOf(')'));
      urlAndLine = urlAndLine.replace(urlAndLine.substring(0, urlAndLine.indexOf(')') + 1), ' ');

      // SPLIT URL AND GET FILE LOCATION AS WELL AS LINE NUMBER
      let urlEnd = secondUrl.substring(secondUrl.lastIndexOf('/') + 1, secondUrl.length);
      let urlImprtEnd = urlEnd.substring(0, urlEnd.lastIndexOf(':'));
      let file = urlImprtEnd.substring(0, urlImprtEnd.lastIndexOf(':'));
      let line = urlImprtEnd.substring(urlImprtEnd.lastIndexOf(':') + 1, urlImprtEnd.length);

      return { file, line };
   };

   // CHANGE CONSOLE FUNCTION
   console.log = function (message) {
      let urlLine = getStackTraceImportant();
      const msgAndInfo = { message, file: urlLine.file, line: urlLine.line };
      consoleObj.AddNewLineToConsole('msg', msgAndInfo);
   }

   // consoleObj.AddNewLineToConsole('msg', menuObj);

   let c = function () {
      let x = 0;
      x++;
   }
   // consoleObj.AddNewLineToConsole('msg', c);
   let c2 = () => {
      let x = 0;
      x++;
      x = (x + 1);
   }
   // consoleObj.AddNewLineToConsole('msg', c2);

   function CThree() {
      let x = 0;
      x++;
      x = (x + 1);
   }
   let c3 = CThree;
   // consoleObj.AddNewLineToConsole('msg', c3);

   let h = {
      hello: menuObj,
      bye: [0, 0, 0, 0],
   }
   let now = {
      no1: 'string',
      no2: 1,
      no3: true,
      no4: null,
      menuL: h,
      dom: document.getElementById('consoleContent'),
      c,
      c2,
      c44: c2,
      c3
   }
   consoleObj.AddNewLineToConsole('msg', { message: now, file: 'oopp.js', line: '122' });
   console.log(now);

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
      menuItem1.AddElemntsToMenuItem('SecondProj', 'html.js');
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
            let c = function () {
               let x = 0;
               x++;
            }
            // consoleObj.AddNewLineToConsole('msg', c);
            let c2 = () => {
               let x = 0;
               x++;
               x = (x + 1);
            }
            // consoleObj.AddNewLineToConsole('msg', c2);

            function CThree() {
               let x = 0;
               x++;
               x = (x + 1);
            }
            let c3 = CThree;
            // consoleObj.AddNewLineToConsole('msg', c3);

            let h = {
               hello: menuObj,
               bye: [0, 0, 0, 0],
            }
            let now = {
               no1: 'string',
               no2: 1,
               no3: true,
               no4: null,
               menuL: h,
               dom: document.getElementById('consoleContent'),
               c,
               c2,
               c44: c2,
               c3
            }
            // consoleObj.AddNewLineToConsole('msg', { message: now, file: 'oopp.js', line: '122' });
            console.log(now);
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

fjrfhjflefjkejekjfkejkfjekje