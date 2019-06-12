"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-pull',
  data: function data() {
    return {
      startY: 0,
      moveY: 0,
      promptHeight: 0
    };
  },
  props: {
    height: {
      type: String
    },
    action: {
      type: String,
      default: 'both'
    },
    maxTopMove: {
      type: Number
    },
    maxBotMove: {
      type: Number
    },
    delay: {
      type: Number,
      default: 3e2
    }
  },
  mounted: function mounted() {
    this.$el.style.height = this.height;
  },
  render: function render(h) {
    var _this = this;

    var renderArr = []; // lock scroll flag

    var lock = false;
    renderArr.push(this.$slots.promptTop);
    renderArr.push(this.$slots.box);
    renderArr.push(this.$slots.promptBottom);
    return h('div', {
      staticClass: 'atom-pull'
    }, [h('div', {
      staticClass: 'atom-pull-wrapper'
    }, [h('div', {
      staticClass: 'atom-pull-content',
      on: {
        touchstart: function touchstart() {
          _this.startY = event.targetTouches[0].pageY;
          if (lock && (_this.action !== 'pullup' && _this.$el.scrollTop === 0 && _this.moveY > 0 || _this.action !== 'pulldown' && _this.$el.scrollTop + _this.$el.clientHeight === _this.$el.scrollHeight && _this.moveY < 0)) lock = false;
        },
        touchmove: function touchmove() {
          var eventTarget = event.currentTarget;
          var scrollYStyle = document.defaultView.getComputedStyle(_this.$el).overflowY; // handle move

          _this.moveY = event.changedTouches[0].pageY - _this.startY; // lock scroll

          if (!lock && (scrollYStyle === 'auto' || scrollYStyle === 'scroll') && (_this.$el.scrollTop === 0 && _this.moveY < 0 || _this.$el.scrollTop && _this.$el.scrollTop + _this.$el.clientHeight < _this.$el.scrollHeight || _this.$el.scrollTop + _this.$el.clientHeight === _this.$el.scrollHeight && _this.moveY > 0)) lock = true;
          if (lock) return;

          if (_this.moveY > 0) {
            if (_this.action === 'pullup') return;
            _this.$slots.promptTop !== void 0 ? _this.promptHeight = eventTarget.children.item(0).offsetHeight : console.warn('expect a promptTop slot, but not found!');
          } else if (_this.moveY < 0) {
            if (_this.action === 'pulldown') return;

            if (_this.action === 'pullup') {
              _this.$slots.promptBottom !== void 0 ? _this.promptHeight = eventTarget.children.item(1).offsetHeight : console.warn('expect a promptBottom slot, but not found!');
            } else if (_this.action === 'both') {
              var botIdx = _this.$slots.promptTop === void 0 ? 1 : 2;
              _this.$slots.promptBottom !== void 0 ? _this.promptHeight = eventTarget.children.item(botIdx).offsetHeight : console.warn('expect a promptBottom slot, but not found!');
            }
          }

          Math.abs(_this.moveY) > _this.promptHeight && _this.$emit('promptDisplay');
          var maxMove = _this.moveY > 0 ? _this.maxTopMove : _this.maxBotMove;
          if (Math.abs(_this.moveY) > maxMove) return;
          eventTarget.style.transform = "translate3d(0, ".concat(_this.moveY.toFixed(0), "px, 0)");
        },
        touchend: function touchend() {
          if (lock) return;
          var eventTarget = event.currentTarget;
          var time = _this.delay;
          Math.abs(_this.moveY) > _this.promptHeight ? _this.$emit('touchEnd') : time = 0;
          setTimeout(function () {
            eventTarget.style['transition-duration'] = '150ms';
            eventTarget.style.transform = 'translate3d(0, 0, 0)';
            eventTarget.addEventListener('transitionend', function () {
              eventTarget.style['transition-duration'] = '0ms';

              _this.$emit('pullEnd');
            }, {
              capture: false,
              once: true
            });
          }, time);
        }
      }
    }, renderArr)])]);
  }
};
exports.default = _default;