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
        var textNodeIndex = this.getChildNodeIndexOf(endContainer);
        currentNode = startContainer;

        while (currentNode) {
          var tagName = currentNode.tagName;

          if (tagName) {
            var nthIndex = this.getPositionNthOfType(currentNode);

            console.log(nthIndex);

            var selector = tagName;

            if (nthIndex > 1) {
              selector += ':nth-of-type(' + nthIndex + ')';
            }

            tagNames.push(selector);
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
   * example: getPositionNthOfType(p) => div > h1 + p > i + p // 1 or 2
   */
  getPositionNthOfType = node => {
    let childNodes = this.getChildNodesOfParentNode(node);

    let elementsWithSameTag = 0;

    for (let currentNode of childNodes) {
      if (currentNode === node) {
        return ++elementsWithSameTag;
      }
      if (currentNode.tagName === node.tagName) {
        elementsWithSameTag++;
      }
    }
  };

  /**
   * Recebe o elemento e retorna sua posição
   * em relação ao seu pai
   * @param Element node
   * @return int
   * example: getChildNodeIndexOf(p) => div > h1 + p > i + div // 1
   */
  getChildNodeIndexOf = node => {
    let childNodes = this.getChildNodesOfParentNode(node);

    for (let [indexOf, currentNode] of Object.entries(childNodes)) {
      if (currentNode === node) {
        return indexOf;
      }
    }
  };

  /**
   * @description Acessa o elemento pai e retorna os seus filhos
   * @param Element node
   */
  getChildNodesOfParentNode = ({ parentNode: { childNodes } }) => childNodes;
}
