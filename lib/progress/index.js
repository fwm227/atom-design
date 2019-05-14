import './style.css';

export default {
  name: 'atom-progress',
  props: {
    value: {
      type: Number
    },
    color: {
      type: String
    },
    lineHeight: {
      type: String,
      defualt: '2px'
    }
  },
  computed: {
    animWidth () {
      if (this.value < 0) return 0;
      else return this.value % 100;
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'atom-progress'
    }, [
      h('div', {
        staticClass: 'progress-default-line',
        style: {
          'border-width': this.lineHeight
        }
      }),
      h('div', {
        staticClass: 'progress-active-line',
        style: {
          width: `${this.animWidth}%`,
          background: this.color,
          height: this.lineHeight
        }
      })
    ]);
  }
};
