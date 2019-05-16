import './style.css';

export default {
  name: 'atom-toast',
  data () {
    return {
      position: null,
      isActive: false
    };
  },
  computed: {
    // animation control
    animClass () {
      if (this.isActive) {
        return `${this.position}-active`;
      } else {
        return 'remove';
      }
    }
  },
  render (h) {
    return h('div', {
      attrs: {
        role: 'toast'
      },
      class: [
        'atom-toast',
        `${this.position}-position`,
        this.animClass
      ]
    }, [
      this.message
    ]);
  }
};
