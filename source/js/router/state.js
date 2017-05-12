import templateCollection from '../template/template.collection';

const CLASS_ROOT = 'mg-page';

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
    this._defineElement();
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

  /**
   * Defines state element
   * @private
   */
  _defineElement() {
    const node = document.createElement('div');
    node.innerHTML = this.template;
    this.element = node.querySelector(`.${CLASS_ROOT}`);
  }
}

export default State;
