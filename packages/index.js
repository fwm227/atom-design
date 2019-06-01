// js plugin
import Toast from './toast';
import Picker from './picker';
import Dialog from './dialog';
import SelectBox from './selectBox';
import ActionSheet from './actionSheet';
// components
import Badge from './badge';
import Button from './button';
import Carousel from './carousel';
import Drawer from './drawer';
import Header from './header';
import InputItem from './inputItem';
import Loading from './loading';
import Progress from './progress';
import Pull from './pull';
import Radio from './radio';
import Range from './range';
import SearchBar from './searchBar';
import SlideItem from './slideItem';
import Switch from './switch';
import Tabs from './tabs';
import Textarea from './textarea';
// directive
import Loadmore from './loadmore';
import Lazyload from './lazyload';

import pkgInfo from '../package.json';
const version = pkgInfo.version;

const compList = [
  Badge,
  Button,
  Carousel,
  Drawer,
  Header,
  InputItem,
  Loading,
  Progress,
  Pull,
  Radio,
  Range,
  SearchBar,
  SlideItem,
  Switch,
  Tabs,
  Textarea
];

const install = function (Vue) {
  // handle js plugin
  Vue.$toast = Vue.prototype.$toast = Toast;
  Vue.$picker = Vue.prototype.$picker = Picker;
  Vue.$dialog = Vue.prototype.$dialog = Dialog;
  Vue.$selectBox = Vue.prototype.$selectBox = SelectBox;
  Vue.$actionSheet = Vue.prototype.$actionSheet = ActionSheet;
  // handle component
  compList.forEach(function (Component, idx) {
    Vue.component(Component.name, Component);
  });
  // handle directive
  Vue.directive('lazyload', Lazyload.lazyload);
  Vue.directive('loadmore', Loadmore.loadmore);
};
// auto install
if (window && window.Vue !== void 0) {
  install(window.Vue);
}

export {
  Badge,
  Button,
  Carousel,
  Drawer,
  Header,
  InputItem,
  Loading,
  Progress,
  Pull,
  Radio,
  Range,
  SearchBar,
  SlideItem,
  Switch,
  Tabs,
  Textarea,
  Toast,
  Picker,
  Dialog,
  SelectBox,
  ActionSheet,
  Loadmore,
  Lazyload
};

export default {
  version,
  install
};
