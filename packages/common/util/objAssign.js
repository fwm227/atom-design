function objAssign (target, source) {
  for (var key in source) {
    target[key] = source[key];
  }
  return target;
}

export default objAssign;
