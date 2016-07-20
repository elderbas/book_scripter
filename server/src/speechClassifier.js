"use strict";
let _ = require('lodash');
let Stream = require('./classes/Stream.js');
let sCHelper = require('./speechClassifierHelper.js');

// flow chart diagram
// https://www.draw.io/#G0B-uOEq9vSrDJQVN5NVpTclJEMk0
function speechClassifier (str, openChar, closeChar) {
  openChar = `“`;
  closeChar = `”`;
  const isSpeechFriendlyChar = sCHelper.isSpeechFriendlyChar(openChar, closeChar);
  const isNarrationFriendlyChar = sCHelper.isNarrationFriendlyChar(openChar, closeChar);
  let lastNarrationFriendlyCharIndex = null;
  let lastSpeechFriendlyCharIndex = null;
  let stream1 = null;
  let streamArr = [];
  let currentCharacter;

  for (let i = 0, len = str.length; i < len; i++) {
    currentCharacter = str.charAt(i);
    if (currentCharacter === openChar) {
      currentCharIsOpenChar(i);
    }
    else if (currentCharacter === closeChar) {
      currentCharIsCloseChar(i);
    }
    else if (isNarrationFriendlyChar(currentCharacter)) {
      currentCharIsNarrationFriendlyChar(i);
    }
    // maybe set the friendlies charIndices here?
    // unsure about these
    lastNarrationFriendlyCharIndex = isNarrationFriendlyChar(currentCharacter) ? i : lastNarrationFriendlyCharIndex;
    lastSpeechFriendlyCharIndex = isSpeechFriendlyChar(currentCharacter) ? i : lastSpeechFriendlyCharIndex;
  }
  return streamArr;

  // @param i - just the i passed down from the loop
  function currentCharIsNarrationFriendlyChar (i) {
    if (_.isNull(stream1)) {
      stream1 = new Stream(i, null, 'narration');
    }
  }//end currentCharIsNarrationFriendlyChar

  // @param i - just the i passed down from the loop
  function currentCharIsOpenChar (i) {
    if (_.isNull(stream1)) {
      // set new stream to stream1 with openChar -> currentindex and type -> speech
      stream1 = new Stream(i, null, 'speech');
    }
    else { // stream 1 is defined AND current character is openChar
      stream1.closeCharIndex = lastNarrationFriendlyCharIndex;
      if (stream1.type === 'speech') {
        stream1.type = 'parseError';
      }
      streamArr.push(stream1);
      stream1 = new Stream(i, null, 'speech');
    }
  }//end currentCharIsOpenChar

  function currentCharIsCloseChar (i) {
    if (_.isNull(stream1)) {
      stream1 = new Stream(i, i, 'parseError');
    }
    else { // stream 1 is defined AND current character is close char
      stream1.closeCharIndex = i;
      if (stream1.type === 'narration') {
        stream1.type = 'parseError';
      }
    }
    streamArr.push(stream1);
    stream1 = null;
  }//end currentCharIsCloseChar
}// end speechClassifier


module.exports = speechClassifier;