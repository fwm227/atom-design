import Lazyload from './lazyload.js';

export default function install (Vue) {
  Vue.directive('lazyload', Lazyload.lazyload);
};
