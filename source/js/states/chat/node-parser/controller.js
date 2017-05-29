const NODE_TYPE_TAG = 1;
const NODE_TYPE_TEXT = 3;

class NodeParser {

  /**
   * @param {Element} node
   * @return {string}
   */
  parse(node) {
    return this._reduceNodes(node);
  }

  /**
   * Reduces tags with saving node structure
   * @param {Element} node
   * @returns {string}
   * @private
   */
  _reduceNodes(node) {
    const children = Array.from(node.childNodes);
    const lastId = children.length - 1;
    let content = '';

    children.forEach((it, id) => {
      const next = it.nextSibling;

      switch (it.nodeType) {
        case NODE_TYPE_TAG: {
          if (it.nodeName === 'BR') {
            if (next) {
              content += '\n';
            }
          } else if ((it.nodeName === 'DIV' || it.nodeName === 'P') && id !== lastId) {
            content += `${this.parse(it)}\n`;
          } else {
            content += this.parse(it);
          }

          break;
        }
        case NODE_TYPE_TEXT: {
          let text = it.data;
          text = this._replaceNbsp(text);
          content += text;

          if (next) {
            if (next.nodeName === 'DIV' || next.nodeName === 'P') {
              content += '\n';
            }
          }

          break;
        }
        default:
          break;
      }
    });

    return content;
  }

  /**
   * Replaces nbsp by space
   * @param {string} content
   * @return {string}
   * @private
   */
  _replaceNbsp(content) {
    return content.replace(/(&nbsp;)+/g, ' ');
  }
}

export default NodeParser;
