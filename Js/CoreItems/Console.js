``
export default class Console {
  constructor(consoleElmnt, consoleBtn, consoleContentElmnt) {
    this.consoleElmnt = consoleElmnt;
    this.consoleBtn = consoleBtn;
    this.consoleContentElmnt = consoleContentElmnt;

    this.consoleStatus = false;

    this.consoleIndexSymbol = '>>';

    this.alignContent = null;
    this.nextAlign = null;

    this.counter = -1;

    this.consoleSize = null;
  }

  get GetAlign() {
    return this.alignContent;
  }
  set SetAlign(value) {
    this.alignContent = value.toLowerCase();
  }

  get GetNextAlign() {
    return this.nextAlign;
  }
  set SetNextAlign(value) {
    this.nextAlign = value.toLowerCase();
  }

  get GetConsoleCurrentHeight() {
    return this.consoleSize;
  }
  set SetConsoleCurrentHeight(newConsoleSize) {
    this.consoleSize = newConsoleSize;
  }

  InitializationMessage() {
    this.consoleContentElmnt.innerHTML += `
      <div class='newConsoleLine'>
         <p class='intiliazedLineOfConsole'>
         --------------------------------------------------------------------------
         <br>
         | Welcome to custom Console |
         <br>
         | Important console functions under output |
         <br>
         --------------------------------------------------------------------------
         </p>
      </div>`;
  }

  // UPDATE IF CONSOLE IS OPENED OR CLOSED BY RETURNING TRUE FOR OPENED AND FALSE FOR CLOSED
  GetConsoleCurrentStatus() {
    let status;

    if (this.consoleElmnt.classList.contains('openCoreConsole')) {
      return true;
    }
    else if (this.consoleElmnt.classList.contains('closedCoreConsole')) {
      return false;
    }
  }

  AddNewLineToConsole(typeOfMsg, line) {
    let consolePointer = document.getElementById('consolePointer');

    // IF IT ISN'T FIRST LINE OF CONSOLE
    if (consolePointer != null) {
      consolePointer.id = '';
      consolePointer.className = 'consoleCountPointer';
    }

    if (this.counter < 0) {
      this.consoleContentElmnt.innerHTML += `
         <div class='newConsoleLine'>
            <span></span>
            <p></p>
         </div>
         <div class='newConsoleLine' id='lastLineInConsole'>
            <span id='consolePointer'>${this.consoleIndexSymbol}</span>
            <p></p>
         </div>`;
    }
    else {

      // DELETE LAST LINE OF CONSOLE AND RECREATE IT AFTER
      document.getElementById('lastLineInConsole').remove();

      // NUMBER COUNT CONSOLE
      let finalCountForm = (this.counter + 1) + ':';
      if (this.counter < 9) {
        finalCountForm = '0' + finalCountForm;
      }

      let consolePointerLine = `
            <div class='newConsoleLine' id='lastLineInConsole' style='position: sticky; bottom: -3rem; margin-top: 0.5em;'>
               <span id='consolePointer'>${this.consoleIndexSymbol}</span>
               <p></p>
            </div>`;

      let importantLine = line;
      if (typeOfMsg === 'msg') {
        // IF OBJECT
        if (typeof line === 'object' && line !== null) {
          importantLine = this.ObjectLineOfConsole(line);
        }

        this.consoleContentElmnt.innerHTML += `
            <hr>
            <div class='newConsoleLine'>
               <span class='consoleCountPointer'>${finalCountForm}</span>
               <div class='consoleLineContent newConsoleLinePar'>${importantLine}</div>
            </div>
            ${consolePointerLine}
            `;

        if (typeof line === 'object' && line !== null) {
          let btnOpenObj = document.getElementById('consoleLineObj' + this.counter).children[0].children[0];
          btnOpenObj.click();
        }
      }
      else {
        // IF ERROR
        importantLine = this.ErrorLineOfConsole(line);

        this.consoleContentElmnt.innerHTML += `
            <hr>
            <div class='newConsoleLine newConsoleLineError'>
               <span class='consoleCountPointer'>${finalCountForm}</span>
               <div class='consoleLineContent newConsoleLineError'>${importantLine}</div>
            </div>
            ${consolePointerLine}
            `;
      }
    }

    this.consoleContentElmnt.scrollTop = this.consoleContentElmnt.scrollHeight;

    this.counter++;
  }

  ObjectLineOfConsole(line) {
    const thisConsole = this;
    let objectLine = '';
    let nameOfObj = line.constructor.name;

    objectLine = OperateObjectFound(nameOfObj, line);

    function OperateObjectFound(name, obj) {
      let infoOfObj = '';
      let specificInfo = '';

      let c = 0;
      for (const [key, value] of Object.entries(obj)) {
        let frontSymbolOfObj = '+';
        let finalValue = value;
        let styling = ``;
        if (typeof value === 'object' && value !== null) {
          console.log(value.tagName);
        }
        else if (typeof value === 'boolean') {
          frontSymbolOfObj = '-';
          styling = 'color: rgb(121, 61, 121);';
        }
        else if (typeof value === 'number') {
          frontSymbolOfObj = '-';
          styling = 'color: cyan;';
        }
        else if (typeof value === 'string') {
          frontSymbolOfObj = '-';
          styling = 'color: rgb(255, 166, 0);';
          finalValue = '"' + value + '"';
        }

        let splitLine = '<br>';
        if (c === 0) {
          splitLine = '';
        }
        specificInfo += `<p><span>${frontSymbolOfObj}</span> ${key}: <span style='${styling}'>${finalValue}</span>,</p>`;

        c++;
      }

      let btnFunction = `
            document.querySelector('#consoleLineObj${thisConsole.counter}').children[0].children[0].classList.toggle('consoleObjectLineOfObjcBtn');document.querySelector('#consoleLineObj${thisConsole.counter}').children[0].children[0].children[0].classList.toggle('consoleObjectLineImgToggle');document.querySelector('#consoleLineObj${thisConsole.counter}').children[1].classList.toggle('closedConsoleObjLine');document.querySelector('#consoleLineObj${thisConsole.counter}').children[0].children[0].classList.toggle('consoleObjectLineImgToggle');`;

      infoOfObj = `
         <div class='consoleObjectLine' id='consoleLineObj${thisConsole.counter}'>
            <div class='beforeConsoleObjBtn'>
               <button onclick=${btnFunction} style='cursor: pointer;'>
                  <img>
                  <p>${name}</p>
               </button>
            </div>
            <span class='consoleObjectLineP closedConsoleObjLine'>
               <span class='consoleObjectLineAfterP'>${specificInfo}</span>
            </span>
         </div>`;

      return infoOfObj;
    }

    return objectLine;
  }

  ErrorLineOfConsole(line) {
    let err = line;
    let errResultForm = '';

    let linkDestinations = err.url.split('/');
    let finalLinkDestination = linkDestinations[linkDestinations.length - 1] + ' : ';

    errResultForm = `
         <span class='errorMainConsoleDestinLine'>Error =></span><span class='errorConsoleDestinLine'>${finalLinkDestination}${err.line}
         </span>
         <span class='errorConsolePar'>
           ${err.error}
         </span>
      `;

    return errResultForm;
  }

  CloseConsole() {
    this.consoleElmnt.classList.remove('openCoreConsole');
    this.consoleElmnt.classList.add('closedCoreConsole');

    this.consoleBtn.classList.remove('openCoreConsoleBtn');
    this.consoleBtn.classList.add('closedCoreConsoleBtn');

    this.consoleContentElmnt.classList.remove('openCoreConsoleContent');
    this.consoleContentElmnt.classList.add('closedCoreConsoleContent');

    this.consoleStatus = false;

    let buttonsToDisable = Array.from(this.consoleElmnt.querySelectorAll('button:not(.consoleImportantFocus), input:not(.consoleImportantFocus), select'));

    buttonsToDisable.map((option) => {
      option.tabIndex = '-1';
      option.blur();
    });
  }

  OpenConsole() {
    this.consoleElmnt.classList.remove('closedCoreConsole');
    this.consoleElmnt.classList.add('openCoreConsole');

    this.consoleBtn.classList.remove('closedCoreConsoleBtn');
    this.consoleBtn.classList.add('openCoreConsoleBtn');

    this.consoleContentElmnt.classList.remove('closedCoreConsoleContent');
    this.consoleContentElmnt.classList.add('openCoreConsoleContent');

    this.consoleStatus = true;

    let buttonsToDisable = Array.from(this.consoleElmnt.querySelectorAll('button:not(.consoleImportantFocus), input, select'));

    buttonsToDisable.map((option) => {
      option.tabIndex = '0';
    });
  }

  InitialAlign(flexDirect, consoleAlignCssVar, currAlign) {
    let root = document.querySelector(':root');

    currAlign = currAlign.toLowerCase();

    root.style.setProperty(flexDirect, 'row');
    root.style.setProperty(consoleAlignCssVar, currAlign);

    this.alignContent = currAlign;
    if (currAlign === 'center') {
      this.nextAlign = 'left';
    }
    else {
      this.nextAlign = 'center';
    }

    document.getElementById('consolePointer').innerHTML = this.consoleIndexSymbol;
  }

  ChangeAlign(consoleAlignCssVar) {
    let root = document.querySelector(':root');

    if (this.alignContent === 'center') {
      this.nextAlign = this.alignContent;
      this.alignContent = 'left';
    }
    else {
      this.nextAlign = this.alignContent;
      this.alignContent = 'center';
    }

    root.style.setProperty(consoleAlignCssVar, this.alignContent);
  }

  ClearConsoleEvent() {
    this.counter = -1;
    document.getElementById('consoleContent').innerHTML = '';
    this.InitializationMessage();
    this.AddNewLineToConsole('Test line');
  }

  ResizeConsole(consoleHeightCssVar, newHeight) {
    let root = document.querySelector(':root');
    root.style.setProperty(consoleHeightCssVar, newHeight);
    this.consoleSize = newHeight;
  }
}