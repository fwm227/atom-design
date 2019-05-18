"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  name: 'atom-pickerColumn',
  data: function data() {
    return {
      preMoveY: 0,
      startY: 0,
      moveY: 0
    };
  },
  props: {
    colList: {
      type: Array
    }
  },
  update: function update() {
    this.initData();
  },
  methods: {
    initData: function initData() {
      this.preMoveY = 0;
      this.startY = 0;
      this.moveY = 0;
    }
  },
  render: function render(h) {
    var _this = this;

    return h('div', {
      staticClass: 'picker-col'
    }, [h('ul', {
      staticClass: 'picker-bar',
      on: {
        touchstart: function touchstart() {
          _this.startY = event.targetTouches[0].pageY;
        },
        touchmove: function touchmove() {
          event.preventDefault();
          _this.moveY = event.changedTouches[0].pageY - _this.startY;
          event.currentTarget.style.transform = "translate3d(0, ".concat((_this.moveY + _this.preMoveY).toFixed(0), "px, 0)");
        },
        touchend: function touchend() {
          var eventTarget = event.currentTarget; // judge action whether is invalid

          var invalidAction = false;
          var animHeight = Math.abs(_this.moveY) > 20 ? (_this.moveY > 0 ? _this.moveY + (40 - _this.moveY % 40) : _this.moveY - (40 + _this.moveY % 40)) + _this.preMoveY : _this.preMoveY;
          var limitHeight = eventTarget.offsetHeight - 200;
          animHeight < -1 * limitHeight && (animHeight = -1 * limitHeight) || animHeight > 0 && (animHeight = 0); // handle invalid action

          (animHeight === _this.preMoveY || animHeight < -1 * limitHeight || animHeight > 0) && (invalidAction = true);
          eventTarget.style['transition-duration'] = '300ms';
          eventTarget.style.transform = "translate3d(0, ".concat(animHeight, "px, 0)");
          _this.preMoveY = animHeight; // get value of picker select on the basic of translateY

          !invalidAction && _this.$emit('selValue', _this.colList[Math.abs(animHeight) / 40]);
          eventTarget.addEventListener('transitionend', function () {
            eventTarget.style['transition-duration'] = '0ms';
          }, {
            capture: false,
            once: true
          });
        }
      }
    }, this.colList && this.colList.map(function (el, index) {
      return h('div', {
        staticClass: 'picker-item'
      }, el.text);
    }))]);
  }
};
exports.default = _default;