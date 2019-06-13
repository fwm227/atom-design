"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Time = require("../../util/Time.js");

var popupManager = Object.create(null);

popupManager.lockScroll = function () {
  document.body.style.overflow = 'hidden';
};

popupManager.openScroll = function () {
  document.body.removeAttribute('style');
};

popupManager.createPopup = function (popupTarget) {
  (0, _Time.setTime)();
  var popupNSDom = document.createElementNS("atom-popup-wrapper".concat((0, _Time.getTime)()), 'div');
  popupNSDom.appendChild(popupTarget);
  document.body.appendChild(popupNSDom);
};

popupManager.removePopup = function () {
  var popupDom = document.getElementsByTagNameNS("atom-popup-wrapper".concat((0, _Time.getTime)()), 'div')[0];
  popupDom.parentNode.removeChild(popupDom);
};

var _default = popupManager;
exports.default = _default;