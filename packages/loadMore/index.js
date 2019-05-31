import Loadmore from './loadmore.js';

export default function install (Vue) {
  Vue.directive('loadmore', Loadmore.loadmore);
};
