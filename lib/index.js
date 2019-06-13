"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"Toast",{enumerable:!0,get:function(){return _toast.default}}),Object.defineProperty(exports,"Picker",{enumerable:!0,get:function(){return _picker.default}}),Object.defineProperty(exports,"Dialog",{enumerable:!0,get:function(){return _dialog.default}}),Object.defineProperty(exports,"SelectBox",{enumerable:!0,get:function(){return _selectBox.default}}),Object.defineProperty(exports,"ActionSheet",{enumerable:!0,get:function(){return _actionSheet.default}}),Object.defineProperty(exports,"Badge",{enumerable:!0,get:function(){return _badge.default}}),Object.defineProperty(exports,"Button",{enumerable:!0,get:function(){return _button.default}}),Object.defineProperty(exports,"Carousel",{enumerable:!0,get:function(){return _carousel.default}}),Object.defineProperty(exports,"Drawer",{enumerable:!0,get:function(){return _drawer.default}}),Object.defineProperty(exports,"Header",{enumerable:!0,get:function(){return _header.default}}),Object.defineProperty(exports,"InputItem",{enumerable:!0,get:function(){return _inputItem.default}}),Object.defineProperty(exports,"Loading",{enumerable:!0,get:function(){return _loading.default}}),Object.defineProperty(exports,"Progress",{enumerable:!0,get:function(){return _progress.default}}),Object.defineProperty(exports,"Pull",{enumerable:!0,get:function(){return _pull.default}}),Object.defineProperty(exports,"Radio",{enumerable:!0,get:function(){return _radio.default}}),Object.defineProperty(exports,"Range",{enumerable:!0,get:function(){return _range.default}}),Object.defineProperty(exports,"SearchBar",{enumerable:!0,get:function(){return _searchBar.default}}),Object.defineProperty(exports,"SlideItem",{enumerable:!0,get:function(){return _slideItem.default}}),Object.defineProperty(exports,"Switch",{enumerable:!0,get:function(){return _switch.default}}),Object.defineProperty(exports,"Tabs",{enumerable:!0,get:function(){return _tabs.default}}),Object.defineProperty(exports,"Textarea",{enumerable:!0,get:function(){return _textarea.default}}),Object.defineProperty(exports,"Loadmore",{enumerable:!0,get:function(){return _loadmore.default}}),Object.defineProperty(exports,"Lazyload",{enumerable:!0,get:function(){return _lazyload.default}}),exports.default=void 0;var _toast=_interopRequireDefault(require("./toast")),_picker=_interopRequireDefault(require("./picker")),_dialog=_interopRequireDefault(require("./dialog")),_selectBox=_interopRequireDefault(require("./selectBox")),_actionSheet=_interopRequireDefault(require("./actionSheet")),_badge=_interopRequireDefault(require("./badge")),_button=_interopRequireDefault(require("./button")),_carousel=_interopRequireDefault(require("./carousel")),_drawer=_interopRequireDefault(require("./drawer")),_header=_interopRequireDefault(require("./header")),_inputItem=_interopRequireDefault(require("./inputItem")),_loading=_interopRequireDefault(require("./loading")),_progress=_interopRequireDefault(require("./progress")),_pull=_interopRequireDefault(require("./pull")),_radio=_interopRequireDefault(require("./radio")),_range=_interopRequireDefault(require("./range")),_searchBar=_interopRequireDefault(require("./searchBar")),_slideItem=_interopRequireDefault(require("./slideItem")),_switch=_interopRequireDefault(require("./switch")),_tabs=_interopRequireDefault(require("./tabs")),_textarea=_interopRequireDefault(require("./textarea")),_loadmore=_interopRequireDefault(require("./loadmore")),_lazyload=_interopRequireDefault(require("./lazyload")),_package=_interopRequireDefault(require("../package.json"));function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var version=_package.default.version,compList=[_badge.default,_button.default,_carousel.default,_drawer.default,_header.default,_inputItem.default,_loading.default,_progress.default,_pull.default,_radio.default,_range.default,_searchBar.default,_slideItem.default,_switch.default,_tabs.default,_textarea.default],install=function(r){r.$toast=r.prototype.$toast=_toast.default,r.$picker=r.prototype.$picker=_picker.default,r.$dialog=r.prototype.$dialog=_dialog.default,r.$selectBox=r.prototype.$selectBox=_selectBox.default,r.$actionSheet=r.prototype.$actionSheet=_actionSheet.default,compList.forEach(function(e,t){r.component(e.name,e)}),r.directive("lazyload",_lazyload.default),r.directive("loadmore",_loadmore.default)};window&&void 0!==window.Vue&&install(window.Vue);var _default={version:version,install:install};exports.default=_default;