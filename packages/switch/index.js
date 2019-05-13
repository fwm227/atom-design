import './index.css';

export default {
  name: 'atom-switch',
  computed: {
    inner_value: {
      get () {
        return this.value;
      },
      set (val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    mainColor () {
      if (this.inner_value) {
        return this.color;
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#108ee9'
    }
  },
  render (h) {
    return h('label', {staticClass: 'atom-switch'}, [
      h('input', {
        staticClass: 'switch-input',
        attrs: {
          type: 'checkbox'
        },
        domProps: {
          checked: this.inner_value
        },
        on: {
          change: () => {
            this.inner_value = event.target.checked;
          }
        }
      }),
      h('label', {
        staticClass: 'switch-label',
        style: {
          background: this.mainColor
        }
      })
    ]);
  }
};
