class State {

  constructor(name, options) {
    if (typeof name !== 'string') {
      throw new TypeError(`${name} is not a String`);
    }

    if (!(options instanceof Object)) {
      throw new TypeError(`${options} is not an Object`);
    }

    this.name = name;
    this.template = options.template;
    this.Controller = options.controller;
    this._init();
  }

  /**
   * Creates state instance
   */
  open(options) {
    const id = options ? options.id : null;
    this.instance = new this.Controller();
    this.instance.init(this.element, id);
  }

  /**
   * Deletes state instance
   */
  close() {
    this.instance.destroy();
    delete this.instance;
  }

  /**
   * Initialises dom node for state
   * @private
   */
  _init() {
    const node = document.createElement('div');
    node.innerHTML = this.template;
    this.element = node.firstChild;
  }
}

export default State;
