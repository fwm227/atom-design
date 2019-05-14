import {setTime, getTime} from '../../util/Time.js';

var popupManager = Object.create(null);
popupManager.lockScroll = function () {
  document.body.style.overflow = 'hidden';
};
popupManager.openScroll = function () {
  document.body.removeAttribute('style');
};
popupManager.createPopup = function (popupTarget) {
  setTime();
  const popupNSDom = document.createElementNS(`atom-popup-wrapper${getTime()}`, 'div');
  popupNSDom.appendChild(popupTarget);
  document.body.appendChild(popupNSDom);
};
popupManager.removePopup = function () {
  const popupDom = document.getElementsByTagNameNS(`atom-popup-wrapper${getTime()}`, 'div')[0];
  popupDom.parentNode.removeChild(popupDom);
};
export default popupManager;
