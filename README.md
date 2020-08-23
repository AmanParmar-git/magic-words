# Magic-Words

magic-words is a trie implementation with json and javascript.

## usage

####add data with addWords method..

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/1.png)

#### you can inspect trie with this method

```
console.log(mw.inspectTrie());
```

result will be

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/inspectres.png)

#### JSON

your added strings will be stored in json file and it will be loaded everytime you start the script. you can delete any of string or modify them by going to node_module/magic-words/data.json

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/data.png)

#### did you mean?

you can autocomplete added words by calling didyoumean method. it will return array of autocompleted words.

![alt text](https://raw.githubusercontent.com/AmanParmar-git/magic-words/master/screenshots/result.png)
