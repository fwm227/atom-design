"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-loading',
  props: {
    type: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#108ee9'
    },
    radius: {
      type: String
    }
  },
  computed: {
    bgColor: function bgColor() {
      if (this.type !== 0 && this.type !== 1) {
        return this.color;
      }

      return 'white';
    },
    borderColor: function borderColor() {
      if (this.type === 0 || this.type === 1) {
        return this.color;
      }

      return 'transparent';
    },
    radiusStyle: function radiusStyle() {
      if (this.type !== 0 && this.type !== 1) {
        return this.radius;
      }
    }
  },
  render: function render(h) {
    return h('div', {
      staticClass: "atom-loading".concat(this.type),
      style: {
        background: this.bgColor,
        'border-radius': this.radiusStyle
      }
    }, [h('div', {
      staticClass: 'loading-item',
      style: {
        'border-bottom-color': this.borderColor,
        'border-top-color': this.type === 1 && this.borderColor
      }
    })]);
  }
};
exports.default = _default;