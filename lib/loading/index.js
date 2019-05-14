import './style.css';

export default {
  name: 'atom-loading',
  props: {
    type: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: '#108ee9'
    },
    radius: {
      type: String
    }
  },
  computed: {
    bgColor () {
      if (this.type !== 0 && this.type !== 1) {
        return this.color;
      }
      return 'white';
    },
    borderColor () {
      if (this.type === 0 || this.type === 1) {
        return this.color;
      }
      return 'transparent';
    },
    radiusStyle () {
      if (this.type !== 0 && this.type !== 1) {
        return this.radius;
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: `atom-loading${this.type}`,
      style: {
        background: this.bgColor,
        'border-radius': this.radiusStyle
      }
    }, [
      h('div', {
        staticClass: 'loading-item',
        style: {
          'border-bottom-color': this.borderColor,
          'border-top-color': this.type === 1 && this.borderColor
        }
      })
    ]);
  }
};
