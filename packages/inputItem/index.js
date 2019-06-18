import './style.css';
import clearIcon from '../common/icon/clearIcon';

export default {
  name: 'atom-input-item',
  data () {
    return {
      innerValue: null,
      showClear: false
    };
  },
  components: {
    clearIcon
  },
  computed: {
    alignClass () {
      if (this.align === 'center') return 'input-align-center';
      else if (this.align === 'right') return 'input-align-right';
    }
  },
  props: {
    value: {
      type: String
    },
    canClear: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      defualt: 'text'
    },
    align: {
      type: String,
      default: 'left'
    },
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    inputStyle: {
      type: Object,
      default: null
    }
  },
  watch: {
    value (val) {
      this.innerValue = val;
    },
    innerValue (val) {
      if (!val) this.showClear = false;
      this.$emit('input', val);
    }
  },
  render (h) {
    if (this.showClear) {
      var clearRender = h('clear-icon', {
        nativeOn: {
          // handle bug that is click event invoked after blur event
          mousedown: () => {
            this.innerValue = '';
            this.showClear = false;
          }
        }
      });
    }
    return h('div', {
      staticClass: 'atom-input'
    }, [
      h('span', {
        staticClass: 'input-title'
      }, this.title),
      h('input', {
        domProps: {
          value: this.innerValue
        },
        attrs: {
          type: this.type,
          placeholder: this.placeholder
        },
        class: [
          'input-bar',
          this.alignClass
        ],
        style: isObject(this.inputStyle) && this.inputStyle,
        on: {
          input: () => {
            this.innerValue = event.target.value;
            if (this.canClear && this.innerValue && !this.showClear) this.showClear = true;
          },
          focus: () => {
            if (this.canClear && this.innerValue) this.showClear = true;
          },
          blur: () => {
            this.showClear = false;
          }
        }
      }),
      clearRender
    ]);
  }
};
