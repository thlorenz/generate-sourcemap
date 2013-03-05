'use strict';

var SourceMapGenerator = require('source-map').SourceMapGenerator;

function addMappings(generator, sourceFile, startLine, endLine) {
  for (var line = startLine + 1; line <= endLine; line++) {
    var origLine = line - startLine;
    try {
      generator.addMapping({
          source: sourceFile
        , original: { line: origLine, column: 0 }
        , generated: { line: line, column: 0 }
      });
    } catch (e) {
      console.error('when mapping sourceFile: %s, origLine: %d line: %d', sourceFile, origLine, line);
      throw(e);
    }
  }
}

/**
 * Creates a source map generator.
 *  It consumes ranges via: addRange({Object}|{Array{Object}})
 *  It returns the generated map via: getMap
 * 
 *  A range has the following structure: 
 *    { source: 'name of original source file', start: {Number}, end: {Number} start/end line of file inside generated code }
 *
 * @name createGenerator
 * @function 
 * @param fileName {String} The file name of the generated code
 * @param sourceRoot {String} The optional root to apply to the source maps.
 * @return {Object}
 */
module.exports = function createGenerator(fileName, sourceRoot) {
  sourceRoot = sourceRoot || '';

  var generator = new SourceMapGenerator({ file: fileName, sourceRoot: sourceRoot });

  function addRanges(ranges) {
    if (!Array.isArray(ranges)) ranges = [ ranges ];

    ranges.forEach(function (range) {
      addMappings(generator, range.sourceFile, range.start, range.end);
    });
  }

  return {
      addRanges :  addRanges
    , getMap    :  function () { return generator.toString(); }
  };
};
