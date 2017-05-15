/**
 * @typedef {Object} ControllerOptions
 * @property {string} id - chat id
 */

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
   * Changes current state
   * @param {State} state
   * @param {ControllerOptions} options
   */
  changeState(state, options) {
    if (this._active === state) {
      return;
    }

    if (this._active) {
      this._active.close();
      this._removeStateView(this._active);
    }

    state.open(options);
    this._addStateView(state);
    this._active = state;
  }

  /**
   * @typedef {Object} StateOptions
   * @property {string} name
   * @property {function} controller
   *
   * Stores state
   * @param {StateOptions} options
   */
  setState(options) {
    const state = new State(options);
    this._states.set(state.name, state);
  }

  /**
   * @param {String} name - state name
   * @param {ControllerOptions} options
   */
  go(name, options = null) {
    const nextState = this._states.get(name);
    this.history.pushState(nextState, options);

    this.changeState(nextState, options);
  }

  goBack() {
    this.history.popState();
    const itemHistory = this.history.current;
    const state = itemHistory.state;
    const options = itemHistory.options;

    this.changeState(state, options);
  }

  /**
   * @param {State} state
   * @private
   */
  _addStateView(state) {
    const element = state.element;
    this._rootEl.appendChild(element);
  }

  /**
   * @param {State} state
   * @private
   */
  _removeStateView(state) {
    const element = state.element;
    this._rootEl.removeChild(element);
  }
}

const router = new Router();
export default router;
