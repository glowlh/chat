const LOCAL_STORAGE_ITEM_NAME = 'chats';
const ID_NAME_MESSAGE_PREFIX = 'message';
const ID_NAME_CHAT_PREFIX = 'chat';

class Server {

  constructor() {
    this.initListeners();
  }

  /**
   * Initializes event listeners
   */
  initListeners() {
    document.addEventListener('server.messages.get', this.onGetMessages.bind(this), false);
    document.addEventListener('server.messages.delete', this.onDeleteMessages.bind(this), false);
    document.addEventListener('server.message.send', this.onSendMessage.bind(this), false);
    document.addEventListener('server.chat.create', this.onCreateChat.bind(this), false);
    document.addEventListener('server.chats.get', this.onGetChats.bind(this), false);
  }

  /**
   * Handles creating chat
   */
  onCreateChat(e) {
    const title = e.data;
    const event = new Event('api.chat.create');

    this.createChat(title);
    document.dispatchEvent(event);
  }

  /**
   * Handles getting chats
   */
  onGetChats() {
    const event = new Event('api.chats.get');

    event.data = this.getChats();
    document.dispatchEvent(event);
  }

  /**
   * Handles getting messages
   */
  onGetMessages(e) {
    const event = new Event('api.messages.get');
    const id = e.data;

    event.data = this.getMessages(id);
    document.dispatchEvent(event);
  }

  /**
   * Handles deleting messages
   * @param {Object} e - event object
   */
  onDeleteMessages(e) {
    const ids = e.data.ids;
    const chatId = e.data.chatId;
    const event = new Event('api.messages.delete');

    document.dispatchEvent(event);
    this.deleteMessages(ids, chatId);
  }

  /**
   * Handles sending messages
   * @param {Object} e - event object
   */
  onSendMessage(e) {
    const message = e.data.message;
    const chatId = e.data.chatId;
    const event = new Event('api.message.send');

    this.sendMessage(message, chatId);
    document.dispatchEvent(event);
  }

  /**
   * Adds chat to storage
   * @param {String} title
   */
  createChat(title) {
    const totalChats = this.restoreChats() || [];
    const chatsSize = totalChats.length;
    const id = `${ID_NAME_CHAT_PREFIX}-${chatsSize}`;
    const data = {
      id,
      title,
    };

    this.storeChat(data);
    this.createNewChatEvent(data);
  }

  /**
   * Gets chats
   * @returns {Array}
   */
  getChats() {
    const totalChats = this.restoreChats();
    const chats = totalChats.map(it => ({ id: it.id, title: it.title }));

    return chats;
  }

  /**
   * Gets messages from storage
   * @returns {Array<Object>}
   */
  getMessages(id) {
    const totalMessages = this.restoreMessages(id);

    return totalMessages;
  }

  /**
   * Deletes messages from storage
   * @param {Array} ids - ids messages
   * @param {String} chatId
   */
  deleteMessages(ids, chatId) {
    const totalMessages = this.restoreMessages(chatId);

    const updatedMessages = totalMessages.filter(item => !ids.some(id => id === item.id));

    this.storeMessages(chatId, updatedMessages);

    this.createDeletingEvent(ids);
  }

  /**
   * Sends message
   * @param {Object} message - sending message
   * @param {String} chatId
   */
  sendMessage(message, chatId) {
    const totalMessages = this.restoreMessages(chatId);
    const messagesSize = totalMessages.length;
    const id = `${ID_NAME_MESSAGE_PREFIX}-${messagesSize}`;
    const date = new Date();
    const data = {
      id,
      message,
      date,
    };
    totalMessages.push(data);

    this.storeMessages(chatId, totalMessages);
    this.createNewMessageEvent(data);
  }

  /**
   * Creates event for creating new chat
   * @param {Object} data - chat data
   */
  createNewChatEvent(data) {
    const event = new Event('chat.new');
    event.data = data;

    document.dispatchEvent(event);
  }

  /**
   * Creates event for sending new message
   * @param {Object} data - message data
   */
  createNewMessageEvent(data) {
    const event = new Event('message.new');
    event.data = data;

    document.dispatchEvent(event);
  }

  /**
   * Creates event for deleting messages
   * @param {Object} data - message data
   */
  createDeletingEvent(data) {
    const event = new Event('messages.delete');
    event.data = data;

    document.dispatchEvent(event);
  }

  /**
   * Stores message in the local storage
   * @param {String} chatId
   * @param {Array<Object>} messages - storing message
   */
  storeMessages(chatId, messages) {
    const chats = this.restoreChats();
    chats.forEach((it) => {
      if (it.id === chatId) {
        it.messages = messages;
      }
    });
    const chatsJSON = JSON.stringify(chats);

    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, chatsJSON);
  }

  /**
   * Restores messages from the local storage
   * @returns {Array} - parsed messages
   */
  restoreMessages(chatId) {
    const chats = this.restoreChats();
    let messages = [];

    chats.forEach((it) => {
      if (it.id === chatId && it.messages) {
        messages = it.messages;
      }
    });

    return messages;
  }

  /**
   * Stores chat options in localStorage
   * @param {Object} chat
   */
  storeChat(chat) {
    const chats = this.restoreChats();
    chat.messages = [];
    chats.push(chat);
    const chatsJSON = JSON.stringify(chats);

    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, chatsJSON);
  }

  /**
   * Gets chats options from localStorage
   * @returns {Array}
   */
  restoreChats() {
    const chats = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

    return JSON.parse(chats) || [];
  }
}

export default Server;
