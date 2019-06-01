"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function getScrollDom() {
  var element = arguments[0];

  while (element && element.tagName !== 'HTML' && element.tagName !== 'BODY') {
    var scrollYStyle = document.defaultView.getComputedStyle(element).overflowY;

    if (element.nodeType === 1 && (scrollYStyle === 'auto' || scrollYStyle === 'scroll')) {
      return element;
    }

    element = element.parentNode;
  }

  return window;
}

function throttle(fn, delay) {
  var now;
  var preExce = 0;

  var execute = function execute() {
    fn.call();
    preExce = now;
  };

  return function () {
    now = Date.now();

    if (now - preExce > delay) {
      execute();
    } else {
      var timer = setTimeout(function () {
        execute();
        clearTimeout(timer);
      }, delay);
    }
  };
}

function initEvent() {
  this.scrollTarget = getScrollDom(this.el);
  this.scrollEvent = throttle(scrollEvent.bind(this), 2e2); // initialize src attribute of img tag when tag visible

  this.scrollEvent();
  this.scrollTarget.addEventListener('scroll', this.scrollEvent, {
    capture: false
  });
}

function scrollEvent() {
  var _this = this;

  var canExec = false;

  if (this.scrollTarget !== window) {
    canExec = this.el.offsetTop <= this.scrollTarget.scrollTop + this.scrollTarget.clientHeight;
  } else if (this.scrollTarget === window) {
    canExec = this.el.getBoundingClientRect().top <= document.documentElement.clientHeight;
  }

  if (canExec && !this.lock) {
    // handle lazy load
    var tempImg = new Image();
    tempImg.src = this.src;
    tempImg.addEventListener('load', function () {
      _this.isLoad = true;

      _this.el.setAttribute('loaded', _this.isLoad);

      _this.el.src = _this.src;
    }, {
      capture: false,
      once: true
    });
  } else {
    if (this.lock) this.lock = false;
  }
}

function initImg() {
  this.el.setAttribute('loaded', this.isLoad);
  this.el.src = this.el.getAttribute('loading');
}

var _default = {
  lazyload: {
    inserted: function inserted(el, binding) {
      el.context = {
        el: el,
        src: binding.value,
        isLoad: false
      };
      initImg.call(el.context);
      initEvent.call(el.context);
    },
    unbind: function unbind(el) {
      el.context.scrollTarget.removeEventListener('scroll', el.context.scrollEvent);
    }
  }
};
exports.default = _default;