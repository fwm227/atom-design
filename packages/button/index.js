import './style.css';

export default {
  name: 'atom-btn',
  data () {
    return {
      active: false,
      cacheStyle: new Map()
    };
  },
  computed: {
    activeStyle () {
      if (this.active) {
        const btnStyles = document.defaultView.getComputedStyle(this.$el);
        // handle conflict between custom-style and actionStyle
        Object.keys(this.actionStyle).forEach(key => {
          if (btnStyles[key]) {
            this.cacheStyle.set(key, btnStyles[key]);
            this.$el.style[key] = this.actionStyle[key];
          }
        });
      } else {
        this.cacheStyle.forEach((val, key) => {
          this.$el.style[key] = val;
        });
        this.cacheStyle.clear();
      }
    },
    sizeClass () {
      if (this.size === 'large') return 'btn-large';
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
        `btn-${this.type}`,
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
