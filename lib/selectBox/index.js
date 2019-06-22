"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _isObject = _interopRequireDefault(require("../common/util/isObject.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SelectBoxClass = _vue.default.extend(require('./selectBox.js').default);

SelectBoxClass.prototype.config = function (options, fn) {
  this._selectBoxList = options.list;
  this._callback = fn;
};

SelectBoxClass.prototype.show = function (options) {
  this.isShow = true;
};

function selectBox(options, fn) {
  if (!(0, _isObject.default)(options)) options = Object.create(null);
  var selectBoxInstance = new SelectBoxClass({
    el: document.createElement('div')
  });
  selectBoxInstance.config(options, fn);
  selectBoxInstance.show();
}

var _default = selectBox;
exports.default = _default;