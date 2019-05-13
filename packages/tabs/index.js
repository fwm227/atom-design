import './index.css';
import atomCarousel from '../carousel';

export default {
  props: {
    value: {
      type: Number
    },
    isGesture: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number
    },
    text: {
      type: String
    }
  },
  components: {
    atomCarousel
  },
  render (h) {
    return h('div', {
      staticClass: 'atom-tabs'
    }, [
      this.$slots.navbar,
      h('atom-carousel', {
        attrs: {
          isTabs: true,
          value: this.value,
          duration: this.duration,
          isLock: !this.isGesture
        },
        on: {
          input: (val) => {
            this.$emit('input', val);
          }
        }
      }, this.$slots.default)
    ]);
  }
};
