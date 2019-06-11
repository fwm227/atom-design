function getScrollDom () {
  var element = arguments[0];
  const scrollYStyle = document.defaultView.getComputedStyle(element).overflowY;
  if (element && element.tagName !== 'HTML' && element.tagName !== 'BODY' && element.nodeType === 1 && (scrollYStyle === 'auto' || scrollYStyle === 'scroll')) {
    return element;
  }
  return window;
}

function throttle (fn, delay) {
  var now;
  var preExce = 0;
  var execute = function () {
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
function initEvent () {
  this.scrollTarget = getScrollDom(this.el);
  this.scrollEvent = throttle(scrollEvent.bind(this), 2e2);
  this.scrollTarget.addEventListener('scroll', this.scrollEvent, {capture: false});
}

function scrollEvent () {
  var canExec = false;
  if (this.scrollTarget === this.el) {
    canExec = this.el.scrollHeight <= (this.el.clientHeight + this.el.scrollTop + this.distance);
  } else if (this.scrollTarget === window) {
    canExec = 2 * window.pageYOffset + this.el.getBoundingClientRect().top + document.documentElement.clientHeight + this.distance >= document.documentElement.scrollHeight;
  }
  canExec && this.fn();
}

export default {
  inserted: function (el, binding) {
    el.context = {el: el, fn: binding.value, distance: Number(el.getAttribute('distance'))};
    initEvent.call(el.context);
  },
  unbind: function (el) {
    el.context.scrollTarget.removeEventListener('scroll', el.context.scrollEvent);
  }
};
