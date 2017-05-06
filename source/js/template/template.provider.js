import templates from './templates';

class TemplateProvider {

  static register(options) {
    const id = options.id;
    const template = options.template;

    templates.set(id, template);
  }
}

export default TemplateProvider;
