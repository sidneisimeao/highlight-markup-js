import HandleSelect from './handle-select';

/**
 * @class HightlightMarkup
 */
export default class HightlightMarkup {
  constructor() {
    this.init();
  }

  init = () => {
    HandleSelect.loadAllSelectionInPage();
    HandleSelect.createSelectionListener();
  };
}
