"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _popup = _interopRequireDefault(require("../common/mixin/popup"));

var _transition = require("../common/transition");

var _isObject = _interopRequireDefault(require("../common/util/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-action-sheet',
  mixins: [_popup.default],
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'atom-actionsheet',
      on: {
        click: function click() {
          _this.isShow = false;
        }
      }
    }, [h(_transition.slideTopTransition, {}, [h('ul', {
      staticClass: 'action-sheet-content',
      directives: [{
        name: 'show',
        value: this.isShow
      }],
      on: {
        click: function click() {
          event.stopPropagation();
        }
      }
    }, [this._actionList && this._actionList.map(function (el, index) {
      return h('li', {
        staticClass: 'action-sheet-item',
        style: (0, _isObject.default)(el.style) && el.style,
        on: {
          click: function click() {
            _this._callback && _this._callback(el.text, index);
          }
        }
      }, el.text);
    })].concat([this._cancelBtn && h('div', {
      staticClass: 'actionsheet-cancel',
      style: (0, _isObject.default)(this._cancelBtn.style) && this._cancelBtn.style,
      on: {
        click: function click() {
          _this.isShow = false;
        }
      }
    }, this._cancelBtn.text)]))])]);
  }
};
exports.default = _default;