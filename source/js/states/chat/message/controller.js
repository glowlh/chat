import templateFn from './template';
import style from './style.scss';

const MONTH_TITLES = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября',
  'ноября', 'декабря'];

class Message {

  constructor(options) {
    if (!(options instanceof Object)) {
      throw new TypeError(`${options} is not an HTMLElement`);
    }

    this._init(options);
  }

  get id() {
    return this.spec.id;
  }

  /**
   * Deletes message from history
   */
  delete() {
    this.node.remove();
    this.spec = null;
  }

  /**
   * @param {Object} options
   * @private
   */
  _init(options) {
    const date = this._parseDate(options.date);

    this.spec = {
      id: options.id,
      date,
      text: options.message,
    };

    const element = document.createElement('div');
    element.innerHTML = templateFn(this.spec);
    this.node = element.querySelector(`.${style.message}`);
  }

  /**
   * Parses a date to a readable view
   * @param {Date} date
   * @returns {string}
   * @private
   */
  _parseDate(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const year = date.getFullYear();
    const day = date.getDate();
    const month = date.getMonth();
    const monthTitle = MONTH_TITLES[month];

    const now = new Date();
    const currentYear = now.getFullYear();
    let dayTitle = '';
    const daysToNow = (now - date) / 1000 / 3600 / 24;

    if (daysToNow <= 1) {
      dayTitle = 'сегодня';
    } else if (daysToNow <= 2) {
      dayTitle = 'вчера';
    } else if (year < currentYear) {
      dayTitle = `${day} ${monthTitle} ${year}`;
    } else {
      dayTitle = `${day} ${monthTitle}`;
    }

    return `${hours}:${minutes}, ${dayTitle}`;
  }
}

export default Message;
