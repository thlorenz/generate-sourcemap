'use strict';
/*jshint asi: true */

var test = require('trap').test
  , create = require('..')

test('given I generated file: "bundle.js" and give no sourceRoot', function (t) {

  t.test('when I add no ranges', function (t) {
    var gen = create('bundle.js')
    t.equal(
        gen.getMap()
      , '{"version":3,"file":"bundle.js","sources":[],"names":[],"mappings":""}'
      , 'generates map without mappings'
    )
  })

  t.test('when I add a range for foo.js', function (t) {
    var gen = create('bundle.js')
    gen.addRanges({ sourceFile: 'foo.js', start: 3, end: 5 })

    t.equal(
        gen.getMap()
      , '{"version":3,"file":"bundle.js","sources":["foo.js"],"names":[],"mappings":";;;AAAA;AACA"}'
      , 'generates map with mappings for foo.js'
    )
  })

  t.test('when I add a range for foo.js and bar.js one by one', function (t) {
    var gen = create('bundle.js')
    gen.addRanges({ sourceFile: 'foo.js', start: 3, end: 5 })
    gen.addRanges({ sourceFile: 'bar.js', start: 6, end: 15 })

    t.equal(
        gen.getMap()
      ,   '{"version":3,"file":"bundle.js","sources":["foo.js","bar.js"],"names":[],'
        + '"mappings":";;;AAAA;AACA;;ACDA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA"}'
      , 'generates map with mappings for foo.js and bar.js'
    )
  })

  t.test('when I add a range for foo.js and bar.js as an Array', function (t) {
    var gen = create('bundle.js')
    gen.addRanges([
        { sourceFile: 'foo.js', start: 3, end: 5 }
      , { sourceFile: 'bar.js', start: 6, end: 15 }
    ])

    t.equal(
        gen.getMap()
      ,   '{"version":3,"file":"bundle.js","sources":["foo.js","bar.js"],"names":[],'
        + '"mappings":";;;AAAA;AACA;;ACDA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA"}'
      , 'generates map with mappings for foo.js and bar.js'
    )
  })
});
