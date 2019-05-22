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
    Vue.use(atomD);
    const components = Vue.options.components;
    // judge component whether exist
    componentNames.forEach((compName, index) => {
      expect(components[compName]).not.toBeUndefined();
    });
    expect(Vue.$toast).not.toBeUndefined();
    expect(Vue.$picker).not.toBeUndefined();
    expect(Vue.$dialog).not.toBeUndefined();
    expect(Vue.$selectBox).not.toBeUndefined();
    expect(Vue.$actionSheet).not.toBeUndefined();
    console.log(Vue)
  });
  test('component test', () => {
    compList.forEach((component, index) => {
      Vue.component(component.name, component);
    });
    const components = Vue.options.components;
    // judge component whether exist
    componentNames.forEach((compName, index) => {
      expect(components[compName]).not.toBeUndefined();
    });
  });
});
