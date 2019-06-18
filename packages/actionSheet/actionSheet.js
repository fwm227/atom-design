import './style.css';
import atomPopup from '../common/mixin/popup';
import {slideTopTransition} from '../common/transition';
import isObject from '../common/util/isObject';

export default {
  name: 'atom-action-sheet',
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
              style: isObject(el.style) && el.style,
              on: {
                click: () => {
                  this._callback && this._callback(el.text, index);
                }
              }
            }, el.text);
          })],
          this._cancelBtn && h('div', {
            staticClass: 'actionsheet-cancel',
            style: isObject(this._cancelBtn.style) && this._cancelBtn.style,
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
