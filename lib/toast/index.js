import Vue from 'vue';
const ToastClass = Vue.extend(require('./toast.js').default);

ToastClass.prototype.removeDom = function () {
  event.target.parentNode.removeChild(event.target);
};
ToastClass.prototype.config = function (options) {
  // set toast config
  if (options !== null && typeof options === 'object') {
    this.message = options.message;
    this.duration = options.duration || 1e3;
    this.position = options.position || 'middle';
  } else {
    this.message = options;
    this.duration = 1e3;
    this.position = 'middle';
  }
};
ToastClass.prototype.show = function () {
  this.isActive = true;
};
ToastClass.prototype.hidden = function () {
  this.isActive = false;
  this.$el.addEventListener('transitionend', this.removeDom, {capture: false, once: true});
};

function toast (options) {
  var toastInstance = new ToastClass({el: document.createElement('div')});
  // set toast config
  toastInstance.config(options);
  document.body.appendChild(toastInstance.$el);
  var startTimer = setTimeout(function () {
    toastInstance.show();
    clearTimeout(startTimer);
  }, 0);
  var endTimer = setTimeout(function () {
    toastInstance.hidden();
    clearTimeout(endTimer);
  }, toastInstance.duration);
}

export default toast;
