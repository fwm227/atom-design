import './style.css';

export default {
  name: 'atom-btn',
  data () {
    return {
      active: false,
      cacheStyle: {}
    };
  },
  computed: {
    typeClass () {
      return this.type === 'primary' ? 'btn-primary' : this.type === 'danger' ? 'btn-danger' : this.type === 'warning' ? 'btn-warning' : 'btn-default';
    },
    activeStyle () {
      if (this.active) {
        const btnStyles = document.defaultView.getComputedStyle(this.$el);
        // handle conflict between style and actionStyle
        Object.keys(this.actionStyle).forEach((el, index) => {
          if (btnStyles[el]) {
            this.cacheStyle[el] = btnStyles[el];
            this.$el.style[el] = this.actionStyle[el];
          }
        });
      } else {
        Object.keys(this.cacheStyle).forEach((el, index) => {
          this.$el.style[el] = this.cacheStyle[el];
        });
      }
    },
    sizeClass () {
      if (this.size === 'large') {
        return 'btn-large';
      }
    }
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    size: {
      type: String,
      default: 'small'
    },
    actionStyle: {
      type: Object,
      default: () => {
        return {background: '#f7f8f9'};
      }
    }
  },
  render (h) {
    return h('button', {
      attrs: {
        name: 'button',
        type: 'button'
      },
      class: [
        'atom-btn',
        this.typeClass,
        this.sizeClass
      ],
      style: this.activeStyle,
      on: {
        touchstart: () => {
          this.active = true;
        },
        touchend: () => {
          this.active = false;
        }
      }
    }, this.$slots.default);
  }
};
