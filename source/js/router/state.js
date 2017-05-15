import templateCollection from '../template/template.collection';

const CLASS_ROOT = 'mg-page';

class State {

  /**
   * @typedef {Object} StateOptions
   * @property {string} name
   * @property {function} controller
   *
   * @param {StateOptions} options
   */
  constructor(options) {
    if (!(options instanceof Object)) {
      throw new TypeError(`${options} is not an Object`);
    }

    this.name = options.name;
    this.template = templateCollection.getTemplate(this.name);
    this.Controller = options.controller;
  }

  /**
   * @typedef {(Object|null)} ControllerOptions
   * @property {string} id - chat id
   *
   * Creates state instance
   * @param {ControllerOptions} options
   */
  open(options) {
    this._createView();
    const id = options ? options.id : null;
    this.instance = new this.Controller();
    this.instance.init(this.element, id);
  }

  /**
   * Closes state instance
   */
  close() {
    this.instance.destroy();
    delete this.instance;
  }

  _createView() {
    const node = document.createElement('div');
    node.innerHTML = this.template;
    this.element = node.querySelector(`.${CLASS_ROOT}`);
  }
}

export default State;
