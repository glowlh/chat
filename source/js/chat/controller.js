import FooterBar from './footer-bar/controller';
import History from './history/controller';

const CLASS_PANEL = 'mg-panel';

class Chat {

  /**
   * Opens chat page
   */
  init(root, id) {
    if (!(root instanceof HTMLElement)) {
      throw new TypeError(`${root} is not an HTMLElement`);
    }

    if (typeof id !== 'string') {
      throw new TypeError(`${id} is not a String`);
    }

    this.id = id;
    this.rootEl = root;

    this._attachFooterBar();
    this._attachHistory();
  }

  destroy() {
    this.history.destroy();
    this.footerBar.destroy();
  }

  /**
   * Attaches element with messages history
   */
  _attachHistory() {
    this.history = new History(this.rootEl, this.id);
  }

  /**
   * Attaches element footer bar
   */
  _attachFooterBar() {
    const element = this.rootEl.querySelector(`.${CLASS_PANEL}`);

    this.footerBar = new FooterBar(element, this.id);
  }
}

export default Chat;
