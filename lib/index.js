// js plugin
import Toast from './toast';
import Picker from './picker';
import Dialog from './dialog';
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
import SelectBox from './selectBox';
import SlideItem from './slideItem';
import Switch from './switch';
import Tabs from './tabs';
import Textarea from './textarea';
// directive
import LoadMore from './loadMore';
import LazyLoad from './lazyLoad';

const version = '1.0.0';
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
  SelectBox,
  SlideItem,
  Switch,
  Tabs,
  Textarea
];

const install = function (Vue) {
  // handle js plugin
  Vue.$toast = Toast;
  Vue.$picker = Picker;
  Vue.$dialog = Dialog;
  Vue.$actionSheet = ActionSheet;
  // handle component
  compList.forEach(function (Component, idx) {
    Vue.component(Component.name, Component);
  })
  // handle directive
  Vue.directive('loadmore', LoadMore.loadmore);
  Vue.directive('lazyload', LazyLoad.lazyload);
}

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
  SelectBox,
  SlideItem,
  Switch,
  Tabs,
  Textarea,
  Toast,
  Picker,
  Dialog,
  ActionSheet,
  LoadMore,
  LazyLoad
}

export default {
  version,
  install
}
