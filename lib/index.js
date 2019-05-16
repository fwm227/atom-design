"use strict";

var _toast = _interopRequireDefault(require("./toast"));

var _picker = _interopRequireDefault(require("./picker"));

var _dialog = _interopRequireDefault(require("./dialog"));

var _actionSheet = _interopRequireDefault(require("./actionSheet"));

var _badge = _interopRequireDefault(require("./badge"));

var _button = _interopRequireDefault(require("./button"));

var _carousel = _interopRequireDefault(require("./carousel"));

var _drawer = _interopRequireDefault(require("./drawer"));

var _header = _interopRequireDefault(require("./header"));

var _inputItem = _interopRequireDefault(require("./inputItem"));

var _loading = _interopRequireDefault(require("./loading"));

var _progress = _interopRequireDefault(require("./progress"));

var _pull = _interopRequireDefault(require("./pull"));

var _radio = _interopRequireDefault(require("./radio"));

var _range = _interopRequireDefault(require("./range"));

var _searchBar = _interopRequireDefault(require("./searchBar"));

var _selectBox = _interopRequireDefault(require("./selectBox"));

var _slideItem = _interopRequireDefault(require("./slideItem"));

var _switch = _interopRequireDefault(require("./switch"));

var _tabs = _interopRequireDefault(require("./tabs"));

var _textarea = _interopRequireDefault(require("./textarea"));

var _loadMore = _interopRequireDefault(require("./loadMore"));

var _lazyLoad = _interopRequireDefault(require("./lazyLoad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// js plugin
// components
// directive
var version = '1.0.0';
var compList = [_badge.default, _button.default, _carousel.default, _drawer.default, _header.default, _inputItem.default, _loading.default, _progress.default, _pull.default, _radio.default, _range.default, _searchBar.default, _selectBox.default, _slideItem.default, _switch.default, _tabs.default, _textarea.default];

var install = function install(Vue) {
  // handle js plugin
  Vue.$toast = _toast.default;
  Vue.$picker = _picker.default;
  Vue.$dialog = _dialog.default;
  Vue.$actionSheet = _actionSheet.default; // handle component

  compList.forEach(function (Component, idx) {
    Vue.component(Component.name, Component);
  }); // handle directive

  Vue.directive('loadmore', _loadMore.default.loadmore);
  Vue.directive('lazyload', _lazyLoad.default.lazyload);
};

if (window && window.Vue !== void 0) {
  install(window.Vue);
}

module.exports = {
  version: version,
  Badge: _badge.default,
  Button: _button.default,
  Carousel: _carousel.default,
  Drawer: _drawer.default,
  Header: _header.default,
  InputItem: _inputItem.default,
  Loading: _loading.default,
  Progress: _progress.default,
  Pull: _pull.default,
  Radio: _radio.default,
  Range: _range.default,
  SearchBar: _searchBar.default,
  SelectBox: _selectBox.default,
  SlideItem: _slideItem.default,
  Switch: _switch.default,
  Tabs: _tabs.default,
  Textarea: _textarea.default,
  Toast: _toast.default,
  Picker: _picker.default,
  Dialog: _dialog.default,
  ActionSheet: _actionSheet.default,
  LoadMore: _loadMore.default,
  LazyLoad: _lazyLoad.default
};