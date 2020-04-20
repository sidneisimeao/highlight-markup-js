/**
 * @class HandleRange
 */
export default class HandleRange {
  constructor(range) {
    this.range = range;
    this.init();
  }

  init = () => {
    let {
      startContainer,
      endContainer,
      startOffset,
      endOffset,
      collapsed,
    } = this.range;

    if (!collapsed) {
      this.textNodeIndexStart = this._getChildNodeIndexOf(startContainer);
      this.textNodeIndexEnd = this._getChildNodeIndexOf(endContainer);
      this.selectorStart = this._createSelectorByNode(startContainer);
      this.selectorEnd = this._createSelectorByNode(endContainer);
      this.startOffset = startOffset;
      this.endOffset = endOffset;
    }
  };

  /**
   * Retorna a referencia do nó e no DOM
   * @param Element node
   * @return string
   * @example html > body > main > article > div > p:nth-of-type(3)
   */
  _createSelectorByNode = node => {
    let currentNode = node;
    let tagNames = [];

    while (currentNode) {
      if (currentNode.tagName) {
        tagNames.push(this._createSelectorByNthOfType(currentNode));
      }
      currentNode = currentNode.parentNode;
    }
    return tagNames
      .reverse()
      .join('>')
      .toLowerCase();
  };

  /**
   * Retorna a posição do elemento em relação aos
   * seus irmãos do mesmo tipo
   * @param Element node
   * @return string
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
