import style from './style.scss';

function templateFn(options) {
  return `
    <div 
      class="mg-button mg-header__label ${style.buttonDelete}" 
      data-navigation-type="delete"
     >Delete ${options.count} messages</div>
    <div 
      class="mg-button mg-header__label ${style.buttonCancel}"
      data-navigation-type="cancel"
     >Cancel</div>
`;
}

export default templateFn;
