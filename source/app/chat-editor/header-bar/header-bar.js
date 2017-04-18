import modalWindow from '../modal-window/modal-window';

const SELECTOR_BUTTON_NEW_CHAT = '.mg-button--type--new-chat';

class HeaderBar {

  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new TypeError(`${element} is not an HTMLElement`);
    }

    this.rootEl = element;
    this.modalWindow = modalWindow;

    this._attachListener();
  }

  _attachListener() {
    this.rootEl.addEventListener('click', this._createChatHandler.bind(this), false);
  }

  _createChatHandler(event) {
    const target = event.target;

    if (!target.closest(SELECTOR_BUTTON_NEW_CHAT)) {
      return;
    }

    this.modalWindow.open();
  }
}

export default HeaderBar;
