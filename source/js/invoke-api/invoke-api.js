import Server from '../server/server';

class InvokeApi {

  constructor() {
    this.server = new Server();
  }

  /**
   * Attaches handlers for creating chat
   * @returns {Promise} promise
   */
  createChat(data) {
    const promise = this._handler('api.chat.create');
    const event = new Event('server.chat.create');
    event.data = data;

    document.dispatchEvent(event);
    return promise;
  }

  /**
   * Attaches handlers for getting chats
   * @returns {Promise} promise
   */
  getChats() {
    const promise = this._handler('api.chats.get');
    const event = new Event('server.chats.get');

    document.dispatchEvent(event);

    return promise;
  }

  /**
   * Attaches handlers for getting messages
   * @returns {Promise} promise
   */
  getMessages(id) {
    const promise = this._handler('api.messages.get');
    const event = new Event('server.messages.get');
    event.data = id;

    document.dispatchEvent(event);

    return promise;
  }

  /**
   * Attaches handlers for deleting messages
   * @param {Array} ids - messages ids
   * @param {String} chatId
   * @returns {Promise} promise
   *
   */
  deleteMessages(ids, chatId) {
    const promise = this._handler('api.messages.delete');
    const event = new Event('server.messages.delete');

    event.data = {
      ids,
      chatId,
    };
    document.dispatchEvent(event);

    return promise;
  }

  /**
   * Attaches handlers for sending messages
   * @param {Object} message - message data
   * @param {String} id
   * @returns {Promise} promise
   */
  sendMessage(message, id) {
    const promise = this._handler('api.message.send');
    const event = new Event('server.message.send');
    event.data = {
      chatId: id,
      message,
    };

    document.dispatchEvent(event);

    return promise;
  }

  /**
   * Attaches handler for listeners events
   * @param {String} name - event name
   * @returns {Promise}
   * @private
   */
  _handler(name) {
    const deferred = {};
    deferred.promise = new Promise((resolve, reject) => {
      deferred.resolve = resolve;
      deferred.reject = reject;
    });

    const handler = (event) => {
      document.removeEventListener(name, handler);
      return event.error
        ? deferred.reject(event.error)
        : deferred.resolve(event.data);
    };

    document.addEventListener(name, handler);

    return deferred.promise;
  }
}

const invokeApi = new InvokeApi();

export default invokeApi;
