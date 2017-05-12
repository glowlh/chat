import invokeApi from '../../../invoke-api/invoke-api';
import SelectedMessages from './history.selected-messages';
import Message from '../message/controller';
import messageStyle from '../message/style.scss';
import style from '../style.scss';

const DATA_MESSAGE_ATTR = 'messageId';

class History {

  /**
   * @param {Chat} owner
   */
  constructor(owner) {
    this.rootEl = owner.rootEl.querySelector(`.${style.history}`);
    this.id = owner.id;
    this.owner = owner;

    this.selectedMessages = new SelectedMessages();

    this._toggleSelectedHandler = this._toggleSelectedHandler.bind(this);
    this._onAddMessage = this._onAddMessage.bind(this);
    this._onRemoveMessages = this._onRemoveMessages.bind(this);

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
    this._scrollToBottom();
  }

  /**
   * Destroys dependencies
   */
  destroy() {
    this.rootEl.removeEventListener('click', this._toggleSelectedHandler);
    document.removeEventListener('message.new', this._onAddMessage);
    document.removeEventListener('messages.delete', this._onRemoveMessages);
    this.rootEl.innerHTML = '';
  }

  /**
   * Attaches event listeners
   * @private
   */
  _attachListener() {
    this.rootEl.addEventListener('click', this._toggleSelectedHandler, false);
    document.addEventListener('message.new', this._onAddMessage, false);
    document.addEventListener('messages.delete', this._onRemoveMessages, false);
  }

  /**
   * Attaches event listeners
   * @private
   */
  _scrollToBottom() {
    const scrollHeight = this.rootEl.scrollHeight;
    const heigth = this.rootEl.clientHeight;

    this.rootEl.scrollTop = scrollHeight - heigth;
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
    const messageNode = target.closest(`.${messageStyle.message}`);

    if (!messageNode) {
      return;
    }

    const id = messageNode.dataset[DATA_MESSAGE_ATTR];
    const message = this.messages.get(id);
    this.selectedMessages.toggle(message);

    this.owner.select(this.selectedMessages);
  }
}

export default History;
