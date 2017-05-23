/**
 * @typedef {Object} ControllerOptions
 * @property {string} id - chat id
 *
 * @typedef {Object} ItemHistory
 * @property {string} id
 * @property {string} name
 * @property {ControllerOptions} options
 * @property {State} state
 */

class History {

  constructor() {
    this._ids = new Set();
    this._items = {};
  }

  /**
   * @typedef {Object} Item
   * @property {State} state
   * @property {Object} options
   *
   * @returns {Item}
   */
  get current() {
    return this._items[this.currentId];
  }

  get currentId() {
    const ids = [...this._ids];
    return ids[this._ids.size - 1];
  }

  /**
   * @returns {string}
   */
  get currentName() {
    return this.current ? this.current.id : null;
  }

  /**
   * @returns {ItemHistory|null}
   */
  backView() {
    const list = [...this._ids];
    const prevId = list[this._ids.size - 2];
    return this._items[prevId] || null;
  }

  clear() {
    this._ids.clear();
    this._items = {};
  }

  /**
   * @typedef {Object} Options
   * @property {string} id - chat id
   *
   * @param {State} state
   * @param {Options} options - state options
   */
  pushState(state, options) {
    const id = this._generateId();
    const name = state.name;
    const itemHistory = {
      id,
      name,
      options,
      state,
    };

    if (this.currentName === itemHistory) {
      return;
    }

    this._ids.add(id);
    this._items[id] = itemHistory;
  }

  popState() {
    const list = [...this._ids];
    const id = list.pop();

    this._ids.delete(id);
    delete this._items[id];
  }

  /**
   * @returns {Object.<ItemHistory>}
   */
  viewHistory() {
    return this._items;
  }

  _generateId() {
    const prefix = 'mg';
    const ids = [...this._ids];
    let count = 0;

    while (true) {
      const isUniqueId = !ids.some(p => p === `${prefix}-${count}`);
      if (isUniqueId) {
        break;
      }

      count += 1;
    }

    return `${prefix}-${count}`;
  }
}

export default History;
