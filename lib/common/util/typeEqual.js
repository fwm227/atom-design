"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function typeEqual(obj, type) {
  return Object.prototype.toString.call(obj) === "[object ".concat(type, "]");
}

var _default = typeEqual;
exports.default = _default;