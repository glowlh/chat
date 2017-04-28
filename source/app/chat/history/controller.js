import invokeApi from '../../invoke-api/invoke-api';
import HeaderBar from '../header-bar/controller';
import SelectedMessages from './history.selected-messages';
import Message from '../message/controller';

const DATA_MESSAGE_ATTR = 'messageId';
const SELECTOR_MESSAGE = '.mg-message';
const SELECTOR_HEADER = '.mg-header';

class History {

  /**
   * @param {HTMLElement} element - parent node for history block
   * @param {String} id
   */
  constructor(element, id) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
    this.id = id;

    const header = document.querySelector(SELECTOR_HEADER);
    this.headerBar = new HeaderBar(header, this.id);
    this.selectedMessages = new SelectedMessages();

    this.invokeApi = invokeApi;
    this.messages = new Map();

    this._attachListener();
    this._loadMessages();
  }

  /**
   * Adds message to history
   * @param {Object} data - sending message data
   */
  add(data) {
    this._read(data);
    this._render(data.id);
  }

  /**
   * Reads data about sending message
   * @param {Object} options - sending message data
   * @private
   */
  _read(options) {
    const message = new Message(options);
    const id = options.id;

    this.messages.set(id, message);
  }

  /**
   * Renders message block
   * @param {String} id - message id
   * @private
   */
  _render(id) {
    const message = this.messages.get(id);
    const node = message.node;

    this.rootEl.appendChild(node);
  }

  /**
   * Attaches event listeners
   * @private
   */
  _attachListener() {
    this.rootEl.addEventListener('click', this._toggleSelectedHandler.bind(this), false);
    document.addEventListener('message.new', this._onAddMessage.bind(this));
    document.addEventListener('messages.delete', this._onRemoveMessages.bind(this));
  }

  /**
   * Attaches handler for sending messages
   * @param {Object} event
   */
  _onAddMessage(event) {
    this.add(event.data);
  }

  /**
   * Attaches handler for loading messages to the history
   * @private
   */
  _loadMessages() {
    this.invokeApi.getMessages(this.id)
      .then((response) => {
        response.forEach((message) => {
          message.date = new Date(message.date);

          this.add(message);
        });
      });
  }

  /**
   * Attaches handler for removing selected messages from the history
   * @private
   */
  _onRemoveMessages() {
    this._remove();
  }

  /**
   * Removes selected messages
   * @private
   */
  _remove() {
    this.selectedMessages.remove();
  }

  /**
   * Attaches handler for toggling selected messages
   * @param {Object} event
   * @private
   */
  _toggleSelectedHandler(event) {
    const target = event.target;
    const messageNode = target.closest(SELECTOR_MESSAGE);

    if (!messageNode) {
      return;
    }

    const id = messageNode.dataset[DATA_MESSAGE_ATTR];
    const message = this.messages.get(id);
    this.selectedMessages.toggle(message);

    this.headerBar.setSelected(this.selectedMessages);
  }
}

export default History;
