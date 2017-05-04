import './template';
import router from './router/router';
import State from './router/state';
import ChatList from './chat.list/controller';
import Chat from './chat/controller';
import templateCollection from './template/template.collection';

if (document.querySelector('.mg-app')) {
  const chatListId = 'chat-list';
  const chatListProp = {
    template: templateCollection.getTemplate(chatListId),
    controller: ChatList,
  };

  const chatId = 'chat';
  const chatProp = {
    template: templateCollection.getTemplate(chatId),
    controller: Chat,
  };

  const chatListState = new State(chatListId, chatListProp);
  const chatState = new State(chatId, chatProp);

  router.setState(chatState);
  router.setState(chatListState);
  router.go('chat-list');
}
