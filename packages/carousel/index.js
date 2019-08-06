import './style.css';

export default {
  name: 'atom-carousel',
  data () {
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
    value (val) {
      this.isTabs && this.changeIndex();
    },
    activeIdx (val) {
      this.$emit('input', val);
    }
  },
  mounted () {
    this.changeIndex(true);
    this.initAutoAnim();
  },
  methods: {
    changeIndex (isInit) {
      const carouselDom = this.$el.children.item(0);
      this.preMoveX = -1 * carouselDom.offsetWidth * this.value;
      // ignore initial that occur animation
      if (!isInit) carouselDom.style['transition-duration'] = `${this.duration}ms`;
      carouselDom.style.transform = `translate3d(${this.preMoveX}px, 0, 0)`;
    },
    startAnim () {
      clearTimeout(this.timer);
      if (this.auto) this.animation();
    },
    initAutoAnim () {
      this.startAnim();
    },
    animation () {
      const carouselDom = this.$el.children.item(0);
      this.timer = setTimeout(() => {
        let moveX;
        const compareMovex = this.preMoveX - carouselDom.offsetWidth;
        if (this.loop) {
          this.handleLoop(compareMovex);
          moveX = this.preMoveX - carouselDom.offsetWidth;
        } else if (Math.abs(compareMovex) > carouselDom.offsetWidth * (this.length - 1)) {
          this.preMoveX = 0;
          moveX = 0;
        } else {
          moveX = this.preMoveX - carouselDom.offsetWidth;
        }
        // handle pagination
        this.activeIdx = Math.abs(moveX) / carouselDom.offsetWidth;
        if (this.loop && this.activeIdx >= (this.length - 1)) this.activeIdx = 0;
        // animation config
        carouselDom.style['transition-duration'] = `${this.duration}ms`;
        carouselDom.style.transform = `translate3d(${moveX}px, 0, 0)`;
        this.listenAnimEnd(moveX);
      }, this.time);
    },
    handleLoop (moveX) {
      const carouselDom = this.$el.children.item(0);
      if (Math.abs(moveX) > carouselDom.offsetWidth * (this.length - 1)) {
        this.preMoveX = 0;
        carouselDom.style.transform = 'translate3d(0, 0, 0)';
      } else if (moveX > 0) {
        this.preMoveX = -1 * carouselDom.offsetWidth * (this.length - 1);
      }
    },
    listenAnimEnd (animWidth) {
      const carouselDom = this.$el.children.item(0);
      document.addEventListener('transitionend', () => {
        this.preMoveX = animWidth;
        this.tempMoveX = 0;
        carouselDom.style['transition-duration'] = '0ms';
        this.startAnim();
      }, {capture: false, once: true});
    }
  },
  render (h) {
    const carouselList = this.$slots.default && this.$slots.default.map((el, index) => {
      if (el.tag !== void 0) {
        return h('li', {staticClass: 'atom-carousel-item'}, [el]);
      }
    }).filter((el, index) => {
      if (el !== void 0) return el;
    });
    let paginationArr = [];
    // pagination render
    let paginationRender;
    if (carouselList) {
      for (let i = 0; i < carouselList.length; i++) {
        paginationArr.push(h('li', {
          class: [
            'point',
            {
              'is-active': this.activeIdx === i
            }
          ]
        }));
      }
      paginationRender = this.pagination ? h('ul', {staticClass: 'pagination-point-wrapper'}, paginationArr) : void 0;
      if (this.loop) carouselList.push(carouselList[0]);
    }
    this.length = (carouselList && carouselList.length) || 0;

    return h('div', {staticClass: 'atom-carousel'}, [
      h('ul', {
        staticClass: 'atom-carousel-wrapper',
        on: {
          touchstart: () => {
            if (this.timer) clearTimeout(this.timer);
            if (this.isLock || !this.canMove) return;
            this.touchStartX = event.targetTouches[0].pageX;
            this.touchStartY = event.targetTouches[0].pageY;
            this.startTime = Date.now();
          },
          touchmove: () => {
            if (this.isLock) return;
            const carouselDom = event.currentTarget;
            const touchEndX = event.changedTouches[0].pageX;

            this.tempMoveX = touchEndX - this.touchStartX;
            // handle native-scroll
            const moveY = event.changedTouches[0].pageY - this.touchStartY;
            const absMoveX = Math.abs(this.tempMoveX);
            if (absMoveX < 5 || (absMoveX >= 5 && moveY >= Math.sqrt(3) * absMoveX)) {
              this.canMove = false;
            } else if (event.cancelable) {
              this.canMove = true;
              event.preventDefault();
            }
            if (!this.canMove) return;
            const moveX = this.tempMoveX + this.preMoveX;
            // handle unloop
            if (!this.loop && (moveX > 0 || Math.abs(moveX) > carouselDom.offsetWidth * (carouselList.length - 1))) {
              this.tempMoveX = 0;
              return;
            }
            // handle loop
            if (this.loop) this.handleLoop(moveX);

            carouselDom.style.transform = `translate3d(${moveX}px, 0, 0)`;
          },
          touchend: () => {
            if (this.isLock || !this.canMove) return;

            var endTime = Date.now();
            var moveSpeed = Math.abs(this.tempMoveX) / (endTime - this.startTime);

            const carouselDom = event.currentTarget;
            let animWidth = ((Math.abs(this.tempMoveX) > carouselDom.offsetWidth / 2) || (moveSpeed > 0.5)) ? this.tempMoveX > 0 ? this.preMoveX + carouselDom.offsetWidth : this.preMoveX - carouselDom.offsetWidth : this.preMoveX;
            // handle pagination
            this.activeIdx = Math.abs(animWidth) / carouselDom.offsetWidth;
            if (this.loop && this.activeIdx >= (this.length - 1)) this.activeIdx = 0;
            // handle animation
            carouselDom.style['transition-duration'] = `${this.duration}ms`;
            carouselDom.style.transform = `translate3d(${animWidth}px, 0, 0)`;
            this.listenAnimEnd(animWidth);
          }
        }
      }, carouselList),
      paginationRender
    ]);
  }
};
