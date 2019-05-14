import Vue from 'vue';
import typeEqual from '../common/util/typeEqual.js';

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
  if (!typeEqual(options, 'Object')) options = Object.create(null);
  const actionSheetInstance = new AtionSheetClass({el: document.createElement('div')});
  actionSheetInstance.config(options, fn);
  actionSheetInstance.show();
};

export default actionSheet;
