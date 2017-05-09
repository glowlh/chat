import BasePage from '../base-page/base-page';
import FooterBar from './footer-bar/controller';
import History from './history/controller';
import HeaderBar from './header-bar/controller';

class Chat extends BasePage {

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
    this._attachHeaderBar();
  }

  destroy() {
    this.history.destroy();
    this.footerBar.destroy();
    this.headerBar.destroy();
  }

  /**
   * @param {SelectedMessages} messages
   */
  setSelected(messages) {
    this.headerBar.setSelected(messages);
  }

  /**
   * Attaches element with messages history
   */
  _attachHistory() {
    this.history = new History(this);
  }

  /**
   * Attaches element footer bar
   */
  _attachFooterBar() {
    this.footerBar = new FooterBar(this);
  }

  /**
   * Attaches element header bar
   */
  _attachHeaderBar() {
    this.headerBar = new HeaderBar(this);
  }
}

export default Chat;
