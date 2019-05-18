import './style.css';

export default {
  name: 'atom-mask',
  data () {
    return {
      isShow: false
    };
  },
  computed: {
    animClass () {
      if (this.isShow) {
        return 'mask-anim';
      }
    }
  },
  render (h) {
    return h('div', {
      class: [
        'atom-mask',
        this.animClass
      ]
    });
  }
};
