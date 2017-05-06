import templates from './templates';

class TemplateCollection {

  constructor() {
    this._templatesMap = templates;
  }

  getTemplate(id) {
    return this._templatesMap.get(id);
  }
}

const templateCollection = new TemplateCollection();
export default templateCollection;
