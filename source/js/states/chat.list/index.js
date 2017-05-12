import TemplateProvider from '../../template/template.provider';
import template from './template';

const options = {
  id: 'chat-list',
  template,
};
TemplateProvider.register(options);
