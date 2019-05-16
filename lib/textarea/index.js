"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  data: function data() {
    return {
      length: 0
    };
  },
  props: {
    value: {
      type: String
    },
    maxLength: {
      type: Number
    },
    placeholder: {
      type: String
    }
  },
  render: function render(h) {
    var _this = this;

    if (this.maxLength !== void 0) {
      var limitRender = h('div', {
        staticClass: 'textarea-limit'
      }, "".concat(this.length, " / ").concat(this.maxLength));
    }

    return h('div', {
      staticClass: 'atom-textarea'
    }, [h('textarea', {
      staticClass: 'textarea-entry',
      attrs: {
        placeholder: this.placeholder
      },
      on: {
        input: function input() {
          var currentLength = event.target.value.length;
          if (currentLength > _this.maxLength) event.target.value = event.target.value.slice(0, _this.maxLength);else _this.length = currentLength;

          _this.$emit('input', event.target.value);
        }
      }
    }), limitRender]);
  }
};
exports.default = _default;