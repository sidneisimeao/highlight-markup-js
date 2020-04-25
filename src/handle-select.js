import localForage from 'localforage';
import { debounceTime, baseUrl } from './utils';
import HandleRange from './handle-range';
/**
 * @class HandleRange
 */
class HandleSelect {
  static createSelectionListener() {
    document.addEventListener(
      'selectionchange',
      debounceTime(e => {
        let selection = window.getSelection();

        for (let i = 0; i < selection.rangeCount; i++) {
          let range = selection.getRangeAt(0);
          if (!range.collapsed) {
            const handleRange = new HandleRange(range);

            this._saveSelection(handleRange);
          }
        }
      }, 1000)
    );
  }

  static _saveSelection = async handleRange => {
    try {
      const selectionStorage = {
        textNodeIndexStart: handleRange.textNodeIndexStart,
        textNodeIndexEnd: handleRange.textNodeIndexEnd,
        selectorStart: handleRange.selectorStart,
        selectorEnd: handleRange.selectorEnd,
        startOffset: handleRange.startOffset,
        endOffset: handleRange.endOffset,
      };

      const value = await localForage.setItem(
        baseUrl,
        JSON.stringify({
          [handleRange.selectorStart]: selectionStorage,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  static loadAllSelectionInPage() {
    localForage
      .getItem(baseUrl)
      .then(this.createSelections)
      .catch(function(err) {
        console.log(err);
      });
  }

  static createSelections = value => {
    const selection = JSON.parse(value);

    for (const key in selection) {
      const range = document.createRange();

      const {
        selectorStart,
        selectorEnd,
        startOffset,
        endOffset,
        textNodeIndexStart,
        textNodeIndexEnd,
      } = selection[key];

      const elementStart = document.querySelector(selectorStart);
      const elementEnd = document.querySelector(selectorEnd);

      range.setStart(elementStart.childNodes[textNodeIndexStart], startOffset);
      range.setEnd(elementEnd.childNodes[textNodeIndexEnd], endOffset);

      document.getSelection().addRange(range);
    }
  };
}

export default HandleSelect;
