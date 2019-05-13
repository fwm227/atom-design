import './index.css';
import atomPopup from '../common/mixin/popup';
import atomBtn from '../button';
import {slideTopTransition} from '../common/transition';
import pickerColumn from './pickerColumn.js';

export default {
  name: 'atom-picker',
  data () {
    return {
      pickerArr: [],
      selectArr: []
    };
  },
  mixins: [atomPopup],
  components: {
    atomBtn,
    pickerColumn
  },
  methods: {
    initAnimPosition (start) {
      const columnList = this.$el.children.item(0).children.item(1).children.item(0);
      const length = columnList.children.length;
      for (var i = start; i < length; i++) {
        this.$refs[`colPicker${i}`].initData();
        columnList.children.item(i).children.item(0).style.transform = 'translate3d(0, 0, 0)';
      }
    },
    handleChildren (actionDepth, childrens) {
      const insertVnode = this.$createElement('picker-column', {
        attrs: {
          colList: childrens
        },
        ref: `colPicker${actionDepth + 1}`,
        on: {
          selValue: (val) => {
            this.selectArr[insertVnode.depth] = val.text;
            if (val.childrens) {
              this.initAnimPosition(insertVnode.depth + 1);
              this.handleChildren(insertVnode.depth, val.childrens);
            } else {
              this.pickerArr.splice(insertVnode.depth + 1);
              this.selectArr.splice(insertVnode.depth + 1);
            }
          }
        }
      });
      // set depth value and default select value when intial picker
      if (insertVnode.depth === void 0) {
        insertVnode.depth = ++actionDepth;
        this.selectArr[insertVnode.depth] = childrens[0].text;
      }
      this.pickerArr.splice(insertVnode.depth);
      this.pickerArr.push(insertVnode);
      // initial children
      childrens[0] && childrens[0].childrens && this.handleChildren(actionDepth, childrens[0].childrens);
    },
    handleData () {
      const insertVnode = this.$createElement('picker-column', {
        attrs: {
          colList: this._pickerList
        },
        ref: 'colPicker0',
        on: {
          selValue: (val) => {
            this.selectArr[0] = val.text;
            if (val.childrens) {
              this.initAnimPosition(1);
              this.handleChildren(0, val.childrens);
            } else {
              this.pickerArr.splice(1);
              this.selectArr.splice(1);
            }
          }
        }
      });
      insertVnode.depth = 0;
      this.selectArr[0] = this._pickerList[0].text;
      this.pickerArr.push(insertVnode);
      // initial picker
      this._pickerList[0] && this._pickerList[0].childrens && this.handleChildren(0, this._pickerList[0].childrens);
    }
  },
  mounted () {
    setTimeout(() => {
      this.handleData();
    });
  },
  render: function (h) {
    return h('div', {
      staticClass: 'atom-picker',
      on: {
        click: () => {
          this.isShow = false;
        }
      }
    },
    [
      h(slideTopTransition, {}, [
        h('div', {
          staticClass: 'picker-wrapper',
          directives: [{
            name: 'show',
            value: this.isShow
          }],
          on: {
            click: () => {
              event.stopPropagation();
            }
          }
        }, [
          h('div', {
            staticClass: 'picker-header'
          }, [
            h('atom-btn', {
              attrs: {
                actionStyle: this._cancelBtn && this._cancelBtn.actionStyle
              },
              style: (this._cancelBtn && this._cancelBtn.style) || 'border: none; font-size: 16px;',
              nativeOn: {
                click: () => {
                  this.isShow = false;
                  this._cancelBtn && this._cancelBtn.event(this.selectArr);
                }
              }
            }, '取消'),
            h('atom-btn', {
              attrs: {
                type: 'primary',
                actionStyle: this._submitBtn && this._submitBtn.actionStyle
              },
              style: (this._submitBtn && this._submitBtn.style) || 'border: none; font-size: 16px;',
              nativeOn: {
                click: () => {
                  this.isShow = false;
                  this._submitBtn && this._submitBtn.event(this.selectArr);
                }
              }
            }, '确定')
          ]),
          h('div', {
            staticClass: 'picker-content'
          }, [
            h('div', {staticClass: 'picker-col-content'}, this.pickerArr),
            h('div', {
              staticClass: 'picker-indicator'
            }),
            h('div', {
              staticClass: 'picker-mask'
            })
          ])
        ])
      ])
    ]);
  }
};
