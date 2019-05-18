"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Toast", {
  enumerable: true,
  get: function get() {
    return _toast.default;
  }
});
Object.defineProperty(exports, "Picker", {
  enumerable: true,
  get: function get() {
    return _picker.default;
  }
});
Object.defineProperty(exports, "Dialog", {
  enumerable: true,
  get: function get() {
    return _dialog.default;
  }
});
Object.defineProperty(exports, "ActionSheet", {
  enumerable: true,
  get: function get() {
    return _actionSheet.default;
  }
});
Object.defineProperty(exports, "Badge", {
  enumerable: true,
  get: function get() {
    return _badge.default;
  }
});
Object.defineProperty(exports, "Button", {
  enumerable: true,
  get: function get() {
    return _button.default;
  }
});
Object.defineProperty(exports, "Carousel", {
  enumerable: true,
  get: function get() {
    return _carousel.default;
  }
});
Object.defineProperty(exports, "Drawer", {
  enumerable: true,
  get: function get() {
    return _drawer.default;
  }
});
Object.defineProperty(exports, "Header", {
  enumerable: true,
  get: function get() {
    return _header.default;
  }
});
Object.defineProperty(exports, "InputItem", {
  enumerable: true,
  get: function get() {
    return _inputItem.default;
  }
});
Object.defineProperty(exports, "Loading", {
  enumerable: true,
  get: function get() {
    return _loading.default;
  }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function get() {
    return _progress.default;
  }
});
Object.defineProperty(exports, "Pull", {
  enumerable: true,
  get: function get() {
    return _pull.default;
  }
});
Object.defineProperty(exports, "Radio", {
  enumerable: true,
  get: function get() {
    return _radio.default;
  }
});
Object.defineProperty(exports, "Range", {
  enumerable: true,
  get: function get() {
    return _range.default;
  }
});
Object.defineProperty(exports, "SearchBar", {
  enumerable: true,
  get: function get() {
    return _searchBar.default;
  }
});
Object.defineProperty(exports, "SelectBox", {
  enumerable: true,
  get: function get() {
    return _selectBox.default;
  }
});
Object.defineProperty(exports, "SlideItem", {
  enumerable: true,
  get: function get() {
    return _slideItem.default;
  }
});
Object.defineProperty(exports, "Switch", {
  enumerable: true,
  get: function get() {
    return _switch.default;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function get() {
    return _tabs.default;
  }
});
Object.defineProperty(exports, "Textarea", {
  enumerable: true,
  get: function get() {
    return _textarea.default;
  }
});
Object.defineProperty(exports, "LoadMore", {
  enumerable: true,
  get: function get() {
    return _loadMore.default;
  }
});
Object.defineProperty(exports, "LazyLoad", {
  enumerable: true,
  get: function get() {
    return _lazyLoad.default;
  }
});
exports.default = void 0;

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
var version = '1.1.0';
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

var _default = {
  version: version,
  install: install
};
exports.default = _default;