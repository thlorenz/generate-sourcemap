'use strict';

var create = require('..');
var gen = create('bundle.js');
var ranges = [
    { sourceFile: 'foo.js', start: 3, end: 5 }
  , { sourceFile: 'bar.js', start: 6, end: 15 }
];

gen.addRanges(ranges);

console.log('source map for ranges:\n', ranges);

console.log('is: \n', gen.getMap());
