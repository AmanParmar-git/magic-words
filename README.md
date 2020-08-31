# Magic-Words

magic-words is a trie implementation with json and javascript.

## usage

add words with addWord and remove them with removeWord methods.

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/1.png)

#### inspect trie

```
console.log(mw.inspectTrie());
```

result will be

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/inspectres2.png)

#### JSON

your added strings will be stored in json file and it will be loaded everytime you start the script. it will be in node_module/magic-words/data.json. also don't forget to call mw.save() to save your file in disk after you remove or add words.

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/data1.png)

#### did you mean?

you can autocomplete added words by calling didyoumean method. it will return array of autocompleted words.

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/result.png)
