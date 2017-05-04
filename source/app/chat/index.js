import TemplateProvider from '../template/template.provider';
import templateFn from './template.pug';

const options = {
  id: 'chat',
  template: templateFn()
};
TemplateProvider.register(options);
