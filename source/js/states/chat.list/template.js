import style from './style.scss';

const createChatIcon = `
  <svg class="icon icon-new-chat icon-30 icon-light">
   <title>Create</title>
   <use
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xlink:href="/assets/sprite/sprite.svg#new-chat">
   </use>
  </svg>
`;

const template = `
  <div class="${style.root} mg-page">
    <div class="${style.chatEditor} mg-container">
      <div class="${style.header}">
        <button class="${style.buttonCreateChat}">
          ${createChatIcon}
        </button>
      </div>
      <div class="${style.history} mg-custom-scrollbar"></div>
    </div>
  </div>
`;

export default template;
