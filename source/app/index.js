import router from './router/router';
import State from './router/state';
import chatList from './chat.list/controller';

import templateChatListFn from './router/templates/chat-list.pug';
import templateChatFn from './router/templates/chat.pug';

if (document.querySelector('.mg-app')) {
  const chatListTemplate = templateChatListFn();
  const chatTemplate = templateChatFn();
  const chatListState = new State('chat-list', chatListTemplate);
  const chatState = new State('chat', chatTemplate);

  router.setState(chatState);
  router.setState(chatListState);
  router.go('chat-list');

  chatList.init();
}
