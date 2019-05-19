"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _clearIcon = _interopRequireDefault(require("../common/icon/clearIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-input-item',
  data: function data() {
    return {
      innerValue: null,
      showClear: false
    };
  },
  components: {
    clearIcon: _clearIcon.default
  },
  computed: {
    alignClass: function alignClass() {
      if (this.align === 'center') return 'input-align-center';else if (this.align === 'right') return 'input-align-right';
    }
  },
  props: {
    value: {
      type: String
    },
    canClear: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      defualt: 'text'
    },
    align: {
      type: String,
      default: 'left'
    },
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    inputStyle: {
      type: Object,
      default: null
    }
  },
  watch: {
    value: function value(val) {
      this.innerValue = val;
    },
    innerValue: function innerValue(val) {
      if (!val) this.showClear = false;
      this.$emit('input', val);
    }
  },
  render: function render(h) {
    var _this = this;

    if (this.showClear) {
      var clearRender = h('clear-icon', {
        nativeOn: {
          // handle bug that is click event invoked after blur event
          mousedown: function mousedown() {
            _this.innerValue = '';
            _this.showClear = false;
          }
        }
      });
    }

    return h('div', {
      staticClass: 'atom-input'
    }, [h('span', {
      staticClass: 'input-title'
    }, this.title), h('input', {
      domProps: {
        value: this.value
      },
      attrs: {
        type: this.type,
        placeholder: this.placeholder
      },
      class: ['input-bar', this.alignClass],
      style: this.inputStyle,
      on: {
        input: function input() {
          _this.innerValue = event.target.value;
          if (_this.canClear && _this.innerValue && !_this.showClear) _this.showClear = true;
        },
        focus: function focus() {
          if (_this.canClear && _this.innerValue) _this.showClear = true;
        },
        blur: function blur() {
          _this.showClear = false;
        }
      }
    }), clearRender]);
  }
};
exports.default = _default;