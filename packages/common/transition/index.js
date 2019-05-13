import './index.css';

function transitionFactory (name) {
  return {
    name: name,
    functional: true,
    render: function (h, context) {
      context.data.props = {name};
      return h('transition', context.data, context.children);
    }
  };
}

export const fadeTransition = transitionFactory('fade');
export const scaleTransition = transitionFactory('scale');
export const slideTopTransition = transitionFactory('slideTop');
export const slideRightTransition = transitionFactory('slideRight');
