import style from './style.scss';

function templateFn(options) {
  return `
    <div class="${style.chatItem}" data-chat-id="${options.id}">
      <div class="${style.title}">${options.title}</div>       
    </div>
  `;
}

export default templateFn;
