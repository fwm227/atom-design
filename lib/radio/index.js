"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-radio',
  props: {
    name: {
      type: String
    },
    val: {
      type: String
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#108ee9'
    }
  },
  mounted: function mounted() {
    if (this.value === this.val) this.$el.children.item(0).checked = true;
    if (this.disabled) this.$el.children.item(0).disabled = true;
  },
  computed: {
    bgColor: function bgColor() {
      if (this.value === this.val) return this.color;else return 'white';
    }
  },
  watch: {
    disabled: function disabled(val) {
      if (this.disabled) this.$el.children.item(0).disabled = true;else this.$el.children.item(0).disabled = false;
    }
  },
  render: function render(h) {
    var _this = this;

    return h('label', {
      staticClass: 'atom-radio'
    }, [h('input', {
      attrs: {
        type: 'radio',
        name: this.name,
        value: this.val
      },
      staticClass: 'radio-input',
      on: {
        change: function change() {
          _this.$emit('input', event.target.value);
        }
      }
    }), h('label', {
      staticClass: 'radio-label',
      style: {
        background: this.bgColor
      }
    })]);
  }
};
exports.default = _default;