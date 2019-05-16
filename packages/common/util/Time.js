function setTime () {
  window._createPopupNsTime = performance && performance.now ? performance.now().toFixed(3) : Date.now();
}

function getTime () {
  return window._createPopupNsTime;
}

export {
  setTime,
  getTime
};
