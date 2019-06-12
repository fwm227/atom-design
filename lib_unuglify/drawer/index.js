"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _transition = require("../common/transition");

var _default = {
  name: 'atom-drawer',
  data: function data() {
    return {
      showMask: false
    };
  },
  props: {
    type: {
      type: String,
      default: 'build-in'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function value(val) {
      this.showMask = val;
      var drawerContent = this.$el.children.item(0);

      if (val) {
        this.type === 'popup' ? this.showMask = true : drawerContent.children.item(1).style.transform = "translate3d(".concat(drawerContent.children.item(0).offsetWidth, "px, 0, 0)");
        drawerContent.children.item(0).style.transform = "translate3d(".concat(drawerContent.children.item(0).offsetWidth, "px, 0, 0)");
      } else {
        this.type === 'popup' ? this.showMask = false : drawerContent.children.item(1).style.transform = 'translate3d(0, 0, 0)';
        drawerContent.children.item(0).style.transform = 'translate3d(0, 0, 0)';
      }

      this.$emit('input', val);
    }
  },
  mounted: function mounted() {
    this.initStyle();
  },
  methods: {
    initStyle: function initStyle() {
      var drawerContent = this.$el.children.item(0);
      drawerContent.children.item(0).style = "position: absolute; left: -".concat(drawerContent.children.item(0).offsetWidth, "px; top: 0; transition: transform 300ms; z-index: 2019");
      if (this.type !== 'popup') drawerContent.children.item(1).style = 'position: absolute; left: 0; top: 0; transition: transform 300ms;';
    }
  },
  render: function render(h) {
    var _this = this;

    if (this.type === 'popup') {
      var maskRender = h(_transition.fadeTransition, {}, [h('div', {
        staticClass: 'drawer-mask',
        directives: [{
          name: 'show',
          value: this.showMask
        }],
        on: {
          click: function click() {
            _this.showMask = false; // close navbar

            _this.$el.children.item(0).children.item(0).style.transform = 'translate3d(0, 0, 0)';

            _this.$emit('input', false);
          }
        }
      })]);
    }

    return h('div', {
      class: 'atom-drawer'
    }, [h('div', {
      staticClass: 'atom-drawper-wrapper'
    }, [this.$slots.navbar, this.$slots.content, maskRender])]);
  }
};
exports.default = _default;