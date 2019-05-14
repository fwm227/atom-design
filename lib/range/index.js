import './style.css';

export default {
  name: 'atom-range',
  data () {
    return {
      startX: 0,
      pre_move: 0,
      active_move: 0,
      isAction: false
    };
  },
  props: {
    value: {
      type: Number
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    isIndicator: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: '#108ee9'
    }
  },
  mounted () {
    if (this.value < this.min) this.value = this.min;
    else if (this.value > this.max) this.value = this.max;
  },
  render (h) {
    return h('div', {
      staticClass: 'atom-range',
      class: {'active': this.isIndicator && this.isAction}
    }, [
      h('div', {
        staticClass: 'range-default-line'
      }),
      h('div', {
        staticClass: 'range-active-line',
        style: {
          width: `${this.active_move}%`,
          background: this.color
        }
      }),
      h('div', {
        staticClass: 'active-slider',
        style: {
          left: `${this.active_move}%`,
          background: this.color,
          'box-shadow': `0 0 10px ${this.color}`
        },
        on: {
          touchstart: () => {
            this.startX = event.targetTouches[0].pageX;
            this.isAction = true;
          },
          touchmove: () => {
            event.preventDefault();
            const moveX = event.changedTouches[0].pageX - this.startX;
            this.active_move = ((moveX / event.currentTarget.parentNode.offsetWidth) * 100 + this.pre_move).toFixed(0);
            if (this.active_move < 0) this.active_move = 0;
            else if (this.active_move > 100) this.active_move = 100;
            this.$emit('input', Number((this.min + this.active_move * 1e-2 * (this.max - this.min)).toFixed(0)));
          },
          touchend: () => {
            this.pre_move = Number(this.active_move);
            this.isAction = false;
          }
        }
      }),
      h('div', {
        staticClass: 'range-indicator',
        style: {
          left: `${this.active_move}%`
        }
      }, [
        h('div', {staticClass: 'indicator-content'}, Number((this.min + this.active_move * 1e-2 * (this.max - this.min)).toFixed(0)))
      ])
    ]);
  }
};
