import BasePage from '../base-page';
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

    this._defineComponents();
  }

  destroy() {
    this.history.destroy();
    this.footer.destroy();
    this.header.destroy();
  }

  /**
   * @param {SelectedMessages} messages
   */
  select(messages) {
    this.header.setSelected(messages);
  }

  /**
   * Defines history, footer and header instances
   * @private
   */
  _defineComponents() {
    this.history = new History(this);
    this.footer = new FooterBar(this);
    this.header = new HeaderBar(this);
  }
}

export default Chat;
