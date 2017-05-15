class History {

  constructor() {
    this._items = [];
  }

  /**
   * @typedef {Object} Item
   * @property {State} state
   * @property {Object} options
   *
   * @returns {Item}
   */
  get current() {
    const index = this._items.length - 1;
    return this._items[index];
  }

  /**
   * @typedef {Object} Options
   * @property {string} id - chat id
   *
   * @param {State} state
   * @param {Options} options - state options
   */
  pushState(state, options) {
    const item = {
      state,
      options,
    };

    if (this.current === item) {
      return;
    }

    this._items.push(item);
  }

  popState() {
    this._items.pop();
  }
}

export default History;
