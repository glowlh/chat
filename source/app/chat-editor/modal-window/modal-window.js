import templateFn from './template.pug';
import invokeApi from '../../invoke-api/invoke-api';

const DATA_BUTTON_ACTION_ATTR = 'chatEditor';
const SELECTOR_INPUT_FIELD = '.mg-input-text';
const SELECTOR_BUTTON_EL = '.mg-button';
const SELECTOR_BUTTON_SUBMIT = '.mg-input-submit';

class ModalWindow {

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
    this.invokeApi = invokeApi;
  }

  open() {
    const element = document.createElement('div');
    element.innerHTML = templateFn();
    this.container = element.firstChild;

    this.rootEl.appendChild(this.container);
    this._readForm();
    this._attachListener();
  }

  close() {
    this.container.remove();
  }
  
  _attachListener() {
    this.container.addEventListener('click', this._actionHandler.bind(this), false);
    this.inputField.addEventListener('keyup', this._changeInputFieldValueHandler.bind(this), false);
    this.form.addEventListener('submit', this._submitFormHandler.bind(this), false);
  }

  _actionHandler(event) {
    const target = event.target;
    const element = target.closest(SELECTOR_BUTTON_EL);
    if (!element) {
      return;
    }

    const actionType = element.dataset[DATA_BUTTON_ACTION_ATTR];
    if (actionType === 'close') {
      this._actionClose();
    }
  }

  _actionClose() {
    this.close();
  }

  _actionCreate() {
    const title =  this.inputField.value;
    this.invokeApi.createChat(title)
      .then(() => this.close());
  }

  _submitFormHandler(event) {
    event.preventDefault();
    this._actionCreate();
  }

  _readForm() {
    this.form = this.container.querySelector('form');
    this.inputField = this.form.querySelector(SELECTOR_INPUT_FIELD);
    this.submitBtn = this.form.querySelector(SELECTOR_BUTTON_SUBMIT);
  }

  _changeInputFieldValueHandler() {
    const fieldValue = this.inputField.value;
    if (!fieldValue.trim()) {
      this.submitBtn.disabled = true;
      return;
    }

    this.submitBtn.disabled = false;
  }
}

const element = document.querySelector('body');
const modalWindow = new ModalWindow(element);
export default modalWindow;
