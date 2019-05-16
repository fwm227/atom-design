import Vue from 'vue';
import typeEqual from '../common/util/typeEqual.js';

const SelectBoxClass = Vue.extend(require('./selectBox.js').default);

SelectBoxClass.prototype.config = function (options, fn) {
  this._selectBoxList = options.list;
  this._callback = fn;
};
SelectBoxClass.prototype.show = function (options) {
  this.isShow = true;
};
function selectBox (options, fn) {
  if (!typeEqual(options, 'Object')) options = Object.create(null);
  const selectBoxInstance = new SelectBoxClass({el: document.createElement('div')});
  selectBoxInstance.config(options, fn);
  selectBoxInstance.show();
}

export default selectBox;
