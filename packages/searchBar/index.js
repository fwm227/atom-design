import './index.css';
import clearIcon from '../common/icon/clearIcon';

export default {
  data () {
    return {
      innerValue: null,
      showClear: false
    };
  },
  props: {
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    canClear: {
      type: Boolean,
      default: true
    }
  },
  components: {
    clearIcon
  },
  watch: {
    value (val) {
      this.innerValue = val;
    },
    innerValue (val) {
      this.$emit('input', val);
      !this.innerValue && (this.showClear = false);
    }
  },
  render (h) {
    if (this.showClear) {
      var clearRender = h('clear-icon', {
        nativeOn: {
          click: () => {
            this.innerValue = '';
            this.showClear = false;
          }
        }
      });
    }
    return h('div', {
      staticClass: 'atom-search'
    }, [
      h('div', {
        staticClass: 'search-icon'
      }, [
        h('div', {staticClass: 'icon-wrapper'})
      ]),
      h('input', {
        domProps: {
          value: this.innerValue
        },
        staticClass: 'search-input',
        attrs: {
          type: 'text',
          placeholder: this.placeholder
        },
        on: {
          input: () => {
            this.innerValue = event.target.value;
            if (this.canClear && this.innerValue && !this.showClear) this.showClear = true;
          },
          focus: () => {
            if (this.canClear && this.innerValue) this.showClear = true;
          }
        }
      }),
      clearRender
    ]);
  }
};
