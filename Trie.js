const Node = require("./Node");
const util = require("util");
const fs = require("fs");
const data = require("./data.json");

function trie() {
  let main = new Node(null);

  this.addWord = function (word, mode = "new") {
    if (mode === "new" && !data.includes(word)) {
      data.push(word);
      fs.writeFileSync(
        "node_modules/magic-words/data.json",
        JSON.stringify(data)
      );
    }
    let current = main;
    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);
      let index = contains(current.children, char);
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
    let current = main;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const index = contains(current.children, char);
      if (index === -1) {
        return false;
      }
      current = current.children[index];
    }
    return current.isEnd;
  };

  this.inspectTrie = function () {
    return util.inspect(main, false, null, true);
  };

  this.didYouMean = function (word) {
    const result = [];
    let current = main;
    for (let i = 0; i < word.length; i++) {
      const char = word.charAt(i);
      const index = contains(current.children, char);
      if (index === -1) {
        return result;
      }
      current = current.children[index];
    }

    getWords(result, current, word);

    return result;
  };

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

  function contains(array, char) {
    for (let i = 0; i < array.length; i++) {
      let query = array[i].val;
      if (query === char) return i;
    }
    return -1;
  }
}

const t = new trie();
for (let i = 0; i < data.length; i++) {
  t.addWord(data[i], "old");
}
module.exports = t;
