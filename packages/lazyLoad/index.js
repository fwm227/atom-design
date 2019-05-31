import LazyLoad from './lazyLoad.js';

export default function install (Vue) {
  Vue.directive('lazyload', LazyLoad.lazyLoad);
};
