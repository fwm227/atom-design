import Vue from 'vue';
import isObject from '../common/util/isObject.js';

const AtionSheetClass = Vue.extend(require('./actionSheet.js').default);

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
function actionSheet (options, fn) {
  if (!isObject(options)) options = Object.create(null);
  const actionSheetInstance = new AtionSheetClass({el: document.createElement('div')});
  actionSheetInstance.config(options, fn);
  actionSheetInstance.show();
};

export default actionSheet;
