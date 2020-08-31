const Node = require("./Node");
const util = require("util");
const fs = require("fs");

try {
  var main = require("./data.json");
} catch (e) {
  main = new Node(null);
}

function trie() {
  this.save = function () {
    fs.writeFileSync(
      // "node_modules/magic-words/data.json",
      "data.json",
      JSON.stringify(main)
    );
  };

  this.addWord = function (word = "") {
    if (word === "") return;
    let current = main;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let index = getIndex(current.children, char);
      if (index === -1) {
        if (i === word.length - 1) {
          current.children.push(new Node(char, true));
        } else {
          current.children.push(new Node(char));
        }
        current = current.children[current.children.length - 1];
      } else {
        if (i === word.length - 1) {
          current.children[index].isEnd = true;
        } else {
          current = current.children[index];
        }
      }
    }
  };

  this.containsWord = function (word) {
    let current = getLastChar(word);

    return current.isEnd;
  };

  this.inspectTrie = function () {
    return util.inspect(main, false, null, true);
  };

  this.didYouMean = function (word) {
    const result = [];
    let current = getLastChar(word);

    getWords(result, current, word);

    return result;
  };

  this.removeWord = function (word) {
    const nodes = [];
    let current = getLastChar(word, nodes);
    if (!current) return;
    current.isEnd = false;

    if (current.children.length === 0) {
      for (let i = nodes.length - 1; i > 0; i--) {
        if (!nodes[i].isEnd) {
          let index = getIndex(nodes[i - 1].children, nodes[i].val);
          nodes[i - 1].children.splice(index, 1);
        } else {
          return;
        }
      }
    }
  };

  function getLastChar(word, nodes) {
    let current = main;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const index = getIndex(current.children, char);
      if (index === -1) {
        return;
      }
      if (nodes) nodes.push(current);
      current = current.children[index];
    }
    return current;
  }

  function getWords(result, current, word) {
    for (let i = 0; i < current.children.length; i++) {
      if (current.children[i].isEnd) {
        result.push(word + current.children[i].val);
      }
      if (current.children[i].children.length > 0) {
        getWords(result, current.children[i], word + current.children[i].val);
      }
    }
  }

  function getIndex(array, char) {
    for (let i = 0; i < array.length; i++) {
      let query = array[i].val;
      if (query === char) return i;
    }
    return -1;
  }
}

const t = new trie();

module.exports = t;
