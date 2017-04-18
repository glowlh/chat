import History from '../history/history';
import HeaderBar from '../header-bar/header-bar';

const SELECTOR_HISTORY = '.mg-history';
const SELECTOR_HEADER_BAR = '.mg-header';

class Main {

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;

    this.attachHistory();
    this.attachHeaderBar();
  }

  attachHistory() {
    const element = this.rootEl.querySelector(SELECTOR_HISTORY);

    this.history = new History(element);
  }

  attachHeaderBar() {
    const element = this.rootEl.querySelector(SELECTOR_HEADER_BAR);

    this.headerBar = new HeaderBar(element);
  }
}

export default Main;
