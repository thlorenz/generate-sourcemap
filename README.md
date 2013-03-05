# generate sourcemap [![build status](https://secure.travis-ci.org/thlorenz/generate-sourcemap.png)](http://travis-ci.org/thlorenz/generate-sourcemap)

Generates a source map for files that were packed into a bundle.

```js
var create = require('generate-sourcemap');
var gen = create('bundle.js');
var ranges = [
    { sourceFile: 'foo.js', start: 3, end: 5 }
  , { sourceFile: 'bar.js', start: 6, end: 15 }
];

gen.addRanges(ranges);

console.log('source map for ranges:\n', ranges);
console.log('is: \n', gen.getMap());
```

Output:
```
source map for ranges:
 [ { sourceFile: 'foo.js', start: 3, end: 5 },
  { sourceFile: 'bar.js', start: 6, end: 15 } ]
is: 
 {"version":3,"file":"bundle.js","sources":["foo.js","bar.js"],"names":[],"mappings":";;;AAAA;AACA;;ACDA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA"}
```
