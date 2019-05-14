function typeEqual (obj, type) {
  return Object.prototype.toString.call(obj) === `[object ${type}]`;
}

export default typeEqual;
