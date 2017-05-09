import templateCollection from '../template/template.collection';

class State {

  constructor(options) {
    if (!(options instanceof Object)) {
      throw new TypeError(`${options} is not an Object`);
    }

    this.name = options.name;
    this.template = templateCollection.getTemplate(this.name);
    this.Controller = options.controller;
  }

  /**
   * Creates state instance
   */
  open(options) {
    this._init();
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
