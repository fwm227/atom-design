"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var ToastClass = _vue.default.extend(require('./toast.js').default);

ToastClass.prototype.removeDom = function () {
  event.target.parentNode.removeChild(event.target);
};

ToastClass.prototype.config = function (options) {
  // set toast config
  if (options !== null && _typeof(options) === 'object') {
    this.message = options.message;
    this.duration = options.duration || 1e3;
    this.position = options.position || 'middle';
  } else {
    this.message = options;
    this.duration = 1e3;
    this.position = 'middle';
  }
};

ToastClass.prototype.show = function () {
  this.isActive = true;
};

ToastClass.prototype.hidden = function () {
  this.isActive = false;
  this.$el.addEventListener('transitionend', this.removeDom, {
    capture: false,
    once: true
  });
};

function toast(options) {
  var toastInstance = new ToastClass({
    el: document.createElement('div')
  }); // set toast config

  toastInstance.config(options);
  document.body.appendChild(toastInstance.$el);
  var startTimer = setTimeout(function () {
    toastInstance.show();
    clearTimeout(startTimer);
  }, 20);
  var endTimer = setTimeout(function () {
    toastInstance.hidden();
    clearTimeout(endTimer);
  }, toastInstance.duration);
}

var _default = toast;
exports.default = _default;