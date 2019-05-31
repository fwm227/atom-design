"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = install;

var _lazyload = _interopRequireDefault(require("./lazyload.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function install(Vue) {
  Vue.directive('lazyload', _lazyload.default.lazyload);
}

;