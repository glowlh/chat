import templateFn from './template.pug';

import invokeApi from '../../invoke-api/invoke-api';

const CLASS_INPUT_FIELD = 'mg-input-text';
const CLASS_BUTTON_SUBMIT = 'mg-input-submit';
const CLASS_BUTTON_CLOSE = 'mg-closer';

class ChatTitlePrompt {

  constructor() {
    this.rootEl = document.querySelector('body');
    this.invokeApi = invokeApi;

    this._cancelHandler = this._cancelHandler.bind(this);
    this._keyupHandler = this._keyupHandler.bind(this);
    this._okHandler = this._okHandler.bind(this);
  }

  /**
   * Opens modal window
   * @returns {Promise}
   */
  open() {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });
    this._deferred = deferred;

    const element = document.createElement('div');
    element.innerHTML = templateFn();
    this.container = element.firstChild;
    this.closeBtn = this.container.querySelector(`.${CLASS_BUTTON_CLOSE}`);

    this.rootEl.appendChild(this.container);
    this._readForm();
    this._attachListener();
  
    return this._deferred.promise;
  }

  /**
   * Closes modal window
   */
  close() {
    this.container.remove();
    this._removeListeners();
  }

  /**
   * Removes event listeners
   * @private
   */
  _removeListeners() {
    this.closeBtn.removeEventListener('click', this._cancelHandler, false);
    this.inputField.removeEventListener('keyup', this._keyupHandler, false);
    this.form.removeEventListener('submit', this._okHandler, false);
  }

  /**
   * Attaches event listeners
   * @private
   */
  _attachListener() {
    this.closeBtn.addEventListener('click', this._cancelHandler, false);
    this.inputField.addEventListener('keyup', this._keyupHandler, false);
    this.form.addEventListener('submit', this._okHandler, false);
  }

  /**
   * Attaches handler for clicking close btn - cancels chat title creation
   * @private
   */
  _cancelHandler() {
    this._actionClose();
  }

  /**
   * Attaches action for closing modal window
   * @private
   */
  _actionClose() {
    this.close();
    this._deferred.reject();
  }

  /**
   * Attaches handler for submitting form
   * @param event
   * @private
   */
  _okHandler(event) {
    event.preventDefault();

    const title =  this.inputField.value;
    this._deferred.resolve(title);
  }

  /**
   * Reads form nodes
   * @private
   */
  _readForm() {
    this.form = this.container.querySelector('form');
    this.inputField = this.form.querySelector(`.${CLASS_INPUT_FIELD}`);
    this.submitBtn = this.form.querySelector(`.${CLASS_BUTTON_SUBMIT}`);
  }

  /**
   * @private
   */
  _keyupHandler() {
    const fieldValue = this.inputField.value;

    this.submitBtn.disabled = !fieldValue.trim();
  }
}

const chatTitlePrompt = new ChatTitlePrompt();
export default chatTitlePrompt;
