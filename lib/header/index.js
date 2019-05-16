"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-header',
  props: {
    text: {
      type: String
    }
  },
  render: function render(h) {
    return h('header', {
      staticClass: 'atom-header'
    }, [this.$slots.left, this.$slots.center, this.$slots.right]);
  }
};
exports.default = _default;