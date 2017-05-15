import templateFn from './template';
import style from '../style.scss';

import invokeApi from '../../../invoke-api/invoke-api';
import router from '../../../router/router';

const DATA_BUTTON_NAVIGATION_ATTR = 'navigationType';
const CLASS_BUTTON_ITEM = 'mg-button';

class HeaderBar {

  constructor(owner) {
    this.rootEl = owner.rootEl.querySelector(`.${style.header}`);
    this.manageEl = this.rootEl.querySelector(`.${style.manage}`);
    this.id = owner.id;
    this.invokeApi = invokeApi;

    this._actionHandler = this._actionHandler.bind(this);
    this._attachListener();
  }

  /**
   * Clears event listeners handlers
   */
  destroy() {
    this.rootEl.removeEventListener('click', this._actionHandler);
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
      count: this.selectedMessages.num,
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
      case 'goBack':
        this._actionBack();
        break;
      default: break;
    }
  }

  /**
   * Opens chat list
   * @private
   */
  _actionBack() {
    router.goBack();
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
