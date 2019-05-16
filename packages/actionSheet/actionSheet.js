import './style.css';
import atomPopup from '../common/mixin/popup';
import {slideTopTransition} from '../common/transition';

export default {
  name: 'atom-actionSheet',
  mixins: [atomPopup],
  render: function (h) {
    return h('div', {
      staticClass: 'atom-actionsheet',
      on: {
        click: () => {
          this.isShow = false;
        }
      }
    },
    [
      h(slideTopTransition, {}, [
        h('ul', {
          staticClass: 'action-sheet-content',
          directives: [{
            name: 'show',
            value: this.isShow
          }],
          on: {
            click: () => {
              event.stopPropagation();
            }
          }
        },
        [
          ...[this._actionList && this._actionList.map((el, index) => {
            return h('li', {
              staticClass: 'action-sheet-item',
              style: el.style,
              on: {
                click: () => {
                  this._callback(el, index);
                }
              }
            }, el.text);
          })],
          this._cancelBtn && h('div', {
            staticClass: 'actionsheet-cancel',
            style: this._cancelBtn.style,
            on: {
              click: () => {
                this.isShow = false;
              }
            }
          }, this._cancelBtn.text)
        ])
      ])
    ]);
  }
};
