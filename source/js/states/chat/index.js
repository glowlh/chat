import TemplateProvider from '../../template/template.provider';
import template from './template';

const options = {
  id: 'chat',
  template,
};
TemplateProvider.register(options);
