import invokeApi from '../../../invoke-api/invoke-api';
import template from './template';
import style from './style.scss';

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
    element.innerHTML = template;
    this.container = element.querySelector(`.${style.root}`);
    this.closeBtn = this.container.querySelector(`.${style.closeButton}`);

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
   * Closes modal window
   * @private
   */
  _cancelHandler() {
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

    const title = this.inputField.value.trim();
    this._deferred.resolve(title);
  }

  /**
   * Reads form nodes
   * @private
   */
  _readForm() {
    this.form = this.container.querySelector('form');
    this.inputField = this.form.querySelector(`.${style.field}`);
    this.submitBtn = this.form.querySelector(`.${style.submitButton}`);
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
