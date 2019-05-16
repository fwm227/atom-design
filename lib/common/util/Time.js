"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTime = setTime;
exports.getTime = getTime;

function setTime() {
  window._createPopupNsTime = performance && performance.now ? performance.now().toFixed(3) : Date.now();
}

function getTime() {
  return window._createPopupNsTime;
}