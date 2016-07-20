"use strict";

let speechClassifierHelper = {
  isSpeechFriendlyChar: function (openChar, closeChar) {
    return function (ch) {
      return /[^\s]/.test(ch) || ch === openChar || ch === closeChar;
    }

  },
  isNarrationFriendlyChar: function (openChar, closeChar) {
    return function (ch) {
      return /[^\s]/.test(ch) && ch !== openChar && ch !== closeChar;
    }

  }
};

module.exports = speechClassifierHelper;