import './index.css';

export default {
  data () {
    return {
      length: 0
    };
  },
  props: {
    value: {
      type: String
    },
    maxLength: {
      type: Number
    },
    placeholder: {
      type: String
    }
  },
  render (h) {
    if (this.maxLength !== void 0) {
      var limitRender = h('div', {
        staticClass: 'textarea-limit'
      }, `${this.length} / ${this.maxLength}`);
    }
    return h('div', {
      staticClass: 'atom-textarea'
    }, [
      h('textarea', {
        staticClass: 'textarea-entry',
        attrs: {
          placeholder: this.placeholder
        },
        on: {
          input: () => {
            const currentLength = event.target.value.length;
            if (currentLength > this.maxLength) event.target.value = event.target.value.slice(0, this.maxLength);
            else this.length = currentLength;
            this.$emit('input', event.target.value);
          }
        }
      }),
      limitRender
    ]);
  }
};
