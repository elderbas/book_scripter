'use strict';
const _ = require('lodash');
const ltt = require('../constants/lexiconTagTypes');
const RIGHT = 1;
const LEFT = 0;

const narTipToRight = {
  arrangementTextMatcher: `|NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  }
};

const narTipToLeft = {
  arrangementTextMatcher: `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})|`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[LEFT][0].predictedCharacterNameNormalized;
  }
};
const nonWsMatchers = [ narTipToRight, narTipToLeft ];


const nameSuggest = (preSnippetClassifiedArrangementObj, preSnippetExtendedObj) => {
  let nonWsMatched = _.find(nonWsMatchers, (nwm) => {
    return preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement.includes(nwm.arrangementTextMatcher)
  });
  if (!nonWsMatched) {
    console.log('nonWsMatched');
    return null;
  }
  let name = nonWsMatched.getNameOut(preSnippetExtendedObj.nonWhiteSpaceOnly);
  if (!name) {
    console.log('!name');
    return null;
  }
  return name;
};

module.exports = nameSuggest;


