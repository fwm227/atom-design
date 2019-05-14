import popupManager from './manager.js';
import atomMask from '../../mask';

export default {
  name: 'atom-popup',
  data () {
    return {
      isShow: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow (val) {
      if (val) {
        popupManager.createPopup(this.$el);
        popupManager.lockScroll();
        atomMask.show();
      } else {
        atomMask.close();
        popupManager.openScroll();
      }
    }
  }
};
