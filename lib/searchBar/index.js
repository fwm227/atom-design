"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _clearIcon = _interopRequireDefault(require("../common/icon/clearIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  data: function data() {
    return {
      innerValue: null,
      showClear: false
    };
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    canClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    clearIcon: _clearIcon.default
  },
  watch: {
    value: function value(val) {
      this.innerValue = val;
    },
    innerValue: function innerValue(val) {
      this.$emit('input', val);
      !this.innerValue && (this.showClear = false);
    }
  },
  render: function render(h) {
    var _this = this;

    if (this.showClear) {
      var clearRender = h('clear-icon', {
        nativeOn: {
          click: function click() {
            _this.innerValue = '';
            _this.showClear = false;
          }
        }
      });
    }

    return h('div', {
      staticClass: 'atom-search'
    }, [h('div', {
      staticClass: 'search-icon'
    }, [h('div', {
      staticClass: 'icon-wrapper'
    })]), h('input', {
      domProps: {
        value: this.innerValue
      },
      staticClass: 'search-input',
      attrs: {
        type: 'text',
        placeholder: this.placeholder
      },
      on: {
        input: function input() {
          _this.innerValue = event.target.value;
          if (_this.canClear && _this.innerValue && !_this.showClear) _this.showClear = true;
        },
        focus: function focus() {
          if (_this.canClear && _this.innerValue) _this.showClear = true;
        }
      }
    }), clearRender]);
  }
};
exports.default = _default;