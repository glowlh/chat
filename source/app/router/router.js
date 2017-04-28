const CLASS_ROOT = 'mg-app';

class Router {

  constructor() {
    this._active = null;
    this._states = {};
    this._rootEl = document.querySelector(`.${CLASS_ROOT}`);
  }

  /**
   * Changes active state
   * @param {State} state
   */
  changeState(state) {
    if (this._active === state) {
      return;
    }

    if (this._active) {
      this._active.close();
    }

    state.open();
    this._active = state;
  }

  /**
   * Stores state
   * @param {State} state
   */
  setState(state) {
    this._states[state.name] = state;
    this._rootEl.appendChild(state.element);
  }

  /**
   * Sets active state
   * @param {String} name - state name
   */
  go(name) {
    const nextState = this._states[name];
    this.changeState(nextState);
  }
}

const router = new Router();
export default router;
