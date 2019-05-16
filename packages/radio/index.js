import './style.css';

export default {
  name: 'atom-radio',
  props: {
    name: {
      type: String
    },
    val: {
      type: String
    },
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#108ee9'
    }
  },
  mounted () {
    if (this.value === this.val) this.$el.children.item(0).checked = true;
    if (this.disabled) this.$el.children.item(0).disabled = true;
  },
  computed: {
    bgColor () {
      if (this.value === this.val) return this.color;
      else return 'white';
    }
  },
  watch: {
    disabled (val) {
      if (this.disabled) this.$el.children.item(0).disabled = true;
      else this.$el.children.item(0).disabled = false;
    }
  },
  render (h) {
    return h('label', {
      staticClass: 'atom-radio'
    }, [
      h('input', {
        attrs: {
          type: 'radio',
          name: this.name,
          value: this.val
        },
        staticClass: 'radio-input',
        on: {
          change: () => {
            this.$emit('input', event.target.value);
          }
        }
      }),
      h('label', {
        staticClass: 'radio-label',
        style: {
          background: this.bgColor
        }
      })
    ]);
  }
};
