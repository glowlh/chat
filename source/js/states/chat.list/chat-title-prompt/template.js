import style from './style.scss';

const closeIcon = `
<svg class="icon icon-close icon-10 icon-dark">
  <title>close</title>
  <use
    xmlns:xlink="http://www.w3.org/1999/xlink"
    xlink:href="/assets/sprite/sprite.svg#close">
  </use>
</svg>
`;

const template = `
<div class="${style.root}">
  <div class="${style.container}">
    <div
      class="${style.closeButton} mg-button"
      data-chat-editor="close"
    >${closeIcon}</div>
    
    <h2 class="${style.title}">Chat creation</h2>
    
    <form
      action="/"
      name="form-new-chat"
      class="mg-form ${style.form}"
    >
      <input
        type="text"
        placeholder='Type chat title...'
        class="${style.field}"
      >
      <button
        type='submit'
        disabled='disabled'
        data-chat-editor='create'
        class="${style.submitButton}"
      >Create</button>
    </form>
  </div>
</div>
`;

export default template;
