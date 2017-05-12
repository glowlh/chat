import style from './style.scss';

const backIcon = `
  <svg class="icon icon-back icon-30 icon-light">
   <title>Back</title>
   <use
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xlink:href="/assets/sprite/sprite.svg#back">
   </use>
  </svg>
`;

const template = `
  <div class="${style.root} mg-page">
    <div class="${style.chat} mg-container">
      <div class="${style.header}">
        <button 
          class="${style.buttonBack} mg-button"
          data-navigation-type="back">
            ${backIcon}
        </button>
        <div class="${style.manage}"></div>
      </div>
      
      <div class="${style.history} mg-custom-scrollbar"></div>
      
      <div class="${style.panel}"></div>
    </div>
  </div>
`;

export default template;
