import './style.css';

export default {
  name: 'atom-header',
  props: {
    text: {
      type: String
    }
  },
  render (h) {
    return h('header', {
      staticClass: 'atom-header'
    }, [
      this.$slots.left,
      this.$slots.center,
      this.$slots.right
    ]);
  }
};
