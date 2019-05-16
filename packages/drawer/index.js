import './style.css';
import {fadeTransition} from '../common/transition';

export default {
  name: 'atom-drawer',
  data () {
    return {
      showMask: false
    };
  },
  props: {
    type: {
      type: String,
      default: 'build-in'
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value (val) {
      this.showMask = val;
      const drawerContent = this.$el.children.item(0);
      if (val) {
        this.type === 'popup' ? this.showMask = true : drawerContent.children.item(1).style.transform = `translate3d(${drawerContent.children.item(0).offsetWidth}px, 0, 0)`;
        drawerContent.children.item(0).style.transform = `translate3d(${drawerContent.children.item(0).offsetWidth}px, 0, 0)`;
      } else {
        this.type === 'popup' ? this.showMask = false : drawerContent.children.item(1).style.transform = 'translate3d(0, 0, 0)';
        drawerContent.children.item(0).style.transform = 'translate3d(0, 0, 0)';
      }
      this.$emit('input', val);
    }
  },
  mounted () {
    this.initStyle();
  },
  methods: {
    initStyle () {
      const drawerContent = this.$el.children.item(0);
      drawerContent.children.item(0).style = `position: absolute; left: -${drawerContent.children.item(0).offsetWidth}px; top: 0; transition: transform 300ms; z-index: 2019`;
      if (this.type !== 'popup') drawerContent.children.item(1).style = 'position: absolute; left: 0; top: 0; transition: transform 300ms;';
    }
  },
  render (h) {
    if (this.type === 'popup') {
      var maskRender = h(fadeTransition, {}, [
        h('div', {
          staticClass: 'drawer-mask',
          directives: [{
            name: 'show',
            value: this.showMask
          }],
          on: {
            click: () => {
              this.showMask = false;
              // close navbar
              this.$el.children.item(0).children.item(0).style.transform = 'translate3d(0, 0, 0)';
              this.$emit('input', false);
            }
          }
        })
      ]);
    }
    return h('div', {
      class: 'atom-drawer'
    }, [
      h('div', {staticClass: 'atom-drawper-wrapper'}, [
        this.$slots.navbar,
        this.$slots.content,
        maskRender
      ])
    ]);
  }
};
