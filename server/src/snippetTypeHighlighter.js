"use strict";
const _ = require('lodash');
const Stream = require('./classes/Stream.js');
const sCHelper = require('./snippetTypeHighlighterHelper.js');
const createPreSnippetsForBlob = require('./createPreSnippetsForBlob.js');

// flow chart diagram
// https://www.draw.io/#G0B-uOEq9vSrDJQVN5NVpTclJEMk0
/*
  input:
*   str -> the blob of text to parse out
*   openChar (optional) -> the opening character for a speech utterance, probably a double open quote
*   closeChar (optional) -> the opening character for a speech utterance, probably a double close quote
*   endNarrationStreamsOnNewlineChar (optional) -> the opening character for a speech utterance, probably a double open quote
*
* output:
*   Stream[] (an array of Stream objects) that represent
*   the start and ending indices for different snippet types, to be
*   used in the createPreSnippetsForBlob function later
* */
const DEFAULT_OPEN_CHAR = `“`;
const DEFAULT_CLOSE_CHAR =  `”`;
const DEFAULT_END_NARR_ON_NEWLINE =  false;
function snippetTypeHighlighter (str, openChar, closeChar, endNarrationStreamsOnNewlineChar) {
  openChar = _.isUndefined(openChar) || _.isNull(openChar) ? DEFAULT_OPEN_CHAR : openChar;
  closeChar = _.isUndefined(closeChar) || _.isNull(closeChar) ? DEFAULT_CLOSE_CHAR : closeChar;
  endNarrationStreamsOnNewlineChar = _.isUndefined(endNarrationStreamsOnNewlineChar) ? DEFAULT_END_NARR_ON_NEWLINE : endNarrationStreamsOnNewlineChar;

  const isSpeechFriendlyChar = sCHelper.isSpeechFriendlyChar(openChar, closeChar);
  const isNarrationFriendlyChar = sCHelper.isNarrationFriendlyChar(openChar, closeChar);
  const isNewlineChar = sCHelper.isNewlineChar;
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
    else if (isNewlineChar(currentCharacter)) {
      handleNewlineChar();
    }

    lastNarrationFriendlyCharIndex = isNarrationFriendlyChar(currentCharacter) ? i : lastNarrationFriendlyCharIndex;
    lastSpeechFriendlyCharIndex = isSpeechFriendlyChar(currentCharacter) ? i : lastSpeechFriendlyCharIndex;
  }//end for loop

  if (!_.isNull(stream1)) { // could be narration or speech obviously
    if (stream1.type === 'speech') {
      stream1.type = 'parseError';
      stream1.closeCharIndex = lastSpeechFriendlyCharIndex;
    } else if (stream1.type === 'narration') {
      stream1.closeCharIndex = lastNarrationFriendlyCharIndex;
    }
    streamArr.push(stream1);
  }

  // return them as PreSnippets instead of streams
  return streamArr;

  // @param i - just the i passed down from the loop
  function handleNewlineChar (i) {
    if (!_.isNull(stream1) && endNarrationStreamsOnNewlineChar) {
      stream1.closeCharIndex = lastNarrationFriendlyCharIndex;
      if (stream1.type === 'speech') {
        stream1.type = 'parseError';
      }
      streamArr.push(stream1);
      stream1 = null;
    }
  }//end currentCharIsNarrationFriendlyChar

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
}// end snippetTypeHighlighter


module.exports = snippetTypeHighlighter;