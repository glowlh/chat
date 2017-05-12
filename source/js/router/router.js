import State from './state';
import History from '../history/history';

const CLASS_ROOT = 'mg-app';

class Router {

  constructor() {
    this._active = null;
    this._states = new Map();
    this._rootEl = document.querySelector(`.${CLASS_ROOT}`);
    this.history = new History();
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
      this._removeState(this._active);
    }

    state.open(options);
    this._addState(state);
    this._active = state;
  }

  /**
   * Stores state
   * @param {Object} options
   * @param {String} options.name - state name
   * @param {Chat | ChatList} options.controller - state controller
   */
  setState(options) {
    const state = new State(options);
    this._states.set(state.name, state);
  }

  /**
   * Sets active state
   * @param {String} name - state name
   * @param {Object} options
   */
  go(name, options = null) {
    const nextState = this._states.get(name);
    this.history.pushState(nextState, options);

    this.changeState(nextState, options);
  }

  /**
   * Activates previous state
   */
  back() {
    this.history.popState();
    const prevState = this.history.last;
    const state = prevState.state;
    const options = prevState.options;

    this.changeState(state, options);
  }

  /**
   * @param {State} state
   * @private
   */
  _addState(state) {
    const element = state.element;
    this._rootEl.appendChild(element);
  }

  /**
   * @param {State} state
   * @private
   */
  _removeState(state) {
    const element = state.element;
    this._rootEl.removeChild(element);
  }
}

const router = new Router();
export default router;
