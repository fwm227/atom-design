import './style.css';
import atomBtn from '../button';
import atomPopup from '../common/mixin/popup';
import {scaleTransition} from '../common/transition';
import typeEqual from '../common/util/typeEqual';

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
    // initial button style
    let _cancelBtnStyle = Object.create(null);
    let _submitBtnStyle = Object.create(null);

    if (this._cancelBtn && typeEqual(this._cancelBtn.style, 'Object')) _cancelBtnStyle = this._cancelBtn.style;
    _cancelBtnStyle['line-height'] = '28px';

    if (this._submitBtn && typeEqual(this._submitBtn.style, 'Object')) _submitBtnStyle = this._submitBtn.style;
    _submitBtnStyle['line-height'] = '28px';
    _submitBtnStyle['color'] = '#108ee9';

    const cancelBtn = h('atom-btn', {
      attrs: {
        type: 'default',
        size: 'large',
        actionStyle: this._cancelBtn && this._cancelBtn.actionStyle
      },
      style: _cancelBtnStyle,
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
      style: _submitBtnStyle,
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
