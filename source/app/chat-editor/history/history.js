import templateFn from './template.pug';
import invokeApi from '../../invoke-api/invoke-api';

class History {

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
    this.invokeApi = invokeApi;
    this._attachListener();
  }

  /**
   * Attaches event listeners
   * @private
   */
  _attachListener() {
    document.addEventListener('chat.new', this._addChatHandler.bind(this), false);
    window.addEventListener('load', this._loadChatsHandler.bind(this), false);
  }

  /**
   * Attaches handler for loading chats to the history
   * @private
   */
  _loadChatsHandler() {
    this.invokeApi.getChats()
      .then((response) => {
        response.forEach((chat) => {
          this._addChat(chat);
        });
      });
  }

  /**
   * Attaches handler for adding chat
   * @param {Object} event
   * @private
   */
  _addChatHandler(event) {
    const data = event.data;
    this._addChat(data);
  }

  /**
   * Adds chat
   * @param {Object} data
   * @private
   */
  _addChat(data) {
    const element = document.createElement('div');
    element.innerHTML = templateFn(data);
    const chatNode = element.firstChild;

    this.rootEl.appendChild(chatNode);
  }
}

export default History;
