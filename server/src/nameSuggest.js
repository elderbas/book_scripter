'use strict';
const _ = require('lodash');
const ltt = require('../constants/lexiconTagTypes');

const RIGHT = 1;
const LEFT = 0;
const blah = {
  arrangementTextMatcher: `|NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  }
};
const nonWsMatchers = [
  blah
];


const nameSuggest = (preSnippetClassifiedArrangementObj, preSnippetExtendedObj) => {
  let nonWsMatched = _.find(nonWsMatchers, (nwm) => {
    return preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement.includes(nwm.arrangementTextMatcher)
  });
  if (!nonWsMatched) {
    return null;
  }
  let name = nonWsMatched.getNameOut(preSnippetExtendedObj.nonWhiteSpaceOnly);
  if (!name) {
    return null;
  }
  return name;
};

module.exports = nameSuggest;


