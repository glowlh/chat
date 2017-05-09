import templateChatItFn from './template-chat-item.pug';

import BasePage from '../base-page/base-page';
import invokeApi from '../invoke-api/invoke-api';
import chatTitlePrompt from './chat-title-prompt/controller';
import router from '../router/router';

const ATTR_DATA_CHAT = 'chatId';
const CLASS_CHAT = 'mg-chat-item';
const CLASS_CHAT_LIST = 'mg-history';
const CLASS_BUTTON_NEW_CHAT = 'mg-button--type--new-chat';

class ChatList extends BasePage {

  /**
   * Initialises main elements
   */
  init(root) {
    if (!(root instanceof HTMLElement)) {
      throw new TypeError(`${root} is not an HTMLElement`);
    }

    this.rootEl = root;
    this.listEl = this.rootEl.querySelector(`.${CLASS_CHAT_LIST}`);
    this.invokeApi = invokeApi;
    this.chatTitlePrompt = chatTitlePrompt;
    this._actionChatHandler = this._actionChatHandler.bind(this);
    this._onAddChat = this._onAddChat.bind(this);

    this._loadChats();
    this.attachListener();
  }

  /**
   * Clears chat list events
   * @private
   */
  destroy() {
    this.rootEl.removeEventListener('click', this._actionChatHandler);
    document.removeEventListener('chat.new', this._onAddChat);
    this.listEl.innerHTML = '';
  }

  /**
   * Attaches event listeners
   * @private
   */
  attachListener() {
    this.rootEl.addEventListener('click', this._actionChatHandler, false);
    document.addEventListener('chat.new', this._onAddChat, false);
  }

  /**
   * Attaches handler for clicking chat list page
   * @param event
   * @private
   */
  _actionChatHandler(event) {
    const target = event.target;
    const chatNode = target.closest(`.${CLASS_CHAT}`);
    const creationChatBtn = target.closest(`.${CLASS_BUTTON_NEW_CHAT}`);

    if (chatNode) {
      const id = chatNode.dataset[ATTR_DATA_CHAT];
      const prop = { id };

      router.go('chat', prop);
    }

    if (creationChatBtn) {
      this._actionCreateChat();
    }
  }

  /**
   * Attaches action for creating new chat element
   * @private
   */
  _actionCreateChat() {
    this.chatTitlePrompt.open()
      .then((title) => {
        this.invokeApi.createChat(title)
          .then(() => this.chatTitlePrompt.close());
      });
  }

  /**
   * Loads chats to the chat list page
   * @private
   */
  _loadChats() {
    this.invokeApi.getChats()
      .then(p => p.forEach(chat => this._addChat(chat)));
  }

  /**
   * Attaches handler for adding chat
   * @param {Object} event
   * @private
   */
  _onAddChat(event) {
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
    element.innerHTML = templateChatItFn(data);
    const chatNode = element.firstChild;

    this.listEl.appendChild(chatNode);
  }
}

export default ChatList;
