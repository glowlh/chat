import templateNavigationFn from './template.pug';

import invokeApi from '../../invoke-api/invoke-api';

const DATA_BUTTON_NAVIGATION_ATTR = 'navigationType';

class HeaderBar {

  constructor(root) {
    if (!(root instanceof HTMLElement)) {
      throw new TypeError(`${root} is not an HTMLElement`);
    }

    this.rootEl = root;
    this.invokeApi = invokeApi;

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
    this.rootEl.innerHTML = '';
  }

  /**
   * Open header bar
   */
  open() {
    const data = {
      count: this.selectedMessages.num
    };

    this.rootEl.innerHTML = templateNavigationFn(data);
  }

  /**
   * Attaches events listener
   * @private
   */
  _attachListener() {
    this.rootEl.addEventListener('click', this._actionHandler.bind(this), false);
  }

  /**
   * Attaches handler for switching navigation block
   * @param {Object} event
   * @private
   */
  _actionHandler(event) {
    const target = event.target;
    const actionType = target.dataset[DATA_BUTTON_NAVIGATION_ATTR];

    switch (actionType) {
      case 'delete':
        this._actionDelete();
        break;
      case 'cancel':
        this._actionCancel();
        break;
      default: break;
    }
  }

  /**
   * Attaches action for deleting messages
   * @private
   */
  _actionDelete() {
    this._deleteMessages();
    this.close();
  }

  /**
   * Attaches action for canceling messages selecting
   * @private
   */
  _actionCancel() {
    this.selectedMessages.reset();
    this.close();
  }

  /**
   * Attaches action for deleting selected messages
   * @private
   */
  _deleteMessages() {
    const messageIds = this.selectedMessages.messageIds;
    this.invokeApi.deleteMessages(messageIds);
  }
}

export default HeaderBar;
