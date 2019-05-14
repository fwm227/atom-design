export default {
  data () {
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
  update () {
    this.initData();
  },
  methods: {
    initData () {
      this.preMoveY = 0;
      this.startY = 0;
      this.moveY = 0;
    }
  },
  render (h) {
    return h('div', {staticClass: 'picker-col'}, [
      h('ul', {
        staticClass: 'picker-bar',
        on: {
          touchstart: () => {
            this.startY = event.targetTouches[0].pageY;
          },
          touchmove: () => {
            event.preventDefault();
            this.moveY = event.changedTouches[0].pageY - this.startY;
            event.currentTarget.style.transform = `translate3d(0, ${(this.moveY + this.preMoveY).toFixed(0)}px, 0)`;
          },
          touchend: () => {
            const eventTarget = event.currentTarget;
            // judge action whether is invalid
            let invalidAction = false;
            let animHeight = Math.abs(this.moveY) > 20 ? (this.moveY > 0 ? this.moveY + (40 - this.moveY % 40) : this.moveY - (40 + this.moveY % 40)) + this.preMoveY : this.preMoveY;
            const limitHeight = eventTarget.offsetHeight - 200;
            ((animHeight < -1 * limitHeight && (animHeight = -1 * limitHeight)) || (animHeight > 0 && (animHeight = 0)));
            // handle invalid action
            ((animHeight === this.preMoveY) || (animHeight < -1 * limitHeight) || (animHeight > 0)) && (invalidAction = true);
            eventTarget.style['transition-duration'] = '300ms';
            eventTarget.style.transform = `translate3d(0, ${animHeight}px, 0)`;
            this.preMoveY = animHeight;
            // get value of picker select on the basic of translateY
            !invalidAction && this.$emit('selValue', this.colList[Math.abs(animHeight) / 40]);
            eventTarget.addEventListener('transitionend', () => {
              eventTarget.style['transition-duration'] = '0ms';
            }, {capture: false, once: true});
          }
        }
      }, this.colList && this.colList.map((el, index) => {
        return h('div', {staticClass: 'picker-item'}, el.text);
      }))
    ]);
  }
};
