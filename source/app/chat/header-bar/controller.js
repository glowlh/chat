import templateFn from './template.pug';

import invokeApi from '../../invoke-api/invoke-api';
import router from '../../router/router';
import chatList from '../../chat.list/controller';

const DATA_BUTTON_NAVIGATION_ATTR = 'navigationType';
const CLASS_MANAGE_ITEM = 'mg-header__manage';
const CLASS_BUTTON_ITEM = 'mg-button';

class HeaderBar {

  constructor(root, id) {
    if (!(root instanceof HTMLElement)) {
      throw new TypeError(`${root} is not an HTMLElement`);
    }

    this.rootEl = root;
    this.manageEl = this.rootEl.querySelector(`.${CLASS_MANAGE_ITEM}`);
    this.id = id;
    this.invokeApi = invokeApi;

    this._actionHandler = this._actionHandler.bind(this);
    this._attachListener();
  }

  /**
   * Creates navigation block
   * @param {SelectedMessages} selectedMessages
   * @private
   */
  setSelected(selectedMessages) {
    this.selectedMessages = selectedMessages;
    if (this.selectedMessages.hasSelected) {
      this.open();
    } else {
      this.close();
    }
  }

  /**
   * Closes header bar
   * @private
   */
  close() {
    this.manageEl.innerHTML = '';
  }

  /**
   * Opens header bar
   */
  open() {
    const data = {
      count: this.selectedMessages.num
    };

    this.manageEl.innerHTML = templateFn(data);
  }

  /**
   * Attaches events listener
   * @private
   */
  _attachListener() {
    this.rootEl.addEventListener('click', this._actionHandler, false);
  }

  /**
   * Clears event listeners handlers
   * @private
   */
  _clearListener() {
    this.rootEl.removeEventListener('click', this._actionHandler);
  }

  /**
   * Handles action for chat page
   * @param {Object} event
   * @private
   */
  _actionHandler(event) {
    const target = event.target.closest(`.${CLASS_BUTTON_ITEM}`);
    if (!target) {
      return;
    }

    const actionType = target.dataset[DATA_BUTTON_NAVIGATION_ATTR];

    switch (actionType) {
      case 'delete':
        this._actionDelete();
        break;
      case 'cancel':
        this._actionCancel();
        break;
      case 'back':
        this._actionBack();
        break;
      default: break;
    }
  }

  /**
   * Closes active chat
   * @private
   */
  _actionBack() {
    this._clearListener();

    router.go('chat-list');
    chatList.attachListener();
  }

  /**
   * Deletes selected messages
   * @private
   */
  _actionDelete() {
    this._deleteMessages();
    this.close();
  }

  /**
   * Cancels selection from messages
   * @private
   */
  _actionCancel() {
    this.selectedMessages.reset();
    this.close();
  }

  /**
   * Sends request to the server for deleting messages
   * @private
   */
  _deleteMessages() {
    const messageIds = this.selectedMessages.messageIds;
    this.invokeApi.deleteMessages(messageIds, this.id);
  }
}

export default HeaderBar;
