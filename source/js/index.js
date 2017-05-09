import './template';
import router from './router/router';
import ChatList from './chat.list/controller';
import Chat from './chat/controller';

const chatListProp = {
  name: 'chat-list',
  controller: ChatList,
};
const chatProp = {
  name: 'chat',
  controller: Chat,
};

router.setState(chatProp);
router.setState(chatListProp);
router.go('chat-list');
