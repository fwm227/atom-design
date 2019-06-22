"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _default = {
  name: 'atom-carousel',
  data: function data() {
    return {
      preMoveX: 0,
      tempMoveX: 0,
      touchStartX: 0,
      touchStartY: 0,
      activeIdx: 0,
      timer: null,
      length: null,
      isMounted: false,
      canMove: true
    };
  },
  props: {
    isTabs: {
      type: Boolean,
      default: false
    },
    value: {
      type: Number,
      default: 0
    },
    isLock: {
      type: Boolean,
      default: false
    },
    height: {
      type: Number,
      default: 200
    },
    loop: {
      type: Boolean,
      default: false
    },
    pagination: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 3e2
    },
    time: {
      type: Number,
      default: 3e3
    }
  },
  watch: {
    value: function value(val) {
      this.isTabs && this.changeIndex();
    },
    activeIdx: function activeIdx(val) {
      this.$emit('input', val);
    }
  },
  mounted: function mounted() {
    this.changeIndex(true);
    this.initAutoAnim();
  },
  methods: {
    changeIndex: function changeIndex(isInit) {
      var carouselDom = this.$el.children.item(0);
      this.preMoveX = -1 * carouselDom.offsetWidth * this.value; // ignore initial that occur animation

      if (!isInit) carouselDom.style['transition-duration'] = "".concat(this.duration, "ms");
      carouselDom.style.transform = "translate3d(".concat(this.preMoveX, "px, 0, 0)");
    },
    initAutoAnim: function initAutoAnim() {
      var _this = this;

      var carouselDom = this.$el.children.item(0);
      clearInterval(this.timer);

      if (this.auto) {
        this.timer = setInterval(function () {
          var moveX;
          var compareMovex = _this.preMoveX - carouselDom.offsetWidth;

          if (_this.loop) {
            _this.handleLoop(compareMovex);

            moveX = _this.preMoveX - carouselDom.offsetWidth;
          } else if (Math.abs(compareMovex) > carouselDom.offsetWidth * (_this.length - 1)) {
            _this.preMoveX = 0;
            moveX = 0;
          } else {
            moveX = _this.preMoveX - carouselDom.offsetWidth;
          } // handle pagination


          _this.activeIdx = Math.abs(moveX) / carouselDom.offsetWidth;
          if (_this.loop && _this.activeIdx >= _this.length - 1) _this.activeIdx = 0; // animation config

          carouselDom.style['transition-duration'] = "".concat(_this.duration, "ms");
          carouselDom.style.transform = "translate3d(".concat(moveX, "px, 0, 0)");

          _this.listenAnimEnd(moveX);
        }, this.time);
      }
    },
    handleLoop: function handleLoop(moveX) {
      var carouselDom = this.$el.children.item(0);

      if (Math.abs(moveX) > carouselDom.offsetWidth * (this.length - 1)) {
        this.preMoveX = 0;
        carouselDom.style.transform = 'translate3d(0, 0, 0)';
      } else if (moveX > 0) {
        this.preMoveX = -1 * carouselDom.offsetWidth * (this.length - 1);
      }
    },
    listenAnimEnd: function listenAnimEnd(animWidth) {
      var _this2 = this;

      var carouselDom = this.$el.children.item(0);
      document.addEventListener('transitionend', function () {
        _this2.preMoveX = animWidth;
        _this2.tempMoveX = 0;
        carouselDom.style['transition-duration'] = '0ms';
      }, {
        capture: false,
        once: true
      });
    }
  },
  render: function render(h) {
    var _this3 = this;

    var carouselList = this.$slots.default && this.$slots.default.map(function (el, index) {
      if (el.tag !== void 0) {
        return h('li', {
          staticClass: 'atom-carousel-item'
        }, [el]);
      }
    }).filter(function (el, index) {
      if (el !== void 0) return el;
    });
    var paginationArr = []; // pagination render

    var paginationRender;

    if (carouselList) {
      for (var i = 0; i < carouselList.length; i++) {
        paginationArr.push(h('li', {
          class: ['point', {
            'is-active': this.activeIdx === i
          }]
        }));
      }

      paginationRender = this.pagination ? h('ul', {
        staticClass: 'pagination-point-wrapper'
      }, paginationArr) : void 0;
      if (this.loop) carouselList.push(carouselList[0]);
    }

    this.length = carouselList && carouselList.length || 0;
    return h('div', {
      staticClass: 'atom-carousel'
    }, [h('ul', {
      staticClass: 'atom-carousel-wrapper',
      on: {
        touchstart: function touchstart() {
          if (_this3.isLock || !_this3.canMove) return;
          _this3.touchStartX = event.targetTouches[0].pageX;
          _this3.touchStartY = event.targetTouches[0].pageY;
        },
        touchmove: function touchmove() {
          if (_this3.isLock) return;
          var carouselDom = event.currentTarget;
          var touchEndX = event.changedTouches[0].pageX;
          _this3.tempMoveX = touchEndX - _this3.touchStartX; // handle native-scroll

          var moveY = event.changedTouches[0].pageY - _this3.touchStartY;
          var absMoveX = Math.abs(_this3.tempMoveX);

          if (absMoveX < 5 || absMoveX >= 5 && moveY >= 1.73 * absMoveX) {
            _this3.canMove = false;
            return;
          } else {
            _this3.canMove = true;
            event.preventDefault();
          }

          var moveX = _this3.tempMoveX + _this3.preMoveX; // handle unloop

          if (!_this3.loop && (moveX > 0 || Math.abs(moveX) > carouselDom.offsetWidth * (carouselList.length - 1))) {
            _this3.tempMoveX = 0;
            return;
          } // handle loop


          if (_this3.loop) _this3.handleLoop(moveX);
          carouselDom.style.transform = "translate3d(".concat(moveX.toFixed(2), "px, 0, 0)");
        },
        touchend: function touchend() {
          if (_this3.isLock || !_this3.canMove) return;
          var carouselDom = event.currentTarget;
          var animWidth = Math.abs(_this3.tempMoveX) > carouselDom.offsetWidth / 2 ? _this3.tempMoveX > 0 ? _this3.preMoveX + carouselDom.offsetWidth : _this3.preMoveX - carouselDom.offsetWidth : _this3.preMoveX; // handle pagination

          _this3.activeIdx = Math.abs(animWidth) / carouselDom.offsetWidth;
          if (_this3.loop && _this3.activeIdx >= _this3.length - 1) _this3.activeIdx = 0; // handle animation

          carouselDom.style['transition-duration'] = "".concat(_this3.duration, "ms");
          carouselDom.style.transform = "translate3d(".concat(animWidth, "px, 0, 0)");

          _this3.listenAnimEnd(animWidth);
        }
      }
    }, carouselList), paginationRender]);
  }
};
exports.default = _default;