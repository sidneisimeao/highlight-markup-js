/**
 * @class HightlightMarkup
 */
export default class HightlightMarkup {
  constructor() {
    document.addEventListener('selectionchange', e => {
      let selection = window.getSelection();
      let range = selection.getRangeAt(0);

      let startContainer = range.endContainer;
      let endContainer = range.endContainer;
      let currentNode = '';
      let tagNames = [];

      if (!range.collapsed) {
        var textNodeIndex = this._getChildNodeIndexOf(endContainer);
        currentNode = startContainer;

        while (currentNode) {
          var tagName = currentNode.tagName;

          if (tagName) {
            tagNames.push(this._createSelectorByNthOfType(currentNode));
          }

          currentNode = currentNode.parentNode;
        }

        console.log(textNodeIndex);
        console.log(tagNames);
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
    let nthIndex = `${node.tagName}`;

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
      nthIndex = `${node.tagName}:nth-of-type(${elementsWithSameTag})`;
    }
    return nthIndex;
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
