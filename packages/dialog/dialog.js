import './style.css';
import atomBtn from '../button';
import atomPopup from '../common/mixin/popup';
import {scaleTransition} from '../common/transition';
import isObject from '../common/util/isObject';
import objAssign from '../common/util/objAssign';

export default {
  name: 'atom-dialog',
  mixins: [atomPopup],
  data () {
    return {
      isInput: false,
      isCancel: false,
      isSubmit: true,
      title: null,
      desc: null,
      options: null,
      clickMaskClose: false,
      promptValue: null
    };
  },
  components: {
    atomBtn
  },
  render (h) {
    const textRender = h('div', {staticClass: 'atom-dialog-text'}, this.desc);
    const inputRender = h('input', {
      staticClass: 'atom-dialog-input',
      attrs: {placeholder: this.desc},
      on: {
        input: () => {
          this.promptValue = event.target.value;
        }
      }
    });

    // init button-style
    const _defaultCancel = {
      'line-height': '28px'
    }
    const _defaultSubmit = {
      'line-height': '28px',
      'color': '#108ee9'
    }

    const cancelBtn = h('atom-btn', {
      attrs: {
        type: 'default',
        size: 'large',
        actionStyle: this._cancelBtn && this._cancelBtn.actionStyle
      },
      style: this._cancelBtn && isObject(this._cancelBtn.style) ? objAssign(_defaultCancel, this._cancelBtn.style) : _defaultCancel,
      nativeOn: {
        click: () => {
          this.close();
          (this._cancelBtn && this._cancelBtn.event) && (this.isInput ? this._cancelBtn.event(this.promptValue) : this._cancelBtn.event());
        }
      }
    }, this._cancelBtn && this._cancelBtn.text);
    const submitBtn = h('atom-btn', {
      attrs: {
        size: 'large',
        actionStyle: this._submitBtn && this._submitBtn.actionStyle
      },
      style: this._submitBtn && isObject(this._submitBtn.style) ? objAssign(_defaultSubmit, this._submitBtn.style) : _defaultSubmit,
      nativeOn: {
        click: () => {
          this.close();
          (this._submitBtn && this._submitBtn.event) && (this.isInput ? this._submitBtn.event(this.promptValue) : this._submitBtn.event());
        }
      }
    }, this._submitBtn && this._submitBtn.text);
    const btnRender = [];
    const titleRender = h('div', {staticClass: 'atom-dialog-title'}, this.title);
    if (this.isCancel) btnRender.push(cancelBtn);
    if (this.isSubmit) btnRender.push(submitBtn);
    const contentRender = this.isInput ? inputRender : textRender;

    return h(scaleTransition, {}, [
      h('div', {
        staticClass: 'atom-dialog',
        directives: [{
          name: 'show',
          value: this.isShow
        }],
        on: {
          click: () => {
            if (this.clickMaskClose) this.isShow = false;
          }
        }
      },
      [
        h('div', {
          staticClass: 'atom-dialog-content'
        },
        [
          titleRender,
          contentRender,
          h('div', {staticClass: 'atom-dialog-btn'}, btnRender)
        ])
      ])
    ]);
  }
};
