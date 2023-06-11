
export default class MenuItem {
   constructor(menuObj) {
      this.menuObj = menuObj;
      this.itemsOfThisMenuItemAr = [];
      this.itemSrc = [];
   }

   AddHeadMenuItem(header, src) {
      this.header = header;
      this.headerSrc = src;
   }

   HeadButtonEvent() {
      let item = document.getElementById(this.menuItemId);
      let content = item.querySelector('.menuSpecificContent');
      let eachSpecificItem = content.querySelectorAll('.menuSpecificBtn');

      if (content.classList.contains('openSpecificContent')) {
         content.classList.remove('openSpecificContent');
         content.classList.add('closedSpecificContent');

         eachSpecificItem.forEach((item) => {
            item.tabIndex = -1;
         });
      }
      else {
         content.classList.remove('closedSpecificContent');
         content.classList.add('openSpecificContent');

         eachSpecificItem.forEach((item) => {
            item.tabIndex = 0;
         });
      }
   }

   AddElemntsToMenuItem(item, src) {
      this.itemsOfThisMenuItemAr.push(item);
      this.itemSrc.push(src);
   }

   LoadFileButtonEvent(i) {
      document.getElementById('iframeContent').src = this.itemSrc[i];
      //    let scriptToLoad = document.getElementById('scriptToLoad');
      //    let src = this.headerSrc + this.itemSrc[i];

      //    var httpRequest = new XMLHttpRequest();
      //    httpRequest.open('HEAD', src, false);
      //    httpRequest.onload = (e) => {
      //       if (httpRequest.readyState === 4) {
      //          if (httpRequest.status === 200) {
      //             this.ReloadChosenFile(src);
      //          }
      //          else {

      //          }
      //       }
      //    }
      //    httpRequest.send(null);
   }

   ReloadChosenFile(src) {
      // LOAD MENU STATUS TO LOCAL STORAGE
      localStorage.setItem('overallMenuStatus', this.menuObj.GetMenuCurrentStatus());

      // LOAD SCRIPT SOURCE TO LOCAL STORAGE
      localStorage.setItem('currScript', src);
      window.location.reload();
   }

   AddMenuItemToHtml(elemnt) {
      let sumHTMLItem = '';
      for (let i = 0; i < this.itemsOfThisMenuItemAr.length; i++) {
         sumHTMLItem += `
            <button class='menuSpecificBtn'>
               <p class='menuSpecificText'>${this.itemsOfThisMenuItemAr[i]}</p>
            </button>
         `;
      }

      this.menuItemId = 'menuItem' + this.header;
      this.menuItemId = this.menuItemId.replaceAll(' ', '');
      elemnt.innerHTML = `
         <div class='menuItem' id=${this.menuItemId}>
            <button class='menuHeaderBtn'>
               <h3 class='menuHeader'>
                  ${this.header}
                  <sup>[${this.itemsOfThisMenuItemAr.length}]</sup>
               </h3>
            </button>
            <div class='menuSpecificContent openSpecificContent'>
               ${sumHTMLItem}
            </div>
         </div>
      `;

      const headBtn = document.getElementById(this.menuItemId).querySelectorAll('button')[0];

      headBtn.addEventListener('click', () => {
         this.HeadButtonEvent();
      });

      for (let i = 0; i < this.itemsOfThisMenuItemAr.length; i++) {
         let contentItem = document.getElementById(this.menuItemId).querySelectorAll('.menuSpecificBtn')[i];

         contentItem.addEventListener('click', () => {
            this.LoadFileButtonEvent(i);
         });
      }
   }
}