"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default2 = {
  name: 'atom-btn',
  data: function data() {
    return {
      active: false,
      cacheStyle: new Map()
    };
  },
  computed: {
    activeStyle: function activeStyle() {
      var _this = this;

      if (this.active) {
        var btnStyles = document.defaultView.getComputedStyle(this.$el); // handle conflict between custom-style and actionStyle

        Object.keys(this.actionStyle).forEach(function (key) {
          if (btnStyles[key]) {
            _this.cacheStyle.set(key, btnStyles[key]);

            _this.$el.style[key] = _this.actionStyle[key];
          }
        });
      } else {
        this.cacheStyle.forEach(function (val, key) {
          _this.$el.style[key] = val;
        });
        this.cacheStyle.clear();
      }
    },
    sizeClass: function sizeClass() {
      if (this.size === 'large') return 'btn-large';
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
    actionStyle: {
      type: Object,
      default: function _default() {
        return {
          background: '#f7f8f9'
        };
      }
    }
  },
  render: function render(h) {
    var _this2 = this;

    return h('button', {
      attrs: {
        name: 'button',
        type: 'button'
      },
      class: ['atom-btn', "btn-".concat(this.type), this.sizeClass],
      style: this.activeStyle,
      on: {
        touchstart: function touchstart() {
          _this2.active = true;
        },
        touchend: function touchend() {
          _this2.active = false;
        }
      }
    }, this.$slots.default);
  }
};
exports.default = _default2;