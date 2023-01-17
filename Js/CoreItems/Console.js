
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

      let importantLine = null;
      if (typeOfMsg === 'msg') {
        importantLine = '';

        this.consoleContentElmnt.innerHTML += `
            <hr>
            <div class='newConsoleLine'>
               <span class='consoleCountPointer'>${finalCountForm}</span>
               <div class='consoleLineContent newConsoleLinePar' id='consoleObj${this.counter}'></div>
            </div>
            ${consolePointerLine}
            `;

        let parentOfObj = document.getElementById(`consoleObj${this.counter}`);
        parentOfObj.classList.add('firstObjOfThisLine');

        let consoleObjIdElmnts = { mainC: this.counter, secondaryC: 0 };
        const consoleObj = new ConsoleLine(parentOfObj, line, consoleObjIdElmnts, this);
        consoleObj.start();
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

class ConsoleLine {
  constructor(parentOfObj, obj, thisIdElmtns, consoleObj) {
    this.parentOfObj = parentOfObj;
    this.obj = obj;
    this.thisIdElmtns = thisIdElmtns;
    this.consoleObj = consoleObj;

    // IN VARS
    this.typeOf = null;
    this.btn;
    this.uniqueId = this.thisIdElmtns.mainC + '' + this.thisIdElmtns.secondaryC;
    this.nonObjImportantChildsCounter = 0;
  }

  start() {
    if (typeof this.obj === 'object' && this.obj !== null) {
      if (this.isNode(this.obj)) {
        this.typeOf = 'dom';
        this.lineIsDom();
      }
      else if (this.isNodeList(this.obj)) {
        this.typeOf = 'nodeList';
        this.lineIsArrayList();
      }
      else if (Array.isArray(this.obj)) {
        this.typeOf = 'arrList';
        this.lineIsArrayList();
      }
      else {
        this.typeOf = 'sObj';
        this.lineIsSimpleObject();
      }
    }
    else if (typeof this.obj === 'boolean') {
      this.typeOf = 'boolean';
      this.lineIsBoolean();
    }
    else if (typeof this.obj === 'number') {
      this.typeOf = 'number';
      this.lineIsNumber();
    }
    else if (typeof this.obj === 'string') {
      this.typeOf = 'string';
      this.lineIsString();
    }
  }

  // CHECKS CONTROL
  isNode(key) {
    return (typeof Node === 'object' ? key instanceof Node : key && typeof key === 'object' && typeof key.nodeType === 'number' && typeof key.nodeName === 'string');
  }
  isNodeList(key) {
    return (key instanceof NodeList);
  }



  // CONSOLE LINE ACTION TO NODE OBJ
  lineIsDom() {
    let currObjELmnt = this.parentOfObj;
    let objsChild = this.obj;

    const uniqueInId = this.uniqueId; //+ '' + this.nonObjImportantChildsCounter;
    const tagN = objsChild.tagName.toLowerCase();
    let id = '';
    if (objsChild.id !== '') {
      id = '#' + objsChild.id;
    }
    let classesAr = null;
    let classes = '';

    classesAr = objsChild.className.split(' ');

    classesAr.map((value) => {
      if (value !== '') {
        classes += '.' + value;
      }
    });

    // CREATE HTML PROTOTYPE
    let spanDom = document.createElement('span');
    spanDom.id = 'consoleDomWrap' + uniqueInId;
    spanDom.className = 'consoleDomWrap';
    currObjELmnt.appendChild(spanDom);

    let spanTagN = document.createElement('span');
    spanDom.id = 'consoleDomTagN' + uniqueInId;
    spanTagN.className = 'consoleDomTagN';
    spanTagN.innerHTML = tagN;
    spanDom.appendChild(spanTagN);

    let spanId = document.createElement('span');
    spanId.id = 'consoleDomId' + uniqueInId;
    spanId.className = 'consoleDomId';
    spanId.innerHTML = id;
    // spanDom.innerHTML += '_';
    spanDom.appendChild(spanId);

    let spanClasses = document.createElement('span');
    spanClasses.id = 'consoleDomClasses' + uniqueInId;
    spanClasses.className = 'consoleDomClasses';
    spanClasses.innerHTML = classes;
    spanDom.appendChild(spanClasses);

    const thisObj = this;
    document.addEventListener('mouseover', function (e) {
      const target = e.target.closest('#' + spanDom.id);

      if (target) {
        objsChild.classList.add('consoleDomHoverMouse');

        // GET ALL PARENTS AND THEN FORCE THEM TO OVERFLOW
        let helper = objsChild;
        const parents = [];

        while (helper) {
          parents.unshift(helper);
          helper = helper.parentNode;
        }

        // console.log(parents); parents.splice(0, 3);
        parents.map((value) => {
          objsChild.classList.add('consoleDomHoverMouseOverflowForce');
        });
      }
    });

    document.addEventListener('mouseout', function (e) {
      const target = e.target.closest('#' + spanDom.id);

      if (target) {
        objsChild.classList.remove('consoleDomHoverMouse');

        // GET ALL PARENTS AND THEN RELEASE THEM FROM OVERFLOW
        let helper = objsChild;
        const parents = [];

        while (helper) {
          parents.unshift(helper);
          helper = helper.parentNode;
        }

        parents.splice(0, 3);
        parents.map((value) => {
          objsChild.classList.remove('consoleDomHoverMouseOverflowForce');
        });
      }
    });

    // this.nonObjImportantChildsCounter++;
  }

  // CONSOLE LINE ACTION TO NODELIST
  lineIsNodeList() {
    this.lineIsSimpleObject();
  }

  // CONSOLE LINE ACTION TO ARRAYLIST
  lineIsArrayList() {
    // CREATE THE MAIN CORE OF HTML CONSOLE OBJECT LINE
    let wholeLineObj = document.createElement('div');
    wholeLineObj.className = 'consoleObjLine';
    wholeLineObj.id = 'consoleObjLine' + this.uniqueId;

    let wrapOfBtn = document.createElement('div');
    wrapOfBtn.className = 'beforeConsoleObjBtn';
    wrapOfBtn.id = 'beforeConsoleObjBtn' + this.uniqueId;
    if (this.parentOfObj.classList.contains('firstObjOfThisLine')) {
      wrapOfBtn.classList.add('beforeConsoleObjBtnFirst');
    }
    wholeLineObj.appendChild(wrapOfBtn);
    let btn = document.createElement('button');
    btn.className = 'consoleObjBtn';
    wrapOfBtn.appendChild(btn);
    btn.id = 'consoleObjBtn' + this.uniqueId;
    let btnImg = document.createElement('img');
    btnImg.className = 'consoleObjBtnImg';
    btnImg.id = 'consoleObjBtnImg' + this.uniqueId;
    btn.appendChild(btnImg);
    let btnPar = document.createElement('span');
    btnPar.className = 'consoleLineArrayParenthesis';
    btnPar.id = 'consoleLineArrayParenthesis' + this.uniqueId;
    btnPar.innerHTML = `(${this.obj.length})`;
    btn.appendChild(btnPar);
    let btnP = document.createElement('p');
    btnP.className = 'consoleObjBtnP';
    btnP.id = 'consoleObjBtnP' + this.uniqueId;
    btnP.innerHTML = this.obj.constructor.name;
    btn.appendChild(btnP);

    let wrapObjInfo = document.createElement('span');
    wrapObjInfo.className = 'consoleObjLineWrapInfo closedConsoleObjLineInfo';
    wrapObjInfo.id = 'consoleObjLineWrapInfo' + this.uniqueId;
    wholeLineObj.appendChild(wrapObjInfo);
    let objInfo = document.createElement('div');
    objInfo.className = 'consoleObjLineInfo';
    objInfo.id = 'consoleObjLineInfo' + this.uniqueId;
    wrapObjInfo.appendChild(objInfo);

    const thisObj = this;
    // ADD CONSOLEOBJLINE'S BTN EVENT
    document.addEventListener('click', function (e) {
      const target = e.target.closest('#' + btn.id);

      if (target) {
        const store = {
          wholeLineObj: document.querySelector('#consoleObjLine' + thisObj.uniqueId),
          wrapOfBtn: document.querySelector('#beforeConsoleObjBtn' + thisObj.uniqueId),
          btn: document.querySelector('#consoleObjBtn' + thisObj.uniqueId),
          btnImg: document.querySelector('#consoleObjBtnImg' + thisObj.uniqueId),
          btnP: document.querySelector('#consoleObjBtnP' + thisObj.uniqueId),
          wrapObjInfo: document.querySelector('#consoleObjLineWrapInfo' + thisObj.uniqueId),
          objInfo: document.querySelector('#consoleObjLineInfo' + thisObj.uniqueId)
        };

        store.btnP.classList.toggle('consoleObjBtnDecorate');
        store.btnImg.classList.toggle('consoleObjBtnOpenedImg');

        store.wrapObjInfo.classList.toggle('closedConsoleObjLineInfo');

        if (store.btnImg.classList.contains('consoleObjBtnOpenedImg')) {
          // OBJ'S CHILDREN CHECK
          for (const [key, value] of Object.entries(thisObj.obj)) {
            // OBJ'S CHILD PROTOTYPE
            let lineOfObj = document.createElement('p');
            store.objInfo.appendChild(lineOfObj);

            let keyObj = document.createElement('span');
            keyObj.className = 'consoleObjLineLeftSp';
            keyObj.innerHTML = key;
            lineOfObj.appendChild(keyObj);
            let splitObj = document.createElement('span');
            splitObj.className = 'consoleObjLineMidSp';
            splitObj.innerHTML = ':';
            lineOfObj.appendChild(splitObj);
            let valueObj = document.createElement('span');
            valueObj.className = 'consoleObjLineRightSp insideConsoleObjLine';
            lineOfObj.appendChild(valueObj);

            thisObj.createChildConsoleLine(valueObj, value);
          }

          // ADD LINE FOR LENGTH
          let lineOfObj = document.createElement('p');
          store.objInfo.appendChild(lineOfObj);

          let keyObj = document.createElement('span');
          keyObj.className = 'consoleObjLineSecondary';
          keyObj.innerHTML = 'length';
          lineOfObj.appendChild(keyObj);
          let splitObj = document.createElement('span');
          splitObj.className = 'consoleObjLineMidSp';
          splitObj.innerHTML = ':';
          lineOfObj.appendChild(splitObj);
          let valueObj = document.createElement('span');
          valueObj.className = 'consoleObjLineRightSp insideConsoleObjLine';
          lineOfObj.appendChild(valueObj);

          thisObj.createChildConsoleLine(valueObj, thisObj.obj.length);

          // ADD LINE FOR PROTOTYPE OF OBJECT
          let protLineOfObj = document.createElement('p');
          store.objInfo.appendChild(protLineOfObj);

          let protKeyObj = document.createElement('span');
          protKeyObj.className = 'consoleObjLineSecondary';
          protKeyObj.innerHTML = '[[Prototype]]';
          protLineOfObj.appendChild(protKeyObj);
          let protSplitObj = document.createElement('span');
          protSplitObj.className = 'consoleObjLineMidSp';
          protSplitObj.innerHTML = ':';
          protLineOfObj.appendChild(protSplitObj);
          let protValueObj = document.createElement('span');
          protValueObj.className = 'consoleObjLineRightSp insideConsoleObjLine';
          protLineOfObj.appendChild(protValueObj);

          console.log(thisObj.obj);
          thisObj.createChildConsoleLine(protValueObj, thisObj.obj.prototype);
        }
        else {
          store.objInfo.innerHTML = '';
        }
      }
    });

    this.parentOfObj.appendChild(wholeLineObj);
  }

  // CONSOLE LINE ACTION TO CASUAL OBJ
  lineIsSimpleObject() {
    // CREATE THE MAIN CORE OF HTML CONSOLE OBJECT LINE
    let wholeLineObj = document.createElement('div');
    wholeLineObj.className = 'consoleObjLine';
    wholeLineObj.id = 'consoleObjLine' + this.uniqueId;

    let wrapOfBtn = document.createElement('div');
    wrapOfBtn.className = 'beforeConsoleObjBtn';
    wrapOfBtn.id = 'beforeConsoleObjBtn' + this.uniqueId;
    if (this.parentOfObj.classList.contains('firstObjOfThisLine')) {
      wrapOfBtn.classList.add('beforeConsoleObjBtnFirst');
    }
    wholeLineObj.appendChild(wrapOfBtn);
    let btn = document.createElement('button');
    btn.className = 'consoleObjBtn';
    wrapOfBtn.appendChild(btn);
    btn.id = 'consoleObjBtn' + this.uniqueId;
    let btnImg = document.createElement('img');
    btnImg.className = 'consoleObjBtnImg';
    btnImg.id = 'consoleObjBtnImg' + this.uniqueId;
    btn.appendChild(btnImg);
    let btnP = document.createElement('p');
    btnP.className = 'consoleObjBtnP';
    btnP.id = 'consoleObjBtnP' + this.uniqueId;
    btnP.innerHTML = this.obj.constructor.name;
    btn.appendChild(btnP);

    let wrapObjInfo = document.createElement('span');
    wrapObjInfo.className = 'consoleObjLineWrapInfo closedConsoleObjLineInfo';
    wrapObjInfo.id = 'consoleObjLineWrapInfo' + this.uniqueId;
    wholeLineObj.appendChild(wrapObjInfo);
    let objInfo = document.createElement('div');
    objInfo.className = 'consoleObjLineInfo';
    objInfo.id = 'consoleObjLineInfo' + this.uniqueId;
    wrapObjInfo.appendChild(objInfo);

    const thisObj = this;
    // ADD CONSOLEOBJLINE'S BTN EVENT
    document.addEventListener('click', function (e) {
      const target = e.target.closest('#' + btn.id);

      if (target) {
        const store = {
          wholeLineObj: document.querySelector('#consoleObjLine' + thisObj.uniqueId),
          wrapOfBtn: document.querySelector('#beforeConsoleObjBtn' + thisObj.uniqueId),
          btn: document.querySelector('#consoleObjBtn' + thisObj.uniqueId),
          btnImg: document.querySelector('#consoleObjBtnImg' + thisObj.uniqueId),
          btnP: document.querySelector('#consoleObjBtnP' + thisObj.uniqueId),
          wrapObjInfo: document.querySelector('#consoleObjLineWrapInfo' + thisObj.uniqueId),
          objInfo: document.querySelector('#consoleObjLineInfo' + thisObj.uniqueId)
        };

        store.btn.classList.toggle('consoleObjBtnDecorate');
        store.btnImg.classList.toggle('consoleObjBtnOpenedImg');

        store.wrapObjInfo.classList.toggle('closedConsoleObjLineInfo');

        if (store.btnImg.classList.contains('consoleObjBtnOpenedImg')) {
          // OBJ'S CHILDREN CHECK
          for (const [key, value] of Object.entries(thisObj.obj)) {
            // OBJ'S CHILD PROTOTYPE
            let lineOfObj = document.createElement('p');
            store.objInfo.appendChild(lineOfObj);

            let keyObj = document.createElement('span');
            keyObj.className = 'consoleObjLineLeftSp';
            keyObj.innerHTML = key;
            lineOfObj.appendChild(keyObj);
            let splitObj = document.createElement('span');
            splitObj.className = 'consoleObjLineMidSp';
            splitObj.innerHTML = ':';
            lineOfObj.appendChild(splitObj);
            let valueObj = document.createElement('span');
            valueObj.className = 'consoleObjLineRightSp insideConsoleObjLine';
            lineOfObj.appendChild(valueObj);

            thisObj.childObj = valueObj;

            thisObj.createChildConsoleLine(valueObj, value);
          }
        }
        else {
          store.objInfo.innerHTML = '';
        }
      }
    });

    this.parentOfObj.appendChild(wholeLineObj);
  }

  // CONSOLE ACTION TO BOOLEAN
  lineIsBoolean() {
    this.parentOfObj.innerHTML = this.obj;

    // STYLING
    this.parentOfObj.style.color = 'rgb(121, 61, 121)';
  }

  // CONSOLE ACTION TO NUMBER
  lineIsNumber() {
    this.parentOfObj.innerHTML = this.obj;

    // STYLING
    this.parentOfObj.style.color = 'cyan';
  }

  // CONSOLE ACTION TO STRING
  lineIsString() {
    this.parentOfObj.innerHTML = "'" + this.obj + "'";

    // STYLING
    this.parentOfObj.style.color = 'rgb(255, 166, 0)';
  }



  increaseThisIdElmtnsSecCopy() {
    let copy = this.thisIdElmtns;
    copy.secondaryC++;
    return copy;
  }

  createChildConsoleLine(currObjELmnt, objsChild) {
    let newthisIdElmtns = this.increaseThisIdElmtnsSecCopy();
    const childObj = new ConsoleLine(currObjELmnt, objsChild, newthisIdElmtns, this.consoleObj);
    childObj.start();
  }
}