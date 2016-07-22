'use strict';
let _ = require('lodash');
let Stream = require('./classes/Stream.js');

/*
* input: @param str - text that will have html tags injected around indices believed to be certain types
*        @param streamArr - arr of Stream objects that will contain where to put the HTML tags around
* */
function indexHtmlInjector (str, streamArr) {
  // guarantee we are working with streams and valid text
  if (streamArr.length === 0 || str === '') { return str; }
  let htmlInjectedArr = [], previousStream;

  // handle any characters coming before first stream

  let firstStream = streamArr[0];
  if (firstStream.openCharIndex > 0) {
    htmlInjectedArr.push(str.slice(0, firstStream.openCharIndex));
  }
  streamArr.forEach(function (stream, i, arr) {
    // if chars in between streams exist, put them on before grabbing stream chars
    previousStream = i > 0 ? arr[i-1] : null;
    if (previousStream && (stream.openCharIndex - previousStream.closeCharIndex+1) > 0) {
      let basicStrToPush = str.slice(previousStream.closeCharIndex+1, stream.openCharIndex);
      htmlInjectedArr.push(basicStrToPush);
    }
    // just push the chars from the current stream range on
    let strToInjectHtmlAround = str.slice(stream.openCharIndex, stream.closeCharIndex+1);
    htmlInjectedArr.push(outputForStreamChars(strToInjectHtmlAround, stream.type));
  });
  // handle any straggling characters at end
  let lastStream = streamArr[streamArr.length-1];
  if (str.length-1 > lastStream.closeCharIndex) {
    htmlInjectedArr.push(str.slice(lastStream.closeCharIndex+1));
  }
  return htmlInjectedArr.join('');

  // if this gets any more granular than this, let's break it out
  function outputForStreamChars(str, type) {
    return `<span class="simple ${type}-simple">${str}</span>`;
  }
}





module.exports = indexHtmlInjector;
