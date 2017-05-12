import style from './style.scss';

function templateFn(options) {
  return `
    <div class="${style.message}" data-message-id="${options.id}">
      <div class="${style.date}">${options.date}</div>
      <div class="${style.content}">${options.text}</div>
    </div>
  `;
}

export default templateFn;
