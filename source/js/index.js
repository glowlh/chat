/**
 * @namespace
 * @property {string} text
 * @property {timestamp} date
 */
const message = {
  text: '',
  date: '',
};

/*

1. отправляя сообщение сделать trim. Если получится пустая строка - не отправлять

2. эмуляция ответа сервера:
  // Event (https://developer.mozilla.org/ru/docs/Web/API/Event)
  const event = new Event('mg.message.new');
  event.data = { message: message };
  document.dispatchEvent(event);

3. отображаемая дата сообщения:
  3.1. Сегодня:          hh:mm, сегодня
  3.2. Вчера:            hh:mm, вчера
  3.3. Дальше чем вчера: hh:mm, dd марта
  3.4. В прошлом году:   hh:mm, dd марта yyyy

4. отправка сообщения:
  4.1. по нажатию на кнопку 'send'
  4.2. по enter


/ **************** /

5. выделение и удаление сообшений
  5.1. выделяя сообщение в шапке появляется панель с двумя кнопками
       'удалить' и 'отмена'
  5.2. на кнопке 'удалить' отображается счесчик колличества
       выделенных сообщений

*/
