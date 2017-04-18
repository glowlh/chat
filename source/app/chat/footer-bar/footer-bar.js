import invokeApi from '../../invoke-api/invoke-api';

const SELECTOR_TEXTAREA = '.mg-textarea';
const SELECTOR_SEND_BUTTON = '.mg-panel__send';

class FooterBar {

  /**
   * @param {HTMLElement} element - parent node for editor block
   */
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
    this.message = {};
    this.invokeApi = invokeApi;
    this.textarea = this.rootEl.querySelector(SELECTOR_TEXTAREA);
    this.sendBtn = this.rootEl.querySelector(SELECTOR_SEND_BUTTON);

    this._attachListener();
  }

  /**
   * Clears textarea
   */
  clear() {
    if (!this.content) {
      return;
    }

    this.content = '';
    this.textarea.value = '';
  }

  /**
   * Reads content in the textarea
   * @private
   */
  _read() {
    this.content = this.textarea.value;
  }

  /**
   * Attaches event listener
   * @private
   */
  _attachListener() {
    this.sendBtn.addEventListener('click', this._sendMessageHandler.bind(this), false);
    document.addEventListener('keyup', this._sendMessageHandler.bind(this), false);
  }

  /**
   * Attaches handler for sending messages
   * @param {Object} event
   * @private
   */
  _sendMessageHandler(event) {
    if(event.type !== 'click' && event.which !== 13) {
      return;
    }

    this._read();
    this._sendMessage();
    this.clear();
  }

  /**
   * Sends message
   * @private
   */
  _sendMessage() {
    if (!this.content.trim()) {
      return;
    }

    this.invokeApi.sendMessage(this.content);
  }
}

export default FooterBar;
