const LOCAL_STORAGE_ITEM_NAME = 'chats';
const MESSAGE_PREFIX_ID_NAME = 'message';
const CHAT_PREFIX_ID_NAME = 'chat';

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
    document.addEventListener('server.chats.get', this.onGetChats.bind(this), false)
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
  onGetMessages() {
    const event = new Event('api.messages.get');

    event.data = this.getMessages();
    document.dispatchEvent(event);
  }

  /**
   * Handles deleting messages
   * @param {Object} e - event object
   */
  onDeleteMessages(e) {
    const ids = e.data;
    const event = new Event('api.messages.delete');

    document.dispatchEvent(event);

    this.deleteMessages(ids);
  }

  /**
   * Handles sending messages
   * @param {Object} e - event object
   */
  onSendMessage(e) {
    const message = e.data;
    const event = new Event('api.message.send');

    this.sendMessage(message);
    document.dispatchEvent(event);
  }

  /**
   * Adds chat to storage
   * @param {String} title
   */
  createChat(title) {
    const totalChats = this.restoreChats() || [];
    const chatsSize = totalChats.length;
    const id = `${CHAT_PREFIX_ID_NAME}-${chatsSize}`;
    const data = {
      id,
      title
    };

    this.storeChat(data);
    this.createNewChatEvent(data);
  }

  getChats() {
    let totalChats = this.restoreChats();
    let chats = [];
    chats = totalChats.map((it) => {
      return {
        id: it.id,
        title: it.title
      };
    });

    return chats;
  }

  /**
   * Gets messages from storage
   * @returns {Array<Object>}
   */
  getMessages() {
    let totalMessages = this.restoreMessages();

    return totalMessages;
  }

  /**
   * Deletes messages from storage
   * @param {Array} ids - ids messages
   */
  deleteMessages(ids) {
    let totalMessages = this.restoreMessages();

    const updatedMessages = totalMessages.filter((item) => {
      return !ids.some((id) => {
        return id === item.id;
      });
    });

    const parsedMessage = JSON.stringify(updatedMessages);
    this.storeMessage(parsedMessage);

    this.createDeletingEvent(ids);
  }

  /**
   * Sends message
   * @param {Object} message - sending message
   */
  sendMessage(message) {
    const totalMessages = this.restoreMessages() || [];
    const messagesSize = totalMessages.length;
    const id = `${MESSAGE_PREFIX_ID_NAME}-${messagesSize}`;
    const date = new Date();
    const data = {
      id,
      message,
      date
    };

    totalMessages.push(data);

    const parsedMessage = JSON.stringify(totalMessages);
    this.storeMessage(parsedMessage);

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
   * @param {Object} message - storing message
   */
  storeMessage(chatId, message) {
    const chats = this.restoreChats();
    chats.forEach((it) => {
      if (it.id === chatId) {
        it.messages.push(message)
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
      if (it.id === chatId) {
        messages = it.messages;
      }
    });

    return messages;
  }

  storeChat(chat) {
    let chats = this.restoreChats();
    chats.push(chat);
    const chatsJSON = JSON.stringify(chats);

    localStorage.setItem(LOCAL_STORAGE_ITEM_NAME, chatsJSON);
  }

  restoreChats() {
    const chats = localStorage.getItem(LOCAL_STORAGE_ITEM_NAME);

    return JSON.parse(chats) || [];
  }
}

export default Server;
