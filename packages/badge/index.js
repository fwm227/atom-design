import './index.css';

export default {
  name: 'atom-badge',
  props: {
    type: {
      type: String,
      default: 'primary'
    }
  },
  render (h) {
    return h('div', {
      class: [
        'atom-badge',
        this.type
      ]
    }, this.$slots.default);
  }
};
