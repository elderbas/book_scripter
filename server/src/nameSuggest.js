'use strict';
const _ = require('lodash');
const ltt = require('../constants/lexiconTagTypes');
const RIGHT = 1;
const LEFT = 0;

// completeMatchers
/*
* “We should start back,” Gared urged as the woods began to grow dark around them.
* */
const NAR_PC_VSS = `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const NAR_VSS_PC = `NAR(${ltt.VERB_SYNONYM_TO_SPOKE} ${ltt.PERSON_CONFIRMED})`;
const NAR_PR_VSS = `NAR(${ltt.PERSON_PRONOUN} ${ltt.VERB_SYNONYM_TO_SPOKE})`;
const SP = ltt.SPEECH;
const M_NL = ltt.WS_MULTI_NEWLINE;
const SS = ltt.WS_SINGLE_SPACE;
const completeMatchers = [];
completeMatchers.push({
  arrangementTextMatcher: `${M_NL}|${ltt.WS_SINGLE_SPACE},${NAR_PC_VSS}`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized;
  },
  whichMatcher: 'speechNarOneLine'
});
completeMatchers.push({
  arrangementTextMatcher: `${ltt.WS_MULTI_NEWLINE}|${ltt.WS_SINGLE_SPACE},NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][1].predictedCharacterNameNormalized;
  },
  whichMatcher: 'speechAloneVariant'
});

/* TODO - maybe I can remove needing single space? new line seems more important so far */
completeMatchers.push({
  arrangementTextMatcher: `${SP},${SS},${NAR_PR_VSS},${SS}|`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[LEFT][3].personConfirmedNormalized;
  },
  whichMatcher: 'pronounWrappedEndGrabsFromJustPreviousConfirmed'
});

// non ws matchers
const narTipToRight = {
  arrangementTextMatcher: `|NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[RIGHT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'narTipToRight'
};
const narTipToLeft = {
  arrangementTextMatcher: `NAR(${ltt.PERSON_CONFIRMED} ${ltt.VERB_SYNONYM_TO_SPOKE})|`,
  getNameOut: (extendedPreSnippets) => {
    return extendedPreSnippets[LEFT][0].predictedCharacterNameNormalized;
  },
  whichMatcher: 'narTipToLeft'
};
const nonWsMatchers = [ narTipToRight, narTipToLeft ];

const checkArrangementForMatches = (preSnippetArrangement, preSnippetExtended, matchers) => {
  let namedSuggestedObj = {suggestedName: null, whichMatcher: null};
  let matched = _.find(matchers, (m) => {
    return preSnippetArrangement.includes(m.arrangementTextMatcher)
  });
  if (!matched) {
    return null;
  }
  let name = matched.getNameOut(preSnippetExtended);
  if (!name) {
    return null;
  }

  namedSuggestedObj.suggestedName = name;
  namedSuggestedObj.whichMatcher = matched.whichMatcher;
  return namedSuggestedObj;
};
const nameSuggest = (preSnippetClassifiedArrangementObj, preSnippetExtendedObj) => {
  let allArrangementNameMatch = checkArrangementForMatches(preSnippetClassifiedArrangementObj.arrangementComplete, preSnippetExtendedObj.allExtended, completeMatchers);
  let nonWsNameMatch = checkArrangementForMatches(preSnippetClassifiedArrangementObj.nonWhiteSpaceArrangement, preSnippetExtendedObj.nonWhiteSpaceOnly, nonWsMatchers);

  if (allArrangementNameMatch) {
    return allArrangementNameMatch;
  }
  else if (nonWsNameMatch) {
    console.log('no whitey');
    return nonWsNameMatch;
  }
  else {
    console.log('nully');
    return null;
  }
};

module.exports = nameSuggest;

























