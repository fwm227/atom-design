"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _loadmore = _interopRequireDefault(require("./loadmore.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.directive('loadmore', _loadmore.default.loadmore);
}

;