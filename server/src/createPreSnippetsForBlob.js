'use strict';
const _ = require('lodash');
const Stream = require('./classes/Stream.js');
const PreSnippet = require('./classes/PreSnippet.js');
const snippetTypeHighlighter = require('./subModules/createPreSnippetsForBlob/snippetTypeHighlighter.js');
/*
* input: @param str - text that will have html tags injected around indices believed to be certain types
*        @param streamArr - arr of Stream objects that will contain where to put the HTML tags around
* */
const DEFAULT_OPEN_CHAR = `“`;
const DEFAULT_CLOSE_CHAR =  `”`;
const DEFAULT_END_NARR_ON_NEWLINE =  false;
// DEFAULT_OPEN_CHAR, DEFAULT_CLOSE_CHAR, DEFAULT_END_NARR_ON_NEWLINE, for GoT
// these should stay the same
function createPreSnippetsForBlob (str) {
  let streamArr = snippetTypeHighlighter(str, DEFAULT_OPEN_CHAR, DEFAULT_CLOSE_CHAR, DEFAULT_END_NARR_ON_NEWLINE);
  // guarantee we are working with streams and valid text
  if (streamArr.length === 0 || str === '') { return str; }
  let preSnippetArr = [], previousStream;

  // handle any characters coming before first stream

  let firstStream = streamArr[0];
  if (firstStream.openCharIndex > 0) {
    preSnippetArr.push(new PreSnippet(str.slice(0, firstStream.openCharIndex), 'whitespace'));
  }
  streamArr.forEach(function (stream, i, arr) {
    // if chars in between streams exist, put them on before grabbing stream chars
    previousStream = i > 0 ? arr[i-1] : null;
    if (previousStream && (stream.openCharIndex - previousStream.closeCharIndex+1) > 0) {
      let basicStrToPush = str.slice(previousStream.closeCharIndex+1, stream.openCharIndex);
      preSnippetArr.push(new PreSnippet(basicStrToPush, 'whitespace')); // probably new line chars or excessive spaces
    }
    // just push the chars from the current stream range on
    let preSnippetText = str.slice(stream.openCharIndex, stream.closeCharIndex+1);
    preSnippetArr.push(new PreSnippet(preSnippetText, stream.type));
  });
  // handle any straggling characters at end
  let lastStream = streamArr[streamArr.length-1];
  if (str.length-1 > lastStream.closeCharIndex) {
    preSnippetArr.push(new PreSnippet(str.slice(lastStream.closeCharIndex+1), 'whitespace'));
  }
  // give ids so easier to track later
  _.forEach(preSnippetArr, function (ps, i) {
    ps.id = i;
  });
  return preSnippetArr;

  // if this gets any more granular than this, let's break it out
  //function outputForStreamChars(str, type) {
  //  return `<span class="simple ${type}-simple">${str}</span>`;
  //}
}





module.exports = createPreSnippetsForBlob;
