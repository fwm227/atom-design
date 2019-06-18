"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _button = _interopRequireDefault(require("../button"));

var _popup = _interopRequireDefault(require("../common/mixin/popup"));

var _transition = require("../common/transition");

var _isObject = _interopRequireDefault(require("../common/util/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-select-box',
  mixins: [_popup.default],
  data: function data() {
    return {
      clickMaskClose: true
    };
  },
  components: {
    atomBtn: _button.default
  },
  render: function render(h) {
    var _this = this;

    return h(_transition.scaleTransition, {}, [h('div', {
      staticClass: 'atom-selectBox',
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
      staticClass: 'select-content'
    }, [this._selectBoxList && this._selectBoxList.map(function (el, index) {
      return h('div', {
        staticClass: 'select-item',
        style: (0, _isObject.default)(el.style) && el.style,
        on: {
          click: function click() {
            _this._callback && _this._callback(el.text, index);
          }
        }
      }, el.text);
    })])])]);
  }
};
exports.default = _default;