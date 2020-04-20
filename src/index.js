import localForage from 'localforage';
import HandleRange from './handle-range';
import { debounceTime, baseUrl } from './utils';

/**
 * @class HightlightMarkup
 */
export default class HightlightMarkup {
  constructor() {
    this.init();
  }

  init = () => {
    try {
      document.addEventListener(
        'selectionchange',
        debounceTime(e => {
          let selection = window.getSelection();

          for (let i = 0; i < selection.rangeCount; i++) {
            let range = selection.getRangeAt(0);

            const handleRange = new HandleRange(range);

            this.createSelection(handleRange.selectorStart);
          }
        }, 1000)
      );
    } catch (error) {}
  };

  createSelection = async currentSelection => {
    try {
      const value = await localForage.setItem(
        baseUrl,
        JSON.stringify({
          selection: currentSelection,
        })
      );
      // This code runs once the value has been loaded
      // from the offline store.
      console.log(value);
    } catch (err) {
      // This code runs if there were any errors.
      console.log(err);
    }
  };
}
