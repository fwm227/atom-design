import Vue from 'vue';

const PickerClass = Vue.extend(require('./picker.js').default);
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

function Picker (options) {
  const pickerInstance = new PickerClass({el: document.createElement('div')});
  pickerInstance.config(options);
  pickerInstance.show();
}

export default Picker;
