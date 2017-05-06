const CLASS_ROOT = 'mg-app';

class Router {

  constructor() {
    this._active = null;
    this._states = new Map();
    this._rootEl = document.querySelector(`.${CLASS_ROOT}`);
  }

  /**
   * Changes active state
   * @param {State} state
   * @param {Object} options
   */
  changeState(state, options) {
    if (this._active === state) {
      return;
    }

    if (this._active) {
      this._active.close();
      this._removePage(this._active);
    }

    state.open(options);
    this._addPage(state);
    this._active = state;
  }

  /**
   * Stores state
   * @param {State} state
   */
  setState(state) {
    this._states.set(state.name, state);
  }

  /**
   * Sets active state
   * @param {String} name - state name
   * @param {Object} options
   */
  go(name, options = null) {
    const nextState = this._states.get(name);
    this.changeState(nextState, options);
  }

  /**
   * @param {State} state
   * @private
   */
  _addPage(state) {
    const element = state.element;
    this._rootEl.appendChild(element);
  }

  /**
   * @param {State} state
   * @private
   */
  _removePage(state) {
    const element = state.element;
    this._rootEl.removeChild(element);
  }
}

const router = new Router();
export default router;
