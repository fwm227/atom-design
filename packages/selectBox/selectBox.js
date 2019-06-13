import './style.css';
import atomBtn from '../button';
import atomPopup from '../common/mixin/popup';
import {scaleTransition} from '../common/transition';

export default {
  name: 'atom-select-box',
  mixins: [atomPopup],
  data () {
    return {
      clickMaskClose: true
    };
  },
  components: {
    atomBtn
  },
  render (h) {
    return h(scaleTransition, {}, [
      h('div', {
        staticClass: 'atom-selectBox',
        directives: [{
          name: 'show',
          value: this.isShow
        }],
        on: {
          click: () => {
            if (this.clickMaskClose) this.isShow = false;
          }
        }
      }, [
        h('div', {staticClass: 'select-content'}, [
          this._selectBoxList && this._selectBoxList.map((el, index) => {
            return h('div', {
              staticClass: 'select-item',
              style: el.style,
              on: {
                click: () => {
                  this._callback && this._callback(el.text, index);
                }
              }
            }, el.text);
          })
        ])
      ])
    ]);
  }
};
