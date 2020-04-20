/**
 * @class HightlightMarkup
 */
export default class HightlightMarkup {
  constructor() {
    document.addEventListener('selectionchange', e => {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);

      let startContainer = range.startContainer;
      let endContainer = range.endContainer;
      let currentNode = '';
      let tagNames = [];

      if (!range.collapsed) {
        var textNodeIndex = this._getChildNodeIndexOf(endContainer);
        currentNode = endContainer;

        while (currentNode) {
          var tagName = currentNode.tagName;

          if (tagName) {
            tagNames.push(this._createSelectorByNthOfType(currentNode));
          }

          currentNode = currentNode.parentNode;
        }

        console.log(textNodeIndex);
        console.log(
          tagNames
            .reverse()
            .join(' > ')
            .toLowerCase()
        );
      }
    });
  }

  /**
   * Retorna a posição do elemento em relação aos
   * seus irmãos do mesmo tipo
   * @param Element node
   * @return int
   * @example getPositionNthOfType(p) => div > h1 + p > i + p // p:nth-of-type(2)
   */
  _createSelectorByNthOfType = node => {
    let elementsWithSameTag = 0;
    let selector = `${node.tagName}`;

    let childNodes = this._getChildNodesOfParentNode(node);

    for (let currentNode of childNodes) {
      if (currentNode === node) {
        elementsWithSameTag++;
        break;
      }
      if (currentNode.tagName === node.tagName) {
        elementsWithSameTag++;
      }
    }
    if (elementsWithSameTag > 1) {
      selector = `${node.tagName}:nth-of-type(${elementsWithSameTag})`;
    }
    return selector;
  };

  /**
   * Recebe o elemento e retorna sua posição
   * em relação ao seu pai
   * @param Element node
   * @return int
   * @example getChildNodeIndexOf(p) => div > h1 + p > i + div // 1
   */
  _getChildNodeIndexOf = node => {
    let childNodes = this._getChildNodesOfParentNode(node);
    let nodeIndexOf = 0;

    for (let [indexOf, currentNode] of Object.entries(childNodes)) {
      if (currentNode === node) {
        nodeIndexOf = indexOf;
        break;
      }
    }
    return nodeIndexOf;
  };

  /**
   * @description Acessa o elemento pai e retorna os seus filhos
   * @param Element node
   */
  _getChildNodesOfParentNode = ({ parentNode: { childNodes } }) => childNodes;
}
