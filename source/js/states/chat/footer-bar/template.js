import style from './style.scss';

const sendIcon = `
  <svg class="icon icon-send icon-30 icon-light">
   <title>Send</title>
   <use
     xmlns:xlink="http://www.w3.org/1999/xlink"
     xlink:href="/assets/sprite/sprite.svg#send">
   </use>
  </svg>
`;

const template = `
  <div 
    class="${style.textarea} mg-custom-scrollbar" 
    placeholder="Type your message..."
    contenteditable="true"></div>
  <button class="${style.buttonSend} mg-button">
    ${sendIcon}
  </button>
`;

export default template;
