"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _carousel = _interopRequireDefault(require("../carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-tabs',
  props: {
    value: {
      type: Number
    },
    isGesture: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number
    },
    text: {
      type: String
    }
  },
  components: {
    atomCarousel: _carousel.default
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'atom-tabs'
    }, [this.$slots.navbar, h('atom-carousel', {
      attrs: {
        isTabs: true,
        value: this.value,
        duration: this.duration,
        isLock: !this.isGesture
      },
      on: {
        input: function input(val) {
          _this.$emit('input', val);
        }
      }
    }, this.$slots.default)]);
  }
};
exports.default = _default;