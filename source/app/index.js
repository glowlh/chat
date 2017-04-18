/*

 - rename source/js -> app
 - move source/app/components/chat/** -> source/app
 - rename component app -> main
 - move components to own folders

 - eslint (https://docs.npmjs.com/misc/scripts)
 */

/*

 extract class
 Message
 get id => this.spec.id
 .spec = {text,id,date}
 .element = {HTMLElement}

 message
 message.js
 template.pug
 */

/*

 Создание своих чатов
 Переход на страницу определённого чата
 */

import Chat from './chat/main/main';
import ChatEditor from './chat-editor/main/main';

if (document.querySelector('.mg-app--page--chat-editor')) {
  // const element = document.querySelector('.mg-app--page--chat');
  // const chat = new Chat(element);
  // chat.open();

  const element = document.querySelector('.mg-app--page--chat-editor');
  const chatEditor = new ChatEditor(element);
}
