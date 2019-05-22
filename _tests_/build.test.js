import Vue from 'vue';
import atomD from '../bundle/atomD.min.js';
import {
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
  LoadMore,
  LazyLoad
} from '../lib/index.js';

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

const componentNames = [
  'atom-badge',
  'atom-btn',
  'atom-carousel',
  'atom-drawer',
  'atom-header',
  'atom-input-item',
  'atom-loading',
  'atom-progress',
  'atom-pull',
  'atom-radio',
  'atom-range',
  'atom-search-bar',
  'atom-slide-item',
  'atom-switch',
  'atom-tabs',
  'atom-textarea'
];

describe('atom-design test', () => {
  test('build test', () => {
    // Inject component, popup object and directive into Vue object
    Vue.use(atomD);
    const components = Vue.options.components;
    const directives = Vue.options.directives;
    // judge component whether exist
    componentNames.forEach((compName, index) => {
      expect(components[compName]).not.toBeUndefined();
    });
    // judge popup obj whether exist
    expect(Vue.$toast).not.toBeUndefined();
    expect(Vue.$picker).not.toBeUndefined();
    expect(Vue.$dialog).not.toBeUndefined();
    expect(Vue.$selectBox).not.toBeUndefined();
    expect(Vue.$actionSheet).not.toBeUndefined();
    // judge directive whether exist
    expect(directives.loadmore).not.toBeUndefined();
    expect(directives.lazyload).not.toBeUndefined();
  });
  test('component test', () => {
    // Inject component, popup object and directive into Vue object
    compList.forEach((component, index) => {
      Vue.component(component.name, component);
    });
    Vue.$toast = Toast;
    Vue.$picker = Picker;
    Vue.$dialog = Dialog;
    Vue.$selectBox = SelectBox;
    Vue.$actionSheet = ActionSheet;
    Vue.directive('loadmore', LoadMore.loadmore);
    Vue.directive('lazyload', LazyLoad.lazyload);

    const components = Vue.options.components;
    const directives = Vue.options.directives;
    // judge component whether exist
    componentNames.forEach((compName, index) => {
      expect(components[compName]).not.toBeUndefined();
    });
    // judge popup obj whether exist
    expect(Vue.$toast).not.toBeUndefined();
    expect(Vue.$picker).not.toBeUndefined();
    expect(Vue.$dialog).not.toBeUndefined();
    expect(Vue.$selectBox).not.toBeUndefined();
    expect(Vue.$actionSheet).not.toBeUndefined();
    // judge directive whether exist
    expect(directives.loadmore).not.toBeUndefined();
    expect(directives.lazyload).not.toBeUndefined();
  });
});
