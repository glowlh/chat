import TemplateProvider from '../template/template.provider';
import templateFn from './template.pug';

const options = {
  id: 'chat-list',
  template: templateFn(),
};
TemplateProvider.register(options);
