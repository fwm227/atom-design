"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-toast',
  data: function data() {
    return {
      position: null,
      isActive: false
    };
  },
  computed: {
    // animation control
    animClass: function animClass() {
      if (this.isActive) {
        return "".concat(this.position, "-active");
      } else {
        return 'remove';
      }
    }
  },
  render: function render(h) {
    return h('div', {
      attrs: {
        role: 'toast'
      },
      class: ['atom-toast', "".concat(this.position, "-position"), this.animClass]
    }, [this.message]);
  }
};
exports.default = _default;