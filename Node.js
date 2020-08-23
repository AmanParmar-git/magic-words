module.exports = class Node {
  constructor(val, isEnd = false) {
    this.val = val;
    this.isEnd = isEnd;
    this.children = [];
  }
};
