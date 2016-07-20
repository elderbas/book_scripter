"use strict";

let speechClassifierHelper = {
  isSpeechFriendlyChar,
  isNarrationFriendlyChar,
  isNewlineChar
};

/*
* mostly similar to isNarrationFriendlyChar, but this catches the case
* where a double quotes (most likely if thats whats in the open and close char)
* is the last character before the end of the blob
* */
function isSpeechFriendlyChar(openChar, closeChar) {
  return function (ch) {
    return /[^\s\n\r]/.test(ch) || ch === openChar || ch === closeChar;
  }
}

/*
* -Purpose of this function is to keep track of the last index that a character that can be counted as an
* ok stopping point for a narration stream.
* - Although linebreaks can be PART of a narration stream, it doesn't mean that a narration should be
* able to END on one. A big use for isNarrationFriendlyChar is to keep track of the last index that
* it could appropriately stop a narration at previous point
* */
function isNarrationFriendlyChar(openChar, closeChar) {
  return function (ch) {
    return /[^\s\n\r]/.test(ch) && ch !== openChar && ch !== closeChar;
  }
}

function isNewlineChar (c) {
  return /[\r\n]/.test(c);
}


module.exports = speechClassifierHelper;