"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function objAssign(target, source) {
  for (var key in source) {
    target[key] = source[key];
  }

  return target;
}

var _default = objAssign;
exports.default = _default;