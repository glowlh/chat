import FooterBar from './footer-bar/controller';
import History from './history/controller';

const CLASS_HISTORY = 'mg-history';
const CLASS_PANEL = 'mg-panel';
const CLASS_ROOT = 'mg-app__chat';

class Chat {

  /**
   * Opens chat page
   */
  init(id) {
    this.rootEl = document.querySelector(`.${CLASS_ROOT}`);
    if (typeof id !== 'string') {
      throw new TypeError(`${id} is not a String`);
    }
    this.id = id;

    this._attachFooterBar();
    this._attachHistory();
  }

  /**
   * Attaches element with messages history
   */
  _attachHistory() {
    const element = this.rootEl.querySelector(`.${CLASS_HISTORY}`);

    this.history = new History(element, this.id);
  }

  /**
   * Attaches element footer bar
   */
  _attachFooterBar() {
    const element = this.rootEl.querySelector(`.${CLASS_PANEL}`);

    this.footerBar = new FooterBar(element, this.id);
  }
}

const chat = new Chat();
export default chat;
