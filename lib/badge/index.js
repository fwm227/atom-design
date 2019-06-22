"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-badge',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  render: function render(h) {
    return h('div', {
      class: ['atom-badge', this.type]
    }, this.$slots.default);
  }
};
exports.default = _default;