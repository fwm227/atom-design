import Vue from 'vue';
import {getTime} from '../util/Time.js';
import popupManager from '../mixin/popup/manager.js';

var MaskClass = Vue.extend(require('./mask.js').default);
MaskClass.prototype.show = function () {
  this.isShow = true;
};
MaskClass.prototype.close = function () {
  this.isShow = false;
  this.$el.addEventListener('transitionend', () => {
    popupManager.removePopup();
  }, {capture: false, once: true});
};

function MaskInstance () {
  this.maskInstance = new MaskClass({el: document.createElement('div')});
}

var Mask = Object.create(null);
Mask.show = function (actionMask) {
  MaskInstance.call(this);
  const popupNS = document.getElementsByTagNameNS(`atom-popup-wrapper${getTime()}`, 'div')[0];
  popupNS.appendChild(this.maskInstance.$el);
  setTimeout(() => {
    this.maskInstance.show();
  }, 0);
};
Mask.close = function () {
  this.maskInstance.close();
};

export default Mask;
