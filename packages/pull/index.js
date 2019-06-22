import './style.css';

export default {
  name: 'atom-pull',
  data () {
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
  mounted () {
    this.$el.style.height = this.height;
  },
  render (h) {
    let renderArr = [];
    // lock scroll flag
    let lock = false;
    renderArr.push(this.$slots.promptTop);
    renderArr.push(this.$slots.box);
    renderArr.push(this.$slots.promptBottom);
    return h('div', {staticClass: 'atom-pull'}, [
      h('div', {staticClass: 'atom-pull-wrapper'}, [
        h('div', {
          staticClass: 'atom-pull-content',
          on: {
            touchstart: () => {
              this.startY = event.targetTouches[0].pageY;
              if (lock && ((this.action !== 'pullup' && this.$el.scrollTop === 0 && this.moveY > 0) || (this.action !== 'pulldown' && this.$el.scrollTop + this.$el.clientHeight === this.$el.scrollHeight && this.moveY < 0))) lock = false;
            },
            touchmove: () => {
              const eventTarget = event.currentTarget;
              const scrollYStyle = document.defaultView.getComputedStyle(this.$el).overflowY;
              // handle move
              this.moveY = event.changedTouches[0].pageY - this.startY;
              // lock scroll
              if (!lock && (scrollYStyle === 'auto' || scrollYStyle === 'scroll') && ((this.$el.scrollTop === 0 && this.moveY < 0) || (this.$el.scrollTop && this.$el.scrollTop + this.$el.clientHeight < this.$el.scrollHeight) || (this.$el.scrollTop + this.$el.clientHeight === this.$el.scrollHeight && this.moveY > 0))) lock = true;
              if (lock) return;
              if (this.moveY > 0) {
                if (this.action === 'pullup') return;
                // prevent default-action of browser
                event.preventDefault();
                event.stopPropagation();
                this.$slots.promptTop !== void 0 ? this.promptHeight = eventTarget.children.item(0).offsetHeight : console.warn('expect a promptTop slot, but not found!');
              } else if (this.moveY < 0) {
                if (this.action === 'pulldown') return;
                if (this.action === 'pullup') {
                  this.$slots.promptBottom !== void 0 ? this.promptHeight = eventTarget.children.item(1).offsetHeight : console.warn('expect a promptBottom slot, but not found!');
                } else if (this.action === 'both') {
                  const botIdx = this.$slots.promptTop === void 0 ? 1 : 2;
                  this.$slots.promptBottom !== void 0 ? this.promptHeight = eventTarget.children.item(botIdx).offsetHeight : console.warn('expect a promptBottom slot, but not found!');
                }
              }
              Math.abs(this.moveY) > this.promptHeight && this.$emit('promptDisplay');
              const maxMove = this.moveY > 0 ? this.maxTopMove : this.maxBotMove;
              if (Math.abs(this.moveY) > maxMove) return;
              eventTarget.style.transform = `translate3d(0, ${this.moveY.toFixed(0)}px, 0)`;
            },
            touchend: () => {
              if (lock) return;
              const eventTarget = event.currentTarget;
              let time = this.delay;
              (Math.abs(this.moveY) > this.promptHeight) ? this.$emit('touchEnd') : time = 0;
              setTimeout(() => {
                eventTarget.style['transition-duration'] = '150ms';
                eventTarget.style.transform = 'translate3d(0, 0, 0)';
                eventTarget.addEventListener('transitionend', () => {
                  eventTarget.style['transition-duration'] = '0ms';
                  this.$emit('pullEnd');
                }, {capture: false, once: true});
              }, time);
            }
          }
        }, renderArr)
      ])
    ]);
  }
};
