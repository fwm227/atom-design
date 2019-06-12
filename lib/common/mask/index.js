"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _Time = require("../util/Time.js");

var _manager = _interopRequireDefault(require("../mixin/popup/manager.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MaskClass = _vue.default.extend(require('./mask.js').default);

MaskClass.prototype.show = function () {
  this.isShow = true;
};

MaskClass.prototype.close = function () {
  this.isShow = false;
  this.$el.addEventListener('transitionend', function () {
    _manager.default.removePopup();
  }, {
    capture: false,
    once: true
  });
};

function MaskInstance() {
  this.maskInstance = new MaskClass({
    el: document.createElement('div')
  });
}

var Mask = Object.create(null);

Mask.show = function (actionMask) {
  var _this = this;

  MaskInstance.call(this);
  var popupNS = document.getElementsByTagNameNS("atom-popup-wrapper".concat((0, _Time.getTime)()), 'div')[0];
  popupNS.appendChild(this.maskInstance.$el);
  setTimeout(function () {
    _this.maskInstance.show();
  }, 0);
};

Mask.close = function () {
  this.maskInstance.close();
};

var _default = Mask;
exports.default = _default;