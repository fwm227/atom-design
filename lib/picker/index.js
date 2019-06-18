"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerClass = _vue.default.extend(require('./picker.js').default);

PickerClass.prototype.show = function () {
  this.isShow = true;
};

PickerClass.prototype.close = function () {
  this.isShow = false;
};

PickerClass.prototype.config = function (options) {
  this._pickerList = options.data;
  this._cancelBtn = options.cancelBtn;
  this._submitBtn = options.submitBtn;
};

function Picker(options) {
  var pickerInstance = new PickerClass({
    el: document.createElement('div')
  });
  pickerInstance.config(options);
  pickerInstance.show();
}

var _default = Picker;
exports.default = _default;