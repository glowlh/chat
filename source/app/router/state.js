class State {

  constructor(name, templateFn) {
    if (typeof name !== 'string') {
      throw new TypeError(`${name} is not a String`);
    }

    if (typeof templateFn !== 'string') {
      throw new TypeError(`${templateFn} is not a String`);
    }

    this.name = name;
    this.templateFn = templateFn;
    this._init();
  }

  open() {
    this.element.hidden = false;
  }

  close() {
    this.element.hidden = true;
  }

  /**
   * Initialises dom node for state
   * @private
   */
  _init() {
    const node = document.createElement('div');
    node.innerHTML = this.templateFn;
    this.element = node.firstChild;
    this.element.hidden = true;
  }
}

export default State;
