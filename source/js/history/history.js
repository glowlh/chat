class History {

  constructor() {
    this._store = [];
    this._last = null;
  }

  /**
   * Returns active page
   * @returns {{state: State, options: Object}|*|null}
   */
  get last() {
    return this._last;
  }

  /**
   * Saves last page in the store
   * @param {State} state
   * @param {Object | null} options - state options
   * @param {String} options.id - chat state id
   */
  pushState(state, options) {
    const page = {
      state,
      options,
    };
    
    if (this._last === page) {
      return;
    }
    
    this._store.push(page);
    this._last = page;
  }

  /**
   * Removes last page from the store
   */
  popState() {
    this._store.pop();
    const lastIndex = this._store.length - 1;
    this._last = this._store[lastIndex];
  }
}

export default History;
