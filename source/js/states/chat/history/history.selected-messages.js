const CLASS_ACTIVE_ITEM = 'mg-message--selected';

class SelectedMessages {

  constructor() {
    this._selected = [];
  }

  /**
   * Gets selected message status
   * @returns {boolean}
   */
  get hasSelected() {
    return !!this.num;
  }

  /**
   * Gets selected message number
   * @returns {Number}
   */
  get num() {
    return this._selected.length;
  }

  /**
   * Gets selected message ids
   * @returns {Array}
   */
  get messageIds() {
    return this._selected.map(p => p.id);
  }

  /**
   * Toggles selected message
   * @param {Object} message
   */
  toggle(message) {
    const index = this._selected.indexOf(message);
    if (index === -1) {
      this._selected.push(message);
    } else {
      this._selected.splice(index, 1);
    }

    message.node.classList.toggle(CLASS_ACTIVE_ITEM);
  }

  /**
   * Resets selected messages view mode
   */
  reset() {
    this._selected.forEach(p => p.node.classList.remove(CLASS_ACTIVE_ITEM));
    this._selected.length = 0;
  }

  /**
   * Removes selected messages from the DOM
   */
  remove() {
    this._selected.forEach(p => p.delete());
    this._selected.length = 0;
  }
}

export default SelectedMessages;
