import invokeApi from '../../../invoke-api/invoke-api';
import template from './template';
import style from './style.scss';
import chatStyle from '../style.scss';
import NodeParser from '../node-parser/controller';

const KEY_CODE_ENTER = 13;

class FooterBar {

  /**
   * @param {Chat} owner
   */
  constructor(owner) {
    this.rootEl = owner.rootEl.querySelector(`.${chatStyle.panel}`);
    this.rootEl.innerHTML = template;

    this.id = owner.id;
    this.message = {};
    this.invokeApi = invokeApi;
    this.textarea = this.rootEl.querySelector(`.${style.textarea}`);
    this.sendBtn = this.rootEl.querySelector(`.${style.buttonSend}`);
    this._sendMessageHandler = this._sendMessageHandler.bind(this);

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
    this.textarea.innerHTML = '';
  }

  /**
   * Clears event listeners handlers
   */
  destroy() {
    this.sendBtn.removeEventListener('click', this._sendMessageHandler);
  }

  /**
   * Reads content in the textarea
   * @private
   */
  _read() {
    const content = this.textarea.innerHTML;
    const node = this._createNode(content);
    const parser = new NodeParser();
    this.content = parser.parse(node);
  }

  /**
   * Creates wrapper node
   * @param {string} content
   * @private
   */
  _createNode(content) {
    const node = document.createElement('div');
    node.innerHTML = content;
    return node;
  }

  /**
   * Attaches event listener
   * @private
   */
  _attachListener() {
    this.sendBtn.addEventListener('click', this._sendMessageHandler);
  }

  /**
   * Attaches handler for sending messages
   * @param {Object} event
   * @private
   */
  _sendMessageHandler(event) {
    if (event.type !== 'click' && event.which !== KEY_CODE_ENTER) {
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

    this.invokeApi.sendMessage(this.content, this.id);
  }
}

export default FooterBar;
