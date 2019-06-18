"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _isObject = _interopRequireDefault(require("../common/util/isObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DialogClass = _vue.default.extend(require('./dialog.js').default); // config dialog


DialogClass.prototype.config = function (options) {
  if (options.cancelBtn) this._cancelBtn = options.cancelBtn;
  if (options.submitBtn) this._submitBtn = options.submitBtn;
  if (options.clickMaskClose) this.clickMaskClose = options.clickMaskClose;
  this.isInput = options.isInput;
  this.isCancel = options.isCancel;
  this.title = options.title;
  this.desc = options.desc;
};

DialogClass.prototype.close = function () {
  this.isShow = false;
};

DialogClass.prototype.show = function () {
  this.isShow = true;
};

function Dialog(options) {
  var dialogInstance = new DialogClass({
    el: document.createElement('div')
  });
  dialogInstance.config(options);
  dialogInstance.show();
}

Dialog.alert = function (title, desc, options) {
  if (!(0, _isObject.default)(options)) options = Object.create(null);
  options.isCancel = false;
  options.isInput = false;
  options.title = title;
  options.desc = desc;
  return Dialog(options);
};

Dialog.confirm = function (title, desc, options) {
  if (!(0, _isObject.default)(options)) options = Object.create(null);
  options.isCancel = true;
  options.isInput = false;
  options.title = title;
  options.desc = desc;
  return Dialog(options);
};

Dialog.prompt = function (title, desc, options) {
  if (!(0, _isObject.default)(options)) options = Object.create(null);
  options.isCancel = true;
  options.isInput = true;
  options.title = title;
  options.desc = desc;
  return Dialog(options);
};

var _default = Dialog;
exports.default = _default;