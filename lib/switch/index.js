"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-switch',
  computed: {
    inner_value: {
      get: function get() {
        return this.value;
      },
      set: function set(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    mainColor: function mainColor() {
      if (this.inner_value) {
        return this.color;
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#108ee9'
    }
  },
  render: function render(h) {
    var _this = this;

    return h('label', {
      staticClass: 'atom-switch'
    }, [h('input', {
      staticClass: 'switch-input',
      attrs: {
        type: 'checkbox'
      },
      domProps: {
        checked: this.inner_value
      },
      on: {
        change: function change() {
          _this.inner_value = event.target.checked;
        }
      }
    }), h('label', {
      staticClass: 'switch-label',
      style: {
        background: this.mainColor
      }
    })]);
  }
};
exports.default = _default;