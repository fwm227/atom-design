"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _button = _interopRequireDefault(require("../button"));

var _popup = _interopRequireDefault(require("../common/mixin/popup"));

var _transition = require("../common/transition");

var _typeEqual = _interopRequireDefault(require("../common/util/typeEqual"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-dialog',
  mixins: [_popup.default],
  data: function data() {
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
    atomBtn: _button.default
  },
  render: function render(h) {
    var _this = this;

    var textRender = h('div', {
      staticClass: 'atom-dialog-text'
    }, this.desc);
    var inputRender = h('input', {
      staticClass: 'atom-dialog-input',
      attrs: {
        placeholder: this.desc
      },
      on: {
        input: function input() {
          _this.promptValue = event.target.value;
        }
      }
    }); // initial button style

    var _cancelBtnStyle = Object.create(null);

    var _submitBtnStyle = Object.create(null);

    if (this._cancelBtn && (0, _typeEqual.default)(this._cancelBtn.style, 'Object')) _cancelBtnStyle = this._cancelBtn.style;
    _cancelBtnStyle['line-height'] = '28px';
    if (this._submitBtn && (0, _typeEqual.default)(this._submitBtn.style, 'Object')) _submitBtnStyle = this._submitBtn.style;
    _submitBtnStyle['line-height'] = '28px';
    _submitBtnStyle['color'] = '#108ee9';
    var cancelBtn = h('atom-btn', {
      attrs: {
        type: 'default',
        size: 'large',
        actionStyle: this._cancelBtn && this._cancelBtn.actionStyle
      },
      staticClass: 'dialog-btn',
      style: _cancelBtnStyle,
      nativeOn: {
        click: function click() {
          _this.close();

          _this._cancelBtn && _this._cancelBtn.event && (_this.isInput ? _this._cancelBtn.event(_this.promptValue) : _this._cancelBtn.event());
        }
      }
    }, this._cancelBtn && this._cancelBtn.text);
    var submitBtn = h('atom-btn', {
      attrs: {
        size: 'large',
        actionStyle: this._submitBtn && this._submitBtn.actionStyle
      },
      style: _submitBtnStyle,
      nativeOn: {
        click: function click() {
          _this.close();

          _this._submitBtn && _this._submitBtn.event && (_this.isInput ? _this._submitBtn.event(_this.promptValue) : _this._submitBtn.event());
        }
      }
    }, this._submitBtn && this._submitBtn.text);
    var btnRender = [];
    var titleRender = h('div', {
      staticClass: 'atom-dialog-title'
    }, this.title);
    if (this.isCancel) btnRender.push(cancelBtn);
    if (this.isSubmit) btnRender.push(submitBtn);
    var contentRender = this.isInput ? inputRender : textRender;
    return h(_transition.scaleTransition, {}, [h('div', {
      staticClass: 'atom-dialog',
      directives: [{
        name: 'show',
        value: this.isShow
      }],
      on: {
        click: function click() {
          if (_this.clickMaskClose) _this.isShow = false;
        }
      }
    }, [h('div', {
      staticClass: 'atom-dialog-content'
    }, [titleRender, contentRender, h('div', {
      staticClass: 'atom-dialog-btn'
    }, btnRender)])])]);
  }
};
exports.default = _default;