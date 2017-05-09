class History {

  constructor() {
    this._store = [];
    this._active = null;
  }

  /**
   * Returns active page
   * @returns {{state: State, options: Object}|*|null}
   */
  get active() {
    return this._active;
  }

  /**
   * Saves last page in the store
   * @param {State} state
   * @param {Object} options - state options
   */
  pushPage(state, options) {
    const page = {
      state,
      options,
    };
    this._store.push(page);
    this._active = page;
  }

  /**
   * Removes last page from the store
   */
  popPage() {
    this._store.pop();
    const lastIndex = this._store.length - 1;
    this._active = this._store[lastIndex];
  }
}

export default History;
