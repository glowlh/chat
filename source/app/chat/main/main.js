import FooterBar from '../footer-bar/footer-bar';
import History from '../history/history';

import templateFn from './template.pug';

const SELECTOR_HISTORY = '.mg-history';
const SELECTOR_PANEL = '.mg-panel';

class Main {

  /**
   * @param {HTMLElement} element
   */
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
  }

  /**
   * Opens chat page
   */
  open() {
    this.rootEl.innerHTML = templateFn();
    this.node = this.rootEl.firstChild;

    this._attachFooterBar();
    this._attachHistory();
  }

  /**
   * Closes chat page
   */
  close() {
    this.node.remove();
  }

  /**
   * Attaches element with messages history
   */
  _attachHistory() {
    const element = this.rootEl.querySelector(SELECTOR_HISTORY);

    this.history = new History(element);
  }

  /**
   * Attaches element footer bar
   */
  _attachFooterBar() {
    const element = this.rootEl.querySelector(SELECTOR_PANEL);

    this.footerBar = new FooterBar(element);
  }
}

export default Main;
