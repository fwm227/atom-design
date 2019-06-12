"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _manager = _interopRequireDefault(require("./manager.js"));

var _mask = _interopRequireDefault(require("../../mask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-popup',
  data: function data() {
    return {
      isShow: false
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    isShow: function isShow(val) {
      if (val) {
        _manager.default.createPopup(this.$el);

        _manager.default.lockScroll();

        _mask.default.show();
      } else {
        _mask.default.close();

        _manager.default.openScroll();
      }
    }
  }
};
exports.default = _default;