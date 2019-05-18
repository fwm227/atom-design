"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-slideItem',
  data: function data() {
    return {
      startX: 0,
      moveX: 0,
      preMoveX: 0,
      tempMoveX: 0,
      innerValue: null
    };
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value: function value(val) {
      var _this = this;

      if (val) {
        this.innerValue = val;
        var slideDom = this.$el.children.item(0);
        slideDom.style['transition-duration'] = '100ms';
        slideDom.style.transform = 'translate3d(0, 0, 0)';
        slideDom.addEventListener('transitionend', function () {
          _this.innerValue = false;
          _this.preMoveX = 0;
          slideDom.style['transition-duration'] = '0ms';
        }, {
          capture: false,
          once: true
        });
      }
    },
    innerValue: function innerValue(val) {
      this.$emit('input', val);
    }
  },
  mounted: function mounted() {
    var slideElem = this.$el.children.item(0);
    Array.prototype.forEach.call(slideElem.children, function (elem, index) {
      elem.style['flex-shrink'] = 0;
    });

    if (this.$slots.leftAction !== void 0) {
      slideElem.style['margin-left'] = "".concat(-1 * slideElem.children.item(0).offsetWidth, "px");
      slideElem.children.item(1).style.width = '100%';
    } else {
      slideElem.children.item(0).style.width = '100%';
    }
  },
  render: function render(h) {
    var _this2 = this;

    return h('div', {
      staticClass: 'atom-slide'
    }, [h('div', {
      staticClass: 'slide-content',
      on: {
        touchstart: function touchstart() {
          _this2.startX = event.targetTouches[0].pageX;
        },
        touchmove: function touchmove() {
          event.preventDefault();
          var slideDom = event.currentTarget;
          var leftActionDom = slideDom.children.item(0);
          var rightActionDom = slideDom.children.item(slideDom.children.length - 1);
          _this2.moveX = event.changedTouches[0].pageX - _this2.startX;
          _this2.tempMoveX = _this2.moveX + _this2.preMoveX;
          if (_this2.tempMoveX < 0 && Math.abs(_this2.tempMoveX) >= rightActionDom.offsetWidth || _this2.tempMoveX > 0 && Math.abs(_this2.tempMoveX) >= leftActionDom.offsetWidth) return;
          if (_this2.$slots.leftAction === void 0 && _this2.tempMoveX > 0) return;else if (_this2.$slots.rightAction === void 0 && _this2.tempMoveX < 0) return;
          slideDom.style.transform = "translate3d(".concat(_this2.tempMoveX.toFixed(0), "px, 0, 0)");
        },
        touchend: function touchend() {
          if (!_this2.tempMoveX) return;
          var slideDom = event.currentTarget;
          var leftActionDom = slideDom.children.item(0);
          var rightActionDom = slideDom.children.item(slideDom.children.length - 1);
          var animWidth = 0;
          var leftWidthTotal = leftActionDom.offsetWidth;
          var rightWidthTotal = rightActionDom.offsetWidth;

          if (_this2.$slots.rightAction !== void 0 && _this2.tempMoveX < 0) {
            // left slide
            _this2.moveX < 0 && Math.abs(_this2.tempMoveX) > rightActionDom.children.item(0).offsetWidth / 2 && (animWidth = -1 * rightActionDom.offsetWidth);
            _this2.moveX > 0 && Math.abs(_this2.tempMoveX) < rightWidthTotal - rightActionDom.children.item(rightActionDom.children.length - 1).offsetWidth / 2 && (animWidth = 0);
          } else if (_this2.$slots.leftAction !== void 0 && _this2.tempMoveX > 0) {
            // right slide
            _this2.moveX < 0 && Math.abs(_this2.tempMoveX) > leftWidthTotal - leftActionDom.children.item(0).offsetWidth / 2 && (animWidth = 0);
            _this2.moveX > 0 && Math.abs(_this2.tempMoveX) > leftActionDom.children.item(leftActionDom.children.length - 1).offsetWidth / 2 && (animWidth = leftActionDom.offsetWidth);
          }

          slideDom.style['transition-duration'] = '100ms';
          slideDom.style.transform = "translate3d(".concat(animWidth, "px, 0, 0)");
          slideDom.addEventListener('transitionend', function () {
            _this2.preMoveX = animWidth;
            event.currentTarget.style['transition-duration'] = '0ms';
          }, {
            capture: false,
            once: true
          });
        }
      }
    }, [this.$slots.leftAction, this.$slots.default, this.$slots.rightAction])]);
  }
};
exports.default = _default;