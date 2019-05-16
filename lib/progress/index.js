"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-progress',
  props: {
    value: {
      type: Number
    },
    color: {
      type: String
    },
    lineHeight: {
      type: String,
      defualt: '2px'
    }
  },
  computed: {
    animWidth: function animWidth() {
      if (this.value < 0) return 0;else return this.value % 100;
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: 'atom-progress'
    }, [h('div', {
      staticClass: 'progress-default-line',
      style: {
        'border-width': this.lineHeight
      }
    }), h('div', {
      staticClass: 'progress-active-line',
      style: {
        width: "".concat(this.animWidth, "%"),
        background: this.color,
        height: this.lineHeight
      }
    })]);
  }
};
exports.default = _default;