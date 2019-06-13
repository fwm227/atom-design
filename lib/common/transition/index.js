"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.slideRightTransition = exports.slideTopTransition = exports.scaleTransition = exports.fadeTransition = void 0;

require("./style.css");

function transitionFactory(name) {
  return {
    name: name,
    functional: true,
    render: function render(h, context) {
      context.data.props = {
        name: name
      };
      return h('transition', context.data, context.children);
    }
  };
}

var fadeTransition = transitionFactory('fade');
exports.fadeTransition = fadeTransition;
var scaleTransition = transitionFactory('scale');
exports.scaleTransition = scaleTransition;
var slideTopTransition = transitionFactory('slideTop');
exports.slideTopTransition = slideTopTransition;
var slideRightTransition = transitionFactory('slideRight');
exports.slideRightTransition = slideRightTransition;