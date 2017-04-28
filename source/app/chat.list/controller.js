import templateFn from './template.pug';

import invokeApi from '../invoke-api/invoke-api';
import chatTitlePrompt from './chat-title-prompt/controller';
import chat from '../chat/controller';
import router from '../router/router';

const ATTR_DATA_CHAT = 'chatId';
const CLASS_ROOT = 'mg-app__chat-list';
const CLASS_CHAT = 'mg-chat-item';
const CLASS_CHAT_LIST = 'mg-history';
const CLASS_BUTTON_NEW_CHAT = 'mg-button--type--new-chat';

class ChatList {

  /**
   * Initialises main elements
   */
  init() {
    this.rootEl = document.querySelector(`.${CLASS_ROOT}`);
    this.listEl = this.rootEl.querySelector(`.${CLASS_CHAT_LIST}`);
    this.invokeApi = invokeApi;
    this.chatTitlePrompt = chatTitlePrompt;
    this._actionChatHandler = this._actionChatHandler.bind(this);
    this._onAddChat = this._onAddChat.bind(this);

    this._loadChats();
    this.attachListener();
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
   * Clears chat list events
   * @private
   */
  _clearListeners() {
    this.rootEl.removeEventListener('click', this._actionChatHandler);
    document.removeEventListener('chat.new', this._onAddChat);
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
      this._actionOpenChat(chatNode);
    }

    if (creationChatBtn) {
      this._actionCreateChat();
    }
  }

  /**
   * Attaches action for opening chat page
   * @param node
   * @private
   */
  _actionOpenChat(node) {
    const id = node.dataset[ATTR_DATA_CHAT];

    router.go('chat');
    chat.init(id);

    this._clearListeners();
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
    element.innerHTML = templateFn(data);
    const chatNode = element.firstChild;

    this.listEl.appendChild(chatNode);
  }
}

const chatList = new ChatList();
export default chatList;
