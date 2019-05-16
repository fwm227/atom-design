"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("./style.css");

var _popup = _interopRequireDefault(require("../common/mixin/popup"));

var _button = _interopRequireDefault(require("../button"));

var _transition = require("../common/transition");

var _pickerColumn = _interopRequireDefault(require("./pickerColumn.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'atom-picker',
  data: function data() {
    return {
      pickerArr: [],
      selectArr: []
    };
  },
  mixins: [_popup.default],
  components: {
    atomBtn: _button.default,
    pickerColumn: _pickerColumn.default
  },
  methods: {
    initAnimPosition: function initAnimPosition(start) {
      var columnList = this.$el.children.item(0).children.item(1).children.item(0);
      var length = columnList.children.length;

      for (var i = start; i < length; i++) {
        this.$refs["colPicker".concat(i)].initData();
        columnList.children.item(i).children.item(0).style.transform = 'translate3d(0, 0, 0)';
      }
    },
    handleChildren: function handleChildren(actionDepth, childrens) {
      var _this = this;

      var insertVnode = this.$createElement('picker-column', {
        attrs: {
          colList: childrens
        },
        ref: "colPicker".concat(actionDepth + 1),
        on: {
          selValue: function selValue(val) {
            _this.selectArr[insertVnode.depth] = val.text;

            if (val.childrens) {
              _this.initAnimPosition(insertVnode.depth + 1);

              _this.handleChildren(insertVnode.depth, val.childrens);
            } else {
              _this.pickerArr.splice(insertVnode.depth + 1);

              _this.selectArr.splice(insertVnode.depth + 1);
            }
          }
        }
      }); // set depth value and default select value when intial picker

      if (insertVnode.depth === void 0) {
        insertVnode.depth = ++actionDepth;
        this.selectArr[insertVnode.depth] = childrens[0].text;
      }

      this.pickerArr.splice(insertVnode.depth);
      this.pickerArr.push(insertVnode); // initial children

      childrens[0] && childrens[0].childrens && this.handleChildren(actionDepth, childrens[0].childrens);
    },
    handleData: function handleData() {
      var _this2 = this;

      var insertVnode = this.$createElement('picker-column', {
        attrs: {
          colList: this._pickerList
        },
        ref: 'colPicker0',
        on: {
          selValue: function selValue(val) {
            _this2.selectArr[0] = val.text;

            if (val.childrens) {
              _this2.initAnimPosition(1);

              _this2.handleChildren(0, val.childrens);
            } else {
              _this2.pickerArr.splice(1);

              _this2.selectArr.splice(1);
            }
          }
        }
      });
      insertVnode.depth = 0;
      this.selectArr[0] = this._pickerList[0].text;
      this.pickerArr.push(insertVnode); // initial picker

      this._pickerList[0] && this._pickerList[0].childrens && this.handleChildren(0, this._pickerList[0].childrens);
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    setTimeout(function () {
      _this3.handleData();
    });
  },
  render: function render(h) {
    var _this4 = this;

    return h('div', {
      staticClass: 'atom-picker',
      on: {
        click: function click() {
          _this4.isShow = false;
        }
      }
    }, [h(_transition.slideTopTransition, {}, [h('div', {
      staticClass: 'picker-wrapper',
      directives: [{
        name: 'show',
        value: this.isShow
      }],
      on: {
        click: function click() {
          event.stopPropagation();
        }
      }
    }, [h('div', {
      staticClass: 'picker-header'
    }, [h('atom-btn', {
      attrs: {
        actionStyle: this._cancelBtn && this._cancelBtn.actionStyle
      },
      style: this._cancelBtn && this._cancelBtn.style || 'border: none; font-size: 16px;',
      nativeOn: {
        click: function click() {
          _this4.isShow = false;
          _this4._cancelBtn && _this4._cancelBtn.event(_this4.selectArr);
        }
      }
    }, '取消'), h('atom-btn', {
      attrs: {
        type: 'primary',
        actionStyle: this._submitBtn && this._submitBtn.actionStyle
      },
      style: this._submitBtn && this._submitBtn.style || 'border: none; font-size: 16px;',
      nativeOn: {
        click: function click() {
          _this4.isShow = false;
          _this4._submitBtn && _this4._submitBtn.event(_this4.selectArr);
        }
      }
    }, '确定')]), h('div', {
      staticClass: 'picker-content'
    }, [h('div', {
      staticClass: 'picker-col-content'
    }, this.pickerArr), h('div', {
      staticClass: 'picker-indicator'
    }), h('div', {
      staticClass: 'picker-mask'
    })])])])]);
  }
};
exports.default = _default;