'use strict';
let _ = require('lodash');
let Stream = require('./classes/Stream.js');
let PreSnippet = require('./classes/PreSnippet.js');

/*
* input: @param str - text that will have html tags injected around indices believed to be certain types
*        @param streamArr - arr of Stream objects that will contain where to put the HTML tags around
* */
function textExtractorForPreInjection (str, streamArr) {
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
  return preSnippetArr;

  // if this gets any more granular than this, let's break it out
  function outputForStreamChars(str, type) {
    return `<span class="simple ${type}-simple">${str}</span>`;
  }
}





module.exports = textExtractorForPreInjection;
