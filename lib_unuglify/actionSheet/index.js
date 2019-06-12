"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _typeEqual = _interopRequireDefault(require("../common/util/typeEqual.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AtionSheetClass = _vue.default.extend(require('./actionSheet.js').default);

AtionSheetClass.prototype.config = function (options, fn) {
  this._cancelBtn = options.cancelBtn;
  this._actionList = options.list;
  this._callback = fn;
};

AtionSheetClass.prototype.close = function (options) {
  this.isShow = false;
};

AtionSheetClass.prototype.show = function (options) {
  this.isShow = true;
};

function actionSheet(options, fn) {
  if (!(0, _typeEqual.default)(options, 'Object')) options = Object.create(null);
  var actionSheetInstance = new AtionSheetClass({
    el: document.createElement('div')
  });
  actionSheetInstance.config(options, fn);
  actionSheetInstance.show();
}

;
var _default = actionSheet;
exports.default = _default;